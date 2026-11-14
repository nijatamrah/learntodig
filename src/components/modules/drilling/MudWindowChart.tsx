"use client";

import type { CasingSeat, ProfilePoint } from "@/lib/drilling/pressure";

interface Props {
  profile: ProfilePoint[];
  seats: CasingSeat[];
  td: number;
}

const W = 560;
const H = 560;
const M = { l: 58, r: 18, t: 18, b: 46 };

export default function MudWindowChart({ profile, seats, td }: Props) {
  const xMin = 8;
  const xMax = Math.ceil(Math.max(...profile.map((p) => p.obPpg))) + 1;
  const x = (v: number) => M.l + ((v - xMin) / (xMax - xMin)) * (W - M.l - M.r);
  const y = (d: number) => M.t + (d / td) * (H - M.t - M.b);

  const line = (key: "ppPpg" | "fgPpg" | "obPpg") =>
    profile.map((p, i) => `${i === 0 ? "M" : "L"}${x(p[key]).toFixed(1)},${y(p.d).toFixed(1)}`).join(" ");

  const windowPath =
    profile.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.ppPpg).toFixed(1)},${y(p.d).toFixed(1)}`).join(" ") +
    " " +
    [...profile].reverse().map((p) => `L${x(p.fgPpg).toFixed(1)},${y(p.d).toFixed(1)}`).join(" ") +
    " Z";

  const depthStep = td > 9000 ? 2000 : 1000;
  const depthTicks: number[] = [];
  for (let d = 0; d <= td; d += depthStep) depthTicks.push(d);
  const xTicks: number[] = [];
  for (let v = xMin; v <= xMax; v += 2) xTicks.push(v);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="img"
      aria-label="Mud window diaqramı: məsamə təzyiqi, çat qradiyenti və casing seat-lər">
      {xTicks.map((v) => (
        <g key={v}>
          <line x1={x(v)} x2={x(v)} y1={M.t} y2={H - M.b} stroke="rgba(255,255,255,0.05)" />
          <text x={x(v)} y={H - M.b + 16} textAnchor="middle" fontSize="10" fill="#6B82A0">{v}</text>
        </g>
      ))}
      {depthTicks.map((d) => (
        <g key={d}>
          <line x1={M.l} x2={W - M.r} y1={y(d)} y2={y(d)} stroke="rgba(255,255,255,0.05)" />
          <text x={M.l - 8} y={y(d) + 3} textAnchor="end" fontSize="10" fill="#6B82A0">{d}</text>
        </g>
      ))}
      <text x={(M.l + W - M.r) / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="#8DA2BF">Ekvivalent məhlul çəkisi, ppg</text>
      <text transform={`translate(14 ${(M.t + H - M.b) / 2}) rotate(-90)`} textAnchor="middle" fontSize="11" fill="#8DA2BF">TVD, ft</text>

      <path d={windowPath} fill="#34D399" opacity="0.08" />
      <path d={line("obPpg")} fill="none" stroke="#6B82A0" strokeWidth="1.5" strokeDasharray="5 4" />
      <path d={line("fgPpg")} fill="none" stroke="#F87171" strokeWidth="2" />
      <path d={line("ppPpg")} fill="none" stroke="#00D4FF" strokeWidth="2" />

      {/* Məhlul çəkisi proqramı */}
      {seats.map((s) => (
        <line key={`mw-${s.depth}`} x1={x(s.mwStart)} y1={y(s.depth)} x2={x(s.mwRequired)} y2={y(s.sectionBottom)}
          stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      ))}

      {/* Casing shoe-lar */}
      {seats.map((s) => (
        <g key={`shoe-${s.depth}`}>
          <line x1={M.l} x2={W - M.r} y1={y(s.depth)} y2={y(s.depth)} stroke="#FF6B2B" strokeDasharray="3 3" opacity="0.8" />
          <text x={W - M.r - 4} y={y(s.depth) - 4} textAnchor="end" fontSize="10" fill="#FF6B2B">
            shoe {s.depth.toLocaleString("en-US")} ft
          </text>
        </g>
      ))}

      {/* Legend */}
      <g fontSize="10" transform={`translate(${M.l + 8} ${M.t + 8})`}>
        {[
          ["#00D4FF", "Məsamə təzyiqi (Pp)"],
          ["#F87171", "Çat qradiyenti (FG)"],
          ["#6B82A0", "Overburden"],
          ["#FBBF24", "Məhlul çəkisi proqramı"],
        ].map(([c, t], i) => (
          <g key={t} transform={`translate(0 ${i * 14})`}>
            <line x1="0" x2="16" y1="4" y2="4" stroke={c} strokeWidth="2.5" />
            <text x="22" y="8" fill="#B7C5DD">{t}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}
