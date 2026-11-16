"use client";

import { useState } from "react";
import {
  IADC_BEARING,
  IADC_SERIES,
  IADC_TYPE,
  bitArea,
  bitTorque,
  costPerFoot,
  maxWobForTorque,
  mse,
  mseEfficiency,
} from "@/lib/drilling/bits";
import { Card, Note, Num, Out, fmt as f, ok } from "./CalcParts";

function Sel({ label, value, onChange, children }: { label: string; value: number; onChange: (v: number) => void; children: React.ReactNode }) {
  return (
    <label className="block mb-2.5">
      <span className="block text-[11px] text-[#8DA2BF] mb-1 font-['Space_Grotesk']">{label}</span>
      <select value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full bg-[#080C18] text-[#F0F4FF] text-[13px] rounded-lg px-3 py-2 outline-none border border-[rgba(255,255,255,0.08)]">
        {children}
      </select>
    </label>
  );
}

export default function BitsCalculators() {
  // MSE
  const [wob, setWob] = useState(30000);
  const [d, setD] = useState(8.5);
  const [rpm, setRpm] = useState(120);
  const [tq, setTq] = useState(2500);
  const [rop, setRop] = useState(60);
  const [ccs, setCcs] = useState(12000);
  // Torque / limit
  const [mu, setMu] = useState(0.5);
  const [tMax, setTMax] = useState(10000);
  // CPF
  const [rig, setRig] = useState(1500);
  const [aCost, setACost] = useState(18000);
  const [aDrill, setADrill] = useState(60);
  const [aConn, setAConn] = useState(3);
  const [aTrip, setATrip] = useState(14);
  const [aFeet, setAFeet] = useState(3200);
  const [bCost, setBCost] = useState(60000);
  const [bDrill, setBDrill] = useState(110);
  const [bConn, setBConn] = useState(5.5);
  const [bTrip, setBTrip] = useState(14);
  const [bFeet, setBFeet] = useState(7000);
  // IADC
  const [series, setSeries] = useState(5);
  const [type, setType] = useState(3);
  const [bearing, setBearing] = useState(7);

  const m = ok(wob, d, rpm, tq, rop) && rop > 0 ? mse({ wob, dIn: d, rpm, torque: tq, rop }) : NaN;
  const cpfA = ok(rig, aCost, aDrill, aConn, aTrip, aFeet) && aFeet > 0 ? costPerFoot({ bitCost: aCost, rigRate: rig, tDrill: aDrill, tConn: aConn, tTrip: aTrip, feet: aFeet }) : NaN;
  const cpfB = ok(rig, bCost, bDrill, bConn, bTrip, bFeet) && bFeet > 0 ? costPerFoot({ bitCost: bCost, rigRate: rig, tDrill: bDrill, tConn: bConn, tTrip: bTrip, feet: bFeet }) : NaN;
  const feetBe = Number.isFinite(cpfA) ? (bCost + rig * (bDrill + bConn + bTrip)) / cpfA : NaN;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card title="MSE və bit səmərəliliyi" formula="MSE = W/A + 120π·N·T/(A·ROP);  η = CCS/MSE">
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="WOB" unit="lbf" value={wob} onChange={setWob} />
          <Num label="Bit diametri" unit="in" value={d} onChange={setD} />
          <Num label="RPM" unit="" value={rpm} onChange={setRpm} />
          <Num label="Torque" unit="ft·lbf" value={tq} onChange={setTq} />
          <Num label="ROP" unit="ft/hr" value={rop} onChange={setRop} />
          <Num label="Süxurun CCS" unit="psi" value={ccs} onChange={setCcs} />
        </div>
        {Number.isFinite(m) && (
          <>
            <Out label="Bit sahəsi" value={f(bitArea(d), 2)} unit="in²" />
            <Out label="MSE" value={f(m, 0)} unit="psi" />
            <Out label="Səmərəlilik (CCS/MSE)" value={f(mseEfficiency(ccs, m) * 100, 1)} unit="%" tone={mseEfficiency(ccs, m) >= 0.3 ? "good" : "warn"} />
            <Note>Yaxşı qazma rejimində səmərəlilik təxminən 30-40% olur. Aşağı səmərəlilik bit balling, köhnəlmə, vibrasiya və ya founder əlaməti ola bilər.</Note>
          </>
        )}
      </Card>

      <Card title="Bit torque və WOB limiti" formula="T = μ·W·D/36;  W_max = 36·T_max/(μ·D)">
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="μ (bit)" unit="" value={mu} onChange={setMu} />
          <Num label="Torque limiti" unit="ft·lbf" value={tMax} onChange={setTMax} />
        </div>
        {ok(mu, tMax, wob, d) && mu > 0 && (
          <>
            <Out label="Cari bit torque-u (yuxarıdakı WOB ilə)" value={f(bitTorque(mu, wob, d), 0)} unit="ft·lbf" />
            <Out label="Torque ilə məhdud maks. WOB" value={f(maxWobForTorque(tMax, mu, d), 0)} unit="lbf" tone="good" />
            <Out label="Cari WOB / maks. WOB" value={f((wob / maxWobForTorque(tMax, mu, d)) * 100, 0)} unit="%" tone={wob > maxWobForTorque(tMax, mu, d) ? "bad" : "good"} />
            <Note>μ bit tipinə və formasiyaya görə dəyişir, quyudan alınan torque ölçməsi ilə kalibrlənir.</Note>
          </>
        )}
      </Card>

      <div className="md:col-span-2">
        <Card title="Cost per foot: iki bit-in müqayisəsi" formula="CPF = (C_b + C_r·(t_b + t_c + t_t)) / F">
          <Num label="Rig dərəcəsi" unit="$/saat" value={rig} onChange={setRig} />
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[12px] font-semibold text-[#F59E0B] mb-2 font-['Space_Grotesk']">Bit A</p>
              <Num label="Bit qiyməti" unit="$" value={aCost} onChange={setACost} />
              <Num label="Qazma vaxtı" unit="saat" value={aDrill} onChange={setADrill} />
              <Num label="Qoşulma vaxtı" unit="saat" value={aConn} onChange={setAConn} />
              <Num label="Trip vaxtı" unit="saat" value={aTrip} onChange={setATrip} />
              <Num label="Qazılan məsafə" unit="ft" value={aFeet} onChange={setAFeet} />
              {Number.isFinite(cpfA) && <Out label="CPF (A)" value={f(cpfA, 2)} unit="$/ft" tone={cpfA <= cpfB || !Number.isFinite(cpfB) ? "good" : "warn"} />}
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#00D4FF] mb-2 font-['Space_Grotesk']">Bit B</p>
              <Num label="Bit qiyməti" unit="$" value={bCost} onChange={setBCost} />
              <Num label="Qazma vaxtı" unit="saat" value={bDrill} onChange={setBDrill} />
              <Num label="Qoşulma vaxtı" unit="saat" value={bConn} onChange={setBConn} />
              <Num label="Trip vaxtı" unit="saat" value={bTrip} onChange={setBTrip} />
              <Num label="Qazılan məsafə" unit="ft" value={bFeet} onChange={setBFeet} />
              {Number.isFinite(cpfB) && <Out label="CPF (B)" value={f(cpfB, 2)} unit="$/ft" tone={cpfB <= cpfA || !Number.isFinite(cpfA) ? "good" : "warn"} />}
            </div>
          </div>
          {Number.isFinite(feetBe) && (
            <>
              <Out label="B-nin A-nın CPF-nə çatması üçün lazım olan məsafə (verilmiş vaxtlarla)" value={f(feetBe, 0)} unit="ft" />
              <Note>Bahalı bit yalnız kifayət qədər məsafə qazdıqda (və ya bit dəyişdirmə trip sayını azaldıqda) sərfəli olur.</Note>
            </>
          )}
        </Card>
      </div>

      <Card title="IADC roller cone kodu" formula="seriya · tip · yastıq/gauge">
        <Sel label="Seriya (1-ci rəqəm)" value={series} onChange={setSeries}>{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <option key={i} value={i}>{i}</option>)}</Sel>
        <Sel label="Tip (2-ci rəqəm)" value={type} onChange={setType}>{[1, 2, 3, 4].map((i) => <option key={i} value={i}>{i}</option>)}</Sel>
        <Sel label="Yastıq/gauge (3-cü rəqəm)" value={bearing} onChange={setBearing}>{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => <option key={i} value={i}>{i}</option>)}</Sel>
        <p className="font-mono text-[22px] font-bold text-[#FBBF24] mb-2">{series}{type}{bearing}</p>
        <div className="text-[12px] text-[#9DB0CC] space-y-1.5 font-['Space_Grotesk'] leading-relaxed">
          <p><b className="text-[#F0F4FF]">Seriya {series}:</b> {IADC_SERIES[series]}</p>
          <p><b className="text-[#F0F4FF]">Tip {type}:</b> {IADC_TYPE[type]}</p>
          <p><b className="text-[#F0F4FF]">Yastıq/gauge {bearing}:</b> {IADC_BEARING[bearing]}</p>
        </div>
        <Note>Kod bit-in nəzərdə tutulduğu formasiya və konstruksiyanı göstərir. Real bit seçimində istehsalçı kataloqu və offset bit qeydləri istifadə olunur.</Note>
      </Card>
    </div>
  );
}
