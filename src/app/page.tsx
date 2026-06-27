"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.push("/dashboard");
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width;
      const H = canvas.height;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,107,43,0.2)";
      ctx.lineWidth = 1.5;
      for (let i = 0; i <= W; i += 2) {
        const y = H * 0.52 + Math.sin(i * 0.012 + t) * 60 + Math.sin(i * 0.027 + t * 1.3) * 25 + Math.sin(i * 0.005 + t * 0.6) * 40;
        i === 0 ? ctx.moveTo(i, y) : ctx.lineTo(i, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(0,212,255,0.15)";
      ctx.lineWidth = 1.5;
      for (let i = 0; i <= W; i += 2) {
        const y = H * 0.58 + Math.sin(i * 0.009 + t * 0.7 + 2) * 45 + Math.sin(i * 0.02 + t * 1.1) * 20;
        i === 0 ? ctx.moveTo(i, y) : ctx.lineTo(i, y);
      }
      ctx.stroke();

      t += 0.012;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="bg-[#080C18] text-[#F0F4FF] overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 55%, rgba(255,107,43,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, #080C18 100%)" }} />

        <div className="relative z-10 max-w-[680px]">
          <div className="inline-flex items-center gap-2 border border-[rgba(255,107,43,0.25)] rounded-full px-4 py-1.5 mb-8" style={{ background: "rgba(255,107,43,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B] animate-pulse" />
            <span className="text-[#FF6B2B] text-[11px] font-semibold tracking-[0.12em] uppercase font-['Space_Grotesk']">
              Petroleum Engineering · Azərbaycan
            </span>
          </div>

          <h1 className="font-['Space_Grotesk'] text-[clamp(2.8rem,7vw,5rem)] font-bold leading-[1.06] tracking-tight mb-6">
            Neft-qaz sənayesini<br />
            <span className="text-[#FF6B2B]">içəridən öyrən.</span>
          </h1>

          <p className="text-[#6B7DA3] text-[clamp(1rem,2vw,1.15rem)] leading-relaxed max-w-[520px] mx-auto mb-10">
            Tələbəsən, mühəndissən, ya sadəcə maraqlanırsan — bu sahənin nədən ibarət olduğunu, karyera yollarını, real alətləri və simulyatorları bir yerdə tap.
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            <Link href="/register">
              <button className="bg-[#FF6B2B] text-white px-9 py-3.5 rounded-xl font-['Space_Grotesk'] font-bold text-[15px] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(255,107,43,0.35)] transition-all">
                Qazımağa başla →
              </button>
            </Link>
            <Link href="/learn/well-log">
              <button className="text-[#F0F4FF] border border-[rgba(255,255,255,0.12)] px-9 py-3.5 rounded-xl font-['Space_Grotesk'] font-medium text-[15px] hover:border-[rgba(255,255,255,0.28)] transition-all" style={{ background: "rgba(255,255,255,0.04)" }}>
                Demo gör
              </button>
            </Link>
          </div>

          <div className="flex gap-10 flex-wrap justify-center mt-14">
            {[
              { num: "6", label: "Praktika modulu" },
              { num: "5", label: "Dərs bloku" },
              { num: "100+", label: "Quiz sualı" },
              { num: "AI", label: "Hər dərsdə" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-['Space_Grotesk'] text-[1.8rem] font-bold text-[#00D4FF] leading-none">{s.num}</div>
                <div className="text-[11px] text-[#3D4F6A] mt-1.5 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-25">
          <span className="text-[10px] text-white uppercase tracking-widest">Scroll</span>
          <svg className="w-4 h-4 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="max-w-[900px] mx-auto px-6 py-28 text-center">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#FF6B2B] font-['Space_Grotesk'] mb-5">Məsələ nədir?</p>
        <h2 className="font-['Space_Grotesk'] text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.15] mb-6 text-[#F0F4FF]">
          &ldquo;Petroleum Engineering&rdquo; deyəndə<br />
          <span className="text-[#6B7DA3]">nə başa düşürsən?</span>
        </h2>
        <p className="text-[#5A6A8A] text-[1.05rem] leading-relaxed max-w-[600px] mx-auto mb-14">
          Çoxu bilir ki, neft çıxarılır. Amma quyu necə qazılır, log nədir, rezervuar necə modelləşdirilir, mühəndis gündə nə edir — bunları öyrənmək üçün real bir yer yox idi. İndi var.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "📚", title: "Kitablar sıxıcıdır", desc: "500 səhifəlik nəzəriyyə, sıfır praktika. Oxuyursan, anlayırsan ki başa düşməmisən." },
            { icon: "🎬", title: "YouTube çatışmır", desc: "Pərakəndə videolar, Azərbaycan konteksti yox, ardıcıllıq yox." },
            { icon: "🏢", title: "Şirkətə girməmiş", desc: "Real alətlərə — Petrel, Eclipse, LAS analizi — yalnız işə girəndən sonra çıxış var." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-[rgba(255,255,255,0.06)] p-6 text-left" style={{ background: "#0D1220" }}>
              <div className="text-2xl mb-4">{item.icon}</div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-[0.95rem] text-[#F0F4FF] mb-2">{item.title}</h3>
              <p className="text-[0.83rem] text-[#4A5A72] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRY MAP */}
      <section className="border-y border-[rgba(255,255,255,0.05)]" style={{ background: "#060A15" }}>
        <div className="max-w-[1060px] mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#00D4FF] font-['Space_Grotesk'] mb-4">Industry Map</p>
              <h2 className="font-['Space_Grotesk'] text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold leading-[1.15] mb-5 text-[#F0F4FF]">
                Sahənin xəritəsini gör,<br />istiqaməti seç.
              </h2>
              <p className="text-[#5A6A8A] text-[1rem] leading-relaxed mb-8">
                Drilling mühəndisi, rezervuar mütəxəssisi, petrophysicist — kim nə edir, maaşlar necədir, hansı bacarıqlar lazımdır? Karyeranı qurmadan əvvəl sahəni tanı.
              </p>
              <Link href="/register">
                <button className="inline-flex items-center gap-2 text-[#00D4FF] border border-[rgba(0,212,255,0.25)] px-6 py-3 rounded-xl font-['Space_Grotesk'] font-medium text-[14px] hover:border-[rgba(0,212,255,0.5)] transition-all" style={{ background: "rgba(0,212,255,0.05)" }}>
                  Xəritəyə bax →
                </button>
              </Link>
            </div>
            <div className="rounded-2xl border border-[rgba(0,212,255,0.15)] p-6 relative overflow-hidden" style={{ background: "#0A1628" }}>
              <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.06), transparent 70%)" }} />
              <p className="text-[11px] text-[#00D4FF] font-semibold uppercase tracking-widest mb-5 font-['Space_Grotesk']">Əsas istiqamətlər</p>
              <div className="space-y-3">
                {[
                  { role: "Drilling Engineer", salary: "$80K–$140K", color: "#FF6B2B" },
                  { role: "Reservoir Engineer", salary: "$90K–$160K", color: "#00D4FF" },
                  { role: "Petrophysicist", salary: "$85K–$150K", color: "#A78BFA" },
                  { role: "Production Engineer", salary: "$75K–$130K", color: "#34D399" },
                  { role: "Geologist", salary: "$70K–$125K", color: "#FBBF24" },
                ].map((item) => (
                  <div key={item.role} className="flex items-center justify-between py-2.5 border-b border-[rgba(255,255,255,0.05)] last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                      <span className="text-[13px] text-[#C8D4E8] font-['Space_Grotesk']">{item.role}</span>
                    </div>
                    <span className="text-[12px] font-semibold font-['Space_Grotesk']" style={{ color: item.color }}>{item.salary}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#2A3A52] mt-4 font-['Space_Grotesk']">* Tam məlumat üçün qeydiyyat tələb olunur</p>
            </div>
          </div>
        </div>
      </section>

      {/* ÖYRƏNMƏ YOLU */}
      <section className="max-w-[1060px] mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#FF6B2B] font-['Space_Grotesk'] mb-4">Öyrənmə yolu</p>
          <h2 className="font-['Space_Grotesk'] text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold text-[#F0F4FF] leading-[1.15]">
            Dərsdən simulyatora,<br />simulyatordan peşəkarlığa.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", color: "#FF6B2B", title: "Dərslər", desc: "Geologiya, Drilling, Quyu Loqları, Rezervuar, Hasilat — hər mövzu 5 bölmə + quiz + AI chat ilə.", tags: ["Geologiya", "Drilling", "Rezervuar", "Hasilat"], href: "/lessons" },
            { step: "02", color: "#00D4FF", title: "Modullar", desc: "Öyrəndiyini real simulyatorda tətbiq et. LAS faylı yüklə, IPR əyrisi qur, Eclipse ssenariləri müqayisə et.", tags: ["Well Log AI", "Prosper", "Petrel", "Eclipse"], href: "/modules" },
            { step: "03", color: "#A78BFA", title: "Kəşf et", desc: "Azərbaycan yataqlarını kəşf et, Tools & Equipment öyrən, Industry Map ilə karyeranı planla.", tags: ["Yataqlar", "Tools", "Industry Map", "Oyun"], href: "/register" },
          ].map((item) => (
            <Link key={item.step} href={item.href}>
              <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] p-7 h-full hover:border-[rgba(255,255,255,0.14)] hover:-translate-y-1 transition-all cursor-pointer" style={{ background: "#0D1220" }}>
                <div className="font-['Space_Grotesk'] text-[3.5rem] font-bold leading-none mb-5" style={{ color: `${item.color}20` }}>{item.step}</div>
                <h3 className="font-['Space_Grotesk'] font-bold text-[1.1rem] mb-3" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-[0.85rem] text-[#4A5A72] leading-relaxed mb-5">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2.5 py-1 rounded-lg font-['Space_Grotesk'] font-medium" style={{ background: `${item.color}12`, color: item.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* REAL CONTENT */}
      <section className="border-y border-[rgba(255,255,255,0.05)]" style={{ background: "#060A15" }}>
        <div className="max-w-[1060px] mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#FF6B2B] font-['Space_Grotesk'] mb-4">Platformada nə var?</p>
            <h2 className="font-['Space_Grotesk'] text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold text-[#F0F4FF]">Hər şey bir yerdə.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🗺️", title: "Azərbaycan Yataqları", desc: "Günəşli, Çıraq, ACG — xəritə, tarixi, istehsal məlumatları.", color: "#34D399", href: "/azerbaijan-fields" },
              { icon: "📰", title: "Canlı Xəbərlər", desc: "Rigzone, OilPrice — dünya neft-qaz sənayesindən anlıq yeniliklər.", color: "#00D4FF", href: "/news" },
              { icon: "🎮", title: "Bilik Oyunu", desc: "Quiz sualları ilə öyrəndiyini yoxla, rəqiblərlə yarış.", color: "#A78BFA", href: "/game" },
              { icon: "🔧", title: "Tools & Equipment", desc: "Sahədə istifadə olunan avadanlıqları spesifik öyrən.", color: "#FBBF24", href: "/tools-equipment" },
              { icon: "📖", title: "Terminoloji Lüğət", desc: "400+ neft-qaz termini, izahları ilə. Azərbaycan dilində.", color: "#FF6B2B", href: "#" },
              { icon: "💰", title: "Neftin Qiyməti", desc: "Brent, WTI — real vaxt rejimində qiymət banneri.", color: "#F87171", href: "#" },
              { icon: "🤖", title: "AI Chat", desc: "Hər dərsdə, hər modulda — Claude ilə istənilən sualı sor.", color: "#00D4FF", href: "/lessons" },
              { icon: "🏭", title: "Industry Map", desc: "Vəzifə xəritəsi, maaşlar, tələb olunan bacarıqlar.", color: "#A78BFA", href: "/register" },
            ].map((item) => (
              <Link key={item.title} href={item.href}>
                <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] p-5 h-full hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-0.5 transition-all cursor-pointer" style={{ background: "#0D1220" }}>
                  <div className="text-xl mb-3">{item.icon}</div>
                  <h3 className="font-['Space_Grotesk'] font-semibold text-[0.88rem] mb-1.5" style={{ color: item.color }}>{item.title}</h3>
                  <p className="text-[0.78rem] text-[#3A4A62] leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1060px] mx-auto px-6 py-28">
        <div className="relative rounded-2xl p-16 text-center overflow-hidden border border-[rgba(255,107,43,0.15)]" style={{ background: "linear-gradient(135deg, #0F1E38 0%, #080C18 60%, #0C1830 100%)" }}>
          <div className="absolute -top-16 left-1/3 w-72 h-48 pointer-events-none rounded-full" style={{ background: "radial-gradient(ellipse, rgba(255,107,43,0.08), transparent 70%)" }} />
          <div className="absolute -bottom-16 right-1/3 w-72 h-48 pointer-events-none rounded-full" style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.06), transparent 70%)" }} />
          <div className="relative">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#FF6B2B] font-['Space_Grotesk'] mb-5">Hazırsan?</p>
            <h2 className="font-['Space_Grotesk'] text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[#F0F4FF] mb-4 leading-[1.15]">
              Sahəni kəşf etmək<br />bir klik uzaqlıqdadır.
            </h2>
            <p className="text-[#4A5A72] text-[1rem] mb-10 max-w-[420px] mx-auto leading-relaxed">
              Qeydiyyat pulsuz, bir dəqiqə çəkir. Industry Map-dən başla, dərslərə keç, simulyatoru aç.
            </p>
            <Link href="/register">
              <button className="bg-[#FF6B2B] text-white px-12 py-4 rounded-xl font-['Space_Grotesk'] font-bold text-[16px] hover:-translate-y-0.5 hover:shadow-[0_8px_36px_rgba(255,107,43,0.4)] transition-all">
                Qazımağa başla →
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}