"use client";

import { useState } from "react";
import Slider from "../Slider";

const ACCENT = "#FBBF24";

const DULL: [string, string][] = [
  ["NO", "Köhnəlmə xarakteri yoxdur"],
  ["WT", "Köhnəlmiş dişlər/kəsicilər (worn)"],
  ["BT", "Qırılmış dişlər/kəsicilər (broken)"],
  ["CT", "Çatlamış/qopmuş dişlər/kəsicilər (chipped)"],
  ["BU", "Bit balling (şlamla örtülüb)"],
  ["LC", "İtmiş konus (lost cone)"],
  ["ER", "Eroziya"],
  ["PN", "Tıxanmış nozzle"],
  ["JD", "Junk zədəsi"],
  ["WO", "Yuyulub dağılmış bit (washed out)"],
  ["CR", "Nüvə əmələ gəlib (cored)"],
  ["RG", "Yuvarlaqlaşmış gauge"],
];
const LOC: [string, string][] = [
  ["N", "Nose (mərkəz)"],
  ["M", "Middle (orta sıralar)"],
  ["G", "Gauge (kənar)"],
  ["A", "Bütün sıralar"],
  ["C", "Konus (cone)"],
  ["S", "Shoulder (çiyin)"],
  ["T", "Taper (konik hissə)"],
];
const BEAR = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "E", "F", "N", "X"];
const BEAR_TXT: Record<string, string> = {
  "0-8": "Yastıq ömrü şkalası: 0 sıfır istifadə olunmuş, 8 yastıq tamamilə sıradan çıxıb (roller cone, mühürsüz)",
  E: "Mühür yaxşı vəziyyətdədir (sealed bearing)",
  F: "Mühür sıradan çıxıb",
  N: "Qiymətləndirmək mümkün deyil",
  X: "Fixed-cutter bit: yastıq yoxdur",
};
const GAUGE = ["I", "1", "2", "3", "4", "5", "6"];
const REASON: [string, string][] = [
  ["TD", "Casing və ya yekun dərinliyə çatıldı"],
  ["PR", "ROP aşağı düşdü (penetration rate)"],
  ["HP", "Quyu problemləri"],
  ["BHA", "BHA dəyişdirilməsi"],
  ["TQ", "Torque problemi"],
  ["HR", "Bit-in saat limiti"],
  ["LOG", "Log çəkmək üçün"],
  ["DMF", "Downhole motor nasazlığı"],
  ["FM", "Formasiya dəyişdi"],
  ["PP", "Nasos təzyiqi problemi"],
];

function Sel({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] text-[#8DA2BF] mb-1 font-['Space_Grotesk']">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-[#080C18] text-[#F0F4FF] text-[13px] rounded-lg px-3 py-2 outline-none border border-[rgba(255,255,255,0.08)]">
        {children}
      </select>
    </label>
  );
}

function Teeth({ x, y, wear, label, color }: { x: number; y: number; wear: number; label: string; color: string }) {
  const base = 56;
  const h = Math.max(2, base * (1 - wear / 8));
  const w = 26;
  return (
    <g>
      <text x={x + 2 * w} y={y - base - 10} fontSize="11" textAnchor="middle" fill={color} fontWeight="600">{label}</text>
      {[0, 1, 2, 3].map((i) => {
        const bx = x + i * (w + 6);
        return (
          <g key={i}>
            <polygon points={`${bx},${y} ${bx + w},${y} ${bx + w / 2 + (wear > 6 ? 0 : 0)},${y - h}`} fill={color} opacity={0.35 + 0.55 * (1 - wear / 8)} stroke={color} strokeWidth="1.5" />
            <polygon points={`${bx},${y} ${bx + w},${y} ${bx + w / 2},${y - base}`} fill="none" stroke="#5B7092" strokeDasharray="2 3" opacity="0.6" />
          </g>
        );
      })}
      <line x1={x - 6} y1={y} x2={x + 4 * (w + 6)} y2={y} stroke="#5B7092" strokeWidth="2" />
    </g>
  );
}

export default function BitDullVisual() {
  const [inner, setInner] = useState(2);
  const [outer, setOuter] = useState(4);
  const [dull, setDull] = useState("WT");
  const [loc, setLoc] = useState("A");
  const [bear, setBear] = useState("E");
  const [gauge, setGauge] = useState("I");
  const [other, setOther] = useState("NO");
  const [reason, setReason] = useState("TD");

  const code = `${inner}-${outer}-${dull}-${loc}-${bear}-${gauge}-${other}-${reason}`;
  const dTxt = DULL.find((d) => d[0] === dull)?.[1];
  const oTxt = DULL.find((d) => d[0] === other)?.[1];
  const lTxt = LOC.find((d) => d[0] === loc)?.[1];
  const rTxt = REASON.find((d) => d[0] === reason)?.[1];
  const bTxt = bear === "E" || bear === "F" || bear === "N" || bear === "X" ? BEAR_TXT[bear] : BEAR_TXT["0-8"];
  const gTxt = gauge === "I" ? "Gauge diametri normal (in gauge)" : `Gauge ${gauge}/16 in azdır (under gauge)`;

  const gaugeLoss = gauge === "I" ? 0 : Number(gauge);

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-6">
      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
          <svg viewBox="0 0 560 250" className="w-full h-auto" role="img" aria-label="Bit köhnəlməsinin vizual təsviri">
            <Teeth x={30} y={140} wear={inner} label={`Daxili sıralar (I): ${inner}`} color="#F59E0B" />
            <Teeth x={300} y={140} wear={outer} label={`Xarici sıralar (O): ${outer}`} color="#FB923C" />
            {/* gauge */}
            <text x="280" y="190" fontSize="11" textAnchor="middle" fill="#8DA2BF">Gauge halqası</text>
            <rect x="90" y="198" width="380" height="14" rx="7" fill="#101A2E" stroke="#5B7092" />
            <rect x={90 + gaugeLoss * 6} y="198" width={380 - gaugeLoss * 12} height="14" rx="7" fill="#34D399" opacity="0.35" stroke="#34D399" />
            <text x="280" y="232" fontSize="10" textAnchor="middle" fill="#6B82A0">{gTxt}</text>
            <text x="30" y="30" fontSize="11" fill="#6B82A0">Qırıq xətt: yeni dişin ölçüsü; dolu: qalan hissə</text>
          </svg>
          <div className="mt-2 text-center">
            <p className="text-[11px] text-[#8DA2BF] font-['Space_Grotesk']">IADC dull grade</p>
            <p className="font-mono text-[26px] font-bold" style={{ color: ACCENT }}>{code}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 font-['Space_Grotesk']">
          <p className="text-[13px] font-semibold text-[#F0F4FF] mb-2">Kodun oxunuşu</p>
          <ul className="space-y-1.5 text-[12px]">
            {[
              ["1 (I)", `Daxili sıralar: ${inner}/8 köhnəlmə (0 = yeni, 8 = tam köhnə)`],
              ["2 (O)", `Xarici sıralar: ${outer}/8 köhnəlmə`],
              ["3 (D)", `Əsas köhnəlmə xarakteri: ${dull}, ${dTxt}`],
              ["4 (L)", `Yer: ${loc}, ${lTxt}`],
              ["5 (B)", `Yastıq/mühür: ${bear}, ${bTxt}`],
              ["6 (G)", `Gauge: ${gauge}, ${gTxt}`],
              ["7 (O)", `Digər köhnəlmə: ${other}, ${oTxt}`],
              ["8 (R)", `Çıxarma səbəbi: ${reason}, ${rTxt}`],
            ].map(([k, v]) => (
              <li key={k} className="flex gap-3"><span className="font-mono text-[#FBBF24] w-12 shrink-0">{k}</span><span className="text-[#9DB0CC]">{v}</span></li>
            ))}
          </ul>
          <p className="text-[11px] text-[#6B82A0] mt-3 leading-relaxed">Dull grading qazma sonrası bit-in vəziyyətini standart kodla qeyd edir. Növbəti bit seçimi və formasiya-bit uyğunluğu üçün əsas məlumatdır.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Köhnəlmə</p>
          <Slider label="Daxili sıralar (I)" unit="/8" value={inner} min={0} max={8} step={1} accent={ACCENT} onChange={setInner} />
          <Slider label="Xarici sıralar (O)" unit="/8" value={outer} min={0} max={8} step={1} accent={ACCENT} onChange={setOuter} />
          <Sel label="Gauge (G)" value={gauge} onChange={setGauge}>
            {GAUGE.map((g) => <option key={g} value={g}>{g === "I" ? "I (in gauge)" : `${g} (${g}/16 in under gauge)`}</option>)}
          </Sel>
        </div>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Xarakter və səbəb</p>
          <Sel label="Əsas köhnəlmə (D)" value={dull} onChange={setDull}>{DULL.map(([c, t]) => <option key={c} value={c}>{c}: {t}</option>)}</Sel>
          <Sel label="Yer (L)" value={loc} onChange={setLoc}>{LOC.map(([c, t]) => <option key={c} value={c}>{c}: {t}</option>)}</Sel>
          <Sel label="Yastıq/mühür (B)" value={bear} onChange={setBear}>{BEAR.map((c) => <option key={c} value={c}>{c}</option>)}</Sel>
          <Sel label="Digər köhnəlmə (O)" value={other} onChange={setOther}>{DULL.map(([c, t]) => <option key={c} value={c}>{c}: {t}</option>)}</Sel>
          <Sel label="Çıxarma səbəbi (R)" value={reason} onChange={setReason}>{REASON.map(([c, t]) => <option key={c} value={c}>{c}: {t}</option>)}</Sel>
        </div>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 text-[12px] text-[#9DB0CC] leading-relaxed font-['Space_Grotesk']">
          <p className="font-semibold text-[#F0F4FF] mb-1">Sınaqdan keçir</p>
          <ul className="space-y-1.5 list-disc pl-4">
            <li>Xarici sıraların köhnəlməsini 8-ə qoy: bit nə üçün gauge-də zəif olar?</li>
            <li>Gauge-i 3/16 under gauge et: növbəti bit üçün nə etmək lazımdır (reaming)?</li>
            <li>Kodu oxu: hansı səbəbdən çıxarıldı və bit düzgün seçilmişdimi?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
