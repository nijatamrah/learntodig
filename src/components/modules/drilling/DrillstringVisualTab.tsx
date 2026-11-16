"use client";

import { useState } from "react";
import DrillStringVisual from "./DrillStringVisual";
import AxialLoadVisual from "./AxialLoadVisual";
import BhaTypesVisual from "./BhaTypesVisual";

const VIEWS = [
  { id: "parts", label: "Komponentlər", hint: "String-in tərkibi" },
  { id: "axial", label: "Eksenel yük və neutral point", hint: "İnteraktiv diaqram" },
  { id: "bha", label: "BHA tipləri", hint: "Build / drop / hold" },
] as const;

export default function DrillstringVisualTab() {
  const [view, setView] = useState<(typeof VIEWS)[number]["id"]>("parts");
  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-5">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className="px-3.5 py-2 rounded-xl text-[12px] font-semibold font-['Space_Grotesk'] border transition-colors text-left"
            style={{
              borderColor: view === v.id ? "#FBBF24" : "rgba(255,255,255,0.1)",
              background: view === v.id ? "#FBBF2418" : "transparent",
              color: view === v.id ? "#FBBF24" : "#8DA2BF",
            }}
          >
            {v.label}
            <span className="block text-[10px] font-normal opacity-70">{v.hint}</span>
          </button>
        ))}
      </div>
      {view === "parts" && <DrillStringVisual />}
      {view === "axial" && <AxialLoadVisual />}
      {view === "bha" && <BhaTypesVisual />}
    </div>
  );
}
