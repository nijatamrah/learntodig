"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const systems = [
  { name: "Hoisting System (Qaldırma sistemi)", role: "Drill string-i, casing-i quyuya endirir/çıxarır — draworks, tal bloku, hook" },
  { name: "Rotating System (Fırlanma sistemi)", role: "Bit-i fırladır — rotary table/top drive, kelly və ya drill string vasitəsilə" },
  { name: "Circulation System (Sirkulyasiya sistemi)", role: "Qazma məhlulunu (mud) quyuya vurur, kəsilmiş süxur qırıntılarını (cuttings) səthə çıxarır" },
  { name: "Power System (Enerji sistemi)", role: "Bütün rig avadanlığını işə salan mühərriklər (adətən dizel-elektrik)" },
];

export default function RotaryDrillingSystemLesson() {
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
              2.1.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Qazma Əsasları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Rotary Drilling Sisteminə Giriş
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <p className="text-[14px] leading-[1.8] italic" style={{ color: "#9FAEC4" }}>
              1901-ci ildə Texasın Spindletop sahəsində, rotary üsulla qazılan bir quyu gündə 800
              barreldən çox neft fontan vurdu — o dövrün cable-tool (kanat) üsulu ilə mümkün
              olmayan bir dərinlikdə. Bu hadisə rotary drilling-i sənayenin standart üsuluna
              çevirdi və bu gün də — 120 ildən çox sonra — əsas prinsip demək olar ki, dəyişməyib.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Əsas prinsip
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Rotary drilling-in məntiqi sadədir: bit (qazma başlığı) fırlanır və eyni zamanda
              üzərinə çəki (weight) tətbiq olunur. Bu iki qüvvənin — <strong>fırlanma</strong> və{" "}
              <strong>çəki</strong> — kombinasiyası süxuru qırır. Qırılan hissələr (cuttings)
              dövr edən mayenin (mud) köməyilə səthə çıxarılır. Bu proses quyu istənilən
              dərinliyə çatana qədər davam edir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Dörd əsas sistem
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Bir rotary rig, funksional olaraq dörd əsas sistemdən ibarətdir. Növbəti dərslərdə
              hər birinin komponentlərinə ayrıca baxacağıq, indi ümumi mənzərəni görək:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Sistem</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Rolu</th>
                  </tr>
                </thead>
                <tbody>
                  {systems.map((s) => (
                    <tr key={s.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{s.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{s.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Qazma dövrü (Drilling Cycle)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Bit yerə doğru hərəkət etdikcə, drill string tədricən "bitir" — yəni bit səth
              səviyyəsinə yaxınlaşır. Bu zaman təkrarlanan dövr başlayır:
            </p>
            <div className="space-y-2.5">
              {[
                "Bit süxuru qazır, mud dövr edir, cuttings səthə çıxır",
                "Bir boru uzunluğu (adətən ~30 fut) qazılandan sonra dövr dayandırılır",
                "Yeni bir drill pipe seqmenti kelly/top drive-a bağlanır (\"making a connection\")",
                "Qazmaya davam edilir — dövr təkrarlanır, quyu tədricən dərinləşir",
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
            style={{ background: "#E8B33D14", border: "1px solid #E8B33D40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#E8B33D" }}>
              Təhlükəsizlik xəbərdarlığı
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Rig floor sənayenin ən təhlükəli iş sahələrindən biridir — fırlanan mexanizmlər,
              yüksək çəkili yüklər və təzyiq altında olan sistemlər eyni məkanda işləyir. Bu
              kursda öyrənəcəyin hər komponentin arxasında konkret təhlükəsizlik protokolları
              dayanır — bunlara "əlavə detal" kimi yox, işin ayrılmaz hissəsi kimi bax.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Hesablama — Buoyancy Factor (Üzmə Amili)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Drill string mud daxilində olduğu üçün, onun real çəkisi havadakından azdır (Arximed
              qanunu). Bu fərqi hesablamaq üçün istifadə olunan əmsal — hook load göstəricilərini
              düzgün oxumaq üçün vacibdir:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: mud sıxlığı = 10 ppg, polad sıxlığı = 65.5 ppg
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                BF = 1 − (mud sıxlığı / polad sıxlığı)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>BF = 1 − (10 / 65.5) = <span style={{ color: PATH_COLOR }}>0.847</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: drill string-in mud daxilindəki real çəkisi, havadakı çəkisinin 84.7%-i
                qədərdir. Yəni 100 ton havadakı çəki, mud daxilində ~84.7 ton kimi ölçülür — hook
                load hesablamalarında bu fərq mütləq nəzərə alınmalıdır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Spindletop, Texas (1901)", text: "Rotary drilling-in kommersiya uğurunun ilk böyük nümunəsi — sənayenin cable-tool üsulundan tam rotary sistemə keçidini sürətləndirdi." },
                { name: "Azəri-Çıraq-Günəşli (ACG), Xəzər dənizi", text: "Müasir offshore platformalarda top drive sistemli rotary rig-lər istifadə olunur — dərin, yüksək təzyiqli quyuların qazılmasını mümkün edir." },
                { name: "Şimal dənizi platformaları", text: "Top drive texnologiyasının geniş tətbiqi ilə tanınır — ənənəvi rotary table-a nisbətən daha sürətli və təhlükəsiz connection prosesi təmin edir." },
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
              <li>• Rotary drilling = fırlanma + çəki + sirkulyasiya — süxuru qırıb səthə çıxarma prinsipi</li>
              <li>• Rig 4 əsas sistemdən ibarətdir: hoisting, rotating, circulation, power</li>
              <li>• Qazma dövri prosesdir — hər boru uzunluğundan sonra yeni seqment əlavə olunur</li>
              <li>• Buoyancy factor mud daxilindəki real çəkini hesablamaq üçün vacibdir (hook load oxuması)</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Qazma
          </Link>
          <Link
            href="/learn/drilling/rig-components"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Qazma Qurğusu Komponentləri
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}