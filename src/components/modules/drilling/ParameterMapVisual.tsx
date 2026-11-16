"use client";

import { useMemo, useState } from "react";
import Slider from "../Slider";
import { bitArea, maxWobForTorque, ropModel, type RopModelInput } from "@/lib/drilling/bits";

const ACCENT = "#FBBF24";
const PRESETS = {
  pdc: { name: "PDC", mu: 0.55, eta0: 0.35 },
  tci: { name: "TCI roller cone", mu: 0.3, eta0: 0.3 },
} as const;
type PresetKey = keyof typeof PRESETS;

const W_RANGE: [number, number] = [4, 80]; // klbf
const N_RANGE: [number, number] = [40, 220]; // rpm
const GX = 26;
const GY = 22;

const f0 = (v: number) => Math.round(v).toLocaleString("en-US");

export default function ParameterMapVisual() {
  const [bit, setBit] = useState<PresetKey>("pdc");
  const [dIn, setDIn] = useState(8.5);
  const [ccs, setCcs] = useState(12000);
  const [wob, setWob] = useState(30);
  const [rpm, setRpm] = useState(120);
  const [wfPerIn, setWfPerIn] = useState(4);
  const [nf, setNf] = useState(150);
  const [tMax, setTMax] = useState(12);
  const [mu, setMu] = useState<number>(PRESETS.pdc.mu);

  const preset = PRESETS[bit];
  const base = useMemo<Omit<RopModelInput, "wob" | "rpm">>(
    () => ({ dIn, ccs, mu, eta0: preset.eta0, founderWob: wfPerIn * 1000 * dIn, founderRpm: nf }),
    [dIn, ccs, mu, preset.eta0, wfPerIn, nf]
  );

  const cur = ropModel({ ...base, wob: wob * 1000, rpm });
  const torqueOk = cur.torque <= tMax * 1000;
  const wobCap = Math.min(W_RANGE[1], maxWobForTorque(tMax * 1000, mu, dIn) / 1000);

  const grid = useMemo(() => {
    const cells: { w: number; n: number; rop: number; ok: boolean }[][] = [];
    let best = { w: 0, n: 0, rop: 0 };
    let maxRop = 1;
    for (let j = 0; j < GY; j++) {
      const row: { w: number; n: number; rop: number; ok: boolean }[] = [];
      const n = N_RANGE[0] + ((N_RANGE[1] - N_RANGE[0]) * j) / (GY - 1);
      for (let i = 0; i < GX; i++) {
        const w = W_RANGE[0] + ((W_RANGE[1] - W_RANGE[0]) * i) / (GX - 1);
        const r = ropModel({ ...base, wob: w * 1000, rpm: n });
        const ok = r.torque <= tMax * 1000;
        row.push({ w, n, rop: r.rop, ok });
        if (r.rop > maxRop) maxRop = r.rop;
        if (ok && r.rop > best.rop) best = { w, n, rop: r.rop };
      }
      cells.push(row);
    }
    return { cells, best, maxRop };
  }, [base, tMax]);

  // heatmap geometri
  const HM = { x: 56, y: 24, w: 400, h: 300 };
  const cw = HM.w / GX;
  const ch = HM.h / GY;
  const wx = (w: number) => HM.x + ((w - W_RANGE[0]) / (W_RANGE[1] - W_RANGE[0])) * HM.w;
  const ny = (n: number) => HM.y + HM.h - ((n - N_RANGE[0]) / (N_RANGE[1] - N_RANGE[0])) * HM.h;
  const color = (r: number) => `hsl(${220 - 190 * Math.min(1, r / grid.maxRop)}, 80%, ${22 + 33 * Math.min(1, r / grid.maxRop)}%)`;

  // WOB əyrisi (cari rpm) və RPM əyrisi (cari WOB)
  const wobCurve = Array.from({ length: 40 }, (_, i) => {
    const w = W_RANGE[0] + ((W_RANGE[1] - W_RANGE[0]) * i) / 39;
    const r = ropModel({ ...base, wob: w * 1000, rpm });
    return { x: w, rop: r.rop, mse: r.mse };
  });
  const maxC = Math.max(...wobCurve.map((p) => p.rop), 1);
  const LC = { x: 520, y: 24, w: 230, h: 130 };
  const lx = (w: number) => LC.x + ((w - W_RANGE[0]) / (W_RANGE[1] - W_RANGE[0])) * LC.w;
  const ly = (r: number) => LC.y + LC.h - (r / maxC) * LC.h;
  const msePath = (() => {
    const mMax = Math.max(...wobCurve.map((p) => p.mse));
    const mMin = Math.min(...wobCurve.map((p) => p.mse));
    const LC2 = { y: 190, h: 130 };
    return {
      y: LC2.y,
      h: LC2.h,
      d: wobCurve.map((p, i) => `${i ? "L" : "M"}${lx(p.x).toFixed(1)},${(LC2.y + LC2.h - ((p.mse - mMin) / Math.max(1, mMax - mMin)) * LC2.h).toFixed(1)}`).join(" "),
      mMin,
      mMax,
    };
  })();

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.7fr)_320px] gap-6">
      <div>
        <svg viewBox="0 0 780 380" className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="img" aria-label="WOB və RPM üzrə ROP xəritəsi">
          <text x={HM.x} y="16" fontSize="11" fill="#F0F4FF" fontWeight="600">ROP xəritəsi (ft/hr)</text>
          {grid.cells.map((row, j) =>
            row.map((c, i) => (
              <rect key={`${i}-${j}`} x={HM.x + i * cw} y={HM.y + HM.h - (j + 1) * ch} width={cw + 0.5} height={ch + 0.5} fill={c.ok ? color(c.rop) : "#1A1F2B"} opacity={c.ok ? 1 : 0.9} />
            ))
          )}
          {/* torque limiti ilə məhdud sahə */}
          {grid.cells.some((r) => r.some((c) => !c.ok)) && (
            <line x1={wx(wobCap)} y1={HM.y} x2={wx(wobCap)} y2={HM.y + HM.h} stroke="#F87171" strokeDasharray="5 4" strokeWidth="2" />
          )}
          {/* founder */}
          <line x1={wx(Math.min(W_RANGE[1], (wfPerIn * dIn)))} y1={HM.y} x2={wx(Math.min(W_RANGE[1], wfPerIn * dIn))} y2={HM.y + HM.h} stroke="#34D399" strokeDasharray="3 3" />
          <line x1={HM.x} y1={ny(nf)} x2={HM.x + HM.w} y2={ny(nf)} stroke="#34D399" strokeDasharray="3 3" />
          {/* ən yaxşı və cari */}
          <polygon points={`${wx(grid.best.w)},${ny(grid.best.n) - 8} ${wx(grid.best.w) + 7},${ny(grid.best.n) + 6} ${wx(grid.best.w) - 7},${ny(grid.best.n) + 6}`} fill="#FBBF24" stroke="#080C18" strokeWidth="1.5" />
          <circle cx={wx(wob)} cy={ny(rpm)} r="6" fill="#fff" stroke="#080C18" strokeWidth="2" />
          {/* oxlar */}
          {[10, 20, 30, 40, 50, 60, 70, 80].map((w) => (
            <text key={w} x={wx(w)} y={HM.y + HM.h + 14} fontSize="10" textAnchor="middle" fill="#6B82A0">{w}</text>
          ))}
          {[60, 100, 140, 180, 220].map((n) => (
            <text key={n} x={HM.x - 6} y={ny(n) + 3} fontSize="10" textAnchor="end" fill="#6B82A0">{n}</text>
          ))}
          <text x={HM.x + HM.w / 2} y={HM.y + HM.h + 30} fontSize="11" textAnchor="middle" fill="#8DA2BF">WOB, klbf</text>
          <text transform={`translate(14 ${HM.y + HM.h / 2}) rotate(-90)`} fontSize="11" textAnchor="middle" fill="#8DA2BF">RPM</text>
          <g fontSize="9" transform={`translate(${HM.x + 6} ${HM.y + HM.h + 44})`}>
            <circle cx="5" cy="-3" r="4.5" fill="#fff" /><text x="14" y="0" fill="#B7C5DD">cari nöqtə</text>
            <polygon points="90,-9 97,3 83,3" fill="#FBBF24" /><text x="103" y="0" fill="#B7C5DD">ən yaxşı (torque limiti daxilində)</text>
            <line x1="270" y1="-3" x2="288" y2="-3" stroke="#34D399" strokeDasharray="3 3" /><text x="294" y="0" fill="#B7C5DD">founder həddləri</text>
            <line x1="372" y1="-3" x2="390" y2="-3" stroke="#F87171" strokeDasharray="5 4" strokeWidth="2" /><text x="396" y="0" fill="#B7C5DD">torque limiti (WOB)</text>
          </g>

          {/* ROP vs WOB */}
          <text x={LC.x} y="16" fontSize="11" fill="#F0F4FF" fontWeight="600">ROP – WOB ({rpm} rpm)</text>
          <rect x={LC.x} y={LC.y} width={LC.w} height={LC.h} fill="none" stroke="#2A3A55" />
          <path d={wobCurve.map((p, i) => `${i ? "L" : "M"}${lx(p.x).toFixed(1)},${ly(p.rop).toFixed(1)}`).join(" ")} fill="none" stroke="#00D4FF" strokeWidth="2.2" />
          <line x1={lx(wob)} y1={LC.y} x2={lx(wob)} y2={LC.y + LC.h} stroke="#fff" strokeDasharray="3 3" />
          <line x1={lx(Math.min(W_RANGE[1], wfPerIn * dIn))} y1={LC.y} x2={lx(Math.min(W_RANGE[1], wfPerIn * dIn))} y2={LC.y + LC.h} stroke="#34D399" strokeDasharray="3 3" />
          <text x={LC.x + LC.w} y={LC.y + LC.h + 12} fontSize="9" textAnchor="end" fill="#6B82A0">WOB, klbf (4-80)</text>
          <text x={LC.x + 4} y={LC.y + 12} fontSize="9" fill="#6B82A0">maks {f0(maxC)} ft/hr</text>

          {/* MSE vs WOB */}
          <text x={LC.x} y="182" fontSize="11" fill="#F0F4FF" fontWeight="600">MSE – WOB</text>
          <rect x={LC.x} y={msePath.y} width={LC.w} height={msePath.h} fill="none" stroke="#2A3A55" />
          <path d={msePath.d} fill="none" stroke="#FB923C" strokeWidth="2.2" />
          <line x1={lx(wob)} y1={msePath.y} x2={lx(wob)} y2={msePath.y + msePath.h} stroke="#fff" strokeDasharray="3 3" />
          <line x1={lx(Math.min(W_RANGE[1], wfPerIn * dIn))} y1={msePath.y} x2={lx(Math.min(W_RANGE[1], wfPerIn * dIn))} y2={msePath.y + msePath.h} stroke="#34D399" strokeDasharray="3 3" />
          <text x={LC.x + 4} y={msePath.y + 12} fontSize="9" fill="#6B82A0">{f0(msePath.mMax)} psi</text>
          <text x={LC.x + 4} y={msePath.y + msePath.h - 4} fontSize="9" fill="#6B82A0">{f0(msePath.mMin)} psi</text>
          <text x={LC.x + LC.w} y={msePath.y + msePath.h + 12} fontSize="9" textAnchor="end" fill="#6B82A0">WOB, klbf</text>
        </svg>
        <p className="text-[11px] text-[#6B82A0] mt-2 leading-relaxed font-['Space_Grotesk']">
          Təhsil modeli: Pessier–Fear MSE əlaqəsi (ROP = 13.33·μ·N·W / (D·(MSE − W/A)), MSE = CCS/η) və founder effekti. Founder həddindən yuxarıda səmərəlilik η azalır, MSE artır, ROP düşür (WOB və RPM üçün).
          Real əmsallar (μ, η, founder) quyuya və bit-ə görə drill-off test və qazma datası ilə kalibrlənir. Bu simulyator empirik ROP modeli deyil.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Cari nöqtə</p>
          {[
            ["ROP", `${f0(cur.rop)} ft/hr`],
            ["Bit torque-u", `${f0(cur.torque)} ft·lbf`],
            ["MSE", `${f0(cur.mse)} psi`],
            ["Səmərəlilik η", `${(cur.eta * 100).toFixed(0)} %`],
            ["Ən yaxşı nöqtə", `${f0(grid.best.w)} klbf, ${f0(grid.best.n)} rpm`],
            ["Ən yaxşı ROP", `${f0(grid.best.rop)} ft/hr`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-t border-[rgba(255,255,255,0.05)] py-1.5 text-[12px]">
              <span className="text-[#8DA2BF]">{k}</span>
              <span className="font-mono font-semibold text-[#F0F4FF]">{v}</span>
            </div>
          ))}
          {!torqueOk && <p className="mt-3 rounded-lg px-3 py-2 text-[11.5px] bg-[#F8717114] text-[#FCA5A5]">Bit torque-u limiti ({tMax} klb·ft) aşır. Bu WOB-da qazma mümkün deyil.</p>}
          {wob * 1000 > base.founderWob && <p className="mt-2 rounded-lg px-3 py-2 text-[11.5px] bg-[#FBBF2414] text-[#FDE68A]">WOB founder həddindən yuxarıdır: səmərəlilik azalır, MSE artır.</p>}
          {rpm > nf && <p className="mt-2 rounded-lg px-3 py-2 text-[11.5px] bg-[#FBBF2414] text-[#FDE68A]">RPM founder həddindən yuxarıdır: vibrasiya/whirl riski, ROP artmır.</p>}
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Qazma parametrləri</p>
          <Slider label="WOB" unit="klbf" value={wob} min={4} max={80} step={1} accent={ACCENT} onChange={setWob} />
          <Slider label="RPM" unit="" value={rpm} min={40} max={220} step={5} accent={ACCENT} onChange={setRpm} />
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Bit və formasiya</p>
          <div className="flex rounded-lg p-0.5 border border-[rgba(255,255,255,0.08)] bg-[#080C18]">
            {(Object.keys(PRESETS) as PresetKey[]).map((k) => (
              <button key={k} onClick={() => { setBit(k); setMu(PRESETS[k].mu); }} className="flex-1 py-1.5 rounded-md text-[12px] font-semibold font-['Space_Grotesk']" style={bit === k ? { background: ACCENT, color: "#080C18" } : { color: "#6B82A0" }}>
                {PRESETS[k].name}
              </button>
            ))}
          </div>
          <Slider label="Bit diametri" unit="in" value={dIn} min={6} max={17.5} step={0.25} decimals={2} accent={ACCENT} onChange={setDIn} />
          <Slider label="Süxurun CCS (sərtlik)" unit="psi" value={ccs} min={4000} max={30000} step={500} accent={ACCENT} onChange={setCcs} />
          <Slider label="Bit sürtünmə əmsalı μ" unit="" value={mu} min={0.1} max={1} step={0.05} decimals={2} accent={ACCENT} onChange={setMu} />
          <p className="text-[11px] text-[#6B82A0] font-['Space_Grotesk']">Bit sahəsi: {bitArea(dIn).toFixed(1)} in². η maksimum = {(preset.eta0 * 100).toFixed(0)}%.</p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Limitlər</p>
          <Slider label="Founder WOB" unit="klbf/in" value={wfPerIn} min={2} max={6} step={0.25} decimals={2} accent={ACCENT} onChange={setWfPerIn} />
          <Slider label="Founder RPM" unit="" value={nf} min={80} max={220} step={5} accent={ACCENT} onChange={setNf} />
          <Slider label="Torque limiti" unit="klb·ft" value={tMax} min={4} max={40} step={1} accent={ACCENT} onChange={setTMax} />
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>WOB-u artır: ROP nə vaxt artmağı dayandırır (founder)?</li>
            <li>Torque limitini aşağı sal: ən yaxşı nöqtə necə dəyişir?</li>
            <li>CCS-ni 25,000 psi-yə qaldır: ROP və MSE necə dəyişir?</li>
            <li>MSE əyrisində qəfil qalxma hansı vəziyyəti göstərir?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
