"use client";

import { useState } from "react";
import {
  DP_GRADES,
  STEEL_W_COEF,
  allowableTension,
  buoyancy,
  hookLoads,
  neutralPointFromBit,
  requiredDcLength,
  steelWeightPerFt,
  tensileYield,
  type DpGrade,
} from "@/lib/drilling/drillstring";
import { Card, Note, Num, Out, fmt as f, ok } from "./CalcParts";

export default function DrillstringCalculators() {
  // 1) Çəki və buoyancy
  const [od, setOd] = useState(6.5);
  const [id, setId] = useState(2.813);
  const [len, setLen] = useState(600);
  const [mw1, setMw1] = useState(12);
  // 2) DC dizaynı
  const [wob, setWob] = useState(40000);
  const [df, setDf] = useState(1.15);
  const [mw2, setMw2] = useState(12);
  const [dcOd, setDcOd] = useState(6.5);
  const [dcId, setDcId] = useState(2.813);
  const [dcLen, setDcLen] = useState(600);
  // 3) Dartma
  const [depth, setDepth] = useState(12000);
  const [mw3, setMw3] = useState(12);
  const [wob3, setWob3] = useState(40000);
  const [dpOd, setDpOd] = useState(5);
  const [dpId, setDpId] = useState(4.276);
  const [dpW, setDpW] = useState(21.9);
  const [grade, setGrade] = useState<DpGrade>("E");
  const [dc3, setDc3] = useState(600);
  const [dcW, setDcW] = useState(91.8);
  const [hw3, setHw3] = useState(450);
  const [hwW, setHwW] = useState(49.3);
  const [mopTarget, setMopTarget] = useState(100000);

  const w1 = steelWeightPerFt(od, id);
  const bf1 = buoyancy(mw1);

  const bf2 = buoyancy(mw2);
  const w2 = steelWeightPerFt(dcOd, dcId);
  const lReq = ok(wob, df, bf2, w2) ? requiredDcLength(wob, df, bf2, w2) : NaN;
  const np = ok(wob, bf2, w2, dcLen) ? neutralPointFromBit([{ name: "dc", length: dcLen, wPerFt: w2 }], wob, bf2) : null;

  const bf3 = buoyancy(mw3);
  const dpLen = Math.max(0, depth - dc3 - hw3);
  const secs = [
    { name: "dc" as const, length: dc3, wPerFt: dcW },
    { name: "hwdp" as const, length: hw3, wPerFt: hwW },
    { name: "dp" as const, length: dpLen, wPerFt: dpW },
  ];
  const loads = ok(depth, bf3, dpW, dcW, hwW) ? hookLoads(secs, wob3, bf3) : null;
  const ty = ok(dpOd, dpId) ? tensileYield(dpOd, dpId, DP_GRADES[grade].yieldPsi) : NaN;
  const ta = allowableTension(ty);
  const mop = loads ? ta - loads.offBottom : NaN;
  const lDpMax = ok(ta, mopTarget, bf3, dcW, hwW, dpW) ? (ta - mopTarget - bf3 * (dcW * dc3 + hwW * hw3)) / (bf3 * dpW) : NaN;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Çəki və buoyancy" formula="w = 2.6725·(OD² − ID²);  BF = 1 − MW/65.5">
        <Num label="OD" unit="in" value={od} onChange={setOd} />
        <Num label="ID" unit="in" value={id} onChange={setId} />
        <Num label="Uzunluq" unit="ft" value={len} onChange={setLen} />
        <Num label="MW" unit="ppg" value={mw1} onChange={setMw1} />
        {ok(od, id, len, mw1) && od > id && (
          <>
            <Out label="Çəki (havada)" value={f(w1, 1)} unit="lb/ft" />
            <Out label="Cəmi çəki (havada)" value={f(w1 * len, 0)} unit="lb" />
            <Out label="Buoyancy factor" value={f(bf1, 3)} unit="" />
            <Out label="Buoyed çəki" value={f(w1 * len * bf1, 0)} unit="lbf" tone="good" />
            <Note>Katalog çəkisi (tool joint daxil) bu hesabdan bir qədər fərqlənə bilər: dizayn üçün istehsalçı cədvəlini istifadə et. Sabit: {f(STEEL_W_COEF, 4)}.</Note>
          </>
        )}
      </Card>

      <Card title="DC dizaynı və neutral point" formula="L = WOB·DF/(BF·w);  NP = WOB/(BF·w)">
        <Num label="WOB" unit="lbf" value={wob} onChange={setWob} />
        <Num label="Dizayn əmsalı DF" unit="" value={df} onChange={setDf} />
        <Num label="MW" unit="ppg" value={mw2} onChange={setMw2} />
        <div className="grid grid-cols-2 gap-2">
          <Num label="DC OD" unit="in" value={dcOd} onChange={setDcOd} />
          <Num label="DC ID" unit="in" value={dcId} onChange={setDcId} />
        </div>
        <Num label="Seçilmiş DC uzunluğu" unit="ft" value={dcLen} onChange={setDcLen} />
        {Number.isFinite(lReq) && dcOd > dcId && (
          <>
            <Out label="DC çəkisi (havada)" value={f(w2, 1)} unit="lb/ft" />
            <Out label="Lazım olan DC uzunluğu" value={f(lReq, 0)} unit="ft" tone="good" />
            <Out label="Collar sayı (≈ 30 ft)" value={f(Math.ceil(lReq / 30), 0)} unit="" />
            {np !== null ? (
              <>
                <Out label="Neutral point (bit-dən)" value={f(np, 0)} unit="ft" />
                <Out label="NP / DC uzunluğu" value={f((np / dcLen) * 100, 0)} unit="%" tone={np <= dcLen ? "good" : "bad"} />
              </>
            ) : (
              <Out label="Neutral point" value="DC-dən kənarda" unit="" tone="bad" />
            )}
            <Out label="DC faktoru" value={f((w2 * dcLen * bf2) / wob, 2)} unit="" tone={(w2 * dcLen * bf2) / wob >= df ? "good" : "warn"} />
            <Note>Qayda: DC çəkisi (məhlulda) WOB-u dizayn əmsalı qədər ötməlidir ki, neutral point həmişə DC daxilində qalsın.</Note>
          </>
        )}
      </Card>

      <div className="md:col-span-2">
        <Card title="Dartma dizaynı və margin of overpull" formula="T_a = 0.9·σ_y·A;  MOP = T_a − HL_off;  L_DP = (T_a − MOP − BF·W_aşağı)/(BF·w_DP)">
          <div className="grid sm:grid-cols-3 gap-x-4">
            <div>
              <Num label="Dərinlik" unit="ft" value={depth} onChange={setDepth} />
              <Num label="MW" unit="ppg" value={mw3} onChange={setMw3} />
              <Num label="WOB" unit="lbf" value={wob3} onChange={setWob3} />
              <Num label="Hədəf MOP" unit="lbf" value={mopTarget} onChange={setMopTarget} />
            </div>
            <div>
              <Num label="DP OD" unit="in" value={dpOd} onChange={setDpOd} />
              <Num label="DP ID" unit="in" value={dpId} onChange={setDpId} />
              <Num label="DP adjusted çəki" unit="lb/ft" value={dpW} onChange={setDpW} />
              <label className="block mb-2.5">
                <span className="block text-[11px] text-[#8DA2BF] mb-1 font-['Space_Grotesk']">DP dərəcəsi</span>
                <select value={grade} onChange={(e) => setGrade(e.target.value as DpGrade)} className="w-full bg-[#080C18] text-[#F0F4FF] text-[13px] rounded-lg px-3 py-2 outline-none border border-[rgba(255,255,255,0.08)]">
                  {(Object.keys(DP_GRADES) as DpGrade[]).map((k) => (
                    <option key={k} value={k}>{DP_GRADES[k].name}</option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <Num label="DC uzunluğu" unit="ft" value={dc3} onChange={setDc3} />
              <Num label="DC çəkisi" unit="lb/ft" value={dcW} onChange={setDcW} />
              <Num label="HWDP uzunluğu" unit="ft" value={hw3} onChange={setHw3} />
              <Num label="HWDP çəkisi" unit="lb/ft" value={hwW} onChange={setHwW} />
            </div>
          </div>
          {loads && Number.isFinite(ty) && (
            <>
              <Out label="DP uzunluğu" value={f(dpLen, 0)} unit="ft" />
              <Out label="Hook load, off-bottom" value={f(loads.offBottom, 0)} unit="lbf" />
              <Out label="Hook load, qazma (WOB çıxılıb)" value={f(loads.drilling, 0)} unit="lbf" />
              <Out label="T_y (yeni DP)" value={f(ty, 0)} unit="lbf" />
              <Out label="İcazə verilən dartma 0.9·T_y" value={f(ta, 0)} unit="lbf" />
              <Out label="Margin of overpull" value={f(mop, 0)} unit="lbf" tone={mop >= mopTarget ? "good" : mop > 0 ? "warn" : "bad"} />
              {Number.isFinite(lDpMax) && <Out label="Hədəf MOP üçün maks. DP uzunluğu" value={f(Math.max(0, lDpMax), 0)} unit="ft" />}
              {Number.isFinite(lDpMax) && <Out label="Hədəf MOP üçün maks. ümumi dərinlik" value={f(Math.max(0, lDpMax) + dc3 + hw3, 0)} unit="ft" />}
              <Note>Yeni boru qəbul edilir. İstifadə olunmuş boru (premium və ya aşağı sinif) üçün divar qalınlığı azaldığından T_y aşağı düşür: inspeksiya sinfinə görə həqiqi tutuma baxılmalıdır. Sürtünmə və maili quyu üçün T&D (6-cı bölmə) lazımdır.</Note>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
