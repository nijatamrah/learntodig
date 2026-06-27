"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface StreakData {
  streak_count: number;
  total_visits: number;
  last_drill_date: string | null;
}

type Phase = "idle" | "drilling" | "cracking" | "gushing" | "done";

export default function DailyDrill() {
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [fact, setFact] = useState<string | null>(null);
  const [drilledToday, setDrilledToday] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [showFact, setShowFact] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newStreak, setNewStreak] = useState(0);
  const supabase = createClient();

  useEffect(() => { loadStreak(); }, []);

  async function loadStreak() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase
      .from("user_streaks").select("*").eq("user_id", user.id).single();
    if (data) {
      setStreak(data);
      if (data.last_drill_date === today) {
        setDrilledToday(true);
        setPhase("done");
        await loadFact(user.id);
        setShowFact(true);
      }
    }
    setLoading(false);
  }

  async function loadFact(userId: string) {
    const { data: facts } = await supabase.from("daily_facts").select("fact_text, id");
    if (facts && facts.length > 0) {
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const userIndex = userId.charCodeAt(0) + userId.charCodeAt(1);
      setFact(facts[(dayOfYear + userIndex) % facts.length].fact_text);
    } else {
      setFact("Azərbaycan 1846-cı ildə dünyada ilk sənaye neft quyusunu qazmışdır.");
    }
  }

  async function handleDrill() {
    if (drilledToday || phase !== "idle") return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Animasiya mərhələləri
    setPhase("drilling");
    await sleep(1800);
    setPhase("cracking");
    await sleep(700);
    setPhase("gushing");

    // DB yenilə
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    let streakVal = 1;
    if (streak) {
      streakVal = streak.last_drill_date === yesterday ? streak.streak_count + 1 : 1;
    }
    setNewStreak(streakVal);

    const { data: existing } = await supabase.from("user_streaks").select("id").eq("user_id", user.id).single();
    if (existing) {
      await supabase.from("user_streaks").update({
        streak_count: streakVal,
        last_drill_date: today,
        last_visit: today,
        total_visits: (streak?.total_visits || 0) + 1,
        updated_at: new Date().toISOString(),
      }).eq("user_id", user.id);
    } else {
      await supabase.from("user_streaks").insert({
        user_id: user.id, streak_count: 1,
        last_drill_date: today, last_visit: today, total_visits: 1,
      });
    }

    await loadFact(user.id);
    await sleep(1200);
    setPhase("done");
    setDrilledToday(true);
    setStreak((prev) => ({ streak_count: streakVal, total_visits: (prev?.total_visits || 0) + 1, last_drill_date: today }));
    await sleep(300);
    setShowFact(true);
  }

  function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

  if (loading) {
    return (
      <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] p-6 flex items-center justify-center h-48" style={{ background: "#0D1220" }}>
        <div className="w-5 h-5 border-2 border-[#FF6B2B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentStreak = phase === "done" ? (newStreak || streak?.streak_count || 0) : (streak?.streak_count || 0);
  const streakLoaded = streak !== null || drilledToday;

  return (
    <div className="rounded-2xl border border-[rgba(255,107,43,0.2)] overflow-hidden" style={{ background: "#0D1220" }}>
      {/* Header */}
      <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-[rgba(255,255,255,0.05)]">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#FF6B2B] font-['Space_Grotesk'] mb-0.5">Günlük Qazıma</p>
          <h3 className="font-['Space_Grotesk'] font-bold text-[0.95rem] text-[#F0F4FF]">Bu günü qeyd et</h3>
        </div>
        <div className="text-center">
          <div
            className="font-['Space_Grotesk'] font-bold text-[#FF6B2B] leading-none transition-all duration-500"
            style={{ fontSize: phase === "done" ? "2.2rem" : "1.8rem" }}
          >
            {streakLoaded ? currentStreak : <span className="opacity-0">0</span>}
          </div>
          <div className="text-[10px] text-[#3D4F6A] uppercase tracking-wider mt-0.5">gün streak</div>
        </div>
      </div>

      <div className="p-6">
        {/* SVG Animasiya Səhnəsi */}
        <div className="relative flex items-center justify-center mb-5" style={{ height: 160 }}>
          <svg viewBox="0 0 200 160" className="w-full h-full" style={{ maxWidth: 240 }}>

            {/* Torpaq */}
            <ellipse cx="100" cy="130" rx="70" ry="10" fill="#1a1a0a" opacity="0.8" />
            <rect x="30" y="125" width="140" height="35" rx="4" fill="#1a1a0a" opacity="0.6" />

            {/* Torpaq çatı — cracking fazasında */}
            {(phase === "cracking" || phase === "gushing" || phase === "done") && (
              <>
                <line x1="95" y1="125" x2="88" y2="135" stroke="#FF6B2B" strokeWidth="1.5" opacity="0.7"
                  style={{ animation: "crack 0.3s ease-out forwards" }} />
                <line x1="105" y1="125" x2="112" y2="135" stroke="#FF6B2B" strokeWidth="1.5" opacity="0.7" />
                <line x1="100" y1="125" x2="100" y2="138" stroke="#FF6B2B" strokeWidth="1" opacity="0.5" />
              </>
            )}

            {/* Neft fışqırması — gushing + done fazasında */}
            {(phase === "gushing" || phase === "done") && (
              <g>
                {/* Əsas neft axını */}
                <path
                  d="M100,125 Q95,100 92,75 Q89,55 95,35"
                  stroke="#1a0f00" strokeWidth="10" fill="none" strokeLinecap="round"
                  style={{ animation: "gush 0.5s ease-out forwards" }}
                />
                <path
                  d="M100,125 Q105,98 108,72 Q111,52 105,32"
                  stroke="#0f0800" strokeWidth="7" fill="none" strokeLinecap="round"
                  style={{ animation: "gush 0.5s ease-out 0.1s forwards", opacity: 0.7 }}
                />
                {/* Damcılar */}
                <circle cx="88" cy="50" r="4" fill="#1a0f00" style={{ animation: "drop1 1s ease-in infinite" }} />
                <circle cx="112" cy="45" r="3" fill="#0f0800" style={{ animation: "drop2 1.2s ease-in infinite 0.3s" }} />
                <circle cx="95" cy="30" r="5" fill="#1a0f00" style={{ animation: "drop3 0.9s ease-in infinite 0.1s" }} />
                {/* Parıltı */}
                <circle cx="100" cy="125" r="12" fill="#FF6B2B" opacity="0.15"
                  style={{ animation: "pulse-glow 1s ease-in-out infinite" }} />
              </g>
            )}

            {/* Qazıma dəsti */}
            <g style={{
              transform: phase === "drilling"
                ? "translateY(0px)"
                : phase === "cracking" || phase === "gushing" || phase === "done"
                  ? "translateY(10px)"
                  : "translateY(-5px)",
              transition: "transform 0.3s ease",
              animation: phase === "drilling" ? "drill-move 0.15s ease-in-out infinite" : "none"
            }}>
              {/* Pipe */}
              <rect x="96" y="40" width="8" height="55" rx="2" fill="#8B6914" />
              <rect x="97" y="40" width="3" height="55" rx="1" fill="#C49A1E" opacity="0.4" />
              {/* Üst hissə */}
              <rect x="88" y="35" width="24" height="10" rx="3" fill="#6B5010" />
              <rect x="92" y="30" width="16" height="8" rx="2" fill="#8B6914" />

              {/* Tricone Drill Bit — scaled and positioned at bottom of pipe */}
              <g transform="translate(100, 95) scale(0.38) translate(-100, -62)">
                <defs>
                  <linearGradient id="tcSteelBody" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5a6470"/>
                    <stop offset="30%" stopColor="#9aa3ad"/>
                    <stop offset="60%" stopColor="#c8cdd3"/>
                    <stop offset="100%" stopColor="#6b7480"/>
                  </linearGradient>
                  <linearGradient id="tcSteelCone" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7a8490"/>
                    <stop offset="50%" stopColor="#b0b8c0"/>
                    <stop offset="100%" stopColor="#4a5460"/>
                  </linearGradient>
                  <linearGradient id="tcTeethGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#c0c8d0"/>
                    <stop offset="100%" stopColor="#3a4250"/>
                  </linearGradient>
                  <linearGradient id="tcBodyMain" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4a5260"/>
                    <stop offset="20%" stopColor="#8a9aa8"/>
                    <stop offset="50%" stopColor="#b8c2cc"/>
                    <stop offset="80%" stopColor="#7a8898"/>
                    <stop offset="100%" stopColor="#3a4250"/>
                  </linearGradient>
                  <linearGradient id="tcTopShank" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3a4250"/>
                    <stop offset="25%" stopColor="#9aa8b5"/>
                    <stop offset="50%" stopColor="#d0d8e0"/>
                    <stop offset="75%" stopColor="#8898a8"/>
                    <stop offset="100%" stopColor="#2a3240"/>
                  </linearGradient>
                </defs>

                {/* Main body - 3 blade sections */}
                {/* Left blade */}
                <path d="M70,22 L85,22 L78,72 L55,85 Z" fill="url(#tcBodyMain)" stroke="#2a3240" strokeWidth="0.7"/>
                <path d="M72,22 L76,22 L70,68 L58,80 Z" fill="rgba(255,255,255,0.12)"/>
                {/* Right blade */}
                <path d="M115,22 L130,22 L145,85 L122,72 Z" fill="url(#tcBodyMain)" stroke="#2a3240" strokeWidth="0.7"/>
                <path d="M124,22 L128,22 L130,68 L142,78 Z" fill="rgba(0,0,0,0.15)"/>
                {/* Center blade */}
                <path d="M85,22 L115,22 L115,65 L100,80 L85,65 Z" fill="url(#tcBodyMain)" stroke="#2a3240" strokeWidth="0.7"/>
                <path d="M88,22 L93,22 L93,62 L100,75 Z" fill="rgba(255,255,255,0.1)"/>

                {/* Shirttail / bit body lower section */}
                <path d="M55,85 L78,72 L85,90 L70,100 Z" fill="url(#tcSteelBody)" stroke="#2a3240" strokeWidth="0.7"/>
                <path d="M145,85 L122,72 L115,90 L130,100 Z" fill="url(#tcSteelBody)" stroke="#2a3240" strokeWidth="0.7"/>
                <path d="M78,72 L122,72 L115,90 L85,90 Z" fill="url(#tcSteelBody)" stroke="#2a3240" strokeWidth="0.7"/>

                {/* CONE 1 - Left */}
                <ellipse cx="70" cy="98" rx="16" ry="14" fill="url(#tcSteelCone)" stroke="#2a3240" strokeWidth="0.8"/>
                <g fill="url(#tcTeethGrad)" stroke="#1a2230" strokeWidth="0.4">
                  <polygon points="66,88 69,85 72,88 70,92 67,92"/>
                  <polygon points="72,86 75,83 78,87 76,91 73,90"/>
                  <polygon points="58,94 61,91 65,95 63,99 59,98"/>
                  <polygon points="65,92 68,89 71,93 69,97 66,96"/>
                  <polygon points="72,90 75,87 78,92 76,96 73,95"/>
                  <polygon points="55,100 58,96 62,101 60,106 56,105"/>
                  <polygon points="62,98 66,94 70,99 68,104 64,103"/>
                  <polygon points="70,97 74,93 77,98 75,103 71,102"/>
                  <polygon points="77,99 80,95 83,100 81,105 78,104"/>
                  <polygon points="60,107 64,103 68,108 66,113 62,112"/>
                  <polygon points="68,106 72,102 76,107 74,112 70,111"/>
                  <polygon points="76,108 79,104 82,109 80,113 77,112"/>
                </g>
                <circle cx="70" cy="98" r="3" fill="#2a3240" stroke="#5a6470" strokeWidth="0.5"/>
                <circle cx="70" cy="98" r="1.2" fill="#8a9aa8"/>

                {/* CONE 2 - Right */}
                <ellipse cx="130" cy="98" rx="16" ry="14" fill="url(#tcSteelCone)" stroke="#2a3240" strokeWidth="0.8"/>
                <g fill="url(#tcTeethGrad)" stroke="#1a2230" strokeWidth="0.4">
                  <polygon points="122,88 125,85 128,88 126,92 123,92"/>
                  <polygon points="128,86 131,83 134,87 132,91 129,90"/>
                  <polygon points="117,94 120,91 124,95 122,99 118,98"/>
                  <polygon points="124,92 127,89 130,93 128,97 125,96"/>
                  <polygon points="131,90 134,87 137,92 135,96 132,95"/>
                  <polygon points="115,100 118,96 122,101 120,106 116,105"/>
                  <polygon points="122,98 126,94 130,99 128,104 124,103"/>
                  <polygon points="130,97 134,93 137,98 135,103 131,102"/>
                  <polygon points="137,99 140,95 143,100 141,105 138,104"/>
                  <polygon points="120,107 124,103 128,108 126,113 122,112"/>
                  <polygon points="128,106 132,102 136,107 134,112 130,111"/>
                  <polygon points="136,108 139,104 142,109 140,113 137,112"/>
                </g>
                <circle cx="130" cy="98" r="3" fill="#2a3240" stroke="#5a6470" strokeWidth="0.5"/>
                <circle cx="130" cy="98" r="1.2" fill="#8a9aa8"/>

                {/* CONE 3 - Center */}
                <ellipse cx="100" cy="105" rx="18" ry="15" fill="url(#tcSteelCone)" stroke="#2a3240" strokeWidth="0.9"/>
                <g fill="url(#tcTeethGrad)" stroke="#1a2230" strokeWidth="0.5">
                  <polygon points="95,93 99,89 103,93 101,98 96,97"/>
                  <polygon points="103,92 107,88 111,92 109,97 104,96"/>
                  <polygon points="86,100 90,96 95,101 93,107 88,106"/>
                  <polygon points="94,98 98,94 103,99 101,105 96,104"/>
                  <polygon points="103,98 107,94 111,99 109,105 104,104"/>
                  <polygon points="111,100 115,96 119,101 117,106 112,105"/>
                  <polygon points="83,108 87,103 92,109 90,115 85,114"/>
                  <polygon points="91,106 96,101 101,107 99,113 94,112"/>
                  <polygon points="100,106 105,101 110,107 108,113 103,112"/>
                  <polygon points="109,107 113,102 117,108 115,114 110,113"/>
                  <polygon points="116,110 120,105 124,111 122,116 117,115"/>
                </g>
                <circle cx="100" cy="105" r="4" fill="#1a2230" stroke="#4a5a6a" strokeWidth="0.7"/>
                <circle cx="100" cy="105" r="1.8" fill="#6a7a8a"/>
                <circle cx="100" cy="105" r="0.7" fill="#aabbc0"/>

                {/* Nozzle ports */}
                <circle cx="82" cy="78" r="3" fill="#1a2230" stroke="#5a6470" strokeWidth="0.5"/>
                <circle cx="118" cy="78" r="3" fill="#1a2230" stroke="#5a6470" strokeWidth="0.5"/>
                <circle cx="100" cy="73" r="3" fill="#1a2230" stroke="#5a6470" strokeWidth="0.5"/>

                {/* Body highlight */}
                <path d="M88,23 Q100,28 112,23" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </g>
            </g>



            {/* Done — checkmark */}
            {phase === "done" && (
              <g>
                <circle cx="100" cy="60" r="16" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5"
                  style={{ animation: "pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards" }} />
                <path d="M92,60 L97,65 L108,55" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                  style={{ animation: "draw-check 0.3s ease-out 0.2s forwards", opacity: 0 }} />
              </g>
            )}
          </svg>

          {/* CSS Animasiyaları */}
          <style>{`
            @keyframes drill-move {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(4px); }
            }
            @keyframes gush {
              from { stroke-dasharray: 200; stroke-dashoffset: 200; opacity: 0; }
              to { stroke-dasharray: 200; stroke-dashoffset: 0; opacity: 1; }
            }
            @keyframes drop1 {
              0% { transform: translateY(0); opacity: 1; }
              100% { transform: translateY(30px); opacity: 0; }
            }
            @keyframes drop2 {
              0% { transform: translateY(0); opacity: 0.8; }
              100% { transform: translateY(25px); opacity: 0; }
            }
            @keyframes drop3 {
              0% { transform: translateY(0); opacity: 0.9; }
              100% { transform: translateY(35px); opacity: 0; }
            }
            @keyframes pulse-glow {
              0%, 100% { r: 12; opacity: 0.15; }
              50% { r: 18; opacity: 0.25; }
            }
            @keyframes pop-in {
              0% { transform: scale(0); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes draw-check {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes crack {
              from { opacity: 0; }
              to { opacity: 0.7; }
            }
          `}</style>
        </div>

        {/* Buton / Status */}
        {phase === "idle" && (
          <button
            onClick={handleDrill}
            className="w-full relative overflow-hidden bg-[#FF6B2B] text-white py-3.5 rounded-xl font-['Space_Grotesk'] font-bold text-[14px] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(255,107,43,0.4)] transition-all group"
          >
            <span className="relative z-10">⛏ Qazımağa başla</span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          </button>
        )}

        {phase === "drilling" && (
          <div className="text-center py-2">
            <p className="text-[13px] text-[#FF6B2B] font-['Space_Grotesk'] font-semibold animate-pulse">Qazılır...</p>
            <div className="flex justify-center gap-1 mt-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B]"
                  style={{ animation: `bounce 0.6s ease-in-out ${i * 0.15}s infinite` }} />
              ))}
            </div>
          </div>
        )}

        {phase === "cracking" && (
          <p className="text-center text-[13px] text-[#FBBF24] font-['Space_Grotesk'] font-semibold animate-pulse py-2">
            Torpaq yarılır... 💥
          </p>
        )}

        {phase === "gushing" && (
          <p className="text-center text-[13px] text-[#1a0f00] font-['Space_Grotesk'] font-bold py-2"
            style={{ textShadow: "0 0 20px rgba(255,107,43,0.8)", color: "#FF6B2B" }}>
            🛢 Neft fışqırır!
          </p>
        )}

        {phase === "done" && (
          <div className={`transition-all duration-500 ${showFact ? "opacity-100" : "opacity-0"}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-[#34D399] flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[13px] text-[#34D399] font-semibold font-['Space_Grotesk']">
                Bu gün qazıdın! 🎉
              </span>
            </div>
            {fact && (
              <div className="rounded-xl p-4 border border-[rgba(255,107,43,0.15)]" style={{ background: "rgba(255,107,43,0.06)" }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#FF6B2B] font-['Space_Grotesk'] mb-2">💡 Günün fakti</p>
                <p className="text-[12px] text-[#C0CDE0] leading-relaxed font-['Space_Grotesk']">{fact}</p>
              </div>
            )}
            <p className="text-[11px] text-[#2A3A52] mt-3 text-center font-['Space_Grotesk']">
              Cəmi {streak?.total_visits || 1} gün · Sabah davam et →
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}