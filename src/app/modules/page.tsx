import Link from "next/link";
import { MODULES } from "@/lib/modules/registry";
import type { ModuleStatus } from "@/lib/modules/types";

export const metadata = { title: "Modullar | LearntoDig" };

const STATUS: Record<ModuleStatus, { label: string; color: string }> = {
  live: { label: "Aktiv", color: "#34D399" },
  restoring: { label: "Yenilənir", color: "#FBBF24" },
  planned: { label: "Tezliklə", color: "#6B82A0" },
};

export default function ModulesPage() {
  return (
    <main className="min-h-screen" style={{ background: "#080C18" }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase font-mono mb-2" style={{ color: "#00D4FF" }}>
            {`// praktika · real iş axınları`}
          </p>
          <h1 className="font-['Space_Grotesk'] text-[2.2rem] font-bold leading-tight mb-2" style={{ color: "#F0F4FF" }}>
            Modullar
          </h1>
          <p className="text-[14px] font-['Space_Grotesk'] max-w-2xl" style={{ color: "#6B82A0" }}>
            Real mühəndislik proqramlarının iş axınını məşq et: hesablama, missiya və AI müəllim ilə.
          </p>
        </div>

        <ul className="grid md:grid-cols-2 gap-4">
          {MODULES.map((m) => {
            const st = STATUS[m.status];
            const clickable = m.status !== "planned";
            const card = (
              <div
                className="relative h-full rounded-2xl p-5 overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "#0D1525",
                  border: "1px solid rgba(255,255,255,0.07)",
                  opacity: clickable ? 1 : 0.55,
                }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: m.accent }} />
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-[1.3rem]"
                    style={{ background: m.accent + "20" }}
                  >
                    {m.icon}
                  </div>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-md font-semibold font-mono"
                    style={{ background: st.color + "18", color: st.color }}
                  >
                    {st.label}
                  </span>
                </div>

                <h2 className="font-semibold text-[16px] font-['Space_Grotesk'] mb-0.5" style={{ color: "#F0F4FF" }}>
                  {m.title}
                </h2>
                <p className="text-[11px] font-mono mb-2" style={{ color: m.accent }}>
                  {m.realTool}
                </p>
                <p className="text-[12px] font-['Space_Grotesk'] leading-relaxed mb-4" style={{ color: "#6B82A0" }}>
                  {m.desc}
                </p>

                <ul className="space-y-1 mb-4">
                  {m.skills.slice(0, 3).map((s) => (
                    <li key={s} className="text-[11px] font-['Space_Grotesk']" style={{ color: "#8DA2BF" }}>
                      · {s}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3 text-[11px] font-mono" style={{ color: "#4A6A8A" }}>
                  <span>{m.level}</span>
                  <span>~{m.hours} saat</span>
                  <span>{m.skills.length} bacarıq</span>
                </div>
              </div>
            );
            return (
              <li key={m.id}>
                {clickable ? <Link href={m.href}>{card}</Link> : card}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
