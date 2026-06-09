import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import type { WellLogExplainPayload } from "@/lib/well-log-explain";
import { zoneLabel } from "@/lib/well-log-explain";

export const runtime = "nodejs";

const MODEL = "claude-sonnet-4-5";

function formatZoneIntervals(payload: WellLogExplainPayload): string {
  return payload.zoneIntervals
    .map(
      (z) =>
        `${zoneLabel(z.zone)}: ${z.depthFrom.toFixed(1)}–${z.depthTo.toFixed(1)} ${payload.depthKey} (${z.sampleCount} nöqtə)`,
    )
    .join("\n");
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

  let payload: WellLogExplainPayload;
  try {
    payload = (await request.json()) as WellLogExplainPayload;
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu formatı" }, { status: 400 });
  }

  if (!payload.sampleTable || !payload.depthKey) {
    return NextResponse.json(
      { error: "Loq analizi məlumatları tələb olunur" },
      { status: 400 },
    );
  }

  const selectedDepthNote =
    payload.selectedDepth != null
      ? `\nİstifadəçinin seçdiyi dərinlik: ${payload.selectedDepth} ${payload.depthKey}`
      : "";

  const existingSummaryNote = payload.aiSummary
    ? `\nƏvvəlki avtomatik xülasə (istinad üçün):\n${payload.aiSummary}`
    : "";

  const prompt = `Sən neft-qaz geofiziki loq analiticisən və tələbəyə sadə azərbaycan dilində izah edirsən.

Aşağıdakı LAS quyu loq analizi verilmişdir. İzah et:
- Loq datası ümumilikdə nə göstərir?
- Hansı dərinlik intervalları neft, qaz, su və ya şal kimi qiymətləndirilir və NİYƏ (GR, resistivlik və digər əyri məntiqi ilə)?
- Ən perspektivli (neft/qaz) zonalar hansılardır?
- Su zonaları harada görünür və nə deməkdir?

QUYU:
${JSON.stringify(payload.wellInfo, null, 2)}

DƏRİNLİK ARALIĞI: ${payload.depthMin.toFixed(1)} – ${payload.depthMax.toFixed(1)} ${payload.depthKey}

ƏYRİLƏR: ${payload.curveNames.join(", ")}

ZONA SAYI (nöqtə üzrə):
${JSON.stringify(payload.zonesCount, null, 2)}

ZONA İNTERVALLARI:
${formatZoneIntervals(payload)}
${selectedDepthNote}
${existingSummaryNote}

LOQ NÜMUNƏ CƏDVƏLİ (seçmə):
${payload.sampleTable}

Qaydalar:
- 4–6 qısa abzas, sadə terminologiya
- Konkret dərinlik aralıqlarından istifadə et
- Yalnız azərbaycan dilində cavab ver
- Markdown istifadə etmə, sadə mətn`;

  try {
    const anthropic = new Anthropic({ apiKey });
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1200,
      messages: [{ role: "user", content: prompt }],
    });

    const explanation = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!explanation) {
      return NextResponse.json({ error: "Boş cavab alındı" }, { status: 502 });
    }

    return NextResponse.json({ explanation });
  } catch (err) {
    console.error("Well-log explain error:", err);

    const isAuthError =
      err &&
      typeof err === "object" &&
      "status" in err &&
      (err as { status: number }).status === 401;

    const message = isAuthError
      ? "Anthropic API açarı etibarsızdır — .env.local-də düzgün ANTHROPIC_API_KEY yoxlayın"
      : "Server xətası — yenidən cəhd edin";

    return NextResponse.json({ error: message }, { status: isAuthError ? 401 : 500 });
  }
}
