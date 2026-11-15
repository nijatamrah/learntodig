"use client";

import { useState } from "react";
import { DIAGNOSES } from "./fluids-content";

export default function MudDiagnostics() {
  const [id, setId] = useState(DIAGNOSES[0].id);
  const d = DIAGNOSES.find((x) => x.id === id) ?? DIAGNOSES[0];

  return (
    <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6">
      <div>
        <p className="text-[13px] text-[#6B82A0] mb-3 font-['Space_Grotesk']">Rig-saytda müşahidə etdiyin əlamətə klik et: ehtimal olunan səbəb, yoxlama və tədbirlər görünəcək.</p>
        <ul className="space-y-2">
          {DIAGNOSES.map((x) => (
            <li key={x.id}>
              <button
                onClick={() => setId(x.id)}
                className="w-full text-left rounded-xl px-3.5 py-3 text-[13px] leading-snug font-['Space_Grotesk'] border transition-colors"
                style={{
                  background: id === x.id ? "#FBBF2418" : "#0D1525",
                  borderColor: id === x.id ? "#FBBF24" : "rgba(255,255,255,0.07)",
                  color: id === x.id ? "#F0F4FF" : "#B7C5DD",
                }}
              >
                {x.symptom}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-5 self-start font-['Space_Grotesk']">
        {d.wellControl && (
          <p className="mb-4 rounded-xl border-l-2 bg-[#F8717112] px-3.5 py-2.5 text-[12px] text-[#FCA5A5]" style={{ borderColor: "#F87171" }}>
            <b>Diqqət:</b> bu əlamət quyu nəzarəti məsələsi ola bilər. Əvvəlcə şirkətin well control prosedurasına uyğun hərəkət et, sonra məhlul müalicəsini düşün.
          </p>
        )}
        <p className="text-[10px] font-mono tracking-[0.14em] uppercase mb-1 text-[#FBBF24]">Ehtimal olunan səbəb</p>
        <h3 className="text-[16px] font-bold text-[#F0F4FF] mb-4 leading-snug">{d.cause}</h3>

        <Section title="Əlamətlər" items={d.signs} />
        <Section title="Yoxlama" items={d.tests} />
        <Section title="Tədbirlər" items={d.actions} />
        <p className="text-[11px] text-[#6B82A0] mt-4 leading-relaxed">
          Bu, ümumi təlim çərçivəsidir. Real müalicə məhlul sisteminə, laboratoriya nəticələrinə və şirkətin məhlul proqramına görə məhlul mühəndisi tərəfindən təyin olunur.
        </p>
      </div>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B82A0] mb-1.5">{title}</p>
      <ul className="space-y-1">
        {items.map((x) => (
          <li key={x} className="text-[12px] text-[#B7C5DD] leading-relaxed flex gap-2"><span className="text-[#FBBF24]">•</span>{x}</li>
        ))}
      </ul>
    </div>
  );
}
