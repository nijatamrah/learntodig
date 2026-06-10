import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import type { WellLogChatContext } from "@/lib/well-log-explain";
import { zoneLabel } from "@/lib/well-log-explain";

export const runtime = "nodejs";

const MODEL = "claude-sonnet-4-5";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  message: string;
  logContext: WellLogChatContext;
  history?: ChatMessage[];
};

function formatLogContext(ctx: WellLogChatContext): string {
  const zones = ctx.zoneIntervals
    .map(
      (z) =>
        `${zoneLabel(z.zone)}: ${z.depthFrom.toFixed(1)}–${z.depthTo.toFixed(1)} ${ctx.depthKey}`,
    )
    .join("\n");

  const snapshots =
    ctx.depthSnapshots.length > 0
      ? ctx.depthSnapshots
          .map(
            (s) =>
              `Dərinlik ${s.depth.toFixed(1)} ${ctx.depthKey} (zona: ${zoneLabel(s.zone)}): ${JSON.stringify(s.values)}`,
          )
          .join("\n")
      : "Yoxdur";

  return `QUYU: ${JSON.stringify(ctx.wellInfo)}
DƏRİNLİK SÜTUNU: ${ctx.depthKey}
DƏRİNLİK ARALIĞI: ${ctx.depthMin.toFixed(1)} – ${ctx.depthMax.toFixed(1)}
ƏYRİLƏR: ${ctx.curveNames.join(", ")}
ZONA SAYI: ${JSON.stringify(ctx.zonesCount)}
ZONA İNTERVALLARI:
${zones}
SEÇİLMİŞ DƏRİNLİK: ${ctx.selectedDepth ?? "yoxdur"}
DƏRİNLİK SNAPSHOT-LARI:
${snapshots}
${ctx.aiSummary ? `AVTOMATİK XÜLASƏ:\n${ctx.aiSummary}\n` : ""}
LOQ NÜMUNƏ CƏDVƏLİ (sıx):
${ctx.denseSampleTable}`;
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "ANTHROPIC_API_KEY təyin edilməyib. learntoDig/.env.local faylına əlavə edin və dev serveri yenidən başladın.",
      },
      { status: 500 },
    );
  }

  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu formatı" }, { status: 400 });
  }

  const { message, logContext, history = [] } = body;
  if (!message?.trim() || !logContext?.denseSampleTable) {
    return NextResponse.json(
      { error: "Mesaj və loq konteksti tələb olunur" },
      { status: 400 },
    );
  }

  const systemPrompt = `Sən neft-qaz quyu loq analitikisən. Yalnız azərbaycan dilində cavab ver.
Sənə verilmiş LAS loq datasına əsasən dəqiq, sadə və peşəkar cavablar ver.
Konkret dərinlik suallarında həmin dərinlikdəki dəyərləri və zona təsnifatını izah et.
Ümumi suallarda bütün loq kontekstindən istifadə et.
Markdown istifadə etmə. 2–6 cümlə, lazım olsa bir az daha uzun.

LOQ KONTEXTİ:
${formatLogContext(logContext)}`;

  const messages: Anthropic.MessageParam[] = [
    ...history.slice(-8).map((m) => ({
      role: m.role,
      content: m.content,
    })),
    { role: "user", content: message.trim() },
  ];

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    const answer = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!answer) {
      return NextResponse.json({ error: "Boş cavab alındı" }, { status: 502 });
    }

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("Well-log chat error:", err);

    const isAuthError =
      err &&
      typeof err === "object" &&
      "status" in err &&
      (err as { status: number }).status === 401;

    const errorMessage = isAuthError
      ? "Anthropic API açarı etibarsızdır — .env.local-də düzgün ANTHROPIC_API_KEY yoxlayın"
      : "Server xətası — yenidən cəhd edin";

    return NextResponse.json({ error: errorMessage }, { status: isAuthError ? 401 : 500 });
  }
}
