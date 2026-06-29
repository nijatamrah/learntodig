import { NextResponse } from "next/server";

export const revalidate = 300;

const RSS_FEEDS = [
  "https://feeds.reuters.com/reuters/businessNews",
  "https://www.eia.gov/rss/todayinenergy.xml",
  "https://www.rigzone.com/news/rss/rigzone_news.aspx",
  "https://oilprice.com/rss/main",
  "https://www.offshore-technology.com/feed/",
  "https://www.worldoil.com/rss",
  "https://www.ogj.com/__rss/website-scheduled-articles.xml/section=DRILLING_PRODUCTION",
  "https://www.ogj.com/__rss/website-scheduled-articles.xml/section=EXPLORATION_DEVELOPMENT",
  "https://energynews.us/feed/",
];

const MAX_AGE_HOURS = 48;

interface NewsItem {
  title: string;
  titleOriginal: string;
  link: string;
  pubDate: string;
  source: string;
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

async function fetchRSS(url: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
      headers: { "User-Agent": "LearntoDig/1.0 RSS Reader" },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return [];

    const text = await res.text();
    const items: NewsItem[] = [];
    const itemMatches = text.matchAll(/<item>([\s\S]*?)<\/item>/g);
    const cutoff = Date.now() - MAX_AGE_HOURS * 60 * 60 * 1000;

    for (const match of itemMatches) {
      const item = match[1];

      const rawTitle =
        item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
        item.match(/<title>(.*?)<\/title>/)?.[1] ||
        "";

      const link =
        item.match(/<link>(.*?)<\/link>/)?.[1] ||
        item.match(/<guid[^>]*>(https?:\/\/[^<]+)<\/guid>/)?.[1] ||
        "";

      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]?.trim() || "";

      if (pubDate) {
        const date = new Date(pubDate);
        if (!isNaN(date.getTime()) && date.getTime() < cutoff) continue;
      }

      const title = decodeEntities(rawTitle.trim());

      if (title && link) {
        items.push({
          title,
          titleOriginal: title,
          link: link.trim(),
          pubDate,
          source: new URL(url).hostname.replace("www.", ""),
        });
      }
    }

    return items.slice(0, 10);
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const results = await Promise.allSettled(RSS_FEEDS.map(fetchRSS));
    const allItems = results
      .filter((r) => r.status === "fulfilled")
      .flatMap((r) => (r as PromiseFulfilledResult<NewsItem[]>).value);

    const seen = new Set<string>();
    const unique = allItems.filter((item) => {
      const key = item.title.toLowerCase().slice(0, 60);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    unique.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime() || 0;
      const dateB = new Date(b.pubDate).getTime() || 0;
      return dateB - dateA;
    });

    return NextResponse.json({
      items: unique.slice(0, 40),
      fetchedAt: new Date().toISOString(),
      total: unique.length,
    });
  } catch {
    return NextResponse.json({ error: "Xəbərlər yüklənmədi" }, { status: 500 });
  }
}