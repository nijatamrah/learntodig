// Təzyiqlər və mud window: ortaq hesablama kitabxanası (field units).
// Vahidlər: dərinlik ft (TVD!), təzyiq psi, məhlul çəkisi ppg, qradiyent psi/ft.
// Mənbə əsasları: Bourgoyne et al., "Applied Drilling Engineering" (SPE); Eaton (1969, 1975).

/** psi/ft üçün çevirmə: 12/231 ≈ 0.05195, sənayedə 0.052 işlədilir */
export const C = 0.052;
/** 1 g/cc = 0.4335 psi/ft (62.43 lb/ft³ / 144) */
export const PSI_FT_PER_GCC = 0.4335;

export const hydrostaticPsi = (mwPpg: number, tvdFt: number) => C * mwPpg * tvdFt;
export const gradientPsiFt = (mwPpg: number) => C * mwPpg;
export const ppgFromGradient = (psiPerFt: number) => psiPerFt / C;
export const emwPpg = (pressurePsi: number, tvdFt: number) => pressurePsi / (C * tvdFt);

/** Eaton (sonik): Pp/D = OBG − (OBG − NPG)·(Δt_normal/Δt_observed)^3, qradiyentlər psi/ft */
export function eatonSonicPoreGradient(p: {
  obGradient: number;
  normalGradient: number;
  dtNormal: number;
  dtObserved: number;
  exponent?: number;
}) {
  const n = p.exponent ?? 3;
  return p.obGradient - (p.obGradient - p.normalGradient) * Math.pow(p.dtNormal / p.dtObserved, n);
}

/** Eaton (1969) çat qradiyenti: FG = Pp + ν/(1−ν)·(S − Pp) — təzyiq (psi) */
export function eatonFracturePressure(pp: number, overburden: number, poisson: number) {
  return pp + (poisson / (1 - poisson)) * (overburden - pp);
}

/** Hubbert–Willis minimum çat təzyiqi: Pp + (S − Pp)/3 */
export function hubbertWillisMinPressure(pp: number, overburden: number) {
  return pp + (overburden - pp) / 3;
}

/** Leak-off testdən ekvivalent məhlul çəkisi: EMW = MW_test + P_leakoff/(0.052·TVD_shoe) */
export function leakOffEmw(mwTestPpg: number, surfaceLeakOffPsi: number, shoeTvdFt: number) {
  return mwTestPpg + surfaceLeakOffPsi / (C * shoeTvdFt);
}

// ---------- Sintetik quyu profili (simulyator üçün) ----------

export interface ProfileParams {
  td: number; // ft TVD
  normalGradient: number; // psi/ft
  overpressureTop: number; // ft TVD
  peakPorePpg: number; // TD-də ekvivalent məsamə təzyiqi (ppg)
  poisson: number;
  rhoSurface?: number; // g/cc
  rhoDeep?: number; // g/cc
  decayFt?: number;
}

export interface ProfilePoint {
  d: number;
  ob: number; // psi
  pp: number; // psi
  fg: number; // psi
  obPpg: number;
  ppPpg: number;
  fgPpg: number;
}

export function overburdenPsi(d: number, rho0 = 1.8, rhoInf = 2.6, L = 4000) {
  // ρ(z) = ρ∞ − (ρ∞−ρ0)·e^(−z/L)  →  ∫ρ dz analitik
  const integral = rhoInf * d - (rhoInf - rho0) * L * (1 - Math.exp(-d / L));
  return PSI_FT_PER_GCC * integral;
}

export function buildProfile(p: ProfileParams, step = 50): ProfilePoint[] {
  const pts: ProfilePoint[] = [];
  const normalPpg = ppgFromGradient(p.normalGradient);
  for (let d = step; d <= p.td + 1e-9; d += step) {
    const ob = overburdenPsi(d, p.rhoSurface, p.rhoDeep, p.decayFt);
    let ppPpg = normalPpg;
    if (d > p.overpressureTop && p.td > p.overpressureTop) {
      const t = (d - p.overpressureTop) / (p.td - p.overpressureTop);
      ppPpg = normalPpg + (p.peakPorePpg - normalPpg) * t;
    }
    let pp = C * ppPpg * d;
    pp = Math.min(pp, 0.95 * ob); // məsamə təzyiqi overburden-dən yüksək ola bilməz
    const fg = eatonFracturePressure(pp, ob, p.poisson);
    pts.push({
      d,
      ob,
      pp,
      fg,
      obPpg: emwPpg(ob, d),
      ppPpg: emwPpg(pp, d),
      fgPpg: emwPpg(fg, d),
    });
  }
  return pts;
}

// ---------- Casing seat seçimi (bottom-up) ----------

export interface CasingSeat {
  /** Shoe dərinliyi (ft TVD) */
  depth: number;
  /** Bu shoe-dan aşağıdakı açıq quyu bölməsinin dibi (növbəti shoe və ya TD) */
  sectionBottom: number;
  /** Bölmənin başlanğıcında lazım olan məhlul çəkisi: Pp(shoe) + trip margin (ppg) */
  mwStart: number;
  /** Bölmənin dibində lazım olan məhlul çəkisi: Pp(dib) + trip margin (ppg) */
  mwRequired: number;
  /** Shoe-da icazə verilən maksimum məhlul çəkisi: FG − margin (ppg) */
  mwMax: number;
}

export type SeatResult =
  | { ok: true; seats: CasingSeat[] }
  | { ok: false; reason: string; atDepth: number; seats: CasingSeat[] };

export function selectCasingSeats(
  profile: ProfilePoint[],
  opts: { tripMargin: number; fracMargin: number; surfaceShoe: number }
): SeatResult {
  const td = profile[profile.length - 1].d;
  const seats: CasingSeat[] = [];
  let current = td;

  for (let guard = 0; guard < 12; guard++) {
    const idx = profile.findIndex((p) => p.d === current);
    const mwReq = profile[idx].ppPpg + opts.tripMargin;

    if (profile[idx].fgPpg - opts.fracMargin < mwReq) {
      return {
        ok: false,
        atDepth: current,
        seats,
        reason: `${current} ft-də məsamə təzyiqi + trip margin (${mwReq.toFixed(2)} ppg) çat qradiyentindən − margin (${(
          profile[idx].fgPpg - opts.fracMargin
        ).toFixed(2)} ppg) yüksəkdir. Mud window bağlanıb.`,
      };
    }

    // Yuxarıya doğru: FG − margin ≥ mwReq şərti pozulana qədər
    let shoeIdx = idx;
    while (shoeIdx > 0 && profile[shoeIdx - 1].fgPpg - opts.fracMargin >= mwReq) shoeIdx--;
    const shoe = profile[shoeIdx].d;

    if (shoe <= opts.surfaceShoe) {
      seats.push({
        depth: opts.surfaceShoe,
        sectionBottom: current,
        mwStart: 0,
        mwRequired: mwReq,
        mwMax: profile.find((p) => p.d >= opts.surfaceShoe)!.fgPpg - opts.fracMargin,
      });
      break;
    }
    if (shoe >= current) {
      return { ok: false, atDepth: current, seats, reason: "Casing seat tapılmadı: shoe dərinliyi irəliləmir." };
    }
    seats.push({
      depth: shoe,
      sectionBottom: current,
      mwStart: 0,
      mwRequired: mwReq,
      mwMax: profile[shoeIdx].fgPpg - opts.fracMargin,
    });
    current = shoe;
  }

  // seats: dərindən dayaza; hər açıq quyu bölməsi üçün üst sərhədi (əvvəlki shoe) göstər
  const ordered = [...seats].sort((a, b) => a.depth - b.depth);
  for (const s of ordered) {
    const at = profile.find((p) => p.d >= s.depth)!;
    s.mwStart = at.ppPpg + opts.tripMargin;
  }
  return { ok: true, seats: ordered };
}
