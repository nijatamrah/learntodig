"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const kerogenTypes = [
  { type: "Tip I", origin: "Göl yosunu (alginit)", product: "Əsasən neft, yüksək məhsuldarlıq" },
  { type: "Tip II", origin: "Dəniz planktonu", product: "Neft + qaz qarışığı" },
  { type: "Tip III", origin: "Quru bitkiləri (odunlu material)", product: "Əsasən qaz" },
  { type: "Tip IV", origin: "Yenidən emal olmuş üzvi maddə", product: "Praktiki olaraq məhsulsuz" },
];

export default function OriginOfPetroleumLesson() {
  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#080C18" }}>
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: PATH_COLOR, opacity: 0.14, filter: "blur(120px)" }}
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
          href="/learn/geology"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6"
          style={{ color: "#3D5570" }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Geologiya
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
              style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
            >
              1.1.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Əsaslar
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Neft və Qazın Mənşəyi
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə bu mövzu vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Bir geoloq yeni ərazidə kəşfiyyata başlayanda ilk sual budur: "Burada ümumiyyətlə
              neft/qaz formalaşmaq potensialı varmı?" Bu sualın cavabı məhz bu dərsdə öyrənəcəyin
              proseslərdən asılıdır. Milyard dollarlıq qazıma qərarları elə bu əsasda verilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Üzvi mənşə nəzəriyyəsi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Elmi ictimaiyyətdə qəbul edilən əsas nəzəriyyəyə görə, neft və qaz canlı orqanizmlərin
              qalıqlarından yaranıb. Bunun əksi olan <strong>Abiogenic Theory</strong> (qeyri-üzvi
              nəzəriyyə) — bəzi alimlər (Nikolay Kudryavtsev kimi) iddia edir ki, karbohidrogenlər
              Yerin mantiyasında qeyri-üzvi kimyəvi proseslərlə də yarana bilər. Titan peykindəki
              metan gölləri kimi kosmik nümunələrlə dəstəklənsə də, Yerdəki kommersiya yataqlarının
              əksəriyyəti üzvi mənşəli sübut olunub (biomarker analizi ilə).
            </p>
            <div
              className="mt-3 rounded-xl px-4 py-3 text-[13px] leading-[1.6]"
              style={{ background: PATH_COLOR + "14", border: `1px solid ${PATH_COLOR}33`, color: "#D6E0F0" }}
            >
              Sənaye praktikasında yalnız üzvi nəzəriyyə istifadə olunur — bu kursda da bu əsas alınır.
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Proses addım-addım
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>
                  Addım 1 — Depozisiya (Deposition)
                </p>
                <p className="text-[14px] leading-[1.75]">
                  Dəniz və ya göl dibində plankton, yosun kimi mikroorqanizmlərin qalıqları çöküntü
                  ilə yığılır. Şərt: mühit <strong>anoksik</strong> (oksigensiz) olmalıdır. Oksigen
                  olan mühitdə bakteriyalar üzvi maddəni tam parçalayıb CO₂-yə çevirir — heç nə
                  qalmır. Anoksik mühitdə isə üzvi maddə "qorunur". Belə mühit dərin göllərdə, qapalı
                  dəniz körfəzlərində, delta bataqlıqlarında formalaşır.
                </p>
              </div>

              <div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>
                  Addım 2 — Diagenez və kerogen formalaşması
                </p>
                <p className="text-[14px] leading-[1.75] mb-3">
                  Üzvi maddə üstünə yeni çöküntü qatları yığıldıqca sıxılır, sudan azad olur və{" "}
                  <strong>kerogen</strong> adlanan bərk maddəyə çevrilir (&lt; 50°C-də baş verir).
                </p>

                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <table className="w-full text-[12.5px]">
                    <thead>
                      <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                        <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tip</th>
                        <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Mənşə</th>
                        <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Verdiyi məhsul</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kerogenTypes.map((k) => (
                        <tr key={k.type} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{k.type}</td>
                          <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{k.origin}</td>
                          <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{k.product}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>
                  Addım 3 — Catagenez (termal yetişmə)
                </p>
                <p className="text-[14px] leading-[1.75]">
                  Dərinlik artdıqca temperatur artır. Orta <strong>geotermal qradient</strong> ~25–30°C/km-dir.
                </p>
                <ul className="mt-2 space-y-1.5">
                  <li className="text-[14px] leading-[1.6]">
                    <span className="font-mono text-[12px] px-1.5 py-0.5 rounded mr-2" style={{ background: "#FF6B2B1E", color: "#FF6B2B" }}>
                      Oil window
                    </span>
                    60°C – 150°C (təxminən 2–4 km) — kerogen zəncirləri qırılır, maye karbohidrogenlər əmələ gəlir.
                  </li>
                  <li className="text-[14px] leading-[1.6]">
                    <span className="font-mono text-[12px] px-1.5 py-0.5 rounded mr-2" style={{ background: "#3B9BD81E", color: "#3B9BD8" }}>
                      Gas window
                    </span>
                    150°C – 200°C+ (təxminən 4–6+ km) — neft molekulları da parçalanıb yüngül karbohidrogenlərə (thermal cracking) çevrilir.
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>
                  Addım 4 — Metagenez
                </p>
                <p className="text-[14px] leading-[1.75]">
                  200°C-dən yuxarı, çox dərin (&gt;6 km) şəraitdə demək olar ki, yalnız metan (quru
                  qaz) qalır — karbohidrogen potensialı bitir, qrafit əmələ gəlməyə başlayır.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Hesablamalar
            </h2>

            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: Səth temperaturu 20°C, geotermal qradient 32°C/km
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                T(D) = T₀ + G × D
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>D_min (60°C) = (60 − 20) / 32 = <span style={{ color: PATH_COLOR }}>1.25 km</span></p>
                <p>D_max (150°C) = (150 − 20) / 32 = <span style={{ color: PATH_COLOR }}>4.06 km</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu hövzədə neft əmələ gəlmə zonası 1.25–4.06 km dərinlik aralığındadır.
                Bundan dərin quyular əsasən qaz, daha dayaz quyular isə yetişməmiş kerogen tapacaq.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Xəzər hövzəsi (Azərbaycan)", text: "Oliqosen–Miosen dövrü çökmələri, xüsusilə Maykop lay dəstəsi əsas source rock hesab olunur. Yüksək sedimentasiya sürəti və zəngin Tip II kerogen tərkibi bölgəni dünyanın ən məhsuldar hövzələrindən birinə çevirib." },
                { name: "Ghawar (Səudiyyə Ərəbistanı)", text: "Dünyanın ən böyük neft yatağı. Source rock — Yura dövrü dəniz mənşəli karbonat süxurları (Tip II kerogen), ideal termal tarix sayəsində nadir yüksək neft doyma səviyyəsi yaradıb." },
                { name: "Marcellus Shale (ABŞ)", text: "Tip II/III qarışıq kerogen, dərin basin (gas window-da) — əsasən quru qaz yatağıdır, ABŞ-ın böyük şist qaz istehsalının mərkəzlərindən biridir." },
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
              <li>• Neft/qaz = milyonlarla il, üzvi maddə + anoksik mühit + təzyiq + temperatur</li>
              <li>• Kerogen tipi (I/II/III) məhsulun növünü (neft vs qaz) müəyyən edir</li>
              <li>• Oil window (~60–150°C) və Gas window (~150–200°C) temperatur asılıdır, mütləq dərinlikdən yox</li>
              <li>• Geotermal qradient hövzədən-hövzəyə dəyişir — eyni dərinlik hər yerdə eyni nəticəni vermir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Geologiya
          </Link>
          <Link
            href="/learn/geology/rock-types"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Süxur Növləri
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}