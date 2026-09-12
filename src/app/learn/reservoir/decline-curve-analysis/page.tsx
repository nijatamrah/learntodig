"use client";
import Link from "next/link";

const PATH_COLOR = "#2DBE8C";

const declineTypes = [
  { name: "Exponential (b = 0)", equation: "q(t) = qi × e^(−D×t)", note: "Azalma sürəti sabit qalır — ən sürətli tükənən, konservativ EUR proqnozu verən model" },
  { name: "Harmonic (b = 1)", equation: "q(t) = qi / (1 + D×t)", note: "Azalma sürəti zamanla getdikcə yavaşıyır — ən yavaş tükənən, ən nikbin EUR verən model" },
  { name: "Hyperbolic (0 < b < 1)", equation: "q(t) = qi / (1 + b×D×t)^(1/b)", note: "İki halın arasında, real sahə məlumatlarına ən çox uyğun gələn ümumi model" },
];

const applicationSteps = [
  "Tarixi debit/zaman məlumatları toplanır və qeyri-adi hadisələr (təmir, dayanma) təmizlənir",
  "Məlumatlar loq-normal qrafikə köçürülür və hansı əyri formasına uyğun gəldiyi vizual qiymətləndirilir",
  "Ən uyğun Arps modeli (exponential, harmonic və ya hyperbolic) məlumata tənzimlənir (curve fitting)",
  "Tənzimlənmiş model gələcək tarixlərə ekstrapolyasiya edilərək iqtisadi hədd sürətinə qədər proqnozlaşdırılır",
];

export default function DeclineCurveAnalysisLesson() {
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
          href="/learn/reservoir"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6"
          style={{ color: "#3D5570" }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Rezervuar
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
              style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
            >
              4.4.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              İstismar Dinamikası
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Decline Curve Analizi
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <p className="text-[14px] leading-[1.8] italic" style={{ color: "#9FAEC4" }}>
              1945-ci ildə J.J. Arps adlı mühəndis bir sual üzərində düşünürdü: material balance
              üçün lazım olan bütün mürəkkəb reservoir parametrlərini bilmədən, sadəcə quyunun
              keçmiş debit tarixçəsinə baxaraq gələcəyini proqnozlaşdırmaq mümkündürmü? Onun
              tapdığı cavab — bu gün "Arps decline curve" adlanan üç sadə riyazi model — o qədər
              praktiki çıxdı ki, 80 ildən sonra da hələ sənayenin ən çox istifadə etdiyi
              proqnozlaşdırma vasitəsi olaraq qalır. Bu dərsdə, niyə bir quyunun debiti zamanla
              azalır və bu azalmadan necə gələcək hasilatı proqnozlaşdırmaq mümkün olduğunu
              öyrənəcəyik.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Decline curve analizi nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Decline curve analizi (DCA), quyunun keçmiş debit-zaman məlumatlarına empirik
              riyazi əyri tənzimləyərək, gələcək hasilatı və ümumi çıxarıla bilən ehtiyatı
              (EUR) proqnozlaşdıran üsuldur. Material balance və ya reservoir simulyasiyasından
              fərqli olaraq, DCA reservoirin fiziki xüsusiyyətlərini (keçiricilik, sahə,
              məsaməlilik) bilməyi tələb etmir — yalnız kifayət qədər uzun və keyfiyyətli
              istehsal tarixçəsinə ehtiyac var. Bu sadəlik onu, xüsusilə çoxsaylı quyuları olan
              sahələrdə (şist neft/qaz kimi) sürətli və ucuz proqnozlaşdırma vasitəsinə çevirir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Niyə debit zamanla azalır?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Bir quyu istismara başladıqdan sonra debitin azalmasının fiziki səbəbi, əvvəlki
              dərslərdə öyrəndiyimiz amillərin birləşməsindədir — reservoir təzyiqi tükəndikcə
              (4.1.2), Darcy tənliyindəki (4.3.1) hərəkətverici qüvvə olan ΔP azalır, su
              kəsilməsi artdıqca isə relative permeability (4.3.3) neftin effektiv keçiriciliyini
              aşağı salır. Bu üç amilin cəmi, demək olar ki, bütün quyularda ortaq bir davranış
              nümunəsi — vaxtla azalan debit əyrisi — yaradır. Arps-ın kəşfi məhz bu ortaq
              davranışın, altında yatan mürəkkəb fizikanı bilmədən belə, sadə riyazi funksiyalarla
              kifayət qədər dəqiq təsvir oluna biləcəyi idi.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Üç əsas Arps modeli
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Arps-ın təklif etdiyi üç model, "b" adlanan hiperbolik azalma əmsalının dəyərinə
              görə fərqlənir:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Model</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tənlik</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qeyd</th>
                  </tr>
                </thead>
                <tbody>
                  {declineTypes.map((d) => (
                    <tr key={d.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{d.name}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{d.equation}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{d.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Hansı model hansı halda tətbiq olunur?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Exponential model, adətən sabit təzyiq fərqi ilə işləyən, güclü su drive-lı və ya
              boundary-dominated (pseudo-steady-state) axın rejiminə çatmış konvensional
              reservoirlar üçün uyğun gəlir — real sahə təcrübəsində ən çox rast gəlinən və ən
              "təhlükəsiz" (konservativ) proqnoz verən modeldir. Hiperbolik model isə, xüsusilə
              solution gas drive mexanizmli reservoirlarda və şist (unconventional) quyularında
              geniş yayılıb, çünki bu tip quyularda azalma sürəti vaxtla təbii şəkildə yavaşıyır.
              Harmonic model nadir hallarda tətbiq olunur və diqqətli istifadə tələb edir, çünki
              riyazi olaraq sonsuz vaxt üfüqündə sonsuz kumulyativ hasilat verə bilər — bu da
              fiziki cəhətdən mümkün deyil.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Praktiki tətbiq addımları
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Real sahə şəraitində decline curve analizi adətən aşağıdakı ardıcıllıqla aparılır:
            </p>
            <div className="space-y-2.5">
              {applicationSteps.map((step, i) => (
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
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. EUR (Estimated Ultimate Recovery) nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              EUR, quyunun bütün iqtisadi ömrü boyunca çıxaracağı gözlənilən ümumi neft və ya
              qaz miqdarıdır — decline əyrisinin, quyunun iqtisadi hədd sürətinə (economic
              limit rate) çatana qədər inteqrasiyası ilə hesablanır. Bu, 4.2.1-ci dərsdə
              öyrəndiyimiz OOIP-dən fərqli bir anlayışdır: OOIP yerdə olan ümumi miqdarı,
              EUR isə real, iqtisadi cəhətdən əsaslandırılmış çıxarıla bilən hissəni göstərir.
              EUR-un OOIP-ə nisbəti, əslində elə recovery factor-un özüdür — bu əlaqə növbəti
              dərsdə (4.4.2) daha ətraflı araşdırılacaq.
            </p>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#A78BFA14", border: "1px solid #A78BFA40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#A78BFA" }}>
              Fərziyyə və Məhdudiyyətlər
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Decline curve analizi, quyunun bütün istismar tarixi boyunca eyni işlətmə
              şəraitinin (sabit boru ölçüsü, süni qaldırma metodu, choke ölçüsü) davam
              edəcəyini fərz edir. Real sahədə isə təmir işləri, süni qaldırma metodunun
              dəyişdirilməsi (məs. gas-lift-dən ESP-yə keçid) və ya yeni qonşu quyuların
              qazılması debit trendini kəskin şəkildə poza bilər — bu hallarda köhnə əyri
              artıq etibarlı deyil və yeni məlumatlarla yenidən tənzimlənməlidir. Əlavə olaraq,
              DCA tamamilə empirikdir və reservoirin fiziki mexanizmini izah etmir — ona görə
              erkən mərhələdə (qısa istehsal tarixçəsi ilə) aparılan proqnozlar böyük
              qeyri-müəyyənlik daşıyır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Hesablama — Exponential decline ilə EUR proqnozu
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              4.3.2-ci dərsdəki quyu debitini ilkin nöqtə kimi götürərək, exponential model ilə
              5 illik kumulyativ hasilatı hesablayaq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: qi = 1,372 bbl/gün (4.3.2-dən), D = 0.30/il (illik azalma sürəti), t = 5 il
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                Np = (qi / D) × [1 − e^(−D×t)]
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>qi (illik) = 1,372 × 365 ≈ 500,780 bbl/il</p>
                <p>Np = (500,780 / 0.30) × [1 − e^(−1.5)]</p>
                <p>Np = 1,669,267 × 0.777</p>
                <p>Np ≈ <span style={{ color: PATH_COLOR }}>1,296,600 bbl (5 il ərzində)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu quyu, 30% illik azalma sürəti ilə işlədikdə, 5 il ərzində təxminən
                1.3 milyon barrel neft istehsal edəcək. Diqqət et ki, 5-ci ilin sonunda debit
                artıq qi × e^(−1.5) ≈ 306 bbl/gün-ə (ilkin dəyərin ~22%-i) düşəcək — bu da
                niyə quyuların ömrünün sonuna doğru iqtisadi baxımdan artıq gəlirli olmadığını
                göstərir. Əgər model hiperbolik (b=0.5) olsaydı, eyni ilkin şərtlərdə kumulyativ
                hasilat bundan xeyli yüksək çıxardı, çünki azalma sürəti zamanla yavaşlayardı.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Bakken formasiyası, Şimali Dakota, ABŞ", text: "Şist neft quyularının çox sürətli ilkin azalması, hiperbolik decline modelinin sənayedə geniş yayılmasına səbəb olan əsas nümunələrdən biridir." },
                { name: "Permian Basin, ABŞ", text: "Minlərlə üfüqi quyunun portfel səviyyəsində idarə olunması üçün decline curve analizi, sürətli və miqyaslana bilən proqnozlaşdırma vasitəsi kimi geniş istifadə olunur." },
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Uzun müddətli konvensional quyularda əsasən exponential və zəif hiperbolik davranış müşahidə olunub, bu da EUR proqnozlarının material balance nəticələri ilə tutuşdurulmasına imkan verib." },
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
              <li>• Decline curve analizi, reservoir fizikası bilmədən, yalnız debit tarixçəsindən gələcəyi proqnozlaşdırır</li>
              <li>• Üç əsas model: exponential (b=0), hyperbolic (0&lt;b&lt;1), harmonic (b=1)</li>
              <li>• Model seçimi reservoirin sürücü mexanizmi və axın rejiminə görə edilir</li>
              <li>• EUR, iqtisadi hədd sürətinə qədər inteqrasiya olunmuş ümumi gözlənilən hasilatdır</li>
              <li>• Model, işlətmə şəraiti sabit qaldığı müddətcə etibarlıdır — dəyişikliklər yenidən tənzimləmə tələb edir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/reservoir/relative-permeability-saturation"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Əvvəlki: Relative Permeability və Flüid Doyma
          </Link>
          <Link
            href="/learn/reservoir/recovery-factor-eor"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Recovery Factor və EOR
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}