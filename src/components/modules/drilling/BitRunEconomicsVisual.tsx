"use client";

import { useMemo, useState } from "react";
import Slider from "../Slider";
import { decayCpf, decayFootage, decayRop, optimalPullTime, type DecayBit } from "@/lib/drilling/bits";

const ACCENT = "#FBBF24";
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const W = 700;
const H = 360;
const M = { l: 60, r: 20, t: 24, b: 44 };

interface Cfg { name: string; color: string; cost: number; r0: number; halfLife: number }

export default function BitRunEconomicsVisual() {
  const [rig, setRig] = useState(1500);
  const [trip, setTrip] = useState(14);
  const [a, setA] = useState<Cfg>({ name: "Bit A (TCI)", color: "#F59E0B", cost: 18000, r0: 55, halfLife: 58 });
  const [b, setB] = useState<Cfg>({ name: "Bit B (PDC)", color: "#00D4FF", cost: 60000, r0: 85, halfLife: 154 });
  const [pull, setPull] = useState(60);

  const toBit = (c: Cfg): DecayBit => ({ bitCost: c.cost, rigRate: rig, tripHours: trip, r0: c.r0, k: Math.LN2 / c.halfLife });
  const A = toBit(a);
  const B = toBit(b);
  const tA = optimalPullTime(A);
  const tB = optimalPullTime(B);

  const tMax = Math.max(tA, tB, 60) * 1.8;
  const curves = useMemo(() => {
    const pts: { t: number; ca: number; cb: number }[] = [];
    for (let t = 6; t <= tMax; t += tMax / 120) pts.push({ t, ca: decayCpf(toBit(a), t), cb: decayCpf(toBit(b), t) });
    return pts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a, b, rig, trip, tMax]);
  const yMax = Math.min(200, Math.ceil(Math.max(decayCpf(A, tA), decayCpf(B, tB)) * 3 / 10) * 10);
  const x = (t: number) => M.l + (t / tMax) * (W - M.l - M.r);
  const y = (c: number) => H - M.b - (Math.min(c, yMax) / yMax) * (H - M.t - M.b);
  const path = (k: "ca" | "cb") => curves.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)},${y(p[k]).toFixed(1)}`).join(" ");

  const cpfA = decayCpf(A, tA);
  const cpfB = decayCpf(B, tB);
  const footA = decayFootage(A, tA);
  const footB = decayFootage(B, tB);
  const pullCpfA = decayCpf(A, pull);
  const pullCpfB = decayCpf(B, pull);
  const better = cpfA < cpfB ? a.name : b.name;

  const cfgControls = (c: Cfg, set: (c: Cfg) => void) => (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: c.color }}>{c.name}</p>
      <Slider label="Bit qiyməti" unit="$" value={c.cost} min={5000} max={120000} step={1000} accent={c.color} onChange={(v) => set({ ...c, cost: v })} />
      <Slider label="Başlanğıc ROP" unit="ft/hr" value={c.r0} min={20} max={200} step={1} accent={c.color} onChange={(v) => set({ ...c, r0: v })} />
      <Slider label="ROP-un yarıya düşmə vaxtı" unit="saat" value={c.halfLife} min={15} max={400} step={1} accent={c.color} onChange={(v) => set({ ...c, halfLife: v })} />
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.6fr)_330px] gap-6">
      <div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="img" aria-label="Qazma müddətinə görə cost per foot">
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <g key={t}>
              <line x1={M.l} x2={W - M.r} y1={M.t + t * (H - M.t - M.b)} y2={M.t + t * (H - M.t - M.b)} stroke="rgba(255,255,255,0.05)" />
              <text x={M.l - 6} y={M.t + t * (H - M.t - M.b) + 3} fontSize="10" textAnchor="end" fill="#6B82A0">{Math.round(yMax * (1 - t))}</text>
            </g>
          ))}
          {Array.from({ length: 6 }, (_, i) => Math.round((tMax / 5) * i / 10) * 10).map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={M.t} y2={H - M.b} stroke="rgba(255,255,255,0.04)" />
              <text x={x(t)} y={H - M.b + 14} fontSize="10" textAnchor="middle" fill="#6B82A0">{t}</text>
            </g>
          ))}
          <text x={(M.l + W - M.r) / 2} y={H - 8} fontSize="11" textAnchor="middle" fill="#8DA2BF">Bit-in qazma müddəti, saat</text>
          <text transform={`translate(14 ${(M.t + H - M.b) / 2}) rotate(-90)`} fontSize="11" textAnchor="middle" fill="#8DA2BF">Cost per foot, $/ft</text>

          <path d={path("ca")} fill="none" stroke={a.color} strokeWidth="2.4" />
          <path d={path("cb")} fill="none" stroke={b.color} strokeWidth="2.4" />
          <circle cx={x(tA)} cy={y(cpfA)} r="6" fill={a.color} stroke="#080C18" strokeWidth="2" />
          <circle cx={x(tB)} cy={y(cpfB)} r="6" fill={b.color} stroke="#080C18" strokeWidth="2" />
          <text x={x(tA)} y={y(cpfA) - 12} fontSize="10" textAnchor="middle" fill={a.color}>optimum: {f0(tA)} s</text>
          <text x={x(tB)} y={y(cpfB) - 12} fontSize="10" textAnchor="middle" fill={b.color}>optimum: {f0(tB)} s</text>
          <line x1={x(pull)} y1={M.t} x2={x(pull)} y2={H - M.b} stroke="#fff" strokeDasharray="4 3" />
          <text x={x(pull) + 4} y={M.t + 12} fontSize="10" fill="#fff">çıxarma: {pull} s</text>

          <g fontSize="10" transform={`translate(${W - 190} ${M.t + 8})`}>
            {[[a.color, a.name], [b.color, b.name]].map(([c, t], i) => (
              <g key={t} transform={`translate(0 ${i * 14})`}>
                <line x1="0" x2="16" y1="4" y2="4" stroke={c} strokeWidth="2.5" />
                <text x="22" y="8" fill="#B7C5DD">{t}</text>
              </g>
            ))}
          </g>
        </svg>
        <p className="text-[11px] text-[#6B82A0] mt-2 leading-relaxed font-['Space_Grotesk']">
          Model: ROP(t) = R₀·e^(−kt) (bit köhnəldikcə ROP azalır), CPF(t) = (bit + rig · (t + trip)) / qazılan məsafə. Minimum CPF nöqtəsi optimum çıxarma vaxtıdır:
          bu nöqtədə ani xərc (rig dərəcəsi / ROP) ümumi orta CPF-ə bərabərdir. Eksponensial azalma sadələşdirmədir; real ROP azalması formasiya və bit tipindən asılıdır.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Optimumda nəticə</p>
          <div className="grid grid-cols-3 gap-1 text-[11px] text-[#6B82A0] mb-1"><span /><span className="text-right" style={{ color: a.color }}>{a.name.split(" ")[1]}</span><span className="text-right" style={{ color: b.color }}>{b.name.split(" ")[1]}</span></div>
          {[
            ["Çıxarma vaxtı, saat", f0(tA), f0(tB)],
            ["Qazılan məsafə, ft", f0(footA), f0(footB)],
            ["Min. CPF, $/ft", f1(cpfA), f1(cpfB)],
            ["ROP (çıxarmada), ft/hr", f1(decayRop(A, tA)), f1(decayRop(B, tB))],
          ].map(([k, va, vb]) => (
            <div key={k} className="grid grid-cols-3 gap-1 border-t border-[rgba(255,255,255,0.05)] py-1.5 text-[12px]">
              <span className="text-[#8DA2BF]">{k}</span>
              <span className="text-right font-mono font-semibold text-[#F0F4FF]">{va}</span>
              <span className="text-right font-mono font-semibold text-[#F0F4FF]">{vb}</span>
            </div>
          ))}
          <p className="mt-3 rounded-lg px-3 py-2 text-[12px] bg-[#34D39914] text-[#A7F3D0]">Daha ucuz seçim: <b>{better}</b> ({f1(Math.min(cpfA, cpfB))} $/ft).</p>
          <div className="mt-3 text-[11px] text-[#8DA2BF] leading-relaxed">
            <p>{pull} saatda çıxarsan: {a.name.split(" ")[1]} {f1(pullCpfA)} $/ft, {b.name.split(" ")[1]} {f1(pullCpfB)} $/ft.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Ümumi şərtlər</p>
          <Slider label="Rig dərəcəsi" unit="$/saat" value={rig} min={500} max={6000} step={100} accent={ACCENT} onChange={setRig} />
          <Slider label="Trip vaxtı (bit dəyişməsi)" unit="saat" value={trip} min={4} max={60} step={1} accent={ACCENT} onChange={setTrip} />
          <Slider label="Çıxarma vaxtı (sınaq)" unit="saat" value={pull} min={10} max={300} step={5} accent={ACCENT} onChange={setPull} />
        </div>
        {cfgControls(a, setA)}
        {cfgControls(b, setB)}

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>Rig dərəcəsini 5,000 $/saat-a qaldır: bahalı bit nə vaxt daha sərfəli olur?</li>
            <li>Trip vaxtını artır (dərin quyu): optimum çıxarma vaxtı necə dəyişir?</li>
            <li>Bit-i optimum vaxtdan tez və gec çıxar: CPF-in necə dəyişdiyinə bax.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
