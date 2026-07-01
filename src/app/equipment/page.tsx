"use client";

import Link from "next/link";
import { Wrench, ChevronRight, Layers, Shield, Droplets, TreePine } from "lucide-react";

const equipment = [
  {
    id: "derrick",
    name: "Drilling Derrick",
    az: "Qazma Qüllesi",
    href: "/equipment/derrick",
    icon: Layers,
    color: "#FF6B2B",
    colorBg: "rgba(255,107,43,0.08)",
    colorBorder: "rgba(255,107,43,0.25)",
    parts: 8,
    description:
      "Crown block-dan drill bit-ə qədər tam qazma qülləsinin bütün komponentlərini kəşf et.",
    tags: ["Crown Block", "Top Drive", "BHA", "Drill Bit"],
    status: "ready",
  },
  {
    id: "bop",
    name: "Blowout Preventer",
    az: "Püskürmə Önləyicisi",
    href: "/equipment/bop",
    icon: Shield,
    color: "#00D4FF",
    colorBg: "rgba(0,212,255,0.08)",
    colorBorder: "rgba(0,212,255,0.25)",
    parts: 6,
    description:
      "Neft-qaz sənayesinin ən kritik təhlükəsizlik avadanlığının hər hissəsini öyrən.",
    tags: ["Ram BOP", "Annular", "Choke Line", "Kill Line"],
    status: "ready",
  },
  {
    id: "mud-system",
    name: "Mud Circulation System",
    az: "Məhlul Dövriyyə Sistemi",
    href: "/equipment/mud-system",
    icon: Droplets,
    color: "#4ADE80",
    colorBg: "rgba(74,222,128,0.08)",
    colorBorder: "rgba(74,222,128,0.25)",
    parts: 7,
    description:
      "Qazma məhlulunun səthdən quyuya və geri dövriyyəsini idarə edən sistem.",
    tags: ["Mud Pump", "Shale Shaker", "Degasser", "Mud Pit"],
    status: "ready",
  },
  {
    id: "christmas-tree",
    name: "Christmas Tree",
    az: "Quyu Başlığı",
    href: "/equipment/christmas-tree",
    icon: TreePine,
    color: "#A78BFA",
    colorBg: "rgba(167,139,250,0.08)",
    colorBorder: "rgba(167,139,250,0.25)",
    parts: 5,
    description:
      "Hasilat quyusunun ağzında yerləşən klapan sisteminin anatomiyasını izlə.",
    tags: ["Master Valve", "Wing Valve", "Choke", "Tubing Hanger"],
    status: "ready",
  },
];

export default function EquipmentPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] pt-16">

      {/* Hero */}
      <section className="relative border-b border-white/[0.06] px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 mb-5">
            <Wrench size={14} className="text-[#FF6B2B]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FF6B2B]">
              Tools &amp; Equipment
            </span>
          </div>
          <h1
            className="font-['Space_Grotesk'] text-3xl font-bold leading-tight tracking-tight text-[#F0F4FF] md:text-5xl"
            style={{ maxWidth: 620 }}
          >
            Avadanlığı{" "}
            <span className="text-[#FF6B2B]">içindən</span> öyrən
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/[0.55]">
            Hər alət interaktivdir — komponentlərə klikləyib adını, vəzifəsini
            və texniki detallarını birbaşa gör. Oxumaq yox, kəşf etmək.
          </p>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { val: "4", label: "Avadanlıq" },
              { val: "26+", label: "Komponent" },
              { val: "100+", label: "Texniki fakt" },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-['Space_Grotesk'] text-2xl font-bold text-[#FF6B2B]">
                  {s.val}
                </span>
                <span className="text-[13px] text-white/[0.45]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative grid lines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </section>

      {/* Cards grid */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="grid gap-5 sm:grid-cols-2">
          {equipment.map((eq) => {
            const Icon = eq.icon;
            return (
              <Link
                key={eq.id}
                href={eq.href}
                className="group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                style={{
                  background: eq.colorBg,
                  borderColor: eq.colorBorder,
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      background: `${eq.color}18`,
                      border: `1px solid ${eq.color}35`,
                    }}
                  >
                    <Icon size={20} style={{ color: eq.color }} />
                  </div>
                  <ChevronRight
                    size={18}
                    className="mt-1 text-white/[0.25] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white/[0.6]"
                  />
                </div>

                {/* Name */}
                <div className="mt-4">
                  <h2 className="font-['Space_Grotesk'] text-[18px] font-bold leading-snug text-[#F0F4FF]">
                    {eq.name}
                  </h2>
                  <p className="mt-0.5 text-[12px] font-medium" style={{ color: eq.color }}>
                    {eq.az}
                  </p>
                </div>

                {/* Description */}
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/[0.55]">
                  {eq.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {eq.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md px-2.5 py-1 text-[11px] font-semibold"
                      style={{
                        background: `${eq.color}14`,
                        color: eq.color,
                        border: `0.5px solid ${eq.color}30`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom */}
                <div className="mt-5 flex items-center justify-between border-t pt-4" style={{ borderColor: `${eq.color}20` }}>
                  <span className="text-[12px] text-white/[0.35]">
                    {eq.parts} komponent
                  </span>
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 group-hover:opacity-100"
                    style={{ color: eq.color, opacity: 0.7 }}
                  >
                    Kəşf et →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Coming soon hint */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 text-center">
          <p className="text-[13px] text-white/[0.35]">
            Tezliklə:{" "}
            <span className="text-white/[0.55]">
              ESP Pump, Wellhead, Casing &amp; Cementing, Mud Logging Unit
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}