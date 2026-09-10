"use client";
import { useState } from "react";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  done: boolean; // TODO: real progress from Supabase
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

const sections: Section[] = [
  {
    id: "2.1",
    title: "Qazma Əsasları",
    lessons: [
      { id: "2.1.1", title: "Rotary Drilling Sisteminə Giriş", slug: "rotary-drilling-system", done: false },
      { id: "2.1.2", title: "Qazma Qurğusu Komponentləri", slug: "rig-components", done: false },
      { id: "2.1.3", title: "Drill String və BHA", slug: "drill-string-bha", done: false },
      { id: "2.1.4", title: "Bit Seçimi və ROP Optimallaşdırması", slug: "bit-selection-rop", done: false },
    ],
  },
  {
    id: "2.2",
    title: "Quyu Konstruksiyası",
    lessons: [
      { id: "2.2.1", title: "Casing Dizaynı və Növləri", slug: "casing-design", done: false },
      { id: "2.2.2", title: "Sementləmə (Cementing)", slug: "cementing", done: false },
      { id: "2.2.3", title: "Wellhead və BOP", slug: "wellhead-bop", done: false },
    ],
  },
  {
    id: "2.3",
    title: "Qazma Məhlulu və Hidravlika",
    lessons: [
      { id: "2.3.1", title: "Drilling Fluid (Mud)", slug: "drilling-fluid", done: false },
      { id: "2.3.2", title: "Hidravlika Hesablamaları", slug: "drilling-hydraulics", done: false },
    ],
  },
  {
    id: "2.4",
    title: "Directional Drilling",
    lessons: [
      { id: "2.4.1", title: "Directional Drilling Əsasları", slug: "directional-drilling-basics", done: false },
      { id: "2.4.2", title: "Torque & Drag", slug: "torque-and-drag", done: false },
    ],
  },
  {
    id: "2.5",
    title: "Problemlər, Təhlükəsizlik və İqtisadiyyat",
    lessons: [
      { id: "2.5.1", title: "Qazma Problemləri (Stuck Pipe, Kick, Lost Circulation)", slug: "drilling-problems", done: false },
      { id: "2.5.2", title: "Quyu Nəzarəti (Well Control)", slug: "well-control", done: false },
      { id: "2.5.3", title: "Qazıma İqtisadiyyatı (Cost per Foot, AFE)", slug: "drilling-economics", done: false },
    ],
  },
];

export default function DrillingPathPage() {
  const [openSection, setOpenSection] = useState<string | null>("2.1");

  const allLessons = sections.flatMap((s) => s.lessons);
  const totalDone = allLessons.filter((l) => l.done).length;

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#080C18" }}>
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: PATH_COLOR, opacity: 0.16, filter: "blur(120px)" }}
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
          href="/lessons"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6"
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
              {`// path 02`}
            </p>
            <h1 className="font-['Space_Grotesk'] text-[2.2rem] font-bold leading-tight mb-2" style={{ color: "#F0F4FF" }}>
              Qazma
            </h1>
            <p className="text-[14px] font-['Space_Grotesk']" style={{ color: "#6B82A0" }}>
              Quyu necə qazılır
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
                        href={`/learn/drilling/${lesson.slug}`}
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