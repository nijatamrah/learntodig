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
