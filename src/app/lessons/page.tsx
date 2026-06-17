"use client";
import { useState } from "react";
import Link from "next/link";

const levels = [
  { id: "baslangic", label: "Başlanğıc", accent: "#22C55E" },
  { id: "orta",      label: "Orta",      accent: "#F59E0B" },
  { id: "ireli",     label: "İrəli",     accent: "#EF4444" },
];

const topics = [
  { id: "geology",    label: "Geologiya",     icon: "🪨", levels: ["baslangic", "orta", "ireli"] },
  { id: "drilling",   label: "Drilling",      icon: "🔩", levels: ["baslangic", "orta", "ireli"] },
  { id: "reservoir",  label: "Rezervuar",     icon: "🛢️", levels: ["baslangic", "orta"] },
  { id: "well-log",   label: "Quyu loqları",  icon: "⛽", levels: ["baslangic", "orta"] },
  { id: "production", label: "Hasilat",       icon: "⚡", levels: ["orta", "ireli"] },
];

export default function LessonsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const filteredTopics = selectedLevel
    ? topics.filter((t) => t.levels.includes(selectedLevel))
    : topics;

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition mb-10"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Ana səhifə
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Dərslər
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-3">Dərslər</h1>
        <p className="text-gray-400 text-lg mb-10">Səviyyə seç, mövzu tap, öyrən</p>

        {/* Level selector */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-3">Səviyyə</p>
          <div className="flex gap-2">
            {levels.map((level) => {
              const active = selectedLevel === level.id;
              return (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(active ? null : level.id)}
                  className="flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all"
                  style={{
                    borderColor: active ? level.accent : "rgba(255,255,255,0.1)",
                    backgroundColor: active ? level.accent + "18" : "rgba(255,255,255,0.04)",
                    color: active ? level.accent : "#9ca3af",
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: level.accent }}
                  />
                  {level.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Topics */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-3">
            Mövzular
            {selectedLevel && (
              <span className="normal-case font-normal text-gray-600 ml-1">— filtrləndı</span>
            )}
          </p>
          <ul className="space-y-3">
            {filteredTopics.map((topic) => (
              <li key={topic.id}>
                <Link
                  href={`/lessons/${topic.id}${selectedLevel ? `?level=${selectedLevel}` : ""}`}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 hover:bg-white/8 hover:border-white/20 transition-all"
                >
                  <div>
                    <span className="font-semibold text-white text-sm">
                      {topic.icon} {topic.label}
                    </span>
                    <div className="mt-2 flex gap-1.5">
                      {topic.levels.map((l) => {
                        const lv = levels.find((x) => x.id === l)!;
                        const isActive = selectedLevel === l;
                        return (
                          <span
                            key={l}
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs border"
                            style={{
                              backgroundColor: isActive ? lv.accent + "20" : "rgba(255,255,255,0.05)",
                              color: isActive ? lv.accent : "#6b7280",
                              borderColor: isActive ? lv.accent + "40" : "rgba(255,255,255,0.08)",
                            }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: lv.accent }}
                            />
                            {lv.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <svg
                    className="h-4 w-4 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </main>
  );
}