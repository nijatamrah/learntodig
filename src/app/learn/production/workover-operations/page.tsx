"use client";
import Link from "next/link";

const PATH_COLOR = "#E8B33D";

const workoverTypes = [
  { name: "Planlı (Preventive) Workover", desc: "Əvvəlcədən planlaşdırılmış, performans azalmasını gözləmədən aparılan baxım", best: "Uzunmüddətli etibarlılıq strategiyası, kritik quyular" },
  { name: "Korrektiv (Remedial) Workover", desc: "Artıq baş vermiş problemi (aşağı debit, avadanlıq nasazlığı) həll etmək üçün", best: "ESP nasazlığı, tubing sızması, perforasiya tıxanması aşkarlananda" },
  { name: "Stimulyasiya Workover-i", desc: "Məhsuldarlığı artırmaq məqsədilə aparılan əməliyyatlar (asidləmə, yenidən perforasiya)", best: "Skin azaltma, IPR əyrisini yaxşılaşdırma məqsədilə" },
];

export default function WorkoverOperationsLesson() {
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
          href="/learn/production"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6"
          style={{ color: "#3D5570" }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Hasilat
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
              style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
            >
              5.4.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              İstismar İdarəsi
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Workover Əməliyyatları
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Sual: quyu "xəstələnəndə" nə edirik?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              İndiyə qədər öyrəndiyimiz hər şey — completion, artificial lift, IPR, flow
              assurance — quyunun ilk dizaynına aiddir. Amma heç bir quyu əbədi olaraq
              ilkin dizaynı ilə problemsiz işləmir: ESP nasazlaşır, tubing sızır, perforasiya
              tıxanır, ya da sadəcə istehsal profilini yaxşılaşdırmaq lazım gəlir. Bu
              hallarda quyuya yenidən müdaxilə edərək onu bərpa etmək, təmir etmək və ya
              yenidən dizayn etmək prosesinə <strong>workover</strong> deyilir — production
              engineering-in gündəlik həyatının böyük hissəsini təşkil edən əməliyyatlar
              toplusu.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Workover nədir və nə üçün lazımdır?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Workover — mövcud bir quyuda avadanlığı çıxarıb-yenidən yerləşdirmək və ya
              dəyişdirmək məqsədilə aparılan bütün əməliyyatları əhatə edir: artificial
              lift avadanlığının dəyişdirilməsi, tubing-in çıxarılıb yenisinin salınması,
              yeni zonanın perforasiya edilməsi, ya da köhnə zonanın izolyasiyası. Workover,
              yeni quyu qazmaqdan (drilling) əsaslı fərqlənir — mövcud quyu lüləsi
              istifadə olunur, bu da xeyli daha ucuz və sürətlidir, amma yenə də əhəmiyyətli
              dayanma müddəti (downtime) və maliyyə xərci tələb edir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Workover növləri
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Növ</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təsvir</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tətbiq halı</th>
                  </tr>
                </thead>
                <tbody>
                  {workoverTypes.map((c) => (
                    <tr key={c.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{c.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{c.desc}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{c.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Workover riq (rig) tələbləri
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Bir çox workover əməliyyatı — xüsusilə tubing və ya ESP dəyişdirilməsi —{" "}
              <strong>workover rig</strong> (adətən drilling rig-dən kiçik, xüsusi
              layihələndirilmiş qurğu) tələb edir. Bəzi əməliyyatlar isə daha yüngül
              alətlərlə, məsələn <strong>wireline</strong> (məftil xətti) və ya{" "}
              <strong>coiled tubing</strong> (əyilə bilən fasiləsiz boru) ilə rig olmadan
              yerinə yetirilə bilir — bu, xərci və dayanma müddətini xeyli azaldır. Gas
              lift valve-lərinin dəyişdirilməsi kimi sadə əməliyyatlar adətən wireline ilə,
              perforasiya təmizlənməsi kimi daha mürəkkəb işlər isə coiled tubing ilə
              aparılır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Workover qərarının qəbul edilməsi prosesi
            </h2>
            <div className="space-y-2.5">
              {[
                "Problemin diaqnostikası — debit azalması, təzyiq anomaliyası, avadanlıq siqnal göstəriciləri",
                "Kök səbəbin müəyyən edilməsi (well test, production logging, ESP amper qrafiki analizi)",
                "Workover üsulunun seçimi — rig, wireline, coiled tubing arasında",
                "İqtisadi qiymətləndirmə — workover xərci ilə gözlənilən əlavə gəlirin müqayisəsi",
                "Əməliyyatın planlaşdırılması və icrası, sonrasında performansın yoxlanılması",
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
            style={{ background: "#F9706614", border: "1px solid #F9706640" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#F97066" }}>
              Mühəndislik Seçimi
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              <strong>Rig-lə Workover vs Coiled Tubing/Wireline:</strong> Rig ilə workover
              demək olar bütün əməliyyat növlərini yerinə yetirməyə imkan verir (tam
              completion dəyişikliyi, tubing çıxarılması) və ən "tam" həll təmin edir, amma
              rig kirayəsi çox bahalıdır (xüsusilə dəniz platformalarında) və uzun dayanma
              müddəti tələb edir. Coiled tubing/wireline isə xeyli ucuz, sürətli və rig
              tələb etmir, amma bacarıq spektri məhduddur — böyük diametrli avadanlıq
              dəyişdirilməsi və ya tam completion yenidənqurulması mümkün deyil. Mühəndis
              qərar verərkən, problemin növünün rig tələb edib-etmədiyini diqqətlə
              qiymətləndirməli, mümkün olduqda daha ucuz alternativi seçməlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Workover-in İqtisadi Əsaslandırılması (Payback)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Workover-in dəyərini əsaslandırmaq üçün, gözlənilən əlavə gəlirin xərci nə
              qədər müddətdə ödəyəcəyini (payback period) hesablayaq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: workover xərci = $180,000, əlavə debit = 100 bbl/gün, neft
                qiyməti = $70/bbl, əməliyyat xərci payı = 30% (gəlirdən çıxılır)
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                Gündəlik xalis gəlir = Əlavə debit × Qiymət × (1 − əməliyyat payı)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Gündəlik xalis gəlir = 100 × 70 × 0.70 = <span style={{ color: PATH_COLOR }}>$4,900/gün</span></p>
                <p>Payback = 180,000 / 4,900 ≈ <span style={{ color: PATH_COLOR }}>37 gün</span></p>
              </div>
              <p className="text-13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: workover xərci təxminən 37 gün ərzində özünü doğruldur — bu, çox
                cəlbedici bir investisiya sayılır (adətən 6-12 aylıq payback dövrü qəbul
                edilən sayılır). Bu cür sürətli geri qaytarma müddəti, mühəndisə workover-i
                iqtisadi baxımdan asanlıqla əsaslandırmağa imkan verir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Dəniz platformalarında ESP dəyişdirilməsi üçün xüsusi workover proqramları planlaşdırılır — rig vaxtının minimuma endirilməsi məqsədilə." },
                { name: "Ekofisk sahəsi, Norveç", text: "Coiled tubing əməliyyatları perforasiya təmizlənməsi və scale təmizlənməsi üçün geniş istifadə olunur." },
                { name: "Cantarell sahəsi, Meksika", text: "Reservoir tükəndikcə çoxsaylı workover proqramları vasitəsilə artificial lift üsulları (təbii axından gas lift-ə) mərhələ-mərhələ dəyişdirilib." },
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
              <li>• Workover — mövcud quyuda avadanlığı təmir etmək, dəyişdirmək və ya yenidən dizayn etmək əməliyyatlarıdır</li>
              <li>• Növlər: planlı (preventive), korrektiv (remedial), stimulyasiya workover-i</li>
              <li>• Rig, wireline və coiled tubing arasındakı seçim əməliyyatın mürəkkəbliyindən asılıdır</li>
              <li>• Qərar iqtisadi əsaslandırma (payback dövrü) ilə dəstəklənməlidir</li>
              <li>• Ucuz alternativlər (wireline, coiled tubing) mümkün olduqda rig-dən üstün tutulur</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/production/flow-assurance"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Flow Assurance
          </Link>
          <Link
            href="/learn/production/corrosion-materials-management"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Korroziya və Materialların İdarəsi
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}