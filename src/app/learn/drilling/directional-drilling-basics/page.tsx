"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const wellProfiles = [
  { name: "Vertical (Şaquli)", shape: "Düz xətt, əyilmə yoxdur", use: "Sadə, mərkəzi rezervuar strukturları, ucuz və sürətli qazma" },
  { name: "J-Type", shape: "KOP-dan sonra tədricən əyilir, hədəf bucağa çatdıqdan sonra sabit saxlanılır", use: "Səthdən yan tərəfdə yerləşən tək hədəf — ən geniş yayılmış profil" },
  { name: "S-Type", shape: "Əyilir, sabit qalır, sonra yenidən şaquliləşir (drop-off)", use: "Dərin şaquli hədəf, amma səth məhdudiyyəti (platform, şəhər) səbəbindən yan başlanğıc lazım olduqda" },
  { name: "Horizontal", shape: "90°-ə yaxın və ya tam üfüqi bucağa çatır, uzun müddət saxlanılır", use: "Rezervuarla təmas sahəsini maksimallaşdırmaq — şist, nazik laylar üçün standart" },
];

const deviationTools = [
  { name: "Whipstock", note: "Ən qədim üsul — quyu dibinə endirilən əyilmiş metal səthlə bit-i istiqamətdən yayındırır, bu gün nadir hallarda (sidetrack) istifadə olunur" },
  { name: "Mud Motor + Bent Sub", note: "BHA-da yerləşən əyilmiş birləşmə (bent sub) mud motorunun oxunu bir neçə dərəcə meyilləndirir, bu, sliding rejimində istiqamət verir" },
  { name: "Rotary Steerable System (RSS)", note: "Bütün drill string fırlanarkən BHA daxilindəki idarəolunan qollar bit-i real-time istiqamətləndirir — müasir sənayenin standartıdır" },
  { name: "MWD (Measurement While Drilling)", note: "İnklinasiya, azimut və toolface-i real-time ötürən sensor sistemi — istiqamətin dəqiq izlənməsini təmin edir" },
];

export default function DirectionalDrillingBasicsLesson() {
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
              2.4.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Directional Drilling
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Directional Drilling Əsasları
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1930-cu illər: təsadüfdən strategiyaya
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Directional drilling ilk əvvəl problem kimi doğuldu — 1930-cu illərdə mühəndislər
              quyuların &quot;təsadüfən&quot; şaquli xətdən yayındığını fərq etdilər və bunu
              ölçmək üçün ilk əyilmə alətlərini yaratdılar. Tezliklə anlaşıldı ki, bu
              &quot;problem&quot; əslində güclü bir imkandır: əgər quyunun istiqamətini nəzarətli
              şəkildə dəyişmək mümkündürsə, bir səth nöqtəsindən neçə fərqli yeraltı hədəfə
              çatmaq olar. Bu gün directional drilling təkcə istiqamət dəyişmək deyil — rezervuarla
              təması maksimallaşdıran, məhdud səth sahəsindən onlarla quyu qazmağa imkan verən
              strateji bir mühəndislik sahəsidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Əsas quyu trayektoriya profilləri
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Hər quyu layihəsi hədəfin yeri, dərinliyi və səth məhdudiyyətlərinə görə bir neçə
              standart profil formasından birinə əsaslanır:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Profil</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Forma</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>İstifadə sahəsi</th>
                  </tr>
                </thead>
                <tbody>
                  {wellProfiles.map((w) => (
                    <tr key={w.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{w.name}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{w.shape}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{w.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. KOP, Build Rate və İnklinasiya — əsas terminologiya
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Trayektoriyanı təsvir etmək üçün bir neçə əsas termin istifadə olunur.{" "}
              <strong>KOP (Kick-Off Point)</strong> — quyunun şaquli xətdən yayınmağa başladığı
              dərinlikdir. <strong>Build Rate (BUR)</strong> — hər 100 ft-də neçə dərəcə
              inklinasiya qazanıldığını göstərir (məs. 3°/100ft). <strong>İnklinasiya</strong> —
              quyunun şaquli oxdan neçə dərəcə kənara çıxdığını (0° = tam şaquli, 90° = tam
              üfüqi), <strong>Azimut</strong> isə üfüqi müstəvidə hansı kompas istiqamətinə
              yönəldiyini göstərir. Bu iki ölçü — inklinasiya və azimut — birlikdə quyunun
              məkanda dəqiq mövqeyini müəyyən edir.
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
              Çoxsaylı quyuların bir platformadan qazıldığı layihələrdə (məs. offshore
              kompleksdə) yanlış hesablanmış trayektoriya qonşu quyu ilə toqquşma (well
              collision) riski yaradır. Buna görə hər yeni quyunun planlaşdırılmasında anti-
              collision analizi aparılır və MWD survey məlumatları real-time olaraq qonşu
              quyuların bilinən mövqeyi ilə müqayisə edilir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. İstiqamətləndirmə alətləri — tarixdən bu günə
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Trayektoriyanı fiziki olaraq dəyişdirmək üçün istifadə olunan alətlər onilliklər
              boyu təkmilləşib:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {deviationTools.map((d) => (
                <div key={d.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{d.name}</p>
                  <p className="text-[13px] leading-[1.6]" style={{ color: "#9FAEC4" }}>{d.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              4. Sliding və Rotating — mud motor rejimləri
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Mud motor + bent sub sistemi ilə işləyərkən operator iki rejim arasında keçid
              edir. <strong>Sliding</strong> rejimində bütün drill string fırlanmır — yalnız
              mud motoru bit-i fırlandırır, bent sub-un istiqamətlədiyi tərəfə doğru quyu
              əyilir (bu, aktiv &quot;steering&quot; anıdır). <strong>Rotating</strong>
              rejimində isə bütün string fırlanır və bent sub-un təsiri orta hesabla sıfırlanır
              — quyu mövcud istiqamətini saxlayaraq irəliləyir (tangent bölmə). Müasir RSS
              sistemləri bu iki rejim arasında keçid ehtiyacını aradan qaldıraraq, fırlanma
              davam edərkən də real-time istiqamət dəyişikliyinə imkan verir — bu, həm daha
              hamar quyu divarı, həm də daha yüksək ROP deməkdir.
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
              Sliding rejimində string fırlanmadığı üçün drill pipe divar boyunca sürtünərək
              yığılma meylindədir — bu, stuck pipe riskini rotating rejiminə nisbətən artırır.
              Uzun sliding intervalları planlaşdırılarkən operator mütləq mütəmadi &quot;work
              the pipe&quot; (yuxarı-aşağı, yüngül fırlatma) hərəkətləri ilə string-in
              sıxılmasının qarşısını almalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              5. Dogleg Severity — əyriliyin sərtliyi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Trayektoriya nə qədər &quot;sərt&quot; əyilirsə (yəni qısa məsafədə çox dərəcə
              dəyişirsə), drill string üzərindəki mexaniki gərginlik bir o qədər artır.{" "}
              <strong>Dogleg Severity (DLS)</strong> bu sərtliyi hər 100 ft-də dəyişən ümumi
              bucaq (inklinasiya və azimut birlikdə) kimi ölçür. Yüksək DLS drill string
              yorğunluğunu (fatigue), casing keçirilməsi zamanı sürtünməni və log alətlərinin
              quyudan keçməsində çətinliyi artırır. Buna görə hər BHA və casing dizaynı üçün
              maksimal icazə verilən DLS həddi əvvəlcədən müəyyən olunur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — Radius of Curvature üsulu ilə trayektoriya
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Sadə J-type profil üçün, build bölməsinin sonunda TVD (True Vertical Depth) və
              üfüqi yerdəyişməni hesablayaq — 2.3.2-dəki quyu proqramının davamı kimi:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: KOP = 3,000 ft, Build Rate = 3°/100ft, hədəf inklinasiya = 60°
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Build bölməsinin MD-si = (60 / 3) × 100 = 2,000 ft</p>
                <p>Radius (R) = 5,729.58 / BUR = 5,729.58 / 3 = 1,909.86 ft</p>
                <p>TVD artımı (build) = R × sin(60°) = 1,909.86 × 0.866 = 1,654.1 ft</p>
                <p>Üfüqi yerdəyişmə = R × (1 − cos60°) = 1,909.86 × 0.5 = 954.9 ft</p>
                <p>Ümumi TVD = 3,000 + 1,654.1 = <span style={{ color: PATH_COLOR }}>4,654.1 ft</span></p>
                <p>Ümumi MD = 3,000 + 2,000 = <span style={{ color: PATH_COLOR }}>5,000 ft</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: build bölməsinin sonunda quyu 4,654 ft TVD-də, səth nöqtəsindən 955 ft
                üfüqi məsafədə yerləşir, halbuki faktiki qazılmış boru uzunluğu (MD) 5,000 ft-dir
                — MD ilə TVD arasındakı bu fərq (346 ft) məhz əyilmənin nəticəsidir və bütün
                sonrakı casing, mud həcmi hesablamalarında MD əsas götürülür.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Sakhalin-1, Çayvo sahəsi (Rusiya)", text: "Dünya rekordu qıran extended-reach quyular (15,000+ ft üfüqi yerdəyişmə) burada qazılıb — bu, illər boyu təkmilləşdirilmiş RSS və survey texnologiyası tələb edib." },
                { name: "Wytch Farm, Böyük Britaniya (BP)", text: "Sahil altı rezervuara quru platformadan çatmaq üçün 1990-cı illərdə o dövrün ən uzun extended-reach quyuları qazılıb, directional drilling sənayesində əlamətdar layihə sayılır." },
                { name: "ACG, Xəzər dənizi, Azərbaycan (BP)", text: "Məhdud platforma sahəsindən onlarla directional quyu qazılaraq geniş rezervuar sahəsinə çatılır — bu, səth infrastrukturunun sayını minimuma endirməyə imkan verir." },
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
              <li>• Əsas profillər: vertical, J-type, S-type, horizontal — hədəfin yeri və dərinliyinə görə seçilir</li>
              <li>• KOP, Build Rate, İnklinasiya və Azimut trayektoriyanı tam təsvir edən əsas dəyişənlərdir</li>
              <li>• RSS müasir sənayenin standartıdır — sliding/rotating keçidinə ehtiyac olmadan real-time idarəetmə verir</li>
              <li>• Dogleg Severity yüksək olduqca string yorğunluğu və casing keçirmə çətinliyi artır</li>
              <li>• MD həmişə TVD-dən böyükdür — bu fərq trayektoriyanın əyriliyindən yaranır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling/drilling-hydraulics"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Hidravlika Hesablamaları
          </Link>
          <Link
            href="/learn/drilling/torque-and-drag"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Torque & Drag
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}