"use client";

import { useState } from "react";

type PartId = "topdrive" | "dp" | "hwdp" | "jar" | "dc" | "stab" | "nmdc" | "nbstab" | "bit";

interface Part {
  id: PartId;
  name: string;
  nameEn: string;
  color: string;
  role: string;
  facts: string[];
}

const PARTS: Record<PartId, Part> = {
  topdrive: {
    id: "topdrive",
    name: "Top drive",
    nameEn: "Top drive",
    color: "#FF6B2B",
    role: "String-i yuxarıdan fırladır və məhlulu string-in içinə ötürür (1-ci bölmə).",
    facts: ["Stand (≈ 90 ft) ilə qazmağa imkan verir", "Torque limiti string dizaynında nəzərə alınır"],
  },
  dp: {
    id: "dp",
    name: "Drill pipe",
    nameEn: "Drill pipe (DP)",
    color: "#00D4FF",
    role: "Fırlanmanı və məhlulu səthdən BHA-ya ötürür; string-in əsas uzunluğunu təşkil edir. Normal iş rejimində dartmada işləməlidir.",
    facts: [
      "Tipik ölçü: 5 in; bir boru (joint) təxminən 30 ft, bir stand = 3 boru ≈ 90 ft",
      "Dərəcələr: E-75, X-95, G-105, S-135 (rəqəm: minimum axma həddi, ksi)",
      "Uclarında daha qalın tool joint-lər (rezbalı birləşdirici) var",
      "Nominal çəki ilə yanaşı, tool joint daxil 'adjusted' çəki dizayn üçün işlədilir",
    ],
  },
  hwdp: {
    id: "hwdp",
    name: "HWDP",
    nameEn: "Heavy-Weight Drill Pipe",
    color: "#34D399",
    role: "DC ilə DP arasında keçid: DP-dən qalın divarlı, ortasında qalınlaşması (wear pad) var. Sərtliyin ani dəyişməsini azaldır, maili quyuda DC-dən az sürtünmə və yorğunluq verir.",
    facts: ["Tipik ölçü 5 in (çəki ≈ 49.3 lb/ft)", "Neutral point-i DC-də saxlamaq lazımdır; HWDP isə sıxılmaya qısa müddət dözür", "Maili quyularda WOB üçün də istifadə oluna bilər"],
  },
  jar: {
    id: "jar",
    name: "Jar",
    nameEn: "Drilling jar",
    color: "#FBBF24",
    role: "Yapışmış string-i azad etmək üçün zərbə yaradan hidravlik və ya mexaniki alət.",
    facts: ["Yerləşməsi BHA dizaynında diqqətlə seçilir: neutral point zonasında deyil", "Zərbə qüvvəsi alətin xüsusiyyətlərindən və dartma qüvvəsindən asılıdır"],
  },
  dc: {
    id: "dc",
    name: "Drill collar",
    nameEn: "Drill collar (DC)",
    color: "#F59E0B",
    role: "Qalın divarlı ağır polad boru: WOB yaratmaq, BHA-nı sərt saxlamaq və neutral point-i DC daxilində tutmaq üçün.",
    facts: [
      "OD təxminən 4¾ - 9½ in; bir collar ≈ 30 ft",
      "6.5 in OD / 2.813 in ID ≈ 91.8 lb/ft; 8 in OD / 2.8125 in ID ≈ 150 lb/ft",
      "Spiral yivli collar-lar differensial yapışma riskini azaldır",
      "Çəki: w = 2.6725 · (OD² − ID²) lb/ft",
    ],
  },
  stab: {
    id: "stab",
    name: "Stabilizator",
    nameEn: "String stabilizer",
    color: "#A78BFA",
    role: "Quyu divarına dayanaraq BHA-nı mərkəzləşdirir və trayektoriyanı (build/hold/drop) idarə edir; collar-ın divara yapışmasını azaldır.",
    facts: ["Ölçüsü quyu diametrinə yaxındır (full gauge)", "Yerləşmə məsafəsi BHA tipini (fulcrum, pendulum, packed) müəyyən edir", "Blades spiral və ya düz ola bilər"],
  },
  nmdc: {
    id: "nmdc",
    name: "Qeyri-maqnit collar + MWD",
    nameEn: "Non-magnetic DC + MWD",
    color: "#60A5FA",
    role: "Qeyri-maqnit collar MWD/survey maqnit sensorlarını polad collar-ın maqnit təsirindən qoruyur. MWD qazma zamanı inklinasiya və azimutu səthə ötürür.",
    facts: ["Directional qazmada trayektoriya nəzarəti üçün vacibdir (9-cu bölmə)", "MWD təzyiq impulsları ilə məlumat ötürür (məhlul axını tələb edir)"],
  },
  nbstab: {
    id: "nbstab",
    name: "Near-bit stabilizator",
    nameEn: "Near-bit stabilizer",
    color: "#C084FC",
    role: "Bit-ə ən yaxın stabilizator: BHA-nın build/hold/drop xarakterini müəyyən edən əsas elementlərdən biridir.",
    facts: ["Fulcrum və packed assembly-lərdə mövcuddur, pendulum-da yoxdur", "Bit-ə yaxınlığına görə bit-in yan qüvvəsinə güclü təsir edir"],
  },
  bit: {
    id: "bit",
    name: "Bit",
    nameEn: "Bit",
    color: "#FF6B2B",
    role: "Quyunun dibində süxuru dağıdır (7-ci bölmə: bit-lər və ROP).",
    facts: ["WOB və fırlanma bit-ə string vasitəsilə verilir", "Hidravlik enerji nozzle-lərdən çıxır (4-cü bölmə)"],
  },
};

const ORDER: PartId[] = ["topdrive", "dp", "hwdp", "jar", "dc", "stab", "nmdc", "nbstab", "bit"];

export default function DrillStringVisual() {
  const [active, setActive] = useState<PartId | null>("dp");
  const op = (id: PartId) => (active && active !== id ? 0.25 : 1);
  const pick = (id: PartId) => setActive((a) => (a === id ? null : id));
  const g = (id: PartId) => ({
    onClick: () => pick(id),
    onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && pick(id),
    role: "button" as const,
    tabIndex: 0,
    "aria-label": PARTS[id].name,
    style: { cursor: "pointer", opacity: op(id), transition: "opacity .2s" },
  });
  const sel = active ? PARTS[active] : null;
  const CX = 190;

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {ORDER.map((id) => (
            <button
              key={id}
              onClick={() => pick(id)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold font-['Space_Grotesk'] border transition-colors"
              style={{
                borderColor: active === id ? PARTS[id].color : "rgba(255,255,255,0.1)",
                background: active === id ? PARTS[id].color + "22" : "transparent",
                color: active === id ? PARTS[id].color : "#8DA2BF",
              }}
            >
              {PARTS[id].name}
            </button>
          ))}
        </div>
        <svg viewBox="0 0 380 690" className="w-full max-w-[420px] mx-auto h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="group" aria-label="Drill string və BHA komponentləri">
          <text x="190" y="18" fontSize="9" textAnchor="middle" fill="#6B82A0">↑ səth</text>

          <g {...g("topdrive")}>
            <rect x={CX - 36} y="26" width="72" height="30" rx="5" fill="#2A1608" stroke={PARTS.topdrive.color} strokeWidth="2" />
            <text x={CX} y="45" fontSize="11" textAnchor="middle" fill={PARTS.topdrive.color}>Top drive</text>
          </g>

          {/* DP */}
          <g {...g("dp")}>
            <rect x={CX - 12} y="56" width="24" height="206" fill="#08202A" stroke={PARTS.dp.color} strokeWidth="2" />
            {[84, 128, 172, 216].map((y) => (
              <rect key={y} x={CX - 15} y={y} width="30" height="9" rx="2" fill="#0E3340" stroke={PARTS.dp.color} strokeWidth="1.3" />
            ))}
            <path d={`M${CX - 12} 150 l6 -4 l12 8 l6 -4`} fill="none" stroke="#080C18" strokeWidth="6" />
            <text x={CX + 28} y="110" fontSize="11" fill={PARTS.dp.color}>Drill pipe</text>
            <text x={CX + 28} y="124" fontSize="9" fill="#6B82A0">min. ft (minlərlə)</text>
            <text x={CX + 28} y="214" fontSize="9" fill="#6B82A0">tool joint ↑</text>
          </g>

          {/* HWDP */}
          <g {...g("hwdp")}>
            <rect x={CX - 12} y="262" width="24" height="70" fill="#0A2A1E" stroke={PARTS.hwdp.color} strokeWidth="2" />
            <rect x={CX - 16} y="290" width="32" height="12" rx="2" fill="#12402E" stroke={PARTS.hwdp.color} strokeWidth="1.5" />
            <rect x={CX - 15} y="268" width="30" height="8" rx="2" fill="#12402E" stroke={PARTS.hwdp.color} strokeWidth="1.3" />
            <rect x={CX - 15} y="318" width="30" height="8" rx="2" fill="#12402E" stroke={PARTS.hwdp.color} strokeWidth="1.3" />
            <text x={CX + 28} y="300" fontSize="11" fill={PARTS.hwdp.color}>HWDP</text>
          </g>

          {/* JAR */}
          <g {...g("jar")}>
            <rect x={CX - 17} y="332" width="34" height="34" rx="3" fill="#2A2210" stroke={PARTS.jar.color} strokeWidth="2" />
            <line x1={CX - 17} y1="349" x2={CX + 17} y2="349" stroke={PARTS.jar.color} strokeWidth="1.2" />
            <text x={CX + 28} y="353" fontSize="11" fill={PARTS.jar.color}>Jar</text>
          </g>

          {/* DC */}
          <g {...g("dc")}>
            <rect x={CX - 22} y="366" width="44" height="96" fill="#2A1E08" stroke={PARTS.dc.color} strokeWidth="2.2" />
            {[400, 430].map((y) => (
              <line key={y} x1={CX - 22} y1={y} x2={CX + 22} y2={y} stroke={PARTS.dc.color} strokeWidth="1.2" opacity="0.7" />
            ))}
            <text x={CX + 32} y="418" fontSize="11" fill={PARTS.dc.color}>Drill collars</text>
            <text x={CX + 32} y="432" fontSize="9" fill="#6B82A0">WOB buradan</text>
          </g>

          {/* STAB */}
          <g {...g("stab")}>
            <rect x={CX - 22} y="462" width="44" height="30" fill="#1C1630" stroke={PARTS.stab.color} strokeWidth="1.8" />
            <rect x={CX - 34} y="466" width="12" height="22" rx="2" fill="#2C2250" stroke={PARTS.stab.color} strokeWidth="1.6" />
            <rect x={CX + 22} y="466" width="12" height="22" rx="2" fill="#2C2250" stroke={PARTS.stab.color} strokeWidth="1.6" />
            <text x={CX + 42} y="481" fontSize="11" fill={PARTS.stab.color}>Stabilizator</text>
          </g>

          {/* NMDC + MWD */}
          <g {...g("nmdc")}>
            <rect x={CX - 22} y="492" width="44" height="60" fill="#0F1E3A" stroke={PARTS.nmdc.color} strokeWidth="2" />
            <text x={CX} y="527" fontSize="9" textAnchor="middle" fill={PARTS.nmdc.color}>MWD</text>
            <text x={CX + 32} y="526" fontSize="11" fill={PARTS.nmdc.color}>NMDC + MWD</text>
          </g>

          {/* near-bit stab */}
          <g {...g("nbstab")}>
            <rect x={CX - 22} y="552" width="44" height="22" fill="#241638" stroke={PARTS.nbstab.color} strokeWidth="1.8" />
            <rect x={CX - 34} y="554" width="12" height="18" rx="2" fill="#352058" stroke={PARTS.nbstab.color} strokeWidth="1.6" />
            <rect x={CX + 22} y="554" width="12" height="18" rx="2" fill="#352058" stroke={PARTS.nbstab.color} strokeWidth="1.6" />
            <text x={CX + 42} y="568" fontSize="11" fill={PARTS.nbstab.color}>Near-bit stab.</text>
          </g>

          {/* BIT */}
          <g {...g("bit")}>
            <rect x={CX - 20} y="574" width="40" height="14" fill="#2A1608" stroke={PARTS.bit.color} strokeWidth="2" />
            <polygon points={`${CX - 24},588 ${CX + 24},588 ${CX},620`} fill={PARTS.bit.color} opacity="0.9" />
            <text x={CX + 34} y="608" fontSize="11" fill={PARTS.bit.color}>Bit</text>
          </g>

          {/* BHA mötərizəsi */}
          <path d="M96 332 L88 332 L88 622 L96 622" fill="none" stroke="#6B82A0" strokeWidth="1.5" />
          <text x="80" y="480" fontSize="10" fill="#8DA2BF" textAnchor="middle" transform="rotate(-90 80 480)">BHA (alt hissə)</text>
          <path d="M96 56 L88 56 L88 330" fill="none" stroke="#6B82A0" strokeWidth="1.5" opacity="0.4" />
          <text x="80" y="190" fontSize="10" fill="#8DA2BF" textAnchor="middle" transform="rotate(-90 80 190)" opacity="0.7">DP hissəsi</text>
          <text x="190" y="650" fontSize="10" textAnchor="middle" fill="#6B82A0">Miqyassız, sadələşdirilmiş</text>
          <text x="190" y="666" fontSize="10" textAnchor="middle" fill="#6B82A0">(BHA tərkibi quyuya görə dəyişir)</text>
        </svg>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-5 self-start font-['Space_Grotesk']">
        {!sel ? (
          <div className="text-[13px] text-[#8DA2BF] leading-relaxed">
            <p className="font-semibold text-[#F0F4FF] mb-2">Drill string yuxarıdan aşağı</p>
            <p>
              String-in yuxarı hissəsi ağır yükü <b>dartma</b>, aşağı hissəsi (collar-lar) <b>sıxılma</b> halında daşıyır. Komponentlərə klik edərək funksiyalarını və əsas rəqəmlərini gör.
            </p>
          </div>
        ) : (
          <>
            <p className="text-[10px] font-mono tracking-[0.14em] uppercase mb-1" style={{ color: sel.color }}>{sel.nameEn}</p>
            <h3 className="text-[18px] font-bold text-[#F0F4FF] mb-2">{sel.name}</h3>
            <p className="text-[13px] text-[#B7C5DD] leading-relaxed mb-4">{sel.role}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B82A0] mb-1.5">Əsas faktlar</p>
            <ul className="space-y-1.5">
              {sel.facts.map((x) => (
                <li key={x} className="text-[12px] text-[#9DB0CC] leading-relaxed flex gap-2"><span style={{ color: sel.color }}>•</span>{x}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
