"use client";
import Link from "next/link";

const PATH_COLOR = "#2DBE8C";

const testTypes = [
  { name: "Drawdown Test", duration: "Saatlar – günlər", note: "Quyu sabit debitlə açılır, təzyiqin zamanla necə düşdüyü izlənilir — erkən mərhələ diaqnostikası üçün faydalıdır" },
  { name: "Build-up Test", duration: "Saatlar – həftələr", note: "Quyu bağlanır, təzyiqin bərpa olunma sürəti ölçülür — ən çox istifadə olunan, ən etibarlı üsuldur" },
  { name: "Injection Test", duration: "Saatlar – günlər", note: "Su/qaz vurma quyularında, quyunun qəbuletmə qabiliyyətini qiymətləndirmək üçün aparılır" },
  { name: "Interference Test", duration: "Günlər – həftələr", note: "Bir quyuda dəyişiklik edilir, qonşu quyularda təzyiq təsiri izlənilir — quyular arası əlaqəni göstərir" },
];

const testSteps = [
  "Quyu əvvəlcə sabit, məlum debitlə müəyyən müddət işlədilir (drawdown mərhələsi)",
  "Sonra quyu tamamilə bağlanır və dib təzyiqi davamlı olaraq qeydə alınır (build-up mərhələsi)",
  "Toplanan təzyiq/zaman məlumatı Horner qrafiki və ya digər analitik üsullarla emal olunur",
  "Nəticədə keçiricilik (k), skin (s) və orta reservoir təzyiqi (P̄) təyin edilir",
];

export default function WellTestingProductivityIndexLesson() {
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
              4.3.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Axın Davranışı
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Quyu Testi və Productivity Index
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <p className="text-[14px] leading-[1.8] italic" style={{ color: "#9FAEC4" }}>
              Əvvəlki dərsdə Darcy qanunu ilə "ideal" şəraitdə gözlənilən quyu debitini
              hesabladıq — amma real sahədə mühəndislər bu rəqəmə etibar etmək əvəzinə, hər
              zaman sual verirlər: "Bəs quyu özü nə deyir?" Çünki heç bir teorik model, real
              qazma zədələnməsini, lokal heterogenliyi və ya gözlənilməz geoloji anomaliyaları
              tam əvvəlcədən görə bilməz. Quyu testi məhz bu sualın cavabını tapmaq üçün
              aparılır — reservoirin özünü "danışdırmaq" üçün nəzarətli şəkildə onu narahat
              edib reaksiyasını ölçmək. Bu dərsdə, bu reaksiyanı necə oxumağı və ondan
              Productivity Index kimi praktiki bir göstərici çıxarmağı öyrənəcəyik.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Quyu testi nə üçün aparılır?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Quyu testi, quyunu nəzarətli şəkildə işlədərək (və ya bağlayaraq) təzyiq
              reaksiyasını ölçmək və bu reaksiyadan reservoirin real xüsusiyyətlərini —
              keçiricilik, skin, orta reservoir təzyiqi, hətta reservoirin sərhədlərinə olan
              məsafə — çıxarmaq məqsədi daşıyır. Bu, laboratoriyada ölçülən nüvə keçiriciliyi
              və ya karotaj interpretasiyasından fərqli olaraq, reservoirin bütöv, dinamik
              cavabını əks etdirir — yəni kilometrlərlə məsafədə olan heterogenliyin belə
              orta effektini göstərə bilir. Buna görə quyu testi nəticələri, tez-tez volumetric
              və ya karotaj əsaslı qiymətləndirmələrdən daha etibarlı sayılır və material
              balance modelinin kalibrlənməsində istinad nöqtəsi kimi istifadə olunur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Əsas quyu testi növləri
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Məqsəddən asılı olaraq, sənayedə bir neçə fərqli quyu testi növü tətbiq olunur:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Test növü</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tipik müddət</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qeyd</th>
                  </tr>
                </thead>
                <tbody>
                  {testTypes.map((t) => (
                    <tr key={t.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{t.name}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{t.duration}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{t.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Build-up testi necə aparılır?
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Ən geniş yayılmış üsul olan build-up testi bir neçə ardıcıl addımdan ibarətdir:
            </p>
            <div className="space-y-2.5">
              {testSteps.map((step, i) => (
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
              4. Horner qrafiki — vaxtı "geriyə oxumaq"
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Build-up məlumatlarının analizində ən çox istifadə olunan üsul Horner qrafikidir.
              Bu üsulda, bağlanmadan sonrakı təzyiq, (tp+Δt)/Δt nisbətinin loqarifminə qarşı
              qrafikə köçürülür — burada tp axın müddəti, Δt isə bağlanmadan sonra keçən
              zamandır. Alınan xəttin meyli birbaşa keçiricilik-qalınlıq hasilini (kh) verir,
              xəttin y-oxu ilə kəsişməsi isə (Δt sonsuza doğru ekstrapolyasiya edildikdə) orta
              reservoir təzyiqini (P̄) təxmin etməyə imkan yaradır. Bu qrafik metodu, sadəliyinə
              baxmayaraq, onilliklər boyu sənayedə ən etibarlı diaqnostika alətlərindən biri
              olaraq qalıb.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Productivity Index (PI) nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Productivity Index (J), quyunun vahid təzyiq fərqinə görə nə qədər flüid verə
              biləcəyini göstərən sadə, praktiki göstəricidir — bbl/gün/psi vahidində ölçülür.
              Yüksək PI, quyunun "asan" istehsal etdiyini (yaxşı keçiricilik, aşağı skin),
              aşağı PI isə ya zəif reservoir keyfiyyətini, ya da güclü skin zədələnməsini
              göstərə bilər. PI, mahiyyətcə əvvəlki dərsdəki Darcy tənliyinin sadələşdirilmiş
              formasıdır — bütün keçiricilik, qalınlıq, özlülük və həndəsə amillərini tək bir
              rəqəmə "sıxışdırır", bu da onu sahə mühəndisləri üçün sürətli qiymətləndirmə
              vasitəsinə çevirir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. IPR əyrisi və Vogel korrelyasiyası
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Inflow Performance Relationship (IPR) əyrisi, quyu dibi təzyiqi (Pwf) ilə debit
              (q) arasındakı əlaqəni bütün mümkün istismar aralığında göstərir. Reservoir
              təzyiqi bubble point-dən yuxarı olduğu müddətcə (əvvəlki dərslərdə bəhs edilən
              undersaturated şərait), bu əlaqə demək olar ki, xəttidir və sabit PI ilə təsvir
              olunur. Amma təzyiq bubble point-dən aşağı düşdükdə, sərbəst qaz fazası yaranır,
              flüidin effektiv keçiriciliyi azalır və əyri əyilməyə başlayır — bu halda sabit PI
              modeli artıq işləmir. Bu problemi həll etmək üçün 1968-ci ildə Vogel tərəfindən
              təklif olunan empirik korrelyasiya istifadə olunur, bu da əyilmiş IPR əyrisini
              kifayət qədər dəqiq təxmin etməyə imkan verir.
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
              Sabit Productivity Index modeli, yalnız reservoir təzyiqi bubble point-dən yuxarı
              olduğu (tək fazalı, undersaturated) şəraitdə etibarlıdır — bu şərtdə IPR həqiqətən
              xətti olur. Təzyiq bubble point-dən aşağı düşən kimi, sərbəst qazın yaratdığı
              əlavə müqavimət səbəbindən sabit PI fərziyyəsi böyük xətalara yol aça bilər və
              Vogel və ya digər çoxfazalı korrelyasiyalara keçmək zəruridir. Əlavə olaraq, Horner
              analizi reservoirin sonsuz və homogen olduğunu fərz edir — real sərhədli və ya
              fərqli keçiricilikli zonalardan ibarət reservoirlarda, xüsusilə uzun müddətli
              testlərdə, nəticələr əlavə diaqnostik model tələb edə bilər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Hesablama — Productivity Index təyini
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Əvvəlki dərsdə Darcy tənliyi ilə hesabladığımız debit dəyərini istifadə edərək
              PI-ni təyin edək:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: q = 1,372 bbl/gün (4.3.1-dən), Pr = 3,600 psi, Pwf = 2,600 psi
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                J = q / (Pr − Pwf)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>J = 1,372 / (3,600 − 2,600)</p>
                <p>J = 1,372 / 1,000</p>
                <p>J ≈ <span style={{ color: PATH_COLOR }}>1.37 bbl/gün/psi</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu quyu, hər 1 psi əlavə təzyiq fərqinə görə təxminən 1.37 barrel əlavə
                neft verə bilər. Bu göstəricinin praktiki dəyəri ondadır ki, artıq mürəkkəb
                Darcy tənliyini hər dəfə yenidən həll etmək əvəzinə, mühəndis sadəcə J × ΔP
                düsturu ilə istənilən Pwf üçün gözlənilən debiti sürətlə qiymətləndirə bilər —
                məsələn, Pwf = 2,000 psi-yə endirilsə, gözlənilən debit J × (3,600−2,000) ≈
                2,192 bbl/gün olardı (bubble point-dən yuxarı qaldığı müddətcə).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Müxtəlif quyularda aparılan build-up testləri, layların keçiriciliyini və skin dəyərlərini dəqiqləşdirməyə, həmçinin quyu stimulyasiyası ehtiyacını müəyyən etməyə kömək edib." },
                { name: "Forties sahəsi, Şimal dənizi", text: "Onilliklər boyu aparılan mütəmadi quyu testləri, reservoirin təzyiq tükənmə tarixçəsini izləməkdə və material balance modelinin kalibrlənməsində istifadə olunub." },
                { name: "Cantarell sahəsi, Meksika", text: "Bubble point-dən aşağı düşən təzyiq şəraitində Vogel tipli IPR korrelyasiyaları tətbiq edilərək, azalan quyu performansı daha dəqiq proqnozlaşdırılıb." },
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
              <li>• Quyu testi, reservoirin real dinamik xüsusiyyətlərini ölçmək üçün ən etibarlı üsuldur</li>
              <li>• Build-up testi və Horner qrafiki, keçiricilik, skin və orta reservoir təzyiqini müəyyən edir</li>
              <li>• Productivity Index (J = q/ΔP), quyunun məhsuldarlığını tək bir rəqəmlə ifadə edir</li>
              <li>• IPR əyrisi Pr &gt; Pb-də xəttidir, aşağıda isə Vogel kimi korrelyasiyalar tələb olunur</li>
              <li>• Skin effekti müsbət olduqda real debit "ideal" Darcy proqnozundan aşağı olur</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/reservoir/darcy-law-reservoir-flow"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Əvvəlki: Darcy Qanunu və Reservoir Axını
          </Link>
          <Link
            href="/learn/reservoir/relative-permeability-saturation"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Relative Permeability və Flüid Doyma
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}