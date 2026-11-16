// Torque & Drag: soft-string (Johancsik et al., 1984) modeli, field units.
// Yaxınlaşmalar: string kabel kimi davranır (əyilmə sərtliyi yoxdur), quyu divarı ilə davamlı kontakt,
// Coulomb sürtünməsi, buckling modelləşdirilmir (sıxılma hesabı yalnız göstərici kimi), planar trayektoriya.
import { steelWeightPerFt, crossSectionIn2, buoyancy } from "./drillstring";

export type TdMode = "pickup" | "slackoff" | "rotate" | "drilling";

export interface Station {
  md: number; // ft
  inc: number; // radian (şaquli oxdan)
  tvd: number;
  hd: number; // horizontal departure
}

export interface TrajectoryInput {
  kop: number; // ft MD
  burDegPer100: number; // build rate
  maxIncDeg: number;
  td: number; // ft MD
  dropStart?: number; // ft MD (S-tipli)
  dropRateDegPer100?: number;
  finalIncDeg?: number;
  step?: number;
}

export function buildTrajectory(t: TrajectoryInput): Station[] {
  const step = t.step ?? 30;
  const toRad = Math.PI / 180;
  const incAt = (md: number) => {
    let inc = md <= t.kop ? 0 : Math.min(t.maxIncDeg, ((md - t.kop) * t.burDegPer100) / 100);
    if (t.dropStart !== undefined && t.dropRateDegPer100 !== undefined && md > t.dropStart) {
      const fin = t.finalIncDeg ?? 0;
      inc = Math.max(fin, Math.min(inc, t.maxIncDeg) - ((md - t.dropStart) * t.dropRateDegPer100) / 100);
    }
    return inc * toRad;
  };
  const st: Station[] = [{ md: 0, inc: 0, tvd: 0, hd: 0 }];
  for (let md = step; md < t.td + 1e-9; md += step) {
    const prev = st[st.length - 1];
    const inc = incAt(md);
    const avg = (inc + prev.inc) / 2;
    st.push({ md, inc, tvd: prev.tvd + step * Math.cos(avg), hd: prev.hd + step * Math.sin(avg) });
  }
  const last = st[st.length - 1];
  if (last.md < t.td) {
    const inc = incAt(t.td);
    const d = t.td - last.md;
    const avg = (inc + last.inc) / 2;
    st.push({ md: t.td, inc, tvd: last.tvd + d * Math.cos(avg), hd: last.hd + d * Math.sin(avg) });
  }
  return st;
}

export interface TdElement {
  name: "dc" | "hwdp" | "dp";
  length: number; // ft (bit-dən yuxarı)
  wAir: number; // lb/ft
  contactOdIn: number; // torque üçün kontakt diametri
}

export interface TdInput {
  stations: Station[];
  elements: TdElement[]; // aşağıdan yuxarı
  mwPpg: number;
  muCased: number;
  muOpen: number;
  shoeMd: number;
  mode: TdMode;
  wob: number; // lbf (drilling)
  bitTorque: number; // ft·lbf (drilling)
}

export interface TdResult {
  md: number[]; // bit-dən səthə doğru azalan md (stations sırası ilə)
  force: number[]; // lbf, + dartma
  torque: number[]; // ft·lbf
  topForce: number;
  topTorque: number;
  /** md[i] üçün bit-dən məsafə */
  fromBit: number[];
}

function elementAt(elements: TdElement[], distFromBit: number): TdElement {
  let cum = 0;
  for (const e of elements) {
    cum += e.length;
    if (distFromBit <= cum) return e;
  }
  return elements[elements.length - 1];
}

/** Bit-dən səthə doğru hesablama. stations son nöqtəsi = bit (TD). */
export function torqueDrag(p: TdInput): TdResult {
  const bf = buoyancy(p.mwPpg);
  const n = p.stations.length;
  const md: number[] = [];
  const force: number[] = [];
  const torque: number[] = [];
  const fromBit: number[] = [];

  let F = p.mode === "drilling" ? -p.wob : 0;
  let T = p.mode === "drilling" ? p.bitTorque : 0;
  md.push(p.stations[n - 1].md);
  force.push(F);
  torque.push(T);
  fromBit.push(0);

  for (let i = n - 1; i > 0; i--) {
    const lo = p.stations[i];
    const up = p.stations[i - 1];
    const dL = lo.md - up.md;
    const alpha = (lo.inc + up.inc) / 2;
    const dAlpha = up.inc - lo.inc; // yuxarı getdikcə dəyişmə
    const mid = (lo.md + up.md) / 2;
    const dist = (p.stations[n - 1].md - mid);
    const el = elementAt(p.elements, dist);
    const wb = el.wAir * bf;
    const N = Math.abs(F * dAlpha + wb * dL * Math.sin(alpha)); // planar (Δφ = 0)
    const mu = mid <= p.shoeMd ? p.muCased : p.muOpen;
    const fric = mu * N;
    const wAxial = wb * dL * Math.cos(alpha);

    if (p.mode === "pickup") F += wAxial + fric;
    else if (p.mode === "slackoff") F += wAxial - fric;
    else F += wAxial; // rotating: aksial sürtünmə ≈ 0

    if (p.mode === "rotate" || p.mode === "drilling") T += fric * (el.contactOdIn / 2 / 12);

    md.push(up.md);
    force.push(F);
    torque.push(T);
    fromBit.push(p.stations[n - 1].md - up.md);
  }
  return { md, force, torque, topForce: F, topTorque: T, fromBit };
}

// ---------- Tək element, capstan, kritik bucaq ----------

export function segmentForces(p: { wb: number; dL: number; incDeg: number; F: number; dIncDeg: number; mu: number }) {
  const a = (p.incDeg * Math.PI) / 180;
  const da = (p.dIncDeg * Math.PI) / 180;
  const N = Math.abs(p.F * da + p.wb * p.dL * Math.sin(a));
  const fric = p.mu * N;
  const w = p.wb * p.dL * Math.cos(a);
  return { N, fric, wAxial: w, dFpickup: w + fric, dFslack: w - fric };
}

export const capstanOut = (fIn: number, thetaDeg: number, mu: number, pickup: boolean) => fIn * Math.exp((pickup ? 1 : -1) * mu * ((thetaDeg * Math.PI) / 180));
/** Düz maili hissədə öz çəkisi ilə sürüşmə həddi: tan(α) = 1/μ */
export const criticalInclinationDeg = (mu: number) => (Math.atan(1 / mu) * 180) / Math.PI;

// ---------- Torsiya və buckling ----------

export const polarMomentIn4 = (od: number, id: number) => (Math.PI / 32) * (Math.pow(od, 4) - Math.pow(id, 4));
/** Torsiya axma həddi: Q = 0.096167·J·σ_y/OD  [ft·lbf] */
export const torsionalYield = (od: number, id: number, yieldPsi: number) => (0.096167 * polarMomentIn4(od, id) * yieldPsi) / od;
/** Dartma altında torsiya tutumu (von Mises): Q·√(1 − (F/(σ_y·A))²) */
export function combinedTorqueCapacity(od: number, id: number, yieldPsi: number, tensionLbf: number) {
  const ratio = tensionLbf / (yieldPsi * crossSectionIn2(od, id));
  if (Math.abs(ratio) >= 1) return 0;
  return torsionalYield(od, id, yieldPsi) * Math.sqrt(1 - ratio * ratio);
}

/** Dawson–Paslay sinusoidal buckling: F_s = 2·√(E·I·w_b·sinα / r)   (lbf; w_b lb/in, r in) */
export function sinusoidalBucklingLbf(p: { od: number; id: number; wAirPerFt: number; mwPpg: number; holeIn: number; incDeg: number }) {
  const E = 30e6;
  const I = (Math.PI / 64) * (Math.pow(p.od, 4) - Math.pow(p.id, 4));
  const wb = (p.wAirPerFt * buoyancy(p.mwPpg)) / 12;
  const r = (p.holeIn - p.od) / 2;
  return 2 * Math.sqrt((E * I * wb * Math.sin((p.incDeg * Math.PI) / 180)) / r);
}
/** Helical buckling ≈ 2√2 · sinusoidal */
export const helicalBucklingLbf = (sinusoidal: number) => 2 * Math.SQRT2 * sinusoidal;

export { steelWeightPerFt };
