"use client";

import { useState } from "react";
import Slider from "../Slider";
import { centralizerMidSpan, narrowToWideVelocity, standoffPct } from "@/lib/drilling/casing";

const ACCENT = "#FBBF24";
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const f2 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const PAIRS = [
  { id: "p1", label: "12-1/4 in quyu · 9-5/8 in casing (47 lb/ft)", hole: 12.25, od: 9.625, cid: 8.681, w: 47 },
  { id: "p2", label: "8-1/2 in quyu · 7 in casing (29 lb/ft)", hole: 8.5, od: 7.0, cid: 6.184, w: 29 },
  { id: "p3", label: "17-1/2 in quyu · 13-3/8 in casing (68 lb/ft)", hole: 17.5, od: 13.375, cid: 12.415, w: 68 },
];

export default function CasingStandoffVisual() {
  const [pairId, setPairId] = useState("p1");
  const [offsetPct, setOffsetPct] = useState(40); // gap-ın faizi kimi sürüşmə
  const [inc, setInc] = useState(60);
  const [span, setSpan] = useState(40);
  const [mw, setMw] = useState(10.5);

  const p = PAIRS.find((x) => x.id === pairId)!;
  const gap = (p.hole - p.od) / 2;
  const offset = (offsetPct / 100) * gap;
  const so = standoffPct(p.hole, p.od, offset);
  const ratio = narrowToWideVelocity(so);

  const wBuoy = p.w * (1 - mw / 65.4);
  const mid = centralizerMidSpan({ od: p.od, id: p.cid, wBuoyLbFt: wBuoy, incDeg: inc, spanFt: span, holeDia: p.hole });

  // kəsik SVG
  const R = 120; // quyu radiusu piksellə
  const r = (p.od / p.hole) * R;
  const cxp = 170;
  const cyp = 170;
  const dxPx = (offset / (p.hole / 2)) * R;
  const ccx = cxp;
  const ccy = cyp + dxPx; // casing aşağı sürüşür (dar tərəf aşağıda)
  const narrow = Math.max(0, R - (dxPx + r));
  const wide = R + dxPx - r;

  // yan görünüş: casing şüa kimi mərkəzləşdiricilər arasında
  const SW = 360;
  const SH = 170;
  const holeTop = 36;
  const holeBot = SH - 20;
  const holeMid = (holeTop + holeBot) / 2;
  const holeHalf = (holeBot - holeTop) / 2;
  const casingHalf = (p.od / p.hole) * holeHalf;
  const sag = Math.min(mid.deflection / gap, 1) * (holeHalf - casingHalf);
  const xs = Array.from({ length: 41 }, (_, i) => i / 40);
  const shape = xs.map((t) => {
    const s = Math.sin(Math.PI * t);
    return [20 + t * (SW - 40), holeMid + sag * s] as const;
  });
  const path = shape.map(([x, yv], i) => `${i ? "L" : "M"}${x.toFixed(1)},${yv.toFixed(1)}`).join(" ");

  const color = so >= 67 ? "#34D399" : so >= 40 ? "#FBBF24" : "#F87171";
  const midColor = mid.standoff >= 67 ? "#34D399" : mid.standoff >= 40 ? "#FBBF24" : "#F87171";

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.5fr)_330px] gap-6">
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Kəsik: annulus</p>
            <svg viewBox="0 0 340 340" className="w-full h-auto" role="img" aria-label="Casing və quyunun en kəsiyi: standoff">
              <defs>
                <clipPath id="holeClip"><circle cx={cxp} cy={cyp} r={R} /></clipPath>
              </defs>
              <circle cx={cxp} cy={cyp} r={R + 8} fill="#1E2B3F" />
              <circle cx={cxp} cy={cyp} r={R} fill="#7C5E3C" opacity="0.55" />
              {/* sement yaxşı axın olan geniş tərəf */}
              <g clipPath="url(#holeClip)">
                <circle cx={cxp} cy={cyp} r={R} fill="#9CA3AF" opacity={0.15 + 0.55 * (so / 100)} />
                <circle cx={ccx} cy={ccy} r={r + 6} fill="#080C18" opacity="0" />
              </g>
              <circle cx={ccx} cy={ccy} r={r} fill="#101A2E" stroke="#34D399" strokeWidth="5" />
              <text x={ccx} y={ccy + 4} fontSize="11" textAnchor="middle" fill="#8DA2BF">casing</text>
              {/* ölçü xətləri */}
              <line x1={cxp + R + 14} x2={cxp + R + 14} y1={cyp - R} y2={cyp + R} stroke="#4A6A8A" />
              <text x={cxp + R + 18} y={cyp + 4} fontSize="9" fill="#6B82A0">{f1(p.hole)} in</text>
              <text x={cxp} y={cyp + R + 24} fontSize="10" textAnchor="middle" fill="#FCA5A5">dar tərəf: {f2(narrow * (p.hole / 2) / R)} in</text>
              <text x={cxp} y={cyp - R - 12} fontSize="10" textAnchor="middle" fill="#A7F3D0">geniş tərəf: {f2(wide * (p.hole / 2) / R)} in</text>
              {/* axın oxları */}
              <g fill="#F0F4FF" opacity="0.85">
                <polygon points={`${cxp - 6},${cyp - R + 4} ${cxp + 6},${cyp - R + 4} ${cxp},${cyp - R + 16}`} />
                <circle cx={cxp} cy={cyp + R - 6} r={Math.max(1, ratio * 6)} />
              </g>
              <text x="14" y="14" fontSize="10" fill="#8DA2BF">Dar tərəfdə (aşağı) axın demək olar ki, dayanır</text>
            </svg>
          </div>

          <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Yan görünüş: mərkəzləşdiricilər arası</p>
            <svg viewBox={`0 0 ${SW} ${SH}`} className="w-full h-auto" role="img" aria-label="İki mərkəzləşdirici arasında casing-in sallanması">
              <rect x="20" y={holeTop} width={SW - 40} height={holeBot - holeTop} fill="#7C5E3C" opacity="0.35" />
              <line x1="20" x2={SW - 20} y1={holeTop} y2={holeTop} stroke="#5B7092" strokeWidth="2" />
              <line x1="20" x2={SW - 20} y1={holeBot} y2={holeBot} stroke="#5B7092" strokeWidth="2" />
              <path d={path} fill="none" stroke="#34D399" strokeWidth={Math.max(6, casingHalf * 2 * 0.5)} opacity="0.9" strokeLinecap="round" />
              {[20, SW - 20].map((x) => (
                <g key={x}>
                  <rect x={x - 5} y={holeTop} width="10" height={holeBot - holeTop} rx="3" fill="#FBBF24" opacity="0.8" />
                </g>
              ))}
              <text x={SW / 2} y="18" fontSize="10" textAnchor="middle" fill="#8DA2BF">{f0(span)} ft aralı · meyl {f0(inc)}°</text>
              <text x={SW / 2} y={SH - 4} fontSize="10" textAnchor="middle" fill={midColor}>
                {mid.touches ? "Casing quyu divarına toxunur (standoff 0%)" : `Orta nöqtədə sallanma ${f2(mid.deflection)} in, standoff ${f0(mid.standoff)}%`}
              </text>
            </svg>
            <p className="text-[11px] text-[#6B82A0] mt-1 font-['Space_Grotesk'] leading-relaxed">
              Sadələşdirilmiş model: casing iki mərkəzləşdirici arasında şüa kimi sallanır (şaquli quyuda sallanma yoxdur). Real hesabda mərkəzləşdirici sərtliyi və kontakt qüvvələri nəzərə alınır.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-3" style={{ color: ACCENT }}>Dar və geniş tərəfdə axın</p>
          <div className="grid sm:grid-cols-3 gap-3 text-center">
            {[
              ["Standoff", `${f0(so)} %`, color],
              ["v dar / v geniş", f2(ratio), ratio > 0.3 ? "#34D399" : ratio > 0.1 ? "#FBBF24" : "#F87171"],
              ["Orta nöqtədə standoff", `${f0(mid.standoff)} %`, midColor],
            ].map(([k, v, c]) => (
              <div key={String(k)} className="rounded-xl bg-[#101A2E] px-3 py-3">
                <p className="text-[11px] text-[#6B82A0]">{k}</p>
                <p className="font-mono text-[22px] font-bold" style={{ color: String(c) }}>{v}</p>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[#9DB0CC] mt-3 leading-relaxed">
            {so >= 67
              ? "Standoff 67% və yuxarıdır: axın nisbətən bərabərdir, məhlul tam sıxışdırılır, zonal izolyasiya üçün əlverişlidir."
              : so >= 40
                ? "Standoff 67%-dən azdır: dar tərəfdə axın zəifləyir, məhlul qalığı və kanallaşma riski var. Mərkəzləşdirici sayını artır."
                : "Standoff çox aşağıdır: dar tərəfdə sement praktiki olaraq axmır. Köhnə məhlul qalır, izolyasiya pozulur."}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Quyu və casing</p>
          <label className="block">
            <span className="block text-[11px] text-[#8DA2BF] mb-1 font-['Space_Grotesk']">Ölçü cütü</span>
            <select value={pairId} onChange={(e) => setPairId(e.target.value)} className="w-full bg-[#080C18] text-[#F0F4FF] text-[13px] rounded-lg px-3 py-2 outline-none border border-[rgba(255,255,255,0.08)]">
              {PAIRS.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
            </select>
          </label>
          <Slider label="Casing-in sürüşməsi (boşluğun faizi)" unit="%" value={offsetPct} min={0} max={100} step={1} accent={ACCENT} onChange={setOffsetPct} />
          <p className="text-[11px] text-[#6B82A0] font-['Space_Grotesk']">Boşluq (gap): {f2(gap)} in · sürüşmə: {f2(offset)} in</p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Mərkəzləşdirici aralığı</p>
          <Slider label="Meyl bucağı" unit="°" value={inc} min={0} max={90} step={5} accent={ACCENT} onChange={setInc} />
          <Slider label="Mərkəzləşdiricilər arası məsafə" unit="ft" value={span} min={10} max={120} step={5} accent={ACCENT} onChange={setSpan} />
          <Slider label="Məhlul çəkisi (buoyancy)" unit="ppg" value={mw} min={8.6} max={15} step={0.1} accent={ACCENT} onChange={setMw} decimals={1} />
          <p className="text-[11px] text-[#6B82A0] font-['Space_Grotesk'] leading-relaxed">
            Casing-in məhluldakı çəkisi: {f1(wBuoy)} lb/ft. Perpendikulyar komponent: {f1(wBuoy * Math.sin((inc * Math.PI) / 180))} lb/ft.
          </p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>Meyl bucağını 0°-yə al: şaquli quyuda niyə sallanma yoxdur?</li>
            <li>90° və 60 ft aralıqda casing toxunurmu? Neçə ft aralıq 67% standoff verir?</li>
            <li>Ağır məhlulda (15 ppg) sallanma necə dəyişir? Niyə?</li>
            <li>Dar/geniş sürət nisbətini 0.3-dən yuxarı saxlamaq üçün standoff nə qədər olmalıdır?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
