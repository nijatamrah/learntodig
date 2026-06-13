import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: 'ANTHROPIC_API_KEY tapılmadı.' }, { status: 500 });
  }

  const { message } = await req.json();

  const anthropic = new Anthropic({ apiKey });

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: `Sən LearntoDig platformasının qazıma mühəndisliyi müəllimisin. Qazıma prosesi, bit növləri, qazıma məhlulu, BHA, ROP optimizasiyası, casing proqramı, stuck pipe, lost circulation, kick kimi qazıma problemləri haqqında sualları Azərbaycan dilində sadə və aydın izah edirsən. Azərbaycan neft sənayesinə (SOCAR, BP, Xəzər dənizi platformaları) aid nümunələr verirsən. Cavabların qısa (3-5 cümlə) və tələbəyə anlaşılan olsun.`,
    messages: [{ role: 'user', content: message }],
  });

  const reply = response.content[0].type === 'text' ? response.content[0].text : 'Cavab alınmadı.';

  return NextResponse.json({ reply });
}