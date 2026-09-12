"use client";
import Link from "next/link";

const PATH_COLOR = "#2DBE8C";

const gradientTypes = [
  { name: "Anormal aşağı (Underpressured)", value: "< 0.433 psi/ft", note: "Adətən tükənmiş və ya köhnə istismarda olan reservoirlarda rast gəlinir" },
  { name: "Normal hidrostatik", value: "≈ 0.433 – 0.465 psi/ft", note: "Reservoir səth suyu sütunu ilə hidravlik əlaqədədir — ən çox rast gəlinən hal" },
  { name: "Anormal yüksək (Overpressured)", value: "> 0.465 psi/ft, bəzən 0.7-0.9 psi/ft", note: "Möhürlənmiş (təcrid olunmuş) reservoirlarda, sürətli çökmə zonalarında baş verir" },
];

const measurementCards = [
  { title: "RFT / MDT ölçmələri", text: "Quyu kəməri ilə (wireline) reservoir daxilində birbaşa təzyiq nöqtələri götürülür — ən dəqiq üsuldur." },
  { title: "DST (Drill Stem Test)", text: "Quyu qazılarkən müvəqqəti istehsal testi ilə təzyiq və axın xüsusiyyətləri ölçülür." },
  { title: "Build-up testləri", text: "Quyu bağlandıqdan sonra təzyiqin bərpa olunma sürəti reservoir təzyiqini göstərir." },
  { title: "Geotermal karotaj", text: "Quyu daxilində temperatur sensorları ilə dərinliyə görə temperatur profili çıxarılır." },
];

export default function ReservoirPressureTemperatureLesson() {
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
              4.1.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Reservoir Əsasları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Reservoir Təzyiqi və Temperatur
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <p className="text-[14px] leading-[1.8] italic" style={{ color: "#9FAEC4" }}>
              Yerin 3000 metr dərinliyində bir mühəndisə desən ki, oradakı təzyiq sadəcə suyun
              çəkisindən ibarətdir, o sənə haqlı olaraq sual verəcək — bəs niyə bəzi quyularda
              gözlənilməz şəkildə həddindən artıq yüksək təzyiq üzə çıxır və nəzarətdən çıxma
              (kick) riski yaradır? Cavab, reservoirin həmişə sadə hidrostatik qanuna tabe
              olmamasındadır. Bu dərsdə, reservoir təzyiqinin haradan qaynaqlandığını, necə
              ölçüldüyünü və temperaturun ona necə təsir etdiyini araşdıracağıq.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Reservoir təzyiqi haradan gəlir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Reservoir təzyiqi, əsasən üzərindəki qaya və maye qatlarının çəkisindən yaranan
              hidrostatik təzyiqdən qaynaqlanır. Dərinlik artdıqca, üzərindəki sütunun çəkisi
              də artır, buna görə təzyiq də mütənasib şəkildə yüksəlir. Lakin real reservoirlarda
              bu əlaqə həmişə sadə xətti formulaya tam uyğun gəlmir — geoloji proseslər (məs.
              sürətli çökmə, gil qatlarının möhürləyici təsiri) əlavə təzyiq mənbələri yarada
              bilər. Bu səbəbdən mühəndislər "normal" və "anormal" təzyiq rejimlərini fərqləndirir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Təzyiq qradiyenti — reservoirin "imzası"
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Təzyiq qradiyenti (pressure gradient), dərinlik vahidinə düşən təzyiq artımını
              göstərir və reservoirin geoloji tarixindən xəbər verir:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Rejim</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qradiyent</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qeyd</th>
                  </tr>
                </thead>
                <tbody>
                  {gradientTypes.map((g) => (
                    <tr key={g.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{g.name}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{g.value}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{g.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. İlkin reservoir təzyiqi (Pi) nə deməkdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              İlkin reservoir təzyiqi — hasilat başlamazdan əvvəl, reservoirin təbii tarazlıq
              vəziyyətində olan təzyiqidir. Bu dəyər, sonrakı bütün material balance
              hesablamalarının başlanğıc nöqtəsidir, çünki istismar zamanı təzyiqin nə qədər
              azaldığını qiymətləndirmək üçün ilkin nöqtəyə ehtiyac var. Əgər Pi, əvvəlki
              dərsdə bəhs edilən bubble point təzyiqindən (Pb) yüksəkdirsə, reservoir
              "undersaturated" hesab olunur — yəni flüid hələ tək fazadadır. Pi = Pb olduğu
              halda isə reservoir "saturated" adlanır və istismarın ilk günündən sərbəst qaz
              fazası mövcud ola bilər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Təzyiq necə ölçülür?
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Reservoir təzyiqi bir neçə fərqli üsulla, fərqli dəqiqlik səviyyələrində ölçülə bilər:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {measurementCards.map((c) => (
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
              5. Geotermal qradiyent və temperaturun rolu
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Dərinlik artdıqca temperatur da yüksəlir — bu asılılıq geotermal qradiyent
              adlanır və orta hesabla hər 100 metrə 2.5-3°C təşkil edir, baxmayaraq ki, bu
              dəyər bölgədən bölgəyə fərqlənir. Temperatur, sadəcə fon parametri deyil —
              birbaşa PVT xüsusiyyətlərinə təsir edir: yüksək temperaturda neftin özlülüyü
              azalır, qazın həll olma qabiliyyəti dəyişir, hətta bubble point təzyiqi belə
              temperaturdan asılıdır. Buna görə hər PVT ölçməsi mütləq konkret reservoir
              temperaturunda aparılmalıdır — otaq temperaturunda alınan nəticələr real
              reservoir şəraitini əks etdirmir.
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
              Normal hidrostatik qradiyent hesablamaları, reservoir ilə səth arasında fasiləsiz,
              hidravlik cəhətdən əlaqəli su sütunu olduğunu fərz edir. Real şəraitdə isə gil
              qatları, tektonik sıxışma və ya sürətli çökmə bu əlaqəni poza bilər və
              overpressure zonaları yarada bilər — bu zonalarda sadə dərinlik×qradiyent
              formulası real təzyiqi ciddi şəkildə azaltmış göstərə bilər. Bu səbəbdən qazma
              öncəsi mütləq seysmik və ya qonşu quyu məlumatları ilə təzyiq proqnozu
              dəqiqləşdirilməlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — Hidrostatik təzyiqin qiymətləndirilməsi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Normal hidrostatik qradiyent əsasında, verilmiş dərinlikdə gözlənilən reservoir
              təzyiqini qiymətləndirək:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: dərinlik = 8,000 ft, formasiya suyu qradiyenti = 0.45 psi/ft
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                P = Qradiyent × Dərinlik
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>P = 0.45 × 8,000 = <span style={{ color: PATH_COLOR }}>3,600 psi</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu dərinlikdə gözlənilən normal reservoir təzyiqi təxminən 3,600 psi-dir.
                Əgər real ölçmə (RFT/MDT) bundan xeyli yüksək (məs. 5,000 psi) çıxarsa, bu
                reservoirin overpressured olduğunu göstərir. Əvvəlki dərsdə qeyd olunan Bo = 1.35
                kimi PVT parametrləri məhz bu cür ölçülmüş təzyiq və temperatur şəraitinə uyğun
                təyin edilir — fərqli təzyiq/temperatur şəraitində eyni neft üçün Bo dəyəri
                dəyişəcək.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Dərin dənizaltı reservoir şəraitində, ilkin təzyiq və temperatur profilləri hasilat strategiyasının planlaşdırılmasında əsas rol oynayıb." },
                { name: "Elgin-Franklin, Şimal dənizi", text: "HPHT (High Pressure High Temperature) sahəsi kimi tanınır — reservoir təzyiqi 1,100 bar-dan, temperaturu isə 200°C-dən yuxarı olub, xüsusi mühəndislik həlləri tələb edib." },
                { name: "Tahiti sahəsi, Meksika körfəzi", text: "Dərin sulardakı bu layihədə yüksək reservoir təzyiqi səbəbindən quyu dizaynında əlavə təhlükəsizlik marjları nəzərə alınıb." },
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
              <li>• Reservoir təzyiqi əsasən hidrostatik yükdən yaranır, amma geoloji proseslər onu poza bilər</li>
              <li>• Normal qradiyent ≈ 0.433-0.465 psi/ft, bundan kənar hallar anormal hesab olunur</li>
              <li>• İlkin reservoir təzyiqi (Pi), bubble point (Pb) ilə müqayisədə flüidin fazasını təyin edir</li>
              <li>• RFT/MDT, DST və build-up testləri təzyiqin ölçülməsində əsas üsullardır</li>
              <li>• Temperatur PVT parametrlərinə (Bo, özlülük və s.) birbaşa təsir edir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/reservoir/intro-to-reservoir-fluids-pvt"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Əvvəlki: Reservoir Fluidlərinə Giriş
          </Link>
          <Link
            href="/learn/reservoir/volumetric-method-ooip-ogip"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: OOIP/OGIP Hesablamaları
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}