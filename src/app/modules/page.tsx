"use client";
import Link from "next/link";

const modules = [
  { href: "/learn/well-log",  icon: "📋", title: "Loq analizi (WellLogAI)", desc: "LAS faylı yüklə, quyu loqlarını vizuallaşdır və AI ilə analiz et", accent: "#F59E0B", tag: "AI · LAS" },
  { href: "/learn/prosper",   icon: "🛢️", title: "Prosper simulyatoru",     desc: "Quyu parametrlərini dəyişdir, məhsuldarlıq və axın rejimini izlə",   accent: "#FF6B2B", tag: "Simulyator" },
  { href: "/learn/geology",   icon: "🪨", title: "Geologiya modulu",        desc: "Litologiya, stratigrafiya, neft tələsi · AI chat · Quiz",             accent: "#22C55E", tag: "AI · Quiz" },
  { href: "/learn/petrel",    icon: "🗺️", title: "Petrel simulyatoru",      desc: "Rezervuar modelləməsi, məsaməlilik, keçiricilik · AI chat",           accent: "#3B82F6", tag: "AI · 3D" },
  { href: "/learn/eclipse",   icon: "⚡", title: "Eclipse simulyatoru",     desc: "Rezervuar simulyasiyası, hasilat proqnozu, ssenari müqayisəsi",       accent: "#A78BFA", tag: "Ssenari" },
  { href: "/learn/drilling",  icon: "⛏",  title: "Drilling simulyatoru",    desc: "Qazıma parametrləri, ROP optimizasiyası, problem ssenarileri",        accent: "#FBBF24", tag: "ROP" },
];

export default function ModulesPage() {
  return (
    <main className="min-h-screen" style={{ background: "#080C18" }}>
      <div className="max-w-2xl mx-auto px-6 py-12">

        <div className="mb-10">
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase font-mono mb-2" style={{ color: "#00D4FF" }}>
            // praktika · simulyatorlar
          </p>
          <h1 className="font-['Space_Grotesk'] text-[2.2rem] font-bold leading-tight mb-2" style={{ color: "#F0F4FF" }}>
            Modullar
          </h1>
          <p className="text-[14px] font-['Space_Grotesk']" style={{ color: "#6B82A0" }}>
            Simulyatorlar, AI chat və interaktiv alətlər
          </p>
        </div>

        <ul className="space-y-3">
          {modules.map((m) => (
            <li key={m.href}>
              <Link href={m.href}>
                <div
                  className="group relative flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
                  style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={e => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)")}
                  onMouseLeave={e => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)")}
                >
                  {/* Sol accent xətti */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                    style={{ background: m.accent }}
                  />

                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[1.2rem] flex-shrink-0 ml-1"
                    style={{ background: m.accent + "20" }}
                  >
                    {m.icon}
                  </div>

                  {/* Mətn */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="font-semibold text-[14px] font-['Space_Grotesk']"
                        style={{ color: "#F0F4FF" }}
                      >
                        {m.title}
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-md font-semibold font-mono"
                        style={{
                          background: m.accent + "18",
                          color: m.accent,
                          border: `1px solid ${m.accent}35`,
                        }}
                      >
                        {m.tag}
                      </span>
                    </div>
                    <p
                      className="text-[12px] font-['Space_Grotesk'] leading-relaxed"
                      style={{ color: "#6B82A0" }}
                    >
                      {m.desc}
                    </p>
                  </div>

                  <svg
                    className="h-4 w-4 flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5"
                    style={{ color: "#3D5570" }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}