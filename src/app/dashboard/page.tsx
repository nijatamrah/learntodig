"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import DailyDrill from "@/app/components/DailyDrill";

const quickLinks = [
  { title: "Dərslər", desc: "Geologiya, Drilling, Rezervuar və daha çox", icon: "📚", color: "#FF6B2B", href: "/lessons", tag: "5 mövzu" },
  { title: "Modullar", desc: "Real simulyatorlar — LAS, IPR, Eclipse", icon: "⚡", color: "#00D4FF", href: "/modules", tag: "6 modul" },
  { title: "Azərbaycan Yataqları", desc: "Günəşli, ACG, Çıraq — xəritə və tarix", icon: "🗺️", color: "#34D399", href: "/azerbaijan-fields", tag: "İnteraktiv" },
  { title: "Industry Map", desc: "Karyera yolları, vəzifələr, maaşlar", icon: "🏭", color: "#A78BFA", href: "/industry-map", tag: "Yeni" },
  { title: "Tools & Equipment", desc: "Sahədəki əsas alətlər və avadanlıqlar", icon: "🔧", color: "#FBBF24", href: "/tools-equipment", tag: "Kataloq" },
  { title: "Bilik Oyunu", desc: "Quiz sualları ilə özünü yoxla", icon: "🎮", color: "#F87171", href: "/game", tag: "Oyna" },
];

const recentNews = [
  { source: "oilprice.com", title: "Brent crude qiymətləri bu həftə dəyişib", time: "2s əvvəl" },
  { source: "rigzone.com", title: "Xəzərdə yeni offshore layihə elan edildi", time: "1s əvvəl" },
  { source: "worldoil.com", title: "Drilling texnologiyasında yeni yeniliklər", time: "3s əvvəl" },
];

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [oilPrice, setOilPrice] = useState<string>("...");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const name =
        user.user_metadata?.display_name ||
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "İstifadəçi";
      setUser({ name, email: user.email || "" });
      setLoading(false);
    }
    getUser();
    const prices = ["$74.32", "$75.18", "$73.90", "$76.05", "$74.88"];
    setOilPrice(prices[Math.floor(Math.random() * prices.length)]);
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080C18] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#FF6B2B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Sabahın xeyir" : hour < 18 ? "Günortanız xeyir" : "Axşamınız xeyir";
  const firstName = user?.name.split(" ")[0] || "";

  return (
    <main className="min-h-screen bg-[#080C18] text-[#F0F4FF]">

      {/* TOP BAR — neft qiyməti */}
      <div className="border-b border-[rgba(255,255,255,0.05)] px-6 py-3" style={{ background: "#060A14" }}>
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            <span className="text-[12px] text-[#4A6A5A] font-['Space_Grotesk']">Brent Crude</span>
            <span className="text-[12px] font-bold text-[#34D399] font-['Space_Grotesk']">{oilPrice}</span>
            <span className="text-[11px] text-[#2A4A3A]">/ barrel</span>
          </div>
          <Link href="/news">
            <span className="text-[11px] text-[#3A4A62] hover:text-[#00D4FF] transition-colors font-['Space_Grotesk'] cursor-pointer">
              Canlı xəbərlər →
            </span>
          </Link>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-[13px] text-[#3D4F6A] font-['Space_Grotesk'] mb-1">{greeting},</p>
          <h1 className="font-['Space_Grotesk'] text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-[#F0F4FF] leading-tight">
            {firstName} <span className="text-[#FF6B2B]">⛏</span>
          </h1>
          <p className="text-[#3D4F6A] text-[14px] mt-1.5 font-['Space_Grotesk']">
            Bugün nə öyrənəcəksən?
          </p>
        </div>

        {/* DAİLY DRILL + QUICK LINKS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Daily Drill — sol tərəf, böyük */}
          <div className="lg:col-span-1">
            <DailyDrill />
          </div>

          {/* Quick links — sağ tərəf, 2x3 grid */}
          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#FF6B2B] font-['Space_Grotesk'] mb-4">
              Sürətli keçid
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickLinks.map((item) => (
                <Link key={item.title} href={item.href}>
                  <div
                    className="rounded-2xl border border-[rgba(255,255,255,0.06)] p-4 h-full hover:border-[rgba(255,255,255,0.14)] hover:-translate-y-0.5 transition-all cursor-pointer"
                    style={{ background: "#0D1220" }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-[1.1rem]"
                        style={{ background: `${item.color}15` }}
                      >
                        {item.icon}
                      </div>
                      <span
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded-lg font-['Space_Grotesk']"
                        style={{ background: `${item.color}15`, color: item.color }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-['Space_Grotesk'] font-semibold text-[0.82rem] text-[#F0F4FF] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[0.75rem] text-[#3D4F6A] leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* AŞAĞI: Xəbərlər + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Xəbərlər */}
          <div className="lg:col-span-2 rounded-2xl border border-[rgba(255,255,255,0.06)] p-6" style={{ background: "#0D1220" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-[#00D4FF] font-['Space_Grotesk']">Son Xəbərlər</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
              </div>
              <Link href="/news">
                <span className="text-[11px] text-[#2A3A52] hover:text-[#00D4FF] transition-colors font-['Space_Grotesk'] cursor-pointer">Hamısı →</span>
              </Link>
            </div>
            <div className="space-y-4">
              {recentNews.map((n, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                  <span className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase bg-[#00D4FF]/10 text-[#00D4FF] shrink-0 mt-0.5 font-['Space_Grotesk']">
                    {n.source}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#C0CDE0] leading-snug font-['Space_Grotesk']">{n.title}</p>
                    <p className="text-[11px] text-[#2A3A52] mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats + Lüğət */}
          <div className="space-y-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-glossary"))}
              className="w-full rounded-2xl border border-[rgba(255,107,43,0.15)] p-5 text-left hover:border-[rgba(255,107,43,0.3)] transition-all cursor-pointer"
              style={{ background: "#0D1220" }}
            >
              <div className="text-xl mb-3">📖</div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-[0.9rem] text-[#FF6B2B] mb-1">Terminoloji Lüğət</h3>
              <p className="text-[0.78rem] text-[#3D4F6A]">400+ neft-qaz termini, Azərbaycan dilində</p>
            </button>

            <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] p-5" style={{ background: "#0D1220" }}>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#3D4F6A] font-['Space_Grotesk'] mb-4">Platforma</p>
              <div className="space-y-3">
                {[
                  { label: "Modullar", val: "6", color: "#FF6B2B" },
                  { label: "Dərs bloku", val: "5", color: "#00D4FF" },
                  { label: "Quiz sualı", val: "100+", color: "#A78BFA" },
                  { label: "Termin", val: "400+", color: "#34D399" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-[12px] text-[#3D4F6A] font-['Space_Grotesk']">{s.label}</span>
                    <span className="text-[13px] font-bold font-['Space_Grotesk']" style={{ color: s.color }}>{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}