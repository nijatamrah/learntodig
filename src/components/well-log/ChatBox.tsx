"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import type { ChatMessage, LogData } from "@/lib/well-log-types";

interface ChatBoxProps {
  logData: LogData;
  selectedDepth: number | null;
  apiBase: string;
}

export default function ChatBox({ logData, selectedDepth, apiBase }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      text: "Salam! Qrafikdəki istənilən dərinliyə klik et, mən həmin zona haqqında izah verim. Yaxud birbaşa sual yaz.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDepth !== null) {
      setInput(`${selectedDepth.toFixed(1)} ft dərinliyini izah et`);
    }
  }, [selectedDepth]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setLoading(true);
    try {
      const res = await axios.post<{ answer: string }>(`${apiBase}/ask`, {
        question: q,
        depth: selectedDepth,
        log_data: {
          curves: logData.curves,
          depth_key: logData.depth_key,
          well_info: logData.well_info,
          ai_summary: logData.ai_summary,
        },
      });
      setMessages((prev) => [...prev, { role: "ai", text: res.data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Xəta baş verdi, yenidən cəhd edin." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#1a1d2e",
        borderRadius: 10,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          fontSize: "0.78rem",
          color: "#818cf8",
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        💬 AI SUAL-CAVAB
      </div>

      <div
        style={{
          maxHeight: 300,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#4f5b99" : "#252a3d",
              color: "#e2e8f0",
              borderRadius: 10,
              padding: "8px 12px",
              fontSize: "0.82rem",
              maxWidth: "90%",
              lineHeight: 1.55,
            }}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: "flex-start", color: "#64748b", fontSize: "0.8rem" }}>
            Yazır...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Sual yaz..."
          style={{
            flex: 1,
            background: "#0f1117",
            border: "1px solid #2d3148",
            borderRadius: 8,
            padding: "8px 12px",
            color: "#e2e8f0",
            fontSize: "0.85rem",
            outline: "none",
          }}
        />
        <button
          type="button"
          onClick={send}
          disabled={loading}
          style={{
            background: "#4f5b99",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            color: "#fff",
            cursor: "pointer",
            fontSize: "0.85rem",
          }}
        >
          Göndər
        </button>
      </div>
    </div>
  );
}
