import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-900 hover:text-slate-700 transition">
          LearntoDig
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/modules" className="text-sm text-slate-500 hover:text-slate-900 transition">
            Modullar
          </Link>
          <Link href="/lessons" className="text-sm text-slate-500 hover:text-slate-900 transition">
            Dərslər
          </Link>
          <Link href="/about" className="text-sm text-slate-500 hover:text-slate-900 transition">
            Haqqında
          </Link>
        </div>
      </div>
    </nav>
  );
}