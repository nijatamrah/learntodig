"use client";

import { useMemo, useState } from "react";
import Slider from "../Slider";
import MudWindowChart from "./MudWindowChart";
import { buildProfile, selectCasingSeats } from "@/lib/drilling/pressure";
import type { LearnerMode } from "@/lib/modules/types";

const ACCENT = "#FBBF24";

export default function MudWindowSimulator({ mode }: { mode: LearnerMode }) {
  const [td, setTd] = useState(13000);
  const [opTop, setOpTop] = useState(6000);
  const [peak, setPeak] = useState(15.5);
  const [normalGrad, setNormalGrad] = useState(0.45);
  const [nu, setNu] = useState(0.35);
  const [tripMargin, setTripMargin] = useState(0.3);
  const [fracMargin, setFracMargin] = useState(0.5);
  const [surfaceShoe, setSurfaceShoe] = useState(1500);

  const profile = useMemo(
    () => buildProfile({ td, normalGradient: normalGrad, overpressureTop: Math.min(opTop, td - 500), peakPorePpg: peak, poisson: nu }),
    [td, normalGrad, opTop, peak, nu]
  );
  const result = useMemo(
    () => selectCasingSeats(profile, { tripMargin, fracMargin, surfaceShoe }),
    [profile, tripMargin, fracMargin, surfaceShoe]
  );
  const atTd = profile[profile.length - 1];
  const seats = result.seats;

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-6">
      <div>
        <MudWindowChart profile={profile} seats={seats} td={td} />
        {!result.ok && (
          <div className="mt-4 rounded-2xl border border-[#F87171] bg-[#F8717112] p-4 text-[13px] text-[#FCA5A5] font-['Space_Grotesk']">
            <b>Mud window bağlanıb.</b> {result.reason}
            <p className="mt-2 text-[#D5DEF0]">
              Real praktikada bu halda: əlavə liner/casing, margin-lərin əsaslandırılmış azaldılması, MPD (idarə olunan təzyiqli qazma)
              və ya TD-nin yenidən nəzərdən keçirilməsi müzakirə olunur.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Geologiya</p>
          <Slider label="TD (TVD)" unit="ft" value={td} min={8000} max={18000} step={500} accent={ACCENT} onChange={setTd} />
          <Slider label="Anormal təzyiqin başlanğıcı" unit="ft" value={opTop} min={2000} max={Math.max(2500, td - 1000)} step={250} accent={ACCENT} onChange={setOpTop} />
          <Slider label="TD-də məsamə təzyiqi" unit="ppg" value={peak} min={9} max={19} step={0.1} decimals={1} accent={ACCENT} onChange={setPeak} />
          <Slider label="Normal gradient" unit="psi/ft" value={normalGrad} min={0.433} max={0.478} step={0.001} decimals={3} accent={ACCENT} onChange={setNormalGrad} />
          <Slider label="Poisson əmsalı (ν)" unit="" value={nu} min={0.25} max={0.45} step={0.01} decimals={2} accent={ACCENT} onChange={setNu} />
        </div>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase font-mono" style={{ color: ACCENT }}>Dizayn qərarları</p>
          <Slider label="Trip margin" unit="ppg" value={tripMargin} min={0} max={1} step={0.1} decimals={1} accent={ACCENT} onChange={setTripMargin} />
          <Slider label="Çat margini (frac margin)" unit="ppg" value={fracMargin} min={0} max={1.5} step={0.1} decimals={1} accent={ACCENT} onChange={setFracMargin} />
          <Slider label="Surface casing shoe (min.)" unit="ft" value={surfaceShoe} min={500} max={3000} step={250} accent={ACCENT} onChange={setSurfaceShoe} />
        </div>
      </div>

      <div className="lg:col-span-2 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4 overflow-x-auto">
        <p className="text-[13px] font-semibold text-[#F0F4FF] mb-1 font-['Space_Grotesk']">Nəticə: casing seat-lər və məhlul proqramı</p>
        {mode === "student" && (
          <p className="text-[12px] text-[#6B82A0] mb-3 font-['Space_Grotesk'] leading-relaxed">
            Alqoritm TD-dən yuxarıya doğru gedir (bottom-up): bölmənin dibində lazım olan çəki = Pp + trip margin. Bu çəki ilə çat qradiyentindən
            (− margin) keçməmək üçün shoe ən azı həmin çəkinin dözdüyü dərinlikdə olmalıdır. Sonra həmin shoe yeni "TD" olur və proses təkrarlanır.
          </p>
        )}
        <table className="w-full text-[12px] font-['Space_Grotesk']">
          <thead>
            <tr className="text-left text-[#6B82A0]">
              <th className="py-1.5 pr-3 font-medium">Shoe (ft TVD)</th>
              <th className="py-1.5 pr-3 font-medium">Bölmə dibi (ft)</th>
              <th className="py-1.5 pr-3 font-medium">MW proqramı (ppg)</th>
              <th className="py-1.5 pr-3 font-medium">Shoe-da maks. MW (ppg)</th>
              <th className="py-1.5 font-medium">Ehtiyat (ppg)</th>
            </tr>
          </thead>
          <tbody className="text-[#D5DEF0]">
            {seats.map((s) => (
              <tr key={s.depth} className="border-t border-[rgba(255,255,255,0.05)]">
                <td className="py-1.5 pr-3 font-mono">{s.depth.toLocaleString("en-US")}</td>
                <td className="py-1.5 pr-3 font-mono">{s.sectionBottom.toLocaleString("en-US")}</td>
                <td className="py-1.5 pr-3 font-mono">{s.mwStart.toFixed(1)} → {s.mwRequired.toFixed(1)}</td>
                <td className="py-1.5 pr-3 font-mono">{s.mwMax.toFixed(1)}</td>
                <td className="py-1.5 font-mono">{(s.mwMax - s.mwRequired).toFixed(2)}</td>
              </tr>
            ))}
            {seats.length === 0 && (
              <tr><td colSpan={5} className="py-2 text-[#6B82A0]">Seat tapılmadı.</td></tr>
            )}
          </tbody>
        </table>
        <p className="mt-3 text-[11px] text-[#6B82A0] font-['Space_Grotesk'] leading-relaxed">
          TD-də: Pp = {atTd.ppPpg.toFixed(1)} ppg, FG = {atTd.fgPpg.toFixed(1)} ppg, overburden = {atTd.obPpg.toFixed(1)} ppg.
          Bu, sintetik, təhsil məqsədli profildir (onshore, sabit ν, Eaton çat modeli). Real quyuda profil offset quyuların datası,
          loqlar və formation testlər (LOT, RFT/MDT) ilə kalibrlənir.
        </p>
      </div>
    </div>
  );
}
