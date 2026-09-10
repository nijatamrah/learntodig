"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const tocScale = [
  { grade: "Zəif", range: "< 0.5%", note: "Neft/qaz istehsalı üçün praktiki əhəmiyyətsiz" },
  { grade: "Orta", range: "0.5 – 1.0%", note: "Minimal kommersiya potensialı" },
  { grade: "Yaxşı", range: "1.0 – 2.0%", note: "Effektiv source rock hesab olunur" },
  { grade: "Əla", range: "> 2.0%", note: "Yüksək məhsuldarlıq potensialı (məs. şist yataqları)" },
];

export default function SourceRockLesson() {
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
              1.1.3
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Əsaslar
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Source Rock (Mənbə Süxur)
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <p className="text-[14px] leading-[1.8] italic" style={{ color: "#9FAEC4" }}>
              Çörək bişirməzdən əvvəl unun olmalıdır. Neft də eynidir — kollektor, tələ, örtük
              süxur nə qədər mükəmməl olsa da, əgər yaxınlıqda "xammal" istehsal edən bir süxur
              yoxdursa, heç nə formalaşmayacaq. Bu "xammal fabriki"nə{" "}
              <strong style={{ color: "#E8DCC8" }}>source rock</strong> deyilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Source rock nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Source rock — tərkibində kifayət qədər üzvi maddə (kerogen) olan, bu maddəni
              karbohidrogenə çevirmək üçün lazımi termal şəraiti keçirmiş çökmə süxurdur. Hər
              çökmə süxur source rock ola bilməz — bunun üçün iki əsas şərt yerinə yetirilməlidir:
              <strong> zənginlik</strong> (nə qədər üzvi maddə var) və{" "}
              <strong>yetişkənlik</strong> (bu maddə karbohidrogenə çevrilməyə kifayət qədər
              qızıbmı).
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Zənginlik ölçüsü — TOC (Total Organic Carbon)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              TOC — süxurun çəkisinə görə üzvi karbon faizini göstərir. Bu, source rock
              qiymətləndirməsində ilk baxılan göstəricidir:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qiymət</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>TOC (%)</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qeyd</th>
                  </tr>
                </thead>
                <tbody>
                  {tocScale.map((t) => (
                    <tr key={t.grade} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{t.grade}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{t.range}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{t.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Yetişkənlik ölçüsü — Vitrinite Reflectance (Ro)
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Yüksək TOC tək başına kifayət deyil — süxur həm də düzgün temperatur tarixini
              keçməlidir. Bunu ölçmək üçün <strong>Ro (vitrinite reflectance)</strong> göstəricisi
              istifadə olunur — bitki qalıqlarının işığı əks etdirmə qabiliyyəti, temperatur təsiri
              ilə artır:
            </p>
            <ul className="mt-3 space-y-1.5">
              <li className="text-[14px] leading-[1.6]">
                <span className="font-mono text-[12px] px-1.5 py-0.5 rounded mr-2" style={{ background: "rgba(255,255,255,0.06)", color: "#9FAEC4" }}>
                  Ro &lt; 0.6%
                </span>
                Yetişməmiş (immature) — kerogen hələ karbohidrogenə çevrilməyib
              </li>
              <li className="text-[14px] leading-[1.6]">
                <span className="font-mono text-[12px] px-1.5 py-0.5 rounded mr-2" style={{ background: "#FF6B2B1E", color: "#FF6B2B" }}>
                  Ro 0.6 – 1.3%
                </span>
                Oil window — aktiv neft istehsalı zonası
              </li>
              <li className="text-[14px] leading-[1.6]">
                <span className="font-mono text-[12px] px-1.5 py-0.5 rounded mr-2" style={{ background: "#3B9BD81E", color: "#3B9BD8" }}>
                  Ro &gt; 1.3%
                </span>
                Gas window / overmature — əsasən qaz, çox yüksəkdə (&gt;2%) potensial bitir
              </li>
            </ul>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#EF444414", border: "1px solid #EF444440" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#EF4444" }}>
              Ümumi səhv
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Yeni başlayanlar tez-tez "TOC yüksəkdirsə, deməli yaxşı source rock-dur" düşünür.
              Amma yüksək TOC-lu, lakin yetişməmiş (Ro &lt; 0.6%) süxur hələ heç bir karbohidrogen
              istehsal etməyib — sadəcə potensialdır. Qiymətləndirmə həmişə TOC + Ro birlikdə
              aparılmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Hesablama — Generasiya potensialının qiymətləndirilməsi
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: süxur nümunəsinin TOC = 3.2%, Ro = 0.9%
              </p>
              <div className="space-y-1.5 text-[13.5px]" style={{ color: "#D6E0F0" }}>
                <p>1. TOC = 3.2% → <span style={{ color: PATH_COLOR }}>"Əla" zənginlik</span> kateqoriyası (&gt;2.0%)</p>
                <p>2. Ro = 0.9% → <span style={{ color: PATH_COLOR }}>Oil window</span> daxilində (0.6–1.3%)</p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu süxur həm zəngin, həm yetişkəndir — aktiv şəkildə neft istehsal edən,
                kəşfiyyat üçün yüksək prioritetli source rock hesab olunur.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Maykop lay dəstəsi, Xəzər hövzəsi", text: "Azərbaycan və geniş Xəzər regionunun əsas source rock-u. Yüksək TOC və Tip II kerogen tərkibi ilə regionun əksər neft yataqlarını qidalandırıb." },
                { name: "Bazhenov Formasiyası, Rusiya (Qərbi Sibir)", text: "Dünyanın ən böyük şist neft ehtiyatlarından biri hesab olunur — çox yüksək TOC (bəzi zonalarda 10%-dən yuxarı) və geniş yayılma sahəsi." },
                { name: "Eagle Ford Shale, ABŞ (Texas)", text: "TOC adətən 3–7% aralığında, geniş oil-to-gas window keçidi ərazi boyunca dəyişir — bu, ABŞ-ın əsas şist neft/qaz layihələrindən biridir." },
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
              <li>• Source rock = zəngin (yüksək TOC) + yetişkən (uyğun Ro) çökmə süxur</li>
              <li>• TOC süxurun "nə qədər xammal" saxladığını, Ro isə "bu xammal işlənibmi" sualını cavablandırır</li>
              <li>• Yalnız hər ikisi birlikdə uyğun olduqda süxur aktiv source rock sayılır</li>
              <li>• Kerogen tipi (əvvəlki dərs) məhsulun növünü, TOC+Ro isə miqdarı və vəziyyətini müəyyən edir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/rock-types"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Süxur Növləri
          </Link>
          <Link
            href="/learn/geology/reservoir-rock"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Reservoir Rock
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}