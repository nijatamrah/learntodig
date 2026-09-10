"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const mudFunctions = [
  { name: "Qırıntıların Təmizlənməsi", note: "Bit-in kəsdiyi süxur qırıntılarını (cuttings) annulus boyu səthə daşıyır" },
  { name: "Təzyiq Balansı", note: "Hidrostatik təzyiqlə formasiya təzyiqini tarazlayır, kick-in qarşısını alır" },
  { name: "Soyutma və Yağlama", note: "Bit və drill string-in yüksək sürtünmədən qızmasını azaldır, mexaniki hissələri yağlayır" },
  { name: "Quyu Divarının Dəstəklənməsi", note: "Divar üzərində nazik &quot;mud cake&quot; təbəqəsi yaradaraq qeyri-sabit formasiyanı sabitləşdirir" },
  { name: "Qırıntıların Asılı Saxlanması", note: "Dövran dayandıqda gel strukturu qırıntıların dibinə çökməsinin qarşısını alır" },
  { name: "Formasiya Məlumatı", note: "Mud-dan qazılan qırıntı nümunələri (cuttings analysis) litoloji məlumat verir" },
];

const mudTypes = [
  { name: "Water-Based Mud (WBM)", base: "Şirin/duzlu su", cost: "Aşağı", use: "Standart formasiyalar, ekoloji cəhətdən daha az riskli, ən geniş istifadə olunan tip" },
  { name: "Oil-Based Mud (OBM)", base: "Diesel/mineral yağ", cost: "Yüksək", use: "Reaktiv gil (şeyl) formasiyaları, yüksək temperaturlu HPHT quyular, uzun horizontal laterallar" },
  { name: "Synthetic-Based Mud (SBM)", base: "Sintetik karbohidrogenlər", cost: "Ən yüksək", use: "OBM-in performansını verir, amma ekoloji tələblərə (offshore boşaltma) daha uyğundur" },
];

const solidsControlSteps = [
  { title: "Shale Shaker", text: "Vibrasiya edən ələklərlə ən böyük qırıntıları mud-dan ayırır — ilk təmizləmə pilləsi" },
  { title: "Desander", text: "Hidrosiklon prinsipi ilə orta ölçülü qum hissəciklərini çıxarır" },
  { title: "Desilter", text: "Daha xırda silt hissəciklərini desander-dən daha kiçik hidrosiklonlarla ayırır" },
  { title: "Centrifuge", text: "Ən xırda bərk hissəcikləri yüksək fırlanma sürəti ilə ayıraraq mud-un çəkisini tənzimləyir" },
  { title: "Mud Pits", text: "Təmizlənmiş mud saxlanılır, kimyəvi əlavələrlə yenidən qarışdırılıb dövrana qaytarılır" },
];

export default function DrillingFluidLesson() {
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
              2.3.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Qazma Məhlulu və Hidravlika
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Drilling Fluid (Mud)
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Rotary qazmanın gizli qəhrəmanı
            </h2>
            <p className="text-[14px] leading-[1.75]">
              19-cu əsrin cable-tool (zərbəli) qazma üsulunda quyu dövri olaraq boşaldılır,
              qırıntılar ayrıca çıxarılırdı — çox yavaş və dərinlik məhdudiyyətli bir proses.
              Rotary drilling-in inqilabi tərəfi məhz burada idi: dövr edən mayenin — mud-un —
              tətbiqi ilə qırıntıları fasiləsiz təmizləmək, eyni zamanda quyunu təzyiq altında
              saxlamaq mümkün oldu. Bu gün mud sənayədə tez-tez &quot;quyunun qanı&quot;
              adlandırılır — çünki demək olar ki, hər əməliyyat funksiyası birbaşa ondan asılıdır.
              Bu dərsdə mud-un funksiyalarını, növlərini, xassələrini və idarəetmə sistemini
              ətraflı araşdıracağıq.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Mud-un altı əsas funksiyası
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Mud sadəcə &quot;maye&quot; deyil — çoxfunksiyalı mühəndislik sistemidir. Onun
              hər bir xassəsi (sıxlıq, özlülük, kimyəvi tərkib) konkret funksiyanı yerinə
              yetirmək üçün dəqiq layihələndirilir:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mudFunctions.map((m) => (
                <div key={m.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{m.name}</p>
                  <p className="text-[13px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{m.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Mud növləri — əsas ilə seçim
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Mud-un əsas komponenti (baza mayesi) onun kimyəvi davranışını, formasiya ilə
              qarşılıqlı təsirini və ətraf mühitə təsirini müəyyən edir. Üç əsas kateqoriya var:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Mud Növü</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Baza</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Xərc</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>İstifadə sahəsi</th>
                  </tr>
                </thead>
                <tbody>
                  {mudTypes.map((m) => (
                    <tr key={m.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{m.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{m.base}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{m.cost}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{m.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Water-Based Mud — sənayenin əsası
            </h2>
            <p className="text-[14px] leading-[1.75]">
              WBM ən çox istifadə olunan mud tipidir, çünki nisbətən ucuzdur, hazırlanması
              asandır və ətraf mühitə təsiri digər tiplərdən azdır. Bentonit gili suda şişərək
              lazımi özlülüyü yaradır — bu, qırıntıları asılı saxlamaq üçün vacibdir. Amma WBM-in
              zəif tərəfi reaktiv gil formasiyalarında (şeyl) özünü göstərir: su gilin daxilinə
              sızaraq onu şişirdir (shale swelling), nəticədə quyu divarı qeyri-sabitləşir,
              hətta tıxanma (stuck pipe) riski yarana bilər. Buna görə reaktiv şeyl zonalarında
              inhibited WBM (KCl, polimer əlavələri ilə) və ya tam fərqli mud tipi seçilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              4. Oil-Based və Synthetic-Based Mud — performans üçün seçim
            </h2>
            <p className="text-[14px] leading-[1.75]">
              OBM, gil formasiyaları ilə kimyəvi reaksiyaya girmədiyi üçün reaktiv şeyl
              zonalarında, yüksək temperaturlu HPHT quyularda və uzun horizontal laterallarda
              (yağlama xüsusiyyəti sürtünməni azaldır) üstünlük təşkil edir. Amma diesel əsaslı
              olduğu üçün offshore mühitdə ətraf mühit tənzimləyiciləri tərəfindən ciddi
              məhdudlaşdırılıb. Bu boşluğu doldurmaq üçün 1990-cı illərdə synthetic-based mud
              (SBM) inkişaf etdirildi — OBM-in performans üstünlüklərini saxlayır, amma daha az
              toksik və bioloji parçalana bilən sintetik karbohidrogenlərdən istifadə edir,
              beləliklə offshore boşaltma (discharge) tələblərinə daha asan uyğunlaşır.
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
              Formasiyadan mud-a qarışa bilən H₂S (hidrogen sulfid) qazı rəngsiz, çox toksik
              və müəyyən konsentrasiyadan sonra iy hissi itirən (olfactory fatigue) bir qazdır —
              az miqdarda çürük yumurta iyi versə də, yüksək konsentrasiyada iyi hiss etmədən
              saniyələr içində huşunu itirmək mümkündür. H₂S riski olan zonalarda heyət daim
              qaz detektoru daşımalı və mud pit ətrafında havalandırma təmin olunmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              5. Əsas mud xassələri — necə ölçülür?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Mud mühəndisi hər növbədə bir neçə əsas parametri ölçür: <strong>sıxlıq (mud
              weight)</strong> mud tərəzisi ilə ppg (pound per gallon) vahidində ölçülür və
              hidrostatik təzyiqi birbaşa müəyyən edir. <strong>Özlülük</strong> Marsh funnel
              ilə ölçülür — 946 ml mud-un huni içindən axması üçün lazım olan saniyə sayı
              &quot;funnel viscosity&quot; adlanır. Daha dəqiq analiz üçün rotasion viskozimetrlə
              <strong> plastic viscosity (PV)</strong> və <strong>yield point (YP)</strong>
              ayrı-ayrı hesablanır — PV mexaniki sürtünməni, YP isə qırıntı daşıma qabiliyyətini
              göstərir. <strong>Gel strength</strong> dövran dayandıqda mud-un struktur
              möhkəmliyini, <strong>fluid loss (filtration)</strong> isə mud-un formasiyaya nə
              qədər sızdığını ölçür.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Solids Control — mud-u təmiz saxlamaq
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Dövran zamanı mud daim yeni qırıntılarla çirklənir. Bu qırıntılar çıxarılmasa,
              mud-un sıxlığı və özlülüyü nəzarətdən çıxar, həm ROP azalar, həm də hidravlik
              hesablamalar etibarsızlaşar. Buna görə mud səthə çıxdıqdan sonra ardıcıl
              təmizləmə mərhələlərindən keçir:
            </p>
            <ol className="space-y-2 text-[13.5px] leading-[1.7]" style={{ color: "#C4CEE0" }}>
              {solidsControlSteps.map((s, i) => (
                <li key={s.title}>
                  <span style={{ color: PATH_COLOR, fontWeight: 600 }}>{i + 1}.</span>{" "}
                  <span style={{ color: "#E8DCC8", fontWeight: 600 }}>{s.title}</span> — {s.text}
                </li>
              ))}
            </ol>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#E8B33D14", border: "1px solid #E8B33D40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#E8B33D" }}>
              Təhlükəsizlik xəbərdarlığı
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Shale shaker kimi solids control avadanlığının vibrasiya edən ələk səthi və açıq
              mexanik hissələri geyim, əlcək və ya saçın ilişməsi (entanglement) riski daşıyır.
              Heyət bu avadanlıq ətrafında işləyərkən sərbəst geyimdən çəkinməli, təmizləmə və
              texniki xidmət yalnız avadanlıq tam dayandırıldıqdan sonra aparılmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Mud Weight Window — sıxlığın seçilməsi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Mud sıxlığının seçimi, 2.2.3-dəki MASP hesablamasında gördüyümüz formasiya
              təzyiqi konsepti ilə birbaşa bağlıdır. Mud-un hidrostatik təzyiqi formasiya
              təzyiqindən aşağı olarsa — kick riski. Əksinə, quyunun qıra biləcəyi fracture
              təzyiqindən yuxarı olarsa — formasiya çatlayaraq mud-un itirilməsi (lost
              circulation) baş verər. Bu iki hədd arasındakı təhlükəsiz diapazona
              <strong> mud weight window</strong> deyilir və mud mühəndisi bu pəncərə daxilində,
              adətən kifayət qədər ehtiyat marjası (trip margin) ilə işləyir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Hesablama — Mud Weight Window
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              2.2.3-dəki 9,000 ft intervalı üçün formasiya təzyiqi qradienti (0.65 psi/ft)
              artıq bilinir. İndi bu təzyiqi tarazlayan minimum mud sıxlığını, həmçinin fracture
              qradientinə (0.85 psi/ft) əsaslanan maksimum sıxlığı hesablayaq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: dərinlik = 9,000 ft, formasiya təzyiqi = 5,850 psi (2.2.3-dən), fracture qradienti = 0.85 psi/ft
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Minimum mud weight = 5,850 / (0.052 × 9,000) = 12.50 ppg</p>
                <p>Fracture təzyiqi = 0.85 × 9,000 = 7,650 psi</p>
                <p>Maksimum mud weight = 7,650 / (0.052 × 9,000) = <span style={{ color: PATH_COLOR }}>16.35 ppg</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: təhlükəsiz mud weight window 12.50–16.35 ppg aralığındadır. Praktikada
                mühəndis bu pəncərənin ortasına deyil, minimum həddən bir qədər yuxarıya (məs.
                12.8-13.0 ppg) — trip margin adlanan əlavə ehtiyat marjası ilə — yaxın sıxlıq
                seçir ki, həm kick riski minimallaşsın, həm də fracture həddindən kifayət qədər
                uzaq qalsın.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              9. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan (BP)", text: "Offshore ekoloji tələblər səbəbindən əksər quyularda synthetic-based mud istifadə olunur, bu, OBM-in performans üstünlüklərini ətraf mühitə minimal təsirlə birləşdirir." },
                { name: "Şimal dənizi (Böyük Britaniya/Norveç sektoru)", text: "OSPAR konvensiyasının ciddi boşaltma qaydaları səbəbindən oil-based mud-un dənizə birbaşa boşaldılması qadağandır, bu da SBM və qapalı sistemli mud emalının geniş yayılmasına səbəb olub." },
                { name: "Permian Basin, ABŞ", text: "Uzun horizontal laterallarda sürtünməni azaltmaq üçün əsasən oil-based və ya yüksək performanslı water-based sistemlərdən (yağlayıcı əlavələrlə) istifadə olunur." },
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
              <li>• Mud altı əsas funksiya daşıyır — təmizləmə, təzyiq balansı, soyutma, divar dəstəyi, asma, məlumat</li>
              <li>• Üç əsas növ: WBM (ucuz, universal), OBM (yüksək performans, ekoloji risk), SBM (performans + ekoloji uyğunluq)</li>
              <li>• Mud sıxlığı, viskozitə (PV/YP), gel strength və fluid loss mütəmadi ölçülür və idarə olunur</li>
              <li>• Solids control zənciri (shaker → desander → desilter → centrifuge) mud-u təmiz saxlayır</li>
              <li>• Mud weight window formasiya təzyiqi ilə fracture təzyiqi arasındakı təhlükəsiz sıxlıq diapazonudur</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling/wellhead-bop"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Wellhead və BOP
          </Link>
          <Link
            href="/learn/drilling/drilling-hydraulics"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Hidravlika Hesablamaları
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}