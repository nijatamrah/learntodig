"use client";

import { useMemo, useState } from "react";
import Slider from "../Slider";
import { CASINGS_9_5_8, designProfile, surfacePressureGasKick, type DesignRow } from "@/lib/drilling/casing";

const ACCENT = "#FBBF24";
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f2 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CW = 330;
const CH = 380;
const M = { l: 46, r: 12, t: 28, b: 34 };

interface ChartProps {
  title: string;
  unit: string;
  rows: DesignRow[];
  setTvd: number;
  load: (r: DesignRow) => number;
  rating: (r: DesignRow) => number;
  df: number;
  color: string;
}

function Chart({ title, unit, rows, setTvd, load, rating, df, color }: ChartProps) {
  const allow = rows.map((r) => rating(r) / df);
  const xMax = Math.max(...rows.map(load), ...rows.map(rating)) * 1.08 || 1;
  const x = (v: number) => M.l + (v / xMax) * (CW - M.l - M.r);
  const y = (d: number) => M.t + (d / setTvd) * (CH - M.t - M.b);
  const pathOf = (vals: number[]) => rows.map((r, i) => `${i ? "L" : "M"}${x(vals[i]).toFixed(1)},${y(r.d).toFixed(1)}`).join(" ");
  const loads = rows.map(load);
  const fails = rows.some((r, i) => loads[i] > allow[i] + 1e-6);

  // ən kritik nöqtə: minimum SF
  let minI = 0;
  let minSf = Infinity;
  rows.forEach((r, i) => {
    if (loads[i] > 1) {
      const sf = rating(r) / loads[i];
      if (sf < minSf) {
        minSf = sf;
        minI = i;
      }
    }
  });

  // pozulma zonası: yük > icazə verilən
  const failPoly = rows
    .map((r, i) => (loads[i] > allow[i] ? `${x(allow[i]).toFixed(1)},${y(r.d).toFixed(1)} ${x(loads[i]).toFixed(1)},${y(r.d).toFixed(1)}` : null))
    .filter(Boolean) as string[];

  const ticks = [0, 0.25, 0.5, 0.75, 1];
  return (
    <div>
      <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="img" aria-label={`${title} dizayn qrafiki`}>
        <text x={M.l} y="16" fontSize="12" fontWeight="700" fill={color}>{title}</text>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={M.l} x2={CW - M.r} y1={M.t + t * (CH - M.t - M.b)} y2={M.t + t * (CH - M.t - M.b)} stroke="rgba(255,255,255,0.05)" />
            <text x={M.l - 5} y={M.t + t * (CH - M.t - M.b) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{f0(t * setTvd)}</text>
            <line x1={M.l + t * (CW - M.l - M.r)} x2={M.l + t * (CW - M.l - M.r)} y1={M.t} y2={CH - M.b} stroke="rgba(255,255,255,0.04)" />
            <text x={M.l + t * (CW - M.l - M.r)} y={CH - M.b + 13} fontSize="9" textAnchor={t === 1 ? "end" : "middle"} fill="#6B82A0">{f0(t * xMax)}</text>
          </g>
        ))}
        <text x={(M.l + CW - M.r) / 2} y={CH - 6} fontSize="10" textAnchor="middle" fill="#8DA2BF">{unit}</text>
        <text transform={`translate(10 ${(M.t + CH - M.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">TVD, ft</text>

        {failPoly.length > 1 && (
          <polyline points={failPoly.join(" ")} fill="none" stroke="#F87171" strokeWidth="5" opacity="0.25" />
        )}
        <path d={pathOf(rows.map(rating))} fill="none" stroke="#8DA2BF" strokeWidth="1.6" />
        <path d={pathOf(allow)} fill="none" stroke="#34D399" strokeWidth="1.8" strokeDasharray="5 4" />
        <path d={pathOf(loads)} fill="none" stroke={color} strokeWidth="2.6" />
        {Number.isFinite(minSf) && (
          <g>
            <circle cx={x(loads[minI])} cy={y(rows[minI].d)} r="5" fill={minSf >= df ? "#34D399" : "#F87171"} stroke="#080C18" strokeWidth="2" />
            <text x={Math.min(x(loads[minI]) + 8, CW - 74)} y={y(rows[minI].d) - 8} fontSize="10" fill={minSf >= df ? "#A7F3D0" : "#FCA5A5"}>SF {f2(minSf)}</text>
          </g>
        )}
        <g fontSize="9" transform={`translate(${M.l + 6} ${CH - M.b - 40})`}>
          {[["#8DA2BF", "Müqavimət", false], ["#34D399", `Müqavimət / ${df}`, true], [color, "Yük", false]].map(([c, t, d], i) => (
            <g key={String(t)} transform={`translate(0 ${i * 12})`}>
              <line x1="0" x2="16" y1="4" y2="4" stroke={String(c)} strokeWidth="2" strokeDasharray={d ? "4 3" : undefined} />
              <text x="22" y="7" fill="#B7C5DD">{String(t)}</text>
            </g>
          ))}
        </g>
      </svg>
      <p className="mt-1 text-[12px] font-['Space_Grotesk']" style={{ color: fails ? "#FCA5A5" : "#A7F3D0" }}>
        {fails ? `Pozulur: min SF ${Number.isFinite(minSf) ? f2(minSf) : "-"} < ${df}` : `Keçir: min SF ${Number.isFinite(minSf) ? f2(minSf) : "∞"} ≥ ${df}`}
      </p>
    </div>
  );
}

export default function CasingDesignVisual() {
  const [specId, setSpecId] = useState("n80-47");
  const [setTvd, setSetTvd] = useState(9000);
  const [mw, setMw] = useState(10.5);
  const [level, setLevel] = useState(5000); // casing daxilində məhlul səviyyəsi: boşalma dərinliyi (ft)
  const [nextTd, setNextTd] = useState(12500);
  const [pp, setPp] = useState(12.0);
  const [fg, setFg] = useState(14.5);
  const [dfB, setDfB] = useState(1.1);
  const [dfC, setDfC] = useState(1.0);
  const [dfT, setDfT] = useState(1.6);

  const spec = CASINGS_9_5_8.find((s) => s.id === specId)!;
  const levelC = Math.min(level, setTvd);

  const input = { spec, setTvd, mwRun: mw, fluidLevel: levelC, nextTd, nextPorePpg: pp, shoeFracPpg: fg, dfBurst: dfB, dfCollapse: dfC, dfTension: dfT };
  const res = useMemo(() => designProfile(input, 46), [spec, setTvd, mw, levelC, nextTd, pp, fg, dfB, dfC, dfT]); // eslint-disable-line react-hooks/exhaustive-deps
  const kick = surfacePressureGasKick(input);

  const minOf = (arr: number[]) => (arr.length ? Math.min(...arr) : Infinity);
  const sfB = minOf(res.rows.filter((r) => r.burstLoad > 1).map((r) => res.burstRating / r.burstLoad));
  const sfC = minOf(res.rows.filter((r) => r.collapseLoad > 1).map((r) => r.collapseRating / r.collapseLoad));
  const sfT = minOf(res.rows.filter((r) => r.tension > 1).map((r) => res.bodyYield / r.tension));
  const verdict = (sf: number, df: number) => (sf >= df ? { ok: true, c: "#34D399" } : { ok: false, c: "#F87171" });

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Chart title="Burst" unit="Təzyiq, psi" rows={res.rows} setTvd={setTvd} load={(r) => r.burstLoad} rating={() => res.burstRating} df={dfB} color="#F87171" />
        <Chart title="Collapse" unit="Təzyiq, psi" rows={res.rows} setTvd={setTvd} load={(r) => r.collapseLoad} rating={(r) => r.collapseRating} df={dfC} color="#38BDF8" />
        <Chart title="Tension" unit="Qüvvə, lbf" rows={res.rows} setTvd={setTvd} load={(r) => r.tension} rating={() => res.bodyYield} df={dfT} color="#FBBF24" />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Casing seçimi</p>
          <label className="block">
            <span className="block text-[11px] text-[#8DA2BF] mb-1 font-['Space_Grotesk']">Sinif və çəki</span>
            <select value={specId} onChange={(e) => setSpecId(e.target.value)} className="w-full bg-[#080C18] text-[#F0F4FF] text-[13px] rounded-lg px-3 py-2 outline-none border border-[rgba(255,255,255,0.08)]">
              {CASINGS_9_5_8.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </label>
          <Slider label="Shoe dərinliyi" unit="ft" value={setTvd} min={5000} max={13000} step={100} accent={ACCENT} onChange={setSetTvd} />
          <Slider label="Casing arxasındakı/endirmə məhlulu" unit="ppg" value={mw} min={8.6} max={15} step={0.1} accent={ACCENT} onChange={setMw} decimals={1} />
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              ["Tam boşalma", setTvd],
              ["Qismən", Math.round(setTvd * 0.55)],
              ["Dolu", 0],
            ].map(([t, v]) => (
              <button key={String(t)} onClick={() => setLevel(Number(v))} className="px-2 py-1.5 rounded-lg text-[11px] font-semibold border border-[rgba(255,255,255,0.12)] text-[#D5DEF0] hover:border-[rgba(255,255,255,0.3)] font-['Space_Grotesk']">
                {String(t)}
              </button>
            ))}
          </div>
          <Slider label="Casing daxilində boş hissə (məhlul səviyyəsi)" unit="ft" value={levelC} min={0} max={setTvd} step={100} accent={ACCENT} onChange={setLevel} />
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Burst ssenarisi (qaz kick-i)</p>
          <Slider label="Növbəti bölmənin TD-si" unit="ft" value={nextTd} min={setTvd + 500} max={16000} step={100} accent="#F87171" onChange={setNextTd} />
          <Slider label="TD-də məsamə təzyiqi" unit="ppg" value={pp} min={9} max={17} step={0.1} accent="#F87171" onChange={setPp} decimals={1} />
          <Slider label="Shoe-da çat qradiyenti" unit="ppg" value={fg} min={11} max={19} step={0.1} accent="#F87171" onChange={setFg} decimals={1} />
          <p className="text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
            Səth təzyiqi: <b className="font-mono text-[#F0F4FF]">{f0(res.ps)} psi</b>{" "}
            {kick.limitedByShoe ? "(shoe çatı ilə məhdudlaşıb)" : "(məsamə təzyiqi ilə təyin olunub)"}. Casing burst müqaviməti <b className="font-mono text-[#F0F4FF]">{f0(res.burstRating)} psi</b>.
          </p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Dizayn faktorları və nəticə</p>
          <Slider label="Burst DF" unit="" value={dfB} min={1} max={1.5} step={0.05} accent={ACCENT} onChange={setDfB} decimals={2} />
          <Slider label="Collapse DF" unit="" value={dfC} min={0.9} max={1.4} step={0.05} accent={ACCENT} onChange={setDfC} decimals={2} />
          <Slider label="Tension DF" unit="" value={dfT} min={1.2} max={2.2} step={0.05} accent={ACCENT} onChange={setDfT} decimals={2} />
          <div className="space-y-1.5 pt-1">
            {[
              ["Burst", sfB, dfB],
              ["Collapse", sfC, dfC],
              ["Tension", sfT, dfT],
            ].map(([n, sf, df]) => {
              const v = verdict(Number(sf), Number(df));
              return (
                <div key={String(n)} className="flex justify-between items-baseline border-t border-[rgba(255,255,255,0.05)] pt-1.5">
                  <span className="text-[12px] text-[#8DA2BF] font-['Space_Grotesk']">{String(n)} min SF</span>
                  <span className="font-mono text-[13px] font-semibold" style={{ color: v.c }}>
                    {Number.isFinite(Number(sf)) ? f2(Number(sf)) : "∞"} {v.ok ? "✓" : "✗"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
        <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
        <ul className="space-y-1.5 list-disc pl-4">
          <li>"Tam boşalma" düyməsini bas: N-80 47 lb/ft dibdə collapse-da çatışmır. P-110-a keçsən nə olur?</li>
          <li>Shoe-da çat qradiyentini aşağı sal: səth təzyiqi niyə azalır və burst yükü necə dəyişir?</li>
          <li>Məhlul çəkisini artır: tension yükü azalır, collapse yükü isə artır. Hansı limit birinci aşılır?</li>
          <li>J-55 seç: hansı yükdə ilk uğursuz olur?</li>
        </ul>
        <p className="mt-2 text-[11px] text-[#6B82A0]">
          Model: şaquli quyu, vahid casing, sürtünmə itkisi və əyilmə nəzərə alınmır. Collapse müqaviməti tension ilə API 5C3 ellips düsturu ilə azaldılır. Təhsil məqsədlidir.
        </p>
      </div>
    </div>
  );
}
