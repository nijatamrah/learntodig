"use client";

import SectionFrame from "./SectionFrame";
import PressuresTheory from "./PressuresTheory";
import PressureCalculators from "./PressureCalculators";
import MudWindowSimulator from "./MudWindowSimulator";
import PressureMission from "./PressureMission";
import { PRESSURES_FORMULAS, PRESSURES_OBJECTIVES, QUIZ } from "./pressures-content";

export default function PressuresSection() {
  return (
    <SectionFrame
      sectionId="pressures"
      title="Təzyiqlər və mud window"
      eyebrow="Qazma · Pressures & Mud Window"
      subtitle="Hidrostatik, overburden, məsamə və çat təzyiqləri; mud window və casing seat seçimi."
      objectives={PRESSURES_OBJECTIVES}
      formulas={PRESSURES_FORMULAS}
      quiz={QUIZ}
      aiSectionTitle="Təzyiqlər və mud window"
      aiPlaceholder="Məsələn: Niyə anormal təzyiqli zonada çat qradiyenti Pp-yə yaxınlaşır?"
      contentTabs={[
        { id: "theory", label: "Nəzəriyyə", render: ({ mode }) => <PressuresTheory mode={mode} /> },
        { id: "calc", label: "Kalkulyatorlar", render: () => <PressureCalculators /> },
        { id: "window", label: "Mud window", render: ({ mode }) => <MudWindowSimulator mode={mode} /> },
        { id: "mission", label: "Missiya", render: () => <PressureMission /> },
      ]}
    />
  );
}
