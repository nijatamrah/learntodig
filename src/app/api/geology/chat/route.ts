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
    system: `Sən LearntoDig platformasının geologiya müəllimisin. Neft-qaz geologiyası haqqında sualları Azərbaycan dilində sadə və aydın izah edirsən. Litologiya, stratigrafiya, neft tələsi, süxur növləri haqqında ətraflı cavab verirsən. Cavabların qısa (3-5 cümlə) və tələbəyə anlaşılan olsun.`,
    messages: [{ role: 'user', content: message }],
  });

  const reply = response.content[0].type === 'text' ? response.content[0].text : 'Cavab alınmadı.';

  return NextResponse.json({ reply });
}
