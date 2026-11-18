"use client";

import { useState } from "react";
import Slider from "../Slider";
import { applyToolface } from "@/lib/drilling/directional";

const ACCENT = "#FBBF24";
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const f2 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CX = 160;
const CY = 160;
const R = 112;

export default function ToolfaceVisual() {
  const [tf, setTf] = useState(30);
  const [inc, setInc] = useState(30);
  const [azi, setAzi] = useState(45);
  const [dlsMotor, setDlsMotor] = useState(6);
  const [slide, setSlide] = useState(50);
  const [len, setLen] = useState(30);

  const tfRad = (tf * Math.PI) / 180;
  const effDls = (dlsMotor * slide) / 100;
  const beta = (effDls * len) / 100;
  const res = applyToolface(inc, azi, beta, tf);
  const buildRate = effDls * Math.cos(tfRad); // °/100ft inklinasiya dəyişməsi (təxmini)
  const turnRate = inc > 0.5 ? (effDls * Math.sin(tfRad)) / Math.sin((inc * Math.PI) / 180) : 0; // azimut °/100ft
  const tipX = CX + R * Math.sin(tfRad);
  const tipY = CY - R * Math.cos(tfRad);

  const label = (() => {
    const t = ((tf % 360) + 360) % 360;
    if (t < 15 || t > 345) return "High side: saf build";
    if (Math.abs(t - 180) < 15) return "Low side: saf drop";
    if (Math.abs(t - 90) < 15) return "Sağ: saf turn (sağa)";
    if (Math.abs(t - 270) < 15) return "Sol: saf turn (sola)";
    if (t < 90) return "Build və sağa turn";
    if (t < 180) return "Drop və sağa turn";
    if (t < 270) return "Drop və sola turn";
    return "Build və sola turn";
  })();

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-6">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
        <svg viewBox="0 0 320 340" className="w-full h-auto max-w-[420px] mx-auto" role="img" aria-label="Toolface saatı">
          {/* build / drop yarımları */}
          <path d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY} Z`} fill="#34D399" opacity="0.12" />
          <path d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 0 ${CX + R} ${CY} Z`} fill="#F87171" opacity="0.1" />
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#4A6A8A" strokeWidth="2" />
          <circle cx={CX} cy={CY} r={R * 0.5} fill="none" stroke="rgba(255,255,255,0.06)" />
          <line x1={CX} x2={CX} y1={CY - R} y2={CY + R} stroke="rgba(255,255,255,0.1)" />
          <line x1={CX - R} x2={CX + R} y1={CY} y2={CY} stroke="rgba(255,255,255,0.1)" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => {
            const r1 = R - (a % 90 === 0 ? 10 : 5);
            return (
              <line key={a} x1={CX + r1 * Math.sin((a * Math.PI) / 180)} y1={CY - r1 * Math.cos((a * Math.PI) / 180)} x2={CX + R * Math.sin((a * Math.PI) / 180)} y2={CY - R * Math.cos((a * Math.PI) / 180)} stroke="#6B82A0" />
            );
          })}
          <text x={CX} y={CY - R - 10} fontSize="11" textAnchor="middle" fill="#A7F3D0">High side 0° (build)</text>
          <text x={CX} y={CY + R + 20} fontSize="11" textAnchor="middle" fill="#FCA5A5">Low side 180° (drop)</text>
          <text x={CX + R + 6} y={CY + 4} fontSize="10" fill="#B7C5DD">90°</text>
          <text x={CX - R - 6} y={CY + 4} fontSize="10" textAnchor="end" fill="#B7C5DD">270°</text>
          {/* oxlar */}
          <line x1={CX} y1={CY} x2={tipX} y2={tipY} stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
          <circle cx={tipX} cy={tipY} r="8" fill={ACCENT} stroke="#080C18" strokeWidth="2" />
          <circle cx={CX} cy={CY} r="5" fill="#F0F4FF" />
          <text x={CX} y={CY + 32} fontSize="10" textAnchor="middle" fill="#6B82A0">bit-ə yuxarıdan baxış</text>
        </svg>
        <p className="text-center text-[14px] font-semibold mt-1 font-['Space_Grotesk']" style={{ color: ACCENT }}>{label}</p>
        <div className="mt-3 max-w-[420px] mx-auto">
          <Slider label="Toolface" unit="°" value={tf} min={0} max={359} step={5} accent={ACCENT} onChange={setTf} />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4 max-w-[420px] mx-auto text-center font-['Space_Grotesk']">
          <div className="rounded-xl bg-[#101A2E] px-3 py-3">
            <p className="text-[11px] text-[#6B82A0]">Build komponenti (cos TF)</p>
            <p className="font-mono text-[20px] font-bold" style={{ color: buildRate >= 0 ? "#34D399" : "#F87171" }}>{f2(Math.cos(tfRad))}</p>
          </div>
          <div className="rounded-xl bg-[#101A2E] px-3 py-3">
            <p className="text-[11px] text-[#6B82A0]">Turn komponenti (sin TF)</p>
            <p className="font-mono text-[20px] font-bold text-[#38BDF8]">{f2(Math.sin(tfRad))}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Motor və başlanğıc vəziyyət</p>
          <Slider label="Başlanğıc inklinasiya" unit="°" value={inc} min={0} max={90} step={1} accent={ACCENT} onChange={setInc} />
          <Slider label="Başlanğıc azimut" unit="°" value={azi} min={0} max={359} step={1} accent={ACCENT} onChange={setAzi} />
          <Slider label="Motorun 100% sliding DLS-i" unit="°/100ft" value={dlsMotor} min={1} max={12} step={0.5} accent="#38BDF8" onChange={setDlsMotor} decimals={1} />
          <Slider label="Sliding payı" unit="%" value={slide} min={0} max={100} step={5} accent="#34D399" onChange={setSlide} />
          <Slider label="İnterval" unit="ft" value={len} min={10} max={100} step={5} accent={ACCENT} onChange={setLen} />
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Nəticə</p>
          {[
            ["Effektiv DLS (sliding payı ilə)", `${f2(effDls)} °/100ft`],
            ["Bu intervalda dogleg", `${f2(beta)}°`],
            ["Təxmini build rate", `${f2(buildRate)} °/100ft`],
            ["Təxmini azimut dəyişmə sürəti", `${f2(turnRate)} °/100ft`],
            ["Yeni inklinasiya", `${f2(res.inc)}°  (${res.dInc >= 0 ? "+" : ""}${f2(res.dInc)})`],
            ["Yeni azimut", `${f2(res.azi)}°  (${res.dAzi >= 0 ? "+" : ""}${f2(res.dAzi)})`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-baseline border-t border-[rgba(255,255,255,0.05)] py-1.5">
              <span className="text-[12px] text-[#8DA2BF]">{k}</span>
              <span className="font-mono text-[13px] font-semibold text-[#F0F4FF]">{v}</span>
            </div>
          ))}
          <p className="mt-2 text-[11px] text-[#6B82A0] leading-relaxed">
            Nəticələr tam dogleg + toolface düsturlarındandır: cos I₂ = cos I₁ cos β − sin I₁ sin β cos TF. Azimut dəyişməsi inklinasiya aşağı olduqda daha çox təsirlənir, çünki dövr kiçilir.
          </p>
          {inc < 5 && <p className="mt-2 rounded-lg px-3 py-2 text-[12px] bg-[#FBBF2414] text-[#FCD34D]">İnklinasiya 5°-dən azdır: high side müəyyən deyil, toolface "magnetic" və ya "gravity" rejiminə görə seçilir.</p>}
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>Toolface 0°: inklinasiya artır, azimut dəyişmir. 90°-də isə nə baş verir?</li>
            <li>Sliding payını 100%-dən 30%-ə endir: orta DLS necə dəyişir? Niyə operator sliding payını azaltmaq istəyər?</li>
            <li>İnklinasiyanı 10°-yə al, toolface 90° saxla: azimut dəyişməsi niyə daha böyükdür?</li>
            <li>Toolface 180°: inklinasiya necə dəyişir? Bu hansı hallarda lazımdır?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
