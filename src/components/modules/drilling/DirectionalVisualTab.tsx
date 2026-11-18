"use client";

import { useState } from "react";
import DirectionalPlanVisual from "./DirectionalPlanVisual";
import DirectionalSurveyVisual from "./DirectionalSurveyVisual";
import ToolfaceVisual from "./ToolfaceVisual";
import BhaTendencyVisual from "./BhaTendencyVisual";

const VIEWS = [
  { id: "plan", label: "Plan (J-tipli)", hint: "KOP, BUR, hədəf" },
  { id: "survey", label: "Survey və MCM", hint: "Minimum curvature, DLS" },
  { id: "toolface", label: "Toolface", hint: "Build, drop, turn" },
  { id: "bha", label: "BHA tendensiyası", hint: "Fulcrum, pendulum, packed" },
] as const;

export default function DirectionalVisualTab() {
  const [view, setView] = useState<(typeof VIEWS)[number]["id"]>("plan");
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
      {view === "plan" && <DirectionalPlanVisual />}
      {view === "survey" && <DirectionalSurveyVisual />}
      {view === "toolface" && <ToolfaceVisual />}
      {view === "bha" && <BhaTendencyVisual />}
    </div>
  );
}
