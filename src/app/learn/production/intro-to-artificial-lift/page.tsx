"use client";
import Link from "next/link";

const PATH_COLOR = "#E8B33D";

const liftMethods = [
  { name: "Sucker Rod Pumping", desc: "Səthdə yerləşən bir pump jack, ştanqlar vasitəsilə yeraltı pistonlu nasosu hərəkətə gətirir", best: "Aşağı-orta debitli, dayaz-orta dərinlikli quyular — ən geniş yayılmış üsul" },
  { name: "Electrical Submersible Pump (ESP)", desc: "Quyu daxilində yerləşən elektrik mühərrikli çoxpilləli mərkəzdənqaçma nasos", best: "Yüksək debitli quyular, xüsusilə su kəsilməsi yüksək olanlar" },
  { name: "Gas Lift", desc: "Sıxılmış qaz tubing-ə vurularaq flüid sütununu yüngülləşdirir və qaldırır", best: "Yüksək GOR-lu quyular, əyri/horizontal quyular, mövcud qaz infrastrukturu olan sahələr" },
  { name: "Hydraulic Pumping", desc: "Səthdən vurulan hidravlik güc mayesi ilə işləyən yeraltı piston və ya jet nasos", best: "Dərin, əyri quyular, uzaq/əlçatmaz lokasiyalar" },
];

export default function IntroToArtificialLiftLesson() {
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
              5.2.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Süni Qaldırma Üsulları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Artificial Lift-ə Giriş
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Sual: quyu təbii axmağı dayandıranda nə edirik?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Well Completion bölməsində quyunu kollektorla necə "birləşdirdiyimizi" öyrəndik —
              amma bu birləşmə təkbaşına flüidi səthə çıxarmır. Quyunun ilkin dövründə
              reservoir təzyiqi adətən flüidi öz-özünə səthə qaldırmaq üçün kifayət edir
              (buna <strong>natural flow</strong> deyilir). Zamanla isə, kollektor tükəndikcə
              təzyiq azalır və bir gün flüidi səthə çıxarmaq üçün artıq kifayət etmir. Məhz bu
              nöqtədə <strong>artificial lift (süni qaldırma)</strong> devrəyə girir — quyuya
              xarici enerji əlavə edərək istehsalı davam etdirmək üçün istifadə olunan
              üsulların ümumi adı.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Niyə quyular təbii axmağı dayandırır?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Bir quyunun axıb-axmaması, reservoir təzyiqinin flüid sütununun çəkisini
              (hydrostatic head) və səth təzyiq tələblərini (wellhead pressure, boru xətti
              təzyiqi) ötüb-ötmədiyindən asılıdır. İstehsal davam etdikcə reservoir təzyiqi
              tükənir (depletion), su kəsilməsi (water cut) artır, bu da flüid sütununun
              orta sıxlığını artıraraq lazım olan qaldırma enerjisini böyüdür. Nəticədə, ilk
              vaxtlar güclü axan quyu, illər sonra artıq öz enerjisi ilə flüidi səthə
              çatdıra bilmir və istehsal dayanır və ya iqtisadi baxımdan mənasız həddə düşür.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Əsas artificial lift üsulları
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Üsul</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təsvir</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Ən uyğun olduğu hal</th>
                  </tr>
                </thead>
                <tbody>
                  {liftMethods.map((c) => (
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
              3. Qaldırma prinsipi: enerji haradan gəlir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Bütün artificial lift üsulları, əslində, iki əsas prinsipdən birinə əsaslanır:
              flüid sütununun sıxlığını azaltmaq (gas lift-də olduğu kimi — qaz qarışdırıldıqda
              qarışığın orta sıxlığı düşür və eyni təzyiqlə daha yüngül sütunu qaldırmaq
              asanlaşır) və ya birbaşa mexaniki enerji ilə flüidi itələmək (sucker rod, ESP,
              hydraulic pumping-də olduğu kimi — nasos flüidə birbaşa təzyiq enerjisi ötürür).
              Üsul seçimi zamanı bu iki fərqli yanaşmanın hansının konkret quyunun dərinlik,
              debit və flüid xüsusiyyətlərinə daha uyğun olduğu qiymətləndirilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Üsul seçiminə təsir edən əsas amillər
            </h2>
            <div className="space-y-2.5">
              {[
                "Quyunun dərinliyi və inklinasiyası (əyriliyi) — bəzi üsullar dərin, əyri quyularda məhdudlaşır",
                "Gözlənilən debit diapazonu — ESP yüksək debitə, sucker rod isə aşağı-orta debitə uyğundur",
                "Qaz-neft nisbəti (GOR) — yüksək GOR gas lift-i, ya da ESP-də qaz separasiyasını tələb edir",
                "Flüid xüsusiyyətləri — özlülük, qum tərkibi, korroziv komponentlər (H₂S, CO₂)",
                "Mövcud infrastruktur və əməliyyat xərcləri — elektrik xətti, kompressor stansiyası mövcudluğu",
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
              <strong>ESP vs Sucker Rod Pumping:</strong> ESP çox yüksək debitlər (minlərlə
              barel/gün) verə bilir, kompakt ölçüsü sayəsində əyri/horizontal quyularda da
              işləyir, amma yeraltı elektrik mühərriki qum və yüksək temperatura həssasdır,
              nasazlıq halında bütün sistemi çıxarmaq (workover) tələb olunur və başlanğıc
              investisiyası yüksəkdir. Sucker rod pumping isə daha ucuz, daha etibarlı və
              sahə şəraitində asanlıqla təmir olunandır, amma dərinlik və əyrilik məhdudiyyəti
              var (ştanqların mexaniki gərginliyi səbəbindən) və debit tutumu ESP-yə nisbətən
              xeyli aşağıdır. Seçim, quyunun geometriyası, gözlənilən debit və əməliyyat
              büdcəsinə əsasən edilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Natural Flow-un Dayanma Nöqtəsi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Quyunun hələ təbii axıb-axmadığını qiymətləndirmək üçün, reservoir təzyiqini
              lazımi minimum təzyiqlə (flüid sütununun hidrostatik təzyiqi + səth tələbi)
              müqayisə edirik:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: quyu dərinliyi D = 2500 m, flüid qradiyenti = 0.10 bar/m, tələb olunan səth təzyiqi = 15 bar
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                P_min = (D × qradiyent) + P_səth
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>P_min = (2500 × 0.10) + 15 = 250 + 15 = <span style={{ color: PATH_COLOR }}>265 bar</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: reservoir təzyiqi 265 bar-dan aşağı düşən kimi, quyu artıq öz gücü ilə
                flüidi səthə çatdıra bilmir — bu, artificial lift-in tətbiqinin başlanğıc
                nöqtəsidir. Real layihələrdə bu hesablama vaxtla (reservoir tükənmə əyrisi
                üzrə) təkrarlanaraq lift üsulunun nə vaxt işə salınmalı olduğu planlaşdırılır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan", text: "Bir çox quyuda gas lift sistemi tətbiq olunur — mövcud güclü qaz infrastrukturundan (Sangachal terminalı) səmərəli istifadə üçün." },
                { name: "Permian Basin, ABŞ", text: "ESP ən çox yayılmış üsuldur — yüksək debitli şist quyularında böyük həcmli flüidi effektiv qaldırmaq üçün." },
                { name: "Şərqi Texas sahələri, ABŞ", text: "Sucker rod pumping (pump jack) ənənəvi olaraq dominant üsuldur — aşağı-orta debitli, dayaz-orta dərinlikli quyularda ucuzluğu və etibarlılığı sayəsində." },
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
              <li>• Artificial lift, reservoir təzyiqi flüidi səthə çıxarmaq üçün kifayət etmədikdə tətbiq olunur</li>
              <li>• Əsas üsullar: sucker rod pumping, ESP, gas lift, hydraulic pumping</li>
              <li>• Üsullar ya flüid sütununu yüngülləşdirir, ya da birbaşa mexaniki enerji ötürür</li>
              <li>• Seçim dərinlik, debit, GOR, flüid xüsusiyyətləri və infrastrukturdan asılıdır</li>
              <li>• ESP yüksək debitə uyğundur, sucker rod isə ucuz və etibarlı, amma məhdud dərinlikdədir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/production/sand-control"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Sand Control
          </Link>
          <Link
            href="/learn/production/sucker-rod-pumping"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Sucker Rod Pumping
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}