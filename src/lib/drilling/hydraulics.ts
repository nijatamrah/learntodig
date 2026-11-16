// Qazma hidravlikası (field units). Mənbə əsasları:
//  - Bingham plastic modeli: Bourgoyne et al., "Applied Drilling Engineering" (Ch. 4)
//  - Power law: Metzner–Reed ümumiləşdirilmiş Reynolds ədədi, API RP 13D friksiya əmsalları
//  - Bit hidravlikası: nozzle təzyiq düşməsi, HSI, jet impact, optimallaşdırma kriteriyaları
// Bütün funksiyalar şaquli quyu və sabit həndəsə qəbul edir (təlim modeli).

// ---------- Vahid çevirmələri ----------
const FT_TO_M = 0.3048;
const IN_TO_M = 0.0254;
const PPG_TO_KGM3 = 119.826;
const PSI_TO_PA = 6894.757;
const PA_PER_M_TO_PSI_PER_FT = FT_TO_M / PSI_TO_PA;

export type FlowRegime = "laminar" | "transitional" | "turbulent";

export interface SegmentResult {
  velocity: number; // ft/s
  regime: FlowRegime;
  gradient: number; // psi/ft
  dp: number; // psi
}

// ---------- Rheology parametrləri ----------

export interface Rheo {
  t600: number;
  t300: number;
  t100: number;
  t3: number;
}

export const binghamParams = (r: Rheo) => ({ pv: r.t600 - r.t300, yp: r.t300 - (r.t600 - r.t300) });

/** Boru üçün (600/300 rpm): n və K [dyne·s^n/cm²] */
export function powerLawPipeParams(r: Rheo) {
  const n = 3.32 * Math.log10(r.t600 / r.t300);
  const k = (5.11 * r.t300) / Math.pow(511, n);
  return { n, k };
}

/** Halqa üçün (100/3 rpm, API RP 13D): n və K [dyne·s^n/cm²] */
export function powerLawAnnulusParams(r: Rheo) {
  const n = Math.log10(r.t100 / r.t3) / Math.log10(170.3 / 5.11);
  const k = (5.11 * r.t100) / Math.pow(170.3, n);
  return { n, k };
}

// ---------- Axın sürətləri ----------

export const pipeVelocity = (gpm: number, dIn: number) => gpm / (2.448 * dIn * dIn);
export const annularVelocityFtS = (gpm: number, holeIn: number, pipeIn: number) => gpm / (2.448 * (holeIn * holeIn - pipeIn * pipeIn));

// ---------- Bingham plastic (Bourgoyne) ----------

export function binghamPipe(p: { gpm: number; dIn: number; rho: number; pv: number; yp: number; lengthFt: number }): SegmentResult {
  const v = pipeVelocity(p.gpm, p.dIn);
  const vc = (1.08 * p.pv + 1.08 * Math.sqrt(p.pv * p.pv + 12.34 * p.dIn * p.dIn * p.yp * p.rho)) / (p.rho * p.dIn);
  const laminar = v <= vc;
  const gradient = laminar
    ? (p.pv * v) / (1500 * p.dIn * p.dIn) + p.yp / (225 * p.dIn)
    : (Math.pow(p.rho, 0.75) * Math.pow(v, 1.75) * Math.pow(p.pv, 0.25)) / (1800 * Math.pow(p.dIn, 1.25));
  return { velocity: v, regime: laminar ? "laminar" : "turbulent", gradient, dp: gradient * p.lengthFt };
}

export function binghamAnnulus(p: { gpm: number; holeIn: number; pipeIn: number; rho: number; pv: number; yp: number; lengthFt: number }): SegmentResult {
  const v = annularVelocityFtS(p.gpm, p.holeIn, p.pipeIn);
  const g = p.holeIn - p.pipeIn;
  const vc = (1.08 * p.pv + 1.08 * Math.sqrt(p.pv * p.pv + 9.26 * g * g * p.yp * p.rho)) / (p.rho * g);
  const laminar = v <= vc;
  const gradient = laminar
    ? (p.pv * v) / (1000 * g * g) + p.yp / (200 * g)
    : (Math.pow(p.rho, 0.75) * Math.pow(v, 1.75) * Math.pow(p.pv, 0.25)) / (1396 * Math.pow(g, 1.25));
  return { velocity: v, regime: laminar ? "laminar" : "turbulent", gradient, dp: gradient * p.lengthFt };
}

// ---------- Power law (Metzner–Reed, API RP 13D) ----------

function powerLawFriction(re: number, n: number): { f: number; regime: FlowRegime } {
  const reC1 = 3470 - 1370 * n;
  const reC2 = 4270 - 1370 * n;
  const a = (Math.log10(n) + 3.93) / 50;
  const b = (1.75 - Math.log10(n)) / 7;
  if (re <= reC1) return { f: 16 / re, regime: "laminar" };
  if (re >= reC2) return { f: a / Math.pow(re, b), regime: "turbulent" };
  const fL = 16 / reC1;
  const fT = a / Math.pow(reC2, b);
  return { f: fL + ((re - reC1) * (fT - fL)) / (reC2 - reC1), regime: "transitional" };
}

/** Ümumi: τ_w = K'·(c·v/Dh)^n; Re = 8ρv²/τ_w; ΔP/L = 2·f·ρ·v²/Dh. Boru: c=8, K' = K((3n+1)/4n)^n; slot (halqa): c=12, K' = K((2n+1)/3n)^n */
function powerLawSegment(p: { v: number; dh: number; rho: number; n: number; k: number; slot: boolean }) {
  const kPrime = p.slot ? p.k * Math.pow((2 * p.n + 1) / (3 * p.n), p.n) : p.k * Math.pow((3 * p.n + 1) / (4 * p.n), p.n);
  const c = p.slot ? 12 : 8;
  const tauW = kPrime * Math.pow((c * p.v) / p.dh, p.n);
  const re = (8 * p.rho * p.v * p.v) / tauW;
  const { f, regime } = powerLawFriction(re, p.n);
  const gradient = (2 * f * p.rho * p.v * p.v) / p.dh; // Pa/m
  return { re, f, regime, gradient };
}

export function powerLawPipe(p: { gpm: number; dIn: number; rho: number; rheo: Rheo; lengthFt: number }): SegmentResult {
  const { n, k } = powerLawPipeParams(p.rheo);
  const vFt = pipeVelocity(p.gpm, p.dIn);
  const r = powerLawSegment({
    v: vFt * FT_TO_M,
    dh: p.dIn * IN_TO_M,
    rho: p.rho * PPG_TO_KGM3,
    n,
    k: k * 0.1,
    slot: false,
  });
  const g = r.gradient * PA_PER_M_TO_PSI_PER_FT;
  return { velocity: vFt, regime: r.regime, gradient: g, dp: g * p.lengthFt };
}

export function powerLawAnnulus(p: { gpm: number; holeIn: number; pipeIn: number; rho: number; rheo: Rheo; lengthFt: number }): SegmentResult {
  const { n, k } = powerLawAnnulusParams(p.rheo);
  const vFt = annularVelocityFtS(p.gpm, p.holeIn, p.pipeIn);
  const r = powerLawSegment({
    v: vFt * FT_TO_M,
    dh: (p.holeIn - p.pipeIn) * IN_TO_M,
    rho: p.rho * PPG_TO_KGM3,
    n,
    k: k * 0.1,
    slot: true,
  });
  const g = r.gradient * PA_PER_M_TO_PSI_PER_FT;
  return { velocity: vFt, regime: r.regime, gradient: g, dp: g * p.lengthFt };
}

// ---------- Bit hidravlikası ----------

export const CD_DEFAULT = 0.95;

/** Nozzle-lərin cəmi axın sahəsi (in²); ölçülər 1/32 in-də */
export const totalFlowArea = (nozzles32: number[]) => nozzles32.reduce((s, n) => s + (Math.PI / 4) * Math.pow(n / 32, 2), 0);

/** ΔP_bit = 8.311e-5·ρ·q² / (Cd²·At²)  [psi] */
export const bitPressureDrop = (rho: number, gpm: number, at: number, cd = CD_DEFAULT) => (8.311e-5 * rho * gpm * gpm) / (cd * cd * at * at);
/** Nozzle sürəti: v_n = 0.3208·q/At  [ft/s] */
export const nozzleVelocity = (gpm: number, at: number) => (0.3208 * gpm) / at;
export const bitHhp = (dpBit: number, gpm: number) => (dpBit * gpm) / 1714;
export const hsi = (bitHhpValue: number, bitDiameterIn: number) => bitHhpValue / ((Math.PI / 4) * bitDiameterIn * bitDiameterIn);
/** Jet impact: F = 0.01823·Cd·q·√(ρ·ΔP_bit)  [lbf] */
export const jetImpactForce = (rho: number, gpm: number, dpBit: number, cd = CD_DEFAULT) => 0.01823 * cd * gpm * Math.sqrt(rho * dpBit);
/** Verilmiş ΔP_bit və q üçün lazım olan TFA (in²) */
export const requiredTfa = (rho: number, gpm: number, dpBit: number, cd = CD_DEFAULT) => gpm * Math.sqrt((8.311e-5 * rho) / (cd * cd * dpBit));

/** Parasitik itki: P_p = c·q^m; iki ölçmədən */
export function parasiticFit(p1: number, q1: number, p2: number, q2: number) {
  const m = Math.log(p1 / p2) / Math.log(q1 / q2);
  const c = p1 / Math.pow(q1, m);
  return { m, c };
}

export function optimizeBitHydraulics(p: { pMax: number; m: number; c: number; rho: number; cd?: number }) {
  const cd = p.cd ?? CD_DEFAULT;
  const qHhp = Math.pow(p.pMax / ((p.m + 1) * p.c), 1 / p.m);
  const qJet = Math.pow((2 * p.pMax) / ((p.m + 2) * p.c), 1 / p.m);
  const dpHhp = (p.m / (p.m + 1)) * p.pMax;
  const dpJet = (p.m / (p.m + 2)) * p.pMax;
  return {
    hhp: { gpm: qHhp, dpBit: dpHhp, tfa: requiredTfa(p.rho, qHhp, dpHhp, cd), fraction: p.m / (p.m + 1) },
    jet: { gpm: qJet, dpBit: dpJet, tfa: requiredTfa(p.rho, qJet, dpJet, cd), fraction: p.m / (p.m + 2) },
  };
}

// ---------- ECD və surge/swab ----------

export const ecdPpg = (mwPpg: number, annularDpPsi: number, tvdFt: number) => mwPpg + annularDpPsi / (0.052 * tvdFt);

/** Qapalı uclu boru üçün orta halqa sürəti (Burkhardt "clinging" yaxınlaşması, K ≈ 0.45), ft/s */
export function surgeAnnularVelocity(p: { pipeSpeedFtS: number; holeIn: number; pipeIn: number; closedEnd: boolean; clinging?: number }) {
  const k = p.clinging ?? 0.45;
  const ratio = (p.pipeIn * p.pipeIn) / (p.holeIn * p.holeIn - p.pipeIn * p.pipeIn);
  return p.pipeSpeedFtS * ((p.closedEnd ? ratio : 0) + k);
}

/** Carrying Capacity Index (təlimat göstəricisi): CCI = K·MW·AV / 400,000; K [ekv. cP] = 511·θ300/511^n, AV ft/dəq */
export function carryingCapacityIndex(p: { mw: number; avFtMin: number; t600: number; t300: number }) {
  const n = 3.32 * Math.log10(p.t600 / p.t300);
  const k = (511 * p.t300) / Math.pow(511, n);
  return (k * p.mw * p.avFtMin) / 400000;
}

// ---------- Tam sirkulyasiya sistemi (şaquli quyu) ----------

export type HydraulicsModel = "bingham" | "powerlaw";

export interface SystemInput {
  model: HydraulicsModel;
  mw: number;
  gpm: number;
  rheo: Rheo;
  depth: number; // ft TVD = MD
  shoe: number; // casing shoe, ft
  holeIn: number;
  casingIdIn: number;
  dpOdIn: number;
  dpIdIn: number;
  dcOdIn: number;
  dcIdIn: number;
  dcLen: number;
  nozzles32: number[];
  surfaceRefPsi: number; // 450 gpm / 12 ppg-də səth itkisi
  cd?: number;
}

export interface SystemResult {
  surface: number;
  pipe: SegmentResult;
  collars: SegmentResult;
  annDcOpen: SegmentResult;
  annDpOpen: SegmentResult;
  annDpCased: SegmentResult;
  annulus: number;
  bit: number;
  parasitic: number;
  total: number;
  ecd: number;
  tfa: number;
  nozzleVelocity: number;
  hhpBit: number;
  hsi: number;
  jetImpact: number;
  bitFraction: number;
  annularVelocityOpenFtMin: number;
  annularVelocityCasedFtMin: number;
  valid: boolean;
}

export function circulatingSystem(s: SystemInput): SystemResult {
  const dpLen = Math.max(0, s.depth - s.dcLen);
  const cased = Math.min(s.shoe, dpLen);
  const openDp = Math.max(0, dpLen - cased);
  const { pv, yp } = binghamParams(s.rheo);

  const pipeFn = (dIn: number, len: number): SegmentResult =>
    s.model === "bingham"
      ? binghamPipe({ gpm: s.gpm, dIn, rho: s.mw, pv, yp, lengthFt: len })
      : powerLawPipe({ gpm: s.gpm, dIn, rho: s.mw, rheo: s.rheo, lengthFt: len });
  const annFn = (holeIn: number, pipeIn: number, len: number): SegmentResult =>
    s.model === "bingham"
      ? binghamAnnulus({ gpm: s.gpm, holeIn, pipeIn, rho: s.mw, pv, yp, lengthFt: len })
      : powerLawAnnulus({ gpm: s.gpm, holeIn, pipeIn, rho: s.mw, rheo: s.rheo, lengthFt: len });

  const pipe = pipeFn(s.dpIdIn, dpLen);
  const collars = pipeFn(s.dcIdIn, s.dcLen);
  const annDcOpen = annFn(s.holeIn, s.dcOdIn, s.dcLen);
  const annDpOpen = annFn(s.holeIn, s.dpOdIn, openDp);
  const annDpCased = annFn(s.casingIdIn, s.dpOdIn, cased);

  const surface = s.surfaceRefPsi * Math.pow(s.gpm / 450, 1.86) * (s.mw / 12);
  const tfa = totalFlowArea(s.nozzles32);
  const bit = bitPressureDrop(s.mw, s.gpm, tfa, s.cd);
  const annulus = annDcOpen.dp + annDpOpen.dp + annDpCased.dp;
  const parasitic = surface + pipe.dp + collars.dp + annulus;
  const total = parasitic + bit;
  const hh = bitHhp(bit, s.gpm);

  const valid = [total, annulus, bit].every(Number.isFinite) && s.holeIn > s.dcOdIn && s.holeIn > s.dpOdIn && s.casingIdIn > s.dpOdIn && s.dpIdIn < s.dpOdIn && s.dcIdIn < s.dcOdIn;

  return {
    surface,
    pipe,
    collars,
    annDcOpen,
    annDpOpen,
    annDpCased,
    annulus,
    bit,
    parasitic,
    total,
    ecd: ecdPpg(s.mw, annulus, s.depth),
    tfa,
    nozzleVelocity: nozzleVelocity(s.gpm, tfa),
    hhpBit: hh,
    hsi: hsi(hh, s.holeIn),
    jetImpact: jetImpactForce(s.mw, s.gpm, bit, s.cd),
    bitFraction: total > 0 ? bit / total : 0,
    annularVelocityOpenFtMin: annDpOpen.velocity * 60,
    annularVelocityCasedFtMin: annDpCased.velocity * 60,
    valid,
  };
}

/** Simulyator və vizual üçün ortaq sabit həndəsə */
export const DEFAULT_GEOMETRY = {
  holeIn: 8.5,
  casingIdIn: 8.681,
  dpOdIn: 5,
  dpIdIn: 4.276,
  dcOdIn: 6.5,
  dcIdIn: 2.813,
  dcLen: 600,
};
