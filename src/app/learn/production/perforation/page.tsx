"use client";
import Link from "next/link";

const PATH_COLOR = "#E8B33D";

const perforationTypes = [
  { name: "Bullet Perforasiya", desc: "Metal güllə casing və sementi mexaniki olaraq deşir", best: "Tarixi üsul — yumşaq formasiyalarda, dayaz quyularda" },
  { name: "Shaped Charge (Jet) Perforasiya", desc: "Partlayıcı enerjini fokuslaşdıran konusvari metal örtüklü zaryad, yüksək sürətli metal jet yaradır", best: "Müasir standart — demək olar bütün quyularda, dərin/bərk formasiyalarda" },
  { name: "Hydraulic Jetting", desc: "Yüksək təzyiqli abraziv mayenin mexaniki eroziya ilə deşməsi", best: "Presis, seçici zona açılışı tələb olunanda" },
];

export default function PerforationLesson() {
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
              5.1.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Well Completion Əsasları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Perforasiya
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1926-cı il: neft sənayesinin ilk "qapı açan" ixtirası
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Əvvəlki dərsdə cased & perforated completion-un üstünlüklərindən danışdıq — amma
              "perforated" sözü əslində nə deməkdir? 1926-cı ildə ilk dəfə casing-i mexaniki
              deşmək üçün güllə əsaslı alət istifadə olunanda, mühəndislər ilk dəfə quyunu
              "seçici şəkildə açmaq" imkanı əldə etdilər. Bundan əvvəl open hole completion
              demək olar yeganə seçim idi. Bu gün perforasiya — casing, sement və formasiyanı
              deşərək kollektorla tubing arasında birbaşa flüid yolu yaradan prosesdir və
              dünyada qazılan quyuların böyük əksəriyyətində istifadə olunur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Perforasiya nə üçün lazımdır?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Cased & perforated completion-da casing bütün quyu boyu sement ilə bərkidilir —
              yəni kollektorla tubing arasında heç bir təbii əlaqə yoxdur. Perforasiya bu
              baryeri qəsdən deşərək flüidin (neft, qaz, su) formasiyadan quyu lüləsinə axmasına
              imkan verir. Prosesin məqsədi sadəcə "dəlik açmaq" deyil — mümkün qədər aşağı
              əlavə axın müqaviməti (skin) ilə, mexaniki dayanıqlığı qorumaqla, düzgün zonalarda
              maksimum əlaqə yaratmaqdır. Yanlış icra edilmiş perforasiya kollektor potensialının
              böyük hissəsini əlçatmaz saxlaya bilər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Perforasiya üsulları
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
                  {perforationTypes.map((c) => (
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
              3. Shaped charge necə işləyir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Müasir perforasiya gunları (perforating gun) uzunsov borunun üzərinə düzülmüş
              onlarla shaped charge daşıyır. Hər charge — konusvari metal örtüklü (adətən mis
              və ya tantal tozu) partlayıcı zaryaddır. Partlayış anında metal örtük mikrosaniyələr
              ərzində əriyərək 7000-9000 m/san sürətlə hərəkət edən nazik, yüksək enerjili metal
              jet-ə çevrilir. Bu jet casing-i, sementi və formasiyanı ardıcıl olaraq deşərək
              silindrik formada perforasiya kanalı (perforation tunnel) yaradır — bütün proses
              milyonda bir saniyə ərzində baş verir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Əsas perforasiya parametrləri
            </h2>
            <div className="space-y-2.5">
              {[
                "Shots Per Foot (SPF) — hər fut casing üzrə perforasiya sayı (adətən 4-12 SPF)",
                "Faza bucağı (phasing) — ardıcıl perforasiyaların bucaq fərqi (60°, 90°, 120°, 180°) — dairəvi əlaqəni artırır",
                "Penetration dərinliyi — jet-in formasiyaya nə qədər dərin nüfuz etdiyi (adətən 10-30 düym)",
                "Giriş deşiyinin diametri (entry hole diameter) — tipik 0.3-0.5 düym aralığında",
                "Underbalanced / overbalanced şərait — perforasiya anında quyu təzyiqinin formasiya təzyiqinə nisbəti",
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
              <strong>Underbalanced vs Overbalanced Perforasiya:</strong> Underbalanced
              perforasiyada quyu təzyiqi formasiya təzyiqindən aşağı saxlanılır — partlayışdan
              dərhal sonra formasiyadan quyuya doğru qısa müddətli "geri axın" yaranır, bu da
              perforasiya kanalında yaranan zədələnmiş (crushed) zonanı təmizləyir və nəticədə
              çox aşağı skin əldə edilir. Amma bu üsul kontrol itkisi (well control) riski daşıyır
              və hər formasiyada tətbiq oluna bilmir. Overbalanced perforasiya isə təhlükəsizdir
              və sabit təzyiq şəraiti təmin edir, lakin zədələnmiş zona təmizlənmədiyi üçün daha
              yüksək skin və aşağı ilkin məhsuldarlıq riski var — bəzən əlavə stimulyasiya
              (məs. acidizing) tələb olunur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              5. Skin effekti və perforasiyanın rolu
            </h2>
            <p className="text-[14px] leading-[1.75]">
              "Skin" — quyu ətrafında yaranan əlavə axın müqavimətini ifadə edən ölçüsüz
              kəmiyyətdir. Müsbət skin (skin &gt; 0) məhsuldarlığı azaldır, mənfi skin isə
              (adətən hidravlik yarılmadan sonra) məhsuldarlığı artırır. Perforasiya öz-özlüyündə
              həmişə müəyyən qədər müsbət skin yaradır — çünki flüid, açıq hole-a nisbətən daha
              dar və dolama kanallardan keçməli olur. Yaxşı dizayn edilmiş perforasiya (yüksək
              SPF, optimal faza bucağı, underbalanced şərait) bu skin-i minimuma endirir və
              nəzəri open hole məhsuldarlığına mümkün qədər yaxınlaşdırır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — Perforasiya Sayı və Açıq Axın Sahəsi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Perforasiya intervalının ümumi açıq axın sahəsini qiymətləndirmək üçün əvvəlcə
              ümumi perforasiya sayını, sonra isə hər bir deşiyin sahəsini hesablamaq lazımdır:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: interval uzunluğu L = 12 ft, SPF = 4, giriş deşiyi diametri d = 0.5 düym
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                N = L × SPF &nbsp;&nbsp;|&nbsp;&nbsp; A_perf = π(d/2)² &nbsp;&nbsp;|&nbsp;&nbsp; A_total = N × A_perf
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>N = 12 × 4 = <span style={{ color: PATH_COLOR }}>48 perforasiya</span></p>
                <p>A_perf = π × (0.25)² ≈ 0.196 düym²</p>
                <p>A_total = 48 × 0.196 ≈ <span style={{ color: PATH_COLOR }}>9.4 düym²</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: 12 futluq interval üzərində 48 perforasiya ümumilikdə təxminən 9.4 düym²
                açıq axın sahəsi yaradır. Müqayisə üçün — əvvəlki dərsdəki tubing daxili sahəsi
                ilə tutuşdursaq, adətən perforasiya sahəsi tubing-in özündən daha az məhdudlaşdırıcı
                olur, əgər SPF və faza bucağı düzgün seçilibsə; əks halda perforasiya "boğaz nöqtəsi"
                (bottleneck) rolunu oynaya bilər.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Yüksək faza bucaqlı (60°) perforasiya gunları geniş istifadə olunur — çoxlaylı kollektorlarda dairəvi əlaqəni maksimallaşdırmaq üçün." },
                { name: "Ekofisk sahəsi, Şimal dənizi (Norveç)", text: "Underbalanced perforasiya texnikaları tətbiq edilib — təbaşir (chalk) kollektorlarda skin-i minimuma endirmək məqsədilə." },
                { name: "Permian Basin, ABŞ", text: "Şist (shale) horizontal quyularda çox yüksək sıxlıqlı (12+ SPF) perforasiya klasterləri hidravlik yarılma effektivliyini artırmaq üçün istifadə olunur." },
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
              <li>• Perforasiya casing, sement və formasiyanı deşərək kollektorla tubing arasında flüid yolu yaradır</li>
              <li>• Shaped charge — bugünkü standart üsul, yüksək sürətli metal jet ilə işləyir</li>
              <li>• SPF, faza bucağı və penetration dərinliyi məhsuldarlığı birbaşa təyin edir</li>
              <li>• Underbalanced perforasiya skin-i azaldır, amma well control riski yaradır</li>
              <li>• Perforasiya həmişə müəyyən qədər müsbət skin yaradır — dizayn məqsədi bunu minimuma endirməkdir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/production/completion-design"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Completion Dizaynı
          </Link>
          <Link
            href="/learn/production/sand-control"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Sand Control
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}