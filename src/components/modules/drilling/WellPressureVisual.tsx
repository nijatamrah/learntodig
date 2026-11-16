"use client";

import { useMemo, useState } from "react";
import Slider from "../Slider";
import { buildProfile, selectCasingSeats } from "@/lib/drilling/pressure";

const ACCENT = "#FBBF24";
const PARAMS = { td: 13000, normalGradient: 0.45, overpressureTop: 6000, peakPorePpg: 15.5, poisson: 0.35 };

const W = 720;
const H = 540;
const TOP = 36;
const BOT = 500;
const WX = { l: 78, r: 138 }; // quyu sütunu
const CX = { l: 262, r: 690 }; // qrafik
const XMIN = 8;
const XMAX = 20;

export default function WellPressureVisual() {
  const [mw, setMw] = useState(12);
  const [pumps, setPumps] = useState(false);
  const [depth, setDepth] = useState(9000);

  const profile = useMemo(() => buildProfile(PARAMS), []);
  const seats = useMemo(() => {
    const r = selectCasingSeats(profile, { tripMargin: 0.3, fracMargin: 0.5, surfaceShoe: 1500 });
    return r.ok ? r.seats.map((s) => s.depth) : [];
  }, [profile]);

  const mwEff = mw + (pumps ? 0.4 : 0);
  const y = (d: number) => TOP + (d / PARAMS.td) * (BOT - TOP);
  const cx = (v: number) => CX.l + ((v - XMIN) / (XMAX - XMIN)) * (CX.r - CX.l);

  const at = profile.find((p) => p.d >= depth) ?? profile[profile.length - 1];
  const ph = 0.052 * mwEff * at.d;
  const state: { label: string; color: string } =
    mwEff < at.ppPpg ? { label: "UNDERBALANCE: kick riski", color: "#F87171" } : mwEff > at.fgPpg ? { label: "ÇAT: məhlul itkisi riski", color: "#FB923C" } : { label: "Mud window daxilində", color: "#34D399" };

  const kick = profile.filter((p) => p.ppPpg > mwEff);
  const loss = profile.filter((p) => p.fgPpg < mwEff);
  const range = (arr: typeof profile) => (arr.length ? `${arr[0].d.toLocaleString("en-US")}-${arr[arr.length - 1].d.toLocaleString("en-US")} ft` : "yoxdur");

  const path = (k: "ppPpg" | "fgPpg" | "obPpg") => profile.map((p, i) => `${i ? "L" : "M"}${cx(p[k]).toFixed(1)},${y(p.d).toFixed(1)}`).join(" ");
  const step = 250;
  const arrowDepths: number[] = [];
  for (let d = 500; d <= PARAMS.td; d += step) arrowDepths.push(d);

  const layers = [
    { from: 0, to: 1500, c: "#1A2538", n: "Dayaz çöküntü" },
    { from: 1500, to: 4000, c: "#1E2B3F", n: "Qumdaşı / gil" },
    { from: 4000, to: 6000, c: "#22304A", n: "Gil" },
    { from: 6000, to: 13000, c: "#2B2438", n: "Anormal təzyiqli gil zonası" },
  ];

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.5fr)_320px] gap-6">
      <div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="img" aria-label="Quyu kəsiyi və təzyiq balansı">
          <style>{`@keyframes influx{0%{transform:translateX(-6px);opacity:.2}50%{opacity:1}100%{transform:translateX(0);opacity:.2}} @keyframes outflux{0%{transform:translateX(6px);opacity:.2}50%{opacity:1}100%{transform:translateX(0);opacity:.2}}`}</style>

          {/* formasiya qatları */}
          {layers.map((l) => (
            <g key={l.n}>
              <rect x="14" y={y(l.from)} width="196" height={y(l.to) - y(l.from)} fill={l.c} />
              <text x="20" y={y(l.from) + 14} fontSize="9" fill="#6B82A0">{l.n}</text>
            </g>
          ))}
          <rect x="14" y={TOP - 14} width="196" height="14" fill="#0A111F" />
          <text x="112" y={TOP - 4} fontSize="9" textAnchor="middle" fill="#8DA2BF">Yer səthi</text>

          {/* quyu */}
          <rect x={WX.l} y={TOP} width={WX.r - WX.l} height={BOT - TOP} fill="#0A2A4A" stroke="#3A4C6B" strokeWidth="2" />
          {/* casing */}
          {seats.map((d, i) => (
            <g key={d}>
              <line x1={WX.l - 5} y1={TOP} x2={WX.l - 5} y2={y(d)} stroke="#9DB0CC" strokeWidth="3" opacity={0.45 + 0.2 * (seats.length - i) / seats.length} />
              <line x1={WX.r + 5} y1={TOP} x2={WX.r + 5} y2={y(d)} stroke="#9DB0CC" strokeWidth="3" opacity={0.45 + 0.2 * (seats.length - i) / seats.length} />
              <line x1={WX.l - 14} x2={WX.r + 14} y1={y(d)} y2={y(d)} stroke="#FF6B2B" strokeDasharray="3 3" />
              <text x={14 + 196 + 6} y={y(d) - 3} fontSize="9" fill="#FF6B2B">shoe {d.toLocaleString("en-US")}</text>
            </g>
          ))}
          <text x={(WX.l + WX.r) / 2} y={BOT + 14} fontSize="9" textAnchor="middle" fill="#8DA2BF">MW {mwEff.toFixed(1)} ppg</text>

          {/* axın oxları */}
          {arrowDepths.map((d) => {
            const p = profile.find((q) => q.d >= d);
            if (!p) return null;
            const yy = y(d);
            if (p.ppPpg > mwEff)
              return (
                <g key={`k${d}`} style={{ animation: "influx 1.3s ease-in-out infinite" }}>
                  <line x1={WX.l - 2} y1={yy} x2={WX.l + 16} y2={yy} stroke="#F87171" strokeWidth="2" />
                  <polygon points={`${WX.l + 16},${yy - 4} ${WX.l + 22},${yy} ${WX.l + 16},${yy + 4}`} fill="#F87171" />
                </g>
              );
            if (p.fgPpg < mwEff)
              return (
                <g key={`l${d}`} style={{ animation: "outflux 1.3s ease-in-out infinite" }}>
                  <line x1={WX.r + 2} y1={yy} x2={WX.r - 16} y2={yy} stroke="#FB923C" strokeWidth="2" />
                  <polygon points={`${WX.r - 16},${yy - 4} ${WX.r - 22},${yy} ${WX.r - 16},${yy + 4}`} fill="#FB923C" />
                </g>
              );
            return null;
          })}

          {/* qrafik oxları və şəbəkə */}
          {[8, 10, 12, 14, 16, 18, 20].map((v) => (
            <g key={v}>
              <line x1={cx(v)} x2={cx(v)} y1={TOP} y2={BOT} stroke="rgba(255,255,255,0.05)" />
              <text x={cx(v)} y={BOT + 14} fontSize="10" textAnchor="middle" fill="#6B82A0">{v}</text>
            </g>
          ))}
          {[0, 2000, 4000, 6000, 8000, 10000, 12000].map((d) => (
            <g key={d}>
              <line x1={CX.l} x2={CX.r} y1={y(d)} y2={y(d)} stroke="rgba(255,255,255,0.05)" />
              <text x={CX.l - 6} y={y(d) + 3} fontSize="10" textAnchor="end" fill="#6B82A0">{d}</text>
            </g>
          ))}
          <text x={(CX.l + CX.r) / 2} y={H - 8} fontSize="11" textAnchor="middle" fill="#8DA2BF">Ekvivalent məhlul çəkisi, ppg</text>
          <text transform={`translate(${CX.l - 40} ${(TOP + BOT) / 2}) rotate(-90)`} fontSize="11" textAnchor="middle" fill="#8DA2BF">TVD, ft</text>

          {/* kick / itki zonaları */}
          {profile.map((p) => {
            if (p.ppPpg > mwEff) return <rect key={`kz${p.d}`} x={cx(mwEff)} y={y(p.d) - 1} width={Math.max(0, cx(p.ppPpg) - cx(mwEff))} height={(BOT - TOP) / profile.length + 1.5} fill="#F87171" opacity="0.4" />;
            if (p.fgPpg < mwEff) return <rect key={`lz${p.d}`} x={cx(p.fgPpg)} y={y(p.d) - 1} width={Math.max(0, cx(mwEff) - cx(p.fgPpg))} height={(BOT - TOP) / profile.length + 1.5} fill="#FB923C" opacity="0.4" />;
            return null;
          })}

          <path d={path("obPpg")} fill="none" stroke="#6B82A0" strokeWidth="1.5" strokeDasharray="5 4" />
          <path d={path("fgPpg")} fill="none" stroke="#F87171" strokeWidth="2" />
          <path d={path("ppPpg")} fill="none" stroke="#00D4FF" strokeWidth="2" />
          <line x1={cx(mwEff)} x2={cx(mwEff)} y1={TOP} y2={BOT} stroke={ACCENT} strokeWidth="2.5" />

          {/* baxılan dərinlik */}
          <line x1="14" x2={CX.r} y1={y(at.d)} y2={y(at.d)} stroke={state.color} strokeDasharray="4 3" opacity="0.9" />
          <circle cx={cx(mwEff)} cy={y(at.d)} r="5" fill={state.color} stroke="#080C18" strokeWidth="1.5" />
          <text x={CX.r} y={y(at.d) - 5} fontSize="10" textAnchor="end" fill={state.color}>{at.d.toLocaleString("en-US")} ft</text>

          <g fontSize="10" transform={`translate(${CX.l + 10} ${TOP + 8})`}>
            {[["#00D4FF", "Məsamə təzyiqi (Pp)"], ["#F87171", "Çat qradiyenti (FG)"], ["#6B82A0", "Overburden"], [ACCENT, "Məhlul çəkisi"]].map(([c, t], i) => (
              <g key={t} transform={`translate(0 ${i * 14})`}>
                <line x1="0" x2="16" y1="4" y2="4" stroke={c} strokeWidth="2.5" />
                <text x="22" y="8" fill="#B7C5DD">{t}</text>
              </g>
            ))}
          </g>
        </svg>
        <p className="text-[11px] text-[#6B82A0] mt-2 leading-relaxed font-['Space_Grotesk']">
          Qırmızı zonada məhlul çəkisi məsamə təzyiqindən aşağıdır (formasiya mayesi quyuya axa bilər). Narıncı zonada çat qradiyentindən yuxarıdır (məhlul formasiyaya itə bilər). Sintetik, təhsil məqsədli profil (3-cü bölmə ilə eyni).
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>İdarəetmə</p>
          <Slider label="Məhlul çəkisi" unit="ppg" value={mw} min={8} max={19} step={0.1} decimals={1} accent={ACCENT} onChange={setMw} />
          <Slider label="Baxılan dərinlik" unit="ft TVD" value={depth} min={500} max={13000} step={250} accent={ACCENT} onChange={setDepth} />
          <label className="flex items-center gap-2 text-[12px] text-[#8DA2BF] font-['Space_Grotesk']">
            <input type="checkbox" checked={pumps} onChange={(e) => setPumps(e.target.checked)} />
            Nasoslar işləyir (ECD ≈ +0.4 ppg)
          </label>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>{at.d.toLocaleString("en-US")} ft-də</p>
          {[
            ["Məhlul təzyiqi (Ph)", `${Math.round(ph).toLocaleString("en-US")} psi`],
            ["Məsamə təzyiqi (Pp)", `${Math.round(at.pp).toLocaleString("en-US")} psi (${at.ppPpg.toFixed(1)} ppg)`],
            ["Çat təzyiqi (Pf)", `${Math.round(at.fg).toLocaleString("en-US")} psi (${at.fgPpg.toFixed(1)} ppg)`],
            ["Ph − Pp", `${Math.round(ph - at.pp).toLocaleString("en-US")} psi`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-t border-[rgba(255,255,255,0.05)] py-1.5 text-[12px]">
              <span className="text-[#8DA2BF]">{k}</span>
              <span className="font-mono font-semibold text-[#F0F4FF]">{v}</span>
            </div>
          ))}
          <p className="mt-3 rounded-lg px-3 py-2 text-[12px] font-semibold" style={{ background: state.color + "1A", color: state.color }}>{state.label}</p>
          <div className="mt-3 text-[11px] text-[#8DA2BF] leading-relaxed">
            <p>Kick zonası: <b className="text-[#FCA5A5]">{range(kick)}</b></p>
            <p>İtki zonası: <b className="text-[#FDBA74]">{range(loss)}</b></p>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>MW-ni 9 ppg-yə endir: dərində kick zonası açılır.</li>
            <li>MW-ni 17 ppg-yə qaldır: dayaz shoe-da itki zonası yaranır.</li>
            <li>MW-ni 14 ppg qoy, nasosları aç: ECD-nin window-a təsirinə bax.</li>
            <li>Eyni MW ilə həm kick, həm itki zonası ola bilərmi? Bu, bir casing seat-in niyə kifayət etmədiyini göstərir.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
