"use client";

import { useState } from "react";

const ACCENT = "#FBBF24";
const TD = 12500;
const W = 720;
const H = 560;
const TOP = 40;
const BOT = 520;
const CX = 250; // quyunun mərkəzi

interface Str {
  id: string;
  name: string;
  nameEn: string;
  od: number;
  hole: number;
  shoe: number;
  top: number; // casing/liner üstü
  toc: number; // sement üstü
  color: string;
  role: string;
  purpose: string[];
  risk: string;
}

const STRINGS: Str[] = [
  {
    id: "cond",
    name: "Conductor",
    nameEn: "Conductor",
    od: 20,
    hole: 26,
    shoe: 300,
    top: 0,
    toc: 0,
    color: "#94A3B8",
    role: "Quyunun ağzını bərkidir",
    purpose: ["Dayaz çöküntünün yuyulmasının qarşısını alır", "Məhlulu flowline-a yönəldir", "Sonrakı kəmərlər üçün dayaq verir"],
    risk: "Zəif bağlantı olarsa quyunun ağzı oturur və ya yuyulur.",
  },
  {
    id: "surf",
    name: "Surface casing",
    nameEn: "Surface",
    od: 13.375,
    hole: 17.5,
    shoe: 4000,
    top: 0,
    toc: 0,
    color: "#38BDF8",
    role: "Şirin su və BOP dayağı",
    purpose: ["Şirin su laylarını örtür", "BOP bu kəmərə bağlanır", "Shoe-da çat qradiyenti kick-i bağlamağa kifayət edir"],
    risk: "Sement səthə qədər çıxmasa (TOC aşağıdır) şirin su qorunmur və casing sallanır.",
  },
  {
    id: "int",
    name: "Intermediate casing",
    nameEn: "Intermediate",
    od: 9.625,
    hole: 12.25,
    shoe: 9000,
    top: 0,
    toc: 3500,
    color: "#34D399",
    role: "Çətin formasiyaları izolyasiya edir",
    purpose: ["Anormal təzyiqli zonanı və ya zəif layı örtür", "Daha yüksək məhlul çəkisinə imkan verir", "Mud window-u uzatmaq üçün"],
    risk: "Shoe-da zəif sement və ya aşağı çat qradiyenti sonrakı bölmədə itkili sirkulyasiyaya səbəb ola bilər.",
  },
  {
    id: "prod",
    name: "Production casing / liner",
    nameEn: "Production",
    od: 7,
    hole: 8.5,
    shoe: 12500,
    top: 8500,
    toc: 8500,
    color: "#F472B6",
    role: "Məhsuldar zonaya qədər",
    purpose: ["Qaz/neft axını üçün yol və təzyiq barierı", "Tamamlama avadanlığı burada", "Liner variantında yuxarıdan asılır, qənaət edir"],
    risk: "Liner top-da zəif sement (overlap) təzyiqin sızmasına gətirir. Korroziya və uzunmüddətli yük nəzərə alınmalıdır.",
  },
];

export default function CasingProgramVisual() {
  const [sel, setSel] = useState("int");
  const [liner, setLiner] = useState(true);
  const s = STRINGS.find((x) => x.id === sel)!;

  const y = (d: number) => TOP + (d / TD) * (BOT - TOP);
  // sxematik en (real miqyas deyil): hər kəmər üçün bir pillə
  const hw = (id: string, kind: "hole" | "casing") => {
    const base = { cond: 74, surf: 56, int: 40, prod: 26 }[id as "cond"];
    return kind === "hole" ? base : base - 6;
  };

  const strings = STRINGS.map((x) => (x.id === "prod" && !liner ? { ...x, top: 0, toc: 6500 } : x));

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.5fr)_340px] gap-6">
      <div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="img" aria-label="Casing proqramı: kəmərlərin quyuda yerləşməsi">
          {/* formasiya laylari */}
          {[
            { f: 0, t: 1500, c: "#1A2538", n: "Dayaz çöküntü / şirin su" },
            { f: 1500, t: 4000, c: "#1E2B3F", n: "Qumdaşı və gil" },
            { f: 4000, t: 9000, c: "#22304A", n: "Gil / zəif layı" },
            { f: 9000, t: 12500, c: "#2B2438", n: "Anormal təzyiq / məhsuldar" },
          ].map((l) => (
            <g key={l.n}>
              <rect x="20" y={y(l.f)} width="460" height={y(l.t) - y(l.f)} fill={l.c} opacity="0.75" />
              <text x="26" y={y(l.f) + 14} fontSize="9" fill="#6B82A0">{l.n}</text>
            </g>
          ))}

          {/* quyu: pilləli açıq quyu (yuxarıdan aşağıya) */}
          {strings.map((x, i) => {
            const nextShoe = i === 0 ? 0 : strings[i - 1].shoe;
            const y0 = y(nextShoe);
            const y1 = y(x.shoe);
            const hwv = hw(x.id, "hole");
            const cwv = hw(x.id, "casing");
            const active = x.id === sel;
            const cTop = y(x.top);
            const tocY = y(x.toc);
            return (
              <g key={x.id}>
                {/* açıq quyu */}
                <rect x={CX - hwv} y={y0} width={hwv * 2} height={y1 - y0} fill="#080C18" />
                {/* sement (casing arxası) */}
                <rect x={CX - hwv} y={Math.max(tocY, cTop)} width={hwv - cwv} height={Math.max(0, y1 - Math.max(tocY, cTop))} fill="#9CA3AF" opacity="0.45" />
                <rect x={CX + cwv} y={Math.max(tocY, cTop)} width={hwv - cwv} height={Math.max(0, y1 - Math.max(tocY, cTop))} fill="#9CA3AF" opacity="0.45" />
                {/* casing */}
                <rect x={CX - cwv} y={cTop} width="5" height={y1 - cTop} fill={x.color} opacity={active ? 1 : 0.6} />
                <rect x={CX + cwv - 5} y={cTop} width="5" height={y1 - cTop} fill={x.color} opacity={active ? 1 : 0.6} />
                {/* shoe */}
                <polygon points={`${CX - cwv},${y1} ${CX - cwv + 10},${y1} ${CX - cwv},${y1 - 10}`} fill={x.color} />
                <polygon points={`${CX + cwv},${y1} ${CX + cwv - 10},${y1} ${CX + cwv},${y1 - 10}`} fill={x.color} />
                {/* etiket */}
                <line x1={CX + hwv + 2} y1={y1} x2={W - 220} y2={y1} stroke={x.color} strokeDasharray="3 4" opacity="0.7" />
                <text x={W - 214} y={y1 + 4} fontSize="11" fill={x.color} fontWeight={active ? 700 : 500}>
                  {x.od} in · {x.shoe.toLocaleString("en-US")} ft
                </text>
                {/* klik sahəsi */}
                <rect x={CX - hwv} y={y0} width={hwv * 2} height={y1 - y0} fill="transparent" style={{ cursor: "pointer" }} onClick={() => setSel(x.id)} />
              </g>
            );
          })}

          {/* liner overlap işarəsi */}
          {liner && (
            <g>
              <rect x={CX - 36} y={y(8500)} width="72" height={y(9000) - y(8500)} fill="none" stroke="#F472B6" strokeDasharray="3 3" />
              <text x={CX + 44} y={y(8750) + 3} fontSize="9" fill="#F9A8D4">liner overlap</text>
            </g>
          )}

          {/* TD */}
          <line x1={CX - 30} x2={CX + 30} y1={y(TD)} y2={y(TD)} stroke="#F87171" strokeWidth="2" />
          <text x={CX + 36} y={y(TD) + 4} fontSize="10" fill="#F87171">TD {TD.toLocaleString("en-US")} ft</text>

          {/* dərinlik oxu */}
          {[0, 2000, 4000, 6000, 8000, 10000, 12000].map((d) => (
            <g key={d}>
              <line x1="20" x2="30" y1={y(d)} y2={y(d)} stroke="#4A6A8A" />
              <text x="34" y={y(d) + 3} fontSize="9" fill="#6B82A0" style={{ display: d === 0 ? "none" : undefined }}>{d.toLocaleString("en-US")}</text>
            </g>
          ))}
          <text x="20" y="22" fontSize="10" fill="#8DA2BF">Dərinlik, ft (TVD) · sxematik, miqyassız</text>
          <text x={W - 214} y="22" fontSize="10" fill="#8DA2BF">Shoe</text>
        </svg>
        <p className="text-[11px] text-[#6B82A0] mt-2 leading-relaxed font-['Space_Grotesk']">
          Sxem sadələşdirilmişdir: kəmərlərin eni miqyassızdır. Boz zolaq casing arxasındakı sementdir. Kəmərə klik edib məqsədini oxu. Nümunə proqram sonrakı hesablamalarla uyğundur (shoe 9,000 ft, 9-5/8 in, əvvəlki shoe 4,000 ft).
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Kəmər seç</p>
          <div className="flex flex-wrap gap-2">
            {STRINGS.map((x) => (
              <button
                key={x.id}
                onClick={() => setSel(x.id)}
                className="px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-colors"
                style={{
                  borderColor: sel === x.id ? x.color : "rgba(255,255,255,0.1)",
                  background: sel === x.id ? x.color + "22" : "transparent",
                  color: sel === x.id ? x.color : "#8DA2BF",
                }}
              >
                {x.nameEn}
              </button>
            ))}
          </div>
          <h3 className="text-[16px] font-bold mt-4" style={{ color: s.color }}>{s.name}</h3>
          <p className="text-[12px] text-[#9DB0CC] mb-3">{s.role}</p>
          <div className="grid grid-cols-2 gap-2 text-[12px] mb-3">
            {[
              ["OD", `${s.od} in`],
              ["Quyu", `${s.hole} in`],
              ["Shoe", `${s.shoe.toLocaleString("en-US")} ft`],
              ["TOC", s.toc === 0 && s.id !== "cond" ? "Səth" : s.toc === 0 ? "Səth" : `${s.toc.toLocaleString("en-US")} ft`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-[#101A2E] px-3 py-2">
                <p className="text-[10px] text-[#6B82A0]">{k}</p>
                <p className="font-mono font-semibold text-[#F0F4FF]">{v}</p>
              </div>
            ))}
          </div>
          <ul className="space-y-1.5 text-[12px] text-[#9DB0CC] list-disc pl-4">
            {s.purpose.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <p className="mt-3 rounded-lg px-3 py-2 text-[12px] bg-[#F8717112] text-[#FCA5A5]"><b>Risk: </b>{s.risk}</p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Production variantı</p>
          <div className="flex rounded-xl p-1 border border-[rgba(255,255,255,0.08)] bg-[#080C18]">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                onClick={() => setLiner(v)}
                className="flex-1 py-1.5 rounded-lg text-[12px] font-semibold"
                style={liner === v ? { background: ACCENT, color: "#080C18" } : { color: "#6B82A0" }}
              >
                {v ? "Liner" : "Tam string"}
              </button>
            ))}
          </div>
          <p className="text-[12px] text-[#9DB0CC] mt-3 leading-relaxed">
            {liner
              ? "Liner 8,500 ft-dən asılır (500 ft overlap). Az polad, aşağı xərc, lakin liner top-da sızdırmazlıq (liner top test) əlavə risk yaradır."
              : "Tam string səthə qədər çatır. Tək kəmərdir, yüksək barier etibarlılığı verir, lakin daha çox polad və daha uzun sement sütunu tələb edir."}
          </p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>Hər kəmərin shoe diametrini növbəti quyu ölçüsü ilə müqayisə et: teleskop necə daralır?</li>
            <li>Liner və tam string arasında keçid et: sement sütunu və TOC necə dəyişir?</li>
            <li>Surface casing-in niyə səthə qədər sementlənməlidir?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
