"use client";

import { useState } from "react";
import {
  annularVelocityFtMin,
  breakEvenSuccess,
  contactAreaIn2,
  cuttingsConcPct,
  diffStickForceLb,
  ecdPpg,
  effectiveSlipFtMin,
  expectedFishCostK,
  freePointFt,
  hydroLossPsi,
  levelDropFt,
  lossClass,
  minFlowForConcGpm,
  nptCostK,
  nptPct,
  overbalancePsi,
  transportRatio,
} from "@/lib/drilling/problems";
import { Card, Note, Num, Out, fmt as f, ok } from "./CalcParts";

export default function ProblemsCalculators() {
  const [tvd, setTvd] = useState(8000);
  const [mw, setMw] = useState(9.8);
  const [pf, setPf] = useState(8.6);
  const [lc, setLc] = useState(60);
  const [wc, setWc] = useState(1.5);
  const [mu, setMu] = useState(0.2);
  const [e, setE] = useState(8);
  const [wpipe, setWpipe] = useState(19.5);
  const [pull, setPull] = useState(20000);
  const [q, setQ] = useState(400);
  const [dh, setDh] = useState(8.5);
  const [dp, setDp] = useState(5);
  const [rop, setRop] = useState(80);
  const [vs, setVs] = useState(60);
  const [inc, setInc] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [apl, setApl] = useState(150);
  const [fg, setFg] = useState(10.5);
  const [nptD, setNptD] = useState(6);
  const [totD, setTotD] = useState(38);
  const [rate, setRate] = useState(85);
  const [fishK, setFishK] = useState(340);
  const [pS, setPS] = useState(60);
  const [stK, setStK] = useState(900);

  const dpPsi = overbalancePsi(mw, pf, tvd);
  const area = contactAreaIn2(lc, wc);
  const force = diffStickForceLb(dpPsi, area, mu);
  const fp = freePointFt(e, wpipe, pull);
  const va = annularVelocityFtMin(q, dh, dp);
  const vsEff = effectiveSlipFtMin(vs, inc, rpm);
  const ft = transportRatio(va, vsEff);
  const conc = cuttingsConcPct(rop, dh, q, ft);
  const qMin = minFlowForConcGpm(rop, dh, ft > 0 ? ft : 0.01, 5);
  const ecd = ecdPpg(mw, apl, tvd);
  const drop = levelDropFt(tvd, mw, pf);
  const pS01 = pS / 100;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Differensial yapışma" formula="ΔP = 0.052·(MW − Pf)·TVD;  F = ΔP·A·μ">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2">
          <Num label="TVD" unit="ft" value={tvd} onChange={setTvd} />
          <Num label="MW" unit="ppg" value={mw} onChange={setMw} />
          <Num label="Formasiya (ekv.)" unit="ppg" value={pf} onChange={setPf} />
          <Num label="Təmas uzunluğu" unit="ft" value={lc} onChange={setLc} />
          <Num label="Təmas eni" unit="in" value={wc} onChange={setWc} />
          <Num label="μ" unit="" value={mu} onChange={setMu} />
        </div>
        {ok(tvd, mw, pf, lc, wc, mu) && (
          <>
            <Out label="Overbalance" value={f(dpPsi, 0)} unit="psi" tone={dpPsi > 500 ? "warn" : undefined} />
            <Out label="Əlaqə sahəsi" value={f(area, 0)} unit="in²" />
            <Out label="Yapışma qüvvəsi" value={f(force, 0)} unit="lb" tone={force > 100000 ? "bad" : "good"} />
            <Note>Təmas sahəsi və μ real dəyərlərdən çox fərqlənə bilər. Nəticə yalnız göstəricidir və açma üçün dartma limiti boru və operator prosedurları ilə məhdudlaşır.</Note>
          </>
        )}
      </Card>

      <Card title="Free point" formula="L = 735,294·e·W/P">
        <div className="grid grid-cols-3 gap-x-2">
          <Num label="Uzanma e" unit="in" value={e} onChange={setE} />
          <Num label="Boru çəkisi W" unit="lb/ft" value={wpipe} onChange={setWpipe} />
          <Num label="Əlavə dartma P" unit="lb" value={pull} onChange={setPull} />
        </div>
        {ok(e, wpipe, pull) && pull > 0 && (
          <>
            <Out label="Free point dərinliyi" value={f(fp, 0)} unit="ft" tone="good" />
            <Note>Yapışma nöqtəsi bu dərinlikdən aşağıdadır. Wireline free-point aləti ilə dəqiqləşdirilir. Maili quyuda drag nəticəni təhrif edir.</Note>
          </>
        )}
      </Card>

      <Card title="Hole cleaning" formula="Va = 24.51·Q/(Dh² − Dp²);  C = 100·ROP·Dh²/(1471·Q·Ft)">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2">
          <Num label="Q" unit="gpm" value={q} onChange={setQ} />
          <Num label="Quyu Dh" unit="in" value={dh} onChange={setDh} />
          <Num label="Boru Dp" unit="in" value={dp} onChange={setDp} />
          <Num label="ROP" unit="ft/saat" value={rop} onChange={setRop} />
          <Num label="Slip sürəti" unit="ft/dəq" value={vs} onChange={setVs} />
          <Num label="Bucaq" unit="°" value={inc} onChange={setInc} />
          <Num label="Fırlanma" unit="rpm" value={rpm} onChange={setRpm} />
        </div>
        {ok(q, dh, dp, rop, vs, inc, rpm) && dh > dp && q > 0 && (
          <>
            <Out label="Annulus sürəti" value={f(va, 1)} unit="ft/dəq" />
            <Out label="Effektiv slip sürəti" value={f(vsEff, 1)} unit="ft/dəq" />
            <Out label="Transport nisbəti" value={f(ft, 3)} unit="" tone={ft < 0.5 ? "bad" : ft < 0.65 ? "warn" : "good"} />
            <Out label="Cuttings konsentrasiyası" value={Number.isFinite(conc) ? f(conc, 2) : "∞"} unit="%" tone={conc > 5 ? "bad" : conc > 3 ? "warn" : "good"} />
            <Out label="5% üçün minimal Q" value={f(qMin, 0)} unit="gpm" />
            <Note>Slip sürəti bucağa və fırlanmaya görə sadə əmsallarla düzəldilir (0° və 0 rpm-də daxil edilən qiymət olduğu kimi qalır). Real hesab üçün sənaye hole cleaning modelləri tələb olunur.</Note>
          </>
        )}
      </Card>

      <Card title="ECD və itki" formula="ECD = MW + APL/(0.052·TVD);  h = TVD − Pf·TVD/MW">
        <div className="grid grid-cols-3 gap-x-2">
          <Num label="APL" unit="psi" value={apl} onChange={setApl} />
          <Num label="Çat qradiyenti" unit="ppg" value={fg} onChange={setFg} />
        </div>
        {ok(apl, fg, tvd, mw, pf) && tvd > 0 && (
          <>
            <Out label="ECD" value={f(ecd, 2)} unit="ppg" />
            <Out label="Çat marjası" value={f(fg - ecd, 2)} unit="ppg" tone={fg - ecd < 0 ? "bad" : fg - ecd < 0.5 ? "warn" : "good"} />
            <Out label="Tam itkidə səviyyə düşməsi" value={f(drop, 0)} unit="ft" />
            <Out label="Hidrostatik azalma" value={f(hydroLossPsi(mw, drop), 0)} unit="psi" />
            <Out label="Itki sinfi (nümunə 40 bbl/saat)" value={lossClass(40)} unit="" />
            <Note>Yuxarıdakı MW, TVD və formasiya dəyərləri differensial yapışma kartından götürülür. Səviyyə düşməsi bütün itkinin dibdə baş verdiyi və formasiya təzyiqinin sabit qaldığı halı göstərir.</Note>
          </>
        )}
      </Card>

      <Card title="NPT hesabı" formula="NPT% = 100·t_NPT/t_total;  C = t_NPT·rate">
        <div className="grid grid-cols-3 gap-x-2">
          <Num label="NPT" unit="gün" value={nptD} onChange={setNptD} />
          <Num label="Ümumi vaxt" unit="gün" value={totD} onChange={setTotD} />
          <Num label="Spread rate" unit="min $/gün" value={rate} onChange={setRate} />
        </div>
        {ok(nptD, totD, rate) && (
          <>
            <Out label="NPT faizi" value={f(nptPct(nptD, totD), 1)} unit="%" tone={nptPct(nptD, totD) > 15 ? "bad" : nptPct(nptD, totD) > 8 ? "warn" : "good"} />
            <Out label="NPT dəyəri" value={f(nptCostK(nptD, rate), 0)} unit="min $" />
            <Note>Spread rate rig, xidmətlər və logistikanı daxil edən gündəlik dəyərdir. Real NPT hesabında bütün xərc maddələri nəzərə alınır.</Note>
          </>
        )}
      </Card>

      <Card title="Fishing və ya sidetrack" formula="E = F + (1 − p)·S;  p* = F/S">
        <div className="grid grid-cols-3 gap-x-2">
          <Num label="Fishing dəyəri F" unit="min $" value={fishK} onChange={setFishK} />
          <Num label="Uğur ehtimalı p" unit="%" value={pS} onChange={setPS} />
          <Num label="Sidetrack dəyəri S" unit="min $" value={stK} onChange={setStK} />
        </div>
        {ok(fishK, pS, stK) && stK > 0 && (
          <>
            <Out label="Fishing gözlənilən dəyəri" value={f(expectedFishCostK(fishK, pS01, stK), 0)} unit="min $" tone={expectedFishCostK(fishK, pS01, stK) < stK ? "good" : "bad"} />
            <Out label="Dərhal sidetrack" value={f(stK, 0)} unit="min $" />
            <Out label="Break-even uğur ehtimalı" value={f(100 * breakEvenSuccess(fishK, stK), 0)} unit="%" />
            <Note>Qərar yalnız gözlənilən dəyərlə verilmir: təhlükəsizlik, vaxt limiti, quyu məqsədi və geoloji risk də nəzərə alınır.</Note>
          </>
        )}
      </Card>
    </div>
  );
}
