// Modul sisteminin ortaq tipləri.

export type ModuleStatus = "live" | "restoring" | "planned";
export type SectionStatus = "live" | "next" | "soon";
export type LearnerMode = "student" | "engineer";

export interface ModuleDef {
  id: string;
  href: string;
  title: string;
  /** Real dünyada qarşılığı olan proqram(lar) */
  realTool: string;
  icon: string;
  accent: string;
  tag: string;
  status: ModuleStatus;
  level: string;
  /** Təxmini tam keçid müddəti (saat) */
  hours: number;
  desc: string;
  /** Bu modulun öyrətdiyi, işəgötürənin gözlədiyi bacarıqlar */
  skills: string[];
  /** AI müəllimin sistem prompt-u üçün mövzu çərçivəsi */
  aiScope: string;
}

export interface ModuleSection {
  id: string;
  order: number;
  title: string;
  titleEn: string;
  summary: string;
  status: SectionStatus;
  /** Bu bölməni bitirən şəxsin qazanacağı bacarıqlar */
  skills: string[];
}

export type ProgressStatus = "in_progress" | "completed";

export interface ProgressRow {
  module_id: string;
  section_id: string;
  status: ProgressStatus;
  score: number | null;
  updated_at: string;
}
