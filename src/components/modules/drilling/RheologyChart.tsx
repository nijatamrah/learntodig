"use client";

import { binghamDial, herschelBulkleyDial, powerLawDial, type RheologyInput } from "@/lib/drilling/fluids";

const W = 520;
const H = 340;
const M = { l: 52, r: 14, t: 14, b: 42 };

export default function RheologyChart({ r }: { r: RheologyInput }) {
  const ok = r.t600 > r.t300 && r.t300 > 0;
  if (!ok) return null;

  const yMax = Math.ceil((r.t600 * 1.05) / 10) * 10;
  const x = (rpm: number) => M.l + (rpm / 600) * (W - M.l - M.r);
  const y = (v: number) => H - M.b - (v / yMax) * (H - M.t - M.b);

  const rpms: number[] = [];
  for (let n = 3; n <= 600; n += n < 30 ? 3 : 9) rpms.push(n);
  rpms.push(600);
  const hbOk = (() => {
    const tau0 = Math.max(0, 2 * r.t3 - r.t6);
    return r.t300 > tau0 && r.t600 > tau0;
  })();

  const path = (fn: (rpm: number) => number) => rpms.map((n, i) => `${i ? "L" : "M"}${x(n).toFixed(1)},${y(fn(n)).toFixed(1)}`).join(" ");
  const pts = [
    { n: 600, v: r.t600 },
    { n: 300, v: r.t300 },
    { n: 6, v: r.t6 },
    { n: 3, v: r.t3 },
  ];

  const yTicks = Array.from({ length: 5 }, (_, i) => Math.round((yMax / 4) * i));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-xl bg-[#080C18] border border-[rgba(255,255,255,0.06)]" role="img" aria-label="Rheology modelləri və ölçülmüş nöqtələr">
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={M.l} x2={W - M.r} y1={y(t)} y2={y(t)} stroke="rgba(255,255,255,0.05)" />
          <text x={M.l - 6} y={y(t) + 3} textAnchor="end" fontSize="10" fill="#6B82A0">{t}</text>
        </g>
      ))}
      {[0, 100, 200, 300, 400, 500, 600].map((n) => (
        <g key={n}>
          <line x1={x(n)} x2={x(n)} y1={M.t} y2={H - M.b} stroke="rgba(255,255,255,0.04)" />
          <text x={x(n)} y={H - M.b + 14} textAnchor="middle" fontSize="10" fill="#6B82A0">{n}</text>
        </g>
      ))}
      <text x={(M.l + W - M.r) / 2} y={H - 6} textAnchor="middle" fontSize="11" fill="#8DA2BF">RPM (kəsilmə sürəti ≈ 1.703 · rpm, 1/s)</text>
      <text transform={`translate(13 ${(M.t + H - M.b) / 2}) rotate(-90)`} textAnchor="middle" fontSize="11" fill="#8DA2BF">Dial oxunuşu θ</text>

      <path d={path((n) => binghamDial(r, n))} fill="none" stroke="#F87171" strokeWidth="1.8" />
      <path d={path((n) => powerLawDial(r, n))} fill="none" stroke="#00D4FF" strokeWidth="1.8" />
      {hbOk && <path d={path((n) => herschelBulkleyDial(r, n))} fill="none" stroke="#FBBF24" strokeWidth="2.2" />}
      {pts.map((p) => (
        <circle key={p.n} cx={x(p.n)} cy={y(p.v)} r="4.5" fill="#F0F4FF" stroke="#080C18" strokeWidth="1.5" />
      ))}

      <g fontSize="10" transform={`translate(${W - 175} ${M.t + 8})`}>
        {[
          ["#F0F4FF", "Ölçülmüş (600/300/6/3)", true],
          ["#F87171", "Bingham", false],
          ["#00D4FF", "Power law", false],
          ["#FBBF24", "Herschel-Bulkley", false],
        ].map(([c, t, dot], i) => (
          <g key={String(t)} transform={`translate(0 ${i * 14})`}>
            {dot ? <circle cx="8" cy="4" r="3.5" fill={String(c)} /> : <line x1="0" x2="16" y1="4" y2="4" stroke={String(c)} strokeWidth="2.5" />}
            <text x="22" y="8" fill="#B7C5DD">{String(t)}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}
