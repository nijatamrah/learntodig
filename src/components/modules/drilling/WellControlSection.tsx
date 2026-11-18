"use client";

import SectionFrame from "./SectionFrame";
import WellControlTheory from "./WellControlTheory";
import WellControlVisualTab from "./WellControlVisualTab";
import WellControlCalculators from "./WellControlCalculators";
import MissionRunner from "./MissionRunner";
import { WELLCONTROL_FORMULAS, WELLCONTROL_MISSION, WELLCONTROL_MISSION_INTRO, WELLCONTROL_OBJECTIVES, WELLCONTROL_QUIZ } from "./wellcontrol-content";

export default function WellControlSection() {
  return (
    <SectionFrame
      sectionId="well-control"
      title="Well control"
      eyebrow="Qazma · Well Control"
      subtitle="Kick-in əlamətləri, shut-in təzyiqləri, kill mud və təzyiq cədvəli, Wait & Weight və Driller's üsulu, MAASP, kick tolerance və qazın davranışı."
      objectives={WELLCONTROL_OBJECTIVES}
      formulas={WELLCONTROL_FORMULAS}
      quiz={WELLCONTROL_QUIZ}
      aiSectionTitle="Well control"
      aiPlaceholder="Məsələn: Wait & Weight ilə Driller's üsulu arasında əsas fərq nədir?"
      contentTabs={[
        { id: "visual", label: "Vizual", render: () => <WellControlVisualTab /> },
        { id: "theory", label: "Nəzəriyyə", render: ({ mode }) => <WellControlTheory mode={mode} /> },
        { id: "calc", label: "Kalkulyatorlar", render: () => <WellControlCalculators /> },
        { id: "mission", label: "Missiya", render: () => <MissionRunner intro={WELLCONTROL_MISSION_INTRO} items={WELLCONTROL_MISSION} /> },
      ]}
    />
  );
}
