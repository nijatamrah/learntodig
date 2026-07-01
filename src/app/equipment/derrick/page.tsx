"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  Layers,
  Info,
  X,
} from "lucide-react";

/* ─────────────────────────────────────────────
   COMPONENT DATA
───────────────────────────────────────────── */
type Component = {
  id: string;
  num: number;
  name: string;
  az: string;
  category: "lifting" | "rotation" | "safety" | "drilling" | "structure";
  purpose: string;
  facts: string[];
  params?: { label: string; value: string }[];
};

const COMPONENTS: Component[] = [
  {
    id: "crown",
    num: 1,
    name: "Crown Block",
    az: "Tac Bloku",
    category: "lifting",
    purpose:
      "Qülləsinin zirvəsindəki sabit kasnak sistemi. Məftil gərginliyini bölüşdürərək yükü qülləyə bərabər ötürür. Travelling block ilə birlikdə mancana (block-and-tackle) sistemi yaradır.",
    facts: [
      "Qüllənin ən yuxarı nöqtəsindədir — hündürlüyü 40–60 m ola bilər",
      "5–12 kasnak (sheave) ehtiva edə bilər",
      "Məftil (wire rope) bu kasnaklardan keçərək yükü qaldırır",
      "Hook load-u: 500–2000 ton arası daşıma qabiliyyəti",
    ],
    params: [
      { label: "Tipik hündürlük", value: "40 – 60 m" },
      { label: "Kasnak sayı", value: "5 – 12" },
      { label: "Daşıma qabiliyyəti", value: "500 – 2000 ton" },
    ],
  },
  {
    id: "tblock",
    num: 2,
    name: "Travelling Block & Hook",
    az: "Hərəkətli Blok və Kanca",
    category: "lifting",
    purpose:
      "Crown block ilə məftil vasitəsilə bağlı olan hərəkətli kasnak sistemi. Drill string-i qaldırıb endirmək üçün istifadə olunur. Hook (kanca) birbaşa swivel və ya top drive-a bağlanır.",
    facts: [
      "Crown blockun sabit kasnaklarına alternativ olaraq məftil keçir",
      "Yuxarı-aşağı hərəkət edərək yükü qaldırır",
      "Hook load göstəricisi driller kabinindən izlənilir",
      "Compensator ilə əlavə edildikdə dalğa hərəkətini kompensasiya edə bilir (offshore)",
    ],
    params: [
      { label: "Tipik çəki", value: "5 – 30 ton" },
      { label: "Sürət", value: "0 – 3 m/s" },
    ],
  },
  {
    id: "topdrive",
    num: 3,
    name: "Top Drive",
    az: "Yuxarı Fırladan",
    category: "rotation",
    purpose:
      "Müasir qazma qurğularında Kelly və rotary table-ın yerini alan sistem. Drill string-ə birbaşa yuxarıdan fırlanma hərəkəti verir. Elektrik və ya hidravlik mühərriklə işləyir.",
    facts: [
      "Kelly/rotary table sistemindən daha sürətli trip (boru çıxarma) edir",
      "90-cı illərdən etibarən standart avadanlığa çevrilib",
      "Driller kabinindən tam uzaqdan idarə olunur",
      "RPM: 0 – 300, Torque: 10,000 – 100,000 ft-lb",
      "MWD/LWD siqnallarını qəbul edib mud pulse vasitəsilə ötürür",
    ],
    params: [
      { label: "Fırlanma", value: "0 – 300 RPM" },
      { label: "Torque", value: "10k – 100k ft·lb" },
      { label: "Güc mənbəyi", value: "Elektrik / Hidravlik" },
    ],
  },
  {
    id: "drillpipe",
    num: 4,
    name: "Drill String / Drill Pipe",
    az: "Qazma Sütunu",
    category: "drilling",
    purpose:
      "Səthdən quyu dibinə qədər uzanan boru sistemı. Üç əsas vəzifəsi var: fırlanma momentini (torque) bit-ə ötürmək, qazma məhlulunu aşağı göndərmək, WOB (weight on bit) tənzimləmək.",
    facts: [
      "Hər boru 9.14 m (30 ft) uzunluğundadır — API standartı",
      "Üç boru bir 'stand' (27 m) — kökdə saxlanılır",
      "İçindəki məhlul bit-dən süxuru səthinə qaldırır",
      "Tool joint: boru uclarındakı qalın hissə, sökülüb-quraşdırılır",
      "Əyilmə: dogleg severity ilə ölçülür (°/100 ft)",
    ],
    params: [
      { label: "Boru uzunluğu", value: "9.14 m (30 ft)" },
      { label: "Diametr", value: "3½″ – 6⅝″" },
      { label: "Material", value: "API Grade E/X/G/S polad" },
    ],
  },
  {
    id: "bop",
    num: 5,
    name: "BOP — Blowout Preventer",
    az: "Püskürmə Önləyicisi",
    category: "safety",
    purpose:
      "Quyu ağzında yerləşən kritik təhlükəsizlik avadanlığı. Formasiyadan gözlənilmədən yüksək təzyiqlə qaz və ya maye çıxdıqda (kick) quyunu avtomatik bağlayır.",
    facts: [
      "Ram BOP: drill pipe ətrafını və ya tam quyu ağzını bağlayır",
      "Annular BOP: istənilən ölçülü boruya uyğunlaşan rezin element",
      "API 16A standartına görə hər 14–21 gündə sınaqdan keçirilir",
      "Deepwater Horizon hadisəsindən sonra qaydalar kəskin gücləndirildi",
      "15,000–20,000 psi iş təzyiqinə davam gətirə bilir",
    ],
    params: [
      { label: "Tipik iş təzyiqi", value: "5,000 – 20,000 psi" },
      { label: "Növlər", value: "Ram, Annular, Shear" },
      { label: "Sınaq intervalı", value: "14 – 21 gün" },
    ],
  },
  {
    id: "bha",
    num: 6,
    name: "BHA — Bottom Hole Assembly",
    az: "Quyu Dibi Qurğusu",
    category: "drilling",
    purpose:
      "Drill string-in ən aşağı hissəsi — bit-dən yuxarıya doğru bir neçə ixtisaslaşmış alət ardıcıllığı. Qazma istiqamətini, sürətini və ölçüm funksiyalarını idarə edir.",
    facts: [
      "Drill Collar: ağır polad boru, bit üzərindəki yükü (WOB) yaradır",
      "Stabilizer: quyunun düz qalmasını təmin edir",
      "MWD (Measurement While Drilling): dərinlik, inclination, azimuth",
      "LWD (Logging While Drilling): porosity, resistivity — qazma zamanı",
      "Mud Motor: hidravlik gücü fırlanmaya çevirir — top drive-sız",
    ],
    params: [
      { label: "Tipik uzunluq", value: "50 – 300 m" },
      { label: "Drill collar çəkisi", value: "120 – 250 lb/ft" },
      { label: "MWD siqnal növü", value: "Mud pulse / EM" },
    ],
  },
  {
    id: "substructure",
    num: 7,
    name: "Substructure & Rig Floor",
    az: "Alt Quruluş və Qazma Meydançası",
    category: "structure",
    purpose:
      "Bütün qazma avadanlığının dayandığı əsas platforma. BOP-a çıxışı təmin edir, derrickman-ın işlədiyi rotary table, driller kabini, pipe rack hamısı burada yerləşir.",
    facts: [
      "Hündürlüyü BOP ölçüsündən asılıdır: adətən 4 – 12 m",
      "V-door: boruların aşağıdan yuxarıya verildiyi açıq tərəf",
      "Mouse hole / Rat hole: boruların müvəqqəti saxlanma delikləri",
      "Driller kabini: bütün parametrlərin (WOB, RPM, torque, flow) izləndiyi yer",
    ],
    params: [
      { label: "Tipik hündürlük", value: "4 – 12 m" },
      { label: "Yük qabiliyyəti", value: "500 – 2000 ton" },
    ],
  },
  {
    id: "bit",
    num: 8,
    name: "Drill Bit",
    az: "Qazma Kəsəri",
    category: "drilling",
    purpose:
      "BHA-nın ən aşağı ucunda yerləşir, birbaşa süxuru kəsir. PDC, tricone, və ya elmas kəsər növləri var — formasiyaya görə seçilir. Bütün qazma prosesinin ən kritik nöqtəsi.",
    facts: [
      "PDC (Polycrystalline Diamond Compact): yumşaq-orta formasyonlar, yüksək ROP",
      "Tricone (roller cone): sərt formasyonlar, üç fırlanan konus",
      "WOB (Weight on Bit) və RPM kəsmə effektivliyini birlikdə müəyyən edir",
      "Nozzle: məhlul bit-dən yüksək sürətlə çıxır, kəsilmiş hissəcikləri qaldırır",
      "Bir bit 50 – 5000 m kəsə bilər (tip və formasyona görə)",
    ],
    params: [
      { label: "Tipik ölçü", value: "3⅞″ – 26\"" },
      { label: "Növlər", value: "PDC, Tricone, Diamond" },
      { label: "Ömür", value: "50 – 5000 m" },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  lifting: "#FF6B2B",
  rotation: "#00D4FF",
  safety: "#F43F5E",
  drilling: "#4ADE80",
  structure: "#A78BFA",
};

const CATEGORY_LABELS: Record<string, string> = {
  lifting: "Qaldırma",
  rotation: "Fırlanma",
  safety: "Təhlükəsizlik",
  drilling: "Qazma",
  structure: "Quruluş",
};

/* ─────────────────────────────────────────────
   SVG HOTSPOT POSITIONS
───────────────────────────────────────────── */
const HOTSPOTS: { id: string; cx: number; cy: number }[] = [
  { id: "crown",       cx: 160, cy: 52  },
  { id: "tblock",      cx: 216, cy: 145 },
  { id: "topdrive",    cx: 212, cy: 196 },
  { id: "drillpipe",   cx: 220, cy: 238 },
  { id: "bop",         cx: 228, cy: 290 },
  { id: "bha",         cx: 96,  cy: 338 },
  { id: "substructure", cx: 90,  cy: 402 },
  { id: "bit",         cx: 184, cy: 482 },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function DerrickPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [mobilePanel, setMobilePanel] = useState(false);

  const active = COMPONENTS.find((c) => c.id === selected);

  function select(id: string) {
    setSelected(id);
    setMobilePanel(true);
  }

  return (
    <main className="min-h-screen bg-[#0A0F1E] pt-16 text-[#F0F4FF]">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-white/[0.06] px-6 py-3 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-[12px] text-white/[0.4]">
          <Link href="/equipment" className="flex items-center gap-1 hover:text-white/[0.7] transition-colors">
            <ArrowLeft size={13} />
            Tools &amp; Equipment
          </Link>
          <ChevronRight size={12} />
          <span className="text-white/[0.7]">Drilling Derrick</span>
        </div>
      </div>

      {/* ── Header ── */}
      <div className="border-b border-white/[0.06] px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={14} className="text-[#FF6B2B]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FF6B2B]">
              Drilling Rig
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold md:text-4xl">
            Qazma Qüllesi — <span className="text-white/[0.45]">Drilling Derrick</span>
          </h1>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-white/[0.5]">
            Hər komponent üzərinə klikləyərək texniki məlumatları, parametrləri
            və maraqlı faktları öyrən.
          </p>

          {/* Category legend */}
          <div className="mt-5 flex flex-wrap gap-2">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <span
                key={key}
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{
                  background: `${CATEGORY_COLORS[key]}14`,
                  color: CATEGORY_COLORS[key],
                  border: `0.5px solid ${CATEGORY_COLORS[key]}35`,
                }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: CATEGORY_COLORS[key] }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main: SVG + Info Panel ── */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10 lg:items-start">

          {/* ── LEFT: SVG ── */}
          <div className="flex justify-center lg:justify-start lg:flex-shrink-0">
            <div className="relative">
              <svg
                viewBox="0 0 320 520"
                width={300}
                height={490}
                xmlns="http://www.w3.org/2000/svg"
                className="block"
              >
                {/* Derrick legs */}
                <line x1="140" y1="38" x2="110" y2="200" stroke="#334155" strokeWidth="2.5"/>
                <line x1="180" y1="38" x2="210" y2="200" stroke="#334155" strokeWidth="2.5"/>
                <line x1="110" y1="200" x2="80"  y2="340" stroke="#334155" strokeWidth="3"/>
                <line x1="210" y1="200" x2="240" y2="340" stroke="#334155" strokeWidth="3"/>
                <line x1="80"  y1="340" x2="50"  y2="430" stroke="#334155" strokeWidth="3.5"/>
                <line x1="240" y1="340" x2="270" y2="430" stroke="#334155" strokeWidth="3.5"/>

                {/* Cross braces */}
                <line x1="120" y1="120" x2="200" y2="120" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="4,3"/>
                <line x1="108" y1="170" x2="212" y2="170" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="4,3"/>
                <line x1="94"  y1="255" x2="226" y2="255" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="4,3"/>
                <line x1="82"  y1="310" x2="238" y2="310" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="4,3"/>

                {/* Crown block */}
                <rect x="130" y="55" width="60" height="34" rx="4"
                  fill={selected === "crown" ? "#FF6B2B30" : "#1E293B"}
                  stroke={selected === "crown" ? "#FF6B2B" : "#334155"}
                  strokeWidth="1.2"
                  className="transition-all duration-200 cursor-pointer"
                  onClick={() => select("crown")}
                />
                <text x="160" y="76" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="sans-serif">Crown Block</text>

                {/* Travelling block */}
                <rect x="138" y="128" width="44" height="26" rx="3"
                  fill={selected === "tblock" ? "#FF6B2B30" : "#1E293B"}
                  stroke={selected === "tblock" ? "#FF6B2B" : "#334155"}
                  strokeWidth="1.2"
                  className="transition-all duration-200 cursor-pointer"
                  onClick={() => select("tblock")}
                />
                <text x="160" y="145" textAnchor="middle" fontSize="7.5" fill="#94A3B8" fontFamily="sans-serif">Travelling Block</text>

                {/* Top drive */}
                <rect x="128" y="179" width="64" height="22" rx="3"
                  fill={selected === "topdrive" ? "#00D4FF20" : "#1E293B"}
                  stroke={selected === "topdrive" ? "#00D4FF" : "#334155"}
                  strokeWidth="1.2"
                  className="transition-all duration-200 cursor-pointer"
                  onClick={() => select("topdrive")}
                />
                <text x="160" y="194" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="sans-serif">Top Drive</text>

                {/* Drill pipe */}
                <rect x="148" y="213" width="24" height="60" rx="2"
                  fill={selected === "drillpipe" ? "#4ADE8020" : "#1E293B"}
                  stroke={selected === "drillpipe" ? "#4ADE80" : "#334155"}
                  strokeWidth="1.2"
                  className="transition-all duration-200 cursor-pointer"
                  onClick={() => select("drillpipe")}
                />
                <text x="160" y="250" textAnchor="middle" fontSize="7" fill="#94A3B8" fontFamily="sans-serif" writingMode="vertical-rl" transform="rotate(0,160,248)">Drill Pipe</text>

                {/* BOP */}
                <rect x="112" y="272" width="96" height="30" rx="4"
                  fill={selected === "bop" ? "#F43F5E20" : "#1E293B"}
                  stroke={selected === "bop" ? "#F43F5E" : "#334155"}
                  strokeWidth="1.4"
                  className="transition-all duration-200 cursor-pointer"
                  onClick={() => select("bop")}
                />
                <text x="160" y="292" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="sans-serif">BOP Stack</text>

                {/* BHA */}
                <rect x="148" y="310" width="24" height="50" rx="2"
                  fill={selected === "bha" ? "#4ADE8020" : "#162032"}
                  stroke={selected === "bha" ? "#4ADE80" : "#334155"}
                  strokeWidth="1.2"
                  className="transition-all duration-200 cursor-pointer"
                  onClick={() => select("bha")}
                />
                <rect x="152" y="314" width="16" height="8" rx="1" fill="#1E293B"/>
                <rect x="152" y="326" width="16" height="8" rx="1" fill="#1E293B"/>
                <rect x="152" y="338" width="16" height="8" rx="1" fill="#1E293B"/>
                <text x="160" y="373" textAnchor="middle" fontSize="6.5" fill="#64748B" fontFamily="sans-serif">BHA</text>

                {/* Substructure */}
                <rect x="50" y="428" width="220" height="14" rx="2" fill="#1E293B" stroke="#334155" strokeWidth="1"/>
                <rect x="70" y="380" width="180" height="50" rx="3"
                  fill={selected === "substructure" ? "#A78BFA18" : "#0F172A"}
                  stroke={selected === "substructure" ? "#A78BFA" : "#334155"}
                  strokeWidth="1.2"
                  className="transition-all duration-200 cursor-pointer"
                  onClick={() => select("substructure")}
                />
                <text x="160" y="410" textAnchor="middle" fontSize="7.5" fill="#94A3B8" fontFamily="sans-serif">Rig Floor / Substructure</text>

                {/* Drill bit */}
                <rect x="152" y="442" width="16" height="50" rx="1"
                  fill={selected === "bit" ? "#4ADE8020" : "#162032"}
                  stroke={selected === "bit" ? "#4ADE80" : "#334155"}
                  strokeWidth="1"
                  className="transition-all duration-200 cursor-pointer"
                  onClick={() => select("bit")}
                />
                <polygon points="152,492 160,510 168,492"
                  fill={selected === "bit" ? "#4ADE80" : "#334155"}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => select("bit")}
                />

                {/* Ground line */}
                <line x1="20" y1="444" x2="300" y2="444" stroke="#1E293B" strokeWidth="2"/>

                {/* Hotspots */}
                {HOTSPOTS.map((h) => {
                  const comp = COMPONENTS.find((c) => c.id === h.id)!;
                  const color = CATEGORY_COLORS[comp.category];
                  const isActive = selected === h.id;
                  return (
                    <g
                      key={h.id}
                      onClick={() => select(h.id)}
                      className="cursor-pointer"
                      style={{ filter: isActive ? `drop-shadow(0 0 6px ${color})` : "none" }}
                    >
                      <circle
                        cx={h.cx} cy={h.cy} r={isActive ? 10 : 8}
                        fill={isActive ? color : `${color}30`}
                        stroke={color}
                        strokeWidth={isActive ? 2 : 1.5}
                        className="transition-all duration-200"
                      />
                      <text
                        x={h.cx} y={h.cy + 4}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="700"
                        fill={isActive ? "#0A0F1E" : color}
                        fontFamily="sans-serif"
                        className="pointer-events-none select-none"
                      >
                        {comp.num}
                      </text>
                    </g>
                  );
                })}

                {/* Connector lines from hotspots */}
                {HOTSPOTS.map((h) => {
                  if (selected !== h.id) return null;
                  const comp = COMPONENTS.find((c) => c.id === h.id)!;
                  const color = CATEGORY_COLORS[comp.category];
                  const x2 = h.cx < 160 ? h.cx - 16 : h.cx + 16;
                  return (
                    <line
                      key={h.id + "-line"}
                      x1={h.cx} y1={h.cy}
                      x2={x2} y2={h.cy}
                      stroke={color} strokeWidth="1" strokeDasharray="3,2" opacity="0.6"
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* ── RIGHT: Info Panel ── */}
          <div className="flex-1 min-w-0">

            {/* Component list */}
            <div className="mb-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/[0.35]">
                Komponentlər — klikləyib seç
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {COMPONENTS.map((c) => {
                  const color = CATEGORY_COLORS[c.category];
                  const isActive = selected === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => select(c.id)}
                      className="flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-all duration-150"
                      style={{
                        background: isActive ? `${color}14` : "rgba(255,255,255,0.03)",
                        borderColor: isActive ? `${color}60` : "rgba(255,255,255,0.07)",
                      }}
                    >
                      <span
                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{
                          background: isActive ? color : `${color}25`,
                          color: isActive ? "#0A0F1E" : color,
                        }}
                      >
                        {c.num}
                      </span>
                      <span className="text-[12px] font-medium leading-tight" style={{ color: isActive ? "#F0F4FF" : "#94A3B8" }}>
                        {c.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info card */}
            {active ? (
              <div
                className="rounded-2xl border p-6 transition-all duration-300"
                style={{
                  background: `${CATEGORY_COLORS[active.category]}08`,
                  borderColor: `${CATEGORY_COLORS[active.category]}30`,
                }}
              >
                {/* Title */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          background: `${CATEGORY_COLORS[active.category]}20`,
                          color: CATEGORY_COLORS[active.category],
                        }}
                      >
                        {CATEGORY_LABELS[active.category]}
                      </span>
                    </div>
                    <h2 className="font-['Space_Grotesk'] text-[22px] font-bold leading-tight text-[#F0F4FF]">
                      {active.name}
                    </h2>
                    <p className="text-[13px] font-medium mt-0.5" style={{ color: CATEGORY_COLORS[active.category] }}>
                      {active.az}
                    </p>
                  </div>
                  <span
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg font-black"
                    style={{
                      background: `${CATEGORY_COLORS[active.category]}20`,
                      color: CATEGORY_COLORS[active.category],
                      border: `1px solid ${CATEGORY_COLORS[active.category]}30`,
                    }}
                  >
                    {active.num}
                  </span>
                </div>

                {/* Purpose */}
                <p className="text-[14px] leading-relaxed text-white/[0.65] mb-5">
                  {active.purpose}
                </p>

                {/* Params */}
                {active.params && (
                  <div className="mb-5 flex flex-wrap gap-3">
                    {active.params.map((p) => (
                      <div
                        key={p.label}
                        className="rounded-lg border px-3 py-2"
                        style={{
                          background: `${CATEGORY_COLORS[active.category]}0C`,
                          borderColor: `${CATEGORY_COLORS[active.category]}25`,
                        }}
                      >
                        <p className="text-[10px] text-white/[0.4] mb-0.5">{p.label}</p>
                        <p className="text-[13px] font-semibold" style={{ color: CATEGORY_COLORS[active.category] }}>
                          {p.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Facts */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-white/[0.35] mb-3 flex items-center gap-1.5">
                    <Info size={12} />
                    Texniki faktlar
                  </p>
                  <div className="flex flex-col gap-2">
                    {active.facts.map((fact, i) => (
                      <div key={i} className="flex items-start gap-3 text-[13px] text-white/[0.6]">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                          style={{ background: CATEGORY_COLORS[active.category] }}
                        />
                        {fact}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-14 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.05]">
                  <Layers size={22} className="text-white/[0.3]" />
                </div>
                <p className="text-[14px] text-white/[0.4]">
                  SVG üzərindəki nöqtəyə və ya yuxarıdakı siyahıdan komponent seç
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}