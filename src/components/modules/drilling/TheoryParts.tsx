import type { ReactNode } from "react";

export const ACCENT = "#FBBF24";

export function Block({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-5">
      <h3 className="font-['Space_Grotesk'] text-[16px] font-bold text-[#F0F4FF] mb-3">
        <span className="font-mono text-[12px] mr-2" style={{ color: ACCENT }}>{String(n).padStart(2, "0")}</span>
        {title}
      </h3>
      <div className="space-y-3 text-[13px] leading-relaxed text-[#B7C5DD] font-['Space_Grotesk']">{children}</div>
    </section>
  );
}

export function Formula({ children }: { children: ReactNode }) {
  return (
    <pre className="rounded-xl bg-[#080C18] border border-[rgba(255,255,255,0.06)] px-4 py-3 text-[12px] font-mono overflow-x-auto" style={{ color: ACCENT }}>
      {children}
    </pre>
  );
}

export function Why({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border-l-2 bg-[#101A2E] px-3.5 py-2.5 text-[12px] text-[#9DB0CC]" style={{ borderColor: "#00D4FF" }}>
      <b className="text-[#00D4FF]">Niyə? </b>{children}
    </p>
  );
}

export function Warn({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border-l-2 bg-[#F8717110] px-3.5 py-2.5 text-[12px] text-[#FCA5A5]" style={{ borderColor: "#F87171" }}>
      <b>Tipik səhv: </b>{children}
    </p>
  );
}

export function Field({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border-l-2 bg-[#34D39910] px-3.5 py-2.5 text-[12px] text-[#A7F3D0]" style={{ borderColor: "#34D399" }}>
      <b>Sahədə: </b>{children}
    </p>
  );
}

export function Disclaimer() {
  return (
    <div className="rounded-2xl border border-[rgba(251,191,36,0.3)] bg-[#FBBF2410] px-4 py-3 text-[12px] text-[#E5CF8A] font-['Space_Grotesk']">
      Təhsil məqsədli materialdır. Real əməliyyatda hesablamalar şirkətin prosedurlarına, API/IWCF standartlarına və səlahiyyətli mühəndisin təsdiqinə əsaslanmalıdır.
    </div>
  );
}
