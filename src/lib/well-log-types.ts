export interface WellInfo {
  well?: string;
  field?: string;
  company?: string;
}

export type ZoneType = "oil" | "gas" | "water" | "shale" | "unknown";

export interface LogData {
  well_info: WellInfo;
  depth_key: string;
  curves: Record<string, (number | null)[]>;
  zones: ZoneType[];
  curve_names: string[];
  ai_summary?: string;
}

export interface ChatMessage {
  role: "user" | "ai";
  text: string;
}
