import { NextResponse } from "next/server";

export const revalidate = 1800; // 30 dəq cache

const RSS_FEEDS = [
  // ── Ən aktiv / çox xəbər verən ────────────────────────
  "https://oilprice.com/rss/main",
  "https://www.rigzone.com/news/rss/rigzone_news.aspx",
  "https://www.offshore-technology.com/feed/",
  "https://www.worldoil.com/rss",

  // ── OGJ — upstream + drilling + refining ──────────────
  "https://www.ogj.com/__rss/website-scheduled-articles.xml/section=DRILLING_PRODUCTION",
  "https://www.ogj.com/__rss/website-scheduled-articles.xml/section=EXPLORATION_DEVELOPMENT",
  "https://www.ogj.com/__rss/website-scheduled-articles.xml/section=GENERAL_INTEREST",

  // ── Reuters Energy — ən böyük xəbər agentliyi ─────────
  "https://feeds.reuters.com/reuters/businessNews",

  // ── Hydrocarbon Processing — downstream/refining ──────
  "https://www.hydrocarbonprocessing.com/rss/news",

  // ── EIA — rəsmi enerji statistikası ───────────────────
  "https://www.eia.gov/rss/todayinenergy.xml",

  // ── Drilling focused ──────────────────────────────────
  "https://drillingformulas.com/feed",
  "https://drillers.com/feed",

  // ── Qiymət / natural gas ──────────────────────────────
  "https://www.naturalgasintel.com/rss/",
  "https://energynews.us/feed/",
];

interface NewsItem {
  title: string;
  titleOriginal: string;
  link: string;
  pubDate: string;
  source: string;
}

async function fetchRSS(url: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      headers: { "User-Agent": "LearntoDig/1.0" },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return [];

    const text = await res.text();
    const items: NewsItem[] = [];
    const itemMatches = text.matchAll(/<item>([\s\S]*?)<\/item>/g);

    for (const match of itemMatches) {
      const item = match[1];
      const title =
        item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
        item.match(/<title>(.*?)<\/title>/)?.[1] ||
        "";
      const link =
        item.match(/<link>(.*?)<\/link>/)?.[1] ||
        item.match(/<guid>(.*?)<\/guid>/)?.[1] ||
        "";
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";

      if (title && link) {
        items.push({
          title: title.trim(),
          titleOriginal: title.trim(),
          link: link.trim(),
          pubDate: pubDate.trim(),
          source: new URL(url).hostname.replace("www.", ""),
        });
      }
    }

    return items.slice(0, 8);
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

    // Duplicate silmə
    const seen = new Set<string>();
    const unique = allItems.filter((item) => {
      const key = item.title.toLowerCase().slice(0, 60);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Tarixə görə sırala
    unique.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime() || 0;
      const dateB = new Date(b.pubDate).getTime() || 0;
      return dateB - dateA;
    });

    const top30 = unique.slice(0, 30);

    return NextResponse.json({
      items: top30,
      fetchedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Xeberler yuklenмedi" },
      { status: 500 }
    );
  }
}
