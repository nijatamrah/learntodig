"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Slider from "../Slider";
import { drillersPressureAt, fcpPsi, icpPsi, killMudPpg, strokesFor, wwPressureAt } from "@/lib/drilling/wellcontrol";

const ACCENT = "#FBBF24";
const TVD = 10000;
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f2 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CW = 420;
const CH = 330;
const M = { l: 52, r: 14, t: 26, b: 38 };

type Method = "ww" | "driller";

export default function KillSheetVisual() {
  const [method, setMethod] = useState<Method>("ww");
  const [mw, setMw] = useState(10);
  const [sidpp, setSidpp] = useState(520);
  const [scr, setScr] = useState(800);
  const [dsVol, setDsVol] = useState(150);
  const [annVol, setAnnVol] = useState(450);
  const [s, setS] = useState(0);
  const [play, setPlay] = useState(false);
  const raf = useRef<number | null>(null);

  const Q = 0.1; // bbl/stk
  const SPM = 30;
  const kmw = killMudPpg(mw, sidpp, TVD);
  const icp = icpPsi(sidpp, scr);
  const fcp = fcpPsi(scr, kmw, mw);
  const Sb = strokesFor(dsVol, Q);
  const Sa = strokesFor(annVol, Q);
  const total = method === "ww" ? Sb + Sa : Sa + Sb + Sa;
  const sc = Math.min(s, total);

  useEffect(() => {
    if (!play) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setS((v) => {
        const n = v + dt * (total / 16);
        if (n >= total) {
          setPlay(false);
          return total;
        }
        return n;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [play, total]);

  const press = (x: number) => (method === "ww" ? wwPressureAt(x, icp, fcp, Sb) : drillersPressureAt(x, icp, fcp, Sb, Sa));
  const curve = useMemo(() => {
    const pts: [number, number][] = [];
    const n = 120;
    for (let i = 0; i <= n; i++) {
      const x = (total * i) / n;
      pts.push([x, method === "ww" ? wwPressureAt(x, icp, fcp, Sb) : drillersPressureAt(x, icp, fcp, Sb, Sa)]);
    }
    return pts;
  }, [method, total, icp, fcp, Sb, Sa]);

  const pMax = icp * 1.1;
  const pMin = Math.min(fcp * 0.8, icp * 0.5);
  const cx = (x: number) => M.l + (x / total) * (CW - M.l - M.r);
  const cy = (p: number) => CH - M.b - ((p - pMin) / (pMax - pMin)) * (CH - M.t - M.b);

  // sxem: drillstring və annulus doldurulması
  const lam = 0.09; // influx hissəsi (annulus hündürlüyünün ~9%)
  let dsKmw = 0;
  let annKmw = 0;
  let annU = 0;
  let influxOn = false;
  if (method === "ww") {
    dsKmw = Math.min(1, sc / Sb);
    annKmw = Math.min(1, Math.max(0, (sc - Sb) / Sa));
    annU = Math.min(1, sc / Sa);
    influxOn = annU + lam < 1;
  } else if (sc <= Sa) {
    annU = Math.min(1, sc / Sa);
    influxOn = annU + lam < 1;
  } else {
    dsKmw = Math.min(1, (sc - Sa) / Sb);
    annKmw = Math.min(1, Math.max(0, (sc - Sa - Sb) / Sa));
  }

  const stage = (() => {
    if (sc <= 0) return "Quyu bağlıdır. Nasosu SCR-də işə salmağa hazırsan.";
    if (method === "ww") {
      if (sc < Sb) return "Kill məhlulu drillstring-i doldurur: DP təzyiqi ICP-dən FCP-yə düşür.";
      if (sc < total) return "Kill məhlulu annulusa qalxır: DP təzyiqi FCP-də sabit saxlanılır.";
      return "Kill məhlulu səthə çatdı. Quyu öldürüldü, flow check et.";
    }
    if (sc < Sa) return "1-ci sirkulyasiya: influx orijinal məhlulla çıxarılır, DP təzyiqi ICP-də sabit.";
    if (sc < Sa + Sb) return "2-ci sirkulyasiya: kill məhlulu drillstring-i doldurur, DP təzyiqi ICP-dən FCP-yə düşür.";
    if (sc < total) return "2-ci sirkulyasiya: kill məhlulu annulusa qalxır, DP təzyiqi FCP-də sabit.";
    return "Kill məhlulu səthə çatdı. Quyu öldürüldü, flow check et.";
  })();

  const colH = 260;
  const top = 50;
  const barX = (i: number) => 60 + i * 120;

  const annSegs: { a: number; b: number; color: string }[] = [];
  if (method === "ww" || sc > Sa) {
    if (annKmw > 0) annSegs.push({ a: 0, b: annKmw, color: "#34D399" });
    annSegs.push({ a: annKmw, b: method === "ww" ? Math.min(1, annU) : 1, color: "#A8835A" });
    if (influxOn && method === "ww") annSegs.push({ a: annU, b: Math.min(1, annU + lam), color: "#F87171" });
    if (method === "ww") annSegs.push({ a: Math.min(1, annU + lam), b: 1, color: "#7C5E3C" });
  } else {
    annSegs.push({ a: 0, b: annU, color: "#A8835A" });
    if (influxOn) annSegs.push({ a: annU, b: Math.min(1, annU + lam), color: "#F87171" });
    annSegs.push({ a: Math.min(1, annU + lam), b: 1, color: "#7C5E3C" });
  }
  // annulus segmentləri yuxarıdan aşağıya x = a (dib) → y
  const yFrac = (frac: number) => top + colH - frac * colH;

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {[
          ["ww", "Wait & Weight", "Bir sirkulyasiya"],
          ["driller", "Driller's method", "İki sirkulyasiya"],
        ].map(([id, n, h]) => (
          <button
            key={id}
            onClick={() => { setMethod(id as Method); setS(0); setPlay(false); }}
            className="px-3.5 py-2 rounded-xl text-[12px] font-semibold border text-left font-['Space_Grotesk']"
            style={{ borderColor: method === id ? ACCENT : "rgba(255,255,255,0.1)", background: method === id ? "#FBBF2418" : "transparent", color: method === id ? ACCENT : "#8DA2BF" }}
          >
            {n}
            <span className="block text-[10px] font-normal opacity-70">{h}</span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
          <svg viewBox="0 0 330 360" className="w-full h-auto" role="img" aria-label="Drillstring və annulusda mayelərin yerləşməsi">
            <text x="60" y="36" fontSize="11" textAnchor="middle" fill="#B7C5DD">Drillstring</text>
            <text x="180" y="36" fontSize="11" textAnchor="middle" fill="#B7C5DD">Annulus</text>
            <rect x={barX(0) - 24} y={top} width="48" height={colH} fill="#A8835A" stroke="#4A6A8A" />
            <rect x={barX(0) - 24} y={top} width="48" height={dsKmw * colH} fill="#34D399" />
            <rect x={barX(1) - 24} y={top} width="48" height={colH} fill="#7C5E3C" stroke="#4A6A8A" />
            {annSegs.map((sg, i) => (
              <rect key={i} x={barX(1) - 24} y={yFrac(sg.b)} width="48" height={Math.max(0, (sg.b - sg.a) * colH)} fill={sg.color} />
            ))}
            {/* bit bağlantısı */}
            <path d={`M ${barX(0) - 24} ${top + colH} L ${barX(0) + 24} ${top + colH} L ${barX(1) - 24} ${top + colH}`} stroke="#4A6A8A" fill="none" />
            <text x="60" y={top + colH + 18} fontSize="10" textAnchor="middle" fill="#8DA2BF">bit</text>
            <rect x="238" y={top} width="12" height="12" fill="#34D399" /><text x="256" y={top + 10} fontSize="10" fill="#B7C5DD">kill məhlulu</text>
            <rect x="238" y={top + 20} width="12" height="12" fill="#A8835A" /><text x="256" y={top + 30} fontSize="10" fill="#B7C5DD">orijinal (nasos)</text>
            <rect x="238" y={top + 40} width="12" height="12" fill="#7C5E3C" /><text x="256" y={top + 50} fontSize="10" fill="#B7C5DD">köhnə məhlul</text>
            <rect x="238" y={top + 60} width="12" height="12" fill="#F87171" /><text x="256" y={top + 70} fontSize="10" fill="#B7C5DD">influx (qaz)</text>
            <text x="165" y="352" fontSize="10" fill="#6B82A0">Sxematikdir: miqyas və influx hissəsi şərtidir.</text>
          </svg>
          <p className="text-[12px] text-[#B7C5DD] mt-2 leading-relaxed font-['Space_Grotesk']">{stage}</p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Drillpipe təzyiqi (kill sheet)</p>
          <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="DP təzyiqi vs stroke">
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <g key={t}>
                <line x1={M.l} x2={CW - M.r} y1={cy(pMin + t * (pMax - pMin))} y2={cy(pMin + t * (pMax - pMin))} stroke="rgba(255,255,255,0.05)" />
                <text x={M.l - 5} y={cy(pMin + t * (pMax - pMin)) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{f0(pMin + t * (pMax - pMin))}</text>
                <text x={cx(t * total)} y={CH - M.b + 13} fontSize="9" textAnchor="middle" fill="#6B82A0">{f0(t * total)}</text>
              </g>
            ))}
            <text x={(M.l + CW - M.r) / 2} y={CH - 6} fontSize="10" textAnchor="middle" fill="#8DA2BF">Strokes</text>
            <text transform={`translate(11 ${(M.t + CH - M.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">DP təzyiqi, psi</text>
            {[["ICP", icp, "#F87171"], ["FCP", fcp, "#34D399"]].map(([n, v, c]) => (
              <g key={String(n)}>
                <line x1={M.l} x2={CW - M.r} y1={cy(Number(v))} y2={cy(Number(v))} stroke={String(c)} strokeDasharray="4 4" opacity="0.6" />
                <text x={CW - M.r - 2} y={cy(Number(v)) - 3} fontSize="9" textAnchor="end" fill={String(c)}>{String(n)} {f0(Number(v))}</text>
              </g>
            ))}
            {method === "driller" && <line x1={cx(Sa)} x2={cx(Sa)} y1={M.t} y2={CH - M.b} stroke="#38BDF8" strokeDasharray="3 3" />}
            {method === "driller" && <text x={cx(Sa) + 4} y={M.t + 10} fontSize="9" fill="#7DD3FC">2-ci sirkulyasiya</text>}
            <path d={curve.map(([x, p], i) => `${i ? "L" : "M"}${cx(x).toFixed(1)},${cy(p).toFixed(1)}`).join(" ")} fill="none" stroke={ACCENT} strokeWidth="2.6" />
            <circle cx={cx(sc)} cy={cy(press(sc))} r="6" fill={ACCENT} stroke="#080C18" strokeWidth="2" />
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center font-['Space_Grotesk'] mt-2">
            {[
              ["Cari DP təzyiqi", `${f0(press(sc))} psi`],
              ["Stroke", `${f0(sc)} / ${f0(total)}`],
              ["Vaxt", `${f0(sc / SPM)} dəq`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-[#101A2E] px-2 py-2">
                <p className="text-[10px] text-[#6B82A0]">{k}</p>
                <p className="font-mono text-[13px] font-bold text-[#F0F4FF]">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <button
              onClick={() => { if (sc >= total - 1e-6) setS(0); setPlay((p) => !p); }}
              className="px-4 py-2 rounded-xl text-[12px] font-semibold font-['Space_Grotesk']"
              style={{ background: ACCENT, color: "#080C18" }}
            >
              {play ? "Dayandır" : sc >= total - 1e-6 ? "Yenidən" : "Sirkulyasiya et"}
            </button>
            <div className="flex-1 min-w-[200px]">
              <Slider label="Pump edilmiş stroke" unit="stk" value={Math.round(sc)} min={0} max={Math.round(total)} step={10} accent={ACCENT} onChange={(v) => { setPlay(false); setS(v); }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Kick məlumatları</p>
          <Slider label="Məhlul çəkisi (MW)" unit="ppg" value={mw} min={8.6} max={13} step={0.1} accent={ACCENT} onChange={(v) => { setMw(v); setS(0); }} decimals={1} />
          <Slider label="SIDPP" unit="psi" value={sidpp} min={100} max={1200} step={20} accent="#38BDF8" onChange={(v) => { setSidpp(v); setS(0); }} />
          <Slider label="SCR təzyiqi" unit="psi" value={scr} min={300} max={1500} step={20} accent="#34D399" onChange={(v) => { setScr(v); setS(0); }} />
          <Slider label="Drillstring həcmi" unit="bbl" value={dsVol} min={80} max={300} step={5} accent={ACCENT} onChange={(v) => { setDsVol(v); setS(0); }} />
          <Slider label="Annulus həcmi" unit="bbl" value={annVol} min={200} max={800} step={10} accent={ACCENT} onChange={(v) => { setAnnVol(v); setS(0); }} />
        </div>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Kill sheet</p>
          {[
            ["Kill mud weight", `${f2(kmw)} ppg`],
            ["ICP", `${f0(icp)} psi`],
            ["FCP", `${f0(fcp)} psi`],
            ["Strokes to bit", `${f0(Sb)} stk`],
            ["Strokes bit-dən səthə", `${f0(Sa)} stk`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-baseline border-t border-[rgba(255,255,255,0.05)] py-1.5">
              <span className="text-[12px] text-[#8DA2BF]">{k}</span>
              <span className="font-mono text-[13px] font-semibold text-[#F0F4FF]">{v}</span>
            </div>
          ))}
          <ul className="mt-3 space-y-1.5 list-disc pl-4 text-[12px] text-[#9DB0CC] leading-relaxed">
            <li>Wait & Weight və Driller's method arasında keçid et: ümumi stroke sayı niyə fərqlidir?</li>
            <li>SIDPP-ni artır: KMW, ICP və FCP necə dəyişir?</li>
            <li>Driller's method-da 1-ci sirkulyasiya zamanı DP təzyiqi niyə sabit qalır?</li>
          </ul>
          <p className="text-[11px] text-[#6B82A0] mt-2 leading-relaxed">Model: nasos çıxışı 0.1 bbl/stk, 30 spm, vahid tutumlu dəstə. Casing təzyiqi və choke əməliyyatı göstərilmir. Real kill üçün rig kill sheet-i və prosedurlar əsasdır.</p>
        </div>
      </div>
    </div>
  );
}
