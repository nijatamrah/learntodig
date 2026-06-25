"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Shield, Info } from "lucide-react";

/* ─────────────────────────────────────────────
   COMPONENT DATA
───────────────────────────────────────────── */
type Component = {
  id: string;
  num: number;
  name: string;
  az: string;
  category: "sealing" | "control" | "safety" | "flow" | "structural";
  purpose: string;
  facts: string[];
  params?: { label: string; value: string }[];
};

const COMPONENTS: Component[] = [
  {
    id: "annular",
    num: 1,
    name: "Annular BOP",
    az: "Anülar Önləyici",
    category: "sealing",
    purpose:
      "BOP stack-in ən yuxarı hissəsi. Elastik rezin element (packing unit) istənilən ölçüdə boru ətrafını — hətta borusuz tam quyu ağzını — bağlaya bilir. Universallığına görə ilk aktivləşdirilən elementdir.",
    facts: [
      "Rezin/polimer packing unit hidravlik təzyiqlə sıxılaraq boruyu əhatə edir",
      "Drill pipe, drill collar, casing — hər ölçüyə uyğunlaşır",
      "Tam bağlanma: drill pipe olmadan da işləyir",
      "Tipik aktivləşmə vaxtı: 30 saniyədən az",
      "Hər 21 gündə funksional sınaq (pressure test) tələb olunur",
    ],
    params: [
      { label: "İş təzyiqi", value: "5,000 – 10,000 psi" },
      { label: "Aktivləşmə", value: "< 30 saniyə" },
      { label: "Material", value: "Rezin / Elastomer" },
    ],
  },
  {
    id: "pipe-ram",
    num: 2,
    name: "Pipe Ram BOP",
    az: "Boru Ram Önləyicisi",
    category: "sealing",
    purpose:
      "Müəyyən diametrli drill pipe ətrafını tam sızdırmaz şəkildə bağlayan iki tərəfli pistonlu element. Hər quyu üçün o quyuda istifadə olunan borunun ölçüsünə uyğun ram seçilir.",
    facts: [
      "İki tərəfdən (sol-sağ) hidravlik pistonlarla bağlanır",
      "Yalnız bir ölçü üçün nəzərdə tutulub — universal deyil",
      "Bağlandıqda kill line / choke line vasitəsilə quyu idarə olunur",
      "Variable bore ram (VBR): bir neçə ölçüyə uyğunlaşan müasir alternativ",
      "Sızma sınağı: 200 psi low pressure + full rated high pressure",
    ],
    params: [
      { label: "İş təzyiqi", value: "10,000 – 15,000 psi" },
      { label: "Bağlanma vaxtı", value: "< 30 saniyə" },
      { label: "Növlər", value: "Fixed bore, Variable bore" },
    ],
  },
  {
    id: "blind-ram",
    num: 3,
    name: "Blind Ram / Shear Ram",
    az: "Kor Ram / Kəsici Ram",
    category: "safety",
    purpose:
      "Son təhlükəsizlik elementi. Blind ram: drill pipe olmadıqda quyu ağzını bağlayır. Shear ram: drill pipe-ı fiziki olaraq kəsərək tam bağlama təmin edir — son çarə kimi istifadə olunur.",
    facts: [
      "Deepwater Horizon (2010) hadisəsindən sonra shear ram standartları yenidən yazıldı",
      "Kəsici bıçaqlar xüsusi yüksək möhkəmlikli poladdan hazırlanır",
      "Tool joint-ləri (boru birləşmə nöqtələri) kəsmək daha çətin — mövqeləndirmə vacibdir",
      "BSR (Blind Shear Ram): hər iki funksiyanı birləşdirən müasir element",
      "Offshore qurğularda ən azı bir BSR olması məcburidir (API 16A)",
    ],
    params: [
      { label: "İş təzyiqi", value: "15,000 – 20,000 psi" },
      { label: "Funksiya", value: "Kəsmə + Bağlama" },
      { label: "Standart", value: "API 16A / ISO 13533" },
    ],
  },
  {
    id: "choke-line",
    num: 4,
    name: "Choke Line",
    az: "Boğaz Xətti",
    category: "flow",
    purpose:
      "BOP bağlandıqdan sonra quyu daxilindəki məhlul və formasiya axınını tənzimlənmiş şəkildə səthinə çıxarmaq üçün istifadə olunan xətt. Choke manifold ilə birlikdə işləyir.",
    facts: [
      "BOP yan tərəfindən çıxır, choke manifold-a qoşulur",
      "Kick (formasiya axını) zamanı əsas idarəetmə yolu",
      "Adjustable choke: operatorun təzyiqi tədricən azaltmasına imkan verir",
      "Kill & choke line-lar adətən zift kimi qalın divarlı borulardan ibarətdir",
      "Tipik ölçü: 3-1/16″ – 4-1/16″",
    ],
    params: [
      { label: "Tipik ölçü", value: "3-1/16″ – 4-1/16″" },
      { label: "Təyinat", value: "Axın idarəsi" },
      { label: "Bağlı olduğu", value: "Choke Manifold" },
    ],
  },
  {
    id: "kill-line",
    num: 5,
    name: "Kill Line",
    az: "Kill Xətti",
    category: "flow",
    purpose:
      "Quyu kick-ini söndürmək üçün ağır məhlulun (kill mud) yüksək sıxlıqda quyu daxilinə vurulduğu xətt. Choke line-ın əks tərəfindən BOP-a qoşulur.",
    facts: [
      "Kill mud sıxlığı: formasiya təzyiqini kompensasiya etmək üçün hesablanır",
      "Driller's Method və Engineer's Method — iki əsas kill proseduru",
      "Kill line vasitəsilə vurma sürəti dəqiq nəzarətdə saxlanılır",
      "BOP-un hər iki tərəfindən simmetrik yerləşdirilir (choke ilə birlikdə)",
      "Sızma sınağı choke line ilə eyni qaydada aparılır",
    ],
    params: [
      { label: "Tipik ölçü", value: "3-1/16″ – 4-1/16″" },
      { label: "Təyinat", value: "Kill məhlulu vurma" },
      { label: "Metodlar", value: "Driller's / Engineer's" },
    ],
  },
  {
    id: "accumulator",
    num: 6,
    name: "Hydraulic Accumulator (Koomey Unit)",
    az: "Hidravlik Akkumulyator",
    category: "control",
    purpose:
      "BOP-u aktivləşdirmək üçün lazım olan yüksək təzyiqli hidravlik enerjini saxlayan sistem. Əsas hidravlik nasoslar işləməsə belə BOP-u bağlamaq üçün kifayət qədər enerji ehtiyatı saxlayır.",
    facts: [
      "Azot qazı ilə öncədən doldurulmuş ballonlarda hidravlik yağ saxlanılır",
      "API 16D: minimum 3 tam BOP bağlanması üçün enerji tələbi",
      "Əsas güc kəsilsə də BOP-u aktivləşdirə bilir",
      "Koomey unit: sahə adı — BOP idarəetmə sistemi",
      "Offshore-da remote panel (driller kabini) + mərkəzi panel birlikdə işləyir",
    ],
    params: [
      { label: "Saxlama təzyiqi", value: "3,000 psi" },
      { label: "Min. ehtiyat", value: "3× tam bağlanma" },
      { label: "Standart", value: "API 16D" },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  sealing:    "#FF6B2B",
  control:    "#00D4FF",
  safety:     "#F43F5E",
  flow:       "#4ADE80",
  structural: "#A78BFA",
};

const CATEGORY_LABELS: Record<string, string> = {
  sealing:    "Sızdırmazlıq",
  control:    "İdarəetmə",
  safety:     "Təhlükəsizlik",
  flow:       "Axın İdarəsi",
  structural: "Quruluş",
};

const HOTSPOTS = [
  { id: "annular",     cx: 230, cy: 80  },
  { id: "pipe-ram",   cx: 234, cy: 168 },
  { id: "blind-ram",  cx: 234, cy: 256 },
  { id: "choke-line", cx: 56,  cy: 210 },
  { id: "kill-line",  cx: 56,  cy: 298 },
  { id: "accumulator",cx: 56,  cy: 380 },
];

export default function BOPPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = COMPONENTS.find((c) => c.id === selected);

  function select(id: string) {
    setSelected((prev) => (prev === id ? null : id));
  }

  return (
    <main className="min-h-screen bg-[#0A0F1E] pt-16 text-[#F0F4FF]">

      {/* Breadcrumb */}
      <div className="border-b border-white/[0.06] px-6 py-3 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-[12px] text-white/[0.4]">
          <Link href="/equipment" className="flex items-center gap-1 hover:text-white/[0.7] transition-colors">
            <ArrowLeft size={13} />
            Tools &amp; Equipment
          </Link>
          <ChevronRight size={12} />
          <span className="text-white/[0.7]">Blowout Preventer</span>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-white/[0.06] px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={14} className="text-[#F43F5E]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F43F5E]">
              Well Control
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold md:text-4xl">
            Blowout Preventer —{" "}
            <span className="text-white/[0.45]">BOP Stack</span>
          </h1>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-white/[0.5]">
            Neft-qaz sənayesinin ən kritik təhlükəsizlik avadanlığı. Hər
            elementə klikləyərək vəzifəsini, parametrlərini və real hadisələrdən
            faktları öyrən.
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
                <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: CATEGORY_COLORS[key] }} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10 lg:items-start">

          {/* SVG */}
          <div className="flex justify-center lg:justify-start lg:flex-shrink-0">
            <svg
              viewBox="0 0 290 500"
              width={270}
              height={465}
              xmlns="http://www.w3.org/2000/svg"
              className="block"
            >
              {/* ── Drill pipe running through center ── */}
              <rect x="128" y="0" width="34" height="500" rx="2"
                fill="#0F172A" stroke="#1E293B" strokeWidth="1"/>
              {/* pipe inner */}
              <rect x="135" y="0" width="20" height="500" rx="1" fill="#0A0F1E"/>

              {/* ── ANNULAR BOP ── */}
              {/* body */}
              <rect x="72" y="42" width="146" height="76" rx="8"
                fill={selected === "annular" ? "#FF6B2B18" : "#0F172A"}
                stroke={selected === "annular" ? "#FF6B2B" : "#1E293B"}
                strokeWidth={selected === "annular" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("annular")}
              />
              {/* dome top */}
              <ellipse cx="145" cy="46" rx="40" ry="10"
                fill={selected === "annular" ? "#FF6B2B25" : "#162032"}
                stroke={selected === "annular" ? "#FF6B2B" : "#334155"}
                strokeWidth="1"
                className="cursor-pointer"
                onClick={() => select("annular")}
              />
              {/* packing unit lines */}
              <line x1="86" y1="68" x2="128" y2="80" stroke="#334155" strokeWidth="1.5"/>
              <line x1="204" y1="68" x2="162" y2="80" stroke="#334155" strokeWidth="1.5"/>
              <line x1="86" y1="100" x2="128" y2="88" stroke="#334155" strokeWidth="1.5"/>
              <line x1="204" y1="100" x2="162" y2="88" stroke="#334155" strokeWidth="1.5"/>
              {/* label */}
              <text x="145" y="86" textAnchor="middle" fontSize="8.5" fill="#94A3B8" fontFamily="sans-serif">Annular BOP</text>
              <text x="145" y="100" textAnchor="middle" fontSize="7" fill="#64748B" fontFamily="sans-serif">Packing Unit</text>

              {/* flange top */}
              <rect x="108" y="116" width="74" height="10" rx="2"
                fill="#1E293B" stroke="#334155" strokeWidth="1"/>

              {/* ── PIPE RAM ── */}
              <rect x="66" y="126" width="158" height="76" rx="6"
                fill={selected === "pipe-ram" ? "#FF6B2B18" : "#0F172A"}
                stroke={selected === "pipe-ram" ? "#FF6B2B" : "#1E293B"}
                strokeWidth={selected === "pipe-ram" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("pipe-ram")}
              />
              {/* left ram piston */}
              <rect x="72" y="148" width="54" height="28" rx="3"
                fill={selected === "pipe-ram" ? "#FF6B2B30" : "#162032"}
                stroke={selected === "pipe-ram" ? "#FF6B2B80" : "#334155"}
                strokeWidth="1"
                className="cursor-pointer"
                onClick={() => select("pipe-ram")}
              />
              {/* right ram piston */}
              <rect x="164" y="148" width="54" height="28" rx="3"
                fill={selected === "pipe-ram" ? "#FF6B2B30" : "#162032"}
                stroke={selected === "pipe-ram" ? "#FF6B2B80" : "#334155"}
                strokeWidth="1"
                className="cursor-pointer"
                onClick={() => select("pipe-ram")}
              />
              {/* ram faces */}
              <rect x="124" y="150" width="4" height="24" rx="1" fill="#334155"/>
              <rect x="162" y="150" width="4" height="24" rx="1" fill="#334155"/>
              <text x="145" y="172" textAnchor="middle" fontSize="8.5" fill="#94A3B8" fontFamily="sans-serif">Pipe Ram</text>
              <text x="145" y="184" textAnchor="middle" fontSize="7" fill="#64748B" fontFamily="sans-serif">Fixed Bore</text>

              {/* flange middle */}
              <rect x="108" y="200" width="74" height="10" rx="2"
                fill="#1E293B" stroke="#334155" strokeWidth="1"/>

              {/* ── BLIND / SHEAR RAM ── */}
              <rect x="66" y="210" width="158" height="76" rx="6"
                fill={selected === "blind-ram" ? "#F43F5E18" : "#0F172A"}
                stroke={selected === "blind-ram" ? "#F43F5E" : "#1E293B"}
                strokeWidth={selected === "blind-ram" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("blind-ram")}
              />
              {/* shear blades */}
              <polygon points="72,228 126,248 72,268"
                fill={selected === "blind-ram" ? "#F43F5E30" : "#162032"}
                stroke={selected === "blind-ram" ? "#F43F5E80" : "#334155"}
                strokeWidth="1"
                className="cursor-pointer"
                onClick={() => select("blind-ram")}
              />
              <polygon points="218,228 164,248 218,268"
                fill={selected === "blind-ram" ? "#F43F5E30" : "#162032"}
                stroke={selected === "blind-ram" ? "#F43F5E80" : "#334155"}
                strokeWidth="1"
                className="cursor-pointer"
                onClick={() => select("blind-ram")}
              />
              <text x="145" y="256" textAnchor="middle" fontSize="8.5" fill="#94A3B8" fontFamily="sans-serif">Blind Shear Ram</text>
              <text x="145" y="268" textAnchor="middle" fontSize="7" fill="#64748B" fontFamily="sans-serif">BSR</text>

              {/* flange bottom */}
              <rect x="108" y="284" width="74" height="10" rx="2"
                fill="#1E293B" stroke="#334155" strokeWidth="1"/>

              {/* ── SPOOL / CASING HEAD ── */}
              <rect x="88" y="294" width="114" height="44" rx="4"
                fill="#0F172A" stroke="#1E293B" strokeWidth="1"/>
              <text x="145" y="320" textAnchor="middle" fontSize="8" fill="#64748B" fontFamily="sans-serif">Drilling Spool</text>

              {/* ── WELLHEAD ── */}
              <rect x="96" y="338" width="98" height="32" rx="3"
                fill="#0A0F1E" stroke="#1E293B" strokeWidth="1"/>
              <text x="145" y="358" textAnchor="middle" fontSize="8" fill="#64748B" fontFamily="sans-serif">Wellhead / Casing Head</text>

              {/* ground */}
              <line x1="20" y1="370" x2="270" y2="370" stroke="#1E293B" strokeWidth="2"/>

              {/* ── CHOKE LINE (left) ── */}
              <line x1="66" y1="210" x2="44" y2="210" stroke="#4ADE80" strokeWidth="1.5" strokeDasharray="3,2"/>
              <rect x="20" y="196" width="26" height="28" rx="3"
                fill={selected === "choke-line" ? "#4ADE8018" : "#0F172A"}
                stroke={selected === "choke-line" ? "#4ADE80" : "#334155"}
                strokeWidth={selected === "choke-line" ? 1.5 : 1}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("choke-line")}
              />
              <text x="33" y="213" textAnchor="middle" fontSize="6.5" fill="#94A3B8" fontFamily="sans-serif">Choke</text>
              <text x="33" y="222" textAnchor="middle" fontSize="6.5" fill="#94A3B8" fontFamily="sans-serif">Line</text>

              {/* ── KILL LINE (left) ── */}
              <line x1="66" y1="294" x2="44" y2="294" stroke="#4ADE80" strokeWidth="1.5" strokeDasharray="3,2"/>
              <rect x="20" y="280" width="26" height="28" rx="3"
                fill={selected === "kill-line" ? "#4ADE8018" : "#0F172A"}
                stroke={selected === "kill-line" ? "#4ADE80" : "#334155"}
                strokeWidth={selected === "kill-line" ? 1.5 : 1}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("kill-line")}
              />
              <text x="33" y="297" textAnchor="middle" fontSize="6.5" fill="#94A3B8" fontFamily="sans-serif">Kill</text>
              <text x="33" y="306" textAnchor="middle" fontSize="6.5" fill="#94A3B8" fontFamily="sans-serif">Line</text>

              {/* ── ACCUMULATOR (left bottom) ── */}
              <line x1="88" y1="360" x2="56" y2="380" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="3,2"/>
              <rect x="18" y="366" width="38" height="28" rx="3"
                fill={selected === "accumulator" ? "#00D4FF18" : "#0F172A"}
                stroke={selected === "accumulator" ? "#00D4FF" : "#334155"}
                strokeWidth={selected === "accumulator" ? 1.5 : 1}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("accumulator")}
              />
              {/* accumulator cylinders */}
              <rect x="22" y="370" width="8" height="18" rx="2" fill="#162032" stroke="#334155" strokeWidth="0.8"/>
              <rect x="32" y="370" width="8" height="18" rx="2" fill="#162032" stroke="#334155" strokeWidth="0.8"/>
              <rect x="42" y="370" width="8" height="18" rx="2" fill="#162032" stroke="#334155" strokeWidth="0.8"/>
              <text x="37" y="400" textAnchor="middle" fontSize="6" fill="#94A3B8" fontFamily="sans-serif">Accum.</text>

              {/* ── HOTSPOTS ── */}
              {HOTSPOTS.map((h) => {
                const comp = COMPONENTS.find((c) => c.id === h.id)!;
                const color = CATEGORY_COLORS[comp.category];
                const isActive = selected === h.id;
                return (
                  <g
                    key={h.id}
                    onClick={() => select(h.id)}
                    className="cursor-pointer"
                    style={{ filter: isActive ? `drop-shadow(0 0 5px ${color})` : "none" }}
                  >
                    <circle
                      cx={h.cx} cy={h.cy} r={isActive ? 10 : 8}
                      fill={isActive ? color : `${color}28`}
                      stroke={color}
                      strokeWidth={isActive ? 2 : 1.5}
                      className="transition-all duration-200"
                    />
                    <text
                      x={h.cx} y={h.cy + 4}
                      textAnchor="middle" fontSize="9" fontWeight="700"
                      fill={isActive ? "#0A0F1E" : color}
                      fontFamily="sans-serif"
                      className="pointer-events-none select-none"
                    >
                      {comp.num}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right: list + info */}
          <div className="flex-1 min-w-0">

            {/* Component list */}
            <div className="mb-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/[0.35]">
                Komponentlər — klikləyib seç
              </p>
              <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
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
                      <span className="text-[12px] font-medium leading-tight"
                        style={{ color: isActive ? "#F0F4FF" : "#94A3B8" }}>
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
                    <p className="text-[13px] font-medium mt-0.5"
                      style={{ color: CATEGORY_COLORS[active.category] }}>
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

                <p className="text-[14px] leading-relaxed text-white/[0.65] mb-5">
                  {active.purpose}
                </p>

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
                        <p className="text-[13px] font-semibold"
                          style={{ color: CATEGORY_COLORS[active.category] }}>
                          {p.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

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
                  <Shield size={22} className="text-white/[0.3]" />
                </div>
                <p className="text-[14px] text-white/[0.4]">
                  SVG üzərindəki nöqtəyə və ya yuxarıdakı siyahıdan element seç
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}