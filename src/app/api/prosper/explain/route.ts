import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MODEL = "claude-sonnet-4-5";

type ExplainRequest = {
  parameters: {
    depthM: number;
    reservoirPressurePsi: number;
    pipeDiameterInch: number;
    gorScfStb: number;
    waterCutPercent: number;
  };
  results: {
    flowRateBblDay: number;
    wellEfficiencyPercent: number;
    wellheadPressurePsi: number;
    flowRegime: string;
  };
};

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();

  console.log(
    "[prosper/explain] ANTHROPIC_API_KEY:",
    apiKey ? `${apiKey.slice(0, 10)}… (len=${apiKey.length})` : "MISSING",
  );

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "ANTHROPIC_API_KEY təyin edilməyib. learntoDig/.env.local faylına əlavə edin və dev serveri yenidən başladın.",
      },
      { status: 500 },
    );
  }

  let body: ExplainRequest;
  try {
    body = (await request.json()) as ExplainRequest;
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu formatı" }, { status: 400 });
  }

  const { parameters: p, results: r } = body;
  if (!p || !r) {
    return NextResponse.json(
      { error: "Parametrlər və nəticələr tələb olunur" },
      { status: 400 },
    );
  }

  const prompt = `Sən neft-qaz mühəndisliyi üzrə sadə dillə izah edən müəllimsən.

Aşağıdakı quyu simulyatoru parametrləri və nəticələri verilmişdir. Sadə azərbaycan dilində izah et:
- Nəticələr niyə belədir?
- Hər parametr (dərinlik, reservoir təzyiqi, boru diametri, GOR, su kəsilməsi) axın sürətinə, səmərəliliyə, quyu başı təzyiqinə və axın rejiminə necə təsir edir?
- Parametrlər arasında əsas əlaqələri qısa məntiqi zəncirlərlə göstər.

PARAMETRLƏR:
- Dərinlik: ${p.depthM} m
- Reservoir təzyiqi: ${p.reservoirPressurePsi} psi
- Boru diametri: ${p.pipeDiameterInch} inch
- GOR (qaz-neft nisbəti): ${p.gorScfStb} scf/STB
- Su kəsilməsi: ${p.waterCutPercent} %

NƏTICƏLƏR:
- Axın sürəti: ${r.flowRateBblDay} bbl/gün
- Quyu səmərəliliyi: ${r.wellEfficiencyPercent} %
- Quyu başı təzyiqi: ${r.wellheadPressurePsi} psi
- Axın rejimi: ${r.flowRegime}

Qaydalar:
- 3–5 qısa abzas, sadə terminologiya
- Tələbə səviyyəsində, amma peşəkar düzgünlük
- Yalnız azərbaycan dilində cavab ver
- Markdown istifadə etmə, sadə mətn`;

  try {
    const anthropic = new Anthropic({ apiKey });
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
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
    console.error("Prosper explain error:", err);

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
