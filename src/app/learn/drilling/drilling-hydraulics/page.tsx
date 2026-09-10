"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const circuitPath = [
  { title: "Mud Pit", text: "Təmizlənmiş, kimyəvi tərkibi tənzimlənmiş mud burada saxlanılır və nasosun əmişinə hazır vəziyyətdə tutulur" },
  { title: "Mud Pump", text: "Positive displacement nasoslar (adətən triplex) mud-u yüksək təzyiq altında sistemə vurur" },
  { title: "Standpipe / Kelly Hose", text: "Yüksək təzyiqli mud rig-in şaquli standpipe-ı və çevik kelly hose (və ya top drive) vasitəsilə drill string-ə ötürülür" },
  { title: "Drill String Daxili", text: "Mud drill pipe, HWDP və drill collar-ların içindən aşağı — bit-ə doğru axır" },
  { title: "Bit Nozzle-ları", text: "Mud kiçik diametrli nozzle-lardan yüksək sürətlə çıxaraq bit altını təmizləyir və qırıntıları qaldırır" },
  { title: "Annulus", text: "Mud qırıntılarla birlikdə casing/openhole ilə drill string arasındakı boşluqdan səthə doğru yuxarı qalxır" },
  { title: "Solids Control", text: "Səthə çatan mud shale shaker və digər avadanlıqdan keçərək qırıntılardan təmizlənir və pit-ə qayıdır (2.3.1-dəki dövr)" },
];

const pressureLosses = [
  { location: "Səth avadanlığı (standpipe, hose, swivel)", share: "~3–5%", note: "Nisbətən qısa məsafə, amma yüksək axın sürəti səbəbindən nəzərə çarpan itki" },
  { location: "Drill String daxili (pipe + collar)", share: "~15–25%", note: "Ən uzun məsafə, boru daxili sürtünmə buradan asılıdır" },
  { location: "Bit Nozzle-ları", share: "~50–65%", note: "Ən böyük itki mənbəyi — dizayn edilmiş məqsədli təzyiq düşməsi" },
  { location: "Annulus (qayıdış yolu)", share: "~10–20%", note: "Geniş kəsik sahəsi səbəbindən nisbətən aşağı sürət və itki, amma hole cleaning üçün kritikdir" },
];

const optimizationCriteria = [
  { name: "Maksimum Hidravlik At Gücü (HHP)", note: "Bit-də maksimum enerji sərfini hədəfləyir — adətən pump gücünün ~65%-i bit-ə ayrılanda optimal olur, yumşaq/orta formasiyalarda üstünlük verilir" },
  { name: "Maksimum Zərbə Qüvvəsi (Impact Force)", note: "Jet axınının bit altına mexaniki zərbəsini maksimallaşdırır — bit-ə pump gücünün ~48%-i ayrılanda optimal olur, sərt formasiyalarda üstünlük verilir" },
];

export default function DrillingHydraulicsLesson() {
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
              2.3.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Qazma Məhlulu və Hidravlika
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Hidravlika Hesablamaları
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Qapalı dövran içindəki gizli döyüş meydanı
              </h2>
            <p className="text-[14px] leading-[1.75]">
              2.3.1-də mud-un funksiyalarını gördük, amma bu funksiyaların hər biri — qırıntı
              təmizlənməsi, soyutma, təzyiq balansı — yalnız mud düzgün axın sürəti və təzyiqlə
              hərəkət etdikdə işləyir. Mud sistemi insan qan dövranına bənzəyir: ürək (nasos)
              maye vurur, damarlar (drill string və annulus) onu daşıyır, hər bir daralma
              (nozzle) təzyiq düşməsi yaradır. Bu balansı düzgün hesablamamaq — ya bit altını
              kifayət qədər təmizləməmək, ya da lazımsız yerə nasos gücünü israf etmək deməkdir.
              Bu dərsdə mud hidravlikasının əsas prinsiplərini və real hesablamalarını
              araşdıracağıq.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Hidravlik dövrənin yolu — səthdən səthə
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Mud-un bir tam dövran zamanı keçdiyi yol yeddi əsas mərhələdən ibarətdir:
            </p>
            <ol className="space-y-2 text-[13.5px] leading-[1.7]" style={{ color: "#C4CEE0" }}>
              {circuitPath.map((c, i) => (
                <li key={c.title}>
                  <span style={{ color: PATH_COLOR, fontWeight: 600 }}>{i + 1}.</span>{" "}
                  <span style={{ color: "#E8DCC8", fontWeight: 600 }}>{c.title}</span> — {c.text}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Sistem boyu təzyiq itkilərinin bölgüsü
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Nasosun yaratdığı ümumi təzyiq (standpipe pressure) dövrənin hər hissəsində
              sürtünmə səbəbindən tədricən itirilir. Mühəndis üçün əsas sual budur: bu itkinin
              nə qədəri faydalı işə (bit-in təmizlənməsinə) sərf olunur, nə qədəri sadəcə
              &quot;itkidir&quot;:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Yer</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Ümumi təzyiqdə payı</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qeyd</th>
                  </tr>
                </thead>
                <tbody>
                  {pressureLosses.map((p) => (
                    <tr key={p.location} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{p.location}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{p.share}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{p.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Standpipe Pressure — sistemin ümumi &quot;nəbzi&quot;
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Rig floor-dakı manometrin göstərdiyi standpipe pressure (SPP), yuxarıdakı bütün
              itkilərin cəmidir. Qazma zamanı driller bu göstərici üzərində daim nəzarət saxlayır
              — çünki ani dəyişikliklər əhəmiyyətli diaqnostik məlumat verir: SPP-nin qəflətən
              enməsi çox vaxt nozzle-un yuyulub-genişlənməsini (washout) və ya drill string-də
              deşilməni göstərir, SPP-nin qəflətən qalxması isə bit-in tıxanmasını (bit balling)
              və ya nozzle-un tıxanmasını göstərə bilər. Bu göstərici sadə bir rəqəm olsa da,
              driller üçün ilk xəbərdarlıq siqnalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              4. Bit Nozzle Hidravlikası
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Nozzle-lar bit gövdəsindəki kiçik dəliklərdir — mud onlardan keçərkən kəsik sahəsi
              kəskin azaldığı üçün sürət dramatik artır (adətən 300–500+ ft/s). Bu yüksək sürətli
              jet iki iş görür: birincisi, bit altına mexaniki zərbə (impact force) ötürərək
              qırıntıların bit səthindən ayrılmasına kömək edir; ikincisi, qırıntıları dərhal
              annulusa apararaq bit-in təkrar-qazması (regrinding) ehtimalını azaldır. Nozzle
              ölçüsü adətən 1/32 düym vahidlərində ifadə olunur (məs. &quot;12&quot; = 12/32″ =
              0.375″) və bit-lər ümumiyyətlə 2-3 nozzle daşıyır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hidravlik optimallaşdırma meyarları
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Nozzle ölçüləri seçilərkən iki fərqli fəlsəfə tətbiq oluna bilər — hər ikisi
              nasos gücünün nə qədərinin bit-ə ayrılacağını fərqli hesablayır:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {optimizationCriteria.map((o) => (
                <div key={o.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{o.name}</p>
                  <p className="text-[13px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{o.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#E8B33D14", border: "1px solid #E8B33D40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#E8B33D" }}>
              Təhlükəsizlik xəbərdarlığı
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Standpipe manifoldundakı yüksək təzyiqli (bəzən 5,000+ psi) birləşmələr düzgün
              bərkidilməzsə, təzyiq altında ani sökülərək ətrafdakı heyət üçün ciddi zərbə və
              yaralanma riski yaradır. Mud pompaları həmişə işlək relief (pressure relief)
              valve ilə təchiz olunmalı və manifold birləşmələri hər növbə başlanğıcında vizual
              yoxlanılmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              6. Annular Velocity və Hole Cleaning
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Bit nozzle-larından çıxan mud öz vəzifəsini annulusda davam etdirir — qırıntıları
              səthə qədər daşımalıdır. Bunun üçün annular velocity (AV) — mud-un annulus
              daxilində yuxarı hərəkət sürəti — kifayət qədər yüksək olmalıdır. Ümumi qayda
              olaraq, şaquli intervallarda minimum 100–150 ft/dəq AV tələb olunur, horizontal
              və yüksək bucaqlı intervallarda isə qırıntılar aşağı divara çökmə meylində
              olduğundan tələb daha da yüksəkdir. AV çox aşağı olarsa, qırıntılar annulusda
              yığılaraq torque artımına, sürüklənməyə (drag) və nəticədə stuck pipe-a (2.5.1-də
              görəcəyik) səbəb ola bilər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              7. ECD — Equivalent Circulating Density
            </h2>
            <p className="text-[14px] leading-[1.75]">
              2.3.1-də gördüyümüz mud weight window statik (dövran olmayan) şəraitə əsaslanır.
              Amma dövran zamanı annulusdakı sürtünmə əlavə təzyiq yaradır — bu əlavə təzyiqi
              nəzərə alan effektiv sıxlığa <strong>ECD (Equivalent Circulating Density)</strong>
              deyilir. ECD statik mud weight-dən həmişə yüksəkdir və dar mud weight window-a
              (xüsusən dərin, HPHT quyularda) malik intervallarda ECD-nin fracture həddini
              aşmaması üçün pump sürəti diqqətlə idarə olunmalıdır — çox yüksək flow rate hole
              cleaning-i yaxşılaşdırsa da, ECD-ni tələb olunan həddən artıra bilər.
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
              Aşınmış (washed-out) nozzle SPP-də görünən azalma ilə özünü göstərsə də, real
              risk gözdən qaça bilər: azalan bit pressure drop ECD-ni də azaldır və dar mud
              weight window-lu quyularda bu, gözlənilməz kick riskini artıra bilər. Hər SPP
              anomaliyasında dövran dərhal dayandırılıb səbəb müəyyənləşdirilməlidir, sadəcə
              nasos sürəti artırılaraq &quot;kompensasiya&quot; edilməməlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Hesablama — Nozzle sürəti, bit təzyiq düşməsi və HHP
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              2.3.1-dəki mud weight seçimini (12.8 ppg, trip margin ilə) istifadə edərək, üç
              nozzle-lu (12, 12, 11 — 32-lik vahiddə) bir bit üçün hidravlika hesablayaq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: MW = 12.8 ppg (2.3.1-dən), Q = 500 gpm, nozzle diametrləri = 12/32″, 12/32″, 11/32″
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Ümumi nozzle sahəsi (At) = 0.7854 × (0.375² + 0.375² + 0.344²) = 0.314 in²</p>
                <p>Nozzle sürəti = 0.32 × Q / At = 0.32 × 500 / 0.314 = 510 ft/san</p>
                <p>Bit təzyiq düşməsi = MW × Q² / (12,042 × At²) = 12.8 × 500² / (12,042 × 0.314²) ≈ 2,699 psi</p>
                <p>HHP (bit-də) = (ΔPb × Q) / 1,714 = (2,699 × 500) / 1,714 ≈ <span style={{ color: PATH_COLOR }}>787 HP</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bit-də sərf olunan 787 HP güclü jet enerjisi yaradır. Əgər ümumi nasos
                gücü (surface HHP) təxminən 1,200 HP-dirsə, bit payı ~65%-ə uyğun gəlir — bu,
                maksimum hidravlik at gücü (max HHP) meyarına uyğundur və orta sərtlikdə
                formasiyalar üçün effektiv hole cleaning təmin edir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              9. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan (BP)", text: "Uzun extended-reach horizontal intervallarda annular velocity-ni kifayət qədər saxlamaq üçün xüsusi hidravlik modelləmə aparılır, çünki uzun yatay hissədə qırıntı çökməsi riski çox yüksəkdir." },
                { name: "Şimal dənizi HPHT quyuları, Norveç", text: "Dar mud weight window-lu HPHT quyularda ECD idarəsi kritik məsələdir — bəzi əməliyyatlarda managed pressure drilling (MPD) sistemi ECD-ni daha dəqiq tənzimləmək üçün tətbiq olunur." },
                { name: "Permian Basin, ABŞ", text: "Yüksək flow rate tələb edən uzun laterallarda böyük ölçülü nasoslar (triplex, 2,200+ HP) istifadə olunur ki, həm hole cleaning, həm də HHP optimallaşdırması təmin edilsin." },
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
              <li>• Nasos təzyiqinin ~50-65%-i qəsdən bit nozzle-larında itirilir — bu, dizayn edilmiş faydalı itkidir</li>
              <li>• SPP-nin qəflətən dəyişməsi (washout, tıxanma) üçün ilk diaqnostik siqnaldır</li>
              <li>• Nozzle seçimi max HHP (~65% bit payı) və ya max Impact Force (~48% bit payı) meyarına görə aparılır</li>
              <li>• ECD statik mud weight-dən yüksəkdir və dar mud weight window-larda diqqətlə idarə olunmalıdır</li>
              <li>• Annular velocity qırıntı daşınmasını təmin edir — aşağı AV stuck pipe riskini artırır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling/drilling-fluid"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Drilling Fluid (Mud)
          </Link>
          <Link
            href="/learn/drilling/directional-drilling-basics"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Directional Drilling Əsasları
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}