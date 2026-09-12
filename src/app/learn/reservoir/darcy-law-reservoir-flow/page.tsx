"use client";
import Link from "next/link";

const PATH_COLOR = "#2DBE8C";

const darcyComponents = [
  { symbol: "q", name: "Axın sürəti (Flow rate)", unit: "bbl/gün", note: "Vahid zamanda reservoirdən quyuya doğru hərəkət edən flüid həcmi" },
  { symbol: "k", name: "Keçiricilik (Permeability)", unit: "md (millidarcy)", note: "Qayanın flüidi öz daxilindən keçirmə qabiliyyəti — geometriyadan asılı deyil, yalnız qayanın özündən" },
  { symbol: "h", name: "Xalis qalınlıq", unit: "ft", note: "Axının baş verdiyi keçirici qatın qalınlığı" },
  { symbol: "μ", name: "Özlülük (Viscosity)", unit: "cp (centipoise)", note: "Flüidin axmaya qarşı daxili müqaviməti — temperatur artdıqca adətən azalır" },
  { symbol: "ΔP", name: "Təzyiq fərqi", unit: "psi", note: "Reservoir təzyiqi ilə quyu dibi təzyiqi (Pwf) arasındakı fərq — axının 'hərəkətverici qüvvəsi'" },
  { symbol: "re/rw", name: "Təsir radiusu / Quyu radiusu", unit: "ft", note: "Radial axında, drenaj sahəsinin radiusunun quyu radiusuna nisbəti" },
];

const flowRegimes = [
  { title: "Transient (Keçici) axın", text: "İstismarın ilk mərhələsində, təzyiq dalğası hələ reservoirin sərhədlərinə çatmayıb — axın sanki sonsuz mühitdə baş verir kimi davranır." },
  { title: "Pseudo-Steady-State axın", text: "Təzyiq dalğası bütün drenaj sərhədlərinə çatıb, amma reservoir təzyiqi bütövlükdə sabit sürətlə azalmağa davam edir." },
  { title: "Steady-State axın", text: "Sərhəddə daimi təzyiq dəstəyi (məs. güclü aquifer və ya su vurma) olduqda, axın sürəti və təzyiq zamanla sabit qalır." },
  { title: "Skin effekti olan axın", text: "Quyu ətrafında qazma zamanı yaranan zədələnmə (formation damage) əlavə müqavimət yaradır və effektiv axını azaldır." },
];

const flowGeometryRows = [
  { aspect: "Həndəsə", linear: "Paralel təbəqələr arasında düz xətt üzrə", radial: "Quyu ətrafında konsentrik dairələr şəklində" },
  { aspect: "Tipik tətbiq", linear: "Laboratoriya nüvə testləri, kənar su axını modelləri", radial: "Quyu ətrafı reservoir axını, productivity index hesablamaları" },
  { aspect: "Sahə dəyişkənliyi", linear: "Kəsik sahəsi sabit qalır", radial: "Kəsik sahəsi quyuya yaxınlaşdıqca kəskin azalır (2πrh)" },
  { aspect: "Təzyiq profili", linear: "Məsafə ilə xətti azalır", radial: "Quyu yaxınlığında loqarifmik şəkildə kəskin düşür" },
];

export default function DarcyLawReservoirFlowLesson() {
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
              4.3.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Axın Davranışı
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Darcy Qanunu və Reservoir Axını
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <p className="text-[14px] leading-[1.8] italic" style={{ color: "#9FAEC4" }}>
              1856-cı ildə fransız mühəndis Henry Darcy, Dijon şəhərinin ictimai su fəvvarələri
              üçün su filtrasiya sistemi layihələndirirdi. O, qum təbəqələrindən keçən suyun
              sürətini ölçərkən sadə, amma güclü bir müşahidə etdi: axın sürəti, təzyiq fərqi
              ilə düz mütənasib, qatın qalınlığı ilə isə tərs mütənasibdir. Darcy heç vaxt bunun
              neft sənayesində istifadə olunacağını təsəvvür etməmişdi, amma az sonra bu
              prinsip, məsaməli mühitlərdən (qum, qumdaşı) flüid axınının əsas riyazi əsasına
              çevrildi. Bu gün Darcy qanunu, hər bir quyu testinin, hər bir productivity index
              hesablamasının kökündə dayanır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Darcy qanunu nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Darcy qanunu, məsaməli mühitdən (qumdaşı, əhəngdaşı və s.) keçən flüidin axın
              sürətinin, təzyiq qradiyentinə, mühitin keçiriciliyinə və flüidin özlülüyünə necə
              bağlı olduğunu təsvir edən əsas fiziki qanundur. Sadə dildə desək: təzyiq fərqi
              nə qədər böyükdürsə, keçiricilik nə qədər yüksəkdirsə və flüid nə qədər az
              özlüdürsə, axın da bir o qədər sürətli olur. Bu qanun, reservoir mühəndisliyində
              demək olar ki, bütün axın hesablamalarının (quyu debiti, productivity index, təzyiq
              tükənməsi) təməl daşıdır və Darcy'nin adına izafətən "Darcy vahidi" adlı xüsusi
              keçiricilik ölçü vahidi də yaradılıb.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Tənliyin əsas komponentləri
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Radial (quyu ətrafı) Darcy tənliyində istifadə olunan parametrlər aşağıdakılardır:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Simvol</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Parametr</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Vahid</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Qeyd</th>
                  </tr>
                </thead>
                <tbody>
                  {darcyComponents.map((d) => (
                    <tr key={d.symbol} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-mono font-semibold" style={{ color: PATH_COLOR }}>{d.symbol}</td>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{d.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{d.unit}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{d.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Keçiricilik (Permeability) — qayanın "yol vermə" qabiliyyəti
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Keçiricilik, məsamələrin bir-biri ilə nə dərəcədə bağlı olduğunu və flüidin bu
              yolla nə qədər asan keçə biləcəyini göstərir. Diqqət etmək lazımdır ki,
              keçiricilik məsaməlilikdən (φ) fərqli bir anlayışdır — yüksək məsaməliliyə malik
              bir qaya, əgər məsamələr bir-birindən təcrid olunubsa, çox aşağı keçiriciliyə
              malik ola bilər. Ölçü vahidi olaraq millidarcy (md) istifadə olunur — tipik
              qumdaşı reservoirları 1-1000 md aralığında, sıx (tight) qazlı qumdaşılar isə
              0.1 md-dən aşağı ola bilər. Keçiricilik həmişə istiqamətdən asılıdır (anizotrop) —
              üfüqi keçiricilik (kh) adətən şaquli keçiricilikdən (kv) yüksək olur, çünki
              çökmə prosesi laylı struktur yaradır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Xətti axın və radial axın
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Darcy qanunu iki əsas həndəsi formada tətbiq olunur — reservoir mühəndisliyində
              ən çox rast gəlinən radial axın, quyuya doğru yaxınlaşdıqca sürətlənən konsentrik
              axın nümunəsidir:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Aspekt</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Xətti axın</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Radial axın</th>
                  </tr>
                </thead>
                <tbody>
                  {flowGeometryRows.map((r) => (
                    <tr key={r.aspect} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{r.aspect}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{r.linear}</td>
                      <td className="px-3 py-2 align-top" style={{ color: PATH_COLOR }}>{r.radial}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Axın rejimləri zamanla necə dəyişir?
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Quyu istismara başladıqdan sonra, təzyiq dalğasının davranışı zamanla üç fərqli
              mərhələdən keçir, əlavə olaraq quyu ətrafında yaranan zədələnmə də axına təsir edir:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {flowRegimes.map((c) => (
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
              6. Skin effekti və effektiv keçiricilik
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Qazma mayeləri, sement və ya hasilat zamanı yığılan çöküntülər quyu ətrafındakı
              kiçik bir zonada təbii keçiriciliyi azalda bilər — bu hadisə "skin effekti"
              adlanır və boyutsuz "s" əmsalı ilə ifadə olunur. Müsbət skin (s &gt; 0) əlavə
              təzyiq itkisi deməkdir və adətən formation damage-dan qaynaqlanır, mənfi skin
              (s &lt; 0) isə quyunun stimulyasiya edildiyini (məs. hidravlik yarma və ya turşu
              işləmə vasitəsilə) göstərir. Skin effekti, real quyu performansını Darcy'nin
              "ideal" proqnozundan fərqləndirən ən vacib amillərdən biridir və növbəti dərsdə
              (4.3.2) quyu testi analizində ətraflı araşdırılacaq.
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
              Darcy qanunu, axının laminar (təbəqəli, turbulent olmayan) olduğunu və mühitin
              homogen, izotrop olduğunu fərz edir. Yüksək axın sürətlərində (məsələn, quyu
              dibinə çox yaxın zonalarda və ya yüksək debitli qaz quyularında) axın turbulent
              rejimə keçə bilər — bu halda Darcy qanunu artıq kifayət etmir və əlavə "non-Darcy"
              (Forchheimer) həddi tənliyə daxil edilməlidir. Həmçinin, real reservoirlarda
              keçiricilik heç vaxt tam homogen deyil — laylar, mikro-çatlar və heterogenlik
              nəticələri əhəmiyyətli dərəcədə dəyişdirə bilər, ona görə hesablanan keçiricilik
              dəyərləri həmişə "effektiv" (orta) dəyər kimi qəbul edilməlidir, mütləq lokal
              dəqiqlik kimi yox.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Hesablama — Radial Darcy axını ilə debit təyini
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Steady-state radial axın tənliyini tətbiq edərək, verilmiş reservoir
              parametrləri üçün gözlənilən quyu debitini hesablayaq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: k = 50 md, h = 50 ft, ΔP = 3,600 − 2,600 = 1,000 psi (4.1.2-dəki
                reservoir təzyiqinə əsasən), μ = 1.2 cp, Bo = 1.35 rb/stb, re = 1,000 ft, rw = 0.35 ft, s = 0
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                q = (7.08×10⁻³ × k × h × ΔP) / (μ × Bo × [ln(re/rw) + s])
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>ln(1000/0.35) = ln(2,857) ≈ 7.96</p>
                <p>q = (7.08×10⁻³ × 50 × 50 × 1,000) / (1.2 × 1.35 × 7.96)</p>
                <p>q = 17,700 / 12.9</p>
                <p>q ≈ <span style={{ color: PATH_COLOR }}>1,372 bbl/gün</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: verilmiş şəraitdə quyudan gözlənilən steady-state hasilat sürəti
                təxminən 1,372 bbl/gündür. Diqqət et ki, ΔP dəyəri məhz 4.1.2-ci dərsdə
                hesabladığımız 3,600 psi-lik reservoir təzyiqinə əsaslanır — bu, fəsillər
                arasındakı parametrlərin bir-birinə necə bağlı olduğunu göstərir. Əgər skin
                effekti müsbət olsaydı (məs. s = 5), məxrəcdəki mötərizə böyüyər və eyni ΔP
                üçün debit xeyli aşağı düşərdi — bu da real sahədə niyə eyni reservoir
                keyfiyyətinə malik quyuların fərqli performans göstərə biləcəyini izah edir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Yüksək keçiricilikli qumdaşı laylarında aparılan quyu testləri, Darcy əsaslı analiz vasitəsilə effektiv keçiriciliyin təyin edilməsinə və quyu dizaynının optimallaşdırılmasına imkan verib." },
                { name: "Marcellus şist qaz sahəsi, ABŞ", text: "Çox aşağı təbii keçiricilik (mikrodarcy səviyyəsində) səbəbindən, standart Darcy axını kifayət etmir və hidravlik yarma ilə süni keçiricilik yaradılması tələb olunub." },
                { name: "Burgan sahəsi, Küveyt", text: "Dünyanın ən yüksək keçiricilikli reservoirlarından birinə malikdir — bu, olduqca yüksək debitli quyuların Darcy qanunu ilə uğurla proqnozlaşdırılmasına səbəb olub." },
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
              <li>• Darcy qanunu, axın sürətini təzyiq fərqi, keçiricilik və özlülüklə əlaqələndirən əsas fiziki qanundur</li>
              <li>• Keçiricilik (k) məsaməlilikdən fərqlidir — qayanın flüidi keçirmə qabiliyyətini göstərir</li>
              <li>• Radial axın həndəsəsi, quyu ətrafı reservoir hesablamalarının əsasını təşkil edir</li>
              <li>• Axın transient, pseudo-steady-state və steady-state mərhələlərindən keçir</li>
              <li>• Skin effekti real quyu performansını "ideal" Darcy proqnozundan fərqləndirən əsas amildir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/reservoir/material-balance-equation"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Əvvəlki: Material Balance Tənliyi
          </Link>
          <Link
            href="/learn/reservoir/well-testing-productivity-index"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Quyu Testi və Productivity Index
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}