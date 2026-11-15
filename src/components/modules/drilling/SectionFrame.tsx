"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import ModuleShell, { type ShellTab } from "../ModuleShell";
import ModuleChat from "../ModuleChat";
import Quiz, { type QuizQuestion } from "../Quiz";
import FormulaSheet, { type FormulaGroup } from "./FormulaSheet";
import { getModule } from "@/lib/modules/registry";
import { DRILLING_SECTIONS } from "@/lib/modules/drilling";
import { saveSectionProgress } from "@/lib/modules/progress";

const mod = getModule("drilling")!;
const PASS_PERCENT = 70;

interface Props {
  sectionId: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  /** "Bu bölmənin sonunda sən ... bacararsan" siyahısı */
  objectives: string[];
  /** Nəzəriyyə, kalkulyator, simulyator, missiya kimi məzmun tab-ları (quiz-dən əvvəl) */
  contentTabs: ShellTab[];
  formulas: FormulaGroup[];
  quiz: QuizQuestion[];
  aiSectionTitle: string;
  aiPlaceholder: string;
}

function SectionNav({ sectionId }: { sectionId: string }) {
  const idx = DRILLING_SECTIONS.findIndex((s) => s.id === sectionId);
  const prev = DRILLING_SECTIONS[idx - 1];
  const next = DRILLING_SECTIONS[idx + 1];
  const item = (s: (typeof DRILLING_SECTIONS)[number] | undefined, dir: "prev" | "next"): ReactNode => {
    if (!s) return <span />;
    const label = dir === "prev" ? `← ${String(s.order).padStart(2, "0")} · ${s.title}` : `${String(s.order).padStart(2, "0")} · ${s.title} →`;
    if (s.status === "live") {
      return (
        <Link href={`/modules/drilling/${s.id}`} className="text-[13px] font-semibold text-[#FBBF24] hover:underline font-['Space_Grotesk']">
          {label}
        </Link>
      );
    }
    return <span className="text-[13px] text-[#4A6A8A] font-['Space_Grotesk']">{label} (tezliklə)</span>;
  };
  return (
    <nav className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.07)] flex justify-between gap-4 flex-wrap" aria-label="Bölmələr arası keçid">
      {item(prev, "prev")}
      {item(next, "next")}
    </nav>
  );
}

export default function SectionFrame(p: Props) {
  const [saveNote, setSaveNote] = useState<string | null>(null);

  async function onQuizComplete(percent: number) {
    const passed = percent >= PASS_PERCENT;
    const saved = await saveSectionProgress({
      moduleId: mod.id,
      sectionId: p.sectionId,
      status: passed ? "completed" : "in_progress",
      score: percent,
    });
    if (!saved) setSaveNote("Nəticə saxlanmadı. Progress yazılması üçün daxil olun.");
    else setSaveNote(passed ? "Bölmə tamamlandı və progress saxlanıldı." : `Keçid həddi ${PASS_PERCENT}%. Nəzəriyyəyə qayıdıb yenidən cəhd et.`);
  }

  const tabs: ShellTab[] = [
    ...p.contentTabs,
    { id: "formulas", label: "Düsturlar", render: () => <FormulaSheet groups={p.formulas} /> },
    {
      id: "quiz",
      label: "Quiz",
      render: () => (
        <div className="max-w-3xl">
          <p className="text-[12px] text-[#6B82A0] mb-4 font-['Space_Grotesk']">
            Keçid həddi {PASS_PERCENT}%. Cavabların sırası hər cəhddə qarışdırılır.
          </p>
          <Quiz questions={p.quiz} accent={mod.accent} onComplete={onQuizComplete} />
          {saveNote && <p className="mt-4 text-[12px] text-[#9DB0CC] font-['Space_Grotesk']">{saveNote}</p>}
        </div>
      ),
    },
    {
      id: "ai",
      label: "AI müəllim",
      render: ({ mode }) => (
        <ModuleChat moduleId={mod.id} accent={mod.accent} mode={mode} sectionTitle={p.aiSectionTitle} placeholder={p.aiPlaceholder} />
      ),
    },
  ];

  const order = DRILLING_SECTIONS.find((s) => s.id === p.sectionId)?.order ?? 0;

  return (
    <ModuleShell
      mod={mod}
      tabs={tabs}
      title={`${String(order).padStart(2, "0")} · ${p.title}`}
      eyebrow={p.eyebrow}
      subtitle={p.subtitle}
      backHref="/modules/drilling"
      backLabel="← Qazma mühəndisliyi"
      intro={
        <details className="mb-6 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] px-4 py-3 group">
          <summary className="cursor-pointer text-[13px] font-semibold text-[#F0F4FF] font-['Space_Grotesk']">
            Bu bölmənin sonunda sən bunları bacaracaqsan
          </summary>
          <ul className="mt-3 space-y-1.5">
            {p.objectives.map((o) => (
              <li key={o} className="text-[12px] text-[#9DB0CC] font-['Space_Grotesk'] flex gap-2">
                <span style={{ color: "#FBBF24" }}>✓</span>
                {o}
              </li>
            ))}
          </ul>
        </details>
      }
      footer={<SectionNav sectionId={p.sectionId} />}
    />
  );
}
