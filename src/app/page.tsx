import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          LearntoDig
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600 sm:text-xl">
          Neft-qaz sahəsi üçün interaktiv öyrənmə platformu
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Link
            href="/modules"
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white px-8 py-10 text-left shadow-sm transition-all hover:border-amber-400 hover:shadow-lg"
          >
            <span className="text-4xl">🗂️</span>
            <span className="mt-5 text-xl font-semibold text-slate-900">Modullar</span>
            <span className="mt-2 text-sm leading-relaxed text-slate-500">
              Simulyatorlar, AI chat və interaktiv alətlər — Well Log, Prosper, Geology, Petrel, Eclipse, Drilling
            </span>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-amber-600 group-hover:gap-2 transition-all">
              Modullara keç
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>

          <Link
            href="/lessons"
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white px-8 py-10 text-left shadow-sm transition-all hover:border-teal-400 hover:shadow-lg"
          >
            <span className="text-4xl">📚</span>
            <span className="mt-5 text-xl font-semibold text-slate-900">Dərslər</span>
            <span className="mt-2 text-sm leading-relaxed text-slate-500">
              Səviyyəyə və mövzuya görə strukturlaşdırılmış öyrənmə yolu — mətn, quiz, video və AI izahat
            </span>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-teal-600 group-hover:gap-2 transition-all">
              Dərslərə keç
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          BHOS Petroleum Engineering · Drilling ixtisaslaşması
        </p>
      </div>
    </main>
  );
}