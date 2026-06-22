"use client";

import { useEffect, useState } from "react";
import { Newspaper, ExternalLink, Clock } from "lucide-react";

interface NewsItem {
  title: string;
  titleOriginal: string;
  link: string;
  pubDate: string;
  source: string;
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const diff = Math.floor((Date.now() - date.getTime()) / 1000 / 60);
  if (diff < 60) return diff + " dəq əvvəl";
  if (diff < 1440) return Math.floor(diff / 60) + " saat əvvəl";
  return Math.floor(diff / 1440) + " gün əvvəl";
}

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
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

        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF6B2B]/30 bg-[#FF6B2B]/10 px-3 py-1">
            <Newspaper size={13} className="text-[#FF6B2B]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#FF6B2B]">
              Xeberler
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Neft-Qaz Xeberleri
          </h1>
          <p className="mt-2 text-sm text-white/40">
            Dunya neft-qaz senayesinden en son xeberler
          </p>
        </div>

        {loading && (
          <div className="space-y-4">
            {[0,1,2,3,4,5].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl bg-white/[0.04]" />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
            Xeberler yuklenмedi. Bir az sonra yeniden cehd edin.
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-3">
            {items.map((item, i) => (
              <a
                key={item.link + i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all hover:border-[#FF6B2B]/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
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
                    <h2 className="text-[14.5px] font-semibold leading-snug text-white/90 group-hover:text-white">
                      {item.title}
                    </h2>
                    {item.titleOriginal && item.titleOriginal !== item.title && (
                      <p className="mt-1 text-[12px] text-white/25 italic">
                        {item.titleOriginal}
                      </p>
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
