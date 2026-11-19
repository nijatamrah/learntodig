"use client";

import { useState } from "react";
import AfeBreakdownVisual from "./AfeBreakdownVisual";
import TimeDepthPlanVisual from "./TimeDepthPlanVisual";
import LearningCurveVisual from "./LearningCurveVisual";
import RiskAfeVisual from "./RiskAfeVisual";

const VIEWS = [
  { id: "afe", label: "AFE", hint: "Sətirlər və contingency" },
  { id: "td", label: "Time-depth plan", hint: "Vaxt və kumulativ xərc" },
  { id: "learn", label: "Learning curve", hint: "Quyu-quyu təkmilləşmə" },
  { id: "risk", label: "Risk və P10-P90", hint: "Monte Carlo, EMV" },
] as const;

export default function EconomicsVisualTab() {
  const [view, setView] = useState<(typeof VIEWS)[number]["id"]>("afe");
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
      {view === "afe" && <AfeBreakdownVisual />}
      {view === "td" && <TimeDepthPlanVisual />}
      {view === "learn" && <LearningCurveVisual />}
      {view === "risk" && <RiskAfeVisual />}
    </div>
  );
}
