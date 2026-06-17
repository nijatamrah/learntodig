import Link from "next/link";

const modules = [
  {
    href: "/learn/well-log",
    icon: "⛽",
    title: "Loq analizi (WellLogAI)",
    desc: "LAS faylı yüklə, quyu loqlarını vizuallaşdır və AI ilə sual-cavab et",
    accent: "#F59E0B",
    tag: "AI · LAS fayl",
  },
  {
    href: "/learn/prosper",
    icon: "🛢️",
    title: "Prosper simulyatoru",
    desc: "Quyu parametrlərini dəyişdir, məhsuldarlıq və axın rejimini izlə",
    accent: "#F59E0B",
    tag: "Simulyator",
  },
  {
    href: "/learn/geology",
    icon: "🪨",
    title: "Geologiya modulu",
    desc: "Litologiya, stratigrafiya, neft tələsi · AI chat · Quiz",
    accent: "#22C55E",
    tag: "AI · Quiz",
  },
  {
    href: "/learn/petrel",
    icon: "🗺️",
    title: "Petrel simulyatoru",
    desc: "Rezervuar modelləməsi, məsaməlilik, keçiricilik · AI chat · Quiz",
    accent: "#3B82F6",
    tag: "AI · Quiz · 3D",
  },
  {
    href: "/learn/eclipse",
    icon: "⚡",
    title: "Eclipse simulyatoru",
    desc: "Rezervuar simulyasiyası, hasilat proqnozu, ssenari müqayisəsi · AI chat · Quiz",
    accent: "#F97316",
    tag: "AI · Quiz · Ssenari",
  },
  {
    href: "/learn/drilling",
    icon: "🔩",
    title: "Drilling simulyatoru",
    desc: "Qazıma parametrləri, ROP optimizasiyası, problem ssenarileri · AI chat · Quiz",
    accent: "#EAB308",
    tag: "AI · Quiz · ROP",
  },
];

export default function ModulesPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition mb-10"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Ana səhifə
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          Modullar
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-3">Modullar</h1>
        <p className="text-gray-400 text-lg mb-10">Simulyatorlar, AI chat və interaktiv alətlər</p>

        <ul className="space-y-3">
          {modules.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                className="group relative flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 hover:bg-white/8 hover:border-white/20 transition-all duration-200 overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 bottom-0 w-0.5 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: m.accent }}
                />
                <span className="text-2xl mt-0.5">{m.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white text-sm">{m.title}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border font-medium"
                      style={{
                        backgroundColor: m.accent + "15",
                        color: m.accent,
                        borderColor: m.accent + "35",
                      }}
                    >
                      {m.tag}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">{m.desc}</span>
                </div>
                <svg
                  className="h-4 w-4 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </main>
  );
}