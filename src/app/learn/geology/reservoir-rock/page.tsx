"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const qualityScale = [
  { grade: "Zəif", porosity: "< 5%", permeability: "< 1 mD", note: "Praktiki olaraq axın yoxdur" },
  { grade: "Orta", porosity: "5 – 10%", permeability: "1 – 10 mD", note: "Stimulyasiya (frac) tələb edə bilər" },
  { grade: "Yaxşı", porosity: "10 – 20%", permeability: "10 – 100 mD", note: "Standart kommersiya kollektoru" },
  { grade: "Əla", porosity: "> 20%", permeability: "> 100 mD", note: "Yüksək debitli, asan istismar" },
];

export default function ReservoirRockLesson() {
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
              1.1.4
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Əsaslar
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Reservoir Rock (Kollektor Süxur)
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          {/* Creative intro: question hook */}
          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Bir süxurun "yaxşı kollektor" olduğunu necə bilirik?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              1.1.2-də gördük ki, source rock nefti "istehsal edir". Amma neft bu süxurdan çıxıb
              haradasa toplanmalıdır — həmin "anbar" rolunu oynayan süxura{" "}
              <strong>reservoir rock</strong> deyilir. Yaxşı reservoir olmaq üçün süxurun iki
              fiziki xüsusiyyəti həlledicidir: nə qədər <strong>tuta bilir</strong> (məsaməlilik)
              və nə qədər <strong>axıda bilir</strong> (keçiricilik).
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Məsaməlilik (Porosity) — dərinləşmiş baxış
            </h2>
            <p className="text-[14px] leading-[1.75] mb-4">
              1.1.2-də formulasını görmüşdük: φ = (V_bulk − V_grain) / V_bulk. İndi iki növünə baxaq:
            </p>
            <div className="grid grid-cols-1 gap-3">
              <div className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>İlkin məsaməlilik (Primary Porosity)</p>
                <p className="text-[13.5px] leading-[1.7]" style={{ color: "#9FAEC4" }}>
                  Süxurun formalaşması zamanı dənələr arasında qalan təbii boşluqlar (məs. qumdaşındakı dənə-arası boşluqlar).
                </p>
              </div>
              <div className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>İkincili məsaməlilik (Secondary Porosity)</p>
                <p className="text-[13.5px] leading-[1.7]" style={{ color: "#9FAEC4" }}>
                  Süxur formalaşdıqdan sonra yaranan boşluqlar — həll olma (dissolution), çatlaqlar (fracturing). Karbonat kollektorlarda çox rast gəlinir.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Keçiricilik (Permeability)
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Keçiricilik — süxurun daxilindəki boşluqların bir-biri ilə <strong>bağlı olub-olmaması</strong> və
              flüidin bu boşluqlardan nə qədər asan keçə biləcəyini göstərir. Vahidi{" "}
              <strong>Darcy (D)</strong> və ya milliDarcy (mD)-dir. Buna təsir edən amillər:
            </p>
            <ul className="mt-3 space-y-2 text-[14px] leading-[1.6]">
              <li>• <strong>Dənə ölçüsü</strong> — böyük dənələr = daha böyük keçiricilik yolları</li>
              <li>• <strong>Sortlaşma (sorting)</strong> — eyni ölçülü dənələr daha yaxşı bağlı boşluqlar yaradır</li>
              <li>• <strong>Sementləşmə</strong> — çox sementləşmiş süxur boşluqları "bağlayır", keçiriciliyi azaldır</li>
            </ul>
          </section>

          {/* Creative element: blue tip callout instead of orange info box */}
          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#3B9BD814", border: "1px solid #3B9BD840" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#3B9BD8" }}>
              Diqqət et
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Yüksək məsaməlilik həmişə yüksək keçiricilik demək deyil. Gil daşının (shale)
              məsaməliliyi bəzən 30%-ə çata bilər, amma boşluqlar o qədər kiçik və izolə
              olunmuşdur ki, flüid demək olar ki, hərəkət edə bilmir — buna görə şist, kollektor
              yox, çox vaxt <strong>seal rock</strong> kimi işləyir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Kollektor keyfiyyəti təsnifatı
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qiymət</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Məsaməlilik</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Keçiricilik</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qeyd</th>
                  </tr>
                </thead>
                <tbody>
                  {qualityScale.map((q) => (
                    <tr key={q.grade} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{q.grade}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{q.porosity}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{q.permeability}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{q.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Hesablama — Darcy qanunu ilə axın sürəti
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: keçiricilik k = 50 mD, təzyiq fərqi ΔP = 500 psi, uzunluq L = 100 ft, en kəsik sahəsi A = 43,560 ft², flüid özlülüyü μ = 1 cP
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                q = (1.127 × 10⁻³ × k × A × ΔP) / (μ × L)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>q = (1.127×10⁻³ × 50 × 43560 × 500) / (1 × 100)</p>
                <p>q ≈ <span style={{ color: PATH_COLOR }}>12,290 bbl/gün</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu parametrlərlə, 50 mD keçiriciliyə malik bir kollektor zonasından
                gündə təxminən 12,290 barrel flüid axını gözlənilir (sadələşdirilmiş radial olmayan hesablama).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Ghawar, Səudiyyə Ərəbistanı", text: "Arab-D əhəngdaşı — həm ilkin, həm ikincili (çat) məsaməliliyə malikdir, yüksək keçiricilik sayəsində dünyanın ən məhsuldar quyularını yaradıb." },
                { name: "Prudhoe Bay, Alyaska", text: "Sadlerochit qrupu qumdaşları — yüksək məsaməlilik (~20%) və yaxşı keçiricilik, ABŞ-ın tarixən ən böyük yataqlarından biri." },
                { name: "ACG, Azərbaycan", text: "Balaxanı/Pereriv qumdaşları — orta-yüksək keçiricilik göstərir, bu da yüksək debitli quyuların qazılmasına imkan yaradıb." },
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
              <li>• Reservoir rock iki xüsusiyyətlə qiymətləndirilir: məsaməlilik (tutum) və keçiricilik (axın)</li>
              <li>• Məsaməlilik ilkin (dənə-arası) və ikincili (çat/həll) ola bilər</li>
              <li>• Yüksək məsaməlilik keçiriciliyi zəmanət etmir — şist buna klassik nümunədir</li>
              <li>• Darcy qanunu, kollektordan gözlənilən axın sürətini hesablamağa imkan verir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/source-rock"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Source Rock
          </Link>
          <Link
            href="/learn/geology/seal-rock"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Seal Rock
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}