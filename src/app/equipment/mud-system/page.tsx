"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Droplets, Info } from "lucide-react";

/* ─────────────────────────────────────────────
   COMPONENT DATA
───────────────────────────────────────────── */
type Component = {
  id: string;
  num: number;
  name: string;
  az: string;
  category: "pumping" | "cleaning" | "storage" | "control" | "safety";
  purpose: string;
  facts: string[];
  params?: { label: string; value: string }[];
};

const COMPONENTS: Component[] = [
  {
    id: "mud-pump",
    num: 1,
    name: "Mud Pump",
    az: "Qazıma Məhlulu Nasosu",
    category: "pumping",
    purpose:
      "Bütün dövriyyə sisteminin qəlbi. Qazıma məhlulunu yüksək təzyiqlə standpipe vasitəsilə drill string-ə vurur. Əksər qurğularda iki ədəd triplex (üç pistonlu) nasос paralel işləyir.",
    facts: [
      "Triplex nasос: 3 pistonlu, simplex (1 pistonlu) ilə müqayisədə daha az titrəyiş",
      "Duplex: ikitərəfli iş prinsipi — hər iki istiqamətdə məhlul vurur",
      "Nasоs gücü: 1,000 – 2,200 hp arası",
      "Axın sürəti (flow rate): 100 – 1,200 GPM (gallon/dəq)",
      "Liner ölçüsü dəyişdirilərək təzyiq/axın nisbəti tənzimlənir",
      "SPM (strokes per minute) — ROP hesablamasında əsas parametrdir",
    ],
    params: [
      { label: "Güc", value: "1,000 – 2,200 hp" },
      { label: "Axın sürəti", value: "100 – 1,200 GPM" },
      { label: "Maks. təzyiq", value: "7,500 psi" },
    ],
  },
  {
    id: "standpipe",
    num: 2,
    name: "Standpipe & Kelly Hose",
    az: "Standboyu Boru və Kelly Şlanqı",
    category: "pumping",
    purpose:
      "Nasоsdan yüksək təzyiqli məhlulu qülləyə qaldıran vertikal polad boru (standpipe) və top drive-a qoşulan çevik şlanq (kelly hose / rotary hose). Drill string-ə girilən əsas yoldur.",
    facts: [
      "Standpipe: qülləyə montaj edilmiş, hərəkətsiz polad boru",
      "Kelly hose: standpipe-dan top drive-a qoşulan çevik yüksək təzyiqli şlanq",
      "Şlanq uzunluğu: 45–55 ft — travelling block-un hərəkətinə imkan verir",
      "Standpipe manometer: real vaxtda məhlul təzyiqini göstərir",
      "Rənglər: adətən qırmızı — yüksək təzyiqli sistem işarəsi",
    ],
    params: [
      { label: "Maks. təzyiq", value: "7,500 psi" },
      { label: "Şlanq uzunluğu", value: "45 – 55 ft" },
      { label: "Material", value: "Yüksək möhkəmlikli polad / rezin" },
    ],
  },
  {
    id: "shale-shaker",
    num: 3,
    name: "Shale Shaker",
    az: "Lay Süxuru Titrəyicisi",
    category: "cleaning",
    purpose:
      "Dövriyyədən qayıdan məhluldakı iri süxur hissəciklərini (cutting) mexaniki vibrasiya ilə ayıran ilk və ən vacib təmizləmə avadanlığı. Mesh ekranlar vasitəsilə işləyir.",
    facts: [
      "Cutting-lər ekranda qalır, təmiz məhlul altdan süzülür",
      "Mesh ölçüsü: 20 – 325 mesh — formasiyaya görə seçilir",
      "Bir neçə paralel shaker eyni vaxtda işləyə bilər",
      "API RP 13C standartına görə mesh ölçüləri standartlaşdırılıb",
      "Bypass: nasоs dayandıqda məhlul birbaşa mud pit-ə gedir",
      "Cutting analizi: geologist burada litologiya müəyyən edir",
    ],
    params: [
      { label: "Mesh ölçüsü", value: "20 – 325 API" },
      { label: "Axın qabiliyyəti", value: "500 – 1,500 GPM" },
      { label: "Standart", value: "API RP 13C" },
    ],
  },
  {
    id: "degasser",
    num: 4,
    name: "Degasser",
    az: "Qaz Ayırıcı",
    category: "safety",
    purpose:
      "Məhlula qarışmış formasiya qazını (əsasən metan) ayıran avadanlıq. Vacuum degasser ən geniş yayılmış tipdir. Qaz dolu məhlulun nasosa çatmasının qarşısını alır — cavitation riskini aradan qaldırır.",
    facts: [
      "Atmospheric degasser: məhlulu incə təbəqə şəklində yayaraq qazı azad edir",
      "Vacuum degasser: mənfi təzyiqlə qaz çıxarma — daha effektiv",
      "Gas cut mud: sıxlığı azalmış, potensial kick siqnalı",
      "Mud weight düşməsi → BHP (Bottom Hole Pressure) azalır → kick riski",
      "Mud/gas separator (poor boy degasser) ilə birlikdə işləyə bilər",
    ],
    params: [
      { label: "Növlər", value: "Atmospheric / Vacuum" },
      { label: "Axın qabiliyyəti", value: "500 – 1,000 GPM" },
      { label: "Çıxarma effektivliyi", value: "≥ 99%" },
    ],
  },
  {
    id: "desander-desilter",
    num: 5,
    name: "Desander & Desilter",
    az: "Qum və Lil Ayırıcı",
    category: "cleaning",
    purpose:
      "Shale shaker-dən keçən daha xırda hissəcikləri hidrosiklon texnologiyası ilə ayıran avadanlıq. Desander iri qum hissəciklərini, desilter isə daha xırda lil hissəciklərini tutur.",
    facts: [
      "Hidrosiklon: mərkəzdənqaçma qüvvəsi ilə hissəcikləri ayırır — hərəkət edən hissə yoxdur",
      "Desander: 45 – 74 mikron ölçülü hissəcikləri tutur",
      "Desilter: 15 – 44 mikron ölçülü hissəcikləri tutur",
      "Weighted mud-da istifadə məhdudlaşdırılır — barit itkisi baş verə bilər",
      "Adətən shale shaker-dən sonra, mud cleaner-dən əvvəl yerləşdirilir",
    ],
    params: [
      { label: "Desander ölçüsü", value: "45 – 74 mikron" },
      { label: "Desilter ölçüsü", value: "15 – 44 mikron" },
      { label: "Prinsip", value: "Hidrosiklon" },
    ],
  },
  {
    id: "mud-pit",
    num: 6,
    name: "Mud Pits (Active & Reserve)",
    az: "Məhlul Hovuzları",
    category: "storage",
    purpose:
      "Qazıma məhlulunun saxlandığı, hazırlandığı və dövriyyəyə göndərildiyi əsas saxlama sistemi. Active pit dövriyyədəki məhluludur, reserve pit ehtiyat məhlulu saxlayır.",
    facts: [
      "Active system: suction pit → nasоs → quyu → şeykər → aktiv pit dövriyyəsi",
      "Pit volume monitoring: pit səviyyəsi artarsa kick, azalarsa məhlul itkisi siqnalı",
      "Mud engineer hər gün reoloji parametrləri ölçür (viscosity, pH, density)",
      "Weighted mud: barit (BaSO₄) əlavə edərək sıxlıq artırılır",
      "Pilot testing: yeni kimyəvi maddə əvvəlcə kiçik həcmdə sınaqdan keçirilir",
    ],
    params: [
      { label: "Tipik həcm", value: "500 – 2,000 bbl" },
      { label: "Monitorinq", value: "Pit volume totalizer" },
      { label: "Sıxlıq", value: "8.5 – 19 ppg" },
    ],
  },
  {
    id: "mud-mixer",
    num: 7,
    name: "Chemical Mixing System",
    az: "Kimyəvi Qarışdırma Sistemi",
    category: "control",
    purpose:
      "Qazıma məhluluna kimyəvi maddələr (barit, bentonit, polimerlar, inhibitorlar) əlavə etmək üçün istifadə olunan hopper, jet mixer və agitator sistemi. Mud engineer-in əsas iş yeridir.",
    facts: [
      "Hopper: toz halında kimyəvi maddəni məhlula qarışdıran venturi sistemi",
      "Agitator: pit-dəki məhluln çökməsinin qarşısını alan qarışdırıcılar",
      "Barit: sıxlıq artırmaq üçün — SG 4.2",
      "Bentonit: viscosity və filtrate control üçün",
      "pH nəzarəti: caustic soda (NaOH) ilə aparılır, ideal pH 9.5–10.5",
    ],
    params: [
      { label: "Hopper növü", value: "Venturi / Jet mixer" },
      { label: "İdeal pH", value: "9.5 – 10.5" },
      { label: "Barit SG", value: "4.2" },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  pumping:  "#FF6B2B",
  cleaning: "#4ADE80",
  storage:  "#A78BFA",
  control:  "#00D4FF",
  safety:   "#F43F5E",
};

const CATEGORY_LABELS: Record<string, string> = {
  pumping:  "Vurma",
  cleaning: "Təmizləmə",
  storage:  "Saxlama",
  control:  "İdarəetmə",
  safety:   "Təhlükəsizlik",
};

/* ─────────────────────────────────────────────
   HOTSPOT POSITIONS
───────────────────────────────────────────── */
const HOTSPOTS = [
  { id: "mud-pump",           cx: 56,  cy: 310 },
  { id: "standpipe",          cx: 174, cy: 80  },
  { id: "shale-shaker",       cx: 242, cy: 310 },
  { id: "degasser",           cx: 242, cy: 390 },
  { id: "desander-desilter",  cx: 182, cy: 430 },
  { id: "mud-pit",            cx: 80,  cy: 430 },
  { id: "mud-mixer",          cx: 80,  cy: 490 },
];

export default function MudSystemPage() {
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
          <span className="text-white/[0.7]">Mud Circulation System</span>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-white/[0.06] px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-3">
            <Droplets size={14} className="text-[#4ADE80]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4ADE80]">
              Drilling Fluids
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold md:text-4xl">
            Mud Circulation System —{" "}
            <span className="text-white/[0.45]">Məhlul Dövriyyəsi</span>
          </h1>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-white/[0.5]">
            Qazıma məhlulunun nasоsdan quyuya, quyudan səthinə qayıdışını
            idarə edən tam sistem. Hər komponentə klikləyib öyrən.
          </p>

          {/* Flow direction hint */}
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#4ADE80]/20 bg-[#4ADE80]/05 px-4 py-2.5 w-fit">
            <span className="text-[11px] font-semibold text-[#4ADE80]">Dövriyyə istiqaməti:</span>
            <span className="text-[11px] text-white/[0.5]">Nasоs → Standpipe → Drill String → Bit → Annulus → Şeykər → Pit → Nasоs</span>
          </div>

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
              viewBox="0 0 290 540"
              width={290}
              height={540}
              xmlns="http://www.w3.org/2000/svg"
              className="block"
            >
              {/* ═══════════════════════════════
                  DERRICK / QUYU (sağ tərəf, yuxarı)
              ═══════════════════════════════ */}

              {/* Derrick outline — sadə */}
              <line x1="140" y1="20" x2="122" y2="120" stroke="#1E293B" strokeWidth="2"/>
              <line x1="160" y1="20" x2="178" y2="120" stroke="#1E293B" strokeWidth="2"/>
              <line x1="122" y1="120" x2="110" y2="200" stroke="#1E293B" strokeWidth="2.5"/>
              <line x1="178" y1="120" x2="190" y2="200" stroke="#1E293B" strokeWidth="2.5"/>
              {/* cross brace */}
              <line x1="126" y1="80" x2="174" y2="80" stroke="#1E293B" strokeWidth="1" strokeDasharray="3,2"/>
              <line x1="118" y1="140" x2="182" y2="140" stroke="#1E293B" strokeWidth="1" strokeDasharray="3,2"/>

              {/* Standpipe — qülləyə paralel polad boru */}
              <rect x="168" y="30" width="10" height="170" rx="2"
                fill={selected === "standpipe" ? "#FF6B2B20" : "#0F172A"}
                stroke={selected === "standpipe" ? "#FF6B2B" : "#334155"}
                strokeWidth="1.2"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("standpipe")}
              />
              {/* standpipe label */}
              <text x="183" y="75" fontSize="7" fill="#64748B" fontFamily="sans-serif">Standpipe</text>

              {/* Kelly hose — əyri şlanq top drive-a */}
              <path d="M 178 60 Q 200 60 200 80 Q 200 95 185 95"
                fill="none" stroke={selected === "standpipe" ? "#FF6B2B" : "#334155"}
                strokeWidth="3" strokeLinecap="round"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("standpipe")}
              />
              <text x="183" y="108" fontSize="7" fill="#64748B" fontFamily="sans-serif">Kelly Hose</text>

              {/* Top drive */}
              <rect x="142" y="90" width="30" height="18" rx="3"
                fill="#0F172A" stroke="#334155" strokeWidth="1"/>
              <text x="157" y="102" textAnchor="middle" fontSize="6.5" fill="#475569" fontFamily="sans-serif">Top Drive</text>

              {/* Drill string — quyu içi */}
              <rect x="148" y="108" width="18" height="100" rx="1"
                fill="#0A0F1E" stroke="#1E293B" strokeWidth="1"/>
              <rect x="153" y="108" width="8" height="100" rx="1" fill="#060A14"/>

              {/* Rig floor */}
              <rect x="108" y="200" width="84" height="12" rx="2"
                fill="#0F172A" stroke="#1E293B" strokeWidth="1"/>

              {/* Wellhead / casing */}
              <rect x="140" y="210" width="20" height="40" rx="1"
                fill="#0A0F1E" stroke="#1E293B" strokeWidth="1"/>

              {/* Ground line */}
              <line x1="60" y1="250" x2="230" y2="250" stroke="#1E293B" strokeWidth="1.5"/>

              {/* Return flow — annulusdən çıxan axın oxu */}
              <path d="M 108 230 Q 60 230 60 270"
                fill="none" stroke="#4ADE80" strokeWidth="1.5"
                strokeDasharray="4,3" opacity="0.5"/>
              <text x="62" y="265" fontSize="6.5" fill="#4ADE80" fontFamily="sans-serif" opacity="0.7">return</text>

              {/* ═══════════════════════════════
                  MUD PUMP (sol, orta)
              ═══════════════════════════════ */}
              <rect x="18" y="274" width="68" height="52" rx="5"
                fill={selected === "mud-pump" ? "#FF6B2B14" : "#0F172A"}
                stroke={selected === "mud-pump" ? "#FF6B2B" : "#1E293B"}
                strokeWidth={selected === "mud-pump" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("mud-pump")}
              />
              {/* piston cylinders */}
              {[28, 44, 60].map((x) => (
                <g key={x}>
                  <rect x={x} y="282" width="10" height="30" rx="2"
                    fill={selected === "mud-pump" ? "#FF6B2B20" : "#162032"}
                    stroke={selected === "mud-pump" ? "#FF6B2B60" : "#334155"}
                    strokeWidth="0.8"/>
                  <rect x={x + 2} y="284" width="6" height="14" rx="1"
                    fill={selected === "mud-pump" ? "#FF6B2B40" : "#1E293B"}/>
                </g>
              ))}
              <text x="52" y="322" textAnchor="middle" fontSize="7.5" fill="#94A3B8" fontFamily="sans-serif">Mud Pump</text>
              <text x="52" y="332" textAnchor="middle" fontSize="6.5" fill="#64748B" fontFamily="sans-serif">Triplex</text>

              {/* Pump → standpipe discharge line */}
              <path d="M 86 295 Q 150 295 168 120"
                fill="none"
                stroke={selected === "mud-pump" || selected === "standpipe" ? "#FF6B2B" : "#1E293B"}
                strokeWidth="2" strokeDasharray="5,3"
                className="transition-all duration-300"/>
              <text x="128" y="288" fontSize="6.5" fill="#FF6B2B" fontFamily="sans-serif" opacity="0.6">discharge</text>

              {/* ═══════════════════════════════
                  SHALE SHAKER (sağ, orta-aşağı)
              ═══════════════════════════════ */}
              <rect x="204" y="274" width="68" height="52" rx="5"
                fill={selected === "shale-shaker" ? "#4ADE8014" : "#0F172A"}
                stroke={selected === "shale-shaker" ? "#4ADE80" : "#1E293B"}
                strokeWidth={selected === "shale-shaker" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("shale-shaker")}
              />
              {/* mesh lines */}
              {[282, 290, 298, 306].map((y) => (
                <line key={y} x1="210" y1={y} x2="266" y2={y}
                  stroke={selected === "shale-shaker" ? "#4ADE8050" : "#1E293B"}
                  strokeWidth="1"/>
              ))}
              {/* cutting discharge arrow */}
              <path d="M 272 295 L 280 285" stroke="#4ADE80" strokeWidth="1.2"
                strokeDasharray="2,2" opacity="0.5"/>
              <text x="238" y="322" textAnchor="middle" fontSize="7.5" fill="#94A3B8" fontFamily="sans-serif">Shale Shaker</text>
              <text x="238" y="332" textAnchor="middle" fontSize="6.5" fill="#64748B" fontFamily="sans-serif">Mesh Screen</text>

              {/* Return line: wellhead → shaker */}
              <path d="M 108 240 Q 105 270 204 290"
                fill="none" stroke="#4ADE80" strokeWidth="1.5"
                strokeDasharray="4,3" opacity="0.6"/>

              {/* ═══════════════════════════════
                  DEGASSER (sağ, aşağı)
              ═══════════════════════════════ */}
              <rect x="206" y="358" width="64" height="48" rx="5"
                fill={selected === "degasser" ? "#F43F5E14" : "#0F172A"}
                stroke={selected === "degasser" ? "#F43F5E" : "#1E293B"}
                strokeWidth={selected === "degasser" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("degasser")}
              />
              {/* vacuum chamber */}
              <ellipse cx="238" cy="374" rx="20" ry="10"
                fill={selected === "degasser" ? "#F43F5E20" : "#162032"}
                stroke={selected === "degasser" ? "#F43F5E60" : "#334155"}
                strokeWidth="0.8"/>
              {/* gas bubbles */}
              {[[228,380],[238,376],[248,380]].map(([bx,by],i) => (
                <circle key={i} cx={bx} cy={by} r="2.5"
                  fill={selected === "degasser" ? "#F43F5E40" : "#1E293B"}
                  stroke={selected === "degasser" ? "#F43F5E80" : "#334155"}
                  strokeWidth="0.6"/>
              ))}
              <text x="238" y="396" textAnchor="middle" fontSize="7.5" fill="#94A3B8" fontFamily="sans-serif">Degasser</text>
              <text x="238" y="406" textAnchor="middle" fontSize="6" fill="#64748B" fontFamily="sans-serif">Gas separator</text>

              {/* Shaker → degasser */}
              <line x1="238" y1="326" x2="238" y2="358"
                stroke="#4ADE80" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.5"/>

              {/* ═══════════════════════════════
                  DESANDER / DESILTER (orta aşağı)
              ═══════════════════════════════ */}
              <g className="cursor-pointer transition-all duration-200" onClick={() => select("desander-desilter")}>
                {/* desander cone */}
                <polygon points="162,400 182,400 172,430"
                  fill={selected === "desander-desilter" ? "#4ADE8020" : "#0F172A"}
                  stroke={selected === "desander-desilter" ? "#4ADE80" : "#1E293B"}
                  strokeWidth="1.4"/>
                {/* desilter cones (smaller) */}
                <polygon points="185,404 198,404 191.5,424"
                  fill={selected === "desander-desilter" ? "#4ADE8020" : "#0F172A"}
                  stroke={selected === "desander-desilter" ? "#4ADE80" : "#1E293B"}
                  strokeWidth="1.2"/>
                <polygon points="200,404 213,404 206.5,424"
                  fill={selected === "desander-desilter" ? "#4ADE8020" : "#0F172A"}
                  stroke={selected === "desander-desilter" ? "#4ADE80" : "#1E293B"}
                  strokeWidth="1.2"/>
                <text x="187" y="442" textAnchor="middle" fontSize="6.5" fill="#94A3B8" fontFamily="sans-serif">Desander/Desilter</text>
              </g>

              {/* Degasser → desander */}
              <path d="M 206 390 Q 190 390 200 410"
                fill="none" stroke="#4ADE80" strokeWidth="1.2"
                strokeDasharray="3,2" opacity="0.5"/>

              {/* ═══════════════════════════════
                  MUD PIT (sol aşağı)
              ═══════════════════════════════ */}
              <rect x="22" y="396" width="82" height="52" rx="4"
                fill={selected === "mud-pit" ? "#A78BFA14" : "#0F172A"}
                stroke={selected === "mud-pit" ? "#A78BFA" : "#1E293B"}
                strokeWidth={selected === "mud-pit" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("mud-pit")}
              />
              {/* fluid level */}
              <rect x="26" y="418" width="74" height="26" rx="2"
                fill={selected === "mud-pit" ? "#A78BFA20" : "#060A14"}/>
              {/* ripple lines */}
              <line x1="30" y1="424" x2="90" y2="424"
                stroke={selected === "mud-pit" ? "#A78BFA60" : "#1E293B"} strokeWidth="1"/>
              <line x1="30" y1="430" x2="90" y2="430"
                stroke={selected === "mud-pit" ? "#A78BFA40" : "#0F172A"} strokeWidth="1"/>
              <text x="63" y="414" textAnchor="middle" fontSize="7.5" fill="#94A3B8" fontFamily="sans-serif">Active Mud Pit</text>
              <text x="63" y="456" textAnchor="middle" fontSize="6" fill="#64748B" fontFamily="sans-serif">Suction pit</text>

              {/* Desander → mud pit */}
              <path d="M 162 428 Q 120 428 104 428"
                fill="none" stroke="#4ADE80" strokeWidth="1.2"
                strokeDasharray="3,2" opacity="0.5"/>

              {/* Mud pit → pump suction line */}
              <path d="M 22 430 Q 10 430 10 330 Q 10 275 18 295"
                fill="none"
                stroke={selected === "mud-pit" || selected === "mud-pump" ? "#A78BFA" : "#1E293B"}
                strokeWidth="1.5" strokeDasharray="4,3"
                className="transition-all duration-300"/>
              <text x="6" y="365" fontSize="6.5" fill="#A78BFA" fontFamily="sans-serif"
                transform="rotate(-90, 6, 365)" opacity="0.6">suction</text>

              {/* ═══════════════════════════════
                  MUD MIXER (sol, alt)
              ═══════════════════════════════ */}
              <rect x="22" y="464" width="82" height="40" rx="4"
                fill={selected === "mud-mixer" ? "#00D4FF14" : "#0F172A"}
                stroke={selected === "mud-mixer" ? "#00D4FF" : "#1E293B"}
                strokeWidth={selected === "mud-mixer" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("mud-mixer")}
              />
              {/* hopper shape */}
              <polygon points="38,470 58,470 53,490 43,490"
                fill={selected === "mud-mixer" ? "#00D4FF20" : "#162032"}
                stroke={selected === "mud-mixer" ? "#00D4FF60" : "#334155"}
                strokeWidth="0.8"/>
              {/* agitator */}
              <line x1="72" y1="468" x2="72" y2="500" stroke={selected === "mud-mixer" ? "#00D4FF60" : "#334155"} strokeWidth="1.5"/>
              <line x1="64" y1="482" x2="80" y2="482" stroke={selected === "mud-mixer" ? "#00D4FF60" : "#334155"} strokeWidth="2"/>
              <text x="63" y="508" textAnchor="middle" fontSize="7" fill="#94A3B8" fontFamily="sans-serif">Mixing System</text>

              {/* Mixer → pit connection */}
              <line x1="63" y1="464" x2="63" y2="448"
                stroke="#00D4FF" strokeWidth="1" strokeDasharray="2,2" opacity="0.4"/>

              {/* ═══════════════════════════════
                  FLOW ARROWS — dövriyyə istiqaməti
              ═══════════════════════════════ */}
              {/* pump discharge up */}
              <polygon points="120,200 116,210 124,210" fill="#FF6B2B" opacity="0.5"/>
              {/* return down */}
              <polygon points="100,248 96,238 104,238" fill="#4ADE80" opacity="0.5"/>

              {/* ═══════════════════════════════
                  HOTSPOTS
              ═══════════════════════════════ */}
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
                      <span
                        className="text-[12px] font-medium leading-tight"
                        style={{ color: isActive ? "#F0F4FF" : "#94A3B8" }}
                      >
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
                  <Droplets size={22} className="text-white/[0.3]" />
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