"use client";
import Link from "next/link";

const PATH_COLOR = "#E8B33D";

const completionTypes = [
  { name: "Open Hole Completion", desc: "Casing yalnız kollektorun üstünə qədər, aşağısı açıqdır", best: "Homogen, sabit kollektorlar üçün ən ucuz seçim" },
  { name: "Cased & Perforated", desc: "Casing bütün quyu boyu qoyulur, sonra perforasiya edilir", best: "Ən çevik — seçici zona izolasiyasına imkan verir" },
  { name: "Slotted Liner / Screen", desc: "Perforasiya olunmayan, mexaniki filtrasiya edən boru", best: "Zəif konsolidasiya olunmuş (sıxılmamış) süxurlarda qum nəzarəti" },
];

export default function CompletionDesignLesson() {
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
              5.1.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Well Completion Əsasları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Completion Dizaynı
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Quyu qazılıb — bəs neft necə "quyuya daxil olur"?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Drilling bölməsində quyunun necə qazıldığını, Reservoir bölməsində isə kollektorda
              nə qədər neft olduğunu öyrəndik. Amma bu iki mərhələ arasında kritik bir addım var:
              quyunu, reservoir ilə səth arasında təhlükəsiz və effektiv "keçid" halına
              gətirmək. Bu prosesə <strong>well completion</strong> deyilir — və bu qərar, quyunun
              bütün ömrü boyu istehsal performansını müəyyən edir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Completion nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Completion — quyunu qazma mərhələsindən istehsal mərhələsinə keçirən bütün
              avadanlıq və prosedurların məcmusudur: casing/tubing dizaynı, kollektorla əlaqə
              yaratma üsulu (perforasiya, open hole və s.), qum nəzarəti, packer-lər və
              səth avadanlığı ilə birləşmə. Yaxşı dizayn edilmiş completion, uzun müddət
              sabit debit və minimal problem deməkdir; pis dizayn isə erkən qum istehsalı,
              aşağı debit və ya tez-tez workover deməkdir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Əsas completion tipləri
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tip</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təsvir</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Ən uyğun olduğu hal</th>
                  </tr>
                </thead>
                <tbody>
                  {completionTypes.map((c) => (
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
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Completion dizaynı prosesi
            </h2>
            <div className="space-y-2.5">
              {[
                "Reservoir xüsusiyyətlərinin qiymətləndirilməsi (təzyiq, litologiya, qum riski — əvvəlki path-lardan)",
                "Completion tipinin seçimi (open hole, cased-perforated, slotted liner)",
                "Tubing ölçüsünün müəyyən edilməsi (gözlənilən debitə əsasən)",
                "Packer və zona izolasiya strategiyasının planlaşdırılması",
                "Səth avadanlığı ilə (wellhead, christmas tree) inteqrasiya",
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

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              4. Tubing və packer sistemi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Tubing — flüidin reservoirdən səthə qədər axdığı daxili boru xəttidir (casing-in
              içində yerləşir). <strong>Packer</strong> isə tubing ilə casing arasındakı boşluğu
              (annulus) müəyyən dərinlikdə bağlayan mexanizmdir — bu, təzyiqi izolyasiya edir və
              flüidin yalnız tubing daxilindən axmasını təmin edir. Çox zonalı quyularda bir neçə
              packer istifadə edilərək müxtəlif layların ayrı-ayrı idarə olunması mümkün olur.
            </p>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#F9706614", border: "1px solid #F9706640" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#F97066" }}>
              Mühəndislik Seçimi
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              <strong>Open Hole vs Cased & Perforated:</strong> Open hole daha ucuzdur və axın
              sahəsini məhdudlaşdırmır (daha yüksək məhsuldarlıq potensialı), amma zona
              seçiciliyi yoxdur — bütün kollektor bir vaxtda açıqdır, bu da suyun və ya qazın
              erkən nüfuz etməsi riskini artırır. Cased & Perforated daha bahalıdır və perforasiya
              bir qədər axın müqaviməti yaradır, amma mühəndisə tam nəzarət verir — problemli
              zonaları izolyasiya etmək mümkündür. Seçim, kollektorun homogenliyindən və uzunmüddətli
              idarəetmə tələblərindən asılıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Eroziya Sürəti Limiti (API RP 14E)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Tubing ölçüsü seçilərkən, flüid sürəti çox yüksək olmamalıdır — əks halda boru
              divarlarında eroziya baş verə bilər. Sənaye standart formulası:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: eroziya əmsalı C = 100 (adi şərait üçün), qarışıq flüid sıxlığı ρ = 45 lb/ft³
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                V_e = C / √ρ
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>V_e = 100 / √45 = 100 / 6.7 ≈ <span style={{ color: PATH_COLOR }}>14.9 ft/san</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu şəraitdə tubing daxilindəki flüid sürəti 14.9 ft/san-dən aşağı
                saxlanmalıdır — bu, tubing diametrini seçərkən minimum diametr məhdudiyyəti kimi
                istifadə olunur (kiçik diametr = yüksək sürət = eroziya riski).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Əksər quyularda cased & perforated completion istifadə olunur — çoxzonaya nəzarət və uzunmüddətli idarəetmə tələbinə görə." },
                { name: "Troll sahəsi, Norveç", text: "Uzun horizontal open hole completion-larla tanınır — nazik neft laylarından maksimum kontakt sahəsi əldə etmək üçün." },
                { name: "Meksika Körfəzi (Gulf of Mexico) dərin su layihələri", text: "Mürəkkəb 'intelligent completion' sistemləri istifadə olunur — uzaqdan idarə olunan zona nəzarəti ilə." },
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
              <li>• Completion — quyunu qazma mərhələsindən istehsala keçirən avadanlıq və prosedurlar məcmusudur</li>
              <li>• Əsas tiplər: open hole, cased & perforated, slotted liner — hər birinin trade-off-u var</li>
              <li>• Tubing flüidi daşıyır, packer isə annulus-u izolyasiya edir</li>
              <li>• Tubing ölçüsü seçilərkən eroziya sürəti limiti (API RP 14E) nəzərə alınmalıdır</li>
              <li>• Completion seçimi kollektor homogenliyi və uzunmüddətli idarəetmə tələbindən asılıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/production"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Hasilat
          </Link>
          <Link
            href="/learn/production/perforation"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Perforasiya
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}