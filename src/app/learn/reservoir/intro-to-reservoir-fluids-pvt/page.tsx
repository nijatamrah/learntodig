"use client";
import Link from "next/link";

const PATH_COLOR = "#2DBE8C";

const fluidTypes = [
  { name: "Qara neft (Black Oil)", gor: "< 2,000 scf/bbl", note: "Ən çox rast gəlinən tip, aşağı-orta GOR, yüksək sıxlıq" },
  { name: "Uçucu neft (Volatile Oil)", gor: "2,000 – 3,300 scf/bbl", note: "Təzyiq azaldıqca tərkibi kəskin dəyişir" },
  { name: "Kondensat qaz (Gas Condensate)", gor: "3,300 – 150,000 scf/bbl", note: "Səthdə qismən mayeyə (kondensata) çevrilir" },
  { name: "Quru qaz (Dry Gas)", gor: "> 150,000 scf/bbl", note: "Praktiki olaraq maye fazaya keçmir" },
];

export default function IntroReservoirFluidsPvtLesson() {
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
              4.1.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Reservoir Əsasları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Reservoir Fluidlərinə Giriş (PVT Əsasları)
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <p className="text-[14px] leading-[1.8] italic" style={{ color: "#9FAEC4" }}>
              Bir qazlı içəcəyi düşün — şüşədə, yüksək təzyiq altında, qazı mayenin içində
              həll olunmuş vəziyyətdə qalır. Şüşəni açanda təzyiq düşür, qaz çıxır, köpüklənir.
              Reservoir flüidləri də dərinlikdə eyni şəkildə davranır — yüksək təzyiq altında qaz
              neftin içində həll olunub, quyu vasitəsilə səthə çıxarkən təzyiq düşür və qaz
              ayrılmağa başlayır. Bu davranışı riyazi şəkildə təsvir edən sahəyə{" "}
              <strong style={{ color: "#E8DCC8" }}>PVT (Pressure-Volume-Temperature)</strong>{" "}
              analizi deyilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. PVT nədir və niyə vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              PVT analizi — reservoir flüidlərinin təzyiq, həcm və temperatur dəyişdikcə necə
              davrandığını öyrənən sahədir. Bu, sadəcə akademik maraq deyil — hər bir volumetrik
              hesablama, material balance tənliyi və hətta quyu istehsalı proqnozu PVT
              parametrlərinə əsaslanır. Yanlış PVT məlumatı, bütün sonrakı mühəndislik
              qərarlarını (məs. nə qədər neft çıxarıla biləcəyi) səhv istiqamətə apara bilər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Reservoir fluidlərinin əsas növləri
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Fluidlər, Gas-Oil Ratio (GOR) — yəni hasil olunan neftin həcminə düşən qaz
              miqdarına — görə təsnif edilir:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tip</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>GOR</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qeyd</th>
                  </tr>
                </thead>
                <tbody>
                  {fluidTypes.map((f) => (
                    <tr key={f.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{f.name}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{f.gor}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{f.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Əsas PVT parametrləri
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>
                  Formation Volume Factor (Bo)
                </p>
                <p className="text-[14px] leading-[1.75]">
                  Reservoir şəraitindəki 1 barrel neftin, səth şəraitinə (stock tank) çatanda
                  hansı həcmə uyğun gəldiyini göstərir. Adətən Bo &gt; 1 olur, çünki reservoir
                  təzyiqi altında neft daxilində həll olunmuş qaz, səthə çıxanda ayrılıb neftin
                  həcmini kiçildir.
                </p>
              </div>
              <div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>
                  Solution Gas-Oil Ratio (Rs)
                </p>
                <p className="text-[14px] leading-[1.75]">
                  Verilmiş təzyiq və temperaturda, neft daxilində həll olunmuş qazın miqdarını
                  göstərir (scf/bbl). Təzyiq azaldıqca, bir həddən (bubble point) sonra Rs azalır,
                  çünki qaz ayrılmağa başlayır.
                </p>
              </div>
              <div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>
                  Bubble Point Pressure (Pb)
                </p>
                <p className="text-[14px] leading-[1.75]">
                  Təzyiq bu həddə düşən kimi, neft daxilində ilk qaz köpükcükləri əmələ gəlməyə
                  başlayır. Bundan yuxarı təzyiqlərdə flüid tək fazadadır (undersaturated),
                  aşağıda isə iki fazalıdır (neft + sərbəst qaz).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Təzyiq azalarkən baş verən proses
            </h2>
            <div className="space-y-2.5">
              {[
                "Reservoir təzyiqi ilkin dəyərdən aşağı düşməyə başlayır (istismar nəticəsində)",
                "Təzyiq bubble point-ə çatanadək, flüid tək fazalı qalır — Bo tədricən azalır",
                "Bubble point-dən aşağı düşdükdə, sərbəst qaz fazası yaranır",
                "Sərbəst qaz reservoirdə hərəkət etməyə başlayır — bu, quyu GOR-unu artırır",
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
            style={{ background: "#A78BFA14", border: "1px solid #A78BFA40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#A78BFA" }}>
              Fərziyyə və Məhdudiyyətlər
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              PVT korrelyasiyaları (Standing, Vasquez-Beggs kimi) real laboratoriya nümunələri
              əsasında qurulub, amma bunlar <strong>empirik</strong> düsturlardır — konkret
              geoqrafi bölgələr üçün kalibrlənib. Fərqli tərkibli neft üçün tətbiq edildikdə
              xəta payı 10-20%-ə qədər arta bilər. Buna görə mümkün olduqda, real PVT laboratoriya
              testləri (məs. differential liberation test) korrelyasiyalardan üstün tutulur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Formation Volume Factor tətbiqi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Bo-nun praktiki istifadəsinə baxaq — reservoir barrels-i stock tank barrels-ə
              çevirmək üçün:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: reservoir daxilində 1,000,000 rb (reservoir barrel) neft, Bo = 1.35 rb/stb
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                STB = Reservoir həcmi / Bo
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>STB = 1,000,000 / 1.35 = <span style={{ color: PATH_COLOR }}>740,741 stb</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: reservoirdəki 1 milyon barrel neft, səth şəraitində yalnız ~740,741
                barrel kimi ölçüləcək — fərq, reservoir daxilində həll olunmuş qazın həcm
                töhfəsindən qaynaqlanır. Bu fərq bütün sonrakı ehtiyat hesablamalarında nəzərə
                alınmalıdır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Black oil tipli reservoir flüidi — orta-yüksək API sıxlığı ilə tanınır, PVT xüsusiyyətləri illər ərzində geniş öyrənilib." },
                { name: "Prudhoe Bay, Alyaska", text: "Klassik black oil reservoiru, uzun müddətli material balance tədqiqatları üçün sənayedə istinad nöqtəsi olub." },
                { name: "Şimal dənizi kondensat sahələri", text: "Gas condensate tipli fluidlərlə tanınır — təzyiq azaldıqca kondensasiya (retrograde condensation) hadisəsi xüsusi diqqət tələb edir." },
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
              <li>• PVT — flüidin təzyiq/həcm/temperatur asılılığında davranışını təsvir edir</li>
              <li>• Fluidlər GOR-a görə təsnif olunur: black oil, volatile oil, gas condensate, dry gas</li>
              <li>• Bo, Rs və bubble point pressure — ən əsas PVT parametrləridir</li>
              <li>• Bubble point-dən aşağı təzyiqdə flüid iki fazalı olur (neft + sərbəst qaz)</li>
              <li>• PVT korrelyasiyaları empirikdir — real laboratoriya testləri daha etibarlıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/reservoir"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Rezervuar
          </Link>
          <Link
            href="/learn/reservoir/reservoir-pressure-temperature"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Reservoir Təzyiqi və Temperatur
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}