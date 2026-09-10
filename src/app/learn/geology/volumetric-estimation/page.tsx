"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const volumetricParams = [
  { param: "GRV (Gross Rock Volume)", işarə: "GRV", vahid: "m³ və ya acre-ft", izah: "Tələ strukturunun ümumi həcmi — süxur qatının tutduğu bütöv fəza" },
  { param: "Net-to-Gross", işarə: "N/G", vahid: "faiz (%)", izah: "Ümumi qalınlığın nə qədərinin faktiki kollektor süxur (təmiz qumdaşı və s.) olduğu" },
  { param: "Məsaməlilik", işarə: "φ (phi)", vahid: "faiz (%)", izah: "Süxurun içindəki boşluqların ümumi həcmə nisbəti — mayenin saxlanacağı yer" },
  { param: "Neft doyğunluğu", işarə: "So", vahid: "faiz (%)", izah: "Məsamələrdəki mayenin nə qədərinin su deyil, neft olduğu" },
  { param: "Formasiya həcm əmsalı", işarə: "Bo", vahid: "rb/stb (nisbət)", izah: "Yeraltı şəraitdəki neftin səthə çıxarkən həcminin necə dəyişdiyini göstərən əmsal" },
];

export default function VolumetricEstimationLesson() {
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
              1.4.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Qiymətləndirmə və Qərar
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Ehtiyatların İlkin Qiymətləndirilməsi <span style={{ color: "#F0F4FF" }}>(Volumetric Estimation)</span>
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          {/* Creative intro: historical/practical context hook */}
          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə bu mövzu vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Təsəvvür edin ki, 1.3.3-də öyrəndiyimiz kəşfiyyat quyusu uğurlu oldu — quyudan neft
              gəldi. Lakin bu, hələ "biz zəngin olduq" demək deyil. İlk sual budur:{" "}
              <strong>orada nə qədər neft var?</strong> Bir yataqda 500 min barrel də ola bilər,
              500 milyon barrel də — və bu fərq layihənin kommersiya cəhətdən mənalı olub-olmadığını
              tamamilə dəyişir. Volumetrik qiymətləndirmə məhz bu sualın ilk, ən sadə cavabıdır —
              hələ mürəkkəb rezervuar simulyasiyalarına keçmədən, əldə olan geoloji və petrofiziki
              parametrləri bir formulada birləşdirərək yerin altında təxminən neçə barrel neftin
              "yerində" (in-place) olduğunu hesablamaq.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. OOIP nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              OOIP (Original Oil In Place) — kollektor süxurunun içində, hələ heç bir hasilat
              aparılmazdan əvvəl mövcud olan ümumi neft həcmini ifadə edir. Diqqət edin: OOIP
              çıxarıla biləcək neftin miqdarı deyil, yerin altında fiziki olaraq mövcud olan
              ümumi miqdardır — real hasilat isə bunun yalnız bir hissəsini (adətən 10-60%-ni,
              rezervuar tipindən asılı olaraq) təşkil edir. Buna baxmayaraq, OOIP hər bir
              kəşfiyyat layihəsinin ilk "böyüklük ölçüsüdür" — bir yatağın kommersiya baxımından
              maraqlı olub-olmadığına ilkin qərar məhz bu rəqəmə əsaslanır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Hesablamanın beş əsas parametri
            </h2>
            <p className="text-[14px] leading-[1.75]">
              OOIP hesablaması tək bir ölçüdən deyil, beş fərqli geoloji və petrofiziki
              parametrin hasilindən ibarətdir. Bu parametrlərin hər biri əvvəlki dərslərdə
              öyrəndiyimiz məlumat mənbələrindən — seysmik interpretasiyadan struktur həcmi,
              core və log analizlərindən isə məsaməlilik və doyğunluq göstəriciləri — əldə edilir.
              Hər parametrdəki kiçik səhv belə, son nəticədə böyük fərqlərə səbəb ola bilər, buna
              görə də hər birinin mənbəyi və etibarlılığı diqqətlə qiymətləndirilməlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Parametrlərin geoloji mənşəyi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              GRV adətən 3D seysmik interpretasiyadan alınan struktur xəritələr əsasında hesablanır
              — tələnin sərhədləri və qatların dərinliyi seysmik kəsiklərdə "kontur" xətləri kimi
              çəkilir və bu konturların əhatə etdiyi həcm inteqrasiya olunur. Net-to-Gross, məsaməlilik
              və neft doyğunluğu isə əsasən well logging və core analizlərindən əldə edilir — yəni
              1.3.3-də öyrəndiyimiz kəşfiyyat quyusunun məhz bu məlumatları təmin etmək üçün
              qazıldığını xatırlayaq. Formasiya həcm əmsalı isə neftin öz tərkibindən (qaz-neft
              nisbəti, təzyiq və temperatur) asılı olaraq laboratoriya analizləri ilə müəyyən edilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Parametrlərin cədvəli
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Parametr</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>İşarə</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Vahid</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>İzah</th>
                  </tr>
                </thead>
                <tbody>
                  {volumetricParams.map((p) => (
                    <tr key={p.param} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{p.param}</td>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{p.işarə}</td>
                      <td className="px-3 py-2" style={{ color: "#9FAEC4" }}>{p.vahid}</td>
                      <td className="px-3 py-2" style={{ color: "#9FAEC4" }}>{p.izah}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Creative element: warning callout */}
          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#D8823B14", border: "1px solid #D8823B40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#D8823B" }}>
              Ümumi səhv
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Yeni başlayanlar tez-tez OOIP-ni birbaşa "çıxarıla bilən ehtiyat" (recoverable
              reserves) ilə qarışdırırlar. Əslində OOIP yalnız yerin altındakı ümumi miqdardır —
              real hasilat isə <strong>recovery factor</strong> (bərpa əmsalı) adlanan əlavə bir
              əmsalla vurulmalıdır. Məsələn, 100 milyon barrel OOIP-i olan bir yataqda bərpa
              əmsalı 30% olarsa, real çıxarıla bilən ehtiyat cəmi 30 milyon barrel olacaq. Bu iki
              anlayışı qarışdırmaq layihənin dəyərini kəskin şəkildə şişirdə bilər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Sadə OOIP formulası
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: GRV = 50,000,000 m³, N/G = 0.6, φ = 0.20, So = 0.70, Bo = 1.2
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                OOIP = (GRV × N/G × φ × So) / Bo
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>OOIP = (50,000,000 × 0.6 × 0.20 × 0.70) / 1.2</p>
                <p>OOIP = 4,200,000 / 1.2 ≈ <span style={{ color: PATH_COLOR }}>3,500,000 m³</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: verilmiş struktur həcmi, kollektor keyfiyyəti və neft doyğunluğu şəraitində
                yataqda təxminən 3.5 milyon m³ (bu, təxminən 22 milyon barrelə bərabərdir) neft
                yerində mövcuddur. Diqqət edin ki, bu, hələ real çıxarıla bilən miqdar deyil —
                sonrakı mərhələdə bərpa əmsalı tətbiq edilməlidir. Bu sadə hesablama modeli
                "deterministik" adlanır; real layihələrdə isə hər parametr üçün minimum-orta-maksimum
                ssenariləri ilə ehtimal əsaslı (probabilistik) qiymətləndirmə də aparılır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Qavar Yatağı, Səudiyyə Ərəbistanı", text: "Dünyanın ən böyük konvensional neft yatağı olan Qavarın orijinal ehtiyatları volumetrik hesablamalarla yüz milyardlarla barrel səviyyəsində qiymətləndirilib." },
                { name: "Prudhoe Bay, Alyaska, ABŞ", text: "1968-ci ildə kəşf edilən bu yataqda ilkin volumetrik hesablamalar ABŞ tarixinin ən böyük neft layihələrindən birinin infrastruktur investisiyasına əsas yaradıb." },
                { name: "Azəri-Çıraq-Günəşli (ACG), Azərbaycan", text: "ACG blokunun ilkin OOIP qiymətləndirilməsi 1994-cü ildə imzalanan 'Əsrin Müqaviləsi'nin kommersiya əsaslandırılmasında həlledici rol oynayıb." },
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
              <li>• OOIP yataqda hasilatdan əvvəl mövcud olan ümumi neft miqdarını göstərir, çıxarıla bilən miqdarı deyil</li>
              <li>• Hesablama GRV, Net-to-Gross, məsaməlilik, neft doyğunluğu və formasiya həcm əmsalının birləşməsinə əsaslanır</li>
              <li>• Bu beş parametr seysmik interpretasiya, well logging və core analizlərindən əldə edilir</li>
              <li>• Real çıxarıla bilən ehtiyatı tapmaq üçün OOIP mütləq bərpa əmsalı (recovery factor) ilə vurulmalıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/exploration-wells"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Kəşfiyyat Quyuları
          </Link>
          <Link
            href="/learn/geology/risk-analysis"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Risk Analizi
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}