"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const dragSources = [
  { name: "Rotating Friction (Torque)", note: "String fırlanarkən quyu divarı ilə təması nəticəsində yaranan müqavimət — sürtünmə əmsalı və normal qüvvədən asılıdır" },
  { name: "Axial Friction (Drag)", note: "String yuxarı/aşağı hərəkət edərkən (tripping) yaranan sürtünmə — pipe-ı endirmək/qaldırmaq üçün lazım olan əlavə qüvvə" },
  { name: "Normal Force (Kontakt Qüvvəsi)", note: "String-in əyilmiş bölmələrdə divara söykənmə qüvvəsi — dogleg severity ilə düz mütənasibdir" },
  { name: "Buoyancy Effect", note: "Mud-un yaratdığı üzücü qüvvə string-in effektiv çəkisini azaldır, bu da normal qüvvəyə təsir edir" },
];

const frictionFactors = [
  { env: "OBM/SBM, hamar casing", range: "0.15 – 0.25", note: "Ən aşağı sürtünmə — yağlama xüsusiyyəti yüksəkdir" },
  { env: "WBM, casing daxilində", range: "0.25 – 0.35", note: "Orta səviyyə, standart şərait" },
  { env: "WBM, açıq quyu (openhole)", range: "0.30 – 0.45", note: "Divar kələ-kötürlüyü sürtünməni artırır" },
  { env: "Reaktiv şeyl, WBM, açıq quyu", range: "0.40 – 0.60+", note: "Ən yüksək — quyu divarının qeyri-sabitliyi əlavə müqavimət yaradır" },
];

export default function TorqueAndDragLesson() {
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
              2.4.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Directional Drilling
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Torque & Drag
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Uzun bir kabeli əyri boru içindən çəkmək kimi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Təsəvvür edin ki, uzun və əyri bir borunun içindən kabel çəkirsiniz — düz boruda
              bu asandır, amma boru nə qədər çox əyilirsə, kabel divarlara bir o qədər çox
              sürtünür və çəkmək üçün bir o qədər çox güc lazım olur. 2.1.3-də gördüyümüz drill
              string məhz belə davranır: extended-reach və horizontal quyularda minlərlə fut
              uzunluğundakı string quyu divarına davamlı təmasda olur. Bu təmasın yaratdığı
              müqaviməti — torque (fırlanma müqaviməti) və drag (oxboyu müqavimət) — əvvəlcədən
              dəqiq hesablamadan uzun horizontal quyu layihələndirmək mümkün deyil.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Torque və Drag-in mənbələri
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              String üzərindəki ümumi müqavimət bir neçə fiziki mənbədən yaranır və bunların
              hər biri fərqli formada ölçülür və idarə olunur:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dragSources.map((d) => (
                <div key={d.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{d.name}</p>
                  <p className="text-[13px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{d.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. Sürtünmə əmsalı (Friction Factor) — modelin ürəyi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Torque & drag modelinin dəqiqliyi birbaşa sürtünmə əmsalının (μ) düzgün seçilməsindən
              asılıdır. Bu əmsal quyu divarı ilə string arasındakı &quot;kürüklük&quot; dərəcəsini
              göstərir və 2.3.1-də gördüyümüz mud tipindən, casing-in vəziyyətindən və formasiyanın
              xüsusiyyətlərindən çox asılıdır:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Mühit</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tipik μ Aralığı</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qeyd</th>
                  </tr>
                </thead>
                <tbody>
                  {frictionFactors.map((f) => (
                    <tr key={f.env} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{f.env}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{f.range}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{f.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Drag rejimləri — Pick Up, Slack Off, Rotating
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Səthdəki hook load (asma yükü) göstəricisi string-in hansı hərəkətdə olduğuna görə
              fərqli oxunur. <strong>Pick Up (PU)</strong> — string yuxarı çəkilərkən sürtünmə
              çəkiyə əlavə olunur, hook load ən yüksək qiymətini göstərir. <strong>Slack Off
              (SO)</strong> — string aşağı endirilərkən sürtünmə çəkini azaldır, hook load ən
              aşağı qiyməti göstərir. <strong>Rotating Off Bottom</strong> — string dibdən
              ayrıqkən sadəcə fırlanarkən ölçülən hook load, real çəkinin ən yaxın göstəricisidir.
              Bu üç rejim arasındakı fərq mühəndisə real sürtünmə əmsalını sahə məlumatından
              geri hesablamağa (back-calculation) imkan verir.
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
              Gözlənilməz yüksək drag halında operator əlavə qüvvə tətbiq edərək string-i
              &quot;zorla&quot; hərəkət etdirməyə çalışarsa, bu, drill pipe-ın tension həddini
              aşaraq qopmasına (parting) səbəb ola bilər — nəticədə BHA quyuda qalır və
              mürəkkəb fishing əməliyyatı tələb olunur. Hər addımda hook load real-time
              izlənməli və gözlənilən modeldən kənarlaşma dərhal araşdırılmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              4. Buckling — string-in əyilib qatlanması
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Uzun horizontal intervallarda, xüsusən sliding rejimində (2.4.1) drill pipe-a
              çox WOB tətbiq edildikdə, boru öz oxu boyu sınusoidal formada əyilməyə başlaya
              bilər — buna <strong>sinusoidal buckling</strong> deyilir. Bu vəziyyət davam edərsə,
              boru daha da bükülərək spiral formaya keçir (<strong>helical buckling</strong>) —
              bu mərhələdə boru quyu divarına tam sarılır və əlavə WOB artıq bit-ə ötürülmür,
              sadəcə sürtünməni artırır. Torque & drag modeli məhz bu buckling həddini əvvəlcədən
              hesablayaraq, operatora nə qədər WOB tətbiq edilə biləcəyinin real sərhədini göstərir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              5. Torque & Drag modelinin praktiki tətbiqi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Quyu qazılmazdan əvvəl mühəndislər tam trayektoriya (2.4.1-dəki KOP, build rate,
              hədəf) üzrə softver modeli qururlar ki, hər dərinlikdə gözlənilən hook load və
              səth torque-u əvvəlcədən bilinsin. Bu, üç əsas qərara kömək edir: (1) casing-in
              lazımi dərinliyə qədər endirilə biləcəyinin təsdiqi, (2) BHA və drill string
              komponentlərinin tələb olunan tension/torque həddinə uyğunluğu, (3) real-time
              qazma zamanı ölçülən dəyərlərin modeldən nə qədər kənarlaşdığının (bu, stuck pipe
              və ya divar problemi əlaməti ola bilər) izlənməsi.
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
              Helical buckling vəziyyətində olan drill pipe casing və ya quyu divarına yüksək
              nöqtəvi təzyiqlə sıxılır — bu, uzunmüddətli fasiləsiz sürtünmə nəticəsində həm
              pipe divarında, həm də casing daxilində qeyri-adi aşınmaya (wear) səbəb olur və
              gələcəkdə pipe zəifləməsi/partlaması riskini artırır. Buckling əlamətləri
              görünəndə WOB dərhal azaldılmalı və modeldə yenidən qiymətləndirilməlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — Sadələşdirilmiş Soft-String modeli ilə drag
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              2.4.1-dəki build bölməsi üçün (R = 1,909.86 ft, inklinasiya dəyişimi 0°→60°)
              pick-up rejimində əlavə drag qüvvəsini sadələşdirilmiş modellə qiymətləndirək:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: build bölməsi çəkisi (mud daxilində, buoyed) = 45,000 lbs, orta inklinasiya ≈ 30°, μ = 0.30 (WBM, openhole)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Normal qüvvə (N) ≈ Buoyed çəki × sin(30°) = 45,000 × 0.5 = 22,500 lbs</p>
                <p>Sürtünmə (drag) qüvvəsi = μ × N = 0.30 × 22,500 = 6,750 lbs</p>
                <p>Pick-up hook load = Şaquli komponent + Drag = (45,000 × cos30°) + 6,750</p>
                <p>Pick-up hook load = 38,971 + 6,750 = <span style={{ color: PATH_COLOR }}>45,721 lbs</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: sadəcə əyilmə səbəbindən pick-up zamanı hook load-a əlavə ~6,750 lbs
                sürtünmə yükü əlavə olunur. Real quyularda bu hesablama hər dərinlik intervalı
                üçün ayrı-ayrı (incremental) aparılır və bütün string boyu cəmlənir — sadələşdirilmiş
                tək-seqmentli nümunə burada yalnız konsepti göstərir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Al Shaheen sahəsi, Qatar", text: "Yüksək sayda extended-reach quyu ilə tanınan bu layihədə torque & drag modelləmə hər quyu dizaynının ayrılmaz hissəsidir — bu, 2.1.4-də qeyd etdiyimiz kimi, bit seçimi ilə də sıx bağlıdır." },
                { name: "Sakhalin-1, Rusiya", text: "Dünya rekordu qıran uzunluqdakı ERD quyularında torque & drag limitləri BHA dizaynını, hətta drill pipe grade seçimini birbaşa müəyyən edib." },
                { name: "ACG, Xəzər dənizi, Azərbaycan (BP)", text: "Çoxsaylı directional quyularda RSS istifadəsi həm ROP-u artırıb, həm də sliding intervalların azalması ilə drag-related problemləri minimuma endirib." },
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
              <li>• Torque fırlanma müqaviməti, drag isə oxboyu (yuxarı/aşağı) müqavimətdir — hər ikisi string-divar təmasından yaranır</li>
              <li>• Sürtünmə əmsalı (μ) mud tipindən və formasiyadan asılıdır, model dəqiqliyi buna həssasdır</li>
              <li>• Pick Up, Slack Off və Rotating hook load ölçmələri real sürtünmə əmsalını təyin etməyə kömək edir</li>
              <li>• Sinusoidal və helical buckling həddindən artıq WOB-un faydasız hala gəldiyi nöqtədir</li>
              <li>• Torque & drag modeli casing dizaynı və BHA seçimindən əvvəl mütləq aparılmalıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling/directional-drilling-basics"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Directional Drilling Əsasları
          </Link>
          <Link
            href="/learn/drilling/drilling-problems"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Qazma Problemləri
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}