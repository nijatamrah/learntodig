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

export default function WellLogModule() {
  const apiBase = getWellLogApiBase();
  const [logData, setLogData] = useState<LogData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDepth, setSelectedDepth] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [aiExplainLoading, setAiExplainLoading] = useState(false);
  const [aiExplainError, setAiExplainError] = useState<string | null>(null);
  const [showAiExplain, setShowAiExplain] = useState(false);

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
          setError(
            typeof detail === "string"
              ? detail
              : "Fayl yüklənərkən xəta baş verdi",
          );
        } else {
          setError("Fayl yüklənərkən xəta baş verdi");
        }
      } finally {
        setLoading(false);
      }
    },
    [apiBase],
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
        body: JSON.stringify(
          buildWellLogExplainPayload(logData, selectedDepth),
        ),
      });

      const data = (await res.json()) as { explanation?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Xəta baş verdi");
      }

      setExplanation(data.explanation ?? "");
    } catch (err) {
      setExplanation(null);
      setAiExplainError(
        err instanceof Error ? err.message : "İzah alınarkən xəta baş verdi",
      );
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
        <Link href="/" className={styles.backLink}>
          ← LearntoDig
        </Link>
      </header>

      <div className={styles.intro}>
        <h2 className={styles.introTitle}>Loq analizi laboratoriyası</h2>
        <p className={styles.introText}>
          LAS faylını yüklə, quyu loqlarını vizuallaşdır və AI-dan intervallar haqqında
          sual ver.
        </p>
      </div>

      <main className={styles.main}>
        {!logData ? (
          <div
            className={styles.uploadZone}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className={styles.uploadIcon}>📂</div>
            <p>LAS faylını buraya sürüşdür və ya seç</p>
            <label className={styles.btn}>
              Fayl seç
              <input type="file" accept=".las" onChange={handleFileInput} hidden />
            </label>
            {loading && <p className={styles.status}>Analiz edilir, zəhmət olmasa gözləyin...</p>}
            {error && <p className={styles.error}>{error}</p>}
          </div>
        ) : (
          <div className={styles.workspace}>
            <div className={styles.topBar}>
              <div className={styles.wellInfo}>
                <strong>{logData.well_info?.well || "Quyu"}</strong>
                {logData.well_info?.field && <span> · {logData.well_info.field}</span>}
                {logData.well_info?.company && <span> · {logData.well_info.company}</span>}
              </div>
              <label className={`${styles.btn} ${styles.btnSmall}`}>
                Yeni fayl
                <input type="file" accept=".las" onChange={handleFileInput} hidden />
              </label>
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
    </div>
  );
}
