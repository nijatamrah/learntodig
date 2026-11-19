"use client";

import { useState } from "react";
import Slider from "../Slider";
import { sectionHours, timeCostK } from "@/lib/drilling/economics";

const ACCENT = "#FBBF24";
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

interface Sec { name: string; from: number; to: number; color: string }
const SECS: Sec[] = [
  { name: "Səth bölməsi", from: 0, to: 1500, color: "#38BDF8" },
  { name: "Aralıq bölmə", from: 1500, to: 4500, color: "#34D399" },
  { name: "Məhsuldar bölmə", from: 4500, to: 7200, color: "#A78BFA" },
];

const CW = 440;
const CH = 330;
const M = { l: 54, r: 54, t: 22, b: 38 };

type Seg = { d0: number; d1: number; h0: number; h1: number; kind: "drill" | "trip" | "casing" | "other"; color: string };

function build(rops: number[], trips: number[], casings: number[], other: number, boost: number) {
  const segs: Seg[] = [];
  let h = 0;
  SECS.forEach((s, i) => {
    const feet = s.to - s.from;
    const rop = rops[i] * boost;
    const t = sectionHours({ feet, ropFtHr: rop, standFt: 90, connHr: 0.15, tripHr: trips[i] / (boost > 1 ? 1.2 : 1), casingHr: casings[i], otherHr: i === 2 ? other : 0 });
    const drill = t.drillH + t.connH;
    segs.push({ d0: s.from, d1: s.to, h0: h, h1: h + drill, kind: "drill", color: s.color });
    h += drill;
    segs.push({ d0: s.to, d1: s.to, h0: h, h1: h + t.tripH, kind: "trip", color: "#FBBF24" });
    h += t.tripH;
    segs.push({ d0: s.to, d1: s.to, h0: h, h1: h + t.casingH, kind: "casing", color: "#F87171" });
    h += t.casingH;
    if (t.otherH > 0) {
      segs.push({ d0: s.to, d1: s.to, h0: h, h1: h + t.otherH, kind: "other", color: "#FB923C" });
      h += t.otherH;
    }
  });
  return { segs, hours: h };
}

export default function TimeDepthPlanVisual() {
  const [r1, setR1] = useState(60);
  const [r2, setR2] = useState(45);
  const [r3, setR3] = useState(35);
  const [tr, setTr] = useState(42);
  const [cs, setCs] = useState(96);
  const [oth, setOth] = useState(60);
  const [rate, setRate] = useState(85);
  const [opt, setOpt] = useState(false);

  const trips = [tr * 0.2, tr * 0.35, tr * 0.45];
  const casings = [cs * 0.2, cs * 0.35, cs * 0.45];
  const base = build([r1, r2, r3], trips, casings, oth, 1);
  const better = build([r1, r2, r3], trips, casings, oth, 1.15);
  const shown = opt ? better : base;
  const days = shown.hours / 24;
  const cost = timeCostK(days, rate);
  const saved = (base.hours - better.hours) / 24;

  const tMax = Math.max(base.hours, 24 * 10) / 24 * 1.05;
  const cx = (h: number) => M.l + (h / 24 / tMax) * (CW - M.l - M.r);
  const cy = (d: number) => M.t + (d / 7200) * (CH - M.t - M.b);
  const costY = (c: number) => CH - M.b - (c / (tMax * rate)) * (CH - M.t - M.b);
  const pathOf = (segs: Seg[]) => segs.map((s, i) => `${i ? "L" : "M"}${cx(s.h0).toFixed(1)},${cy(s.d0).toFixed(1)} L${cx(s.h1).toFixed(1)},${cy(s.d1).toFixed(1)}`).join(" ");
  const tickDays = Array.from({ length: Math.floor(tMax / 5) + 1 }, (_, i) => i * 5);

  const totalsByKind = (segs: Seg[]) => {
    const m: Record<string, number> = { drill: 0, trip: 0, casing: 0, other: 0 };
    segs.forEach((s) => (m[s.kind] += s.h1 - s.h0));
    return m;
  };
  const by = totalsByKind(shown.segs);
  const flatPct = (100 * (by.trip + by.casing + by.other)) / shown.hours;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Time-depth plan və kumulativ xərc</p>
        <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Time-depth planı">
          {[0, 2000, 4000, 6000].concat([7200]).map((d) => (
            <g key={d}>
              <line x1={M.l} x2={CW - M.r} y1={cy(d)} y2={cy(d)} stroke="rgba(255,255,255,0.05)" />
              <text x={M.l - 5} y={cy(d) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{f0(d)}</text>
            </g>
          ))}
          {tickDays.map((t) => (
            <g key={t}>
              <line x1={cx(t * 24)} x2={cx(t * 24)} y1={M.t} y2={CH - M.b} stroke="rgba(255,255,255,0.05)" />
              <text x={cx(t * 24)} y={CH - M.b + 13} fontSize="9" textAnchor="middle" fill="#6B82A0">{t}</text>
            </g>
          ))}
          <text x={(M.l + CW - M.r) / 2} y={CH - 6} fontSize="10" textAnchor="middle" fill="#8DA2BF">Gün</text>
          <text transform={`translate(12 ${(M.t + CH - M.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">Dərinlik, ft</text>
          <text transform={`translate(${CW - 10} ${(M.t + CH - M.b) / 2}) rotate(90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">Kumulativ xərc, min $</text>
          {[0, 0.5, 1].map((t) => (
            <text key={t} x={CW - M.r + 5} y={costY(t * tMax * rate) + 3} fontSize="9" fill="#6B82A0">{f0(t * tMax * rate)}</text>
          ))}
          {opt && <path d={pathOf(base.segs)} fill="none" stroke="#8DA2BF" strokeWidth="1.8" strokeDasharray="5 4" />}
          {shown.segs.map((s, i) => (
            <line key={i} x1={cx(s.h0)} y1={cy(s.d0)} x2={cx(s.h1)} y2={cy(s.d1)} stroke={s.color} strokeWidth={s.kind === "drill" ? 2.8 : 5} strokeLinecap="round" />
          ))}
          <line x1={cx(0)} y1={costY(0)} x2={cx(shown.hours)} y2={costY(cost)} stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeDasharray="2 3" />
          <circle cx={cx(shown.hours)} cy={cy(7200)} r="5" fill="#34D399" stroke="#080C18" strokeWidth="2" />
          <text x={cx(shown.hours) - 6} y={cy(7200) - 8} fontSize="10" textAnchor="end" fill="#A7F3D0">TD: {f1(days)} gün</text>
        </svg>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-['Space_Grotesk'] text-[#8DA2BF] mt-1">
          {SECS.map((s) => <span key={s.name} className="inline-flex items-center gap-1.5"><i className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />{s.name}</span>)}
          <span className="inline-flex items-center gap-1.5"><i className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: "#FBBF24" }} />trip</span>
          <span className="inline-flex items-center gap-1.5"><i className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: "#F87171" }} />casing/sement</span>
          <span className="inline-flex items-center gap-1.5"><i className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: "#FB923C" }} />digər</span>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2 text-center font-['Space_Grotesk']">
          {[
            ["Müddət", `${f1(days)} gün`],
            ["Vaxt xərci", `${f0(cost)} min $`],
            ["Qazma payı", `${f1(100 - flatPct)}%`],
            ["Düz vaxt", `${f1(flatPct)}%`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-[#101A2E] px-2 py-2">
              <p className="text-[10px] text-[#6B82A0]">{k}</p>
              <p className="font-mono text-[12px] font-bold text-[#F0F4FF]">{v}</p>
            </div>
          ))}
        </div>
        {opt && (
          <p className="mt-2 rounded-lg px-3 py-2 text-[12px] font-['Space_Grotesk'] bg-[#34D39914] text-[#A7F3D0]">
            Optimallaşdırma: {f1(saved)} gün və {f0(saved * rate)} min $ qənaət. Qırıq xətt əsas planı göstərir.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Plan parametrləri</p>
        <div className="space-y-3">
          <Slider label="ROP: səth bölməsi" unit="ft/saat" value={r1} min={15} max={150} step={5} accent="#38BDF8" onChange={setR1} />
          <Slider label="ROP: aralıq bölmə" unit="ft/saat" value={r2} min={15} max={120} step={5} accent="#34D399" onChange={setR2} />
          <Slider label="ROP: məhsuldar bölmə" unit="ft/saat" value={r3} min={10} max={100} step={5} accent="#A78BFA" onChange={setR3} />
          <Slider label="Bütün trip-lər" unit="saat" value={tr} min={10} max={120} step={2} accent="#FBBF24" onChange={setTr} />
          <Slider label="Casing və sement işləri" unit="saat" value={cs} min={30} max={200} step={4} accent="#F87171" onChange={setCs} />
          <Slider label="Logging və digər" unit="saat" value={oth} min={0} max={150} step={5} accent="#FB923C" onChange={setOth} />
          <Slider label="Spread rate" unit="min $/gün" value={rate} min={30} max={300} step={5} accent={ACCENT} onChange={setRate} />
        </div>
        <button onClick={() => setOpt((v) => !v)} className="mt-3 px-3.5 py-2 rounded-xl text-[12px] font-semibold font-['Space_Grotesk'] border" style={{ borderColor: opt ? "#34D399" : "rgba(255,255,255,0.15)", color: opt ? "#34D399" : "#8DA2BF", background: opt ? "#34D39914" : "transparent" }}>
          Optimallaşdırma ssenarisi: {opt ? "aktiv (ROP +15%, trip −17%)" : "söndürülü"}
        </button>
        <p className="text-[11px] text-[#6B82A0] mt-3 leading-relaxed font-['Space_Grotesk']">
          Model: 7,200 ft, üç bölmə, stand 90 ft, bağlantı 0.15 saat. Trip və casing saatları bölmələr arasında 20/35/45% bölünür. Bu yalnız planlaşdırma nümunəsidir, real plan quyu dizaynına görə hazırlanır.
        </p>
        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <li>Düz hissələr (trip, casing) planın neçə faizini tutur? Hansını azaltmaq asandır?</li>
          <li>Məhsuldar bölmədə ROP-u 35-dən 20-yə sal: ümumi müddətə və xərcə təsiri?</li>
        </ul>
      </div>
    </div>
  );
}
