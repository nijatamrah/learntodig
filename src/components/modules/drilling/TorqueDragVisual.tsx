"use client";

import { useMemo, useState } from "react";
import Slider from "../Slider";
import { buildTrajectory, torqueDrag, torsionalYield, type TdElement, type TdMode, type TdResult } from "@/lib/drilling/torquedrag";
import { steelWeightPerFt } from "@/lib/drilling/drillstring";

const ACCENT = "#FBBF24";
const W = 780;
const H = 560;
const TOP = 50;
const BOT = 500;

const MODES: { id: TdMode; label: string; color: string }[] = [
  { id: "pickup", label: "Pick-up (trip out)", color: "#FB923C" },
  { id: "rotate", label: "Rotating off-bottom", color: "#F0F4FF" },
  { id: "slackoff", label: "Slack-off (trip in)", color: "#22D3EE" },
  { id: "drilling", label: "Drilling (WOB)", color: "#34D399" },
];

const klb = (v: number) => `${(v / 1000).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export default function TorqueDragVisual() {
  const [kop, setKop] = useState(2000);
  const [bur, setBur] = useState(3);
  const [maxInc, setMaxInc] = useState(60);
  const [td, setTd] = useState(14000);
  const [muC, setMuC] = useState(0.25);
  const [muO, setMuO] = useState(0.3);
  const [mw, setMw] = useState(12);
  const [wob, setWob] = useState(30);
  const [bitT, setBitT] = useState(3);
  const [limit, setLimit] = useState(30);
  const [color, setColor] = useState<TdMode>("slackoff");

  const wDc = steelWeightPerFt(6.5, 2.813);
  const calc = useMemo(() => {
    const stations = buildTrajectory({ kop, burDegPer100: bur, maxIncDeg: maxInc, td });
    const els: TdElement[] = [
      { name: "dc", length: 600, wAir: wDc, contactOdIn: 6.5 },
      { name: "hwdp", length: 450, wAir: 49.3, contactOdIn: 5 },
      { name: "dp", length: td - 1050, wAir: 21.9, contactOdIn: 6.625 },
    ];
    const run = (mode: TdMode): TdResult =>
      torqueDrag({ stations, elements: els, mwPpg: mw, muCased: muC, muOpen: muO, shoeMd: Math.min(6000, td - 2000), mode, wob: wob * 1000, bitTorque: bitT * 1000 });
    return { stations, res: { pickup: run("pickup"), rotate: run("rotate"), slackoff: run("slackoff"), drilling: run("drilling") } as Record<TdMode, TdResult> };
  }, [kop, bur, maxInc, td, muC, muO, mw, wob, bitT, wDc]);

  const { stations, res } = calc;
  const n = stations.length;
  const last = stations[n - 1];

  // trayektoriya paneli
  const A = { x: 24, w: 210, y0: TOP, h: BOT - TOP };
  const span = Math.max(last.tvd, last.hd, 1);
  const ax = (hd: number) => A.x + (hd / span) * A.w;
  const ay = (tvd: number) => A.y0 + (tvd / span) * A.h * 0.95;

  const cres = res[color];
  const absMax = Math.max(1, ...cres.force.map((f) => Math.abs(f)));
  const forceAtStation = (i: number) => cres.force[n - 1 - i];
  const segColor = (f: number) => (f < 0 ? `rgba(248,113,113,${0.35 + 0.65 * Math.min(1, Math.abs(f) / absMax)})` : `rgba(96,165,250,${0.35 + 0.65 * Math.min(1, f / absMax)})`);

  // hook load paneli
  const B = { x: 310, w: 220 };
  const allF = [...res.pickup.force, ...res.rotate.force, ...res.slackoff.force, ...res.drilling.force];
  const fMin = Math.min(0, ...allF);
  const fMax = Math.max(...allF) * 1.05;
  const bx = (f: number) => B.x + ((f - fMin) / (fMax - fMin)) * B.w;
  const my = (md: number) => TOP + (md / td) * (BOT - TOP);
  const line = (r: TdResult, key: "force" | "torque", sx: (v: number) => number) =>
    r.md.map((m, i) => `${i ? "L" : "M"}${sx(r[key][i]).toFixed(1)},${my(m).toFixed(1)}`).join(" ");

  // torque paneli
  const C = { x: 580, w: 170 };
  const tMax = Math.max(limit * 1000, res.rotate.topTorque, res.drilling.topTorque) * 1.1;
  const cx = (t: number) => C.x + (t / tMax) * C.w;

  const pu = res.pickup.topForce;
  const so = res.slackoff.topForce;
  const ro = res.rotate.topForce;
  const dr = res.drilling.topForce;
  const tq = res.rotate.topTorque;
  const tqD = res.drilling.topTorque;
  const maxTq = Math.max(tq, tqD);
  const dpComp = (r: TdResult) => r.force.some((f, i) => f < -1 && r.fromBit[i] > 1050);
  const qYield = torsionalYield(5, 4.276, 75000);

  const warns: { t: string; c: string }[] = [];
  if (so < 0) warns.push({ t: `Slack-off hook load mənfidir (${klb(so)} klbf): string yalnız öz çəkisi ilə quyuya enə bilməz. Əlavə itələmə, rotasiya və ya sürtünmənin azaldılması lazımdır.`, c: "#F87171" });
  if (dpComp(res.slackoff) || dpComp(res.drilling)) warns.push({ t: "DP hissəsində sıxılma var. Bu model buckling-i hesablamır: real quyuda sinusoidal/helical buckling və yapışma riski yaranır.", c: "#FBBF24" });
  if (maxTq > limit * 1000) warns.push({ t: `Səth torque-u (${klb(maxTq)} klb·ft) seçilmiş limitdən (${limit} klb·ft) yüksəkdir.`, c: "#F87171" });
  if (!warns.length) warns.push({ t: "Hook load və torque seçilmiş limitlər daxilindədir.", c: "#34D399" });

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.7fr)_320px] gap-6">
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[11px] text-[#6B82A0] self-center font-['Space_Grotesk']">Trayektoriyanı rəngləndir:</span>
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setColor(m.id)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold font-['Space_Grotesk'] border"
              style={{ borderColor: color === m.id ? m.color : "rgba(255,255,255,0.1)", background: color === m.id ? m.color + "22" : "transparent", color: color === m.id ? m.color : "#8DA2BF" }}
            >
              {m.label}
            </button>
          ))}
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto rounded-2xl bg-[#0D1525] border border-[rgba(255,255,255,0.07)]" role="img" aria-label="Quyu trayektoriyası, hook load və torque profilləri">
          {/* A: trayektoriya */}
          <text x={A.x} y="26" fontSize="11" fill="#F0F4FF" fontWeight="600">Trayektoriya</text>
          <text x={A.x} y="40" fontSize="9" fill="#6B82A0">(rəng: eksenel qüvvə; qırmızı sıxılma, mavi dartma)</text>
          <line x1={A.x} y1={TOP} x2={A.x + A.w} y2={TOP} stroke="#2A3A55" />
          <text x={A.x + A.w} y={TOP - 4} fontSize="9" textAnchor="end" fill="#6B82A0">yer səthi</text>
          {stations.slice(1).map((s, k) => {
            const i = k + 1;
            const p = stations[i - 1];
            return <line key={i} x1={ax(p.hd)} y1={ay(p.tvd)} x2={ax(s.hd)} y2={ay(s.tvd)} stroke={segColor(forceAtStation(i))} strokeWidth="4" strokeLinecap="round" />;
          })}
          <text x={ax(last.hd)} y={ay(last.tvd) + 14} fontSize="9" textAnchor="end" fill="#8DA2BF">TD: MD {td.toLocaleString("en-US")} ft</text>
          <text x={A.x} y={BOT + 26} fontSize="9" fill="#6B82A0">TVD {Math.round(last.tvd).toLocaleString("en-US")} ft · uzaqlaşma {Math.round(last.hd).toLocaleString("en-US")} ft</text>

          {/* B: hook load */}
          <text x={B.x} y="26" fontSize="11" fill="#F0F4FF" fontWeight="600">Hook load (klbf)</text>
          <text x={B.x} y="40" fontSize="9" fill="#6B82A0">hər MD-də dartma</text>
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <g key={t}>
              <line x1={B.x} x2={B.x + B.w} y1={TOP + t * (BOT - TOP)} y2={TOP + t * (BOT - TOP)} stroke="rgba(255,255,255,0.05)" />
              <text x={B.x - 4} y={TOP + t * (BOT - TOP) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{Math.round((td * t) / 1000)}k</text>
            </g>
          ))}
          <line x1={bx(0)} y1={TOP} x2={bx(0)} y2={BOT} stroke="#8DA2BF" strokeWidth="1.2" />
          {fMin < 0 && <text x={bx(0) - 3} y={BOT + 14} fontSize="9" textAnchor="end" fill="#F87171">sıxılma</text>}
          <text x={bx(0) + 3} y={BOT + 14} fontSize="9" fill="#60A5FA">dartma</text>
          {MODES.map((m) => (
            <path key={m.id} d={line(res[m.id], "force", bx)} fill="none" stroke={m.color} strokeWidth={m.id === "drilling" ? 2 : 2.2} strokeDasharray={m.id === "drilling" ? "5 4" : undefined} />
          ))}
          {MODES.map((m) => (
            <text key={m.id} x={bx(res[m.id].topForce) + (m.id === "slackoff" || m.id === "drilling" ? -4 : 4)} y={TOP - 4} fontSize="9" textAnchor={m.id === "slackoff" || m.id === "drilling" ? "end" : "start"} fill={m.color}>{klb(res[m.id].topForce)}</text>
          ))}

          {/* C: torque */}
          <text x={C.x} y="26" fontSize="11" fill="#F0F4FF" fontWeight="600">Torque (klb·ft)</text>
          <text x={C.x} y="40" fontSize="9" fill="#6B82A0">fırlanma zamanı</text>
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <line key={t} x1={C.x} x2={C.x + C.w} y1={TOP + t * (BOT - TOP)} y2={TOP + t * (BOT - TOP)} stroke="rgba(255,255,255,0.05)" />
          ))}
          <path d={line(res.rotate, "torque", cx)} fill="none" stroke="#F0F4FF" strokeWidth="2.2" />
          <path d={line(res.drilling, "torque", cx)} fill="none" stroke="#34D399" strokeWidth="2" strokeDasharray="5 4" />
          <line x1={cx(limit * 1000)} y1={TOP} x2={cx(limit * 1000)} y2={BOT} stroke="#F87171" strokeDasharray="4 3" />
          <text x={cx(limit * 1000)} y={BOT + 14} fontSize="9" textAnchor="middle" fill="#F87171">limit {limit}</text>
          <text x={cx(tq)} y={TOP - 4} fontSize="9" textAnchor="middle" fill="#F0F4FF">{klb(tq)}</text>

          {/* legend */}
          <g transform={`translate(${B.x} ${BOT + 30})`} fontSize="9">
            {MODES.map((m, i) => (
              <g key={m.id} transform={`translate(${(i % 2) * 150} ${Math.floor(i / 2) * 13})`}>
                <line x1="0" x2="14" y1="4" y2="4" stroke={m.color} strokeWidth="2.5" strokeDasharray={m.id === "drilling" ? "3 2" : undefined} />
                <text x="19" y="8" fill="#B7C5DD">{m.label}</text>
              </g>
            ))}
          </g>
        </svg>

        <p className="text-[11px] text-[#6B82A0] mt-2 leading-relaxed font-['Space_Grotesk']">
          Soft-string modeli (Johancsik): string kabel kimi qəbul edilir, buckling modelləşdirilmir. String: 600 ft DC (6.5 × 2.813 in), 450 ft HWDP (49.3 lb/ft), qalanı 5 in DP (adjusted 21.9 lb/ft, tool joint OD 6.625 in).
          Casing shoe: MD 6,000 ft (yuxarısında μ cased, aşağısında μ open). Torsiya axma həddi 5 in E-75 üçün ≈ {Math.round(qYield / 100) / 10} klb·ft (yeni boru).
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Səthdə nəticə</p>
          {[
            ["Pick-up hook load", `${klb(pu)} klbf`, "#FB923C"],
            ["Rotating off-bottom", `${klb(ro)} klbf`, "#F0F4FF"],
            ["Slack-off hook load", `${klb(so)} klbf`, "#22D3EE"],
            ["Drilling (WOB ilə)", `${klb(dr)} klbf`, "#34D399"],
            ["Drag (PU − ROT)", `${klb(pu - ro)} klbf`, "#F0F4FF"],
            ["Drag (ROT − SO)", `${klb(ro - so)} klbf`, "#F0F4FF"],
            ["Torque (off-bottom)", `${klb(tq)} klb·ft`, "#F0F4FF"],
            ["Torque (drilling)", `${klb(tqD)} klb·ft`, "#F0F4FF"],
          ].map(([k, v, c]) => (
            <div key={k} className="flex justify-between border-t border-[rgba(255,255,255,0.05)] py-1.5 text-[12px]">
              <span className="text-[#8DA2BF]">{k}</span>
              <span className="font-mono font-semibold" style={{ color: c }}>{v}</span>
            </div>
          ))}
          <div className="mt-3 space-y-2">
            {warns.map((w, i) => (
              <p key={i} className="rounded-lg px-3 py-2 text-[11.5px] leading-snug" style={{ background: w.c + "18", color: w.c }}>{w.t}</p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Trayektoriya</p>
          <Slider label="KOP (MD)" unit="ft" value={kop} min={500} max={6000} step={250} accent={ACCENT} onChange={setKop} />
          <Slider label="Build rate" unit="°/100 ft" value={bur} min={1} max={8} step={0.5} decimals={1} accent={ACCENT} onChange={setBur} />
          <Slider label="Maksimum bucaq" unit="°" value={maxInc} min={0} max={90} step={5} accent={ACCENT} onChange={setMaxInc} />
          <Slider label="TD (MD)" unit="ft" value={td} min={8000} max={22000} step={500} accent={ACCENT} onChange={setTd} />
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Sürtünmə və yük</p>
          <Slider label="μ (casing)" unit="" value={muC} min={0.05} max={0.5} step={0.01} decimals={2} accent={ACCENT} onChange={setMuC} />
          <Slider label="μ (açıq quyu)" unit="" value={muO} min={0.05} max={0.6} step={0.01} decimals={2} accent={ACCENT} onChange={setMuO} />
          <Slider label="Məhlul çəkisi" unit="ppg" value={mw} min={9} max={16} step={0.1} decimals={1} accent={ACCENT} onChange={setMw} />
          <Slider label="WOB" unit="klbf" value={wob} min={0} max={60} step={1} accent={ACCENT} onChange={setWob} />
          <Slider label="Bit torque" unit="klb·ft" value={bitT} min={0} max={10} step={0.5} decimals={1} accent={ACCENT} onChange={setBitT} />
          <Slider label="Torque limiti" unit="klb·ft" value={limit} min={10} max={60} step={1} accent={ACCENT} onChange={setLimit} />
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>Maksimum bucağı 90° et və TD-ni 20,000 ft-ə qaldır: slack-off hook load nə vaxt mənfi olur?</li>
            <li>μ-nü 0.15-ə endir (OBM kimi): drag və torque necə dəyişir?</li>
            <li>Build rate-i artır: build zonasında hook load sıçrayışına bax (capstan effekti).</li>
            <li>Rotating off-bottom əyrisinin pick-up və slack-off arasında harada olduğunu müşahidə et.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
