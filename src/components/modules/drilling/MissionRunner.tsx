"use client";

import { useState } from "react";
import { ACCENT } from "./TheoryParts";

export interface MissionItem {
  id: string;
  prompt: string;
  unit: string;
  answer: number;
  tol: number;
  solution: string;
}

export default function MissionRunner({ intro, items }: { intro: string; items: MissionItem[] }) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const isCorrect = (m: MissionItem) => {
    const v = parseFloat(inputs[m.id] ?? "");
    return checked[m.id] && Number.isFinite(v) && Math.abs(v - m.answer) <= m.tol;
  };
  const correctCount = items.filter(isCorrect).length;
  const done = items.every((m) => checked[m.id]);

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Missiya</p>
        <p className="text-[13px] text-[#B7C5DD] leading-relaxed font-['Space_Grotesk']">{intro}</p>
        <div className="mt-3 h-1.5 rounded-full bg-[#101A2E] overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${(correctCount / items.length) * 100}%`, background: "#34D399" }} />
        </div>
        <p className="text-[12px] text-[#6B82A0] mt-2 font-['Space_Grotesk']">
          Düzgün: {correctCount}/{items.length}
          {done && correctCount === items.length && <span className="text-[#34D399] ml-2">Missiya tamamlandı.</span>}
        </p>
      </div>

      {items.map((m) => {
        const raw = inputs[m.id] ?? "";
        const v = parseFloat(raw);
        const isChecked = !!checked[m.id];
        const good = isCorrect(m);
        return (
          <div key={m.id} className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
            <p className="text-[13px] text-[#F0F4FF] leading-relaxed mb-3 font-['Space_Grotesk']">{m.prompt}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <input
                type="number"
                inputMode="decimal"
                step="any"
                value={raw}
                onChange={(e) => {
                  setInputs((p) => ({ ...p, [m.id]: e.target.value }));
                  setChecked((p) => ({ ...p, [m.id]: false }));
                }}
                onKeyDown={(e) => e.key === "Enter" && Number.isFinite(v) && setChecked((p) => ({ ...p, [m.id]: true }))}
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
              <div className="mt-3 text-[12px] leading-relaxed font-['Space_Grotesk']" style={{ color: good ? "#34D399" : "#FCA5A5" }}>
                {good ? "Düzgündür." : "Düzgün deyil."}
                <span className="block text-[#9DB0CC] mt-1">{m.solution}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
