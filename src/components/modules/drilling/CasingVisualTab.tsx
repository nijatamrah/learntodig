"use client";

import { useState } from "react";
import CasingProgramVisual from "./CasingProgramVisual";
import CasingDesignVisual from "./CasingDesignVisual";
import CementJobVisual from "./CementJobVisual";
import CasingStandoffVisual from "./CasingStandoffVisual";

const VIEWS = [
  { id: "program", label: "Casing proqramı", hint: "Kəmərlər və teleskop" },
  { id: "design", label: "Dizayn yükləri", hint: "Burst, collapse, tension" },
  { id: "job", label: "Sement işi", hint: "Displacement animasiyası, U-tube" },
  { id: "standoff", label: "Mərkəzləmə", hint: "Standoff və kanallaşma" },
] as const;

export default function CasingVisualTab() {
  const [view, setView] = useState<(typeof VIEWS)[number]["id"]>("program");
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
      {view === "program" && <CasingProgramVisual />}
      {view === "design" && <CasingDesignVisual />}
      {view === "job" && <CementJobVisual />}
      {view === "standoff" && <CasingStandoffVisual />}
    </div>
  );
}
