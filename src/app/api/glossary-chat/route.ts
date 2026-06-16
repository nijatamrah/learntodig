import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 600,
      system: `Sən LearntoDig platformasının neft-qaz mühəndisliyi AI köməkçisisən.
Yalnız Azərbaycan dilində cavab ver.
Texniki terminləri aydın, sadə dildə izah et.
Cavablar qısa və məzmunlu olsun (3–6 cümlə).
Lazım olduqda düsturları sadə şəkildə göstər.
Əgər sual neft-qaz mühəndisliyi ilə əlaqəlidirsə — tam cavab ver.
Əgər sual mövzu xaricidir — nəzakətlə bildir ki, yalnız neft-qaz mövzularında kömək edə bilərsən.`,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const content = response.content[0]?.type === "text" ? response.content[0].text : "";
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Glossary chat error:", error);
    return NextResponse.json({ content: "Xəta baş verdi." }, { status: 500 });
  }
}