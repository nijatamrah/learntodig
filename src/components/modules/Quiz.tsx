"use client";

import { useEffect, useState } from "react";

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  /** Cavabdan sonra göstərilən izah (məcburidir: səhvdən öyrənmək üçün) */
  explanation: string;
}

interface Props {
  questions: QuizQuestion[];
  accent: string;
  onComplete?: (scorePercent: number) => void;
}

function shuffled(n: number) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz({ questions, accent, onComplete }: Props) {
  // answers[qi] = orijinal option indeksi; orders[qi] = göstərmə sırası (hər cəhddə qarışdırılır)
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [orders, setOrders] = useState<number[][]>(() => questions.map((q) => q.options.map((_, i) => i)));
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setOrders(questions.map((q) => shuffled(q.options.length)));
  }, [questions]);

  const score = answers.reduce<number>((n, a, i) => (a === questions[i].correct ? n + 1 : n), 0);
  const percent = Math.round((score / questions.length) * 100);

  function submit() {
    setSubmitted(true);
    onComplete?.(percent);
  }

  function reset() {
    setAnswers(questions.map(() => null));
    setOrders(questions.map((q) => shuffled(q.options.length)));
    setSubmitted(false);
  }

  return (
    <div className="space-y-4">
      {questions.map((item, qi) => (
        <div key={qi} className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
          <p className="text-[14px] font-semibold text-[#F0F4FF] mb-3 font-['Space_Grotesk']">
            {qi + 1}. {item.q}
          </p>
          <div className="space-y-2">
            {orders[qi].map((oi) => {
              const opt = item.options[oi];
              const chosen = answers[qi] === oi;
              const isCorrect = submitted && oi === item.correct;
              const isWrong = submitted && chosen && oi !== item.correct;
              return (
                <button
                  key={oi}
                  disabled={submitted}
                  onClick={() => setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)))}
                  className="w-full text-left text-[13px] rounded-xl px-3.5 py-2.5 font-['Space_Grotesk'] transition-colors"
                  style={{
                    background: isCorrect ? "#34D39920" : isWrong ? "#F8717120" : chosen ? accent + "18" : "#101A2E",
                    border: `1px solid ${isCorrect ? "#34D399" : isWrong ? "#F87171" : chosen ? accent : "rgba(255,255,255,0.06)"}`,
                    color: "#D5DEF0",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && (
            <p className="mt-3 text-[12px] leading-relaxed text-[#9DB0CC] font-['Space_Grotesk']">{item.explanation}</p>
          )}
        </div>
      ))}

      <div className="flex items-center gap-3">
        {!submitted ? (
          <button
            onClick={submit}
            disabled={answers.some((a) => a === null)}
            className="px-5 py-2.5 rounded-xl text-[13px] font-semibold disabled:opacity-40 font-['Space_Grotesk']"
            style={{ background: accent, color: "#080C18" }}
          >
            Yoxla
          </button>
        ) : (
          <>
            <span className="text-[14px] font-semibold text-[#F0F4FF] font-['Space_Grotesk']">
              Nəticə: {score}/{questions.length} ({percent}%)
            </span>
            <button
              onClick={reset}
              className="px-4 py-2 rounded-xl text-[12px] border border-[rgba(255,255,255,0.12)] text-[#D5DEF0] font-['Space_Grotesk']"
            >
              Yenidən (suallar qarışdırılır)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
