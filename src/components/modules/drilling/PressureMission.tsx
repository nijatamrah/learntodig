"use client";

import MissionRunner from "./MissionRunner";
import { MISSION, MISSION_INTRO } from "./pressures-content";

export default function PressureMission() {
  return <MissionRunner intro={MISSION_INTRO} items={MISSION} />;
}
