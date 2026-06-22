import { NextResponse } from "next/server";

export const revalidate = 300; // 5 dəq cache

// TradingView-dən Brent qiymətini çək, Azeri Light hesabla
async function fetchBrentFromTradingView(): Promise<{ price: number; change: number } | null> {
  try {
    const res = await fetch(
      "https://symbol-search.tradingview.com/symbol_search/v3/?text=BRENT&hl=1&exchange=&lang=en&search_type=undefined&domain=production&sort_by_country=US",
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return null;
    return null;
  } catch {
    return null;
  }
}

// Yahoo Finance-dən pulsuz qiymət çək
async function fetchPrices() {
  const symbols = [
    { symbol: "BZ=F", name: "Brent" },
    { symbol: "CL=F", name: "WTI" },
    { symbol: "NG=F", name: "Natural Gas" },
  ];

  const results = await Promise.allSettled(
    symbols.map(async ({ symbol, name }) => {
      const res = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=2d`,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
          signal: AbortSignal.timeout(8000),
        }
      );
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      const result = data?.chart?.result?.[0];
      const meta = result?.meta;
      const price = meta?.regularMarketPrice ?? 0;
      const prevClose = meta?.chartPreviousClose ?? meta?.previousClose ?? price;
      const change = price - prevClose;
      const changePct = prevClose ? (change / prevClose) * 100 : 0;
      return { name, price, change, changePct };
    })
  );

  const prices = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => (r as PromiseFulfilledResult<{ name: string; price: number; change: number; changePct: number }>).value)
    .filter((p) => p.price > 0);

  // Azeri Light = Brent + ~1.5 USD premium
  const brent = prices.find((p) => p.name === "Brent");
  if (brent) {
    prices.push({
      name: "Azeri Light",
      price: brent.price + 1.5,
      change: brent.change,
      changePct: brent.changePct,
    });
  }

  return prices;
}

export async function GET() {
  try {
    const prices = await fetchPrices();
    return NextResponse.json({ prices });
  } catch {
    return NextResponse.json({ prices: [] });
  }
}