"use client";
import Link from "next/link";

const PATH_COLOR = "#E8B33D";

const iprMethods = [
  { name: "Düz Xətt (Straight-Line/Darcy) IPR", desc: "Debit reservoir təzyiqi ilə quyu dibi təzyiqi arasındakı fərqə xətti mütənasibdir", best: "Tək fazalı (undersaturated) neft axını, təzyiq doyma nöqtəsindən yuxarı olduqda" },
  { name: "Vogel IPR", desc: "İki fazalı (qaz-neft) axın üçün empirik, əyri formalı əlaqə", best: "Doymuş reservoirlər, quyu dibi təzyiqi doyma təzyiqindən aşağı olduqda" },
  { name: "Fetkovich IPR", desc: "Test məlumatlarına əsaslanan, üstlü qanun formalı ümumiləşdirilmiş model", best: "Həm tək, həm ikifazalı axın üçün çevik uyğunlaşdırma tələb olunduqda" },
];

export default function InflowPerformanceRelationshipIprLesson() {
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
              5.3.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Quyu Performansı
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Inflow Performance Relationship (IPR)
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Sual: quyu "nə qədər verə bilər"?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              İndiyə qədər Süni Qaldırma bölməsində flüidi səthə "necə çıxardığımızı"
              öyrəndik — amma bundan əvvəl daha fundamental bir sual var: reservoir,
              müəyyən quyu dibi təzyiqi şəraitində, ümumiyyətlə nə qədər flüid verə bilər?
              Bu sualın cavabı sabit bir rəqəm deyil — debit, quyu dibi təzyiqindən
              (bottomhole flowing pressure, P_wf) asılı olaraq dəyişir. Bu asılılığı
              riyazi və qrafik şəkildə ifadə edən əlaqəyə <strong>Inflow Performance
              Relationship (IPR)</strong> deyilir — və bu, quyu performansı təhlilinin
              təməl daşıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. IPR nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              IPR — reservoirdən quyu dibinə doğru axan flüid debiti (Q) ilə quyu dibi
              təzyiqi (P_wf) arasındakı əlaqəni göstərən əyridir. Əyrinin bir ucunda
              statik reservoir təzyiqi (P_wf = P_r) durur — bu zaman debit sıfırdır, çünki
              axın üçün heç bir təzyiq fərqi yoxdur. Digər ucda isə <strong>Absolute Open
              Flow (AOF)</strong> potensialı durur — P_wf = 0 olduqda əldə edilə biləcək
              (nəzəri) maksimum debit. Real istismar şəraiti bu iki nöqtə arasında haradasa
              yerləşir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. IPR modelləri
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Model</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təsvir</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Ən uyğun olduğu hal</th>
                  </tr>
                </thead>
                <tbody>
                  {iprMethods.map((c) => (
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
              3. Productivity Index (PI) — sadə xətti yanaşma
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Tək fazalı (undersaturated) neft axını üçün, IPR ən sadə formada
              Productivity Index (J) ilə ifadə olunur — hər bir bar/psi təzyiq fərqinə
              düşən debit sabit qəbul edilir. Bu, qrafikdə düz xətt kimi görünür:
              Q = J × (P_r − P_wf). PI nə qədər yüksəkdirsə, quyu bir o qədər az təzyiq
              fərqi ilə çox debit verə bilir — bu, yüksək keçiricilikli (permeability)
              və ya minimal skin-li kollektorların göstəricisidir. Amma bu sadə model
              yalnız təzyiq doyma nöqtəsindən (bubble point) yuxarı olduqda dəqiqdir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. IPR-in praktik istifadəsi
            </h2>
            <div className="space-y-2.5">
              {[
                "Quyu test məlumatlarından (well test) IPR əyrisinin qurulması",
                "Fərqli artificial lift üsullarının nail ola biləcəyi P_wf səviyyələrinin qiymətləndirilməsi",
                "Nodal Analysis üçün əsas giriş məlumatı kimi istifadə (növbəti dərsdə görəcəyik)",
                "Reservoir tükəndikcə IPR əyrisinin necə 'aşağı sürüşdüyünün' izlənməsi",
                "Stimulyasiya (acidizing, hidravlik yarılma) təsirinin PI dəyişikliyi ilə qiymətləndirilməsi",
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
              <strong>Düz Xətt (PI) Modeli vs Vogel Modeli:</strong> Düz xətt modeli
              hesablaması sadədir və tək fazalı axında yüksək dəqiqlik verir, amma
              quyu dibi təzyiqi doyma nöqtəsindən aşağı düşdükdə (yəni reservoirdə
              sərbəst qaz yaranmağa başladıqda) real debiti həddən artıq qiymətləndirir —
              çünki sərbəst qaz effektiv keçiriciliyi azaldır və axını qeyri-xətti edir.
              Vogel modeli bu effekti nəzərə alan empirik əyri təqdim edir və doymuş
              reservoirlərdə daha dəqiq nəticə verir, amma daha mürəkkəbdir və orijinal
              olaraq məhdud verilənlər dəsti üzərində qurulduğu üçün hər kollektora
              birbaşa tətbiq edilə bilməz. Mühəndis, reservoirin doyma vəziyyətinə görə
              düzgün modeli seçməlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Productivity Index və Debit
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Tək fazalı axın üçün sadə xətti IPR modelini tətbiq edək:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: reservoir təzyiqi P_r = 265 bar (Artificial Lift dərsindəki
                dayanma nöqtəsi), Productivity Index J = 2.5 bbl/gün/bar, planlaşdırılan
                quyu dibi təzyiqi P_wf = 200 bar
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                Q = J × (P_r − P_wf)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Q = 2.5 × (265 − 200) = 2.5 × 65 = <span style={{ color: PATH_COLOR }}>≈ 162.5 bbl/gün</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: quyu dibi təzyiqini 200 bar-a endirməklə (məsələn, uyğun artificial
                lift üsulu ilə) gündə təxminən 162.5 barel debit əldə etmək mümkündür.
                Əgər P_wf daha da aşağı endirilsə, debit xətti olaraq artar — nə qədər ki,
                təzyiq doyma nöqtəsindən yuxarı qalır. Bu, artificial lift üsulunun nə
                qədər "aqressiv" işləməli olduğunu müəyyən edən əsas hesablamadır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Mütəmadi well test proqramları IPR əyrilərini yeniləyir — bu, artificial lift optimallaşdırılması qərarlarının əsasını təşkil edir." },
                { name: "Ghawar sahəsi, Səudiyyə Ərəbistanı", text: "Nəhəng kollektorun müxtəlif zonalarında fərqli IPR profilləri müşahidə olunur — bu, zona-spesifik istismar strategiyası tələb edir." },
                { name: "Şimal dənizi layihələri (Norveç/Böyük Britaniya)", text: "Vogel modeli, doyma təzyiqindən aşağı işləyən quyularda debit proqnozlaşdırılması üçün geniş istifadə olunur." },
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
              <li>• IPR debit ilə quyu dibi təzyiqi (P_wf) arasındakı əlaqəni göstərir</li>
              <li>• Sadə xətti model (PI) tək fazalı axında etibarlıdır, Vogel isə iki fazalı axında</li>
              <li>• AOF — P_wf = 0 olduqda əldə edilən nəzəri maksimum debitdir</li>
              <li>• IPR, artificial lift üsulunun seçimi və Nodal Analysis üçün əsas girişdir</li>
              <li>• Reservoir tükəndikcə IPR əyrisi tədricən aşağı sürüşür</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/production/gas-lift"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Gas Lift
          </Link>
          <Link
            href="/learn/production/nodal-analysis"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Nodal Analysis
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}