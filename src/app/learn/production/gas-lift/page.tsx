"use client";
import Link from "next/link";

const PATH_COLOR = "#E8B33D";

const gasLiftTypes = [
  { name: "Continuous Gas Lift", desc: "Qaz daimi olaraq, sabit sürətlə tubing-ə vurulur", best: "Orta-yüksək debitli quyular, sabit istehsal rejimi" },
  { name: "Intermittent Gas Lift", desc: "Qaz dövri olaraq, böyük həcmli 'zərbələr' şəklində vurulur", best: "Aşağı debitli, aşağı reservoir təzyiqli quyular" },
  { name: "Plunger-Assisted Gas Lift", desc: "Mexaniki plunger ilə birləşdirilmiş intermittent üsul — flüid geri düşməsinin qarşısını alır", best: "Maye yüklənməsi (liquid loading) problemi olan qaz quyuları" },
];

export default function GasLiftLesson() {
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
              5.2.4
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Süni Qaldırma Üsulları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Gas Lift
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Sual: bir stəkan qazlı suyu niyə qaldırmaq asandır, sadə suyu isə çətin?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              ESP dərsində gördük ki, mexaniki nasoslar flüidə birbaşa enerji ötürür. Gas
              lift isə fərqli bir məntiqlə işləyir — heç bir yeraltı hərəkətli hissə
              olmadan. Sadə bir müşahidə ilə başlayaq: qazlı içki şüşəsini açanda köpük
              yuxarı doğru sürətlə qalxır, çünki qazın genişlənməsi mayeni özü ilə aparır.
              Məhz bu fiziki prinsip — <strong>qazın flüid sütununu yüngülləşdirməsi</strong> —
              gas lift-in əsasını təşkil edir və xüsusilə yüksək qaz-neft nisbətinə malik
              quyularda ən səmərəli artificial lift üsullarından birinə çevrilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Gas lift necə işləyir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Sıxılmış qaz səthdən kompressor vasitəsilə casing-tubing annulusuna vurulur.
              Bu qaz, tubing üzərində müəyyən dərinliklərdə yerləşdirilmiş <strong>gas lift
              valve</strong>-lər vasitəsilə tubing daxilinə keçir və orada olan flüidlə
              qarışır. Qarışığın orta sıxlığı azaldığı üçün, eyni reservoir təzyiqi ilə
              daha "yüngül" sütunu qaldırmaq asanlaşır. Nəticədə flüid-qaz qarışığı tubing
              boyu yuxarı hərəkət edərək səthə çatır — bütün proses heç bir yeraltı
              hərəkətli mexaniki hissə olmadan baş verir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Gas lift növləri
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Növ</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təsvir</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Ən uyğun olduğu hal</th>
                  </tr>
                </thead>
                <tbody>
                  {gasLiftTypes.map((c) => (
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
              3. Gas lift valve-lərin rolu
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Tubing üzərində bir neçə dərinlikdə yerləşdirilmiş valve-lər (mandrel-lərə
              quraşdırılmış) — quyunun işə salınması (unloading) prosesində ardıcıl açılıb
              bağlanaraq, qazın optimal dərinliyə qədər enməsinə imkan verir. İlk vaxtlar
              yuxarı valve-lər açıq olur, annulus təzyiqi düşdükcə ardıcıl olaraq daha
              dərindəki valve-lər işə düşür, sonda yalnız ən dərin — <strong>operating
              valve</strong> — açıq qalır. Bu ardıcıllıq, quyunun tədricən "boşaldılmasını"
              (unloading) təmin edir və qazın mümkün qədər dərin nöqtədə inyeksiya
              olunmasına imkan verir — bu da maksimum qaldırma effektivliyi deməkdir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Gas lift dizaynında əsas parametrlər
            </h2>
            <div className="space-y-2.5">
              {[
                "İnyeksiya təzyiqi — kompressorun təmin edə biləcəyi maksimum qaz təzyiqi",
                "İnyeksiya dərinliyi (point of injection) — nə qədər dərinsə, o qədər effektivdir",
                "Qaz-flüid nisbəti (GLR) — optimal nöqtədən sonra əlavə qaz debiti artırmır, əksinə azalda bilər",
                "Valve sayı və yerləşməsi — unloading prosesinin uğurla başa çatması üçün kritikdir",
                "Mövcud qaz mənbəyi və kompressiya infrastrukturu",
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
              <strong>Continuous vs Intermittent Gas Lift:</strong> Continuous gas lift
              sabit, proqnozlaşdırıla bilən istehsal təmin edir və orta-yüksək debitli
              quyularda ən effektivdir, amma aşağı debitli quyularda daimi qaz inyeksiyası
              iqtisadi baxımdan səmərəsiz olur (qaz sərfiyyatı gəlirdən çox arta bilər).
              Intermittent gas lift isə aşağı debitli, aşağı təzyiqli quyularda qazı daha
              səmərəli istifadə edir — böyük "zərbələrlə" flüidi qaldırır, amma istehsal
              profili qeyri-bərabər olur və valve-lərin daha tez-tez tsiklə məruz qalması
              onların ömrünü qısaldır. Seçim, quyunun reservoir təzyiqi, debit potensialı
              və mövcud qaz həcmindən asılıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Qarışığın Effektiv Sıxlığının Azalması
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Gas lift-in effektivliyini sadə şəkildə göstərmək üçün, inyeksiya edilən qazın
              flüid-qaz qarışığının orta sıxlığına təsirini hesablayaq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: flüidin sıxlığı ρ_l = 850 kg/m³, qazın effektiv sıxlığı (təzyiq
                altında) ρ_g = 45 kg/m³, inyeksiya edilən qazın həcm payı (gas holdup) = 30%
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                ρ_qarışıq = (1 − f_g) × ρ_l + f_g × ρ_g
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>ρ_qarışıq = (0.70 × 850) + (0.30 × 45) = 595 + 13.5 = <span style={{ color: PATH_COLOR }}>≈ 609 kg/m³</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: qazın inyeksiyası ilə qarışığın orta sıxlığı 850-dən 609 kg/m³-ə
                qədər azalır — bu, təxminən 28% azalma deməkdir. Daha aşağı sütun sıxlığı,
                eyni reservoir təzyiqi ilə daha yüksək debitin qaldırılmasına imkan verir.
                Praktikada optimal qaz həcmi mövcud olduğundan sonra əlavə qaz vurmaq
                artıq faydalı olmur — çünki sürtünmə itkiləri sıxlıq azalmasının
                üstünlüyünü üstələməyə başlayır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Sahil terminalından (Sangachal) təmin olunan güclü qaz infrastrukturu sayəsində continuous gas lift geniş tətbiq olunur." },
                { name: "Cantarell sahəsi, Meksika", text: "Bir vaxtlar dünyanın ən böyük gas lift layihələrindən biri idi — nəhəng karbonat kollektorunda yüksək debitli quyularda." },
                { name: "Prudhoe Bay, Alyaska, ABŞ", text: "Böyük miqyaslı gas lift sistemləri tətbiq olunur — soyuq iqlim şəraitində etibarlı, aşağı baxım tələb edən üsul olaraq üstünlük təşkil edir." },
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
              <li>• Gas lift qazı tubing-ə vuraraq flüid sütununun sıxlığını azaldır və qaldırmanı asanlaşdırır</li>
              <li>• Continuous üsul orta-yüksək debitə, intermittent isə aşağı debitə uyğundur</li>
              <li>• Valve-lər ardıcıl açılaraq quyunun unloading prosesini idarə edir</li>
              <li>• Heç bir yeraltı hərəkətli hissə yoxdur — bu, yüksək etibarlılıq deməkdir</li>
              <li>• Effektivlik mövcud qaz infrastrukturundan və quyunun GLR-indən asılıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/production/electrical-submersible-pump-esp"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← ESP
          </Link>
          <Link
            href="/learn/production/inflow-performance-relationship-ipr"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: IPR
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}