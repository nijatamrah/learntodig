"use client";

import SectionFrame from "./SectionFrame";
import FluidsTheory from "./FluidsTheory";
import FluidCalculators from "./FluidCalculators";
import MudDiagnostics from "./MudDiagnostics";
import MissionRunner from "./MissionRunner";
import { FLUIDS_FORMULAS, FLUIDS_MISSION, FLUIDS_MISSION_INTRO, FLUIDS_OBJECTIVES, FLUIDS_QUIZ } from "./fluids-content";

export default function FluidsSection() {
  return (
    <SectionFrame
      sectionId="drilling-fluids"
      title="Qazma məhlulu"
      eyebrow="Qazma · Drilling Fluids"
      subtitle="Məhlul növləri, rheology (PV, YP, 3 model), ağırlaşdırma və seyreltmə, solids control, problem diaqnostikası."
      objectives={FLUIDS_OBJECTIVES}
      formulas={FLUIDS_FORMULAS}
      quiz={FLUIDS_QUIZ}
      aiSectionTitle="Qazma məhlulu"
      aiPlaceholder="Məsələn: Niyə OBM-də qaz kick-ini aşkar etmək çətindir?"
      contentTabs={[
        { id: "theory", label: "Nəzəriyyə", render: ({ mode }) => <FluidsTheory mode={mode} /> },
        { id: "calc", label: "Kalkulyatorlar", render: () => <FluidCalculators /> },
        { id: "diagnostics", label: "Diaqnostika", render: () => <MudDiagnostics /> },
        { id: "mission", label: "Missiya", render: () => <MissionRunner intro={FLUIDS_MISSION_INTRO} items={FLUIDS_MISSION} /> },
      ]}
    />
  );
}
