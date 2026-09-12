"use client";
import Link from "next/link";

const PATH_COLOR = "#E8B33D";

const flowAssuranceIssues = [
  { name: "Parafin (Wax) Çökməsi", desc: "Temperatur azaldıqca ağır karbohidrogenlərin bərk hala keçərək boru divarına yapışması", best: "Soyuq mühit, uzun ötürücü xətlər, dəniz altı boru kəmərləri" },
  { name: "Hidrat Əmələ Gəlməsi", desc: "Su və qazın yüksək təzyiq/aşağı temperaturda buz-bənzər kristal struktur yaratması", best: "Dərinsu layihələri, qaz-kondensat quyuları" },
  { name: "Asfalten Çökməsi", desc: "Təzyiq düşdükcə ağır, polyar molekulların həlledicilikdən çıxıb çökməsi", best: "Yüksək təzyiqli, asfalten-zəngin neftlər" },
  { name: "Miqyaslanma (Scale)", desc: "Uyğunsuz sular qarışdıqda mineral duzların (CaCO₃, BaSO₄) kristallaşıb çökməsi", best: "Su vurma (waterflood) layihələri, yüksək duz tərkibli formasiya suları" },
];

export default function FlowAssuranceLesson() {
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
              5.3.3
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Quyu Performansı
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Flow Assurance
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Tarixi hadisə: nə üçün "hidrat qapağı" milyardlarla dollara başa gəlib?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Nodal Analysis dərsində tubing və boru xəttinin təzyiq itkisini hesabladıq —
              amma bu hesablamalar flüidin fiziki-kimyəvi tərkibinin sabit qaldığını fərz
              edirdi. Real şəraitdə isə, xüsusilə dərinsu layihələrində, temperatur və
              təzyiq dəyişdikcə flüid daxilində bərk maddələr (parafin, hidrat, asfalten)
              əmələ gələ bilər və boru kəmərini tam tıxaya bilər. Neft sənayesində bir çox
              böyük layihə məhz bu problemlərə görə gecikib və ya milyardlarla dollar əlavə
              xərc çəkib. Bu problemləri qabaqcadan proqnozlaşdırıb qarşısını almaq sahəsinə{" "}
              <strong>Flow Assurance</strong> deyilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Flow Assurance nə üçün vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Reservoirdən çıxan flüid, quyu, boru kəməri və emal qurğusu boyu hərəkət
              edərkən davamlı olaraq temperatur və təzyiq dəyişikliyinə məruz qalır. Bu
              dəyişikliklər, əvvəllər həll olunmuş vəziyyətdə olan komponentlərin (mum,
              asfalten, hidrat kristalları, mineral duzlar) fiziki vəziyyətini dəyişdirərək
              bərk fazaya keçməsinə səbəb ola bilər. Bu bərk çöküntülər boru en kəsiyini
              tədricən daraldır, axın müqavimətini artırır və nəhayət tam tıxanmaya
              (blockage) səbəb ola bilər — bu da istehsalın tam dayanması və çox bahalı
              təmizləmə əməliyyatları deməkdir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Əsas flow assurance problemləri
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Problem</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təsvir</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tipik şərait</th>
                  </tr>
                </thead>
                <tbody>
                  {flowAssuranceIssues.map((c) => (
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
              3. Hidrat əmələ gəlməsi — dərinsu layihələrinin "kabusu"
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Qaz hidratları — su molekullarının qəfəs strukturunda metan və digər yüngül
              karbohidrogen molekullarını "həbs etdiyi" buz-bənzər bərk maddələrdir. Onlar
              yüksək təzyiq və aşağı temperatur şəraitində (dərinsu boru kəmərlərində
              tipikdir — soyuq dəniz dibi temperaturu 4°C-yə qədər düşə bilər) sürətlə
              əmələ gələ bilir və boru kəmərini bir neçə saat ərzində tam tıxaya bilir.
              Qarşısını almaq üçün metanol və ya glikol kimi inhibitorlar inyeksiya edilir,
              ya da boru kəməri istilik izolyasiyası (insulation) ilə örtülür.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Flow assurance idarəetmə strategiyaları
            </h2>
            <div className="space-y-2.5">
              {[
                "Kimyəvi inhibitorların (metanol, glikol, wax inhibitor) davamlı və ya dövri inyeksiyası",
                "Boru kəməri izolyasiyası və ya aktiv qızdırma (pipe-in-pipe, elektrik qızdırma sistemi)",
                "Pigging — boru daxilində mexaniki 'təmizləyici' cihazın mütəmadi göndərilməsi",
                "Termodinamik modelləşdirmə (PVT analizi) ilə çöküntü riskinin əvvəlcədən proqnozlaşdırılması",
                "Quyunun bağlanması/açılması ssenarilərində temperatur profilinin izlənməsi (shut-in zamanı soyuma riski)",
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
              <strong>Kimyəvi İnhibisiya vs Termal İzolyasiya:</strong> Kimyəvi inhibitorlar
              (metanol/glikol) tətbiqi nisbətən ucuz başlanğıc investisiyası tələb edir və
              mövcud sistemlərə asanlıqla inteqrasiya olunur, amma davamlı əməliyyat xərci
              yaradır (kimyəvi maddələrin daimi alınması, daşınması, inyeksiyası) və
              tutumu məhdud olan dəniz platformalarında əlavə saxlama sahəsi tələb edir.
              Termal izolyasiya (pipe-in-pipe sistemləri) isə yüksək ilkin kapital xərci
              tələb edir, amma uzunmüddətli əməliyyat xərcini xeyli azaldır və inhibitor
              çatışmazlığı riskindən asılı deyil. Seçim, layihənin ömrü, boru kəməri
              uzunluğu və kapital/əməliyyat büdcəsi balansından asılıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Hidrat Əmələ Gəlmə Temperaturunun Qiymətləndirilməsi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Sadələşdirilmiş empirik yanaşma ilə, verilmiş təzyiqdə hidrat əmələ gəlmə
              temperaturunu (Hammerschmidt tənliyinin tərsi məntiqi ilə) qiymətləndirək:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: boru kəməri təzyiqi = 150 bar, bu təzyiqdə xarakterik hidrat
                əmələ gəlmə temperaturu (PVT cədvəlindən) T_hidrat = 18°C, faktiki boru
                kəməri temperaturu (dəniz dibi) T_faktiki = 6°C
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                ΔT_subcooling = T_hidrat − T_faktiki
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>ΔT = 18 − 6 = <span style={{ color: PATH_COLOR }}>12°C (subcooling)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: 12°C-lik subcooling dərəcəsi çox yüksək hesab olunur — sənayedə
                adətən 3°C-dən yuxarı subcooling artıq ciddi hidrat riski kimi
                qiymətləndirilir və mütləq inhibisiya tələb edir. Bu misalda inhibitor
                konsentrasiyası, hidrat əmələ gəlmə temperaturunu faktiki temperaturdan
                aşağı endirməyə kifayət edəcək səviyyədə seçilməlidir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Şahdəniz sahəsi, Xəzər dənizi, Azərbaycan", text: "Dərinsu qaz-kondensat quyularında hidrat riskini idarə etmək üçün glikol inyeksiya sistemləri tətbiq olunur." },
                { name: "Thunder Horse sahəsi, Meksika Körfəzi", text: "Dərinsu layihəsində pipe-in-pipe termal izolyasiya sistemi hidrat və mum riskini idarə etmək üçün istifadə olunub." },
                { name: "Ormen Lange sahəsi, Norveç", text: "Uzun məsafəli dəniz altı qaz kəmərində MEG (monoetilen qlikol) inyeksiya sistemi hidrat əmələ gəlməsinin qarşısını alır." },
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
              <li>• Flow assurance boru kəmərində bərk çöküntülərin (parafin, hidrat, asfalten, scale) qarşısını almağı hədəfləyir</li>
              <li>• Hidratlar yüksək təzyiq/aşağı temperaturda əmələ gəlir — dərinsu layihələrində ən böyük risklərdən biridir</li>
              <li>• İdarəetmə strategiyaları: kimyəvi inhibisiya, termal izolyasiya, pigging</li>
              <li>• Subcooling dərəcəsi (3°C-dən yuxarı) hidrat riskinin ciddiliyini göstərən əsas göstəricidir</li>
              <li>• Strategiya seçimi kapital və əməliyyat xərcləri arasındakı balansdan asılıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/production/nodal-analysis"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Nodal Analysis
          </Link>
          <Link
            href="/learn/production/workover-operations"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Workover Əməliyyatları
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}