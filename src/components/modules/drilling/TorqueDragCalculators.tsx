"use client";

import { useState } from "react";
import { DP_GRADES, crossSectionIn2, type DpGrade } from "@/lib/drilling/drillstring";
import { capstanOut, combinedTorqueCapacity, criticalInclinationDeg, helicalBucklingLbf, segmentForces, sinusoidalBucklingLbf, torsionalYield } from "@/lib/drilling/torquedrag";
import { Card, Note, Num, Out, fmt as f, ok } from "./CalcParts";

export default function TorqueDragCalculators() {
  // 1) element
  const [wb, setWb] = useState(18);
  const [dL, setDL] = useState(30);
  const [inc, setInc] = useState(60);
  const [dInc, setDInc] = useState(0);
  const [F, setF] = useState(0);
  const [mu, setMu] = useState(0.3);
  const [rIn, setRIn] = useState(3.3125);
  // 2) capstan
  const [fIn, setFIn] = useState(50000);
  const [theta, setTheta] = useState(30);
  const [muC, setMuC] = useState(0.25);
  // 3) torsiya
  const [od, setOd] = useState(5);
  const [id, setId] = useState(4.276);
  const [grade, setGrade] = useState<DpGrade>("E");
  const [tens, setTens] = useState(150000);
  const [surfT, setSurfT] = useState(25000);
  // 4) buckling
  const [bOd, setBOd] = useState(5);
  const [bId, setBId] = useState(4.276);
  const [bW, setBW] = useState(21.9);
  const [bMw, setBMw] = useState(12);
  const [bHole, setBHole] = useState(8.5);
  const [bInc, setBInc] = useState(60);

  const seg = ok(wb, dL, inc, dInc, F, mu) ? segmentForces({ wb, dL, incDeg: inc, F, dIncDeg: dInc, mu }) : null;
  const sy = DP_GRADES[grade].yieldPsi;
  const q0 = ok(od, id) && od > id ? torsionalYield(od, id, sy) : NaN;
  const qc = ok(od, id, tens) && od > id ? combinedTorqueCapacity(od, id, sy, tens) : NaN;
  const area = ok(od, id) ? crossSectionIn2(od, id) : NaN;
  const sBuck = ok(bOd, bId, bW, bMw, bHole, bInc) && bHole > bOd && bOd > bId ? sinusoidalBucklingLbf({ od: bOd, id: bId, wAirPerFt: bW, mwPpg: bMw, holeIn: bHole, incDeg: bInc }) : NaN;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Bir element: normal qüvvə, drag, torque" formula="N = |F·Δα + w_b·ΔL·sin α|;  ΔF = ΔW ± μN;  ΔT = μ·N·r">
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="Buoyed çəki w_b" unit="lb/ft" value={wb} onChange={setWb} />
          <Num label="Uzunluq ΔL" unit="ft" value={dL} onChange={setDL} />
          <Num label="Bucaq α" unit="°" value={inc} onChange={setInc} />
          <Num label="Δα (yuxarı)" unit="°" value={dInc} onChange={setDInc} />
          <Num label="Dartma F (alt ucda)" unit="lbf" value={F} onChange={setF} />
          <Num label="μ" unit="" value={mu} onChange={setMu} />
        </div>
        <Num label="Kontakt radiusu r" unit="in" value={rIn} onChange={setRIn} />
        {seg && (
          <>
            <Out label="Normal qüvvə N" value={f(seg.N, 1)} unit="lbf" />
            <Out label="Sürtünmə μN" value={f(seg.fric, 1)} unit="lbf" />
            <Out label="Oxboyu çəki komponenti" value={f(seg.wAxial, 1)} unit="lbf" />
            <Out label="Pick-up: ΔF" value={f(seg.dFpickup, 1)} unit="lbf" tone="warn" />
            <Out label="Slack-off: ΔF" value={f(seg.dFslack, 1)} unit="lbf" tone="good" />
            <Out label="Fırlanma: torque artımı" value={f(seg.fric * (rIn / 12), 1)} unit="ft·lbf" />
            <Note>Δα &gt; 0: yuxarı getdikcə bucaq artır (drop). Δα &lt; 0: build zonası, dartma çəkiyə qarşı normal qüvvə yaradır.</Note>
          </>
        )}
      </Card>

      <Card title="Capstan və kritik bucaq" formula="F_çıx = F·e^(±μθ);  α_kr = atan(1/μ)">
        <Num label="Giriş dartması" unit="lbf" value={fIn} onChange={setFIn} />
        <Num label="Əyilmə bucağı θ" unit="°" value={theta} onChange={setTheta} />
        <Num label="μ" unit="" value={muC} onChange={setMuC} />
        {ok(fIn, theta, muC) && muC > 0 && (
          <>
            <Out label="Pick-up: F_çıxış" value={f(capstanOut(fIn, theta, muC, true), 0)} unit="lbf" tone="warn" />
            <Out label="Slack-off: F_çıxış" value={f(capstanOut(fIn, theta, muC, false), 0)} unit="lbf" tone="good" />
            <Out label="Əyilmədə normal qüvvə (≈ F·θ)" value={f(fIn * ((theta * Math.PI) / 180), 0)} unit="lbf" />
            <Out label="Kritik bucaq (öz çəkisi ilə sürüşmə)" value={f(criticalInclinationDeg(muC), 1)} unit="°" />
            <Note>Capstan çəkisiz boru üçündür. Real quyuda çəki, bucaq dəyişmələri və tension profili ilə birgə (soft-string) hesablanır.</Note>
          </>
        )}
      </Card>

      <Card title="Torsiya tutumu" formula="Q = 0.096167·J·σ_y/OD;  Q_c = Q·√(1 − (F/σ_yA)²)">
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="OD" unit="in" value={od} onChange={setOd} />
          <Num label="ID" unit="in" value={id} onChange={setId} />
        </div>
        <label className="block mb-2.5">
          <span className="block text-[11px] text-[#8DA2BF] mb-1 font-['Space_Grotesk']">Dərəcə</span>
          <select value={grade} onChange={(e) => setGrade(e.target.value as DpGrade)} className="w-full bg-[#080C18] text-[#F0F4FF] text-[13px] rounded-lg px-3 py-2 outline-none border border-[rgba(255,255,255,0.08)]">
            {(Object.keys(DP_GRADES) as DpGrade[]).map((k) => (
              <option key={k} value={k}>{DP_GRADES[k].name}</option>
            ))}
          </select>
        </label>
        <Num label="Dartma F" unit="lbf" value={tens} onChange={setTens} />
        <Num label="Səth torque-u" unit="ft·lbf" value={surfT} onChange={setSurfT} />
        {Number.isFinite(q0) && (
          <>
            <Out label="Tutum sahəsi A" value={f(area, 3)} unit="in²" />
            <Out label="Torsiya axma həddi Q" value={f(q0, 0)} unit="ft·lbf" />
            <Out label="Dartma altında tutum Q_c" value={f(qc, 0)} unit="ft·lbf" tone="good" />
            <Out label="İstifadə (torque / Q_c)" value={f((surfT / qc) * 100, 0)} unit="%" tone={surfT / qc > 0.8 ? "bad" : surfT / qc > 0.6 ? "warn" : "good"} />
            <Note>Yeni boru gövdəsi üçündür. Real limit çox vaxt tool joint-in make-up torque-udur və inspeksiya sinfi ilə azalır; şirkət dizayn əmsalını tətbiq et.</Note>
          </>
        )}
      </Card>

      <Card title="Buckling (Dawson–Paslay)" formula="F_s = 2·√(E·I·w_b·sin α / r);  F_h ≈ 2√2·F_s">
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="Boru OD" unit="in" value={bOd} onChange={setBOd} />
          <Num label="Boru ID" unit="in" value={bId} onChange={setBId} />
          <Num label="Çəki (havada)" unit="lb/ft" value={bW} onChange={setBW} />
          <Num label="MW" unit="ppg" value={bMw} onChange={setBMw} />
          <Num label="Quyu diametri" unit="in" value={bHole} onChange={setBHole} />
          <Num label="Bucaq" unit="°" value={bInc} onChange={setBInc} />
        </div>
        {Number.isFinite(sBuck) && (
          <>
            <Out label="Sinusoidal buckling yükü" value={f(sBuck, 0)} unit="lbf" />
            <Out label="Helical buckling yükü" value={f(helicalBucklingLbf(sBuck), 0)} unit="lbf" tone="warn" />
            <Note>Sıxılma bu həddi keçərsə, boru əvvəl sinusoidal, sonra helical əyilir. Düz maili hissə qəbul edilir; tool joint, burulma və dogleg nəzərə alınmır.</Note>
          </>
        )}
      </Card>
    </div>
  );
}
