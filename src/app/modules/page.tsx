import Link from "next/link";

export default function ModulesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-16">
      <div className="max-w-2xl w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-8"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Ana səhifə
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Modullar</h1>
        <p className="mt-2 text-slate-500">Simulyatorlar, AI chat və interaktiv alətlər</p>

        <ul className="mt-8 space-y-3">
          <li>
            <Link href="/learn/well-log" className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-amber-400 hover:shadow-md">
              <span className="font-medium text-slate-900">⛽ Loq analizi (WellLogAI)</span>
              <span className="mt-1 block text-sm text-slate-600">LAS faylı yüklə, quyu loqlarını vizuallaşdır və AI ilə sual-cavab et</span>
            </Link>
          </li>
          <li>
            <Link href="/learn/prosper" className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-amber-400 hover:shadow-md">
              <span className="font-medium text-slate-900">🛢️ Prosper simulyatoru</span>
              <span className="mt-1 block text-sm text-slate-600">Quyu parametrlərini dəyişdir, məhsuldarlıq və axın rejimini izlə</span>
            </Link>
          </li>
          <li>
            <Link href="/learn/geology" className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-green-400 hover:shadow-md">
              <span className="font-medium text-slate-900">🪨 Geologiya modulu</span>
              <span className="mt-1 block text-sm text-slate-600">Litologiya, stratigrafiya, neft tələsi · AI chat · Quiz</span>
            </Link>
          </li>
          <li>
            <Link href="/learn/petrel" className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-blue-400 hover:shadow-md">
              <span className="font-medium text-slate-900">🗺️ Petrel simulyatoru</span>
              <span className="mt-1 block text-sm text-slate-600">Rezervuar modelləməsi, məsaməlilik, keçiricilik · AI chat · Quiz</span>
            </Link>
          </li>
          <li>
            <Link href="/learn/eclipse" className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-orange-400 hover:shadow-md">
              <span className="font-medium text-slate-900">⚡ Eclipse simulyatoru</span>
              <span className="mt-1 block text-sm text-slate-600">Rezervuar simulyasiyası, hasilat proqnozu, ssenari müqayisəsi · AI chat · Quiz</span>
            </Link>
          </li>
          <li>
            <Link href="/learn/drilling" className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-yellow-400 hover:shadow-md">
              <span className="font-medium text-slate-900">🔩 Drilling simulyatoru</span>
              <span className="mt-1 block text-sm text-slate-600">Qazıma parametrləri, ROP optimizasiyası, problem ssenarileri · AI chat · Quiz</span>
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}