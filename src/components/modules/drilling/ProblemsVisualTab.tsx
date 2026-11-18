"use client";

import { useState } from "react";
import StuckPipeVisual from "./StuckPipeVisual";
import HoleCleaningVisual from "./HoleCleaningVisual";
import LostCirculationVisual from "./LostCirculationVisual";
import NptVisual from "./NptVisual";

const VIEWS = [
  { id: "stuck", label: "Stuck pipe", hint: "Differensial, free point" },
  { id: "clean", label: "Hole cleaning", hint: "Annulus, cuttings yatağı" },
  { id: "loss", label: "Lost circulation", hint: "ECD, mud window" },
  { id: "npt", label: "NPT və qərar", hint: "Time-depth, fishing" },
] as const;

export default function ProblemsVisualTab() {
  const [view, setView] = useState<(typeof VIEWS)[number]["id"]>("stuck");
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
      {view === "stuck" && <StuckPipeVisual />}
      {view === "clean" && <HoleCleaningVisual />}
      {view === "loss" && <LostCirculationVisual />}
      {view === "npt" && <NptVisual />}
    </div>
  );
}
