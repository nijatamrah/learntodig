"use client";

import { useState } from "react";
import {
  accumulatorUsableGal,
  annularCapacityBblFt,
  annularVelocityFtMin,
  bottomsUpMinutes,
  capacityBblFt,
  displacementBblFt,
  gpmFromPump,
  hoisting,
  hydraulicHp,
  tripFillBbl,
  triplexBblPerStroke,
} from "@/lib/drilling/rig";
import { Card, Note, Num, Out, fmt as f, ok } from "./CalcParts";

export default function RigCalculators() {
  // Hoisting
  const [hook, setHook] = useState(300000);
  const [lines, setLines] = useState(10);
  const [speed, setSpeed] = useState(60);
  const [breaking, setBreaking] = useState(190000);
  // Nasos
  const [liner, setLiner] = useState(6.5);
  const [stroke, setStroke] = useState(12);
  const [ev, setEv] = useState(95);
  const [spm, setSpm] = useState(100);
  const [spp, setSpp] = useState(3000);
  // Halqa
  const [hole, setHole] = useState(8.5);
  const [pipe, setPipe] = useState(5);
  const [depth, setDepth] = useState(10000);
  // Trip
  const [od, setOd] = useState(5);
  const [id, setId] = useState(4.276);
  const [stands, setStands] = useState(12);
  const [standLen, setStandLen] = useState(90);
  const [wet, setWet] = useState(false);
  // Akkumulyator
  const [bottleGal, setBottleGal] = useState(10);
  const [bottles, setBottles] = useState(16);
  const [pre, setPre] = useState(1000);
  const [pmin, setPmin] = useState(1200);
  const [pmax, setPmax] = useState(3000);

  const h = ok(hook, lines, speed) && lines >= 1 ? hoisting({ hookLoad: hook, lines, blockSpeed: speed, lineBreakingStrength: breaking }) : null;
  const bblStk = triplexBblPerStroke(liner, stroke, ev / 100);
  const gpm = gpmFromPump(bblStk, spm);
  const annCap = annularCapacityBblFt(hole, pipe);
  const annVol = annCap * depth;
  const trip = tripFillBbl({ odIn: od, idIn: id, lengthFt: stands * standLen, wet });
  const accum = accumulatorUsableGal({ bottleGal, bottles, precharge: pre, minPressure: pmin, maxPressure: pmax });

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Hoisting: block & tackle" formula="F_fast = W/(E·N);  F_derrick = W + F_fast + W/N">
        <Num label="Hook load W" unit="lbf" value={hook} onChange={setHook} />
        <Num label="Xətlərin sayı N" unit="" value={lines} onChange={setLines} step="1" />
        <Num label="Block sürəti" unit="ft/dəq" value={speed} onChange={setSpeed} />
        <Num label="Drilling line qırılma gücü" unit="lbf" value={breaking} onChange={setBreaking} />
        {h && (
          <>
            <Out label="Səmərəlilik E" value={f(h.efficiency, 3)} unit="" />
            <Out label="Fast line yükü" value={f(h.fastLineTension, 0)} unit="lbf" />
            <Out label="Dead line yükü" value={f(h.deadLineTension, 0)} unit="lbf" />
            <Out label="Derrick yükü" value={f(h.derrickLoad, 0)} unit="lbf" />
            <Out label="Hook gücü" value={f(h.hookPowerHp, 0)} unit="hp" />
            <Out label="Drawworks giriş gücü" value={f(h.drawworksPowerHp, 0)} unit="hp" />
            {h.designFactor !== null && (
              <Out label="Dizayn əmsalı" value={f(h.designFactor, 2)} unit="" tone={h.designFactor >= 3 ? "good" : h.designFactor >= 2 ? "warn" : "bad"} />
            )}
            <Note>Rəng: ≥3 yaşıl, 2-3 sarı, &lt;2 qırmızı. Dəqiq hədləri API RP 9B və şirkət prosedurundan yoxla.</Note>
          </>
        )}
      </Card>

      <Card title="Nasos və hidravlik güc" formula="Q = 0.000243·D²·L·Ev·42·SPM;  HHP = P·Q/1714">
        <Num label="Liner diametri" unit="in" value={liner} onChange={setLiner} />
        <Num label="Stroke" unit="in" value={stroke} onChange={setStroke} />
        <Num label="Həcmi səmərəlilik Ev" unit="%" value={ev} onChange={setEv} />
        <Num label="Nasos sürəti" unit="SPM" value={spm} onChange={setSpm} />
        <Num label="Standpipe təzyiqi" unit="psi" value={spp} onChange={setSpp} />
        {ok(liner, stroke, ev, spm, spp) && (
          <>
            <Out label="Çıxış" value={f(bblStk, 4)} unit="bbl/strok" />
            <Out label="Axın sürəti" value={f(gpm, 0)} unit="gpm" />
            <Out label="Hidravlik güc" value={f(hydraulicHp(spp, gpm), 0)} unit="hp" />
          </>
        )}
        <Note>Bu axın aşağıdakı halqa kalkulyatorunda istifadə olunur.</Note>
      </Card>

      <Card title="Halqa: sürət və bottoms-up" formula="AV = 24.51·Q/(Dh²−Dp²);  t = V_ann/(Q/42)">
        <Num label="Quyu diametri Dh" unit="in" value={hole} onChange={setHole} />
        <Num label="Boru OD Dp" unit="in" value={pipe} onChange={setPipe} />
        <Num label="Dərinlik" unit="ft" value={depth} onChange={setDepth} />
        {ok(hole, pipe, depth) && hole > pipe && gpm > 0 && (
          <>
            <Out label="Axın (nasos kartından)" value={f(gpm, 0)} unit="gpm" />
            <Out label="Halqa tutumu" value={f(annCap, 4)} unit="bbl/ft" />
            <Out label="Halqada sürət" value={f(annularVelocityFtMin(gpm, hole, pipe), 0)} unit="ft/dəq" />
            <Out label="Halqa həcmi" value={f(annVol, 0)} unit="bbl" />
            <Out label="Bottoms-up vaxtı" value={f(bottomsUpMinutes(annVol, gpm), 1)} unit="dəq" />
            <Out label="Bottoms-up stroklar" value={f(annVol / bblStk, 0)} unit="strok" />
            <Note>Sabit həndəsə qəbul edilir. Real quyuda hər bölmə (casing, açıq quyu, riser) ayrıca hesablanır.</Note>
          </>
        )}
      </Card>

      <Card title="Trip tank: yerdəyişmə" formula="V = (OD² − ID²)/1029.4 · L   (yaş boru: + ID²/1029.4 · L)">
        <Num label="Boru OD" unit="in" value={od} onChange={setOd} />
        <Num label="Boru ID" unit="in" value={id} onChange={setId} />
        <Num label="Çəkilən stand sayı" unit="" value={stands} onChange={setStands} step="1" />
        <Num label="Stand uzunluğu" unit="ft" value={standLen} onChange={setStandLen} />
        <label className="flex items-center gap-2 text-[12px] text-[#8DA2BF] mb-2 font-['Space_Grotesk']">
          <input type="checkbox" checked={wet} onChange={(e) => setWet(e.target.checked)} />
          Yaş boru (slug vurulmayıb)
        </label>
        {ok(od, id, stands, standLen) && od > id && (
          <>
            <Out label="Yerdəyişmə" value={f(displacementBblFt(od, id), 5)} unit="bbl/ft" />
            <Out label="Tutum" value={f(capacityBblFt(id), 5)} unit="bbl/ft" />
            <Out label="Quyuya qayıtmalı həcm" value={f(trip, 2)} unit="bbl" tone="good" />
            <Note>Quyu bundan az məhlul qəbul edirsə, formasiya mayesinin daxil olması ehtimalı var: prosedura uyğun flow check.</Note>
          </>
        )}
      </Card>

      <Card title="BOP akkumulyatoru" formula="V_usable = V_bal·(P_pre/P_min − P_pre/P_max)">
        <Num label="Balon həcmi" unit="gal" value={bottleGal} onChange={setBottleGal} />
        <Num label="Balonların sayı" unit="" value={bottles} onChange={setBottles} step="1" />
        <Num label="Pre-charge" unit="psi" value={pre} onChange={setPre} />
        <Num label="Minimum iş təzyiqi" unit="psi" value={pmin} onChange={setPmin} />
        <Num label="Maksimum təzyiq" unit="psi" value={pmax} onChange={setPmax} />
        {ok(bottleGal, bottles, pre, pmin, pmax) && pmax > pmin && pmin > 0 && (
          <>
            <Out label="Balon başına istifadə oluna bilən" value={f(accum / bottles, 2)} unit="gal" />
            <Out label="Cəmi istifadə oluna bilən" value={f(accum, 1)} unit="gal" tone="good" />
            <Note>BOP-u bağlamaq üçün lazım olan həcm avadanlıq istehsalçısının datasından alınır və API Std 53 tələbləri ilə yoxlanılır.</Note>
          </>
        )}
      </Card>
    </div>
  );
}
