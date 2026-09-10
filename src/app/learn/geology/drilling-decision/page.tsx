"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const decisionCriteria = [
  { meyar: "Chance of Success (CoS)", esas: "Minimum 10-15% həddi keçməlidir", qeyd: "Aşağıdırsa, əlavə seysmik/quyu məlumatı toplanmalı" },
  { meyar: "Ehtiyat həcmi (OOIP/OGIP)", esas: "Kəşf edilə biləcək minimum kommersiya həcmi", qeyd: "İnfrastruktura yaxınlıq bu həddi aşağı sala bilər" },
  { meyar: "Maliyyə göstəriciləri (NPV, IRR)", esas: "Layihə müsbət xalis dəyər yaratmalıdır", qeyd: "Neft qiyməti ssenarilərinə həssasdır" },
  { meyar: "Əməliyyat riski", esas: "Dərinlik, təzyiq, təhlükəsizlik şərtləri", qeyd: "Yüksək təzyiqli quyular əlavə xərc tələb edir" },
  { meyar: "Strateji uyğunluq", esas: "Şirkətin portfel və uzunmüddətli planına uyğunluğu", qeyd: "Bəzən aşağı CoS-lu prospekt strateji səbəblə seçilir" },
];

export default function DrillingDecisionLesson() {
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
              1.4.3
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Qiymətləndirmə və Qərar
            </span>
            <span
              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase tracking-wide"
              style={{ background: "rgba(255,255,255,0.05)", color: "#6B82A0" }}
            >
              Son Dərs
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Qazımaya Keçid Qərarı <span style={{ color: "#F0F4FF" }}>(Drill-or-Drop Decision)</span>
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          {/* Creative intro: historical/context hook */}
          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə bu mövzu vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Bir kəşfiyyat quyusunun qazılması adətən onlarla, bəzən yüzlərlə milyon dollara başa
              gəlir — dərin dəniz şəraitində bu rəqəm daha da yüksəlir. 1.4.2-də hesabladığımız
              16.4%-lik Chance of Success rəqəmi təkbaşına heç nə demir: o, yalnız qərar prosesinin
              girişidir, sonu deyil. Tarixən neft sənayesinin ən böyük maliyyə itkiləri səhv
              qiymətləndirilmiş prospektlərə yox, düzgün qiymətləndirilmiş, lakin kifayət qədər
              ciddi təhlil edilmədən qazılmış quyulara aiddir. Bu dərsdə geoloji, texniki və
              maliyyə göstəricilərinin necə birləşərək yekun &quot;qazı&quot; və ya &quot;burax&quot; qərarına
              gətirdiyini öyrənəcəyik — bu, Geologiya path-ının son dərsidir və bizi Drilling
              path-ına aparan körpüdür.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Qərar nöqtəsi nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Qazımaya keçid qərarı — kəşfiyyat komandasının bütün toplanmış geoloji, geofiziki
              və maliyyə məlumatlarını birləşdirərək prospektin faktiki qazılıb-qazılmayacağına
              dair verdiyi rəsmi qərardır. Bu qərar tək bir mütəxəssisin əlində deyil, adətən
              geoloqlar, geofiziklər, mühəndislər və maliyyə analitiklərindən ibarət komitə
              tərəfindən verilir. Qərar müsbətdirsə, layihə &quot;Drilling&quot; mərhələsinə keçir; mənfidirsə,
              prospekt ya &quot;raf&quot;a qoyulur (əlavə məlumat gözləyir), ya da tamamilə tərk edilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Qərara aparan yol — addım-addım
            </h2>
            <div className="space-y-3">
              {[
                { n: "01", t: "Geoloji sintez", d: "Source, reservoir, seal, trap və timing elementlərinin son qiymətləndirilməsi tamamlanır və CoS rəqəmi yenidən yoxlanılır." },
                { n: "02", t: "Həcm ssenariləri", d: "OOIP/OGIP üçün minimum, orta və maksimum ehtimal ssenariləri hazırlanır (P90, P50, P10)." },
                { n: "03", t: "İqtisadi modelləşdirmə", d: "Hər ssenari üçün NPV, IRR və break-even neft qiyməti hesablanır, müxtəlif bazar şəraitləri sınaqdan keçirilir." },
                { n: "04", t: "Risk-mükafat balansı", d: "Gözlənilən pul dəyəri (Expected Monetary Value) hesablanır — uğur ehtimalı ilə potensial mənfəət və uğursuzluq xərci qarşılaşdırılır." },
                { n: "05", t: "Komitə qərarı", d: "Bütün göstəricilər təqdim olunur və rəsmi 'qazı' / 'gözlə' / 'burax' qərarı verilir." },
              ].map((s) => (
                <div key={s.n} className="flex gap-4 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-[13px] font-mono font-semibold shrink-0" style={{ color: PATH_COLOR }}>{s.n}</span>
                  <div>
                    <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#F0F4FF" }}>{s.t}</p>
                    <p className="text-[13.5px] leading-[1.7]" style={{ color: "#9FAEC4" }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Expected Monetary Value (EMV) — mərkəzi anlayış
            </h2>
            <p className="text-[14px] leading-[1.75]">
              EMV — qazıma qərarının maliyyə məntiqinin əsasını təşkil edir. O, uğur halında əldə
              ediləcək mənfəəti uğur ehtimalı ilə, uğursuzluq halında itiriləcək xərci isə
              uğursuzluq ehtimalı ilə çəkərək iki nəticəni bir rəqəmdə birləşdirir. Əgər EMV
              müsbətdirsə, statistik olaraq layihə uzunmüddətli perspektivdə sərfəlidir — hətta
              tək bir quyu uğursuz olsa belə. Şirkətlər adətən onlarla prospekti eyni zamanda
              qiymətləndirdiyi üçün EMV məntiqi fərdi hallardan çox, portfel səviyyəsində düzgün
              nəticə verir.
            </p>
          </section>

          {/* Creative element: warning callout */}
          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#D8823B14", border: "1px solid #D8823B40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#D8823B" }}>
              Ümumi səhv
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Yeni komandaların ən çox düşdüyü tələ — yüksək CoS rəqəminə güvənərək iqtisadi
              göstəriciləri arxa plana atmaqdır. Yüksək uğur ehtimalı olan, lakin kiçik həcmli
              tapılma ekonomik cəhətdən qazımaya dəyməyə bilər, çünki infrastruktur və əməliyyat
              xərcləri gözlənilən gəliri üstələyir. Əksinə, orta CoS-a malik, lakin böyük həcmli
              prospekt daha yüksək EMV verə bilər. Qərar heç vaxt tək bir göstəriciyə əsaslanmamalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Qərar meyarlarının xülasəsi
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Meyar</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Əsas şərt</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qeyd</th>
                  </tr>
                </thead>
                <tbody>
                  {decisionCriteria.map((r) => (
                    <tr key={r.meyar} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{r.meyar}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{r.esas}</td>
                      <td className="px-3 py-2" style={{ color: "#9FAEC4" }}>{r.qeyd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — EMV nümunəsi
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: CoS = 16.4%, uğur halında gözlənilən mənfəət = $85M, qazıma xərci = $12M
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                EMV = (CoS × Mənfəət) − ((1 − CoS) × Xərc)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>EMV = (0.164 × 85M) − (0.836 × 12M)</p>
                <p>EMV = 13.94M − 10.03M</p>
                <p>EMV ≈ <span style={{ color: PATH_COLOR }}>$3.91M</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: müsbət EMV göstərir ki, statistik baxımdan bu prospekt qazımaya dəyər —
                hətta 16.4% kimi nisbətən aşağı uğur ehtimalına baxmayaraq, potensial mənfəətin
                böyüklüyü gözlənilən itkini üstələyir. Lakin real qərarda bu rəqəm tək başına
                kifayət etmir: şirkətin risk tolerantlığı, kapital məhdudiyyətləri və portfeldəki
                digər layihələrlə müqayisə də nəzərə alınmalıdır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Kashagan yatağı, Qazaxıstan (Xəzər dənizi)", text: "Nəhəng ehtiyat həcminə baxmayaraq, yüksək təzyiq və hidrogen sulfid tərkibi əməliyyat riskini xeyli artırdı, bu da qazıma qərarında texniki amillərin maliyyə göstəriciləri qədər həlledici ola biləcəyini göstərdi." },
                { name: "Tupi (Lula) yatağı, Braziliya presalt zonası", text: "Presalt təbəqəsinin altındakı böyük həcmli kəşflər ilkin yüksək qazıma xərclərinə baxmayaraq müsbət EMV nümayiş etdirdi və Braziliyanın dərin dəniz strategiyasını dəyişdi." },
                { name: "Azəri-Çıraq-Günəşli, Azərbaycan", text: "Uzunmüddətli hasilat tarixi göstərdi ki, böyük infrastruktur artıq mövcud olduqda, qonşu strukturların qazıma həddi ilkin müstəqil kəşfiyyatdan xeyli aşağı ola bilər." },
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
              <li>• Qazıma qərarı geoloji CoS, ehtiyat həcmi, iqtisadi göstəricilər və əməliyyat riskinin birgə qiymətləndirilməsinə əsaslanır</li>
              <li>• Expected Monetary Value (EMV) uğur və uğursuzluq ssenarilərini bir rəqəmdə birləşdirərək qərarın maliyyə əsasını yaradır</li>
              <li>• Yüksək CoS tək başına kifayət etmir — kiçik həcmli, yüksək ehtimallı tapılma iqtisadi cəhətdən sərfəli olmaya bilər</li>
              <li>• Bu qərar Geologiya path-ının yekunudur və müsbət nəticə layihəni Drilling path-ına keçirir</li>
            </ul>
          </section>

          {/* Congratulations block - path completion */}
          <section
            className="rounded-2xl px-6 py-6 text-center"
            style={{ background: `linear-gradient(135deg, ${PATH_COLOR}14, rgba(255,255,255,0.02))`, border: `1px solid ${PATH_COLOR}33` }}
          >
            <p className="text-[11px] font-mono uppercase tracking-wide mb-2" style={{ color: PATH_COLOR }}>
              Təbriklər
            </p>
            <p className="text-[14px] leading-[1.75]" style={{ color: "#D6E0F0" }}>
              Bununla Geologiya (Petroleum Geology) path-ının bütün dərslərini tamamladınız —
              neftin mənşəyindən tutmuş, çökmə hövzələri, source/reservoir/seal qayaları, tələ
              növləri, seysmik kəşfiyyat, həcm qiymətləndirməsi, risk analizi və nəhayət qazımaya
              keçid qərarına qədər. Bu bilik zənciri sizə bir prospekti sıfırdan qiymətləndirib
              qərar vermə bacarığı verir — indi növbə Qazma (Drilling) path-ındadır.
            </p>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/risk-analysis"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Risk Analizi
          </Link>
          <Link
            href="/learn/geology"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Path Tamamlandı — Geologiyaya Geri Dön
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}