"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const trapComparison = [
  { type: "Antiklinal Tələ", mexanizm: "Süxur qatlarının qübbə şəklində əyilməsi", nümunə: "Ghawar, Neft Daşları", tezlik: "Ən geniş yayılmış" },
  { type: "Fault Tələ", mexanizm: "Faylın keçirməz süxuru keçirici ilə üz-üzə qoyması", nümunə: "Şimal Dənizi yataqları", tezlik: "Çox yayılmış" },
  { type: "Pinch-out Tələsi", mexanizm: "Kollektorun yanal istiqamətdə nazikləşib yox olması", nümunə: "East Texas Field", tezlik: "Orta" },
  { type: "Uyğunsuzluq Tələsi", mexanizm: "Eroziya səthinin üzərini keçirməz süxurun örtməsi", nümunə: "Müxtəlif hövzələr", tezlik: "Az yayılmış" },
];

export default function TrapTypesLesson() {
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
              1.1.6
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Əsaslar
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Trap Types <span style={{ color: "#F0F4FF" }}>(Tələ Növləri)</span>
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          {/* Creative intro: historical context hook */}
          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə bu mövzu vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              XIX əsrin sonlarında ilk neft axtarışçıları quyularını təsadüfi yerlərdə qazır və
              çox vaxt boş çıxırdılar. Vəziyyət yalnız o zaman dəyişdi ki, geoloqlar bir qanunauyğunluq
              kəşf etdilər: neft həmişə süxur qatlarının müəyyən formalarda əyildiyi və ya kəsildiyi
              yerlərdə toplanır. 1.1.2–1.1.5-də gördüyümüz source rock, reservoir rock və seal bir
              yerdə olsa belə, əgər onları geometrik olaraq bir nöqtədə "tutan" struktur yoxdursa,
              neft sadəcə yuxarıya doğru hərəkət edərək dağılıb gedər. Bu "tutan" struktura{" "}
              <strong>trap (tələ)</strong> deyilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Tələ nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Tələ — reservoir süxurun elə geometrik konfiqurasiyasıdır ki, üzərindəki seal ilə
              birlikdə yuxarıya doğru miqrasiya edən karbohidrogenlərin bir nöqtədə cəmlənməsinə
              səbəb olur. Başqa sözlə, tələ özü süxur növü deyil — o, reservoir və seal-in birgə
              yaratdığı fəza formasıdır. Bu formanın mənşəyinə görə tələlər iki əsas qrupa bölünür:
              struktur tələlər və stratiqrafik tələlər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Struktur tələlər
            </h2>
            <p className="text-[14px] leading-[1.75] mb-4">
              Struktur tələlər tektonik qüvvələrin (sıxılma, dartılma) süxur qatlarını deformasiyaya
              uğratması nəticəsində yaranır. Bu qrupun iki əsas nümayəndəsi var:
            </p>
            <div className="grid grid-cols-1 gap-3">
              <div className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>Antiklinal tələ</p>
                <p className="text-[13.5px] leading-[1.7]" style={{ color: "#9FAEC4" }}>
                  Süxur qatları sıxılma qüvvəsi altında qübbə formasında yuxarıya doğru əyilir.
                  Neft-qaz sıxlığına görə su üzərində üzdüyündən, qübbənin ən yüksək nöqtəsində
                  toplanır — dünyada ən çox rast gəlinən tələ növüdür.
                </p>
              </div>
              <div className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>Fault (fay) tələsi</p>
                <p className="text-[13.5px] leading-[1.7]" style={{ color: "#9FAEC4" }}>
                  Tektonik hərəkət nəticəsində süxur blokları bir-birinə nisbətən sürüşür. Əgər
                  fay xətti boyunca keçirici reservoir keçirməz süxurla üz-üzə düşərsə, fay özü
                  seal rolunu oynayaraq karbohidrogenləri həbs edir.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Stratiqrafik tələlər
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Stratiqrafik tələlər tektonik deformasiyadan deyil, çökmə prosesinin özündən yaranan
              dəyişikliklər nəticəsində formalaşır. Ən çox rast gəlinən iki tip <strong>pinch-out</strong> (kollektorun yanal
              istiqamətdə tədricən nazikləşib yox olması) və <strong>uyğunsuzluq tələsidir</strong>{" "}
              (köhnə eroziya səthinin üzərini sonradan çökmüş keçirməz süxurun örtməsi). Struktur
              tələlərdən fərqli olaraq, bu tələləri seysmik məlumatda aşkar etmək daha çətindir,
              çünki onların geometriyası tez-tez qeyri-müəyyəndir.
            </p>
          </section>

          {/* Creative element: orange warning callout (varied from blue in previous lesson) */}
          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#D8823B14", border: "1px solid #D8823B40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#D8823B" }}>
              Diqqət et
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Real yataqların əksəriyyəti "təmiz" struktur və ya "təmiz" stratiqrafik deyil —
              onlar hər iki mexanizmin birgə təsirindən yaranan <strong>kombinasiya tələləridir</strong>.
              Məsələn, bir antiklinalın bir qanadı fay ilə kəsilə, digər tərəfdən isə kollektor
              pinch-out ilə bağlana bilər. Buna görə real kəşfiyyatda geoloqlar tez-tez bir neçə
              tələ mexanizmini eyni anda qiymətləndirməli olurlar.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Struktur və stratiqrafik tələlərin müqayisəsi
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tələ növü</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Yaranma mexanizmi</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Nümunə</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Yayılma tezliyi</th>
                  </tr>
                </thead>
                <tbody>
                  {trapComparison.map((t) => (
                    <tr key={t.type} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{t.type}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{t.mexanizm}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{t.nümunə}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{t.tezlik}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Closure sahəsi əsasında həcm qiymətləndirməsi
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: closure sahəsi A = 2,000 acre, karbohidrogen sütununun hündürlüyü h = 150 ft, net-to-gross nisbəti N/G = 0.6, məsaməlilik φ = 0.18
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                Bulk həcm = A × h × 7,758 (bbl/acre-ft əmsalı)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Bulk həcm = 2,000 × 150 × 7,758 ≈ 2.33 milyard bbl</p>
                <p>Məsamə həcmi = 2.33 mlrd × N/G (0.6) × φ (0.18) ≈ <span style={{ color: PATH_COLOR }}>251 milyon bbl</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: tələnin geometrik ölçüləri (closure sahəsi və sütun hündürlüyü) məlum
                olduqda, kollektorun keyfiyyət parametrləri (N/G və φ) ilə birləşdirilərək tələdə
                yerləşə biləcək təxmini karbohidrogenlə dolu məsamə həcmi hesablana bilir. Bu
                rəqəm hələ hasil olunacaq neft miqdarı deyil — sadəcə tələnin "tutum potensialı"dır;
                real ehtiyat 1.4.1-də öyrənəcəyimiz OOIP hesablamasında dəqiqləşdiriləcək.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Ghawar, Səudiyyə Ərəbistanı", text: "Uzunluğu 280 km-dən çox olan nəhəng antiklinal struktur — dünyanın ən böyük struktur tələsi hesab olunur." },
                { name: "East Texas Field, ABŞ", text: "Woodbine qumdaşının yanal istiqamətdə nazikləşərək yox olduğu klassik stratiqrafik pinch-out tələsi." },
                { name: "Neft Daşları, Azərbaycan", text: "Xəzər dənizindəki bu tarixi yataq Məhsuldar Qat çöküntülərinin əmələ gətirdiyi antiklinal struktura əsaslanır və Azərbaycan neft sənayesinin təməl daşlarından biridir." },
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
              <li>• Tələ — reservoir və seal-in birgə yaratdığı, karbohidrogenləri cəmləşdirən geometrik formadır</li>
              <li>• Struktur tələlər tektonik deformasiyadan (antiklinal, fault), stratiqrafik tələlər isə çökmə prosesindən (pinch-out, uyğunsuzluq) yaranır</li>
              <li>• Real yataqların çoxu hər iki mexanizmin birləşməsindən əmələ gələn kombinasiya tələləridir</li>
              <li>• Closure sahəsi və sütun hündürlüyü əsasında tələnin təxmini məsamə həcmi hesablana bilir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/seal-rock"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Seal / Cap Rock
          </Link>
          <Link
            href="/learn/geology/sedimentary-basins"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Çökmə Hövzələri
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}