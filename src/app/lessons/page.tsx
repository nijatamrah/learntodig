"use client";
import Link from "next/link";

interface LearningPath {
  n: number;
  slug: string;
  icon: string;
  name: string;
  subtitle: string;
  totalTopics: number;
  completedTopics: number; // TODO: real progress from Supabase (user_streaks/profiles)
  color: string;
}

const paths: LearningPath[] = [
  { n: 1, slug: "geology",    icon: "🪨", name: "Geologiya",    subtitle: "Harada neft var, necə tapılır",     totalTopics: 15,  completedTopics: 0, color: "#8B6F47" },
  { n: 2, slug: "drilling",   icon: "⛏",  name: "Qazma",        subtitle: "Quyu necə qazılır",                  totalTopics: 14,  completedTopics: 0, color: "#FF6B2B" },
  { n: 3, slug: "well-log",   icon: "📊", name: "Quyu Logging", subtitle: "Süxur və flüid necə ölçülür",        totalTopics: 7,  completedTopics: 0, color: "#3B9BD8" },
  { n: 4, slug: "reservoir",  icon: "🛢️", name: "Rezervuar",    subtitle: "Nə qədər var, necə hərəkət edir",    totalTopics: 10, completedTopics: 0, color: "#2DBE8C" },
  { n: 5, slug: "production", icon: "⚡", name: "Hasilat",      subtitle: "Neft necə çıxarılır",                totalTopics: 8,  completedTopics: 0, color: "#E8B33D" },
];

export default function LessonsPage() {
  const totalDone = paths.reduce((a, p) => a + p.completedTopics, 0);
  const totalAll = paths.reduce((a, p) => a + p.totalTopics, 0);

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#080C18" }}>
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "#FF6B2B", opacity: 0.16, filter: "blur(120px)" }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "#3B9BD8", opacity: 0.14, filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: "#2DBE8C", opacity: 0.1, filter: "blur(120px)" }}
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

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase font-mono mb-2" style={{ color: "#FF6B2B" }}>
              {`// öyrənmə yolu`}
            </p>
            <h1 className="font-['Space_Grotesk'] text-[2.2rem] font-bold leading-tight mb-2" style={{ color: "#F0F4FF" }}>
              Dərslər
            </h1>
            <p className="text-[14px] font-['Space_Grotesk']" style={{ color: "#6B82A0" }}>
              Bir quyunun kəşfdən istismara qədər yolunu izlə
            </p>
          </div>
          <p className="text-[12px] font-['Space_Grotesk'] whitespace-nowrap" style={{ color: "#3D5570" }}>
            {totalDone}/{totalAll} mövzu
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-[23px] top-8 bottom-8 w-px"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />

          <ul className="space-y-4">
            {paths.map((path) => {
              const pct = Math.round((path.completedTopics / path.totalTopics) * 100);
              const isDone = pct === 100;
              const isStarted = path.completedTopics > 0;

              return (
                <li key={path.slug}>
                  <Link href={`/learn/${path.slug}`} className="flex gap-4 group">
                    <div
                      className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-[1.1rem]"
                      style={{
                        background: isDone ? "#22C55E22" : path.color + "22",
                        border: `1px solid ${isDone ? "#22C55E66" : path.color + "55"}`,
                        boxShadow: isDone ? "none" : `0 0 20px ${path.color}22`,
                      }}
                    >
                      {isDone ? "✓" : path.icon}
                    </div>

                    <div
                      className="flex-1 rounded-2xl px-5 py-4 transition-all duration-200"
                      style={{
                        background: "#0D1525E6",
                        backdropFilter: "blur(8px)",
                        border: `1px solid ${path.color}33`,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.border = `1px solid ${path.color}88`)}
                      onMouseLeave={(e) => (e.currentTarget.style.border = `1px solid ${path.color}33`)}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded"
                          style={{ background: path.color + "1E", color: path.color }}
                        >
                          {String(path.n).padStart(2, "0")}
                        </span>
                        <p className="font-semibold text-[14px] font-['Space_Grotesk']" style={{ color: "#F0F4FF" }}>
                          {path.name}
                        </p>
                      </div>
                      <p className="text-[12.5px] font-['Space_Grotesk'] mt-1" style={{ color: "#6B82A0" }}>
                        {path.subtitle}
                      </p>

                      <div className="flex items-center gap-2.5 mt-3">
                        <div
                          className="flex-1 h-1.5 rounded-full overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              background: isStarted ? path.color : "rgba(255,255,255,0.1)",
                            }}
                          />
                        </div>
                        <span className="text-[11px] font-['Space_Grotesk'] w-11 text-right" style={{ color: "#3D5570" }}>
                          {path.completedTopics}/{path.totalTopics}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}