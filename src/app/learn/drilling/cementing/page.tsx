"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const cementFunctions = [
  { name: "Zonal İzolyasiya", note: "Casing ilə quyu divarı arasındakı boşluğu doldurub müxtəlif təzyiqli/mayeli qatları bir-birindən ayırır" },
  { name: "Struktur Dəstək", od: "", note: "Casing-i quyu divarına bərkidərək onun aşağı çəkiyə davamlılığını artırır" },
  { name: "Korroziya Mühafizəsi", note: "Casing-i formasiya sularının korroziv təsirindən izolyasiya edir" },
  { name: "BOP Yükünün Dayağı", note: "Wellhead və BOP-un quraşdırılacağı sabit struktur təməli yaradır" },
];

const cementAdditives = [
  { name: "Accelerator (Sürətləndirici)", note: "Kalsium xlorid kimi — bağlanma vaxtını qısaldır, dayaz/soyuq quyularda istifadə olunur" },
  { name: "Retarder (Ləngidici)", note: "Dərin/isti quyularda erkən bağlanmanın qarşısını alır, pump edilmə vaxtını uzadır" },
  { name: "Extender (Genişləndirici)", note: "Bentonit kimi materiallarla lehimin sıxlığını azaldıb həcmini artırır — xərci azaldır" },
  { name: "Weighting Agent (Ağırlaşdırıcı)", note: "Hematit kimi — yüksək təzyiqli zonalarda lehim sıxlığını artırmaq üçün istifadə olunur" },
  { name: "Fluid Loss Control", note: "Sementin suyunun formasiyaya sızmasının qarşısını alır, düzgün bağlanmanı təmin edir" },
  { name: "Lost Circulation Material", note: "Zəif/çatlı zonalarda sementin formasiyaya itirilməsinin qarşısını alır" },
];

export default function CementingLesson() {
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
              2.2.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Quyu Konstruksiyası
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Sementləmə (Cementing)
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Casing tək başına niyə kifayət etmir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Əvvəlki dərsdə gördüyümüz kimi, casing quyunu strukturca dəstəkləyir — amma casing
              ilə quyu divarı arasında boş bir halqavari sahə (annulus) qalır. Bu boşluq
              doldurulmasa, yeraltı zonalar arasında maye və qaz sərbəst hərəkət edə bilər —
              nəticədə formasiya sularının qarışması, təzyiq ötürülməsi, hətta idarəolunmaz
              axın (blowout) baş verə bilər. Bu problemi həll edən proses — sementləmədir.
              Bu dərsdə sementin funksiyalarını, tərkibini və tətbiq üsullarını araşdıracağıq.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Sementin dörd əsas funksiyası
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Sement quyuda sadəcə &quot;doldurucu&quot; deyil — quyunun bütün ömrü boyu bir
              neçə kritik funksiyanı eyni anda yerinə yetirir:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cementFunctions.map((c) => (
                <div key={c.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{c.name}</p>
                  <p className="text-[13px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{c.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. Portland Sementi — quyu sementinin əsası
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Qazma sənayesində istifadə olunan sement adi tikinti sementindən fərqlidir — API
              standartlarına uyğun Portland sementi əsaslıdır, amma quyu şəraitinə (yüksək
              təzyiq, temperatur, formasiya kimyası) uyğunlaşdırılmış xüsusi &quot;class&quot;-lara
              bölünür (məs. Class A dayaz quyular üçün, Class G dərin/HPHT quyular üçün). Quru
              sement tozu suyla qarışdırılaraq &quot;slurry&quot; (lehim) halına gətirilir və
              nasos vasitəsilə casing daxilinə vurulur. Suyun sement toz nisbəti (water-to-cement
              ratio) slurry sıxlığını və bağlanma xüsusiyyətlərini birbaşa təyin edir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Additive-lər — sementi quyuya uyğunlaşdırmaq
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Hər quyunun temperaturu, təzyiqi və formasiya xüsusiyyətləri fərqli olduğu üçün
              xam Portland sementi nadir hallarda birbaşa istifadə olunur — mühəndislər əlavə
              maddələrlə (additive) sementin xassələrini dəqiq tənzimləyir:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Additive Növü</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Funksiyası</th>
                  </tr>
                </thead>
                <tbody>
                  {cementAdditives.map((a) => (
                    <tr key={a.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{a.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{a.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              Sementləmə zamanı slurry casing daxilinə yüksək təzyiq altında (bəzən 3,000+ psi)
              nasoslanır. Səth avadanlığında (cementing head, lines) sızma və ya birləşmə
              zəifliyi olarsa, yüksək təzyiqli slurry qəflətən püskürərək ətrafdakı heyət üçün
              ciddi zədələnmə riski yaradır. Bütün sement xətləri pump başlamazdan əvvəl təzyiq
              testindən keçirilməlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              4. Primary Cementing — proses addımları
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Casing endirildikdən sonra aparılan əsas sementləmə (primary cementing) müəyyən
              ardıcıllıqla həyata keçirilir:
            </p>
            <ol className="space-y-2 text-[13.5px] leading-[1.7]" style={{ color: "#C4CEE0" }}>
              <li><span style={{ color: PATH_COLOR, fontWeight: 600 }}>1.</span> Bottom plug (aşağı tıxac) casing daxilinə buraxılır — mud və slurry-ni ayırır</li>
              <li><span style={{ color: PATH_COLOR, fontWeight: 600 }}>2.</span> Sement slurry-si nasos vasitəsilə casing daxilinə vurulur</li>
              <li><span style={{ color: PATH_COLOR, fontWeight: 600 }}>3.</span> Top plug (yuxarı tıxac) buraxılır və displacement mayesi ilə slurry aşağı itələnir</li>
              <li><span style={{ color: PATH_COLOR, fontWeight: 600 }}>4.</span> Slurry casing dabanından (shoe) çıxaraq annulus boyu yuxarı qalxır</li>
              <li><span style={{ color: PATH_COLOR, fontWeight: 600 }}>5.</span> Bump plug — plug-lar float collar-a çatdıqda təzyiq artımı bu mərhələnin bitdiyini göstərir</li>
              <li><span style={{ color: PATH_COLOR, fontWeight: 600 }}>6.</span> Waiting on Cement (WOC) — sement lazımi möhkəmliyə çatana qədər gözlənilir</li>
            </ol>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              5. Sementin keyfiyyətini necə yoxlayırıq?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Sement bağlandıqdan sonra onun quyu divarına və casing-ə tam yapışıb-yapışmadığını
              vizual olaraq görmək mümkün deyil — buna görə CBL (Cement Bond Log) və VDL
              (Variable Density Log) kimi akustik alətlər istifadə olunur. Bu alətlər casing
              divarına səs siqnalı göndərir və əks-sədanın gücünə görə sementin bərk (yaxşı
              bağlanmış) yoxsa boş (kanal, boşluq) olduğunu təyin edir. Zəif bağlanma aşkar
              edilərsə, remedial (əlavə/düzəldici) sementləmə tələb oluna bilər.
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
              Sementləmə mərhələsində mud sütununun sementlə əvəzlənməsi zamanı hidrostatik
              təzyiq müvəqqəti dəyişə bilər — əgər yeni sistem formasiya təzyiqini kifayət qədər
              tarazlamırsa, kick riski yaranır. Buna görə sementləmə zamanı da fasiləsiz təzyiq
              və axın monitorinqi (flow-check) davam etdirilməli, WOC dövründə də quyu nəzarətdə
              saxlanılmalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — Lazımi sement slurry həcmi
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              2.2.1-dəki intermediate casing üçün annulus həcmini hesablayaq — bu, nə qədər
              slurry lazım olduğunu göstərir (excess faktoru ilə birlikdə):
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: quyu diametri (openhole) = 8.5 in, casing xarici diametri = 7 in, sementlənəcək intervalın uzunluğu = 2,000 ft, excess = 30%
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Annulus sahəsi = (8.5² − 7²) × 0.7854 / 144 = 0.1656 ft²</p>
                <p>Nominal həcm = 0.1656 × 2,000 = 331.2 ft³</p>
                <p>Excess ilə ümumi həcm = 331.2 × 1.30 = <span style={{ color: PATH_COLOR }}>430.6 ft³ (≈ 76.7 bbl)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: mühəndis pump planında ən azı 76.7 bbl slurry nəzərdə tutmalıdır. 30%
                excess konservativ ehtiyat kimi əlavə olunur, çünki real openhole diametri
                caliper log olmadan tam dəqiq bilinmir və formasiyanın washout (genişlənmə)
                effekti nəzərə alınmalıdır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "ACG, Xəzər dənizi, Azərbaycan (BP)", text: "Offshore mühitdə sementləmənin dəniz suyu ilə kontaminasiya riski yüksək olduğundan, xüsusi spacer mayeləri və sərt keyfiyyət nəzarəti tətbiq olunur." },
                { name: "Macondo hadisəsi, Meksika Körfəzi (2010)", text: "Zəif sement bağlanması və natamam keyfiyyət yoxlaması araşdırmalarda faciənin əsas səbəblərindən biri kimi göstərilib — bu hadisə sənayedə CBL yoxlama standartlarının sərtləşməsinə səbəb olub." },
                { name: "Groningen sahəsi, Niderland", text: "Uzunmüddətli istehsal olunan quyularda sementin zaman keçdikcə mikro-çatlaması izlənilir və lazım gəldikdə remedial sementləmə aparılır ki, zonal izolyasiya qorunsun." },
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
              <li>• Sement dörd əsas funksiya daşıyır: zonal izolyasiya, struktur dəstək, korroziya mühafizəsi, BOP dayağı</li>
              <li>• Additive-lər (accelerator, retarder, extender və s.) sementi quyu şəraitinə uyğunlaşdırır</li>
              <li>• Primary cementing ardıcıl mərhələlərlə aparılır: plug-lar, pump, displacement, WOC</li>
              <li>• CBL/VDL kimi akustik loglar sementin bağlanma keyfiyyətini yoxlayır</li>
              <li>• Slurry həcmi hesablanarkən excess faktoru (adətən 20-50%) mütləq nəzərə alınmalıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling/casing-design"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Casing Dizaynı və Növləri
          </Link>
          <Link
            href="/learn/drilling/wellhead-bop"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Wellhead və BOP
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}