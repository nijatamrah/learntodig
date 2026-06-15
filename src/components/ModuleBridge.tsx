"use client";
import Link from "next/link";

interface ModuleInfo {
  name: string;
  url: string;
  icon: string;
  tagline: string;
  bullets: string[];
}

const TOPIC_TO_MODULE: Record<string, ModuleInfo> = {
  "well-log": {
    name: "WellLogAI",
    url: "/learn/well-log",
    icon: "📊",
    tagline: "Real LAS faylını yüklə, öyrəndiklərini analiz et",
    bullets: [
      "GR, Resistivity, Neutron-Density loqlarını vizuallaşdır",
      "AI ilə loq interpretasiyası al",
      "Litologiya və mayeni müəyyən et",
    ],
  },
  geology: {
    name: "Geologiya Modulu",
    url: "/learn/geology",
    icon: "🪨",
    tagline: "Litologiya biliklərini interaktiv mühitdə tətbiq et",
    bullets: [
      "Çöküntü mühiti xəritəsini araşdır",
      "Stratiqrafik sütun qur",
      "AI geologu ilə Azərbaycan yataqlarını müzakirə et",
    ],
  },
  drilling: {
    name: "Drilling Modulu",
    url: "/learn/drilling",
    icon: "⚙️",
    tagline: "ROP və qazıma parametrlərini real simulyatorda sına",
    bullets: [
      "WOB, RPM dəyiş — ROP-un necə dəyişdiyini gör",
      "Qazıma problemlərini simulyasiya et",
      "AI ilə optimal parametr strategiyası tap",
    ],
  },
  reservoir: {
    name: "Petrel Modulu",
    url: "/learn/petrel",
    icon: "🗺️",
    tagline: "Rezervuar modelini qur, məsaməlilik və keçiriciliyi xəritələ",
    bullets: [
      "3D rezervuar modeli ilə məsaməlilik paylanmasını gör",
      "Azərbaycan yataqlarının real petrofizika dəyərlərini araşdır",
      "OOIP hesabla",
    ],
  },
  production: {
    name: "Prosper Modulu",
    url: "/learn/prosper",
    icon: "🛢️",
    tagline: "IPR əyrisi çək, ESP dizaynını optimallaşdır",
    bullets: [
      "Vogel metodu ilə IPR əyrisini dinamik qur",
      "Nodal Analysis: quyu axın potensialını tap",
      "DCA ilə hasilat proqnozunu simulyasiya et",
    ],
  },
};

export default function ModuleBridge({ topic }: { topic: string }) {
  const moduleInfo = TOPIC_TO_MODULE[topic];
  if (!moduleInfo) return null;

  return (
    <div className="mt-12 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-slate-100" />
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Növbəti addım
        </span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      <div className="rounded-xl border-2 border-teal-400 bg-teal-50 p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{moduleInfo.icon}</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-0.5">
                Praktika modulu
              </p>
              <p className="text-base font-semibold text-slate-900">{moduleInfo.name}</p>
            </div>
          </div>

          <Link
            href={moduleInfo.url}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition"
          >
            Açıq et
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <p className="text-sm text-slate-600 mb-3">{moduleInfo.tagline}</p>

        <ul className="space-y-1.5">
          {moduleInfo.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="text-teal-500 mt-0.5">✓</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}