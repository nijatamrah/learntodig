"use client";

import { useState } from "react";
import Slider from "../Slider";
import { capstanOut, criticalInclinationDeg } from "@/lib/drilling/torquedrag";

const ACCENT = "#FBBF24";

function Arrow({ x1, y1, x2, y2, color, label, lx, ly, anchor = "start" }: { x1: number; y1: number; x2: number; y2: number; color: string; label?: string; lx?: number; ly?: number; anchor?: "start" | "middle" | "end" }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 3) return null;
  const ux = dx / len;
  const uy = dy / len;
  const hx = 9;
  const hw = 4.5;
  const bx = x2 - ux * hx;
  const by = y2 - uy * hx;
  return (
    <g>
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth="2.6" />
      <polygon points={`${x2},${y2} ${bx - uy * hw},${by + ux * hw} ${bx + uy * hw},${by - ux * hw}`} fill={color} />
      {label && <text x={lx ?? x2 + 6} y={ly ?? y2 + 4} fontSize="11" fill={color} textAnchor={anchor} fontWeight="600">{label}</text>}
    </g>
  );
}

function InclineVisual() {
  const [inc, setInc] = useState(60);
  const [mu, setMu] = useState(0.3);
  const [motion, setMotion] = useState<"pickup" | "slackoff">("slackoff");

  const a = (inc * Math.PI) / 180;
  const w = 1; // vahid çəki
  const along = w * Math.cos(a);
  const normal = w * Math.sin(a);
  const fric = mu * normal;
  const need = motion === "pickup" ? along + fric : along - fric;
  const crit = criticalInclinationDeg(mu);
  const slides = along > fric;

  const S = 130; // piksel per vahid çəki
  const px = 210;
  const py = 150;

  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
      <h3 className="text-[14px] font-semibold text-[#F0F4FF] mb-1 font-['Space_Grotesk']">1 ft boru elementi, maili hissədə</h3>
      <p className="text-[11px] text-[#6B82A0] mb-3 font-['Space_Grotesk']">Quyu oxu boyunca görünüş: boru quyunun aşağı tərəfində uzanır. Oxlar vahid çəki (w) üçün miqyaslıdır.</p>
      <svg viewBox="0 0 440 300" className="w-full h-auto" role="img" aria-label="Maili quyuda boru elementinə təsir edən qüvvələr">
        {/* divar və boru */}
        <rect x="30" y={py + 16} width="380" height="34" fill="#1A2538" />
        <line x1="30" y1={py + 16} x2="410" y2={py + 16} stroke="#5B7092" strokeWidth="3" />
        <text x="36" y={py + 42} fontSize="10" fill="#6B82A0">quyunun aşağı divarı</text>
        <rect x={px - 60} y={py - 16} width="120" height="32" rx="6" fill="#08202A" stroke="#00D4FF" strokeWidth="2" />
        <text x={px} y={py + 4} fontSize="10" textAnchor="middle" fill="#00D4FF">boru</text>
        <text x="400" y="30" fontSize="10" textAnchor="end" fill="#8DA2BF">quyu dibinə →</text>
        <line x1="270" y1="22" x2="395" y2="22" stroke="#8DA2BF" strokeDasharray="3 3" />

        {/* çəki komponentləri */}
        <Arrow x1={px} y1={py} x2={px + along * S} y2={py} color="#60A5FA" label={`w·cosα = ${along.toFixed(2)}`} lx={px + along * S + 6} ly={py - 8} />
        <Arrow x1={px} y1={py} x2={px} y2={py + normal * S * 0.75} color="#A78BFA" label={`w·sinα = ${normal.toFixed(2)}`} lx={px + 8} ly={py + normal * S * 0.75 + 4} />
        <Arrow x1={px} y1={py} x2={px + along * S} y2={py + normal * S * 0.75} color="#F0F4FF" label="w" lx={px + along * S + 6} ly={py + normal * S * 0.75 + 14} />
        {/* reaksiya N (yuxarı) */}
        <Arrow x1={px - 34} y1={py + 16} x2={px - 34} y2={py + 16 - normal * S * 0.75} color="#34D399" label="N" lx={px - 46} ly={py + 16 - normal * S * 0.75 + 4} anchor="end" />
        {/* sürtünmə */}
        {motion === "pickup" ? (
          <Arrow x1={px - 80} y1={py - 28} x2={px - 80 + fric * S} y2={py - 28} color="#FB923C" label={`μN = ${fric.toFixed(2)}`} lx={px - 80} ly={py - 36} />
        ) : (
          <Arrow x1={px + 80} y1={py - 28} x2={px + 80 - fric * S} y2={py - 28} color="#FB923C" label={`μN = ${fric.toFixed(2)}`} lx={px + 80} ly={py - 36} anchor="end" />
        )}
        <text x="30" y="270" fontSize="10" fill="#8DA2BF">{motion === "pickup" ? "Pick-up: boru yuxarı çəkilir, sürtünmə aşağı (çəkiyə əlavə)" : "Slack-off: boru aşağı enir, sürtünmə yuxarı (çəkini azaldır)"}</text>
      </svg>

      <div className="grid sm:grid-cols-2 gap-3 mt-2">
        <div className="space-y-3">
          <Slider label="Bucaq (şaquli oxdan)" unit="°" value={inc} min={0} max={90} step={1} accent={ACCENT} onChange={setInc} />
          <Slider label="Sürtünmə əmsalı μ" unit="" value={mu} min={0.05} max={0.6} step={0.01} decimals={2} accent={ACCENT} onChange={setMu} />
          <div className="flex rounded-lg p-0.5 border border-[rgba(255,255,255,0.08)] bg-[#080C18]">
            {(["pickup", "slackoff"] as const).map((m) => (
              <button key={m} onClick={() => setMotion(m)} className="flex-1 py-1.5 rounded-md text-[12px] font-semibold font-['Space_Grotesk']" style={motion === m ? { background: ACCENT, color: "#080C18" } : { color: "#6B82A0" }}>
                {m === "pickup" ? "Pick-up" : "Slack-off"}
              </button>
            ))}
          </div>
        </div>
        <div className="font-['Space_Grotesk'] text-[12px]">
          {[
            ["Oxboyu çəki komponenti", `${along.toFixed(3)} w`],
            ["Normal qüvvə N", `${normal.toFixed(3)} w`],
            ["Sürtünmə μN", `${fric.toFixed(3)} w`],
            [motion === "pickup" ? "Çəkmək üçün lazım olan" : "Oxboyu net qüvvə", `${need.toFixed(3)} w`],
            ["Kritik bucaq atan(1/μ)", `${crit.toFixed(1)}°`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-t border-[rgba(255,255,255,0.05)] py-1.5">
              <span className="text-[#8DA2BF]">{k}</span>
              <span className="font-mono font-semibold text-[#F0F4FF]">{v}</span>
            </div>
          ))}
          <p className="mt-2 rounded-lg px-3 py-2 text-[11.5px] leading-snug" style={{ background: slides ? "#34D39918" : "#F8717118", color: slides ? "#A7F3D0" : "#FCA5A5" }}>
            {slides ? "Boru öz çəkisi ilə quyuya sürüşür (slack-off mümkündür)." : "Sürtünmə oxboyu çəkidən böyükdür: boru öz çəkisi ilə sürüşmür. İtələmə, rotasiya və ya sürtünmənin azaldılması lazımdır."}
          </p>
        </div>
      </div>
    </div>
  );
}

function CapstanVisual() {
  const [fIn, setFIn] = useState(50);
  const [theta, setTheta] = useState(30);
  const [mu, setMu] = useState(0.25);
  const [pickup, setPickup] = useState(true);

  const fOut = capstanOut(fIn * 1000, theta, mu, pickup) / 1000;
  const th = (theta * Math.PI) / 180;
  const nTot = (fIn * th); // klbf, təxmini normal
  const R = 150;
  const cx = 210;
  const cy = 250;
  const a1 = Math.PI / 2 + th / 2;
  const a2 = Math.PI / 2 - th / 2;
  const p1 = { x: cx + R * Math.cos(a1), y: cy - R * Math.sin(a1) };
  const p2 = { x: cx + R * Math.cos(a2), y: cy - R * Math.sin(a2) };
  const mid = { x: cx, y: cy - R };
  // tangent istiqamətləri (əyridən kənara)
  const tl = { x: -Math.sin(a1), y: -Math.cos(a1) }; // sol (aşağı) uc
  const tr = { x: Math.sin(a2), y: Math.cos(a2) }; // sağ (yuxarı) uc
  const scale = 1.1;
  const sIn = fIn * scale;
  const sOut = fOut * scale;
  // sol uc: giriş (aşağı) F_in; sağ uc: çıxış (yuxarı) F_out
  const leftLen = sIn;
  const rightLen = sOut;

  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
      <h3 className="text-[14px] font-semibold text-[#F0F4FF] mb-1 font-['Space_Grotesk']">Capstan effekti: dartma əyilmədə normal qüvvə yaradır</h3>
      <p className="text-[11px] text-[#6B82A0] mb-3 font-['Space_Grotesk']">Çəkisiz boru əyri (build) hissədən keçir. Dartma boru divarına N ≈ F·θ qüvvəsi ilə sıxır; sürtünmə bu qədər artırır və ya azaldır.</p>
      <svg viewBox="0 0 440 290" className="w-full h-auto" role="img" aria-label="Capstan effekti">
        <path d={`M ${p1.x} ${p1.y} A ${R} ${R} 0 0 1 ${p2.x} ${p2.y}`} fill="none" stroke="#00D4FF" strokeWidth="10" strokeLinecap="round" />
        <path d={`M ${cx - R - 14} ${cy - 20} A ${R + 14} ${R + 14} 0 0 1 ${cx + R + 14} ${cy - 20}`} fill="none" stroke="#2A3A55" strokeWidth="3" opacity="0.5" />
        {/* tension oxları */}
        <Arrow x1={p1.x} y1={p1.y} x2={p1.x + tl.x * leftLen} y2={p1.y + tl.y * leftLen} color="#FB923C" label={`F aşağı ${Math.round(leftLen / scale)} klbf`} lx={p1.x + tl.x * leftLen - 4} ly={p1.y + tl.y * leftLen + 16} anchor="end" />
        <Arrow x1={p2.x} y1={p2.y} x2={p2.x + tr.x * rightLen} y2={p2.y + tr.y * rightLen} color="#F0F4FF" label={`F yuxarı ${Math.round(rightLen / scale)} klbf`} lx={p2.x + tr.x * rightLen + 4} ly={p2.y + tr.y * rightLen + 16} anchor="start" />
        {/* normal qüvvə: mərkəzə doğru */}
        <Arrow x1={mid.x} y1={mid.y} x2={mid.x} y2={mid.y + Math.min(90, nTot * 2.2)} color="#34D399" label={`N ≈ F·θ = ${nTot.toFixed(1)} klbf`} lx={mid.x + 8} ly={mid.y + Math.min(90, nTot * 2.2) / 2} />
        <circle cx={cx} cy={cy} r="3" fill="#6B82A0" />
        <text x={cx + 8} y={cy + 4} fontSize="10" fill="#6B82A0">əyrilik mərkəzi</text>
      </svg>
      <p className="text-[11px] text-[#6B82A0] mt-1 font-['Space_Grotesk']">Oxlar tangent istiqamətindədir (miqyaslı deyil, yalnız nisbi). Real hesablamada çəki və bucaq da nəzərə alınır.</p>
      <div className="grid sm:grid-cols-2 gap-3 mt-2">
        <div className="space-y-3">
          <Slider label="Giriş dartması F" unit="klbf" value={fIn} min={10} max={200} step={5} accent={ACCENT} onChange={setFIn} />
          <Slider label="Əyilmə bucağı θ" unit="°" value={theta} min={5} max={90} step={5} accent={ACCENT} onChange={setTheta} />
          <Slider label="Sürtünmə əmsalı μ" unit="" value={mu} min={0.05} max={0.6} step={0.01} decimals={2} accent={ACCENT} onChange={setMu} />
          <div className="flex rounded-lg p-0.5 border border-[rgba(255,255,255,0.08)] bg-[#080C18]">
            {[true, false].map((m) => (
              <button key={String(m)} onClick={() => setPickup(m)} className="flex-1 py-1.5 rounded-md text-[12px] font-semibold font-['Space_Grotesk']" style={pickup === m ? { background: ACCENT, color: "#080C18" } : { color: "#6B82A0" }}>
                {m ? "Pick-up" : "Slack-off"}
              </button>
            ))}
          </div>
        </div>
        <div className="font-['Space_Grotesk'] text-[12px]">
          {[
            ["F_çıxış = F · e^(±μθ)", `${fOut.toFixed(1)} klbf`],
            ["Sürtünmədən artım/azalma", `${(fOut - fIn >= 0 ? "+" : "") + (fOut - fIn).toFixed(1)} klbf`],
            ["Pick-up üçün", `${Math.round(capstanOut(fIn * 1000, theta, mu, true) / 1000)} klbf`],
            ["Slack-off üçün", `${Math.round(capstanOut(fIn * 1000, theta, mu, false) / 1000)} klbf`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-t border-[rgba(255,255,255,0.05)] py-1.5">
              <span className="text-[#8DA2BF]">{k}</span>
              <span className="font-mono font-semibold text-[#F0F4FF]">{v}</span>
            </div>
          ))}
          <p className="mt-2 text-[11.5px] text-[#9DB0CC] leading-relaxed">
            Yüksək dartma və böyük əyilmə (build zonası) sürtünməni kəskin artırır. Buna görə T&D qrafikində build zonasında hook load-da sıçrayış olur.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ForcesVisual() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <InclineVisual />
      <CapstanVisual />
    </div>
  );
}
