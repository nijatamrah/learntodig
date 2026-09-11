"use client";
import Link from "next/link";

const PATH_COLOR = "#3B9BD8";

const matrixDensities = [
  { lith: "Qumdaşı (Sandstone)", density: "2.65 g/cm³", sonic: "55–60 µs/ft" },
  { lith: "Əhəngdaşı (Limestone)", density: "2.71 g/cm³", sonic: "47–50 µs/ft" },
  { lith: "Dolomit", density: "2.87 g/cm³", sonic: "43–45 µs/ft" },
  { lith: "Gil daşı (Shale)", density: "2.2–2.65 g/cm³ (dəyişkən)", sonic: "60–170 µs/ft" },
];

const threeTools = [
  { name: "Density", measures: "Elektron sıxlığı (qamma səpələnməsi)", key: "Boşluq həcmini birbaşa göstərir" },
  { name: "Neutron", measures: "Hidrogen indeksi (HI)", key: "Su/karbohidrogen tərkibli boşluqlara həssasdır" },
  { name: "Sonic", measures: "Akustik dalğanın keçmə vaxtı", key: "Sıxılma dərəcəsi və mexaniki xassələr" },
];

export default function DensityNeutronSonicLogsLesson() {
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
              3.2.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Əsas Log Növləri
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Density, Neutron və Sonic Logs
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Boş qutunu üç fərqli üsulla ölçmək
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Süngər kimi məsaməli bir maddənin nə qədər boş yerə malik olduğunu necə taparsan?
              Bir yol — onu çəkib, sıxlığını bilinən bərk materialla müqayisə etməkdir. Başqa yol
              — içinə su hopdurub nə qədər su tutduğunu ölçməkdir. Üçüncü yol — səsin ondan nə qədər
              sürətlə keçdiyinə baxmaqdır, çünki boşluqlar səsi ləngidir. Well logging-də məhz bu
              üç fərqli fiziki yanaşma — <strong>Density</strong>, <strong>Neutron</strong> və{" "}
              <strong>Sonic</strong> — süxurun məsaməliliyini ölçmək üçün istifadə olunur, hər biri
              öz güclü və zəif tərəfi ilə.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Density logu: fiziki prinsip
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Density aləti radioaktiv mənbədən (adətən Sezium-137) süxura qamma şüaları göndərir.
              Bu şüalar süxurdakı elektronlarla toqquşaraq səpələnir (Compton səpələnməsi) — nə
              qədər çox elektron sıxlığı (yəni nə qədər sıx material), bir o qədər az şüa geri
              detektora çatır. Alət geri qayıdan şüa miqdarını ölçüb bunu həcmi sıxlığa (bulk
              density, ρb) çevirir, g/cm³ vahidi ilə ifadə edir. Sıx, boşluqsuz süxur yüksək
              sıxlıq göstərir, məsaməli, boşluqlu süxur isə (boşluqlar adətən flüidlə dolu olduğu
              üçün, flüid qayadan yüngül olduğundan) daha aşağı sıxlıq göstərir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. Neutron logu: fiziki prinsip
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Neutron aləti də radioaktiv mənbədən (adətən Amerisium-Berillium) sürətli neytronlar
              yayır. Bu neytronlar süxurdakı atomlarla toqquşur, amma ən çox enerji itkisi hidrogen
              atomu ilə toqquşduqda baş verir — çünki hidrogenin kütləsi neytronunkuna çox
              yaxındır (elastiki toqquşmada bərabər kütləli iki cisim ən çox enerji mübadiləsi
              edir). Yer qabığında hidrogen demək olar ki, yalnız su və karbohidrogen
              molekullarında olur. Ona görə neutron log əslində hidrogen indeksini (HI) ölçür və
              bunu birbaşa məsaməlilik kimi göstərir — nə qədər çox flüidlə dolu boşluq, bir o
              qədər yüksək neutron porosity.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Sonic logu: fiziki prinsip
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Sonic (akustik) aləti bir ötürücüdən (transmitter) səs impulsu göndərir və bunun
              qonşu qəbuledicilərə (receiver) çatma vaxtını mikrosaniyə/fut (µs/ft) vahidi ilə
              ölçür — bu, İnterval Transit Time (Δt) adlanır. Səs dalğası sıx, bərk materialda
              sürətlə (az Δt), boşluqlu, zəif sementləşmiş materialda isə yavaş (çox Δt) hərəkət
              edir. Sonic logu təkcə məsaməlilik üçün deyil, həm də süxurun mexaniki
              möhkəmliyini (kəmər dizaynı, hidravlik yarma planlaşdırması üçün) qiymətləndirməkdə
              və seysmik məlumatla quyu loqlarını əlaqələndirməkdə (well-to-seismic tie) istifadə
              olunur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Üç alətin qısa müqayisəsi
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {threeTools.map((t) => (
                <div
                  key={t.name}
                  className="rounded-xl px-3 py-3"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-[13px] font-semibold mb-1" style={{ color: PATH_COLOR }}>{t.name}</p>
                  <p className="text-[12px] leading-[1.6] mb-1" style={{ color: "#C4CEE0" }}>{t.measures}</p>
                  <p className="text-[11.5px] leading-[1.5]" style={{ color: "#9FAEC4" }}>{t.key}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Litologiyaya görə matriks dəyərləri
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Porosity hesablamaq üçün süxurun &quot;matriks&quot; (boşluqsuz, təmiz bərk hissə) dəyərini
              bilmək lazımdır. Aşağıdakı cədvəl əsas litologiyalar üçün standart matriks
              qiymətlərini göstərir:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Litologiya</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Matriks sıxlığı (ρma)</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Sonic Δt (matriks)</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixDensities.map((m) => (
                    <tr key={m.lith} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{m.lith}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{m.density}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{m.sonic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              6. Qaz effekti: Density-Neutron crossover
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Density və Neutron loglarının birgə oxunuşunda ən dəyərli hadisələrdən biri{" "}
              <strong>qaz effekti</strong>dir (crossover). Su ilə doyğun zonada hər iki log
              oxşar məsaməlilik göstərir və əyrilər üst-üstə düşür. Amma boşluqda qaz olduqda
              vəziyyət dəyişir: qazın hidrogen sıxlığı çox aşağı olduğu üçün neutron log
              süni şəkildə aşağı porosity göstərir (qazı &quot;görmür&quot;), density log isə əksinə,
              qazın aşağı sıxlığı səbəbindən yüksək porosity göstərir. Nəticədə iki əyri bir-birini
              &quot;kəsir&quot; və vizual olaraq ayrılır — bu crossover, mütəxəssislər üçün qaz zonasının
              ən etibarlı ilkin göstəricilərindən biridir.
            </p>
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
                <span style={{ color: "#F0F4FF" }}>Su ilə doyğun qumdaşı — ρb</span>
                <span style={{ color: PATH_COLOR }}>2.35–2.45 g/cm³</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Qazla doyğun qumdaşı — ρb</span>
                <span style={{ color: PATH_COLOR }}>2.10–2.30 g/cm³</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Neutron porosity (su ilə doyğun qumdaşı)</span>
                <span style={{ color: PATH_COLOR }}>18–25 p.u.</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Neutron porosity (qazla doyğun qumdaşı)</span>
                <span style={{ color: PATH_COLOR }}>5–12 p.u. (süni aşağı)</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Hesablama — Density Porosity (φD)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              3.2.1-də eyni dərinlikdə GRlog = 65 API, IGR ≈ 0.35 (orta-gilli qumdaşı) tapmışdıq.
              İndi həmin intervalda density log oxunuşundan porosity hesablayaq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                φD = (ρma − ρb) / (ρma − ρfl)
              </p>
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: ρma = 2.65 g/cm³ (qumdaşı matriksi), ρb = 2.45 g/cm³ (log oxunuşu), ρfl = 1.0 g/cm³ (mud filtratı)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>φD = (2.65 − 2.45) / (2.65 − 1.0)</p>
                <p>φD = 0.20 / 1.65 ≈ <span style={{ color: PATH_COLOR }}>0.121 (12.1%)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: 12.1% porosity — bu orta-yaxşı kollektor keyfiyyətinə uyğundur. Diqqət et
                ki, bu hələ <em>total porosity</em>-dir, gil təsirini çıxarmamışıq. 3.3.1-də IGR
                (0.35) və φD (12.1%) dəyərlərini birləşdirərək daha dəqiq <em>effektiv
                porosity</em>-ni hesablayacağıq — bu, iki dərsin nəticələrinin birləşdiyi
                mərhələdir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Ümid qaz-kondensat yatağı, Azərbaycan", text: "SOCAR-ın işlətdiyi Ümid yatağında density-neutron crossover analizi qaz zonalarının dəqiq sərhədlərini müəyyənləşdirmək üçün standart üsuldur." },
                { name: "Troll yatağı, Norveç sektoru, Şimal dənizi", text: "Nəhəng qaz papağına malik Troll-da klassik density-neutron crossover effekti dərslik nümunəsi kimi geniş istinad edilir." },
                { name: "Prudhoe Bay, Alyaska, ABŞ", text: "Dərin, yüksək təzyiqli intervallarda sonic log məlumatları anormal təzyiq zonalarını (overpressure) aşkarlamaq üçün istifadə olunub." },
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
              <li>• Density logu Compton səpələnməsi ilə həcmi sıxlığı (ρb) ölçür</li>
              <li>• Neutron logu hidrogen indeksini ölçür və birbaşa porosity kimi göstərir</li>
              <li>• Sonic logu akustik keçmə vaxtını (Δt) ölçür — həm porosity, həm mexaniki xassələr üçün</li>
              <li>• Density-neutron crossover qaz zonalarının ən etibarlı vizual göstəricisidir</li>
              <li>• φD = (ρma − ρb) / (ρma − ρfl) — total porosity-nin əsas formuludur</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/well-log/gamma-ray-resistivity-logs"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Gamma Ray və Resistivity Logs
          </Link>
          <Link
            href="/learn/well-log/shale-volume-effective-porosity"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Şist Həcmi və Effektiv Məsaməlilik
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}