// Qazma problemləri və NPT: sadələşdirilmiş təhsil modelləri (oilfield vahidləri).

export const PSI_PER_FT_PER_PPG = 0.052;
const STEEL_E = 30e6; // psi
const STEEL_LB_PER_IN2_FT = 3.4; // 1 in² polad = 3.4 lb/ft

/** Overbalance: ΔP = 0.052·(MW − Pf_ppg)·TVD  [psi] */
export function overbalancePsi(mw: number, pfPpg: number, tvd: number) {
  return PSI_PER_FT_PER_PPG * (mw - pfPpg) * tvd;
}
/** Boru ilə divar arasındakı əlaqə sahəsi, in²: uzunluq (ft) × 12 × en (in). */
export function contactAreaIn2(lengthFt: number, widthIn: number) {
  return lengthFt * 12 * widthIn;
}
/** Differensial yapışma qüvvəsi: F = ΔP · A · μ  [lb] */
export function diffStickForceLb(dpPsi: number, areaIn2: number, mu: number) {
  return Math.max(0, dpPsi) * areaIn2 * mu;
}
/** Free point: L = 735,294 · e · W / P  [ft]; e: uzanma (in), W: boru çəkisi (lb/ft), P: əlavə dartma (lb) */
export function freePointFt(stretchIn: number, weightLbFt: number, pullLb: number) {
  return (STEEL_E / 12 / STEEL_LB_PER_IN2_FT) * stretchIn * weightLbFt / pullLb;
}
/** Verilmiş free point üçün gözlənilən uzanma, in: e = P·L / (735,294·W) */
export function stretchForFreePointIn(freePoint: number, weightLbFt: number, pullLb: number) {
  return (pullLb * freePoint) / ((STEEL_E / 12 / STEEL_LB_PER_IN2_FT) * weightLbFt);
}

/** Annulus sürəti, ft/dəq: Va = 24.51·Q/(Dh² − Dp²) */
export function annularVelocityFtMin(qGpm: number, dhIn: number, dpIn: number) {
  return (24.51 * qGpm) / (dhIn * dhIn - dpIn * dpIn);
}
/** Transport nisbəti Ft = (Va − Vs)/Va */
export function transportRatio(va: number, vslip: number) {
  return va > 0 ? (va - vslip) / va : 0;
}
/** Quyu mailliyindən və fırlanmadan asılı effektiv slip sürəti (təhsil modeli). */
export function effectiveSlipFtMin(baseSlip: number, incDeg: number, rpm: number) {
  const s = Math.sin((incDeg * Math.PI) / 180);
  const incFactor = 1 + 0.9 * s; // maili hissədə cuttings divara çökür
  const rotFactor = 1 - 0.35 * Math.min(1, rpm / 150); // fırlanma yatağı pozur
  return baseSlip * incFactor * rotFactor;
}
/** Annulusda cuttings konsentrasiyası, %: C = 100·ROP·Dh²/(1471·Q·Ft) */
export function cuttingsConcPct(ropFtHr: number, dhIn: number, qGpm: number, ft: number) {
  if (qGpm <= 0 || ft <= 0) return Infinity;
  return (100 * ropFtHr * dhIn * dhIn) / (1471 * qGpm * ft);
}
/** Minimum Q (gpm), konsentrasiya hədd %-ni aşmasın deyə */
export function minFlowForConcGpm(ropFtHr: number, dhIn: number, ft: number, limitPct: number) {
  return (100 * ropFtHr * dhIn * dhIn) / (1471 * ft * limitPct);
}

/** ECD = MW + APL/(0.052·TVD) */
export function ecdPpg(mw: number, aplPsi: number, tvd: number) {
  return mw + aplPsi / (PSI_PER_FT_PER_PPG * tvd);
}
/** Quyu tam itki yaşadıqda məhlul səviyyəsinin düşməsi: formasiya təzyiqi ilə tarazlaşana qədər, ft */
export function levelDropFt(tvd: number, mw: number, pfPpg: number) {
  return Math.max(0, tvd - (pfPpg * tvd) / mw);
}
/** Səviyyə düşəndə dibdə hidrostatik azalma, psi */
export function hydroLossPsi(mw: number, dropFt: number) {
  return PSI_PER_FT_PER_PPG * mw * dropFt;
}
export type LossClass = "yoxdur" | "seepage" | "qismən" | "ciddi" | "tam";
/** Loss sürətinə görə təsnifat (bbl/saat), tipik sənaye həddləri */
export function lossClass(bblHr: number): LossClass {
  if (bblHr <= 0) return "yoxdur";
  if (bblHr < 10) return "seepage";
  if (bblHr < 100) return "qismən";
  if (bblHr < 500) return "ciddi";
  return "tam";
}
/** Sadə itki modeli: ECD çat təzyiqini keçdikdə itki sürəti ~ k·(ECD − FG) (bbl/saat) */
export function lossRateBblHr(ecd: number, fgPpg: number, k: number) {
  return Math.max(0, (ecd - fgPpg) * k);
}

/** NPT faizi */
export function nptPct(nptDays: number, totalDays: number) {
  return totalDays > 0 ? (100 * nptDays) / totalDays : 0;
}
/** NPT dəyəri, min $ */
export function nptCostK(nptDays: number, spreadRateKPerDay: number) {
  return nptDays * spreadRateKPerDay;
}
/** Fishing və ya sidetrack qərarı: gözlənilən dəyər (min $).
 *  fishing uğurlu olmazsa sidetrack da edilir. */
export function expectedFishCostK(fishCostK: number, pSuccess: number, sidetrackCostK: number) {
  return fishCostK + (1 - pSuccess) * sidetrackCostK;
}
/** Fishing-in sidetrack-dan ucuz olması üçün minimal uğur ehtimalı */
export function breakEvenSuccess(fishCostK: number, sidetrackCostK: number) {
  return sidetrackCostK > 0 ? Math.min(1, Math.max(0, fishCostK / sidetrackCostK)) : 1;
}
