"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { LearnerMode, ModuleDef } from "@/lib/modules/types";

export interface ShellTab {
  id: string;
  label: string;
  render: (ctx: { mode: LearnerMode }) => ReactNode;
}

interface Props {
  mod: ModuleDef;
  tabs: ShellTab[];
  /** Bölmə səhifələri üçün: başlığı və geri linkini dəyişmək */
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  backHref?: string;
  backLabel?: string;
  /** Tab-lardan əvvəl göstərilən blok (məsələn, bölmənin məqsədləri) */
  intro?: ReactNode;
  /** Tab məzmunundan sonra göstərilən blok (məsələn, növbəti bölməyə keçid) */
  footer?: ReactNode;
}

// Bütün modulların ortaq çərçivəsi: başlıq, Tələbə/Mühəndis rejimi, tab-lar.
export default function ModuleShell({ mod, tabs, title, subtitle, eyebrow, backHref, backLabel, intro, footer }: Props) {
  const [active, setActive] = useState(tabs[0]?.id);
  const [mode, setMode] = useState<LearnerMode>("student");
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <main className="min-h-screen bg-[#080C18] text-[#F0F4FF]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link href={backHref ?? "/modules"} className="text-[12px] text-[#6B82A0] hover:text-[#00D4FF] font-['Space_Grotesk']">
          {backLabel ?? "← Modullar"}
        </Link>

        <div className="mt-4 mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase font-mono mb-2" style={{ color: mod.accent }}>
              {`// ${eyebrow ?? mod.realTool}`}
            </p>
            <h1 className="font-['Space_Grotesk'] text-[2rem] font-bold leading-tight">
              {title ?? `${mod.icon} ${mod.title}`}
            </h1>
            <p className="text-[14px] text-[#6B82A0] mt-1 font-['Space_Grotesk'] max-w-xl">{subtitle ?? mod.desc}</p>
          </div>

          <div
            className="flex rounded-xl p-1 border border-[rgba(255,255,255,0.08)] bg-[#0D1525]"
            role="group"
            aria-label="Öyrənmə rejimi"
          >
            {(["student", "engineer"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold font-['Space_Grotesk'] transition-colors"
                style={
                  mode === m ? { background: mod.accent, color: "#080C18" } : { color: "#6B82A0" }
                }
              >
                {m === "student" ? "Tələbə" : "Mühəndis"}
              </button>
            ))}
          </div>
        </div>

        {intro}

        <div className="flex gap-1 border-b border-[rgba(255,255,255,0.07)] mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className="px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap font-['Space_Grotesk'] -mb-px border-b-2 transition-colors"
              style={
                t.id === current?.id
                  ? { color: mod.accent, borderColor: mod.accent }
                  : { color: "#6B82A0", borderColor: "transparent" }
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {current?.render({ mode })}

        {footer}
      </div>
    </main>
  );
}
