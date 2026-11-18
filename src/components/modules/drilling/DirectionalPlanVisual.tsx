"use client";

import { useMemo, useState } from "react";
import Slider from "../Slider";
import { buildHold } from "@/lib/drilling/directional";

const ACCENT = "#FBBF24";
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const f2 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const W = 600;
const H = 540;
const M = { l: 58, r: 24, t: 36, b: 36 };

export default function DirectionalPlanVisual() {
  const [kop, setKop] = useState(2000);
  const [bur, setBur] = useState(3);
  const [tvd, setTvd] = useState(9000);
  const [hd, setHd] = useState(3000);
  const [dlsLimit, setDlsLimit] = useState(6);

  const bh = useMemo(() => buildHold({ kop, burDegPer100: bur, targetTvd: tvd, targetHd: hd }), [kop, bur, tvd, hd]);

  // yol nöqtələri (HD, TVD)
  const pts = useMemo(() => {
    const out: [number, number][] = [[0, 0], [0, kop]];
    if (bh.valid) {
      const th = (bh.tangentIncDeg * Math.PI) / 180;
      const n = 40;
      for (let i = 1; i <= n; i++) {
        const a = (th * i) / n;
        out.push([bh.radius * (1 - Math.cos(a)), kop + bh.radius * Math.sin(a)]);
      }
      out.push([hd, tvd]);
    }
    return out;
  }, [bh, kop, hd, tvd]);

  // bərabər miqyas (həndəsə düzgün görünsün)
  const maxX = Math.max(hd, 1000) * 1.12;
  const maxY = tvd * 1.04;
  const s = Math.min((W - M.l - M.r) / maxX, (H - M.t - M.b) / maxY);
  const X = (v: number) => M.l + v * s;
  const Y = (v: number) => M.t + v * s;
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(" ");

  const gridStep = tvd > 12000 ? 2000 : 1000;
  const xTicks = Array.from({ length: Math.floor(maxX / gridStep) + 1 }, (_, i) => i * gridStep);
  const yTicks = Array.from({ length: Math.floor(maxY / gridStep) + 1 }, (_, i) => i * gridStep);

  const warns: string[] = [];
  if (bh.valid) {
    if (bh.tangentIncDeg < 15) warns.push("Tangent bucağı 15°-dən azdır: bu bucaqda azimutu stabil saxlamaq çətindir.");
    if (bh.tangentIncDeg > 60) warns.push("Tangent bucağı 60°-dən çoxdur: hole cleaning və drag kritik olur.");
    if (bur > dlsLimit) warns.push(`Build rate (${f1(bur)}°/100 ft) DLS limitini (${f1(dlsLimit)}°/100 ft) aşır.`);
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.5fr)_340px] gap-6">
      <div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="img" aria-label="J-tipli quyu planı: vertical section">
          {xTicks.map((v) => (
            <g key={"x" + v}>
              <line x1={X(v)} x2={X(v)} y1={M.t} y2={H - M.b} stroke="rgba(255,255,255,0.05)" />
              <text x={X(v)} y={H - M.b + 14} fontSize="9" textAnchor="middle" fill="#6B82A0">{f0(v)}</text>
            </g>
          ))}
          {yTicks.map((v) => (
            <g key={"y" + v}>
              <line x1={M.l} x2={W - M.r} y1={Y(v)} y2={Y(v)} stroke="rgba(255,255,255,0.05)" />
              <text x={M.l - 6} y={Y(v) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{f0(v)}</text>
            </g>
          ))}
          <text x={(M.l + W - M.r) / 2} y={H - 6} fontSize="10" textAnchor="middle" fill="#8DA2BF">Horizontal məsafə, ft</text>
          <text transform={`translate(12 ${(M.t + H - M.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">TVD, ft (bərabər miqyas)</text>

          {/* müqayisə üçün şaquli quyu */}
          <line x1={X(0)} x2={X(0)} y1={Y(0)} y2={Y(tvd)} stroke="#4A6A8A" strokeDasharray="4 4" />
          {/* KOP xətti */}
          <line x1={M.l} x2={W - M.r} y1={Y(kop)} y2={Y(kop)} stroke="#38BDF8" strokeDasharray="2 4" opacity="0.5" />
          <text x={W - M.r - 4} y={Y(kop) - 4} fontSize="10" textAnchor="end" fill="#7DD3FC">KOP {f0(kop)} ft</text>

          {bh.valid && (
            <>
              <path d={path} fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
              {/* build sonu */}
              <circle cx={X(bh.buildEndHd)} cy={Y(bh.buildEndTvd)} r="5" fill="#34D399" stroke="#080C18" strokeWidth="2" />
              <text x={X(bh.buildEndHd) + 10} y={Y(bh.buildEndTvd) + 4} fontSize="10" fill="#A7F3D0">EOB · {f0(kop + bh.buildLen)} ft MD</text>
              {/* tangent bucağı yayı */}
              <text x={X(hd) - 10} y={Y(tvd) - 14} fontSize="10" textAnchor="end" fill="#FCD34D">θ = {f1(bh.tangentIncDeg)}°</text>
            </>
          )}
          {/* hədəf */}
          <circle cx={X(hd)} cy={Y(tvd)} r={Math.max(7, 100 * s)} fill="#F8717122" stroke="#F87171" strokeWidth="2" />
          <circle cx={X(hd)} cy={Y(tvd)} r="3" fill="#F87171" />
          <text x={X(hd) - 12} y={Y(tvd) + 18} fontSize="10" textAnchor="end" fill="#FCA5A5">Hədəf {f0(tvd)} / {f0(hd)} ft</text>
          {/* səth */}
          <rect x={X(0) - 14} y={Y(0) - 8} width="28" height="8" fill="#8DA2BF" />
          <text x={X(0) + 20} y={Y(0) - 1} fontSize="10" fill="#8DA2BF">səth</text>
          {!bh.valid && (
            <text x={W / 2} y={H / 2} fontSize="13" textAnchor="middle" fill="#FCA5A5">{bh.note}</text>
          )}
        </svg>
        <p className="text-[11px] text-[#6B82A0] mt-2 leading-relaxed font-['Space_Grotesk']">
          Miqyas bərabərdir: əyilmənin həqiqi forması görünür. Qırıq xətt eyni TVD-də şaquli quyudur. Plan düsturu: R = 5729.58/BUR, θ = acos(−R/L) − atan2(V, D−R).
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Plan parametrləri</p>
          <Slider label="KOP" unit="ft" value={kop} min={500} max={6000} step={100} accent={ACCENT} onChange={setKop} />
          <Slider label="Build rate (BUR)" unit="°/100ft" value={bur} min={1} max={10} step={0.5} accent={ACCENT} onChange={setBur} decimals={1} />
          <Slider label="Hədəf TVD" unit="ft" value={tvd} min={4000} max={14000} step={500} accent="#F87171" onChange={setTvd} />
          <Slider label="Hədəfə horizontal məsafə" unit="ft" value={hd} min={0} max={9000} step={100} accent="#F87171" onChange={setHd} />
          <Slider label="DLS limiti (casing/alət)" unit="°/100ft" value={dlsLimit} min={2} max={12} step={0.5} accent="#38BDF8" onChange={setDlsLimit} decimals={1} />
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Plan nəticələri</p>
          {[
            ["Build radius", `${f0(bh.radius)} ft`],
            ["Tangent inklinasiyası", bh.valid ? `${f2(bh.tangentIncDeg)}°` : "-"],
            ["Build uzunluğu", bh.valid ? `${f0(bh.buildLen)} ft` : "-"],
            ["Tangent uzunluğu", bh.valid ? `${f0(bh.tangentLen)} ft` : "-"],
            ["Hədəfdə MD", bh.valid ? `${f0(bh.totalMd)} ft` : "-"],
            ["MD − TVD", bh.valid ? `${f0(bh.totalMd - tvd)} ft` : "-"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-baseline border-t border-[rgba(255,255,255,0.05)] py-1.5">
              <span className="text-[12px] text-[#8DA2BF]">{k}</span>
              <span className="font-mono text-[13px] font-semibold text-[#F0F4FF]">{v}</span>
            </div>
          ))}
          {warns.map((w) => (
            <p key={w} className="mt-2 rounded-lg px-3 py-2 text-[12px] bg-[#FBBF2414] text-[#FCD34D]">{w}</p>
          ))}
          {bh.valid && warns.length === 0 && <p className="mt-2 rounded-lg px-3 py-2 text-[12px] bg-[#34D39914] text-[#A7F3D0]">Plan limitlər daxilindədir.</p>}
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>BUR-u 3-dən 6-ya qaldır: tangent bucağı və build uzunluğu necə dəyişir?</li>
            <li>KOP-u 2,000-dən 4,000 ft-ə endir: nə üçün tangent bucağı artır?</li>
            <li>Hədəfi şaquli yaxına gətir (HD = 300 ft): plan niyə uyğun gəlmir?</li>
            <li>MD ilə TVD arasındakı fərq horizontal məsafə artdıqca necə dəyişir?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
