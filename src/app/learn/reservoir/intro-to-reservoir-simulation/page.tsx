"use client";
import Link from "next/link";

const PATH_COLOR = "#2DBE8C";

const simulatorTypes = [
  { name: "Black Oil Simulator", use: "Konvensional neft/qaz reservoirları", note: "Flüidi sadəcə neft, qaz, su fazalarına bölür — PVT xüsusiyyətləri cədvəl (Bo, Rs) şəklində daxil edilir, sürətli işləyir" },
  { name: "Compositional Simulator", use: "Kondensat, uçucu neft, EOR layihələri", note: "Hər komponenti (metan, etan və s.) ayrıca izləyir — daha dəqiq, amma hesablama gücü tələbi xeyli yüksəkdir" },
  { name: "Thermal Simulator", use: "Ağır neft, buxar vurma layihələri", note: "Temperaturun özlülüyə və faza tarazlığına təsirini əlavə modelləşdirir" },
  { name: "Streamline Simulator", use: "Böyük, çox quyulu sahələr", note: "Axın yollarını (streamline) izləyərək ənənəvi grid metodundan qat-qat sürətli nəticə verir" },
];

const workflowSteps = [
  { title: "Statik Modelin Qurulması", text: "4.2.1-ci dərsdəki A, h, φ, Sw kimi parametrlər 3D geoloji model şəklində minlərlə hüceyrəyə (grid block) paylanır" },
  { title: "Dinamik Parametrlərin Daxil Edilməsi", text: "Hər hüceyrəyə keçiricilik (4.3.1), relative permeability əyriləri (4.3.3) və PVT cədvəlləri (4.1.1) mənsub edilir" },
  { title: "İlkinləşdirmə (Initialization)", text: "Modelin ilkin təzyiq (4.1.2) və doyma paylanması, fluid contact dərinliklərinə əsasən hesablanır" },
  { title: "Tarixi Uyğunlaşdırma (History Matching)", text: "Model, real quyu təzyiq və debit tarixçəsi (4.3.2, 4.4.1) ilə tutuşdurulur, fərqlər aradan qaldırılana qədər parametrlər tənzimlənir" },
  { title: "Proqnozlaşdırma (Prediction)", text: "Uyğunlaşdırılmış model gələcək ssenarilər (yeni quyular, EOR tətbiqi) üçün işə salınır" },
];

export default function IntroReservoirSimulationLesson() {
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
              4.4.3
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              İstismar Dinamikası
            </span>
            <span
              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase tracking-wide"
              style={{ background: "rgba(255,255,255,0.05)", color: "#6B82A0" }}
            >
              Son Dərs
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Reservoir Simulyasiyasına Giriş
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Bütün öyrəndiklərimiz — amma eyni anda, minlərlə nöqtədə
            </h2>
            <p className="text-[14px] leading-[1.75]">
              İndiyə qədər hər dərsdə reservoiru sadələşdirilmiş, tək bir "orta" vahid kimi
              təsəvvür etdik — tək bir OOIP rəqəmi (4.2.1), tək bir təzyiq (4.1.2), tək bir
              Productivity Index (4.3.2). Amma real reservoir, min metrlərlə uzanan, hər
              nöqtəsi fərqli keçiriciliyə, doymaya və təzyiqə malik nəhəng bir üçölçülü
              cisimdir. Sual budur: Darcy qanununu (4.3.1), material balance-i (4.2.2) və
              relative permeability-ni (4.3.3) eyni zamanda, minlərlə fərqli nöqtədə necə
              tətbiq etmək olar? Bu son dərsdə, bütün fəsil boyu öyrəndiyimiz fiziki qanunları
              bir araya gətirən alət — reservoir simulyasiyası — ilə tanış olacağıq.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Reservoir simulyasiyası nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Reservoir simulyasiyası, reservoiri minlərlə (bəzən milyonlarla) kiçik üçölçülü
              hüceyrəyə (grid block) bölərək, hər hüceyrədə Darcy qanunu və material balance
              tənliklərini kompüter vasitəsilə eyni zamanda həll edən proqram təminatıdır.
              Sadə əl hesablamalarından fərqli olaraq, simulyasiya reservoirin heterogenliyini
              (fərqli zonalarda fərqli keçiricilik, doyma), müxtəlif quyuların bir-birinə
              təsirini və zamanla dəyişən axın rejimlərini eyni anda nəzərə ala bilir. Bu, onu
              volumetric və material balance kimi "tək nöqtəli" üsullardan qat-qat güclü, amma
              həm də qat-qat mürəkkəb bir alətə çevirir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Grid (Şəbəkə) — reservoiru "doğramaq"
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Simulyasiyanın əsasında reservoiru kiçik düzbucaqlı və ya qeyri-müntəzəm formalı
              hüceyrələrə bölmək dayanır — hər hüceyrəyə öz məsaməliliyi (φ), keçiriciliyi (k),
              doyması (Sw) və təzyiqi (P) mənsub edilir. Hüceyrə ölçüsü nə qədər kiçikdirsə,
              nəticə bir o qədər dəqiq olur, amma hesablama vaxtı da eksponensial şəkildə artır
              — buna görə mühəndislər adətən quyu ətrafında (yüksək təzyiq qradiyenti olan
              zonalarda) kiçik, uzaq zonalarda isə daha iri hüceyrələr istifadə edir. Bu
              yanaşma "local grid refinement" adlanır və hesablama resurslarını ən çox lazım
              olan yerə yönəltməyə imkan verir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Simulyator növləri
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Reservoirin flüid tipindən (4.1.1-ci dərsdəki təsnifata əsasən) və layihənin
              məqsədindən asılı olaraq, fərqli simulyator növləri istifadə olunur:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Növ</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tətbiq sahəsi</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qeyd</th>
                  </tr>
                </thead>
                <tbody>
                  {simulatorTypes.map((s) => (
                    <tr key={s.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{s.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: PATH_COLOR }}>{s.use}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{s.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Simulyasiya iş axını — addım-addım
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Bir simulyasiya layihəsi, fəsil boyu öyrəndiyimiz demək olar ki, bütün anlayışları
              bir araya gətirən beş mərhələdən keçir:
            </p>
            <ol className="space-y-2 text-[13.5px] leading-[1.7]" style={{ color: "#C4CEE0" }}>
              {workflowSteps.map((s, i) => (
                <li key={s.title}>
                  <span style={{ color: PATH_COLOR, fontWeight: 600 }}>{i + 1}.</span>{" "}
                  <span style={{ color: "#E8DCC8", fontWeight: 600 }}>{s.title}</span> — {s.text}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              5. History Matching — modelin "doğruluğunu" sübut etmək
            </h2>
            <p className="text-[14px] leading-[1.75]">
              History matching, simulyasiya modelinin real sahə tarixçəsi ilə tutuşdurulması
              prosesidir — modelin proqnozlaşdırdığı təzyiq və debit qiymətləri, 4.3.2-ci
              dərsdə öyrəndiyimiz quyu testi nəticələri və 4.4.1-ci dərsdəki decline curve
              tarixçəsi ilə müqayisə edilir. Fərq varsa, mühəndis keçiricilik, aquifer ölçüsü
              və ya relative permeability əyriləri kimi qeyri-müəyyən parametrləri, fiziki
              cəhətdən məqbul hədlər daxilində tənzimləyir — bu, "history matched" model
              yaranana qədər davam edən təkrarlanan bir prosesdir. Diqqət etmək lazımdır ki,
              uğurlu history match, modelin gələcək proqnozunun mütləq doğru olacağına zəmanət
              vermir — bu, sadəcə keçmişlə uyğunluğu göstərir.
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
              Reservoir simulyasiyası, hər hüceyrə daxilində flüid xüsusiyyətlərinin bircins
              olduğunu fərz edir — real heterogenlik yalnız hüceyrə ölçüsü qədər dəqiqliklə
              təmsil oluna bilir, daha xırda miqyaslı dəyişkənlik "orta" dəyərlərə
              yayındırılır. Bundan əlavə, history matching prosesi qeyri-unikal ola bilər —
              yəni fərqli parametr kombinasiyaları eyni tarixi məlumata uyğun gələ bilər, amma
              tamam fərqli gələcək proqnozlar verə bilər ("non-uniqueness problemi"). Buna görə
              simulyasiya nəticələri, xüsusilə uzunmüddətli proqnozlarda, həmişə
              qeyri-müəyyənlik analizi (məs. çoxsaylı ssenari) ilə birlikdə təqdim edilməli,
              tək bir "dəqiq" rəqəm kimi qəbul edilməməlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — Tək hüceyrənin məsamə həcmi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              4.2.1-ci dərsdəki OOIP nümunəmizin bir hissəsini təşkil edən tək bir grid
              hüceyrəsi üçün məsamə həcmini (pore volume) hesablayaq — bu, simulyasiya
              modelinin "kərpici" olan əsas hesablamadır:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: hüceyrə ölçüsü 100 ft × 100 ft × 20 ft, φ = 0.20 (4.2.1-dən)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Bulk həcm = 100 × 100 × 20 = 200,000 ft³</p>
                <p>Pore Volume = Bulk həcm × φ = 200,000 × 0.20</p>
                <p>Pore Volume = <span style={{ color: PATH_COLOR }}>40,000 ft³ (≈ 7,120 bbl)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu tək hüceyrədə flüidlərin yerləşə biləcəyi ümumi boşluq həcmi
                təxminən 7,120 barreldir. Reservoirin ölçüsündən asılı olaraq, bir model
                minlərlə belə hüceyrədən ibarət ola bilər — hər birinə fərqli φ, k, Sw
                mənsub edilərək, kompüter bütün hüceyrələr arasındakı flüid axınını (4.3.1-ci
                dərsdəki Darcy tənliyi əsasında) eyni zamanda həll edir. Məhz bu minlərlə kiçik
                hesablamanın cəmi, tək bir OOIP rəqəminin heç vaxt göstərə bilməyəcəyi
                detallı, məkan üzrə dəyişən bir mənzərə yaradır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Sahənin mürəkkəb heterogenliyi və çoxsaylı quyu tarixçəsi, tam miqyaslı compositional simulyasiya modelləri vasitəsilə idarə olunub, bu da su vurma strategiyalarının optimallaşdırılmasına imkan verib." },
                { name: "Ghawar sahəsi, Səudiyyə Ərəbistanı", text: "Dünyanın ən böyük reservoir simulyasiya modellərindən bəziləri məhz bu sahə üçün qurulub — nəhəng ölçüsü və uzun istismar tarixçəsi, tarixi uyğunlaşdırma prosesini xüsusilə mürəkkəbləşdirir." },
                { name: "Troll sahəsi, Norveç Şimal dənizi", text: "Nazik neft zolağı (thin oil rim) ilə xarakterizə olunan bu sahədə, dəqiq 3D simulyasiya modelləri olmadan optimal quyu yerləşdirilməsi mümkün olmazdı." },
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
              <li>• Reservoir simulyasiyası, Darcy qanunu və material balance-i minlərlə hüceyrədə eyni anda həll edir</li>
              <li>• Grid ölçüsü, dəqiqlik ilə hesablama vaxtı arasında əsas mübadilə amilidir</li>
              <li>• Simulyator növü (black oil, compositional, thermal) flüid tipi və layihə məqsədinə görə seçilir</li>
              <li>• History matching modelin keçmişlə uyğunluğunu göstərir, amma gələcəyə zəmanət vermir</li>
              <li>• Nəticələr non-uniqueness səbəbindən həmişə qeyri-müəyyənlik aralığında qiymətləndirilməlidir</li>
            </ul>
          </section>

          <section
            className="rounded-2xl px-6 py-6 text-center"
            style={{ background: `linear-gradient(135deg, ${PATH_COLOR}14, rgba(255,255,255,0.02))`, border: `1px solid ${PATH_COLOR}33` }}
          >
            <p className="text-[11px] font-mono uppercase tracking-wide mb-2" style={{ color: PATH_COLOR }}>
              Təbriklər
            </p>
            <p className="text-[14px] leading-[1.75]" style={{ color: "#D6E0F0" }}>
              Bununla Rezervuar (Reservoir Engineering) path-ının bütün dərslərini
              tamamladınız — PVT əsaslarından tutmuş, həcm hesablamalarına, axın davranışına
              və nəhayət tam simulyasiyaya qədər. Bu bilik zənciri sizə bir reservoiru həm
              statik, həm dinamik, həm də miqyaslı bir sistem kimi anlamaq bacarığı verir.
            </p>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/reservoir/recovery-factor-eor"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Recovery Factor və EOR
          </Link>
          <Link
            href="/learn/reservoir"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Path Tamamlandı — Rezervuara Geri Dön
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}