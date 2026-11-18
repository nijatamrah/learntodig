"use client";

import { useState } from "react";
import Slider from "../Slider";
import { gasVolumeAtDepth, maasp, migrationPressureRise } from "@/lib/drilling/wellcontrol";

const ACCENT = "#FBBF24";
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const CW = 400;
const CH = 330;
const M = { l: 54, r: 14, t: 26, b: 40 };

export default function GasBehaviorVisual() {
  const [v1, setV1] = useState(20);
  const [p1, setP1] = useState(5720);
  const [mw, setMw] = useState(10);
  const [back, setBack] = useState(800); // choke ilə saxlanılan səth təzyiqi
  const [rate, setRate] = useState(600);
  const [hours, setHours] = useState(0.5);
  const [sicp0, setSicp0] = useState(700);
  const [shoe] = useState(6000);
  const [fg, setFg] = useState(14);

  const D0 = 10000;
  // 1) genişlənmə: dərinliyə görə həcm (log x)
  const depths = Array.from({ length: 81 }, (_, i) => D0 - (D0 - 20) * (i / 80));
  const volOpen = depths.map((d) => gasVolumeAtDepth(v1, p1, mw, d, 0));
  const volChoke = depths.map((d) => gasVolumeAtDepth(v1, p1, mw, d, back));
  const vLo = Math.min(v1 * 0.9, ...volOpen);
  const vHi = Math.max(...volOpen) * 1.1;
  const lx = (v: number) => M.l + ((Math.log10(v) - Math.log10(vLo)) / (Math.log10(vHi) - Math.log10(vLo))) * (CW - M.l - M.r);
  const ly = (d: number) => M.t + ((D0 - d) / D0) * (CH - M.t - M.b);
  const pathOf = (vs: number[]) => vs.map((v, i) => `${i ? "L" : "M"}${lx(Math.max(v, vLo)).toFixed(1)},${ly(depths[i]).toFixed(1)}`).join(" ");

  const probes = [5000, 2000, 500, 100];
  const decades: number[] = [];
  for (let e = Math.ceil(Math.log10(vLo)); e <= Math.floor(Math.log10(vHi)); e++) decades.push(Math.pow(10, e));

  // 2) miqrasiya
  const tMax = 3;
  const maaspV = maasp(fg, mw, shoe);
  const sicpAt = (t: number) => sicp0 + migrationPressureRise(mw, rate * t);
  const sMax = Math.max(maaspV * 1.2, sicpAt(tMax) * 1.05);
  const mx = (t: number) => M.l + (t / tMax) * (CW - M.l - M.r);
  const my = (p: number) => CH - M.b - ((p - sicp0 * 0.8) / (sMax - sicp0 * 0.8)) * (CH - M.t - M.b);
  const tHit = rate > 0 ? (maaspV - sicp0) / (0.052 * mw * rate) : Infinity;

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Qaz genişlənməsi (Boyle)</p>
          <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Qaz həcminin dərinliyə görə dəyişməsi">
            {[0, 2500, 5000, 7500, 10000].map((d) => (
              <g key={d}>
                <line x1={M.l} x2={CW - M.r} y1={ly(d)} y2={ly(d)} stroke="rgba(255,255,255,0.05)" />
                <text x={M.l - 5} y={ly(d) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{f0(d)}</text>
              </g>
            ))}
            {decades.map((v) => (
              <g key={v}>
                <line x1={lx(v)} x2={lx(v)} y1={M.t} y2={CH - M.b} stroke="rgba(255,255,255,0.05)" />
                <text x={lx(v)} y={CH - M.b + 13} fontSize="9" textAnchor="middle" fill="#6B82A0">{v >= 1000 ? `${v / 1000}k` : v}</text>
              </g>
            ))}
            <text x={(M.l + CW - M.r) / 2} y={CH - 6} fontSize="10" textAnchor="middle" fill="#8DA2BF">Qazın həcmi, bbl (loqarifmik)</text>
            <text transform={`translate(11 ${(M.t + CH - M.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">Qazın dərinliyi (TVD), ft</text>
            <path d={pathOf(volOpen)} fill="none" stroke="#F87171" strokeWidth="2.6" />
            <path d={pathOf(volChoke)} fill="none" stroke="#34D399" strokeWidth="2.6" />
            <g fontSize="10">
              <line x1={M.l + 8} x2={M.l + 26} y1={M.t + 8} y2={M.t + 8} stroke="#F87171" strokeWidth="2.6" /><text x={M.l + 32} y={M.t + 11} fill="#FCA5A5">sərbəst genişlənmə (choke yoxdur)</text>
              <line x1={M.l + 8} x2={M.l + 26} y1={M.t + 22} y2={M.t + 22} stroke="#34D399" strokeWidth="2.6" /><text x={M.l + 32} y={M.t + 25} fill="#A7F3D0">choke ilə {f0(back)} psi</text>
            </g>
          </svg>
          <div className="grid grid-cols-4 gap-2 mt-2 text-center font-['Space_Grotesk']">
            {probes.map((d) => (
              <div key={d} className="rounded-xl bg-[#101A2E] px-2 py-2">
                <p className="text-[10px] text-[#6B82A0]">{f0(d)} ft</p>
                <p className="font-mono text-[12px] font-bold text-[#FCA5A5]">{f0(gasVolumeAtDepth(v1, p1, mw, d, 0))} bbl</p>
                <p className="font-mono text-[11px] text-[#A7F3D0]">{f0(gasVolumeAtDepth(v1, p1, mw, d, back))} bbl</p>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-3">
            <Slider label="İlkin qaz həcmi (dibdə)" unit="bbl" value={v1} min={5} max={60} step={1} accent="#F87171" onChange={setV1} />
            <Slider label="Dib təzyiqi" unit="psi" value={p1} min={3000} max={9000} step={100} accent="#F87171" onChange={setP1} />
            <Slider label="Məhlul çəkisi" unit="ppg" value={mw} min={8.6} max={14} step={0.1} accent={ACCENT} onChange={setMw} decimals={1} />
            <Slider label="Choke ilə saxlanan səth təzyiqi" unit="psi" value={back} min={0} max={2000} step={50} accent="#34D399" onChange={setBack} />
          </div>
          <p className="text-[11px] text-[#6B82A0] mt-2 leading-relaxed font-['Space_Grotesk']">
            İdeal qaz, sabit temperatur, quyu şaquli. Qırmızı əyri: qaz sərbəst genişlənir (təhlükəli). Yaşıl əyri: choke səth təzyiqi saxlayır, genişlənmə cilovlanır. Real əməliyyatda səth təzyiqini kill cədvəli idarə edir.
          </p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Bağlı quyuda miqrasiya: SICP artımı</p>
          <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Bağlı quyuda SICP vaxta görə">
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <g key={t}>
                <line x1={M.l} x2={CW - M.r} y1={my(sicp0 * 0.8 + t * (sMax - sicp0 * 0.8))} y2={my(sicp0 * 0.8 + t * (sMax - sicp0 * 0.8))} stroke="rgba(255,255,255,0.05)" />
                <text x={M.l - 5} y={my(sicp0 * 0.8 + t * (sMax - sicp0 * 0.8)) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{f0(sicp0 * 0.8 + t * (sMax - sicp0 * 0.8))}</text>
                <text x={mx(t * tMax)} y={CH - M.b + 13} fontSize="9" textAnchor="middle" fill="#6B82A0">{f1(t * tMax)}</text>
              </g>
            ))}
            <text x={(M.l + CW - M.r) / 2} y={CH - 6} fontSize="10" textAnchor="middle" fill="#8DA2BF">Bağlı qalma vaxtı, saat</text>
            <text transform={`translate(11 ${(M.t + CH - M.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">SICP, psi</text>
            <rect x={M.l} y={M.t} width={CW - M.l - M.r} height={Math.max(0, my(maaspV) - M.t)} fill="#F8717112" />
            <line x1={M.l} x2={CW - M.r} y1={my(maaspV)} y2={my(maaspV)} stroke="#F87171" strokeDasharray="5 4" />
            <text x={M.l + 4} y={my(maaspV) - 4} fontSize="9" fill="#FCA5A5">MAASP {f0(maaspV)} psi</text>
            <line x1={mx(0)} y1={my(sicpAt(0))} x2={mx(tMax)} y2={my(sicpAt(tMax))} stroke={ACCENT} strokeWidth="2.6" />
            <circle cx={mx(Math.min(hours, tMax))} cy={my(sicpAt(Math.min(hours, tMax)))} r="6" fill={sicpAt(hours) > maaspV ? "#F87171" : "#34D399"} stroke="#080C18" strokeWidth="2" />
          </svg>
          <div className="grid grid-cols-3 gap-2 mt-2 text-center font-['Space_Grotesk']">
            {[
              ["Miqrasiya məsafəsi", `${f0(rate * hours)} ft`],
              ["Təzyiq artımı", `${f0(migrationPressureRise(mw, rate * hours))} psi`],
              ["Yeni SICP", `${f0(sicpAt(hours))} psi`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-[#101A2E] px-2 py-2">
                <p className="text-[10px] text-[#6B82A0]">{k}</p>
                <p className="font-mono text-[13px] font-bold text-[#F0F4FF]">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-3">
            <Slider label="Qaz miqrasiya sürəti" unit="ft/saat" value={rate} min={100} max={2000} step={50} accent={ACCENT} onChange={setRate} />
            <Slider label="Bağlı qalma vaxtı" unit="saat" value={hours} min={0} max={3} step={0.1} accent={ACCENT} onChange={setHours} decimals={1} />
            <Slider label="Başlanğıc SICP" unit="psi" value={sicp0} min={200} max={1200} step={20} accent="#38BDF8" onChange={setSicp0} />
            <Slider label="Çat qradiyenti (shoe 6,000 ft)" unit="ppg" value={fg} min={11} max={17} step={0.1} accent="#F87171" onChange={setFg} decimals={1} />
          </div>
          <p className="mt-2 rounded-lg px-3 py-2 text-[12px] font-['Space_Grotesk']" style={{ background: sicpAt(hours) > maaspV ? "#F8717114" : "#34D39914", color: sicpAt(hours) > maaspV ? "#FCA5A5" : "#A7F3D0" }}>
            {Number.isFinite(tHit) && tHit > 0
              ? `SICP təxminən ${f1(tHit)} saatdan sonra MAASP-a çatar. Ondan əvvəl təzyiq nəzarətli azaldılmalıdır (volumetrik metod və ya kill).`
              : "SICP artımı yoxdur."}
          </p>
          <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
            <li>Miqrasiya sürətini 1,200 ft/saat-a qaldır: MAASP-a nə vaxt çatır?</li>
            <li>Məhlul çəkisini artır: eyni miqrasiyada təzyiq artımı necə dəyişir?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
