"use client";
import Link from "next/link";

const PATH_COLOR = "#3B9BD8";

const logTypesPreview = [
  { name: "Gamma Ray", measures: "Təbii radioaktivlik", tells: "Litologiya (şist vs təmiz süxur)" },
  { name: "Resistivity", measures: "Elektrik müqaviməti", tells: "Flüid tipi (neft/qaz vs su)" },
  { name: "Density", measures: "Süxurun sıxlığı", tells: "Məsaməlilik (yüksək sıxlıq = az məsamə)" },
  { name: "Neutron", measures: "Hidrogen indeksi", tells: "Məsaməlilik (flüidlə doldurulmuş boşluqlar)" },
  { name: "Sonic", measures: "Səs dalğası sürəti", tells: "Məsaməlilik və mexaniki xassələr" },
];

export default function IntroToWellLoggingLesson() {
  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#080C18" }}>
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: PATH_COLOR, opacity: 0.16, filter: "blur(120px)" }}
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
          href="/learn/well-log"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6"
          style={{ color: "#3D5570" }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Quyu Logging
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
              style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
            >
              3.1.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Logging Əsasları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Well Logging-ə Giriş
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Quyu qazılıb — bəs aşağıda nə olduğunu necə bilirik?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Geologiya bölməsində süxur növlərini, source/reservoir rock-u öyrəndik. Amma bunlar
              hamısı səthdə, ya da nümunələr üzərində edilən analizlərdir. Real sual budur:
              quyu 3000 metr dərinliyə qazılandan sonra, orada hansı süxur var, orada neft varmı,
              yoxsa sadəcə su — bunu necə bilirik? Cavab: <strong>well logging</strong> — ölçmə
              alətlərini quyuya endirib, dərinliyə görə fiziki xassələri qeyd etmək.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Well logging nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Well logging — quyu boyunca müxtəlif fiziki sensorların (elektrik, radioaktiv,
              akustik) istifadə edilməsi ilə süxur və flüid xassələrinin dərinliyə görə
              qeydə alınması prosesidir. Nəticə — "log" adlanan, dərinliyi şaquli oxda, ölçülən
              parametri üfüqi oxda göstərən qrafikdir. Bu qrafiklər geoloqlara və mühəndislərə
              gözlə görmədikləri süxuru "oxumaq" imkanı verir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. Qısa tarixi kontekst
            </h2>
            <p className="text-[14px] leading-[1.75]">
              İlk elektrik logu 1927-ci ildə Fransada, Pechelbronn sahəsində Schlumberger
              qardaşları tərəfindən aparılıb. Bu, sənayenin süxur analizinə yanaşmasını
              tamamilə dəyişdi — əvvəllər yalnız qazıntı nümunələrinə (cuttings) etibar edilirdisə,
              indi davamlı, dəqiq və dərinlik üzrə fasiləsiz məlumat almaq mümkün oldu. Bu gün
              "Schlumberger" adı hələ də sənayenin ən böyük logging şirkətlərindən birinin adıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Logging-in əsas məqsədləri
            </h2>
            <div className="space-y-2.5">
              {[
                "Litologiya təyini — süxur qumdaşıdırmı, gil daşıdırmı, əhəngdaşıdırmı",
                "Məsaməlilik qiymətləndirməsi — süxurun nə qədər boşluq saxladığı",
                "Flüid tipi təyini — boşluqlarda neft, qaz, yoxsa su var",
                "Kollektor sərhədlərinin müəyyən edilməsi — hansı zona istismar üçün yararlıdır",
                "Quyular arası korrelyasiya — eyni layın bir neçə quyuda necə davam etdiyi",
              ].map((step, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-semibold mt-0.5"
                    style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[14px] leading-[1.7]">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Əsas log növlərinə ilkin baxış
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Bu bölmədə növbəti dərslərdə ətraflı öyrənəcəyimiz əsas log tiplərinin qısa
              icmalı:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Log</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Nəyi ölçür</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Nə haqda məlumat verir</th>
                  </tr>
                </thead>
                <tbody>
                  {logTypesPreview.map((l) => (
                    <tr key={l.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{l.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{l.measures}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{l.tells}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              5. Open hole vs cased hole logging
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Logging iki əsas şəraitdə aparıla bilər: <strong>open hole</strong> (casing
              qoyulmamış, süxur birbaşa mud ilə təmasda olan quyu — əksər petrofizika logları
              burada aparılır) və <strong>cased hole</strong> (casing və sement qoyulandan sonra —
              adətən istehsal monitorinqi, sement keyfiyyəti yoxlanışı üçün istifadə olunur). Bu
              fərq vacibdir, çünki casing metaldır və bəzi alətlərin (məs. resistivity) düzgün
              işləməsinə mane olur.
            </p>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: PATH_COLOR + "14", border: `1px solid ${PATH_COLOR}40` }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: PATH_COLOR }}>
              Tipik Log Cavabı
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Bir nümunə kimi, Gamma Ray logu ilə tanış olaq: <strong>təmiz qumdaşı</strong> adətən
              20–60 API vahidi, <strong>gil daşı (shale)</strong> isə 80–150 API vahidi göstərir.
              Bu böyük fərq, logun litologiyanı ayırd etməkdə niyə bu qədər effektiv olduğunu
              göstərir — 3.2.1-də bu logu ətraflı öyrənəcəyik.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — Log Nümunələmə Aralığı (Sampling Interval)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Logging alətləri quyuda müəyyən sürətlə hərəkət edir və müəyyən tezlikdə ölçmə
              aparır. Bu iki parametr, dərinlikdəki fiziki nümunələmə məsafəsini müəyyən edir:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: logging sürəti = 1800 ft/saat, ölçmə tezliyi = 10 nümunə/saniyə
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Sürət = 1800 / 3600 = 0.5 ft/san</p>
                <p>Nümunə aralığı = 0.5 / 10 = <span style={{ color: PATH_COLOR }}>0.05 ft (~1.5 sm)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu sürət və tezlikdə, alət hər 1.5 sm dərinlik dəyişimində bir ölçmə
                aparır — yəni nazik təbəqələri belə aşkar etmək üçün kifayət qədər yüksək
                dəqiqlikdir. Sürət artırılsa, dəqiqlik azalar.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Pechelbronn sahəsi, Fransa (1927)", text: "İlk elektrik logunun aparıldığı yer — Schlumberger qardaşları tərəfindən well logging sənayesinin əsası qoyulub." },
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Müasir offshore quyularında geniş wireline və LWD log dəstləri istifadə olunur — kollektor keyfiyyətini real-time qiymətləndirmək üçün." },
                { name: "Ghawar, Səudiyyə Ərəbistanı", text: "Onilliklər boyu aparılan log korrelyasiyaları, nəhəng kollektorun daxili strukturunu xəritələşdirməyə imkan verib." },
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
              <li>• Well logging — fiziki sensorlarla süxur/flüid xassələrini dərinliyə görə qeyd etmə prosesidir</li>
              <li>• 1927-ci ildən (Schlumberger) bəri sənayenin əsas kəşfiyyat/qiymətləndirmə alətidir</li>
              <li>• Əsas məqsədlər: litologiya, məsaməlilik, flüid tipi, korrelyasiya</li>
              <li>• Open hole logging əksər petrofizika ölçmələri üçün istifadə olunur, cased hole isə monitorinq üçün</li>
              <li>• Logging sürəti və nümunələmə tezliyi, əldə olunan dəqiqliyi birbaşa müəyyən edir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/well-log"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Quyu Logging
          </Link>
          <Link
            href="/learn/well-log/logging-tools-wireline-lwd"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Log Alətləri (Wireline vs LWD)
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}