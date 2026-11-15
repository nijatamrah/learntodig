// Qazma məhlulu hesablamaları (field units). Mənbə əsasları: API RP 13B-1, 13D; Bourgoyne et al.

export const WATER_PPG = 8.33;
/** Polad sıxlığı (ppg) — buoyancy factor üçün */
export const STEEL_PPG = 65.5;

export const buoyancyFactor = (mwPpg: number) => 1 - mwPpg / STEEL_PPG;

export interface RheologyInput {
  t600: number;
  t300: number;
  t6: number;
  t3: number;
}

export interface RheologyResult {
  pv: number; // cP
  yp: number; // lb/100ft²
  av: number; // cP
  nPower: number;
  kPower: number; // ekv. cP
  tau0: number; // low-shear yield point
  nHB: number | null;
  kHB: number | null;
  valid: boolean;
}

export function rheology(r: RheologyInput): RheologyResult {
  const pv = r.t600 - r.t300;
  const yp = r.t300 - pv;
  const av = r.t600 / 2;
  const valid = r.t600 > r.t300 && r.t300 > 0 && r.t6 >= 0 && r.t3 >= 0;
  const nPower = valid ? 3.32 * Math.log10(r.t600 / r.t300) : NaN;
  const kPower = valid ? (510 * r.t300) / Math.pow(511, nPower) : NaN;
  const tau0 = Math.max(0, 2 * r.t3 - r.t6);
  const hbOk = valid && r.t300 > tau0 && r.t600 > tau0 && r.t600 - tau0 > r.t300 - tau0;
  const nHB = hbOk ? 3.32 * Math.log10((r.t600 - tau0) / (r.t300 - tau0)) : null;
  const kHB = hbOk && nHB !== null ? (510 * (r.t300 - tau0)) / Math.pow(511, nHB) : null;
  return { pv, yp, av, nPower, kPower, tau0, nHB, kHB, valid };
}

/** Dial oxunuşu (≈ lb/100ft²) modelləri, N = rpm. Bütün modellər 300 və 600 rpm-də ölçülmüş qiymətə uyğundur. */
export const binghamDial = (r: RheologyInput, rpm: number) => r.t300 - (r.t600 - r.t300) + ((r.t600 - r.t300) * rpm) / 300;
export const powerLawDial = (r: RheologyInput, rpm: number) => r.t300 * Math.pow(rpm / 300, Math.log2(r.t600 / r.t300));
export function herschelBulkleyDial(r: RheologyInput, rpm: number) {
  const tau0 = Math.max(0, 2 * r.t3 - r.t6);
  const n = Math.log2((r.t600 - tau0) / (r.t300 - tau0));
  return tau0 + (r.t300 - tau0) * Math.pow(rpm / 300, n);
}

// ---------- Ağırlaşdırma və seyrəltmə ----------

export const MATERIALS = {
  barite: { name: "Barit", ppg: 35.0 },
  hematite: { name: "Hematit", ppg: 41.7 },
  caco3: { name: "Kalsium karbonat", ppg: 22.5 },
} as const;
export type MaterialKey = keyof typeof MATERIALS;

/** Ağırlaşdırıcı: ilkin həcmin 100 bbl-i üçün 100 lb-lıq kisələrin sayı = 4200·ρ·(W2−W1)/(ρ−W2)/100 */
export function weightUp(p: { w1: number; w2: number; materialPpg: number; volumeBbl: number }) {
  if (p.w2 <= p.w1 || p.w2 >= p.materialPpg) return null;
  const lbPerBbl = (42 * p.materialPpg * (p.w2 - p.w1)) / (p.materialPpg - p.w2);
  const totalLb = lbPerBbl * p.volumeBbl;
  return {
    sacksPer100bbl: (lbPerBbl * 100) / 100,
    totalSacks: totalLb / 100,
    totalLb,
    volumeIncreaseBbl: totalLb / p.materialPpg / 42,
    lbPerBbl,
  };
}

/** Seyreltmə: əlavə olunan mayenin həcmi (bbl) — V1·(W1−W2)/(W2−Wadd) */
export function dilutionVolume(p: { v1: number; w1: number; w2: number; wAdd: number }) {
  if (p.w2 >= p.w1 || p.w2 <= p.wAdd) return null;
  return (p.v1 * (p.w1 - p.w2)) / (p.w2 - p.wAdd);
}

/** İki məhlulun qarışığı (idea: həcmlər additivdir) */
export const mixDensity = (v1: number, w1: number, v2: number, w2: number) => (v1 * w1 + v2 * w2) / (v1 + v2);
