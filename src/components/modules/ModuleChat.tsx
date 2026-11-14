"use client";

import { useEffect, useRef, useState } from "react";
import type { LearnerMode } from "@/lib/modules/types";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  moduleId: string;
  accent: string;
  mode: LearnerMode;
  sectionTitle?: string;
  placeholder?: string;
}

export default function ModuleChat({ moduleId, accent, mode, sectionTitle, placeholder }: Props) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/module-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, sectionTitle, mode, messages: next }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Cavab alınmadı.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e) {
      setMessages((prev) => prev.slice(0, -1));
      setError(e instanceof Error ? e.message : "Xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] flex flex-col h-[520px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-[13px] text-[#6B82A0] font-['Space_Grotesk']">
            {placeholder ?? "Sualını yaz. Hesablama, anlayış və ya real situasiya üzrə kömək edim."}
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className="max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap font-['Space_Grotesk']"
              style={
                m.role === "user"
                  ? { background: accent + "22", color: "#F0F4FF", border: `1px solid ${accent}40` }
                  : { background: "#101A2E", color: "#D5DEF0", border: "1px solid rgba(255,255,255,0.06)" }
              }
            >
              {m.content || (loading && i === messages.length - 1 ? "…" : "")}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {error && <p className="px-4 pb-2 text-[12px] text-[#F87171] font-['Space_Grotesk']">{error}</p>}

      <div className="border-t border-[rgba(255,255,255,0.06)] p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          maxLength={2000}
          placeholder="Sual yaz…"
          className="flex-1 bg-[#080C18] text-[#F0F4FF] text-[13px] rounded-xl px-3.5 py-2.5 outline-none border border-[rgba(255,255,255,0.08)] focus:border-[rgba(255,255,255,0.2)] font-['Space_Grotesk']"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="px-4 rounded-xl text-[13px] font-semibold disabled:opacity-40 font-['Space_Grotesk']"
          style={{ background: accent, color: "#080C18" }}
        >
          Göndər
        </button>
      </div>
    </div>
  );
}
