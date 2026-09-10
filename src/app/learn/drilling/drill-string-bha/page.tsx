"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const stringComponents = [
  { name: "Drill Pipe", od: "3.5″ – 6.625″", weight: "~13.3 – 25.2 lb/ft", role: "Rotasiyanı və mud-u ötürən əsas boru, quyunun böyük hissəsini təşkil edir" },
  { name: "Heavy Weight Drill Pipe (HWDP)", od: "Drill pipe ilə eyni", weight: "~2-3× adi pipe", role: "Keçid zonası — adi pipe ilə drill collar arasında sərtlik fərqini yumşaldır" },
  { name: "Drill Collars", od: "6.25″ – 9.5″", weight: "~90 – 160 lb/ft", role: "Qalın divarlı, ağır borular — bit-ə çəki (WOB) ötürür, sərtlik verir" },
];

const bhaTools = [
  { name: "Bit", note: "Süxuru qıran əsas alət" },
  { name: "Stabilizers", note: "Quyu divarına söykənərək BHA-nı mərkəzləşdirir" },
  { name: "Mud Motor", note: "Mud axını ilə işləyən əlavə fırlanma mənbəyi (directional drilling-də vacib)" },
  { name: "MWD/LWD Alətləri", note: "Qazıma zamanı real-time məlumat (əyilmə bucağı, süxur xassələri) ötürür" },
  { name: "Jar", note: "Sıxılmış boru (stuck pipe) hallarında zərbə vuraraq azad etməyə kömək edir" },
  { name: "Reamer", note: "Quyu diametrini genişləndirir/düzəldir" },
];

export default function DrillStringBhaLesson() {
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
          href="/learn/drilling"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6"
          style={{ color: "#3D5570" }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Qazma
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
              style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
            >
              2.1.3
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Qazma Əsasları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Drill String və BHA
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Nə üçün quyunun dibinə qədər uzanan zəncir sadəcə "boru" deyil?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              5 km dərinlikdəki bit-ə güc ötürmək üçün lazım olan boru zənciri, əslində
              mühəndislik baxımından çox həssas bir sistemdir — hər hissəsi fərqli funksiya
              daşıyır, fərqli materialdan hazırlanır və fərqli yükə davam gətirməlidir. Buna görə
              sənayedə bu zəncirə sadəcə "boru" yox, <strong>drill string</strong> deyilir və onun
              ən aşağı hissəsinə — quyu dibinə ən yaxın olan, əsas işi görən bölməyə —{" "}
              <strong>BHA (Bottom Hole Assembly)</strong> adı verilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Drill String-in üç əsas hissəsi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Drill string yuxarıdan aşağıya doğru sərtləşən (və ağırlaşan) bir struktur kimi
              düşünülə bilər. Bu tədricən dəyişən sərtlik təsadüfi deyil — kəskin keçidlər boruda
              gərginlik konsentrasiyası yaradıb sınmaya səbəb ola bilər:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Komponent</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Xarici diametr</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Çəki</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Rolu</th>
                  </tr>
                </thead>
                <tbody>
                  {stringComponents.map((c) => (
                    <tr key={c.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{c.name}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{c.od}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: "#9FAEC4" }}>{c.weight}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{c.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. Drill Pipe — sistem uzunluğunun əsası
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Drill pipe quyunun böyük əksəriyyətini (adətən 90%+) təşkil edir. API (American
              Petroleum Institute) standartlarına uyğun istehsal olunur və polad növünə görə
              müxtəlif "grade"lərə bölünür — E, X-95, G-105, S-135 kimi. Rəqəm nə qədər yüksəkdirsə,
              polad bir o qədər möhkəmdir, amma bir o qədər də kövrək (daha az elastik) ola bilər.
              Hər drill pipe seqmentinin uclarında <strong>tool joint</strong> adlanan qalınlaşmış
              hissə var — bu, boruların bir-birinə bağlandığı yerdir və ən çox gərginliyə məruz
              qalan nöqtədir.
            </p>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#E8B33D14", border: "1px solid #E8B33D40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#E8B33D" }}>
              Təhlükəsizlik xəbərdarlığı
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Drill pipe minlərlə dövriyyə (fatigue) yükünə məruz qalır və zamanla mikro-çatlar
              yarana bilər. Bunun nəticəsi <strong>"twist-off"</strong> — borunun quyu içində
              qopmasıdır, bu, çox bahalı və mürəkkəb "fishing" əməliyyatına səbəb olur. Buna görə
              hər drill pipe müntəzəm olaraq maqnit hissəcik (MPI) və ultrasəs müayinələrindən
              keçirilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Heavy Weight Drill Pipe — keçid zonası
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Adi drill pipe ilə çox ağır drill collar arasında birbaşa keçid etsək, sərtlik
              fərqi o qədər kəskin olar ki, bu birləşmə nöqtəsi tez-tez sınar. HWDP bu problemi
              həll etmək üçün istifadə olunur — divarları adi pipe-dan qalın, amma drill collar-dan
              nazikdir. Bu, "tədricən sərtləşmə" prinsipini təmin edir və həm də bəzi hallarda
              əlavə çəki mənbəyi kimi işləyir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              4. Drill Collars — çəkinin əsl mənbəyi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Bit-in süxuru qıra bilməsi üçün ona çəki (Weight on Bit, WOB) tətbiq olunmalıdır.
              Amma bu çəki adi drill pipe-dan gəlmir — pipe çox nazik və elastikdir, sıxılma
              qüvvəsi altında əyilib "buckling" (burulma) baş verə bilər. Ona görə WOB, xüsusi
              qalın-divarlı <strong>drill collar</strong>-lardan gəlir. Onların həm çəkisi, həm
              sərtliyi BHA-nın aşağı hissəsini "şaquli və sabit" saxlayır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. BHA-nın əlavə alətləri
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Bit və drill collar-lardan başqa, BHA müasir qazımada bir sıra əlavə alət daşıyır:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bhaTools.map((t) => (
                <div key={t.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{t.name}</p>
                  <p className="text-[13px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{t.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#E8B33D14", border: "1px solid #E8B33D40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#E8B33D" }}>
              Təhlükəsizlik xəbərdarlığı
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Drill collar-lar hər biri bir neçə ton çəkir. Rig floor-da bu ağır elementlərin
              əl ilə (və ya mexanizmlə) idarə olunması zamanı əzilmə (crush injury) riski
              yüksəkdir — buna görə collar handling əməliyyatları yalnız təlim keçmiş heyət
              tərəfindən, müəyyən olunmuş prosedurlarla yerinə yetirilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — Neytral nöqtə və maksimal WOB
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Vacib bir qayda: bütün drill collar çəkisini WOB kimi istifadə etmək olmaz —
              əks halda "neytral nöqtə" (sıxılma və dartılma qüvvələrinin bərabərləşdiyi yer)
              drill pipe daxilinə düşər və pipe buckling baş verər. Sənaye praktikası — collar
              çəkisinin yalnız ~80%-ni istifadə etməkdir:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: drill collar uzunluğu = 600 ft, çəki = 147 lb/ft, Buoyancy Factor = 0.847 (2.1.1-dən)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Havadakı çəki = 600 × 147 = 88,200 lbs</p>
                <p>Mud daxilində çəki = 88,200 × 0.847 = 74,705 lbs</p>
                <p>Maksimal təhlükəsiz WOB = 74,705 × 0.80 = <span style={{ color: PATH_COLOR }}>59,764 lbs</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu BHA konfiqurasiyası ilə operator maksimum ~59,764 lbs WOB tətbiq
                edə bilər — bundan artıq çəki neytral nöqtəni drill pipe zonasına keçirər və
                pipe zədələnmə riskini artırar.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Sakhalin-1 (Rusiya)", text: "Dünyanın ən uzun extended-reach quyularından bəziləri burada qazılıb (12+ km horizontal uzanma) — bu, xüsusi torque-dözümlü drill pipe grade-ləri və mürəkkəb BHA dizaynı tələb edib." },
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Offshore platformalardan uzun-menzilli quyular qazılır, bu da yüksək keyfiyyətli HWDP və stabilizasiya strategiyası tələb edir ki, quyu trayektoriyası dəqiq saxlanılsın." },
                { name: "Al Shaheen sahəsi, Qatar", text: "Yüksək sayda extended-reach quyu ilə tanınır — BHA dizaynında xüsusi diqqət torque & drag idarəsinə yönəlib (bunu 2.4.2-də ətraflı görəcəyik)." },
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
              <li>• Drill string üç əsas hissədən ibarətdir: drill pipe, HWDP (keçid), drill collars (çəki mənbəyi)</li>
              <li>• BHA — bit ilə yanaşı stabilizer, mud motor, MWD/LWD, jar kimi alətləri birləşdirir</li>
              <li>• WOB drill collar-lardan gəlir, drill pipe-dan yox — pipe buckling-in qarşısını almaq üçün</li>
              <li>• Maksimal təhlükəsiz WOB, collar çəkisinin ~80%-i qədərdir (neytral nöqtə qaydası)</li>
              <li>• Drill pipe müntəzəm fatigue müayinəsindən keçir — twist-off qarşısıalınması üçün</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling/rig-components"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Qazma Qurğusu Komponentləri
          </Link>
          <Link
            href="/learn/drilling/bit-selection-rop"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Bit Seçimi və ROP
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}