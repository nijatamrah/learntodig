"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const stuckPipeTypes = [
  { name: "Differential Sticking", cause: "Yüksək təzyiq fərqi + keçirici formasiya", mech: "Pipe mud cake üzərinə &quot;yapışır&quot;, hərəkətsiz qalanda vakuum effekti yaranır", fix: "Dərhal hərəkət (spot pill, jarring), uzun dayanmadan qaçınmaq" },
  { name: "Mechanical (Packoff/Bridging)", cause: "Qeyri-sabit divar, kifayət qədər hole cleaning olmaması", mech: "Qırıntı və ya divar materialı annulusda yığılaraq string-i fiziki sıxır", fix: "Dövranı davam etdirmək, reaming, hərəkət ilə azad etməyə çalışmaq" },
  { name: "Key Seating", cause: "Dogleg zonasında uzunmüddətli sürtünmə", mech: "String divarda dar, dərin bir kanal (key seat) yaradır, tool joint bu kanala ilişir", fix: "Reaming ilə kanalı genişləndirmək, əvvəlcədən DLS-i məhdudlaşdırmaq" },
  { name: "Wellbore Geometry", cause: "Dar quyu, ledge, yatırılmamış junk", mech: "BHA fiziki olaraq dar keçiddən keçə bilmir", fix: "Geri çəkilmə, reaming, problemli zonanın yenidən işlənməsi" },
];

const kickIndicators = [
  { name: "Mud Pit Həcminin Artması", note: "Formasiyadan quyuya əlavə maye/qaz daxil olması pit səviyyəsini gözlənilmədən qaldırır — ən erkən və etibarlı əlamət" },
  { name: "Flow Rate ilə Pump Rate Uyğunsuzluğu", note: "Nasos sabit sürətlə işləyərkən çıxan axının artması əlavə mənbədən (kick) gəldiyini göstərir" },
  { name: "Drilling Break (ROP-un Qəflətən Artması)", note: "Yüksək məsaməli/təzyiqli zona ilə qarşılaşma çox vaxt ROP-un ani sıçrayışı ilə müşayiət olunur" },
  { name: "Standpipe Pressure Dəyişikliyi", note: "Yüngül formasiya mayesi (qaz) annulusa qarışdıqca dövran sistemi təzyiqi gözlənilməz dəyişir" },
  { name: "Gas Ölçmələrinin Artması (Trip Gas)", note: "Səthə çıxan mud-da qaz konsentrasiyasının artması formasiya təzyiqinin balansdan çıxdığını göstərə bilər" },
];

const wellControlSteps = [
  { title: "Flow-Check", text: "Pump dayandırılır, quyu axını izlənilir — əgər mud axmağa davam edirsə, bu, kickin təsdiqidir" },
  { title: "Quyunu Bağlamaq (Shut-In)", text: "BOP (adətən annular və ya uyğun ram) dərhal bağlanır, quyu tam izolyasiya olunur" },
  { title: "Təzyiqləri Qeyd Etmək", text: "Shut-in drill pipe pressure (SIDPP) və shut-in casing pressure (SICP) ölçülür — bu, formasiya təzyiqini hesablamaq üçün əsasdır" },
  { title: "Kill Sheet Hazırlamaq", text: "Ölçülmüş təzyiqlər əsasında yeni, kifayət qədər ağır mud (kill mud) sıxlığı hesablanır" },
  { title: "Well Kill Prosedurunu Aparmaq", text: "Driller's Method və ya Wait & Weight kimi standart metodlarla ağır mud dövr etdirilərək formasiya təzyiqi tarazlanır" },
];

export default function DrillingProblemsLesson() {
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
              2.5.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Problemlər, Təhlükəsizlik və İqtisadiyyat
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Qazma Problemləri: Stuck Pipe, Kick, Lost Circulation
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Nə vaxt &quot;normal qazma&quot; anormal olmağa başlayır?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              İndiyə qədər gördüyümüz hər mövzu — drill string (2.1.3), casing (2.2.1), mud
              (2.3.1), hidravlika (2.3.2), torque & drag (2.4.2) — bir-birinə sıx bağlı bir
              sistemin hissələridir. Bu sistemdən hər hansı biri balansdan çıxanda, nəticə üç
              böyük problem kateqoriyasından birinə çevrilir: string quyuda ilişib qalır
              (stuck pipe), formasiyadan nəzarətsiz axın quyuya daxil olur (kick), ya da əksinə,
              mud formasiyaya itirilir (lost circulation). Bu üç problem sənayenin ən çox vaxt
              və pul itirdiyi hadisələrdir — buna görə onları erkən tanımaq mühəndisin ən vacib
              bacarığıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Stuck Pipe — dörd əsas növ
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Stuck pipe termini geniş bir kateqoriyadır — səbəbi düzgün diaqnoz etmək azad
              etmə strategiyasını birbaşa müəyyən edir:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Növ</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Səbəb</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Mexanizm</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Həll yanaşması</th>
                  </tr>
                </thead>
                <tbody>
                  {stuckPipeTypes.map((s) => (
                    <tr key={s.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{s.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{s.cause}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{s.mech}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{s.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. Differential Sticking — ən sinsi növ
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Differential sticking o zaman baş verir ki, 2.3.1-də gördüyümüz mud cake (mud-un
              keçirici formasiya üzərində yaratdığı nazik təbəqə) üzərinə string söykənir və
              bir müddət hərəkətsiz qalır — məs. connection zamanı. Mud sütununun hidrostatik
              təzyiqi formasiya təzyiqindən yüksək olduğu üçün (normal, təhlükəsiz vəziyyət),
              string mud cake-ə &quot;vakuum kimi yapışır&quot;. Nə qədər çox vaxt keçirsə, bu
              yapışma bir o qədər güclənir, çünki təmas sahəsi böyüyür. Ən effektiv qarşısıalma
              — connection-ları mümkün qədər qısa etmək və uzun statik fasilələrdən qaçınmaqdır.
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
              Stuck pipe azad etmə cəhdləri zamanı (məsələn jarring — zərbə vasitəsilə silkələmə)
              drill string-ə ani, yüksək gərginlik tətbiq olunur. Düzgün hesablanmamış cəhd
              pipe-ın qopmasına (parting) səbəb ola bilər — bu, həm əlavə fishing əməliyyatı,
              həm də rig floor-da nəzarətsiz enerji sərbəstləşməsi riski yaradır. Bütün azad
              etmə cəhdləri əvvəlcədən hesablanmış tension/torque limitləri daxilində aparılmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Kick — formasiyanın quyuya &quot;hücumu&quot;
            </h2>
            <p className="text-[14px] leading-[1.75]">
              2.3.1-dəki mud weight window-u xatırlayaq: mud-un hidrostatik təzyiqi formasiya
              təzyiqindən aşağı düşərsə, formasiya mayesi (su, neft, ya da ən təhlükəlisi qaz)
              quyuya daxil olmağa başlayır — buna kick deyilir. Kick-in ən çox rast gəlinən
              səbəbləri: mud weight-in kifayət qədər olmaması, swab effekti (2.2.1-də qeyd
              etdik), ya da gözlənilməz yüksək təzyiqli zona ilə qarşılaşma. Kick vaxtında aşkar
              edilib nəzarət altına alınmazsa, o, idarəolunmaz axına — <strong>blowout</strong>-a
              — çevrilə bilər ki, bu, sənayenin ən ciddi fəlakət ssenarisidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Kick-in erkən əlamətləri
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Rig heyəti daim aşağıdakı göstəriciləri izləyir — bunlardan hər hansı biri
              gözlənilmədən dəyişərsə, dərhal flow-check aparılmalıdır:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {kickIndicators.map((k) => (
                <div key={k.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{k.name}</p>
                  <p className="text-[13px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{k.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Well Control proseduru — kick aşkar ediləndə addımlar
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              2.2.3-də gördüyümüz BOP sistemi məhz bu ardıcıllıqla işə düşür:
            </p>
            <ol className="space-y-2 text-[13.5px] leading-[1.7]" style={{ color: "#C4CEE0" }}>
              {wellControlSteps.map((s, i) => (
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
              Kick zamanı H₂S tərkibli qaz formasiyadan gələrsə (2.3.1-də qeyd etdiyimiz kimi),
              nəzarət prosesi ikiqat təhlükəli olur — həm təzyiq, həm toksik qaz riski eyni anda
              idarə olunmalıdır. Bu tip quyularda well control tədbirlərinə əlavə olaraq H₂S
              üçün xüsusi təhlükəsizlik protokolu (qaz detektorları, tənəffüs aparatları, külək
              istiqamətinə görə təxliyə planı) əvvəlcədən hazır olmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              6. Lost Circulation — mud-un formasiyaya itirilməsi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Kick-in tam əksinə, lost circulation mud-un formasiyaya axıb getməsidir — çatlı,
              kavernoz (boşluqlu) və ya son dərəcə keçirici zonalarda (məs. naturel çatlı
              əhəngdaşı) rast gəlinir. Səbəb bəzən təbii (formasiyanın strukturu), bəzən isə
              induksiya olunmuş (yəni ECD, 2.3.2-də gördüyümüz kimi, fracture təzyiqini aşdığı
              üçün formasiya süni olaraq çatlayır). Nəticə: mud pit səviyyəsi azalır, hidrostatik
              təzyiq düşür — bu da paradoksal olaraq eyni quyuda kick riskini artıra bilər, çünki
              iki problem çox vaxt zəncirvari əlaqəlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              7. Lost Circulation-un idarə edilməsi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              İtki dərəcəsindən asılı olaraq fərqli yanaşmalar tətbiq olunur: kiçik itkilərdə
              (seepage) 2.3.1-də gördüyümüz lost circulation material (LCM) — lif, mica,
              qabıqcıqlar — mud-a əlavə edilərək çatları tıxamağa çalışılır. Orta itkilərdə daha
              qatı LCM pill-i hədəf zonaya yönləndirilərək pump edilir. Tam itkidə (mud səthə
              heç qayıtmır) isə bəzən sement plug qoyularaq problemli zona tam izolyasiya olunur
              və quyu ya sidetrack edilir, ya da yeni strategiya ilə davam etdirilir. Hər
              vəziyyətdə mühəndis itkinin sürətini (bbl/hr) izləyərək ən uyğun həlli seçir.
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
              Lost circulation zamanı pit səviyyəsinin azalması ilə eyni vaxtda formasiyadan
              kick gəlməsi mümkündür (&quot;underground blowout&quot; riski) — çünki hidrostatik
              təzyiq artıq zəiflədilib. Bu ikili ssenari standart kick əlamətlərini
              gizlədə bilər, buna görə lost circulation zamanı heyət eyni zamanda kick
              göstəricilərini də ehtiyatla izləməyə davam etməlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Hesablama — Kick həcmi və Kill Mud sıxlığı
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              2.3.1-dəki 9,000 ft intervalında kick baş verdiyini fərz edək — SIDPP ölçmələri
              əsasında lazımi kill mud sıxlığını hesablayaq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: TVD = 9,000 ft, cari mud weight = 12.8 ppg (2.3.1-dən), SIDPP = 250 psi
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Formasiya təzyiqi = (0.052 × 12.8 × 9,000) + 250 = 5,990 + 250 = 6,240 psi</p>
                <p>Kill Mud Weight = Formasiya təzyiqi / (0.052 × TVD)</p>
                <p>KMW = 6,240 / (0.052 × 9,000) = <span style={{ color: PATH_COLOR }}>13.33 ppg</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: quyunu təhlükəsiz nəzarətə almaq üçün mud sıxlığı 12.8 ppg-dən 13.33
                ppg-ə qaldırılmalıdır. Vacib qeyd: bu yeni sıxlıq hələ də 2.3.1-dəki mud weight
                window-un (12.50–16.35 ppg) daxilindədir — deməli kill əməliyyatı fracture
                həddini aşmadan həyata keçirilə bilər, əks halda eyni zamanda lost circulation
                riski də yaranardı.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              9. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Macondo hadisəsi, Meksika Körfəzi (2010)", text: "Kick əlamətlərinin vaxtında düzgün şərh edilməməsi (yanlış negative test yozumu) faciəyə gətirib çıxaran əsas amillərdən biri kimi göstərilib — bu hadisə kick monitorinqi standartlarını əsaslı dəyişib." },
                { name: "ACG, Xəzər dənizi, Azərbaycan (BP)", text: "Naturel çatlı karbonat intervallarında lost circulation ehtimalı yüksək olduğundan, bu zonalar üçün əvvəlcədən LCM ehtiyatı və pilot mud dizaynı hazırlanır." },
                { name: "Groningen sahəsi, Niderland", text: "Uzunmüddətli istehsal edən quyularda tükənmiş (depleted) təzyiq zonalarında differential sticking riski xüsusilə yüksəkdir, buna görə bu tip quyularda connection müddəti minimuma endirilir." },
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
              <li>• Stuck pipe-in dörd növü fərqli səbəb və həll strategiyası tələb edir — differential sticking ən sinsi olanıdır</li>
              <li>• Kick-in erkən əlaməti həmişə pit həcmi artımıdır — bu ən etibarlı göstəricidir</li>
              <li>• Well control ardıcıllığı: flow-check → shut-in → təzyiq qeydi → kill sheet → kill prosedur</li>
              <li>• Lost circulation və kick çox vaxt zəncirvari bağlıdır — biri digərinin riskini artıra bilər</li>
              <li>• Kill mud weight həmişə mövcud mud weight window daxilində qalıb-qalmadığı yoxlanılmalıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling/torque-and-drag"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Torque & Drag
          </Link>
          <Link
            href="/learn/drilling/well-control"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Quyu Nəzarəti (Well Control)
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}