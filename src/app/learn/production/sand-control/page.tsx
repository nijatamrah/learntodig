"use client";
import Link from "next/link";

const PATH_COLOR = "#E8B33D";

const sandControlTypes = [
  { name: "Standalone Screen (Mexaniki Süzgəc)", desc: "Məsaməli metal örtük, qum hissəciklərini mexaniki olaraq saxlayır", best: "Yaxşı sortlaşmış (uniform dənə ölçülü) formasiyalar üçün ucuz seçim" },
  { name: "Gravel Pack", desc: "Perforasiya/open hole ətrafına xüsusi ölçülü çınqıl (gravel) yerləşdirilir, öz növbəsində formasiya qumunu tutur", best: "Zəif sortlaşmış formasiyalar, yüksək debitli quyular" },
  { name: "Kimyəvi Konsolidasiya", desc: "Qatran (resin) inyeksiyası ilə formasiya dənələrini yerində 'yapışdırmaq'", best: "Mexaniki alətlərin yerləşdirilməsi çətin olan dar interval və ya yenidən işlənən quyular" },
];

export default function SandControlLesson() {
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
              5.1.3
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Well Completion Əsasları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Sand Control
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Sual: neft ilə birlikdə qum da axsa nə olar?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Perforasiya dərsində gördük ki, yaxşı dizayn edilmiş perforasiya kollektorla quyu
              arasında effektiv yol açır. Amma bu yol həmişə "təmiz" flüid üçün nəzərdə
              tutulmayıb — zəif konsolidasiya olunmuş (yəni dənələri bir-birinə zəif bağlı)
              qumlu formasiyalarda, flüidlə birlikdə formasiya qumu da quyuya doğru hərəkət
              edə bilər. Nəticə: aşınmış tubing, tıxanmış avadanlıq, aşağı düşən debit və
              bəzən tam quyu itkisi. Bu problemi qabaqcadan həll etmək üçün istifadə olunan
              üsullar məcmusuna <strong>sand control</strong> deyilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Qum istehsalı nə üçün baş verir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Qum istehsalı, formasiya dənələri arasındakı təbii sementləşmənin (silisium,
              karbonat və s. ilə) zəif olduğu, gənc (geoloji baxımdan) çökmə süxurlarında —
              məsələn Miosen və ya Pliosen dövrü qumdaşlarında — daha çox rast gəlinir.
              Axın sürəti artdıqca, drag force (sürükləmə qüvvəsi) dənələr arasındakı
              kapilyar və mexaniki bağları qıra bilər. Yüksək debit tələbi ilə formasiyanın
              mexaniki dayanıqlığı arasındakı bu ziddiyyət, sand control dizaynının əsas
              mühərriki hesab olunur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Əsas sand control üsulları
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Üsul</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təsvir</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Ən uyğun olduğu hal</th>
                  </tr>
                </thead>
                <tbody>
                  {sandControlTypes.map((c) => (
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
              3. Gravel Pack necə işləyir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Gravel pack — perforasiya kanalları və quyu lüləsi ilə screen arasındakı
              boşluğa xüsusi seçilmiş ölçülü, dəyirmi formalı çınqıl (adətən silisium qumu)
              yerləşdirmə prosesidir. Çınqılın dənə ölçüsü formasiya qumunun ölçüsünə
              əsasən dəqiq hesablanır (adətən formasiya dənəsinin median ölçüsünün 5-6
              qatı) — məqsəd formasiya dənələrinin çınqıl arasında "körpü" yaratmasına
              imkan verməkdən ibarətdir, beləliklə yalnız çox incə hissəciklər keçə bilir.
              Bu üsul ən etibarlı sayılır, lakin quraşdırılması daha mürəkkəb və bahalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Sand control dizaynı prosesi
            </h2>
            <div className="space-y-2.5">
              {[
                "Formasiya dənə ölçüsü paylanmasının analizi (sieve analysis) — laboratoriya nümunələri əsasında",
                "Sortlaşma əmsalının (sorting coefficient) hesablanması — nə qədər 'zəif sortlaşmış' olduğunu göstərir",
                "Uyğun sand control üsulunun seçimi (screen, gravel pack, kimyəvi konsolidasiya)",
                "Screen məsamə ölçüsü və ya çınqıl ölçüsünün dəqiq hesablanması",
                "Quraşdırma və sonradan debit testləri ilə effektivliyin yoxlanılması",
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
              <strong>Standalone Screen vs Gravel Pack:</strong> Standalone screen daha ucuz,
              daha sürətli quraşdırılır və daha az axın müqaviməti (skin) yaradır — amma
              zəif sortlaşmış, geniş dənə ölçüsü diapazonuna malik formasiyalarda screen
              məsamələri tez tıxanır (plugging) və ya erkən aşınır (erosion), çünki formasiya
              dənələri arasında "körpü effekti" yaranmır. Gravel pack isə əlavə mərhələ və
              xərc tələb edir, həmçinin bir qədər əlavə axın müqaviməti yaradır (çınqıl
              layı özü kiçik bir skin mənbəyidir), amma demək olar bütün formasiya
              növlərində uzunmüddətli etibarlılıq təmin edir. Seçim, dənə ölçüsü
              paylanmasının vahidliyindən (uniformity) və layihənin gözlənilən istismar
              müddətindən asılıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Screen Məsamə Ölçüsünün Seçimi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Screen məsamə ölçüsü (slot width), formasiya qumunun median dənə ölçüsünə
              (D50) əsaslanan empirik nisbətlə seçilir:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: laboratoriya sieve analizindən D50 = 150 mikron, standart nisbət əmsalı = 2
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                W_slot = D50 / 2
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>W_slot = 150 / 2 = <span style={{ color: PATH_COLOR }}>75 mikron</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: screen məsamələri 75 mikron enində seçilməlidir — bu, formasiya
                dənələrinin əksəriyyətinin körpü yaratmasına imkan verərkən, eyni zamanda
                incə hissəciklərin bir qismini keçirməyə (bu normaldır, "controlled fines
                production" adlanır) icazə verir. Çox kiçik seçilmiş məsamə tez tıxanmaya,
                çox böyük seçilmiş məsamə isə qum keçməsinə səbəb olar.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Neft Daşları (Neft Daşları), Azərbaycan", text: "Uzunmüddətli istismar olunan, zəif konsolidasiya olunmuş qum laylarında standalone screen tətbiqləri geniş yayılıb." },
                { name: "Niger Deltası, Nigeriya", text: "Dünyanın ən böyük gravel pack tətbiqləri bu regionda görülür — cavan, zəif sementləşmiş qumdaşı kollektorlarına görə." },
                { name: "Mars sahəsi, Meksika Körfəzi", text: "Dərinsu quyularında expandable screen (genişlənən screen) texnologiyası tətbiq olunub — açıq hole stabilliyini artırmaq üçün." },
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
              <li>• Sand control zəif konsolidasiya olunmuş formasiyalarda qum istehsalının qarşısını almaq üçün tətbiq olunur</li>
              <li>• Əsas üsullar: standalone screen, gravel pack, kimyəvi konsolidasiya</li>
              <li>• Gravel pack ən etibarlı, amma ən bahalı və mürəkkəb üsuldur</li>
              <li>• Screen məsamə ölçüsü formasiyanın D50 dənə ölçüsünə əsasən hesablanır</li>
              <li>• Seçim, dənə ölçüsü paylanmasının vahidliyi və istismar müddəti tələbindən asılıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/production/perforation"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Perforasiya
          </Link>
          <Link
            href="/learn/production/intro-to-artificial-lift"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Artificial Lift-ə Giriş
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}