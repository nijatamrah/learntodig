"use client";

import { useState } from "react";
import {
  C,
  eatonSonicPoreGradient,
  hydrostaticPsi,
  leakOffEmw,
  ppgFromGradient,
} from "@/lib/drilling/pressure";
import { Card, Num, Out, fmt as f, ok } from "./CalcParts";

export default function PressureCalculators() {
  // A: hidrostatik + overbalance
  const [mw, setMw] = useState(12.4);
  const [tvd, setTvd] = useState(9500);
  const [ppGrad, setPpGrad] = useState(0.62);
  // B: Eaton sonik
  const [obg, setObg] = useState(1.0);
  const [npg, setNpg] = useState(0.465);
  const [dtn, setDtn] = useState(90);
  const [dto, setDto] = useState(110);
  const [tvdB, setTvdB] = useState(10000);
  // C: LOT
  const [mwT, setMwT] = useState(10.0);
  const [lo, setLo] = useState(1450);
  const [shoe, setShoe] = useState(6000);
  const [margin, setMargin] = useState(0.5);

  const ph = hydrostaticPsi(mw, tvd);
  const pp = ppGrad * tvd;
  const ob = ph - pp;

  const eGrad = eatonSonicPoreGradient({ obGradient: obg, normalGradient: npg, dtNormal: dtn, dtObserved: dto });
  const lotEmw = leakOffEmw(mwT, lo, shoe);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card title="Hidrostatik təzyiq və overbalance" formula="Ph = 0.052 · MW · TVD">
        <Num label="Məhlul çəkisi MW" unit="ppg" value={mw} onChange={setMw} />
        <Num label="Dərinlik TVD" unit="ft" value={tvd} onChange={setTvd} />
        <Num label="Məsamə təzyiqi qradiyenti" unit="psi/ft" value={ppGrad} onChange={setPpGrad} />
        {ok(mw, tvd, ppGrad) && (
          <>
            <Out label="Hidrostatik təzyiq" value={f(ph)} unit="psi" />
            <Out label="Məhlul qradiyenti" value={f(C * mw, 3)} unit="psi/ft" />
            <Out label="Məsamə təzyiqi" value={f(pp)} unit="psi" />
            <Out label="Pp ekvivalenti" value={f(ppgFromGradient(ppGrad), 2)} unit="ppg" />
            <Out
              label={ob >= 0 ? "Overbalance" : "UNDERBALANCE"}
              value={f(ob)}
              unit="psi"
              tone={ob >= 0 ? "good" : "bad"}
            />
            {ob < 0 && <p className="text-[11px] text-[#FCA5A5] mt-2 font-['Space_Grotesk']">Quyu təzyiqi formasiya təzyiqindən aşağıdır: kick riski.</p>}
          </>
        )}
      </Card>

      <Card title="Eaton: sonik loqdan Pp" formula="Pp/D = OBG − (OBG − NPG)·(Δtn/Δto)³">
        <Num label="Overburden qradiyenti OBG" unit="psi/ft" value={obg} onChange={setObg} />
        <Num label="Normal qradiyent NPG" unit="psi/ft" value={npg} onChange={setNpg} />
        <Num label="Normal trend Δtn" unit="µs/ft" value={dtn} onChange={setDtn} />
        <Num label="Ölçülmüş Δto" unit="µs/ft" value={dto} onChange={setDto} />
        <Num label="Dərinlik TVD" unit="ft" value={tvdB} onChange={setTvdB} />
        {ok(obg, npg, dtn, dto, tvdB) && dto > 0 && (
          <>
            <Out label="Pp qradiyenti" value={f(eGrad, 3)} unit="psi/ft" />
            <Out label="Pp ekvivalenti" value={f(ppgFromGradient(eGrad), 2)} unit="ppg" />
            <Out label="Pp" value={f(eGrad * tvdB)} unit="psi" />
            <p className="text-[11px] text-[#6B82A0] mt-2 font-['Space_Grotesk']">
              {dto > dtn ? "Δto > Δtn: normal trenddən kənarlaşma, anormal təzyiq əlaməti." : "Δto ≤ Δtn: normal trend daxilində."}
            </p>
          </>
        )}
      </Card>

      <Card title="Leak-off test (LOT)" formula="EMW = MW + P_leak / (0.052 · TVD_shoe)">
        <Num label="Test zamanı MW" unit="ppg" value={mwT} onChange={setMwT} />
        <Num label="Səthdə leak-off təzyiqi" unit="psi" value={lo} onChange={setLo} />
        <Num label="Shoe TVD" unit="ft" value={shoe} onChange={setShoe} />
        <Num label="Təhlükəsizlik margini" unit="ppg" value={margin} onChange={setMargin} />
        {ok(mwT, lo, shoe, margin) && shoe > 0 && (
          <>
            <Out label="Shoe-da çat EMW" value={f(lotEmw, 2)} unit="ppg" />
            <Out label="Maks. icazəli MW" value={f(lotEmw - margin, 2)} unit="ppg" tone="good" />
            <Out label="Shoe-da çat təzyiqi" value={f(lotEmw * C * shoe)} unit="psi" />
            <p className="text-[11px] text-[#6B82A0] mt-2 font-['Space_Grotesk']">
              Kick tolerance və MAASP hesablamaları bu dəyərə əsaslanır (Well Control bölməsində).
            </p>
          </>
        )}
      </Card>
    </div>
  );
}
