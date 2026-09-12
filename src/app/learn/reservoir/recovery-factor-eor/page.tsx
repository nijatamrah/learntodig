"use client";
import Link from "next/link";

const PATH_COLOR = "#2DBE8C";

const rfByMechanism = [
  { mechanism: "Solution Gas Drive", range: "5% – 30%", note: "Ən aşağı bərpa faktoru — enerji mənbəyi tez tükənir" },
  { mechanism: "Gas Cap Drive", range: "20% – 40%", note: "Qaz papağının genişlənməsi orta müddətli enerji dəstəyi verir" },
  { mechanism: "Water Drive", range: "35% – 75%", note: "Ən yüksək təbii bərpa faktoru — aquifer təzyiqi uzun müddət saxlayır" },
  { mechanism: "Compaction Drive", range: "10% – 20%", note: "Adətən digər mexanizmlərlə birgə fəaliyyət göstərir" },
];

const eorMethods = [
  { title: "Su vurma (Waterflooding)", text: "Ən geniş yayılmış üsul — su vurulan quyulardan neft istehsal quyularına doğru itələnir. Nisbətən ucuz və sadə tətbiq olunur." },
  { title: "CO₂ vurma (Miscible Gas Injection)", text: "Karbon qazı yüksək təzyiqdə neftlə qarışaraq onun özlülüyünü azaldır və hərəkətliliyini artırır. Həm EOR, həm də karbon saxlama məqsədi daşıya bilər." },
  { title: "Buxar vurma (Steam Flooding)", text: "Ağır, yüksək özlülüklü neft üçün istifadə olunur — istilik özlülüyü kəskin azaldaraq neftin hərəkətini asanlaşdırır." },
  { title: "Kimyəvi vurma (Chemical EOR)", text: "Polimer, səthi-aktiv maddə (surfactant) və ya qələvi məhlullar vasitəsilə səth gərginliyi azaldılır, qalıq neft doyması aşağı salınır." },
];

export default function RecoveryFactorEorLesson() {
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
              4.4.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              İstismar Dinamikası
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Recovery Factor və Enhanced Oil Recovery (EOR)
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <p className="text-[14px] leading-[1.8] italic" style={{ color: "#9FAEC4" }}>
              Bir faktı düşün: dünya üzrə orta hesabla, kəşf edilmiş reservoirlardakı neftin
              yarıdan çoxu — bəzi hallarda 65-70%-ə qədəri — yerdə qalır və heç vaxt çıxarılmır.
              Bu, uğursuzluq deyil, fizikanın və iqtisadiyyatın təbii nəticəsidir: təbii
              enerjinin tükənməsi, kapilyar qüvvələr və axının səmərəsizliyi neftin bir
              hissəsini məsamələrdə "əsir" saxlayır. Recovery factor məhz bu reallığı ölçən
              göstəricidir, EOR üsulları isə həmin "əsir" qalan neftin bir hissəsini geri
              qaytarmaq üçün inkişaf etdirilmiş mühəndislik həlləridir. Bu dərsdə, nə qədər
              neftin çıxarıla biləcəyini necə qiymətləndirməyi və bu faizi necə artırmağı
              öyrənəcəyik.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Recovery Factor (RF) nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Recovery Factor, reservoirin ömrü boyunca çıxarılacaq ümumi neft miqdarının
              (EUR), yerdə olan ilkin ümumi neft miqdarına (OOIP) nisbətini göstərən, faizlə
              ifadə olunan göstəricidir. Bu, 4.2.1-ci dərsdə hesabladığımız OOIP dəyərinin
              "nə qədərinin real olaraq bizim olacağını" göstərən körpüdür — OOIP sadəcə
              yerdə olan potensialı göstərir, RF isə bu potensialın nə qədərinin praktiki
              olaraq reallaşacağını müəyyən edir. Dünya üzrə orta RF konvensional neft
              reservoirları üçün adətən 20-40% arasında dəyişir, baxmayaraq ki, güclü su
              drive-lı bəzi sahələrdə bu rəqəm 70%-ə qədər çata bilər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. RF-ə təsir edən əsas amillər
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Recovery factor, təkbaşına bir parametr deyil — əvvəlki dərslərdə öyrəndiyimiz
              bir çox amilin birgə nəticəsidir. Reservoirin təbii sürücü mexanizmi (4.2.2-ci
              dərsdə bəhs edilən) RF-in ən böyük təyinedicisidir, çünki bu, təzyiqin nə qədər
              müddət qorunacağını göstərir. Relative permeability və qalıq neft doyması
              (4.3.3-cü dərs) isə mikroskopik səviyyədə nə qədər neftin kapilyar qüvvələr
              səbəbindən "tutulub qalacağını" müəyyən edir. Bundan əlavə, reservoirin
              heterogenliyi, quyu sıxlığı (nə qədər sıx quyu şəbəkəsi qazılıb) və istismar
              strategiyası (nə vaxt su vurmaya başlanılıb) da RF-ə əhəmiyyətli təsir göstərir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Sürücü mexanizminə görə tipik RF diapazonları
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              4.2.2-ci dərsdə bəhs edilən sürücü mexanizmləri, RF üçün ümumi bir bələdçi kimi
              istifadə edilə bilər:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Sürücü mexanizmi</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tipik RF</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qeyd</th>
                  </tr>
                </thead>
                <tbody>
                  {rfByMechanism.map((r) => (
                    <tr key={r.mechanism} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{r.mechanism}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{r.range}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Hasilatın üç mərhələsi: Primary, Secondary, Tertiary
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Neft hasilatı ənənəvi olaraq üç ardıcıl mərhələyə bölünür. Primary recovery
              mərhələsində, reservoirin öz təbii enerjisi (təzyiq fərqi, həll olunmuş qaz
              genişlənməsi) hesabına neft səthə çıxarılır — heç bir xarici enerji əlavə
              edilmir. Təbii enerji tükəndikcə, secondary recovery mərhələsinə keçilir — bura
              su vurma və ya qaz vurma daxildir, məqsəd reservoir təzyiqini süni şəkildə
              qorumaq və ya bərpa etməkdir. Su vurma və qaz vurmadan sonra belə neftin
              əhəmiyyətli hissəsi yerdə qaldıqda, tertiary recovery (EOR) mərhələsinə keçilir —
              bu mərhələdə istilik, kimyəvi maddələr və ya qazın həll olma xüsusiyyətindən
              istifadə edərək qalıq neftin bir hissəsi geri qaytarılmağa çalışılır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Əsas EOR üsulları
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              EOR üsulları, qalıq neftin hərəkətliliyini artırmaq üçün fərqli fiziki
              mexanizmlərdən istifadə edir:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {eorMethods.map((c) => (
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
              6. EOR seçimi necə edilir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Düzgün EOR üsulunun seçimi, reservoirin PVT xüsusiyyətlərinə (4.1.1-ci dərs),
              xüsusilə neftin özlülüyünə əsaslanır. Yüksək özlülüklü, ağır neft üçün adətən
              istilik əsaslı üsullar (buxar vurma) daha effektivdir, çünki əsas problem
              neftin "çox qatı" olmasıdır. Nisbətən aşağı özlülüklü, yüngül neft üçün isə
              miscible qaz vurma (CO₂ və ya təbii qaz) daha uyğun ola bilər, çünki bu qazlar
              belə neftlərlə asanlıqla qarışaraq özlülüyü daha da azaldır. Kimyəvi üsullar isə
              adətən orta özlülüklü, su-yaş olmayan (4.3.3-cü dərsdə bəhs edilən neft-yaş və ya
              qarışıq-yaş) reservoirlarda, qalıq neft doymasını aşağı salmaq üçün seçilir.
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
              Sürücü mexanizminə görə verilən tipik RF diapazonları, geniş sahə statistikasına
              əsaslanan ümumiləşdirmələrdir — konkret reservoirin real RF-i, heterogenlik,
              quyu sıxlığı və istismar strategiyasından asılı olaraq bu diapazonlardan xeyli
              kənara çıxa bilər. Həmçinin, EOR üsullarının effektivliyi laboratoriya
              şəraitində (nüvə üzərində) ölçülən nəticələrə əsaslanır, amma sahə miqyasında
              tətbiq zamanı heterogenlik, quyu paylanması və iqtisadi məhdudiyyətlər real
              artımı proqnozlaşdırılandan xeyli aşağı sala bilər. Buna görə hər bir EOR
              layihəsi, tam tətbiqdən əvvəl mütləq pilot sahədə sınaqdan keçirilməlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Hesablama — Recovery Factor təyini
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              4.2.2-ci dərsdə material balance ilə hesabladığımız OOIP dəyərini istifadə
              edərək, verilmiş bir EUR üçün RF-i hesablayaq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: N (OOIP) = 232.2 milyon stb (4.2.2-dən), su vurma proqramı ilə
                proqnozlaşdırılan EUR = 90.6 milyon stb
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                RF = EUR / N × 100%
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>RF = 90.6 / 232.2 × 100%</p>
                <p>RF ≈ <span style={{ color: PATH_COLOR }}>39%</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu reservoirdən yerdə olan 232.2 milyon barrelin təxminən 39%-i, yəni
                90.6 milyon barreli, çıxarıla biləcək. Bu rəqəm, water drive diapazonunun
                (35-75%) aşağı hissəsinə uyğun gəlir — bu da göstərir ki, reservoir orta
                səviyyəli su dəstəyinə malikdir, amma optimal deyil. Əgər layihəyə əlavə
                olaraq CO₂ vurma tətbiq edilsə, RF-in bir neçə əlavə faiz bəndi (məsələn, 39%-dən
                45%-ə) artması gözlənilə bilər — bu da əlavə ~13.9 milyon barrel neft deməkdir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Layihənin əsas hissəsi su vurma (secondary recovery) ilə dəstəklənib — bu, reservoir təzyiqinin uzun müddət saxlanmasına və yüksək recovery factor əldə olunmasına imkan verib." },
                { name: "Weyburn sahəsi, Kanada", text: "CO₂ ilə miscible qaz vurma tətbiqinə görə dünyada ən tanınmış nümunələrdən biridir — həm əlavə neft bərpası, həm də karbon qazının yeraltında saxlanması məqsədi daşıyıb." },
                { name: "Duri sahəsi, İndoneziya", text: "Ağır neft yatağıdır və dünyanın ən böyük buxar vurma (steam flood) layihələrindən birinə ev sahibliyi edir — istilik EOR-un effektivliyinin klassik nümunəsidir." },
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
              <li>• Recovery Factor (RF = EUR/N), OOIP-in nə qədərinin real olaraq çıxarılacağını göstərir</li>
              <li>• Sürücü mexanizmi RF-in ən böyük təyinedicisidir — water drive ən yüksək RF verir</li>
              <li>• Hasilat primary, secondary (su/qaz vurma) və tertiary (EOR) mərhələlərindən keçir</li>
              <li>• EOR üsulunun seçimi neftin özlülüyünə və reservoirin wettability xüsusiyyətinə bağlıdır</li>
              <li>• EOR layihələri tam tətbiqdən əvvəl mütləq pilot sahədə sınaqdan keçirilməlidir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/reservoir/decline-curve-analysis"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Əvvəlki: Decline Curve Analizi
          </Link>
          <Link
            href="/learn/reservoir/intro-to-reservoir-simulation"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Reservoir Simulyasiyasına Giriş
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}