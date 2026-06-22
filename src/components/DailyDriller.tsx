"use client";

import { useEffect, useState, useRef } from "react";
import { Flame } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface DailyData {
  fact: string;
  date: string;
  streak: number;
}

type Phase = "idle" | "drilling" | "exploding" | "revealed";

const LAYERS = [
  { name: "Torpaq", color: "#8B6914" },
  { name: "Əhəngdaşı", color: "#6B7280" },
  { name: "Şist", color: "#4B5563" },
  { name: "Neft Layı", color: "#FF6B2B" },
];

export default function DailyDriller() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [data, setData] = useState<DailyData | null>(null);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [drillerY, setDrillerY] = useState(0);
  const [alreadyDrilled, setAlreadyDrilled] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // İstifadəçi sessiyasını yoxla
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUserId(session.user.id);
    });

    // Bu gün artıq qazılıbmı?
    const today = new Date().toISOString().split("T")[0];
    const stored = localStorage.getItem("dailyDriller_date");
    if (stored === today) {
      setAlreadyDrilled(true);
      const storedFact = localStorage.getItem("dailyDriller_fact");
      const storedStreak = localStorage.getItem("dailyDriller_streak");
      if (storedFact) {
        setData({ fact: storedFact, date: today, streak: Number(storedStreak) || 1 });
        setPhase("revealed");
      }
    }
  }, []);

  async function startDrilling() {
    if (phase !== "idle") return;

    // Login yoxlaması
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      // Qeydiyyat pəncərəsini aç
      window.location.href = "/login";
      return;
    }

    setPhase("drilling");
    setCurrentLayer(0);
    setDrillerY(0);

    for (let i = 0; i < LAYERS.length; i++) {
      setCurrentLayer(i);
      await new Promise((r) => { animRef.current = setTimeout(r, 700); });
      setDrillerY((i + 1) * 25);
    }

    // Fakt gətir
    try {
      const url = userId ? `/api/daily-fact?userId=${userId}` : "/api/daily-fact";
      const res = await fetch(url);
      if (!res.ok) throw new Error("API error");
      const factData = await res.json() as DailyData;

      setPhase("exploding");
      await new Promise((r) => { animRef.current = setTimeout(r, 900); });

      setData(factData);
      setPhase("revealed");
      setAlreadyDrilled(true);

      const today = new Date().toISOString().split("T")[0];
      localStorage.setItem("dailyDriller_date", today);
      localStorage.setItem("dailyDriller_fact", factData.fact);
      localStorage.setItem("dailyDriller_streak", String(factData.streak));
    } catch {
      // API xətası olsa animasiyanı geri qaytar
      setPhase("idle");
      setDrillerY(0);
    }
  }

  return (
    <div className="rounded-2xl border border-[#FF6B2B]/20 bg-gradient-to-br from-[#1A0F08] to-[#0A0F1E] p-6 overflow-hidden relative">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6B2B]">Günlük Kəşf</span>
          </div>
          <h3 className="text-white font-bold text-[15px]">Qazmacı Traktoru</h3>
        </div>
        {data && (
          <div className="flex items-center gap-1.5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-1.5">
            <Flame size={14} className="text-orange-400" />
            <span className="text-[13px] font-bold text-orange-400">{data.streak}</span>
            <span className="text-[11px] text-orange-400/70">gün</span>
          </div>
        )}
      </div>

      {/* Animation area */}
      <div className="relative h-52 rounded-xl overflow-hidden bg-[#060B17] border border-white/[0.04] mb-4">

        {/* Layers */}
        {LAYERS.map((layer, i) => (
          <div
            key={layer.name}
            className="absolute w-full flex items-center px-3 transition-all duration-500"
            style={{
              top: `${i * 25}%`,
              height: "25%",
              backgroundColor: `${layer.color}${phase === "drilling" && currentLayer === i ? "55" : "22"}`,
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              opacity: phase === "drilling" && currentLayer > i ? 0.4 : 1,
            }}
          >
            <span className="text-[10px] text-white/30 font-medium">{layer.name}</span>
            {phase === "drilling" && currentLayer === i && (
              <span className="ml-2 text-[10px] text-[#FF6B2B] animate-pulse">● Qazılır...</span>
            )}
          </div>
        ))}

        {/* Driller */}
        {(phase === "drilling" || phase === "idle") && (
          <div
            className="absolute left-1/2 -translate-x-1/2 transition-all duration-700 z-10"
            style={{ top: `calc(${drillerY}% - 8px)` }}
          >
            <div className="flex flex-col items-center">
              <div className="w-3 h-6 bg-[#9CA3AF] rounded-sm" />
              <div
                className="w-2 h-3 bg-[#FF6B2B] rounded-b-full"
                style={{ animation: phase === "drilling" ? "drillSpin 0.3s linear infinite" : "none" }}
              />
            </div>
          </div>
        )}

        {/* Oil gush */}
        {phase === "exploding" && (
          <div className="absolute inset-0 flex items-end justify-center pb-2">
            <div className="flex flex-col items-center gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-full bg-[#FF6B2B]"
                  style={{
                    width: `${16 - i * 2}px`,
                    height: `${24 - i * 4}px`,
                    opacity: 1 - i * 0.2,
                    animation: `oilGush 0.4s ease-out ${i * 0.08}s both`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Idle hint */}
        {phase === "idle" && !alreadyDrilled && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/20 text-[12px]">Qazmağa başlamaq üçün düyməyə bas</p>
          </div>
        )}
      </div>

      {/* Fact */}
      {phase === "revealed" && data && (
        <div className="rounded-xl border border-[#FF6B2B]/30 bg-[#FF6B2B]/5 p-4 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-lg mt-0.5">🛢️</span>
            <p className="text-[13.5px] text-white/80 leading-relaxed">{data.fact}</p>
          </div>
        </div>
      )}

      {/* Button */}
      {!alreadyDrilled ? (
        <button
          onClick={startDrilling}
          disabled={phase === "drilling" || phase === "exploding"}
          className="w-full rounded-xl bg-[#FF6B2B] py-3 text-[13px] font-bold text-white transition-all hover:bg-[#e55a1f] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {phase === "drilling" ? "Qazılır..." : phase === "exploding" ? "Neft çıxır! 🛢️" : "⛏️ Bu günün faktını qaz!"}
        </button>
      ) : (
        <div className="text-center text-[12px] text-white/30">
          Sabah yeni bir fakt sizi gözləyir 🌅
        </div>
      )}

      <style>{`
        @keyframes drillSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes oilGush {
          0% { transform: scaleY(0) translateY(20px); opacity: 0; }
          60% { transform: scaleY(1.3) translateY(-5px); opacity: 1; }
          100% { transform: scaleY(1) translateY(0); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}