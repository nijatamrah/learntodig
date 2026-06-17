"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { AZERBAIJAN_FIELDS } from "@/components/azerbaijan-fields/FieldData";

interface PageProps {
  params: Promise<{ field: string }>;
}

export default function FieldPage({ params }: PageProps) {
  const { field: fieldId } = use(params);
  const field = AZERBAIJAN_FIELDS.find((f) => f.id === fieldId);
  if (!field) notFound();

  const accent = field.accentColor;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          href="/azerbaijan-fields"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Bütün yataqlar
        </Link>
      </div>

      <div className="border-b border-white/10 mb-10">
        <div className="max-w-4xl mx-auto px-6 pb-10">
          <div
            className="inline-block text-xs px-2.5 py-1 rounded-full mb-4 font-medium"
            style={{ backgroundColor: accent + "20", color: accent, border: `1px solid ${accent}40` }}
          >
            Azərbaycan yataqları
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{field.name}</h1>
          <p className="text-xl text-gray-400 mb-6">{field.tagline}</p>
          <p className="text-gray-300 leading-relaxed max-w-2xl">{field.significance}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-8">
            {field.keyStats.map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-xs text-gray-500 mb-1 leading-tight">{stat.label}</div>
                <div className="text-lg font-bold text-white leading-tight">{stat.value}</div>
                {stat.unit && <div className="text-xs text-gray-400">{stat.unit}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-10">

        <Section title="Coğrafi mövqe" icon="📍" accent={accent}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InfoCard label="Təsvir" value={field.location.description} />
            <InfoCard label="Su dərinliyi" value={field.location.waterDepth} />
            <InfoCard label="Bakıdan məsafə" value={field.location.distanceFromBaku} />
          </div>
        </Section>

        <Section title="Geoloji xüsusiyyətlər" icon="🪨" accent={accent}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="Lay (Formasiya)" value={field.geology.formation} />
            <InfoCard label="Litologiya" value={field.geology.lithology} />
            <InfoCard label="Tələ tipi" value={field.geology.trapType} />
            <InfoCard label="Dərinlik" value={field.geology.depth} />
            <InfoCard label="Reservoir yaşı" value={field.geology.reservoirAge} />
            <InfoCard label="Məsaməlik (Porosity)" value={field.geology.porosity} />
            <InfoCard label="Keçiricilik (Permeability)" value={field.geology.permeability} />
          </div>
        </Section>

        <Section title="İstehsal tarixi" icon="📅" accent={accent}>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-0">
              {field.history.map((h, i) => (
                <div key={i} className="relative flex gap-6">
                  <div
                    className="w-16 shrink-0 text-right text-sm font-mono font-bold pt-5"
                    style={{ color: accent }}
                  >
                    {h.year}
                  </div>
                  <div className="relative pt-5 pb-6 flex-1">
                    <div
                      className="absolute left-0 top-7 w-2.5 h-2.5 rounded-full border-2 -translate-x-5"
                      style={{ backgroundColor: accent + "40", borderColor: accent }}
                    />
                    <div className="text-sm font-semibold text-white mb-1">{h.event}</div>
                    <div className="text-sm text-gray-400 leading-relaxed">{h.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Texniki məlumatlar" icon="⚙️" accent={accent}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InfoCard label="Operator" value={field.technical.operator} />
            <InfoCard label="Platformalar" value={field.technical.platforms} />
            <InfoCard label="Quyu sayı" value={field.technical.wells} />
            <InfoCard label="Müqavilə tarixi" value={field.technical.contractDate} />
            <div className="md:col-span-2">
              <InfoCard label="Müqavilə" value={field.technical.contract} />
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Konsorsium / Ortaqlar</div>
            <div className="flex flex-wrap gap-2">
              {field.technical.partners.map((p) => (
                <span
                  key={p}
                  className="text-xs px-2.5 py-1 rounded-full border"
                  style={{
                    backgroundColor: accent + "10",
                    color: accent,
                    borderColor: accent + "30",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Bilirdinizmi?" icon="💡" accent={accent}>
          <div className="space-y-3">
            {field.funFacts.map((fact, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl border border-white/10 bg-white/3">
                <div
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{ backgroundColor: accent + "20", color: accent }}
                >
                  {i + 1}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </Section>

        <div className="border-t border-white/10 pt-8">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-4">Digər yataqlar</div>
          <div className="flex flex-wrap gap-2">
            {AZERBAIJAN_FIELDS.filter((f) => f.id !== field.id).map((f) => (
              <Link
                key={f.id}
                href={`/azerbaijan-fields/${f.id}`}
                className="px-3 py-1.5 rounded-lg text-sm border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-gray-300 hover:text-white"
              >
                {f.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({ title, icon, accent, children }: {
  title: string; icon: string; accent: string; children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{icon}</span>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <div className="flex-1 h-px bg-white/10 ml-2" />
      </div>
      {children}
    </section>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-sm text-gray-200 leading-snug">{value}</div>
    </div>
  );
}