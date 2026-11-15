"use client";

import { useState } from "react";
import {
  MATERIALS,
  WATER_PPG,
  buoyancyFactor,
  dilutionVolume,
  mixDensity,
  rheology,
  weightUp,
  type MaterialKey,
} from "@/lib/drilling/fluids";
import { Card, Note, Num, Out, fmt as f, ok } from "./CalcParts";
import RheologyChart from "./RheologyChart";

export default function FluidCalculators() {
  // Rheology
  const [t600, setT600] = useState(60);
  const [t300, setT300] = useState(38);
  const [t6, setT6] = useState(8);
  const [t3, setT3] = useState(6);
  // Weight up
  const [mat, setMat] = useState<MaterialKey>("barite");
  const [w1, setW1] = useState(10);
  const [w2, setW2] = useState(12);
  const [vol, setVol] = useState(500);
  // Dilution
  const [dv1, setDv1] = useState(500);
  const [dw1, setDw1] = useState(14);
  const [dw2, setDw2] = useState(13);
  const [dwAdd, setDwAdd] = useState(WATER_PPG);
  // Mix
  const [mv1, setMv1] = useState(300);
  const [mw1, setMw1] = useState(9);
  const [mv2, setMv2] = useState(200);
  const [mw2, setMw2] = useState(12);
  // Buoyancy
  const [bmw, setBmw] = useState(12);
  const [airW, setAirW] = useState(250000);

  const r = rheology({ t600, t300, t6, t3 });
  const matPpg = MATERIALS[mat].ppg;
  const wu = ok(w1, w2, vol) ? weightUp({ w1, w2, materialPpg: matPpg, volumeBbl: vol }) : null;
  const dil = ok(dv1, dw1, dw2, dwAdd) ? dilutionVolume({ v1: dv1, w1: dw1, w2: dw2, wAdd: dwAdd }) : null;
  const bf = buoyancyFactor(bmw);

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-[320px_1fr] gap-4">
        <Card title="Rheology: viskozimetr oxunuşları" formula="PV = θ600 − θ300;  YP = θ300 − PV;  AV = θ600/2">
          <Num label="θ600" unit="dial" value={t600} onChange={setT600} />
          <Num label="θ300" unit="dial" value={t300} onChange={setT300} />
          <Num label="θ6" unit="dial" value={t6} onChange={setT6} />
          <Num label="θ3" unit="dial" value={t3} onChange={setT3} />
          {r.valid ? (
            <>
              <Out label="PV" value={f(r.pv, 1)} unit="cP" />
              <Out label="YP" value={f(r.yp, 1)} unit="lb/100ft²" />
              <Out label="AV" value={f(r.av, 1)} unit="cP" />
              <Out label="Power law n" value={f(r.nPower, 3)} unit="" />
              <Out label="Power law K" value={f(r.kPower, 0)} unit="ekv. cP" />
              <Out label="τ0 (low-shear YP)" value={f(r.tau0, 1)} unit="lb/100ft²" />
              {r.nHB !== null && r.kHB !== null && (
                <>
                  <Out label="HB n" value={f(r.nHB, 3)} unit="" />
                  <Out label="HB K" value={f(r.kHB, 0)} unit="ekv. cP" />
                </>
              )}
            </>
          ) : (
            <Note>Düzgün oxunuşlar daxil et: θ600 &gt; θ300 &gt; 0.</Note>
          )}
        </Card>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
          <h3 className="text-[14px] font-semibold text-[#F0F4FF] mb-1 font-['Space_Grotesk']">Hansı model məhlula daha yaxşı uyğundur?</h3>
          <p className="text-[12px] text-[#6B82A0] mb-3 leading-relaxed font-['Space_Grotesk']">
            Üç model 300 və 600 rpm-də ölçülmüş nöqtələrə uyğun gəlir. Fərq aşağı kəsilmə sürətlərindədir (6 və 3 rpm): bu bölgə hole cleaning və asılı saxlama üçün həlledicidir.
            Aşağıdakı nümunədə Bingham aşağı sürətlərdə qiyməti çox yüksək, power law isə çox aşağı verir. Herschel-Bulkley ölçülmüş 6 və 3 rpm nöqtələrinə ən yaxındır.
          </p>
          <RheologyChart r={{ t600, t300, t6, t3 }} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Ağırlaşdırma" formula="lb/bbl = 42·ρ·(W2 − W1)/(ρ − W2)">
          <label className="block mb-2.5">
            <span className="block text-[11px] text-[#8DA2BF] mb-1 font-['Space_Grotesk']">Ağırlaşdırıcı</span>
            <select
              value={mat}
              onChange={(e) => setMat(e.target.value as MaterialKey)}
              className="w-full bg-[#080C18] text-[#F0F4FF] text-[13px] rounded-lg px-3 py-2 outline-none border border-[rgba(255,255,255,0.08)]"
            >
              {(Object.keys(MATERIALS) as MaterialKey[]).map((k) => (
                <option key={k} value={k}>{MATERIALS[k].name} ({MATERIALS[k].ppg} ppg)</option>
              ))}
            </select>
          </label>
          <Num label="Başlanğıc çəki W1" unit="ppg" value={w1} onChange={setW1} />
          <Num label="Hədəf çəki W2" unit="ppg" value={w2} onChange={setW2} />
          <Num label="Məhlul həcmi" unit="bbl" value={vol} onChange={setVol} />
          {wu ? (
            <>
              <Out label="Kisə / 100 bbl (100 lb)" value={f(wu.sacksPer100bbl, 1)} unit="" />
              <Out label="Cəmi material" value={f(wu.totalLb, 0)} unit="lb" />
              <Out label="Cəmi kisə (100 lb)" value={f(wu.totalSacks, 0)} unit="" tone="good" />
              <Out label="Həcm artımı" value={f(wu.volumeIncreaseBbl, 1)} unit="bbl" />
              <Out label="Son həcm" value={f(vol + wu.volumeIncreaseBbl, 1)} unit="bbl" />
              <Note>Yüksək çəkidə bərk hissəcik payı artır: PV və ECD yüksəlir. Çən tutumunu və solids control imkanlarını yoxla.</Note>
            </>
          ) : (
            <Note>Hədəf çəki başlanğıcdan yüksək və ağırlaşdırıcı sıxlığından aşağı olmalıdır.</Note>
          )}
        </Card>

        <Card title="Seyreltmə (çəkini endirmək)" formula="V_add = V1·(W1 − W2)/(W2 − W_add)">
          <Num label="Məhlul həcmi V1" unit="bbl" value={dv1} onChange={setDv1} />
          <Num label="Başlanğıc çəki W1" unit="ppg" value={dw1} onChange={setDw1} />
          <Num label="Hədəf çəki W2" unit="ppg" value={dw2} onChange={setDw2} />
          <Num label="Əlavə olunan mayenin çəkisi" unit="ppg" value={dwAdd} onChange={setDwAdd} />
          {dil !== null ? (
            <>
              <Out label="Əlavə olunacaq maye" value={f(dil, 1)} unit="bbl" tone="good" />
              <Out label="Son həcm" value={f(dv1 + dil, 1)} unit="bbl" />
              <Note>Seyreltmə rheology və kimyəvi tərkibi də dəyişir: əlavə materialla yenidən tarazlama lazım ola bilər.</Note>
            </>
          ) : (
            <Note>Hədəf çəki başlanğıcdan aşağı və əlavə mayenin çəkisindən yuxarı olmalıdır.</Note>
          )}
        </Card>

        <Card title="İki məhlulun qarışığı" formula="W = (V1·W1 + V2·W2)/(V1 + V2)">
          <Num label="V1" unit="bbl" value={mv1} onChange={setMv1} />
          <Num label="W1" unit="ppg" value={mw1} onChange={setMw1} />
          <Num label="V2" unit="bbl" value={mv2} onChange={setMv2} />
          <Num label="W2" unit="ppg" value={mw2} onChange={setMw2} />
          {ok(mv1, mw1, mv2, mw2) && mv1 + mv2 > 0 && (
            <>
              <Out label="Son çəki" value={f(mixDensity(mv1, mw1, mv2, mw2), 2)} unit="ppg" tone="good" />
              <Out label="Son həcm" value={f(mv1 + mv2, 1)} unit="bbl" />
              <Note>Həcmlərin additiv olduğu qəbul edilir (ideal qarışıq).</Note>
            </>
          )}
        </Card>

        <Card title="Buoyancy (qaldırıcı qüvvə)" formula="BF = 1 − MW/65.5;  W_buoyed = W_hava·BF">
          <Num label="Məhlul çəkisi" unit="ppg" value={bmw} onChange={setBmw} />
          <Num label="String-in havadakı çəkisi" unit="lbf" value={airW} onChange={setAirW} />
          {ok(bmw, airW) && (
            <>
              <Out label="Buoyancy factor" value={f(bf, 3)} unit="" />
              <Out label="Məhluldakı çəki" value={f(airW * bf, 0)} unit="lbf" tone="good" />
              <Note>Məhlul çəkisi artdıqca weight indicator-da göstərilən çəki azalır.</Note>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
