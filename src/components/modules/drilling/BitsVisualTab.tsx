"use client";

import { useState } from "react";
import BitMechanismVisual from "./BitMechanismVisual";
import ParameterMapVisual from "./ParameterMapVisual";
import BitRunEconomicsVisual from "./BitRunEconomicsVisual";
import BitDullVisual from "./BitDullVisual";

const VIEWS = [
  { id: "types", label: "Bit tipləri və kəsmə", hint: "Mexanizm animasiyası" },
  { id: "map", label: "ROP xəritəsi", hint: "WOB × RPM, MSE" },
  { id: "econ", label: "Bit run iqtisadiyyatı", hint: "Cost per foot, optimum çıxarma" },
  { id: "dull", label: "Köhnəlmə (IADC)", hint: "Dull grading" },
] as const;

export default function BitsVisualTab() {
  const [view, setView] = useState<(typeof VIEWS)[number]["id"]>("types");
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
      {view === "types" && <BitMechanismVisual />}
      {view === "map" && <ParameterMapVisual />}
      {view === "econ" && <BitRunEconomicsVisual />}
      {view === "dull" && <BitDullVisual />}
    </div>
  );
}
