"use client";

import SectionFrame from "./SectionFrame";
import DirectionalTheory from "./DirectionalTheory";
import DirectionalVisualTab from "./DirectionalVisualTab";
import DirectionalCalculators from "./DirectionalCalculators";
import MissionRunner from "./MissionRunner";
import { DIRECTIONAL_FORMULAS, DIRECTIONAL_MISSION, DIRECTIONAL_MISSION_INTRO, DIRECTIONAL_OBJECTIVES, DIRECTIONAL_QUIZ } from "./directional-content";

export default function DirectionalSection() {
  return (
    <SectionFrame
      sectionId="directional"
      title="Directional drilling"
      eyebrow="Qazma · Directional Drilling"
      subtitle="Quyu profilləri, survey və minimum curvature, DLS, build-and-hold planı, toolface, BHA tendensiyaları və anti-collision."
      objectives={DIRECTIONAL_OBJECTIVES}
      formulas={DIRECTIONAL_FORMULAS}
      quiz={DIRECTIONAL_QUIZ}
      aiSectionTitle="Directional drilling"
      aiPlaceholder="Məsələn: Nə üçün minimum curvature tangential metoddan dəqiqdir?"
      contentTabs={[
        { id: "visual", label: "Vizual", render: () => <DirectionalVisualTab /> },
        { id: "theory", label: "Nəzəriyyə", render: ({ mode }) => <DirectionalTheory mode={mode} /> },
        { id: "calc", label: "Kalkulyatorlar", render: () => <DirectionalCalculators /> },
        { id: "mission", label: "Missiya", render: () => <MissionRunner intro={DIRECTIONAL_MISSION_INTRO} items={DIRECTIONAL_MISSION} /> },
      ]}
    />
  );
}
