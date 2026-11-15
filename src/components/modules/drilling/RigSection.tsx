"use client";

import SectionFrame from "./SectionFrame";
import RigSchematic from "./RigSchematic";
import RigTheory from "./RigTheory";
import RigCalculators from "./RigCalculators";
import MissionRunner from "./MissionRunner";
import { RIG_FORMULAS, RIG_MISSION, RIG_MISSION_INTRO, RIG_OBJECTIVES, RIG_QUIZ } from "./rig-content";

export default function RigSection() {
  return (
    <SectionFrame
      sectionId="rig-systems"
      title="Rig sistemləri"
      eyebrow="Qazma · Rig Systems"
      subtitle="Qazma qurğusunun 6 sistemi, hoisting və sirkulyasiya hesablamaları, trip tank və akkumulyator."
      objectives={RIG_OBJECTIVES}
      formulas={RIG_FORMULAS}
      quiz={RIG_QUIZ}
      aiSectionTitle="Rig sistemləri"
      aiPlaceholder="Məsələn: Niyə traveling block sistemində xətlərin sayını artırırlar?"
      contentTabs={[
        { id: "schematic", label: "Sxem", render: () => <RigSchematic /> },
        { id: "theory", label: "Nəzəriyyə", render: ({ mode }) => <RigTheory mode={mode} /> },
        { id: "calc", label: "Kalkulyatorlar", render: () => <RigCalculators /> },
        { id: "mission", label: "Missiya", render: () => <MissionRunner intro={RIG_MISSION_INTRO} items={RIG_MISSION} /> },
      ]}
    />
  );
}
