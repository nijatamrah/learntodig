"use client";
import Link from "next/link";

const PATH_COLOR = "#E8B33D";

const nodePoints = [
  { name: "Reservoir Sərhədi", desc: "Ən çox istifadə olunan node — reservoirlə quyu dibi arasındakı sərhəd", best: "IPR (inflow) ilə TPR (outflow) əyrilərinin kəsişdiyi əsas analiz nöqtəsi" },
  { name: "Wellhead (Quyu Başlığı)", desc: "Səth avadanlığı ilə tubing arasındakı sərhəd", best: "Səth ötürücü xətt (flowline) məhdudiyyətlərini qiymətləndirmək üçün" },
  { name: "Separator Girişi", desc: "Quyudan gələn axının sistemə (istehsalat qurğusuna) daxil olduğu nöqtə", best: "Bütün quyu şəbəkəsinin birgə performansını qiymətləndirmək üçün" },
];

export default function NodalAnalysisLesson() {
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
              5.3.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Quyu Performansı
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Nodal Analysis
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              İki tərəf, bir sistem
            </h2>
            <p className="text-[14px] leading-[1.75]">
              IPR dərsində reservoirin nə qədər flüid "verə bildiyini" öyrəndik — bu,
              sistemin yalnız yarısıdır. Digər yarısı isə: quyu, tubing və səth avadanlığı
              bu flüidi qəbul edib səthə çatdırmaq üçün nə qədər "müqavimət" göstərir?
              Bu iki tərəfi — reservoirin təchizatı (inflow) və quyunun daşıma qabiliyyəti
              (outflow) — bir araya gətirib ortaq işləmə nöqtəsini tapan metoda{" "}
              <strong>Nodal Analysis</strong> deyilir. Bu, production engineering-in ən
              güclü və ən çox istifadə olunan diaqnostik alətlərindən biridir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Node (düyün) konsepsiyası
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Nodal Analysis sistemi konseptual olaraq iki hissəyə bölür: node-dan əvvəlki
              hissə (reservoirdən node-a qədər — inflow) və node-dan sonrakı hissə (node-dan
              səthə/separatora qədər — outflow). Seçilən node nöqtəsində hər iki tərəf üçün
              ayrıca təzyiq-debit əyrisi qurulur: inflow üçün IPR, outflow üçün isə{" "}
              <strong>Tubing Performance Relationship (TPR)</strong> — tubing daxilindəki
              axının yaratdığı təzyiq itkisini əks etdirən əyri. Bu iki əyrinin kəsişdiyi
              nöqtə, sistemin real işləmə şəraitini (debit və təzyiq) göstərir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Ən çox istifadə olunan node nöqtələri
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Node</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təsvir</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>İstifadə məqsədi</th>
                  </tr>
                </thead>
                <tbody>
                  {nodePoints.map((c) => (
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
              3. Sistem necə "tarazlığa" gəlir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              IPR əyrisi debit artdıqca aşağı meyilli olur (çünki daha yüksək debit daha
              aşağı P_wf tələb edir), TPR əyrisi isə debit artdıqca yuxarı meyilli olur
              (çünki daha yüksək axın sürəti daha çox sürtünmə itkisi yaradır). Bu iki
              əyrinin kəsişmə nöqtəsi — sistemin tarazlıq nöqtəsidir: real quyu bu debit
              və bu təzyiqlə işləyəcək. Əgər mühəndis hər hansı komponenti dəyişsə (tubing
              diametri, artificial lift üsulu, perforasiya sıxlığı), müvafiq əyri sürüşür
              və yeni kəsişmə nöqtəsi — yeni gözlənilən debit — yaranır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Nodal Analysis-in praktik tətbiqləri
            </h2>
            <div className="space-y-2.5">
              {[
                "Tubing diametrinin optimallaşdırılması — çox kiçik diametr sürtünmə itkisini artırır, çox böyük isə axın sabitliyini pisləşdirə bilər",
                "Fərqli artificial lift üsullarının nəticəsinin müqayisəli qiymətləndirilməsi",
                "Stimulyasiya (hidravlik yarılma, asidləmə) təsirinin proqnozlaşdırılması — IPR sürüşməsi ilə",
                "Boru xətti (flowline) məhdudiyyətlərinin debitə təsirinin qiymətləndirilməsi",
                "Quyunun gələcək performansının vaxt üzrə proqnozlaşdırılması (reservoir tükəndikcə)",
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
              <strong>Böyük Tubing Diametri vs Kiçik Tubing Diametri:</strong> Böyük diametrli
              tubing sürtünmə itkisini azaldır (TPR əyrisi aşağı sürüşür) və yüksək debitli
              rejimlərdə daha yaxşı performans verir, amma aşağı debitli quyularda flüid
              sürəti o qədər azala bilər ki, mayenin özü qaza qarışmış halda "yıxıla" bilər
              (liquid loading) və hətta quyunun tam dayanmasına səbəb ola bilər. Kiçik
              diametrli tubing isə aşağı debitdə axın sürətini saxlayaraq liquid loading-in
              qarşısını alır, amma yüksək debit potensialını süni şəkildə məhdudlaşdırır və
              sürtünmə itkisini artırır. Seçim, quyunun ömrü boyu gözlənilən debit
              diapazonundan (ilkin yüksək debitdən son mərhələdəki aşağı debitə qədər)
              asılıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Sadələşdirilmiş Kəsişmə Nöqtəsi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Sadə xətti IPR-i sadələşdirilmiş xətti TPR ilə kəsişdirərək tarazlıq debitini
              tapaq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: IPR — P_wf = 265 − 0.4×Q (əvvəlki dərsdəki J=2.5 bbl/gün/bar-a
                uyğun tərs formada), TPR — P_wf = 50 + 0.2×Q (sadələşdirilmiş fərz)
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                265 − 0.4Q = 50 + 0.2Q → 215 = 0.6Q
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Q = 215 / 0.6 ≈ <span style={{ color: PATH_COLOR }}>358 bbl/gün</span></p>
                <p>P_wf = 50 + 0.2×358 ≈ <span style={{ color: PATH_COLOR }}>122 bar</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu iki əyrinin kəsişmə nöqtəsi — quyunun real işləyəcəyi debit
                (≈358 bbl/gün) və uyğun quyu dibi təzyiqidir (≈122 bar). Diqqət edin ki, bu
                nəticə əvvəlki dərsdə sərbəst seçdiyimiz P_wf=200 bar ssenarisindən fərqlidir —
                çünki indi outflow (TPR) məhdudiyyəti də hesaba qatılıb. Real layihələrdə bu
                proses proqram təminatı (məsələn Prosper, PIPESIM) vasitəsilə qeyri-xətti
                əyrilər üzərində aparılır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Nodal Analysis proqram təminatı (Prosper) hər quyu üçün tubing ölçüsü və lift üsulu seçimini optimallaşdırmaq üçün mütəmadi istifadə olunur." },
                { name: "Troll sahəsi, Norveç", text: "Horizontal quyularda tubing diametri seçimi nodal analiz vasitəsilə liquid loading riskini minimuma endirmək üçün diqqətlə planlaşdırılır." },
                { name: "Cusiana sahəsi, Kolumbiya", text: "Yüksək debitli, yüksək təzyiqli quyularda tubing ölçüsünün nodal analiz ilə optimallaşdırılması istehsal həcmini xeyli artırıb." },
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
              <li>• Nodal Analysis inflow (IPR) və outflow (TPR) əyrilərinin kəsişməsi ilə real işləmə nöqtəsini tapır</li>
              <li>• Node nöqtəsi adətən reservoir sərhədində seçilir, amma wellhead və separator də istifadə olunur</li>
              <li>• Hər hansı komponentin dəyişməsi müvafiq əyrini sürüşdürür və yeni tarazlıq nöqtəsi yaradır</li>
              <li>• Tubing diametri seçimi liquid loading riski ilə sürtünmə itkisi arasında tarazlıq tələb edir</li>
              <li>• Proqram təminatları (Prosper, PIPESIM) bu analizi qeyri-xətti əyrilər üzərində avtomatlaşdırır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/production/inflow-performance-relationship-ipr"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← IPR
          </Link>
          <Link
            href="/learn/production/flow-assurance"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Flow Assurance
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}