"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const barrierLevels = [
  { name: "Birincili Bariyer — Mud Sütunu", role: "Hidrostatik təzyiq formasiya təzyiqini balanslaşdırır", status: "Daim aktiv, normal qazma rejimində əsas müdafiə" },
  { name: "İkincili Bariyer — BOP Stack", role: "Kick baş verərsə quyunu mexaniki şəkildə bağlayır", status: "Ehtiyat bariyer, birincili iflasa uğrayanda işə düşür" },
  { name: "Üçüncülü Bariyer — Kill Prosedurları", role: "Kill mud ilə formasiya təzyiqini yenidən tarazlayır", status: "Aktiv müdaxilə mərhələsi, mühəndis hesablamaları tələb edir" },
];

const bopComponents = [
  { name: "Annular Preventer", func: "İstənilən ölçülü pipe ətrafında rezin elementi sıxaraq bağlayır, hətta open hole-u da qismən bağlaya bilər" },
  { name: "Pipe Rams", func: "Xüsusi ölçülü drill pipe ətrafında polad çənələrlə tam bağlanma yaradır" },
  { name: "Blind Rams", func: "Quyuda heç bir string olmadıqda tam qapanma üçün istifadə olunur" },
  { name: "Shear Rams", func: "Son çarə kimi pipe-ı fiziki kəsərək quyunu tam izolyasiya edir (subsea BOP-larda kritik)" },
  { name: "Choke Manifold", func: "Bağlı quyudan mud/qaz axınını nəzarətli şəkildə səthə çıxarmaq üçün tənzimlənən boru sistemi" },
];

const killMethodSteps = [
  { title: "Driller&apos;s Method — 1-ci dövr", text: "Kill mud hazırlanmadan əvvəl, mövcud mud ilə formasiya mayesi tam dövr etdirilərək səthə çıxarılır (SICP sabit saxlanılır)" },
  { title: "Driller&apos;s Method — 2-ci dövr", text: "Formasiya mayesi tam çıxarıldıqdan sonra kill mud dövr etdirilərək quyu bərabərləşdirilir" },
  { title: "Wait & Weight — Tək Dövr", text: "Kill mud əvvəlcədən tam hazırlanır, yalnız BİR dövrdə həm formasiya mayesi çıxarılır, həm kill mud yerləşdirilir" },
  { title: "Yekun Yoxlama", text: "Hər iki metodda da SIDPP/SICP sıfıra enməli, flow-check aparılaraq quyunun statik olduğu təsdiqlənməlidir" },
];

export default function WellControlLesson() {
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
              2.5.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Problemlər, Təhlükəsizlik və İqtisadiyyat
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Quyu Nəzarəti (Well Control)
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Sual: 60 saniyə içində düzgün qərar verə bilərsinizmi?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              2.5.1-də kick-in nə olduğunu və erkən əlamətlərini gördük. Amma əlaməti tanımaq
              yalnız yarısıdır — real sınaq odur ki, rig heyəti həmin əlamətdən quyunun tam
              nəzarətə alınmasına qədər olan bir neçə dəqiqəni necə idarə edir. Well control
              sənayedə ən çox məşq edilən, amma ən az istifadə olunmağa çalışılan prosedurdur —
              məqsəd elə bir mədəniyyət yaratmaqdır ki, hər kick vaxtında tutulsun və heç vaxt
              blowout-a çevrilməsin. Bu dərsdə həmin prosesin texniki əsaslarını, BOP stack-in
              iş prinsipini və iki əsas kill metodunu ətraflı araşdıracağıq.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Üç Bariyer Prinsipi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Well control fəlsəfəsi tək bir mexanizmə deyil, ardıcıl müdafiə xətlərinə
              əsaslanır — sənayedə buna &quot;barrier philosophy&quot; deyilir:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Bariyer</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Rolu</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {barrierLevels.map((b) => (
                    <tr key={b.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{b.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{b.role}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{b.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[14px] leading-[1.75] mt-3">
              Sənaye standartı odur ki, istənilən vaxt ən azı İKİ bariyer eyni zamanda aktiv
              olmalıdır. Məsələn, casing (2.2.1) və cement (2.2.2) da öz növbəsində əlavə
              statik bariyerlər sayılır — buna görə düzgün sementləmə də əslində well control-un
              bir hissəsidir, təkcə struktur dəstəyi deyil.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. Kick Tolerance — nə qədər kick &quot;təhlükəsizdir&quot;?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Kick tolerance — quyunun casing-i çatlatmadan (fracture) qəbul edə biləcəyi
              maksimum kick həcmidir. Bu, 2.3.2-də gördüyümüz ECD və 2.2.1-dəki fracture
              qradiyenti ilə birbaşa bağlıdır: əgər kill prosesi zamanı annulusda yaranan əlavə
              təzyiq casing shoe-dakı fracture həddini aşarsa, formasiya çatlayır və nəticə
              underground blowout — yəni bir formasiyadan digərinə nəzarətsiz axın olur. Buna
              görə hər dərinlikdə mühəndislər əvvəlcədən icazə verilən maksimum kick həcmini
              hesablayır və bu ədəd real vaxtda pit monitorinqi ilə müqayisə edilir.
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
              Quyunu bağlamaq (shut-in) qərarında tərəddüd — &quot;bəlkə özü dayanar&quot; düşüncəsi —
              well control insidentlərinin ən çox rast gəlinən səbəbidir. Hər əlavə dəqiqə kick
              həcmini artırır və kill prosesini mürəkkəbləşdirir. Şübhəli əlamət aşkar
              ediləndə flow-check gecikdirilmədən aparılmalı, nəticə müsbətdirsə BOP dərhal
              bağlanmalıdır — &quot;gözlə və gör&quot; yanaşması qəbuledilməzdir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. BOP Stack — komponentlər üzrə funksiyalar
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              2.2.3-də BOP-u tanış etmişdik; indi stack-in daxilindəki hər elementin konkret
              vəzifəsinə baxaq:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bopComponents.map((c) => (
                <div key={c.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{c.name}</p>
                  <p className="text-[13px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{c.func}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              4. Kill Sheet — nəyə görə lazımdır?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Kill sheet — quyu bağlanandan dərhal sonra doldurulan, bütün kill əməliyyatını
              addım-addım əvvəlcədən planlaşdıran sənəddir. Onun məqsədi qərarları təcili
              vəziyyətin stresi altında deyil, sakit, sistemli şəkildə qəbul etməkdir. Sənəddə
              SIDPP, SICP, cari mud weight, kill mud weight, pump strokes və gözlənilən
              təzyiq cədvəli (drill pipe pressure schedule) qeyd olunur. Bu cədvəl kill
              prosesinin hər mərhələsində standpipe təzyiqinin nə olmalı olduğunu göstərir —
              beləliklə operator gözlənilməz təzyiq oxusa dərhal fərqi görür.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. İki Əsas Kill Metodu — Driller&apos;s vs Wait & Weight
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Kill mud sirkulyasiyası üçün sənayedə iki əsas yanaşma istifadə olunur, hər
              birinin öz üstünlük və çatışmazlığı var:
            </p>
            <ol className="space-y-2 text-[13.5px] leading-[1.7]" style={{ color: "#C4CEE0" }}>
              {killMethodSteps.map((s, i) => (
                <li key={s.title}>
                  <span style={{ color: PATH_COLOR, fontWeight: 600 }}>{i + 1}.</span>{" "}
                  <span style={{ color: "#E8DCC8", fontWeight: 600 }}>{s.title}</span> — {s.text}
                </li>
              ))}
            </ol>
            <p className="text-[14px] leading-[1.75] mt-3">
              Driller&apos;s Method daha sadədir və mud hazır olmasa belə dərhal başlaya bilər, amma
              iki dövr tələb etdiyi üçün ümumi təzyiq daha uzun müddət yüksək qalır. Wait &
              Weight isə daha az müddətdə bitir və annulus təzyiqinə ümumi təsiri daha aşağıdır,
              amma kill mud-un tam hazır olmasını gözləmək lazımdır — bu da vaxt itkisi
              deməkdir. Seçim çox vaxt mud tədarükünün sürətindən və quyunun kick tolerance
              marjından asılıdır.
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
              Kill prosesi zamanı choke operatorunun səhv tənzimləməsi (choke-u həddindən artıq
              bağlaması) annulusda ani təzyiq artımına səbəb ola bilər — bu, casing shoe-da
              fracture yaradaraq lost circulation-u (2.5.1) tetikləyə bilər. Choke tənzimləməsi
              həmişə kill sheet-dəki planlaşdırılmış təzyiq cədvəlinə uyğun, tədricən aparılmalı,
              ani hərəkətlərdən qətiyyən qaçınılmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — Maksimum İcazə Verilən Annulus Təzyiqi (MAASP)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              2.5.1-dəki nümunədə TVD = 9,000 ft, casing shoe-nun fracture qradiyenti isə
              2.2.1-dəki mud weight window-un yuxarı həddi olan 16.35 ppg-ə uyğun olsun. Kill
              mud weight 13.33 ppg (2.5.1-dən) olduğuna görə, MAASP-i hesablayaq:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: TVD = 9,000 ft, Fracture qradiyenti = 16.35 ppg, Kill Mud Weight = 13.33 ppg
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>MAASP = 0.052 × (Fracture MW − Cari MW) × TVD</p>
                <p>MAASP = 0.052 × (16.35 − 13.33) × 9,000</p>
                <p>MAASP = 0.052 × 3.02 × 9,000 = <span style={{ color: PATH_COLOR }}>1,413 psi</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: kill mud ilə dövr edərkən annulusdakı təzyiq 1,413 psi-dən yuxarı
                qalxmamalıdır — əks halda casing shoe-da fracture riski yaranar. Choke operatoru
                bu ədədi kill sheet-ə yazır və bütün proses boyu casing təzyiqi bu limitdən aşağı
                saxlanılır. Diqqət yetirin ki, bu ədəd nə qədər kiçikdirsə (dar marj), operatorun
                səhv marjı da bir o qədər azdır — buna görə dərin, dar mud weight window-lu
                quyularda well control daha həssas idarə olunmalıdır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Macondo hadisəsi, Meksika Körfəzi (2010)", text: "Negative pressure test-in yanlış şərh olunması və shut-in prosedurunun gecikməsi hadisənin əsas səbəbləri sırasında qeyd olunub; bu hadisədən sonra Wells Control sertifikasiyası (IWCF/IADC) tələbləri sənayedə əhəmiyyətli dərəcədə sərtləşdirilib." },
                { name: "ACG, Xəzər dənizi, Azərbaycan (BP)", text: "Yüksək təzyiqli, dərin quyularda dar mud weight window səbəbindən MAASP marjı adətən çox kiçik olur, buna görə real-time təzyiq monitorinqi və avtomatlaşdırılmış xəbərdarlıq sistemləri geniş tətbiq edilir." },
                { name: "Shah Deniz layihəsi, Azərbaycan (BP/SOCAR)", text: "Yüksək təzyiqli qaz-kondensat quyularında H₂S riski minimal olsa da, yüksək formasiya təzyiqi səbəbindən well control planlaması xüsusi diqqətlə, ciddi kill sheet nəzarəti ilə aparılır." },
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
              <li>• Well control üç ardıcıl bariyerə əsaslanır — istənilən vaxt ən azı ikisi aktiv olmalıdır</li>
              <li>• Kick tolerance quyunun casing-i çatlatmadan qəbul edə biləcəyi maksimum kick həcmidir</li>
              <li>• BOP stack-in hər elementi (annular, pipe rams, blind rams, shear rams) fərqli ssenari üçün nəzərdə tutulub</li>
              <li>• Driller&apos;s Method iki dövr, Wait & Weight isə tək dövrlə kill prosesini tamamlayır</li>
              <li>• MAASP kill prosesi zamanı casing shoe-nun fracture riskini önləyən əsas təzyiq limitidir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling/drilling-problems"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Qazma Problemləri
          </Link>
          <Link
            href="/learn/drilling/drilling-economics"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Qazma Iqtisadiyyatı
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}