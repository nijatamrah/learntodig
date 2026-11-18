"use client";

import SectionFrame from "./SectionFrame";
import ProblemsTheory from "./ProblemsTheory";
import ProblemsVisualTab from "./ProblemsVisualTab";
import ProblemsCalculators from "./ProblemsCalculators";
import MissionRunner from "./MissionRunner";
import { PROBLEMS_FORMULAS, PROBLEMS_MISSION, PROBLEMS_MISSION_INTRO, PROBLEMS_OBJECTIVES, PROBLEMS_QUIZ } from "./problems-content";

export default function ProblemsSection() {
  return (
    <SectionFrame
      sectionId="problems-npt"
      title="Qazma problemləri və NPT"
      eyebrow="Qazma · Problemlər və NPT"
      subtitle="Stuck pipe və free point, hole cleaning, itki və ECD, wellbore instability, NPT iqtisadiyyatı və fishing/sidetrack qərarı."
      objectives={PROBLEMS_OBJECTIVES}
      formulas={PROBLEMS_FORMULAS}
      quiz={PROBLEMS_QUIZ}
      aiSectionTitle="Qazma problemləri və NPT"
      aiPlaceholder="Məsələn: Differensial yapışma ilə mexaniki yapışmanı necə ayırd etmək olar?"
      contentTabs={[
        { id: "visual", label: "Vizual", render: () => <ProblemsVisualTab /> },
        { id: "theory", label: "Nəzəriyyə", render: ({ mode }) => <ProblemsTheory mode={mode} /> },
        { id: "calc", label: "Kalkulyatorlar", render: () => <ProblemsCalculators /> },
        { id: "mission", label: "Missiya", render: () => <MissionRunner intro={PROBLEMS_MISSION_INTRO} items={PROBLEMS_MISSION} /> },
      ]}
    />
  );
}
