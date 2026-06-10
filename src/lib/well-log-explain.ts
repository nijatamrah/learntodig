import type { LogData, ZoneType } from "@/lib/well-log-types";

export interface WellLogExplainPayload {
  wellInfo: LogData["well_info"];
  depthKey: string;
  curveNames: string[];
  depthMin: number;
  depthMax: number;
  zonesCount: Record<string, number>;
  zoneIntervals: {
    zone: ZoneType;
    depthFrom: number;
    depthTo: number;
    sampleCount: number;
  }[];
  sampleTable: string;
  aiSummary?: string;
  selectedDepth?: number | null;
}

const ZONE_LABELS: Record<ZoneType, string> = {
  oil: "neft",
  gas: "qaz",
  water: "su",
  shale: "şal",
  unknown: "naməlum",
};

export function zoneLabel(zone: ZoneType): string {
  return ZONE_LABELS[zone] ?? zone;
}

function countZones(zones: ZoneType[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const zone of zones) {
    counts[zone] = (counts[zone] ?? 0) + 1;
  }
  return counts;
}

function buildZoneIntervals(
  depths: (number | null)[],
  zones: ZoneType[],
): WellLogExplainPayload["zoneIntervals"] {
  const intervals: WellLogExplainPayload["zoneIntervals"] = [];
  let start = 0;

  for (let i = 1; i <= zones.length; i++) {
    if (i === zones.length || zones[i] !== zones[start]) {
      const sliceDepths = depths.slice(start, i).filter((d): d is number => d != null);
      if (sliceDepths.length > 0) {
        intervals.push({
          zone: zones[start],
          depthFrom: Math.min(...sliceDepths),
          depthTo: Math.max(...sliceDepths),
          sampleCount: i - start,
        });
      }
      start = i;
    }
  }

  return intervals.slice(0, 40);
}

function buildSampleTable(logData: LogData): string {
  const { curves, depth_key, curve_names } = logData;
  const depths = curves[depth_key] ?? [];
  const keys = [depth_key, ...curve_names.slice(0, 4)];
  const n = depths.length;
  const step = Math.max(1, Math.floor(n / 60));
  const indices = Array.from({ length: Math.min(60, n) }, (_, j) => j * step).filter(
    (i) => i < n,
  );

  const header = keys.join("  ");
  const rows = indices.map((i) =>
    keys
      .map((k) => {
        const v = curves[k]?.[i];
        return v == null ? "N/A" : Number(v).toFixed(1);
      })
      .join("  "),
  );

  return `${header}\n${rows.join("\n")}`;
}

export function buildWellLogExplainPayload(
  logData: LogData,
  selectedDepth?: number | null,
): WellLogExplainPayload {
  const depths = logData.curves[logData.depth_key] ?? [];
  const validDepths = depths.filter((d): d is number => d != null);

  return {
    wellInfo: logData.well_info,
    depthKey: logData.depth_key,
    curveNames: logData.curve_names,
    depthMin: validDepths.length ? Math.min(...validDepths) : 0,
    depthMax: validDepths.length ? Math.max(...validDepths) : 0,
    zonesCount: countZones(logData.zones),
    zoneIntervals: buildZoneIntervals(depths, logData.zones),
    sampleTable: buildSampleTable(logData),
    aiSummary: logData.ai_summary,
    selectedDepth: selectedDepth ?? null,
  };
}

export function findNearestDepthIndex(
  logData: LogData,
  depth: number,
): number {
  const depths = logData.curves[logData.depth_key] ?? [];
  if (depths.length === 0) return 0;

  return depths.reduce<number>(
    (best, d, i) =>
      Math.abs((d ?? 0) - depth) < Math.abs((depths[best] ?? 0) - depth) ? i : best,
    0,
  );
}

export function getDepthSnapshot(
  logData: LogData,
  depth: number,
): { depth: number; zone: ZoneType; values: Record<string, number | null> } | null {
  const idx = findNearestDepthIndex(logData, depth);
  const depths = logData.curves[logData.depth_key] ?? [];
  const actualDepth = depths[idx];
  if (actualDepth == null) return null;

  const values: Record<string, number | null> = {};
  for (const key of [logData.depth_key, ...logData.curve_names]) {
    values[key] = logData.curves[key]?.[idx] ?? null;
  }

  return {
    depth: actualDepth,
    zone: logData.zones[idx] ?? "unknown",
    values,
  };
}

function buildDenseSampleTable(logData: LogData, maxRows = 100): string {
  const { curves, depth_key, curve_names } = logData;
  const depths = curves[depth_key] ?? [];
  const keys = [depth_key, ...curve_names.slice(0, 6)];
  const n = depths.length;
  const step = Math.max(1, Math.floor(n / maxRows));
  const indices = Array.from({ length: Math.min(maxRows, n) }, (_, j) => j * step).filter(
    (i) => i < n,
  );

  const header = keys.join("\t");
  const rows = indices.map((i) => {
    const zone = logData.zones[i] ?? "unknown";
    const vals = keys
      .map((k) => {
        const v = curves[k]?.[i];
        return v == null ? "N/A" : Number(v).toFixed(2);
      })
      .join("\t");
    return `${vals}\tzone=${zone}`;
  });

  return `${header}\tzona\n${rows.join("\n")}`;
}

export interface WellLogChatContext extends WellLogExplainPayload {
  denseSampleTable: string;
  depthSnapshots: {
    depth: number;
    zone: ZoneType;
    values: Record<string, number | null>;
  }[];
}

function extractDepthsFromText(text: string): number[] {
  const matches = text.match(/\d+(?:\.\d+)?\s*(?:ft|feet|m|metr)?/gi) ?? [];
  return matches
    .map((m) => parseFloat(m))
    .filter((n) => Number.isFinite(n) && n > 0);
}

export function buildWellLogChatContext(
  logData: LogData,
  question: string,
  selectedDepth?: number | null,
): WellLogChatContext {
  const base = buildWellLogExplainPayload(logData, selectedDepth);
  const depthCandidates = new Set<number>();

  if (selectedDepth != null) depthCandidates.add(selectedDepth);
  for (const d of extractDepthsFromText(question)) {
    depthCandidates.add(d);
  }

  const depthSnapshots = [...depthCandidates]
    .slice(0, 5)
    .map((d) => getDepthSnapshot(logData, d))
    .filter((s): s is NonNullable<typeof s> => s != null);

  return {
    ...base,
    denseSampleTable: buildDenseSampleTable(logData),
    depthSnapshots,
  };
}
