// Well control: field units (psi, ppg, ft, bbl). Təhsil məqsədli sadələşdirilmiş modellər.
// Qaz idealdır (Z = 1, sabit temperatur), quyu şaquli sayılır, influx tək pilləli annulusda yerləşir.

export const PSI_PER_FT_PER_PPG = 0.052;
export const ATM_PSI = 14.7;

export const hydroPsi = (ppg: number, tvd: number) => PSI_PER_FT_PER_PPG * ppg * tvd;

/** Formasiya təzyiqi = hidrostatik + SIDPP. */
export const formationPressurePsi = (mw: number, tvd: number, sidpp: number) => hydroPsi(mw, tvd) + sidpp;

/** Formasiya təzyiqinin ekvivalent məhlul çəkisi (ppg). */
export const formationEmw = (mw: number, tvd: number, sidpp: number) => formationPressurePsi(mw, tvd, sidpp) / (PSI_PER_FT_PER_PPG * tvd);

/** Kill mud weight (ppg), trip marjası olmadan. */
export const killMudPpg = (mw: number, sidpp: number, tvd: number) => mw + sidpp / (PSI_PER_FT_PER_PPG * tvd);

/** İlkin sirkulyasiya təzyiqi: SIDPP + yavaş nasos təzyiqi. */
export const icpPsi = (sidpp: number, scrPsi: number) => sidpp + scrPsi;

/** Son sirkulyasiya təzyiqi: SCR təzyiqi · KMW / MW. */
export const fcpPsi = (scrPsi: number, kmw: number, mw: number) => (scrPsi * kmw) / mw;

export const strokesFor = (volumeBbl: number, outputBblPerStroke: number) => (outputBblPerStroke > 0 ? volumeBbl / outputBblPerStroke : NaN);

export interface SchedulePoint {
  strokes: number;
  pressure: number;
}

/** Wait & Weight: DP təzyiqi ICP-dən FCP-yə xətti azalır (strokes-to-bit boyu), sonra FCP sabit. */
export function waitAndWeightSchedule(icp: number, fcp: number, strokesToBit: number, strokesTotal: number, points = 11): SchedulePoint[] {
  const out: SchedulePoint[] = [];
  for (let i = 0; i < points; i++) {
    const s = (strokesToBit * i) / (points - 1);
    out.push({ strokes: s, pressure: icp - ((icp - fcp) * s) / strokesToBit });
  }
  if (strokesTotal > strokesToBit) out.push({ strokes: strokesTotal, pressure: fcp });
  return out;
}

/** DP təzyiqi: verilmiş stroke-da Wait & Weight cədvəli. */
export const wwPressureAt = (strokes: number, icp: number, fcp: number, strokesToBit: number) =>
  strokes <= strokesToBit ? icp - ((icp - fcp) * Math.max(0, strokes)) / strokesToBit : fcp;

/** Driller's method: 1-ci sirkulyasiya ICP sabit; 2-ci sirkulyasiyada KMW ilə ICP → FCP. */
export function drillersPressureAt(strokes: number, icp: number, fcp: number, strokesToBit: number, strokesAnnulus: number) {
  if (strokes <= strokesAnnulus) return icp; // 1-ci sirkulyasiya: influx çıxarılır, orijinal MW
  const s2 = strokes - strokesAnnulus; // 2-ci sirkulyasiya: KMW
  return wwPressureAt(s2, icp, fcp, strokesToBit);
}

/** Influx hündürlüyü (ft): pit gain / annulus tutumu. */
export const influxLengthFt = (pitGainBbl: number, annCapBblFt: number) => (annCapBblFt > 0 ? pitGainBbl / annCapBblFt : NaN);

/** Influx qradiyenti (psi/ft). */
export const influxGradient = (mw: number, sicp: number, sidpp: number, lengthFt: number) =>
  PSI_PER_FT_PER_PPG * mw - (sicp - sidpp) / lengthFt;

export function influxType(gradPsiFt: number) {
  if (!Number.isFinite(gradPsiFt)) return "naməlum";
  if (gradPsiFt < 0.25) return "qaz";
  if (gradPsiFt < 0.4) return "neft / qaz-neft qarışığı";
  return "su (duzlu su)";
}

/** SICP = SIDPP + (MW qradiyenti − influx qradiyenti) · Lk. */
export const sicpFor = (mw: number, sidpp: number, gradPsiFt: number, lengthFt: number) => sidpp + (PSI_PER_FT_PER_PPG * mw - gradPsiFt) * lengthFt;

/** MAASP = (FG − MW) · 0.052 · TVD_shoe. */
export const maasp = (fgPpg: number, mw: number, shoeTvd: number) => (fgPpg - mw) * PSI_PER_FT_PER_PPG * shoeTvd;

/** Shut-in zamanı shoe-da ekvivalent çəki (ppg). Influx shoe-dan aşağıda sayılır. */
export const shoeEmwShutIn = (mw: number, shoeTvd: number, sicp: number) => mw + sicp / (PSI_PER_FT_PER_PPG * shoeTvd);

export interface KickTolInput {
  td: number;
  shoe: number;
  mw: number;
  fgPpg: number;
  kickLenFt: number;
  gasGrad: number;
}

/**
 * Kick tolerance (intensity, ppg): shoe çatmadan bağlana bilən maksimum kick intensivliyi.
 * Pf_max = P_frac(shoe) + g·Lk + 0.052·MW·(TD − shoe − Lk);  intensity = Pf_max/(0.052·TD) − MW.
 */
export function kickToleranceIntensity(p: KickTolInput) {
  const pFrac = PSI_PER_FT_PER_PPG * p.fgPpg * p.shoe;
  const lk = Math.min(p.kickLenFt, p.td - p.shoe);
  const pfMax = pFrac + p.gasGrad * lk + PSI_PER_FT_PER_PPG * p.mw * (p.td - p.shoe - lk);
  return pfMax / (PSI_PER_FT_PER_PPG * p.td) - p.mw;
}

/** Shoe-da təzyiq (psi) verilmiş SIDPP və kick uzunluğu üçün (kick shoe-dan aşağıdadır). */
export function shoePressureShutIn(p: { td: number; shoe: number; mw: number; sidpp: number; kickLenFt: number; gasGrad: number }) {
  const pf = formationPressurePsi(p.mw, p.td, p.sidpp);
  const lk = Math.min(p.kickLenFt, p.td - p.shoe);
  return pf - (p.gasGrad * lk + PSI_PER_FT_PER_PPG * p.mw * (p.td - p.shoe - lk));
}

/** Boyle: P1·V1 = P2·V2. */
export const gasVolumeAt = (v1: number, p1: number, p2: number) => (v1 * p1) / p2;

/** Açıq (qaz sərbəst genişlənir, səth təzyiqi 0) quyuda d dərinliyində qaz həcmi. */
export const gasVolumeAtDepth = (v1: number, p1: number, mw: number, depth: number, backPressure = 0) =>
  gasVolumeAt(v1, p1, hydroPsi(mw, depth) + backPressure + ATM_PSI);

/** Bağlı quyuda qaz miqrasiyası nəticəsində səth təzyiqinin artımı (psi). */
export const migrationPressureRise = (mw: number, migratedFt: number) => PSI_PER_FT_PER_PPG * mw * migratedFt;

/** Barit ilə çəki artırma: 100 bbl üçün 100 lb kisə sayı. */
export const bariteSacksPer100Bbl = (w1: number, w2: number) => (1490 * (w2 - w1)) / (35.8 - w2);

export const circulationMinutes = (strokes: number, spm: number) => (spm > 0 ? strokes / spm : NaN);
