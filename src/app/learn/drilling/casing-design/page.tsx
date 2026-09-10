"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const casingTypes = [
  { name: "Conductor Casing", od: "16″ – 30″", depth: "30 – 300 ft", role: "Səthdəki zəif, konsolidə olunmamış qatları saxlayır, ilkin dairəvi axını təmin edir" },
  { name: "Surface Casing", od: "9.625″ – 20″", depth: "300 – 5,000 ft", role: "Şirin su horizontlarını mühafizə edir, BOP-un quraşdırıldığı əsas struktur təbəqədir" },
  { name: "Intermediate Casing", od: "7″ – 13.375″", depth: "5,000 – 12,000 ft", role: "Qeyri-sabit zonaları (məs. yüksək təzyiqli, tükənmiş layları) izolyasiya edir" },
  { name: "Production Casing", od: "4.5″ – 9.625″", depth: "Rezervuara qədər", role: "Son istehsal borusu — tubing və perforasiya bu daxildə həyata keçirilir" },
];

const designLoads = [
  { name: "Burst (Partlama)", note: "Casing daxilində təzyiqin xaricdəkindən çox olması — məs. yüksək təzyiqli kick zamanı" },
  { name: "Collapse (Çökmə)", note: "Xaricdəki təzyiqin (mud sütunu) daxilidən çox olması — məs. boşaldılmış casing zamanı" },
  { name: "Tension (Dartılma)", note: "Casing-in öz çəkisi və asma yükü altında dartılması — ən çox yuxarı birləşmələrdə kritikdir" },
  { name: "Triaxial Gərginlik", note: "Burst, collapse və tension-un birgə təsirini nəzərə alan real dünya analizi" },
];

export default function CasingDesignLesson() {
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
              2.2.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Quyu Konstruksiyası
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Casing Dizaynı və Növləri
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Bina tikərkən niyə bir mərtəbədə dayanmırıq?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Uzun mərtəbəli bina tikilərkən hər mərtəbə əvvəlkindən daha az yük daşıyır, amma
              hamısı birlikdə strukturu ayaqda saxlayır. Quyu da eynilə — tək bir boru xətti ilə
              deyil, iç-içə yerləşdirilmiş bir neçə casing (örtük borusu) təbəqəsi ilə tikilir.
              Hər təbəqə fərqli dərinliyə enir, fərqli zonanı izolyasiya edir və fərqli yük
              daşıyır. Bu dərsdə casing növlərini, onların funksiyalarını və dizayn zamanı hansı
              yüklərin nəzərə alındığını araşdıracağıq.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Casing təbəqələri — səthdən rezervuara doğru
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Quyu dərinləşdikcə hər casing təbəqəsi əvvəlkinin daxilindən keçir və özündən
              kiçik diametrli olur — buna görə quyu profili yuxarıdan aşağıya doğru
              &quot;teleskopik&quot; formaya bənzəyir:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Casing Növü</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Xarici diametr</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Tipik dərinlik</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Rolu</th>
                  </tr>
                </thead>
                <tbody>
                  {casingTypes.map((c) => (
                    <tr key={c.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{c.name}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{c.od}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: "#9FAEC4" }}>{c.depth}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{c.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. Conductor və Surface Casing — ilk müdafiə xətti
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Conductor casing ən dayaz və ən enli təbəqədir — səthdəki boş, konsolidə olunmamış
              çöküntüləri saxlayır ki, qazma məhlulu quyu ətrafında sızmasın. Ondan bir az dərinə
              enən surface casing isə daha kritik funksiya daşıyır: yeraltı şirin su horizontlarını
              qazma məhlulunun çirklənməsindən qoruyur və BOP (Blowout Preventer) sistemi məhz bu
              casing-in üstünə quraşdırılır. Surface casing dərinliyi adətən regional qanunvericiliklə
              (su horizontlarının dərinliyinə görə) tənzimlənir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Intermediate Casing — qeyri-sabit zonaların izolyasiyası
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Dərinlik artdıqca quyu adətən problemli intervallardan keçir — yüksək təzyiqli qaz
              zonaları, tükənmiş (aşağı təzyiqli) layalar, ya da qeyri-sabit gil qatları. Bu
              zonalardan keçdikdən sonra intermediate casing endirilərək onlar izolyasiya edilir,
              bununla da qazma davam etdikcə yuxarı zonaların aşağı, daha həssas zonalara təsiri
              (məs. lost circulation və ya kick riski) aradan qaldırılır. Bəzi dərin quyularda
              birdən çox intermediate casing təbəqəsi tələb oluna bilər.
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
              Casing endirilməsi zamanı hər boru qoşulması (stabbing) zamanı barmaq və əl
              sıxılma (pinch point) riski yüksəkdir — xüsusən V-door və catwalk zonasında ağır
              casing seqmentləri hərəkət edərkən. Heyət əl-alət mövqeyini daim casing
              trayektoriyasından kənarda saxlamalı və stabbing guide istifadə etməlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Dizayn zamanı nəzərə alınan yüklər
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Casing seçimi təkcə diametrlə bitmir — hər casing seqmenti quyunun ömrü boyu
              məruz qalacağı yükləri təhlükəsiz daşıya bilməlidir:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {designLoads.map((d) => (
                <div key={d.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{d.name}</p>
                  <p className="text-[13px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{d.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              5. API Grade və Design Factor konsepti
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Hər casing borusu API standartına uyğun grade ilə (məs. J-55, N-80, P-110)
              işarələnir — rəqəm poladın minimum axma gərginliyini (yield strength, min psi)
              göstərir. Amma bir casing seçilərkən yalnız nominal gücə deyil, real yükə nisbətdə
              qalan &quot;marja&quot;ya — design factor-a — baxılır. Sənaye standartı olaraq
              burst üçün adətən 1.1–1.25, collapse üçün 1.0–1.125, tension üçün 1.6–1.8 aralığında
              minimum design factor tələb olunur — bu ehtiyat, ölçmə xətalarını, korroziyanı və
              gözlənilməz yük artımlarını kompensasiya edir.
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
              Casing çox sürətli endirildikdə, boru altında sıxılan mud &quot;piston effekti&quot;
              yaradaraq quyu dibindəki təzyiqi qısa müddətə kəskin artıra (surge) və ya
              çıxarılan həcmi kompensasiya etməyəndə azalda (swab) bilər. Swab effekti hidrostatik
              təzyiqi formasiya təzyiqindən aşağı salaraq kick riskini artırır. Buna görə casing
              endirmə sürəti mütləq hesablanmış həddə (running speed limit) uyğun saxlanılmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — Collapse Design Factor
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Intermediate casing seçimini yoxlayaq: 9,000 ft dərinlikdə, boşaldılmış quyu
              ssenarisində (worst-case collapse yükü) xarici mud sütunu təzyiqi hesablanır və
              seçilmiş casing-in rated collapse gücü ilə müqayisə olunur:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: dərinlik = 9,000 ft, mud sıxlığı = 11.5 ppg, seçilmiş casing (N-80, 47 lb/ft) rated collapse = 4,750 psi
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Xarici təzyiq = 0.052 × 11.5 × 9,000 = 5,382 psi</p>
                <p>Collapse Design Factor = Rated Collapse / Gözlənilən Yük</p>
                <p>DF = 4,750 / 5,382 = <span style={{ color: PATH_COLOR }}>0.88 (kifayət deyil)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: minimum tələb olunan 1.0–1.125 həddindən aşağı olduğu üçün bu casing
                bu dərinlik və mud sıxlığı üçün yararsızdır — mühəndis ya daha yüksək grade
                (məs. P-110), ya daha qalın divar, ya da daha ağır çəkili casing seçməlidir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan (BP)", text: "Offshore quyu proqramlarında yüksək dərinlik və dəniz mühiti korroziya riski səbəbindən çox təbəqəli casing dizaynı və yüksək design factor tələbləri tətbiq olunur." },
                { name: "Şimal dənizi, Norveç (Equinor)", text: "Yüksək təzyiq/yüksək temperatur (HPHT) quyularında əlavə intermediate casing təbəqələri və xüsusi korroziyaya davamlı grade-lər (CRA) geniş istifadə olunur." },
                { name: "Permian Basin, ABŞ", text: "Çoxsaylı horizontal quyularda tez və təkrarlanan casing proqramları standartlaşdırılıb, bu da xərcin azaldılmasına və tikinti sürətinin artırılmasına imkan verir." },
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
              <li>• Quyu teleskopik struktura malikdir: conductor → surface → intermediate → production casing</li>
              <li>• Hər casing fərqli funksiya daşıyır — su mühafizəsi, BOP dayağı, qeyri-sabit zona izolyasiyası</li>
              <li>• Dizayn üç əsas yükə görə yoxlanılır: burst, collapse, tension (və triaxial analiz)</li>
              <li>• Design factor rated gücün gözlənilən yükə nisbətidir — 1.0-dan az olarsa casing yararsızdır</li>
              <li>• Sürətli casing endirmə swab effekti ilə kick riskini artıra bilər</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling/bit-selection-rop"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Bit Seçimi və ROP Optimallaşdırması
          </Link>
          <Link
            href="/learn/drilling/cementing"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Sementləmə (Cementing)
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}