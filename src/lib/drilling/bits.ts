// Bit-lər və ROP (field units). Mənbə əsasları:
//  - MSE: Teale (1965): MSE = WOB/A + 120π·N·T/(A·ROP)
//  - Bit torque və MSE modeli: Pessier & Fear (1992): T = μ·W·D/36, MSE = W/A + 13.33·μ·N·W/(D·ROP)
//  - Cost per foot: Bourgoyne et al. "Applied Drilling Engineering"
// Simulyator ROP modeli təhsil məqsədli, MSE-yə əsaslanan model + founder effektidir (empirik regressiya deyil).

export const bitArea = (dIn: number) => (Math.PI / 4) * dIn * dIn;
export const ropFromFootage = (feet: number, hours: number) => feet / hours;

/** Teale MSE (psi): WOB lbf, N rpm, T ft·lbf, ROP ft/hr, D in */
export function mse(p: { wob: number; dIn: number; rpm: number; torque: number; rop: number }) {
  const a = bitArea(p.dIn);
  return p.wob / a + (120 * Math.PI * p.rpm * p.torque) / (a * p.rop);
}
export const mseEfficiency = (ccsPsi: number, mseValue: number) => ccsPsi / mseValue;

/** Bit torque (ft·lbf): T = μ·W·D/36 */
export const bitTorque = (mu: number, wob: number, dIn: number) => (mu * wob * dIn) / 36;
/** Torque limiti ilə məhdudlaşan maksimum WOB */
export const maxWobForTorque = (tMax: number, mu: number, dIn: number) => (tMax * 36) / (mu * dIn);

export interface RopModelInput {
  wob: number; // lbf
  rpm: number;
  dIn: number;
  ccs: number; // psi
  mu: number;
  eta0: number; // maksimum səmərəlilik (0..1)
  founderWob: number; // lbf
  founderRpm: number;
}

/** Founder effekti: WOB və ya RPM həddi aşıldıqda səmərəlilik azalır (ROP təxminən həddin 10-15% üstündə maksimum verir) */
export function efficiency(p: RopModelInput) {
  const ew = Math.max(0, (p.wob - p.founderWob) / p.founderWob);
  const en = Math.max(0, (p.rpm - p.founderRpm) / p.founderRpm);
  return p.eta0 / (1 + 4 * ew * ew + 4 * en * en);
}

/** ROP = 13.33·μ·N·W / (D·(MSE − W/A)),  MSE = CCS/η */
export function ropModel(p: RopModelInput) {
  const eta = efficiency(p);
  const a = bitArea(p.dIn);
  const mseV = p.ccs / eta;
  const denom = p.dIn * (mseV - p.wob / a);
  const rop = denom > 0 ? ((40 / 3) * p.mu * p.rpm * p.wob) / denom : 0; // 40/3 = 13.33
  return { rop, eta, mse: mseV, torque: bitTorque(p.mu, p.wob, p.dIn) };
}

// ---------- Cost per foot ----------

export const costPerFoot = (p: { bitCost: number; rigRate: number; tDrill: number; tConn: number; tTrip: number; feet: number }) =>
  (p.bitCost + p.rigRate * (p.tDrill + p.tConn + p.tTrip)) / p.feet;

export interface DecayBit {
  bitCost: number;
  rigRate: number; // $/hr
  tripHours: number;
  r0: number; // ft/hr (başlanğıc ROP)
  k: number; // 1/hr (ROP azalma sürəti)
}

/** ROP(t) = R0·e^(−k·t);  F(t) = R0·(1 − e^(−k·t))/k;  CPF(t) = (Cb + Cr·(t + t_trip))/F(t) */
export const decayFootage = (b: DecayBit, t: number) => (b.r0 * (1 - Math.exp(-b.k * t))) / b.k;
export const decayCpf = (b: DecayBit, t: number) => (b.bitCost + b.rigRate * (t + b.tripHours)) / decayFootage(b, t);
export const decayRop = (b: DecayBit, t: number) => b.r0 * Math.exp(-b.k * t);

/** Optimum çıxarma vaxtı: Cr/ROP(t) = CPF(t)  ⇔  Cr·(e^(kt) − 1) = k·(Cb + Cr·(t + t_trip)) */
export function optimalPullTime(b: DecayBit) {
  const g = (t: number) => b.rigRate * (Math.exp(b.k * t) - 1) - b.k * (b.bitCost + b.rigRate * (t + b.tripHours));
  let lo = 1e-6;
  let hi = 2000;
  if (g(hi) < 0) return hi;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (g(mid) > 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

// ---------- IADC roller cone kodu ----------

export const IADC_SERIES: Record<number, string> = {
  1: "Dişli (milled tooth): yumşaq formasiya",
  2: "Dişli (milled tooth): orta formasiya",
  3: "Dişli (milled tooth): bərk formasiya",
  4: "Tungsten karbid insert (TCI): çox yumşaq formasiya",
  5: "Insert (TCI): yumşaq-orta formasiya",
  6: "Insert (TCI): orta formasiya",
  7: "Insert (TCI): orta-bərk formasiya",
  8: "Insert (TCI): çox bərk, abraziv formasiya",
};
export const IADC_TYPE: Record<number, string> = {
  1: "Seriyanın içində ən yumşaq alt qrup",
  2: "Yumşaq-orta alt qrup",
  3: "Orta-bərk alt qrup",
  4: "Seriyanın içində ən bərk alt qrup",
};
export const IADC_BEARING: Record<number, string> = {
  1: "Mühürsüz rolik yastığı",
  2: "Mühürsüz rolik yastığı, hava ilə soyudulan",
  3: "Rolik yastığı, gauge qorunması ilə",
  4: "Mühürlü rolik yastığı",
  5: "Mühürlü rolik yastığı, gauge qorunması ilə",
  6: "Mühürlü sürtünmə (journal) yastığı",
  7: "Mühürlü sürtünmə yastığı, gauge qorunması ilə",
  8: "Directional təyinatlı",
  9: "Digər",
};
