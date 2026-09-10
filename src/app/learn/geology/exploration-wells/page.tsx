"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const wellTypesComparison = [
  { tip: "Wildcat Quyu", təsvir: "Əvvəllər heç bir quyu qazılmamış, tamamilə kəşf olunmamış ərazidə qazılan ilk quyu", məqsəd: "Yeni petroleum sistemin mövcudluğunu sınamaq", risk: "Ən yüksək — uğursuzluq ehtimalı çox vaxt 80-90%-ə çatır" },
  { tip: "Appraisal (Qiymətləndirmə) Quyusu", təsvir: "Wildcat quyusunda neft/qaz tapıldıqdan sonra yatağın ölçüsünü və sərhədlərini müəyyən etmək üçün qazılan quyu", məqsəd: "Yatağın həcmini və məhsuldarlığını dəqiqləşdirmək", risk: "Orta — yatağın mövcudluğu artıq təsdiqlənib" },
  { tip: "Step-out Quyusu", təsvir: "Məlum yatağın sərhədlərini genişləndirmək məqsədilə əvvəlki quyudan müəyyən məsafədə qazılan quyu", məqsəd: "Yatağın hüdudlarını xəritələşdirmək", risk: "Aşağı-orta — qonşu quyu məlumatına əsaslanır" },
  { tip: "İnkişaf (Development) Quyusu", təsvir: "Yatağın kommersiya istismarı üçün planlı şəkildə qazılan istehsalat quyusu", məqsəd: "Neft/qazın çıxarılması", risk: "Ən aşağı — yataq artıq tam öyrənilib" },
];

export default function ExplorationWellsLesson() {
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
              1.3.3
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Kəşfiyyat Metodları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Kəşfiyyat Quyuları <span style={{ color: "#F0F4FF" }}>(Exploration Wells)</span>
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          {/* Creative intro: question hook */}
          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə bu mövzu vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Fərz edin ki, 1.3.1 və 1.3.2-də öyrəndiyimiz bütün üsullarla — outcrop analizi,
              geoloji xəritələşdirmə, dip-strike ölçmələri və 3D seysmik interpretasiya ilə — dərin
              bir strukturun neft saxlaya biləcəyinə əmin oldunuz. Sual budur: bunu necə
              "sübut" edəcəksiniz? Cavab tək bir şeydir — qazma. Nə qədər mükəmməl seysmik şəkil
              alsanız da, yerin altında əslində nə olduğunu yalnız bir borunu real olaraq həmin
              dərinliyə endirməklə bilmək mümkündür. Kəşfiyyat quyuları məhz elmi proqnozu fiziki
              reallıqla üz-üzə qoyan mərhələdir — və bu mərhələ həm ən bahalı, həm də ən riskli
              addımdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Kəşfiyyat quyusu nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Kəşfiyyat quyusu — potensial neft və ya qaz yatağının varlığını, ölçüsünü və
              keyfiyyətini fiziki olaraq təsdiqləmək məqsədilə qazılan quyudur. İstehsalat
              quyularından fərqli olaraq, kəşfiyyat quyusunun əsas vəzifəsi neft çıxarmaq deyil,
              məlumat toplamaqdır — süxur nümunələri, mayenin növü, təzyiq və məsaməlilik kimi
              göstəricilər bu mərhələdə əldə edilir. Hər bir kəşfiyyat quyusu milyonlarla dollar
              xərc tələb edə bilər, buna görə də onun yeri əvvəlki bütün geoloji və seysmik
              analizlərin nəticəsi əsasında son dərəcə diqqətlə seçilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Wildcat quyu — naməlumluğa atılan ilk addım
            </h2>
            <p className="text-[14px] leading-[1.75]">
              "Wildcat" termini — heç bir əvvəlki quyu məlumatı olmayan, tamamilə yeni bir ərazidə
              qazılan ilk kəşfiyyat quyusunu ifadə edir. Termin XIX əsr Amerikasından qalıb — belə
              bir quyu vəhşi, "əhliləşdirilməmiş" ərazidə qazıldığı üçün bu adı almışdır. Wildcat
              quyusunun uğur ehtimalı adətən çox aşağıdır (bir çox hövzələrdə 10-20% arasında),
              çünki bu mərhələdə hələ heç bir birbaşa sübut — yəni əvvəlki uğurlu quyu — mövcud
              deyil. Buna baxmayaraq, məhz wildcat quyuları tarixən bir çox nəhəng neft
              hövzələrinin kəşfinə səbəb olub, çünki hər böyük yataq nə vaxtsa "ilk" quyu ilə
              başlayıb.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Qazma zamanı nümunə götürmə
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Kəşfiyyat quyusu qazılarkən sadəcə dərinliyə enmək kifayət deyil — hər addımda
              məlumat toplanmalıdır. Bunun üçün əsasən iki üsul istifadə olunur: <strong>cuttings
              analizi</strong> (qazma zamanı səthə çıxan xırda süxur qırıntılarının davamlı təhlili)
              və <strong>core alma</strong> (borunun içinə xüsusi alət endirilərək müəyyən
              dərinlikdən bütöv, silindrik süxur nümunəsinin çıxarılması). Core nümunələri daha
              baha başa gəlir, çünki qazma prosesini müvəqqəti dayandırmaq tələb edir, amma onlar
              laboratoriya şəraitində məsaməlilik, keçiricilik və neft doyğunluğunu birbaşa ölçməyə
              imkan verdiyi üçün əvəzsizdir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Well logging — quyunun "elektrik portreti"
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Fiziki nümunə götürməklə yanaşı, quyuya xüsusi elektron alətlər (well logging tools)
              endirilərək süxurun elektrik müqaviməti, radioaktivliyi və sıxlığı kimi
              xüsusiyyətləri fasiləsiz şəkildə ölçülür. Bu ölçmələr nəticəsində alınan "log"
              əyriləri geoloqlara core və cuttings almadan belə, süxurun növünü və içindəki
              mayenin (su, neft və ya qaz) təbiətini müəyyən etməyə kömək edir. Well logging
              demək olar ki, hər bir müasir kəşfiyyat quyusunun ayrılmaz hissəsidir, çünki o,
              fiziki nümunə götürməyə nisbətən daha sürətli və nisbətən ucuz davamlı məlumat axını
              təmin edir.
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
              Wildcat quyusunun "quru" (dry hole) çıxması uğursuzluq deyil, kəşfiyyatın normal
              hissəsidir. Hətta ən təcrübəli geoloji komandalar belə, ən yaxşı seysmik və struktur
              analizlərə əsaslanaraq qazılan quyuların əksəriyyətində kommersiya miqdarında neft
              tapa bilmir. Buna görə neft şirkətləri tək bir quyuya deyil, portfeldəki çoxsaylı
              kəşfiyyat layihələrinə əsaslanan strategiya qurur — bu, 1.4.2-də öyrənəcəyimiz risk
              analizinin əsas səbəblərindən biridir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Kəşfiyyat quyusu növlərinin müqayisəsi
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Növ</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təsvir</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Məqsəd</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {wellTypesComparison.map((w) => (
                    <tr key={w.tip} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{w.tip}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{w.təsvir}</td>
                      <td className="px-3 py-2" style={{ color: "#9FAEC4" }}>{w.məqsəd}</td>
                      <td className="px-3 py-2" style={{ color: "#9FAEC4" }}>{w.risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — Uğur ehtimalından gözlənilən quyu sayı
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: bir bölgədə hər wildcat quyusunun uğur ehtimalı (Probability of Success,
                PoS) = 15%, layihə üçün planlaşdırılan büdcə = 4 quyu
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                Ən azı 1 uğur ehtimalı = 1 − (1 − PoS)ⁿ
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Ən azı 1 uğur ehtimalı = 1 − (1 − 0.15)⁴</p>
                <p>= 1 − (0.85)⁴ = 1 − 0.522 ≈ <span style={{ color: PATH_COLOR }}>%48</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: hər bir quyunun ayrı-ayrılıqda uğur şansı cəmi 15% olsa da, dörd müstəqil
                wildcat quyusu qazıldıqda ən azı birinin uğurlu olma ehtimalı təxminən 48%-ə qədər
                yüksəlir. Bu hesablama məhz neft şirkətlərinin nə üçün tək bir "möcüzəvi" quyuya
                deyil, çoxsaylı kəşfiyyat obyektlərindən ibarət portfelə əsaslanan strategiya
                qurduğunu izah edir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Spindletop, Texas, ABŞ (1901)", text: "Tarixin ən məşhur wildcat uğurlarından biri — Spindletop quyusu partlayış şəklində fontan verərək ABŞ-da müasir neft sənayesinin başlanğıcını qoyub." },
                { name: "Lula Sahəsi, Braziliya (Santos Hövzəsi)", text: "Dərin su presalt zonasında qazılan kəşfiyyat quyusu Braziliyanın ən böyük dərin su neft yataqlarından birinin aşkarlanmasına səbəb olub." },
                { name: "Neft Daşları, Azərbaycan", text: "Xəzər dənizində qazılan ilk dəniz kəşfiyyat quyuları nəticəsində dünyanın ilk dəniz üstü sənaye miqyaslı neft-qaz istehsalı burada başlayıb." },
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
              <li>• Kəşfiyyat quyusu geoloji proqnozu fiziki nümunə və ölçmələrlə birbaşa yoxlamaq üçün qazılır</li>
              <li>• Wildcat quyu heç bir əvvəlki məlumat olmayan ərazidə qazılan, ən yüksək riskli quyu növüdür</li>
              <li>• Cuttings, core alma və well logging birlikdə quyudan həm fiziki, həm də elektrik məlumatı təmin edir</li>
              <li>• Tək quyunun aşağı uğur ehtimalı çoxsaylı kəşfiyyat obyektindən ibarət portfel strategiyası ilə idarə olunur</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/seismic-survey"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Seysmik Kəşfiyyat
          </Link>
          <Link
            href="/learn/geology/volumetric-estimation"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Ehtiyatların İlkin Qiymətləndirilməsi
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}