import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          LearntoDig
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600 sm:text-xl">
          Neft-qaz sahəsi üçün interaktiv öyrənmə platformu
        </p>

        <section className="mt-12 text-left">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Modullar
          </h2>
          <ul className="mt-4 space-y-3">
            <li>
              <Link
                href="/learn/prosper"
                className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-amber-400 hover:shadow-md"
              >
                <span className="font-medium text-slate-900">
                  🛢️ Prosper simulyatoru
                </span>
                <span className="mt-1 block text-sm text-slate-600">
                  Quyu parametrlərini dəyişdir, məhsuldarlıq və axın rejimini izlə
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/learn/well-log"
                className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-amber-400 hover:shadow-md"
              >
                <span className="font-medium text-slate-900">⛽ Loq analizi (WellLogAI)</span>
                <span className="mt-1 block text-sm text-slate-600">
                  LAS faylı yüklə, quyu loqlarını vizuallaşdır və AI ilə sual-cavab et
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/learn/geology"
                className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-green-400 hover:shadow-md"
              >
                <span className="font-medium text-slate-900">
                  🪨 Geologiya modulu
                </span>
                <span className="mt-1 block text-sm text-slate-600">
                  Litologiya, stratigrafiya, neft tələsi · AI chat · Quiz
                </span>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
