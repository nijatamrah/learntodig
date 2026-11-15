"use client";

import type { ReactNode } from "react";
import { ACCENT } from "./TheoryParts";

export function Card({ title, formula, children }: { title: string; formula: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
      <h3 className="text-[14px] font-semibold text-[#F0F4FF] font-['Space_Grotesk']">{title}</h3>
      <p className="text-[11px] font-mono mt-1 mb-3" style={{ color: ACCENT }}>{formula}</p>
      {children}
    </div>
  );
}

export function Num({ label, unit, value, onChange, step = "any" }: { label: string; unit: string; value: number; onChange: (v: number) => void; step?: string }) {
  return (
    <label className="block mb-2.5">
      <span className="block text-[11px] text-[#8DA2BF] mb-1 font-['Space_Grotesk']">{label} <span className="text-[#6B82A0]">({unit})</span></span>
      <input
        type="number"
        inputMode="decimal"
        step={step}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
        className="w-full bg-[#080C18] text-[#F0F4FF] text-[13px] rounded-lg px-3 py-2 outline-none border border-[rgba(255,255,255,0.08)] focus:border-[rgba(255,255,255,0.25)] font-mono"
      />
    </label>
  );
}

export function Out({ label, value, unit, tone }: { label: string; value: string; unit: string; tone?: "good" | "bad" | "warn" }) {
  const color = tone === "good" ? "#34D399" : tone === "bad" ? "#F87171" : tone === "warn" ? "#FBBF24" : "#F0F4FF";
  return (
    <div className="flex justify-between items-baseline border-t border-[rgba(255,255,255,0.05)] py-1.5">
      <span className="text-[12px] text-[#8DA2BF] font-['Space_Grotesk']">{label}</span>
      <span className="font-mono text-[14px] font-semibold" style={{ color }}>
        {value} <span className="text-[11px] text-[#6B82A0] font-normal">{unit}</span>
      </span>
    </div>
  );
}

export const ok = (...n: number[]) => n.every((v) => Number.isFinite(v));
export const fmt = (v: number, d = 1) => v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

export function Note({ children }: { children: ReactNode }) {
  return <p className="text-[11px] text-[#6B82A0] mt-2 font-['Space_Grotesk'] leading-relaxed">{children}</p>;
}
