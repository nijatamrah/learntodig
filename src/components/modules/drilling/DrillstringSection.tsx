"use client";

import SectionFrame from "./SectionFrame";
import DrillstringTheory from "./DrillstringTheory";
import DrillstringVisualTab from "./DrillstringVisualTab";
import DrillstringCalculators from "./DrillstringCalculators";
import MissionRunner from "./MissionRunner";
import { DS_FORMULAS, DS_MISSION, DS_MISSION_INTRO, DS_OBJECTIVES, DS_QUIZ } from "./drillstring-content";

export default function DrillstringSection() {
  return (
    <SectionFrame
      sectionId="drillstring-bha"
      title="Drill string və BHA"
      eyebrow="Qazma · Drillstring & BHA"
      subtitle="String komponentləri, buoyancy və hook load, WOB və neutral point, dartma dizaynı, fulcrum/pendulum/packed BHA."
      objectives={DS_OBJECTIVES}
      formulas={DS_FORMULAS}
      quiz={DS_QUIZ}
      aiSectionTitle="Drill string və BHA"
      aiPlaceholder="Məsələn: Niyə neutral point DC daxilində olmalıdır?"
      contentTabs={[
        { id: "visual", label: "Vizual", render: () => <DrillstringVisualTab /> },
        { id: "theory", label: "Nəzəriyyə", render: ({ mode }) => <DrillstringTheory mode={mode} /> },
        { id: "calc", label: "Kalkulyatorlar", render: () => <DrillstringCalculators /> },
        { id: "mission", label: "Missiya", render: () => <MissionRunner intro={DS_MISSION_INTRO} items={DS_MISSION} /> },
      ]}
    />
  );
}
