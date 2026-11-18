"use client";

import SectionFrame from "./SectionFrame";
import CasingTheory from "./CasingTheory";
import CasingVisualTab from "./CasingVisualTab";
import CasingCalculators from "./CasingCalculators";
import MissionRunner from "./MissionRunner";
import { CASING_FORMULAS, CASING_MISSION, CASING_MISSION_INTRO, CASING_OBJECTIVES, CASING_QUIZ } from "./casing-content";

export default function CasingSection() {
  return (
    <SectionFrame
      sectionId="casing-cementing"
      title="Casing və sementləmə"
      eyebrow="Qazma · Casing & Cementing"
      subtitle="Casing kəmərləri, burst/collapse/tension dizaynı, dizayn faktorları, sement slurry və həcm hesabı, displacement, U-tube və mərkəzləmə."
      objectives={CASING_OBJECTIVES}
      formulas={CASING_FORMULAS}
      quiz={CASING_QUIZ}
      aiSectionTitle="Casing və sementləmə"
      aiPlaceholder="Məsələn: Niyə casing boşalanda collapse yükü dibdə ən böyükdür?"
      contentTabs={[
        { id: "visual", label: "Vizual", render: () => <CasingVisualTab /> },
        { id: "theory", label: "Nəzəriyyə", render: ({ mode }) => <CasingTheory mode={mode} /> },
        { id: "calc", label: "Kalkulyatorlar", render: () => <CasingCalculators /> },
        { id: "mission", label: "Missiya", render: () => <MissionRunner intro={CASING_MISSION_INTRO} items={CASING_MISSION} /> },
      ]}
    />
  );
}
