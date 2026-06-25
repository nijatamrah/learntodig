"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, TreePine, Info } from "lucide-react";

/* ─────────────────────────────────────────────
   COMPONENT DATA
───────────────────────────────────────────── */
type Component = {
  id: string;
  num: number;
  name: string;
  az: string;
  category: "valve" | "control" | "safety" | "connection" | "monitoring";
  purpose: string;
  facts: string[];
  params?: { label: string; value: string }[];
};

const COMPONENTS: Component[] = [
  {
    id: "master-valve",
    num: 1,
    name: "Master Valve (Lower & Upper)",
    az: "Əsas Klapan",
    category: "valve",
    purpose:
      "Christmas tree-nin ən aşağısında yerləşən əsas bağlama elementi. Lower master valve əl ilə, upper master valve isə adətən hidravlik idarə ilə açılıb bağlanır. Tam bağlandıqda quyudan heç bir axın keçmir.",
    facts: [
      "Gate valve konstruksiyası — tam açıq və ya tam bağlı vəziyyətdə işləyir",
      "Lower master valve (LMV): əl ilə idarə, nadir hallarda bağlanır",
      "Upper master valve (UMV): normal əməliyyatlarda əsas bağlama elementi",
      "API 6A standartına uyğun hazırlanır",
      "Pressure rating: 2,000 – 20,000 psi",
      "İl ərzində ən az bir dəfə tam açılıb-bağlanma sınağı keçirilir",
    ],
    params: [
      { label: "Növ", value: "Gate Valve" },
      { label: "Təzyiq", value: "2,000 – 20,000 psi" },
      { label: "Standart", value: "API 6A" },
    ],
  },
  {
    id: "wing-valve",
    num: 2,
    name: "Wing Valve (Production & Annulus)",
    az: "Qanad Klapanı",
    category: "valve",
    purpose:
      "Christmas tree-nin yan tərəflərindən çıxan klapanlar. Production wing valve hasilat axınını flow line-a yönləndirir. Annulus wing valve quyu halqası ilə əlaqəni idarə edir.",
    facts: [
      "Production wing valve: hasilat axınının əsas idarə nöqtəsi",
      "Annulus wing valve: gas lift, kimyəvi maddə vurma, basım ölçmə üçün",
      "Hər iki tərəfdə simmetrik yerləşdirilir (redundancy üçün)",
      "Choke-dan əvvəl yerləşir — axın sürəti buradan tənzimlənir",
      "ESD (Emergency Shutdown) sistemi ilə avtomatik bağlana bilir",
    ],
    params: [
      { label: "Növlər", value: "Production / Annulus" },
      { label: "İdarəetmə", value: "Əl / Hidravlik / Pnevmatik" },
      { label: "Yerləşmə", value: "Yan tərəf" },
    ],
  },
  {
    id: "choke",
    num: 3,
    name: "Choke Valve",
    az: "Boğazlayıcı Klapan",
    category: "control",
    purpose:
      "Hasilat axın sürətini tənzimləyən əsas idarəetmə elementi. Quyu başı təzyiqini tənzimləyir, formasiyaya geri təzyiqi idarə edir. Adjustable (tənzimlənən) və fixed (sabit) növləri var.",
    facts: [
      "Adjustable choke: operatorun istədiyi axın sürətini tənzimləməsinə imkan verir",
      "Fixed choke: bean adlanan sabit diametrli orifis — daha sadə, etibarlı",
      "Choke ölçüsü 64-cü hissələrlə ölçülür: 16/64\", 32/64\" və s.",
      "Bean size artdıqca axın sürəti artır, quyu başı təzyiqi azalır",
      "Erosion problemi: qum daşıyan axınlarda sürətlə aşınır",
      "Back pressure valve olaraq da istifadə oluna bilir",
    ],
    params: [
      { label: "Növlər", value: "Adjustable / Fixed bean" },
      { label: "Ölçü vahidi", value: "1/64\" (bean)" },
      { label: "Material", value: "Carbide / Stellite" },
    ],
  },
  {
    id: "tubing-hanger",
    num: 4,
    name: "Tubing Hanger",
    az: "Boru Asqısı",
    category: "connection",
    purpose:
      "Hasilat borusunu (tubing string) wellhead-də asqıda saxlayan element. Tubing-in bütün çəkisini daşıyır, quyu daxili basımı sızdırmaz saxlayır. Annulus ilə tubing arasında keçid nöqtəsidir.",
    facts: [
      "Tubing string-in bütün çəkisini (yüzlərlə ton) saxlayır",
      "Metal-to-metal seal: yüksək etibarlılıqlı sızdırmazlıq",
      "Mandrel hanger: ən geniş yayılmış tip",
      "Polished bore receptacle (PBR) ilə birlikdə istifadə olunur",
      "Annulus port-ları: kimyəvi maddə enjeksiyası üçün keçid",
      "Wireline və coiled tubing əməliyyatları üçün keçid imkanı var",
    ],
    params: [
      { label: "Daşıma qabiliyyəti", value: "100 – 1,000 ton" },
      { label: "Seal növü", value: "Metal-to-metal" },
      { label: "Tip", value: "Mandrel / Slip" },
    ],
  },
  {
    id: "casing-head",
    num: 5,
    name: "Casing Head & Spool",
    az: "Kəlbətin Başlığı və Katushka",
    category: "connection",
    purpose:
      "Bütün wellhead sisteminin dayandığı əsas quruluş. Casing string-lərini asqıda saxlayır, BOP və Christmas tree üçün baza təşkil edir. Casing spool-lar müxtəlif diametrli kəlbətinlər arasında keçid edir.",
    facts: [
      "Conductor casing-dən production casing-ə qədər hər kəlbətin öz hanger-ına malikdir",
      "Casing spool: iki müxtəlif ölçülü kəlbətin arasında flanşlı keçid",
      "Wellhead housing: ən xarici element, bütün yükü daşıyır",
      "Lockdown screw-lar: hanger-ı yerinə sabitləyir",
      "Test port: hər flanş birləşməsinin sızdırmazlığını yoxlamaq üçün",
    ],
    params: [
      { label: "Nominal ölçü", value: "13⅝″ – 30\"" },
      { label: "Tipik təzyiq", value: "3,000 – 15,000 psi" },
      { label: "Material", value: "AISI 4130 / 4140 polad" },
    ],
  },
  {
    id: "pressure-gauge",
    num: 6,
    name: "Pressure Gauges & Sensors",
    az: "Təzyiq Ölçənlər",
    category: "monitoring",
    purpose:
      "Tubing başı təzyiqini (THP), annulus təzyiqini (AHP) və flow line təzyiqini real vaxtda izləyən ölçü cihazları. Quyu davranışını anlamaq və anomaliyaları erkən aşkar etmək üçün kritikdir.",
    facts: [
      "THP (Tubing Head Pressure): hasilat axınının başlanğıc nöqtəsindəki təzyiq",
      "CITHP (Closed-in Tubing Head Pressure): quyu bağlandıqda statik təzyiq",
      "Elektronik transmitter-lər SCADA sisteminə real vaxt məlumat göndərir",
      "Anomaliya: THP gözlənilmədən artarsa — quyu başı problemi siqnalı",
      "Annulus pressure monitoring: kəlbətin sızması erkən aşkarlanır",
    ],
    params: [
      { label: "Ölçüm", value: "THP / AHP / FLP" },
      { label: "Dəqiqlik", value: "±0.1%" },
      { label: "Output", value: "4–20 mA / HART / Modbus" },
    ],
  },
  {
    id: "safety-valve",
    num: 7,
    name: "Surface Safety Valve (SSV) & SSSV",
    az: "Səth Təhlükəsizlik Klapanı",
    category: "safety",
    purpose:
      "SSV (Surface Safety Valve) səthdə, SSSV (Subsurface Safety Valve) isə quyu daxilində yerləşir. Hər ikisi fövqəladə hallarda axını avtomatik kəsir. SSSV-nin bağlanması üçün xarici enerji lazım deyil — fail-safe dizayn.",
    facts: [
      "SSSV (Downhole Safety Valve): səthdən 100–300 m aşağıda quraşdırılır",
      "Fail-safe closed: hidravlik basım düşəndə yay gücü ilə bağlanır",
      "Flapper valve: ən geniş yayılmış SSSV tipi",
      "Offshore qurğularda SSSV məcburidir (API 14A)",
      "SSV: səthdə ESD sistemi ilə əlaqəli, avtomatik bağlanma",
      "SSSV-nin sınağı: ildə iki dəfə minimum tələb olunur",
    ],
    params: [
      { label: "SSSV dərinliyi", value: "100 – 300 m" },
      { label: "Mexanizm", value: "Fail-safe / Flapper" },
      { label: "Standart", value: "API 14A / ISO 10432" },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  valve:      "#FF6B2B",
  control:    "#00D4FF",
  safety:     "#F43F5E",
  connection: "#A78BFA",
  monitoring: "#4ADE80",
};

const CATEGORY_LABELS: Record<string, string> = {
  valve:      "Klapan",
  control:    "İdarəetmə",
  safety:     "Təhlükəsizlik",
  connection: "Birləşmə",
  monitoring: "Monitorinq",
};

const HOTSPOTS = [
  { id: "master-valve",   cx: 230, cy: 198 },
  { id: "wing-valve",     cx: 230, cy: 278 },
  { id: "choke",          cx: 230, cy: 340 },
  { id: "tubing-hanger",  cx: 56,  cy: 248 },
  { id: "casing-head",    cx: 56,  cy: 358 },
  { id: "pressure-gauge", cx: 56,  cy: 168 },
  { id: "safety-valve",   cx: 56,  cy: 88  },
];

export default function ChristmasTreePage() {
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
          <span className="text-white/[0.7]">Christmas Tree</span>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-white/[0.06] px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-3">
            <TreePine size={14} className="text-[#A78BFA]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A78BFA]">
              Wellhead Equipment
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold md:text-4xl">
            Christmas Tree —{" "}
            <span className="text-white/[0.45]">Quyu Başlığı</span>
          </h1>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-white/[0.5]">
            Hasilat quyusunun ağzını idarə edən klapan, ölçü və təhlükəsizlik
            sistemi. Adını xarici görünüşündən alıb — şaxta ağacı kimi budaqlı
            quruluş. Hər elementə klikləyib öyrən.
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
                <span className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: CATEGORY_COLORS[key] }} />
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
              width={280}
              height={480}
              xmlns="http://www.w3.org/2000/svg"
              className="block"
            >
              {/* ══════════════════════════════
                  TUBING / FLOW — mərkəz ox
              ══════════════════════════════ */}
              {/* tubing içindən axın */}
              <rect x="132" y="20" width="26" height="460" rx="1"
                fill="#060A14" stroke="#1E293B" strokeWidth="1"/>
              <rect x="137" y="20" width="16" height="460" rx="1"
                fill="#030608"/>

              {/* ══════════════════════════════
                  SSSV — quyu daxili təhlükəsizlik klapanı
              ══════════════════════════════ */}
              {/* SSSV body */}
              <rect x="122" y="30" width="46" height="40" rx="4"
                fill={selected === "safety-valve" ? "#F43F5E18" : "#0F172A"}
                stroke={selected === "safety-valve" ? "#F43F5E" : "#1E293B"}
                strokeWidth={selected === "safety-valve" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("safety-valve")}
              />
              {/* flapper symbol */}
              <path d="M 134 44 Q 145 56 156 44"
                fill="none"
                stroke={selected === "safety-valve" ? "#F43F5E" : "#334155"}
                strokeWidth="2" strokeLinecap="round"
                className="cursor-pointer"
                onClick={() => select("safety-valve")}
              />
              <text x="145" y="62" textAnchor="middle" fontSize="7" fill="#94A3B8" fontFamily="sans-serif">SSSV</text>

              {/* ══════════════════════════════
                  WELLHEAD SPOOL / CASING HEAD
              ══════════════════════════════ */}
              {/* conductor casing */}
              <rect x="74" y="390" width="142" height="20" rx="2"
                fill={selected === "casing-head" ? "#A78BFA18" : "#0F172A"}
                stroke={selected === "casing-head" ? "#A78BFA" : "#1E293B"}
                strokeWidth="1.2"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("casing-head")}
              />
              {/* surface casing */}
              <rect x="90" y="370" width="110" height="24" rx="2"
                fill={selected === "casing-head" ? "#A78BFA14" : "#0A0F1E"}
                stroke={selected === "casing-head" ? "#A78BFA" : "#1E293B"}
                strokeWidth="1"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("casing-head")}
              />
              {/* production casing */}
              <rect x="104" y="352" width="82" height="24" rx="2"
                fill={selected === "casing-head" ? "#A78BFA10" : "#060A14"}
                stroke={selected === "casing-head" ? "#A78BFA" : "#1E293B"}
                strokeWidth="1"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("casing-head")}
              />
              <text x="145" y="408" textAnchor="middle" fontSize="7" fill="#64748B" fontFamily="sans-serif">Casing Head</text>

              {/* ground line */}
              <line x1="40" y1="420" x2="250" y2="420"
                stroke="#1E293B" strokeWidth="2"/>
              <text x="145" y="436" textAnchor="middle" fontSize="7" fill="#334155" fontFamily="sans-serif">Yer səthi</text>

              {/* ══════════════════════════════
                  TUBING HANGER
              ══════════════════════════════ */}
              <rect x="114" y="326" width="62" height="28" rx="3"
                fill={selected === "tubing-hanger" ? "#A78BFA18" : "#0F172A"}
                stroke={selected === "tubing-hanger" ? "#A78BFA" : "#1E293B"}
                strokeWidth={selected === "tubing-hanger" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("tubing-hanger")}
              />
              {/* hanger wedge */}
              <polygon points="126,328 164,328 160,338 130,338"
                fill={selected === "tubing-hanger" ? "#A78BFA30" : "#162032"}
                stroke={selected === "tubing-hanger" ? "#A78BFA60" : "#334155"}
                strokeWidth="0.8"
                className="cursor-pointer"
                onClick={() => select("tubing-hanger")}
              />
              <text x="145" y="348" textAnchor="middle" fontSize="7" fill="#94A3B8" fontFamily="sans-serif">Tubing Hanger</text>

              {/* ══════════════════════════════
                  LOWER MASTER VALVE
              ══════════════════════════════ */}
              <rect x="110" y="280" width="70" height="44" rx="4"
                fill={selected === "master-valve" ? "#FF6B2B18" : "#0F172A"}
                stroke={selected === "master-valve" ? "#FF6B2B" : "#1E293B"}
                strokeWidth={selected === "master-valve" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("master-valve")}
              />
              {/* gate valve symbol */}
              <line x1="132" y1="290" x2="158" y2="314"
                stroke={selected === "master-valve" ? "#FF6B2B80" : "#334155"}
                strokeWidth="1.5"
                className="cursor-pointer"
                onClick={() => select("master-valve")}
              />
              <line x1="158" y1="290" x2="132" y2="314"
                stroke={selected === "master-valve" ? "#FF6B2B80" : "#334155"}
                strokeWidth="1.5"
                className="cursor-pointer"
                onClick={() => select("master-valve")}
              />
              {/* handwheel */}
              <circle cx="145" cy="276" r="8"
                fill="none"
                stroke={selected === "master-valve" ? "#FF6B2B60" : "#334155"}
                strokeWidth="1.5"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("master-valve")}
              />
              <line x1="137" y1="276" x2="153" y2="276"
                stroke={selected === "master-valve" ? "#FF6B2B60" : "#334155"}
                strokeWidth="1"
                className="cursor-pointer"
                onClick={() => select("master-valve")}
              />
              <text x="145" y="315" textAnchor="middle" fontSize="6.5" fill="#94A3B8" fontFamily="sans-serif">Lower Master Valve</text>

              {/* ══════════════════════════════
                  UPPER MASTER VALVE
              ══════════════════════════════ */}
              <rect x="110" y="216" width="70" height="44" rx="4"
                fill={selected === "master-valve" ? "#FF6B2B18" : "#0F172A"}
                stroke={selected === "master-valve" ? "#FF6B2B" : "#1E293B"}
                strokeWidth={selected === "master-valve" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("master-valve")}
              />
              <line x1="132" y1="226" x2="158" y2="250"
                stroke={selected === "master-valve" ? "#FF6B2B80" : "#334155"}
                strokeWidth="1.5"
                className="cursor-pointer"
                onClick={() => select("master-valve")}
              />
              <line x1="158" y1="226" x2="132" y2="250"
                stroke={selected === "master-valve" ? "#FF6B2B80" : "#334155"}
                strokeWidth="1.5"
                className="cursor-pointer"
                onClick={() => select("master-valve")}
              />
              {/* actuator on top */}
              <rect x="138" y="204" width="14" height="14" rx="2"
                fill={selected === "master-valve" ? "#FF6B2B30" : "#162032"}
                stroke={selected === "master-valve" ? "#FF6B2B60" : "#334155"}
                strokeWidth="1"
                className="cursor-pointer"
                onClick={() => select("master-valve")}
              />
              <text x="145" y="252" textAnchor="middle" fontSize="6.5" fill="#94A3B8" fontFamily="sans-serif">Upper Master Valve</text>

              {/* ══════════════════════════════
                  WING VALVES (sol və sağ)
              ══════════════════════════════ */}
              {/* Production wing — sağ */}
              <line x1="180" y1="236" x2="210" y2="236"
                stroke={selected === "wing-valve" ? "#FF6B2B" : "#1E293B"}
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("wing-valve")}
              />
              <rect x="208" y="224" width="32" height="24" rx="3"
                fill={selected === "wing-valve" ? "#FF6B2B18" : "#0F172A"}
                stroke={selected === "wing-valve" ? "#FF6B2B" : "#1E293B"}
                strokeWidth={selected === "wing-valve" ? 1.5 : 1}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("wing-valve")}
              />
              <line x1="212" y1="228" x2="236" y2="244"
                stroke={selected === "wing-valve" ? "#FF6B2B80" : "#334155"}
                strokeWidth="1.2"
                className="cursor-pointer"
                onClick={() => select("wing-valve")}
              />
              <line x1="236" y1="228" x2="212" y2="244"
                stroke={selected === "wing-valve" ? "#FF6B2B80" : "#334155"}
                strokeWidth="1.2"
                className="cursor-pointer"
                onClick={() => select("wing-valve")}
              />
              <text x="224" y="256" textAnchor="middle" fontSize="6.5" fill="#94A3B8" fontFamily="sans-serif">Prod. Wing</text>

              {/* Annulus wing — sol */}
              <line x1="110" y1="236" x2="80" y2="236"
                stroke={selected === "wing-valve" ? "#FF6B2B" : "#1E293B"}
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("wing-valve")}
              />
              <rect x="50" y="224" width="32" height="24" rx="3"
                fill={selected === "wing-valve" ? "#FF6B2B18" : "#0F172A"}
                stroke={selected === "wing-valve" ? "#FF6B2B" : "#1E293B"}
                strokeWidth={selected === "wing-valve" ? 1.5 : 1}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("wing-valve")}
              />
              <line x1="54" y1="228" x2="78" y2="244"
                stroke={selected === "wing-valve" ? "#FF6B2B80" : "#334155"}
                strokeWidth="1.2"
                className="cursor-pointer"
                onClick={() => select("wing-valve")}
              />
              <line x1="78" y1="228" x2="54" y2="244"
                stroke={selected === "wing-valve" ? "#FF6B2B80" : "#334155"}
                strokeWidth="1.2"
                className="cursor-pointer"
                onClick={() => select("wing-valve")}
              />
              <text x="66" y="256" textAnchor="middle" fontSize="6.5" fill="#94A3B8" fontFamily="sans-serif">Ann. Wing</text>

              {/* ══════════════════════════════
                  CHOKE VALVE
              ══════════════════════════════ */}
              {/* flow line → choke */}
              <line x1="240" y1="236" x2="258" y2="236"
                stroke={selected === "choke" ? "#00D4FF" : "#1E293B"}
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("choke")}
              />
              <line x1="258" y1="236" x2="258" y2="310"
                stroke={selected === "choke" ? "#00D4FF" : "#1E293B"}
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("choke")}
              />
              <rect x="234" y="308" width="48" height="36" rx="4"
                fill={selected === "choke" ? "#00D4FF14" : "#0F172A"}
                stroke={selected === "choke" ? "#00D4FF" : "#1E293B"}
                strokeWidth={selected === "choke" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("choke")}
              />
              {/* choke orifis */}
              <circle cx="258" cy="326" r="8"
                fill={selected === "choke" ? "#00D4FF20" : "#162032"}
                stroke={selected === "choke" ? "#00D4FF" : "#334155"}
                strokeWidth="1.2"
                className="cursor-pointer"
                onClick={() => select("choke")}
              />
              <circle cx="258" cy="326" r="3"
                fill={selected === "choke" ? "#00D4FF60" : "#1E293B"}
                className="cursor-pointer"
                onClick={() => select("choke")}
              />
              <text x="258" y="354" textAnchor="middle" fontSize="7" fill="#94A3B8" fontFamily="sans-serif">Choke Valve</text>
              {/* flow line after choke */}
              <line x1="258" y1="344" x2="258" y2="380"
                stroke={selected === "choke" ? "#00D4FF" : "#1E293B"}
                strokeWidth="1.5" strokeDasharray="4,2"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("choke")}
              />
              <text x="264" y="370" fontSize="6.5" fill="#00D4FF" fontFamily="sans-serif" opacity="0.6">to separator</text>

              {/* ══════════════════════════════
                  PRESSURE GAUGE — sol yuxarı
              ══════════════════════════════ */}
              <line x1="110" y1="170" x2="80" y2="170"
                stroke={selected === "pressure-gauge" ? "#4ADE80" : "#1E293B"}
                strokeWidth="1.2"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("pressure-gauge")}
              />
              <circle cx="66" cy="170" r="14"
                fill={selected === "pressure-gauge" ? "#4ADE8014" : "#0F172A"}
                stroke={selected === "pressure-gauge" ? "#4ADE80" : "#1E293B"}
                strokeWidth={selected === "pressure-gauge" ? 1.5 : 1}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("pressure-gauge")}
              />
              {/* gauge needle */}
              <line x1="66" y1="170" x2="72" y2="162"
                stroke={selected === "pressure-gauge" ? "#4ADE80" : "#64748B"}
                strokeWidth="1.5" strokeLinecap="round"
                className="cursor-pointer"
                onClick={() => select("pressure-gauge")}
              />
              <circle cx="66" cy="170" r="2" fill={selected === "pressure-gauge" ? "#4ADE80" : "#334155"}/>
              {/* gauge arc */}
              <path d="M 55 176 A 13 13 0 0 1 77 176"
                fill="none"
                stroke={selected === "pressure-gauge" ? "#4ADE8060" : "#1E293B"}
                strokeWidth="1"/>
              <text x="66" y="192" textAnchor="middle" fontSize="6.5" fill="#94A3B8" fontFamily="sans-serif">THP Gauge</text>

              {/* second gauge — annulus */}
              <line x1="110" y1="155" x2="94" y2="148"
                stroke={selected === "pressure-gauge" ? "#4ADE80" : "#1E293B"}
                strokeWidth="1"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("pressure-gauge")}
              />
              <circle cx="86" cy="144" r="8"
                fill={selected === "pressure-gauge" ? "#4ADE8014" : "#0F172A"}
                stroke={selected === "pressure-gauge" ? "#4ADE80" : "#1E293B"}
                strokeWidth="1"
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("pressure-gauge")}
              />
              <line x1="86" y1="144" x2="90" y2="139"
                stroke={selected === "pressure-gauge" ? "#4ADE80" : "#64748B"}
                strokeWidth="1" strokeLinecap="round"
                className="cursor-pointer"
                onClick={() => select("pressure-gauge")}
              />
              <text x="86" y="158" textAnchor="middle" fontSize="5.5" fill="#64748B" fontFamily="sans-serif">AHP</text>

              {/* ══════════════════════════════
                  SSV — səthdə təhlükəsizlik
              ══════════════════════════════ */}
              <rect x="116" y="120" width="58" height="36" rx="4"
                fill={selected === "safety-valve" ? "#F43F5E18" : "#0F172A"}
                stroke={selected === "safety-valve" ? "#F43F5E" : "#1E293B"}
                strokeWidth={selected === "safety-valve" ? 1.8 : 1.2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => select("safety-valve")}
              />
              {/* ESD actuator */}
              <rect x="130" y="106" width="30" height="16" rx="2"
                fill={selected === "safety-valve" ? "#F43F5E30" : "#162032"}
                stroke={selected === "safety-valve" ? "#F43F5E60" : "#334155"}
                strokeWidth="1"
                className="cursor-pointer"
                onClick={() => select("safety-valve")}
              />
              <text x="145" y="106" textAnchor="middle" fontSize="6" fill="#64748B" fontFamily="sans-serif">ESD</text>
              {/* SSV X symbol */}
              <line x1="126" y1="128" x2="164" y2="148"
                stroke={selected === "safety-valve" ? "#F43F5E80" : "#334155"}
                strokeWidth="1.5"
                className="cursor-pointer"
                onClick={() => select("safety-valve")}
              />
              <line x1="164" y1="128" x2="126" y2="148"
                stroke={selected === "safety-valve" ? "#F43F5E80" : "#334155"}
                strokeWidth="1.5"
                className="cursor-pointer"
                onClick={() => select("safety-valve")}
              />
              <text x="145" y="164" textAnchor="middle" fontSize="7" fill="#94A3B8" fontFamily="sans-serif">SSV</text>

              {/* ══════════════════════════════
                  FLOW DIRECTION ARROWS
              ══════════════════════════════ */}
              {/* tubing axın yuxarı */}
              <polygon points="145,145 141,158 149,158"
                fill="#FF6B2B" opacity="0.4"/>
              {/* wing valve → choke */}
              <polygon points="252,236 242,232 242,240"
                fill="#FF6B2B" opacity="0.4"/>

              {/* ══════════════════════════════
                  HOTSPOTS
              ══════════════════════════════ */}
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
                  <TreePine size={22} className="text-white/[0.3]" />
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