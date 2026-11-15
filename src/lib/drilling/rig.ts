// Rig sistemləri: hoisting, circulating və trip hesablamaları (field units).
// Mənbə əsasları: Bourgoyne et al., "Applied Drilling Engineering"; API RP 9B (drilling line); API RP 13D.

// ---------- Hoisting: block & tackle ----------

/** Sheave sürtünmə əmsalı (roller bearing üçün tipik 1.04) */
export const SHEAVE_K = 1.04;

/** N xətt üçün hoisting sistemi səmərəliliyi: E = (K^N − 1) / (N·K^N·(K − 1)) */
export function hoistingEfficiency(lines: number, k = SHEAVE_K) {
  return (Math.pow(k, lines) - 1) / (lines * Math.pow(k, lines) * (k - 1));
}

export interface HoistingResult {
  efficiency: number;
  fastLineTension: number; // lbf
  deadLineTension: number; // lbf (statik, W/N)
  derrickLoad: number; // lbf
  hookPowerHp: number;
  drawworksPowerHp: number;
  designFactor: number | null; // line breaking strength / fast line tension
}

/**
 * hookLoad: lbf, lines: xətlərin sayı, blockSpeed: ft/dəq,
 * lineBreakingStrength: lbf (ixtiyari, design factor üçün)
 */
export function hoisting(p: { hookLoad: number; lines: number; blockSpeed: number; lineBreakingStrength?: number }): HoistingResult {
  const E = hoistingEfficiency(p.lines);
  const fast = p.hookLoad / (E * p.lines);
  const dead = p.hookLoad / p.lines;
  const derrick = p.hookLoad + fast + dead;
  const hookHp = (p.hookLoad * p.blockSpeed) / 33000;
  return {
    efficiency: E,
    fastLineTension: fast,
    deadLineTension: dead,
    derrickLoad: derrick,
    hookPowerHp: hookHp,
    drawworksPowerHp: hookHp / E,
    designFactor: p.lineBreakingStrength ? p.lineBreakingStrength / fast : null,
  };
}

// ---------- Circulating ----------

/** Triplex nasos çıxışı (100% səmərəlilik): 0.000243·D²·L bbl/strok (D, L: in) */
export const triplexBblPerStroke = (linerIn: number, strokeIn: number, volEff = 1) =>
  0.000243 * linerIn * linerIn * strokeIn * volEff;

export const gpmFromPump = (bblPerStroke: number, spm: number) => bblPerStroke * 42 * spm;

/** Hidravlik güc: HHP = P[psi]·Q[gpm]/1714 */
export const hydraulicHp = (pressurePsi: number, gpm: number) => (pressurePsi * gpm) / 1714;

/** Boru tutumu (bbl/ft): ID²/1029.4 */
export const capacityBblFt = (idIn: number) => (idIn * idIn) / 1029.4;
/** Boru yerdəyişməsi (açıq uc, bbl/ft): (OD² − ID²)/1029.4 */
export const displacementBblFt = (odIn: number, idIn: number) => (odIn * odIn - idIn * idIn) / 1029.4;
/** Halqa tutumu (bbl/ft): (Dh² − Dp²)/1029.4 */
export const annularCapacityBblFt = (holeIn: number, pipeOdIn: number) => (holeIn * holeIn - pipeOdIn * pipeOdIn) / 1029.4;
/** Halqada sürət (ft/dəq): 24.51·Q/(Dh² − Dp²) */
export const annularVelocityFtMin = (gpm: number, holeIn: number, pipeOdIn: number) =>
  (24.51 * gpm) / (holeIn * holeIn - pipeOdIn * pipeOdIn);

/** Bottoms-up vaxtı (dəq) = halqa həcmi (bbl) / (gpm/42) */
export const bottomsUpMinutes = (annularVolumeBbl: number, gpm: number) => annularVolumeBbl / (gpm / 42);

// ---------- Trip ----------

/** Trip tank: çəkilən boru üçün quyuya qayıtmalı həcm. wet=true: boru məhlulla dolu çəkilir (içindəki məhlul da qayıdır) */
export function tripFillBbl(p: { odIn: number; idIn: number; lengthFt: number; wet: boolean }) {
  const perFt = displacementBblFt(p.odIn, p.idIn) + (p.wet ? capacityBblFt(p.idIn) : 0);
  return perFt * p.lengthFt;
}

// ---------- Akkumulyator ----------

/** İstifadə oluna bilən həcm (Boyle): V·(Ppre/Pmin − Ppre/Pmax) */
export function accumulatorUsableGal(p: { bottleGal: number; bottles: number; precharge: number; minPressure: number; maxPressure: number }) {
  return p.bottleGal * p.bottles * (p.precharge / p.minPressure - p.precharge / p.maxPressure);
}
