"use client";

import { useMemo, useState } from "react";
import Slider from "../Slider";
import {
  DP_GRADES,
  allowableTension,
  axialForceAt,
  buoyancy,
  hookLoads,
  neutralPointFromBit,
  steelWeightPerFt,
  tensileYield,
  type DpGrade,
  type StringSection,
} from "@/lib/drilling/drillstring";

const ACCENT = "#FBBF24";
const DC = { od: 6.5, id: 2.813 };
const DP = { od: 5, id: 4.276, w: 21.9 };
const HW_W = 49.3;

const W = 640;
const H = 560;
const M = { t: 30, b: 44, l: 150, r: 20 };

const klb = (v: number) => `${(v / 1000).toLocaleString("en-US", { maximumFractionDigits: 0 })} klbf`;

export default function AxialLoadVisual() {
  const [depth, setDepth] = useState(12000);
  const [dcLen, setDcLen] = useState(600);
  const [hwLen, setHwLen] = useState(450);
  const [wob, setWob] = useState(40);
  const [mw, setMw] = useState(12);
  const [grade, setGrade] = useState<DpGrade>("E");

  const wDc = steelWeightPerFt(DC.od, DC.id);
  const bf = buoyancy(mw);
  const WOB = wob * 1000;
  const hwEff = Math.min(hwLen, Math.max(0, depth - dcLen - 500));
  const dcEff = Math.min(dcLen, depth - 500);
  const dpLen = Math.max(0, depth - dcEff - hwEff);

  const sections: StringSection[] = useMemo(
    () => [
      { name: "dc", length: dcEff, wPerFt: wDc },
      { name: "hwdp", length: hwEff, wPerFt: HW_W },
      { name: "dp", length: dpLen, wPerFt: DP.w },
    ],
    [dcEff, hwEff, dpLen, wDc]
  );

  const np = neutralPointFromBit(sections, WOB, bf);
  const loads = hookLoads(sections, WOB, bf);
  const ty = tensileYield(DP.od, DP.id, DP_GRADES[grade].yieldPsi);
  const allow = allowableTension(ty);
  const mop = allow - loads.offBottom;
  const dcBuoyed = wDc * dcEff * bf;
  const dcFactor = WOB > 0 ? dcBuoyed / WOB : Infinity;

  const npZone: "dc" | "hwdp" | "dp" | null = np === null ? null : np <= dcEff ? "dc" : np <= dcEff + hwEff ? "hwdp" : "dp";

  // profil nöqtələri
  const pts = useMemo(() => {
    const arr: { z: number; f: number }[] = [];
    const step = Math.max(50, Math.round(depth / 240 / 10) * 10);
    for (let z = 0; z <= depth; z += step) arr.push({ z, f: axialForceAt(sections, WOB, bf, z) });
    arr.push({ z: depth, f: axialForceAt(sections, WOB, bf, depth) });
    return arr;
  }, [sections, WOB, bf, depth]);

  const fMin = Math.min(-WOB, ...pts.map((p) => p.f)) * 1.1 - 5000;
  const fMax = Math.max(allow * 1.08, ...pts.map((p) => p.f) , 1);
  const x = (f: number) => M.l + ((f - fMin) / (fMax - fMin)) * (W - M.l - M.r);
  const y = (z: number) => M.t + ((depth - z) / depth) * (H - M.t - M.b); // z bit-dən; səth yuxarıda
  const x0 = x(0);

  const curve = pts.map((p, i) => `${i ? "L" : "M"}${x(p.f).toFixed(1)},${y(p.z).toFixed(1)}`).join(" ");
  const area = `${curve} L${x0.toFixed(1)},${y(depth).toFixed(1)} L${x0.toFixed(1)},${y(0).toFixed(1)} Z`;

  // sol zolaq: komponentlər
  const stripX = 64;
  const stripW = 34;
  const seg = [
    { n: "DP", from: dcEff + hwEff, to: depth, c: "#00D4FF" },
    { n: "HWDP", from: dcEff, to: dcEff + hwEff, c: "#34D399" },
    { n: "DC", from: 0, to: dcEff, c: "#F59E0B" },
  ].filter((s) => s.to > s.from);

  const status =
    npZone === null
      ? { t: "WOB string-in bütün buoyed çəkisindən böyükdür: neutral point yoxdur.", c: "#F87171" }
      : npZone === "dc"
      ? { t: "Neutral point DC daxilindədir: DP və HWDP dartmada, sxem düzgündür.", c: "#34D399" }
      : npZone === "hwdp"
      ? { t: "Neutral point HWDP-dədir: HWDP sıxılmada, DC uzunluğunu artırmaq məsləhətdir.", c: "#FBBF24" }
      : { t: "Neutral point DP-dədir: DP sıxılmada! Buckling və yorğunluq riski. DC/HWDP uzunluğunu artır və ya WOB-u azalt.", c: "#F87171" };

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.5fr)_320px] gap-6">
      <div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="img" aria-label="String boyunca eksenel qüvvə diaqramı">
          <defs>
            <clipPath id="clipComp"><rect x="0" y="0" width={x0} height={H} /></clipPath>
            <clipPath id="clipTens"><rect x={x0} y="0" width={W - x0} height={H} /></clipPath>
          </defs>

          {/* şəbəkə */}
          {Array.from({ length: 6 }, (_, i) => Math.round((depth / 5) * i / 1000) * 1000).map((d) => (
            <g key={d}>
              <line x1={M.l} x2={W - M.r} y1={y(d)} y2={y(d)} stroke="rgba(255,255,255,0.05)" />
              <text x={M.l - 6} y={y(d) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{(depth - d).toLocaleString("en-US")}</text>
            </g>
          ))}
          <text x={M.l - 6} y={M.t - 12} fontSize="9" textAnchor="end" fill="#8DA2BF">dərinlik, ft</text>
          <line x1={x0} x2={x0} y1={M.t} y2={H - M.b} stroke="#8DA2BF" strokeWidth="1.2" />
          <text x={x0 - 4} y={H - M.b + 14} fontSize="10" textAnchor="end" fill="#F87171">← sıxılma</text>
          <text x={x0 + 4} y={H - M.b + 14} fontSize="10" fill="#60A5FA">dartma →</text>
          <text x={(M.l + W - M.r) / 2} y={H - 8} fontSize="10" textAnchor="middle" fill="#8DA2BF">Eksenel qüvvə (buoyed), lbf</text>

          {/* sahələr */}
          <path d={area} fill="#F87171" opacity="0.5" clipPath="url(#clipComp)" />
          <path d={area} fill="#3B82F6" opacity="0.35" clipPath="url(#clipTens)" />
          <path d={curve} fill="none" stroke="#F0F4FF" strokeWidth="2" />

          {/* axma həddi */}
          <line x1={x(allow)} x2={x(allow)} y1={M.t} y2={H - M.b} stroke="#F87171" strokeDasharray="5 4" />
          <text x={x(allow) - 4} y={M.t + 10} fontSize="9" textAnchor="end" fill="#F87171">0.9·T_y (DP {DP_GRADES[grade].name}): {klb(allow)}</text>

          {/* neutral point */}
          {np !== null && (
            <g>
              <line x1={M.l - 50} x2={W - M.r} y1={y(np)} y2={y(np)} stroke={status.c} strokeDasharray="4 3" />
              <circle cx={x0} cy={y(np)} r="5" fill={status.c} stroke="#080C18" strokeWidth="1.5" />
              <text x={W - M.r} y={y(np) - 5} fontSize="10" textAnchor="end" fill={status.c}>Neutral point: bit-dən {Math.round(np).toLocaleString("en-US")} ft</text>
            </g>
          )}

          {/* hook load və WOB etiketləri */}
          <text x={x(loads.drilling)} y={M.t - 8} fontSize="10" textAnchor="middle" fill="#60A5FA">Hook load (qazma): {klb(loads.drilling)}</text>
          <circle cx={x(loads.drilling)} cy={y(depth)} r="4" fill="#60A5FA" />
          <text x={x(-WOB) + 6} y={y(0) - 6} fontSize="10" fill="#FCA5A5">WOB {klb(WOB)}</text>

          {/* komponent zolağı */}
          {seg.map((s) => (
            <g key={s.n}>
              <rect x={stripX} y={y(s.to)} width={stripW} height={Math.max(2, y(s.from) - y(s.to))} fill={s.c} opacity="0.75" />
              {y(s.from) - y(s.to) > 14 && <text x={stripX + stripW + 6} y={(y(s.from) + y(s.to)) / 2 + 3} fontSize="10" fill={s.c}>{s.n}</text>}
            </g>
          ))}
          <text x={stripX + stripW / 2} y={M.t - 8} fontSize="9" textAnchor="middle" fill="#8DA2BF">string</text>
        </svg>
        <p className="text-[11px] text-[#6B82A0] mt-2 leading-relaxed font-['Space_Grotesk']">
          Şaquli quyu, buoyancy factor üsulu. Qüvvə bit-də −WOB (sıxılma) ilə başlayır və yuxarı getdikcə string-in buoyed çəkisi hesabına artır. Qüvvənin sıfır olduğu yer neutral point-dir.
          DP: 5 in, adjusted 21.9 lb/ft (ID 4.276); HWDP 49.3 lb/ft; DC 6.5 × 2.813 in.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>İdarəetmə</p>
          <Slider label="Dərinlik" unit="ft" value={depth} min={6000} max={15000} step={500} accent={ACCENT} onChange={setDepth} />
          <Slider label="DC uzunluğu" unit="ft" value={dcLen} min={90} max={1200} step={30} accent={ACCENT} onChange={setDcLen} />
          <Slider label="HWDP uzunluğu" unit="ft" value={hwLen} min={0} max={900} step={30} accent={ACCENT} onChange={setHwLen} />
          <Slider label="WOB" unit="klbf" value={wob} min={0} max={80} step={1} accent={ACCENT} onChange={setWob} />
          <Slider label="Məhlul çəkisi" unit="ppg" value={mw} min={9} max={16} step={0.1} decimals={1} accent={ACCENT} onChange={setMw} />
          <label className="block">
            <span className="block text-[12px] text-[#8DA2BF] mb-1 font-['Space_Grotesk']">Drill pipe dərəcəsi</span>
            <select value={grade} onChange={(e) => setGrade(e.target.value as DpGrade)} className="w-full bg-[#080C18] text-[#F0F4FF] text-[13px] rounded-lg px-3 py-2 outline-none border border-[rgba(255,255,255,0.08)]">
              {(Object.keys(DP_GRADES) as DpGrade[]).map((k) => (
                <option key={k} value={k}>{DP_GRADES[k].name}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Nəticə</p>
          {[
            ["Buoyancy factor", bf.toFixed(3)],
            ["DC çəkisi (məhlulda)", klb(dcBuoyed)],
            ["DC faktoru (DC çəkisi / WOB)", WOB > 0 ? dcFactor.toFixed(2) : "—"],
            ["Hook load (yerdən ayrılmış)", klb(loads.offBottom)],
            ["Hook load (qazma)", klb(loads.drilling)],
            ["T_y (DP, yeni)", klb(ty)],
            ["Margin of overpull", klb(mop)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-t border-[rgba(255,255,255,0.05)] py-1.5 text-[12px]">
              <span className="text-[#8DA2BF]">{k}</span>
              <span className="font-mono font-semibold" style={{ color: k === "Margin of overpull" && mop < 50000 ? "#F87171" : "#F0F4FF" }}>{v}</span>
            </div>
          ))}
          <p className="mt-3 rounded-lg px-3 py-2 text-[11.5px] leading-snug" style={{ background: status.c + "1A", color: status.c }}>{status.t}</p>
          {WOB > 0 && dcFactor < 1.15 && npZone === "dc" && (
            <p className="mt-2 rounded-lg px-3 py-2 text-[11.5px] bg-[#FBBF2414] text-[#FDE68A]">DC çəkisi WOB-dan 15% artıq deyil (təlim qaydası): neutral point DC-in aşağısına yaxındır, ehtiyat azdır.</p>
          )}
          {mop < 50000 && <p className="mt-2 rounded-lg px-3 py-2 text-[11.5px] bg-[#F8717114] text-[#FCA5A5]">Overpull ehtiyatı aşağıdır: daha yüksək dərəcə və ya daha yüngül string nəzərdən keçirilməlidir.</p>}
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>WOB-u artır: neutral point yuxarı qalxır. Nə vaxt DP-yə keçir?</li>
            <li>MW-ni artır: buoyed çəki azalır, neutral point yuxarı qalxır.</li>
            <li>Dərinliyi 15,000 ft edib S-135 ilə E-75-i müqayisə et: overpull ehtiyatı necə dəyişir?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
