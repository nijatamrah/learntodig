"use client";

import { useState } from "react";
import { MISSION, MISSION_INTRO } from "./pressures-content";

const ACCENT = "#FBBF24";

export default function PressureMission() {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const correctCount = MISSION.filter((m) => {
    const v = parseFloat(inputs[m.id] ?? "");
    return checked[m.id] && Number.isFinite(v) && Math.abs(v - m.answer) <= m.tol;
  }).length;

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Missiya</p>
        <p className="text-[13px] text-[#B7C5DD] leading-relaxed font-['Space_Grotesk']">{MISSION_INTRO}</p>
        <p className="text-[12px] text-[#6B82A0] mt-2 font-['Space_Grotesk']">Düzgün: {correctCount}/{MISSION.length}</p>
      </div>

      {MISSION.map((m) => {
        const raw = inputs[m.id] ?? "";
        const v = parseFloat(raw);
        const isChecked = !!checked[m.id];
        const isOk = isChecked && Number.isFinite(v) && Math.abs(v - m.answer) <= m.tol;
        return (
          <div key={m.id} className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
            <p className="text-[13px] text-[#F0F4FF] leading-relaxed mb-3 font-['Space_Grotesk']">{m.prompt}</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                inputMode="decimal"
                step="any"
                value={raw}
                onChange={(e) => {
                  setInputs((p) => ({ ...p, [m.id]: e.target.value }));
                  setChecked((p) => ({ ...p, [m.id]: false }));
                }}
                placeholder="Cavab"
                className="w-40 bg-[#080C18] text-[#F0F4FF] text-[13px] rounded-lg px-3 py-2 outline-none border border-[rgba(255,255,255,0.08)] focus:border-[rgba(255,255,255,0.25)] font-mono"
              />
              <span className="text-[12px] text-[#6B82A0] font-mono">{m.unit}</span>
              <button
                onClick={() => setChecked((p) => ({ ...p, [m.id]: true }))}
                disabled={!Number.isFinite(v)}
                className="ml-2 px-4 py-2 rounded-lg text-[12px] font-semibold disabled:opacity-40 font-['Space_Grotesk']"
                style={{ background: ACCENT, color: "#080C18" }}
              >
                Yoxla
              </button>
            </div>
            {isChecked && (
              <div className="mt-3 text-[12px] leading-relaxed font-['Space_Grotesk']" style={{ color: isOk ? "#34D399" : "#FCA5A5" }}>
                {isOk ? "Düzgündür." : "Düzgün deyil."}
                <span className="block text-[#9DB0CC] mt-1">{m.solution}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
