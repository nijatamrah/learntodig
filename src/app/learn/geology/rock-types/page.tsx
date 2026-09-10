"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const rockTypes = [
  { type: "Maqmatik", origin: "Əridilmiş magmanın soyuması", role: "Adətən kollektor deyil (məsaməsiz), amma bəzən çatlı zonalarda kollektor ola bilər" },
  { type: "Çökmə", origin: "Üzvi/qeyri-üzvi materialın çökməsi və sıxılması", role: "Neft-qazın 99%-i çökmə süxurlarda tapılır — həm source, həm reservoir, həm seal" },
  { type: "Metamorfik", origin: "Yüksək təzyiq/temperaturda mövcud süxurun dəyişməsi", role: "Nadir hallarda kollektor (çatlı metamorfik süxurlar), adətən karbohidrogen üçün əhəmiyyətsiz" },
];

const clasticVsChemical = [
  { name: "Qumdaşı (Sandstone)", formation: "Qum dənələrinin sementləşməsi", note: "Yaxşı məsaməlilik/keçiricilik — əla kollektor" },
  { name: "Əhəngdaşı (Limestone)", formation: "Karbonat (əsasən bioloji mənşəli) çökmə", note: "Karbonat kollektorlar — Yaxın Şərqin əksər nəhəng yataqları" },
  { name: "Gil daşı (Shale)", formation: "Çox incə gil hissəciklərinin çökməsi", note: "Aşağı keçiricilik — həm source rock, həm seal rock kimi işləyir" },
];

export default function RockTypesLesson() {
  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#080C18" }}>
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: PATH_COLOR, opacity: 0.14, filter: "blur(120px)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.08,
          backgroundImage: `
            linear-gradient(#F0F4FF 1px, transparent 1px),
            linear-gradient(90deg, #F0F4FF 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 100% 60% at 50% 0%, black 40%, transparent 90%)",
        }}
      />

      <div className="max-w-2xl mx-auto px-6 py-12 relative z-10">

        <Link
          href="/learn/geology"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6"
          style={{ color: "#3D5570" }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Geologiya
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
              style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
            >
              1.1.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Əsaslar
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Süxur Növləri
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə bu mövzu vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Əvvəlki dərsdə gördük ki, neft/qaz üzvi mənşəlidir. Amma bu proses yalnız
              müəyyən süxur növlərində baş verə bilər. Bir geoloqun ilk işi ərazidəki süxurların
              hansı tipə aid olduğunu müəyyən etməkdir — çünki bu, kəşfiyyat strategiyasını
              tamamilə dəyişir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Üç əsas süxur növü
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Yer qabığındakı bütün süxurlar formalaşma prosesinə görə üç qrupa bölünür:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Növ</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Mənşə</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Neft-qaz üçün rolu</th>
                  </tr>
                </thead>
                <tbody>
                  {rockTypes.map((r) => (
                    <tr key={r.type} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{r.type}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{r.origin}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{r.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="mt-3 rounded-xl px-4 py-3 text-[13px] leading-[1.6]"
              style={{ background: PATH_COLOR + "14", border: `1px solid ${PATH_COLOR}33`, color: "#D6E0F0" }}
            >
              Bu kursda əsasən <strong>çökmə süxurlara</strong> fokuslanacağıq — neft-qaz geologiyasının
              demək olar ki, hamısı bu qrupla bağlıdır.
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Çökmə süxurların formalaşması
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>
                  Aşınma və eroziya (Weathering & Erosion)
                </p>
                <p className="text-[14px] leading-[1.75]">
                  Mövcud süxurlar (hər hansı növ) hava, su, temperatur dəyişikliyi təsirilə kiçik
                  hissəciklərə parçalanır.
                </p>
              </div>
              <div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>
                  Daşınma (Transportation)
                </p>
                <p className="text-[14px] leading-[1.75]">
                  Hissəciklər çay, külək və ya buzlaqlarla daşınır — bu proses onları ölçüsünə görə
                  "sortlaşdırır" (böyük dənələr yaxında, kiçiklər uzaqda çökür).
                </p>
              </div>
              <div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>
                  Çökmə (Deposition)
                </p>
                <p className="text-[14px] leading-[1.75]">
                  Hissəciklər enerjinin azaldığı yerdə (dəniz dibi, çay deltası, göl) çökür və qat-qat yığılır.
                </p>
              </div>
              <div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>
                  Litifikasiya (Lithification)
                </p>
                <p className="text-[14px] leading-[1.75]">
                  Üst qatların təzyiqi altında sıxılma (compaction) və mineral sementləşmə
                  (cementation) nəticəsində boş çöküntü bərk süxura çevrilir.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Klastik və kimyəvi çökmə süxurlar
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Neft-qaz geologiyasında ən çox rast gəlinən üç çökmə süxur növü:
            </p>
            <div className="space-y-3">
              {clasticVsChemical.map((c) => (
                <div key={c.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{c.name}</p>
                  <p className="text-[13px] mb-1" style={{ color: "#6B82A0" }}>{c.formation}</p>
                  <p className="text-[13.5px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{c.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Məsaməlilik anlayışı (ilkin tanışlıq)
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Süxurun kollektor kimi işləyə bilməsi üçün onun daxilində boşluqlar (məsamələr)
              olmalıdır ki, neft/qaz orada yığıla bilsin. Bu boşluqların ümumi həcmə nisbətinə{" "}
              <strong>məsaməlilik (porosity)</strong> deyilir. (Bu mövzunu 1.1.4-də — Reservoir Rock
              dərsində — ətraflı işləyəcəyik, indi sadəcə formulanı tanıyaq.)
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: bir qumdaşı nümunəsinin ümumi (bulk) həcmi 100 cm³, dənələrin real həcmi 78 cm³
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                φ = (V_bulk − V_grain) / V_bulk × 100
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>φ = (100 − 78) / 100 × 100 = <span style={{ color: PATH_COLOR }}>22%</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu nümunənin məsaməliliyi 22%-dir — yaxşı keyfiyyətli kollektor üçün tipik
                dəyər (adətən 15–30% aralığı yaxşı hesab olunur).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Azəri-Çıraq-Günəşli (ACG), Azərbaycan", text: "Əsas kollektor — Balaxanı və Pereriv laylarının qumdaşları (Pliosen dövrü). Klassik klastik kollektor nümunəsidir." },
                { name: "Ghawar, Səudiyyə Ərəbistanı", text: "Arab-D formasiyası — karbonat (əhəngdaşı) kollektordur. Dünyanın ən böyük karbonat kollektor nümunələrindən biri." },
                { name: "Şimal dənizi (North Sea)", text: "Brent qrupu qumdaşları — yüksək keyfiyyətli klastik kollektorlar, Avropanın əsas neft-qaz mənbələrindən." },
              ].map((f) => (
                <div key={f.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{f.name}</p>
                  <p className="text-[13.5px] leading-[1.7]" style={{ color: "#9FAEC4" }}>{f.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: PATH_COLOR + "10", border: `1px solid ${PATH_COLOR}33` }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: PATH_COLOR }}>
              Əsas nöqtələr
            </h2>
            <ul className="space-y-1.5 text-[13.5px] leading-[1.6]" style={{ color: "#D6E0F0" }}>
              <li>• Üç süxur növü var: maqmatik, çökmə, metamorfik — neft-qazın demək olar ki, hamısı çökmə süxurlarla bağlıdır</li>
              <li>• Çökmə süxurlar 4 mərhələdə formalaşır: aşınma → daşınma → çökmə → litifikasiya</li>
              <li>• Qumdaşı və əhəngdaşı əsas kollektor tipləridir; gil daşı həm source, həm seal rolunu oynayır</li>
              <li>• Məsaməlilik (porosity) — boşluq həcminin ümumi həcmə nisbəti — kollektor keyfiyyətinin ilk göstəricisidir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/origin-of-petroleum"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Neft və Qazın Mənşəyi
          </Link>
          <Link
            href="/learn/geology/source-rock"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Source Rock
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}