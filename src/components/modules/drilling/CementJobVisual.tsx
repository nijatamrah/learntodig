"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Slider from "../Slider";
import {
  capacityBblFt,
  casingId,
  cementVolumes,
  hydrostaticOfSegs,
  jobColumns,
  slurryMix,
  type Fluid,
  type JobGeom,
  type Seg,
} from "@/lib/drilling/casing";

const ACCENT = "#FBBF24";
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const W = 720;
const H = 560;
const TOP = 44;
const BOT = 506;
const CX = 150;
const SHOE = 9000;

const MUD: Fluid = { name: "Qazma məhlulu", ppg: 10.5, vol: 0, color: "#7C5E3C" };
const DISP: Fluid = { name: "Displacement məhlulu", ppg: 10.5, vol: 0, color: "#D6B98C" };

const CHART = { l: 420, r: 700, t: 70, b: 470 };

export default function CementJobVisual() {
  const [spacerVol, setSpacerVol] = useState(40);
  const [leadVol, setLeadVol] = useState(220);
  const [leadPpg, setLeadPpg] = useState(13.5);
  const [tailWater, setTailWater] = useState(5.0);
  const [excess, setExcess] = useState(0.3);
  const [frac, setFrac] = useState(14.5);
  const [vp, setVp] = useState(0);
  const [playing, setPlaying] = useState(false);
  const raf = useRef<number | null>(null);

  const geom: JobGeom = useMemo(
    () => ({
      shoeTvd: SHOE,
      casingOd: 9.625,
      casingId: casingId({ od: 9.625, wall: 0.472 }),
      holeDia: 12.25,
      excess,
      prevShoeTvd: 4000,
      prevCasingId: 12.415,
      trackFt: 80,
      tocTvd: 3500,
    }),
    [excess]
  );

  const vols = cementVolumes(geom);
  const tailVol = Math.max(10, vols.total - leadVol);
  const tailMix = slurryMix(tailWater);
  const train: Fluid[] = useMemo(
    () => [
      { name: "Spacer", ppg: 11.5, vol: spacerVol, color: "#A78BFA" },
      { name: "Lead slurry", ppg: leadPpg, vol: leadVol, color: "#38BDF8" },
      { name: "Tail slurry", ppg: tailMix.densityPpg, vol: tailVol, color: ACCENT },
    ],
    [spacerVol, leadVol, leadPpg, tailVol, tailMix.densityPpg]
  );

  const job = jobColumns(geom, MUD, train, DISP, vp);
  const vBump = job.vBump;

  // animasiya
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setVp((v) => {
        const n = v + dt * (vBump / 14);
        if (n >= vBump) {
          setPlaying(false);
          return vBump;
        }
        return n;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [playing, vBump]);

  // vp həddən çox olarsa (parametr dəyişəndə) kəsirik
  const vpC = Math.min(vp, vBump);

  const pann = hydrostaticOfSegs(job.annulus, SHOE);
  const pcas = hydrostaticOfSegs(job.casing, SHOE);
  const dp = pann - pcas;
  const emw = pann / (0.052 * SHOE);
  const emwOk = emw <= frac;

  // Δp əyrisi
  const curve = useMemo(() => {
    const pts: { v: number; dp: number; emw: number }[] = [];
    const n = 90;
    for (let i = 0; i <= n; i++) {
      const v = (vBump * i) / n;
      const j = jobColumns(geom, MUD, train, DISP, v);
      const pa = hydrostaticOfSegs(j.annulus, SHOE);
      const pc = hydrostaticOfSegs(j.casing, SHOE);
      pts.push({ v, dp: pa - pc, emw: pa / (0.052 * SHOE) });
    }
    return pts;
  }, [geom, train, vBump]);

  const dpMin = Math.min(-200, ...curve.map((p) => p.dp));
  const dpMax = Math.max(400, ...curve.map((p) => p.dp));
  const cx = (v: number) => CHART.l + (v / vBump) * (CHART.r - CHART.l);
  const cy = (d: number) => CHART.b - ((d - dpMin) / (dpMax - dpMin)) * (CHART.b - CHART.t);
  const dpPath = curve.map((p, i) => `${i ? "L" : "M"}${cx(p.v).toFixed(1)},${cy(p.dp).toFixed(1)}`).join(" ");
  const zeroY = cy(0);

  const y = (d: number) => TOP + (d / SHOE) * (BOT - TOP);

  // mərhələ adı
  const spacerEnd = spacerVol;
  const leadEnd = spacerVol + leadVol;
  const slurryEnd = spacerVol + leadVol + tailVol;
  const stage =
    vpC <= 0 ? "Başlanğıc: casing və annulus məhlulla doludur"
    : vpC < spacerEnd ? "Spacer pump edilir"
    : vpC < leadEnd ? "Lead slurry pump edilir"
    : vpC < slurryEnd ? "Tail slurry pump edilir"
    : !job.bumped ? "Displacement: casing-i məhlulla sıxışdırırıq"
    : "Plug bump: displacement tamamlandı";

  const free = dp < -50 && !job.bumped;

  const drawSegs = (segs: Seg[], x0: number, w: number) =>
    segs.map((sg, i) => (
      <rect key={i} x={x0} y={y(sg.top)} width={w} height={Math.max(0, y(sg.bottom) - y(sg.top))} fill={sg.fluid.color} opacity={0.92} />
    ));

  const hw = 62; // quyu yarı eni
  const cw = 40; // casing xarici yarı eni
  const ciw = 34; // casing daxili yarı eni
  const cased = y(4000);

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.6fr)_330px] gap-6">
      <div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="img" aria-label="Sement işi: casing və annulus daxilində mayelərin yerdəyişməsi">
          {/* formasiya */}
          <rect x={CX - hw - 24} y={TOP} width={(hw + 24) * 2} height={BOT - TOP} fill="#1E2B3F" opacity="0.7" />
          {/* əvvəlki casing */}
          <rect x={CX - hw - 8} y={TOP} width="8" height={cased - TOP} fill="#38BDF8" opacity="0.8" />
          <rect x={CX + hw} y={TOP} width="8" height={cased - TOP} fill="#38BDF8" opacity="0.8" />
          <text x={CX + hw + 14} y={cased - 4} fontSize="9" fill="#7DD3FC">13-3/8 in shoe 4,000 ft</text>

          {/* annulus (sol/sağ) */}
          {drawSegs(job.annulus, CX - hw, hw - cw)}
          {drawSegs(job.annulus, CX + cw, hw - cw)}
          {/* casing daxili */}
          {drawSegs(job.casing, CX - ciw, ciw * 2)}
          {/* casing divarı */}
          <rect x={CX - cw} y={TOP} width={cw - ciw} height={BOT - TOP} fill="#34D399" />
          <rect x={CX + ciw} y={TOP} width={cw - ciw} height={BOT - TOP} fill="#34D399" />
          {/* quyu divarı */}
          <line x1={CX - hw} x2={CX - hw} y1={cased} y2={y(SHOE)} stroke="#5B7092" strokeWidth="2" strokeDasharray="4 3" />
          <line x1={CX + hw} x2={CX + hw} y1={cased} y2={y(SHOE)} stroke="#5B7092" strokeWidth="2" strokeDasharray="4 3" />
          {/* float collar + shoe */}
          <line x1={CX - ciw} x2={CX + ciw} y1={y(SHOE - geom.trackFt)} y2={y(SHOE - geom.trackFt)} stroke="#F0F4FF" strokeWidth="3" />
          <text x={CX + hw + 14} y={y(SHOE - geom.trackFt) - 8} fontSize="9" fill="#F0F4FF">float collar</text>
          <polygon points={`${CX - cw},${y(SHOE)} ${CX + cw},${y(SHOE)} ${CX},${y(SHOE) + 12}`} fill="#34D399" />
          <text x={CX + hw + 14} y={y(SHOE) + 6} fontSize="9" fill="#34D399">shoe 9,000 ft</text>

          {/* top plug */}
          {job.plugDepth !== null && (
            <g>
              <rect x={CX - ciw} y={y(Math.min(job.plugDepth, SHOE - geom.trackFt))} width={ciw * 2} height="6" rx="2" fill="#F87171" />
              <text x={CX + ciw + 12} y={y(Math.min(job.plugDepth, SHOE - geom.trackFt)) + 6} fontSize="9" fill="#FCA5A5">top plug</text>
            </g>
          )}

          {/* TOC */}
          {(() => {
            const slurrySegs = job.annulus.filter((sg) => sg.fluid.name.includes("slurry"));
            if (!slurrySegs.length) return null;
            const toc = Math.min(...slurrySegs.map((sg) => sg.top));
            return (
              <g>
                <line x1={CX - hw - 6} x2={CX + hw + 6} y1={y(toc)} y2={y(toc)} stroke="#F0F4FF" strokeDasharray="3 3" />
                <text x={CX + hw + 14} y={y(toc) + 3} fontSize="10" fill="#F0F4FF">TOC {f0(toc)} ft</text>
              </g>
            );
          })()}

          {/* oxlar: axın istiqaməti */}
          {vpC > 0 && !job.bumped && (
            <g fill="#F0F4FF" opacity="0.9">
              <polygon points={`${CX - 8},${TOP - 16} ${CX + 8},${TOP - 16} ${CX},${TOP - 4}`} />
              <text x={CX + 14} y={TOP - 8} fontSize="10">pump</text>
            </g>
          )}

          <text x="22" y="22" fontSize="10" fill="#8DA2BF">Sement işi, sxematik (dərinlik miqyaslıdır)</text>

          {/* sağ: Δp qrafiki */}
          <g>
            <text x={CHART.l} y={CHART.t - 34} fontSize="12" fontWeight="700" fill="#F0F4FF">Shoe-da təzyiq fərqi</text>
            <text x={CHART.l} y={CHART.t - 20} fontSize="9" fill="#8DA2BF">Δp = P_annulus − P_casing (sürtünmə nəzərə alınmır)</text>
            <rect x={CHART.l} y={CHART.t} width={CHART.r - CHART.l} height={CHART.b - CHART.t} fill="#0A1120" stroke="rgba(255,255,255,0.06)" />
            <rect x={CHART.l} y={zeroY} width={CHART.r - CHART.l} height={Math.max(0, CHART.b - zeroY)} fill="#F8717110" />
            <line x1={CHART.l} x2={CHART.r} y1={zeroY} y2={zeroY} stroke="#8DA2BF" strokeDasharray="4 3" />
            <text x={CHART.r - 4} y={zeroY - 4} fontSize="9" textAnchor="end" fill="#8DA2BF">Δp = 0</text>
            <text x={CHART.l + 6} y={CHART.b - 8} fontSize="9" fill="#FCA5A5">Δp &lt; 0: U-tube, sərbəst düşmə (free fall)</text>
            {[spacerEnd, leadEnd, slurryEnd].map((v, i) => (
              <g key={i}>
                <line x1={cx(v)} x2={cx(v)} y1={CHART.t} y2={CHART.b} stroke="rgba(255,255,255,0.08)" />
                <text x={cx(v)} y={CHART.t + 12} fontSize="8" textAnchor="middle" fill="#6B82A0">{["spacer", "lead", "tail"][i]} sonu</text>
              </g>
            ))}
            <path d={dpPath} fill="none" stroke={ACCENT} strokeWidth="2.4" />
            <circle cx={cx(vpC)} cy={cy(dp)} r="6" fill={free ? "#F87171" : ACCENT} stroke="#080C18" strokeWidth="2" />
            {[0, 0.5, 1].map((t) => (
              <text key={t} x={CHART.l + t * (CHART.r - CHART.l)} y={CHART.b + 14} fontSize="9" textAnchor="middle" fill="#6B82A0">{f0(vBump * t)}</text>
            ))}
            <text x={(CHART.l + CHART.r) / 2} y={CHART.b + 30} fontSize="10" textAnchor="middle" fill="#8DA2BF">Pump edilmiş həcm, bbl</text>
            {[dpMin, 0, dpMax].map((d, i) => (
              <text key={i} x={CHART.l - 5} y={cy(d) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{f0(d)}</text>
            ))}
            <text transform={`translate(${CHART.l - 34} ${(CHART.t + CHART.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">Δp, psi</text>
          </g>
        </svg>

        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <button
            onClick={() => {
              if (vpC >= vBump - 1e-6) setVp(0);
              setPlaying((p) => !p);
            }}
            className="px-4 py-2 rounded-xl text-[12px] font-semibold font-['Space_Grotesk']"
            style={{ background: ACCENT, color: "#080C18" }}
          >
            {playing ? "Dayandır" : vpC >= vBump - 1e-6 ? "Yenidən başla" : "Pump et"}
          </button>
          <button
            onClick={() => {
              setPlaying(false);
              setVp(0);
            }}
            className="px-3 py-2 rounded-xl text-[12px] border border-[rgba(255,255,255,0.12)] text-[#D5DEF0] font-['Space_Grotesk']"
          >
            Sıfırla
          </button>
          <div className="flex-1 min-w-[220px]">
            <Slider label="Pump edilmiş həcm" unit="bbl" value={vpC} min={0} max={Math.round(vBump)} step={1} accent={ACCENT} onChange={(v) => { setPlaying(false); setVp(v); }} />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {[MUD, ...train, DISP].map((fl) => (
            <span key={fl.name} className="inline-flex items-center gap-1.5 text-[11px] text-[#B7C5DD] font-['Space_Grotesk']">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: fl.color }} />
              {fl.name} ({f1(fl.ppg)} ppg{fl.vol ? `, ${f0(fl.vol)} bbl` : ""})
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Anlıq vəziyyət</p>
          <p className="text-[13px] font-semibold text-[#F0F4FF] mb-3">{stage}</p>
          {[
            ["Pump edilən həcm", `${f0(vpC)} / ${f0(vBump)} bbl`, undefined],
            ["Annulus təzyiqi (shoe)", `${f0(pann)} psi`, undefined],
            ["Casing daxili təzyiq (shoe)", `${f0(pcas)} psi`, undefined],
            ["Δp (annulus − casing)", `${f0(dp)} psi`, free ? "#F87171" : undefined],
            ["Shoe-da EMW", `${f1(emw)} ppg`, emwOk ? "#34D399" : "#F87171"],
          ].map(([k, v, c]) => (
            <div key={String(k)} className="flex justify-between items-baseline border-t border-[rgba(255,255,255,0.05)] py-1.5">
              <span className="text-[12px] text-[#8DA2BF]">{k}</span>
              <span className="font-mono text-[13px] font-semibold" style={{ color: (c as string | undefined) ?? "#F0F4FF" }}>{v}</span>
            </div>
          ))}
          <p className="mt-2 rounded-lg px-3 py-2 text-[12px]" style={{ background: emwOk ? "#34D39914" : "#F8717114", color: emwOk ? "#A7F3D0" : "#FCA5A5" }}>
            {emwOk ? `EMW çat qradiyentindən (${f1(frac)} ppg) aşağıdır: formasiya yarılmır.` : `EMW çat qradiyentini (${f1(frac)} ppg) aşdı: itkili sirkulyasiya riski.`}
          </p>
          {free && <p className="mt-2 rounded-lg px-3 py-2 text-[12px] bg-[#F8717114] text-[#FCA5A5]">Casing daxilindəki sütun annulusdan ağırdır: axın nasossuz da hərəkət edir (U-tube / free fall). Nasos və geri dönüş axını nəzarətdə saxlanmalıdır.</p>}
          {job.bumped && <p className="mt-2 rounded-lg px-3 py-2 text-[12px] bg-[#34D39914] text-[#A7F3D0]">Plug bump: təzyiq sıçrayır. Sonra təzyiq buraxılır və geri axının olmadığı yoxlanılır (float equipment).</p>}
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>İş parametrləri</p>
          <Slider label="Spacer həcmi" unit="bbl" value={spacerVol} min={10} max={100} step={5} accent="#A78BFA" onChange={(v) => { setPlaying(false); setVp(0); setSpacerVol(v); }} />
          <Slider label="Lead slurry həcmi" unit="bbl" value={leadVol} min={50} max={Math.round(vols.total - 20)} step={5} accent="#38BDF8" onChange={(v) => { setPlaying(false); setVp(0); setLeadVol(v); }} />
          <Slider label="Lead sıxlığı" unit="ppg" value={leadPpg} min={11.5} max={15} step={0.1} accent="#38BDF8" onChange={(v) => { setPlaying(false); setLeadPpg(v); }} decimals={1} />
          <Slider label="Tail mix suyu" unit="gal/sk" value={tailWater} min={4.4} max={6.5} step={0.1} accent={ACCENT} onChange={(v) => { setPlaying(false); setTailWater(v); }} decimals={1} />
          <Slider label="Excess" unit="" value={excess * 100} min={0} max={80} step={5} accent={ACCENT} onChange={(v) => { setPlaying(false); setVp(0); setExcess(v / 100); }} />
          <Slider label="Shoe-da çat qradiyenti" unit="ppg" value={frac} min={12} max={17} step={0.1} accent="#F87171" onChange={setFrac} decimals={1} />
          <p className="text-[11px] text-[#6B82A0] leading-relaxed font-['Space_Grotesk']">
            Ümumi slurry: <b className="text-[#B7C5DD]">{f0(vols.total)} bbl</b> (excess {f0(excess * 100)}%). Tail: {f0(tailVol)} bbl, {f1(tailMix.densityPpg)} ppg.
            Displacement: <b className="text-[#B7C5DD]">{f0(capacityBblFt(geom.casingId) * (SHOE - geom.trackFt))} bbl</b>.
          </p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>"Pump et" düyməsini bas və lead slurry annulusa çıxanda Δp-nin necə dəyişdiyinə bax.</li>
            <li>Lead sıxlığını 14.5 ppg-yə qaldır: EMW çat qradiyentinə yaxınlaşır?</li>
            <li>Excess-i 0%-ə endir: TOC niyə aşağı düşür?</li>
            <li>Çat qradiyentini 13.5 ppg-ə sal və iş boyu EMW-ni izlə.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
