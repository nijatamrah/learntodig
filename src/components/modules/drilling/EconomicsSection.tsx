"use client";

import SectionFrame from "./SectionFrame";
import EconomicsTheory from "./EconomicsTheory";
import EconomicsVisualTab from "./EconomicsVisualTab";
import EconomicsCalculators from "./EconomicsCalculators";
import MissionRunner from "./MissionRunner";
import { ECONOMICS_FORMULAS, ECONOMICS_MISSION, ECONOMICS_MISSION_INTRO, ECONOMICS_OBJECTIVES, ECONOMICS_QUIZ } from "./economics-content";

export default function EconomicsSection() {
  return (
    <SectionFrame
      sectionId="economics"
      title="Qazma iqtisadiyyatı"
      eyebrow="Qazma · İqtisadiyyat"
      subtitle="Xərc strukturu, time-depth planı, AFE və contingency, xərc/ft, learning curve, P10-P90 risk və quyunun EMV məntiqi."
      objectives={ECONOMICS_OBJECTIVES}
      formulas={ECONOMICS_FORMULAS}
      quiz={ECONOMICS_QUIZ}
      aiSectionTitle="Qazma iqtisadiyyatı"
      aiPlaceholder="Məsələn: AFE-də contingency-ni necə əsaslandırmaq olar?"
      contentTabs={[
        { id: "visual", label: "Vizual", render: () => <EconomicsVisualTab /> },
        { id: "theory", label: "Nəzəriyyə", render: ({ mode }) => <EconomicsTheory mode={mode} /> },
        { id: "calc", label: "Kalkulyatorlar", render: () => <EconomicsCalculators /> },
        { id: "mission", label: "Missiya", render: () => <MissionRunner intro={ECONOMICS_MISSION_INTRO} items={ECONOMICS_MISSION} /> },
      ]}
    />
  );
}
