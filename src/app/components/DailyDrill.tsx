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
  const [animKey, setAnimKey] = useState(0);
  const supabase = createClient();

  useEffect(() => { loadStreak(); }, []);

  async function loadStreak() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    console.log("=== STREAK DEBUG ===");
    console.log("today:", today);
    console.log("yesterday:", yesterday);

    const { data, error } = await supabase
      .from("user_streaks")
      .select("*")
      .eq("user_id", user.id)
      .single();

    console.log("DB data:", JSON.stringify(data));
    console.log("DB error:", error);
    console.log("last_drill_date:", data?.last_drill_date);
    console.log("last_drill_date type:", typeof data?.last_drill_date);
    console.log("match today?", data?.last_drill_date === today);
    console.log("match yesterday?", data?.last_drill_date === yesterday);

    if (data) {
      const lastDate = data.last_drill_date;

      if (lastDate === today) {
        console.log("→ BRANCH: done (already drilled today)");
        setStreak(data);
        setNewStreak(data.streak_count);
        setDrilledToday(true);
        setAnimKey((k) => k + 1);
        setPhase("done");
        await loadFact(user.id);
        setShowFact(true);
      } else if (lastDate === yesterday) {
        console.log("→ BRANCH: idle (drilled yesterday, streak continues)");
        setStreak(data);
        setPhase("idle");
      } else {
        console.log("→ BRANCH: idle (streak reset, last date was:", lastDate, ")");
        setStreak({ ...data, streak_count: 0 });
        setPhase("idle");
      }
    } else {
      console.log("→ BRANCH: no row found, first time user");
      setStreak({ streak_count: 0, total_visits: 0, last_drill_date: null });
      setPhase("idle");
    }

    setLoading(false);
  }

  async function loadFact(userId: string) {
    const { data: facts } = await supabase.from("daily_facts").select("fact_text, id");
    if (facts && facts.length > 0) {
      const dayOfYear = Math.floor(
        (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
      );
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

    setPhase("drilling");
    await sleep(1800);
    setPhase("cracking");
    await sleep(700);
    setPhase("gushing");

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    const streakVal =
      streak?.last_drill_date === yesterday
        ? (streak.streak_count || 0) + 1
        : 1;

    console.log("=== HANDLE DRILL ===");
    console.log("today:", today);
    console.log("streak before:", JSON.stringify(streak));
    console.log("streakVal:", streakVal);

    setNewStreak(streakVal);

    const { data: existing } = await supabase
      .from("user_streaks")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (existing) {
      const { error: updateError } = await supabase.from("user_streaks").update({
        streak_count: streakVal,
        last_drill_date: today,
        last_visit: today,
        total_visits: (streak?.total_visits || 0) + 1,
        updated_at: new Date().toISOString(),
      }).eq("user_id", user.id);
      console.log("update error:", updateError);
    } else {
      const { error: insertError } = await supabase.from("user_streaks").insert({
        user_id: user.id,
        streak_count: streakVal,
        last_drill_date: today,
        last_visit: today,
        total_visits: 1,
      });
      console.log("insert error:", insertError);
    }

    await loadFact(user.id);
    await sleep(1200);

    setAnimKey((k) => k + 1);
    setPhase("done");
    setDrilledToday(true);
    setStreak({
      streak_count: streakVal,
      total_visits: (streak?.total_visits || 0) + 1,
      last_drill_date: today,
    });
    await sleep(300);
    setShowFact(true);
  }

  function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

  if (loading) {
    return (
      <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] p-6 flex items-center justify-center h-48"
        style={{ background: "#0D1220" }}>
        <div className="w-5 h-5 border-2 border-[#FF6B2B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentStreak =
    phase === "done" && newStreak > 0
      ? newStreak
      : streak?.streak_count || 0;

  return (
    <div className="rounded-2xl border border-[rgba(255,107,43,0.2)] overflow-hidden" style={{ background: "#0D1220" }}>
      <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-[rgba(255,255,255,0.05)]">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#FF6B2B] font-['Space_Grotesk'] mb-0.5">
            Günlük Qazma
          </p>
          <h3 className="font-['Space_Grotesk'] font-bold text-[0.95rem] text-[#F0F4FF]">Bu günü qeyd et</h3>
        </div>
        <div className="text-center">
          <div
            className="font-['Space_Grotesk'] font-bold text-[#FF6B2B] leading-none transition-all duration-500"
            style={{ fontSize: phase === "done" ? "2.2rem" : "1.8rem" }}
          >
            {currentStreak}
          </div>
          <div className="text-[10px] text-[#3D4F6A] uppercase tracking-wider mt-0.5">gün streak</div>
        </div>
      </div>

      <div className="p-6">
        <div className="relative flex items-center justify-center mb-5" style={{ height: 160 }}>
          <svg key={animKey} viewBox="0 0 200 160" className="w-full h-full" style={{ maxWidth: 240 }}>
            <ellipse cx="100" cy="130" rx="70" ry="10" fill="#1a1a0a" opacity="0.8" />
            <rect x="30" y="125" width="140" height="35" rx="4" fill="#1a1a0a" opacity="0.6" />

            {(phase === "cracking" || phase === "gushing" || phase === "done") && (
              <>
                <line x1="95" y1="125" x2="88" y2="135" stroke="#FF6B2B" strokeWidth="1.5" opacity="0.7"
                  style={{ animation: "crack 0.3s ease-out forwards" }} />
                <line x1="105" y1="125" x2="112" y2="135" stroke="#FF6B2B" strokeWidth="1.5" opacity="0.7" />
                <line x1="100" y1="125" x2="100" y2="138" stroke="#FF6B2B" strokeWidth="1" opacity="0.5" />
              </>
            )}

            {(phase === "gushing" || phase === "done") && (
              <g>
                <path d="M100,125 Q95,100 92,75 Q89,55 95,35"
                  stroke="#1a0f00" strokeWidth="10" fill="none" strokeLinecap="round"
                  style={{ animation: "gush 0.5s ease-out forwards" }} />
                <path d="M100,125 Q105,98 108,72 Q111,52 105,32"
                  stroke="#0f0800" strokeWidth="7" fill="none" strokeLinecap="round"
                  style={{ animation: "gush 0.5s ease-out 0.1s forwards", opacity: 0.7 }} />
                <circle cx="88" cy="50" r="4" fill="#1a0f00" style={{ animation: "drop1 1s ease-in infinite" }} />
                <circle cx="112" cy="45" r="3" fill="#0f0800" style={{ animation: "drop2 1.2s ease-in infinite 0.3s" }} />
                <circle cx="95" cy="30" r="5" fill="#1a0f00" style={{ animation: "drop3 0.9s ease-in infinite 0.1s" }} />
                <circle cx="100" cy="125" r="12" fill="#FF6B2B" opacity="0.15"
                  style={{ animation: "pulse-glow 1s ease-in-out infinite" }} />
              </g>
            )}

            <g style={{
              transform: phase === "drilling" ? "translateY(0px)"
                : (phase === "cracking" || phase === "gushing" || phase === "done") ? "translateY(10px)"
                : "translateY(-5px)",
              transition: "transform 0.3s ease",
              animation: phase === "drilling" ? "drill-move 0.15s ease-in-out infinite" : "none"
            }}>
              <rect x="96" y="40" width="8" height="55" rx="2" fill="#8B6914" />
              <rect x="97" y="40" width="3" height="55" rx="1" fill="#C49A1E" opacity="0.4" />
              <rect x="88" y="35" width="24" height="10" rx="3" fill="#6B5010" />
              <rect x="92" y="30" width="16" height="8" rx="2" fill="#8B6914" />
              <g transform="translate(100, 95) scale(0.38) translate(-100, -62)">
                <defs>
                  <linearGradient id="tcSteelBody" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5a6470"/><stop offset="30%" stopColor="#9aa3ad"/>
                    <stop offset="60%" stopColor="#c8cdd3"/><stop offset="100%" stopColor="#6b7480"/>
                  </linearGradient>
                  <linearGradient id="tcSteelCone" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7a8490"/><stop offset="50%" stopColor="#b0b8c0"/>
                    <stop offset="100%" stopColor="#4a5460"/>
                  </linearGradient>
                  <linearGradient id="tcBodyMain" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4a5260"/><stop offset="20%" stopColor="#8a9aa8"/>
                    <stop offset="50%" stopColor="#b8c2cc"/><stop offset="80%" stopColor="#7a8898"/>
                    <stop offset="100%" stopColor="#3a4250"/>
                  </linearGradient>
                </defs>
                <path d="M70,22 L85,22 L78,72 L55,85 Z" fill="url(#tcBodyMain)" stroke="#2a3240" strokeWidth="0.7"/>
                <path d="M115,22 L130,22 L145,85 L122,72 Z" fill="url(#tcBodyMain)" stroke="#2a3240" strokeWidth="0.7"/>
                <path d="M85,22 L115,22 L115,65 L100,80 L85,65 Z" fill="url(#tcBodyMain)" stroke="#2a3240" strokeWidth="0.7"/>
                <path d="M55,85 L78,72 L85,90 L70,100 Z" fill="url(#tcSteelBody)" stroke="#2a3240" strokeWidth="0.7"/>
                <path d="M145,85 L122,72 L115,90 L130,100 Z" fill="url(#tcSteelBody)" stroke="#2a3240" strokeWidth="0.7"/>
                <path d="M78,72 L122,72 L115,90 L85,90 Z" fill="url(#tcSteelBody)" stroke="#2a3240" strokeWidth="0.7"/>
                <ellipse cx="70" cy="98" rx="16" ry="14" fill="url(#tcSteelCone)" stroke="#2a3240" strokeWidth="0.8"/>
                <ellipse cx="130" cy="98" rx="16" ry="14" fill="url(#tcSteelCone)" stroke="#2a3240" strokeWidth="0.8"/>
                <ellipse cx="100" cy="105" rx="18" ry="15" fill="url(#tcSteelCone)" stroke="#2a3240" strokeWidth="0.9"/>
                <circle cx="70" cy="98" r="3" fill="#2a3240" stroke="#5a6470" strokeWidth="0.5"/>
                <circle cx="130" cy="98" r="3" fill="#2a3240" stroke="#5a6470" strokeWidth="0.5"/>
                <circle cx="100" cy="105" r="4" fill="#1a2230" stroke="#4a5a6a" strokeWidth="0.7"/>
              </g>
            </g>

            {phase === "done" && (
              <g>
                <circle cx="100" cy="60" r="16"
                  fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5"
                  style={{ animation: "pop-in 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards" }} />
                <path d="M92,60 L97,65 L108,55"
                  stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                  style={{ animation: "draw-check 0.3s ease-out 0.2s forwards", opacity: 0 }} />
              </g>
            )}
          </svg>

          <style>{`
            @keyframes drill-move{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
            @keyframes gush{from{stroke-dasharray:200;stroke-dashoffset:200;opacity:0}to{stroke-dasharray:200;stroke-dashoffset:0;opacity:1}}
            @keyframes drop1{0%{transform:translateY(0);opacity:1}100%{transform:translateY(30px);opacity:0}}
            @keyframes drop2{0%{transform:translateY(0);opacity:.8}100%{transform:translateY(25px);opacity:0}}
            @keyframes drop3{0%{transform:translateY(0);opacity:.9}100%{transform:translateY(35px);opacity:0}}
            @keyframes pulse-glow{0%,100%{r:12;opacity:.15}50%{r:18;opacity:.25}}
            @keyframes pop-in{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
            @keyframes draw-check{from{opacity:0}to{opacity:1}}
            @keyframes crack{from{opacity:0}to{opacity:.7}}
            @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
          `}</style>
        </div>

        {phase === "idle" && (
          <button onClick={handleDrill}
            className="w-full relative overflow-hidden bg-[#FF6B2B] text-white py-3.5 rounded-xl font-['Space_Grotesk'] font-bold text-[14px] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(255,107,43,0.4)] transition-all group">
            <span className="relative z-10">⛏ Qazmağa başla</span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          </button>
        )}

        {phase === "drilling" && (
          <div className="text-center py-2">
            <p className="text-[13px] text-[#FF6B2B] font-['Space_Grotesk'] font-semibold animate-pulse">Qazılır...</p>
            <div className="flex justify-center gap-1 mt-2">
              {[0,1,2].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B]"
                  style={{ animation: `bounce 0.6s ease-in-out ${i*0.15}s infinite` }} />
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
          <p className="text-center text-[13px] font-['Space_Grotesk'] font-bold py-2" style={{ color: "#FF6B2B" }}>
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
              <div className="rounded-xl p-4 border border-[rgba(255,107,43,0.15)]"
                style={{ background: "rgba(255,107,43,0.06)" }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#FF6B2B] font-['Space_Grotesk'] mb-2">
                  💡 Günün fakti
                </p>
                <p className="text-[12px] text-[#C0CDE0] leading-relaxed font-['Space_Grotesk']">{fact}</p>
              </div>
            )}
            <p className="text-[11px] text-[#2A3A52] mt-3 text-center font-['Space_Grotesk']">
              Cəmi {streak?.total_visits || 1} gün · Sabah davam et →
            </p>
          </div>
        )}
      </div>
    </div>
  );
}