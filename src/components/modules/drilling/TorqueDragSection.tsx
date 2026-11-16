"use client";

import SectionFrame from "./SectionFrame";
import TorqueDragTheory from "./TorqueDragTheory";
import TorqueDragVisualTab from "./TorqueDragVisualTab";
import TorqueDragCalculators from "./TorqueDragCalculators";
import MissionRunner from "./MissionRunner";
import { TD_FORMULAS, TD_MISSION, TD_MISSION_INTRO, TD_OBJECTIVES, TD_QUIZ } from "./torquedrag-content";

export default function TorqueDragSection() {
  return (
    <SectionFrame
      sectionId="torque-drag"
      title="Torque and Drag"
      eyebrow="Qazma · Torque & Drag"
      subtitle="Soft-string modeli, pick-up/slack-off/rotating hook load, capstan effekti, kritik bucaq, torsiya və buckling limitləri."
      objectives={TD_OBJECTIVES}
      formulas={TD_FORMULAS}
      quiz={TD_QUIZ}
      aiSectionTitle="Torque and Drag"
      aiPlaceholder="Məsələn: Niyə build zonasında pick-up hook load-da sıçrayış olur?"
      contentTabs={[
        { id: "visual", label: "Vizual", render: () => <TorqueDragVisualTab /> },
        { id: "theory", label: "Nəzəriyyə", render: ({ mode }) => <TorqueDragTheory mode={mode} /> },
        { id: "calc", label: "Kalkulyatorlar", render: () => <TorqueDragCalculators /> },
        { id: "mission", label: "Missiya", render: () => <MissionRunner intro={TD_MISSION_INTRO} items={TD_MISSION} /> },
      ]}
    />
  );
}
