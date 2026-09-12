"use client";
import Link from "next/link";

const PATH_COLOR = "#E8B33D";

const corrosionTypes = [
  { name: "Şirin Korroziya (CO₂)", desc: "Karbon dioksidin su ilə reaksiyaya girərək karbon turşusu yaratması və polad üzərində lokal aşınma", best: "Yüksək CO₂ tərkibli, orta-yüksək su kəsilməsi olan quyularda ən çox rast gəlinir" },
  { name: "Turş Korroziya (H₂S)", desc: "Hidrogen sulfidin poladla reaksiyaya girməsi — həm ümumi aşınma, həm də hidrogen kövrəkləşməsi (sulfide stress cracking) riski yaradır", best: "Turş qaz kollektorları, xüsusi materiallar (NACE MR0175 standartı) tələb edir" },
  { name: "Oksigen Korroziyası", desc: "Səthdən quyuya təsadüfən daxil olan oksigenin çox aqressiv lokal korroziya yaratması", best: "Su vurma sistemləri, əməliyyat gigienasının pozulduğu hallarda" },
  { name: "Mikrobioloji Korroziya (MIC)", desc: "Sulfat-reduksiya edən bakteriyaların metabolik fəaliyyəti nəticəsində yaranan lokal korroziya", best: "Aşağı sürətli axın zonaları, dayanmış (stagnant) su cibləri" },
];

export default function CorrosionMaterialsManagementLesson() {
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
              5.4.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              İstismar İdarəsi
            </span>
            <span
              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase tracking-wide"
              style={{ background: "rgba(255,255,255,0.05)", color: "#6B82A0" }}
            >
              Son Dərs
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Korroziya və Materialların İdarəsi
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Bir quyunun bütün həyat dövrü — və onun son fəsli
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Bu kursda bir quyunun bütün ömrünü izlədik: Geologiya bölməsində kollektoru
              kəşf etdik, Qazma bölməsində quyunu yerin dərinliklərinə çatdırdıq, Well
              Logging ilə onun nə "gizlətdiyini" qiymətləndirdik, Rezervuar bölməsində
              nə qədər ehtiyat olduğunu hesabladıq və Hasilat bölməsində, nəhayət, bu
              ehtiyatı səthə çıxarmağı öyrəndik. Amma hər bir metal boru, hər bir tubing,
              hər bir casing — vaxt keçdikcə kimyəvi mühitlə mübarizə aparır. Bu kursun son
              dərsi, məhz bu mübarizəni — kollektorun tükənməsi ilə paralel gedən materialın
              tükənməsini — və onun necə idarə olunduğunu əhatə edir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Korroziya nə üçün production-a xasdır?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Neft-qaz istehsalında istifadə olunan flüidlər demək olar heç vaxt "təmiz"
              deyil — tərkibində CO₂, H₂S, duzlu su (brine) və bəzən oksigen olur. Bu
              komponentlər, xüsusilə su ilə birləşdikdə, metal səthlərdə elektrokimyəvi
              reaksiyalar yaradaraq materialın tədricən "yeyilməsinə" səbəb olur. Digər
              bölmələrdən fərqli olaraq (məsələn Qazma bölməsində korroziya qısamüddətli
              maraq doğurur), Production-da flüid illərlə eyni boru ilə təmasda olduğu üçün
              korroziya uzunmüddətli, kumulyativ bir problemə çevrilir — buna görə material
              seçimi və monitorinq production mühəndisliyinin daimi vəzifəsidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Əsas korroziya növləri
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Növ</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təsvir</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tipik şərait</th>
                  </tr>
                </thead>
                <tbody>
                  {corrosionTypes.map((c) => (
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
              3. Material seçimi: karbon poladdan CRA-ya qədər
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Ən sadə və ucuz seçim — karbon polad — kifayət qədər aqressiv olmayan
              mühitlərdə kimyəvi inhibisiya ilə birlikdə istifadə edilə bilir. Amma yüksək
              CO₂/H₂S tərkibli, yüksək temperaturlu şəraitdə <strong>Corrosion Resistant
              Alloy (CRA)</strong> materiallar (məsələn duplex paslanmayan polad, 13Cr, ya
              da nikel əsaslı ərintilər) istifadə olunur. CRA materialları öz təbii oksid
              təbəqəsi sayəsində korroziyaya çox davamlıdır, amma qiyməti karbon poladdan
              5-10 dəfə baha ola bilər — buna görə material seçimi hər zaman dəqiq flüid
              analizi və uzunmüddətli iqtisadi qiymətləndirmə tələb edir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Korroziyanın idarə edilməsi üsulları
            </h2>
            <div className="space-y-2.5">
              {[
                "Kimyəvi korroziya inhibitorlarının davamlı və ya dövri inyeksiyası (film-forming inhibitorlar)",
                "Katodik qorunma (cathodic protection) — xüsusilə səth avadanlığı və dəniz altı strukturlar üçün",
                "Korroziya-davamlı örtüklər (internal coating, cladding) — karbon poladın daxili səthini qorumaq üçün",
                "Korroziya kuponları (corrosion coupons) və elektrik müqaviməti probları ilə mütəmadi monitorinq",
                "Flüid tərkibinin (su kəsilməsi, pH, oksigen tərkibi) mütəmadi laboratoriya analizi",
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
              <strong>Karbon Polad + İnhibitor vs Korroziya-Davamlı Ərinti (CRA):</strong>{" "}
              Karbon polad + inhibitor kombinasiyası xeyli aşağı başlanğıc kapital xərci
              tələb edir və mövcud tədarük zəncirində asanlıqla əldə edilir, amma inhibitor
              proqramının uğuru davamlı əməliyyat intizamından (düzgün konsentrasiya,
              fasiləsiz inyeksiya) asılıdır — inhibitor sistemi nasazlaşarsa, korroziya
              sürəti çox tez arta bilər. CRA materialı isə əməliyyat müdaxiləsi olmadan
              öz-özünə davamlıdır və uzunmüddətli etibarlılıq təmin edir, amma ilkin
              investisiya xeyli yüksəkdir və bəzi ərintilər çatdırılma müddəti baxımından
              məhdud ola bilər. Seçim, kollektorun kimyəvi aqressivliyi, quyunun
              planlaşdırılan istismar müddəti və CAPEX/OPEX balansından asılıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — CO₂ Korroziya Sürətinin Sadələşdirilmiş Qiymətləndirilməsi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              De Waard-Milliams yanaşmasının sadələşdirilmiş formasından istifadə edərək,
              CO₂ parsial təzyiqinə əsasən təxmini korroziya sürətini qiymətləndirək:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: ümumi quyu təzyiqi = 80 bar, qaz fazasında CO₂ molyar payı = 5%,
                empirik əmsal k = 8 (mm/il vahidində, sadələşdirilmiş)
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                P_CO2 = P_ümumi × y_CO2 &nbsp;&nbsp;|&nbsp;&nbsp; Korroziya sürəti ≈ k × √P_CO2
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>P_CO2 = 80 × 0.05 = 4 bar</p>
                <p>Korroziya sürəti ≈ 8 × √4 = 8 × 2 = <span style={{ color: PATH_COLOR }}>≈ 16 mm/il (inhibisiyasız)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: inhibisiya olmadan bu şəraitdə divar qalınlığı ildə təxminən 16 mm
                aşına bilər — bu, sənaye standartlarına görə (adətən 0.1-0.25 mm/il qəbul
                edilən sayılır) son dərəcə yüksək bir sürətdir. Bu nəticə, effektiv
                inhibisiya proqramının (adətən 90%+ effektivlik) və ya CRA materialının
                zəruri olduğunu aydın göstərir — inhibisiya ilə real korroziya sürəti bu
                rəqəmin xeyli aşağısına endirilə bilər.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "CO₂ korroziyasının idarə edilməsi üçün geniş miqyaslı inhibitor inyeksiya proqramları və mütəmadi korroziya monitorinqi tətbiq olunur." },
                { name: "Kashagan sahəsi, Qazaxıstan", text: "Son dərəcə yüksək H₂S tərkibi səbəbindən NACE standartlarına uyğun xüsusi metallurgiya və CRA materialları geniş istifadə olunur." },
                { name: "Rumaila sahəsi, İraq", text: "Yüksək su kəsilməsi olan yetkin quyularda korroziya kuponları vasitəsilə mütəmadi monitorinq proqramı tətbiq edilir." },
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
              <li>• Korroziya CO₂, H₂S, oksigen və mikrobioloji fəaliyyət nəticəsində yarana bilər</li>
              <li>• Material seçimi (karbon polad vs CRA) flüidin aqressivliyi və istismar müddətindən asılıdır</li>
              <li>• İnhibisiya, katodik qorunma, örtüklər və monitorinq əsas idarəetmə üsullarıdır</li>
              <li>• Korroziya sürəti CO₂ parsial təzyiqi ilə birbaşa əlaqəlidir — inhibisiya bunu 90%+ azalda bilər</li>
              <li>• Doğru material və inhibisiya strategiyası CAPEX/OPEX balansına əsasən seçilir</li>
            </ul>
          </section>

          <section
            className="rounded-2xl px-6 py-6 text-center"
            style={{ background: `linear-gradient(135deg, ${PATH_COLOR}14, rgba(255,255,255,0.02))`, border: `1px solid ${PATH_COLOR}33` }}
          >
            <p className="text-[11px] font-mono uppercase tracking-wide mb-2" style={{ color: PATH_COLOR }}>
              Təbriklər
            </p>
            <p className="text-[14px] leading-[1.75]" style={{ color: "#D6E0F0" }}>
              Bununla Hasilat (Production & Completion) path-ını — və onunla birlikdə
              LearntoDig-in bütün 5 path-ını tamamladınız. Geologiya ilə kəşf etdiyiniz
              kollektordan başlayaraq, Qazma ilə ona çatdınız, Well Logging ilə onu
              qiymətləndirdiniz, Rezervuar ilə nə qədər ehtiyat olduğunu hesabladınız və
              Hasilat ilə bu ehtiyatı səthə çıxarıb idarə etməyi öyrəndiniz. Bir quyunun
              bütün həyat dövrünü — kəşfdən materialların tükənməsinə qədər — artıq tam
              başa düşürsünüz.
            </p>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/production/workover-operations"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Workover Əməliyyatları
          </Link>
          <Link
            href="/lessons"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Kursu Tamamladın!
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}