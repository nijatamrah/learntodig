import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { topic, question } = await req.json();

  const message = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Sən neft-qaz mühəndisliyi üzrə ekspert müəllimsən. Mövzu: "${topic}". 
Tələbənin sualı: "${question}"
Azərbaycan dilində, sadə və aydın izahat ver. Maksimum 3-4 cümlə.`,
      },
    ],
  });

  const answer = message.content[0].type === "text" ? message.content[0].text : "";
  return NextResponse.json({ answer });
}