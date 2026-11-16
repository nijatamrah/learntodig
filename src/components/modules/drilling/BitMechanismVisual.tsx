"use client";

import { useState } from "react";

type BitId = "roller" | "pdc" | "impreg";

interface BitInfo {
  id: BitId;
  name: string;
  mech: string;
  color: string;
  how: string;
  pros: string[];
  cons: string[];
  apps: string;
  note: string;
}

const BITS: Record<BitId, BitInfo> = {
  roller: {
    id: "roller",
    name: "Roller cone (milled tooth / TCI)",
    mech: "Əzmə və qırma (crushing / chipping)",
    color: "#F59E0B",
    how: "Konuslar fırlandıqca dişlər (milled tooth) və ya tungsten karbid insert-lər (TCI) süxura zərbə ilə batır, çatlar əmələ gətirib qırıntı qopardır. Konusların offset-i əlavə sürüşmə (scraping) təsiri də verir.",
    pros: ["Dəyişkən, bərk və arakəsmə laylı formasiyalarda davamlıdır", "Zərbəyə PDC-dən az həssasdır", "Geniş IADC seçimi: yumşaqdan çox bərkə"],
    cons: ["Hərəkət edən hissələr var: yastıq (bearing) və möhür ömrü məhduddur", "Yumşaq-orta formasiyalarda PDC-dən aşağı ROP", "Konusun itməsi quyuda 'junk' riski yaradır"],
    apps: "Orta-bərk və bərk formasiyalar, arakəsmə laylar. Milled tooth yumşaq, TCI orta-bərk üçün.",
    note: "IADC 3 rəqəmli kod: seriya (formasiya sərtliyi), tip, yastıq/gauge.",
  },
  pdc: {
    id: "pdc",
    name: "PDC (fixed cutter)",
    mech: "Kəsmə (shearing)",
    color: "#00D4FF",
    how: "Blade-lərə bərkidilmiş polikristal almaz kəsicilər süxuru bıçaq kimi qırxır (shearing). Hərəkət edən hissə yoxdur: bit fırlandıqca kəsicilər davamlı kəsir.",
    pros: ["Yumşaq-orta, homogen formasiyalarda yüksək ROP", "Hərəkət edən hissə yoxdur: uzun run mümkündür", "Hidravlik dizayn və blade profili ilə uyğunlaşdırıla bilir"],
    cons: ["Zərbəyə həssasdır: bərk arakəsmə laylarda kəsici çatlaması", "Yüksək abraziv formasiyalarda və yüksək temperaturda köhnəlmə", "Whirl və stick-slip rəqslərinə meyillidir", "Yapışqan gillərdə bit balling riski"],
    apps: "Homogen şeyl, qumdaşı, karbonat; motorla və ya rotary steerable ilə yüksək sürətli qazma.",
    note: "Fixed-cutter IADC kodu 4 simvoldur: gövdə/kəsici tipi, profil, hidravlik dizayn, kəsici ölçüsü və sıxlığı.",
  },
  impreg: {
    id: "impreg",
    name: "Impregnated / almaz",
    mech: "Aşındırma (grinding / abrasion)",
    color: "#A78BFA",
    how: "Matrisa daxilinə qatılmış incə almaz hissəcikləri süxuru aşındırır. Matris tədricən aşınır və yeni almaz hissəcikləri açılır (self-sharpening).",
    pros: ["Çox bərk, abraziv formasiyalarda uzun ömür", "Turbodrill/yüksək rpm ilə uyğundur", "Zərbəyə nisbətən davamlı"],
    cons: ["Aşağı ROP (kiçik hissəciklər aşındırma ilə kəsir)", "Yüksək RPM və uyğun hidravlika tələb edir", "Yüksək qiymət"],
    apps: "Çox bərk, abraziv süxurlar; uzun interval, yüksək rpm (turbine) şəraiti.",
    note: "Kəsmə mexanizmi PDC-dən fərqli olaraq aşınmadır, ona görə ROP-un artırılması rpm ilə bağlıdır.",
  },
};

const ORDER: BitId[] = ["roller", "pdc", "impreg"];

function bez(p0: [number, number], c: [number, number], p1: [number, number], t: number): [number, number] {
  const u = 1 - t;
  return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]];
}

function BitFace({ id, color, size }: { id: BitId; color: string; size: number }) {
  const cx = 90;
  const cy = 90;
  const R = 78;
  return (
    <svg viewBox="0 0 180 180" width={size} height={size} role="img" aria-label="Bit-in üzü (yuxarıdan görünüş)">
      <circle cx={cx} cy={cy} r={R} fill="#101A2E" stroke="#5B7092" strokeWidth="3" />
      {id === "roller" &&
        [90, 210, 330].map((deg) => {
          const a = (deg * Math.PI) / 180;
          const ex = cx + 34 * Math.cos(a);
          const ey = cy - 34 * Math.sin(a);
          return (
            <g key={deg}>
              <ellipse cx={ex} cy={ey} rx="28" ry="34" transform={`rotate(${90 - deg + 90} ${ex} ${ey})`} fill="#2A1E08" stroke={color} strokeWidth="2" />
              {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                const ang = (i / 7) * Math.PI * 2;
                return <circle key={i} cx={ex + 17 * Math.cos(ang)} cy={ey + 22 * Math.sin(ang)} r="3.2" fill={color} />;
              })}
              <circle cx={ex} cy={ey} r="4" fill={color} opacity="0.5" />
            </g>
          );
        })}
      {id === "roller" && [30, 150, 270].map((deg) => <circle key={deg} cx={cx + 50 * Math.cos((deg * Math.PI) / 180)} cy={cy - 50 * Math.sin((deg * Math.PI) / 180)} r="5" fill="#0A111F" stroke="#6B82A0" />)}

      {id === "pdc" &&
        [0, 72, 144, 216, 288].map((deg) => {
          const a0 = (deg * Math.PI) / 180;
          const p0: [number, number] = [cx + 12 * Math.cos(a0), cy - 12 * Math.sin(a0)];
          const p1: [number, number] = [cx + (R - 4) * Math.cos(a0 + 0.9), cy - (R - 4) * Math.sin(a0 + 0.9)];
          const c: [number, number] = [cx + 44 * Math.cos(a0 + 0.1), cy - 44 * Math.sin(a0 + 0.1)];
          return (
            <g key={deg}>
              <path d={`M ${p0[0]} ${p0[1]} Q ${c[0]} ${c[1]} ${p1[0]} ${p1[1]}`} fill="none" stroke="#12384A" strokeWidth="14" strokeLinecap="round" />
              <path d={`M ${p0[0]} ${p0[1]} Q ${c[0]} ${c[1]} ${p1[0]} ${p1[1]}`} fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
              {[0.2, 0.35, 0.5, 0.65, 0.8, 0.95].map((t) => {
                const [x, y] = bez(p0, c, p1, t);
                return <circle key={t} cx={x} cy={y} r={t > 0.8 ? 4.4 : 3.8} fill="#E8F7FF" stroke={color} strokeWidth="1.2" />;
              })}
            </g>
          );
        })}
      {id === "pdc" && [36, 108, 180, 252, 324].map((deg) => <circle key={deg} cx={cx + 46 * Math.cos((deg * Math.PI) / 180)} cy={cy - 46 * Math.sin((deg * Math.PI) / 180)} r="4.5" fill="#0A111F" stroke="#6B82A0" />)}

      {id === "impreg" &&
        Array.from({ length: 8 }, (_, i) => (i * 45 * Math.PI) / 180).map((a, i) => (
          <g key={i}>
            <line x1={cx + 16 * Math.cos(a)} y1={cy - 16 * Math.sin(a)} x2={cx + (R - 5) * Math.cos(a)} y2={cy - (R - 5) * Math.sin(a)} stroke="#2C2250" strokeWidth="13" strokeLinecap="round" />
            {Array.from({ length: 12 }, (_, j) => (
              <circle key={j} cx={cx + (22 + j * 4.2) * Math.cos(a) + ((j * 7) % 5) - 2} cy={cy - (22 + j * 4.2) * Math.sin(a) + ((j * 3) % 5) - 2} r="1.1" fill={color} />
            ))}
          </g>
        ))}
      <circle cx={cx} cy={cy} r="6" fill="#0A111F" stroke="#6B82A0" />
    </svg>
  );
}

function Mechanism({ id, color }: { id: BitId; color: string }) {
  return (
    <svg viewBox="0 0 340 200" className="w-full h-auto rounded-xl bg-[#080C18] border border-[rgba(255,255,255,0.06)]" role="img" aria-label="Kəsmə mexanizminin animasiyası">
      <style>{`
        @keyframes pdcmove{from{transform:translateX(0)}to{transform:translateX(160px)}}
        @keyframes groove{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes toothdown{0%,100%{transform:translateY(0)}45%,55%{transform:translateY(24px)}}
        @keyframes crack{0%,40%{opacity:0}50%,80%{opacity:1}100%{opacity:0}}
        @keyframes chipfly{0%,48%{opacity:0;transform:translate(0,0)}60%{opacity:1}100%{opacity:0;transform:translate(26px,-26px)}}
        @keyframes grind{0%{transform:translateX(0)}50%{transform:translateX(30px)}100%{transform:translateX(0)}}
        @keyframes spark{0%{opacity:0;transform:translate(0,0)}30%{opacity:1}100%{opacity:0;transform:translate(14px,-22px)}}
      `}</style>
      <rect x="0" y="120" width="340" height="80" fill="#3A3040" />
      {[140, 160, 180].map((y) => <line key={y} x1="0" x2="340" y1={y} y2={y} stroke="#2E2634" />)}
      <line x1="0" y1="120" x2="340" y2="120" stroke="#6B5A78" strokeWidth="2" />

      {id === "pdc" && (
        <g>
          <rect x="40" y="120" width="160" height="10" fill="#241C2A" style={{ transformBox: "fill-box", transformOrigin: "left center", animation: "groove 3.2s linear infinite" }} />
          <g style={{ animation: "pdcmove 3.2s linear infinite" }}>
            <rect x="40" y="70" width="30" height="62" rx="4" fill="#0E3340" stroke={color} strokeWidth="2" />
            <rect x="62" y="80" width="8" height="48" fill="#E8F7FF" />
            <path d="M40 124 q-18 -6 -16 -22 q4 -10 14 -4" fill="none" stroke="#9A86AA" strokeWidth="4" strokeLinecap="round" />
            <text x="48" y="62" fontSize="10" fill={color}>PDC kəsicisi</text>
            <line x1="76" y1="55" x2="106" y2="55" stroke={color} />
            <polygon points="106,55 99,51 99,59" fill={color} />
          </g>
          <text x="10" y="192" fontSize="10" fill="#8DA2BF">Süxur kəsilir (shearing), qırıntı ardıcıl uzanır</text>
        </g>
      )}
      {id === "roller" && (
        <g>
          <g style={{ animation: "toothdown 1.8s ease-in-out infinite" }}>
            <polygon points="150,70 190,70 170,118" fill={color} stroke="#7A4A06" strokeWidth="2" />
            <rect x="140" y="40" width="60" height="30" rx="4" fill="#2A1E08" stroke={color} strokeWidth="2" />
            <text x="170" y="60" fontSize="10" textAnchor="middle" fill={color}>diş / insert</text>
          </g>
          <g style={{ animation: "crack 1.8s ease-in-out infinite" }}>
            <line x1="170" y1="126" x2="150" y2="152" stroke="#D8C9E4" strokeWidth="2" />
            <line x1="170" y1="126" x2="190" y2="152" stroke="#D8C9E4" strokeWidth="2" />
            <line x1="170" y1="126" x2="170" y2="158" stroke="#D8C9E4" strokeWidth="2" />
          </g>
          <g style={{ animation: "chipfly 1.8s ease-in-out infinite" }}>
            <polygon points="196,118 208,112 204,124" fill="#9A86AA" />
          </g>
          <g style={{ animation: "chipfly 1.8s ease-in-out infinite", transform: "scaleX(-1)", transformOrigin: "170px 120px" }}>
            <polygon points="196,118 208,112 204,124" fill="#9A86AA" />
          </g>
          <text x="10" y="192" fontSize="10" fill="#8DA2BF">Diş batır, çat yaradır, qırıntı qopur (crushing / chipping)</text>
        </g>
      )}
      {id === "impreg" && (
        <g>
          <g style={{ animation: "grind 1.4s linear infinite" }}>
            <rect x="110" y="86" width="120" height="34" rx="4" fill="#1C1630" stroke={color} strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <circle key={i} cx={122 + i * 14} cy={112 + (i % 2) * 3} r="2.2" fill={color} />)}
            <text x="170" y="76" fontSize="10" textAnchor="middle" fill={color}>almaz matrisa</text>
          </g>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={130 + i * 22} cy="118" r="2" fill="#9A86AA" style={{ animation: `spark 1.4s ease-out ${i * 0.25}s infinite` }} />
          ))}
          <text x="10" y="192" fontSize="10" fill="#8DA2BF">Almaz hissəcikləri süxuru aşındırır (grinding)</text>
        </g>
      )}
    </svg>
  );
}

const SELECTION = [
  ["Yumşaq, homogen gil/qum", "PDC (yüksək ROP); alternativ: milled tooth"],
  ["Orta sərtlikli şeyl, karbonat", "PDC və ya TCI roller cone"],
  ["Bərk, arakəsmə laylı (şeyl + sərt layların növbələşməsi)", "TCI roller cone və ya zərbəyə davamlı PDC dizaynı"],
  ["Çox bərk, abraziv", "TCI roller cone, impregnated (turbodrill ilə)"],
  ["Yapışqan gil (balling riski)", "Hidravlikası güclü PDC və ya roller cone, məhlul inhibisiyası"],
];

export default function BitMechanismVisual() {
  const [sel, setSel] = useState<BitId>("pdc");
  const b = BITS[sel];

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-3">
        {ORDER.map((id) => (
          <button
            key={id}
            onClick={() => setSel(id)}
            className="rounded-2xl border p-3 text-left transition-colors"
            style={{ borderColor: sel === id ? BITS[id].color : "rgba(255,255,255,0.07)", background: sel === id ? BITS[id].color + "14" : "#0D1525" }}
          >
            <div className="flex justify-center"><BitFace id={id} color={BITS[id].color} size={140} /></div>
            <p className="text-[12px] font-semibold mt-2 font-['Space_Grotesk']" style={{ color: BITS[id].color }}>{BITS[id].name}</p>
            <p className="text-[11px] text-[#8DA2BF] font-['Space_Grotesk']">{BITS[id].mech}</p>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B82A0] mb-2 font-['Space_Grotesk']">Kəsmə mexanizmi (animasiya)</p>
          <Mechanism id={sel} color={b.color} />
          <p className="text-[11px] text-[#6B82A0] mt-2 font-['Space_Grotesk']">Sxematik təsvirdir, miqyassız. Real süxur dağılması qeyri-xəttidir və formasiya xassələrindən asılıdır.</p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-5 font-['Space_Grotesk']">
          <p className="text-[10px] font-mono tracking-[0.14em] uppercase mb-1" style={{ color: b.color }}>{b.mech}</p>
          <h3 className="text-[18px] font-bold text-[#F0F4FF] mb-2">{b.name}</h3>
          <p className="text-[13px] text-[#B7C5DD] leading-relaxed mb-3">{b.how}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#34D399] mb-1.5">Üstünlüklər</p>
              <ul className="space-y-1">{b.pros.map((x) => <li key={x} className="text-[12px] text-[#9DB0CC] flex gap-2"><span className="text-[#34D399]">+</span>{x}</li>)}</ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#F87171] mb-1.5">Məhdudiyyətlər</p>
              <ul className="space-y-1">{b.cons.map((x) => <li key={x} className="text-[12px] text-[#9DB0CC] flex gap-2"><span className="text-[#F87171]">−</span>{x}</li>)}</ul>
            </div>
          </div>
          <p className="text-[12px] text-[#9DB0CC]"><b className="text-[#F0F4FF]">Tipik tətbiq: </b>{b.apps}</p>
          <p className="text-[11px] text-[#6B82A0] mt-2">{b.note}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
        <p className="text-[13px] font-semibold text-[#F0F4FF] mb-2">Bit seçimi: ilkin istiqamət</p>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
          {SELECTION.map(([f, t]) => (
            <div key={f} className="text-[12px] flex gap-2"><span className="text-[#FBBF24]">→</span><span><b className="text-[#D5DEF0]">{f}:</b> <span className="text-[#9DB0CC]">{t}</span></span></div>
          ))}
        </div>
        <p className="text-[11px] text-[#6B82A0] mt-3">Real seçim offset quyu bit qeydləri, süxurun UCS və abraziv xassələri, BHA (motor/RSS), hidravlika və xərc analizi ilə aparılır.</p>
      </div>
    </div>
  );
}
