"use client";
import { useState, use } from "react";
import Link from "next/link";
import ModuleBridge from "@/components/ModuleBridge";

import { geologyLesson } from "./data/geology";
import { drillingLesson } from "./data/drilling";
import { reservoirLesson } from "./data/reservoir";
import { wellLogLesson } from "./data/well-log";
import { productionLesson } from "./data/production";
import type { Lesson } from "./types";

// ─── LESSON REGISTRY ─────────────────────────────────────────────────────────

const lessonData: Record<string, Lesson> = {
  geology: geologyLesson,
  drilling: drillingLesson,
  reservoir: reservoirLesson,
  "well-log": wellLogLesson,
  production: productionLesson,
};

// ─── LEVEL CONFIG ────────────────────────────────────────────────────────────

const levelConfig = {
  baslangic: { label: "Başlanğıc", accent: "#22C55E", bg: "rgba(34,197,94,0.12)" },
  orta:      { label: "Orta",      accent: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  ireli:     { label: "İrəli",     accent: "#EF4444", bg: "rgba(239,68,68,0.12)" },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function LessonPage({
  params,
  searchParams,
}: {
  params: Promise<{ topic: string }>;
  searchParams: Promise<{ level?: string }>;
}) {
  const { topic } = use(params);
  const { level = "baslangic" } = use(searchParams);
  const lesson = lessonData[topic];
  const lv = levelConfig[level as keyof typeof levelConfig] ?? levelConfig.baslangic;
  const currentLevel = lesson?.levels?.[level as keyof typeof lesson.levels];

  const [quizStarted, setQuizStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  if (!lesson || !currentLevel) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950">
        <p className="text-gray-500">Dərs tapılmadı.</p>
      </main>
    );
  }

  const q = currentLevel.quiz[current];

  function handleAnswer(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
    setShowExplanation(true);
  }

  function handleNext() {
    if (current + 1 < currentLevel.quiz.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  }

  function resetQuiz() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setQuizStarted(false);
    setShowExplanation(false);
  }

  async function askAI() {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiAnswer("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: lesson.title,
          level: lv.label,
          question: aiQuestion,
        }),
      });
      const data = await res.json();
      setAiAnswer(data.answer ?? "Cavab alınmadı.");
    } catch {
      setAiAnswer("Xəta baş verdi. Yenidən cəhd edin.");
    } finally {
      setAiLoading(false);
    }
  }

  const levels: (keyof typeof levelConfig)[] = ["baslangic", "orta", "ireli"];

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href="/lessons"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition mb-8"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Dərslər
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-3xl font-bold tracking-tight">
              {lesson.icon} {lesson.title}
            </h1>
            <span
              className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold border"
              style={{ color: lv.accent, backgroundColor: lv.bg, borderColor: lv.accent + "40" }}
            >
              {lv.label}
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-5">{currentLevel.description}</p>

          {/* Level switcher */}
          <div className="flex gap-2">
            {levels.map((lvKey) => {
              const lvCfg = levelConfig[lvKey];
              const isActive = lvKey === level;
              return (
                <Link
                  key={lvKey}
                  href={`/lessons/${topic}?level=${lvKey}`}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium border transition-all"
                  style={{
                    color: isActive ? lvCfg.accent : "#6b7280",
                    backgroundColor: isActive ? lvCfg.bg : "transparent",
                    borderColor: isActive ? lvCfg.accent + "40" : "rgba(255,255,255,0.1)",
                  }}
                >
                  {lvCfg.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-3 mb-10">
          {currentLevel.sections.map((section, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedSection(expandedSection === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition"
              >
                <span className="text-sm font-semibold text-white">{section.heading}</span>
                <svg
                  className={`h-4 w-4 text-gray-500 transition-transform ${expandedSection === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedSection === i && (
                <div className="px-5 pb-5 space-y-4">
                  <p className="text-sm text-gray-400 leading-relaxed">{section.body}</p>

                  {section.terms && (
                    <div className="grid grid-cols-2 gap-1.5">
                      {section.terms.map((term, ti) => (
                        <div key={ti} className="flex items-start gap-2 rounded-lg bg-white/5 px-3 py-2">
                          <div>
                            <p className="text-xs font-medium text-white">{term.az}</p>
                            <p className="text-xs text-gray-500">{term.en}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.formula && (
                    <div className="rounded-xl border border-[#FF6B2B]/20 bg-[#FF6B2B]/5 p-4">
                      <p className="text-xs text-[#FF6B2B] font-semibold mb-2 uppercase tracking-wide">Düstur</p>
                      <code className="block text-sm text-white font-mono whitespace-pre-wrap mb-2">
                        {section.formula.expression}
                      </code>
                      <p className="text-xs text-gray-500 leading-relaxed">{section.formula.legend}</p>
                    </div>
                  )}

                  {section.example && (
                    <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                      <p className="text-xs text-blue-400 font-semibold mb-2 uppercase tracking-wide">Nümunə Hesablaması</p>
                      <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {section.example}
                      </p>
                    </div>
                  )}

                  {section.caseStudy && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <p className="text-xs text-emerald-400 font-semibold mb-2 uppercase tracking-wide">Real Nümunə</p>
                      <p className="text-sm text-gray-300 leading-relaxed">{section.caseStudy}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="my-8 border-t border-white/10" />

        {/* Quiz */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-white">📝 Quiz</h2>
            <span className="text-xs text-gray-500 bg-white/5 rounded-full px-2 py-1">
              {currentLevel.quiz.length} sual · {lv.label} səviyyə
            </span>
          </div>

          {!quizStarted ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <p className="text-gray-400 text-sm mb-4">
                {lv.label} səviyyəsi üzrə {currentLevel.quiz.length} sual sizi gözləyir. Hər cavabdan sonra izah verilir.
              </p>
              <button
                onClick={() => setQuizStarted(true)}
                className="rounded-xl bg-[#FF6B2B] px-6 py-3 text-sm font-semibold text-white hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(255,107,43,0.35)] transition-all"
              >
                Quizi başlat →
              </button>
            </div>
          ) : finished ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-4xl font-bold text-white mb-2">{score}/{currentLevel.quiz.length}</p>
              <p className="text-gray-400 text-sm mb-6">
                {score === currentLevel.quiz.length
                  ? "🎉 Mükəmməl! Bu səviyyəni tam mənimsədiniz."
                  : score >= currentLevel.quiz.length * 0.75
                  ? "👍 Əla nəticə! Bir-iki məqamı yoxlayın."
                  : score >= currentLevel.quiz.length * 0.5
                  ? "📖 Yaxşı cəhd! Bölmələri yenidən oxuyun."
                  : "🔄 Dərsi yenidən oxuyun, sonra cəhd edin."}
              </p>
              {level !== "ireli" && score >= Math.floor(currentLevel.quiz.length * 0.75) && (
                <Link
                  href={`/lessons/${topic}?level=${level === "baslangic" ? "orta" : "ireli"}`}
                  className="inline-block rounded-xl bg-[#FF6B2B] px-5 py-2.5 text-sm font-semibold text-white mr-3 hover:-translate-y-px transition-all"
                >
                  Növbəti səviyyə →
                </Link>
              )}
              <button
                onClick={resetQuiz}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-gray-300 hover:bg-white/10 transition"
              >
                Yenidən cəhd et
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs text-gray-500">Sual {current + 1} / {currentLevel.quiz.length}</p>
                <div className="flex gap-1">
                  {currentLevel.quiz.map((_, i) => (
                    <span
                      key={i}
                      className="h-1.5 w-6 rounded-full transition-colors"
                      style={{
                        backgroundColor:
                          i < current ? "#22C55E" : i === current ? lv.accent : "rgba(255,255,255,0.1)",
                      }}
                    />
                  ))}
                </div>
              </div>

              <p className="text-white font-medium mb-4 text-sm leading-relaxed">{q.question}</p>

              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  let borderColor = "rgba(255,255,255,0.1)";
                  let bgColor = "rgba(255,255,255,0.03)";
                  let textColor = "#d1d5db";

                  if (selected !== null) {
                    if (i === q.answer) {
                      borderColor = "#22C55E";
                      bgColor = "rgba(34,197,94,0.1)";
                      textColor = "#86efac";
                    } else if (selected === i) {
                      borderColor = "#EF4444";
                      bgColor = "rgba(239,68,68,0.1)";
                      textColor = "#fca5a5";
                    } else {
                      textColor = "#374151";
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full text-left rounded-xl border px-4 py-3 text-sm transition-all"
                      style={{ borderColor, backgroundColor: bgColor, color: textColor }}
                    >
                      <span className="font-mono text-xs mr-2 opacity-50">
                        {["A", "B", "C", "D"][i]}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {showExplanation && q.explanation && (
                <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
                  <p className="text-xs text-blue-400 font-semibold mb-1">💡 İzah</p>
                  <p className="text-xs text-gray-300 leading-relaxed">{q.explanation}</p>
                </div>
              )}

              {selected !== null && (
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="rounded-xl bg-[#FF6B2B] px-5 py-2.5 text-sm font-semibold text-white hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(255,107,43,0.3)] transition-all"
                  >
                    {current + 1 < currentLevel.quiz.length ? "Növbəti →" : "Nəticə →"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="my-8 border-t border-white/10" />

        {/* AI Chat */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-1">🤖 AI Müəllim</h2>
          <p className="text-sm text-gray-500 mb-5">
            {lesson.title} — {lv.label} səviyyəsi üzrə hər soruşa cavab verəcəm
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askAI()}
              placeholder="Məs: Bu bölmədə ən çətin anlayış hansıdır?"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#FF6B2B]/50 transition"
            />
            <button
              onClick={askAI}
              disabled={aiLoading}
              className="rounded-xl bg-[#FF6B2B] px-5 py-3 text-sm font-semibold text-white hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(255,107,43,0.35)] transition-all disabled:opacity-40"
            >
              {aiLoading ? "..." : "Sor"}
            </button>
          </div>
          {aiAnswer && (
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-gray-300 leading-relaxed">
              {aiAnswer}
            </div>
          )}
        </div>

        {/* Module Bridge */}
        <ModuleBridge topic={topic} />

      </div>
    </main>
  );
}
