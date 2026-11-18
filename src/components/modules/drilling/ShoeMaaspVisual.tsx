"use client";

import { useMemo, useState } from "react";
import Slider from "../Slider";
import { PSI_PER_FT_PER_PPG, kickToleranceIntensity, maasp, shoeEmwShutIn, shoePressureShutIn, sicpFor, formationEmw } from "@/lib/drilling/wellcontrol";

const ACCENT = "#FBBF24";
const ANN = 0.0459;
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const f2 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CW = 420;
const CH = 330;
const M = { l: 56, r: 14, t: 26, b: 38 };

export default function ShoeMaaspVisual() {
  const [td, setTd] = useState(10000);
  const [shoe, setShoe] = useState(6000);
  const [mw, setMw] = useState(10);
  const [fg, setFg] = useState(14);
  const [intensity, setIntensity] = useState(1.0); // kick intensivliyi ppg
  const [vol, setVol] = useState(20);
  const [gGas] = useState(0.1);

  const sidpp = intensity * PSI_PER_FT_PER_PPG * td;
  const lk = vol / ANN;
  const sicp = sicpFor(mw, sidpp, gGas, Math.min(lk, td - shoe));
  const pShoe = shoePressureShutIn({ td, shoe, mw, sidpp, kickLenFt: lk, gasGrad: gGas });
  const pFrac = PSI_PER_FT_PER_PPG * fg * shoe;
  const maaspV = maasp(fg, mw, shoe);
  const kt = kickToleranceIntensity({ td, shoe, mw, fgPpg: fg, kickLenFt: lk, gasGrad: gGas });
  const emwShoe = pShoe / (PSI_PER_FT_PER_PPG * shoe);
  const safe = pShoe <= pFrac;
  const ktOk = intensity <= kt;

  // qrafik: shoe təzyiqi vs kick həcmi
  const vMax = 120;
  const pts = useMemo(() => {
    const out: [number, number][] = [];
    for (let v = 0; v <= vMax; v += 2) {
      const l = v / ANN;
      out.push([v, shoePressureShutIn({ td, shoe, mw, sidpp, kickLenFt: l, gasGrad: gGas })]);
    }
    return out;
  }, [td, shoe, mw, sidpp, gGas]);
  const allP = pts.map((p) => p[1]);
  const pTop = Math.max(pFrac * 1.12, Math.max(...allP) * 1.05);
  const pBot = Math.min(...allP, pFrac) * 0.85;
  const cx = (v: number) => M.l + (v / vMax) * (CW - M.l - M.r);
  const cy = (p: number) => CH - M.b - ((p - pBot) / (pTop - pBot)) * (CH - M.t - M.b);

  // maksimum tolere olunan həcm
  const slope = PSI_PER_FT_PER_PPG * mw - gGas;
  const pf = mw * PSI_PER_FT_PER_PPG * td + sidpp;
  const lkMax = (pFrac - pf + PSI_PER_FT_PER_PPG * mw * (td - shoe)) / slope;
  const vMaxTol = lkMax > 0 ? Math.min(lkMax, td - shoe) * ANN : 0;
  const unlimited = lkMax >= td - shoe;

  // sxem
  const top = 30, bot = 330;
  const wy = (d: number) => top + (d / td) * (bot - top);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
          <svg viewBox="0 0 340 370" className="w-full h-auto" role="img" aria-label="Shoe, çat qradiyenti və kick">
            <rect x="90" y={top} width="120" height={bot - top} fill="#7C5E3C" opacity="0.5" />
            <rect x="90" y={wy(td) - Math.min(lk, td - shoe) / td * (bot - top)} width="120" height={Math.min(lk, td - shoe) / td * (bot - top)} fill="#F87171" opacity="0.85" />
            <rect x="84" y={top} width="6" height={wy(shoe) - top} fill="#34D399" />
            <rect x="210" y={top} width="6" height={wy(shoe) - top} fill="#34D399" />
            <line x1="60" x2="250" y1={wy(shoe)} y2={wy(shoe)} stroke={safe ? "#34D399" : "#F87171"} strokeDasharray="4 3" />
            <text x="222" y={wy(shoe) - 6} fontSize="10" fill={safe ? "#A7F3D0" : "#FCA5A5"}>shoe {f0(shoe)} ft</text>
            <text x="222" y={wy(shoe) + 12} fontSize="10" fill="#B7C5DD">EMW {f2(emwShoe)} ppg</text>
            <text x="222" y={wy(shoe) + 26} fontSize="10" fill="#8DA2BF">çat {f1(fg)} ppg</text>
            <text x="222" y={bot} fontSize="10" fill="#8DA2BF">TD {f0(td)} ft</text>
            <text x="150" y="20" fontSize="11" textAnchor="middle" fill="#B7C5DD">Bağlı quyu</text>
            <text x="150" y={wy(td) - 10} fontSize="10" textAnchor="middle" fill="#fff">influx {f0(lk)} ft</text>
          </svg>
          <div className="grid grid-cols-2 gap-2 text-center font-['Space_Grotesk']">
            {[
              ["SIDPP", `${f0(sidpp)} psi`, "#38BDF8"],
              ["SICP", `${f0(sicp)} psi`, sicp > maaspV ? "#F87171" : "#F0F4FF"],
              ["MAASP", `${f0(maaspV)} psi`, "#34D399"],
              ["Kick tolerance", `${f2(kt)} ppg`, ktOk ? "#34D399" : "#F87171"],
            ].map(([k, v, c]) => (
              <div key={k} className="rounded-xl bg-[#101A2E] px-2 py-2">
                <p className="text-[10px] text-[#6B82A0]">{k}</p>
                <p className="font-mono text-[14px] font-bold" style={{ color: String(c) }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Shoe-da təzyiq vs kick həcmi</p>
          <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Shoe-da təzyiq kick həcminə görə">
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <g key={t}>
                <line x1={M.l} x2={CW - M.r} y1={cy(pBot + t * (pTop - pBot))} y2={cy(pBot + t * (pTop - pBot))} stroke="rgba(255,255,255,0.05)" />
                <text x={M.l - 5} y={cy(pBot + t * (pTop - pBot)) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{f0(pBot + t * (pTop - pBot))}</text>
                <text x={cx(t * vMax)} y={CH - M.b + 13} fontSize="9" textAnchor="middle" fill="#6B82A0">{f0(t * vMax)}</text>
              </g>
            ))}
            <text x={(M.l + CW - M.r) / 2} y={CH - 6} fontSize="10" textAnchor="middle" fill="#8DA2BF">Kick həcmi (pit gain), bbl</text>
            <text transform={`translate(11 ${(M.t + CH - M.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">Shoe-da təzyiq, psi</text>
            <rect x={M.l} y={M.t} width={CW - M.l - M.r} height={Math.max(0, cy(pFrac) - M.t)} fill="#F8717112" />
            <line x1={M.l} x2={CW - M.r} y1={cy(pFrac)} y2={cy(pFrac)} stroke="#F87171" strokeDasharray="5 4" />
            <text x={M.l + 4} y={cy(pFrac) - 4} fontSize="9" fill="#FCA5A5">çat təzyiqi {f0(pFrac)} psi</text>
            <path d={pts.map(([v, p], i) => `${i ? "L" : "M"}${cx(v).toFixed(1)},${cy(p).toFixed(1)}`).join(" ")} fill="none" stroke={ACCENT} strokeWidth="2.6" />
            {!unlimited && vMaxTol > 0 && vMaxTol <= vMax && (
              <g>
                <line x1={cx(vMaxTol)} x2={cx(vMaxTol)} y1={M.t} y2={CH - M.b} stroke="#34D399" strokeDasharray="3 3" />
                <text x={cx(vMaxTol) + 4} y={CH - M.b - 6} fontSize="9" fill="#A7F3D0">maks. {f0(vMaxTol)} bbl</text>
              </g>
            )}
            <circle cx={cx(Math.min(vol, vMax))} cy={cy(pShoe)} r="6" fill={safe ? "#34D399" : "#F87171"} stroke="#080C18" strokeWidth="2" />
          </svg>
          <p className="mt-2 rounded-lg px-3 py-2 text-[12px] font-['Space_Grotesk']" style={{ background: safe ? "#34D39914" : "#F8717114", color: safe ? "#A7F3D0" : "#FCA5A5" }}>
            {safe
              ? `Shoe-da təzyiq ${f0(pShoe)} psi: çat təzyiqindən (${f0(pFrac)} psi) aşağıdır. ${unlimited ? "Bu SIDPP üçün bütün kick həcmləri tolerant." : `Maksimum tolerant kick: təxminən ${f0(vMaxTol)} bbl.`}`
              : `Shoe-da təzyiq ${f0(pShoe)} psi çat təzyiqini (${f0(pFrac)} psi) aşır: formasiya yarıla bilər. Tolerant həcm təxminən ${f0(vMaxTol)} bbl-dir.`}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Quyu və casing seat</p>
          <Slider label="TD (TVD)" unit="ft" value={td} min={7000} max={14000} step={500} accent={ACCENT} onChange={(v) => { setTd(v); if (shoe > v - 500) setShoe(v - 500); }} />
          <Slider label="Shoe dərinliyi" unit="ft" value={shoe} min={2000} max={Math.max(2500, td - 500)} step={100} accent="#34D399" onChange={setShoe} />
          <Slider label="Məhlul çəkisi (MW)" unit="ppg" value={mw} min={8.6} max={13} step={0.1} accent={ACCENT} onChange={setMw} decimals={1} />
          <Slider label="Shoe-da çat qradiyenti (FG)" unit="ppg" value={fg} min={11} max={18} step={0.1} accent="#F87171" onChange={setFg} decimals={1} />
        </div>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Kick</p>
          <Slider label="Kick intensivliyi (overbalance çatışmazlığı)" unit="ppg" value={intensity} min={0.1} max={3} step={0.1} accent="#F87171" onChange={setIntensity} decimals={1} />
          <Slider label="Kick həcmi (pit gain)" unit="bbl" value={vol} min={2} max={vMax} step={2} accent="#F87171" onChange={setVol} />
          <p className="text-[11px] text-[#6B82A0] font-['Space_Grotesk']">Formasiya təzyiqi: {f2(formationEmw(mw, td, sidpp))} ppg ekvivalent. Shoe-da bağlı EMW: {f2(shoeEmwShutIn(mw, shoe, sicp))} ppg (SICP ilə, yaxınlaşma).</p>
          <ul className="space-y-1.5 list-disc pl-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
            <li>Shoe-nu yuxarı çək (3,000 ft): kick tolerance necə dəyişir? Niyə?</li>
            <li>Çat qradiyentini 12-yə endir: hansı kick həcmi hələ təhlükəsizdir?</li>
            <li>Kick intensivliyini 2.5 ppg-yə qaldır: tolerant həcm niyə kiçilir?</li>
          </ul>
          <p className="text-[11px] text-[#6B82A0] font-['Space_Grotesk'] leading-relaxed">Model: şaquli quyu, vahid annulus tutumu ({ANN} bbl/ft), influx dibdə qaz (0.1 psi/ft). Kick tolerance casing seat seçimini yoxlayır (8-ci bölmə).</p>
        </div>
      </div>
    </div>
  );
}
