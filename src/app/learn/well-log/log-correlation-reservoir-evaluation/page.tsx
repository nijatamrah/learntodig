"use client";
import Link from "next/link";

const PATH_COLOR = "#3B9BD8";

const cutoffValues = [
  { param: "Vsh cutoff", range: "≤ 35–40%", meaning: "Bundan yuxarı Vsh-də süxur artıq 'net' hesab edilmir" },
  { param: "φe cutoff", range: "≥ 8–10%", meaning: "Minimum effektiv porosity — bundan aşağıda axın praktik deyil" },
  { param: "Sw cutoff", range: "≤ 50–60%", meaning: "Bundan yuxarı Sw-də zona 'su zonası' sayılır, net pay-ə daxil olmur" },
];

const workflowSteps = [
  { title: "Quyular arası markerləri təyin et", text: "Regional gil təbəqələri kimi stabil, geniş yayılmış key bed-ləri hər quyuda tap və dərinlikləri qeyd et" },
  { title: "Datum səviyyəsinə görə düzləndir", text: "Struktur meylini aradan qaldırmaq üçün bütün quyuları eyni stratiqrafik markerə (datum) görə uyğunlaşdır" },
  { title: "Lay sərhədlərini korrelyasiya et", text: "GR və resistivity əyrilərinin formasını (şəkil korrelyasiyası) izləyərək eyni layı quyudan quyuya izlə" },
  { title: "Cutoff-ları tətbiq et", text: "Vsh, φe və Sw kəsim dəyərlərini hər quyuya tətbiq edərək net pay intervallarını ayır" },
  { title: "Net-to-Gross xəritəsini qur", text: "Hər quyudakı NTG nisbətini bir yerə gətirərək kollektorun yayılma sahəsini xəritələşdir" },
];

export default function LogCorrelationReservoirEvaluationLesson() {
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
              3.4.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              İnterpretasiya və Tətbiq
            </span>
            <span
              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase tracking-wide"
              style={{ background: "rgba(255,255,255,0.05)", color: "#6B82A0" }}
            >
              Son Dərs
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Log Korrelyasiyası və Kollektor Qiymətləndirməsi
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Bir quyunun məlumatı kifayətdirmi?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              3.3.2-də tək bir quyuda, tək bir intervalda Sw ≈ 17.2% tapdıq və bunun güclü neft
              zonası olduğu qənaətinə gəldik. Amma sual budur: bu lay yatağın hər yerində
              eynidirmi? Neçə metr davam edir? Harada nazikləşir, harada tamam yoxa çıxır? Tək
              quyu heç vaxt bu sualları cavablandıra bilməz — buna yalnız çoxlu quyunun
              məlumatını bir-birinə bağlayaraq nail olmaq mümkündür. Bu, path-ımızın son dərsidir
              və məhz burada indiyə qədər öyrəndiyimiz hər şeyi — GR, resistivity, density,
              neutron, Vsh, φe, Sw — bir yerə gətirib, tək quyudan bütöv yataq mənzərəsinə
              keçəcəyik.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Log korrelyasiyası nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Log korrelyasiyası — bir neçə quyunun log əyrilərini yan-yana qoyub, eyni
              stratiqrafik layın quyudan quyuya necə dəyişdiyini izləmə prosesidir. Bunun əsas
              vasitəsi &quot;şəkil korrelyasiyası&quot;dır (pattern correlation): GR əyrisinin özünəməxsus
              formu — məsələn, iki nazik gil təbəqəsi arasında yerləşən xarakterik bir qumdaşı
              &quot;zəngi&quot; — fərqli quyularda tanına bilən vizual imzadır. Geoloq bu imzanı bir
              quyuda tapıb, digərində eyni forması axtararaq layların davamlılığını sübut edir.
              Bu proses həm struktur (fay, əyilmə) haqqında, həm də çöküntü mühiti haqqında çox
              şey açıqlayır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. Marker (key bed) seçimi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Korrelyasiyanın etibarlılığı düzgün marker seçimindən asılıdır. Yaxşı marker —
              regional miqyasda geniş yayılmış, qalınlığı sabit, log əyrisində aydın və
              təkrarlanmayan bir siqnal verən təbəqədir; adətən dərin dəniz mühitində çökmüş
              qalın gil təbəqələri bu rolu ən yaxşı oynayır, çünki onlar geniş sahədə eyni zamanda
              çökür və çox nadir hallarda yerli olaraq yox olur. Əksinə, kanal qumdaşıları kimi
              məhdud, lokal çöküntülər marker kimi yararsızdır, çünki onlar bir quyuda olub,
              qonşu quyuda tamamilə yox ola bilər — bu da səhv korrelyasiyaya səbəb olar.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Datum səviyyəsi: niyə düzləndirmə lazımdır?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Quyular fərqli struktur mövqelərində yerləşdiyi üçün (bəzisi qalxımda, bəzisi
              çökəkdə) eyni lay müxtəlif dərinliklərdə görünə bilər. Bunu düzəltmək üçün
              korrelyasiya bir &quot;datum&quot; — adətən ən etibarlı regional marker — səviyyəsinə görə
              aparılır: bütün quyu loqları həmin markerin dərinliyinə uyğun şaquli olaraq
              &quot;düzləndirilir&quot;. Bu addımdan sonra struktur meylinin təsiri aradan qalxır və
              qalan qalınlıq fərqləri artıq yalnız real çöküntü dəyişkənliyini (lay incəlməsi,
              yoxa çıxması) əks etdirir — bu da geoloji tarixin düzgün oxunması üçün vacibdir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              4. Net Pay və kəsim (cutoff) dəyərləri
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Kollektor qiymətləndirməsinin son mərhələsi — bütöv intervalın (gross interval)
              içindən yalnız iqtisadi cəhətdən istehsal verə biləcək hissəni (net pay) ayırmaqdır.
              Bunun üçün 3.3.1 və 3.3.2-də hesabladığımız Vsh, φe və Sw dəyərlərinə kəsim həddi
              (cutoff) tətbiq edilir: yalnız bu üç şərti eyni zamanda ödəyən dərinlik intervalları
              &quot;net&quot; sayılır. Cutoff dəyərləri universal deyil — hər yataq üçün nüvə analizi və
              istehsal tarixçəsinə əsasən ayrıca kalibrasiya olunur, amma sənayedə tez-tez rast
              gəlinən orta aralıqlar mövcuddur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Tipik kəsim (cutoff) dəyərləri
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Parametr</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tipik cutoff</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Məna</th>
                  </tr>
                </thead>
                <tbody>
                  {cutoffValues.map((c) => (
                    <tr key={c.param} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{c.param}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{c.range}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{c.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              6. Net-to-Gross (NTG) nisbəti
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Net-to-Gross (NTG) — net pay qalınlığının ümumi (gross) interval qalınlığına
              nisbətidir və 0–1 (və ya faizlə) arasında ifadə olunur. NTG kollektorun nə qədər
              &quot;təmiz&quot; olduğunun ən yığcam göstəricisidir: NTG = 1.0-a yaxın olan yataqlar
              (massiv, təmiz qumdaşı) proqnozlaşdırmaq asandır, NTG aşağı olan, çox laylı, gilli
              yataqlar isə (məsələn delta çöküntüləri) daha mürəkkəb, daha çox quyu tələb edən
              layihələrdir. NTG xəritəsi quyular arası korrelyasiyanın birbaşa nəticəsidir — hər
              quyudan tapılan NTG dəyəri sahə üzərində konturlaşdırılaraq kollektorun yayılma
              zonaları müəyyənləşdirilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Tam interpretasiya iş axını (sintez)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Bütün path boyu öyrəndiyimiz addımları bir yerə gətirsək, real bir kollektor
              qiymətləndirməsi belə görünür:
            </p>
            <div className="space-y-2.5">
              {workflowSteps.map((s, i) => (
                <div key={s.title} className="flex gap-3 items-start">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-semibold mt-0.5"
                    style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[14px] font-medium" style={{ color: "#F0F4FF" }}>{s.title}</p>
                    <p className="text-[13.5px] leading-[1.65] mt-0.5" style={{ color: "#9FAEC4" }}>{s.text}</p>
                  </div>
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
                <span style={{ color: "#F0F4FF" }}>Massiv təmiz qumdaşı kollektoru — NTG</span>
                <span style={{ color: PATH_COLOR }}>80–100%</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Növbələşən qumdaşı-gil (delta) — NTG</span>
                <span style={{ color: PATH_COLOR }}>30–60%</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Çox gilli, marginal kollektor — NTG</span>
                <span style={{ color: PATH_COLOR }}>10–30%</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Hesablama — Net-to-Gross və Karbohidrogenlə Dolu Boşluq Həcmi (HCPV)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              3.3.1–3.3.2-dəki nəticələrimizi (φe = 10.6%, Sw ≈ 17.2%) davam etdirək. Fərz edək ki,
              bu qumdaşı 24 m qalınlığında ümumi (gross) intervalın bir hissəsidir, amma Vsh və φe
              cutoff-larını tətbiq etdikdən sonra bunun yalnız 8 m-i &quot;net pay&quot; şərtlərini ödəyir:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                NTG = Net Pay / Gross Interval
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>NTG = 8 / 24 ≈ <span style={{ color: PATH_COLOR }}>0.33 (33%)</span></p>
              </div>
              <p className="text-[13px] mt-4 mb-2" style={{ color: "#6B82A0" }}>
                HCPV = A × h × φe × (1 − Sw), A = 10,000 m² (1 hektar), h = 8 m, φe = 0.106, Sw = 0.172
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>HCPV = 10,000 × 8 × 0.106 × (1 − 0.172)</p>
                <p>HCPV = 10,000 × 8 × 0.106 × 0.828</p>
                <p>HCPV ≈ <span style={{ color: PATH_COLOR }}>7,020 m³ / hektar</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu quyunun ətrafında hər hektar sahədə təxminən 7,020 m³ karbohidrogenlə
                dolu boşluq həcmi var. Bu ədəd hələ real hasilat həcmi (recovery factor tətbiq
                olunmayıb) deyil, amma məhz ehtiyat hesablamalarının (reserves estimation) giriş
                nöqtəsidir — həmin hesablama isə GR-dən başlayaraq (3.2.1) IGR, Vsh (3.3.1), φe
                (3.3.1) və Sw-dən (3.3.2) keçən bütün zəncirin son məhsuludur.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              9. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Azeri-Chirag-Günəşli (ACG), Azərbaycan", text: "BSR lay dəstinin onlarla quyu arasında korrelyasiyası ilə qurulmuş NTG xəritələri, sahənin illik istehsal proqnozlarının əsasını təşkil edir." },
                { name: "Forties yatağı, Şimal dənizi, Böyük Britaniya", text: "Bu klassik Paleosen turbidit kollektorunda log korrelyasiyası kanal qumdaşılarının lateral davamlılığını izləmək üçün onilliklər boyu dərslik nümunəsi kimi istifadə olunub." },
                { name: "Jubilee yatağı, Qana", text: "Tullow Oil-in idarə etdiyi dərinsulu turbidit kollektorunda NTG dəyişkənliyi yüksək olduğu üçün quyular arası sıx korrelyasiya şəbəkəsi qurulması vacib olub." },
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
              <li>• Log korrelyasiyası quyular arası eyni layı izləmək üçün şəkil oxşarlığından (pattern correlation) istifadə edir</li>
              <li>• Yaxşı marker — regional, sabit qalınlıqlı, aydın siqnal verən (adətən dərin dəniz gili) təbəqədir</li>
              <li>• Net pay, Vsh/φe/Sw cutoff-larının eyni vaxtda ödənildiyi intervaldır</li>
              <li>• Net-to-Gross (NTG) kollektorun &quot;təmizlik&quot; dərəcəsini göstərən əsas göstəricidir</li>
              <li>• HCPV = A × h × φe × (1 − Sw) — bütün path boyu hesabladığımız dəyərlərin birləşdiyi son formuldur</li>
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
              Bununla Quyu Logging (Well Logging & Petrophysics) path-ının bütün dərslərini
              tamamladınız — logging əsaslarından tutmuş, Gamma Ray və resistivity-dən, density,
              neutron və sonic-dən, şist həcmi və effektiv porosity-dən, Archie tənliyi ilə su
              doyğunluğundan, nəhayət log korrelyasiyası və kollektor qiymətləndirməsinə qədər.
              Bu bilik zənciri sizə xam log əyrisindən başlayıb, hektar başına karbohidrogen
              həcminə qədər gedən tam petrofizik yolu izləmək bacarığı verir.
            </p>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/well-log/water-saturation-archie"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Su Doyma Dərəcəsi (Archie Tənliyi)
          </Link>
          <Link
            href="/learn/well-log"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Path Tamamlandı — Quyu Logging-ə Geri Dön
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}