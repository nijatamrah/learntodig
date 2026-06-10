"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { LogData, ZoneType } from "@/lib/well-log-types";
import { zoneLabel } from "@/lib/well-log-explain";
import styles from "./well-log.module.css";

const ZONE_COLORS: Record<ZoneType, string> = {
  oil: "rgba(202, 138, 4, 0.32)",
  gas: "rgba(239, 68, 68, 0.28)",
  water: "rgba(37, 99, 235, 0.28)",
  shale: "rgba(100, 116, 139, 0.2)",
  unknown: "rgba(0, 0, 0, 0)",
};

const ZONE_BORDER: Record<ZoneType, string> = {
  oil: "rgba(202, 138, 4, 0.5)",
  gas: "rgba(239, 68, 68, 0.45)",
  water: "rgba(37, 99, 235, 0.45)",
  shale: "rgba(100, 116, 139, 0.35)",
  unknown: "transparent",
};

const LOG_PALETTE = ["#a5b4fc", "#fb923c", "#34d399", "#f472b6", "#38bdf8"];

const PAD = { top: 28, bottom: 24, left: 76, right: 24 };
const GRID_LINES = 8;

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

function clampIndex(idx: number, n: number): number {
  if (n <= 1) return 0;
  return Math.max(0, Math.min(n - 1, idx));
}

export default function WellChart({ logData, onDepthSelect, selectedDepth }: WellChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const { curves, depth_key, curve_names, zones } = logData;
  const depths = useMemo(
    () => curves[depth_key] ?? [],
    [curves, depth_key],
  );

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

  const indexToY = useCallback(
    (i: number, chartH: number) => {
      const n = depths.length;
      if (n <= 1) return PAD.top;
      return PAD.top + (i / (n - 1)) * chartH;
    },
    [depths.length],
  );

  const yToIndex = useCallback(
    (y: number, chartH: number) => {
      const n = depths.length;
      if (n <= 1) return 0;
      const t = (y - PAD.top) / chartH;
      return clampIndex(Math.round(t * (n - 1)), n);
    },
    [depths.length],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || depths.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const chartH = H - PAD.top - PAD.bottom;
    const chartW = W - PAD.left - PAD.right;
    const n = depths.length;

    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#141824";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "#0f1117";
    ctx.fillRect(0, PAD.top, PAD.left - 4, chartH);

    for (let i = 0; i < n; i++) {
      const z = zones[i];
      const y1 = indexToY(i, chartH);
      const y2 = i < n - 1 ? indexToY(i + 1, chartH) : y1 + 1;
      ctx.fillStyle = ZONE_COLORS[z] ?? ZONE_COLORS.unknown;
      ctx.fillRect(PAD.left, y1, chartW, Math.max(1, y2 - y1));
    }

    let bandStart = 0;
    for (let i = 1; i <= n; i++) {
      if (i === n || zones[i] !== zones[bandStart]) {
        const z = zones[bandStart];
        const y1 = indexToY(bandStart, chartH);
        const y2 = indexToY(i - 1, chartH);
        ctx.strokeStyle = ZONE_BORDER[z] ?? "transparent";
        ctx.lineWidth = 1;
        ctx.strokeRect(PAD.left, y1, chartW, Math.max(1, y2 - y1 + 1));
        bandStart = i;
      }
    }

    ctx.strokeStyle = "#252a3d";
    ctx.lineWidth = 1;
    for (let g = 0; g <= GRID_LINES; g++) {
      const idx = clampIndex(Math.round((g / GRID_LINES) * (n - 1)), n);
      const y = indexToY(idx, chartH);
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(W - PAD.right, y);
      ctx.stroke();

      const depthVal = depths[idx];
      if (depthVal != null) {
        ctx.fillStyle = "#94a3b8";
        ctx.font = "11px ui-monospace, monospace";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(depthVal.toFixed(1), PAD.left - 10, y);
      }
    }

    ctx.fillStyle = "#64748b";
    ctx.font = "10px system-ui";
    ctx.textAlign = "center";
    ctx.save();
    ctx.translate(14, PAD.top + chartH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(depth_key, 0, 0);
    ctx.restore();

    activeKeys.forEach((key) => {
      if (!curves[key]) return;
      const { norm } = normalise(key);
      const color = getColor(key);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < n; i++) {
        const v = norm[i];
        if (v === null) {
          started = false;
          continue;
        }
        const x = PAD.left + v * chartW;
        const y = indexToY(i, chartH);
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
      const selIdx = depths.reduce<number>(
        (best, d, i) =>
          Math.abs((d ?? 0) - selectedDepth) < Math.abs((depths[best] ?? 0) - selectedDepth)
            ? i
            : best,
        0,
      );
      const y = indexToY(selIdx, chartH);
      ctx.strokeStyle = "#f0b429";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(W - PAD.right, y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.strokeStyle = "#2d3148";
    ctx.lineWidth = 1;
    ctx.strokeRect(PAD.left, PAD.top, chartW, chartH);
  }, [depths, zones, activeKeys, normalise, selectedDepth, curves, getColor, indexToY, depth_key]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas || depths.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const scaleY = canvas.height / rect.height;
      const y = (e.clientY - rect.top) * scaleY;
      const chartH = canvas.height - PAD.top - PAD.bottom;
      const idx = yToIndex(y, chartH);

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
    [depths, zones, activeKeys, curves, yToIndex],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas || depths.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const scaleY = canvas.height / rect.height;
      const y = (e.clientY - rect.top) * scaleY;
      const chartH = canvas.height - PAD.top - PAD.bottom;
      const idx = yToIndex(y, chartH);
      const selected = depths[idx];
      if (selected != null) onDepthSelect(selected);
    },
    [depths, onDepthSelect, yToIndex],
  );

  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartToolbar}>
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
              gas: "#ef4444",
              water: "#2563eb",
              shale: "#64748b",
            }) as [ZoneType, string][]
          ).map(([z, c]) => (
            <div key={z} className={styles.legendItem}>
              <div className={styles.legendDot} style={{ background: c }} />
              {zoneLabel(z)}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.canvasWrap}>
        <canvas
          ref={canvasRef}
          width={760}
          height={640}
          className={styles.chartCanvas}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltip(null)}
          onClick={handleClick}
        />
        {tooltip && (
          <div
            className={styles.chartTooltip}
            style={{ left: tooltip.x + 14, top: tooltip.y - 12 }}
          >
            <div className={styles.chartTooltipDepth}>
              {tooltip.depth} {depth_key}
            </div>
            <div className={styles.chartTooltipZone}>{zoneLabel(tooltip.zone)}</div>
            {Object.entries(tooltip.vals).map(([k, v]) => (
              <div key={k} className={styles.chartTooltipRow}>
                <span>{k}</span>
                <strong>{v?.toFixed(2) ?? "N/A"}</strong>
              </div>
            ))}
            <div className={styles.chartTooltipHint}>Klik → dərinliyi seç</div>
          </div>
        )}
      </div>
    </div>
  );
}
