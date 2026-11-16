"use client";

import { useMemo, useState } from "react";
import Slider from "../Slider";
import { DEFAULT_GEOMETRY, circulatingSystem, type FlowRegime, type HydraulicsModel, type Rheo } from "@/lib/drilling/hydraulics";

const ACCENT = "#FBBF24";
const RHEO: Rheo = { t600: 58, t300: 36, t100: 18, t3: 5 };
const DEPTH = 10000;
const SHOE = 4000;
const FG = 14;
const MARGIN = 0.5;

const W = 720;
const H = 520;
const Y0 = 90; // səth
const Y1 = 400; // TD
const yDepth = (d: number) => Y0 + (d / DEPTH) * (Y1 - Y0);

const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const REG: Record<FlowRegime, string> = { laminar: "laminar", transitional: "keçid", turbulent: "turbulent" };

/** Kiçik sürət profili illüstrasiyası */
function ProfileInset({ x, y, w, h, regime, title }: { x: number; y: number; w: number; h: number; regime: FlowRegime; title: string }) {
  const rows = 7;
  const arrows = Array.from({ length: rows }, (_, i) => {
    const t = (i + 0.5) / rows; // 0..1 en kəsiyi boyunca
    const s = 1 - Math.pow(2 * t - 1, 2); // parabolik
    const lam = 0.12 + 0.88 * s;
    const turb = 0.72 + 0.28 * s;
    const len = regime === "laminar" ? lam : regime === "turbulent" ? turb : 0.5 * lam + 0.5 * turb;
    return { yy: y + 14 + t * (h - 20), len: len * (w - 16) };
  });
  const color = regime === "laminar" ? "#34D399" : regime === "turbulent" ? "#FBBF24" : "#A78BFA";
  return (
    <g>
      <text x={x + w / 2} y={y} fontSize="10" textAnchor="middle" fill="#B7C5DD">{title}: <tspan fill={color} fontWeight="700">{REG[regime]}</tspan></text>
      <line x1={x} y1={y + 8} x2={x + w} y2={y + 8} stroke="#5B7092" strokeWidth="2" />
      <line x1={x} y1={y + h - 4} x2={x + w} y2={y + h - 4} stroke="#5B7092" strokeWidth="2" />
      {arrows.map((a, i) => (
        <g key={i}>
          <line x1={x + 4} y1={a.yy} x2={x + 4 + a.len} y2={a.yy} stroke={color} strokeWidth="2" />
          <polygon points={`${x + 4 + a.len},${a.yy - 3} ${x + 10 + a.len},${a.yy} ${x + 4 + a.len},${a.yy + 3}`} fill={color} />
        </g>
      ))}
      {regime !== "laminar" &&
        [0, 1, 2].map((i) => <path key={i} d={`M${x + 20 + i * 24},${y + 24 + i * 14} q6,-8 12,0 q-6,8 -12,0`} fill="none" stroke={color} strokeWidth="1" opacity="0.6" />)}
    </g>
  );
}

export default function HydraulicsVisual() {
  const [gpm, setGpm] = useState(450);
  const [nozzle, setNozzle] = useState(13);
  const [mw, setMw] = useState(12);
  const [model, setModel] = useState<HydraulicsModel>("bingham");

  const s = useMemo(
    () =>
      circulatingSystem({
        model,
        mw,
        gpm,
        rheo: RHEO,
        depth: DEPTH,
        shoe: SHOE,
        ...DEFAULT_GEOMETRY,
        nozzles32: [nozzle, nozzle, nozzle],
        surfaceRefPsi: 100,
      }),
    [model, mw, gpm, nozzle]
  );

  const stringLoss = s.pipe.dp + s.collars.dp;
  const ecd = s.ecd;
  const limit = FG - MARGIN;
  const av = s.annDpOpen.velocity * 60; // ft/dəq
  const dur = Math.min(10, Math.max(1.6, 900 / Math.max(av, 20)));
  const jetLen = Math.min(46, Math.max(14, s.nozzleVelocity / 9));
  const shoeY = yDepth(SHOE);
  const dcY = yDepth(DEPTH - DEFAULT_GEOMETRY.dcLen);

  // BHP müqayisəsi: x şkalası 10..15 ppg
  const bx = (v: number) => 560 + ((v - 10) / 5) * 140;

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.6fr)_300px] gap-6">
      <div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="img" aria-label="Sirkulyasiya yolu, təzyiqlər və axın rejimi">
          <style>{`
            @keyframes hdown{to{stroke-dashoffset:-24}}
            @keyframes hup{to{stroke-dashoffset:24}}
            @keyframes cut{from{transform:translateY(0);opacity:1}to{transform:translateY(-${Y1 - Y0 - 10}px);opacity:.2}}
          `}</style>

          {/* torpaq */}
          <rect x="0" y={Y0 - 6} width={W} height="6" fill="#2A3A55" />
          <text x="10" y={Y0 - 12} fontSize="9" fill="#6B82A0">Yer səthi</text>

          {/* quyu divarları və casing */}
          <rect x="250" y={Y0} width="100" height={Y1 - Y0} fill="#0A2A4A" />
          <line x1="250" y1={Y0} x2="250" y2={Y1} stroke="#5B7092" strokeWidth="2" strokeDasharray="0" />
          <line x1="350" y1={Y0} x2="350" y2={Y1} stroke="#5B7092" strokeWidth="2" />
          <line x1="244" y1={Y0} x2="244" y2={shoeY} stroke="#9DB0CC" strokeWidth="4" />
          <line x1="356" y1={Y0} x2="356" y2={shoeY} stroke="#9DB0CC" strokeWidth="4" />
          <text x="362" y={shoeY - 3} fontSize="9" fill="#FF6B2B">casing shoe</text>

          {/* drill string */}
          <rect x="288" y={Y0 - 20} width="24" height={dcY - Y0 + 20} fill="#101A2E" stroke="#8DA2BF" strokeWidth="2" />
          <rect x="282" y={dcY} width="36" height={Y1 - dcY - 8} fill="#101A2E" stroke="#8DA2BF" strokeWidth="2" />
          <polygon points="284,392 316,392 300,410" fill="#FF6B2B" />
          <text x="326" y="414" fontSize="9" fill="#FF6B2B">bit</text>

          {/* axın: boru içi (aşağı) və halqa (yuxarı) */}
          <line x1="300" y1={Y0 - 20} x2="300" y2="394" stroke="#00D4FF" strokeWidth="3" strokeDasharray="8 6" style={{ animation: `hdown ${dur * 0.5}s linear infinite` }} />
          <line x1="268" y1="394" x2="268" y2={Y0} stroke="#A78BFA" strokeWidth="3" strokeDasharray="8 6" style={{ animation: `hup ${dur * 0.5}s linear infinite` }} />
          <line x1="332" y1="394" x2="332" y2={Y0} stroke="#A78BFA" strokeWidth="3" strokeDasharray="8 6" style={{ animation: `hup ${dur * 0.5}s linear infinite` }} />

          {/* şlam hissəcikləri */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={i % 2 ? 262 : 338} cy={Y1 - 12} r="2.6" fill="#C9A86A" style={{ animation: `cut ${dur}s linear ${(-i * dur) / 6}s infinite` }} />
          ))}

          {/* bit jet-ləri */}
          {[-14, 0, 14].map((dx) => (
            <g key={dx}>
              <line x1={300 + dx * 0.6} y1="410" x2={300 + dx * 1.3} y2={410 + jetLen} stroke="#FF6B2B" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          ))}

          {/* nasos və standpipe */}
          <rect x="70" y="40" width="70" height="40" rx="4" fill="#08202A" stroke="#00D4FF" strokeWidth="2" />
          <text x="105" y="64" fontSize="10" textAnchor="middle" fill="#00D4FF">Nasos</text>
          <path d="M140 60 L300 60 L300 78" fill="none" stroke="#00D4FF" strokeWidth="3" />
          <rect x="146" y="40" width="64" height="16" rx="8" fill="#101A2E" stroke="#6B82A0" />
          <text x="178" y="52" fontSize="9" textAnchor="middle" fill="#F0F4FF">{f0(s.total)} psi</text>
          <text x="176" y="34" fontSize="9" textAnchor="middle" fill="#8DA2BF">nasos təzyiqi</text>

          {/* flowline */}
          <path d="M350 98 L470 98" fill="none" stroke="#A78BFA" strokeWidth="3" />
          <rect x="400" y="80" width="60" height="16" rx="8" fill="#101A2E" stroke="#6B82A0" />
          <text x="430" y="92" fontSize="9" textAnchor="middle" fill="#F0F4FF">0 psi</text>
          <text x="430" y="74" fontSize="9" textAnchor="middle" fill="#8DA2BF">flowline</text>

          {/* təzyiq itkisi etiketləri */}
          {[
            { x: 118, y: 150, t: "Səth avadanlığı", v: s.surface, c: "#6B82A0" },
            { x: 118, y: 235, t: "Drill string (içəri)", v: stringLoss, c: "#00D4FF" },
            { x: 118, y: 330, t: "Bit nozzle-ləri", v: s.bit, c: "#FF6B2B" },
          ].map((b) => (
            <g key={b.t}>
              <rect x={b.x - 60} y={b.y - 16} width="120" height="34" rx="6" fill="#101A2E" stroke={b.c} strokeWidth="1.5" />
              <text x={b.x} y={b.y - 2} fontSize="9" textAnchor="middle" fill="#8DA2BF">{b.t}</text>
              <text x={b.x} y={b.y + 12} fontSize="12" textAnchor="middle" fill={b.c} fontWeight="700">−{f0(b.v)} psi</text>
            </g>
          ))}
          <line x1="178" y1="150" x2="178" y2="62" stroke="#6B82A0" strokeDasharray="2 3" />
          <line x1="178" y1="235" x2="288" y2="235" stroke="#00D4FF" strokeDasharray="2 3" />
          <line x1="178" y1="330" x2="282" y2="398" stroke="#FF6B2B" strokeDasharray="2 3" />
          <g>
            <rect x="372" y="200" width="120" height="34" rx="6" fill="#101A2E" stroke="#A78BFA" strokeWidth="1.5" />
            <text x="432" y="214" fontSize="9" textAnchor="middle" fill="#8DA2BF">Halqa itkisi</text>
            <text x="432" y="228" fontSize="12" textAnchor="middle" fill="#A78BFA" fontWeight="700">−{f0(s.annulus)} psi</text>
            <line x1="372" y1="217" x2="338" y2="217" stroke="#A78BFA" strokeDasharray="2 3" />
          </g>

          {/* sürət profili inset-ləri */}
          <ProfileInset x={40} y={420} w={170} h={70} regime={s.pipe.regime} title="Boru daxili" />
          <ProfileInset x={250} y={440} w={170} h={56} regime={s.annDpOpen.regime} title="Halqa (açıq quyu)" />

          {/* BHP müqayisəsi */}
          <text x="630" y="130" fontSize="11" textAnchor="middle" fill="#F0F4FF" fontWeight="600">Dib təzyiqi (EMW)</text>
          <line x1={bx(10)} y1="150" x2={bx(15)} y2="150" stroke="#2A3A55" />
          {[10, 11, 12, 13, 14, 15].map((v) => (
            <g key={v}>
              <line x1={bx(v)} y1="146" x2={bx(v)} y2="154" stroke="#6B82A0" />
              <text x={bx(v)} y="166" fontSize="9" textAnchor="middle" fill="#6B82A0">{v}</text>
            </g>
          ))}
          <line x1={bx(limit)} y1="172" x2={bx(limit)} y2="300" stroke="#F87171" strokeDasharray="4 3" />
          <text x={bx(limit)} y="314" fontSize="9" textAnchor="middle" fill="#F87171">FG − margin {limit.toFixed(1)}</text>
          <rect x={bx(10)} y="186" width={Math.max(0, bx(mw) - bx(10))} height="26" fill="#3B82F6" opacity="0.85" rx="3" />
          <text x={bx(10) + 6} y="203" fontSize="10" fill="#fff">Statik: {mw.toFixed(2)} ppg</text>
          <rect x={bx(10)} y="230" width={Math.max(0, Math.min(bx(15), bx(ecd)) - bx(10))} height="26" fill={ecd > limit ? "#F87171" : "#34D399"} opacity="0.9" rx="3" />
          <text x={bx(10) + 6} y="247" fontSize="10" fill="#080C18" fontWeight="700">Sirkulyasiya (ECD): {ecd.toFixed(2)} ppg</text>
        </svg>
        <p className="text-[11px] text-[#6B82A0] mt-2 leading-relaxed font-['Space_Grotesk']">
          Nasos təzyiqi yol boyu pilləpillə itir: səth avadanlığı, boru daxili, bit, halqa. Halqa itkisi dib təzyiqini statik hidrostatik təzyiqdən ECD qədər artırır.
          Axın rejimi illüstrasiyası: laminar axında sürət profili parabolikdir, turbulentdə daha düz. Şlam zərrəcikləri halqa sürəti ilə yuxarı qalxır (animasiya sürəti qiymətləndiricidir).
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>İdarəetmə</p>
          <div className="flex rounded-lg p-0.5 border border-[rgba(255,255,255,0.08)] bg-[#080C18]">
            {(["bingham", "powerlaw"] as const).map((m) => (
              <button key={m} onClick={() => setModel(m)} className="flex-1 py-1.5 rounded-md text-[12px] font-semibold font-['Space_Grotesk']" style={model === m ? { background: ACCENT, color: "#080C18" } : { color: "#6B82A0" }}>
                {m === "bingham" ? "Bingham" : "Power law"}
              </button>
            ))}
          </div>
          <Slider label="Axın sürəti" unit="gpm" value={gpm} min={200} max={800} step={10} accent={ACCENT} onChange={setGpm} />
          <Slider label="Nozzle ölçüsü (3 ədəd)" unit="/32 in" value={nozzle} min={8} max={24} step={1} accent={ACCENT} onChange={setNozzle} />
          <Slider label="Məhlul çəkisi" unit="ppg" value={mw} min={9} max={16} step={0.1} decimals={1} accent={ACCENT} onChange={setMw} />
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Göstəricilər</p>
          {[
            ["Nasos təzyiqi", `${f0(s.total)} psi`],
            ["Bit-də təzyiq payı", `${f0(s.bitFraction * 100)} %`],
            ["Nozzle sürəti", `${f0(s.nozzleVelocity)} ft/s`],
            ["Halqada sürət", `${f0(av)} ft/dəq`],
            ["ECD", `${ecd.toFixed(2)} ppg`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-t border-[rgba(255,255,255,0.05)] py-1.5 text-[12px]">
              <span className="text-[#8DA2BF]">{k}</span>
              <span className="font-mono font-semibold text-[#F0F4FF]">{v}</span>
            </div>
          ))}
          {ecd > limit && <p className="mt-3 rounded-lg px-3 py-2 text-[11.5px] bg-[#F8717114] text-[#FCA5A5]">ECD çat həddini keçir: itki riski.</p>}
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>Axını artır: şlam hissəcikləri daha sürətli qalxır, amma ECD yüksəlir.</li>
            <li>Nozzle-ləri kiçilt: bit jet-ləri uzanır, bit-də təzyiq payı artır.</li>
            <li>Axını 800 gpm-ə qaldır: boru və halqada rejim dəyişirmi?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
