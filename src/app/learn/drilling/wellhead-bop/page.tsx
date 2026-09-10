"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const bopComponents = [
  { name: "Annular Preventer", pressure: "2,000 – 15,000 psi", function: "Elastik rezin elementlə istənilən ölçülü boru ətrafını (və ya açıq quyunu) bağlayır" },
  { name: "Pipe Rams", pressure: "5,000 – 15,000 psi", function: "Konkret ölçülü drill pipe ətrafını sıx bağlayır, boru olan quyuda istifadə olunur" },
  { name: "Blind Rams", pressure: "5,000 – 15,000 psi", function: "Quyuda heç bir boru olmadıqda tam açıq quyunu bağlayır" },
  { name: "Shear Rams", pressure: "10,000 – 15,000 psi", function: "Son çarə — drill pipe-ı kəsərək quyunu tam izolyasiya edir (blowout qarşısıalma)" },
];

const wellControlSystem = [
  { name: "Accumulator (Akkumulyator)", note: "Hidravlik təzyiq saxlayır — güc kəsilsə belə BOP-u dərhal bağlamaq üçün ehtiyat enerji verir" },
  { name: "Choke Manifold", note: "Kick zamanı quyudan çıxan mayeni idarəli şəkildə, təzyiqi tənzimləyərək səthə yönləndirir" },
  { name: "Kill Line", note: "Ağır mud-u quyuya vuraraq formasiya təzyiqini tarazlamaq üçün istifadə olunan xətt" },
  { name: "Control Panel", note: "Rig floor-da və uzaq (remote) məntəqədə BOP funksiyalarını idarə edən qovşaq" },
];

export default function WellheadBopLesson() {
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
              2.2.3
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Quyu Konstruksiyası
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Wellhead və BOP
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1901-ci il, Spindletop: nəzarətsiz quyunun dərsi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              1901-ci ildə Texasın Spindletop sahəsində açılan quyu heç bir nəzarət avadanlığı
              olmadan 9 gün ərzində yüzminlərlə barel neft səpələdi — sənayenin ilk böyük
              &quot;gusher&quot; hadisəsi. Bu və oxşar hadisələr mühəndisləri quyu ağzında
              təzyiqi tam idarə edə biləcək avadanlıq yaratmağa vadar etdi. Bu gün həmin ehtiyac
              iki əsas sistemlə ödənilir: daimi qalan <strong>wellhead</strong> və müvəqqəti
              quraşdırılan, kritik hallarda quyunu tam bağlaya bilən <strong>BOP (Blowout
              Preventer)</strong> stack-i.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Wellhead — quyunun daimi ağzı
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Wellhead, 2.2.1 və 2.2.2-də gördüyümüz hər casing təbəqəsinin səthdə asıldığı və
              bağlandığı struktur qovşaqdır. Hər casing üçün ayrıca <strong>casing head</strong>
              və ya <strong>casing spool</strong> quraşdırılır ki, o casing-in çəkisi asılsın və
              casing-lər arası boşluq (annulus) təzyiqi izlənilə bilsin. Quyu istehsala
              başladıqda, wellhead üzərinə <strong>tubing head</strong> və master valve-lər
              əlavə olunaraq nəhayət &quot;Christmas Tree&quot; adlanan istehsal başlığı formalaşır
              — bunu equipment modulunda ətraflı gördük.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. BOP Stack — son müdafiə xətti
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Wellhead üzərinə quraşdırılan BOP stack, qazma zamanı formasiyadan gələn nəzarətsiz
              axını (kick) dayandırmaq üçün nəzərdə tutulmuş bir neçə bağlayıcı elementdən ibarətdir.
              Stack adətən aşağıdan yuxarıya doğru artan çətinliklə düzülür — ən çətin şərtlərdə
              işləyən shear ram ən son həll kimi ən yuxarıda yerləşir:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Komponent</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təzyiq Reytinqi</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Funksiyası</th>
                  </tr>
                </thead>
                <tbody>
                  {bopComponents.map((b) => (
                    <tr key={b.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{b.name}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{b.pressure}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{b.function}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Annular Preventer — ilk cavab xətti
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Annular preventer adətən stack-in ən yuxarısında yerləşir və ilk müdaxilə vasitəsi
              kimi istifadə olunur. Daxilindəki güclü rezin/elastomer element hidravlik təzyiqlə
              sıxılaraq, içindən keçən istənilən diametrdəki borunu (hətta fərqli ölçülü tool
              joint-ləri) əhatə edərək bağlaya bilir — bu, pipe ram-lardan fərqli olaraq,
              konkret ölçüyə uyğunlaşmasını tələb etmir. Amma daha aşağı təzyiq reytinqinə
              malikdir və uzunmüddətli tam izolyasiya üçün deyil, ilkin nəzarət üçün nəzərdə
              tutulub.
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
              BOP-un işlək vəziyyətdə olduğuna əmin olmaq üçün müntəzəm təzyiq testi (BOP test)
              aparılır — bu, real quyu təzyiqini simulyasiya edən yüksək təzyiqli sınaqdır.
              Test zamanı flanş birləşmələrində gizli zəiflik aşkar edilərsə, qəflətən təzyiq
              sərbəstləşməsi baş verə bilər. Test yalnız təsdiqlənmiş prosedura uyğun, işçi
              heyəti təhlükə zonasından kənarlaşdırılaraq aparılmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              4. Pipe, Blind və Shear Ram-lar — dərəcəli müdaxilə
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Ram-lar hidravlik olaraq üfüqi hərəkət edən polad bloklardır. <strong>Pipe
              ram-lar</strong> boru ölçüsünə uyğun formalaşdırılıb və drill pipe ətrafını sıx
              bağlayır. Quyuda heç bir boru olmadığı hallarda (məs. bit dəyişdirilməsi zamanı)
              <strong> blind ram-lar</strong> açıq quyunu tam bağlayır. Əgər bütün digər üsullar
              uğursuz olarsa, <strong>shear ram-lar</strong> son çarə kimi işə düşür — bunlar
              drill pipe-ı fiziki olaraq kəsərək quyunu tam təcrid edir. Bu, ciddi maddi itki
              deməkdir (BHA quyuda qalır), amma blowout-un qarşısını alan son mexanizmdir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Well Control sisteminin dəstəkləyici elementləri
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              BOP stack tək başına işləmir — onu dəstəkləyən əlavə sistemlər kick-i həm
              aşkarlamağa, həm də idarə etməyə imkan verir:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {wellControlSystem.map((w) => (
                <div key={w.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{w.name}</p>
                  <p className="text-[13px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{w.note}</p>
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
              Drill pipe qoşulması (connection) zamanı dövranın qısa müddət dayandırılması
              formasiya təzyiqinin balanslaşdırılmasında kiçik bir pəncərə yaradır — məhz bu
              anlarda kick riski ən yüksəkdir. Heyət hər connection-dan əvvəl və sonra flow-check
              (axın yoxlaması) aparmalı və ən kiçik anormal axın əlamətində dərhal BOP-u
              bağlamağa hazır olmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — MASP (Maximum Anticipated Surface Pressure)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              BOP stack-in təzyiq reytinqi seçilərkən, kick zamanı səthdə gözlənilə biləcək
              maksimal təzyiq (MASP) hesablanır — bu, 2.2.1-dəki 9,000 ft intermediate casing
              intervalı üçün formasiya təzyiqi əsasında aparılır:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: dərinlik = 9,000 ft, formasiya təzyiqi qradienti = 0.65 psi/ft, quyunun qaz ilə dolması zamanı qaz qradienti = 0.1 psi/ft
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Formasiya təzyiqi = 0.65 × 9,000 = 5,850 psi</p>
                <p>Qaz sütunu təzyiqi = 0.1 × 9,000 = 900 psi</p>
                <p>MASP = 5,850 − 900 = <span style={{ color: PATH_COLOR }}>4,950 psi</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: 4,950 psi hesablanmış MASP, standart 5,000 psi reytinqli BOP stack-in
                sərhədinə çox yaxındır — praktikada mühəndislər buna kifayət qədər ehtiyat marjası
                (safety margin) qatmaq üçün adətən növbəti reytinq pilləsini, yəni 10,000 psi
                stack-i seçirlər.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan (BP)", text: "Offshore platformalarda subsea BOP stack-lər dəniz dibində quraşdırılır və uzaqdan idarə olunan hidravlik sistemlər vasitəsilə nəzarət edilir — bu, quru quyularındakı səth BOP-lardan fərqli mühəndislik yanaşması tələb edir." },
                { name: "Piper Alpha, Şimal dənizi, Böyük Britaniya (1988)", text: "Platforma qəzası nəticəsində baş verən hadisə, sənayedə well control və təhlükəsizlik proseduralarının, o cümlədən BOP test protokollarının ciddi şəkildə yenidən nəzərdən keçirilməsinə səbəb olub." },
                { name: "Permian Basin, ABŞ", text: "Quru (land) qazma qurğularında daha yüngül, mobil BOP stack konfiqurasiyaları istifadə olunur ki, bu da tez-tez yer dəyişən horizontal quyu proqramlarına uyğunlaşdırılıb." },
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
              <li>• Wellhead casing-ləri asır və izləyir; BOP stack quyunu kick zamanı fiziki olaraq bağlayır</li>
              <li>• BOP dörd əsas elementdən ibarətdir: annular, pipe ram, blind ram, shear ram (artan ciddiyyətlə)</li>
              <li>• Accumulator, choke manifold və kill line well control sistemini tamamlayır</li>
              <li>• MASP hesablaması BOP-un lazımi təzyiq reytinqini müəyyən etmək üçün əsasdır</li>
              <li>• Connection zamanı flow-check kick-in erkən aşkarlanmasında həlledici rol oynayır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling/cementing"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Sementləmə (Cementing)
          </Link>
          <Link
            href="/learn/drilling/drilling-fluid"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Drilling Fluid (Mud)
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}