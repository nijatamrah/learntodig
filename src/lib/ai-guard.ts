import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

// Bütün AI endpoint-lərin girişində çağırılır:
//  1) login tələb edir (anonim istifadəçi Anthropic xərcini artıra bilməz)
//  2) saatlıq limit tətbiq edir (ai_usage cədvəli)
// Cədvəl hələ yaradılmayıbsa limit buraxılır (fail-open), login tələbi isə həmişə qalır.

type GuardResult = { ok: true; user: User } | { ok: false; response: NextResponse };

export async function guardAI(scope: string, perHour = 40): Promise<GuardResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const msg = "AI müəllimdən istifadə üçün daxil olun.";
    return { ok: false, response: NextResponse.json({ error: msg, reply: msg }, { status: 401 }) };
  }

  try {
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error } = await supabase
      .from("ai_usage")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", since);

    if (!error) {
      if ((count ?? 0) >= perHour) {
        const msg = `Saatlıq AI limiti (${perHour} sorğu) dolub. Bir az sonra yenidən cəhd edin.`;
        return { ok: false, response: NextResponse.json({ error: msg, reply: msg }, { status: 429 }) };
      }
      await supabase.from("ai_usage").insert({ user_id: user.id, scope });
    }
  } catch {
    // limit mexanizmi işləməsə də istifadəçini bloklamırıq
  }

  return { ok: true, user };
}
