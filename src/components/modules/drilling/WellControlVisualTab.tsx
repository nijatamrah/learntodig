"use client";

import { useState } from "react";
import KickShutInVisual from "./KickShutInVisual";
import KillSheetVisual from "./KillSheetVisual";
import ShoeMaaspVisual from "./ShoeMaaspVisual";
import GasBehaviorVisual from "./GasBehaviorVisual";

const VIEWS = [
  { id: "kick", label: "Kick və shut-in", hint: "Pit gain, SIDPP, SICP" },
  { id: "kill", label: "Kill cədvəli", hint: "Wait & Weight, Driller's" },
  { id: "shoe", label: "Shoe və MAASP", hint: "Kick tolerance" },
  { id: "gas", label: "Qaz davranışı", hint: "Genişlənmə, migrasiya" },
] as const;

export default function WellControlVisualTab() {
  const [view, setView] = useState<(typeof VIEWS)[number]["id"]>("kick");
  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-5">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className="px-3.5 py-2 rounded-xl text-[12px] font-semibold font-['Space_Grotesk'] border transition-colors text-left"
            style={{ borderColor: view === v.id ? "#FBBF24" : "rgba(255,255,255,0.1)", background: view === v.id ? "#FBBF2418" : "transparent", color: view === v.id ? "#FBBF24" : "#8DA2BF" }}
          >
            {v.label}
            <span className="block text-[10px] font-normal opacity-70">{v.hint}</span>
          </button>
        ))}
      </div>
      {view === "kick" && <KickShutInVisual />}
      {view === "kill" && <KillSheetVisual />}
      {view === "shoe" && <ShoeMaaspVisual />}
      {view === "gas" && <GasBehaviorVisual />}
    </div>
  );
}
