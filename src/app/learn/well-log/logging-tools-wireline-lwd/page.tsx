"use client";
import Link from "next/link";

const PATH_COLOR = "#3B9BD8";

const toolCompare = [
  { param: "Məlumat alınma vaxtı", wireline: "Quyu qazılıb qurtardıqdan sonra, ayrıca run", lwd: "Qazma zamanı, real-time" },
  { param: "Ötürmə üsulu", wireline: "Elektrik kabel (birbaşa)", lwd: "Mud-pulse telemetriya (yavaş)" },
  { param: "Dərinlik dəqiqliyi", wireline: "Çox yüksək (kabel ölçüsü)", lwd: "Nisbətən aşağı (drillstring uzanması)" },
  { param: "Horizontal quyularda tətbiq", wireline: "Məhdud (özgəlmə çətinliyi)", lwd: "Geniş istifadə olunur" },
  { param: "Əsas məqsəd", wireline: "Dəqiq petrofizik qiymətləndirmə", lwd: "Geosteering + real-time monitorinq" },
];

export default function LoggingToolsWirelineLwdLesson() {
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
          href="/learn/well-log"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6"
          style={{ color: "#3D5570" }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Quyu Logging
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
              style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
            >
              3.1.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Logging Əsasları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Log Alətləri: Wireline vs LWD
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              İki fotoçəkiliş üsulu təsəvvür et
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Fərz et ki, bir binanın tikinti prosesini sənədləşdirmək istəyirsən. Bir üsul —
              bina tikilib qurtardıqdan sonra hər mərtəbəyə xüsusi kamera ilə gəzib ətraflı şəkil
              çəkməkdir: yavaş, amma çox dəqiq. Digər üsul — kranın özünə kamera quraşdırıb, tikinti
              zamanı davamlı görüntü almaqdır: daha az dəqiq, amma dərhal əlində olur və problemi
              anında görürsən. Well logging-də də məhz bu iki fəlsəfə mövcuddur — <strong>Wireline</strong>{" "}
              və <strong>LWD (Logging While Drilling)</strong>. Bu dərsdə hər ikisinin nə vaxt və
              niyə seçildiyini öyrənəcəyik.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Wireline logging nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Wireline — 3.1.1-də öyrəndiyimiz klassik üsuldur: quyu qazılıb qurtardıqdan sonra,
              qazma qurğusu (drillstring) çıxarılır, log alətləri polad kabellə asılaraq quyuya
              endirilir və səthə çəkilərkən ölçmə aparılır. Kabel həm alətə enerji verir, həm də
              ölçülən siqnalı real vaxtda səthdəki qeydiyyat sisteminə ötürür. Bu üsulun əsas
              üstünlüyü dəqiqlikdir — kabelin uzunluğu dərinliyi santimetr həssaslığı ilə göstərir,
              ona görə də ən dəqiq petrofizik hesablamalar məhz wireline məlumatına əsaslanır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. LWD (Logging While Drilling) nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              LWD-də log alətləri qazma kəllə dəstinin (bottom hole assembly) içərisinə
              inteqrasiya olunur və qazma prosesi davam edərkən eyni zamanda ölçmə aparır. Ayrıca
              alət düşürmə əməliyyatına ehtiyac yoxdur — mühəndis süxuru demək olar ki, qazıldığı
              andaca &quot;görür&quot;. Bu, xüsusilə yüksək riskli və ya dayanıqsız quyularda vacibdir,
              çünki quyu açıq qalma müddəti azalır və divar çökməsi riski aşağı düşür. LWD həmçinin
              horizontal və yüksək bucaqlı quyularda demək olar ki, yeganə praktik seçimdir, çünki
              wireline aləti belə quyularda öz ağırlığı ilə irəliləyə bilmir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Məlumat necə səthə çatır: Mud-pulse telemetriya
            </h2>
            <p className="text-[14px] leading-[1.75]">
              LWD-nin ən maraqlı hissəsi məlumatın necə yer səthinə ötürülməsidir — axı orada
              kabel yoxdur. Həll yolu <strong>mud-pulse telemetriya</strong>dır: alət qazma
              məhlulu (drilling mud) axınında kiçik təzyiq dəyişiklikləri (pulslar) yaradır, bu
              pulslar boru daxilində səthə qədər gedir və orada təzyiq sensoru ilə oxunub rəqəmsal
              siqnala çevrilir. Bu üsul etibarlıdır, amma çox yavaşdır — adətən saniyədə bir neçə
              bit sürətlə. Ona görə LWD real-time olaraq yalnız məhdud, seçilmiş parametrləri
              göndərir; tam yüksək-həssaslıqlı log məlumatı isə alət səthə çıxarıldıqdan sonra
              yaddaşdan (memory) endirilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Wireline və LWD — birbaşa müqayisə
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Parametr</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Wireline</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>LWD</th>
                  </tr>
                </thead>
                <tbody>
                  {toolCompare.map((r) => (
                    <tr key={r.param} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{r.param}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{r.wireline}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{r.lwd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hansı üsul nə vaxt seçilir?
            </h2>
            <div className="space-y-2.5">
              {[
                "Vertikal, stabil quyu, maksimum dəqiqlik lazımdırsa → Wireline",
                "Horizontal/yüksək bucaqlı quyu, alət özgəlmə çətinliyi varsa → LWD",
                "Divar dayanıqsızlığı yüksək, quyunu açıq saxlamaq riskli olarsa → LWD",
                "Geosteering (qazma istiqamətini real-time düzəltmək) lazımdırsa → LWD",
                "Son, təsdiqedici petrofizik hesabat üçün → Wireline (və ya hər ikisi birlikdə)",
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

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              6. Dəqiqlik fərqi haradan gəlir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              LWD ölçmələri wireline-a nisbətən bir qədər az dəqiq sayılır, çünki bir neçə əlavə
              amil işə qarışır: alət qazma kəllə dəstinin fırlanan hissəsindədir və vibrasiya
              siqnala təsir edir, drillstring-in uzanması dərinlik hesablamasında kiçik xəta yarada
              bilər, həmçinin ölçmə həmin an hələ formalaşmaqda olan quyu divarında aparılır (mud
              invasion tam oturmamış olur). Bununla belə, müasir LWD alətləri texnoloji cəhətdən
              çox inkişaf edib və bir çox layihədə artıq wireline-ı əvəz edə bilən dəqiqliyə
              çatıb — xüsusilə resistivity və gamma ray ölçmələrində.
            </p>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: PATH_COLOR + "14", border: `1px solid ${PATH_COLOR}40` }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: PATH_COLOR }}>
              Tipik Log Cavabı
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Eyni gil təbəqəsində iki üsulun Gamma Ray oxunuşu arasındakı tipik fərq:{" "}
              <strong>Wireline GR</strong> (mud invasion tam oturduqdan sonra) adətən{" "}
              <strong>100–150 API</strong> göstərir, <strong>LWD GR</strong> isə (invasion hələ tam
              formalaşmadığı üçün) eyni təbəqədə <strong>90–140 API</strong> aralığında, bir qədər
              aşağı sürüşmüş qiymət verə bilər. Fərq adətən 5–10 API vahidini keçmir və interpretasiya
              zamanı nəzərə alınmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Hesablama — Eyni İntervalı Örtmək Üçün Lazım Olan Vaxt
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              3.1.1-də wireline ilə 3200 metrlik interval üçün logging vaxtını hesablamışdıq
              (t = D / v, v = 550 m/saat, nəticə ≈ 5.8 saat). LWD-də isə eyni formula işləyir, amma
              sürət (v) artıq kabel sürəti deyil, qazmanın irəliləmə sürətidir (ROP — Rate of
              Penetration), çünki LWD ilə &quot;logging etmək&quot; elə həmin intervalı qazımaq
              deməkdir:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: D = 3200 m, ROP = 15 m/saat (orta hesabla dərin quyu üçün)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>t = D / ROP</p>
                <p>t = 3200 / 15 ≈ <span style={{ color: PATH_COLOR }}>213 saat (~8.9 gün)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə göz qabağındadır: LWD, wireline-a nisbətən (5.8 saat) həmin intervalı
                &quot;örtmək&quot; üçün xeyli çox vaxt aparır — çünki əslində LWD ayrıca əməliyyat
                deyil, qazmanın özüdür. Lakin əvəzində bu 8.9 günlük müddət artıq boşa getmir, çünki
                quyu həm qazılır, həm də eyni zamanda log alınır. Wireline isə əlavə, ayrıca 5.8
                saatlıq rig vaxtı tələb edir. Seçim sürətlə əlavə xərc arasında balansdır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Şahdəniz yatağı, Xəzər dənizi, Azərbaycan", text: "BP/SOCAR-ın operatorluq etdiyi Şahdəniz-də horizontal quyularda azimutal LWD resistivity alətləri real-time geosteering üçün geniş istifadə olunur." },
                { name: "Permian hövzəsi, ABŞ", text: "Uzun horizontal laterallar (3–4 km) səbəbindən bu hövzədə əksər operatorlar wireline əvəzinə demək olar ki, tam LWD dəstinə keçib." },
                { name: "Ekofisk yatağı, Norveç sektoru, Şimal dənizi", text: "ConocoPhillips-in idarə etdiyi Ekofisk-də yüksək təzyiqli, çökən çatlaqlı əhəngdaşı kollektorunda wireline logging hələ də dəqiq petrofizik qiymətləndirmə üçün əsas mənbədir." },
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
              <li>• Wireline — quyu qazılıb qurtardıqdan sonra kabellə aparılan, ən dəqiq üsul</li>
              <li>• LWD — qazma zamanı, drillstring daxilində aparılan, real-time üsul</li>
              <li>• LWD məlumatı mud-pulse telemetriya ilə yavaş ötürülür, tam məlumat isə sonra yaddaşdan alınır</li>
              <li>• Horizontal və dayanıqsız quyularda LWD, dəqiqlik tələb olunan hesablamalarda isə wireline üstünlük təşkil edir</li>
              <li>• Eyni interval üçün LWD müddəti ROP-a bağlıdır, wireline müddəti isə kabel sürətinə — bu iki fərqli iqtisadi məntiqdir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/well-log/intro-to-well-logging"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Well Logging-ə Giriş
          </Link>
          <Link
            href="/learn/well-log/gamma-ray-resistivity-logs"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Gamma Ray və Resistivity Logs
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
