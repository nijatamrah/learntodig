"use client";

import { useState } from "react";
import Slider from "../Slider";
import { afeWithContingencyK, costPerFootWell, timeCostK } from "@/lib/drilling/economics";

const ACCENT = "#FBBF24";
const FEET = 7200;
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default function AfeBreakdownVisual() {
  const [days, setDays] = useState(16.25);
  const [rate, setRate] = useState(85);
  const [casing, setCasing] = useState(420);
  const [bits, setBits] = useState(180);
  const [mud, setMud] = useState(310);
  const [cement, setCement] = useState(260);
  const [log, setLog] = useState(190);
  const [cont, setCont] = useState(12);

  const timeK = timeCostK(days, rate);
  const lines = [
    { k: "Vaxta bağlı (rig + xidmət)", v: timeK, c: "#FBBF24" },
    { k: "Casing və wellhead", v: casing, c: "#38BDF8" },
    { k: "Məhlul və kimyəvi", v: mud, c: "#34D399" },
    { k: "Sement", v: cement, c: "#A78BFA" },
    { k: "Logging", v: log, c: "#FB923C" },
    { k: "Bitlər", v: bits, c: "#F472B6" },
  ];
  const base = lines.reduce((a, l) => a + l.v, 0);
  const contK = (base * cont) / 100;
  const afe = afeWithContingencyK(base, cont);

  // waterfall
  const W = 460, H = 300, ml = 150, mr = 20, mt = 16, rowH = 34;
  const total = afe;
  const sx = (v: number) => ml + (v / total) * (W - ml - mr);
  let acc = 0;
  const rows = [...lines.map((l) => ({ ...l })), { k: `Contingency ${cont}%`, v: contK, c: "#F87171" }].map((l, i) => {
    const x0 = acc;
    acc += l.v;
    return { ...l, i, x0, x1: acc };
  });

  const timePct = (100 * timeK) / base;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>AFE: sətirlərin yığılması (waterfall)</p>
        <svg viewBox={`0 0 ${W} ${H + 40}`} className="w-full h-auto" role="img" aria-label="AFE waterfall">
          {rows.map((r) => {
            const y = mt + r.i * rowH;
            return (
              <g key={r.k}>
                <text x={ml - 8} y={y + 17} fontSize="10" textAnchor="end" fill="#B7C5DD">{r.k}</text>
                <rect x={sx(r.x0)} y={y + 4} width={Math.max(2, sx(r.x1) - sx(r.x0))} height={rowH - 12} rx="3" fill={r.c} opacity="0.9" />
                {sx(r.x1) + 34 > W - 6
                  ? <text x={sx(r.x0) - 5} y={y + 17} fontSize="10" textAnchor="end" fill="#F0F4FF" fontFamily="monospace">{f0(r.v)}</text>
                  : <text x={sx(r.x1) + 4} y={y + 17} fontSize="10" fill="#F0F4FF" fontFamily="monospace">{f0(r.v)}</text>}
                {r.i > 0 && <line x1={sx(r.x0)} x2={sx(r.x0)} y1={y - 6} y2={y + 4} stroke="rgba(255,255,255,0.25)" />}
              </g>
            );
          })}
          <g transform={`translate(0 ${mt + rows.length * rowH})`}>
            <rect x={sx(0)} y="4" width={sx(total) - sx(0)} height={rowH - 12} rx="3" fill="none" stroke={ACCENT} strokeWidth="2" />
            <text x={ml - 8} y="21" fontSize="11" textAnchor="end" fill={ACCENT} fontWeight="700">AFE</text>
            <text x={(sx(0) + sx(total)) / 2} y="21" fontSize="12" textAnchor="middle" fill={ACCENT} fontFamily="monospace" fontWeight="700">{f0(afe)} min $</text>
          </g>
          <line x1={sx(base)} x2={sx(base)} y1={mt - 4} y2={mt + rows.length * rowH} stroke="#8DA2BF" strokeDasharray="3 3" opacity="0.6" />
          <text x={sx(base)} y={H + 34} fontSize="9" textAnchor="middle" fill="#8DA2BF">əsas büdcə {f0(base)}</text>
        </svg>
        <div className="grid grid-cols-3 gap-2 mt-2 text-center font-['Space_Grotesk']">
          {[
            ["Əsas büdcə", `${f0(base)} min $`],
            ["Xərc/ft", `${f0(costPerFootWell(base, FEET))} $/ft`],
            ["Vaxt payı", `${f1(timePct)}%`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-[#101A2E] px-2 py-2">
              <p className="text-[10px] text-[#6B82A0]">{k}</p>
              <p className="font-mono text-[13px] font-bold text-[#F0F4FF]">{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 rounded-lg px-3 py-2 text-[12px] font-['Space_Grotesk'] bg-[#101A2E] text-[#9DB0CC]">
          Hər əlavə gün {f0(rate)} min $ əlavə edir: bu, əsas büdcənin {f1((100 * rate) / base)}%-ə bərabərdir. {f1((cont * base) / 100 / rate)} günlük NPT contingency-ni tükədir.
        </p>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Sətirləri dəyiş</p>
        <div className="space-y-3">
          <Slider label="Planlaşdırılmış müddət" unit="gün" value={days} min={8} max={40} step={0.25} accent="#FBBF24" onChange={setDays} decimals={2} />
          <Slider label="Spread rate" unit="min $/gün" value={rate} min={30} max={300} step={5} accent="#FBBF24" onChange={setRate} />
          <Slider label="Casing və wellhead" unit="min $" value={casing} min={100} max={1200} step={10} accent="#38BDF8" onChange={setCasing} />
          <Slider label="Məhlul və kimyəvi" unit="min $" value={mud} min={50} max={900} step={10} accent="#34D399" onChange={setMud} />
          <Slider label="Sement" unit="min $" value={cement} min={50} max={800} step={10} accent="#A78BFA" onChange={setCement} />
          <Slider label="Logging" unit="min $" value={log} min={20} max={600} step={10} accent="#FB923C" onChange={setLog} />
          <Slider label="Bitlər" unit="min $" value={bits} min={20} max={500} step={10} accent="#F472B6" onChange={setBits} />
          <Slider label="Contingency" unit="%" value={cont} min={0} max={40} step={1} accent="#F87171" onChange={setCont} />
        </div>
        <p className="text-[11px] text-[#6B82A0] mt-3 leading-relaxed font-['Space_Grotesk']">
          Nümunə quyu: 7,200 ft. Rəqəmlər təhsil məqsədlidir. Real AFE şirkətin xərc sətirləri, müqavilə və tərəfdaş şərtlərinə görə hazırlanır.
        </p>
        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <li>Müddəti 16.25-dən 25 günə qaldır: vaxt payı necə dəyişir?</li>
          <li>Spread rate-i ikiqat artır: hansı sətir ən çox böyüyür?</li>
          <li>Contingency-ni 0%-ə endir: bir neçə günlük NPT büdcəni aşırmı?</li>
        </ul>
      </div>
    </div>
  );
}
