"use client";

import { useState } from "react";
import Slider from "../Slider";
import { expectedFishCostK, nptCostK, nptPct } from "@/lib/drilling/problems";

const ACCENT = "#FBBF24";
const TD = 8000;
const PLAN_DAYS = 30;
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const EVENTS = [
  { id: "equip", label: "Avadanlıq nasazlığı", color: "#A78BFA", at: 0.22, max: 8, def: 2 },
  { id: "stuck", label: "Stuck pipe", color: "#F87171", at: 0.45, max: 12, def: 4 },
  { id: "loss", label: "Lost circulation", color: "#38BDF8", at: 0.6, max: 10, def: 0 },
  { id: "wait", label: "Gözləmə (hava/material)", color: "#FB923C", at: 0.75, max: 8, def: 0 },
  { id: "wc", label: "Well control", color: "#34D399", at: 0.88, max: 6, def: 0 },
] as const;

const CW = 420;
const CH = 330;
const M = { l: 56, r: 16, t: 24, b: 38 };

// plan əyrisi: depth fraction p = (τ/PLAN_DAYS)^0.9
const planDepth = (tau: number) => TD * Math.pow(Math.min(1, Math.max(0, tau / PLAN_DAYS)), 0.9);
const tauAt = (p: number) => PLAN_DAYS * Math.pow(p, 1 / 0.9);

export default function NptVisual() {
  const [d, setD] = useState<Record<string, number>>(() => Object.fromEntries(EVENTS.map((e) => [e.id, e.def])));
  const [rate, setRate] = useState(85);
  const [fish, setFish] = useState(340);
  const [ps, setPs] = useState(60);
  const [side, setSide] = useState(900);

  const nptDays = EVENTS.reduce((s, e) => s + d[e.id], 0);
  const total = PLAN_DAYS + nptDays;
  const pct = nptPct(nptDays, total);
  const cost = nptCostK(nptDays, rate);

  // faktiki əyri: hadisələr sıra ilə, hər biri öz dərinliyində flat segment yaradır
  const evs = EVENTS.map((e) => ({ ...e, tau: tauAt(e.at), dur: d[e.id] })).sort((a, b) => a.tau - b.tau);
  const segs: { t0: number; t1: number; d0: number; d1: number; color: string; flat: boolean }[] = [];
  let tReal = 0;
  let tPrev = 0;
  evs.forEach((e) => {
    segs.push({ t0: tReal, t1: tReal + (e.tau - tPrev), d0: planDepth(tPrev), d1: planDepth(e.tau), color: "#FBBF24", flat: false });
    tReal += e.tau - tPrev;
    tPrev = e.tau;
    if (e.dur > 0) {
      segs.push({ t0: tReal, t1: tReal + e.dur, d0: planDepth(e.tau), d1: planDepth(e.tau), color: e.color, flat: true });
      tReal += e.dur;
    }
  });
  segs.push({ t0: tReal, t1: tReal + (PLAN_DAYS - tPrev), d0: planDepth(tPrev), d1: TD, color: "#FBBF24", flat: false });

  const tMax = Math.max(PLAN_DAYS + 12, total) * 1.02;
  const cx = (t: number) => M.l + (t / tMax) * (CW - M.l - M.r);
  const cy = (dep: number) => M.t + (dep / TD) * (CH - M.t - M.b);
  const planPath = Array.from({ length: 61 }, (_, i) => {
    const t = (i / 60) * PLAN_DAYS;
    return `${i ? "L" : "M"}${cx(t).toFixed(1)},${cy(planDepth(t)).toFixed(1)}`;
  }).join(" ");

  const ticks = [0, 10, 20, 30, 40, 50].filter((t) => t <= tMax);

  const eFish = expectedFishCostK(fish, ps / 100, side);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Time-depth: plan vs faktiki</p>
        <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Time-depth əyrisi, NPT düz hissələri">
          {[0, 2000, 4000, 6000, 8000].map((dep) => (
            <g key={dep}>
              <line x1={M.l} x2={CW - M.r} y1={cy(dep)} y2={cy(dep)} stroke="rgba(255,255,255,0.05)" />
              <text x={M.l - 5} y={cy(dep) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{f0(dep)}</text>
            </g>
          ))}
          {ticks.map((t) => (
            <g key={t}>
              <line x1={cx(t)} x2={cx(t)} y1={M.t} y2={CH - M.b} stroke="rgba(255,255,255,0.05)" />
              <text x={cx(t)} y={CH - M.b + 13} fontSize="9" textAnchor="middle" fill="#6B82A0">{t}</text>
            </g>
          ))}
          <text x={(M.l + CW - M.r) / 2} y={CH - 6} fontSize="10" textAnchor="middle" fill="#8DA2BF">Gün</text>
          <text transform={`translate(12 ${(M.t + CH - M.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">Dərinlik, ft</text>
          <path d={planPath} fill="none" stroke="#8DA2BF" strokeWidth="1.8" strokeDasharray="5 4" />
          {segs.map((s, i) => (
            <line key={i} x1={cx(s.t0)} y1={cy(s.d0)} x2={cx(s.t1)} y2={cy(s.d1)} stroke={s.color} strokeWidth={s.flat ? 4.5 : 2.8} strokeLinecap="round" />
          ))}
          <line x1={cx(PLAN_DAYS)} x2={cx(PLAN_DAYS)} y1={M.t} y2={CH - M.b} stroke="#8DA2BF" strokeDasharray="2 4" opacity="0.5" />
          <line x1={cx(total)} x2={cx(total)} y1={M.t} y2={CH - M.b} stroke={nptDays > 0 ? "#F87171" : "#34D399"} strokeDasharray="4 3" />
          <text x={cx(PLAN_DAYS) - 4} y={M.t + 10} fontSize="9" textAnchor="end" fill="#8DA2BF">plan {PLAN_DAYS} gün</text>
          <text x={cx(total) + 4} y={M.t + 22} fontSize="9" fill={nptDays > 0 ? "#FCA5A5" : "#A7F3D0"}>faktiki {f1(total)} gün</text>
        </svg>
        <div className="grid grid-cols-3 gap-2 mt-2 text-center font-['Space_Grotesk']">
          {[
            ["NPT", `${f1(nptDays)} gün`],
            ["NPT faizi", `${f1(pct)}%`],
            ["NPT dəyəri", `${f0(cost)} min $`],
          ].map(([k, v], i) => (
            <div key={k} className="rounded-xl bg-[#101A2E] px-2 py-2">
              <p className="text-[10px] text-[#6B82A0]">{k}</p>
              <p className="font-mono text-[13px] font-bold" style={{ color: i > 0 && pct > 15 ? "#F87171" : "#F0F4FF" }}>{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex h-3 rounded-full overflow-hidden bg-[#101A2E]">
          {EVENTS.map((e) => (d[e.id] > 0 ? <div key={e.id} title={e.label} style={{ width: `${(d[e.id] / Math.max(nptDays, 0.0001)) * 100}%`, background: e.color }} /> : null))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-['Space_Grotesk'] text-[#8DA2BF]">
          {EVENTS.map((e) => (
            <span key={e.id} className="inline-flex items-center gap-1.5"><i className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: e.color }} />{e.label}</span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Hadisələr və qərar</p>
        <div className="space-y-3">
          {EVENTS.map((e) => (
            <Slider key={e.id} label={e.label} unit="gün" value={d[e.id]} min={0} max={e.max} step={0.5} accent={e.color} onChange={(v) => setD((p) => ({ ...p, [e.id]: v }))} decimals={1} />
          ))}
          <Slider label="Spread rate" unit="min $/gün" value={rate} min={30} max={300} step={5} accent={ACCENT} onChange={setRate} />
        </div>

        <div className="mt-4 rounded-xl bg-[#101A2E] p-3">
          <p className="text-[12px] font-semibold text-[#F0F4FF] font-['Space_Grotesk'] mb-2">Fishing yoxsa sidetrack?</p>
          <div className="space-y-3">
            <Slider label="Fishing dəyəri F" unit="min $" value={fish} min={100} max={800} step={10} accent="#34D399" onChange={setFish} />
            <Slider label="Fishing uğur ehtimalı" unit="%" value={ps} min={10} max={95} step={5} accent="#38BDF8" onChange={setPs} />
            <Slider label="Sidetrack dəyəri S" unit="min $" value={side} min={300} max={2000} step={50} accent="#F87171" onChange={setSide} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center font-['Space_Grotesk']">
            {[
              ["Fishing gözlənilən", `${f0(eFish)} min $`],
              ["Sidetrack", `${f0(side)} min $`],
              ["Break-even p", `${f0((100 * fish) / side)}%`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-[#0D1525] px-2 py-2">
                <p className="text-[10px] text-[#6B82A0]">{k}</p>
                <p className="font-mono text-[12px] font-bold text-[#F0F4FF]">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 rounded-lg px-3 py-2 text-[12px] font-['Space_Grotesk']" style={{ background: eFish < side ? "#34D39914" : "#F8717114", color: eFish < side ? "#A7F3D0" : "#FCA5A5" }}>
            {eFish < side ? "Gözlənilən dəyərə görə fishing sərfəlidir, lakin vaxt limiti qoymaq lazımdır." : "Gözlənilən dəyərə görə sidetrack daha sərfəlidir."}
          </p>
        </div>
        <p className="text-[11px] text-[#6B82A0] mt-3 leading-relaxed font-['Space_Grotesk']">
          Model: sadələşdirilmiş time-depth əyrisi, hadisələr yalnız sabit dərinliklərdə düz hissə (flat) yaradır. Fishing uğursuz olsa sidetrack da edilir. Real qərar təhlükəsizlik, geologiya və vaxt limitini də nəzərə alır.
        </p>
        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <li>Stuck pipe-ı 4-dən 10 günə qaldır: NPT faizi və dəyər necə dəyişir?</li>
          <li>Uğur ehtimalını break-even-in altına sal: qərar necə dəyişir?</li>
        </ul>
      </div>
    </div>
  );
}
