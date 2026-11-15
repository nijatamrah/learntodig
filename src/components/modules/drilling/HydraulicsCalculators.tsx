"use client";

import { useState } from "react";
import {
  CD_DEFAULT,
  annularVelocityFtS,
  binghamAnnulus,
  bitHhp,
  bitPressureDrop,
  carryingCapacityIndex,
  ecdPpg,
  hsi,
  jetImpactForce,
  nozzleVelocity,
  optimizeBitHydraulics,
  parasiticFit,
  surgeAnnularVelocity,
  totalFlowArea,
} from "@/lib/drilling/hydraulics";
import { Card, Note, Num, Out, fmt as f, ok } from "./CalcParts";

export default function HydraulicsCalculators() {
  // Bit
  const [n1, setN1] = useState(13);
  const [n2, setN2] = useState(13);
  const [n3, setN3] = useState(13);
  const [qB, setQB] = useState(450);
  const [rhoB, setRhoB] = useState(12);
  const [bitD, setBitD] = useState(8.5);
  // Optimallaşdırma
  const [pMax, setPMax] = useState(3500);
  const [p1, setP1] = useState(1000);
  const [q1, setQ1] = useState(300);
  const [p2, setP2] = useState(1650);
  const [q2, setQ2] = useState(450);
  const [rhoO, setRhoO] = useState(12);
  // ECD
  const [mw, setMw] = useState(12);
  const [dpAnn, setDpAnn] = useState(270);
  const [tvd, setTvd] = useState(10000);
  const [fg, setFg] = useState(14);
  const [margin, setMargin] = useState(0.5);
  // Surge
  const [vp, setVp] = useState(2);
  const [hole, setHole] = useState(8.5);
  const [pipe, setPipe] = useState(5);
  const [closed, setClosed] = useState(true);
  const [sMw, setSMw] = useState(12);
  const [pv, setPv] = useState(22);
  const [yp, setYp] = useState(14);
  const [sLen, setSLen] = useState(10000);
  const [sTvd, setSTvd] = useState(10000);
  // CCI
  const [cMw, setCMw] = useState(12);
  const [av, setAv] = useState(150);
  const [t600, setT600] = useState(58);
  const [t300, setT300] = useState(36);

  const noz = [n1, n2, n3].filter((n) => Number.isFinite(n) && n > 0);
  const at = totalFlowArea(noz);
  const dpBit = bitPressureDrop(rhoB, qB, at);
  const hh = bitHhp(dpBit, qB);

  const fit = ok(p1, q1, p2, q2) && p2 > p1 && q2 > q1 ? parasiticFit(p1, q1, p2, q2) : null;
  const opt = fit && ok(pMax, rhoO) ? optimizeBitHydraulics({ pMax, m: fit.m, c: fit.c, rho: rhoO }) : null;

  const ecd = ecdPpg(mw, dpAnn, tvd);
  const limit = fg - margin;
  const dpMax = (limit - mw) * 0.052 * tvd;

  const vA = surgeAnnularVelocity({ pipeSpeedFtS: vp, holeIn: hole, pipeIn: pipe, closedEnd: closed });
  const qEq = vA * 2.448 * (hole * hole - pipe * pipe);
  const sg = ok(vp, hole, pipe, sMw, pv, yp, sLen) && hole > pipe ? binghamAnnulus({ gpm: qEq, holeIn: hole, pipeIn: pipe, rho: sMw, pv, yp, lengthFt: sLen }) : null;
  const sgPpg = sg && sTvd > 0 ? sg.dp / (0.052 * sTvd) : NaN;

  const cci = ok(cMw, av, t600, t300) && t600 > t300 && t300 > 0 ? carryingCapacityIndex({ mw: cMw, avFtMin: av, t600, t300 }) : NaN;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Bit hidravlikası" formula="ΔP = 8.311e-5·ρ·q²/(Cd²·At²);  HSI = HHP/(π/4·D²)">
        <div className="grid grid-cols-3 gap-2">
          <Num label="Nozzle 1" unit="/32" value={n1} onChange={setN1} step="1" />
          <Num label="Nozzle 2" unit="/32" value={n2} onChange={setN2} step="1" />
          <Num label="Nozzle 3" unit="/32" value={n3} onChange={setN3} step="1" />
        </div>
        <Num label="Axın" unit="gpm" value={qB} onChange={setQB} />
        <Num label="MW" unit="ppg" value={rhoB} onChange={setRhoB} />
        <Num label="Bit diametri" unit="in" value={bitD} onChange={setBitD} />
        {ok(qB, rhoB, bitD) && at > 0 && (
          <>
            <Out label="TFA" value={f(at, 3)} unit="in²" />
            <Out label="Bit ΔP" value={f(dpBit, 0)} unit="psi" />
            <Out label="Nozzle sürəti" value={f(nozzleVelocity(qB, at), 0)} unit="ft/s" />
            <Out label="Bit HHP" value={f(hh, 0)} unit="hp" />
            <Out label="HSI" value={f(hsi(hh, bitD), 2)} unit="hp/in²" />
            <Out label="Jet impact" value={f(jetImpactForce(rhoB, qB, dpBit), 0)} unit="lbf" />
            <Note>Cd = {CD_DEFAULT}. Nozzle ölçüləri 1/32 inç vahidindədir.</Note>
          </>
        )}
      </Card>

      <Card title="Optimallaşdırma (max HHP / max impact)" formula="m = ln(P1/P2)/ln(q1/q2);  ΔP_bit = m/(m+1)·P_max  |  m/(m+2)·P_max">
        <Num label="Nasos təzyiq limiti P_max" unit="psi" value={pMax} onChange={setPMax} />
        <div className="grid grid-cols-2 gap-2">
          <Num label="Parasitik itki P1" unit="psi" value={p1} onChange={setP1} />
          <Num label="Axın q1" unit="gpm" value={q1} onChange={setQ1} />
          <Num label="Parasitik itki P2" unit="psi" value={p2} onChange={setP2} />
          <Num label="Axın q2" unit="gpm" value={q2} onChange={setQ2} />
        </div>
        <Num label="MW" unit="ppg" value={rhoO} onChange={setRhoO} />
        {fit && opt ? (
          <>
            <Out label="Eksponent m" value={f(fit.m, 2)} unit="" />
            <Out label="Max HHP: axın" value={f(opt.hhp.gpm, 0)} unit="gpm" tone="good" />
            <Out label="Max HHP: bit ΔP" value={`${f(opt.hhp.dpBit, 0)} (${f(opt.hhp.fraction * 100, 0)}%)`} unit="psi" />
            <Out label="Max HHP: TFA" value={f(opt.hhp.tfa, 3)} unit="in²" />
            <Out label="Max impact: axın" value={f(opt.jet.gpm, 0)} unit="gpm" tone="good" />
            <Out label="Max impact: bit ΔP" value={`${f(opt.jet.dpBit, 0)} (${f(opt.jet.fraction * 100, 0)}%)`} unit="psi" />
            <Out label="Max impact: TFA" value={f(opt.jet.tfa, 3)} unit="in²" />
            <Note>P1, q1 və P2, q2 nasos testindən (circulating pressure test) alınan parasitik itki ölçmələridir (bit ΔP çıxarılaraq). Real dizaynda axın hole cleaning minimumu və ECD ilə məhdudlaşa bilər.</Note>
          </>
        ) : (
          <Note>q2 &gt; q1 və P2 &gt; P1 olmalıdır.</Note>
        )}
      </Card>

      <Card title="ECD və mud window yoxlaması" formula="ECD = MW + ΔP_halqa/(0.052·TVD)">
        <Num label="MW" unit="ppg" value={mw} onChange={setMw} />
        <Num label="Halqa təzyiq itkisi" unit="psi" value={dpAnn} onChange={setDpAnn} />
        <Num label="TVD" unit="ft" value={tvd} onChange={setTvd} />
        <Num label="Çat qradiyenti FG" unit="ppg" value={fg} onChange={setFg} />
        <Num label="Çat margini" unit="ppg" value={margin} onChange={setMargin} />
        {ok(mw, dpAnn, tvd, fg, margin) && tvd > 0 && (
          <>
            <Out label="ECD" value={f(ecd, 2)} unit="ppg" tone={ecd > limit ? "bad" : "good"} />
            <Out label="Yuxarı hədd (FG − margin)" value={f(limit, 2)} unit="ppg" />
            <Out label="Qalan ehtiyat" value={f(limit - ecd, 2)} unit="ppg" tone={limit - ecd < 0 ? "bad" : limit - ecd < 0.3 ? "warn" : "good"} />
            <Out label="Maks. icazəli halqa ΔP" value={f(dpMax, 0)} unit="psi" />
            <Note>ECD yuxarı həddi keçərsə, formasiya çatlaya və məhlul itə bilər. Aşağı hədd üçün nasos dayananda (ECD itkisi) ECD yox, statik MW ≥ Pp + trip margin yoxlanır.</Note>
          </>
        )}
      </Card>

      <Card title="Surge / swab (skrininq qiymətləndirməsi)" formula="v_a = v_p·[d_p²/(d_h²−d_p²) + K],  K ≈ 0.45 (qapalı uc)">
        <Num label="Boru sürəti" unit="ft/s" value={vp} onChange={setVp} />
        <div className="grid grid-cols-2 gap-2">
          <Num label="Quyu Dh" unit="in" value={hole} onChange={setHole} />
          <Num label="Boru OD Dp" unit="in" value={pipe} onChange={setPipe} />
          <Num label="MW" unit="ppg" value={sMw} onChange={setSMw} />
          <Num label="Boru uzunluğu" unit="ft" value={sLen} onChange={setSLen} />
          <Num label="PV" unit="cP" value={pv} onChange={setPv} />
          <Num label="YP" unit="lb/100ft²" value={yp} onChange={setYp} />
        </div>
        <Num label="TVD (ekvivalent çəki üçün)" unit="ft" value={sTvd} onChange={setSTvd} />
        <label className="flex items-center gap-2 text-[12px] text-[#8DA2BF] mb-2 font-['Space_Grotesk']">
          <input type="checkbox" checked={closed} onChange={(e) => setClosed(e.target.checked)} />
          Qapalı uclu boru (float/bit nozzle bağlı)
        </label>
        {sg && (
          <>
            <Out label="Halqada effektiv sürət" value={f(vA * 60, 0)} unit="ft/dəq" />
            <Out label="Ekvivalent axın" value={f(qEq, 0)} unit="gpm" />
            <Out label="Təzyiq dəyişməsi" value={f(sg.dp, 0)} unit="psi" />
            <Out label="Ekvivalent çəki dəyişməsi" value={f(sgPpg, 2)} unit="ppg" tone="warn" />
            <Out label="Endirmə (surge) EMW" value={f(sMw + sgPpg, 2)} unit="ppg" />
            <Out label="Çəkmə (swab) EMW" value={f(sMw - sgPpg, 2)} unit="ppg" />
            <Note>Surge EMW çat həddindən yuxarı keçərsə itki, swab EMW məsamə təzyiqindən aşağı düşərsə kick riski var. Bu, sadələşdirilmiş statik qiymətləndirmədir: real hesablamada tranzient effektlər, sürətlənmə və boru həndəsəsi də nəzərə alınır.</Note>
          </>
        )}
      </Card>

      <Card title="Hole cleaning göstəricisi (CCI)" formula="CCI = K·MW·AV/400,000;  K = 511·θ300/511^n">
        <Num label="MW" unit="ppg" value={cMw} onChange={setCMw} />
        <Num label="Halqada sürət AV" unit="ft/dəq" value={av} onChange={setAv} />
        <Num label="θ600" unit="dial" value={t600} onChange={setT600} />
        <Num label="θ300" unit="dial" value={t300} onChange={setT300} />
        {Number.isFinite(cci) && (
          <>
            <Out label="CCI" value={f(cci, 2)} unit="" tone={cci >= 1 ? "good" : cci >= 0.5 ? "warn" : "bad"} />
            <Out
              label="AV (halqa, 450 gpm, 8.5×5 in nümunə)"
              value={f(annularVelocityFtS(450, 8.5, 5) * 60, 0)}
              unit="ft/dəq"
            />
            <Note>≥ 1 yaxşı, 0.5-1 orta, &lt; 0.5 zəif (təlimat qaydası). Bu, dizayn metodu deyil: maili quyularda boru fırlanması, süpürmə və cuttings yatağı modelləri ayrıca nəzərə alınır.</Note>
          </>
        )}
      </Card>
    </div>
  );
}
