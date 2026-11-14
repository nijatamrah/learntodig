"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ModuleShell, { type ShellTab } from "./ModuleShell";
import ModuleChat from "./ModuleChat";
import { getModule } from "@/lib/modules/registry";
import { DRILLING_SECTIONS } from "@/lib/modules/drilling";
import { getModuleProgress } from "@/lib/modules/progress";
import type { ProgressRow } from "@/lib/modules/types";

const mod = getModule("drilling")!;

const STATUS_LABEL = { live: "Hazırdır", next: "Növbəti", soon: "Tezliklə" } as const;

function Sections({ progress }: { progress: ProgressRow[] }) {
  const done = new Set(progress.filter((p) => p.status === "completed").map((p) => p.section_id));
  const pct = Math.round((done.size / DRILLING_SECTIONS.length) * 100);

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between text-[12px] text-[#6B82A0] mb-1.5 font-['Space_Grotesk']">
          <span>Ümumi progress</span>
          <span>{done.size}/{DRILLING_SECTIONS.length} bölmə · {pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#101A2E] overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: mod.accent }} />
        </div>
      </div>

      <ol className="grid sm:grid-cols-2 gap-3">
        {DRILLING_SECTIONS.map((s) => (
          <li
            key={s.id}
            className="relative rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 transition-colors hover:border-[rgba(255,255,255,0.18)]"
            style={{ opacity: s.status === "live" ? 1 : 0.6 }}
          >
            {s.status === "live" && (
              <Link href={`/modules/drilling/${s.id}`} className="absolute inset-0 rounded-2xl" aria-label={`${s.title} bölməsini aç`} />
            )}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono text-[#6B82A0]">{String(s.order).padStart(2, "0")}</span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-md font-semibold font-mono"
                style={{
                  background: (done.has(s.id) ? "#34D399" : mod.accent) + "18",
                  color: done.has(s.id) ? "#34D399" : mod.accent,
                }}
              >
                {done.has(s.id) ? "Tamamlandı" : STATUS_LABEL[s.status]}
              </span>
            </div>
            <h3 className="text-[14px] font-semibold text-[#F0F4FF] font-['Space_Grotesk']">{s.title}</h3>
            <p className="text-[11px] text-[#4A6A8A] mb-2 font-mono">{s.titleEn}</p>
            <p className="text-[12px] text-[#6B82A0] leading-relaxed font-['Space_Grotesk']">{s.summary}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Skills({ progress }: { progress: ProgressRow[] }) {
  const done = new Set(progress.filter((p) => p.status === "completed").map((p) => p.section_id));
  return (
    <div className="space-y-3">
      <p className="text-[13px] text-[#6B82A0] font-['Space_Grotesk']">
        Hər bölməni bitirdikcə həmin bölmənin bacarıqları açılır. Bu siyahı real iş mühitində qazma mühəndisindən gözlənilənlərə əsaslanır.
      </p>
      {DRILLING_SECTIONS.map((s) => (
        <div key={s.id} className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
          <h3 className="text-[13px] font-semibold text-[#F0F4FF] mb-2 font-['Space_Grotesk']">{s.title}</h3>
          <ul className="space-y-1">
            {s.skills.map((sk) => (
              <li key={sk} className="flex items-center gap-2 text-[12px] font-['Space_Grotesk']"
                style={{ color: done.has(s.id) ? "#34D399" : "#6B82A0" }}>
                <span>{done.has(s.id) ? "✓" : "○"}</span>
                {sk}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function DrillingModule() {
  const [progress, setProgress] = useState<ProgressRow[]>([]);

  useEffect(() => {
    getModuleProgress(mod.id).then(setProgress);
  }, []);

  const tabs: ShellTab[] = [
    { id: "sections", label: "Bölmələr", render: () => <Sections progress={progress} /> },
    { id: "skills", label: "Bacarıqlar", render: () => <Skills progress={progress} /> },
    {
      id: "ai",
      label: "AI müəllim",
      render: ({ mode }) => (
        <ModuleChat
          moduleId={mod.id}
          accent={mod.accent}
          mode={mode}
          placeholder="Məsələn: 10.5 ppg məhlulla 8000 ft TVD-də hidrostatik təzyiq nə qədərdir?"
        />
      ),
    },
  ];

  return <ModuleShell mod={mod} tabs={tabs} />;
}
