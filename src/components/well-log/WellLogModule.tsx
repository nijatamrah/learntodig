"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import WellChart from "./WellChart";
import AISummary from "./AISummary";
import ChatBox from "./ChatBox";
import { getWellLogApiBase } from "@/lib/well-log-client";
import type { LogData } from "@/lib/well-log-types";
import styles from "./well-log.module.css";

export default function WellLogModule() {
  const apiBase = getWellLogApiBase();
  const [logData, setLogData] = useState<LogData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDepth, setSelectedDepth] = useState<number | null>(null);

  const doUpload = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      setLoading(true);
      setError("");
      setLogData(null);
      setSelectedDepth(null);
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
                <ChatBox
                  logData={logData}
                  selectedDepth={selectedDepth}
                  apiBase={apiBase}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
