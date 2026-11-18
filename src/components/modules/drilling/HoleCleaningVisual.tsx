"use client";

import { useState } from "react";
import Slider from "../Slider";
import { annularVelocityFtMin, cuttingsConcPct, effectiveSlipFtMin, minFlowForConcGpm, transportRatio } from "@/lib/drilling/problems";

const ACCENT = "#FBBF24";
const DH = 8.5;
const DP = 5;
const LIMIT = 5; // % praktik hədd
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const f2 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CW = 380;
const CH = 280;
const M = { l: 52, r: 14, t: 22, b: 38 };

export default function HoleCleaningVisual() {
  const [q, setQ] = useState(400);
  const [rop, setRop] = useState(80);
  const [inc, setInc] = useState(55);
  const [rpm, setRpm] = useState(60);
  const [vs, setVs] = useState(60);

  const va = annularVelocityFtMin(q, DH, DP);
  const vsEff = effectiveSlipFtMin(vs, inc, rpm);
  const ft = transportRatio(va, vsEff);
  const conc = cuttingsConcPct(rop, DH, q, ft);
  const qMin = minFlowForConcGpm(rop, DH, Math.max(ft, 0.05), LIMIT);
  const bad = !Number.isFinite(conc) || conc > LIMIT;
  const warn = !bad && conc > 3;

  // yataq qalınlığı (keyfiyyət göstəricisi): konsentrasiya həddi keçdikcə və bucaq artdıqca böyüyür
  const sev = !Number.isFinite(conc) ? 1 : Math.min(1, Math.max(0, (conc - 1.5) / 8));
  const bed = sev * Math.sin((inc * Math.PI) / 180);

  // qrafik: konsentrasiya vs Q
  const qs = Array.from({ length: 41 }, (_, i) => 150 + i * 15);
  const concAt = (Q: number) => {
    const v = annularVelocityFtMin(Q, DH, DP);
    return cuttingsConcPct(rop, DH, Q, transportRatio(v, vsEff));
  };
  const cMax = 12;
  const cx = (Q: number) => M.l + ((Q - 150) / 600) * (CW - M.l - M.r);
  const cy = (c: number) => CH - M.b - (Math.min(c, cMax) / cMax) * (CH - M.t - M.b);
  const path = qs.map((Q, i) => `${i ? "L" : "M"}${cx(Q).toFixed(1)},${cy(concAt(Q)).toFixed(1)}`).join(" ");

  // sxem: boru kəsiyi (uzununa), (90 - inc) dərəcə döndərilmiş
  const rot = 90 - inc;
  const L = 330, H = 120, ph = 40;
  const holeY = -H / 2;
  const bedH = bed * (H / 2 - ph / 2 - 2) * 1.8;
  const dots = Array.from({ length: 26 }, (_, i) => ({ x: -L / 2 + 14 + ((i * 53) % (L - 28)), y: -H / 2 + 12 + ((i * 37) % (H - 24)) }));

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Annulus: cuttings daşınması</p>
        <svg viewBox="0 0 380 300" className="w-full h-auto" role="img" aria-label="Maili quyuda cuttings yatağı">
          <defs>
            <marker id="arrF" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#38BDF8" /></marker>
            <clipPath id="holeClip"><rect x={-L / 2} y={holeY} width={L} height={H} rx="6" /></clipPath>
          </defs>
          <g transform={`translate(190 150) rotate(${-rot})`}>
            <rect x={-L / 2} y={holeY} width={L} height={H} rx="6" fill="#2A2234" />
            <rect x={-L / 2 + 3} y={holeY + 3} width={L - 6} height={H - 6} rx="4" fill="#12223A" />
            <g clipPath="url(#holeClip)">
              {/* yataq (gravitasiya tərəfi = aşağı divar) */}
              <rect x={-L / 2} y={H / 2 - 3 - bedH} width={L} height={bedH + 3} fill="#B08968" opacity="0.9" />
              {/* asılı cuttings */}
              {dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={2.2} fill="#D6B98C" opacity={Math.min(0.9, 0.25 + conc / 10)} />
              ))}
            </g>
            <rect x={-L / 2} y={-ph / 2} width={L} height={ph} fill="#8DA2BF" stroke="#C7D3E6" />
            <rect x={-L / 2} y={-ph / 2 + 8} width={L} height={ph - 16} fill="#0A1426" />
            {[-1, 1].map((s) => (
              <line key={s} x1={-L / 2 + 20} y1={s * (H / 2 - 14) * 0.62 - 0} x2={L / 2 - 30} y2={s * (H / 2 - 14) * 0.62} stroke="#38BDF8" strokeWidth="2" markerEnd="url(#arrF)" opacity="0.8" />
            ))}
          </g>
          <text x="190" y="22" fontSize="11" textAnchor="middle" fill="#8DA2BF">{inc}° bucaq · axın yuxarı (annulus)</text>
          {inc < 85 && <text x="22" y="288" fontSize="9" fill="#6B82A0">qravitasiya ↓</text>}
        </svg>
        <div className="grid grid-cols-4 gap-2 mt-1 text-center font-['Space_Grotesk']">
          {[
            ["Va", `${f0(va)} ft/dəq`],
            ["Vs (effektiv)", `${f0(vsEff)} ft/dəq`],
            ["Ft", f2(ft)],
            ["Konsentr.", Number.isFinite(conc) ? `${f1(conc)}%` : "∞"],
          ].map(([k, v], i) => (
            <div key={k} className="rounded-xl bg-[#101A2E] px-2 py-2">
              <p className="text-[10px] text-[#6B82A0]">{k}</p>
              <p className="font-mono text-[12px] font-bold" style={{ color: i === 3 ? (bad ? "#F87171" : warn ? ACCENT : "#34D399") : "#F0F4FF" }}>{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 rounded-lg px-3 py-2 text-[12px] font-['Space_Grotesk']" style={{ background: bad ? "#F8717114" : "#34D39914", color: bad ? "#FCA5A5" : "#A7F3D0" }}>
          {bad ? `Konsentrasiya ${LIMIT}% həddini keçir: cuttings yatağı yaranır, pack-off və stuck pipe riski artır.` : `Konsentrasiya ${LIMIT}% həddi altındadır. ${LIMIT}% üçün minimal Q ≈ ${f0(qMin)} gpm.`}
        </p>
        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <li>Bucağı 0°-dən 55°-yə qaldır: nə üçün eyni axında yataq yaranır?</li>
          <li>Fırlanmanı 0-dan 120 rpm-ə qaldır: transport nisbəti necə dəyişir?</li>
          <li>ROP-u iki dəfə artır: eyni konsentrasiya üçün axını nə qədər artırmaq lazımdır?</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Konsentrasiya vs axın sürəti</p>
        <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Cuttings konsentrasiyası axına görə">
          {[0, 3, 6, 9, 12].map((c) => (
            <g key={c}>
              <line x1={M.l} x2={CW - M.r} y1={cy(c)} y2={cy(c)} stroke="rgba(255,255,255,0.05)" />
              <text x={M.l - 5} y={cy(c) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{c}%</text>
            </g>
          ))}
          {[150, 300, 450, 600, 750].map((Q) => (
            <text key={Q} x={cx(Q)} y={CH - M.b + 13} fontSize="9" textAnchor="middle" fill="#6B82A0">{Q}</text>
          ))}
          <text x={(M.l + CW - M.r) / 2} y={CH - 6} fontSize="10" textAnchor="middle" fill="#8DA2BF">Nasos axını Q, gpm</text>
          <text transform={`translate(12 ${(M.t + CH - M.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">Cuttings konsentrasiyası</text>
          <rect x={M.l} y={M.t} width={CW - M.l - M.r} height={cy(LIMIT) - M.t} fill="#F8717112" />
          <line x1={M.l} x2={CW - M.r} y1={cy(LIMIT)} y2={cy(LIMIT)} stroke="#F87171" strokeDasharray="5 4" />
          <text x={CW - M.r - 4} y={cy(LIMIT) - 4} fontSize="9" textAnchor="end" fill="#FCA5A5">{LIMIT}% praktik hədd</text>
          <path d={path} fill="none" stroke={ACCENT} strokeWidth="2.6" />
          {Number.isFinite(conc) && <circle cx={cx(q)} cy={cy(conc)} r="6" fill={bad ? "#F87171" : "#34D399"} stroke="#080C18" strokeWidth="2" />}
          <line x1={cx(Math.min(750, Math.max(150, qMin)))} x2={cx(Math.min(750, Math.max(150, qMin)))} y1={cy(LIMIT)} y2={CH - M.b} stroke="#34D399" strokeDasharray="3 3" />
        </svg>
        <div className="mt-3 space-y-3">
          <Slider label="Nasos axını Q" unit="gpm" value={q} min={150} max={750} step={10} accent="#38BDF8" onChange={setQ} />
          <Slider label="ROP" unit="ft/saat" value={rop} min={10} max={200} step={5} accent={ACCENT} onChange={setRop} />
          <Slider label="Quyu bucağı" unit="°" value={inc} min={0} max={90} step={1} accent="#A78BFA" onChange={setInc} />
          <Slider label="Dəstə fırlanması" unit="rpm" value={rpm} min={0} max={180} step={5} accent="#34D399" onChange={setRpm} />
          <Slider label="Baza slip sürəti (şaquli)" unit="ft/dəq" value={vs} min={20} max={120} step={5} accent="#F87171" onChange={setVs} />
        </div>
        <p className="text-[11px] text-[#6B82A0] mt-3 leading-relaxed font-['Space_Grotesk']">
          Model: 8.5″ quyu, 5″ boru. Slip sürəti bucağa və fırlanmaya görə sadə əmsalla düzəldilir, yataq qalınlığı keyfiyyət göstəricisidir. Real hole cleaning üçün sənaye modelləri və sahə təcrübəsi lazımdır.
        </p>
      </div>
    </div>
  );
}
