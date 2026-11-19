// Qazma iqtisadiyyatı: sadələşdirilmiş təhsil modelləri. Pul vahidi: min $ (k$), vaxt: saat/gün.

export interface SectionPlan {
  feet: number;
  ropFtHr: number;
  standFt: number;
  connHr: number; // hər bağlantı üçün saat
  tripHr: number; // bu bölmədə ümumi trip saatı
  casingHr: number; // casing + sement + BOP işi, saat
  otherHr: number; // logging, rig-up, test və s.
}

export function sectionHours(p: SectionPlan) {
  const drillH = p.ropFtHr > 0 ? p.feet / p.ropFtHr : 0;
  const connH = p.standFt > 0 ? Math.ceil(p.feet / p.standFt) * p.connHr : 0;
  const total = drillH + connH + p.tripHr + p.casingHr + p.otherHr;
  return { drillH, connH, tripH: p.tripHr, casingH: p.casingHr, otherH: p.otherHr, totalH: total, days: total / 24 };
}

/** Vaxta bağlı xərc, k$ */
export const timeCostK = (days: number, spreadKPerDay: number) => days * spreadKPerDay;
/** AFE: sətirlərin cəmi + contingency, k$ */
export const sumK = (lines: number[]) => lines.reduce((a, b) => a + b, 0);
export const afeWithContingencyK = (baseK: number, contingencyPct: number) => baseK * (1 + contingencyPct / 100);
/** Dərinlik başına xərc, $/ft (k$ girişi) */
export const costPerFootWell = (totalK: number, feet: number) => (feet > 0 ? (totalK * 1000) / feet : 0);

/** Bit run xərc/ft: (Cb + R·(td + tc + tt)) / F; R: $/saat, vaxtlar saatla */
export function bitRunCostPerFoot(bitCost: number, rigRateKPerDay: number, tDrillH: number, tConnH: number, tTripH: number, feet: number) {
  const perHour = (rigRateKPerDay * 1000) / 24;
  return feet > 0 ? (bitCost + perHour * (tDrillH + tConnH + tTripH)) / feet : 0;
}

/** Learning curve: D_n = D_1 · n^(log2 LR), LR: 0.9 = hər ikiləşmədə 10% azalma */
export function learningDays(d1: number, n: number, lr: number, floorDays = 0) {
  const b = Math.log2(lr);
  return Math.max(floorDays, d1 * Math.pow(Math.max(1, n), b));
}

export const triMean = (a: number, m: number, b: number) => (a + m + b) / 3;
/** Üçbucaq paylanmanın tərs CDF-i */
export function triSample(u: number, a: number, m: number, b: number) {
  if (b <= a) return a;
  const fc = (m - a) / (b - a);
  return u < fc ? a + Math.sqrt(u * (b - a) * (m - a)) : b - Math.sqrt((1 - u) * (b - a) * (b - m));
}
export function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
export interface RiskItem { min: number; likely: number; max: number }
/** Monte Carlo: sətirlərin cəmi (sıralanmış massiv). Sətirlər müstəqil götürülür. */
export function monteCarlo(items: RiskItem[], n = 4000, seed = 12345) {
  const rnd = mulberry32(seed);
  const out: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (const it of items) s += triSample(rnd(), it.min, it.likely, it.max);
    out[i] = s;
  }
  return out.sort((a, b) => a - b);
}
/** p: 0..1. P10 (az ehtimallı aşağı) = percentile(0.1) */
export function percentile(sorted: number[], p: number) {
  if (!sorted.length) return 0;
  const i = Math.min(sorted.length - 1, Math.max(0, Math.round(p * (sorted.length - 1))));
  return sorted[i];
}

/** EMV = Pg · PV − Cost, k$ */
export const emvK = (pg: number, pvK: number, costK: number) => pg * pvK - costK;
/** EMV = 0 üçün minimal uğur ehtimalı */
export const breakEvenPg = (pvK: number, costK: number) => (pvK > 0 ? Math.min(1, costK / pvK) : 1);
