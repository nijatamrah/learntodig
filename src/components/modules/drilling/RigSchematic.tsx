"use client";

import { useState } from "react";
import Link from "next/link";
import { SYSTEMS, type SysId } from "./rig-content";

const ORDER: SysId[] = ["power", "hoisting", "rotating", "circulating", "wellcontrol", "monitoring"];

// Məhlulun tam yolu (animasiya üçün)
const MUD_PATH =
  "M85 400 L85 345 L258 345 L258 224 L290 224 L290 518 L302 518 L302 440 L302 394 L205 418 L140 418 L85 418";

export default function RigSchematic() {
  const [active, setActive] = useState<SysId | null>(null);
  const [flow, setFlow] = useState(true);

  const op = (s: SysId) => (active && active !== s ? 0.18 : 1);
  const c = (s: SysId) => SYSTEMS[s].color;
  const pick = (s: SysId) => setActive((cur) => (cur === s ? null : s));
  const clickable = (s: SysId) => ({
    onClick: () => pick(s),
    onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && pick(s),
    role: "button" as const,
    tabIndex: 0,
    "aria-label": SYSTEMS[s].name,
    style: { cursor: "pointer", opacity: op(s), transition: "opacity .2s" },
  });

  const sys = active ? SYSTEMS[active] : null;

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-6">
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {ORDER.map((s) => (
            <button
              key={s}
              onClick={() => pick(s)}
              className="px-3 py-1.5 rounded-lg text-[12px] font-semibold font-['Space_Grotesk'] border transition-colors"
              style={{
                borderColor: active === s ? c(s) : "rgba(255,255,255,0.1)",
                background: active === s ? c(s) + "22" : "transparent",
                color: active === s ? c(s) : "#8DA2BF",
              }}
            >
              {SYSTEMS[s].name}
            </button>
          ))}
        </div>

        <svg viewBox="0 0 640 560" className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="group" aria-label="Qazma qurğusunun interaktiv sxemi">
          <style>{`@keyframes rigdash{to{stroke-dashoffset:-28}}`}</style>

          {/* torpaq və substructure */}
          <rect x="0" y="440" width="640" height="120" fill="#0A111F" />
          <line x1="0" y1="440" x2="640" y2="440" stroke="#2A3A55" strokeWidth="2" />
          <rect x="215" y="360" width="150" height="80" fill="none" stroke="#2A3A55" strokeWidth="1.5" />
          <line x1="215" y1="360" x2="500" y2="360" stroke="#3A4C6B" strokeWidth="2.5" />
          <text x="372" y="374" fontSize="9" fill="#4A6A8A">Rig floor</text>

          {/* DERRICK + HOISTING */}
          <g {...clickable("hoisting")}>
            <line x1="225" y1="360" x2="275" y2="70" stroke={c("hoisting")} strokeWidth="3" />
            <line x1="355" y1="360" x2="305" y2="70" stroke={c("hoisting")} strokeWidth="3" />
            {[110, 160, 210, 260, 310].map((y) => {
              const lx = 225 + ((360 - y) / 290) * 50;
              const rx = 355 - ((360 - y) / 290) * 50;
              return <line key={y} x1={lx} y1={y} x2={rx} y2={y} stroke={c("hoisting")} strokeWidth="1" opacity="0.5" />;
            })}
            <rect x="268" y="56" width="44" height="14" rx="2" fill="#2A2210" stroke={c("hoisting")} strokeWidth="2" />
            <text x="290" y="48" fontSize="10" textAnchor="middle" fill={c("hoisting")}>Crown block</text>
            <line x1="278" y1="70" x2="278" y2="182" stroke={c("hoisting")} strokeWidth="1.5" />
            <line x1="302" y1="70" x2="302" y2="182" stroke={c("hoisting")} strokeWidth="1.5" />
            <rect x="272" y="182" width="36" height="22" rx="2" fill="#2A2210" stroke={c("hoisting")} strokeWidth="2" />
            <text x="318" y="196" fontSize="9" fill={c("hoisting")}>Traveling block</text>
            {/* fast line -> drawworks */}
            <line x1="312" y1="63" x2="430" y2="314" stroke={c("hoisting")} strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="392" y="262" fontSize="9" fill={c("hoisting")}>fast line</text>
            {/* dead line -> anchor */}
            <line x1="268" y1="63" x2="196" y2="440" stroke={c("hoisting")} strokeWidth="1.2" strokeDasharray="2 3" opacity="0.7" />
            <text x="168" y="300" fontSize="9" fill={c("hoisting")}>dead line</text>
            {/* drawworks */}
            <rect x="400" y="312" width="70" height="48" rx="4" fill="#2A2210" stroke={c("hoisting")} strokeWidth="2" />
            <text x="435" y="340" fontSize="10" textAnchor="middle" fill={c("hoisting")}>Drawworks</text>
          </g>

          {/* ROTATING */}
          <g {...clickable("rotating")}>
            <rect x="264" y="208" width="52" height="34" rx="4" fill="#2A1608" stroke={c("rotating")} strokeWidth="2" />
            <text x="290" y="229" fontSize="10" textAnchor="middle" fill={c("rotating")}>Top drive</text>
            <line x1="290" y1="242" x2="290" y2="518" stroke={c("rotating")} strokeWidth="4" />
            <polygon points="282,518 298,518 290,534" fill={c("rotating")} />
            <text x="320" y="528" fontSize="10" fill={c("rotating")}>Bit</text>
            <text x="324" y="300" fontSize="9" fill={c("rotating")}>Drill string</text>
          </g>

          {/* WELL CONTROL: BOP + wellhead */}
          <g {...clickable("wellcontrol")}>
            <rect x="268" y="374" width="56" height="16" rx="8" fill="#2A1010" stroke={c("wellcontrol")} strokeWidth="2" />
            <rect x="270" y="394" width="52" height="10" fill="#2A1010" stroke={c("wellcontrol")} strokeWidth="1.5" />
            <rect x="270" y="407" width="52" height="10" fill="#2A1010" stroke={c("wellcontrol")} strokeWidth="1.5" />
            <rect x="270" y="420" width="52" height="10" fill="#2A1010" stroke={c("wellcontrol")} strokeWidth="1.5" />
            <text x="334" y="390" fontSize="9" fill={c("wellcontrol")}>Annular</text>
            <text x="334" y="414" fontSize="9" fill={c("wellcontrol")}>Rams</text>
            <line x1="322" y1="412" x2="372" y2="412" stroke={c("wellcontrol")} strokeWidth="1.3" strokeDasharray="3 2" />
            <text x="376" y="410" fontSize="8" fill={c("wellcontrol")}>choke/kill</text>
            {/* accumulator */}
            <rect x="500" y="372" width="60" height="30" rx="4" fill="#2A1010" stroke={c("wellcontrol")} strokeWidth="1.8" />
            <text x="530" y="391" fontSize="9" textAnchor="middle" fill={c("wellcontrol")}>Akkumulyator</text>
            <line x1="500" y1="387" x2="470" y2="387" stroke={c("wellcontrol")} strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
          </g>
          {/* casing + wellhead (neytral) */}
          <line x1="278" y1="430" x2="278" y2="500" stroke="#5B7092" strokeWidth="2" />
          <line x1="314" y1="430" x2="314" y2="500" stroke="#5B7092" strokeWidth="2" />
          <text x="334" y="470" fontSize="9" fill="#5B7092">casing</text>

          {/* CIRCULATING */}
          <g {...clickable("circulating")}>
            <rect x="30" y="400" width="110" height="40" rx="3" fill="#08202A" stroke={c("circulating")} strokeWidth="2" />
            <text x="85" y="424" fontSize="10" textAnchor="middle" fill={c("circulating")}>Məhlul çənləri</text>
            <rect x="48" y="340" width="74" height="40" rx="3" fill="#08202A" stroke={c("circulating")} strokeWidth="2" />
            <text x="85" y="364" fontSize="10" textAnchor="middle" fill={c("circulating")}>Nasoslar</text>
            <rect x="150" y="410" width="56" height="26" rx="3" fill="#08202A" stroke={c("circulating")} strokeWidth="2" />
            <text x="178" y="427" fontSize="9" textAnchor="middle" fill={c("circulating")}>Shaker</text>
            <text x="195" y="337" fontSize="9" fill={c("circulating")}>standpipe</text>
            <path d={MUD_PATH} fill="none" stroke={c("circulating")} strokeWidth="2.2" strokeLinejoin="round" opacity="0.9"
              strokeDasharray={flow ? "8 6" : undefined}
              style={flow ? { animation: "rigdash 1.1s linear infinite" } : undefined} />
          </g>

          {/* POWER */}
          <g {...clickable("power")}>
            <rect x="480" y="404" width="130" height="36" rx="4" fill="#0A2018" stroke={c("power")} strokeWidth="2" />
            <text x="545" y="426" fontSize="10" textAnchor="middle" fill={c("power")}>Generatorlar (dizel)</text>
            <line x1="500" y1="404" x2="450" y2="360" stroke={c("power")} strokeWidth="1.2" strokeDasharray="3 3" />
          </g>

          {/* MONITORING */}
          <g {...clickable("monitoring")}>
            <rect x="372" y="326" width="22" height="34" rx="3" fill="#1A1430" stroke={c("monitoring")} strokeWidth="1.8" />
            <text x="383" y="320" fontSize="9" textAnchor="middle" fill={c("monitoring")}>Driller</text>
          </g>
        </svg>

        <div className="flex items-center justify-between mt-3">
          <p className="text-[11px] text-[#6B82A0] font-['Space_Grotesk']">Sistemə klik et. Sxem sadələşdirilmişdir (miqyassız).</p>
          <button
            onClick={() => setFlow((f) => !f)}
            className="text-[11px] px-3 py-1 rounded-lg border border-[rgba(255,255,255,0.12)] text-[#8DA2BF] font-['Space_Grotesk']"
          >
            Məhlul axını: {flow ? "açıq" : "bağlı"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-5 self-start">
        {!sys ? (
          <div className="text-[13px] text-[#8DA2BF] leading-relaxed font-['Space_Grotesk']">
            <p className="font-semibold text-[#F0F4FF] mb-2">Qazma qurğusunun 6 sistemi</p>
            <p className="mb-3">
              Hər qazma qurğusu eyni məntiqlə qurulub: güc verən, qaldıran, fırladan, məhlulu dövr etdirən, quyunu nəzarətdə saxlayan və hamısını izləyən sistemlər.
              Sxemdə bir sistemə klik etdikdə digərləri solğunlaşır və funksiya, komponentlər və əsas rəqəmlər görünür.
            </p>
            <ul className="space-y-1.5">
              {ORDER.map((s) => (
                <li key={s} className="flex items-center gap-2 text-[12px]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: c(s) }} />
                  <button onClick={() => pick(s)} className="hover:underline text-left">{SYSTEMS[s].name} <span className="text-[#4A6A8A]">· {SYSTEMS[s].nameEn}</span></button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="font-['Space_Grotesk']">
            <p className="text-[10px] font-mono tracking-[0.14em] uppercase mb-1" style={{ color: sys.color }}>{sys.nameEn}</p>
            <h3 className="text-[18px] font-bold text-[#F0F4FF] mb-2">{sys.name}</h3>
            <p className="text-[13px] text-[#B7C5DD] leading-relaxed mb-4">{sys.role}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B82A0] mb-1.5">Komponentlər</p>
            <ul className="space-y-1 mb-4">
              {sys.components.map((x) => (
                <li key={x} className="text-[12px] text-[#9DB0CC] flex gap-2"><span style={{ color: sys.color }}>•</span>{x}</li>
              ))}
            </ul>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B82A0] mb-1.5">Mühəndis üçün vacib</p>
            <ul className="space-y-1.5 mb-4">
              {sys.keys.map((x) => (
                <li key={x} className="text-[12px] text-[#9DB0CC] leading-relaxed">{x}</li>
              ))}
            </ul>
            {sys.href && (
              <Link href={sys.href} className="inline-block text-[12px] font-semibold px-3.5 py-2 rounded-lg" style={{ background: sys.color + "22", color: sys.color }}>
                {sys.hrefLabel} →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
