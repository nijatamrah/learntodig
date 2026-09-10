"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const basinComparison = [
  { type: "Rift Hövzəsi", mexanizm: "Qitə qabığının dartılması və incəlməsi nəticəsində çökmə", nümunə: "Şimal Dənizi (Viking Graben)", potensial: "Yüksək — source rock üçün əlverişli" },
  { type: "Foreland Hövzəsi", mexanizm: "Dağ silsiləsinin çəkisi altında qabığın aşağı əyilməsi", nümunə: "Qərbi Sibir Hövzəsi", potensial: "Çox yüksək — nəhəng ehtiyatlar" },
  { type: "Passiv Kənar Hövzəsi", mexanizm: "Okean açıldıqdan sonra soyuyan qabığın tədricən batması", nümunə: "Qvineya Körfəzi hövzələri", potensial: "Yüksək — qalın delta çöküntüləri" },
  { type: "Strike-slip Hövzəsi", mexanizm: "Yan-yana sürüşən faylar arasında lokal çökmə (pull-apart)", nümunə: "Kaliforniya, San Andreas zonası", potensial: "Orta — kiçik ölçülü" },
];

export default function SedimentaryBasinsLesson() {
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
              1.2.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Hövzə və Miqrasiya
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Sedimentary Basins <span style={{ color: "#F0F4FF" }}>(Çökmə Hövzələri)</span>
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          {/* Creative intro: question hook */}
          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə bu mövzu vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Niyə Qərbi Sibirdə çöküntü qatının qalınlığı 8 kilometrə çatır, amma yaxınlıqdakı
              qədim qranit qalxanında cəmi bir neçə metr torpaq qatı var? Cavab sadədir: yer
              qabığının hər yerində eyni sürətlə çökmə getmir. Yalnız müəyyən bölgələrdə — qabığın
              zəiflədiyi, dartıldığı və ya ağır yük altında əyildiyi yerlərdə — milyonlarla il
              ərzində nəhəng çöküntü qatları toplana bilir. Bu bölgələrə <strong>çökmə hövzəsi</strong> deyilir
              və 1.1-də öyrəndiyimiz source rock, reservoir rock, seal və trap elementlərinin hamısı
              məhz belə hövzələrin daxilində formalaşır. Hövzə olmadan petroleum sistemi ümumiyyətlə
              mövcud ola bilməz.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Çökmə hövzəsi nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Çökmə hövzəsi — yer qabığının tədricən aşağı əyildiyi (subsidence) və bu boşluğun
              zaman keçdikcə çay, dəniz və ya külək vasitəsilə daşınan çöküntülərlə dolduğu geniş
              geoloji strukturdur. Subsidence prosesi adətən milyonlarla il davam edir və bu müddət
              ərzində üst-üstə yığılan çöküntü qatları özləri ilə birlikdə üzvi maddəni də basdırır.
              Nəticədə hövzənin dərin hissələrində temperatur və təzyiq artır, bu da 1.1.1-də
              gördüyümüz termal yetişmə prosesini işə salır. Beləliklə, hövzənin özü həm çöküntü
              anbarı, həm də "təbii sobadır".
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Hövzələrin əmələ gəlmə mərhələləri
            </h2>
            <p className="text-[14px] leading-[1.75] mb-4">
              Bir çökmə hövzəsinin həyat dövrü adətən aşağıdakı ardıcıl mərhələlərdən keçir:
            </p>
            <div className="space-y-3">
              {[
                { n: "01", t: "Qabığın zəifləməsi", d: "Tektonik qüvvələr (dartılma, sıxılma və ya yük) nəticəsində yer qabığı incəlir və ya əyilməyə başlayır." },
                { n: "02", t: "İlkin subsidence", d: "Zəifləmiş zonada qabıq aşağı doğru hərəkət edir və boşluq — potensial hövzə fəzası — yaranır." },
                { n: "03", t: "Çöküntü toplanması", d: "Çaylar, dənizlər və küləklər vasitəsilə daşınan qum, gil və üzvi maddə bu boşluğu tədricən doldurur." },
                { n: "04", t: "Davamlı yükün təsiri", d: "Yeni çöküntülərin çəkisi hövzəni daha da aşağı basır — bu özünü gücləndirən dövr yüz milyonlarla il davam edə bilər." },
                { n: "05", t: "Termal yetişmə", d: "Dərinlikdə basdırılmış üzvi maddə tədricən qızır və müəyyən dərinlikdən sonra karbohidrogenə çevrilir." },
              ].map((s) => (
                <div key={s.n} className="flex gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-[13px] font-mono font-semibold shrink-0" style={{ color: PATH_COLOR }}>{s.n}</span>
                  <div>
                    <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{s.t}</p>
                    <p className="text-[13.5px] leading-[1.7]" style={{ color: "#9FAEC4" }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Hövzə növləri
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Subsidence-i işə salan tektonik səbəbdən asılı olaraq hövzələr fərqli kateqoriyalara
              bölünür. <strong>Rift hövzələri</strong> qitə qabığının dartılıb parçalanması nəticəsində,{" "}
              <strong>foreland hövzələri</strong> isə dağ silsiləsinin ağırlığı qabığı aşağı əydiyi
              zaman yaranır. <strong>Passiv kənar hövzələri</strong> okean açıldıqdan sonra soyuyan
              və sıxlaşan qitə kənarında formalaşır, <strong>strike-slip hövzələri</strong> isə
              faylar boyunca yan-yana sürüşmə zamanı yaranan lokal, adətən kiçik ölçülü çökmə
              zonalarıdır. Hər növün geniş yayılması, qalınlığı və neft potensialı fərqlidir.
            </p>
          </section>

          {/* Creative element: orange warning callout */}
          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#D8823B14", border: "1px solid #D8823B40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#D8823B" }}>
              Ümumi səhv
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Çox vaxt hövzə və yataq eyni anlayış kimi qəbul edilir, amma bu doğru deyil. Hövzə —
              nəhəng regional bir çöküntü fəzasıdır və içərisində yüzlərlə, hətta minlərlə ayrı-ayrı
              yataq ola bilər. Bir hövzənin mövcudluğu neftin varlığını qarantiya etmir — hövzə
              yalnız lazımi şəraiti (source rock, isti gradient, kifayət qədər dərinlik) yaradır;
              trap və miqrasiya kimi digər amillər olmadan bu potensial reallaşmır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Hövzə növlərinin müqayisəsi
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Hövzə növü</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Yaranma mexanizmi</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Nümunə</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Neft potensialı</th>
                  </tr>
                </thead>
                <tbody>
                  {basinComparison.map((b) => (
                    <tr key={b.type} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{b.type}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{b.mexanizm}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{b.nümunə}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{b.potensial}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Subsidence sürətinin təyini
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: hövzədə toplanmış çöküntü qalınlığı = 4,500 m, çökmənin davam etdiyi
                geoloji dövr = 30 milyon il
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                Subsidence sürəti = Çöküntü qalınlığı ÷ Geoloji zaman
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Sürət = 4,500 m ÷ 30 milyon il</p>
                <p>Sürət ≈ <span style={{ color: PATH_COLOR }}>150 m / milyon il</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu rəqəm hövzənin nə qədər "aktiv" olduğunu göstərir — 150 m/milyon il
                nisbətən yüksək sürət hesab olunur və source rock-un tez bir zamanda termal yetişmə
                dərinliyinə (adətən 2,500–4,000 m) çatmasına imkan verir. Sürət çox aşağı olarsa
                (məsələn, 20–30 m/milyon il), üzvi maddə lazımi temperatura çatmadan hövzənin
                tektonik fəallığı sona çata bilər və bu, source rock-un heç vaxt "yetişməməsi"
                riskini yaradır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Cənubi Xəzər Hövzəsi, Azərbaycan", text: "Dünyanın ən dərin çökmə hövzələrindən biri — bəzi yerlərdə çöküntü qalınlığı 20 km-ə çatır və Azərbaycanın əsas neft-qaz potensialının əsasını təşkil edir." },
                { name: "Viking Graben, Şimal Dənizi", text: "Klassik rift hövzəsi nümunəsi — Yura dövründə qitə qabığının dartılması nəticəsində yaranmış və Şimal Dənizinin əsas source rock-larını (Kimmeridge Clay) özündə saxlayır." },
                { name: "Qərbi Sibir Hövzəsi, Rusiya", text: "Dünyanın ən böyük çökmə hövzələrindən biri, sahəsi 2.2 milyon km²-dən çox — foreland/intrakratonik mənşəli olub nəhəng qaz ehtiyatlarına malikdir." },
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
              <li>• Çökmə hövzəsi — qabığın uzunmüddətli aşağı əyilməsi (subsidence) nəticəsində çöküntü ilə dolan regional strukturdur</li>
              <li>• Tektonik səbəbdən asılı olaraq rift, foreland, passiv kənar və strike-slip hövzələri fərqləndirilir</li>
              <li>• Hövzə özü neftin varlığını qarantiya etmir — o, yalnız source rock-un yetişməsi üçün lazımi şəraiti yaradır</li>
              <li>• Subsidence sürəti (çöküntü qalınlığı ÷ zaman) hövzənin termal yetişmə potensialını qiymətləndirməyə kömək edir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/trap-types"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Trap Types
          </Link>
          <Link
            href="/learn/geology/migration"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Miqrasiya
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}