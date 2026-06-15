"use client";
import { useState } from "react";
import Link from "next/link";

const levels = [
  { id: "baslangic", label: "Başlanğıc", color: "hover:border-green-400", active: "border-green-400 bg-green-50", dot: "bg-green-400" },
  { id: "orta", label: "Orta", color: "hover:border-amber-400", active: "border-amber-400 bg-amber-50", dot: "bg-amber-400" },
  { id: "ireli", label: "İrəli", color: "hover:border-red-400", active: "border-red-400 bg-red-50", dot: "bg-red-400" },
];

const topics = [
  { id: "geology", label: "Geologiya", icon: "🪨", levels: ["baslangic", "orta", "ireli"] },
  { id: "drilling", label: "Drilling", icon: "🔩", levels: ["baslangic", "orta", "ireli"] },
  { id: "reservoir", label: "Rezervuar", icon: "🛢️", levels: ["baslangic", "orta"] },
  { id: "well-log", label: "Quyu loqları", icon: "⛽", levels: ["baslangic", "orta"] },
  { id: "production", label: "Hasilat", icon: "⚡", levels: ["orta", "ireli"] },
];

export default function LessonsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const filteredTopics = selectedLevel
    ? topics.filter((t) => t.levels.includes(selectedLevel))
    : topics;

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-16">
      <div className="max-w-2xl w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-8"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Ana səhifə
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Dərslər</h1>
        <p className="mt-2 text-slate-500">Səviyyə seç, mövzu tap, öyrən</p>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Səviyyə</p>
          <div className="flex gap-3">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
                className={`flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium text-slate-700 transition-all ${
                  selectedLevel === level.id
                    ? level.active + " border-2"
                    : "border-slate-200 bg-white " + level.color
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${level.dot}`} />
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
            Mövzular {selectedLevel && <span className="normal-case font-normal text-slate-400">— filtrləndı</span>}
          </p>
          <ul className="space-y-3">
            {filteredTopics.map((topic) => (
              <li key={topic.id}>
                <Link
                  href={`/lessons/${topic.id}${selectedLevel ? `?level=${selectedLevel}` : ""}`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-teal-400 hover:shadow-md"
                >
                  <div>
                    <span className="font-medium text-slate-900">
                      {topic.icon} {topic.label}
                    </span>
                    <div className="mt-1 flex gap-2">
                      {topic.levels.map((l) => {
                        const lv = levels.find((x) => x.id === l)!;
                        return (
                          <span
                            key={l}
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                              selectedLevel === l
                                ? "bg-teal-100 text-teal-700 font-medium"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${lv.dot}`} />
                            {lv.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <svg className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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