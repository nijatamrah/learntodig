"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/modules", label: "Modullar" },
    { href: "/lessons", label: "Dərslər" },
    { href: "/about", label: "Haqqında" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[rgba(10,15,30,0.85)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">

        {/* Logo */}
        <Link href="/" className="font-['Space_Grotesk'] text-[1.1rem] font-bold text-[#F0F4FF] hover:opacity-80 transition">
          Learn<span className="text-[#FF6B2B]">to</span>Dig
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[14px] transition-colors ${
                pathname.startsWith(l.href)
                  ? "text-[#F0F4FF] font-medium"
                  : "text-[#6B7DA3] hover:text-[#F0F4FF]"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* CTA */}
          <Link href="/lessons">
            <button className="bg-[#FF6B2B] text-white px-5 py-2 rounded-lg font-['Space_Grotesk'] font-semibold text-[14px] hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(255,107,43,0.35)] transition-all">
              Başla →
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
}