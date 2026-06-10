"use client";

import { useEffect, useRef, useState } from "react";
import { buildWellLogChatContext } from "@/lib/well-log-explain";
import type { ChatMessage, LogData } from "@/lib/well-log-types";
import styles from "./well-log.module.css";

interface WellLogChatProps {
  logData: LogData;
  selectedDepth: number | null;
}

export default function WellLogChat({ logData, selectedDepth }: WellLogChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      text: "Salam! Loq datası haqqında ümumi və ya konkret dərinlik sualları verə bilərsiniz. Məsələn: «10238 ft-də niyə neft zonası var?»",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const question = input.trim();
    if (!question || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.role === "user" || m.role === "ai")
        .map((m) => ({
          role: m.role === "user" ? ("user" as const) : ("assistant" as const),
          content: m.text,
        }));

      const res = await fetch("/api/well-log/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          logContext: buildWellLogChatContext(logData, question, selectedDepth),
          history,
        }),
      });

      const data = (await res.json()) as { answer?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Xəta baş verdi");
      }

      setMessages((prev) => [...prev, { role: "ai", text: data.answer ?? "" }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            err instanceof Error
              ? err.message
              : "Xəta baş verdi, yenidən cəhd edin.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.chatSection}>
      <h3 className={styles.chatTitle}>AI Sual-Cavab</h3>
      <p className={styles.chatHint}>
        Loq datası kontekstində ümumi və dərinlikə aid suallar · Claude Sonnet
      </p>

      <div className={styles.chatMessages}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${styles.chatBubble} ${
              m.role === "user" ? styles.chatBubbleUser : styles.chatBubbleAi
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className={styles.chatLoading}>
            <span className={styles.aiExplainSpinner} aria-hidden />
            Cavab hazırlanır…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className={styles.chatInputRow}>
        <input
          className={styles.chatInput}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && void send()}
          placeholder={
            selectedDepth != null
              ? `Məs: ${selectedDepth.toFixed(0)} ${logData.depth_key} dərinliyini izah et…`
              : "Sualınızı yazın…"
          }
          disabled={loading}
        />
        <button
          type="button"
          className={`${styles.btn} ${styles.btnSmall}`}
          onClick={() => void send()}
          disabled={loading || !input.trim()}
        >
          Göndər
        </button>
      </div>
    </section>
  );
}
