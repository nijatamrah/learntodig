"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const riskFactors = [
  { faktor: "Source Rock riski", sual: "Kifayət qədər üzvi maddəyə malik mənbə süxur mövcuddurmu?", təsir: "Yoxdursa, neft ümumiyyətlə yaranmayıb" },
  { faktor: "Reservoir riski", sual: "Kollektor süxuru kifayət qədər məsaməli və keçiricidirmi?", təsir: "Zəifdirsə, neft olsa belə axmır" },
  { faktor: "Seal riski", sual: "Örtük süxuru neftin qaçmasının qarşısını tam alırmı?", təsir: "Sızdırırsa, neft köçüb yox olub" },
  { faktor: "Trap riski", sual: "Struktur və ya stratiqrafik tələ geometriyası düzgün formalaşıbmı?", təsir: "Yoxdursa, neft toplanacaq yer yoxdur" },
  { faktor: "Timing riski", sual: "Miqrasiya tələ formalaşandan SONRA baş veribmi?", təsir: "Əvvəl olubsa, neft artıq başqa yerə köçüb" },
];

export default function RiskAnalysisLesson() {
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
              1.4.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Qiymətləndirmə və Qərar
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Risk Analizi <span style={{ color: "#F0F4FF" }}>(Geological Risk / Chance of Success)</span>
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          {/* Creative intro: chain analogy hook */}
          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə bu mövzu vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              1.2.3-də öyrəndiyimiz petroleum system konsepti bizə göstərmişdi ki, neft yatağının
              formalaşması üçün beş element — source, reservoir, seal, trap və timing — birgə,
              düzgün ardıcıllıqla işləməlidir. Zəncirin bir metaforasını düşünün: zəncir yalnız ən
              zəif halqası qədər möhkəmdir. Əgər beş elementdən yalnız biri — məsələn, seal — zəif
              olarsa, digər dördü nə qədər mükəmməl olsa belə, nəticə eynidir: neft yoxdur. Risk
              analizi məhz bu beş halqanın hər birini ayrı-ayrılıqda qiymətləndirib, onları
              birləşdirərək layihənin ümumi uğur ehtimalını (Chance of Success, CoS) rəqəmə
              çevirən prosesdir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Geoloji risk nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Geoloji risk — bir kəşfiyyat obyektində (prospekt) kommersiya miqdarında neft və ya
              qaz tapılmaması ehtimalıdır. Bu risk maliyyə və ya bazar riskindən fərqlənir — o,
              yalnız yerin altındakı fiziki reallıqla bağlıdır: orada həqiqətən neft yaranıbmı,
              toplanıb saxlanıbmı və bu gün də ordadırmı? Geoloqlar bu sualı cavablandırmaq üçün
              petroleum system-in hər elementini ayrı-ayrılıqda "bəli/xeyr" ehtimalı ilə qiymətləndirir
              və bu qiymətləri riyazi şəkildə birləşdirərək ümumi Chance of Success göstəricisini
              əldə edirlər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Beş əsas risk elementi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Hər bir petroleum system elementi üçün ayrı bir sual qoyulur və bu suala cavab
              faiz şəklində (məsələn, 70% ehtimal) ifadə olunur. Bu qiymətləndirmə heç vaxt
              tamamilə obyektiv riyaziyyat deyil — o, geoloqun təcrübəsi, analoji hövzələrdən
              toplanan statistika və mövcud seysmik/quyu məlumatının keyfiyyətinə əsaslanan
              ekspert mühakiməsidir. Buna görə də eyni prospekt üzərində fərqli komandalar bəzən
              fərqli CoS rəqəmləri ala bilər — bu, sahənin qeyri-müəyyənliyinin təbii hissəsidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Elementlərin bir-birindən asılılığı
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Vacib bir məqam: bu beş element bir-birindən <strong>müstəqil</strong> hadisələr kimi
              qəbul edilir və riyazi olaraq bir-birinə <em>vurulur</em>, toplanmır. Bunun səbəbi
              odur ki, hər elementin uğursuzluğu tək başına bütün layihəni dayandırmağa kifayətdir
              — yəni "əlavə" deyil, "zəncirvari şərt" məntiqi işləyir. Məhz buna görə də beş
              elementin hər birinin ehtimalı yüksək (məsələn, 70-80%) olsa belə, onların hasili
              çox vaxt gözlənildiyindən qat-qat aşağı ümumi CoS rəqəmi verir — bu, kəşfiyyatın
              nə üçün təbiətən yüksək riskli sənaye olduğunu izah edir.
            </p>
          </section>

          {/* Creative element: warning callout */}
          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#D8823B14", border: "1px solid #D8823B40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#D8823B" }}>
              Diqqət et
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Beş elementdən yalnız birinin ehtimalını "80%" kimi yüksək təyin etmək asandır, amma
              bu, real dünyada təhlükəli bir tələdir. Xüsusilə <strong>timing</strong> riski çox vaxt
              lazımınca ciddi qiymətləndirilmir — çünki miqrasiyanın tələ formalaşmazdan əvvəl baş
              verib-vermədiyini birbaşa müşahidə etmək demək olar ki, mümkün deyil, bu, yalnız
              dolayı dəlillərlə (məsələn, hövzə tarixinin modelləşdirilməsi) qiymətləndirilə bilər.
              Təcrübəli geoloqlar hər zaman qeyri-müəyyən elementlərə mühafizəkar (aşağı) qiymət
              verməyi tövsiyə edir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Risk elementlərinin xülasəsi
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Faktor</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Əsas sual</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Uğursuzluğun təsiri</th>
                  </tr>
                </thead>
                <tbody>
                  {riskFactors.map((r) => (
                    <tr key={r.faktor} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{r.faktor}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{r.sual}</td>
                      <td className="px-3 py-2" style={{ color: "#9FAEC4" }}>{r.təsir}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Chance of Success (CoS)
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: Source = 0.8, Reservoir = 0.7, Seal = 0.6, Trap = 0.75, Timing = 0.65
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                CoS = P(Source) × P(Reservoir) × P(Seal) × P(Trap) × P(Timing)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>CoS = 0.8 × 0.7 × 0.6 × 0.75 × 0.65</p>
                <p>CoS ≈ 0.164 ≈ <span style={{ color: PATH_COLOR }}>%16.4</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: hər bir elementin ayrı-ayrılıqda ehtimalı 60-80% aralığında — yəni nisbətən
                "yaxşı" görünsə də, bu beş şərtin hamısının eyni vaxtda doğru olması ehtimalı cəmi
                təxminən 16.4%-dir. Bu rəqəm 1.4.3-də öyrənəcəyimiz qazımaya keçid qərarında əsas
                meyarlardan biri kimi istifadə olunur — çox vaxt şirkətlər müəyyən CoS həddindən
                (məsələn, 10-15%) aşağı olan prospektləri əlavə məlumat toplanmadan qazmağa
                getmirlər.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Şimal Dənizi kəşfiyyat proqramları", text: "Onilliklər boyu toplanan quyu statistikası bölgədəki orta CoS göstəricilərinin sahədən-sahəyə necə fərqləndiyini dəqiq sənədləşdirməyə imkan verib, bu da yeni prospektlərin qiymətləndirilməsini daha etibarlı edib." },
                { name: "Qərbi Afrika (Qvineya körfəzi)", text: "Presalt və postsalt zonalarında seal riskinin fərqli qiymətləndirilməsi bir çox kəşfiyyat şirkətinin eyni hövzədə fərqli strategiyalar seçməsinə səbəb olub." },
                { name: "Xəzər hövzəsi, Azərbaycan", text: "Dərin dəniz strukturlarında timing riskinin qiymətləndirilməsi hövzə modelləşdirilməsi əsasında aparılır, çünki bölgədə sürətli çökmə tarixi miqrasiya zamanlamasına birbaşa təsir göstərib." },
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
              <li>• Geoloji risk petroleum system-in beş elementinin (source, reservoir, seal, trap, timing) hər birinin ayrıca ehtimalına əsaslanır</li>
              <li>• Bu beş element müstəqil şərt kimi bir-birinə vurulur, toplanmır — buna görə ümumi CoS həmişə tək elementlərdən aşağı olur</li>
              <li>• Ekspert mühakiməsi risk qiymətləndirməsinin ayrılmaz hissəsidir, ona görə fərqli komandalar fərqli nəticələr ala bilər</li>
              <li>• Yekun CoS rəqəmi 1.4.3-də öyrənəcəyimiz qazımaya keçid qərarının əsas kəmiyyət meyarıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/volumetric-estimation"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Ehtiyatların İlkin Qiymətləndirilməsi
          </Link>
          <Link
            href="/learn/geology/drilling-decision"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Qazımaya Keçid Qərarı
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}