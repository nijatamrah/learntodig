import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 0;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function generateFact(dateStr: string): Promise<string> {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) throw new Error("No API key");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `Tarix: ${dateStr}. Neft-qaz muhendisligi haqqinda 1 maraqli fakt yaz. Azerbaycan dilinde, 2-3 cumle, texniki amma maraqli olsun. Drilling, well log, reservoir, production, geology movzularindan birini sec. YALNIZ fakti yaz, basqa hec ne yazma.`,
        },
      ],
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!res.ok) throw new Error(`Anthropic error: ${res.status}`);

  const data = await res.json();
  const text = data.content?.[0]?.text?.trim();
  if (!text) throw new Error("Empty response from AI");
  return text;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const today = new Date().toISOString().split("T")[0];

  // Bugünkü fakt DB-dəmi?
  const { data: existing } = await supabase
    .from("daily_facts")
    .select("*")
    .eq("fact_date", today)
    .not("fact_text", "eq", "")
    .single();

  let factText = existing?.fact_text;

  if (!factText) {
    // Yeni fakt generate et
    factText = await generateFact(today);

    // DB-yə yaz (upsert — eyni tarix varsa üzərinə yaz)
    await supabase
      .from("daily_facts")
      .upsert(
        { fact_date: today, fact_text: factText, category: "general" },
        { onConflict: "fact_date" }
      );
  }

  // Streak yenilə
  let streak = 1;
  if (userId) {
    const { data: userStreak } = await supabase
      .from("user_streaks")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!userStreak) {
      await supabase.from("user_streaks").insert({
        user_id: userId,
        last_visit: today,
        streak_count: 1,
        total_visits: 1,
      });
      streak = 1;
    } else {
      const lastVisit = new Date(userStreak.last_visit);
      const todayDate = new Date(today);
      const diffDays = Math.floor(
        (todayDate.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 0) {
        streak = userStreak.streak_count;
      } else if (diffDays === 1) {
        streak = userStreak.streak_count + 1;
        await supabase
          .from("user_streaks")
          .update({
            last_visit: today,
            streak_count: streak,
            total_visits: userStreak.total_visits + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId);
      } else {
        streak = 1;
        await supabase
          .from("user_streaks")
          .update({
            last_visit: today,
            streak_count: 1,
            total_visits: userStreak.total_visits + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId);
      }
    }
  }

  return NextResponse.json({ fact: factText, date: today, streak });
}