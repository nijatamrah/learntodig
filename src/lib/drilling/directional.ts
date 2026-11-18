// Directional drilling: field units (ft, deg, deg/100 ft).
// Minimum curvature metodu (sənaye standartı), build-and-hold planı, toolface həlli, bending stress, anti-collision.
// Azimut həqiqi şimaldan (true north), saat əqrəbi istiqamətində ölçülür.

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;
export const BUILD_RADIUS_CONST = 5729.578; // 180/π · 100

export interface SurveyStation {
  md: number; // ft
  inc: number; // deg
  azi: number; // deg
}

export interface PathStation extends SurveyStation {
  tvd: number;
  north: number;
  east: number;
  vs: number; // vertical section (hədəf azimutu boyunca)
  dogleg: number; // deg, əvvəlki stansiya ilə
  dls: number; // deg/100 ft
}

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

/** İki stansiya arasında tam dogleg bucağı (deg). */
export function doglegDeg(i1: number, a1: number, i2: number, a2: number) {
  const c = Math.cos((i2 - i1) * D2R) - Math.sin(i1 * D2R) * Math.sin(i2 * D2R) * (1 - Math.cos((a2 - a1) * D2R));
  return Math.acos(clamp(c, -1, 1)) * R2D;
}

/** Ratio factor RF = (2/β)·tan(β/2), β radyanla. */
export function ratioFactor(betaDeg: number) {
  const b = betaDeg * D2R;
  return b < 1e-6 ? 1 : (2 / b) * Math.tan(b / 2);
}

export const dlsDegPer100 = (betaDeg: number, dMd: number) => (dMd > 0 ? (betaDeg * 100) / dMd : 0);

export interface StepResult {
  dTvd: number;
  dNorth: number;
  dEast: number;
  beta: number; // deg
  rf: number;
  dls: number;
}

/** Minimum curvature: iki stansiya arasında koordinat artımları. */
export function minCurvatureStep(s1: SurveyStation, s2: SurveyStation): StepResult {
  const dMd = s2.md - s1.md;
  const beta = doglegDeg(s1.inc, s1.azi, s2.inc, s2.azi);
  const rf = ratioFactor(beta);
  const i1 = s1.inc * D2R, i2 = s2.inc * D2R, a1 = s1.azi * D2R, a2 = s2.azi * D2R;
  return {
    dTvd: (dMd / 2) * (Math.cos(i1) + Math.cos(i2)) * rf,
    dNorth: (dMd / 2) * (Math.sin(i1) * Math.cos(a1) + Math.sin(i2) * Math.cos(a2)) * rf,
    dEast: (dMd / 2) * (Math.sin(i1) * Math.sin(a1) + Math.sin(i2) * Math.sin(a2)) * rf,
    beta,
    rf,
    dls: dlsDegPer100(beta, dMd),
  };
}

/** Tangential metod (yalnız aşağı stansiyanın bucağı): səhv göstərmək üçün müqayisə. */
export function tangentialStep(s1: SurveyStation, s2: SurveyStation) {
  const dMd = s2.md - s1.md;
  const i2 = s2.inc * D2R, a2 = s2.azi * D2R;
  return { dTvd: dMd * Math.cos(i2), dNorth: dMd * Math.sin(i2) * Math.cos(a2), dEast: dMd * Math.sin(i2) * Math.sin(a2) };
}

export const verticalSection = (north: number, east: number, targetAziDeg: number) =>
  north * Math.cos(targetAziDeg * D2R) + east * Math.sin(targetAziDeg * D2R);

export function closure(north: number, east: number) {
  const dist = Math.hypot(north, east);
  let azi = Math.atan2(east, north) * R2D;
  if (azi < 0) azi += 360;
  return { dist, azi };
}

/** Survey cədvəlindən minimum curvature ilə yol. İlk stansiya başlanğıc nöqtədir. */
export function surveyPath(stations: SurveyStation[], targetAziDeg = 0, start = { tvd: 0, north: 0, east: 0 }): PathStation[] {
  const out: PathStation[] = [];
  stations.forEach((s, i) => {
    if (i === 0) {
      out.push({ ...s, tvd: start.tvd, north: start.north, east: start.east, vs: verticalSection(start.north, start.east, targetAziDeg), dogleg: 0, dls: 0 });
      return;
    }
    const prev = out[i - 1];
    const r = minCurvatureStep(prev, s);
    const north = prev.north + r.dNorth;
    const east = prev.east + r.dEast;
    out.push({ ...s, tvd: prev.tvd + r.dTvd, north, east, vs: verticalSection(north, east, targetAziDeg), dogleg: r.beta, dls: r.dls });
  });
  return out;
}

/** Plan trayektoriyası: KOP-dan sonra build (və istəyə bağlı turn), maxInc-ə çatanda tangent. */
export interface PlanInput {
  kop: number;
  burDegPer100: number;
  turnDegPer100: number; // azimut dəyişmə sürəti, deg/100 ft (kop-dan sonra)
  maxInc: number;
  td: number;
  azi0: number;
  step?: number;
}

export function planSurvey(p: PlanInput): SurveyStation[] {
  const step = p.step ?? 100;
  const mds: number[] = [];
  for (let md = 0; md < p.td; md += step) mds.push(md);
  mds.push(p.td);
  if (p.kop > 0 && !mds.includes(p.kop)) mds.push(p.kop);
  mds.sort((a, b) => a - b);
  return mds.map((md) => {
    const sinceKop = Math.max(0, md - p.kop);
    const inc = Math.min(p.maxInc, (sinceKop * p.burDegPer100) / 100);
    const azi = p.azi0 + (sinceKop * p.turnDegPer100) / 100;
    return { md, inc, azi };
  });
}

/** Build-and-hold (Tip I) planı. D: hədəfə horizontal məsafə, tvd: hədəf TVD. */
export interface BuildHoldResult {
  radius: number;
  valid: boolean;
  tangentIncDeg: number;
  buildLen: number;
  tangentLen: number;
  totalMd: number;
  buildEndTvd: number;
  buildEndHd: number;
  dls: number;
  note?: string;
}

export function buildHold(p: { kop: number; burDegPer100: number; targetTvd: number; targetHd: number }): BuildHoldResult {
  const R = BUILD_RADIUS_CONST / p.burDegPer100;
  const Vt = p.targetTvd - p.kop;
  const D = p.targetHd;
  const bad = (note: string): BuildHoldResult => ({ radius: R, valid: false, tangentIncDeg: NaN, buildLen: NaN, tangentLen: NaN, totalMd: NaN, buildEndTvd: NaN, buildEndHd: NaN, dls: p.burDegPer100, note });
  if (!(p.burDegPer100 > 0) || Vt <= 0 || D < 0) return bad("Parametrlər düzgün deyil");
  const L = Math.hypot(D - R, Vt);
  if (L <= R) return bad("Hədəf build dairəsinin içindədir: BUR-u artır və ya KOP-u yuxarı qaldır");
  const theta = Math.acos(-R / L) - Math.atan2(Vt, D - R);
  if (theta > Math.PI / 2) return bad("Tangent bucağı 90°-dən böyükdür: bu BUR ilə hədəfə çatmaq olmur");
  if (!(theta > 0)) return bad("Hədəf üçün build lazım deyil");
  const buildLen = R * theta;
  const tangentLen = Math.sqrt(L * L - R * R);
  return {
    radius: R,
    valid: true,
    tangentIncDeg: theta * R2D,
    buildLen,
    tangentLen,
    totalMd: p.kop + buildLen + tangentLen,
    buildEndTvd: p.kop + R * Math.sin(theta),
    buildEndHd: R * (1 - Math.cos(theta)),
    dls: p.burDegPer100,
  };
}

/** Yeni inc/azi: başlanğıc (I1, A1), dogleg β və toolface TF (0 = high side, 90 = sağ, 180 = low side). */
export function applyToolface(i1: number, a1: number, betaDeg: number, tfDeg: number) {
  const I1 = i1 * D2R, b = betaDeg * D2R, tf = tfDeg * D2R;
  const cosI2 = Math.cos(I1) * Math.cos(b) - Math.sin(I1) * Math.sin(b) * Math.cos(tf);
  const I2 = Math.acos(clamp(cosI2, -1, 1));
  const dA = Math.atan2(Math.sin(b) * Math.sin(tf), Math.sin(I1) * Math.cos(b) + Math.cos(I1) * Math.sin(b) * Math.cos(tf));
  let azi = a1 + dA * R2D;
  azi = ((azi % 360) + 360) % 360;
  return { inc: I2 * R2D, azi, dInc: I2 * R2D - i1, dAzi: dA * R2D };
}

/** Bükülmə gərginliyi: σ_b = E·OD/(2R) ≈ 218.2 · OD · DLS (psi, OD in, DLS deg/100 ft). */
export const bendingStressPsi = (odIn: number, dls: number) => 218.2 * odIn * dls;
/** İcazə verilən DLS endurance limitinə görə. */
export const maxDlsForStress = (odIn: number, stressPsi: number) => stressPsi / (218.2 * odIn);

/** Anti-collision: mərkəz-mərkəz məsafənin birləşmiş qeyri-müəyyənlik radiusuna nisbəti. */
export const separationFactor = (centerToCenter: number, radius1: number, radius2: number) => centerToCenter / (radius1 + radius2);

/** MWD azimutunun düzəlişi: true = magnetic + declination (şərq müsbət). */
export const trueAzimuth = (magAzi: number, declinationEast: number) => (((magAzi + declinationEast) % 360) + 360) % 360;
