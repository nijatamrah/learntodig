"use client";

import { useState } from "react";
import Slider from "../Slider";
import { ecdPpg, levelDropFt, lossClass, lossRateBblHr } from "@/lib/drilling/problems";

const ACCENT = "#FBBF24";
const TVD = 8000;
const PF = 8.6; // dibdə formasiya təzyiqi (ppg ekv.)
const ZONE_TOP = 6200;
const ZONE_BOT = 6800;
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const f2 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CW = 360;
const CH = 330;
const M = { l: 52, r: 14, t: 24, b: 38 };
const EMIN = 8;
const EMAX = 13;

export default function LostCirculationVisual() {
  const [mw, setMw] = useState(9.8);
  const [q, setQ] = useState(400);
  const [fgWeak, setFgWeak] = useState(10.0);
  const [k, setK] = useState(300);
  const [pumpOn, setPumpOn] = useState(true);

  const apl = 150 * Math.pow(q / 400, 1.8);
  const ecd = pumpOn ? ecdPpg(mw, apl, TVD) : mw;
  const lossBbl = lossRateBblHr(ecd, fgWeak, k);
  const cls = lossClass(lossBbl);

  // statik vəziyyət: itki davam edərsə səviyyə düşür
  const staticLoss = mw > fgWeak;
  const dropFt = staticLoss ? levelDropFt(ZONE_BOT, mw, fgWeak) : 0;
  const bhpEmw = (mw * (TVD - dropFt)) / TVD;
  const kickRisk = bhpEmw < PF;

  // qrafik
  const cx = (e: number) => M.l + ((e - EMIN) / (EMAX - EMIN)) * (CW - M.l - M.r);
  const cy = (d: number) => M.t + (d / TVD) * (CH - M.t - M.b);
  const poreAt = (d: number) => 8.3 + (PF - 8.3) * (d / TVD);
  const fgAt = (d: number) => {
    const base = 10.4 + (12.4 - 10.4) * (d / TVD);
    return d >= ZONE_TOP && d <= ZONE_BOT ? Math.min(base, fgWeak) : base;
  };
  const ds = Array.from({ length: 81 }, (_, i) => (i * TVD) / 80);
  const poreP = ds.map((d, i) => `${i ? "L" : "M"}${cx(poreAt(d)).toFixed(1)},${cy(d).toFixed(1)}`).join(" ");
  const fgDs: number[] = [];
  ds.forEach((d) => fgDs.push(d));
  [ZONE_TOP - 0.1, ZONE_TOP, ZONE_BOT, ZONE_BOT + 0.1].forEach((d) => fgDs.push(d));
  fgDs.sort((a, b) => a - b);
  const fgP = fgDs.map((d, i) => `${i ? "L" : "M"}${cx(fgAt(d)).toFixed(1)},${cy(d).toFixed(1)}`).join(" ");

  // sxem
  const wTop = 40, wBot = 290;
  const wy = (d: number) => wTop + (d / TVD) * (wBot - wTop);
  const lvl = wy(dropFt);

  const msg = lossBbl > 0
    ? `ECD (${f2(ecd)} ppg) zəif zonanın çat qradiyentini (${f1(fgWeak)} ppg) keçir: itki ≈ ${f0(lossBbl)} bbl/saat (${cls}).`
    : staticLoss
      ? `Nasos dayanıb, lakin statik MW (${f1(mw)} ppg) çat qradiyentindən (${f1(fgWeak)} ppg) böyükdür: itki davam edir.`
      : `ECD (${f2(ecd)} ppg) çat qradiyentindən aşağıdır: itki yoxdur.`;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Mud window: ECD və çat</p>
        <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Pore, fracture və ECD">
          {[8, 9, 10, 11, 12, 13].map((e) => (
            <g key={e}>
              <line x1={cx(e)} x2={cx(e)} y1={M.t} y2={CH - M.b} stroke="rgba(255,255,255,0.05)" />
              <text x={cx(e)} y={CH - M.b + 13} fontSize="9" textAnchor="middle" fill="#6B82A0">{e}</text>
            </g>
          ))}
          {[0, 2000, 4000, 6000, 8000].map((d) => (
            <g key={d}>
              <line x1={M.l} x2={CW - M.r} y1={cy(d)} y2={cy(d)} stroke="rgba(255,255,255,0.05)" />
              <text x={M.l - 5} y={cy(d) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{f0(d)}</text>
            </g>
          ))}
          <text x={(M.l + CW - M.r) / 2} y={CH - 6} fontSize="10" textAnchor="middle" fill="#8DA2BF">Ekvivalent çəki, ppg</text>
          <text transform={`translate(12 ${(M.t + CH - M.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">TVD, ft</text>
          <rect x={M.l} y={cy(ZONE_TOP)} width={CW - M.l - M.r} height={cy(ZONE_BOT) - cy(ZONE_TOP)} fill="#F8717110" />
          <text x={M.l + 4} y={cy(ZONE_TOP) + 11} fontSize="9" fill="#FCA5A5">zəif zona</text>
          <path d={poreP} fill="none" stroke="#38BDF8" strokeWidth="2.2" />
          <path d={fgP} fill="none" stroke="#F87171" strokeWidth="2.2" />
          <line x1={cx(mw)} x2={cx(mw)} y1={M.t} y2={CH - M.b} stroke="#A7F3D0" strokeDasharray="5 4" />
          {pumpOn && <line x1={cx(ecd)} x2={cx(ecd)} y1={M.t} y2={CH - M.b} stroke={ACCENT} strokeWidth="2.4" />}
          <g fontSize="10">
            <text x={cx(8.4) } y={M.t + 4} fill="#7DD3FC">pore</text>
            <text x={cx(12.4) - 4} y={M.t + 4} textAnchor="end" fill="#FCA5A5">çat</text>
            <text x={cx(mw) + 4} y={CH - M.b - 6} fill="#A7F3D0">MW {f1(mw)}</text>
            {pumpOn && <text x={cx(ecd) + 4} y={CH - M.b - 20} fill={ACCENT}>ECD {f2(ecd)}</text>}
          </g>
        </svg>
        <div className="grid grid-cols-3 gap-2 mt-2 text-center font-['Space_Grotesk']">
          {[
            ["APL", `${f0(apl)} psi`],
            ["ECD", `${f2(ecd)} ppg`],
            ["Marja (çat)", `${f2(fgWeak - ecd)} ppg`],
          ].map(([k2, v], i) => (
            <div key={k2} className="rounded-xl bg-[#101A2E] px-2 py-2">
              <p className="text-[10px] text-[#6B82A0]">{k2}</p>
              <p className="font-mono text-[13px] font-bold" style={{ color: i === 2 && fgWeak - ecd < 0 ? "#F87171" : "#F0F4FF" }}>{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 rounded-lg px-3 py-2 text-[12px] font-['Space_Grotesk']" style={{ background: lossBbl > 0 || staticLoss ? "#F8717114" : "#34D39914", color: lossBbl > 0 || staticLoss ? "#FCA5A5" : "#A7F3D0" }}>{msg}</p>
        <div className="mt-3 space-y-3">
          <Slider label="Məhlul çəkisi (MW)" unit="ppg" value={mw} min={8.6} max={12} step={0.1} accent={ACCENT} onChange={setMw} decimals={1} />
          <Slider label="Nasos axını Q" unit="gpm" value={q} min={150} max={700} step={10} accent="#38BDF8" onChange={setQ} />
          <Slider label="Zəif zonanın çat qradiyenti" unit="ppg" value={fgWeak} min={8.8} max={12} step={0.1} accent="#F87171" onChange={setFgWeak} decimals={1} />
          <Slider label="Zonanın itki həssaslığı" unit="bbl/saat per ppg" value={k} min={50} max={800} step={10} accent="#A78BFA" onChange={setK} />
        </div>
        <button onClick={() => setPumpOn((v) => !v)} className="mt-3 px-3.5 py-2 rounded-xl text-[12px] font-semibold font-['Space_Grotesk'] border" style={{ borderColor: pumpOn ? ACCENT : "rgba(255,255,255,0.15)", color: pumpOn ? ACCENT : "#8DA2BF", background: pumpOn ? "#FBBF2418" : "transparent" }}>
          Nasos: {pumpOn ? "işləyir" : "dayanıb (statik)"}
        </button>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Quyu: məhlul səviyyəsi</p>
        <svg viewBox="0 0 340 320" className="w-full h-auto" role="img" aria-label="Quyuda məhlul səviyyəsi">
          <rect x="110" y={wTop} width="90" height={wBot - wTop} fill="#12223A" stroke="#2A3A52" />
          <rect x="110" y={lvl} width="90" height={wBot - lvl} fill="#1F5A8A" opacity="0.75" />
          {dropFt > 0 && <rect x="110" y={wTop} width="90" height={lvl - wTop} fill="#0A1426" />}
          <rect x="106" y={wTop} width="4" height={wy(5500) - wTop} fill="#34D399" />
          <rect x="200" y={wTop} width="4" height={wy(5500) - wTop} fill="#34D399" />
          <rect x="102" y={wy(ZONE_TOP)} width="106" height={wy(ZONE_BOT) - wy(ZONE_TOP)} fill="#F87171" opacity="0.35" />
          {lossBbl > 0 && [0, 1, 2].map((i) => (
            <line key={i} x1="200" y1={wy(ZONE_TOP) + 12 + i * 18} x2="240" y2={wy(ZONE_TOP) + 12 + i * 18} stroke="#F87171" strokeWidth="2" strokeDasharray="4 3" />
          ))}
          <text x="214" y={wy(ZONE_TOP) - 4} fontSize="10" fill="#FCA5A5">zəif zona</text>
          <text x="214" y={wy(5500) + 4} fontSize="10" fill="#A7F3D0">shoe 5,500 ft</text>
          <text x="214" y={wBot + 3} fontSize="10" fill="#8DA2BF">TD {f0(TVD)} ft</text>
          {dropFt > 0 ? (
            <>
              <line x1="90" x2="206" y1={lvl} y2={lvl} stroke={ACCENT} strokeDasharray="4 3" />
              <text x="86" y={lvl + 4} fontSize="10" textAnchor="end" fill={ACCENT}>səviyyə −{f0(dropFt)} ft</text>
            </>
          ) : (
            <text x="86" y={wTop + 4} fontSize="10" textAnchor="end" fill="#8DA2BF">dolu</text>
          )}
        </svg>
        <div className="grid grid-cols-3 gap-2 mt-1 text-center font-['Space_Grotesk']">
          {[
            ["İtki sürəti", lossBbl > 0 ? `${f0(lossBbl)} bbl/saat` : "yoxdur"],
            ["Sinif", lossBbl > 0 ? cls : staticLoss ? "statik itki" : "yoxdur"],
            ["Dib ekv. çəki", `${f2(bhpEmw)} ppg`],
          ].map(([k2, v]) => (
            <div key={k2} className="rounded-xl bg-[#101A2E] px-2 py-2">
              <p className="text-[10px] text-[#6B82A0]">{k2}</p>
              <p className="font-mono text-[12px] font-bold text-[#F0F4FF]">{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 rounded-lg px-3 py-2 text-[12px] font-['Space_Grotesk']" style={{ background: kickRisk ? "#F8717114" : "#34D39914", color: kickRisk ? "#FCA5A5" : "#A7F3D0" }}>
          {kickRisk ? `Səviyyə düşdükdən sonra dibdə ekvivalent çəki ${f2(bhpEmw)} ppg < formasiya ${f1(PF)} ppg: kick riski var (itki və kick birlikdə).` : "Dibdə hidrostatik formasiya təzyiqindən yüksəkdir."}
        </p>
        <p className="text-[11px] text-[#6B82A0] mt-3 leading-relaxed font-['Space_Grotesk']">
          Model: sabit APL qanunu (APL ~ Q^1.8, 400 gpm-də 150 psi), itki sürəti ~ k·(ECD − FG). Real itki zonanın tipindən (çat, vuggy, induced fracture) asılıdır.
        </p>
        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <li>Nasosu 400-dən 600 gpm-ə qaldır: ECD çat qradiyentini keçirmi?</li>
          <li>Çat qradiyentini 9.5 ppg-yə endir və nasosu dayandır: nə baş verir?</li>
          <li>MW-ni azalt: itki dayanır, lakin hansı risk artır?</li>
        </ul>
      </div>
    </div>
  );
}
