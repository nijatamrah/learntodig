"use client";
import Link from "next/link";

const PATH_COLOR = "#3B9BD8";

const vshMethods = [
  { name: "Xətti (Linear)", formula: "Vsh = IGR", use: "Ən sadə, adətən Vsh-i həddindən artıq göstərir" },
  { name: "Larionov (Tertiary)", formula: "Vsh = 0.083·(2^(3.7·IGR) − 1)", use: "Cavan, konsolidasiya olmamış süxurlar (Pliosen)" },
  { name: "Larionov (Older)", formula: "Vsh = 0.33·(2^(2·IGR) − 1)", use: "Köhnə, konsolidasiya olmuş süxurlar" },
  { name: "Clavier", formula: "Vsh = 1.7 − √(3.38 − (IGR+0.7)²)", use: "Orta konsolidasiyalı formasiyalar" },
  { name: "Steiber", formula: "Vsh = IGR / (3 − 2·IGR)", use: "Delta və sahil çöküntüləri" },
];

export default function ShaleVolumeEffectivePorosityLesson() {
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
          href="/learn/well-log"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6"
          style={{ color: "#3D5570" }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Quyu Logging
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
              style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
            >
              3.3.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Petrofizika Hesablamaları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Şist Həcmi və Effektiv Məsaməlilik
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Qarışıq filizdən təmiz metalı ayırmaq
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Zərgər xam filizi çəkəndə bilir ki, onun içində həm qızıl, həm də dəyərsiz qarışıq
              var — həqiqi dəyəri tapmaq üçün əvvəlcə bu qarışığın faizini bilmək lazımdır. Kollektor
              qiymətləndirməsində də eyni məntiq işləyir: 3.2.2-də tapdığımız porosity (12.1%) əslində
              &quot;xam&quot; ədəddir — içində gilin özünün saxladığı mikroskopik, praktik olaraq
              istifadəsiz boşluqlar da var. Bu dərsdə əvvəlcə süxurdakı &quot;qarışığı&quot;, yəni şist
              həcmini (Vsh) hesablayacaq, sonra onu çıxaraq həqiqi, istifadə olunan boşluğu —
              effektiv porosity-ni tapacağıq.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Şist həcmi (Vsh) nədir və niyə vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Şist həcmi (Vsh — Volume of Shale) süxur həcminin neçə faizinin gil mineralları
              tərəfindən tutulduğunu göstərən ədəddir, 0 (tam təmiz) ilə 1 (tam gil) arasında ifadə
              olunur. Vsh vacibdir, çünki gil özü mikroskopik boşluqlar saxlaya bilər, amma bu
              boşluqlar çox kiçik və bir-birinə çox zəif bağlı olduğu üçün flüid onlardan praktik
              olaraq axa bilmir. Nəticədə, ümumi porosity nə qədər yüksək görünsə də, əgər onun
              böyük hissəsi gil boşluğudursa, quyu real istehsal vermir. Vsh, məhz bu &quot;yalançı&quot;
              porosity-ni aşkarlamaq üçün hesablanır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              2. IGR-dən Vsh-ə: niyə xətti fərziyyə kifayət etmir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              3.2.1-də hesabladığımız Gamma Ray İndeksi (IGR) ilk baxışda Vsh-ə bərabər sayıla
              bilər (Vsh = IGR) — bu, ən sadə üsuldur. Amma real süxurlarda bu fərziyyə demək
              olar ki, həmişə Vsh-i şişirdir, çünki GR-radioaktivlik ilə faktiki gil həcmi
              arasındakı əlaqə xətti deyil, əyridir. Buna görə petrofiziklər 1960-70-ci illərdən
              bəri müxtəlif empirik (təcrübi ölçmələrə əsaslanan) düzəliş düsturları hazırlayıblar
              — bunlardan ən məşhuru Larionov tənliyidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. Larionov tənliyi: iki versiya
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Sovet petrofiziki V. Larionov 1969-cu ildə süxurun yaşından və konsolidasiya
              dərəcəsindən asılı olaraq iki fərqli tənlik təklif etdi. Cavan, hələ tam
              sıxılmamış (unconsolidated) Tertiary (Pliosen-Miosen) süxurlar üçün bir düstur, köhnə,
              sıx sementləşmiş (consolidated) süxurlar üçün isə başqa düstur istifadə olunur. Fərq
              böyükdür: eyni IGR qiyməti üçün &quot;Tertiary&quot; formulası adətən daha aşağı Vsh verir,
              çünki cavan gillər hələ tam sıxılmadığı üçün nisbətən &quot;təmiz&quot; radioaktivlik siqnalı
              buraxır. Formasiyanın həqiqi yaşını və konsolidasiya dərəcəsini bilmədən düz düsturu
              seçmək mümkün deyil — bu, geoloji kontekstin nə üçün vacib olduğunun bariz nümunəsidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Əsas Vsh metodlarının müqayisəsi
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Metod</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Formula</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Nə vaxt istifadə olunur</th>
                  </tr>
                </thead>
                <tbody>
                  {vshMethods.map((m) => (
                    <tr key={m.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{m.name}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: "#C4CEE0" }}>{m.formula}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{m.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              5. Effektiv porosity nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Total porosity (φt) — süxurdakı bütün boşluqların cəmidir, gil boşluqları da daxil
              olmaqla. Effektiv porosity (φe) isə yalnız bir-birinə bağlı, flüidin real axa
              biləcəyi boşluqları göstərir — yəni istehsal potensialı olan hissəni. Fərq (φt − φe)
              məhz gilin öz daxilində saxladığı, izolə olunmuş su ilə doymuş mikro-boşluqlardır. Bu
              iki anlayışın qarışdırılması ən çox rast gəlinən petrofizik xətalardan biridir —
              yüksək total porosity görüb kollektorun yaxşı olduğunu düşünmək, amma effektiv
              porosity-nin çox aşağı olduğunu gözdən qaçırmaq mümkündür.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Vsh-dən φe-yə: hesablama ardıcıllığı
            </h2>
            <div className="space-y-2.5">
              {[
                "Gamma Ray logundan IGR hesabla (3.2.1-də öyrənilib)",
                "Formasiyanın yaşına/konsolidasiyasına uyğun Vsh formulasını seç",
                "IGR-i seçilmiş formulaya qoyub Vsh tap",
                "Density (və ya neutron) logundan total porosity (φt) hesabla (3.2.2-də öyrənilib)",
                "φe = φt × (1 − Vsh) düsturu ilə effektiv porosity-ni tap",
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
            style={{ background: PATH_COLOR + "14", border: `1px solid ${PATH_COLOR}40` }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: PATH_COLOR }}>
              Tipik Log Cavabı
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Təmiz qumdaşı — Vsh</span>
                <span style={{ color: PATH_COLOR }}>0–10%</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Gilli qumdaşı — Vsh</span>
                <span style={{ color: PATH_COLOR }}>20–40%</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Gil daşı — Vsh</span>
                <span style={{ color: PATH_COLOR }}>70–100%</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-mono">
                <span style={{ color: "#F0F4FF" }}>Gilli qumdaşı — φt ilə φe fərqi</span>
                <span style={{ color: PATH_COLOR }}>3–8 p.u.</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Hesablama — Vsh və Effektiv Porosity
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Əvvəlki dərslərdə tapdığımız IGR = 0.35 (3.2.1) və φD = 0.121 (12.1%, 3.2.2)
              dəyərlərini davam etdirək. Bu interval Pliosen yaşlı, konsolidasiya olmamış bir
              qumdaşı olduğu üçün Larionov Tertiary formulasını seçirik:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Vsh = 0.083 · (2^(3.7·IGR) − 1), IGR = 0.35
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Vsh = 0.083 · (2^1.295 − 1)</p>
                <p>Vsh = 0.083 · (2.454 − 1) = 0.083 · 1.454</p>
                <p>Vsh ≈ <span style={{ color: PATH_COLOR }}>0.121 (12.1%)</span></p>
              </div>
              <p className="text-[13px] mt-4 mb-2" style={{ color: "#6B82A0" }}>
                φe = φt × (1 − Vsh), φt = 0.121, Vsh = 0.121
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>φe = 0.121 × (1 − 0.121)</p>
                <p>φe = 0.121 × 0.879 ≈ <span style={{ color: PATH_COLOR }}>0.106 (10.6%)</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: total porosity 12.1% idi, amma gilin təsirini çıxardıqdan sonra real,
                istehsal veriləcək effektiv porosity 10.6%-ə düşür — yəni fərq təxminən 1.5 faiz
                bəndidir. Bu formasiya hələ yaxşı kollektor sayılır (Vsh ~12% — &quot;gilli təmiz&quot;
                aralıqda), amma bu fərqi nəzərə almadan hesabat vermək ehtiyatların həddindən artıq
                qiymətləndirilməsinə səbəb ola bilərdi.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              8. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Balaxanı-Sabunçu-Ramanı (BSR), ACG, Azərbaycan", text: "Pliosen yaşlı, konsolidasiya olmamış bu lay dəstlərində petrofizik hesabatlarda standart olaraq Larionov Tertiary formulası istifadə olunur." },
                { name: "Niger Deltası, Nigeriya", text: "Shell və digər operatorların işlətdiyi delta çöküntülərində də oxşar cavan, konsolidasiya olmamış qumdaşı-gil növbələşməsi səbəbindən eyni Vsh yanaşması tətbiq edilir." },
                { name: "Permian hövzəsi (Spraberry/Wolfcamp), ABŞ", text: "Daha köhnə, sıx sementləşmiş formasiyalarda isə Larionov Older və ya Clavier düsturları üstünlük təşkil edir, çünki Tertiary formulası burada Vsh-i düzgün əks etdirmir." },
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
              <li>• Vsh — süxur həcminin gil tərəfindən tutulan faizidir, 0–1 arasında ifadə olunur</li>
              <li>• IGR ilə Vsh arasındakı əlaqə xətti deyil — Larionov, Clavier, Steiber kimi empirik düsturlar istifadə olunur</li>
              <li>• Formasiyanın yaşı (Tertiary vs Older) düzgün Larionov versiyasını seçməkdə həlledicidir</li>
              <li>• Effektiv porosity yalnız bir-birinə bağlı, real istehsal verə bilən boşluğu göstərir</li>
              <li>• φe = φt × (1 − Vsh) — total porosity-ni real kollektor potensialına çevirən əsas addımdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/well-log/density-neutron-sonic-logs"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Density, Neutron və Sonic Logs
          </Link>
          <Link
            href="/learn/well-log/water-saturation-archie"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Su Doyma Dərəcəsi (Archie Tənliyi)
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}