"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  GLOSSARY_TERMS,
  CATEGORY_LABELS,
  LESSON_LABELS,
  type GlossaryCategory,
} from "@/lib/glossary-terms";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

type Tab = "glossary" | "chat";

const ALL_CATEGORIES: GlossaryCategory[] = [
  "drilling", "logging", "reservoir", "production",
  "geology", "fluids", "completion", "hse",
];

const CAT_BADGE: Record<GlossaryCategory, string> = {
  drilling:   "bg-amber-900/40 text-amber-300",
  logging:    "bg-emerald-900/40 text-emerald-300",
  reservoir:  "bg-blue-900/40 text-blue-300",
  production: "bg-orange-900/40 text-orange-300",
  geology:    "bg-lime-900/40 text-lime-300",
  fluids:     "bg-cyan-900/40 text-cyan-300",
  completion: "bg-purple-900/40 text-purple-300",
  hse:        "bg-red-900/40 text-red-300",
};

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlossaryModal({ isOpen, onClose }: GlossaryModalProps) {
  const [tab, setTab] = useState<Tab>("glossary");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<GlossaryCategory | "all">("all");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (isOpen && tab === "glossary") {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [isOpen, tab]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return GLOSSARY_TERMS.filter((t) => {
      const matchCat = activeFilter === "all" || t.cat === activeFilter;
      const matchQ = !q || t.abbr.toLowerCase().includes(q) || t.full.toLowerCase().includes(q) || t.def.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [search, activeFilter]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/glossary-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content ?? "Cavab alına bilmədi." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Xəta baş verdi. Yenidən cəhd edin." }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0D1425] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.06)] shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-xl">📖</span>
              <h2 className="font-['Space_Grotesk'] text-base font-semibold text-[#F0F4FF]">
                Termin Lüğəti
              </h2>
              <span className="text-xs text-[#6B7DA3] bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded-full">
                {GLOSSARY_TERMS.length} termin
              </span>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg text-[#6B7DA3] hover:text-[#F0F4FF] hover:bg-[rgba(255,255,255,0.06)] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-6 pt-3 shrink-0">
            {(["glossary", "chat"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm rounded-t-lg border-b-2 transition-colors font-medium font-['Space_Grotesk'] ${
                  tab === t
                    ? "border-[#FF6B2B] text-[#FF6B2B] bg-[rgba(255,107,43,0.08)]"
                    : "border-transparent text-[#6B7DA3] hover:text-[#F0F4FF]"
                }`}
              >
                {t === "glossary" ? "🔍 Lüğət" : "🤖 AI Chat"}
              </button>
            ))}
          </div>
          <div className="border-b border-[rgba(255,255,255,0.06)] shrink-0" />

          {/* GLOSSARY TAB */}
          {tab === "glossary" && (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="px-6 pt-4 pb-3 shrink-0 space-y-3">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7DA3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Axtar: ROP, GR, OOIP, porosity..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] text-sm text-[#F0F4FF] placeholder-[#4B5A7A] focus:outline-none focus:border-[rgba(255,107,43,0.4)]"
                  />
                  {search && (
                    <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7DA3] hover:text-[#F0F4FF]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="flex gap-1.5 flex-wrap">
                  <button
                    onClick={() => setActiveFilter("all")}
                    className={`px-3 py-1 rounded-full text-xs border transition-all font-['Space_Grotesk'] ${
                      activeFilter === "all"
                        ? "bg-[#FF6B2B] text-white border-[#FF6B2B]"
                        : "border-[rgba(255,255,255,0.1)] text-[#6B7DA3] hover:border-[rgba(255,255,255,0.25)]"
                    }`}
                  >
                    Hamısı
                  </button>
                  {ALL_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-3 py-1 rounded-full text-xs border transition-all font-['Space_Grotesk'] ${
                        activeFilter === cat
                          ? "bg-[#FF6B2B] text-white border-[#FF6B2B]"
                          : "border-[rgba(255,255,255,0.1)] text-[#6B7DA3] hover:border-[rgba(255,255,255,0.25)]"
                      }`}
                    >
                      {CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-[#4B5A7A]">{filtered.length} termin göstərilir</p>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-6">
                {filtered.length === 0 ? (
                  <div className="text-center py-16 text-[#4B5A7A]">
                    <p className="text-4xl mb-3">🔍</p>
                    <p className="text-sm mb-2">Termin tapılmadı.</p>
                    <button onClick={() => setTab("chat")} className="text-[#FF6B2B] hover:text-[#ff8c5a] text-sm underline underline-offset-2">
                      AI-dan soruşun →
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filtered.map((t) => (
                      <div
                        key={`${t.abbr}-${t.cat}`}
                        className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 hover:border-[rgba(255,107,43,0.3)] transition-colors"
                      >
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <div>
                            <span className="font-mono text-base font-semibold text-[#FF6B2B]">{t.abbr}</span>
                            <p className="text-xs text-[#6B7DA3] mt-0.5 leading-snug">{t.full}</p>
                          </div>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${CAT_BADGE[t.cat]}`}>
                            {CATEGORY_LABELS[t.cat]}
                          </span>
                        </div>
                        <p className="text-sm text-[#8B9DC3] leading-relaxed mt-2">{t.def}</p>
                        {t.lesson && (
                          <div className="mt-3 pt-2 border-t border-[rgba(255,255,255,0.05)]">
                            <Link
                              href={`/lessons/${t.lesson}`}
                              onClick={onClose}
                              className="text-xs text-[#4B5A7A] hover:text-[#FF6B2B] flex items-center gap-1 transition-colors w-fit"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                              </svg>
                              {LESSON_LABELS[t.lesson]} dərsinə keç
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI CHAT TAB */}
          {tab === "chat" && (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-10 text-[#4B5A7A]">
                    <p className="text-4xl mb-3">🤖</p>
                    <p className="text-sm font-medium text-[#8B9DC3] mb-1 font-['Space_Grotesk']">Neft-Qaz AI Köməkçisi</p>
                    <p className="text-xs mb-4">İstənilən texniki sualı Azərbaycan dilində soruşun</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["ROP-u artırmaq üçün nə etmək lazımdır?", "Archie tənliyi nədir?", "IPR əyrisi necə qurulur?", "Gas lift prinsipi nədir?"].map((q) => (
                        <button
                          key={q}
                          onClick={() => setInput(q)}
                          className="text-xs px-3 py-1.5 rounded-full border border-[rgba(255,107,43,0.3)] text-[#FF6B2B] hover:bg-[rgba(255,107,43,0.1)] transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#FF6B2B] text-white rounded-br-sm"
                        : "bg-[#111827] border border-[rgba(255,255,255,0.06)] text-[#8B9DC3] rounded-bl-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="w-2 h-2 bg-[#6B7DA3] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)] shrink-0">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    placeholder="Sualınızı yazın... (Enter ilə göndər)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] text-sm text-[#F0F4FF] placeholder-[#4B5A7A] focus:outline-none focus:border-[rgba(255,107,43,0.4)]"
                    disabled={loading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className="px-4 py-2.5 bg-[#FF6B2B] hover:bg-[#e55a1f] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}