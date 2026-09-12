"use client";
import Link from "next/link";

const PATH_COLOR = "#2DBE8C";

const saturationTerms = [
  { symbol: "Swi (Swc)", name: "İrreduksiya olunmayan su doyması", note: "Kapilyar qüvvələr səbəbindən heç vaxt çıxarıla bilməyən minimum su miqdarı" },
  { symbol: "Sor", name: "Qalıq neft doyması (Residual Oil)", note: "Su vurma və ya təbii su drive-dan sonra belə çıxarıla bilməyən, qapanmış neft" },
  { symbol: "krw", name: "Suyun nisbi keçiriciliyi", note: "Su doyması artdıqca 0-dan 1-ə (və ya krw,max-a) doğru artan əyri" },
  { symbol: "kro", name: "Neftin nisbi keçiriciliyi", note: "Su doyması artdıqca 1-dən (və ya kro,max-dan) 0-a doğru azalan əyri" },
];

const wettabilityCards = [
  { title: "Su-yaş (Water-Wet) qaya", text: "Su, qaya səthinə daha çox yapışır və nazik təbəqə şəklində məsamə divarlarını örtür. Neft məsamələrin ortasında sərbəst hərəkət edir — bu, adətən daha yüksək neft bərpasına səbəb olur." },
  { title: "Neft-yaş (Oil-Wet) qaya", text: "Neft səthə yapışır, su isə məsamələrin mərkəzindən keçir. Bu şəraitdə qalıq neft doyması adətən daha yüksək olur, çünki neft səth gərginliyi ilə \"tutulub qalır\"." },
  { title: "Qarışıq-yaş (Mixed-Wet) qaya", text: "Bəzi məsamə səthləri su-yaş, bəziləri neft-yaş olur — çox vaxt karbonat reservoirlarında rast gəlinir və proqnozu çətinləşdirir." },
  { title: "Wettability-nin təyini", text: "Adətən nüvə nümunələri üzərində Amott və ya USBM testləri ilə laboratoriyada ölçülür — sahə şəraitində birbaşa ölçmək mümkün deyil." },
];

export default function RelativePermeabilitySaturationLesson() {
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
              4.3.3
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Axın Davranışı
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Relative Permeability və Flüid Doyma
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <p className="text-[14px] leading-[1.8] italic" style={{ color: "#9FAEC4" }}>
              Təsəvvür et ki, dar bir dəhlizdə eyni anda iki qrup insan əks istiqamətlərdə
              hərəkət etməyə çalışır — nə qədər çox insan bir tərəfə yığılarsa, digər tərəfin
              hərəkəti bir o qədər çətinləşir. Reservoirin məsamələrində də oxşar bir hadisə
              baş verir: neft və su (bəzən qaz da) eyni məsamə şəbəkəsini paylaşır, və bir
              flüidin miqdarı artdıqca digərinin hərəkət etmə qabiliyyəti azalır. Əvvəlki
              dərslərdə istifadə etdiyimiz "təmiz" Darcy keçiriciliyi (k), əslində yalnız bir
              flüid tək başına axarkən düzgündür — iki flüid birgə axanda tamam başqa bir
              anlayışa, relative permeability-yə ehtiyac yaranır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Relative permeability nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Relative permeability (nisbi keçiricilik), müəyyən bir flüidin doyma səviyyəsinə
              görə, o flüidin effektiv keçiriciliyinin, qayanın mütləq (absolute) keçiriciliyinə
              nisbətini göstərən boyutsuz kəmiyyətdir. Başqa sözlə, əvvəlki dərslərdə istifadə
              etdiyimiz k dəyəri yalnız bir flüid mövcud olduqda tətbiq olunur — real
              reservuarda isə həmişə ən azı iki flüid (neft+su, ya da qaz+neft) birgə mövcud
              olur və bir-birinin hərəkətinə maneə yaradır. Bu maneəni riyazi şəkildə ifadə
              etmək üçün hər bir flüid üçün ayrıca krw (su), kro (neft) və krg (qaz) əmsalları
              təyin olunur, hər biri 0 ilə 1 arasında dəyər alır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Doyma (Saturation) anlayışının təkrarı
            </h2>
            <p className="text-[14px] leading-[1.75]">
              4.2.1-ci dərsdə tanış olduğumuz su doyması (Sw) anlayışı burada mərkəzi rol
              oynayır — çünki relative permeability əyriləri məhz Sw-nin funksiyası kimi
              qurulur. Lakin bütün su hərəkətli deyil: müəyyən bir minimum su miqdarı, kapilyar
              qüvvələr səbəbindən qaya səthinə "yapışıb qalır" və heç vaxt istehsal oluna
              bilmir. Eyni şəkildə, su vurma və ya təbii su drive prosesi başa çatdıqdan sonra
              belə, müəyyən miqdar neft məsamələrdə "tutulub qalır" və çıxarıla bilmir. Bu iki
              hədd — irreduksiya olunmayan su doyması və qalıq neft doyması — relative
              permeability əyrilərinin "sərhədlərini" müəyyən edir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Əsas doyma parametrləri
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Simvol</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Ad</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Mənası</th>
                  </tr>
                </thead>
                <tbody>
                  {saturationTerms.map((t) => (
                    <tr key={t.symbol} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-mono font-semibold" style={{ color: PATH_COLOR }}>{t.symbol}</td>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{t.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{t.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Krw/Kro əyriləri necə davranır?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Tipik bir krw-kro qrafikində, Sw kiçik olduqda kro yüksək (nəzəri olaraq 1-ə
              yaxın) dəyərdə başlayır, çünki neft demək olar ki, məsamələrin çoxunu tutur.
              Sw artdıqca kro tədricən azalır və Sw = 1-Sor həddinə çatanda sıfıra enir — bu
              nöqtədən sonra neft artıq hərəkət etmir. Eyni zamanda krw isə Sw = Swi-də sıfırdan
              başlayır (çünki bu həddə qədər su hərəkətsizdir) və Sw artdıqca tədricən yüksəlir.
              Bu iki əyri arasındakı sahə — "crossover point" adlanan kəsişmə nöqtəsi ilə birgə
              — reservoirin hansı Sw dəyərində daha çox su, hansında daha çox neft
              istehsal edəcəyini göstərən vacib diaqnostik məlumatdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Wettability-nin (Islanma xüsusiyyəti) təsiri
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Qayanın hansı flüidə daha çox "meylli" olduğu (wettability), relative permeability
              əyrilərinin formasını kökündən dəyişən əsas amildir:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {wettabilityCards.map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl px-3.5 py-3"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-[13px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{c.title}</p>
                  <p className="text-[12.5px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{c.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Effektiv keçiricilik və Darcy tənliyinə bağlantı
            </h2>
            <p className="text-[14px] leading-[1.75]">
              4.3.1-ci dərsdə istifadə etdiyimiz Darcy tənliyi, əslində tək flüidlik şərait
              üçün sadələşdirilmişdi. Real, çoxfazalı şəraitdə isə hər flüidin effektiv
              keçiriciliyi, mütləq keçiriciliyin (k) həmin flüidin relative permeability
              əmsalına vurulması ilə tapılır: keff = k × kr. Bu o deməkdir ki, əgər reservoirdə
              həm neft, həm də su axırsa, hər ikisi eyni mütləq keçiriciliyi "paylaşır", amma
              öz nisbi payına uyğun effektiv keçiricilikdən istifadə edir. Bu əlaqə, quyu debit
              proqnozlarının, xüsusilə su kəsilməsi (water cut) artdıqca, niyə vaxtla dəyişdiyini
              izah edir.
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
              Relative permeability əyriləri, adətən kiçik nüvə nümunələri üzərində
              laboratoriya şəraitində ölçülür və bütün reservoir üçün eyni olduğu fərz edilir.
              Real şəraitdə isə wettability, məsamə həndəsəsi və heterogenlik reservoirin
              müxtəlif zonalarında əhəmiyyətli dərəcədə dəyişə bilər — xüsusilə qarışıq-yaş
              karbonat reservoirlarında laboratoriya nümunəsi bütöv reservoiru təmsil etməyə
              bilər. Əlavə olaraq, bu əyrilər statik (steady-state və ya unsteady-state) test
              şəraitində ölçülür, amma real axın sürəti və istiqaməti dəyişdikdə (məsələn,
              hidravlik histerezis səbəbindən) əyrilər fərqli görünə bilər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Hesablama — Effektiv keçiricilik təyini
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              4.3.1-ci dərsdə istifadə etdiyimiz mütləq keçiricilik dəyərini, verilmiş su
              doymasında effektiv neft keçiriciliyinə çevirək:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: k = 50 md (4.3.1-dən), Sw = 0.40, bu Sw-də kro = 0.55
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                ko,eff = k × kro
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>ko,eff = 50 × 0.55 = <span style={{ color: PATH_COLOR }}>27.5 md</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu Sw = 0.40 doyma səviyyəsində, neftin effektiv keçiriciliyi cəmi 27.5
                md-dir — yəni mütləq keçiriciliyin (50 md) yalnız 55%-i neft üçün "əlçatandır".
                Əgər bu dəyəri 4.3.1-ci dərsdəki Darcy tənliyinə k əvəzinə qoysaq, gözlənilən
                debit əvvəlki hesabladığımız ~1,372 bbl/gün-dən əhəmiyyətli dərəcədə aşağı
                düşərdi — bu, real sahədə su kəsilməsi artdıqca neft debitinin niyə tədricən
                azaldığını göstərən əsas mexanizmdir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Su vurma ilə əlaqədar aparılan relative permeability tədqiqatları, su-neft əvəzlənməsi zamanı gözlənilən qalıq neft doymasının qiymətləndirilməsində əsas rol oynayıb." },
                { name: "Ghawar sahəsi, Səudiyyə Ərəbistanı", text: "Güclü su drive mexanizmi ilə işləyən bu nəhəng sahədə, wettability tədqiqatları su kəsilməsinin vaxtla necə inkişaf edəcəyini proqnozlaşdırmaqda mühüm əhəmiyyət daşıyıb." },
                { name: "Ekofisk sahəsi, Şimal dənizi", text: "Karbonat reservoiruna malik bu sahədə qarışıq-yaş wettability xüsusiyyətləri, su vurma proqramlarının dizaynında əlavə laboratoriya tədqiqatları tələb edib." },
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
              <li>• Relative permeability, iki və ya daha çox flüid birgə axarkən hər birinin nisbi payını göstərir</li>
              <li>• Swi və Sor, əyrilərin sərhədlərini — çıxarıla bilməyən hədləri — müəyyən edir</li>
              <li>• Wettability (su-yaş / neft-yaş) əyrilərin formasını və qalıq neft doymasını kökündən dəyişir</li>
              <li>• Effektiv keçiricilik keff = k × kr düsturu ilə mütləq keçiricilikdən çıxarılır</li>
              <li>• Su kəsilməsi artdıqca kro azalır, bu da vaxtla neft debitinin düşməsinin əsas səbəbidir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/reservoir/well-testing-productivity-index"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Əvvəlki: Quyu Testi və Productivity Index
          </Link>
          <Link
            href="/learn/reservoir/decline-curve-analysis"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Decline Curve Analizi
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}