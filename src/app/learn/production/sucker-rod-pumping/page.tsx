"use client";
import Link from "next/link";

const PATH_COLOR = "#E8B33D";

const rodComponents = [
  { name: "Pumping Unit (Pump Jack)", desc: "Səthdə yerləşən, mühərrikdən aldığı fırlanma hərəkətini xətti irəli-geri hərəkətə çevirən mexanizm", best: "Balanslaşdırılmış çəki (counterweight) ilə enerji sərfiyyatını azaldır" },
  { name: "Sucker Rod String", desc: "Səthdən yeraltı nasosa qədər uzanan, polad çubuqlardan ibarət uzunsov zəncir", best: "Mexaniki hərəkəti dərinliyə ötürür, dartılma və sıxılma yüklərinə məruz qalır" },
  { name: "Downhole Pump (Yeraltı Nasos)", desc: "Tubing daxilində yerləşən, plunger və iki bir-tərəfli klapandan (ball-seat valve) ibarət pistonlu nasos", best: "Yuxarı/aşağı hərəkətlə flüidi mərhələ-mərhələ səthə itələyir" },
];

export default function SuckerRodPumpingLesson() {
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
              5.2.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Süni Qaldırma Üsulları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Sucker Rod Pumping
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Neft sənayesinin ən tanınan simvolu
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Əvvəlki dərsdə artificial lift üsullarının ümumi mənzərəsinə baxdıq — indi isə
              onların ən qədim və ən geniş yayılmışı ilə tanış olaq. Texas çöllərində,
              Bakının Neft Daşlarında və dünyanın demək olar hər neft rayonunda görə
              biləcəyiniz o məşhur "yellənən quş başı" (nodding donkey) formalı avadanlıq —
              məhz <strong>sucker rod pumping</strong> sistemidir. 1900-cü illərin əvvəlindən
              bəri praktik olaraq dəyişməyən əsas prinsipi ilə, bu üsul bu gün də dünyadakı
              artificial lift quyularının böyük əksəriyyətində istifadə olunur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Sistemin ümumi iş prinsipi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Sucker rod pumping sistemi, səthdəki mühərrikin fırlanma hərəkətini pumping
              unit vasitəsilə xətti (yuxarı-aşağı) hərəkətə çevirir. Bu hərəkət, tubing
              daxilində yerləşən uzun çubuq zəncirinə (sucker rod string) ötürülür və
              zəncirin ən aşağı ucundakı yeraltı nasosu hərəkətə gətirir. Nasos daxilindəki
              iki klapan (travelling valve və standing valve) ardıcıl açılıb-bağlanaraq
              flüidi mərhələ-mərhələ, hər tsikldə bir qədər, tubing daxilində yuxarı doğru
              itələyir — nəticədə flüid səthə çatır.
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
                  {rodComponents.map((c) => (
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
              3. Pump tsikli: upstroke və downstroke
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Nasosun bir işləmə tsikli iki fazadan ibarətdir. <strong>Upstroke</strong>
              (yuxarı hərəkət) zamanı standing valve açılır, travelling valve bağlanır —
              plunger yuxarı qalxarkən özündən yuxarıdakı flüidi tubing-ə doğru itələyir,
              eyni zamanda aşağıdan yeni flüid nasos kamerasına daxil olur.{" "}
              <strong>Downstroke</strong> (aşağı hərəkət) zamanı əksinə — travelling valve
              açılır, standing valve bağlanır, plunger aşağı düşərkən kamerada olan flüid
              plunger-in üzərinə keçir. Bu ardıcıl tsikl saniyədə bir neçə dəfə (tipik olaraq
              dəqiqədə 5-20 tsikl, SPM — strokes per minute) təkrarlanaraq davamlı flüid axını
              yaradır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Dizaynda nəzərə alınan əsas parametrlər
            </h2>
            <div className="space-y-2.5">
              {[
                "Stroke length — plunger-in bir tsikldə qət etdiyi məsafə (tipik 1-6 m)",
                "SPM (Strokes Per Minute) — dəqiqədəki tsikl sayı, debiti birbaşa təyin edir",
                "Plunger diametri — nasos kamerasının en kəsiyi, hər tsikldə qaldırılan həcmi müəyyən edir",
                "Rod string dizaynı — çubuqların diametri və materialı, dartılma gərginliyinə davamlı olmalıdır",
                "Pump dərinliyi (setting depth) — statik flüid səviyyəsindən aşağı yerləşdirilməlidir",
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
              <strong>Uzun Stroke, Aşağı SPM vs Qısa Stroke, Yüksək SPM:</strong> Eyni debitə
              iki fərqli yolla nail olmaq mümkündür — stroke uzunluğunu artırıb SPM-i azaltmaq,
              ya da əksinə. Uzun stroke / aşağı SPM yanaşması rod string üzərindəki dinamik
              yüklənmə tsiklərinin sayını azaldır, bu da yorulma (fatigue) qırılmalarının
              qarşısını alır və avadanlığın ömrünü uzadır — amma daha böyük, daha bahalı
              pumping unit tələb edir. Qısa stroke / yüksək SPM isə daha kiçik, ucuz avadanlıqla
              işləyir, amma rod string-də daha tez-tez gərginlik dəyişməsi yorulma qırılması
              riskini artırır və mexaniki aşınmanı sürətləndirir. Seçim, quyunun dərinliyi,
              gözlənilən istismar müddəti və avadanlıq büdcəsindən asılıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Hesablama — Nəzəri Debit (Theoretical Pump Displacement)
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Nasosun nəzəri debiti, plunger sahəsi, stroke uzunluğu və tsikl sürətinin
              hasilindən hesablanır:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: plunger diametri = 1.75 düym (sahə A_p ≈ 0.01675 ft²), stroke uzunluğu L = 8 ft, SPM = 12
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                Q (bbl/gün) = 0.1484 × A_p × L × SPM
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Q = 0.1484 × 0.01675 × 8 × 12 ≈ <span style={{ color: PATH_COLOR }}>238 bbl/gün</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu parametrlərlə nasos nəzəri olaraq gündə təxminən 238 barel flüid
                qaldıra bilər. Real debit isə həmişə bundan aşağı olur — pump efficiency
                (adətən 70-90%), qaz interferensiyası və valve sızmaları kimi faktorlar
                nəzərə alınmalıdır. Bu fərq "volumetric efficiency" adlanır və sahə
                monitorinqi zamanı mütəmadi qiymətləndirilir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Neft Daşları, Azərbaycan", text: "Dünyanın ən qədim dəniz neft yatağında hələ də çoxlu sayda sucker rod pumping quyusu istismar olunur." },
                { name: "Permian Basin, ABŞ", text: "Aşağı debitli, uzun ömürlü quyularda (stripper wells) sucker rod pumping ən əsas üsul olaraq qalır." },
                { name: "Qərbi Sibir, Rusiya", text: "Geniş sahələrdə soyuq iqlim şəraitinə uyğunlaşdırılmış pumping unit-lər tətbiq olunur — motor yağının özlülük dəyişikliyi nəzərə alınaraq." },
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
              <li>• Sucker rod pumping — pumping unit, rod string və yeraltı nasosdan ibarət mexaniki qaldırma sistemidir</li>
              <li>• Upstroke/downstroke tsikli iki klapanın (travelling/standing valve) ardıcıl işi ilə flüidi qaldırır</li>
              <li>• Debit stroke uzunluğu, SPM və plunger diametrindən asılıdır</li>
              <li>• Uzun stroke/aşağı SPM rod ömrünü uzadır, amma daha bahalı avadanlıq tələb edir</li>
              <li>• Real debit həmişə nəzəri debitdən aşağıdır — pump efficiency nəzərə alınmalıdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/production/intro-to-artificial-lift"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Artificial Lift-ə Giriş
          </Link>
          <Link
            href="/learn/production/electrical-submersible-pump-esp"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: ESP
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}