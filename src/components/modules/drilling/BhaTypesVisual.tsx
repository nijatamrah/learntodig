"use client";

import { useState } from "react";
import Slider from "../Slider";

const ACCENT = "#FBBF24";

interface PanelDef {
  key: "fulcrum" | "pendulum" | "packed";
  title: string;
  tendency: string;
  color: string;
  setup: string;
  wob: string;
}

const PANELS: PanelDef[] = [
  {
    key: "fulcrum",
    title: "Fulcrum (build)",
    tendency: "Bucaq artırır (build)",
    color: "#34D399",
    setup: "Near-bit stabilizator + collar-ın sərbəst hissəsi + yuxarıda ikinci stabilizator. WOB ilə collar-lar aşağı tərəfə əyilir, near-bit stabilizator fulcrum (dayaq) rolunu oynayır və bit yuxarı tərəfə itələnir.",
    wob: "WOB artdıqca build meyli artır.",
  },
  {
    key: "pendulum",
    title: "Pendulum (drop)",
    tendency: "Bucağı azaldır (drop)",
    color: "#60A5FA",
    setup: "Near-bit stabilizator yoxdur; ilk stabilizator bit-dən yuxarıdadır. Stabilizatordan aşağıdakı collar-ın çəkisi bit-i quyunun aşağı tərəfinə çəkir (sarkaç effekti).",
    wob: "WOB artdıqca drop meyli azalır (collar əyilir, sarkaç effekti zəifləyir).",
  },
  {
    key: "packed",
    title: "Packed (hold)",
    tendency: "Bucağı saxlayır (hold)",
    color: "#FBBF24",
    setup: "Bit-ə yaxın üç və ya daha çox stabilizator, aralarında sərt collar-lar. Sərt BHA əyilməyə müqavimət göstərir və bit-i quyu oxunda saxlayır.",
    wob: "WOB-dan nisbətən az asılıdır.",
  },
];

function Panel({ p, px, wobFactor }: { p: PanelDef; px: number; wobFactor: number }) {
  const bitX = px + 206;
  const top = 60;
  const bot = 140;
  const mid = 100;
  const f = wobFactor;
  let path = "";
  let bitY = mid;
  let tilt = 0;
  const stabs: number[] = [];

  if (p.key === "fulcrum") {
    stabs.push(px + 70, px + 188);
    path = `M${px + 14},${mid} L${px + 70},${mid} Q${px + 129},${mid + 76 * f} ${px + 188},${mid} L${bitX - 2},${mid - 20 * f}`;
    bitY = mid - 20 * f;
    tilt = -18 * f;
  } else if (p.key === "pendulum") {
    const g = 1 - 0.55 * f;
    stabs.push(px + 90);
    path = `M${px + 14},${mid} L${px + 90},${mid} Q${px + 160},${mid + 80 * g} ${bitX - 2},${mid + 40 * g}`;
    bitY = mid + 40 * g;
    tilt = 16 * g;
  } else {
    stabs.push(px + 198, px + 140, px + 82);
    path = `M${px + 14},${mid} L${bitX - 2},${mid}`;
  }

  const arrow =
    p.key === "fulcrum" ? { x1: bitX + 22, y1: mid + 4, x2: bitX + 22, y2: mid - 26 } : p.key === "pendulum" ? { x1: bitX + 22, y1: mid - 4, x2: bitX + 22, y2: mid + 26 } : { x1: bitX + 8, y1: mid, x2: bitX + 28, y2: mid };

  return (
    <g>
      <text x={px + 110} y="22" fontSize="12" fontWeight="700" textAnchor="middle" fill={p.color}>{p.title}</text>
      {/* quyu divarları */}
      <line x1={px + 4} y1={top} x2={px + 232} y2={top} stroke="#5B7092" strokeWidth="2.5" />
      <line x1={px + 4} y1={bot} x2={px + 232} y2={bot} stroke="#5B7092" strokeWidth="2.5" />
      <text x={px + 8} y={top - 6} fontSize="9" fill="#6B82A0">yuxarı tərəf</text>
      <text x={px + 8} y={bot + 14} fontSize="9" fill="#6B82A0">aşağı tərəf</text>
      {/* collar */}
      <path d={path} fill="none" stroke="#F59E0B" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      {/* stabilizatorlar */}
      {stabs.map((sx) => (
        <rect key={sx} x={sx - 8} y={top + 2} width="16" height={bot - top - 4} rx="3" fill="#2C2250" stroke="#A78BFA" strokeWidth="1.8" opacity="0.95" />
      ))}
      {/* bit */}
      <g transform={`translate(${bitX} ${bitY}) rotate(${tilt})`}>
        <polygon points="0,-12 16,0 0,12" fill="#FF6B2B" />
      </g>
      {/* meyl oxu */}
      <line {...arrow} stroke={p.color} strokeWidth="3" />
      <polygon
        points={
          p.key === "fulcrum"
            ? `${arrow.x2 - 5},${arrow.y2 + 2} ${arrow.x2 + 5},${arrow.y2 + 2} ${arrow.x2},${arrow.y2 - 8}`
            : p.key === "pendulum"
            ? `${arrow.x2 - 5},${arrow.y2 - 2} ${arrow.x2 + 5},${arrow.y2 - 2} ${arrow.x2},${arrow.y2 + 8}`
            : `${arrow.x2 - 2},${arrow.y2 - 5} ${arrow.x2 - 2},${arrow.y2 + 5} ${arrow.x2 + 8},${arrow.y2}`
        }
        fill={p.color}
      />
      <text x={px + 110} y="176" fontSize="11" textAnchor="middle" fill={p.color}>{p.tendency}</text>
    </g>
  );
}

export default function BhaTypesVisual() {
  const [wob, setWob] = useState(60);
  const [sel, setSel] = useState<PanelDef["key"]>("fulcrum");
  const wobFactor = 0.25 + (wob / 100) * 0.75;
  const cur = PANELS.find((p) => p.key === sel)!;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
        <svg viewBox="0 0 760 200" className="w-full h-auto" role="img" aria-label="Fulcrum, pendulum və packed BHA tipləri">
          <Panel p={PANELS[0]} px={0} wobFactor={wobFactor} />
          <Panel p={PANELS[1]} px={254} wobFactor={wobFactor} />
          <Panel p={PANELS[2]} px={508} wobFactor={wobFactor} />
        </svg>
        <div className="mt-3 max-w-sm">
          <Slider label="WOB (nisbi)" unit="%" value={wob} min={0} max={100} step={5} accent={ACCENT} onChange={setWob} />
        </div>
        <p className="text-[11px] text-[#6B82A0] mt-3 leading-relaxed font-['Space_Grotesk']">
          Quyu oxu boyunca böyüdülmüş keyfiyyət illüstrasiyasıdır (miqyassız). Narıncı xətt collar-lar, bənövşəyi bloklar stabilizatorlar, oxlar bit-in meylini göstərir.
          Real BHA davranışı süxur anizotropiyası, quyu bucağı, WOB, fırlanma və stabilizator ölçüləri ilə dəyişir və xüsusi proqramlarla hesablanır.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {PANELS.map((p) => (
          <button
            key={p.key}
            onClick={() => setSel(p.key)}
            className="px-3 py-1.5 rounded-lg text-[12px] font-semibold font-['Space_Grotesk'] border transition-colors"
            style={{ borderColor: sel === p.key ? p.color : "rgba(255,255,255,0.1)", background: sel === p.key ? p.color + "22" : "transparent", color: sel === p.key ? p.color : "#8DA2BF" }}
          >
            {p.title}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-5 font-['Space_Grotesk'] max-w-3xl">
        <h3 className="text-[16px] font-bold mb-2" style={{ color: cur.color }}>{cur.title}: {cur.tendency}</h3>
        <p className="text-[13px] text-[#B7C5DD] leading-relaxed mb-2">{cur.setup}</p>
        <p className="text-[12px] text-[#9DB0CC]"><b className="text-[#F0F4FF]">WOB-un təsiri: </b>{cur.wob}</p>
        <p className="text-[11px] text-[#6B82A0] mt-3">Tipik məsafələr (məsələn near-bit stabilizatorun bit-dən 3-5 ft, ikinci stabilizatorun 30-60 ft yuxarıda olması) şirkət təcrübəsinə və konstruksiyaya görə dəyişir.</p>
      </div>
    </div>
  );
}
