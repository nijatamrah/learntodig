"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HomePage() {
  const grLineRef = useRef<SVGPolylineElement>(null);
  const resLineRef = useRef<SVGPolylineElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    let t = 0;
    const pts = 120;

    function genPoints(offset: number, amp: number, freq: number, yBase: number) {
      const points: string[] = [];
      for (let i = 0; i < pts; i++) {
        const x = (i / pts) * 1400;
        const y =
          yBase +
          Math.sin(i * freq + offset) * amp +
          Math.sin(i * freq * 2.3 + offset * 1.4) * (amp * 0.4) +
          Math.sin(i * freq * 0.5 + offset * 0.7) * (amp * 0.6);
        points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      return points.join(" ");
    }

    function animate() {
      t += 0.018;
      grLineRef.current?.setAttribute("points", genPoints(t, 55, 0.18, 420));
      resLineRef.current?.setAttribute("points", genPoints(t * 0.7 + 2, 40, 0.22, 480));
      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const features = [
    {
      title: "Real LAS fayl analizi",
      desc: "Öz LAS faylını yüklə, AI ilə birlikdə analiz et",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#FF6B2B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      title: "AI Müəllim",
      desc: "Hər mövzuda sual ver, Claude sənə izah etsin",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#FF6B2B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      title: "Simulyatorlar",
      desc: "ROP, IPR, Eclipse ssenariləri — canlı simulyasiya",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#FF6B2B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      title: "Quiz & Qiymət",
      desc: "Hər dərsdən sonra biliyi yoxla, səviyyəni izlə",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#FF6B2B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
  ];

  const modules = [
    { name: "Well Log AI", desc: "LAS fayl yüklə, GR, Resistivity, Neutron-Density analizi, AI chat", color: "#FF6B2B", bg: "rgba(255,107,43,0.1)", href: "/learn/well-log" },
    { name: "Prosper — Hasilat", desc: "IPR əyriləri, Nodal Analysis, quyu məhsuldarlıq simulyatoru", color: "#00D4FF", bg: "rgba(0,212,255,0.1)", href: "/learn/prosper" },
    { name: "Geologiya", desc: "Litologiya, stratigrafiya, neft tələsi tipləri, 3D vizualizasiya", color: "#A78BFA", bg: "rgba(167,139,250,0.1)", href: "/learn/geology" },
    { name: "Petrel — Rezervuar", desc: "3D rezervuar modeli, porosity/permeability xəritələri", color: "#34D399", bg: "rgba(52,211,153,0.1)", href: "/learn/petrel" },
    { name: "Eclipse — Simulyasiya", desc: "Rezervuar simulyasiyası, müxtəlif inkişaf ssenarisi müqayisəsi", color: "#FBBF24", bg: "rgba(251,191,36,0.1)", href: "/learn/eclipse" },
    { name: "Drilling", desc: "ROP simulyatoru, WOB/RPM optimizasiya, qazıma problemi ssenariləri", color: "#F87171", bg: "rgba(248,113,113,0.1)", href: "/learn/drilling" },
    { name: "Azərbaycan Yataqları", desc: "Azərbaycanın əsas neft-qaz yataqları, xəritə və tarixi məlumat", color: "#34D399", bg: "rgba(52,211,153,0.1)", href: "/azerbaijan-fields" },
    { name: "Oyun", desc: "Neft-qaz biliklərinlə yarış, sualları cavablandır, səviyyə qazanın", color: "#A78BFA", bg: "rgba(167,139,250,0.1)", href: "/game" },
  ];

  return (
    <main className="bg-[#0A0F1E] text-[#F0F4FF] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="glow1" cx="30%" cy="50%" r="40%">
                <stop offset="0%" stopColor="rgba(255,107,43,0.12)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <radialGradient id="glow2" cx="75%" cy="40%" r="35%">
                <stop offset="0%" stopColor="rgba(0,212,255,0.1)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="1400" height="900" fill="url(#glow1)" />
            <rect width="1400" height="900" fill="url(#glow2)" />
            <g opacity="0.55">
              <polyline ref={grLineRef} fill="none" stroke="#FF6B2B" strokeWidth="1.5" opacity="0.7" />
              <polyline ref={resLineRef} fill="none" stroke="#00D4FF" strokeWidth="1.5" opacity="0.6" />
            </g>
            <g opacity="0.06" stroke="#8B9DC3" strokeWidth="0.5">
              {[150, 300, 450, 600, 750].map((y) => (
                <line key={y} x1="0" y1={y} x2="1400" y2={y} />
              ))}
              {[200, 400, 600, 800, 1000, 1200].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="900" />
              ))}
            </g>
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-block bg-[rgba(255,107,43,0.15)] text-[#FF6B2B] border border-[rgba(255,107,43,0.3)] rounded-full px-4 py-1.5 text-[13px] font-['Space_Grotesk'] font-medium tracking-widest uppercase mb-6">
            🛢 Neft-Qaz Mühəndisliyi
          </div>

          <h1 className="font-['Space_Grotesk'] text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-[1.1] tracking-tight mb-5 text-[#F0F4FF]">
            Öyrən.<br />
            <span className="text-[#FF6B2B]">Praktika et.</span><br />
            Mühəndis ol.
          </h1>

          <p className="text-[#8B9DC3] text-[clamp(1rem,2vw,1.15rem)] leading-relaxed max-w-[540px] mx-auto mb-10">
            Well Log analizi, rezervuar modelləmə, qazıma simulyatoru — real alətlərlə interaktiv öyrənmə platforması.
          </p>

          <div className="flex gap-3 flex-wrap justify-center mb-14">
            <Link href="/lessons">
              <button className="bg-[#FF6B2B] text-white px-8 py-3.5 rounded-[10px] font-['Space_Grotesk'] font-semibold text-[15px] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,107,43,0.35)] transition-all">
                Haradan başlayım? →
              </button>
            </Link>
            <Link href="/modules">
              <button className="bg-transparent text-[#F0F4FF] border border-[rgba(240,244,255,0.2)] px-8 py-3.5 rounded-[10px] font-['Space_Grotesk'] font-medium text-[15px] hover:border-[rgba(240,244,255,0.45)] hover:bg-[rgba(240,244,255,0.05)] transition-all">
                Modulları gör
              </button>
            </Link>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-glossary"))}
              className="bg-transparent text-[#00D4FF] border border-[rgba(0,212,255,0.25)] px-8 py-3.5 rounded-[10px] font-['Space_Grotesk'] font-medium text-[15px] hover:border-[rgba(0,212,255,0.5)] hover:bg-[rgba(0,212,255,0.05)] transition-all"
            >
              📖 Termin Lüğəti
            </button>
          </div>

          <div className="flex gap-10 flex-wrap justify-center">
            {[
              { num: "6", label: "Praktika modulu" },
              { num: "5", label: "Dərs tematikası" },
              { num: "100+", label: "Quiz sualı" },
              { num: "AI", label: "Chat hər dərsdə" },
              { num: "1", label: "İnteraktiv oyun" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-['Space_Grotesk'] text-[1.8rem] font-bold text-[#00D4FF]">{s.num}</div>
                <div className="text-[13px] text-[#6B7DA3] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto h-px bg-[rgba(255,255,255,0.05)]" />

      {/* ── NİYƏ ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-['Space_Grotesk'] text-[12px] font-semibold tracking-[0.1em] uppercase text-[#FF6B2B] mb-3">
              Niyə LearntoDig?
            </p>
            <h2 className="font-['Space_Grotesk'] text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] tracking-tight mb-4 text-[#F0F4FF]">
              Kitab oxumaq deyil,<br />
              <span className="text-[#FF6B2B]">əl işi</span> var burada
            </h2>
            <p className="text-[#8B9DC3] text-[1rem] leading-relaxed">
              Nəzəriyyədən praktikaya — dərslər, simulyatorlar, Azərbaycan yataqlarının xəritəsi, 400+ terminlik lüğət və bilikləri yoxlamaq üçün interaktiv oyun. Hamısı bir platformada, pulsuz.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-[14px] p-5">
                <div className="w-10 h-10 rounded-[10px] bg-[rgba(255,107,43,0.1)] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <div className="font-['Space_Grotesk'] font-semibold text-[0.9rem] mb-1.5 text-[#F0F4FF]">{f.title}</div>
                <div className="text-[0.82rem] text-[#6B7DA3] leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto h-px bg-[rgba(255,255,255,0.05)]" />

      {/* ── 3 ADDIM ── */}
      <section className="bg-[#060B17] px-6 py-20">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-['Space_Grotesk'] text-[12px] font-semibold tracking-[0.1em] uppercase text-[#FF6B2B] mb-2 text-center">
            Öyrənmə yolu
          </p>
          <h2 className="font-['Space_Grotesk'] text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] tracking-tight text-center text-[#F0F4FF]">
            3 addımda başla
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-12">
            {[
              { n: "01", title: "Dərs seç", text: "Geologiya, Drilling, Quyu Loqları, Rezervuar ya Hasilat — maraqlandığın mövzudan başla" },
              { n: "02", title: "Oxu + Quizlər", text: "5 bölmə, hər bölmədən sonra quiz. Anlamadığını AI-dan sor" },
              { n: "03", title: "Praktika et", text: "Dərs bitəndə müvafiq modul açılır — öyrəndiyini real simulyatorda tətbiq et" },
            ].map((s, i) => (
              <div key={s.n} className={`px-6 py-8 text-center ${i < 2 ? "md:border-r border-[rgba(255,255,255,0.06)]" : ""}`}>
                <div className="font-['Space_Grotesk'] text-[3rem] font-bold text-[rgba(0,212,255,0.15)] leading-none mb-3">{s.n}</div>
                <div className="font-['Space_Grotesk'] font-semibold text-[1rem] mb-2 text-[#F0F4FF]">{s.title}</div>
                <div className="text-[0.88rem] text-[#6B7DA3] leading-relaxed">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto h-px bg-[rgba(255,255,255,0.05)]" />

      {/* ── MODULLAR + YATAQLAR + OYUN ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="font-['Space_Grotesk'] text-[12px] font-semibold tracking-[0.1em] uppercase text-[#FF6B2B] mb-3">
          Platforma
        </p>
        <h2 className="font-['Space_Grotesk'] text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] tracking-tight mb-8 text-[#F0F4FF]">
          Hər şey bir yerdə
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <Link key={m.name} href={m.href}>
              <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-[14px] p-5 flex gap-3 items-start cursor-pointer hover:border-[rgba(255,107,43,0.3)] hover:-translate-y-0.5 transition-all h-full">
                <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: m.color }} />
                <div>
                  <div className="font-['Space_Grotesk'] font-semibold text-[0.9rem] mb-1 text-[#F0F4FF]">{m.name}</div>
                  <div className="text-[0.82rem] text-[#6B7DA3] leading-relaxed mb-2">{m.desc}</div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ background: m.bg, color: m.color }}>Hazır</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-[1100px] mx-auto px-6 pb-24">
        <div className="relative bg-gradient-to-br from-[#1A2744] to-[#0F1A3A] border border-[rgba(0,212,255,0.2)] rounded-[20px] p-14 text-center overflow-hidden">
          {/* Subtle glow accents */}
          <div className="absolute top-0 left-1/4 w-64 h-32 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(255,107,43,0.08), transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-64 h-32 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.07), transparent 70%)" }} />

          <div className="relative">
            <div className="inline-block text-[2rem] mb-4">🛢️</div>
            <h2 className="font-['Space_Grotesk'] text-[clamp(1.6rem,3.5vw,2.2rem)] font-bold mb-3 text-[#F0F4FF]">
              Mühəndis olmaq bir addım uzaqlıqdadır.
            </h2>
            <p className="text-[#6B7DA3] text-[0.95rem] mb-8 max-w-[420px] mx-auto leading-relaxed">
              Dərs seç, simulyatoru aç, oyunu oyna — öyrənmənin bu qədər maraqlı olacağını bilmirdin.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/lessons">
                <button className="bg-[#FF6B2B] text-white px-10 py-4 rounded-[10px] font-['Space_Grotesk'] font-semibold text-[16px] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,107,43,0.4)] transition-all">
                  Haradan başlayım? →
                </button>
              </Link>
              <Link href="/game">
                <button className="bg-transparent text-[#A78BFA] border border-[rgba(167,139,250,0.3)] px-10 py-4 rounded-[10px] font-['Space_Grotesk'] font-semibold text-[16px] hover:bg-[rgba(167,139,250,0.07)] transition-all">
                  🎮 Oyunu sına
                </button>
              </Link>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-glossary"))}
                className="bg-transparent text-[#00D4FF] border border-[rgba(0,212,255,0.3)] px-10 py-4 rounded-[10px] font-['Space_Grotesk'] font-semibold text-[16px] hover:bg-[rgba(0,212,255,0.05)] transition-all"
              >
                📖 Lüğət
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}