"use client";

import SectionFrame from "./SectionFrame";
import HydraulicsTheory from "./HydraulicsTheory";
import HydraulicsVisual from "./HydraulicsVisual";
import HydraulicsSimulator from "./HydraulicsSimulator";
import HydraulicsCalculators from "./HydraulicsCalculators";
import MissionRunner from "./MissionRunner";
import { HYD_FORMULAS, HYD_MISSION, HYD_MISSION_INTRO, HYD_OBJECTIVES, HYD_QUIZ } from "./hydraulics-content";

export default function HydraulicsSection() {
  return (
    <SectionFrame
      sectionId="hydraulics"
      title="Hidravlika"
      eyebrow="Qazma · Hydraulics"
      subtitle="Təzyiq itkisi balansı, Bingham və power law, bit hidravlikası və optimallaşdırma, ECD, hole cleaning, surge/swab."
      objectives={HYD_OBJECTIVES}
      formulas={HYD_FORMULAS}
      quiz={HYD_QUIZ}
      aiSectionTitle="Hidravlika"
      aiPlaceholder="Məsələn: Niyə axını artıranda bit-ə düşən təzyiq payı azalır?"
      contentTabs={[
        { id: "visual", label: "Vizual", render: () => <HydraulicsVisual /> },
        { id: "theory", label: "Nəzəriyyə", render: ({ mode }) => <HydraulicsTheory mode={mode} /> },
        { id: "sim", label: "Hidravlika simulyatoru", render: ({ mode }) => <HydraulicsSimulator mode={mode} /> },
        { id: "calc", label: "Kalkulyatorlar", render: () => <HydraulicsCalculators /> },
        { id: "mission", label: "Missiya", render: () => <MissionRunner intro={HYD_MISSION_INTRO} items={HYD_MISSION} /> },
      ]}
    />
  );
}
