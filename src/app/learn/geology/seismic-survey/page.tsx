"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const seismicComparison = [
  { method: "2D Seysmik", təsvir: "Tək bir xətt boyunca dalğa mənbəyi və qəbuledicilərin yerləşdirilməsi, nəticədə vertikal en kəsik (kross-seksiya) alınır", üstünlük: "Ucuz, sürətli, geniş regional trendlər üçün əlverişli", məhdudiyyət: "Yalnız bir müstəvi üzrə məlumat verir, struktur mürəkkəbliyi tam göstərmir" },
  { method: "3D Seysmik", təsvir: "Şəbəkə şəklində düzülmüş çoxsaylı xətlərlə ərazinin həcmli (3 ölçülü) təsviri", üstünlük: "Struktur və stratiqrafik detalları dəqiq göstərir, quyu yerini optimallaşdırır", məhdudiyyət: "Əhəmiyyətli dərəcədə baha və vaxt aparan proses" },
  { method: "4D (Time-lapse) Seysmik", təsvir: "Eyni 3D sahənin fərqli zaman nöqtələrində təkrar çəkilməsi", üstünlük: "Yataqda mayenin hərəkətini izləməyə imkan verir", məhdudiyyət: "Yalnız artıq işlənən yataqlarda tətbiq olunur, ən yüksək xərcli metod" },
];

export default function SeismicSurveyLesson() {
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
              1.3.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Kəşfiyyat Metodları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Seysmik Kəşfiyyat <span style={{ color: "#F0F4FF" }}>(Seismic Survey)</span>
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          {/* Creative intro: analogy hook instead of historical context */}
          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə bu mövzu vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Yarasa qaranlıqda uçarkən səs dalğası buraxır və əks-sədanın geri qayıtma vaxtından
              qarşısındakı əşyanın məsafəsini "hesablayır". Seysmik kəşfiyyatın işləmə prinsipi də
              məhz elə budur — yalnız yarasa əvəzinə geofizik avadanlıq, hava əvəzinə isə yer
              qatları istifadə olunur. 1.3.1-də öyrəndiyimiz səth geologiyası bizə yalnız üst
              qatların ipuçlarını verirdi, amma real qərar üçün yerin min metrlərlə dərinliyində
              nələr baş verdiyini "görmək" lazımdır. Seysmik kəşfiyyat məhz bunu edir — süni
              yaradılmış səs dalğalarını yerin altına göndərib, geri qayıdan əks-sədaları oxuyaraq
              dərinlikdəki struktur "şəkli"ni yaradır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Seysmik kəşfiyyat nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Seysmik kəşfiyyat — süni yaradılmış səs (elastik) dalğalarının yer səthindən aşağı
              göndərilməsi və bu dalğaların müxtəlif süxur qatlarının sərhədlərindən əks olunaraq
              geri qayıtmasının qeyd edilməsi prosesidir. Hər süxur qatının sıxlığı və sürəti
              fərqli olduğundan, dalğa bir qatdan digərinə keçərkən qismən əks olunur — məhz bu
              əks-sədalar geoloqlara dərinlikdəki qatların formasını, qalınlığını və geometriyasını
              rekonstruksiya etməyə imkan verir. Nəticədə alınan "seysmik kəsik" (seismic section)
              yerin altının bir növ rentgen şəklinə bənzəyir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Proses necə işləyir — addım-addım
            </h2>
            <div className="space-y-3">
              {[
                { n: "01", title: "Dalğa mənbəyi", text: "Quruda vibroseys yükü (yerə güclü vibrasiya verən yük maşını) və ya dinamit, dənizdə isə hava tapançası (air gun) istifadə olunaraq elastik dalğa yaradılır." },
                { n: "02", title: "Dalğanın yayılması", text: "Yaradılan dalğa yer qatları boyunca aşağı doğru yayılır və hər sıxlıq dəyişikliyi olan sərhəddə (məsələn, gil-qumdaşı sərhədi) qismən geri əks olunur." },
                { n: "03", title: "Qəbul və qeydiyyat", text: "Səthdə düzülmüş minlərlə geofon (quruda) və ya hidrofon (dənizdə) geri qayıdan əks-sədaları saniyənin mində bir hissəsi dəqiqliklə qeyd edir." },
                { n: "04", title: "Data emalı", text: "Toplanan xam siqnallar güclü kompüter alqoritmləri ilə təmizlənir, düzəldilir və vizual seysmik kəsiyə çevrilir — bu proses həftələr, hətta aylar çəkə bilər." },
                { n: "05", title: "İnterpretasiya", text: "Geofizik və geoloqlar hazır kəsiyi oxuyaraq qatların əyilməsini, fayları və potensial tələ strukturlarını müəyyən edir və növbəti quyunun yerini təklif edir." },
              ].map((s) => (
                <div key={s.n} className="flex gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-[13px] font-mono font-bold shrink-0" style={{ color: PATH_COLOR }}>{s.n}</span>
                  <div>
                    <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{s.title}</p>
                    <p className="text-[13.5px] leading-[1.7]" style={{ color: "#9FAEC4" }}>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. 2D-dən 3D-yə: fərq nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              İlk seysmik tədqiqatlar 2D formatında aparılırdı — tək xətt boyunca ölçmə aparılır və
              nəticədə yalnız bir vertikal en kəsik alınırdı, sanki torta bir bıçaqla nazik dilim
              kəsmək kimi. Amma real geoloji strukturlar üç ölçülüdür və tək bir dilim çox vaxt
              yanıltıcı ola bilər. 3D seysmik isə ərazini sıx şəbəkə şəklində əhatə edərək bütöv
              "torta"nı rekonstruksiya edir — bu, geoloqlara strukturu istənilən istiqamətdən
              "kəsib" baxmağa imkan verir. Bu səbəbdən müasir kəşfiyyat layihələrinin əksəriyyəti
              artıq 3D (bəzən hətta 4D) seysmikaya əsaslanır, xüsusilə yüksək dəyərli offshore
              layihələrdə.
            </p>
          </section>

          {/* Creative element: common mistake warning callout */}
          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#D8823B14", border: "1px solid #D8823B40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#D8823B" }}>
              Ümumi səhv
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Yeni başlayanlar tez-tez seysmik kəsiyi birbaşa "yerin fotoşəkli" kimi qəbul edirlər,
              amma bu yanlışdır. Seysmik kəsik zaman oxunda (two-way travel time) qurulur, məsafə
              oxunda deyil — yəni şaquli ox metrlə deyil, saniyələrlə ölçülür. Dəqiq dərinliyi əldə
              etmək üçün mütləq sürət məlumatı (velocity data) ilə çevrilmə aparılmalıdır. Bu addımı
              nəzərə almadan interpretasiya aparmaq real dərinliklə bir neçə yüz metr fərqə səbəb
              ola bilər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Seysmik metodların müqayisəsi
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Metod</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təsvir</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Üstünlük</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Məhdudiyyət</th>
                  </tr>
                </thead>
                <tbody>
                  {seismicComparison.map((m) => (
                    <tr key={m.method} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{m.method}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{m.təsvir}</td>
                      <td className="px-3 py-2" style={{ color: "#9FAEC4" }}>{m.üstünlük}</td>
                      <td className="px-3 py-2" style={{ color: "#9FAEC4" }}>{m.məhdudiyyət}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — İki qat gediş vaxtından dərinlik təyini
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: qeyd olunan iki qat gediş vaxtı (Two-Way Time, TWT) = 1.2 saniyə,
                ortalama seysmik sürət = 2,800 m/s
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                Dərinlik = (Sürət × TWT) / 2
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Dərinlik = (2,800 m/s × 1.2 s) / 2</p>
                <p>Dərinlik = 3,360 / 2 ≈ <span style={{ color: PATH_COLOR }}>1,680 m</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: dalğa mənbədən əks etdirici qata çatıb geri qayıtmaq üçün 1.2 saniyə sərf
                edibsə və ortalama sürət 2,800 m/s-dirsə, həmin əks etdirici sərhəd təxminən
                1,680 metr dərinlikdə yerləşir. Bölmə 2-yə vurulmasının səbəbi budur ki, dalğa
                məsafəni iki dəfə — aşağı və yuxarı — qət edir. Real layihələrdə sürət dərinliklə
                birlikdə dəyişdiyi üçün bu hesablama adətən təbəqələnmiş sürət modelləri ilə daha
                dəqiqləşdirilir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Şimal Dənizi (North Sea)", text: "1970-80-ci illərdə aparılan geniş miqyaslı 2D, sonra 3D seysmik proqramları bölgənin Brent və Forties kimi nəhəng yataqlarının kəşfinə birbaşa yol açıb." },
                { name: "Qavar Yatağı, Səudiyyə Ərəbistanı", text: "Dünyanın ən böyük neft yatağının struktur həndəsəsinin dəqiq xəritələşdirilməsində 3D seysmik məlumatları uzun illər ərzində istismar strategiyasının əsasını təşkil edib." },
                { name: "Azəri-Çıraq-Günəşli (ACG), Azərbaycan", text: "Xəzər dənizindəki bu nəhəng yataq kompleksinin strukturu 1980-90-cı illərdə aparılan dəniz seysmik tədqiqatları ilə müəyyənləşdirilib və sonrakı 3D yeniləmələr quyu planlaşdırılmasını əhəmiyyətli dərəcədə təkmilləşdirib." },
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
              <li>• Seysmik kəşfiyyat süni yaradılmış səs dalğalarının qat sərhədlərindən əks olunmasına əsaslanır</li>
              <li>• 2D seysmik tək kəsik, 3D seysmik isə ərazinin həcmli, daha dəqiq təsvirini verir</li>
              <li>• Seysmik kəsiklər zaman oxunda qurulur — dəqiq dərinlik üçün sürət məlumatı ilə çevrilmə tələb olunur</li>
              <li>• Seysmik nəticələr növbəti mərhələdə, 1.3.3-də öyrənəcəyimiz kəşfiyyat quyusunun yerini seçmək üçün əsas rol oynayır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/surface-geology"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Səth Geologiyası
          </Link>
          <Link
            href="/learn/geology/exploration-wells"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Kəşfiyyat Quyuları
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}