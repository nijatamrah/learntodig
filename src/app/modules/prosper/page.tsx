"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type FlowRegime = "turbulent" | "laminar" | "weak";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function computeResults(
  depth: number,
  reservoirPressure: number,
  pipeDiameter: number,
  gor: number,
  waterCut: number,
) {
  const depthNorm = (depth - 500) / 4500;
  const pressureNorm = (reservoirPressure - 500) / 4500;
  const diameterNorm = (pipeDiameter - 2) / 8;
  const gorNorm = gor / 2000;
  const wcNorm = waterCut / 90;

  const flowRate =
    40 +
    pressureNorm *
      920 *
      (0.45 + diameterNorm * 0.9) *
      (1 - depthNorm * 0.42) *
      (1 - gorNorm * 0.22) *
      (1 - wcNorm * 0.38);

  const wellEfficiency = clamp(
    88 -
      depthNorm * 28 -
      gorNorm * 18 -
      wcNorm * 32 +
      diameterNorm * 12 +
      pressureNorm * 6,
    12,
    99,
  );

  const wellheadPressure = clamp(
    reservoirPressure * 0.12 +
      (1 - depthNorm) * 180 +
      diameterNorm * 45 -
      flowRate * 0.018 -
      gorNorm * 120 -
      wcNorm * 40,
    45,
    reservoirPressure * 0.85,
  );

  const flowIndex =
    (flowRate / 600) * (pipeDiameter / 5) / (depth / 2800 + 0.35);

  let flowRegime: FlowRegime = "weak";
  if (flowIndex > 1.15) flowRegime = "turbulent";
  else if (flowIndex > 0.42) flowRegime = "laminar";

  return {
    flowRate: Math.round(flowRate),
    wellEfficiency: Math.round(wellEfficiency),
    wellheadPressure: Math.round(wellheadPressure),
    flowRegime,
  };
}

const regimeStyles: Record<
  FlowRegime,
  { label: string; badge: string; description: string }
> = {
  turbulent: {
    label: "Turbulent",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    description: "Yüksək axın sürəti — müqavimət dominant rejim",
  },
  laminar: {
    label: "Laminar",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    description: "Sabit axın — optimal hidravlik rejim",
  },
  weak: {
    label: "Weak",
    badge: "bg-slate-500/20 text-slate-300 border-slate-500/40",
    description: "Aşağı axın — quyu məhsuldarlığı məhdudlaşır",
  },
};

function SliderControl({
  id,
  label,
  unit,
  min,
  max,
  step,
  value,
  onChange,
}: {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm text-slate-300">
          {label}
        </label>
        <span className="shrink-0 text-sm font-medium text-[#f0b429]">
          {value.toLocaleString()} {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#2d3148] accent-[#4f5b99]"
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  );
}

export default function ProsperPage() {
  const [depth, setDepth] = useState(2500);
  const [reservoirPressure, setReservoirPressure] = useState(2500);
  const [pipeDiameter, setPipeDiameter] = useState(5);
  const [gor, setGor] = useState(500);
  const [waterCut, setWaterCut] = useState(25);

  const [explanation, setExplanation] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showAiSection, setShowAiSection] = useState(false);

  const results = useMemo(
    () => computeResults(depth, reservoirPressure, pipeDiameter, gor, waterCut),
    [depth, reservoirPressure, pipeDiameter, gor, waterCut],
  );

  const regime = regimeStyles[results.flowRegime];

  const handleExplain = async () => {
    setShowAiSection(true);
    setAiLoading(true);
    setAiError(null);

    try {
      const res = await fetch("/api/prosper/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parameters: {
            depthM: depth,
            reservoirPressurePsi: reservoirPressure,
            pipeDiameterInch: pipeDiameter,
            gorScfStb: gor,
            waterCutPercent: waterCut,
          },
          results: {
            flowRateBblDay: results.flowRate,
            wellEfficiencyPercent: results.wellEfficiency,
            wellheadPressurePsi: results.wellheadPressure,
            flowRegime: regime.label,
          },
        }),
      });

      const data = (await res.json()) as { explanation?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Xəta baş verdi");
      }

      setExplanation(data.explanation ?? "");
    } catch (err) {
      setExplanation(null);
      setAiError(
        err instanceof Error ? err.message : "İzah alınarkən xəta baş verdi",
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0f1117] text-slate-200">
      <header className="flex items-center justify-between gap-4 border-b border-[#2d3148] bg-[#1a1d2e] px-6 py-3.5">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-lg font-bold text-[#f0b429]">🛢️ ProsperSim</span>
          <span className="text-xs text-slate-500">
            Quyu məhsuldarlığı simulyatoru · interaktiv
          </span>
        </div>
        <Link
          href="/"
          className="text-sm text-slate-400 transition hover:text-slate-200"
        >
          ← LearntoDig
        </Link>
      </header>

      <div className="mx-auto w-full max-w-5xl px-6 pt-5">
        <h2 className="text-lg font-semibold text-[#f0b429]">
          Prosper məhsuldarlıq simulyatoru
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-400">
          Quyu parametrlərini dəyişdirin və axın sürəti, səmərəlilik və quyu başı
          təzyiqinin necə dəyişdiyini izləyin.
        </p>
      </div>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-[#2d3148] bg-[#1a1d2e] p-6">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Parametrlər
            </h3>
            <div className="space-y-6">
              <SliderControl
                id="depth"
                label="Dərinlik"
                unit="m"
                min={500}
                max={5000}
                step={50}
                value={depth}
                onChange={setDepth}
              />
              <SliderControl
                id="reservoir-pressure"
                label="Reservoir təzyiqi"
                unit="psi"
                min={500}
                max={5000}
                step={50}
                value={reservoirPressure}
                onChange={setReservoirPressure}
              />
              <SliderControl
                id="pipe-diameter"
                label="Boru diametri"
                unit="inch"
                min={2}
                max={10}
                step={0.5}
                value={pipeDiameter}
                onChange={setPipeDiameter}
              />
              <SliderControl
                id="gor"
                label="Qaz-neft nisbəti (GOR)"
                unit="scf/STB"
                min={0}
                max={2000}
                step={25}
                value={gor}
                onChange={setGor}
              />
              <SliderControl
                id="water-cut"
                label="Su kəsilməsi"
                unit="%"
                min={0}
                max={90}
                step={1}
                value={waterCut}
                onChange={setWaterCut}
              />
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="rounded-xl border border-[#2d3148] bg-[#1a1d2e] p-6">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Nəticələr
              </h3>
              <dl className="space-y-4">
                <div className="flex items-baseline justify-between gap-4 border-b border-[#2d3148] pb-4">
                  <dt className="text-sm text-slate-400">Axın sürəti</dt>
                  <dd className="text-2xl font-semibold text-slate-100">
                    {results.flowRate.toLocaleString()}{" "}
                    <span className="text-base font-normal text-slate-500">
                      bbl/gün
                    </span>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[#2d3148] pb-4">
                  <dt className="text-sm text-slate-400">Quyu səmərəliliyi</dt>
                  <dd className="text-2xl font-semibold text-slate-100">
                    {results.wellEfficiency}
                    <span className="text-base font-normal text-slate-500">%</span>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-slate-400">Quyu başı təzyiqi</dt>
                  <dd className="text-2xl font-semibold text-slate-100">
                    {results.wellheadPressure.toLocaleString()}{" "}
                    <span className="text-base font-normal text-slate-500">psi</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-[#2d3148] bg-[#1a1d2e] p-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Axın rejimi
              </h3>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${regime.badge}`}
              >
                {regime.label}
              </span>
              <p className="mt-3 text-sm text-slate-400">{regime.description}</p>
            </div>

            <button
              type="button"
              onClick={() => void handleExplain()}
              disabled={aiLoading}
              className="inline-flex items-center justify-center rounded-lg bg-[#4f5b99] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6370b8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {aiLoading ? "Yüklənir…" : "AI ilə izah et"}
            </button>
          </section>
        </div>

        {showAiSection && (
          <section className="mt-8 rounded-xl border border-[#2d3148] bg-[#1a1d2e] p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#f0b429]">
              AI izahı
            </h3>

            {aiLoading && (
              <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
                <span
                  className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#4f5b99] border-t-transparent"
                  aria-hidden
                />
                AI izah hazırlanır…
              </div>
            )}

            {!aiLoading && aiError && (
              <p className="mt-5 text-sm text-red-400">{aiError}</p>
            )}

            {!aiLoading && !aiError && explanation && (
              <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                {explanation}
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
