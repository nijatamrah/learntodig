"use client";

import { useState } from "react";
import ModuleShell, { type ShellTab } from "../ModuleShell";
import ModuleChat from "../ModuleChat";
import Quiz from "../Quiz";
import PressuresTheory from "./PressuresTheory";
import PressureCalculators from "./PressureCalculators";
import MudWindowSimulator from "./MudWindowSimulator";
import PressureMission from "./PressureMission";
import { QUIZ } from "./pressures-content";
import { getModule } from "@/lib/modules/registry";
import { saveSectionProgress } from "@/lib/modules/progress";

const mod = getModule("drilling")!;
const SECTION_ID = "pressures";
const PASS_PERCENT = 70;

export default function PressuresSection() {
  const [saveNote, setSaveNote] = useState<string | null>(null);

  async function onQuizComplete(percent: number) {
    const passed = percent >= PASS_PERCENT;
    const saved = await saveSectionProgress({
      moduleId: mod.id,
      sectionId: SECTION_ID,
      status: passed ? "completed" : "in_progress",
      score: percent,
    });
    if (!saved) setSaveNote("Nəticə saxlanmadı. Progress yazılması üçün daxil olun.");
    else setSaveNote(passed ? "Bölmə tamamlandı və progress saxlanıldı." : `Keçid həddi ${PASS_PERCENT}%. Nəzəriyyəyə qayıdıb yenidən cəhd et.`);
  }

  const tabs: ShellTab[] = [
    { id: "theory", label: "Nəzəriyyə", render: ({ mode }) => <PressuresTheory mode={mode} /> },
    { id: "calc", label: "Kalkulyatorlar", render: () => <PressureCalculators /> },
    { id: "window", label: "Mud window", render: ({ mode }) => <MudWindowSimulator mode={mode} /> },
    { id: "mission", label: "Missiya", render: () => <PressureMission /> },
    {
      id: "quiz",
      label: "Quiz",
      render: () => (
        <div className="max-w-3xl">
          <Quiz questions={QUIZ} accent={mod.accent} onComplete={onQuizComplete} />
          {saveNote && <p className="mt-4 text-[12px] text-[#9DB0CC] font-['Space_Grotesk']">{saveNote}</p>}
        </div>
      ),
    },
    {
      id: "ai",
      label: "AI müəllim",
      render: ({ mode }) => (
        <ModuleChat
          moduleId={mod.id}
          accent={mod.accent}
          mode={mode}
          sectionTitle="Təzyiqlər və mud window"
          placeholder="Məsələn: Niyə anormal təzyiqli zonada çat qradiyenti Pp-yə yaxınlaşır?"
        />
      ),
    },
  ];

  return (
    <ModuleShell
      mod={mod}
      tabs={tabs}
      title="03 · Təzyiqlər və mud window"
      eyebrow="Qazma · Pressures & Mud Window"
      subtitle="Hidrostatik, overburden, məsamə və çat təzyiqləri; mud window və casing seat seçimi."
      backHref="/modules/drilling"
      backLabel="← Qazma mühəndisliyi"
    />
  );
}
