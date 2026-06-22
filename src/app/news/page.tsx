"use client";

import { useEffect, useState } from "react";
import { Newspaper, ExternalLink, Tag, Clock, Zap, ZapOff } from "lucide-react";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  summary?: string;
  tags?: string[];
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const diff = Math.floor((Date.now() - date.getTime()) / 1000 / 60);
  if (diff < 60) return `${diff} dəq əvvəl`;
  if (diff < 1440) return `${Math.floor(diff / 60)} saat əvvəl`;
  return `${Math.floor(diff / 1440)} gün əvvəl`;
}

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setAiEnabled(data.aiEnabled || false);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0F1E] pt-24 pb-16 px-4">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF6B2B]/30 bg-[#FF6B2B]/10 px-3 py-1">
              <Newspaper size={13} className="text-[#FF6B2B]" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#FF6B2B]">
                Xəbərlər
              </span>
            </div>
            <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
              Neft-Qaz Xəbərləri
            </h1>
            <p className="mt-2 text-sm text-white/40">
              Dünya neft-qaz sənayesindən ən son xəbərlər
            </p>
          </div>

          {/* AI badge */}
          <div
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold ${
              aiEnabled
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-white/10 bg-white/5 text-white/30"
            }`}
          >
            {aiEnabled ? <Zap size={13} /> : <ZapOff size={13} />}
            AI {aiEnabled ? "aktiv" : "deaktiv"}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-xl bg-white/[0.04]"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
            Xəbərlər yüklənmədi. Bir az sonra yenidən cəhd edin.
          </div>
        )}

        {/* News list */}
        {!loading && !error && (
          <div className="space-y-3">
            {items.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all hover:border-[#FF6B2B]/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Source + time */}
                    <div className="mb-2 flex items-center gap-3">
                      <span className="rounded-md bg-[#FF6B2B]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FF6B2B]">
                        {item.source}
                      </span>
                      {item.pubDate && (
                        <span className="flex items-center gap-1 text-[11px] text-white/30">
                          <Clock size={10} />
                          {timeAgo(item.pubDate)}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-[14.5px] font-semibold leading-snug text-white/90 group-hover:text-white">
                      {item.title}
                    </h2>

                    {/* AI summary */}
                    {item.summary && (
                      <p className="mt-2 text-[13px] leading-relaxed text-white/50">
                        {item.summary}
                      </p>
                    )}

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-white/40"
                          >
                            <Tag size={9} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <ExternalLink
                    size={15}
                    className="mt-1 shrink-0 text-white/20 transition-colors group-hover:text-[#FF6B2B]"
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}