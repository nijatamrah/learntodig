"use client";
import Link from "next/link";

const PATH_COLOR = "#2DBE8C";

const parameterTable = [
  { symbol: "A", name: "Sahə (Area)", unit: "acre və ya ft²", note: "Reservoirin üfüqi yayılma sahəsi, seysmik və quyu məlumatlarından təyin olunur" },
  { symbol: "h", name: "Xalis qalınlıq (Net pay)", unit: "ft", note: "Yalnız karbohidrogen daşıyan, keçirici qatın qalınlığı" },
  { symbol: "φ", name: "Məsaməlilik (Porosity)", unit: "fraksiya (%)", note: "Qayanın boşluq həcminin ümumi həcmə nisbəti" },
  { symbol: "Sw", name: "Su doyması (Water Saturation)", unit: "fraksiya (%)", note: "Məsamələrin nə qədərinin su ilə dolu olduğu — (1-Sw) karbohidrogenlə dolu hissədir" },
  { symbol: "Bo", name: "Formation Volume Factor", unit: "rb/stb", note: "Reservoir həcmini səth həcminə çevirmək üçün (əvvəlki dərsə bax)" },
];

export default function VolumetricMethodOoipOgipLesson() {
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
              4.2.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Həcm Hesablamaları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            OOIP/OGIP Hesablamaları (Volumetric Method)
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <p className="text-[14px] leading-[1.8] italic" style={{ color: "#9FAEC4" }}>
              20-ci əsrin əvvəllərində neft kəşfiyyatçıları yeni tapılmış bir yatağın nə qədər
              dəyərli olduğunu təxmin etmək üçün sadəcə sahə ölçüsünə və quyu debitinə
              baxırdılar — dəqiq elmi metod yox idi. Volumetric method (həcm metodu) məhz bu
              boşluğu doldurmaq üçün inkişaf etdirildi: reservoirin geometriyasını və qaya
              xüsusiyyətlərini riyazi şəkildə birləşdirərək, yerin altında nə qədər neft və ya
              qaz olduğunu ilk dəfə sistemli şəkildə qiymətləndirmək mümkün oldu. Bu gün də bu
              üsul, kəşfiyyatın ilk mərhələlərində ehtiyatların qiymətləndirilməsi üçün sənaye
              standartıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Volumetric method nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Volumetric method, reservoirdə mövcud olan ilkin neft (OOIP — Original Oil In
              Place) və ya qaz (OGIP — Original Gas In Place) miqdarını, reservoirin fiziki
              ölçüləri və qaya xüsusiyyətləri əsasında hesablayan üsuldur. Bu metod, hələ heç
              bir istehsal tarixçəsi olmayan yeni kəşf edilmiş yataqlar üçün xüsusilə
              faydalıdır, çünki material balance kimi digər üsullar istehsal məlumatı tələb
              edir. Nəticə, reservoirdə "yerdə olan" ümumi karbohidrogen miqdarını göstərir —
              bunun nə qədərinin çıxarıla biləcəyi isə ayrı bir amil olan recovery factor ilə
              müəyyən edilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Əsas parametrlər
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              OOIP/OGIP hesablaması beş əsas parametrin hasilinə əsaslanır:
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
                  {parameterTable.map((p) => (
                    <tr key={p.symbol} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-mono font-semibold" style={{ color: PATH_COLOR }}>{p.symbol}</td>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{p.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{p.unit}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{p.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Sahə və qalınlıq necə təyin olunur?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Reservoirin sahəsi (A) adətən 3D seysmik interpretasiya nəticəsində alınan
              struktur xəritələrdən (structure maps) ölçülür — bu xəritələr, karbohidrogen ilə
              su arasındakı sərhədi (fluid contact) göstərir. Xalis qalınlıq (h) isə quyu
              karotajlarından (well logs) təyin edilir: gamma-ray və porosity logları
              keçirilməyən (gil) qatları xaric edərək, yalnız faydalı, keçirici hissəni ayırır.
              Bu iki parametrin dəqiqliyi birbaşa OOIP nəticəsinin etibarlılığına təsir edir —
              az sayda quyu olan yeni kəşflərdə bu qiymətlər böyük qeyri-müəyyənlik daşıyır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Məsaməlilik və su doyması
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Məsaməlilik (φ), qayanın nə qədər flüid saxlaya biləcəyini göstərir və adətən
              nüvə (core) analizi ilə kalibrlənmiş karotaj ölçmələrindən əldə edilir. Su
              doyması (Sw) isə məsamələrin nə qədərinin su, nə qədərinin karbohidrogenlə dolu
              olduğunu göstərir — buna görə hesablamada (1-Sw) həddi istifadə olunur, çünki
              yalnız bu hissə karbohidrogen ehtiva edir. Sw adətən rezistivlik karotajları
              (resistivity logs) və Archie tənliyi vasitəsilə hesablanır. Hər iki parametr
              reservoir daxilində fərqli zonalarda dəyişə bilər, ona görə orta çəkili dəyərlər
              istifadə edilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama addımları
            </h2>
            <div className="space-y-2.5">
              {[
                "Struktur xəritədən reservoirin sahəsi (A) və fluid contact sərhədi müəyyən edilir",
                "Quyu karotajlarından xalis qalınlıq (h), məsaməlilik (φ) və su doyması (Sw) çıxarılır",
                "Əvvəlki dərsdəki reservoir təzyiq/temperatur şəraitinə uyğun Bo dəyəri təyin edilir",
                "Bütün parametrlər OOIP formulasında birləşdirilərək yerdə olan neft miqdarı hesablanır",
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
            style={{ background: "#A78BFA14", border: "1px solid #A78BFA40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#A78BFA" }}>
              Fərziyyə və Məhdudiyyətlər
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Volumetric method, reservoirin daxilində φ, Sw və h dəyərlərinin sərhədlər
              daxilində nisbətən bircins (homogen) paylandığını və struktur sərhədlərinin
              dəqiq bilindiyini fərz edir. Real reservoirlarda isə heterojenlik — laylanma,
              faylar, lokal keçiricilik dəyişkənliyi — bu orta dəyərləri əhəmiyyətli dərəcədə
              təhrif edə bilər, xüsusilə az quyu sıxlığı olan erkən kəşfiyyat mərhələsində.
              Buna görə OOIP nəticələri adətən aşağı/orta/yuxarı ssenarilər (P90/P50/P10) kimi
              qeyri-müəyyənlik aralığında təqdim edilir, tək bir dəqiq rəqəm kimi deyil.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — OOIP təyini
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Standart volumetric formulanı tətbiq edərək OOIP-i hesablayaq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: A = 2,000 acre, h = 50 ft, φ = 0.20, Sw = 0.25, Bo = 1.35 rb/stb
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                OOIP = 7758 × A × h × φ × (1-Sw) / Bo
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>OOIP = 7758 × 2,000 × 50 × 0.20 × 0.75 / 1.35</p>
                <p>OOIP = <span style={{ color: PATH_COLOR }}>~86.2 milyon stb</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu reservoirdə təxminən 86.2 milyon stok-tank barrel neft yerdə
                mövcuddur. Diqqət et ki, 1.35 dəyəri məhz əvvəlki dərsdə hesabladığımız Bo
                dəyəridir — bu, PVT parametrlərinin həcm hesablamalarına birbaşa daxil
                olduğunu göstərir. Bu rəqəm hələ "çıxarıla bilən" neft demək deyil — real
                hasilat, recovery factor tətbiq edildikdən sonra müəyyənləşir (4.4.2-ci dərsə bax).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "İlkin kəşfiyyat mərhələsində volumetric method ilə qiymətləndirilmiş ehtiyatlar, sonrakı material balance və simulyasiya nəticələri ilə tədricən dəqiqləşdirilib." },
                { name: "Ghawar sahəsi, Səudiyyə Ərəbistanı", text: "Dünyanın ən böyük neft yatağı kimi tanınır — nəhəng sahəsi və qalınlığı volumetric hesablamalarda müstəsna miqyaslı OOIP dəyərləri ortaya çıxarıb." },
                { name: "Kashagan sahəsi, Qazaxıstan", text: "Xəzər dənizinin şimalında yerləşən nəhəng kəşf — mürəkkəb karbonat strukturu səbəbindən həcm hesablamalarında xüsusi qeyri-müəyyənlik idarəetməsi tələb olunub." },
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
              <li>• Volumetric method, istehsal tarixçəsi olmadan OOIP/OGIP-i qiymətləndirməyə imkan verir</li>
              <li>• Formula beş parametrə əsaslanır: A, h, φ, Sw və Bo</li>
              <li>• Sahə və qalınlıq seysmik/karotaj məlumatından, φ və Sw isə nüvə/karotaj kalibrasiyasından alınır</li>
              <li>• Nəticə, yerdə olan ümumi miqdardır — çıxarıla bilən hissə recovery factor ilə ayrıca hesablanır</li>
              <li>• Homogenlik fərziyyəsi səbəbindən nəticələr adətən qeyri-müəyyənlik aralığında (P90/P50/P10) verilir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/reservoir/reservoir-pressure-temperature"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Əvvəlki: Reservoir Təzyiqi və Temperatur
          </Link>
          <Link
            href="/learn/reservoir/material-balance-equation"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Material Balance Tənliyi
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}