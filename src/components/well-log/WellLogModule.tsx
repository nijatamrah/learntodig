"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import WellChart from "./WellChart";
import AISummary from "./AISummary";
import WellLogChat from "./WellLogChat";
import { getWellLogApiBase } from "@/lib/well-log-client";
import { buildWellLogExplainPayload } from "@/lib/well-log-explain";
import type { LogData } from "@/lib/well-log-types";
import styles from "./well-log.module.css";

// ─── Sample LAS faylları ───────────────────────────────────────────────────
const SAMPLE_FILES = [
  {
    id: "absheron-oil",
    name: "Absheron-1",
    field: "Abşeron",
    company: "SOCAR",
    zone: "Neft",
    zoneColor: "#ca8a04",
    zoneBg: "rgba(202,138,4,0.12)",
    depth: "10180–10240 ft",
    desc: "Yüksək rezistivlik (2000+ ohm), aşağı GR — klassik neft zonası",
    path: "/las-samples/absheron-oil.las",
    curves: ["GR", "RESD", "NPHI", "RHOB", "DT"],
    highlight: "RESD 2200 ohmm-ə çatır → güclü neft işarəsi",
  },
  {
    id: "shahdeniz-gas",
    name: "Shah Deniz-3",
    field: "Şah Dəniz",
    company: "BP-SOCAR",
    zone: "Qaz",
    zoneColor: "#ef4444",
    zoneBg: "rgba(239,68,68,0.12)",
    depth: "8500–8560 ft",
    desc: "Çox yüksək rezistivlik (23000+ ohm), neytron-sıxlıq krossover — qaz effekti",
    path: "/las-samples/shahdeniz-gas.las",
    curves: ["GR", "RESD", "NPHI", "RHOB", "DT"],
    highlight: "RESD 23000 ohmm — Cənubi Xəzərin ən güclü qaz intervalı",
  },
  {
    id: "guneshli-water",
    name: "Günəşli-7",
    field: "Günəşli",
    company: "SOCAR",
    zone: "Su",
    zoneColor: "#2563eb",
    zoneBg: "rgba(37,99,235,0.12)",
    depth: "6200–6260 ft",
    desc: "Aşağı rezistivlik (12–30 ohm), yüksək NPHI — duzlu su zonası",
    path: "/las-samples/guneshli-water.las",
    curves: ["GR", "RESD", "NPHI", "RHOB", "DT"],
    highlight: "RESD < 30 ohmm — duzlu su doyumu göstəricisi",
  },
];

// ─── LAS fayl strukturunu parse et (modal üçün) ───────────────────────────
function parseLasPreview(text: string) {
  const lines = text.split("\n");
  const sections: { name: string; lines: string[] }[] = [];
  let current: { name: string; lines: string[] } | null = null;
  let dataLines: string[] = [];
  let inData = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("~A")) {
      inData = true;
      current = null;
      continue;
    }
    if (inData) {
      if (trimmed && !trimmed.startsWith("#")) dataLines.push(trimmed);
      continue;
    }
    if (trimmed.startsWith("~")) {
      if (current) sections.push(current);
      current = { name: trimmed, lines: [] };
    } else if (current && trimmed && !trimmed.startsWith("#")) {
      current.lines.push(trimmed);
    }
  }
  if (current) sections.push(current);
  return { sections, dataLines: dataLines.slice(0, 8) };
}

// ─── Modal: LAS faylının içi ──────────────────────────────────────────────
function LasPreviewModal({
  sample,
  onClose,
  onConvert,
}: {
  sample: (typeof SAMPLE_FILES)[0];
  onClose: () => void;
  onConvert: () => void;
}) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useState(() => {
    fetch(sample.path)
      .then((r) => r.text())
      .then((t) => { setContent(t); setLoading(false); })
      .catch(() => { setContent(null); setLoading(false); });
  });

  const preview = content ? parseLasPreview(content) : null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#141824", border: "1px solid #2d3148",
          borderRadius: 16, width: "100%", maxWidth: 720,
          maxHeight: "85vh", display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div style={{
          padding: "16px 20px", borderBottom: "1px solid #2d3148",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f0b429" }}>
              📄 {sample.name} — LAS Fayl Strukturu
            </div>
            <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 2 }}>
              {sample.path}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent", border: "1px solid #2d3148",
              borderRadius: 8, padding: "6px 12px", color: "#94a3b8",
              cursor: "pointer", fontSize: "0.82rem",
            }}
          >
            ✕ Bağla
          </button>
        </div>

        {/* Modal body */}
        <div style={{ flex: 1, overflow: "auto", padding: "16px 20px" }}>
          {loading && (
            <div style={{ color: "#64748b", textAlign: "center", padding: 32 }}>
              Yüklənir...
            </div>
          )}
          {!loading && !preview && (
            <div style={{ color: "#f87171", textAlign: "center", padding: 32 }}>
              Fayl oxunarkən xəta baş verdi
            </div>
          )}
          {preview && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Sections */}
              {preview.sections.map((sec) => (
                <div key={sec.name}>
                  <div style={{
                    fontSize: "0.72rem", fontWeight: 700,
                    color: "#f0b429", letterSpacing: "0.08em",
                    textTransform: "uppercase", marginBottom: 6,
                  }}>
                    {sec.name}
                  </div>
                  <div style={{
                    background: "#0f1117", borderRadius: 8,
                    padding: "10px 14px", fontFamily: "ui-monospace, monospace",
                    fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.7,
                  }}>
                    {sec.lines.map((l, i) => (
                      <div key={i} style={{ display: "flex", gap: 12 }}>
                        <span style={{ color: "#4f5b99", minWidth: 160 }}>
                          {l.split(".")[0]?.trim()}
                        </span>
                        <span style={{ color: "#cbd5e1" }}>
                          {l.split(":")[1]?.trim() ?? ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Data preview */}
              <div>
                <div style={{
                  fontSize: "0.72rem", fontWeight: 700,
                  color: "#34d399", letterSpacing: "0.08em",
                  textTransform: "uppercase", marginBottom: 6,
                }}>
                  ~A — Məlumat (ilk 8 sətir)
                </div>
                <div style={{
                  background: "#0f1117", borderRadius: 8, padding: "10px 14px",
                  fontFamily: "ui-monospace, monospace", fontSize: "0.75rem",
                  color: "#94a3b8", lineHeight: 1.8, overflowX: "auto",
                }}>
                  <div style={{ color: "#4f5b99", marginBottom: 4 }}>
                    DEPT{"        "}GR{"          "}RESD{"        "}NPHI{"        "}RHOB{"        "}DT
                  </div>
                  {preview.dataLines.map((line, i) => (
                    <div key={i} style={{ color: i % 2 === 0 ? "#cbd5e1" : "#94a3b8" }}>
                      {line}
                    </div>
                  ))}
                  <div style={{ color: "#4f5b99", marginTop: 4 }}>
                    ... ({sample.depth} aralığında davam edir)
                  </div>
                </div>
              </div>

              {/* Highlight */}
              <div style={{
                background: "rgba(240,180,41,0.08)", border: "1px solid rgba(240,180,41,0.2)",
                borderRadius: 10, padding: "12px 16px",
                fontSize: "0.82rem", color: "#f0b429", lineHeight: 1.6,
              }}>
                💡 <strong>Əsas işarə:</strong> {sample.highlight}
              </div>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div style={{
          padding: "14px 20px", borderTop: "1px solid #2d3148",
          display: "flex", gap: 10, justifyContent: "flex-end",
        }}>
          <button onClick={onClose} style={{
            background: "transparent", border: "1px solid #2d3148",
            borderRadius: 8, padding: "8px 18px", color: "#94a3b8",
            cursor: "pointer", fontSize: "0.85rem",
          }}>
            Bağla
          </button>
          <button onClick={onConvert} style={{
            background: "#4f5b99", border: "none", borderRadius: 8,
            padding: "8px 20px", color: "#fff", cursor: "pointer",
            fontSize: "0.85rem", fontWeight: 600,
          }}>
            ⚡ Loqa Çevir
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sample Card ──────────────────────────────────────────────────────────
function SampleCard({
  sample,
  onPreview,
  onConvert,
  converting,
}: {
  sample: (typeof SAMPLE_FILES)[0];
  onPreview: () => void;
  onConvert: () => void;
  converting: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.04)" : "#1a1d2e",
        border: `1px solid ${hovered ? sample.zoneColor + "60" : "#2d3148"}`,
        borderRadius: 14, padding: "18px 20px",
        transition: "all 0.18s", cursor: "default",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${sample.zoneColor}, transparent)`,
      }} />

      {/* Zone badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em",
          textTransform: "uppercase", padding: "3px 10px", borderRadius: 6,
          background: sample.zoneBg, color: sample.zoneColor,
          border: `1px solid ${sample.zoneColor}40`,
        }}>
          {sample.zone}
        </span>
        <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{sample.depth}</span>
      </div>

      {/* Well name */}
      <div style={{ fontSize: "1rem", fontWeight: 700, color: "#e2e8f0", marginBottom: 2 }}>
        {sample.name}
      </div>
      <div style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 10 }}>
        {sample.field} · {sample.company}
      </div>

      {/* Curves */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {sample.curves.map((c) => (
          <span key={c} style={{
            fontSize: "0.68rem", fontWeight: 600, padding: "2px 8px",
            borderRadius: 4, background: "rgba(79,91,153,0.2)",
            color: "#a5b4fc", border: "1px solid rgba(79,91,153,0.3)",
          }}>{c}</span>
        ))}
      </div>

      {/* Description */}
      <div style={{
        fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.55, marginBottom: 16,
      }}>
        {sample.desc}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={onPreview}
          style={{
            flex: 1, background: "transparent",
            border: "1px solid #2d3148", borderRadius: 8,
            padding: "8px 12px", color: "#94a3b8", cursor: "pointer",
            fontSize: "0.8rem", fontWeight: 500,
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#4f5b99";
            e.currentTarget.style.color = "#a5b4fc";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#2d3148";
            e.currentTarget.style.color = "#94a3b8";
          }}
        >
          🔍 İçinə bax
        </button>
        <button
          onClick={onConvert}
          disabled={converting}
          style={{
            flex: 1, background: converting ? "#2d3148" : "#4f5b99",
            border: "none", borderRadius: 8,
            padding: "8px 12px", color: "#fff", cursor: converting ? "not-allowed" : "pointer",
            fontSize: "0.8rem", fontWeight: 600,
            transition: "background 0.15s",
            opacity: converting ? 0.7 : 1,
          }}
        >
          {converting ? "Yüklənir..." : "⚡ Loqa çevir"}
        </button>
      </div>
    </div>
  );
}

// ─── Ana Modul ────────────────────────────────────────────────────────────
export default function WellLogModule() {
  const apiBase = getWellLogApiBase();
  const [logData, setLogData] = useState<LogData | null>(null);
  const [loading, setLoading] = useState(false);
  const [convertingId, setConvertingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [selectedDepth, setSelectedDepth] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [aiExplainLoading, setAiExplainLoading] = useState(false);
  const [aiExplainError, setAiExplainError] = useState<string | null>(null);
  const [showAiExplain, setShowAiExplain] = useState(false);
  const [previewSample, setPreviewSample] = useState<(typeof SAMPLE_FILES)[0] | null>(null);

  const doUpload = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      setLoading(true);
      setError("");
      setLogData(null);
      setSelectedDepth(null);
      setExplanation(null);
      setAiExplainError(null);
      setShowAiExplain(false);
      const form = new FormData();
      form.append("file", file);
      try {
        const res = await axios.post<LogData>(`${apiBase}/upload`, form);
        setLogData(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const detail = err.response?.data?.detail;
          setError(typeof detail === "string" ? detail : "Fayl yüklənərkən xəta baş verdi");
        } else {
          setError("Fayl yüklənərkən xəta baş verdi");
        }
      } finally {
        setLoading(false);
        setConvertingId(null);
      }
    },
    [apiBase],
  );

  // Sample faylı fetch edib upload et
  const handleSampleConvert = useCallback(
    async (sample: (typeof SAMPLE_FILES)[0]) => {
      setConvertingId(sample.id);
      setPreviewSample(null);
      try {
        const res = await fetch(sample.path);
        const blob = await res.blob();
        const file = new File([blob], `${sample.id}.las`, { type: "text/plain" });
        await doUpload(file);
      } catch {
        setError("Nümunə fayl yüklənərkən xəta baş verdi");
        setConvertingId(null);
      }
    },
    [doUpload],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    void doUpload(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    void doUpload(e.dataTransfer.files[0]);
  };

  const handleExplain = async () => {
    if (!logData) return;
    setShowAiExplain(true);
    setAiExplainLoading(true);
    setAiExplainError(null);
    try {
      const res = await fetch("/api/well-log/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildWellLogExplainPayload(logData, selectedDepth)),
      });
      const data = (await res.json()) as { explanation?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Xəta baş verdi");
      setExplanation(data.explanation ?? "");
    } catch (err) {
      setExplanation(null);
      setAiExplainError(err instanceof Error ? err.message : "İzah alınarkən xəta baş verdi");
    } finally {
      setAiExplainLoading(false);
    }
  };

  return (
    <div className={styles.wellLog}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>⛽ WellLogAI</span>
          <span className={styles.tagline}>LAS loq analizi · AI ilə gücləndirilmiş</span>
        </div>
        <Link href="/" className={styles.backLink}>← LearntoDig</Link>
      </header>

      <div className={styles.intro}>
        <h2 className={styles.introTitle}>Loq analizi laboratoriyası</h2>
        <p className={styles.introText}>
          LAS faylını yüklə, quyu loqlarını vizuallaşdır və AI-dan intervallar haqqında sual ver.
        </p>
      </div>

      <main className={styles.main}>
        {!logData ? (
          <div className={styles.workspace} style={{ maxWidth: 900 }}>

            {/* Sample fayllar */}
            <div style={{ marginBottom: 32 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 16,
              }}>
                <span style={{
                  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "#64748b",
                }}>
                  Nümunə LAS Faylları
                </span>
                <div style={{ flex: 1, height: 1, background: "#2d3148" }} />
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 12,
              }}>
                {SAMPLE_FILES.map((sample) => (
                  <SampleCard
                    key={sample.id}
                    sample={sample}
                    onPreview={() => setPreviewSample(sample)}
                    onConvert={() => void handleSampleConvert(sample)}
                    converting={convertingId === sample.id}
                  />
                ))}
              </div>
            </div>

            {/* Öz faylını yüklə */}
            <div style={{ marginBottom: 16 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 16,
              }}>
                <span style={{
                  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "#64748b",
                }}>
                  Öz Faylını Yüklə
                </span>
                <div style={{ flex: 1, height: 1, background: "#2d3148" }} />
              </div>

              <div
                className={styles.uploadZone}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                style={{ padding: "32px 48px" }}
              >
                <div className={styles.uploadIcon}>📂</div>
                <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                  LAS faylını buraya sürüşdür və ya seç
                </p>
                <label className={styles.btn}>
                  Fayl seç
                  <input type="file" accept=".las" onChange={handleFileInput} hidden />
                </label>
                {loading && (
                  <p className={styles.status}>Analiz edilir, zəhmət olmasa gözləyin...</p>
                )}
                {error && <p className={styles.error}>{error}</p>}
              </div>
            </div>
          </div>
        ) : (
          // ─── Workspace: loq yükləndikdən sonra ───────────────────────────
          <div className={styles.workspace}>
            <div className={styles.topBar}>
              <div className={styles.wellInfo}>
                <strong>{logData.well_info?.well || "Quyu"}</strong>
                {logData.well_info?.field && <span> · {logData.well_info.field}</span>}
                {logData.well_info?.company && <span> · {logData.well_info.company}</span>}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className={`${styles.btn} ${styles.btnSmall}`}
                  onClick={() => setLogData(null)}
                  style={{ background: "transparent", border: "1px solid #2d3148", color: "#94a3b8" }}
                >
                  ← Geri
                </button>
                <label className={`${styles.btn} ${styles.btnSmall}`}>
                  Yeni fayl
                  <input type="file" accept=".las" onChange={handleFileInput} hidden />
                </label>
              </div>
            </div>

            <div className={styles.contentGrid}>
              <div className={styles.chartPanel}>
                <WellChart
                  logData={logData}
                  onDepthSelect={setSelectedDepth}
                  selectedDepth={selectedDepth}
                />
              </div>
              <div className={styles.sidePanel}>
                <AISummary summary={logData.ai_summary} />
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => void handleExplain()}
                  disabled={aiExplainLoading}
                >
                  {aiExplainLoading ? "Yüklənir…" : "AI ilə izah et"}
                </button>
              </div>
            </div>

            {showAiExplain && (
              <section className={styles.aiExplainSection}>
                <div className={styles.aiExplainTitle}>AI izahı</div>
                {aiExplainLoading && (
                  <div className={styles.aiExplainLoading}>
                    <span className={styles.aiExplainSpinner} aria-hidden />
                    AI izah hazırlanır…
                  </div>
                )}
                {!aiExplainLoading && aiExplainError && (
                  <p className={styles.aiExplainError}>{aiExplainError}</p>
                )}
                {!aiExplainLoading && !aiExplainError && explanation && (
                  <p className={styles.aiExplainText}>{explanation}</p>
                )}
              </section>
            )}

            <WellLogChat logData={logData} selectedDepth={selectedDepth} />
          </div>
        )}
      </main>

      {/* Modal */}
      {previewSample && (
        <LasPreviewModal
          sample={previewSample}
          onClose={() => setPreviewSample(null)}
          onConvert={() => void handleSampleConvert(previewSample)}
        />
      )}
    </div>
  );
}