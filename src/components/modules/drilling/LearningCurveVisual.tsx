"use client";

import { useState } from "react";
import Slider from "../Slider";
import { learningDays } from "@/lib/drilling/economics";

const ACCENT = "#FBBF24";
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const CW = 440;
const CH = 300;
const M = { l: 48, r: 14, t: 22, b: 38 };
const N = 12;

export default function LearningCurveVisual() {
  const [d1, setD1] = useState(16.25);
  const [lr, setLr] = useState(90);
  const [floor, setFloor] = useState(11);
  const [rate, setRate] = useState(85);
  const [wells, setWells] = useState(8);

  const days = Array.from({ length: N }, (_, i) => learningDays(d1, i + 1, lr / 100, floor));
  const yMax = d1 * 1.1;
  const bw = (CW - M.l - M.r) / N;
  const x = (i: number) => M.l + i * bw;
  const y = (v: number) => CH - M.b - (v / yMax) * (CH - M.t - M.b);
  const used = days.slice(0, wells);
  const total = used.reduce((a, b) => a + b, 0);
  const noLearn = d1 * wells;
  const saved = noLearn - total;
  const hitFloor = days.findIndex((v) => v <= floor + 1e-9);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Learning curve: quyu üzrə müddət</p>
        <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Quyu başına gün">
          {[0, 5, 10, 15, 20].filter((v) => v <= yMax).map((v) => (
            <g key={v}>
              <line x1={M.l} x2={CW - M.r} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.05)" />
              <text x={M.l - 5} y={y(v) + 3} fontSize="9" textAnchor="end" fill="#6B82A0">{v}</text>
            </g>
          ))}
          {days.map((v, i) => (
            <g key={i}>
              <rect x={x(i) + 4} y={y(v)} width={bw - 8} height={CH - M.b - y(v)} rx="3" fill={i < wells ? (v <= floor + 1e-9 ? "#34D399" : ACCENT) : "#1B2F4A"} opacity={i < wells ? 0.9 : 0.5} />
              <text x={x(i) + bw / 2} y={CH - M.b + 13} fontSize="9" textAnchor="middle" fill="#6B82A0">{i + 1}</text>
              {i < wells && <text x={x(i) + bw / 2} y={y(v) - 4} fontSize="8.5" textAnchor="middle" fill="#F0F4FF" fontFamily="monospace">{f1(v)}</text>}
            </g>
          ))}
          <line x1={M.l} x2={CW - M.r} y1={y(floor)} y2={y(floor)} stroke="#34D399" strokeDasharray="5 4" />
          <text x={CW - M.r - 2} y={y(floor) - 4} fontSize="9" textAnchor="end" fill="#A7F3D0">texniki limit {f1(floor)} gün</text>
          <line x1={M.l} x2={CW - M.r} y1={y(d1)} y2={y(d1)} stroke="#8DA2BF" strokeDasharray="2 4" opacity="0.6" />
          <text x={(M.l + CW - M.r) / 2} y={CH - 6} fontSize="10" textAnchor="middle" fill="#8DA2BF">Quyunun sıra nömrəsi</text>
          <text transform={`translate(12 ${(M.t + CH - M.b) / 2}) rotate(-90)`} fontSize="10" textAnchor="middle" fill="#8DA2BF">Gün</text>
        </svg>
        <div className="grid grid-cols-3 gap-2 mt-2 text-center font-['Space_Grotesk']">
          {[
            [`${wells} quyu cəmi`, `${f1(total)} gün`],
            ["Öyrənməsiz", `${f1(noLearn)} gün`],
            ["Qənaət", `${f0(saved * rate)} min $`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-[#101A2E] px-2 py-2">
              <p className="text-[10px] text-[#6B82A0]">{k}</p>
              <p className="font-mono text-[13px] font-bold text-[#F0F4FF]">{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 rounded-lg px-3 py-2 text-[12px] font-['Space_Grotesk'] bg-[#101A2E] text-[#9DB0CC]">
          {hitFloor >= 0 ? `Texniki limit ${hitFloor + 1}-ci quyuda əldə olunur: bundan sonra yaxşılaşma duruxur.` : "Bu quyu sayında texniki limitə hələ çatılmır."} Yaşıl sütunlar limitdədir.
        </p>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-2" style={{ color: ACCENT }}>Parametrlər</p>
        <div className="space-y-3">
          <Slider label="1-ci quyunun müddəti" unit="gün" value={d1} min={8} max={40} step={0.25} accent={ACCENT} onChange={setD1} decimals={2} />
          <Slider label="Learning rate (LR)" unit="%" value={lr} min={70} max={100} step={1} accent="#34D399" onChange={setLr} />
          <Slider label="Texniki limit" unit="gün" value={floor} min={4} max={20} step={0.5} accent="#38BDF8" onChange={setFloor} decimals={1} />
          <Slider label="Quyu sayı" unit="" value={wells} min={2} max={12} step={1} accent="#A78BFA" onChange={setWells} />
          <Slider label="Spread rate" unit="min $/gün" value={rate} min={30} max={300} step={5} accent={ACCENT} onChange={setRate} />
        </div>
        <p className="text-[11px] text-[#6B82A0] mt-3 leading-relaxed font-['Space_Grotesk']">
          D_n = D_1·n^(log₂ LR). LR = 90% bu deməkdir ki, quyu sayı iki dəfə artdıqda vahid müddət 10% azalır. Model avtomatik öyrənmə fərz edir, real quyuda bu hər quyudan sonra dərs çıxarmaqdan asılıdır.
        </p>
        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <li>LR-i 90%-dən 80%-ə endir: hansı quyuda texniki limitə çatılır?</li>
          <li>LR 100% olsa nə baş verir? Nə üçün bu mümkün haldır?</li>
          <li>Texniki limiti qaldır: qənaət necə dəyişir?</li>
        </ul>
      </div>
    </div>
  );
}
