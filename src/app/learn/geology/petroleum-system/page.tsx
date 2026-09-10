"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const elementsTable = [
  { element: "Source Rock", rol: "Karbohidrogenin əmələ gəldiyi üzvi maddəyə zəngin süxur", istinad: "1.1.3" },
  { element: "Reservoir Rock", rol: "Karbohidrogenin toplandığı məsaməli və keçirici süxur", istinad: "1.1.4" },
  { element: "Seal / Cap Rock", rol: "Karbohidrogenin yuxarı qaçmasının qarşısını alan keçirməz örtük", istinad: "1.1.5" },
  { element: "Trap", rol: "Reservoir və seal-in birgə yaratdığı geometrik tutucu forma", istinad: "1.1.6" },
  { element: "Migration", rol: "Karbohidrogenin source rock-dan trapa doğru hərəkəti", istinad: "1.2.2" },
  { element: "Timing", rol: "Bütün yuxarıdakı elementlərin düzgün ardıcıllıqla, düzgün zamanda üst-üstə düşməsi", istinad: "—" },
];

export default function PetroleumSystemLesson() {
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
              1.2.3
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Hövzə və Miqrasiya
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Petroleum System <span style={{ color: "#F0F4FF" }}>(Neft Sistemi Konsepti)</span>
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          {/* Creative intro: historical context hook */}
          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə bu mövzu vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              1980-ci illərə qədər neft geoloqları adətən source rock, reservoir, seal və trap-ı
              ayrı-ayrı, bir-birindən asılı olmayan tədqiqat mövzuları kimi öyrənirdilər. Amma
              amerikalı geoloq Leslie Magoon 1994-cü ildə inqilabi bir fikir irəli sürdü: bu
              elementlərin heç biri təkbaşına yataq yarada bilməz — onlar yalnız <strong>müəyyən
              zaman ardıcıllığı ilə</strong> bir yerdə fəaliyyət göstərdikdə yataq formalaşır. Bu
              fikir "petroleum system" (neft sistemi) konsepsiyasının əsasını qoydu və bu gün də
              dünya üzrə bütün böyük neft şirkətlərinin kəşfiyyat strategiyasının təməl prinsipidir.
              1.1 və 1.2-də ayrı-ayrı öyrəndiyimiz bütün mövzular əslində bu bir bölmədə birləşir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Petroleum system nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Petroleum system — bir yatağın formalaşması üçün zəruri olan bütün geoloji
              elementlərin (source rock, reservoir rock, seal, trap) və proseslərin (miqrasiya,
              tələ formalaşması) vaxt və məkan baxımından bir-biri ilə uyğunlaşaraq fəaliyyət
              göstərdiyi vahid geoloji sistemdir. Bu konsepsiyanın əsas fərqləndirici cəhəti ondan
              ibarətdir ki, o, təkcə "hansı elementlər mövcuddur" sualına deyil, həm də "bu
              elementlər düzgün ardıcıllıqla baş verib, yoxsa yox" sualına cavab axtarır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Beş əsas element və bir amil: Timing
            </h2>
            <p className="text-[14px] leading-[1.75] mb-4">
              Petroleum system beş fiziki elementdən və bir kritik amildən ibarətdir. İlk dörd
              element artıq 1.1-də ətraflı öyrənilib, beşincisi (miqrasiya) 1.2.2-də izah olunub.
              Altıncı, ən çətin qiymətləndirilən amil isə — timing (zamanlama):
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Element</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Rolu</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Əvvəlki dərs</th>
                  </tr>
                </thead>
                <tbody>
                  {elementsTable.map((e) => (
                    <tr key={e.element} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{e.element}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{e.rol}</td>
                      <td className="px-3 py-2" style={{ color: "#9FAEC4" }}>{e.istinad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Timing niyə ən kritik amildir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Trap-ın formalaşması ilə karbohidrogenin miqrasiyası arasındakı zaman ardıcıllığı
              həlledici əhəmiyyət daşıyır. Əgər trap karbohidrogen miqrasiya etməzdən <strong>əvvəl</strong>{" "}
              formalaşıbsa, neft həmin geometriyaya doğru hərəkət edərək orada həbs oluna bilər —
              bu, uğurlu ssenaridir. Amma əgər trap miqrasiyadan <strong>sonra</strong> əmələ gəlibsə
              (məsələn, antiklinal struktur neft artıq keçib getdikdən sonra formalaşıbsa), o
              zaman karbohidrogen üçün "tutmaq üçün heç nə" olmayıb və o, sadəcə səthə çıxaraq
              itirilib. Elə buna görə geoloqlar tez-tez deyirlər: "yaxşı trap, yaxşı source rock
              və yaxşı reservoir olması kifayət deyil — onların hamısı düzgün vaxtda uyğunlaşmalıdır."
            </p>
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
              Bir çox yeni kəşfiyyatçı yalnız "yaxşı trap tapmağa" fokuslanır və timing amilini
              unudur. Amma statistikaya görə, dünyada quru (dry) çıxan kəşfiyyat quyularının böyük
              hissəsinin səbəbi trap-ın olmaması deyil, məhz <strong>timing uyğunsuzluğudur</strong> —
              yəni bütün digər elementlər mövcud olsa da, onlar heç vaxt düzgün ardıcıllıqla üst-üstə
              düşməyib. Buna görə seysmik və struktur analiz qədər, hövzənin termal tarixinin
              (burial history) rekonstruksiyası da vacibdir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Petroleum system-in coğrafi anlayışı: "critical moment"
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Petroleum system konsepsiyasında "critical moment" (kritik an) — hövzənin geoloji
              tarixində source rock-un maksimum karbohidrogen generasiyası və miqrasiyası baş verdiyi
              zaman dilimini bildirir. Geoloqlar bu anı burial history (basdırılma tarixi) modelləri
              vasitəsilə rekonstruksiya edirlər və bu andakı bütün elementlərin (o cümlədən trap-ların)
              vəziyyətini xəritələşdirirlər. Əgər həmin kritik anda trap artıq formalaşmışdısa, sistem
              "işləyən" (working) petroleum system adlanır; əks halda sistem "uğursuz" hesab olunur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Burial history əsasında sadə timing qiymətləndirməsi
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: source rock 45 milyon il əvvəl 2,800 m dərinliyə çatıb və maksimum
                generasiya başlayıb; struktur trap (antiklinal) 20 milyon il əvvəl formalaşıb
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                Timing fərqi = Generasiya başlanğıcı − Trap formalaşma vaxtı
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Fərq = 45 milyon il − 20 milyon il</p>
                <p>Fərq = <span style={{ color: PATH_COLOR }}>25 milyon il (trap generasiyadan ƏVVƏL yox)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu misalda trap generasiyadan 25 milyon il SONRA formalaşıb — yəni
                karbohidrogen artıq miqrasiya etməyə başladığı zaman trap hələ mövcud olmayıb. Bu,
                yüksək riskli timing ssenarisidir, çünki ilk generasiya dalğası çox güman ki, tutan
                struktur olmadığı üçün itirilib. Yalnız daha sonrakı, ikinci bir generasiya dalğası
                (əgər source rock hələ də aktivdirsə) bu artıq mövcud olan trapa doğru miqrasiya
                edə bilər.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Ghawar, Səudiyyə Ərəbistanı", text: "Bütün elementlərin — Qulzar Regi source rock, Arab-D reservoir, Hith anhidrit seal və nəhəng antiklinal trap-ın — mükəmməl timing ilə üst-üstə düşdüyü dünyanın ən uğurlu petroleum sistemi nümunəsidir." },
                { name: "Mərkəzi Şimal Dənizi, Böyük Britaniya", text: "Kimmeridge Clay source rock-un generasiyası ilə Yura/Təbaşir dövrü trap-larının formalaşması arasındakı yaxşı timing uyğunluğu bölgəni Avropa neft hasilatının mərkəzinə çevirib." },
                { name: "Kaliforniya, Los Angeles Hövzəsi", text: "Bu hövzədə timing xüsusilə əlverişli olub — struktur tələlər (fold və fault) Miosen source rock-larının generasiyası ilə demək olar ki, eyni geoloji dövrdə formalaşıb, bu da qeyri-adi dərəcədə yüksək kəşfiyyat uğur nisbətinə səbəb olub." },
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
              <li>• Petroleum system source rock, reservoir, seal, trap və miqrasiyanın vahid sistem kimi birgə fəaliyyətidir</li>
              <li>• Timing (zamanlama) — trap-ın miqrasiyadan əvvəl formalaşması — sistemin uğuru üçün ən kritik amildir</li>
              <li>• "Critical moment" hövzənin maksimum karbohidrogen generasiyası baş verdiyi geoloji anı bildirir</li>
              <li>• Kəşfiyyat uğursuzluqlarının böyük hissəsi trapın olmaması deyil, timing uyğunsuzluğu ilə bağlıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/migration"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Miqrasiya
          </Link>
          <Link
            href="/learn/geology/surface-geology"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Səth Geologiyası
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}