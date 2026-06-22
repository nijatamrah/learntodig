import { NextResponse } from "next/server";

const AI_ENABLED = process.env.NEWS_AI_ENABLED === "true";

const RSS_FEEDS = [
  "https://www.rigzone.com/news/rss/rigzone_news.aspx",
  "https://oilprice.com/rss/main",
  "https://www.worldoil.com/rss",
];

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  summary?: string;
  tags?: string[];
}

async function fetchRSS(url: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // 1 saat cache
      headers: { "User-Agent": "LearntoDig/1.0" },
    });
    const text = await res.text();

    const items: NewsItem[] = [];
    const itemMatches = text.matchAll(/<item>([\s\S]*?)<\/item>/g);

    for (const match of itemMatches) {
      const item = match[1];
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
        || item.match(/<title>(.*?)<\/title>/)?.[1]
        || "";
      const link = item.match(/<link>(.*?)<\/link>/)?.[1]
        || item.match(/<guid>(.*?)<\/guid>/)?.[1]
        || "";
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";

      if (title && link) {
        items.push({
          title: title.trim(),
          link: link.trim(),
          pubDate: pubDate.trim(),
          source: new URL(url).hostname.replace("www.", ""),
        });
      }
    }

    return items.slice(0, 8); // Hər mənbədən max 8 xəbər
  } catch {
    return [];
  }
}

async function processWithAI(items: NewsItem[]): Promise<NewsItem[]> {
  if (!AI_ENABLED) return items;

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) return items;

  const processed: NewsItem[] = [];

  for (const item of items) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 200,
          messages: [
            {
              role: "user",
              content: `Bu neft-qaz xəbərini Azərbaycan dilində 2 cümlə ilə xülasə et və mövzuya uyğun 2-3 Azərbaycan dilində teq ver. 
              
Xəbər başlığı: "${item.title}"

Cavabı YALNIZ bu JSON formatında ver, başqa heç nə yazma:
{"summary": "...", "tags": ["...", "..."]}`,
            },
          ],
        }),
      });

      const data = await res.json();
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      processed.push({
        ...item,
        summary: parsed.summary,
        tags: parsed.tags,
      });
    } catch {
      processed.push(item); // AI xəta versə orijinalı göstər
    }
  }

  return processed;
}

export async function GET() {
  try {
    // Bütün RSS feed-ləri paralel çək
    const results = await Promise.all(RSS_FEEDS.map(fetchRSS));
    const allItems = results.flat();

    // Tarixi sıraya düz
    allItems.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime() || 0;
      const dateB = new Date(b.pubDate).getTime() || 0;
      return dateB - dateA;
    });

    // Yalnız ilk 15 xəbəri AI-a göndər
    const top15 = allItems.slice(0, 15);
    const processed = await processWithAI(top15);

    return NextResponse.json({
      items: processed,
      aiEnabled: AI_ENABLED,
      fetchedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Xəbərlər yüklənmədi" }, { status: 500 });
  }
}