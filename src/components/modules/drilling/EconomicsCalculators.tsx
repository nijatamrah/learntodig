"use client";

import { useState } from "react";
import {
  afeWithContingencyK,
  bitRunCostPerFoot,
  breakEvenPg,
  costPerFootWell,
  emvK,
  learningDays,
  sectionHours,
  sumK,
  timeCostK,
  triMean,
} from "@/lib/drilling/economics";
import { Card, Note, Num, Out, fmt as f, ok } from "./CalcParts";

export default function EconomicsCalculators() {
  const [feet, setFeet] = useState(7200);
  const [rop, setRop] = useState(40);
  const [stand, setStand] = useState(90);
  const [conn, setConn] = useState(0.15);
  const [trip, setTrip] = useState(42);
  const [casing, setCasing] = useState(96);
  const [other, setOther] = useState(60);
  const [rate, setRate] = useState(85);
  const [tang, setTang] = useState(1360);
  const [cont, setCont] = useState(12);

  const [bitCost, setBitCost] = useState(28000);
  const [bd, setBd] = useState(60);
  const [bc, setBc] = useState(3);
  const [bt, setBt] = useState(12);
  const [bf, setBf] = useState(2400);

  const [d1, setD1] = useState(16.25);
  const [n, setN] = useState(4);
  const [lr, setLr] = useState(90);
  const [floorD, setFloorD] = useState(10);

  const [tmin, setTmin] = useState(12);
  const [tml, setTml] = useState(16);
  const [tmax, setTmax] = useState(26);

  const [nptD, setNptD] = useState(4);

  const [pg, setPg] = useState(35);
  const [pv, setPv] = useState(9500);

  const s = sectionHours({ feet, ropFtHr: rop, standFt: stand, connHr: conn, tripHr: trip, casingHr: casing, otherHr: other });
  const tc = timeCostK(s.days, rate);
  const base = sumK([tc, tang]);
  const afe = afeWithContingencyK(base, cont);
  const lcDays = learningDays(d1, n, lr / 100, floorD);
  const mean = triMean(tmin, tml, tmax);
  const nptCost = timeCostK(nptD, rate);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Vaxt və AFE" formula="t = qazma + bağlantı + trip + casing + digər;  AFE = (C_t + ΣC)·(1 + c%)">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2">
          <Num label="Qazılacaq" unit="ft" value={feet} onChange={setFeet} />
          <Num label="ROP" unit="ft/saat" value={rop} onChange={setRop} />
          <Num label="Stand" unit="ft" value={stand} onChange={setStand} />
          <Num label="Bağlantı" unit="saat" value={conn} onChange={setConn} />
          <Num label="Trip" unit="saat" value={trip} onChange={setTrip} />
          <Num label="Casing/sement" unit="saat" value={casing} onChange={setCasing} />
          <Num label="Digər" unit="saat" value={other} onChange={setOther} />
          <Num label="Spread rate" unit="min $/gün" value={rate} onChange={setRate} />
          <Num label="Tangible + xidmət" unit="min $" value={tang} onChange={setTang} />
          <Num label="Contingency" unit="%" value={cont} onChange={setCont} />
        </div>
        {ok(feet, rop, stand, conn, trip, casing, other, rate, tang, cont) && rop > 0 && stand > 0 && (
          <>
            <Out label="Qazma saatı" value={f(s.drillH, 1)} unit="saat" />
            <Out label="Bağlantı saatı" value={f(s.connH, 1)} unit="saat" />
            <Out label="Ümumi müddət" value={f(s.days, 2)} unit="gün" tone="good" />
            <Out label="Vaxta bağlı xərc" value={f(tc, 1)} unit="min $" />
            <Out label="Əsas büdcə" value={f(base, 1)} unit="min $" />
            <Out label="AFE (contingency ilə)" value={f(afe, 1)} unit="min $" tone="good" />
            <Out label="Xərc/ft (əsas)" value={f(costPerFootWell(base, feet), 1)} unit="$/ft" />
            <Note>Tangible + xidmət sahəsinə casing, wellhead, bit, məhlul, sement, logging sətirləri cəm halında daxil edilir (nümunədə 420 + 180 + 310 + 260 + 190 = 1,360).</Note>
          </>
        )}
      </Card>

      <Card title="Bit run xərc/ft" formula="CPF = (C_b + R_h·(t_d + t_c + t_trip)) / F">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2">
          <Num label="Bit dəyəri" unit="$" value={bitCost} onChange={setBitCost} />
          <Num label="Qazma" unit="saat" value={bd} onChange={setBd} />
          <Num label="Bağlantı" unit="saat" value={bc} onChange={setBc} />
          <Num label="Trip" unit="saat" value={bt} onChange={setBt} />
          <Num label="Qazılan" unit="ft" value={bf} onChange={setBf} />
        </div>
        {ok(bitCost, bd, bc, bt, bf, rate) && bf > 0 && (
          <>
            <Out label="Saatlıq rig dərəcəsi" value={f((rate * 1000) / 24, 0)} unit="$/saat" />
            <Out label="Run xərci" value={f(bitCost + ((rate * 1000) / 24) * (bd + bc + bt), 0)} unit="$" />
            <Out label="Xərc/ft" value={f(bitRunCostPerFoot(bitCost, rate, bd, bc, bt, bf), 1)} unit="$/ft" tone="good" />
            <Note>Spread rate yuxarıdakı kartdan götürülür. Fərqli bitləri müqayisə edərkən ROP, ömür və trip sayı birlikdə nəzərə alınmalıdır.</Note>
          </>
        )}
      </Card>

      <Card title="Learning curve" formula="D_n = D_1·n^(log₂ LR);  texniki limitdə dayanır">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2">
          <Num label="1-ci quyu" unit="gün" value={d1} onChange={setD1} />
          <Num label="Quyu sayı n" unit="" value={n} onChange={setN} />
          <Num label="LR" unit="%" value={lr} onChange={setLr} />
          <Num label="Texniki limit" unit="gün" value={floorD} onChange={setFloorD} />
        </div>
        {ok(d1, n, lr, floorD) && lr > 0 && n >= 1 && (
          <>
            <Out label={`${f(n, 0)}-cü quyunun müddəti`} value={f(lcDays, 2)} unit="gün" tone="good" />
            <Out label="Qənaət (1-ci quyuya görə)" value={f(d1 - lcDays, 2)} unit="gün" />
            <Out label="Qənaətin dəyəri" value={f((d1 - lcDays) * rate, 0)} unit="min $" />
            <Note>Texniki limit azalmanı məhdudlaşdırır. LR 100% olsa, öyrənmə yoxdur.</Note>
          </>
        )}
      </Card>

      <Card title="Müddət qiymətləndirməsi (üçbucaq)" formula="μ = (a + m + b)/3">
        <div className="grid grid-cols-3 gap-x-2">
          <Num label="Minimum" unit="gün" value={tmin} onChange={setTmin} />
          <Num label="Ehtimal olunan" unit="gün" value={tml} onChange={setTml} />
          <Num label="Maksimum" unit="gün" value={tmax} onChange={setTmax} />
        </div>
        {ok(tmin, tml, tmax) && tmax >= tmin && (
          <>
            <Out label="Orta müddət" value={f(mean, 1)} unit="gün" tone="good" />
            <Out label="Orta ilə ehtimal olunan fərqi" value={f(mean - tml, 1)} unit="gün" tone={mean - tml > 1 ? "warn" : undefined} />
            <Out label="Orta vaxt xərci" value={f(mean * rate, 0)} unit="min $" />
            <Note>Üçbucaq paylanmanın ortası, uzun sağ quyruq olduqda ehtimal olunandan böyük olur. Dəqiq P10/P50/P90 üçün Monte Carlo (Vizual tab-ı) lazımdır.</Note>
          </>
        )}
      </Card>

      <Card title="NPT-nin büdcəyə təsiri" formula="ΔC = t_NPT·R;  istehlak = ΔC / C_base">
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="NPT" unit="gün" value={nptD} onChange={setNptD} />
        </div>
        {ok(nptD, rate, cont) && base > 0 && (
          <>
            <Out label="NPT dəyəri" value={f(nptCost, 0)} unit="min $" />
            <Out label="Əsas büdcənin %-i" value={f((100 * nptCost) / base, 1)} unit="%" tone={(100 * nptCost) / base > cont ? "bad" : "good"} />
            <Out label="Contingency" value={f(cont, 0)} unit="%" />
            <Note>Əsas büdcə yuxarıdakı kartdan götürülür. NPT contingency-dən çox olduqda supplement AFE ehtimal edilir.</Note>
          </>
        )}
      </Card>

      <Card title="Quyu EMV" formula="EMV = P_g·PV − C_well;  P_g* = C_well/PV">
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="Uğur ehtimalı" unit="%" value={pg} onChange={setPg} />
          <Num label="Uğurda PV" unit="min $" value={pv} onChange={setPv} />
        </div>
        {ok(pg, pv, afe) && pv > 0 && (
          <>
            <Out label="Quyu xərci (AFE)" value={f(afe, 0)} unit="min $" />
            <Out label="EMV" value={f(emvK(pg / 100, pv, afe), 0)} unit="min $" tone={emvK(pg / 100, pv, afe) >= 0 ? "good" : "bad"} />
            <Out label="Break-even P_g" value={f(100 * breakEvenPg(pv, afe), 1)} unit="%" />
            <Note>PV tamamlama xərcini artıq çıxıb. Real iqtisadi qiymətləndirmə vergi, royalty, qiymət ssenariləri və diskont dərəcəsini daxil edir.</Note>
          </>
        )}
      </Card>
    </div>
  );
}
