"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const bitTypes = [
  { name: "Roller Cone (Tricone)", principle: "Üç konusvari çarx fırlanaraq süxuru əzir və qırır (crushing/gouging)", formation: "Yumşaq–orta sərtlikdə, dəyişkən litologiyalı zonalar", rpm: "60 – 200", note: "Nisbətən ucuz, universal, amma ROP adətən aşağı" },
  { name: "PDC (Polycrystalline Diamond Compact)", principle: "Sabit kəsicilər süxuru kəsir/qaşıyır (shearing) — hərəkətli hissə yoxdur", formation: "Yumşaq–orta-sərt, az abraziv formasiyalar (şeyl, əhəngdaşı)", rpm: "100 – 250+", note: "Yüksək ROP, uzun ömür, amma sərt/abraziv zonada tez aşınır" },
  { name: "Diamond (Impregnated)", principle: "Xırda almaz dənəcikləri matrisə hopdurulub, aşındırma (abrasion) ilə kəsir", formation: "Çox sərt, abraziv formasiyalar (kvarsit, qranit)", rpm: "150 – 300+", note: "Ən bahalı, xüsusi sərt zonalar üçün, aşağı WOB tələb edir" },
];

const ropFactors = [
  { name: "WOB (Weight on Bit)", note: "Müəyyən həddə qədər ROP-u artırır, sonra founder point-dən sonra faydası azalır" },
  { name: "RPM (Fırlanma Sürəti)", note: "Bit-in vahid vaxtda neçə dəfə süxura toxunduğunu təyin edir" },
  { name: "Mud Flow Rate", note: "Qırıntıların (cuttings) bit altından təmizlənməsini təmin edir — zəif təmizlənmə bit balling yaradır" },
  { name: "Formasiya Sərtliyi", note: "Sərt/abraziv süxur eyni WOB-da daha aşağı ROP və daha sürətli bit aşınması deməkdir" },
  { name: "Bit Aşınması", note: "Kəsicilər küt olduqca eyni WOB/RPM-də ROP tədricən azalır" },
  { name: "Hidravlika (Nozzle Dizaynı)", note: "Düzgün nozzle sürəti bit altını təmiz saxlayır, differensial təzyiqi tənzimləyir" },
];

export default function BitSelectionRopLesson() {
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
          href="/learn/drilling"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6"
          style={{ color: "#3D5570" }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Qazma
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
              style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
            >
              2.1.4
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Qazma Əsasları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Bit Seçimi və ROP Optimallaşdırması
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə eyni quyuda bir neçə fərqli bit istifadə olunur?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Bir dişçi diş çəkmək üçün mişar işlətmədiyi kimi, mühəndis də hər formasiyada
              eyni bit-dən istifadə etmir. Quyu dərinləşdikcə süxur növü — yumşaq gildən sərt
              əhəngdaşına, sonra isə abraziv qumdaşına — dəyişir, və hər dəyişiklik fərqli kəsmə
              mexanizmi tələb edir. Səhv bit seçimi ROP-u (Rate of Penetration — qazma sürəti)
              kəskin azaldır və neçə saatlıq iş neçə günə uzana bilər. Bu dərsdə bit növlərini,
              seçim meyarlarını və ROP-u optimallaşdırma prinsiplərini araşdıracağıq.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Əsas bit növləri və işləmə prinsipi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Bütün qazma bitləri iki əsas mexanizmdən biri ilə süxuru dağıdır: mexaniki əzmə
              (crushing) və ya kəsmə (shearing/scraping). Bit seçimi əsasən formasiyanın sərtliyi,
              abrazivliyi və hədəf ROP-a əsaslanır:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Bit Növü</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>İş Prinsipi</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Formasiya</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>RPM Aralığı</th>
                  </tr>
                </thead>
                <tbody>
                  {bitTypes.map((b) => (
                    <tr key={b.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{b.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{b.principle}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{b.formation}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{b.rpm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. Roller Cone bitlər — köhnə, amma hələ də aktual
            </h2>
            <p className="text-[14px] leading-[1.75]">
              1909-cu ildə Howard Hughes Sr. tərəfindən patentlənən roller cone bit, neft
              sənayesinin ən uzunömürlü texnologiyalarından biridir. Üç konusvari çarx bit
              gövdəsinə bərkidilmiş oxlar ətrafında fırlanır və süxuru əzərək (crushing) və
              qaşıyaraq (gouging) parçalayır. Dişlər (tungsten karbid və ya poladdan) formasiyanın
              sərtliyinə görə fərqli formada olur — yumşaq formasiya üçün uzun və seyrək,
              sərt formasiya üçün qısa və sıx dişlər. Bu bitlərin hərəkətli hissəsi olduğu üçün
              yataq (bearing) aşınması onların ömrünü məhdudlaşdırır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. PDC bitlər — sənayenin standartı
            </h2>
            <p className="text-[14px] leading-[1.75]">
              1970-ci illərdə tətbiq olunmağa başlayan PDC bitlər bu gün dünya üzrə qazılan
              quyuların böyük əksəriyyətində istifadə olunur. Hərəkətli hissəsi olmadığı üçün
              (fixed cutter dizayn) mexaniki nasazlıq riski aşağıdır. Sintetik almaz təbəqəsi
              (polycrystalline diamond) volfram karbid altlığa bərkidilir və süxuru bıçaq kimi
              kəsir (shearing) — bu, eyni enerji sərfiyyatı ilə roller cone-dan qat-qat çox
              qırıntı çıxarmağa imkan verir. Nəticədə PDC bitlər adətən 2-3 dəfə yüksək ROP
              göstərir, amma yüksək abraziv (məs. qumdaşı) formasiyada kəsicilər sürətlə aşınır.
            </p>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#E8B33D14", border: "1px solid #E8B33D40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#E8B33D" }}>
              Təhlükəsizlik xəbərdarlığı
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Bit nozzle-larının qazma öncəsi yoxlanması zamanı yüksək təzyiqli mud jet-i
              (adətən 1000+ psi) dərini deşərək toxuma daxilinə maye vurma (high-pressure
              injection injury) yaradan ciddi bir yaralanmaya səbəb ola bilər — bu, xarici
              görünüşünə görə kiçik görünsə də, təcili tibbi müdaxilə tələb edən yaralanmadır.
              Nozzle test və təmizlənməsi yalnız sistem təzyiqsiz vəziyyətə gətirildikdən sonra
              aparılmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              4. Diamond (Impregnated) bitlər — ən sərt zonalar üçün
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Kvarsit, qranit kimi çox sərt və abraziv formasiyalarda hətta PDC kəsiciləri
              dəqiqələr içində sıradan çıxa bilər. Bu hallarda xırda təbii və ya sintetik almaz
              dənəcikləri matris materialına hopdurulmuş impregnated bitlər işlədilir. Onlar
              kəsmək yox, aşındırmaq (abrasion) prinsipi ilə işləyir — çox yüksək RPM (150-300+)
              tələb edir, amma aşağı WOB ilə kifayətlənir. Ən bahalı bit növü olduğu üçün yalnız
              digər növlərin performans göstərmədiyi zonalarda seçilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. ROP-a təsir edən əsas amillər
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Bit seçimi düzgün olsa belə, ROP daim aşağıdakı amillərin qarşılıqlı təsiri ilə
              müəyyən olunur:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ropFactors.map((f) => (
                <div key={f.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{f.name}</p>
                  <p className="text-[13px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{f.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              6. Founder Point — daha çox WOB həmişə daha yaxşı deyil
            </h2>
            <p className="text-[14px] leading-[1.75]">
              İlk baxışdan WOB artdıqca ROP-un da xətti olaraq artması gözlənilir. Müəyyən həddə
              qədər bu doğrudur. Amma bu həddən — founder point-dən — sonra əlavə çəki artıq faydalı
              olmur: kəsicilər süxuru lazımi sürətdə təmizləyə bilmir, qırıntılar bit altında
              yığılır (bit balling) və bit əslində öz qırıntılarının üzərində &quot;sürüşməyə&quot;
              başlayır. Nəticədə ROP artmır, hətta azala bilər, halbuki bit və BHA-ya düşən
              gərginlik davamlı artır. Buna görə operator ROP-u WOB artıraraq deyil, founder
              point-ə çatmamış optimal nöqtəni tapmaqla maksimallaşdırır.
            </p>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#E8B33D14", border: "1px solid #E8B33D40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#E8B33D" }}>
              Təhlükəsizlik xəbərdarlığı
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Founder point-i tanımayan operator, azalan ROP-u &quot;kompensasiya&quot; etmək
              üçün WOB-u davamlı artırmaqda israr edərsə, bu, 2.1.3-də gördüyümüz neytral nöqtə
              həddini aşaraq drill pipe buckling-ə, ya da ani bit/kəsici sınmasına (bit failure)
              səbəb ola bilər. Sınmış bit hissəciyi quyuda qalarsa (junk in hole), bahalı və
              vaxt aparan &quot;fishing&quot; əməliyyatı tələb olunur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Hesablama — ROP və dövriyyə başına qazma dərinliyi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Sahə şəraitində ROP-un özü sadə formulla hesablanır, amma daha faydalı göstərici —
              dövriyyə başına qazılan məsafə (ft/rev) — bit aşınmasını izləməyə imkan verir:
              eyni WOB/RPM-də bu dəyər zamanla azalırsa, bu, kəsicilərin küt olmağa başladığının
              erkən əlamətidir.
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: 2.1.3-dəki BHA (max təhlükəsiz WOB = 59,764 lbs) ilə işləyən yeni PDC bit,
                6 saatda 480 ft qazılıb, N = 110 rpm
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>ROP = Qazılan məsafə / Vaxt = 480 ft / 6 saat = 80 ft/saat</p>
                <p>Dövriyyə sayı = 110 rpm × 60 dəq × 6 saat = 39,600 dövriyyə</p>
                <p>Dövriyyə başına dərinlik = 480 / 39,600 = <span style={{ color: PATH_COLOR }}>0.0121 ft/rev (≈ 0.146 in/rev)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu bit hər tam dövrədə təxminən 0.146 düym süxur kəsir. Operator bu
                dəyəri müntəzəm izləyir — əgər eyni WOB (59,764 lbs civarında) və RPM-də bu rəqəm
                sonrakı saatlarda azalmağa başlasa, bu, bit-in aşınmaya başladığını göstərir və
                bit dəyişdirilməsi (trip) planlaşdırılmalıdır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan (BP)", text: "Extended-reach quyularda yüksək ROP və uzun bit ömrü tələbi səbəbindən əsasən PDC bitlər üstünlük təşkil edir; bit seçimi hər litoloji zona üçün ayrıca planlaşdırılır." },
                { name: "Permian Basin, ABŞ", text: "Şist (shale) formasiyalarının yumşaq-orta sərtliyi PDC bitlərin geniş miqyasda tətbiqinə imkan verib — bu, region üzrə horizontal quyularda rekord ROP göstəricilərinə səbəb olub." },
                { name: "Ghawar sahəsi, Səudiyyə Ərəbistanı (Saudi Aramco)", text: "Dəyişkən sərtlikli karbonat formasiyalarında roller cone və PDC bitlərin hibrid istifadəsi tələb olunur, çünki tək bit növü bütün intervalda optimal performans vermir." },
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
              <li>• Üç əsas bit növü: Roller Cone (əzmə), PDC (kəsmə), Diamond Impregnated (aşındırma)</li>
              <li>• PDC bitlər hərəkətli hissəsi olmadığı üçün daha çox ROP və uzun ömür verir, amma abraziv zonada tez aşınır</li>
              <li>• Founder point-dən sonra WOB artımı ROP-u artırmır — bit balling və gərginlik riskini artırır</li>
              <li>• Dövriyyə başına dərinlik (ft/rev) bit aşınmasını izləməyin sadə və effektiv üsuludur</li>
              <li>• Nozzle test zamanı yüksək təzyiqli mud jet ciddi injection injury riski daşıyır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling/drill-string-bha"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Drill String və BHA
          </Link>
          <Link
            href="/learn/drilling/casing-design"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Casing Dizaynı və Növləri
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}