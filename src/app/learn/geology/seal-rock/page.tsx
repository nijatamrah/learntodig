"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const sealTypes = [
  { type: "Duz (Halit)", plasticity: "Çox yüksək", thickness: "10 – 1000+ m", note: "Ən yaxşı" },
  { type: "Gil / Şist", plasticity: "Orta-yüksək", thickness: "5 – 200 m", note: "Yaxşı (ən geniş yayılmış)" },
  { type: "Anhidrit / Gips", plasticity: "Orta", thickness: "1 – 50 m", note: "Yaxşı" },
  { type: "Sıx Karbonat", plasticity: "Aşağı (kövrək)", thickness: "Dəyişkən", note: "Şərti (çatlara meyilli)" },
];

export default function SealCapRockLesson() {
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
              1.1.5
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Əsaslar
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Seal / Cap Rock <span style={{ color: "#F0F4FF" }}>(Örtük Süxur)</span>
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          {/* Creative intro: analogy hook */}
          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə bu mövzu vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Bir şüşə qazlı içkini açıq qoysanız, qazı tez yox olar. Qapağı bağlasanız, qaz
              illərlə saxlanır. Yerin təkində də vəziyyət eynidir: 1.1.4-də gördüyümüz reservoir
              süxur nə qədər yaxşı olsa da, üzərində <strong>örtük</strong> yoxdursa, neft və qaz
              milyonlarla il ərzində səth boyunca sızıb yox olar. Elə buna görə kəşfiyyatçılar
              üçün "seal varmı?" sualı çox zaman "bura qazmağa dəyərmi?" sualından daha vacibdir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Örtük süxur nədir?
            </h2>
            <p className="text-[14px] leading-[1.75] mb-4">
              Seal (və ya cap rock) — məsaməliliyi və keçiriciliyi son dərəcə aşağı olan,
              karbohidrogenlərin yuxarıya doğru miqrasiyasının qarşısını alan süxur təbəqəsidir.
              O, birbaşa reservoir süxurun üzərində yerləşir və məsamə kanallarının bağlı
              olmasına görə maneə rolunu oynayır.
            </p>
            <p className="text-[14px] leading-[1.75]">
              Fiziki olaraq seal "hermetik" deyil — mütləq keçirməzlik yoxdur. Əvəzində o,
              karbohidrogenlərin içindən keçməsi üçün lazım olan minimum təzyiqi (kapilyar giriş
              təzyiqini) çox yüksək saxlayır. Bu təzyiq aşılmadığı müddətcə neft və qaz milyonlarla
              il ərzində yerində qalır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Kapilyar giriş təzyiqi mexanizmi
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <div className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>Reservoir süxurda</p>
                <p className="text-[13.5px] leading-[1.7]" style={{ color: "#9FAEC4" }}>
                  Məsamələr geniş olduğu üçün neft-qaz asanlıqla hərəkət edir, kapilyar müqavimət aşağıdır.
                </p>
              </div>
              <div className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>Seal süxurda</p>
                <p className="text-[13.5px] leading-[1.7]" style={{ color: "#9FAEC4" }}>
                  Məsamə boğazları mikroskopik səviyyədədir (çox vaxt nanometrdən az), buna görə giriş üçün əhəmiyyətli təzyiq tələb olunur.
                </p>
              </div>
            </div>
            <p className="text-[14px] leading-[1.75] mt-4">
              Nə qədər çox neft-qaz sütunu yığılırsa, aşağıdan yuxarıya doğru təzyiq bir o qədər
              artır — sonda bu təzyiq seal-in kapilyar müqavimətini aşarsa, sızma başlayır. Elə
              buna görə hər yatağın "maksimum karbohidrogen sütunu hündürlüyü" var.
            </p>
          </section>

          {/* Creative element: blue tip callout */}
          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#3B9BD814", border: "1px solid #3B9BD840" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#3B9BD8" }}>
              Ümumi səhv
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Tələbələr tez-tez seal-i "keçirməz süxur" kimi təsvir edir. Düzgün deyil — heç bir
              süxur mütləq keçirməzdir. Doğru termin "yüksək giriş təzyiqinə malik süxur"dur; fərq
              nüanslı görünsə də, yatağın maksimum sütun hündürlüyünü hesablarkən həlledicidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Örtük süxur növləri
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Seal növü</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Plastiklik</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qalınlıq</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Effektivlik</th>
                  </tr>
                </thead>
                <tbody>
                  {sealTypes.map((s) => (
                    <tr key={s.type} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{s.type}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{s.plasticity}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{s.thickness}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{s.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Effektivliyə təsir edən amillər
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Plastiklik xüsusilə kritikdir: duz və gil kimi plastik süxurlar tektonik gərginlik
              altında əyilir və özünü "sağaldır", bu da çatların açıq qalmasının qarşısını alır.
              Əksinə, kövrək karbonat və ya qumdaşı təbəqələri gərginlik altında qırılır və çat
              şəbəkəsi yaradaraq sızma yolları açır.
            </p>
            <p className="text-[14px] leading-[1.75]">
              Nəhayət, yanal davamlılıq (lateral continuity) vacibdir — seal bütün yataq sahəsi
              boyunca fasiləsiz uzanmalıdır. Lokal olaraq kəsilən və ya faylla parçalanan seal,
              yatağın bir hissəsinin tam sızmasına səbəb ola bilər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Top seal və fault seal fərqi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              "Top seal" reservoir süxurun birbaşa üstündə yatan stratiqrafik örtükdür — yataqların
              əksəriyyəti üçün əsas maneə elə budur. "Fault seal" isə faylın özünün, iki fərqli
              süxur blokunu bir-birindən ayıraraq, yanal miqrasiyanın qarşısını alması prosesidir —
              bu, faylın gilə zəngin material ilə "sürtülməsi" (shale gouge) nəticəsində baş verə bilər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — kapilyar giriş təzyiqi
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: σ = 0.03 N/m, θ = 0° (cosθ = 1), reservoirdə r = 5 mikron, seal-də r = 0.01 mikron (10 nm)
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                Pc = 2σ·cosθ / r
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Pc(reservoir) = 2 × 0.03 / (5×10⁻⁶) ≈ 12 000 Pa (≈ 0.12 bar)</p>
                <p>Pc(seal) = 2 × 0.03 / (0.01×10⁻⁶) ≈ <span style={{ color: PATH_COLOR }}>6 000 000 Pa (≈ 60 bar)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə göstərir ki, seal-in giriş təzyiqi reservoir-dən təxminən 500 dəfə
                yüksəkdir. Praktiki mənada bu, neft-qaz sütununun seal-i "aşmaq" üçün onlarla bar
                əlavə təzyiq yaratmalı olması deməkdir — bu da geoloqlara yatağın maksimum sütun
                hündürlüyünü qiymətləndirməyə imkan verir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Ghawar, Səudiyyə Ərəbistanı", text: "Jurassic Arab reservoir süxurları Hith Anhidrit təbəqəsi ilə örtülüb — bu qalın anhidrit qatı milyardlarla barrel neftin yerində qalmasını təmin edən əsas seal-dir." },
                { name: "Şimal Dənizi, Zechstein duz qatı", text: "Permian dövrünə aid Zechstein duz təbəqəsi cənubi Şimal Dənizindəki bir çox qaz yataqları üçün regional seal rolunu oynayır." },
                { name: "Cənubi Xəzər hövzəsi, Maykop dəstəsi", text: "Azəri-Çıraq-Günəşli kimi yataqların yerləşdiyi hövzədə Oligosen-Miosen yaşlı Maykop gil dəstəsi regional seal kimi çıxış edir." },
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
              <li>• Seal mütləq keçirməz deyil — yüksək kapilyar giriş təzyiqi ilə sızmanın qarşısını alır</li>
              <li>• Duz və gil kimi plastik süxurlar ən etibarlı seal növləridir</li>
              <li>• Top seal və fault seal fərqli mexanizmlərdir — hər ikisi qiymətləndirilməlidir</li>
              <li>• Kapilyar giriş təzyiqi hesablaması yatağın maksimum sütun hündürlüyünü proqnozlaşdırır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/reservoir-rock"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Reservoir Rock
          </Link>
          <Link
            href="/learn/geology/trap-types"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Trap Types
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}