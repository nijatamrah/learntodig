import { createClient } from "@/utils/supabase/client";
import type { ProgressRow, ProgressStatus } from "./types";

export async function getModuleProgress(moduleId: string): Promise<ProgressRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("module_progress")
    .select("module_id, section_id, status, score, updated_at")
    .eq("module_id", moduleId);
  if (error) {
    console.error("[progress] oxuma xətası:", error.message);
    return [];
  }
  return (data ?? []) as ProgressRow[];
}

export async function saveSectionProgress(params: {
  moduleId: string;
  sectionId: string;
  status: ProgressStatus;
  score?: number | null;
}): Promise<boolean> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase.from("module_progress").upsert(
    {
      user_id: user.id,
      module_id: params.moduleId,
      section_id: params.sectionId,
      status: params.status,
      score: params.score ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_id,section_id" }
  );
  if (error) {
    console.error("[progress] yazma xətası:", error.message);
    return false;
  }
  return true;
}
