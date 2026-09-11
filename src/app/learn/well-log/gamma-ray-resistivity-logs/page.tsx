"use client";
import Link from "next/link";

const PATH_COLOR = "#3B9BD8";

const resistivityTools = [
  { tool: "MSFL / Microlog", depth: "Dayaz (2–4 sm)", zone: "Yuyulmuş zona (Rxo)" },
  { tool: "LLS / Şallow Laterolog", depth: "Orta (15–30 sm)", zone: "Keçid zonası" },
  { tool: "LLD / Deep Laterolog", depth: "Dərin (60–120 sm)", zone: "Toxunulmamış zona (Rt)" },
];

const gammaSources = [
  { el: "Uran (U)", note: "Üzvi maddə və fosfat layları ilə əlaqəli, dəyişkən mənbə" },
  { el: "Torium (Th)", note: "Gil minerallarında ən sabit radioaktiv göstərici" },
  { el: "Kalium (K)", note: "Feldspat və mikalarda, gilli qumdaşılarda yüksəlir" },
];

export default function GammaRayResistivityLogsLesson() {
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
              3.2.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Əsas Log Növləri
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Gamma Ray və Resistivity Logs
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Gil, yoxsa qumdaşı? Su, yoxsa neft?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Min metr aşağıda, gözlə görmədiyimiz süxurun gil, yoxsa qumdaşı olduğunu necə bilə
              bilərik? Bəs həmin qumdaşının boşluqlarında neft, yoxsa sadəcə su var — bunu necə
              ayırd edirik? Bu iki sual neft-qaz mühəndisliyinin ən fundamental suallarıdır və
              cavabı, demək olar ki, hər log dəstinin özəyini təşkil edən iki alətdə gizlənir:{" "}
              <strong>Gamma Ray</strong> (litologiya üçün) və <strong>Resistivity</strong> (flüid
              tipi üçün). Bu dərsdə hər ikisinin necə işlədiyini və birlikdə necə oxunduğunu
              öyrənəcəyik.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Gamma Ray logu: fiziki prinsip
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Gamma Ray (GR) aləti süxurda təbii şəkildə mövcud olan radioaktiv izotopların
              — uran, torium və kaliumun — parçalanma zamanı yaydığı qamma şüalanmasını
              passiv şəkildə ölçür. Bura passiv ölçmədir, çünki alət özü heç bir siqnal
              göndərmir, sadəcə süxurun təbii şüalanmasını qeyd edir. Nəticə API vahidi ilə
              (American Petroleum Institute-un təsdiqlədiyi kalibrasiya şkalası) ifadə olunur.
              Ölçmə prinsipi sadədir: nə qədər çox gil minerali, bir o qədər yüksək radioaktivlik,
              çünki gil mineralları öz kristal quruluşunda bu radioaktiv elementləri daha çox
              saxlayır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Radioaktivliyin mənbəyi: üç element
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {gammaSources.map((g) => (
                <div
                  key={g.el}
                  className="rounded-xl px-3 py-3"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-[13px] font-semibold mb-1" style={{ color: PATH_COLOR }}>{g.el}</p>
                  <p className="text-[12px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{g.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Gamma Ray-in litologiya ayrımındakı rolu
            </h2>
            <p className="text-[14px] leading-[1.75]">
              GR-in ən böyük dəyəri elə budur: gil təbəqələrini təmiz kollektor süxurundan
              (qumdaşı, əhəngdaşı) sürətlə ayırmaq. Loq üzərində baxdıqda, əyri sağa (yüksək
              qiymətlərə) meylləndikcə gil miqdarı artır, sola meylləndikcə isə süxur təmizləşir.
              Bu sadə vizual qayda mühəndislərə uzun log intervalını dəqiqələr içində &quot;gilli&quot;
              və &quot;təmiz&quot; zonalara bölməyə imkan verir. Amma diqqətli olmaq lazımdır: bəzi təmiz
              süxurlar da (məsələn, feldspatlı qumdaşı və ya fosfatlı əhəngdaşı) qeyri-adi yüksək
              GR göstərə bilər — buna görə GR heç vaxt tək başına, digər logsuz istifadə olunmur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              4. Resistivity logu: fiziki prinsip
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Resistivity aləti süxura elektrik cərəyanı ötürür (laterolog) və ya elektromaqnit
              sahəsi yaradır (induction log), sonra süxurun bu cərəyana göstərdiyi müqaviməti
              Om·metr (Ω·m) vahidi ilə ölçür. Açar məntiq budur: quru süxur özü demək olar ki,
              elektriki keçirmir — cərəyanı əsasən boşluqlardakı flüid keçirir. Duzlu formasiya
              suyu ionlar sayəsində cərəyanı asanlıqla keçirdiyi üçün aşağı müqavimət göstərir,
              neft və qaz isə elektrik izolyator olduğu üçün cərəyanın yolunu kəsir və müqaviməti
              kəskin artırır. Buna görə resistivity logu, əslində, birbaşa flüid tipinin
              &quot;detektorudur&quot;.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Resistivity alətlərinin növləri: dərinlik investiqasiyası
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Qazma məhlulu quyu divarından süxura nüfuz edərək (mud invasion) yaxın zonanın
              flüid tərkibini müvəqqəti dəyişir. Bu səbəbdən müxtəlif dərinliyə &quot;baxan&quot; bir
              neçə resistivity aləti eyni vaxtda işlədilir:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Alət</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>İnvestiqasiya dərinliyi</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Ölçdüyü zona</th>
                  </tr>
                </thead>
                <tbody>
                  {resistivityTools.map((r) => (
                    <tr key={r.tool} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{r.tool}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{r.depth}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{r.zone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              6. Gamma Ray + Resistivity: birgə oxunuş
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Real interpretasiyada bu iki log heç vaxt ayrı-ayrılıqda oxunmur — onlar birlikdə
              bir &quot;hekayə&quot; danışır. Əvvəlcə GR-ə baxılır: əyri aşağı (təmiz) zonanı göstərirmi?
              Əgər bəli, deməli burada kollektor potensialı var. Sonra həmin dərinlikdə deep
              resistivity (LLD) əyrisinə baxılır: qiymət yüksəkdirsə (adətən onlarla, hətta
              yüzlərlə Ω·m), bu, karbohidrogen doyğunluğuna işarədir; qiymət aşağıdırsa (bir neçə
              Ω·m), zona sadəcə su ilə doyğundur. Bu iki addımlı oxunuş — əvvəlcə &quot;bura kollektor
              varmı&quot;, sonra &quot;burada nə var&quot; — petrofizik interpretasiyanın əsas iş axınıdır.
            </p>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: PATH_COLOR + "14", border: `1px solid ${PATH_COLOR}40` }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: PATH_COLOR }}>
              Tipik Log Cavabı
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Gil daşı — GR</span>
                <span style={{ color: PATH_COLOR }}>80–150 API</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Gil daşı — Rt (su ilə doyğun, keçirici)</span>
                <span style={{ color: PATH_COLOR }}>1–5 Ω·m</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Təmiz qumdaşı (su ilə doyğun) — GR / Rt</span>
                <span style={{ color: PATH_COLOR }}>20–60 API / 1–10 Ω·m</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Təmiz qumdaşı (neft ilə doyğun) — GR / Rt</span>
                <span style={{ color: PATH_COLOR }}>20–60 API / 20–200+ Ω·m</span>
              </div>
            </div>
            <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#D6E0F0" }}>
              Diqqət et: iki qumdaşı sətrində GR demək olar ki, eynidir — çünki GR litologiyanı
              göstərir, flüidi yox. Fərqi yalnız Rt açır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Hesablama — Gamma Ray İndeksi (IGR)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              GR əyrisini rəqəmsal olaraq şərh etməyin ilk addımı Gamma Ray İndeksini (IGR)
              hesablamaqdır — bu, sonrakı dərsdə (3.3.1) öyrənəcəyimiz şist həcmi (Vsh)
              hesablamasının başlanğıc nöqtəsidir:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                IGR = (GRlog − GRmin) / (GRmax − GRmin)
              </p>
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: GRlog = 65 API, GRmin (təmiz qum) = 20 API, GRmax (gil) = 150 API
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>IGR = (65 − 20) / (150 − 20)</p>
                <p>IGR = 45 / 130 ≈ <span style={{ color: PATH_COLOR }}>0.35</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə 0.35 — bu təbəqənin tam təmiz (0.0) ilə tam gil (1.0) arasında, gilə doğru
                meyilli, orta-gilli süxur olduğunu göstərir. Vacib qeyd: IGR birbaşa gil faizi
                deyil, xətti bir təxmindir — 3.3.1-də IGR-i faktiki şist həcminə (Vsh) çevirən
                qeyri-xətti düsturları (Larionov, Clavier və s.) öyrənəcəyik.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Azeri-Chirag-Günəşli (ACG), Azərbaycan", text: "Deep resistivity logları neft-su kontaktının (OWC) dəqiq dərinliyini müəyyənləşdirmək üçün istifadə olunur — bu, ehtiyat hesablamalarının əsasını təşkil edir." },
                { name: "Bakken Shale, Şimali Dakota, ABŞ", text: "Yüksək üzvi maddə tərkibli intervallar adi gildən fərqli olaraq həm yüksək GR, həm də yüksək resistivity göstərir — bu qeyri-adi kombinasiya karbohidrogen zəngin zonaların açarıdır." },
                { name: "Kantarell (Cantarell) yatağı, Meksika", text: "Pemex-in idarə etdiyi bu nəhəng karbonat yatağında resistivity logları təbii çatlaqlı zonaları aşkar etmək üçün mərkəzi rol oynayır." },
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
              <li>• Gamma Ray təbii radioaktivliyi ölçür və litologiyanı (gil vs təmiz süxur) göstərir</li>
              <li>• Resistivity elektrik müqavimətini ölçür və flüid tipini (su vs karbohidrogen) göstərir</li>
              <li>• Mud invasion səbəbindən şallow, medium və deep resistivity alətləri birlikdə istifadə olunur</li>
              <li>• Yüksək resistivity həmişə karbohidrogen demək deyil — çatlaqlı əhəngdaşı və ya sıx süxur da yüksək qiymət verə bilər</li>
              <li>• IGR = (GRlog − GRmin) / (GRmax − GRmin) — Vsh hesablamasının ilk addımıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/well-log/logging-tools-wireline-lwd"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Log Alətləri (Wireline vs LWD)
          </Link>
          <Link
            href="/learn/well-log/density-neutron-sonic-logs"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Density, Neutron və Sonic Logs
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}