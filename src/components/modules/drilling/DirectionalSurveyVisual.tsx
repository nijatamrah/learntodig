"use client";

import { useMemo, useState } from "react";
import Slider from "../Slider";
import { planSurvey, surveyPath, tangentialStep, type PathStation } from "@/lib/drilling/directional";

const ACCENT = "#FBBF24";
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const CW = 330;
const CH = 330;
const M = { l: 46, r: 14, t: 28, b: 32 };

function niceStep(range: number) {
  const raw = range / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(raw || 1)));
  const n = raw / mag;
  return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * mag;
}

interface PanelProps {
  title: string;
  xLabel: string;
  yLabel: string;
  a: [number, number][]; // minimum curvature
  b: [number, number][]; // tangential
  flipY?: boolean; // y aşağı artır (TVD)
  startNote?: string;
}

function Panel({ title, xLabel, yLabel, a, b, flipY }: PanelProps) {
  const all = [...a, ...b];
  const xs = all.map((p) => p[0]);
  const ys = all.map((p) => p[1]);
  const xMin = Math.min(0, ...xs), xMax = Math.max(1, ...xs);
  const yMin = Math.min(0, ...ys), yMax = Math.max(1, ...ys);
  const rx = (xMax - xMin) * 1.1 || 1;
  const ry = (yMax - yMin) * 1.1 || 1;
  const s = Math.min((CW - M.l - M.r) / rx, (CH - M.t - M.b) / ry);
  const X = (v: number) => M.l + (v - xMin) * s;
  const Y = (v: number) => (flipY ? M.t + (v - yMin) * s : CH - M.b - (v - yMin) * s);
  const mk = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(" ");
  const st = niceStep(Math.max(rx, ry));
  const xt = Array.from({ length: Math.ceil(rx / st) + 1 }, (_, i) => Math.ceil(xMin / st) * st + i * st).filter((v) => v <= xMin + rx);
  const yt = Array.from({ length: Math.ceil(ry / st) + 1 }, (_, i) => Math.ceil(yMin / st) * st + i * st).filter((v) => v <= yMin + ry);
  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="img" aria-label={title}>
      <text x={M.l} y="16" fontSize="12" fontWeight="700" fill="#F0F4FF">{title}</text>
      {xt.map((v) => (
        <g key={"x" + v}>
          <line x1={X(v)} x2={X(v)} y1={M.t} y2={CH - M.b} stroke="rgba(255,255,255,0.05)" />
          <text x={X(v)} y={CH - M.b + 12} fontSize="9" textAnchor="middle" fill="#6B82A0">{f0(v)}</text>
        </g>
      ))}
      {yt.map((v) => (
        <g key={"y" + v}>
          <line x1={M.l} x2={CW - M.r} y1={Y(v)} y2={Y(v)} stroke="rgba(255,255,255,0.05)" />
          <text x={M.l - 5} y={Y(v) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{f0(v)}</text>
        </g>
      ))}
      <text x={(M.l + CW - M.r) / 2} y={CH - 4} fontSize="10" textAnchor="middle" fill="#8DA2BF">{xLabel}</text>
      <text transform={`translate(11 ${(M.t + CH - M.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">{yLabel}</text>
      <path d={mk(b)} fill="none" stroke="#F87171" strokeWidth="1.8" strokeDasharray="5 4" />
      <path d={mk(a)} fill="none" stroke={ACCENT} strokeWidth="2.6" />
      <circle cx={X(a[0][0])} cy={Y(a[0][1])} r="4" fill="#8DA2BF" />
      <circle cx={X(a[a.length - 1][0])} cy={Y(a[a.length - 1][1])} r="5" fill={ACCENT} stroke="#080C18" strokeWidth="2" />
      <circle cx={X(b[b.length - 1][0])} cy={Y(b[b.length - 1][1])} r="4" fill="#F87171" />
    </svg>
  );
}

export default function DirectionalSurveyVisual() {
  const [kop, setKop] = useState(1500);
  const [bur, setBur] = useState(3);
  const [turn, setTurn] = useState(0.8);
  const [maxInc, setMaxInc] = useState(60);
  const [td, setTd] = useState(8000);
  const [azi0, setAzi0] = useState(45);
  const [spacing, setSpacing] = useState(100);
  const [dlsLimit, setDlsLimit] = useState(4);

  const { path, tan } = useMemo(() => {
    const st = planSurvey({ kop, burDegPer100: bur, turnDegPer100: turn, maxInc, td, azi0, step: spacing });
    const p = surveyPath(st, azi0);
    // tangential yol
    const t: { tvd: number; north: number; east: number; vs: number }[] = [{ tvd: 0, north: 0, east: 0, vs: 0 }];
    for (let i = 1; i < st.length; i++) {
      const d = tangentialStep(st[i - 1], st[i]);
      const prev = t[i - 1];
      const north = prev.north + d.dNorth;
      const east = prev.east + d.dEast;
      t.push({ tvd: prev.tvd + d.dTvd, north, east, vs: north * Math.cos((azi0 * Math.PI) / 180) + east * Math.sin((azi0 * Math.PI) / 180) });
    }
    return { path: p, tan: t };
  }, [kop, bur, turn, maxInc, td, azi0, spacing]);

  const end: PathStation = path[path.length - 1];
  const endT = tan[tan.length - 1];
  const errTvd = endT.tvd - end.tvd;
  const errHd = Math.hypot(endT.north - end.north, endT.east - end.east);
  const maxDls = Math.max(...path.map((p) => p.dls));
  const over = path.filter((p) => p.dls > dlsLimit + 1e-9).length;
  const clos = Math.hypot(end.north, end.east);

  const dlsPts = path.slice(1).map((p) => [p.md, p.dls] as [number, number]);
  const dMax = Math.max(dlsLimit * 1.2, maxDls * 1.15, 1);
  const DW = 330, DH = 200, DM = { l: 46, r: 14, t: 26, b: 30 };
  const dx = (v: number) => DM.l + (v / td) * (DW - DM.l - DM.r);
  const dy = (v: number) => DH - DM.b - (v / dMax) * (DH - DM.t - DM.b);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Panel title="Plan görünüşü (yuxarıdan)" xLabel="Şərq, ft" yLabel="Şimal, ft" a={path.map((p) => [p.east, p.north])} b={tan.map((p) => [p.east, p.north])} />
        <Panel title="Vertical section" xLabel="VS (hədəf azimutu boyunca), ft" yLabel="TVD, ft" a={path.map((p) => [p.vs, p.tvd])} b={tan.map((p) => [p.vs, p.tvd])} flipY />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Trayektoriya</p>
          <Slider label="KOP" unit="ft" value={kop} min={500} max={4000} step={100} accent={ACCENT} onChange={setKop} />
          <Slider label="Build rate" unit="°/100ft" value={bur} min={1} max={8} step={0.5} accent={ACCENT} onChange={setBur} decimals={1} />
          <Slider label="Turn rate (azimut)" unit="°/100ft" value={turn} min={0} max={4} step={0.1} accent="#38BDF8" onChange={setTurn} decimals={1} />
          <Slider label="Maks. inklinasiya" unit="°" value={maxInc} min={10} max={90} step={5} accent={ACCENT} onChange={setMaxInc} />
          <Slider label="Başlanğıc azimut" unit="°" value={azi0} min={0} max={359} step={5} accent="#38BDF8" onChange={setAzi0} />
          <Slider label="TD (MD)" unit="ft" value={td} min={4000} max={14000} step={500} accent={ACCENT} onChange={setTd} />
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Survey</p>
          <Slider label="Stansiya aralığı" unit="ft" value={spacing} min={30} max={300} step={10} accent="#34D399" onChange={setSpacing} />
          <div className="space-y-1.5 text-[12px] font-['Space_Grotesk']">
            {[
              ["Stansiya sayı", `${path.length}`, "#F0F4FF"],
              ["TD-də TVD", `${f0(end.tvd)} ft`, "#F0F4FF"],
              ["TD-də closure", `${f0(clos)} ft`, "#F0F4FF"],
              ["TD-də VS", `${f0(end.vs)} ft`, "#F0F4FF"],
              ["Tangential: TVD səhvi", `${f1(errTvd)} ft`, Math.abs(errTvd) > 5 ? "#FCA5A5" : "#A7F3D0"],
              ["Tangential: HD səhvi", `${f1(errHd)} ft`, errHd > 5 ? "#FCA5A5" : "#A7F3D0"],
            ].map(([k, v, c]) => (
              <div key={k} className="flex justify-between items-baseline border-t border-[rgba(255,255,255,0.05)] pt-1.5">
                <span className="text-[#8DA2BF]">{k}</span>
                <span className="font-mono font-semibold" style={{ color: c }}>{v}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#6B82A0] leading-relaxed font-['Space_Grotesk']">
            <span className="text-[#FBBF24]">Sarı xətt</span>: minimum curvature (düzgün). <span className="text-[#F87171]">Qırmızı qırıq xətt</span>: tangential metod. Stansiya aralığını 300 ft-ə qaldır, səhv necə artır?
          </p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>DLS profili</p>
          <svg viewBox={`0 0 ${DW} ${DH}`} className="w-full h-auto" role="img" aria-label="DLS profili MD boyunca">
            {[0, 0.5, 1].map((t) => (
              <g key={t}>
                <line x1={DM.l} x2={DW - DM.r} y1={dy(t * dMax)} y2={dy(t * dMax)} stroke="rgba(255,255,255,0.05)" />
                <text x={DM.l - 5} y={dy(t * dMax) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{f1(t * dMax)}</text>
                <text x={dx(t * td)} y={DH - DM.b + 12} fontSize="9" textAnchor="middle" fill="#6B82A0">{f0(t * td)}</text>
              </g>
            ))}
            <text x={(DM.l + DW - DM.r) / 2} y={DH - 3} fontSize="10" textAnchor="middle" fill="#8DA2BF">MD, ft</text>
            <text transform={`translate(11 ${(DM.t + DH - DM.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">DLS, °/100 ft</text>
            <line x1={DM.l} x2={DW - DM.r} y1={dy(dlsLimit)} y2={dy(dlsLimit)} stroke="#F87171" strokeDasharray="5 4" />
            <text x={DW - DM.r - 2} y={dy(dlsLimit) - 4} fontSize="9" textAnchor="end" fill="#FCA5A5">limit {f1(dlsLimit)}</text>
            <path d={dlsPts.map(([x, y], i) => `${i ? "L" : "M"}${dx(x).toFixed(1)},${dy(y).toFixed(1)}`).join(" ")} fill="none" stroke={ACCENT} strokeWidth="2.2" />
          </svg>
          <div className="mt-2">
            <Slider label="DLS limiti" unit="°/100ft" value={dlsLimit} min={1} max={10} step={0.5} accent="#F87171" onChange={setDlsLimit} decimals={1} />
          </div>
          <p className="mt-2 text-[12px] font-['Space_Grotesk']" style={{ color: over ? "#FCA5A5" : "#A7F3D0" }}>
            {over ? `${over} stansiya limiti aşır (maks. ${f1(maxDls)}°/100 ft).` : `Maks. DLS ${f1(maxDls)}°/100 ft: limit daxilindədir.`}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
        <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
        <ul className="space-y-1.5 list-disc pl-4">
          <li>Turn rate-i 0-a qoy: plan görünüşü niyə düz xətt olur və DLS yalnız build hissəsində görünür?</li>
          <li>Turn rate-i artır: inklinasiya sabitləşəndən sonra da DLS niyə sıfıra düşmür?</li>
          <li>Build rate-i 6-ya qaldır və DLS limitini 4-də saxla: hansı stansiyalar limiti aşır?</li>
          <li>Stansiya aralığını 300 ft et: tangential metodun səhvi niyə böyüyür?</li>
        </ul>
        <p className="mt-2 text-[11px] text-[#6B82A0]">Model: plan trayektoriyası (sabit build və turn). Real quyuda survey səhvləri və steering düzəlişləri əlavə dogleg yaradır.</p>
      </div>
    </div>
  );
}
