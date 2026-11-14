import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { guardAI } from "@/lib/ai-guard";
import { getModule } from "@/lib/modules/registry";

export const runtime = "nodejs";

const MODEL = process.env.ANTHROPIC_MODEL?.trim() || "claude-sonnet-4-5";
const MAX_MESSAGES = 12;
const MAX_CHARS = 2000;

type ChatMsg = { role: "user" | "assistant"; content: string };

function buildSystem(scope: string, mode: "student" | "engineer", sectionHint?: string) {
  const modeRule =
    mode === "engineer"
      ? "İstifadəçi mühəndis rejimindədir: qısa və texniki danış, standart ixtisarları izahsız işlət, hesablamanı birbaşa ver."
      : "İstifadəçi tələbə rejimindədir: anlayışı sadə dillə izah et, hər düsturdakı dəyişənləri aç, nümunə ilə göstər.";

  return `Sən LearntoDig platformasının ${scope} üzrə mühəndis-müəllimisən. Azərbaycan dilində cavab ver; texniki terminləri ilk dəfə işlədəndə ingiliscə qarşılığını mötərizədə yaz.

Qaydalar:
- Hesablamalarda field units (ppg, psi, ft, bbl, gpm) işlət və vahidi hər zaman yaz. Düsturu yaz, dəyərləri yerinə qoy, nəticəni ver.
- Dəqiq bilmədiyin rəqəmi, standartı və ya düsturu uydurma. Əmin deyilsənsə, bunu açıq de.
- Real əməliyyat qərarı (xüsusilə well control və təhlükəsizlik) üçün şirkətin prosedurlarına, IWCF/API standartlarına və səlahiyyətli mühəndisə istinad etməyi xatırlat.
- Mövzudan kənar sualı nəzakətlə modulun mövzusuna yönləndir.
- Cavabı qısa saxla (adətən 4-8 cümlə), lazım gələndə addım-addım hesablama ver.
${modeRule}${sectionHint ? `\nİstifadəçi hazırda bu bölmədədir: ${sectionHint}.` : ""}`;
}

export async function POST(request: Request) {
  const guard = await guardAI("module-chat", 40);
  if (!guard.ok) return guard.response;

  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: "Server konfiqurasiyası tamamlanmayıb." }, { status: 500 });
  }

  let body: {
    moduleId?: string;
    sectionTitle?: string;
    mode?: string;
    messages?: { role?: string; content?: unknown }[];
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu formatı." }, { status: 400 });
  }

  const mod = body.moduleId ? getModule(body.moduleId) : undefined;
  if (!mod) {
    return NextResponse.json({ error: "Modul tapılmadı." }, { status: 400 });
  }

  const messages: ChatMsg[] = (body.messages ?? [])
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim().length > 0
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
    .slice(-MAX_MESSAGES);

  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Mesaj boşdur." }, { status: 400 });
  }

  const mode = body.mode === "engineer" ? "engineer" : "student";
  const sectionHint =
    typeof body.sectionTitle === "string" ? body.sectionTitle.slice(0, 120) : undefined;

  const anthropic = new Anthropic({ apiKey });
  const stream = anthropic.messages.stream({
    model: MODEL,
    max_tokens: 1200,
    system: buildSystem(mod.aiScope, mode, sectionHint),
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("[module-chat] stream xətası:", err instanceof Error ? err.message : err);
        controller.enqueue(encoder.encode("\n\n[Cavab yarımçıq qaldı. Yenidən cəhd edin.]"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
