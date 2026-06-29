"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

interface NewsItem {
  title: string;
  titleOriginal: string;
  link: string;
  pubDate: string;
  source: string;
}

interface OilPrice {
  name: string;
  price: number;
  change: number;
  changePct: number;
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const diff = Math.floor((Date.now() - date.getTime()) / 1000 / 60);
  if (diff < 60) return diff + " dəq əvvəl";
  if (diff < 1440) return Math.floor(diff / 60) + " saat əvvəl";
  return Math.floor(diff / 1440) + " gün əvvəl";
}

// Mənbəyə görə rəng sistemi
function getSourceStyle(source: string) {
  if (source.includes("oilprice"))
    return { bar: "from-[#FF6B2B] to-[#FF8C5A]", badge: "bg-[#FF6B2B]/15 text-[#FF8C5A]", label: "OilPrice" };
  if (source.includes("rigzone"))
    return { bar: "from-[#3B82F6] to-[#60A5FA]", badge: "bg-blue-500/15 text-blue-300", label: "RigZone" };
  if (source.includes("eia"))
    return { bar: "from-[#10B981] to-[#34D399]", badge: "bg-emerald-500/15 text-emerald-300", label: "EIA" };
  if (source.includes("reuters"))
    return { bar: "from-[#F59E0B] to-[#FCD34D]", badge: "bg-amber-500/15 text-amber-300", label: "Reuters" };
  if (source.includes("ogj"))
    return { bar: "from-[#8B5CF6] to-[#A78BFA]", badge: "bg-violet-500/15 text-violet-300", label: "OGJ" };
  if (source.includes("worldoil"))
    return { bar: "from-[#EC4899] to-[#F472B6]", badge: "bg-pink-500/15 text-pink-300", label: "World Oil" };
  if (source.includes("offshore"))
    return { bar: "from-[#06B6D4] to-[#22D3EE]", badge: "bg-cyan-500/15 text-cyan-300", label: "Offshore Tech" };
  return { bar: "from-[#6B7280] to-[#9CA3AF]", badge: "bg-white/10 text-white/40", label: source };
}

function PriceCard({ item }: { item: OilPrice }) {
  const isUp = item.change >= 0;
  return (
    <div className={`relative flex-shrink-0 min-w-[148px] rounded-xl border bg-white/[0.03] px-4 py-3 overflow-hidden transition-all hover:border-[#FF6B2B]/30 ${isUp ? "border-white/[0.06]" : "border-white/[0.06]"}`}>
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${isUp ? "from-emerald-500 to-transparent" : "from-red-500 to-transparent"}`} />
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">{item.name}</p>
      <p className="text-[21px] font-extrabold tracking-tight text-white">${item.price.toFixed(2)}</p>
      <p className={`mt-1 text-[11px] font-semibold flex items-center gap-1 ${isUp ? "text-emerald-400" : "text-red-400"}`}>
        {isUp ? "▲" : "▼"} {isUp ? "+" : ""}{item.change.toFixed(2)} ({isUp ? "+" : ""}{item.changePct.toFixed(2)}%)
      </p>
    </div>
  );
}

const SOURCES = ["Hamısı", "OilPrice", "RigZone", "Reuters", "EIA", "OGJ"];

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [prices, setPrices] = useState<OilPrice[]>([]);
  const [pricesLoading, setPricesLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Hamısı");

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data) => { setItems(data.items || []); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  useEffect(() => {
    fetch("/api/prices")
      .then((r) => r.json())
      .then((data) => { setPrices(data.prices || []); setPricesLoading(false); })
      .catch(() => setPricesLoading(false));
  }, []);

  const filtered = activeFilter === "Hamısı"
    ? items
    : items.filter((i) => getSourceStyle(i.source).label.toLowerCase().includes(activeFilter.toLowerCase()));

  const breaking = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <main className="min-h-screen bg-[#070C1A] pt-24 pb-16 px-4">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF6B2B]/30 bg-[#FF6B2B]/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B2B] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B2B]">Canlı Xəbərlər</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-[#FF6B2B] bg-clip-text text-transparent">
            Neft-Qaz Xəbərləri
          </h1>
          <p className="mt-2 text-sm text-white/30">
            Dünya neft-qaz sənayesindən ən son xəbərlər · Hər 5 dəqiqədə yenilənir
          </p>
        </div>

        {/* Price ticker */}
        <div className="mb-8">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/20">Canlı Qiymətlər</p>
          {pricesLoading ? (
            <div className="flex gap-3">
              {[0,1,2,3].map((i) => (
                <div key={i} className="h-[84px] w-[148px] shrink-0 animate-pulse rounded-xl bg-white/[0.04]" />
              ))}
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {prices.map((p) => <PriceCard key={p.name} item={p} />)}
            </div>
          )}
        </div>

        {/* Filter bar */}
        <div className="mb-6 flex flex-wrap gap-2">
          {SOURCES.map((src) => (
            <button
              key={src}
              onClick={() => setActiveFilter(src)}
              className={`rounded-full px-4 py-1.5 text-[12px] font-semibold border transition-all ${
                activeFilter === src
                  ? "bg-[#FF6B2B]/15 border-[#FF6B2B]/50 text-[#FF6B2B]"
                  : "bg-white/[0.03] border-white/[0.07] text-white/40 hover:border-[#FF6B2B]/30 hover:text-white/70"
              }`}
            >
              {src}
            </button>
          ))}
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-2">
            {[0,1,2,3,4,5].map((i) => (
              <div key={i} className="h-[76px] animate-pulse rounded-xl bg-white/[0.03]" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400 text-sm">
            Xəbərlər yüklənmədi. Bir az sonra yenidən cəhd edin.
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Breaking / Son xəbərlər */}
            {breaking.length > 0 && (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">🔴 Son Xəbərlər</span>
                  <div className="flex-1 h-px bg-white/[0.05]" />
                </div>
                <div className="space-y-2 mb-6">
                  {breaking.map((item, i) => {
                    const style = getSourceStyle(item.source);
                    return (
                      <a key={item.link + i} href={item.link} target="_blank" rel="noopener noreferrer"
                        className="group flex items-stretch rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden transition-all hover:border-[#FF6B2B]/25 hover:bg-white/[0.05] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                      >
                        {/* Rəngli sol bar */}
                        <div className={`w-[3px] shrink-0 bg-gradient-to-b ${style.bar}`} />
                        <div className="flex-1 px-5 py-4">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md ${style.badge}`}>
                              {style.label}
                            </span>
                            {i === 0 && (
                              <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300">
                                Breaking
                              </span>
                            )}
                            {i === 1 && (
                              <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300">
                                Trending
                              </span>
                            )}
                            {item.pubDate && (
                              <span className="text-[11px] text-white/25">⏱ {timeAgo(item.pubDate)}</span>
                            )}
                          </div>
                          <h2 className="text-[14px] font-semibold leading-snug text-white/85 group-hover:text-white transition-colors">
                            {item.title}
                          </h2>
                        </div>
                        <div className="flex items-center px-4 text-white/15 group-hover:text-[#FF6B2B] transition-colors">
                          <ExternalLink size={14} />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Daha Çox</span>
                  <div className="flex-1 h-px bg-white/[0.05]" />
                </div>
                <div className="space-y-2">
                  {rest.map((item, i) => {
                    const style = getSourceStyle(item.source);
                    return (
                      <a key={item.link + i} href={item.link} target="_blank" rel="noopener noreferrer"
                        className="group flex items-stretch rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden transition-all hover:border-[#FF6B2B]/25 hover:bg-white/[0.05] hover:-translate-y-0.5"
                      >
                        <div className={`w-[3px] shrink-0 bg-gradient-to-b ${style.bar}`} />
                        <div className="flex-1 px-5 py-4">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md ${style.badge}`}>
                              {style.label}
                            </span>
                            {item.pubDate && (
                              <span className="text-[11px] text-white/25">⏱ {timeAgo(item.pubDate)}</span>
                            )}
                          </div>
                          <h2 className="text-[14px] font-semibold leading-snug text-white/85 group-hover:text-white transition-colors">
                            {item.title}
                          </h2>
                        </div>
                        <div className="flex items-center px-4 text-white/15 group-hover:text-[#FF6B2B] transition-colors">
                          <ExternalLink size={14} />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}