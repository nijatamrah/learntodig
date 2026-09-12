"use client";
import Link from "next/link";

const PATH_COLOR = "#2DBE8C";

const mbeTerms = [
  { symbol: "N", name: "İlkin neft ehtiyatı (OOIP)", note: "Reservoirdə başlanğıcda mövcud olan ümumi neft miqdarı (stb)" },
  { symbol: "Np", name: "Kumulyativ neft hasilatı", note: "İstismarın başlanğıcından hazırkı tarixə qədər çıxarılmış ümumi neft (stb)" },
  { symbol: "Gp", name: "Kumulyativ qaz hasilatı", note: "Çıxarılmış ümumi qaz miqdarı, solution qaz da daxil olmaqla (scf)" },
  { symbol: "We", name: "Su axını (Water Influx)", note: "Ətraf aquiferdən reservoira daxil olan su həcmi (rb)" },
  { symbol: "Eo", name: "Neft və həll olmuş qazın genişlənməsi", note: "Təzyiq azaldıqca neft+qaz sisteminin həcmcə genişlənməsi" },
  { symbol: "Efw", name: "Formasiya suyu və qaya sıxılması", note: "Adətən kiçik həddir, amma undersaturated reservoirlarda əhəmiyyətli ola bilər" },
];

const driveMechanisms = [
  { title: "Solution Gas Drive", text: "Enerji, neft daxilində həll olunmuş qazın təzyiq azaldıqca ayrılıb genişlənməsindən gəlir. Adətən tez tükənən, aşağı bərpa faktoru olan mexanizmdir." },
  { title: "Gas Cap Drive", text: "Reservoirin üstündə mövcud olan sərbəst qaz papağı (gas cap), neft hasilatı zamanı genişlənərək təzyiqi dəstəkləyir." },
  { title: "Water Drive", text: "Ətraf aquiferdən daxil olan su, boşalan həcmi doldurur və təzyiqi uzun müddət nisbətən sabit saxlaya bilir — ən effektiv mexanizmlərdən biridir." },
  { title: "Compaction Drive", text: "Təzyiq azaldıqca qaya matriksinin sıxılması əlavə enerji mənbəyi yaradır — xüsusilə yüksək məsaməli, zəif konsolidasiya olunmuş qumdaşlarında əhəmiyyətlidir." },
];

const comparisonRows = [
  { aspect: "Məlumat tələbi", volumetric: "Yalnız statik məlumat (karotaj, seysmik, nüvə)", mbe: "İstismar tarixçəsi (təzyiq, hasilat) tələb edir" },
  { aspect: "Tətbiq mərhələsi", volumetric: "Kəşfiyyat və erkən qiymətləndirmə", mbe: "İstismarın başlanğıcından sonra, təzyiq düşdükdə" },
  { aspect: "Əsas fərziyyə", volumetric: "Reservoir geometriyası və qaya xüsusiyyətləri", mbe: "Reservoir tək bir 'tank' kimi bərabər təzyiqli fərz olunur" },
  { aspect: "Dəqiqlik mənbəyi", volumetric: "Statik ölçmələrin keyfiyyətindən asılıdır", mbe: "Təzyiq/hasilat məlumatının uzunluğu və keyfiyyətindən asılıdır" },
];

export default function MaterialBalanceEquationLesson() {
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
          href="/learn/reservoir"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6"
          style={{ color: "#3D5570" }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Rezervuar
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
              style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
            >
              4.2.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Həcm Hesablamaları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Material Balance Tənliyi
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <p className="text-[14px] leading-[1.8] italic" style={{ color: "#9FAEC4" }}>
              Bir reservoiru nəhəng bir bank hesabı kimi düşün: hesabdan pul çıxardıqca (hasilat),
              qalıq balans azalır, amma bu azalma həmişə sadə çıxma əməliyyatı deyil — bəzən
              hesaba xaricdən əlavə vəsait də daxil olur (aquiferdən su axını), bəzən isə
              "valyuta məzənnəsi" (təzyiqin PVT xüsusiyyətlərinə təsiri) dəyişir. Material
              balance tənliyi məhz bu mühasibatlığı — reservoirdən nə qədər çıxdığını, nə qədər
              daxil olduğunu və qalan həcmin necə dəyişdiyini — kütlənin saxlanması qanunu
              əsasında rəqəmsallaşdırır. Bu, sənayedə 1930-cu illərdən bəri istifadə olunan,
              amma bu gün də ən güclü reservoir diaqnostika alətlərindən biri olaraq qalan bir
              üsuldur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Material balance tənliyi nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Material balance tənliyi (MBE), reservoiri tək bir bərabər təzyiqli "tank" kimi
              modelləşdirərək, çıxarılan flüid həcmini reservoirdəki genişlənmə və su axını
              ilə balanslaşdıran tənlikdir. Əsas ideya sadədir: əgər hasilat nəticəsində
              müəyyən həcmdə boşluq yaranırsa, bu boşluq ya flüidlərin genişlənməsi (təzyiq
              azaldıqca), ya da xaricdən daxil olan su ilə doldurulmalıdır. Volumetric metoddan
              fərqli olaraq, MBE statik ölçmələrə deyil, real istismar tarixçəsinə —
              vaxtaşırı ölçülən reservoir təzyiqinə və kumulyativ hasilat rəqəmlərinə —
              əsaslanır. Bu, onu həm ehtiyatların yoxlanması, həm də reservoirin hansı
              mexanizmlə işlədiyini müəyyən etmək üçün olduqca dəyərli edir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Kütlənin saxlanması prinsipi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              MBE-nin əsasında fizikanın ən fundamental qanunlarından biri dayanır: kütlə nə
              yoxdan yaranır, nə də yox olur. Reservoir bağlı bir sistem kimi qəbul edildikdə,
              çıxarılan hər bir barrel neft və ya hər bir kub fut qaz, sistemdəki ümumi
              həcmdə müvafiq bir dəyişikliyə səbəb olmalıdır. Bu dəyişiklik ya sıxılabilən
              flüidlərin (neft, qaz, su) genişlənməsi ilə, ya da qaya matriksinin özünün
              yığılması (compaction) ilə kompensasiya olunur. Tənliyin gücü də elə buradadır —
              o, fərziyyəyə deyil, ölçülə bilən fiziki qanuna əsaslanır, ona görə düzgün
              tətbiq edildikdə çox etibarlı nəticələr verir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Tənlikdəki əsas hədlər
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Ümumi material balance tənliyi bir neçə hədin cəmindən ibarətdir, hər biri
              fərqli fiziki prosesi təmsil edir:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Simvol</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Ad</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Mənası</th>
                  </tr>
                </thead>
                <tbody>
                  {mbeTerms.map((t) => (
                    <tr key={t.symbol} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-mono font-semibold" style={{ color: PATH_COLOR }}>{t.symbol}</td>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{t.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{t.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Reservoir sürücü mexanizmləri (Drive Mechanisms)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              MBE-nin ən dəyərli tətbiqlərindən biri, hansı təbii enerji mənbəyinin reservoiru
              "işlətdiyini" müəyyən etməkdir. Hər tənlik həddinin nisbi çəkisi, dominant sürücü
              mexanizmini göstərir:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {driveMechanisms.map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl px-3.5 py-3"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-[13px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{c.title}</p>
                  <p className="text-[12.5px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{c.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Volumetric method ilə müqayisə
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Əvvəlki dərsdə öyrəndiyimiz volumetric method ilə material balance tənliyi
              tez-tez bir-birini tamamlayan, amma fərqli mərhələlərdə istifadə olunan üsullardır:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Aspekt</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Volumetric</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Material Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((r) => (
                    <tr key={r.aspect} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{r.aspect}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{r.volumetric}</td>
                      <td className="px-3 py-2 align-top" style={{ color: PATH_COLOR }}>{r.mbe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Praktiki tətbiq üsulları
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Praktikada mühəndislər MBE-ni müxtəlif formalarda tətbiq edirlər. Qaz
              reservuarları üçün ən geniş yayılmış üsul p/z qrafikidir — burada (təzyiq/z-faktor)
              nisbəti kumulyativ hasilata qarşı xətti şəkildə düşür və bu xəttin ekstrapolyasiyası
              birbaşa OGIP-i verir. Neft reservuarları üçün isə Havlena-Odeh üsulu daha çox
              istifadə olunur — bu üsul tənliyi xətti tənlik formasına salaraq, müxtəlif zaman
              nöqtələrindəki təzyiq/hasilat məlumatlarını bir xəttə uyğunlaşdırır və bu xəttin
              meyli sürücü mexanizmi haqqında məlumat verir. Hər iki üsul da, kifayət qədər uzun
              və keyfiyyətli təzyiq tarixçəsi tələb edir — qısa müddətli məlumatla nəticələr
              böyük səhv payı daşıya bilər.
            </p>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#A78BFA14", border: "1px solid #A78BFA40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#A78BFA" }}>
              Fərziyyə və Məhdudiyyətlər
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Material balance tənliyi, reservoiri tək bir bərabər təzyiqli "tank" kimi qəbul
              edir — yəni bütün reservoir daxilində təzyiqin anında və bərabər şəkildə
              yayıldığını fərz edir. Real reservoirlarda isə, xüsusilə aşağı keçiricilikli və ya
              geniş sahəli yataqlarda, təzyiq fərqli zonalarda fərqli sürətlə düşə bilər
              (reservoir kompartmentləşməsi), bu da tənliyin nəticələrini təhrif edir. Əlavə
              olaraq, We (su axını) həddinin düzgün qiymətləndirilməsi çox vaxt ən böyük
              qeyri-müəyyənlik mənbəyidir — yanlış aquifer modeli seçimi bütün nəticəni əsassız
              edə bilər. Buna görə MBE nəticələri həmişə reservoir simulyasiyası (4.4.3-cü
              dərsə bax) ilə çarpaz yoxlanılmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Hesablama — Sadələşdirilmiş material balance yoxlaması
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Su axını olmayan (volumetric, undersaturated) sadə bir reservoir üçün sadələşdirilmiş
              tənliyi tətbiq edək və nəticəni 4.2.1-dəki OOIP dəyəri ilə tutuşduraq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: Np = 8.6 milyon stb, Bo = 1.35 rb/stb, Boi = 1.30 rb/stb (ilkin), We = 0
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                N = (Np × Bo) / (Bo - Boi)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>N = (8,600,000 × 1.35) / (1.35 - 1.30)</p>
                <p>N = 11,610,000 / 0.05</p>
                <p>N = <span style={{ color: PATH_COLOR }}>~232.2 milyon stb</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: material balance ilə hesablanan ilkin ehtiyat (N) təxminən 232 milyon
                stb-dir. Əgər bu dəyər, 4.2.1-ci dərsdə volumetric üsulla tapılan ~86.2 milyon
                stb-dən xeyli fərqlənirsə, bu, iki mümkün ssenarini göstərə bilər: ya volumetric
                hesablamada istifadə olunan sahə/qalınlıq dəyərləri kiçik qiymətləndirilib, ya da
                reservoira gözlənilməyən əlavə enerji mənbəyi (məs. aşkar olunmamış aquifer)
                daxil olur. Məhz bu cür uyğunsuzluqların aşkarlanması, MBE-nin ən böyük praktiki
                dəyərlərindən biridir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Uzun illik təzyiq monitorinqi məlumatları material balance analizləri ilə birləşdirilərək, reservoirin enerji balansının vaxtla necə dəyişdiyi izlənilib və su vurma strategiyalarının effektivliyi qiymətləndirilib." },
                { name: "East Texas sahəsi, ABŞ", text: "Güclü su drive mexanizmi ilə tanınan klassik nümunədir — material balance analizləri onilliklər boyu sabit təzyiq saxlanmasının səbəbini izah etməkdə istifadə edilib." },
                { name: "Groningen qaz sahəsi, Niderland", text: "p/z metodu ilə aparılan material balance analizləri, Avropa'nın ən böyük qaz yataqlarından birinin ehtiyatlarının dəqiqləşdirilməsində əsas rol oynayıb." },
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
              <li>• Material balance tənliyi kütlənin saxlanması qanununa əsaslanır və reservoiri bir "tank" kimi modelləşdirir</li>
              <li>• Volumetric metoddan fərqli olaraq, real təzyiq və hasilat tarixçəsi tələb edir</li>
              <li>• Tənlikdəki hədlərin nisbi çəkisi reservoirin sürücü mexanizmini (solution gas, gas cap, water drive) üzə çıxarır</li>
              <li>• p/z qrafiki (qaz) və Havlena-Odeh üsulu (neft) ən çox istifadə olunan praktiki tətbiqlərdir</li>
              <li>• Bircins təzyiq fərziyyəsi və We-nin qeyri-müəyyənliyi ən böyük məhdudiyyətlərdir — simulyasiya ilə yoxlanmalıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/reservoir/volumetric-method-ooip-ogip"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Əvvəlki: OOIP/OGIP Hesablamaları
          </Link>
          <Link
            href="/learn/reservoir/darcy-law-reservoir-flow"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Darcy Qanunu və Reservoir Axını
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}