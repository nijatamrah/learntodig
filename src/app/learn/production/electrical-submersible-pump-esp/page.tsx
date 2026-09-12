"use client";
import Link from "next/link";

const PATH_COLOR = "#E8B33D";

const espComponents = [
  { name: "Elektrik Mühərriki", desc: "Quyu dibinə yaxın yerləşən, iki fazalı, yağla doldurulmuş elektrik mühərriki", best: "Səthdən kabel vasitəsilə enerji alır, nasosu fırladır" },
  { name: "Çoxpilləli Mərkəzdənqaçma Nasos", desc: "Onlarla, bəzən yüzlərlə pillədən (stage) ibarət — hər pillə impeller+diffuser cütlüyü", best: "Hər pillə təzyiqə kiçik əlavə edir, ümumi qaldırma yüksəkliyini formalaşdırır" },
  { name: "Seal Section (Protector)", desc: "Mühərriklə nasos arasında yerləşir, mühərrik yağını quyu flüidindən qoruyur", best: "Təzyiq balansını saxlayır, mühərrikin nəmlənməsinin qarşısını alır" },
  { name: "Power Cable və VSD", desc: "Səthdən mühərrikə enerji ötürən kabel və Variable Speed Drive (dəyişkən sürət drayveri)", best: "VSD nasosun fırlanma sürətini tənzimləyərək debiti dəyişməyə imkan verir" },
];

export default function ElectricalSubmersiblePumpEspLesson() {
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
              5.2.3
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Süni Qaldırma Üsulları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Electrical Submersible Pump (ESP)
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Analogiya: 3000 metr dərinlikdə işləyən elektrik mühərriki
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Sucker rod pumping-də bütün mexanika səthdə, yalnız nasos aşağıdadır — amma
              ESP-də vəziyyət tamamilə fərqlidir. Təsəvvür edin: bütöv bir elektrik mühərriki,
              onu qoruyan sistem və çoxpilləli nasos — hamısı bir boru daxilinə sığdırılıb,
              minlərlə metr dərinliyə endirilib, yüksək temperatur və təzyiq altında illərlə
              fasiləsiz işləməlidir. Bu, <strong>Electrical Submersible Pump (ESP)</strong>
              sisteminin mahiyyətidir — yüksək debitli quyular üçün nəzərdə tutulmuş, ən
              texnoloji cəhətdən mürəkkəb artificial lift üsuludur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. ESP necə işləyir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Səthdən yüksək gərginlikli elektrik enerjisi transformator vasitəsilə lazımi
              səviyyəyə endirilir, sonra power cable ilə tubing boyu quyu dibinə ötürülür.
              Yeraltı elektrik mühərriki bu enerjini fırlanma hərəkətinə çevirir və seal
              section vasitəsilə bu hərəkəti çoxpilləli mərkəzdənqaçma nasosuna ötürür.
              Nasos daxilində hər pillə (stage) flüidə kiçik bir təzyiq əlavə edir — çoxlu
              pillələr ardıcıl işlədikcə ümumi təzyiq artımı toplanır və flüid tubing
              vasitəsilə səthə qaldırılır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Sistemin əsas komponentləri
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Komponent</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təsvir</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Rolu</th>
                  </tr>
                </thead>
                <tbody>
                  {espComponents.map((c) => (
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
              3. Çoxpilləli nasos konsepsiyası
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Hər bir "pillə" (stage) — bir impeller (fırlanan hissə) və bir diffuser (sabit
              hissə) cütündən ibarətdir. Impeller flüidə kinetik enerji verir, diffuser isə
              bu kinetik enerjini təzyiq enerjisinə çevirir. Tək bir pillə çox az təzyiq
              artımı yaradır (adətən bir neçə psi), amma ESP-lər tipik olaraq 50-400 pillədən
              ibarət ola bilir — bu, tələb olunan ümumi qaldırma yüksəkliyinə (total dynamic
              head, TDH) görə seçilir. Pillə sayı nə qədər çoxdursa, nasos bir o qədər uzun
              olur və bir o qədər böyük TDH təmin edə bilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. ESP dizaynında nəzərə alınan əsas amillər
            </h2>
            <div className="space-y-2.5">
              {[
                "Tələb olunan debit (Q) və Total Dynamic Head (TDH) — pillə sayını və nasos tipini müəyyən edir",
                "Qaz-neft nisbəti (GOR) — yüksək GOR sərbəst qaz separasiyası tələb edir, əks halda 'gas lock' riski var",
                "Quyu temperaturu — mühərrik izolyasiyası və kabel materialı buna uyğun seçilməlidir",
                "Casing diametri — ESP-nin xarici ölçüsünü məhdudlaşdırır",
                "Qum tərkibi və korroziv komponentlər (H₂S, CO₂) — abraziya-davamlı materiallar tələb edə bilər",
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
              <strong>ESP vs Gas Lift:</strong> ESP çox yüksək debitlərdə (10,000+ bbl/gün)
              ən effektiv seçimdir və dəqiq debit nəzarəti (VSD ilə) təmin edir, amma yüksək
              GOR-lu quyularda performansı pisləşir (gas lock riski), elektrik təchizatı
              tələb edir və nasazlıq halında bütün sistemin çıxarılması (workover) baha
              başa gəlir. Gas lift isə yüksək GOR-lu quyularda təbii üstünlüyə malikdir —
              əslində əlavə qazın özü problem deyil, üstünlükdür — heç bir yeraltı hərəkətli
              hissə yoxdur (etibarlılıq yüksəkdir) və valve-lər wireline ilə çıxarıla bilir
              (rig tələb olunmur), amma aşağı debitli quyularda səmərəliliyi azalır və
              kompressor infrastrukturu tələb edir. Seçim, quyunun GOR-u, mövcud infrastruktur
              və debit tələbindən asılıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Tələb Olunan Pillə Sayı
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Lazımi pillə sayı, ümumi tələb olunan qaldırma yüksəkliyinin (TDH) bir pillənin
              verdiyi təzyiq artımına bölünməsi ilə tapılır:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: TDH = 6000 ft, seçilmiş nasos modelinin bir pillə üzrə baş
                (head per stage) göstəricisi = 25 ft/pillə
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                N_pillə = TDH / Head_per_stage
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>N_pillə = 6000 / 25 = <span style={{ color: PATH_COLOR }}>240 pillə</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: seçilmiş debit nöqtəsində tələb olunan qaldırma yüksəkliyinə çatmaq
                üçün 240 pillədən ibarət nasos lazımdır. Praktikada bu, bir neçə "seksiya"ya
                (tandem) bölünərək quraşdırılır, çünki bir gövdə daxilində bu qədər pilləni
                yerləşdirmək struktur baxımından mümkün olmur — bu səbəbdən ESP-lər adətən
                2-3 ayrı seksiyadan ibarət olur.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Yüksək debitli quyularda geniş şəkildə ESP tətbiq olunur — dəniz platformalarında məhdud sahədə maksimum debit tələbinə görə." },
                { name: "Permian Basin, ABŞ", text: "Şist quyularının böyük hissəsində ESP standart üsuldur — flowback və istehsalın ilk illərindəki yüksək debit tələbinə görə." },
                { name: "Rumaila sahəsi, İraq", text: "Dünyanın ən böyük ESP-lərindən bəziləri burada istismar olunur — nəhəng kollektorun yüksək debit potensialını tam realizə etmək üçün." },
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
              <li>• ESP — yeraltı elektrik mühərriki və çoxpilləli mərkəzdənqaçma nasosdan ibarət sistemdir</li>
              <li>• Hər pillə (impeller+diffuser) kiçik təzyiq artımı verir, çoxlu pillə ümumi TDH-ni formalaşdırır</li>
              <li>• Yüksək debitli quyular üçün ideal, amma yüksək GOR-da performans problemi yarada bilər</li>
              <li>• VSD ilə fırlanma sürəti tənzimlənərək debit çevik idarə oluna bilir</li>
              <li>• Nasazlıqda bütün sistemin çıxarılması tələb olunur — bu, ESP-nin əsas çatışmazlığıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/production/sucker-rod-pumping"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Sucker Rod Pumping
          </Link>
          <Link
            href="/learn/production/gas-lift"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Gas Lift
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}