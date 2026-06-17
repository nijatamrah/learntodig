"use client";

import Link from "next/link";
import { AZERBAIJAN_FIELDS } from "@/components/azerbaijan-fields/FieldData";

const fieldIcons: Record<string, string> = {
  guneshli: "🛢️",
  chirag: "⚡",
  azeri: "🔴",
  "neft-dashlari": "🏙️",
  shahdeniz: "🌊",
};

const fieldTypeLabels: Record<string, string> = {
  guneshli: "Neft",
  chirag: "Neft",
  azeri: "Neft",
  "neft-dashlari": "Neft · Tarixi",
  shahdeniz: "Qaz · Kondensat",
};

export default function AzerbaijanFieldsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-gray-950 to-gray-950 opacity-80" />
        <div className="relative max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Azərbaycan yataqları
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Xəzər Neft-Qaz Yataqları
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            Günəşli, Çıraq, Azəri, Neft Daşları, Şahdəniz — hər yatağın geoloji xüsusiyyətləri,
            istehsal tarixi, texniki məlumatları. Dünya platformalarında olmayan unikal məzmun.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { label: "Ümumi yataq", value: "5" },
              { label: "Aktiv hasilat", value: "1949–" },
              { label: "Ölkə ixracatı", value: "80%+", note: "ACG payı" },
              { label: "Boru xətti", value: "3.500+", unit: "km" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">
                  {s.value}
                  {s.unit && <span className="text-base font-normal text-gray-400 ml-1">{s.unit}</span>}
                </div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                {s.note && <div className="text-xs text-blue-400/70 mt-0.5">{s.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fields grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {AZERBAIJAN_FIELDS.map((field) => (
            <Link
              key={field.id}
              href={`/azerbaijan-fields/${field.id}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: field.accentColor }}
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: field.accentColor + "20",
                          color: field.accentColor,
                          border: `1px solid ${field.accentColor}40`,
                        }}
                      >
                        {fieldTypeLabels[field.id]}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                      {field.name}
                    </h2>
                    <p className="text-sm text-gray-400 mt-0.5">{field.tagline}</p>
                  </div>
                  <span className="text-3xl opacity-60 group-hover:opacity-90 transition-opacity">
                    {fieldIcons[field.id]}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {field.keyStats.slice(0, 3).map((stat) => (
                    <div key={stat.label} className="bg-black/20 rounded-lg p-2.5">
                      <div className="text-xs text-gray-500 mb-0.5 leading-tight">{stat.label}</div>
                      <div className="text-sm font-semibold text-white leading-tight">
                        {stat.value}
                        {stat.unit && (
                          <span className="text-xs font-normal text-gray-400 ml-0.5">{stat.unit}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {field.location.description}
                </div>

                <div
                  className="flex items-center gap-1 text-xs mt-4 font-medium"
                  style={{ color: field.accentColor }}
                >
                  Ətraflı məlumat
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-xl border border-white/5 bg-white/3 text-center">
          <p className="text-sm text-gray-500">
            Məlumatlar{" "}
            <span className="text-gray-400">ARDNŞ, BP, akademik nəşriyyat</span>
            {" "}mənbələrinə əsaslanır.
            Hasilat rəqəmləri yatağın hazırkı vəziyyətinə görə dəyişə bilər.
          </p>
        </div>
      </div>
    </main>
  );
}