"use client";

import { useMemo, useState } from "react";
import Slider from "../Slider";
import {
  carryingCapacityIndex,
  circulatingSystem,
  optimizeBitHydraulics,
  parasiticFit,
  type HydraulicsModel,
  type FlowRegime,
  type Rheo,
  type SystemInput,
} from "@/lib/drilling/hydraulics";
import { binghamParams } from "@/lib/drilling/hydraulics";
import type { LearnerMode } from "@/lib/modules/types";

const ACCENT = "#FBBF24";
const COLORS = { surface: "#6B82A0", string: "#00D4FF", bit: "#FF6B2B", annulus: "#A78BFA" };

const GEOMETRY = {
  holeIn: 8.5,
  casingIdIn: 8.681,
  dpOdIn: 5,
  dpIdIn: 4.276,
  dcOdIn: 6.5,
  dcIdIn: 2.813,
  dcLen: 600,
};

function normalize(r: Rheo): Rheo {
  const t300 = Math.min(r.t300, r.t600 - 2);
  const t100 = Math.min(r.t100, t300 - 1);
  const t3 = Math.min(r.t3, Math.max(0.5, t100 * 0.5));
  return { t600: r.t600, t300, t100, t3 };
}

const REGIME: Record<FlowRegime, string> = { laminar: "laminar", transitional: "keçid", turbulent: "turbulent" };
const f0 = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 0 });
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const f2 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function HydraulicsSimulator({ mode }: { mode: LearnerMode }) {
  const [model, setModel] = useState<HydraulicsModel>("bingham");
  const [mw, setMw] = useState(12);
  const [gpm, setGpm] = useState(450);
  const [nozzle, setNozzle] = useState(13);
  const [depth, setDepth] = useState(10000);
  const [shoe, setShoe] = useState(4000);
  const [pMax, setPMax] = useState(3500);
  const [fg, setFg] = useState(14);
  const [margin, setMargin] = useState(0.5);
  const [rheo, setRheoState] = useState<Rheo>({ t600: 58, t300: 36, t100: 18, t3: 5 });
  const setRheo = (p: Partial<Rheo>) => setRheoState((r) => normalize({ ...r, ...p }));

  const base: Omit<SystemInput, "gpm"> = useMemo(
    () => ({
      model,
      mw,
      rheo,
      depth,
      shoe: Math.min(shoe, depth - GEOMETRY.dcLen - 500),
      ...GEOMETRY,
      nozzles32: [nozzle, nozzle, nozzle],
      surfaceRefPsi: 100,
    }),
    [model, mw, rheo, depth, shoe, nozzle]
  );

  const sys = useMemo(() => circulatingSystem({ ...base, gpm }), [base, gpm]);

  const curve = useMemo(() => {
    const pts: { q: number; para: number; bit: number; total: number }[] = [];
    for (let q = 100; q <= 900; q += 25) {
      const s = circulatingSystem({ ...base, gpm: q });
      pts.push({ q, para: s.parasitic, bit: s.bit, total: s.total });
    }
    return pts;
  }, [base]);

  const opt = useMemo(() => {
    const lo = circulatingSystem({ ...base, gpm: gpm * 0.7 });
    if (!(lo.parasitic > 0 && sys.parasitic > lo.parasitic)) return null;
    const { m, c } = parasiticFit(lo.parasitic, gpm * 0.7, sys.parasitic, gpm);
    if (!(m > 0) || !Number.isFinite(c)) return null;
    const o = optimizeBitHydraulics({ pMax, m, c, rho: mw });
    const nz = (tfa: number) => 32 * Math.sqrt((4 * tfa) / (3 * Math.PI));
    return { m, ...o, nzHhp: nz(o.hhp.tfa), nzJet: nz(o.jet.tfa) };
  }, [base, gpm, sys.parasitic, pMax, mw]);

  const { pv, yp } = binghamParams(rheo);
  const ecdLimit = fg - margin;
  const cci = carryingCapacityIndex({ mw, avFtMin: sys.annularVelocityOpenFtMin, t600: rheo.t600, t300: rheo.t300 });

  const alerts: { tone: "bad" | "warn" | "good"; text: string }[] = [];
  if (!sys.valid) alerts.push({ tone: "bad", text: "Həndəsə və ya parametrlər etibarsızdır." });
  if (sys.total > pMax) alerts.push({ tone: "bad", text: `Nasos təzyiqi (${f0(sys.total)} psi) limiti (${f0(pMax)} psi) aşır: axını azalt və ya nozzle-ləri böyüt.` });
  if (sys.ecd > ecdLimit) alerts.push({ tone: "bad", text: `ECD (${f2(sys.ecd)} ppg) çat həddindən (${f2(ecdLimit)} ppg) yuxarıdır: lost circulation riski (mud window).` });
  if (cci < 0.5) alerts.push({ tone: "warn", text: `CCI = ${f2(cci)}: hole cleaning üçün aşağı göstərici (təlimat həddi: ≥ 1 yaxşı, < 0.5 zəif).` });
  if (sys.bitFraction < 0.4) alerts.push({ tone: "warn", text: "Bit-də təzyiq payı aşağıdır (< 40%): bit-in təmizlənməsi və ROP üçün hidravlik enerji az istifadə olunur." });
  if (!alerts.length) alerts.push({ tone: "good", text: "Pump limiti, ECD həddi və hole cleaning göstəriciləri qəbul edilən diapazondadır." });

  const parts = [
    { key: "surface", label: "Səth avadanlığı", v: sys.surface, c: COLORS.surface },
    { key: "string", label: "Drill string (içəri)", v: sys.pipe.dp + sys.collars.dp, c: COLORS.string },
    { key: "bit", label: "Bit", v: sys.bit, c: COLORS.bit },
    { key: "ann", label: "Halqa", v: sys.annulus, c: COLORS.annulus },
  ];

  const rows: { name: string; dp: number; av: number; regime: FlowRegime }[] = [
    { name: "Drill pipe (içəri)", dp: sys.pipe.dp, av: sys.pipe.velocity * 60, regime: sys.pipe.regime },
    { name: "Collars (içəri)", dp: sys.collars.dp, av: sys.collars.velocity * 60, regime: sys.collars.regime },
    { name: "Halqa: collars / açıq quyu", dp: sys.annDcOpen.dp, av: sys.annDcOpen.velocity * 60, regime: sys.annDcOpen.regime },
    { name: "Halqa: pipe / açıq quyu", dp: sys.annDpOpen.dp, av: sys.annDpOpen.velocity * 60, regime: sys.annDpOpen.regime },
    { name: "Halqa: pipe / casing", dp: sys.annDpCased.dp, av: sys.annDpCased.velocity * 60, regime: sys.annDpCased.regime },
  ];

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.25fr)_340px] gap-6">
      <div className="space-y-5">
        {/* Təzyiq paylanması */}
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
          <div className="flex justify-between items-baseline mb-3 font-['Space_Grotesk']">
            <h3 className="text-[14px] font-semibold text-[#F0F4FF]">Nasos təzyiqinin paylanması</h3>
            <span className="font-mono text-[15px] font-bold" style={{ color: sys.total > pMax ? "#F87171" : "#F0F4FF" }}>{f0(sys.total)} psi</span>
          </div>
          <div className="flex h-7 rounded-lg overflow-hidden bg-[#101A2E]">
            {parts.map((p) => (
              <div key={p.key} style={{ width: `${(p.v / Math.max(sys.total, 1)) * 100}%`, background: p.c }} title={`${p.label}: ${f0(p.v)} psi`} />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
            {parts.map((p) => (
              <div key={p.key} className="text-[11px] font-['Space_Grotesk']">
                <span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5 align-middle" style={{ background: p.c }} />
                <span className="text-[#8DA2BF]">{p.label}</span>
                <div className="font-mono text-[13px] text-[#F0F4FF] mt-0.5">{f0(p.v)} psi <span className="text-[#6B82A0]">({f0((p.v / Math.max(sys.total, 1)) * 100)}%)</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Əyrilər */}
        <PressureFlowChart curve={curve} pMax={pMax} q={gpm} total={sys.total} opt={opt} />

        {/* Cədvəl */}
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 overflow-x-auto">
          <h3 className="text-[14px] font-semibold text-[#F0F4FF] mb-2 font-['Space_Grotesk']">Seqmentlər üzrə nəticə</h3>
          <table className="w-full text-[12px] font-['Space_Grotesk']">
            <thead>
              <tr className="text-left text-[#6B82A0]">
                <th className="py-1.5 pr-3 font-medium">Seqment</th>
                <th className="py-1.5 pr-3 font-medium">ΔP (psi)</th>
                <th className="py-1.5 pr-3 font-medium">Sürət (ft/dəq)</th>
                <th className="py-1.5 font-medium">Rejim</th>
              </tr>
            </thead>
            <tbody className="text-[#D5DEF0]">
              {rows.map((r) => (
                <tr key={r.name} className="border-t border-[rgba(255,255,255,0.05)]">
                  <td className="py-1.5 pr-3">{r.name}</td>
                  <td className="py-1.5 pr-3 font-mono">{f0(r.dp)}</td>
                  <td className="py-1.5 pr-3 font-mono">{f0(r.av)}</td>
                  <td className="py-1.5" style={{ color: r.regime === "turbulent" ? "#FBBF24" : r.regime === "laminar" ? "#34D399" : "#A78BFA" }}>{REGIME[r.regime]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {mode === "student" && (
            <p className="mt-3 text-[11px] text-[#6B82A0] leading-relaxed font-['Space_Grotesk']">
              Boru daxilində axın adətən turbulentdir (böyük sürət), halqada isə laminar olması gözlənilir. Rejim kritik sürətlə müəyyən olunur: sürət kritik həddi keçəndə itki kəskin artır.
            </p>
          )}
        </div>

        {/* Optimallaşdırma */}
        {opt && (
          <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
            <h3 className="text-[14px] font-semibold text-[#F0F4FF] mb-1">Bit hidravlikasının optimallaşdırılması</h3>
            <p className="text-[11px] text-[#6B82A0] mb-3">Parasitik itki eksponenti m ≈ {f2(opt.m)} (0.7·q və q nöqtələrindən). P_max = {f0(pMax)} psi.</p>
            <div className="grid sm:grid-cols-2 gap-3 text-[12px]">
              {[
                { t: "Max HHP kriteriyası", o: opt.hhp, nz: opt.nzHhp, color: "#34D399" },
                { t: "Max jet impact kriteriyası", o: opt.jet, nz: opt.nzJet, color: "#A78BFA" },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#101A2E] p-3">
                  <p className="font-semibold mb-1.5" style={{ color: x.color }}>{x.t}</p>
                  <p className="text-[#B7C5DD]">Axın: <b className="font-mono">{f0(x.o.gpm)} gpm</b></p>
                  <p className="text-[#B7C5DD]">Bit ΔP: <b className="font-mono">{f0(x.o.dpBit)} psi</b> ({f0(x.o.fraction * 100)}%)</p>
                  <p className="text-[#B7C5DD]">TFA: <b className="font-mono">{f2(x.o.tfa)} in²</b> (3 nozzle ≈ {f1(x.nz)}/32)</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#6B82A0] mt-3 leading-relaxed">
              Optimal axın hole cleaning üçün lazım olan minimumdan aşağı və ya pump/ECD limitindən yuxarı ola bilər: real dizaynda bu məhdudiyyətlər optimumu daraldır.
            </p>
          </div>
        )}
      </div>

      {/* Nəticələr və idarəetmə */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Göstəricilər</p>
          {[
            ["ECD", `${f2(sys.ecd)} ppg`],
            ["Çat həddi (FG − margin)", `${f2(ecdLimit)} ppg`],
            ["TFA", `${f2(sys.tfa)} in²`],
            ["Nozzle sürəti", `${f0(sys.nozzleVelocity)} ft/s`],
            ["Bit HHP", `${f0(sys.hhpBit)} hp`],
            ["HSI", `${f2(sys.hsi)} hp/in²`],
            ["Jet impact", `${f0(sys.jetImpact)} lbf`],
            ["Bit təzyiq payı", `${f0(sys.bitFraction * 100)} %`],
            ["Halqada sürət (açıq quyu, pipe)", `${f0(sys.annularVelocityOpenFtMin)} ft/dəq`],
            ["CCI", f2(cci)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-t border-[rgba(255,255,255,0.05)] py-1.5 text-[12px]">
              <span className="text-[#8DA2BF]">{k}</span>
              <span className="font-mono font-semibold text-[#F0F4FF]">{v}</span>
            </div>
          ))}
          <div className="mt-3 space-y-2">
            {alerts.map((a, i) => (
              <p
                key={i}
                className="rounded-lg px-3 py-2 text-[11.5px] leading-snug"
                style={{
                  background: a.tone === "bad" ? "#F8717114" : a.tone === "warn" ? "#FBBF2414" : "#34D39914",
                  color: a.tone === "bad" ? "#FCA5A5" : a.tone === "warn" ? "#FDE68A" : "#A7F3D0",
                }}
              >
                {a.text}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Rejim və model</p>
          <div className="flex rounded-lg p-0.5 border border-[rgba(255,255,255,0.08)] bg-[#080C18]">
            {(["bingham", "powerlaw"] as const).map((m) => (
              <button key={m} onClick={() => setModel(m)} className="flex-1 py-1.5 rounded-md text-[12px] font-semibold font-['Space_Grotesk']"
                style={model === m ? { background: ACCENT, color: "#080C18" } : { color: "#6B82A0" }}>
                {m === "bingham" ? "Bingham plastic" : "Power law (API 13D)"}
              </button>
            ))}
          </div>
          <Slider label="Axın sürəti" unit="gpm" value={gpm} min={200} max={800} step={10} accent={ACCENT} onChange={setGpm} />
          <Slider label="Nozzle ölçüsü (3 ədəd)" unit="/32 in" value={nozzle} min={8} max={24} step={1} accent={ACCENT} onChange={setNozzle} />
          <Slider label="Məhlul çəkisi" unit="ppg" value={mw} min={9} max={16} step={0.1} decimals={1} accent={ACCENT} onChange={setMw} />
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Rheology (dial oxunuşları)</p>
          <Slider label="θ600" unit="" value={rheo.t600} min={30} max={140} step={1} accent={ACCENT} onChange={(v) => setRheo({ t600: v })} />
          <Slider label="θ300" unit="" value={rheo.t300} min={20} max={100} step={1} accent={ACCENT} onChange={(v) => setRheo({ t300: v })} />
          <Slider label="θ100" unit="" value={rheo.t100} min={10} max={60} step={1} accent={ACCENT} onChange={(v) => setRheo({ t100: v })} />
          <Slider label="θ3" unit="" value={rheo.t3} min={1} max={20} step={1} accent={ACCENT} onChange={(v) => setRheo({ t3: v })} />
          <p className="text-[11px] text-[#6B82A0] font-['Space_Grotesk']">PV = {f1(pv)} cP, YP = {f1(yp)} lb/100ft². Dəyərlər bir-birinə uyğun saxlanılır (θ600 &gt; θ300 &gt; θ100 &gt; θ3).</p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Quyu və limitlər</p>
          <Slider label="Dərinlik (şaquli)" unit="ft" value={depth} min={6000} max={15000} step={500} accent={ACCENT} onChange={setDepth} />
          <Slider label="Casing shoe" unit="ft" value={Math.min(shoe, depth - 1100)} min={1000} max={Math.max(1500, depth - 1100)} step={250} accent={ACCENT} onChange={setShoe} />
          <Slider label="Nasos təzyiq limiti" unit="psi" value={pMax} min={2500} max={5000} step={100} accent={ACCENT} onChange={setPMax} />
          <Slider label="Çat qradiyenti (FG)" unit="ppg" value={fg} min={12} max={18} step={0.1} decimals={1} accent={ACCENT} onChange={setFg} />
          <Slider label="Çat margini" unit="ppg" value={margin} min={0} max={1.5} step={0.1} decimals={1} accent={ACCENT} onChange={setMargin} />
          <p className="text-[11px] text-[#6B82A0] leading-relaxed font-['Space_Grotesk']">
            Sabit həndəsə: 8.5 in quyu, 9 5/8″ casing (ID 8.681), 5″ drill pipe (ID 4.276), 6.5″ collars (ID 2.813, 600 ft). Şaquli quyu. Səth itkisi 450 gpm və 12 ppg üçün 100 psi qəbul edilib.
          </p>
        </div>
      </div>
    </div>
  );
}

function PressureFlowChart({
  curve, pMax, q, total, opt,
}: {
  curve: { q: number; para: number; bit: number; total: number }[];
  pMax: number;
  q: number;
  total: number;
  opt: { hhp: { gpm: number }; jet: { gpm: number } } | null;
}) {
  const W = 560, H = 330, M = { l: 54, r: 14, t: 14, b: 40 };
  const xMin = 100, xMax = 900;
  const yMax = Math.ceil(Math.max(pMax * 1.15, ...curve.map((c) => c.total)) / 500) * 500;
  const x = (v: number) => M.l + ((v - xMin) / (xMax - xMin)) * (W - M.l - M.r);
  const y = (v: number) => H - M.b - (v / yMax) * (H - M.t - M.b);
  const path = (k: "para" | "bit" | "total") => curve.map((c, i) => `${i ? "L" : "M"}${x(c.q).toFixed(1)},${y(c[k]).toFixed(1)}`).join(" ");
  const yTicks: number[] = [];
  for (let v = 0; v <= yMax; v += 500) yTicks.push(v);

  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
      <h3 className="text-[14px] font-semibold text-[#F0F4FF] mb-2 font-['Space_Grotesk']">Təzyiq və axın sürəti</h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Parasitik itki, bit təzyiqi və ümumi nasos təzyiqi axın sürətindən asılı olaraq">
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={M.l} x2={W - M.r} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.05)" />
            <text x={M.l - 6} y={y(v) + 3} textAnchor="end" fontSize="10" fill="#6B82A0">{v}</text>
          </g>
        ))}
        {[100, 300, 500, 700, 900].map((v) => (
          <g key={v}>
            <line x1={x(v)} x2={x(v)} y1={M.t} y2={H - M.b} stroke="rgba(255,255,255,0.04)" />
            <text x={x(v)} y={H - M.b + 14} textAnchor="middle" fontSize="10" fill="#6B82A0">{v}</text>
          </g>
        ))}
        <text x={(M.l + W - M.r) / 2} y={H - 6} textAnchor="middle" fontSize="11" fill="#8DA2BF">Axın sürəti, gpm</text>
        <text transform={`translate(12 ${(M.t + H - M.b) / 2}) rotate(-90)`} textAnchor="middle" fontSize="11" fill="#8DA2BF">Təzyiq, psi</text>

        <line x1={M.l} x2={W - M.r} y1={y(pMax)} y2={y(pMax)} stroke="#F87171" strokeDasharray="5 4" />
        <text x={W - M.r - 4} y={y(pMax) - 4} textAnchor="end" fontSize="10" fill="#F87171">P_max</text>

        {opt && (
          <>
            {opt.hhp.gpm >= xMin && opt.hhp.gpm <= xMax && (
              <g><line x1={x(opt.hhp.gpm)} x2={x(opt.hhp.gpm)} y1={M.t} y2={H - M.b} stroke="#34D399" strokeDasharray="3 3" /><text x={x(opt.hhp.gpm) + 3} y={M.t + 10} fontSize="9" fill="#34D399">max HHP</text></g>
            )}
            {opt.jet.gpm >= xMin && opt.jet.gpm <= xMax && (
              <g><line x1={x(opt.jet.gpm)} x2={x(opt.jet.gpm)} y1={M.t} y2={H - M.b} stroke="#A78BFA" strokeDasharray="3 3" /><text x={x(opt.jet.gpm) + 3} y={M.t + 22} fontSize="9" fill="#A78BFA">max impact</text></g>
            )}
          </>
        )}

        <path d={path("para")} fill="none" stroke="#00D4FF" strokeWidth="2" />
        <path d={path("bit")} fill="none" stroke="#FF6B2B" strokeWidth="2" />
        <path d={path("total")} fill="none" stroke="#F0F4FF" strokeWidth="2.2" />
        <circle cx={x(q)} cy={y(total)} r="5" fill="#FBBF24" stroke="#080C18" strokeWidth="1.5" />

        <g fontSize="10" transform={`translate(${M.l + 10} ${M.t + 8})`}>
          {[["#F0F4FF", "Nasos təzyiqi (cəmi)"], ["#00D4FF", "Parasitik itki (səth + boru + halqa)"], ["#FF6B2B", "Bit ΔP"], ["#FBBF24", "Cari iş nöqtəsi"]].map(([c, t], i) => (
            <g key={t} transform={`translate(0 ${i * 14 + 14})`}>
              <line x1="0" x2="16" y1="4" y2="4" stroke={c} strokeWidth="2.5" />
              <text x="22" y="8" fill="#B7C5DD">{t}</text>
            </g>
          ))}
        </g>
      </svg>
      <p className="text-[11px] text-[#6B82A0] mt-2 leading-relaxed font-['Space_Grotesk']">
        Axın artdıqca parasitik itki və bit ΔP artır. Nasos təzyiqi P_max-a çatanda axını daha artırmaq mümkün olmur: optimum nozzle seçimi bu iki əyrinin nə vaxt kəsişdiyini idarə edir.
      </p>
    </div>
  );
}
