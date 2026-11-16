"use client";

import { useState } from "react";

type EqId = "shaker" | "degasser" | "desander" | "desilter" | "centrifuge" | "pits";

interface Equip {
  id: EqId;
  name: string;
  nameEn: string;
  color: string;
  role: string;
  removes: string;
  watch: string[];
  /** Təxmini hissəcik diapazonu (µm) — yalnız təlim üçün */
  range?: [number, number];
}

const EQUIP: Record<EqId, Equip> = {
  shaker: {
    id: "shaker",
    name: "Shale shaker",
    nameEn: "Shale shaker",
    color: "#FBBF24",
    role: "Quyudan qayıdan məhluldan iri şlamı ayıran birinci və ən vacib mərhələ. Titrəyən ekranlardan məhlul keçir, şlam ekranın üstündə qalıb kənara atılır.",
    removes: "İri şlam və qum. Ekran mesh-indən asılı olaraq təxminən 74 µm və daha iri hissəciklər (incə ekranlarda daha kiçik).",
    watch: ["Ekran yırtıqları və ya tıxanması", "Məhlulun ekranın sonuna qədər çatmaması (axın ekranın tutumunu keçməməlidir)", "Şlamın nəmliyi (OBM-də şlamın yağ miqdarı ətraf mühit baxımından izlənir)"],
    range: [74, 1000],
  },
  degasser: {
    id: "degasser",
    name: "Degasser",
    nameEn: "Degasser",
    color: "#F87171",
    role: "Qazla kəsilmiş (gas-cut) məhluldan qazı ayırır. Vakuum və ya atmosfer tipli ola bilər; ayrılan qaz təhlükəsiz xəttə yönəldilir.",
    removes: "Məhluldakı qaz (hissəcik deyil). Nasos kavitasiyasının qarşısını alır və çəki ölçməsinin dəqiqliyini yaxşılaşdırır.",
    watch: ["Degasser kick-i həll etmir: kick əlamətləri well control prosedurası ilə idarə olunur", "Qaz xəttinin təhlükəsiz yönləndirilməsi", "H₂S ehtimalında xüsusi təhlükəsizlik tədbirləri"],
  },
  desander: {
    id: "desander",
    name: "Desander",
    nameEn: "Desander",
    color: "#00D4FF",
    role: "Böyük (təxminən 6-12 in) hidrosiklonlardan ibarətdir. Mərkəzdənqaçma qüvvəsi ilə qum ölçülü hissəcikləri ayırır, təmiz məhlul yuxarı çıxır.",
    removes: "Qum ölçülü hissəciklər (təxminən 60-74 µm və yuxarı). Desilter-i yükləməmək üçün ondan əvvəl yerləşdirilir.",
    watch: ["Konusların tıxanması", "Giriş təzyiqinin düzgün saxlanması", "Ağır məhlulda baritin itirilməsi riski"],
    range: [60, 1000],
  },
  desilter: {
    id: "desilter",
    name: "Desilter / Mud cleaner",
    nameEn: "Desilter / Mud cleaner",
    color: "#34D399",
    role: "Daha kiçik (təxminən 4 in) hidrosiklonlar qrupu. Mud cleaner isə desilter-in altına incə ekran qoyulmuş variantıdır: ağır məhlulda baritı ekranda saxlayıb qaytarır.",
    removes: "Lil ölçülü hissəciklər (təxminən 15-40 µm kəsmə nöqtəsi, konfiqurasiyadan asılı).",
    watch: ["Konus sayı və axının uyğunluğu", "Ağır məhlulda barit itkisi: mud cleaner istifadə et", "Underflow-un keyfiyyəti"],
    range: [20, 74],
  },
  centrifuge: {
    id: "centrifuge",
    name: "Dekantasiya sentrifuqası",
    nameEn: "Decanting centrifuge",
    color: "#A78BFA",
    role: "Sürətlə fırlanan konik qabda ağır hissəcikləri divara sıxıb ayırır. Çox incə bərk hissəcikləri çıxarmaq və ağır məhlulda baritin regenerasiyası üçün istifadə olunur.",
    removes: "Çox incə hissəciklər (təxminən 2-20 µm). Ağır məhlulda ağır fraksiya (barit) qaytarılır, incə fraksiya atılır.",
    watch: ["Fırlanma sürəti və axının tənzimlənməsi", "Ağır məhlulda rejim seçimi (barit qaytarma)", "Məhlulun özlülüyünün idarə olunması"],
    range: [2, 25],
  },
  pits: {
    id: "pits",
    name: "Aktiv çən və qarışdırma",
    nameEn: "Active pits & mixing",
    color: "#6B82A0",
    role: "Təmizlənmiş məhlul aktiv çənlərə daxil olur. Burada xassələr ölçülür, hopper ilə barit və kimyəvi maddələr əlavə edilir, məhlul qarışdırılır və nasosa verilir.",
    removes: "Bərk hissəciyi ayırmır: məhlulu hazırlayır və tənzimləyir.",
    watch: ["Çən həcmi (PVT) və trendi", "Məhlul xassələrinin ölçülməsi (çəki, funnel, rheology)", "Əlavələrin dozalanması və qarışma"],
  },
};

const SHORT: Record<EqId, string> = { shaker: "Shaker", degasser: "Degasser", desander: "Desander", desilter: "Desilter", centrifuge: "Sentrifuqa", pits: "Çən" };
const ORDER: EqId[] = ["shaker", "degasser", "desander", "desilter", "centrifuge", "pits"];
const BANDS = [
  { name: "Gil", lo: 0.5, hi: 2, c: "#F87171" },
  { name: "Lil", lo: 2, hi: 74, c: "#FBBF24" },
  { name: "Qum", lo: 74, hi: 1000, c: "#34D399" },
];

export default function MudSystemVisual() {
  const [active, setActive] = useState<EqId | null>(null);
  const [flow, setFlow] = useState(true);
  const op = (id: EqId) => (active && active !== id ? 0.2 : 1);
  const pick = (id: EqId) => setActive((a) => (a === id ? null : id));
  const g = (id: EqId) => ({
    onClick: () => pick(id),
    onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && pick(id),
    role: "button" as const,
    tabIndex: 0,
    "aria-label": EQUIP[id].name,
    style: { cursor: "pointer", opacity: op(id), transition: "opacity .2s" },
  });
  const sel = active ? EQUIP[active] : null;

  // hissəcik nərdivanı
  const LX = (um: number) => 40 + ((Math.log10(um) - Math.log10(0.5)) / (Math.log10(1000) - Math.log10(0.5))) * 640;
  const ladder = ORDER.filter((id) => EQUIP[id].range);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {ORDER.map((id) => (
          <button
            key={id}
            onClick={() => pick(id)}
            className="px-3 py-1.5 rounded-lg text-[12px] font-semibold font-['Space_Grotesk'] border transition-colors"
            style={{
              borderColor: active === id ? EQUIP[id].color : "rgba(255,255,255,0.1)",
              background: active === id ? EQUIP[id].color + "22" : "transparent",
              color: active === id ? EQUIP[id].color : "#8DA2BF",
            }}
          >
            {EQUIP[id].name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-6">
        <div>
          <svg viewBox="0 0 720 360" className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="group" aria-label="Məhlul sistemi və bərk hissəciklərə nəzarət sxemi">
            <style>{`@keyframes mudflow{to{stroke-dashoffset:-28}}`}</style>

            {/* quyu → flowline */}
            <text x="16" y="42" fontSize="10" fill="#8DA2BF">Quyudan qayıdan</text>
            <text x="16" y="55" fontSize="10" fill="#8DA2BF">məhlul + şlam</text>
            <path d="M20 70 L60 70 L90 105" fill="none" stroke="#8DA2BF" strokeWidth="2.5" />

            {/* tank sırası */}
            <rect x="80" y="250" width="620" height="70" rx="4" fill="#0A111F" stroke="#2A3A55" strokeWidth="2" />
            {[190, 290, 390, 490, 590].map((x) => (
              <line key={x} x1={x} y1="250" x2={x} y2="320" stroke="#2A3A55" strokeWidth="2" />
            ))}
            {["Qəbul", "Degasser çəni", "Desander çəni", "Desilter çəni", "Aktiv çən", "Sorma çəni"].map((t, i) => (
              <text key={t} x={[135, 240, 340, 440, 540, 645][i]} y="312" fontSize="9" textAnchor="middle" fill="#4A6A8A">{t}</text>
            ))}

            {/* əsas məhlul axını (tanklar daxilində) */}
            <path
              d="M95 285 L690 285"
              fill="none"
              stroke="#00D4FF"
              strokeWidth="3"
              strokeDasharray={flow ? "8 6" : undefined}
              style={flow ? { animation: "mudflow 1.2s linear infinite" } : undefined}
              opacity="0.8"
            />

            {/* SHAKER */}
            <g {...g("shaker")}>
              <polygon points="95,110 175,135 175,170 95,170" fill="#2A2210" stroke={EQUIP.shaker.color} strokeWidth="2" />
              {[128, 142, 156].map((y, i) => (
                <line key={y} x1={105 + i * 3} y1={y} x2={168} y2={y + 6 + i} stroke={EQUIP.shaker.color} strokeWidth="1" opacity="0.7" />
              ))}
              <text x="135" y="100" fontSize="10" textAnchor="middle" fill={EQUIP.shaker.color}>Shale shaker</text>
              <line x1="135" y1="170" x2="135" y2="250" stroke="#00D4FF" strokeWidth="2" />
              <path d="M175 140 L195 150" stroke="#8C6F4A" strokeWidth="3" />
              <text x="198" y="158" fontSize="9" fill="#B49A72">şlam</text>
            </g>

            {/* DEGASSER */}
            <g {...g("degasser")}>
              <rect x="222" y="120" width="36" height="80" rx="8" fill="#2A1010" stroke={EQUIP.degasser.color} strokeWidth="2" />
              <text x="240" y="110" fontSize="10" textAnchor="middle" fill={EQUIP.degasser.color}>Degasser</text>
              <line x1="240" y1="200" x2="240" y2="250" stroke="#00D4FF" strokeWidth="2" />
              <path d="M240 120 L240 92 L275 82" fill="none" stroke="#F87171" strokeWidth="2" strokeDasharray="3 3" />
              <text x="278" y="84" fontSize="9" fill="#F87171">qaz → təhlükəsiz xətt</text>
            </g>

            {/* DESANDER */}
            <g {...g("desander")}>
              <polygon points="312,125 332,125 322,190" fill="#08202A" stroke={EQUIP.desander.color} strokeWidth="2" />
              <polygon points="345,125 365,125 355,190" fill="#08202A" stroke={EQUIP.desander.color} strokeWidth="2" />
              <text x="340" y="110" fontSize="10" textAnchor="middle" fill={EQUIP.desander.color}>Desander</text>
              <line x1="340" y1="125" x2="340" y2="118" stroke={EQUIP.desander.color} />
              <line x1="340" y1="190" x2="340" y2="250" stroke="#00D4FF" strokeWidth="2" />
              <text x="372" y="200" fontSize="9" fill="#B49A72">qum</text>
            </g>

            {/* DESILTER */}
            <g {...g("desilter")}>
              {[0, 1, 2, 3].map((i) => (
                <polygon key={i} points={`${405 + i * 18},130 ${415 + i * 18},130 ${410 + i * 18},180`} fill="#08201A" stroke={EQUIP.desilter.color} strokeWidth="1.8" />
              ))}
              <text x="440" y="110" fontSize="10" textAnchor="middle" fill={EQUIP.desilter.color}>Desilter</text>
              <line x1="440" y1="180" x2="440" y2="250" stroke="#00D4FF" strokeWidth="2" />
              <text x="480" y="192" fontSize="9" fill="#B49A72">lil</text>
            </g>

            {/* CENTRIFUGE */}
            <g {...g("centrifuge")}>
              <path d="M505 150 L560 150 L580 160 L560 170 L505 170 Z" fill="#1A1430" stroke={EQUIP.centrifuge.color} strokeWidth="2" />
              <line x1="515" y1="150" x2="515" y2="170" stroke={EQUIP.centrifuge.color} opacity="0.5" />
              <line x1="530" y1="150" x2="530" y2="170" stroke={EQUIP.centrifuge.color} opacity="0.5" />
              <text x="540" y="140" fontSize="10" textAnchor="middle" fill={EQUIP.centrifuge.color}>Sentrifuqa</text>
              <line x1="530" y1="170" x2="530" y2="250" stroke="#00D4FF" strokeWidth="2" />
              <text x="584" y="178" fontSize="9" fill="#B49A72">incə hissəcik</text>
            </g>

            {/* PITS / HOPPER */}
            <g {...g("pits")}>
              <rect x="592" y="252" width="106" height="66" rx="3" fill="none" stroke={EQUIP.pits.color} strokeWidth="2" />
              <polygon points="600,200 640,200 630,230 610,230" fill="#101A2E" stroke={EQUIP.pits.color} strokeWidth="1.8" />
              <text x="620" y="192" fontSize="9" textAnchor="middle" fill={EQUIP.pits.color}>Hopper (barit, əlavə)</text>
              <line x1="620" y1="230" x2="620" y2="252" stroke={EQUIP.pits.color} strokeWidth="1.5" />
              <text x="690" y="342" fontSize="10" textAnchor="end" fill="#8DA2BF">→ nasoslara və quyuya</text>
            </g>
          </svg>

          <div className="flex items-center justify-between mt-3">
            <p className="text-[11px] text-[#6B82A0] font-['Space_Grotesk']">Avadanlığa klik et. Sxem sadələşdirilmişdir (miqyassız).</p>
            <button onClick={() => setFlow((f) => !f)} className="text-[11px] px-3 py-1 rounded-lg border border-[rgba(255,255,255,0.12)] text-[#8DA2BF] font-['Space_Grotesk']">
              Axın: {flow ? "açıq" : "bağlı"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-5 self-start font-['Space_Grotesk']">
          {!sel ? (
            <div className="text-[13px] text-[#8DA2BF] leading-relaxed">
              <p className="font-semibold text-[#F0F4FF] mb-2">Bərk hissəciklərə nəzarət zənciri</p>
              <p>
                Məhlul quyudan şlamla qayıdır. Təmizlik zənciri iri hissəciklərdən incələrə doğru gedir: <b>shaker → degasser → desander → desilter → sentrifuqa</b>, sonra təmizlənmiş məhlul aktiv çənə daxil olur.
                Sxemdəki hər avadanlığa klik et.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[10px] font-mono tracking-[0.14em] uppercase mb-1" style={{ color: sel.color }}>{sel.nameEn}</p>
              <h3 className="text-[18px] font-bold text-[#F0F4FF] mb-2">{sel.name}</h3>
              <p className="text-[13px] text-[#B7C5DD] leading-relaxed mb-3">{sel.role}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B82A0] mb-1">Nəyi ayırır</p>
              <p className="text-[12px] text-[#9DB0CC] leading-relaxed mb-3">{sel.removes}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B82A0] mb-1.5">Nəyə diqqət</p>
              <ul className="space-y-1.5">
                {sel.watch.map((x) => (
                  <li key={x} className="text-[12px] text-[#9DB0CC] leading-relaxed flex gap-2"><span style={{ color: sel.color }}>•</span>{x}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Hissəcik ölçüsü nərdivanı */}
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
        <h3 className="text-[14px] font-semibold text-[#F0F4FF] mb-1 font-['Space_Grotesk']">Hansı avadanlıq hansı ölçülü hissəciyi tutur?</h3>
        <p className="text-[11px] text-[#6B82A0] mb-3 font-['Space_Grotesk']">Logaritmik şkala (µm). API təsnifatı: gil &lt; 2 µm, lil 2-74 µm, qum &gt; 74 µm. Diapazonlar təxminidir və ekran/konus ölçüsündən asılıdır.</p>
        <svg viewBox="0 0 720 200" className="w-full h-auto" role="img" aria-label="Avadanlıqların təxmini hissəcik ölçüsü diapazonları">
          {BANDS.map((b) => (
            <g key={b.name}>
              <rect x={LX(b.lo)} y="14" width={LX(b.hi) - LX(b.lo)} height="22" fill={b.c} opacity="0.22" />
              <text x={(LX(b.lo) + LX(b.hi)) / 2} y="30" fontSize="11" textAnchor="middle" fill={b.c}>{b.name}</text>
            </g>
          ))}
          {[1, 2, 10, 74, 100, 1000].map((v) => (
            <g key={v}>
              <line x1={LX(v)} x2={LX(v)} y1="40" y2="176" stroke="rgba(255,255,255,0.08)" />
              <text x={LX(v)} y="192" fontSize="10" textAnchor="middle" fill="#6B82A0">{v}</text>
            </g>
          ))}
          {ladder.map((id, i) => {
            const e = EQUIP[id];
            const [lo, hi] = e.range!;
            const y = 50 + i * 30;
            const on = !active || active === id;
            return (
              <g key={id} style={{ opacity: on ? 1 : 0.25, transition: "opacity .2s", cursor: "pointer" }} onClick={() => pick(id)}>
                <rect x={LX(lo)} y={y} width={LX(hi) - LX(lo)} height="18" rx="4" fill={e.color} opacity="0.85" />
                <text x={LX(lo) + 6} y={y + 13} fontSize="10" fill="#080C18" fontWeight="600">{SHORT[id]}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
