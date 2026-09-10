"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const components = [
  { name: "Derrick / Mast", system: "Hoisting", role: "Drill string-i və casing-i asmaq üçün şaquli struktur — 30-60 metr hündürlükdə ola bilər" },
  { name: "Draworks", system: "Hoisting", role: "Tal blokunu qaldırıb-endirən əsas mexanizm — böyük barabanlı lebyodka" },
  { name: "Top Drive / Rotary Table", system: "Rotating", role: "Drill string-ə fırlanma qüvvəsi ötürür" },
  { name: "Mud Pumps", system: "Circulation", role: "Qazma məhlulunu yüksək təzyiqlə drill string-in içindən aşağı vurur" },
  { name: "BOP Stack", system: "Təhlükəsizlik", role: "Qəza zamanı quyunu bağlayan avadanlıq (2.2.3-də ətraflı)" },
  { name: "Rig Floor Alətləri", system: "Bağlantı", role: "Tongs, slips — boru birləşdirmə/tutma alətləri" },
];

export default function RigComponentsLesson() {
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
              2.1.2
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Qazma Əsasları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Qazma Qurğusu Komponentləri
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Rig-ə "sistem" kimi bax
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Əvvəlki dərsdə 4 əsas sistemi (hoisting, rotating, circulation, power) tanıdıq.
              İndi bu sistemlərin daxilindəki konkret fiziki komponentlərə baxaq — çünki real
              rig-də işləyəndə, məhz bu adları eşidəcəksən.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Əsas komponentlər
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Komponent</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Sistem</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Rolu</th>
                  </tr>
                </thead>
                <tbody>
                  {components.map((c) => (
                    <tr key={c.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{c.name}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{c.system}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#C4CEE0" }}>{c.role}</td>
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
              Derrick və draworks yüzlərlə ton çəki daşıyır. "Dropped object" (yüksəkdən düşən
              əşya) drilling sənayesində ən çox rast gəlinən ölümcül qəza növlərindən biridir —
              buna görə rig floor-da hər zaman "red zone" (qırmızı zona) qaydalarına ciddi
              riayət olunur.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Rig tipləri (qısa tanışlıq)
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Komponentlər eyni olsa da, rig-in ümumi konstruksiyası quyunun yerinə görə dəyişir:{" "}
              <strong>land rig</strong> (quruda), <strong>jack-up</strong> (dayaz dəniz, ayaqları
              dəniz dibinə söykənir), <strong>semi-submersible</strong> və{" "}
              <strong>drillship</strong> (dərin su, üzən platformalar). Offshore rig-lərdə əlavə
              olaraq <strong>marine riser</strong> sistemi lazımdır — dəniz səthi ilə quyu başlığı
              arasında əlaqəni təmin edir.
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
              Mud pump-lar 5,000+ psi təzyiq yarada bilir. Bu sistemlərdə kiçik bir sızma belə
              ciddi zədəyə səbəb ola bilər — ona görə mud sistemi mütəmadi təzyiq testlərindən
              keçirilir və heç vaxt işləyən xətt üzərində əl ilə müdaxilə edilmir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Hesablama — Hook Load
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Draworks-un daşıdığı real yükü hesablamaq üçün, əvvəlki dərsdəki buoyancy factor-u
              istifadə edirik:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: drill string-in havadakı çəkisi = 120,000 lbs, Buoyancy Factor = 0.847 (1.1.1-dən)
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                Hook Load = Havadakı çəki × BF
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Hook Load = 120,000 × 0.847 = <span style={{ color: PATH_COLOR }}>101,640 lbs</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: draworks əslində 101,640 lbs yük daşıyır (120,000 yox) — bu fərq mud-un
                üzmə qüvvəsindən qaynaqlanır. Weight indicator əməliyyatçıya məhz bu real dəyəri
                göstərir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Heydər Əliyev (ACG) platforması, Xəzər dənizi", text: "Sabit (fixed) offshore platforma — dayaz dərinlikdə, illər ərzində davamlı qazıma əməliyyatları üçün nəzərdə tutulub." },
                { name: "Transocean drillship-ləri, Qərbi Afrika", text: "Dərin su qazıması üçün dinamik mövqe saxlama sistemli üzən platformalar — marine riser vasitəsilə dəniz dibinə bağlanır." },
                { name: "Şimal dənizi jack-up rig-ləri", text: "Dayaz-orta dərinlikli sularda ayaqları dəniz dibinə endirilən mobil platformalar — quraşdırma və sökülmə sürəti üstünlükdür." },
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
              <li>• Derrick, draworks, top drive, mud pumps — 4 əsas sistemin fiziki təcəssümüdür</li>
              <li>• Rig tipi (land, jack-up, semi-sub, drillship) quyunun yerindən (quru/dəniz, dərinlik) asılıdır</li>
              <li>• Hook load = havadakı çəki × buoyancy factor — real yükü göstərir</li>
              <li>• Rig floor yüksək risk zonasıdır — dropped object və yüksək təzyiq əsas təhlükələrdir</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling/rotary-drilling-system"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Rotary Drilling Sisteminə Giriş
          </Link>
          <Link
            href="/learn/drilling/drill-string-bha"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Drill String və BHA
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}