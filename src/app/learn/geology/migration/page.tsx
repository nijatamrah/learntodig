"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const migrationComparison = [
  { type: "Birincili Miqrasiya (Primary)", mexanizm: "Karbohidrogenin source rock-dan çıxıb yaxınlıqdakı keçirici qatına keçməsi", məsafə: "Adətən metrlərlə", sürücü_qüvvə: "Kompaksiya təzyiqi, mikrofraktura" },
  { type: "İkincili Miqrasiya (Secondary)", mexanizm: "Karbohidrogenin reservoir daxilində yuxarıya doğru uzun məsafə hərəkəti", məsafə: "Kilometrlərlə", sürücü_qüvvə: "Üzmə qüvvəsi (buoyancy)" },
  { type: "Üçüncülü Miqrasiya (Tertiary)", mexanizm: "Tələdən sızma və ya yenidən miqrasiya (remigration)", məsafə: "Dəyişkən", sürücü_qüvvə: "Seal-in aşınması, tektonik yenidən aktivləşmə" },
];

export default function MigrationLesson() {
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
              1.2.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Hövzə və Miqrasiya
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Migration <span style={{ color: "#F0F4FF" }}>(Miqrasiya)</span>
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          {/* Creative intro: analogy start */}
          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə bu mövzu vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Təsəvvür edin ki, sıxılmış süngər dolu bir qabı yavaş-yavaş sıxırsınız — süngərin
              içindəki su tədricən çölə sızır və ən yaxın boşluğa doğru hərəkət edir. Source rock-da
              da olan proses buna bənzəyir: 1.1.3-də gördüyümüz kimi, üzvi maddə termal yetişmə
              nəticəsində neft və qaza çevrildikdən sonra, o özlüyündə source rock-un içində qala
              bilməz. Sıxlığı ətraf sulardan az olan karbohidrogen tədricən "sıxılır" və çölə doğru
              hərəkət etməyə başlayır. Bu hərəkət prosesinin adı <strong>miqrasiyadır</strong> və
              o olmadan neft heç vaxt source rock-dan reservoir-a çatıb toplana bilməz — bütün
              petroleum sistemi bu addımdan asılıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Miqrasiya nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Miqrasiya — karbohidrogenlərin əmələ gəldiyi source rock-dan başlayaraq, son
              nəticədə tələdə toplanana qədər keçdiyi bütün hərəkət prosesidir. Bu proses bir
              deyil, iki fərqli mərhələdən ibarətdir: birincili miqrasiya (primary migration) və
              ikincili miqrasiya (secondary migration). Hər iki mərhələ fərqli fiziki qüvvələr
              tərəfindən idarə olunur və fərqli məsafələri əhatə edir, ona görə də onları ayrı-ayrı
              anlamaq vacibdir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Birincili miqrasiya (Primary Migration)
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Birincili miqrasiya karbohidrogenin son dərəcə az keçiricilikli source rock-un (adətən
              gil və ya şist) daxilindən çıxıb ilk keçirici qata daxil olması prosesidir. Bu mərhələ
              adətən çox qısa məsafələrdə — bir neçə santimetrdən bir neçə metrə qədər — baş verir,
              çünki source rock-un məsamələri çox kiçik və bir-biri ilə zəif əlaqəlidir. Bu hərəkəti
              işə salan əsas qüvvələr çöküntülərin üst-üstə yığılmasından yaranan kompaksiya
              təzyiqi, kerogenin karbohidrogenə çevrilməsi zamanı yaranan həcm artımı və bu təzyiqin
              nəticəsində süxurda əmələ gələn mikroskopik çatlardır (mikrofraktura).
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. İkincili miqrasiya (Secondary Migration)
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Karbohidrogen bir dəfə keçirici reservoir qatına daxil olduqdan sonra, ikincili
              miqrasiya mərhələsi başlayır. Bu mərhələdə əsas hərəkətverici qüvvə <strong>üzmə
              qüvvəsidir (buoyancy)</strong> — neft və qaz sudan yüngül olduğuna görə, reservoirdəki
              su ilə əvəz olunaraq daim yuxarıya doğru hərəkət etməyə çalışır. Bu proses onlarla,
              hətta yüzlərlə kilometr məsafədə baş verə bilər və karbohidrogen yolunda ilk uyğun
              tələ (1.1.6-da gördüyümüz struktur və ya stratiqrafik tələ) ilə rastlaşana qədər
              davam edir. Əgər yolda heç bir tələ olmazsa, karbohidrogen nəticədə səth səviyyəsinə
              çatıb sızıntı (seepage) şəklində itirilir.
            </p>
          </section>

          {/* Creative element: warning callout */}
          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#D8823B14", border: "1px solid #D8823B40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#D8823B" }}>
              Diqqət et
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Miqrasiya yolu (migration pathway) həmişə düz xətt üzrə yuxarı deyil — karbohidrogen
              ən az müqaviməti olan yolu izləyir və çox vaxt yan istiqamətdə uzun məsafə qət edərək
              qırılma xətləri, keçirici qatlar və ya uyğunsuzluq səthləri boyunca "sürüşür". Buna
              görə kəşfiyyat zamanı yalnız trapın özünü deyil, source rock-dan trapa qədər real
              miqrasiya yolunun mövcudluğunu da sübut etmək lazımdır — bu, 1.2.3-də öyrənəcəyimiz
              petroleum system konsepsiyasının əsas hissəsidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Miqrasiya mərhələlərinin müqayisəsi
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Mərhələ</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Mexanizm</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Məsafə</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Sürücü qüvvə</th>
                  </tr>
                </thead>
                <tbody>
                  {migrationComparison.map((m) => (
                    <tr key={m.type} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{m.type}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{m.mexanizm}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{m.məsafə}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{m.sürücü_qüvvə}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Buoyancy (üzmə) təzyiqinin qiymətləndirilməsi
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: neft sütununun hündürlüyü h = 100 m, su sıxlığı ρw = 1.05 g/cm³, neft
                sıxlığı ρo = 0.85 g/cm³, qravitasiya sabiti g = 9.81 m/s²
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                Buoyancy təzyiqi = (ρw − ρo) × g × h
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>ΔP = (1.05 − 0.85) × 1000 kg/m³ × 9.81 × 100 m</p>
                <p>ΔP = 0.20 × 1000 × 9.81 × 100 ≈ <span style={{ color: PATH_COLOR }}>196,200 Pa (≈ 1.96 bar)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu təzyiq fərqi neftin reservoirdə niyə davamlı olaraq yuxarıya doğru
                "itələndiyini" göstərir. Sıxlıq fərqi nə qədər böyükdürsə (yəni neft nə qədər
                yüngüldürsə) və neft sütunu nə qədər hündürdürsə, buoyancy təzyiqi bir o qədər
                yüksək olur. Əgər bu təzyiq seal-in keçirməzlik həddini (capillary entry pressure)
                aşarsa, neft seal-i "yara" bilər və tələdən çölə sızır — buna görə seal-in
                keyfiyyəti tələnin tutum tutumu qədər vacibdir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Şimal Dənizi, Kimmeridge Clay sistemi", text: "Kimmeridge Clay source rock-undan çıxan karbohidrogenlər uzun ikincili miqrasiya yolları qət edərək Brent qrupu qumdaşı reservoirlərində toplanıb — klassik uzun məsafəli miqrasiya nümunəsi." },
                { name: "Neft Daşları, Azərbaycan", text: "Cənubi Xəzər hövzəsinin dərin Məhsuldar Qat çöküntülərindən qalxan karbohidrogenlər fay zonaları boyunca miqrasiya edərək daha dayaz strukturlarda toplanıb." },
                { name: "Los Angeles Hövzəsi, ABŞ", text: "Monterey formasiyasının source rock-larından çıxan neft qısa məsafəli miqrasiya vasitəsilə yaxınlıqdakı struktur tələlərə keçib — buna görə hövzədə çoxlu kiçik, sıx yerləşmiş yataqlar mövcuddur." },
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
              <li>• Miqrasiya karbohidrogenin source rock-dan tələyə qədər keçdiyi hərəkət prosesidir</li>
              <li>• Birincili miqrasiya qısa məsafəli olub kompaksiya təzyiqi və mikrofraktura ilə idarə olunur</li>
              <li>• İkincili miqrasiya uzun məsafəli olub əsasən buoyancy (üzmə) qüvvəsi ilə baş verir</li>
              <li>• Miqrasiya yolunun mövcudluğu source rock qədər vacibdir — trap olsa belə, yol olmadan neft ora çata bilməz</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/sedimentary-basins"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Çökmə Hövzələri
          </Link>
          <Link
            href="/learn/geology/petroleum-system"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Petroleum System
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}