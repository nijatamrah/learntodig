"use client";
import { useState } from "react";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

interface Lesson {
  id: string;    // e.g. "1.1.1"
  title: string;
  slug: string;  // route segment
  done: boolean; // TODO: real progress from Supabase
}

interface Section {
  id: string;     // e.g. "1.1"
  title: string;
  lessons: Lesson[];
}

const sections: Section[] = [
  {
    id: "1.1",
    title: "Əsaslar",
    lessons: [
      { id: "1.1.1", title: "Neft və Qazın Mənşəyi", slug: "origin-of-petroleum", done: false },
      { id: "1.1.2", title: "Süxur Növləri", slug: "rock-types", done: false },
      { id: "1.1.3", title: "Source Rock (Mənbə Süxur)", slug: "source-rock", done: false },
      { id: "1.1.4", title: "Reservoir Rock (Kollektor Süxur)", slug: "reservoir-rock", done: false },
      { id: "1.1.5", title: "Seal / Cap Rock (Örtük Süxur)", slug: "seal-rock", done: false },
      { id: "1.1.6", title: "Trap Types (Tələ Növləri)", slug: "trap-types", done: false },
    ],
  },
  {
    id: "1.2",
    title: "Hövzə və Miqrasiya",
    lessons: [
      { id: "1.2.1", title: "Çökmə Hövzələri", slug: "sedimentary-basins", done: false },
      { id: "1.2.2", title: "Miqrasiya (Primary & Secondary)", slug: "migration", done: false },
      { id: "1.2.3", title: "Petroleum System Konsepti", slug: "petroleum-system", done: false },
    ],
  },
  {
    id: "1.3",
    title: "Kəşfiyyat Metodları",
    lessons: [
      { id: "1.3.1", title: "Səth Geologiyası", slug: "surface-geology", done: false },
      { id: "1.3.2", title: "Seysmik Kəşfiyyat", slug: "seismic-survey", done: false },
      { id: "1.3.3", title: "Kəşfiyyat Quyuları", slug: "exploration-wells", done: false },
    ],
  },
  {
    id: "1.4",
    title: "Qiymətləndirmə və Qərar",
    lessons: [
      { id: "1.4.1", title: "Ehtiyatların İlkin Qiymətləndirilməsi", slug: "volumetric-estimation", done: false },
      { id: "1.4.2", title: "Risk Analizi", slug: "geological-risk", done: false },
      { id: "1.4.3", title: "Qazımaya Keçid Qərarı", slug: "drilling-decision", done: false },
    ],
  },
];

export default function GeologyPathPage() {
  const [openSection, setOpenSection] = useState<string | null>("1.1");

  const allLessons = sections.flatMap((s) => s.lessons);
  const totalDone = allLessons.filter((l) => l.done).length;

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#080C18" }}>
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: PATH_COLOR, opacity: 0.14, filter: "blur(120px)" }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.08,
          backgroundImage: `
            linear-gradient(#F0F4FF 1px, transparent 1px),
            linear-gradient(90deg, #F0F4FF 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 100% 60% at 50% 0%, black 40%, transparent 90%)",
        }}
      />

      <div className="max-w-2xl mx-auto px-6 py-12 relative z-10">

        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6 transition-colors"
          style={{ color: "#3D5570" }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Öyrənmə yolları
        </Link>

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p
              className="text-[10px] font-semibold tracking-[0.18em] uppercase font-mono mb-2"
              style={{ color: PATH_COLOR }}
            >
              {`// path 01`}
            </p>
            <h1 className="font-['Space_Grotesk'] text-[2.2rem] font-bold leading-tight mb-2" style={{ color: "#F0F4FF" }}>
              Geologiya
            </h1>
            <p className="text-[14px] font-['Space_Grotesk']" style={{ color: "#6B82A0" }}>
              Harada neft var, necə tapılır
            </p>
          </div>
          <p className="text-[12px] font-['Space_Grotesk'] whitespace-nowrap" style={{ color: "#3D5570" }}>
            {totalDone}/{allLessons.length} dərs
          </p>
        </div>

        <div className="space-y-3">
          {sections.map((section) => {
            const isOpen = openSection === section.id;
            const sectionDone = section.lessons.filter((l) => l.done).length;

            return (
              <div
                key={section.id}
                className="rounded-2xl overflow-hidden"
                style={{ background: "#0D1525E6", border: `1px solid ${PATH_COLOR}33` }}
              >
                <button
                  onClick={() => setOpenSection(isOpen ? null : section.id)}
                  className="w-full flex items-center justify-between px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
                      style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
                    >
                      {section.id}
                    </span>
                    <span className="font-semibold text-[14px] font-['Space_Grotesk']" style={{ color: "#F0F4FF" }}>
                      {section.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
                      {sectionDone}/{section.lessons.length}
                    </span>
                    <svg
                      className="h-4 w-4 transition-transform duration-200"
                      style={{ color: "#3D5570", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div style={{ borderTop: `1px solid ${PATH_COLOR}22` }}>
                    {section.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/learn/geology/${lesson.slug}`}
                        className="flex items-center justify-between px-5 py-3 group transition-colors"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]"
                            style={{
                              background: lesson.done ? "#22C55E22" : "rgba(255,255,255,0.05)",
                              border: `1px solid ${lesson.done ? "#22C55E66" : "rgba(255,255,255,0.1)"}`,
                              color: lesson.done ? "#22C55E" : "#3D5570",
                            }}
                          >
                            {lesson.done ? "✓" : ""}
                          </span>
                          <span className="text-[11px] font-mono" style={{ color: "#3D5570" }}>
                            {lesson.id}
                          </span>
                          <span className="text-[13.5px] font-['Space_Grotesk']" style={{ color: "#D6E0F0" }}>
                            {lesson.title}
                          </span>
                        </div>
                        <svg
                          className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          style={{ color: PATH_COLOR }}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}