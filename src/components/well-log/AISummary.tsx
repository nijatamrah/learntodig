"use client";

interface AISummaryProps {
  summary?: string;
}

export default function AISummary({ summary }: AISummaryProps) {
  return (
    <div
      style={{
        background: "#1a1d2e",
        borderRadius: 10,
        padding: 16,
        borderLeft: "3px solid #f0b429",
      }}
    >
      <div
        style={{
          fontSize: "0.78rem",
          color: "#f0b429",
          fontWeight: 700,
          marginBottom: 8,
          letterSpacing: 1,
        }}
      >
        🤖 AI PROAKTİV ANALİZ
      </div>
      <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.65 }}>
        {summary || "Analiz edilir..."}
      </p>
    </div>
  );
}
