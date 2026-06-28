"use client";
import { useState } from "react";
import Link from "next/link";

const levels = [
  { id: "baslangic", label: "Başlanğıc", accent: "#22C55E" },
  { id: "orta",      label: "Orta",      accent: "#F59E0B" },
  { id: "ireli",     label: "İrəli",     accent: "#EF4444" },
];

const topics = [
  { id: "geology",    label: "Geologiya",    icon: "🪨", levels: ["baslangic", "orta", "ireli"] },
  { id: "drilling",   label: "Drilling",     icon: "⛏",  levels: ["baslangic", "orta", "ireli"] },
  { id: "reservoir",  label: "Rezervuar",    icon: "🛢️", levels: ["baslangic", "orta"] },
  { id: "well-log",   label: "Quyu loqları", icon: "📊", levels: ["baslangic", "orta"] },
  { id: "production", label: "Hasilat",      icon: "⚡", levels: ["orta", "ireli"] },
];

export default function LessonsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const filteredTopics = selectedLevel
    ? topics.filter((t) => t.levels.includes(selectedLevel))
    : topics;

  return (
    <main className="min-h-screen" style={{ background: "#080C18" }}>
      <div className="max-w-2xl mx-auto px-6 py-12">

        <div className="mb-10">
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase font-mono mb-2" style={{ color: "#FF6B2B" }}>
            // öyrənmə yolu
          </p>
          <h1 className="font-['Space_Grotesk'] text-[2.2rem] font-bold leading-tight mb-2" style={{ color: "#F0F4FF" }}>
            Dərslər
          </h1>
          <p className="text-[14px] font-['Space_Grotesk']" style={{ color: "#6B82A0" }}>
            Səviyyə seç, mövzu tap, öyrən
          </p>
        </div>

        {/* Səviyyə seçici */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase font-mono mb-3" style={{ color: "#3D5570" }}>
            Səviyyə
          </p>
          <div className="flex gap-2">
            {levels.map((level) => {
              const active = selectedLevel === level.id;
              return (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(active ? null : level.id)}
                  className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-medium font-['Space_Grotesk'] transition-all duration-200"
                  style={{
                    border: `1px solid ${active ? level.accent + "55" : "rgba(255,255,255,0.07)"}`,
                    background: active ? level.accent + "18" : "#0D1525",
                    color: active ? level.accent : "#6B82A0",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: level.accent }}
                  />
                  {level.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mövzular */}
        <div>
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase font-mono mb-3" style={{ color: "#3D5570" }}>
            Mövzular
          </p>
          <ul className="space-y-3">
            {filteredTopics.map((topic) => (
              <li key={topic.id}>
                <Link href={`/lessons/${topic.id}${selectedLevel ? `?level=${selectedLevel}` : ""}`}>
                  <div
                    className="group flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.07)" }}
                    onMouseEnter={e => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)")}
                    onMouseLeave={e => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)")}
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="text-[1.1rem]">{topic.icon}</span>
                        <span
                          className="font-semibold text-[14px] font-['Space_Grotesk']"
                          style={{ color: "#F0F4FF" }}
                        >
                          {topic.label}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        {topic.levels.map((l) => {
                          const lv = levels.find((x) => x.id === l)!;
                          const isActive = selectedLevel === l;
                          return (
                            <span
                              key={l}
                              className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-['Space_Grotesk']"
                              style={{
                                background: isActive ? lv.accent + "20" : "rgba(255,255,255,0.05)",
                                color: isActive ? lv.accent : "#6B82A0",
                                border: `1px solid ${isActive ? lv.accent + "40" : "rgba(255,255,255,0.07)"}`,
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: lv.accent }}
                              />
                              {lv.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <svg
                      className="h-4 w-4 flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5"
                      style={{ color: "#3D5570" }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}