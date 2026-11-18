"use client";

import { useState } from "react";
import Slider from "../Slider";
import { contactAreaIn2, diffStickForceLb, freePointFt, overbalancePsi } from "@/lib/drilling/problems";

const ACCENT = "#FBBF24";
const TVD = 8000;
const f0 = (v: number) => Math.round(v).toLocaleString("en-US");
const f1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default function StuckPipeVisual() {
  const [mw, setMw] = useState(9.8);
  const [pf, setPf] = useState(8.6);
  const [lc, setLc] = useState(60);
  const [wc, setWc] = useState(1.5);
  const [mu, setMu] = useState(0.2);
  const [avail, setAvail] = useState(120);
  const [pull, setPull] = useState(20);
  const [stretch, setStretch] = useState(8);

  const dp = overbalancePsi(mw, pf, TVD);
  const area = contactAreaIn2(lc, wc);
  const force = diffStickForceLb(dp, area, mu);
  const stuck = force > avail * 1000;
  const fp = freePointFt(stretch, 19.5, pull * 1000);
  const fpShown = Math.min(fp, TVD);

  // kəsik sxemi
  const cx = 150, cy = 150, R = 100, rp = 34;
  const off = R - rp - 3 - Math.min(14, wc * 5); // boru divara doğru sürüşür
  const px = cx + off;
  const cake = 3 + Math.min(12, wc * 4);

  // free point sütunu
  const colTop = 40, colBot = 300;
  const fy = colTop + (fpShown / TVD) * (colBot - colTop);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Differensial yapışma: en kəsik</p>
        <svg viewBox="0 0 340 310" className="w-full h-auto" role="img" aria-label="Boru filter cake-ə sıxılır">
          <defs>
            <marker id="arrP" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#38BDF8" /></marker>
          </defs>
          {/* formasiya */}
          <circle cx={cx} cy={cy} r={R + 26} fill="#2A2234" />
          <circle cx={cx} cy={cy} r={R} fill="#0A1426" />
          {/* filter cake halqası */}
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#B08968" strokeWidth={cake} opacity="0.85" />
          {/* məhlul */}
          <circle cx={cx} cy={cy} r={R - cake / 2} fill="#1B2F4A" opacity="0.65" />
          {/* boru */}
          <circle cx={px} cy={cy} r={rp} fill="#8DA2BF" stroke="#C7D3E6" strokeWidth="2" />
          <circle cx={px} cy={cy} r={rp - 9} fill="#0A1426" />
          {/* təmas zonası */}
          <path d={`M ${cx + R - cake} ${cy - 18} A ${R - cake} ${R - cake} 0 0 1 ${cx + R - cake} ${cy + 18}`} fill="none" stroke="#F87171" strokeWidth={4 + Math.min(6, wc * 2)} strokeLinecap="round" />
          {/* ΔP oxları (məhluldan boruya) */}
          {[-14, 0, 14].map((dy) => (
            <line key={dy} x1={cx - 70} y1={cy + dy * 2} x2={px - rp - 4} y2={cy + dy * 2} stroke="#38BDF8" strokeWidth="2" markerEnd="url(#arrP)" opacity="0.9" />
          ))}
          <text x="14" y="16" fontSize="10" fill="#7DD3FC">Hidrostatik {f0(0.052 * mw * TVD)} psi →</text>
          <text x="326" y="16" fontSize="10" textAnchor="end" fill="#FDBA74">← Formasiya {f0(0.052 * pf * TVD)} psi</text>
          <text x={cx} y={cy + R + 40} fontSize="10" textAnchor="middle" fill="#8DA2BF">Sıxma: ΔP = {f0(dp)} psi, sürüşmə təmas sahəsində</text>
          <text x={px} y={cy + 4} fontSize="10" textAnchor="middle" fill="#8DA2BF">boru</text>
          <text x={px} y={cy + rp + 16} fontSize="9" textAnchor="middle" fill="#FCA5A5">filter cake ilə təmas</text>
        </svg>
        <div className="grid grid-cols-3 gap-2 mt-2 text-center font-['Space_Grotesk']">
          {[
            ["Overbalance", `${f0(dp)} psi`],
            ["Təmas sahəsi", `${f0(area)} in²`],
            ["Yapışma qüvvəsi", `${f0(force)} lb`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-[#101A2E] px-2 py-2">
              <p className="text-[10px] text-[#6B82A0]">{k}</p>
              <p className="font-mono text-[13px] font-bold text-[#F0F4FF]">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-[11px] text-[#8DA2BF] font-['Space_Grotesk'] mb-1">
            <span>Yapışma qüvvəsi / mövcud dartma ehtiyatı</span>
            <span className="font-mono">{f0(force / 1000)} / {f0(avail)} min lb</span>
          </div>
          <div className="h-3 rounded-full bg-[#101A2E] overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${Math.min(100, (force / (avail * 1000)) * 100)}%`, background: stuck ? "#F87171" : "#34D399" }} />
          </div>
          <p className="mt-2 rounded-lg px-3 py-2 text-[12px] font-['Space_Grotesk']" style={{ background: stuck ? "#F8717114" : "#34D39914", color: stuck ? "#FCA5A5" : "#A7F3D0" }}>
            {stuck ? "Qüvvə dartma ehtiyatından böyükdür: boru yalnız dartma ilə açılmaz. Overbalance, spotting fluid və ya digər plan lazımdır." : "Qüvvə ehtiyat daxilindədir, lakin boru və prosedur limitləri aşılmamalıdır."}
          </p>
        </div>
        <div className="mt-3 space-y-3">
          <Slider label="Məhlul çəkisi (MW)" unit="ppg" value={mw} min={8.6} max={12} step={0.1} accent={ACCENT} onChange={setMw} decimals={1} />
          <Slider label="Formasiya təzyiqi (ekv. çəki)" unit="ppg" value={pf} min={7.5} max={10} step={0.1} accent="#F87171" onChange={setPf} decimals={1} />
          <Slider label="Təmas uzunluğu" unit="ft" value={lc} min={5} max={150} step={5} accent="#FB923C" onChange={setLc} />
          <Slider label="Təmas eni" unit="in" value={wc} min={0.5} max={3} step={0.1} accent="#FB923C" onChange={setWc} decimals={1} />
          <Slider label="Sürtünmə əmsalı μ" unit="" value={mu} min={0.05} max={0.5} step={0.01} accent="#A78BFA" onChange={setMu} decimals={2} />
          <Slider label="Mövcud dartma ehtiyatı" unit="min lb" value={avail} min={20} max={300} step={10} accent="#34D399" onChange={setAvail} />
        </div>
        <ul className="mt-3 space-y-1.5 list-disc pl-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <li>MW-ni formasiya təzyiqinə yaxınlaşdır: qüvvə necə dəyişir?</li>
          <li>Təmas uzunluğunu iki dəfə artır: nə baş verir? Nə üçün boru hərəkətsiz qaldıqca risk artır?</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono mb-1" style={{ color: ACCENT }}>Free point: yapışma nöqtəsi</p>
        <svg viewBox="0 0 340 330" className="w-full h-auto" role="img" aria-label="Drillstring free point">
          <rect x="60" y={colTop} width="40" height={colBot - colTop} rx="3" fill="#1B2F4A" />
          <rect x="60" y={colTop} width="40" height={fy - colTop} rx="3" fill="#34D399" opacity="0.85" />
          <rect x="60" y={fy} width="40" height={colBot - fy} rx="3" fill="#F87171" opacity="0.85" />
          <line x1="40" x2="240" y1={fy} y2={fy} stroke={ACCENT} strokeDasharray="5 4" />
          <text x="112" y={fy - 6} fontSize="11" fill={ACCENT} fontWeight="700">free point ≈ {f0(fp)} ft</text>
          {fp > TVD && <text x="112" y={fy + 12} fontSize="10" fill="#FCA5A5">TD-dən dərin: yapışma yoxdur / səhv</text>}
          <text x="110" y={colTop + 14} fontSize="10" fill="#A7F3D0">sərbəst</text>
          <text x="110" y={colBot - 8} fontSize="10" fill="#FCA5A5">yapışmış</text>
          <text x="112" y={colTop - 4} fontSize="10" fill="#8DA2BF">səth</text>
          <text x="60" y={colBot + 18} fontSize="10" fill="#8DA2BF">TD {f0(TVD)} ft</text>
          <path d={`M 40 ${colTop + 6} L 40 ${colTop - 22}`} stroke="#38BDF8" strokeWidth="2" markerEnd="url(#arrP)" />
          <text x="46" y={colTop - 26} fontSize="10" fill="#7DD3FC">dartma {pull} min lb</text>
        </svg>
        <div className="grid grid-cols-3 gap-2 mt-1 text-center font-['Space_Grotesk']">
          {[
            ["Uzanma e", `${f1(stretch)} in`],
            ["Əlavə dartma", `${pull} min lb`],
            ["Free point", `${f0(fp)} ft`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-[#101A2E] px-2 py-2">
              <p className="text-[10px] text-[#6B82A0]">{k}</p>
              <p className="font-mono text-[13px] font-bold text-[#F0F4FF]">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-3">
          <Slider label="Əlavə dartma P" unit="min lb" value={pull} min={5} max={60} step={1} accent="#38BDF8" onChange={setPull} />
          <Slider label="Ölçülən uzanma e" unit="in" value={stretch} min={1} max={30} step={0.5} accent={ACCENT} onChange={setStretch} decimals={1} />
        </div>
        <p className="text-[11px] text-[#6B82A0] mt-3 leading-relaxed font-['Space_Grotesk']">
          Model: 5″ drillpipe, 19.5 lb/ft, L = 735,294·e·W/P. Maili quyuda drag və BHA-nın qalın hissələri nəticəni təhrif edir, ona görə real əməliyyatda wireline free-point aləti ilə yoxlanılır.
        </p>
        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <li>Eyni dartmada uzanmanı artır: free point dərinləşir. Nə üçün?</li>
          <li>Dartmanı artır, uzanma sabit qalsın: free point necə dəyişir?</li>
        </ul>
      </div>
    </div>
  );
}
