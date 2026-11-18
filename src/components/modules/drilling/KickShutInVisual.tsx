"use client";

import { useState } from "react";
import Slider from "../Slider";
import { hydroPsi, influxLengthFt, influxType, influxGradient, maasp, sicpFor } from "@/lib/drilling/wellcontrol";

const ACCENT = "#FBBF24";
const TVD = 10000;
const SHOE = 6000;
const FG = 14.0;
const ANN = 0.0459; // bbl/ft
const GAS_GRAD = 0.1;
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const CW = 360;
const CH = 300;
const M = { l: 48, r: 14, t: 26, b: 36 };

function Gauge({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const frac = Math.min(1, Math.max(0, value / max));
    const cx = 52, cy = 52, r = 38;
  return (
    <svg viewBox="0 0 104 84" className="w-[104px] h-auto">
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#1A2538" strokeWidth="9" />
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx - r * Math.cos(Math.PI * frac)} ${cy - r * Math.sin(Math.PI * frac)}`} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" />
      <text x={cx} y={cy - 4} fontSize="13" fontWeight="700" textAnchor="middle" fill="#F0F4FF">{f0(value)}</text>
      <text x={cx} y={cy + 10} fontSize="8" textAnchor="middle" fill="#8DA2BF">psi</text>
      <text x={cx} y={cy + 28} fontSize="10" textAnchor="middle" fill="#B7C5DD">{label}</text>
    </svg>
  );
}

export default function KickShutInVisual() {
  const [mw, setMw] = useState(10.0);
  const [pfEmw, setPfEmw] = useState(11.0);
  const [perm, setPerm] = useState(2.0); // bbl/min per 100 psi underbalance
  const [react, setReact] = useState(5);
  const [shut, setShut] = useState(true);

  const under = Math.max(0, (pfEmw - mw) * 0.052 * TVD); // psi
  const rate = (perm * under) / 100; // bbl/min
  const gain = rate * react;
  const sidpp = under;
  const lk = influxLengthFt(gain, ANN);
  const sicp = gain > 0 ? sicpFor(mw, sidpp, GAS_GRAD, Math.min(lk, TVD)) : 0;
  const maaspV = maasp(FG, mw, SHOE);
  const emwShoe = mw + sicp / (0.052 * SHOE);
  const grad = gain > 0 ? influxGradient(mw, sicp, sidpp, lk) : NaN;
  const over = sicp > maaspV;

  const tMax = 30;
  const yMax = Math.max(60, rate * tMax * 1.05, 1);
  const cx = (t: number) => M.l + (t / tMax) * (CW - M.l - M.r);
  const cy = (v: number) => CH - M.b - (v / yMax) * (CH - M.t - M.b);

  // quyu sxemi
  const wellTop = 30, wellBot = 330;
  const wy = (d: number) => wellTop + (d / TVD) * (wellBot - wellTop);
  const lkVis = Math.min(lk, TVD * 0.6);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Quyu: {shut ? "bağlı (shut-in)" : "açıq"}</p>
          <svg viewBox="0 0 360 380" className="w-full h-auto" role="img" aria-label="Kick və shut-in quyu sxemi">
            <rect x="110" y={wellTop} width="140" height={wellBot - wellTop} fill="#1E2B3F" opacity="0.5" />
            {/* annulus: məhlul */}
            <rect x="110" y={wellTop} width="140" height={wellBot - wellTop} fill="#7C5E3C" opacity="0.55" />
            {/* influx */}
            {gain > 0 && <rect x="110" y={wy(TVD) - (lkVis / TVD) * (wellBot - wellTop)} width="140" height={(lkVis / TVD) * (wellBot - wellTop)} fill="#F87171" opacity="0.85" />}
            {/* drillstring */}
            <rect x="165" y={wellTop} width="30" height={wellBot - wellTop - 8} fill="#0D1525" stroke="#8DA2BF" />
            <rect x="170" y={wellTop} width="20" height={wellBot - wellTop - 8} fill="#A8835A" opacity="0.8" />
            {/* casing / shoe */}
            <rect x="104" y={wellTop} width="6" height={wy(SHOE) - wellTop} fill="#34D399" />
            <rect x="250" y={wellTop} width="6" height={wy(SHOE) - wellTop} fill="#34D399" />
            <text x="262" y={wy(SHOE) + 3} fontSize="10" fill="#A7F3D0">shoe {f0(SHOE)} ft</text>
            <text x="262" y={wellBot} fontSize="10" fill="#8DA2BF">TD {f0(TVD)} ft</text>
            {/* BOP */}
            <rect x="96" y={wellTop - 22} width="168" height="14" rx="3" fill={shut ? "#F87171" : "#4A6A8A"} />
            <text x="180" y={wellTop - 12} fontSize="9" textAnchor="middle" fill="#080C18" fontWeight="700">BOP {shut ? "BAĞLI" : "açıq"}</text>
            {/* göstəricilər */}
            {gain > 0 && <text x="26" y={wy(TVD) - 8} fontSize="10" fill="#FCA5A5">influx</text>}
            {gain > 0 && <text x="26" y={wy(TVD) + 4} fontSize="10" fill="#FCA5A5">{f0(lk)} ft</text>}
          </svg>
          <div className="flex gap-3 justify-center -mt-1">
            <Gauge label="SIDPP" value={shut ? sidpp : 0} max={1500} color="#38BDF8" />
            <Gauge label="SICP" value={shut ? sicp : 0} max={1500} color="#F87171" />
            <Gauge label="MAASP" value={maaspV} max={1500} color="#34D399" />
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={() => setShut((s) => !s)}
              className="px-4 py-2 rounded-xl text-[12px] font-semibold font-['Space_Grotesk']"
              style={{ background: shut ? "#4A6A8A" : "#F87171", color: "#080C18" }}
            >
              {shut ? "Quyunu aç (göstəriciləri sıfırla)" : "Quyunu bağla"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Pit həcmi (gain) vaxta görə</p>
          <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Pit gain vaxt qrafiki">
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <g key={t}>
                <line x1={M.l} x2={CW - M.r} y1={cy(t * yMax)} y2={cy(t * yMax)} stroke="rgba(255,255,255,0.05)" />
                <text x={M.l - 5} y={cy(t * yMax) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{f0(t * yMax)}</text>
                <text x={cx(t * tMax)} y={CH - M.b + 13} fontSize="9" textAnchor="middle" fill="#6B82A0">{f0(t * tMax)}</text>
              </g>
            ))}
            <text x={(M.l + CW - M.r) / 2} y={CH - 6} fontSize="10" textAnchor="middle" fill="#8DA2BF">Kick başladıqdan sonra vaxt, dəq</text>
            <text transform={`translate(11 ${(M.t + CH - M.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">Pit gain, bbl</text>
            <line x1={M.l} x2={CW - M.r} y1={cy(10)} y2={cy(10)} stroke="#FBBF24" strokeDasharray="5 4" />
            <text x={CW - M.r - 2} y={cy(10) - 4} fontSize="9" textAnchor="end" fill="#FCD34D">siqnal 10 bbl</text>
            <line x1={cx(0)} y1={cy(0)} x2={cx(tMax)} y2={cy(rate * tMax)} stroke="#F87171" strokeWidth="2.4" />
            <line x1={cx(react)} x2={cx(react)} y1={M.t} y2={CH - M.b} stroke="#38BDF8" strokeDasharray="3 3" />
            <text x={cx(react) + 4} y={M.t + 10} fontSize="9" fill="#7DD3FC">bağlandı</text>
            <circle cx={cx(react)} cy={cy(gain)} r="6" fill={gain > 10 ? "#F87171" : "#34D399"} stroke="#080C18" strokeWidth="2" />
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center font-['Space_Grotesk'] mt-2">
            {[
              ["Axın sürəti", `${f1(rate)} bbl/dəq`],
              ["Pit gain", `${f1(gain)} bbl`],
              ["Influx", gain > 0 ? influxType(grad) : "-"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-[#101A2E] px-2 py-2">
                <p className="text-[10px] text-[#6B82A0]">{k}</p>
                <p className="font-mono text-[13px] font-bold text-[#F0F4FF]">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 rounded-lg px-3 py-2 text-[12px] font-['Space_Grotesk']" style={{ background: over ? "#F8717114" : "#34D39914", color: over ? "#FCA5A5" : "#A7F3D0" }}>
            {gain <= 0
              ? "Overbalance var: formasiya təzyiqi məhlul sütununun hidrostatikindən aşağıdır, kick yoxdur."
              : over
                ? `SICP (${f0(sicp)} psi) MAASP-dan (${f0(maaspV)} psi) yuxarıdır: shoe-da çat riski.`
                : `SICP (${f0(sicp)} psi) MAASP-dan aşağıdır. Shoe-da EMW ${f1(emwShoe)} ppg, çat qradiyenti ${FG} ppg.`}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Formasiya və məhlul</p>
          <Slider label="Məhlul çəkisi (MW)" unit="ppg" value={mw} min={8.6} max={13} step={0.1} accent={ACCENT} onChange={setMw} decimals={1} />
          <Slider label="Formasiya təzyiqi (ekv. çəki)" unit="ppg" value={pfEmw} min={8.6} max={13} step={0.1} accent="#F87171" onChange={setPfEmw} decimals={1} />
          <Slider label="Layın axın qabiliyyəti" unit="bbl/dəq / 100 psi" value={perm} min={0.2} max={6} step={0.2} accent="#F87171" onChange={setPerm} decimals={1} />
          <p className="text-[11px] text-[#6B82A0] font-['Space_Grotesk']">Underbalance: {f0(under)} psi (SIDPP-ə bərabərdir). Hidrostatik: {f0(hydroPsi(mw, TVD))} psi.</p>
        </div>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Reaksiya</p>
          <Slider label="Kick-dən bağlanana qədər vaxt" unit="dəq" value={react} min={1} max={30} step={1} accent="#38BDF8" onChange={setReact} />
          <div className="text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
            <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
            <ul className="space-y-1.5 list-disc pl-4">
              <li>Reaksiya vaxtını 5-dən 20 dəqiqəyə qaldır: pit gain və SICP necə dəyişir?</li>
              <li>Formasiya təzyiqini 11.0-dan 12.0 ppg-ə qaldır: SIDPP niyə artır?</li>
              <li>Layın axın qabiliyyətini azalt: eyni gain üçün daha çox vaxt lazım olur?</li>
              <li>SICP hansı halda MAASP-ı keçir? Bu nə deməkdir?</li>
            </ul>
          </div>
          <p className="text-[11px] text-[#6B82A0] font-['Space_Grotesk'] leading-relaxed">
            Model: sabit axın sürəti (real kick-də underbalance azaldıqca axın zəifləyir), şaquli quyu, influx dibdə qaz kimi götürülür (0.1 psi/ft), annulus tutumu {ANN} bbl/ft. Təhsil məqsədlidir.
          </p>
        </div>
      </div>
    </div>
  );
}
