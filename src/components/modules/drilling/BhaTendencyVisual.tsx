"use client";

import { useState } from "react";
import Slider from "../Slider";

const ACCENT = "#FBBF24";

type Kind = "fulcrum" | "pendulum" | "packed";

const KINDS: { id: Kind; name: string; tag: string; desc: string; stabs: number[] }[] = [
  {
    id: "fulcrum",
    name: "Fulcrum",
    tag: "Build",
    desc: "Near-bit stabilizator bit-dən 1-3 ft məsafədədir, ondan yuxarıda uzun stabilizatorsuz collar hissəsi var. WOB artdıqca collar əyilir, stabilizator dayaq nöqtəsi (fulcrum) olur və bit yuxarı yönəlir.",
    stabs: [0.04, 0.5],
  },
  {
    id: "pendulum",
    name: "Pendulum",
    tag: "Drop",
    desc: "İlk stabilizator bit-dən 30-60 ft yuxarıdadır. Stabilizatordan aşağı collar hissəsinin çəkisi onu quyunun aşağı divarına çəkir və bit-i şaquliyə doğru endirir. WOB artdıqca effekt zəifləyir.",
    stabs: [0.45, 0.78],
  },
  {
    id: "packed",
    name: "Packed",
    tag: "Hold",
    desc: "Bit-ə yaxın bir neçə stabilizator BHA-nı sərt edir. Əyilmə və yan qüvvə azalır, inklinasiya və azimut demək olar ki, dəyişmir.",
    stabs: [0.04, 0.22, 0.45],
  },
];

export default function BhaTendencyVisual() {
  const [kind, setKind] = useState<Kind>("fulcrum");
  const [wob, setWob] = useState(25);
  const [inc, setInc] = useState(30);
  const [rpm, setRpm] = useState(120);

  const k = KINDS.find((x) => x.id === kind)!;
  const sinI = Math.sin((inc * Math.PI) / 180);

  // keyfiyyət indeksi: -1 (drop) ... +1 (build). Əmsallar nisbi, real ölçmə deyil.
  const wobN = wob / 50;
  let tendency = 0;
  if (kind === "fulcrum") tendency = Math.min(1, 0.25 + 0.75 * wobN * (0.6 + 0.4 * sinI));
  else if (kind === "pendulum") tendency = -Math.min(1, (0.9 - 0.55 * wobN) * (0.25 + 0.75 * sinI));
  else tendency = (0.1 * wobN - 0.05) * (0.5 + sinI);
  // RPM yan təsiri: yüksək dövr bit walk və hamarlaşma, sadə göstərici
  const smooth = Math.min(1, rpm / 150);

  // BHA çizgisi (yerli koordinatlar: bit sağda x=0, BHA solda)
  const L = 300; // BHA uzunluğu piksel
  const bend = (kind === "fulcrum" ? -1 : kind === "pendulum" ? 0.35 : -0.08) * (0.3 + wobN) * 26;
  const pts = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40; // 0 bit, 1 yuxarı
    const x = -t * L;
    // əyilmə dayaq nöqtələri arasında sinus şəklində
    const s0 = k.stabs[0];
    const s1 = k.stabs[1] ?? 1;
    let y = 0;
    if (t > s0 && t < s1) y = bend * Math.sin(((t - s0) / (s1 - s0)) * Math.PI);
    return [x, y] as const;
  });
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const rot = 90 - inc;
  // BHA-nın ortası həmişə mərkəzdə qalsın: bit mövqeyi inklinasiyaya görə hesablanır
  const rr = (rot * Math.PI) / 180;
  const bitX = 300 + (L / 2) * Math.cos(rr);
  const bitY = 215 + (L / 2) * Math.sin(rr);

  const needleX = 150 + tendency * 130;
  const tendLabel = tendency > 0.25 ? "BUILD" : tendency < -0.25 ? "DROP" : "HOLD";
  const tendColor = tendency > 0.25 ? "#34D399" : tendency < -0.25 ? "#F87171" : "#FBBF24";

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.5fr)_340px] gap-6">
      <div className="space-y-4">
        <svg viewBox="0 0 620 400" className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="img" aria-label="Rotary BHA tipləri və tendensiya">
          <text x="18" y="22" fontSize="11" fill="#8DA2BF">Yan görünüş, quyunun inklinasiyası {inc}° (şaquli 0°, horizontal 90°)</text>
          {/* qravitasiya */}
          <g>
            <line x1="570" y1="60" x2="570" y2="130" stroke="#8DA2BF" strokeWidth="2" />
            <polygon points="563,125 577,125 570,140" fill="#8DA2BF" />
            <text x="570" y="155" fontSize="10" textAnchor="middle" fill="#8DA2BF">qravitasiya</text>
          </g>
          <g transform={`translate(${bitX.toFixed(1)} ${bitY.toFixed(1)}) rotate(${rot})`}>
            {/* quyu */}
            <rect x={-L - 30} y="-34" width={L + 50} height="68" fill="#7C5E3C" opacity="0.28" />
            <line x1={-L - 30} x2="20" y1="-34" y2="-34" stroke="#5B7092" strokeWidth="2" />
            <line x1={-L - 30} x2="20" y1="34" y2="34" stroke="#5B7092" strokeWidth="2" />
            {/* high side / low side */}
            <text x={-L - 24} y="-40" fontSize="9" fill="#6B82A0">high side</text>
            <text x={-L - 24} y="48" fontSize="9" fill="#6B82A0">low side</text>
            {/* BHA */}
            <path d={path} fill="none" stroke="#34D399" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
            {/* bit */}
            <polygon points="16,-14 16,14 -2,0" fill="#F0F4FF" transform={`translate(0 ${pts[0][1]})`} />
            {/* stabilizatorlar */}
            {k.stabs.map((t, i) => {
              const idx = Math.round(t * 40);
              const [x, y] = pts[Math.min(40, idx)];
              return <rect key={i} x={x - 9} y={y - 32} width="18" height="64" rx="3" fill={ACCENT} opacity="0.9" />;
            })}
            {/* bit-də yan qüvvə oxu */}
            {tendency !== 0 && (
              <g transform={`translate(8 ${pts[0][1]})`}>
                <line x1="0" y1="0" x2="0" y2={-tendency * 44} stroke={tendColor} strokeWidth="4" />
                <polygon points={`-7,${-tendency * 44} 7,${-tendency * 44} 0,${-tendency * 44 - Math.sign(tendency) * 10}`} fill={tendColor} />
              </g>
            )}
          </g>
          <text x="18" y="394" fontSize="10" fill="#6B82A0">Sxematikdir: miqyas və əyilmə şişirdilib. Sarı bloklar stabilizatordur.</text>
        </svg>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-3" style={{ color: ACCENT }}>Tendensiya göstəricisi (keyfiyyət)</p>
          <svg viewBox="0 0 300 54" className="w-full max-w-[460px]">
            <rect x="10" y="22" width="280" height="10" rx="5" fill="#101A2E" />
            <rect x="10" y="22" width="93" height="10" rx="5" fill="#F8717155" />
            <rect x="197" y="22" width="93" height="10" rx="5" fill="#34D39955" />
            <text x="10" y="14" fontSize="10" fill="#FCA5A5">DROP</text>
            <text x="150" y="14" fontSize="10" textAnchor="middle" fill="#FCD34D">HOLD</text>
            <text x="290" y="14" fontSize="10" textAnchor="end" fill="#A7F3D0">BUILD</text>
            <circle cx={needleX} cy="27" r="9" fill={tendColor} stroke="#080C18" strokeWidth="2" />
          </svg>
          <p className="text-[14px] font-semibold mt-1" style={{ color: tendColor }}>{k.name}: {tendLabel}</p>
          <p className="text-[12px] text-[#9DB0CC] leading-relaxed mt-1">{k.desc}</p>
          <p className="text-[11px] text-[#6B82A0] mt-2 leading-relaxed">
            Göstərici nisbidir: real tendensiya formasiyaya (anizotropiya, dip), bit-ə və BHA hesabına bağlıdır və yalnız offset quyuların nəticələri ilə dəqiqləşdirilir. Əmsallar sayca ölçü deyil, müqayisə üçündür.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>BHA tipi</p>
          <div className="flex gap-2 flex-wrap mb-3">
            {KINDS.map((x) => (
              <button
                key={x.id}
                onClick={() => setKind(x.id)}
                className="px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-colors font-['Space_Grotesk']"
                style={{ borderColor: kind === x.id ? ACCENT : "rgba(255,255,255,0.1)", background: kind === x.id ? "#FBBF2418" : "transparent", color: kind === x.id ? ACCENT : "#8DA2BF" }}
              >
                {x.name} <span className="opacity-70">· {x.tag}</span>
              </button>
            ))}
          </div>
          <div className="space-y-3">
            <Slider label="WOB" unit="klbf" value={wob} min={0} max={50} step={1} accent={ACCENT} onChange={setWob} />
            <Slider label="Quyunun inklinasiyası" unit="°" value={inc} min={5} max={85} step={1} accent="#38BDF8" onChange={setInc} />
            <Slider label="Rotor sürəti" unit="RPM" value={rpm} min={40} max={200} step={5} accent="#34D399" onChange={setRpm} />
          </div>
          <p className="text-[11px] text-[#6B82A0] mt-3 leading-relaxed font-['Space_Grotesk']">
            Rotor sürəti yalnız hamarlıq göstəricisinə təsir edir: yüksək RPM ({Math.round(smooth * 100)}%) quyunu hamarlayır, lakin bit walk (azimut sürüşməsi) riskini artıra bilər.
          </p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>Fulcrum seç və WOB-u artır: göstərici hansı istiqamətə hərəkət edir?</li>
            <li>Pendulum seç və WOB-u 50 klbf-ə qaldır: drop tendensiyası nə üçün zəifləyir?</li>
            <li>Pendulumda inklinasiyanı 10°-dən 70°-yə qaldır: nə üçün drop effekti güclənir?</li>
            <li>Packed BHA: WOB dəyişəndə göstərici nə üçün demək olar ki, yerində qalır?</li>
          </ul>
          <p className="mt-2 text-[11px] text-[#6B82A0]">Bu vizual BHA seçimində intuisiya üçündür. Real dizayn üçün BHA analiz proqramı (məs. Landmark, Halliburton) və offset məlumatı lazımdır.</p>
        </div>
      </div>
    </div>
  );
}
