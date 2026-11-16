"use client";

import SectionFrame from "./SectionFrame";
import BitsTheory from "./BitsTheory";
import BitsVisualTab from "./BitsVisualTab";
import BitsCalculators from "./BitsCalculators";
import MissionRunner from "./MissionRunner";
import { BITS_FORMULAS, BITS_MISSION, BITS_MISSION_INTRO, BITS_OBJECTIVES, BITS_QUIZ } from "./bits-content";

export default function BitsSection() {
  return (
    <SectionFrame
      sectionId="bits-rop"
      title="Bit-lər və ROP"
      eyebrow="Qazma · Bits & ROP"
      subtitle="Bit tipləri və kəsmə mexanizmi, IADC kodu, ROP və MSE, WOB-RPM parametr xəritəsi, cost per foot və bit run optimizasiyası, dull grading."
      objectives={BITS_OBJECTIVES}
      formulas={BITS_FORMULAS}
      quiz={BITS_QUIZ}
      aiSectionTitle="Bit-lər və ROP"
      aiPlaceholder="Məsələn: Niyə WOB artıranda ROP bir nöqtədən sonra artmır?"
      contentTabs={[
        { id: "visual", label: "Vizual", render: () => <BitsVisualTab /> },
        { id: "theory", label: "Nəzəriyyə", render: ({ mode }) => <BitsTheory mode={mode} /> },
        { id: "calc", label: "Kalkulyatorlar", render: () => <BitsCalculators /> },
        { id: "mission", label: "Missiya", render: () => <MissionRunner intro={BITS_MISSION_INTRO} items={BITS_MISSION} /> },
      ]}
    />
  );
}
