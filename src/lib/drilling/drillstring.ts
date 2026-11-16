// Drill string və BHA hesablamaları (field units, şaquli quyu).
// Mənbə əsasları: Bourgoyne et al., "Applied Drilling Engineering"; API RP 7G (dartma dizaynı üçün 0.9 əmsalı).

/** Polad: 490 lb/ft³ → w = (π/4)(OD² − ID²)/144 · 490 = 2.6725·(OD² − ID²)  [lb/ft] */
export const STEEL_LB_FT3 = 490;
export const STEEL_W_COEF = (Math.PI / 4 / 144) * STEEL_LB_FT3;
export const STEEL_PPG = 65.5;

export const steelWeightPerFt = (odIn: number, idIn: number) => STEEL_W_COEF * (odIn * odIn - idIn * idIn);
export const crossSectionIn2 = (odIn: number, idIn: number) => (Math.PI / 4) * (odIn * odIn - idIn * idIn);
export const buoyancy = (mwPpg: number) => 1 - mwPpg / STEEL_PPG;

/** Drill pipe dərəcələri: minimum axma həddi (psi) — API 5DP */
export const DP_GRADES = {
  E: { name: "E-75", yieldPsi: 75000 },
  X: { name: "X-95", yieldPsi: 95000 },
  G: { name: "G-105", yieldPsi: 105000 },
  S: { name: "S-135", yieldPsi: 135000 },
} as const;
export type DpGrade = keyof typeof DP_GRADES;

/** Nəzəri dartma axma qüvvəsi (lbf): T_y = σ_y · A */
export const tensileYield = (odIn: number, idIn: number, yieldPsi: number) => yieldPsi * crossSectionIn2(odIn, idIn);
/** İcazə verilən dartma: 0.9·T_y (API RP 7G dizayn əmsalı) */
export const allowableTension = (ty: number) => 0.9 * ty;

export interface StringSection {
  name: "dc" | "hwdp" | "dp";
  length: number; // ft
  wPerFt: number; // lb/ft (havada)
}

/** Neutral point: bit-dən məsafə (ft). WOB verilərək, bufer faktoru ilə. Yalnız bu hissələr alt-üst sırayla verilir: DC, HWDP, DP. */
export function neutralPointFromBit(sections: StringSection[], wob: number, bf: number): number | null {
  let cum = 0;
  let z = 0;
  for (const s of sections) {
    const segBuoyed = s.wPerFt * bf * s.length;
    if (cum + segBuoyed >= wob) {
      return z + (wob - cum) / (s.wPerFt * bf);
    }
    cum += segBuoyed;
    z += s.length;
  }
  return null; // WOB bütün string-dən böyükdür
}

/** Bit-dən z məsafədə eksenel qüvvə (lbf): mənfi = sıxılma, müsbət = dartma */
export function axialForceAt(sections: StringSection[], wob: number, bf: number, z: number) {
  let remaining = z;
  let w = 0;
  for (const s of sections) {
    const take = Math.min(remaining, s.length);
    w += s.wPerFt * take;
    remaining -= take;
    if (remaining <= 0) break;
  }
  return -wob + bf * w;
}

/** WOB üçün lazım olan DC uzunluğu: L = WOB·DF/(BF·w) */
export const requiredDcLength = (wob: number, designFactor: number, bf: number, wPerFt: number) => (wob * designFactor) / (bf * wPerFt);

export interface HookLoads {
  totalAir: number;
  offBottom: number; // lbf (buoyed)
  drilling: number; // lbf (WOB çıxılmış)
  topTension: number; // = offBottom (pick-up)
}

export function hookLoads(sections: StringSection[], wob: number, bf: number): HookLoads {
  const totalAir = sections.reduce((s, x) => s + x.wPerFt * x.length, 0);
  const off = totalAir * bf;
  return { totalAir, offBottom: off, drilling: off - wob, topTension: off };
}
