"use client";

import { useState } from "react";

type Department = "Subsurface" | "Operations" | "Exploration" | "Safety";

interface Role {
  id: string;
  icon: string;
  title: string;
  salaryShort: string;
  salaryRange: string;
  dept: Department;
  description: string;
  skills: string[];
  software: string[];
  career: string[];
}

const roles: Role[] = [
  {
    id: "reservoir",
    icon: "⬡",
    title: "Reservoir Engineer",
    salaryShort: "$80–160k",
    salaryRange: "$80,000 – $160,000",
    dept: "Subsurface",
    description: "Rezervuar davranışını modelləşdirir, hasilat strategiyası işləyir",
    skills: [
      "Reservoir simulation",
      "Material balance",
      "Decline curve analysis",
      "Pressure transient analysis",
    ],
    software: ["Eclipse", "CMG", "Petrel", "OFM"],
    career: [
      "Junior Res. Engineer → 2 il",
      "Res. Engineer → 4 il",
      "Senior Res. Engineer → 6 il",
      "Principal / Lead",
    ],
  },
  {
    id: "drilling",
    icon: "▽",
    title: "Drilling Engineer",
    salaryShort: "$85–170k",
    salaryRange: "$85,000 – $170,000",
    dept: "Operations",
    description: "Quyu dizaynı, qazıma proqramı və məlumat analizi aparır",
    skills: [
      "Well design",
      "Hydraulics",
      "Casing design",
      "Directional drilling",
    ],
    software: ["WellPlan", "DrillWorks", "Landmark EDM"],
    career: [
      "Junior Drilling Eng. → 2 il",
      "Drilling Engineer → 4 il",
      "Senior / Lead → 6 il",
      "Drilling Manager",
    ],
  },
  {
    id: "production",
    icon: "↗",
    title: "Production Engineer",
    salaryShort: "$75–150k",
    salaryRange: "$75,000 – $150,000",
    dept: "Operations",
    description: "Hasilat optimizasiyası, artificial lift sistemlərini idarə edir",
    skills: ["Nodal analysis", "IPR/VLP", "ESP design", "DCA"],
    software: ["Prosper", "GAP", "Pipesim"],
    career: [
      "Junior Prod. Eng. → 2 il",
      "Production Engineer → 4 il",
      "Senior → 6 il",
      "Ops Manager",
    ],
  },
  {
    id: "petrophysicist",
    icon: "∿",
    title: "Petrophysicist",
    salaryShort: "$85–165k",
    salaryRange: "$85,000 – $165,000",
    dept: "Subsurface",
    description:
      "Quyu loq məlumatlarını analiz edib rezervuar xassələrini təyin edir",
    skills: [
      "Log interpretation",
      "Core analysis",
      "Formation evaluation",
      "Rock typing",
    ],
    software: ["Techlog", "IP", "Petrel (petro)"],
    career: [
      "Log Analyst → 2 il",
      "Petrophysicist → 4 il",
      "Senior → 6 il",
      "Principal Petrophys.",
    ],
  },
  {
    id: "geologist",
    icon: "◈",
    title: "Geologist",
    salaryShort: "$70–145k",
    salaryRange: "$70,000 – $145,000",
    dept: "Exploration",
    description: "Geoloji model qurur, kəşfiyyat hədəfləri müəyyən edir",
    skills: [
      "Stratigraphy",
      "Structural geology",
      "Seismic interpretation",
      "Facies modeling",
    ],
    software: ["Petrel", "Kingdom", "OpendTect"],
    career: [
      "Junior Geologist → 2 il",
      "Geologist → 4 il",
      "Senior Geologist → 6 il",
      "Chief Geologist",
    ],
  },
  {
    id: "completion",
    icon: "⊕",
    title: "Completion Engineer",
    salaryShort: "$80–160k",
    salaryRange: "$80,000 – $160,000",
    dept: "Operations",
    description:
      "Quyu tamamlama dizaynı, hidravlik çatlatma proqramı hazırlayır",
    skills: [
      "Completions design",
      "Perforating",
      "Fracturing",
      "Well testing",
    ],
    software: ["FracPro", "Kinetix", "Landmark"],
    career: [
      "Completions Eng. → 2 il",
      "Senior Completions → 4 il",
      "Lead → 6 il",
      "Manager",
    ],
  },
  {
    id: "hse",
    icon: "⊛",
    title: "HSE Engineer",
    salaryShort: "$65–130k",
    salaryRange: "$65,000 – $130,000",
    dept: "Safety",
    description:
      "Əməliyyat təhlükəsizliyi, mühit standartlarına uyğunluq təmin edir",
    skills: [
      "Risk assessment",
      "HAZOP",
      "Incident investigation",
      "Environmental compliance",
    ],
    software: ["SAP", "PHAST", "Sphera"],
    career: [
      "HSE Officer → 2 il",
      "HSE Engineer → 4 il",
      "Sr. HSE Engineer → 6 il",
      "HSE Manager",
    ],
  },
];

const deptStyles: Record<Department, string> = {
  Subsurface: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Operations:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  Exploration:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  Safety: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function IndustryMap() {
  const [activeId, setActiveId] = useState<string>("reservoir");

  const active = roles.find((r) => r.id === activeId)!;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-mono text-amber-400 tracking-widest uppercase mb-2">
            Bölmə 6
          </p>
          <h1 className="text-3xl font-bold text-white mb-3">
            Industry Map
          </h1>
          <p className="text-gray-400 text-sm max-w-xl">
            Neft-qaz sahəsinin bütün peşələri — maaşlar, bacarıqlar, proqramlar
            və karyera yolları.
          </p>
        </div>

        {/* Role cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveId(r.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-150 ${
                r.id === activeId
                  ? "border-amber-400 bg-gray-800"
                  : "border-gray-700 bg-gray-900 hover:border-gray-500"
              }`}
            >
              <span className="text-2xl block mb-2 font-mono text-amber-400">
                {r.icon}
              </span>
              <p className="text-sm font-medium text-white leading-tight mb-1">
                {r.title}
              </p>
              <p className="text-xs text-gray-500">{r.salaryShort} / il</p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">

          {/* Detail header */}
          <div className="flex items-start gap-4 pb-5 border-b border-gray-800 mb-6">
            <span className="text-4xl font-mono text-amber-400 leading-none mt-1">
              {active.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h2 className="text-xl font-semibold text-white">
                  {active.title}
                </h2>
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${deptStyles[active.dept]}`}
                >
                  {active.dept}
                </span>
              </div>
              <p className="text-sm text-gray-400">{active.description}</p>
            </div>
          </div>

          {/* Detail body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left column */}
            <div className="space-y-6">

              {/* Salary */}
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                  Maaş (USD / il)
                </p>
                <div className="bg-gray-800 rounded-xl p-4">
                  <p className="text-2xl font-bold text-white">
                    {active.salaryRange}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Beynəlxalq ortalama · təcrübəyə görə dəyişir
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                  Bacarıqlar
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {active.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 rounded-full border border-gray-700 text-gray-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Software */}
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                  Proqramlar
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {active.software.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 rounded-full border border-amber-800 text-amber-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column — career path */}
            <div>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">
                Karyera xəritəsi
              </p>
              <ol className="relative">
                {active.career.map((step, i) => (
                  <li key={step} className="flex gap-3 mb-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full mt-0.5 flex-shrink-0 ${
                          i === 0
                            ? "bg-amber-400"
                            : "bg-gray-700 border border-gray-500"
                        }`}
                      />
                      {i < active.career.length - 1 && (
                        <div className="w-px flex-1 bg-gray-700 my-1" />
                      )}
                    </div>
                    <div className={`pb-4 ${i === active.career.length - 1 ? "pb-0" : ""}`}>
                      <p
                        className={`text-sm ${
                          i === 0
                            ? "text-white font-medium"
                            : i === active.career.length - 1
                            ? "text-amber-400 font-medium"
                            : "text-gray-300"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* LearntoDig CTA */}
              <div className="mt-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
                <p className="text-xs text-gray-400 mb-3">
                  Bu peşə üçün praktika modulları:
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.id === "reservoir" && (
                    <>
                      <ModuleLink href="/learn/eclipse" label="Eclipse" />
                      <ModuleLink href="/learn/petrel" label="Petrel" />
                    </>
                  )}
                  {active.id === "drilling" && (
                    <ModuleLink href="/learn/drilling" label="Drilling" />
                  )}
                  {active.id === "production" && (
                    <ModuleLink href="/learn/prosper" label="Prosper" />
                  )}
                  {active.id === "petrophysicist" && (
                    <ModuleLink href="/learn/well-log" label="Well Log AI" />
                  )}
                  {active.id === "geologist" && (
                    <ModuleLink href="/learn/geology" label="Geologiya" />
                  )}
                  {(active.id === "completion" || active.id === "hse") && (
                    <span className="text-xs text-gray-500 italic">
                      Yaxında əlavə ediləcək
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Maaş məlumatları Glassdoor, LinkedIn Salary (2024) əsasında · SOCAR
          maaşları fərqli ola bilər
        </p>
      </div>
    </div>
  );
}

function ModuleLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="text-xs px-3 py-1.5 rounded-lg bg-amber-400 text-gray-950 font-medium hover:bg-amber-300 transition-colors"
    >
      {label} →
    </a>
  );
}