// Casing və sementləmə (field units). Mənbə əsasları:
//  - Tutum və yerdəyişmə: Bourgoyne et al., "Applied Drilling Engineering"
//  - Burst: API 5C3 internal yield (Barlow, 87.5% divar qalınlığı): P = 0.875·2·Yp·t/D
//  - Collapse: API 5C3 cədvəl qiymətləri + eksenel gərginlik üçün biaxial düzəliş (API 5C3 ellips düsturu)
//  - Sement: absolute volume metodu (Class G: 94 lb/sk, quru sement 0.0382 gal/lb, su 1.0 gal/gal)
// Bütün dizayn və iş modelləri təhsil məqsədlidir (şaquli quyu, sürtünmə itkisi nəzərə alınmır).

import { hydrostaticPsi } from "./pressure";

export const STEEL_PPG = 65.4; // polad sıxlığı, lb/gal (489 lb/ft³)
export const BBL_TO_FT3 = 5.615;
export const CEMENT_SACK_LB = 94;
export const CEMENT_ABS_VOL = 0.0382; // gal/lb (Class G)
export const WATER_PPG = 8.34;

// ---------- Həndəsə: tutum və yerdəyişmə (bbl/ft) ----------

export const capacityBblFt = (idIn: number) => (idIn * idIn) / 1029.4;
export const annCapacityBblFt = (dhIn: number, odIn: number) => (dhIn * dhIn - odIn * odIn) / 1029.4;
export const steelDisplacementBblFt = (odIn: number, idIn: number) => (odIn * odIn - idIn * idIn) / 1029.4;
export const steelAreaIn2 = (odIn: number, idIn: number) => (Math.PI / 4) * (odIn * odIn - idIn * idIn);

export const buoyancyFactor = (mwPpg: number) => 1 - mwPpg / STEEL_PPG;
export const hydro = hydrostaticPsi;

// ---------- Casing xassələri ----------

export interface CasingSpec {
  id: string;
  label: string;
  od: number; // in
  wall: number; // in
  wtPpf: number; // lb/ft (nominal)
  grade: string;
  yieldPsi: number;
  collapsePsi: number; // API 5C3 cədvəl qiyməti
}

export const casingId = (s: { od: number; wall: number }) => s.od - 2 * s.wall;
/** API internal yield (Barlow, 87.5% divar): psi */
export const burstBarlow = (odIn: number, wallIn: number, yieldPsi: number) => (0.875 * 2 * yieldPsi * wallIn) / odIn;
export const bodyYieldLbf = (s: { od: number; wall: number; yieldPsi: number }) => steelAreaIn2(s.od, casingId(s)) * s.yieldPsi;

export const CASINGS_9_5_8: CasingSpec[] = [
  { id: "j55-36", label: "9-5/8 in · 36 lb/ft · J-55", od: 9.625, wall: 0.352, wtPpf: 36, grade: "J-55", yieldPsi: 55000, collapsePsi: 2020 },
  { id: "n80-40", label: "9-5/8 in · 40 lb/ft · N-80", od: 9.625, wall: 0.395, wtPpf: 40, grade: "N-80", yieldPsi: 80000, collapsePsi: 3090 },
  { id: "n80-47", label: "9-5/8 in · 47 lb/ft · N-80", od: 9.625, wall: 0.472, wtPpf: 47, grade: "N-80", yieldPsi: 80000, collapsePsi: 4750 },
  { id: "p110-47", label: "9-5/8 in · 47 lb/ft · P-110", od: 9.625, wall: 0.472, wtPpf: 47, grade: "P-110", yieldPsi: 110000, collapsePsi: 5310 },
  { id: "p110-535", label: "9-5/8 in · 53.5 lb/ft · P-110", od: 9.625, wall: 0.545, wtPpf: 53.5, grade: "P-110", yieldPsi: 110000, collapsePsi: 7950 },
];

/** API 5C3: eksenel dartılma (tension) collapse müqavimətini azaldır. Sa: eksenel gərginlik (psi), dartılma müsbət. */
export function collapseWithTension(collapsePsi: number, yieldPsi: number, axialStressPsi: number) {
  const r = axialStressPsi / yieldPsi;
  const inner = 1 - 0.75 * r * r;
  const f = inner > 0 ? Math.sqrt(inner) - 0.5 * r : 0;
  return collapsePsi * Math.max(0, Math.min(1, f)); // sıxılma halında artımı nəzərə almırıq (mühafizəkar)
}

// ---------- Dizayn yükləri (şaquli quyu, vahid xətti string) ----------

export interface DesignInput {
  spec: CasingSpec;
  setTvd: number; // ft (shoe)
  mwRun: number; // ppg: casing-in arxasındakı və qazma zamanı daxildəki məhlul
  fluidLevel: number; // ft: casing daxilində məhlul səviyyəsi (setTvd = tam boşalma)
  nextTd: number; // ft: növbəti bölmənin TD-si
  nextPorePpg: number; // ppg: növbəti TD-də məsamə təzyiqi
  shoeFracPpg: number; // ppg: casing shoe-da çat qradiyenti
  gasGrad?: number; // psi/ft
  extGrad?: number; // psi/ft: burst-də casing arxasındakı təzyiq (formasiya suyu)
  dfBurst: number;
  dfCollapse: number;
  dfTension: number;
}

export interface DesignRow {
  d: number;
  burstLoad: number;
  collapseLoad: number;
  collapseRating: number; // eksenel düzəlişli
  tension: number; // lbf
}

/** Burst: qaz kick-i səthə çıxır. Səth təzyiqi min( Pp_TD − g·TD, Pfrac_shoe − g·shoe ). */
export function surfacePressureGasKick(i: Pick<DesignInput, "setTvd" | "nextTd" | "nextPorePpg" | "shoeFracPpg" | "gasGrad">) {
  const g = i.gasGrad ?? 0.1;
  const unlimited = hydro(i.nextPorePpg, i.nextTd) - g * i.nextTd;
  const fracCap = hydro(i.shoeFracPpg, i.setTvd) - g * i.setTvd;
  return { unlimited: Math.max(0, unlimited), capped: Math.max(0, Math.min(unlimited, fracCap)), limitedByShoe: fracCap < unlimited };
}

export function designProfile(i: DesignInput, n = 46): { rows: DesignRow[]; ps: number; burstRating: number; bodyYield: number; area: number } {
  const g = i.gasGrad ?? 0.1;
  const ext = i.extGrad ?? 0.465;
  const id = casingId(i.spec);
  const area = steelAreaIn2(i.spec.od, id);
  const bf = buoyancyFactor(i.mwRun);
  const ps = surfacePressureGasKick(i).capped;
  const rows: DesignRow[] = [];
  for (let k = 0; k <= n; k++) {
    const d = (i.setTvd * k) / n;
    const burstLoad = Math.max(0, ps + g * d - ext * d);
    const pe = hydro(i.mwRun, d);
    const pi = hydro(i.mwRun, Math.max(0, d - i.fluidLevel));
    const tension = i.spec.wtPpf * bf * (i.setTvd - d);
    rows.push({
      d,
      burstLoad,
      collapseLoad: Math.max(0, pe - pi),
      collapseRating: collapseWithTension(i.spec.collapsePsi, i.spec.yieldPsi, tension / area),
      tension,
    });
  }
  return { rows, ps, burstRating: burstBarlow(i.spec.od, i.spec.wall, i.spec.yieldPsi), bodyYield: bodyYieldLbf(i.spec), area };
}

// ---------- Sement slurry ----------

/** Absolute volume metodu: w = mix suyu (gal/sk) */
export function slurryMix(waterGalPerSk: number, sackLb = CEMENT_SACK_LB, absVol = CEMENT_ABS_VOL) {
  const volGal = sackLb * absVol + waterGalPerSk;
  return {
    densityPpg: (sackLb + WATER_PPG * waterGalPerSk) / volGal,
    yieldFt3: volGal / 7.48,
  };
}
export const sacksFor = (volBbl: number, yieldFt3PerSk: number) => (volBbl * BBL_TO_FT3) / yieldFt3PerSk;

export interface JobGeom {
  shoeTvd: number;
  casingOd: number;
  casingId: number;
  holeDia: number;
  excess: number; // 0.30 = 30%
  prevShoeTvd: number;
  prevCasingId: number;
  trackFt: number; // shoe track uzunluğu (float collar - shoe)
  tocTvd: number; // planlaşdırılan sement üstü
}

export function cementVolumes(g: JobGeom) {
  const openLen = Math.max(0, g.shoeTvd - Math.max(g.prevShoeTvd, g.tocTvd));
  const casedLen = Math.max(0, g.prevShoeTvd - g.tocTvd);
  const vOpen = openLen * annCapacityBblFt(g.holeDia, g.casingOd) * (1 + g.excess);
  const vCased = casedLen * annCapacityBblFt(g.prevCasingId, g.casingOd);
  const vTrack = g.trackFt * capacityBblFt(g.casingId);
  return { openLen, casedLen, vOpen, vCased, vTrack, total: vOpen + vCased + vTrack };
}

/** Shoe-dan yuxarı sement həcmindən (bbl) hündürlük (ft). Açıq quyuda excess nəzərə alınır. */
export function annulusHeight(g: JobGeom, volBbl: number) {
  const capOpen = annCapacityBblFt(g.holeDia, g.casingOd) * (1 + g.excess);
  const capCased = annCapacityBblFt(g.prevCasingId, g.casingOd);
  const openFt = g.shoeTvd - g.prevShoeTvd;
  const vOpenAll = openFt * capOpen;
  if (volBbl <= vOpenAll) return volBbl / capOpen;
  return Math.min(g.shoeTvd, openFt + (volBbl - vOpenAll) / capCased);
}

/** Displacement həcmi (plug float collar-a çatana qədər), bbl */
export const displacementBbl = (g: JobGeom) => capacityBblFt(g.casingId) * (g.shoeTvd - g.trackFt);

// ---------- İş mərhələləri (displacement animasiyası) ----------

export interface Fluid {
  name: string;
  ppg: number;
  vol: number; // bbl; displacement üçün istifadə olunmur
  color: string;
}
export interface Seg {
  top: number; // ft (səthdən)
  bottom: number;
  fluid: Fluid;
}

/**
 * Pump edilmiş həcmə (Vp, bbl) görə casing daxili və annulus sütunları.
 * Yol koordinatı: casing üstündən (s=0) shoe-ya (s=Vcas), sonra annulus boyu yuxarı.
 * Axırda pump edilən maye s=0-a yaxın, ilk pump edilən (spacer) önündədir.
 */
export function jobColumns(g: JobGeom, mud: Fluid, train: Fluid[], disp: Fluid, vp: number) {
  const capC = capacityBblFt(g.casingId);
  const vCas = capC * g.shoeTvd;
  const plugVol = train.reduce((s, f) => s + f.vol, 0);
  const vBump = plugVol + capC * (g.shoeTvd - g.trackFt);
  const v = Math.min(Math.max(vp, 0), vBump);

  // path intervals: [sStart, sEnd, fluid] (s artır: casing yuxarıdan aşağı, sonra annulus aşağıdan yuxarı)
  const intervals: { s0: number; s1: number; fluid: Fluid }[] = [];
  let q = 0;
  for (const f of train) {
    intervals.push({ s0: v - (q + f.vol), s1: v - q, fluid: f });
    q += f.vol;
  }
  intervals.push({ s0: 0, s1: v - plugVol, fluid: disp });
  const clean = intervals.map((x) => ({ ...x, s0: Math.max(0, x.s0), s1: Math.min(v, x.s1) })).filter((x) => x.s1 - x.s0 > 1e-9);
  // mud: s ∈ [v, ∞)
  clean.push({ s0: v, s1: Infinity, fluid: mud });

  const casing: Seg[] = [];
  const annulus: Seg[] = [];
  for (const it of clean) {
    // casing hissəsi
    const c0 = Math.min(it.s0, vCas);
    const c1 = Math.min(it.s1, vCas);
    if (c1 - c0 > 1e-9) casing.push({ top: c0 / capC, bottom: c1 / capC, fluid: it.fluid });
    // annulus hissəsi
    const a0 = Math.max(it.s0 - vCas, 0);
    const a1 = it.s1 === Infinity ? Infinity : Math.max(it.s1 - vCas, 0);
    if (a1 > a0) {
      const h0 = annulusHeight(g, a0);
      const h1 = a1 === Infinity ? g.shoeTvd : annulusHeight(g, a1);
      if (h1 - h0 > 1e-9) annulus.push({ top: g.shoeTvd - h1, bottom: g.shoeTvd - h0, fluid: it.fluid });
    }
  }
  casing.sort((a, b) => a.top - b.top);
  annulus.sort((a, b) => a.top - b.top);
  const plugDepth = v >= plugVol ? (v - plugVol) / capC : null; // casing daxilində üst plug dərinliyi
  return { casing, annulus, vBump, v, plugDepth, bumped: v >= vBump - 1e-6 };
}

export function hydrostaticOfSegs(segs: Seg[], depth: number) {
  let p = 0;
  for (const s of segs) {
    const a = Math.min(s.top, depth);
    const b = Math.min(s.bottom, depth);
    if (b > a) p += 0.052 * s.fluid.ppg * (b - a);
  }
  return p;
}

// ---------- Mərkəzləmə (standoff) ----------

/** Standoff (%): minimum boşluğun konsentrik boşluğa nisbəti. offset: casing mərkəzinin quyu mərkəzindən sürüşməsi (in). */
export function standoffPct(holeDia: number, casingOd: number, offsetIn: number) {
  const gap = (holeDia - casingOd) / 2;
  return Math.max(0, (1 - offsetIn / gap) * 100);
}
/** Dar tərəf / geniş tərəf axın sürəti nisbəti (Newton mayesi, paralel lövhə yaxınlaşması: v ~ h²) */
export function narrowToWideVelocity(standoff: number) {
  const eps = 1 - standoff / 100;
  return Math.pow((1 - eps) / (1 + eps), 2);
}

/**
 * Mərkəzləşdiricilər arasında (sadə dayaqlı şüa, bərabər yayılmış yük) casing-in orta nöqtəsində sallanması.
 * Sadələşdirilmiş model: mərkəzləşdirici nöqtələrində standoff 100% sayılır.
 * w_buoy: casing-in məhluldakı çəkisi (lb/ft), inc: meyl bucağı (dərəcə), spanFt: mərkəzləşdiricilər arası məsafə (ft).
 * Qaytarır: sallanma (in) və orta nöqtədə standoff (%).
 */
export function centralizerMidSpan(opts: { od: number; id: number; wBuoyLbFt: number; incDeg: number; spanFt: number; holeDia: number }) {
  const E = 30e6; // psi
  const I = (Math.PI / 64) * (Math.pow(opts.od, 4) - Math.pow(opts.id, 4)); // in⁴
  const wn = (opts.wBuoyLbFt / 12) * Math.sin((opts.incDeg * Math.PI) / 180); // lb/in, şüaya perpendikulyar
  const L = opts.spanFt * 12; // in
  const deflection = (5 * wn * Math.pow(L, 4)) / (384 * E * I);
  const gap = (opts.holeDia - opts.od) / 2;
  const standoff = Math.max(0, (1 - deflection / gap) * 100);
  return { deflection, gap, standoff, touches: deflection >= gap };
}
