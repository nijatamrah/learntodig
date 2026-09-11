"use client";
import Link from "next/link";

const PATH_COLOR = "#3B9BD8";

const archieParams = [
  { param: "a (tortuozluq əmsalı)", typical: "≈ 1.0", meaning: "Boşluq şəbəkəsinin əyriliyini əks etdirir" },
  { param: "m (sementasiya göstəricisi)", typical: "1.8 – 2.2 (adətən 2.0)", meaning: "Boşluqların bir-birinə bağlılıq dərəcəsi" },
  { param: "n (doyma göstəricisi)", typical: "≈ 2.0", meaning: "Flüidin boşluqda paylanma xarakteri" },
  { param: "Rw (formasiya suyu müqaviməti)", typical: "0.02 – 1.0 Ω·m", meaning: "Duzluluqdan asılı, laboratoriya/SP ilə təyin olunur" },
];

export default function WaterSaturationArchieLesson() {
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
              3.3.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Petrofizika Hesablamaları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Su Doyma Dərəcəsi (Archie Tənliyi)
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Boşluğu tapdıq — bəs içi nə ilə doludur?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              3.3.1-də bir intervalın 10.6% effektiv boşluğa malik olduğunu hesabladıq. Amma bu
              boşluqda nə var — su, yoxsa neft? Bu sual bütün petrofizikanın son və ən vacib
              sualıdır, çünki cavab birbaşa quyunun kommersiya dəyərini müəyyən edir. 1942-ci ildə
              Shell-in mühəndisi Gus Archie bu sualı riyazi şəkildə həll edən bir tənlik dərc etdi
              və bu tənlik bu gün də, 80 ildən çox sonra, sənayenin standart alətidir. Bu dərsdə
              Archie tənliyini addım-addım quracağıq.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Su doyma dərəcəsi (Sw) nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Su doyma dərəcəsi (Sw — Water Saturation) effektiv boşluğun neçə faizinin su ilə
              dolu olduğunu göstərir, 0-dan 1-ə (və ya 0%-dən 100%-ə) qədər ifadə olunur. Qalan
              hissə, yəni (1 − Sw), karbohidrogen doyma dərəcəsidir (Sh) — məhz bu hissə mühəndisi
              maraqlandırır. Sw nə qədər aşağıdırsa, boşluqda bir o qədər çox neft/qaz var deməkdir.
              Vacib məqam: Sw heç vaxt sıfır olmur, çünki süxur dənələrinin səthində həmişə nazik,
              &quot;irreducible&quot; (çıxarıla bilməyən) bir su təbəqəsi qalır — bu, kapilyar qüvvələr
              səbəbindəndir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. Niyə resistivity Sw-ni göstərə bilir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              3.2.1-də öyrəndiyimiz kimi, duzlu formasiya suyu elektriki asanlıqla keçirir, neft
              və qaz isə demək olar ki, izolyatordur. Bu o deməkdir ki, süxurun ümumi elektrik
              müqaviməti (Rt) əsasən boşluqdakı suyun miqdarından və duzluluğundan asılıdır. Sw
              azaldıqca (yəni neft artdıqca), keçirici yolların sayı azalır və Rt kəskin yüksəlir.
              Bu əlaqə xətti deyil, güc funksiyasıdır — məhz Archie-nin kəşfi bu funksiyanı
              riyazi şəkildə formullaşdırmaq oldu.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Archie tənliyinin özü
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Tənliyin tam forması belədir: Sw^n = (a / φ^m) × (Rw / Rt). Burada φ — effektiv
              porosity (3.3.1-dən), Rt — deep resistivity log oxunuşu (3.2.1-dən), Rw — formasiya
              suyunun öz müqaviməti (yəni süxur olmasaydı, sadəcə suyun özünün göstərəcəyi
              müqavimət). a, m, n isə süxurun boşluq strukturuna bağlı empirik əmsallardır. Tənliyi
              Sw üçün həll etsək: Sw = [(a·Rw) / (φ^m·Rt)]^(1/n). Diqqət et — bu tənlik yalnız
              &quot;təmiz&quot; (gilsiz) süxurlar üçün etibarlıdır; gilli süxurlarda gilin özünün əlavə
              elektrik keçiriciliyi səbəbindən düzəliş edilmiş versiyalar (Simandoux, Indonesia
              tənliyi) istifadə olunur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Archie parametrləri: a, m, n, Rw
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Parametr</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tipik qiymət</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Nəyi göstərir</th>
                  </tr>
                </thead>
                <tbody>
                  {archieParams.map((p) => (
                    <tr key={p.param} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{p.param}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: "#C4CEE0" }}>{p.typical}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{p.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              5. Rw necə təyin olunur?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Rw hesablamanın ən kritik girişidir, çünki kiçik xəta Sw-də böyük xətaya səbəb olur.
              Ən etibarlı üsul — qonşu quyuda bilinən, 100% su ilə doyğun (Sw = 1) bir intervalın
              Rt qiymətini oxuyub, Archie tənliyini Rw üçün tərsinə həll etməkdir (buna &quot;Rw from
              water zone&quot; üsulu deyilir). Alternativ üsullar arasında SP (Spontaneous Potential)
              logundan hesablama və ya formasiya suyu nümunəsinin birbaşa laboratoriya analizi
              var. Rw temperaturdan da asılıdır — dərinlik artdıqca temperatur yüksəlir və Rw
              azalır, ona görə hesablamalarda dərinliyə uyğun temperatur düzəlişi edilməlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Sw hesablama iş axını
            </h2>
            <div className="space-y-2.5">
              {[
                "GR logundan IGR və Vsh hesabla (3.2.1, 3.3.1)",
                "Density/neutron logundan effektiv porosity (φe) tap (3.3.1)",
                "Qonşu su zonasından və ya SP logundan Rw təyin et",
                "Deep resistivity logundan (Rt) hədəf intervalın oxunuşunu götür",
                "Archie tənliyini Sw üçün həll et: Sw = [(a·Rw)/(φ^m·Rt)]^(1/n)",
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

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: PATH_COLOR + "14", border: `1px solid ${PATH_COLOR}40` }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: PATH_COLOR }}>
              Tipik Log Cavabı
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Su ilə doyğun zona — Sw</span>
                <span style={{ color: PATH_COLOR }}>80–100%</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Keçid zonası (transition) — Sw</span>
                <span style={{ color: PATH_COLOR }}>40–80%</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Neft zonası — Sw</span>
                <span style={{ color: PATH_COLOR }}>15–40%</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Yüksək keyfiyyətli qaz zonası — Sw</span>
                <span style={{ color: PATH_COLOR }}>10–25%</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Hesablama — Sw Tapılması
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              3.3.1-dən φe = 0.106 (10.6%) dəyərini götürək. Bu intervalda deep resistivity (LLD)
              oxunuşu Rt = 150 Ω·m (3.2.1-dəki &quot;neft ilə doyğun qumdaşı&quot; aralığına uyğun), Rw =
              0.05 Ω·m (qonşu su zonasından təyin edilib), a = 1, m = 2, n = 2 standart qiymətləri
              ilə hesablayaq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Sw = [(a·Rw) / (φ^m·Rt)]^(1/n)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Sw = [(1 × 0.05) / (0.106² × 150)]^(1/2)</p>
                <p>Sw = [0.05 / (0.01124 × 150)]^(1/2)</p>
                <p>Sw = [0.05 / 1.685]^(1/2) = [0.0297]^(1/2)</p>
                <p>Sw ≈ <span style={{ color: PATH_COLOR }}>0.172 (17.2%)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: Sw ≈ 17.2% — deməli karbohidrogen doyma dərəcəsi Sh = 1 − 0.172 ≈ 82.8%.
                Bu çox yüksək göstəricidir və bu intervalın güclü neft (və ya kondensat) zonası
                olduğunu göstərir. Beləliklə, üç dərs boyu (3.2.1 → 3.3.1 → 3.3.2) apardığımız
                zəncirvari hesablama — IGR → Vsh → φe → Sw — bizi son nəticəyə gətirdi: bu təbəqə
                həm kollektor keyfiyyətinə (φe = 10.6%, Vsh = 12.1%), həm də karbohidrogen
                doyğunluğuna (Sh ≈ 83%) görə perforasiya üçün namizəddir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Azeri-Chirag-Günəşli (ACG), Azərbaycan", text: "Rw dəyərləri qonşu su zonalarından kalibrasiya olunur və Archie tənliyi BSR lay dəstinin əksər təmiz qumdaşı intervallarında birbaşa tətbiq edilir." },
                { name: "Gavar (Ghawar), Səudiyyə Ərəbistanı", text: "Karbonat kollektoru olduğu üçün standart m=2 əvəzinə çatlaq və vuqlar səbəbindən daha yüksək m qiymətləri istifadə olunur — Archie-nin karbonatlara uyğunlaşdırılmış versiyası." },
                { name: "Kaşaqan yatağı, Qazaxıstan (Xəzər dənizi)", text: "Mürəkkəb, çatlaqlı karbonat strukturunda Archie parametrləri (m, n) nüvə analizləri ilə xüsusi kalibrasiya olunur, çünki standart qiymətlər burada böyük xəta verir." },
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
              <li>• Sw — effektiv boşluğun su ilə doldurulmuş faizidir, (1 − Sw) isə karbohidrogen doyğunluğudur</li>
              <li>• Archie tənliyi yalnız gilsiz, təmiz süxurlar üçün etibarlıdır</li>
              <li>• Rw dəqiqliyi nəticəyə birbaşa təsir edir — ən etibarlı üsul qonşu su zonasından kalibrasiyadır</li>
              <li>• Karbonat kollektorlarda a, m, n standart qiymətlərdən fərqlənə bilər və nüvə analizi ilə düzəldilməlidir</li>
              <li>• Sw = [(a·Rw)/(φ^m·Rt)]^(1/n) — IGR, Vsh və φe-dən sonrakı zəncirin son həlqəsidir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/well-log/shale-volume-effective-porosity"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Şist Həcmi və Effektiv Məsaməlilik
          </Link>
          <Link
            href="/learn/well-log/log-correlation-reservoir-evaluation"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Log Korrelyasiyası və Kollektor Qiymətləndirməsi
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}