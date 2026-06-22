"use client";
 
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import {
  LayoutGrid,
  BookOpen,
  MapPin,
  Gamepad2,
  Info,
  BookText,
  LogOut,
  Menu,
  X,
  Newspaper,
} from "lucide-react";
 
const links = [
  { href: "/modules", label: "Modullar", icon: LayoutGrid },
  { href: "/lessons", label: "Dərslər", icon: BookOpen },
  { href: "/azerbaijan-fields", label: "Yataqlar", icon: MapPin },
  { href: "/game", label: "Oyun", icon: Gamepad2 },
  { href: "/news", label: "Xəbərlər", icon: Newspaper },
  { href: "/about", label: "Haqqında", icon: Info },
];
 
function LDLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B2B" />
          <stop offset="100%" stopColor="#FF8F5C" />
        </linearGradient>
      </defs>
      <polygon points="100,18 68,105 132,105" fill="url(#ldGrad)" opacity="0.95" />
      <polygon points="68,105 28,175 100,128" fill="url(#ldGrad)" opacity="0.8" />
      <polygon points="132,105 100,128 172,175" fill="url(#ldGrad)" opacity="0.8" />
      <polygon points="100,128 68,105 100,92 132,105" fill="#0A0F1E" />
      <line x1="100" y1="18" x2="28" y2="175" stroke="#0A0F1E" strokeWidth="2" strokeLinecap="round" />
      <line x1="100" y1="18" x2="172" y2="175" stroke="#0A0F1E" strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="105" x2="172" y2="175" stroke="#0A0F1E" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="132" y1="105" x2="28" y2="175" stroke="#0A0F1E" strokeWidth="1.5" strokeLinecap="round" />
      <text x="96" y="90" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="36" fill="#FFFFFF" textAnchor="middle" dominantBaseline="middle">L</text>
      <text x="100" y="150" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="28" fill="#FF6B2B" textAnchor="middle" dominantBaseline="middle">D</text>
    </svg>
  );
}
 
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
 
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
 
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setAuthLoading(false);
    });
 
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
 
    return () => subscription.unsubscribe();
  }, [supabase]);
 
  async function handleSignOut() {
    await supabase.auth.signOut();
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  }
 
  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "";
 
  const initials = displayName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
 
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.07] bg-[rgba(10,15,30,0.97)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-7 h-16">
 
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 min-w-[170px] flex items-center gap-2.5 transition hover:opacity-80"
        >
          <LDLogo size={34} />
          <span className="font-['Space_Grotesk'] text-[1.1rem] font-bold tracking-tight text-[#F0F4FF]">
            Learn<span className="text-[#FF6B2B]">to</span>Dig
          </span>
        </Link>
 
        {/* Desktop nav links */}
        <div className="hidden items-center lg:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`group relative flex items-center gap-[7px] px-[14px] py-[10px] text-[11.5px] font-semibold uppercase tracking-[0.06em] transition-colors duration-200 ${
                  active
                    ? "text-white"
                    : "text-white/[0.68] hover:text-white/[0.92]"
                }`}
              >
                <Icon
                  size={15}
                  className={
                    active
                      ? "text-[#FF6B2B]"
                      : "text-white/[0.50] transition-colors duration-200 group-hover:text-white/[0.75]"
                  }
                />
                {l.label}
                <span
                  className={`absolute bottom-0 h-[2.5px] rounded-t-sm bg-[#FF6B2B] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    active
                      ? "left-[8%] right-[8%]"
                      : "left-1/2 right-1/2 group-hover:left-[10%] group-hover:right-[10%]"
                  }`}
                />
              </Link>
            );
          })}
        </div>
 
        {/* Desktop right cluster */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-glossary"))}
            className="flex items-center gap-1.5 rounded-lg border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.06)] px-3.5 py-[7px] text-[13px] font-semibold text-[#00D4FF] transition-all hover:border-[rgba(0,212,255,0.6)] hover:bg-[rgba(0,212,255,0.12)]"
          >
            <BookText size={15} />
            Lüğət
          </button>
 
          <div className="flex items-center gap-3 border-l border-white/[0.08] pl-3">
            {!authLoading &&
              (user ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B2B] to-[#FF8F5C] text-[11px] font-bold text-[#0A0F1E]">
                      {initials || "U"}
                    </div>
                    <span className="max-w-[120px] truncate text-[13.5px] font-medium text-[#F0F4FF]">
                      {displayName}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    title="Çıxış"
                    className="text-white/[0.45] transition-colors hover:text-[#FF6B2B]"
                  >
                    <LogOut size={17} />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-2 text-[13px] font-medium text-white/[0.55] transition-colors hover:text-[#F0F4FF]"
                  >
                    Daxil ol
                  </Link>
                  <Link href="/register">
                    <button className="rounded-lg bg-[#FF6B2B] px-4 py-2 font-['Space_Grotesk'] text-[13px] font-bold tracking-wide text-white transition-all hover:-translate-y-px hover:bg-[#FF7D45] hover:shadow-[0_4px_20px_rgba(255,107,43,0.35)]">
                      Qeydiyyat
                    </button>
                  </Link>
                </>
              ))}
          </div>
        </div>
 
        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="-mr-2 p-2 text-[#F0F4FF] lg:hidden"
          aria-label="Menyu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
 
      {/* Mobile panel */}
      {mobileOpen && (
        <div className="space-y-1 border-t border-white/[0.06] bg-[rgba(10,15,30,0.98)] px-6 py-4 lg:hidden">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold uppercase tracking-[0.05em] ${
                  active
                    ? "text-white"
                    : "text-white/[0.68]"
                }`}
              >
                <Icon
                  size={17}
                  className={active ? "text-[#FF6B2B]" : "text-white/[0.45]"}
                />
                {l.label}
              </Link>
            );
          })}
 
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-glossary"));
              setMobileOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-[#00D4FF]"
          >
            <BookText size={17} />
            Lüğət
          </button>
 
          <div className="mt-2 border-t border-white/[0.08] pt-3">
            {!authLoading &&
              (user ? (
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B2B] to-[#FF8F5C] text-[11px] font-bold text-[#0A0F1E]">
                      {initials || "U"}
                    </div>
                    <span className="text-[14px] font-medium text-[#F0F4FF]">
                      {displayName}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="text-[13px] text-white/[0.45] hover:text-[#FF6B2B]"
                  >
                    Çıxış
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-1">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg border border-white/[0.12] py-2.5 text-center text-[14px] text-[#F0F4FF]"
                  >
                    Daxil ol
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg bg-[#FF6B2B] py-2.5 text-center text-[14px] font-bold text-white"
                  >
                    Qeydiyyat
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
}