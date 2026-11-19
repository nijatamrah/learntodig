"use client";

import { useMemo, useState } from "react";
import Slider from "../Slider";
import { afeWithContingencyK, emvK, breakEvenPg, monteCarlo, percentile, type RiskItem } from "@/lib/drilling/economics";

const ACCENT = "#FBBF24";
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const CW = 440;
const CH = 280;
const M = { l: 44, r: 14, t: 22, b: 38 };
const BINS = 40;

export default function RiskAfeVisual() {
  const [unc, setUnc] = useState(25); // qeyri-müəyyənlik, %
  const [skew, setSkew] = useState(2.2); // sağ quyruq əmsalı
  const [rate, setRate] = useState(85);
  const [cont, setCont] = useState(12);
  const [pg, setPg] = useState(35);
  const [pv, setPv] = useState(9500);

  const u = unc / 100;
  const items: RiskItem[] = useMemo(() => {
    const days = 16.25;
    const mk = (l: number, spread: number, sk: number): RiskItem => ({ min: l * (1 - spread), likely: l, max: l * (1 + spread * sk) });
    return [
      mk(days * rate, u, skew), // vaxta bağlı xərc
      mk(420, u * 0.4, 1.5),
      mk(180, u * 0.4, 1.5),
      mk(310, u * 0.6, 2),
      mk(260, u * 0.5, 2),
      mk(190, u * 0.4, 1.5),
    ];
  }, [u, skew, rate]);
  const base = items.reduce((a, it) => a + it.likely, 0);
  const afe = afeWithContingencyK(base, cont);
  const mc = useMemo(() => monteCarlo(items, 5000, 2024), [items]);
  const p10 = percentile(mc, 0.1);
  const p50 = percentile(mc, 0.5);
  const p90 = percentile(mc, 0.9);
  const probOk = mc.filter((v) => v <= afe).length / mc.length;

  const lo = mc[0];
  const hi = mc[mc.length - 1];
  const bins = new Array(BINS).fill(0);
  mc.forEach((v) => { bins[Math.min(BINS - 1, Math.floor(((v - lo) / (hi - lo || 1)) * BINS))]++; });
  const bMax = Math.max(...bins);
  const cx = (v: number) => M.l + ((v - lo) / (hi - lo || 1)) * (CW - M.l - M.r);
  const cy = (c: number) => CH - M.b - (c / bMax) * (CH - M.t - M.b);
  const bw = (CW - M.l - M.r) / BINS;

  const emv = emvK(pg / 100, pv, afe);
  const afeX = Math.min(CW - M.r, Math.max(M.l, cx(afe)));

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Monte Carlo: quyu xərcinin paylanması</p>
        <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Xərc paylanması və AFE">
          {bins.map((c, i) => {
            const v = lo + ((i + 0.5) / BINS) * (hi - lo);
            return <rect key={i} x={M.l + i * bw + 1} y={cy(c)} width={bw - 2} height={CH - M.b - cy(c)} fill={v <= afe ? "#34D399" : "#F87171"} opacity="0.8" />;
          })}
          {[
            [p10, "P10", "#38BDF8"],
            [p50, "P50", "#F0F4FF"],
            [p90, "P90", "#FB923C"],
          ].map(([v, lab, col], i) => (
            <g key={lab as string}>
              <line x1={cx(v as number)} x2={cx(v as number)} y1={M.t} y2={CH - M.b} stroke={col as string} strokeDasharray="4 3" />
              <text x={cx(v as number)} y={M.t - 6 + (i === 1 ? 0 : 0)} fontSize="9" textAnchor="middle" fill={col as string}>{lab as string}</text>
            </g>
          ))}
          <line x1={afeX} x2={afeX} y1={M.t} y2={CH - M.b} stroke={ACCENT} strokeWidth="2.4" />
          <text x={afeX + 4} y={M.t + 10} fontSize="10" fill={ACCENT} fontWeight="700">AFE {f0(afe)}</text>
          {[lo, (lo + hi) / 2, hi].map((v, i) => (
            <text key={i} x={cx(v)} y={CH - M.b + 13} fontSize="9" textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"} fill="#6B82A0">{f0(v)}</text>
          ))}
          <text x={(M.l + CW - M.r) / 2} y={CH - 6} fontSize="10" textAnchor="middle" fill="#8DA2BF">Quyunun ümumi xərci, min $</text>
        </svg>
        <div className="grid grid-cols-4 gap-2 mt-2 text-center font-['Space_Grotesk']">
          {[
            ["P10", f0(p10)],
            ["P50", f0(p50)],
            ["P90", f0(p90)],
            ["AFE kifayətdir", `${f0(probOk * 100)}%`],
          ].map(([k, v], i) => (
            <div key={k} className="rounded-xl bg-[#101A2E] px-2 py-2">
              <p className="text-[10px] text-[#6B82A0]">{k}</p>
              <p className="font-mono text-[13px] font-bold" style={{ color: i === 3 ? (probOk >= 0.7 ? "#34D399" : probOk >= 0.5 ? ACCENT : "#F87171") : "#F0F4FF" }}>{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 rounded-lg px-3 py-2 text-[12px] font-['Space_Grotesk'] bg-[#101A2E] text-[#9DB0CC]">
          Əsas büdcə {f0(base)} min $ ehtimal olunan dəyərlərin cəmidir, lakin P50 ({f0(p50)}) ondan {p50 > base ? "böyükdür" : "kiçikdir"}: paylanma sağa uzanır. Yaşıl sütunlar AFE daxilindədir.
        </p>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Qeyri-müəyyənlik və iqtisadiyyat</p>
        <div className="space-y-3">
          <Slider label="Qeyri-müəyyənlik (min-ehtimal arası)" unit="%" value={unc} min={5} max={50} step={1} accent="#F87171" onChange={setUnc} />
          <Slider label="Sağ quyruq əmsalı (risk uzanması)" unit="×" value={skew} min={1} max={4} step={0.1} accent="#FB923C" onChange={setSkew} decimals={1} />
          <Slider label="Spread rate" unit="min $/gün" value={rate} min={30} max={300} step={5} accent={ACCENT} onChange={setRate} />
          <Slider label="Contingency" unit="%" value={cont} min={0} max={40} step={1} accent="#34D399" onChange={setCont} />
        </div>
        <div className="mt-4 rounded-xl bg-[#101A2E] p-3">
          <p className="text-[12px] font-semibold text-[#F0F4FF] font-['Space_Grotesk'] mb-2">Quyunun iqtisadi qərarı (EMV)</p>
          <div className="space-y-3">
            <Slider label="Uğur ehtimalı" unit="%" value={pg} min={5} max={80} step={1} accent="#38BDF8" onChange={setPg} />
            <Slider label="Uğurda PV" unit="min $" value={pv} min={2000} max={20000} step={250} accent="#A78BFA" onChange={setPv} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center font-['Space_Grotesk']">
            {[
              ["Quyu xərci (AFE)", `${f0(afe)}`],
              ["EMV", `${f0(emv)}`],
              ["Break-even P_g", `${f1(100 * breakEvenPg(pv, afe))}%`],
            ].map(([k, v], i) => (
              <div key={k} className="rounded-lg bg-[#0D1525] px-2 py-2">
                <p className="text-[10px] text-[#6B82A0]">{k}</p>
                <p className="font-mono text-[12px] font-bold" style={{ color: i === 1 ? (emv >= 0 ? "#34D399" : "#F87171") : "#F0F4FF" }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-[#6B82A0] mt-3 leading-relaxed font-['Space_Grotesk']">
          Model: altı sətir üçbucaq paylanma ilə, müstəqil götürülür (5,000 sınaq, sabit seed). Real layihədə risklər bir-birinə bağlıdır, bu da qeyri-müəyyənliyi artırır. EMV sadə model: PV tamamlama xərcini artıq çıxıb.
        </p>
        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <li>Sağ quyruq əmsalını artır: P90 və AFE-nin kifayət etmə ehtimalı necə dəyişir?</li>
          <li>Contingency-ni P50-ə çatdırmaq üçün neçə % lazımdır?</li>
          <li>Uğur ehtimalını break-even-in altına sal: AFE artırmaq EMV-yə nə edir?</li>
        </ul>
      </div>
    </div>
  );
}
