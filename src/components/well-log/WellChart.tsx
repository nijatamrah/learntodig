"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { LogData, ZoneType } from "@/lib/well-log-types";
import styles from "./well-log.module.css";

const ZONE_COLORS: Record<ZoneType, string> = {
  oil: "rgba(234, 179, 8,  0.25)",
  gas: "rgba(239, 68, 68, 0.22)",
  water: "rgba(59, 130, 246, 0.22)",
  shale: "rgba(107, 114, 128, 0.15)",
  unknown: "rgba(0,0,0,0)",
};

const LOG_PALETTE = ["#818cf8", "#fb923c", "#34d399", "#f472b6", "#60a5fa"];

interface WellChartProps {
  logData: LogData;
  onDepthSelect: (depth: number) => void;
  selectedDepth: number | null;
}

interface TooltipState {
  depth: string;
  zone: ZoneType;
  vals: Record<string, number | null>;
  x: number;
  y: number;
}

export default function WellChart({ logData, onDepthSelect, selectedDepth }: WellChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const { curves, depth_key, curve_names, zones } = logData;
  const depths = curves[depth_key] || [];

  useEffect(() => {
    const priority = ["GR", "RESD", "RT", "ILD", "DT", "SP"];
    const sorted = [...curve_names].sort((a, b) => {
      const ia = priority.findIndex((p) => a.toUpperCase().includes(p));
      const ib = priority.findIndex((p) => b.toUpperCase().includes(p));
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
    setActiveKeys(sorted.slice(0, 2));
  }, [curve_names]);

  const toggleKey = (key: string) => {
    setActiveKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const getColor = useCallback(
    (key: string) => {
      const idx = curve_names.indexOf(key);
      return LOG_PALETTE[idx % LOG_PALETTE.length];
    },
    [curve_names],
  );

  const normalise = useCallback(
    (key: string) => {
      const vals = curves[key].filter((v): v is number => v !== null && isFinite(v));
      const min = Math.min(...vals);
      const max = Math.max(...vals);
      const range = max - min || 1;
      return {
        min,
        max,
        norm: curves[key].map((v) => (v === null ? null : (v - min) / range)),
      };
    },
    [curves],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || depths.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const PAD = { top: 20, bottom: 20, left: 60, right: 20 };
    const chartH = H - PAD.top - PAD.bottom;
    const chartW = W - PAD.left - PAD.right;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#1a1d2e";
    ctx.fillRect(0, 0, W, H);

    const n = depths.length;
    const depthToY = (d: number) => {
      const minD = depths[0] ?? 0;
      const maxD = depths[n - 1] ?? 1;
      return PAD.top + ((d - minD) / (maxD - minD)) * chartH;
    };

    let prevZone: ZoneType | null = null;
    let zoneStart = depths[0] ?? 0;
    for (let i = 0; i < n; i++) {
      const z = zones[i];
      if (z !== prevZone || i === n - 1) {
        if (prevZone !== null) {
          const y1 = depthToY(zoneStart);
          const y2 = depthToY(depths[i] ?? 0);
          ctx.fillStyle = ZONE_COLORS[prevZone] ?? ZONE_COLORS.unknown;
          ctx.fillRect(PAD.left, y1, chartW, y2 - y1);
        }
        prevZone = z;
        zoneStart = depths[i] ?? 0;
      }
    }

    ctx.strokeStyle = "#2d3148";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 5; i++) {
      const y = PAD.top + (i / 5) * chartH;
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(W - PAD.right, y);
      ctx.stroke();
      const d = (depths[0] ?? 0) + (i / 5) * ((depths[n - 1] ?? 0) - (depths[0] ?? 0));
      ctx.fillStyle = "#64748b";
      ctx.font = "11px system-ui";
      ctx.textAlign = "right";
      ctx.fillText(d.toFixed(0), PAD.left - 4, y + 4);
    }

    activeKeys.forEach((key) => {
      if (!curves[key]) return;
      const { norm } = normalise(key);
      const color = getColor(key);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < n; i++) {
        const v = norm[i];
        if (v === null) {
          started = false;
          continue;
        }
        const x = PAD.left + v * chartW;
        const y = depthToY(depths[i] ?? 0);
        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    });

    if (selectedDepth !== null) {
      const y = depthToY(selectedDepth);
      ctx.strokeStyle = "#f0b429";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(W - PAD.right, y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px system-ui";
    ctx.textAlign = "left";
    ctx.fillText("ft", 4, PAD.top + chartH / 2);
  }, [depths, zones, activeKeys, normalise, selectedDepth, curves, getColor]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas || depths.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const PAD_TOP = 20;
      const PAD_BOT = 20;
      const chartH = canvas.height - PAD_TOP - PAD_BOT;
      const t = Math.max(0, Math.min(1, (y - PAD_TOP) / chartH));
      const minD = depths[0] ?? 0;
      const maxD = depths[depths.length - 1] ?? 0;
      const depth = minD + t * (maxD - minD);
      const idx = depths.reduce<number>(
        (best, d, i) =>
          Math.abs((d ?? 0) - depth) < Math.abs((depths[best] ?? 0) - depth) ? i : best,
        0,
      );

      const vals: Record<string, number | null> = {};
      activeKeys.forEach((k) => {
        if (curves[k]) vals[k] = curves[k][idx];
      });
      setTooltip({
        depth: depths[idx]?.toFixed(1) ?? "",
        zone: zones[idx],
        vals,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [depths, zones, activeKeys, curves],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas || depths.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const PAD_TOP = 20;
      const PAD_BOT = 20;
      const chartH = canvas.height - PAD_TOP - PAD_BOT;
      const t = Math.max(0, Math.min(1, (y - PAD_TOP) / chartH));
      const minD = depths[0] ?? 0;
      const maxD = depths[depths.length - 1] ?? 0;
      const depth = minD + t * (maxD - minD);
      const idx = depths.reduce<number>(
        (best, d, i) =>
          Math.abs((d ?? 0) - depth) < Math.abs((depths[best] ?? 0) - depth) ? i : best,
        0,
      );
      const selected = depths[idx];
      if (selected != null) onDepthSelect(selected);
    },
    [depths, onDepthSelect],
  );

  return (
    <div>
      <div className={styles.logToggles}>
        {curve_names.map((key, i) => (
          <button
            key={key}
            type="button"
            className={`${styles.logToggle} ${activeKeys.includes(key) ? styles.logToggleActive : ""}`}
            style={{
              borderColor: LOG_PALETTE[i % LOG_PALETTE.length],
              color: LOG_PALETTE[i % LOG_PALETTE.length],
            }}
            onClick={() => toggleKey(key)}
          >
            {key}
          </button>
        ))}
      </div>

      <div className={styles.legend}>
        {(
          Object.entries({
            oil: "#ca8a04",
            gas: "#dc2626",
            water: "#2563eb",
            shale: "#6b7280",
          }) as [ZoneType, string][]
        ).map(([z, c]) => (
          <div key={z} className={styles.legendItem}>
            <div className={styles.legendDot} style={{ background: c }} />
            {z === "oil" ? "Neft" : z === "gas" ? "Qaz" : z === "water" ? "Su" : "Şal"}
          </div>
        ))}
      </div>

      <div ref={containerRef} style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={700}
          height={600}
          style={{ width: "100%", cursor: "crosshair", borderRadius: 8 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltip(null)}
          onClick={handleClick}
        />
        {tooltip && (
          <div
            style={{
              position: "absolute",
              left: tooltip.x + 12,
              top: tooltip.y - 20,
              background: "#0f1117cc",
              border: "1px solid #2d3148",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: "0.78rem",
              pointerEvents: "none",
              backdropFilter: "blur(4px)",
            }}
          >
            <div style={{ color: "#f0b429", fontWeight: 700 }}>{tooltip.depth} ft</div>
            <div style={{ color: "#94a3b8", marginBottom: 4 }}>{tooltip.zone}</div>
            {Object.entries(tooltip.vals).map(([k, v]) => (
              <div key={k}>
                {k}: <strong>{v?.toFixed(2) ?? "N/A"}</strong>
              </div>
            ))}
            <div style={{ color: "#64748b", marginTop: 4, fontSize: "0.72rem" }}>
              Klik et → AI izah etsin
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
