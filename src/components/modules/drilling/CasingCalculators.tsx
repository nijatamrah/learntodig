"use client";

import { useState } from "react";
import {
  BBL_TO_FT3,
  CASINGS_9_5_8,
  annCapacityBblFt,
  bodyYieldLbf,
  burstBarlow,
  buoyancyFactor,
  capacityBblFt,
  casingId,
  cementVolumes,
  collapseWithTension,
  displacementBbl,
  hydro,
  narrowToWideVelocity,
  sacksFor,
  slurryMix,
  standoffPct,
  steelAreaIn2,
  steelDisplacementBblFt,
  surfacePressureGasKick,
} from "@/lib/drilling/casing";
import { Card, Note, Num, Out, fmt as f, ok } from "./CalcParts";

export default function CasingCalculators() {
  // 1. Həndəsə
  const [od, setOd] = useState(9.625);
  const [wall, setWall] = useState(0.472);
  const [dh, setDh] = useState(12.25);
  // 2. Müqavimət və yük
  const [specId, setSpecId] = useState("n80-47");
  const [depth, setDepth] = useState(9000);
  const [mw, setMw] = useState(10.5);
  const [level, setLevel] = useState(9000);
  // 3. Qaz kick-i
  const [shoe, setShoe] = useState(9000);
  const [nextTd, setNextTd] = useState(12500);
  const [pp, setPp] = useState(12.0);
  const [fg, setFg] = useState(14.5);
  const [gGas, setGGas] = useState(0.1);
  // 4. Slurry
  const [water, setWater] = useState(5.0);
  // 5. Həcm
  const [prevShoe, setPrevShoe] = useState(4000);
  const [prevId, setPrevId] = useState(12.415);
  const [toc, setToc] = useState(3500);
  const [track, setTrack] = useState(80);
  const [excess, setExcess] = useState(30);
  // 6. U-tube
  const [rhoMud, setRhoMud] = useState(10.5);
  const [rhoCem, setRhoCem] = useState(15.8);
  const [tocU, setTocU] = useState(4000);
  const [shoeU, setShoeU] = useState(9000);
  const [fracU, setFracU] = useState(14.5);
  // 7. Standoff
  const [off, setOff] = useState(0.5);

  const id = od - 2 * wall;
  const spec = CASINGS_9_5_8.find((s) => s.id === specId)!;
  const specId_ = casingId(spec);
  const area = steelAreaIn2(spec.od, specId_);
  const bf = buoyancyFactor(mw);
  const lv = Math.min(level, depth);

  // yüklər
  const pe = hydro(mw, depth);
  const pi = hydro(mw, Math.max(0, depth - lv));
  const collapseLoad = Math.max(0, pe - pi);
  const tension = spec.wtPpf * bf * Math.max(0, shoe - depth);
  const collapseRated = collapseWithTension(spec.collapsePsi, spec.yieldPsi, tension / area);
  const burstR = burstBarlow(spec.od, spec.wall, spec.yieldPsi);
  const yieldF = bodyYieldLbf(spec);
  const topTension = spec.wtPpf * bf * shoe;

  const kick = surfacePressureGasKick({ setTvd: shoe, nextTd, nextPorePpg: pp, shoeFracPpg: fg, gasGrad: gGas });

  const slurry = slurryMix(water);
  const geom = { shoeTvd: shoe, casingOd: od, casingId: id, holeDia: dh, excess: excess / 100, prevShoeTvd: prevShoe, prevCasingId: prevId, trackFt: track, tocTvd: toc };
  const vols = ok(od, wall, dh, shoe, prevShoe, prevId, toc, track, excess) ? cementVolumes(geom) : null;

  const pAnn = 0.052 * (rhoMud * Math.max(0, tocU) + rhoCem * Math.max(0, shoeU - tocU));
  const pCas = 0.052 * rhoMud * shoeU;
  const emwU = pAnn / (0.052 * shoeU);

  const gapU = (dh - od) / 2;
  const so = standoffPct(dh, od, off);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Tutum, yerdəyişmə və sahə" formula="C = ID²/1029.4;  C_ann = (D_h² − OD²)/1029.4">
        <div className="grid grid-cols-3 gap-x-2">
          <Num label="Casing OD" unit="in" value={od} onChange={setOd} />
          <Num label="Divar" unit="in" value={wall} onChange={setWall} />
          <Num label="Quyu" unit="in" value={dh} onChange={setDh} />
        </div>
        {ok(od, wall, dh) && id > 0 && dh > od && (
          <>
            <Out label="Casing ID" value={f(id, 3)} unit="in" />
            <Out label="Daxili tutum" value={f(capacityBblFt(id), 4)} unit="bbl/ft" />
            <Out label="Annulus tutumu" value={f(annCapacityBblFt(dh, od), 4)} unit="bbl/ft" />
            <Out label="Polad yerdəyişməsi" value={f(steelDisplacementBblFt(od, id), 4)} unit="bbl/ft" />
            <Out label="Polad kəsik sahəsi" value={f(steelAreaIn2(od, id), 2)} unit="in²" />
            <Note>Annulus tutumu sement həcmi hesabının əsasıdır. Polad yerdəyişməsi casing quyuya endirilərkən (yaxud tripdə) məhlul həcminin necə dəyişdiyini göstərir.</Note>
          </>
        )}
      </Card>

      <Card title="Müqavimət, yük və dizayn faktorları" formula="SF = müqavimət / yük">
        <label className="block mb-2.5">
          <span className="block text-[11px] text-[#8DA2BF] mb-1 font-['Space_Grotesk']">Casing (9-5/8 in)</span>
          <select value={specId} onChange={(e) => setSpecId(e.target.value)} className="w-full bg-[#080C18] text-[#F0F4FF] text-[13px] rounded-lg px-3 py-2 outline-none border border-[rgba(255,255,255,0.08)]">
            {CASINGS_9_5_8.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="Shoe dərinliyi" unit="ft" value={shoe} onChange={setShoe} />
          <Num label="Qiymətləndirmə dərinliyi" unit="ft" value={depth} onChange={setDepth} />
          <Num label="Məhlul" unit="ppg" value={mw} onChange={setMw} />
          <Num label="Boşalma səviyyəsi (məhlul üstü)" unit="ft" value={level} onChange={setLevel} />
        </div>
        {ok(depth, mw, level, shoe) && depth > 0 && shoe > 0 && (
          <>
            <Out label="Burst müqaviməti (API)" value={f(burstR, 0)} unit="psi" />
            <Out label="Boru gövdəsi yield" value={f(yieldF, 0)} unit="lbf" />
            <Out label="Collapse yükü (bu dərinlikdə)" value={f(collapseLoad, 0)} unit="psi" />
            <Out label="Eksenel yük (buoyed, bu dərinlikdə)" value={f(tension, 0)} unit="lbf" />
            <Out label="Collapse müqaviməti (cədvəl → axial düzəliş)" value={`${f(spec.collapsePsi, 0)} → ${f(collapseRated, 0)}`} unit="psi" />
            <Out label="Collapse SF" value={collapseLoad > 0 ? f(collapseRated / collapseLoad, 2) : "∞"} unit="" tone={collapseLoad === 0 || collapseRated / collapseLoad >= 1 ? "good" : "bad"} />
            <Out label="Tension SF (bu dərinlikdə)" value={tension > 0 ? f(yieldF / tension, 2) : "∞"} unit="" tone={tension === 0 || yieldF / tension >= 1.6 ? "good" : "bad"} />
            <Out label="Tension SF (səthdə, bütün string)" value={f(yieldF / topTension, 2)} unit="" tone={yieldF / topTension >= 1.6 ? "good" : "bad"} />
            <Note>Buoyancy əmsalı {f(bf, 4)}. Boşalma səviyyəsini shoe-ya bərabər et (tam boşalma): collapse yükü dibdə maksimum olur. Shoe dərinliyi digər kartlarla ortaqdır.</Note>
          </>
        )}
      </Card>

      <Card title="Qaz kick-i: səth təzyiqi (burst yükü)" formula="P_s = min(Pp_TD − g·TD,  Pfrac_shoe − g·D_shoe)">
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="Shoe dərinliyi" unit="ft" value={shoe} onChange={setShoe} />
          <Num label="Növbəti TD" unit="ft" value={nextTd} onChange={setNextTd} />
          <Num label="TD-də məsamə təz." unit="ppg" value={pp} onChange={setPp} />
          <Num label="Shoe çat qradiyenti" unit="ppg" value={fg} onChange={setFg} />
          <Num label="Qaz qradiyenti" unit="psi/ft" value={gGas} onChange={setGGas} />
        </div>
        {ok(shoe, nextTd, pp, fg, gGas) && (
          <>
            <Out label="TD-də məsamə təzyiqi" value={f(hydro(pp, nextTd), 0)} unit="psi" />
            <Out label="Məhdudlaşdırılmamış səth təzyiqi" value={f(kick.unlimited, 0)} unit="psi" />
            <Out label="Shoe ilə məhdud səth təzyiqi" value={f(kick.capped, 0)} unit="psi" tone={kick.limitedByShoe ? "warn" : "good"} />
            <Note>{kick.limitedByShoe ? "Shoe çat qradiyenti məhdudlaşdırır: bundan yuxarı təzyiqdə formasiya yarılır, buna görə burst yükü daha aşağı götürülür." : "Məsamə təzyiqi səth təzyiqini təyin edir: shoe çatı bu yükə qədər dayanır."}</Note>
          </>
        )}
      </Card>

      <Card title="Sement slurry (absolute volume)" formula="ρ = (94 + 8.34·w)/(94·0.0382 + w);  Y = V/7.48">
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="Mix suyu" unit="gal/sk" value={water} onChange={setWater} />
        </div>
        {ok(water) && water > 0 && (
          <>
            <Out label="Slurry sıxlığı" value={f(slurry.densityPpg, 2)} unit="ppg" />
            <Out label="Yield" value={f(slurry.yieldFt3, 3)} unit="ft³/sk" />
            <Out label="Slurry həcmi (1 sk)" value={f(94 * 0.0382 + water, 3)} unit="gal/sk" />
            <Out label="Sement kisələri (aşağıdakı ümumi həcm üçün)" value={vols ? f(sacksFor(vols.total, slurry.yieldFt3), 0) : "—"} unit="sk" />
            <Note>Su artdıqca sıxlıq azalır, yield artır, lakin möhkəmlik düşür və free water riski yaranır. Təhlükəsiz su aralığı laboratoriya sınağı ilə təyin olunur.</Note>
          </>
        )}
      </Card>

      <div className="md:col-span-2">
        <Card title="Sement həcmi və displacement" formula="V = L_open·C_ann·(1+x) + L_cased·C_cased + L_track·C">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2">
            <Num label="Shoe dərinliyi" unit="ft" value={shoe} onChange={setShoe} />
            <Num label="Əvvəlki shoe" unit="ft" value={prevShoe} onChange={setPrevShoe} />
            <Num label="Əvvəlki casing ID" unit="in" value={prevId} onChange={setPrevId} />
            <Num label="TOC dərinliyi" unit="ft" value={toc} onChange={setToc} />
            <Num label="Shoe track" unit="ft" value={track} onChange={setTrack} />
            <Num label="Excess" unit="%" value={excess} onChange={setExcess} />
            <Num label="Casing OD" unit="in" value={od} onChange={setOd} />
            <Num label="Quyu" unit="in" value={dh} onChange={setDh} />
          </div>
          {vols && id > 0 && dh > od && (
            <div className="grid sm:grid-cols-2 gap-x-8">
              <div>
                <Out label="Açıq quyu hissəsi" value={f(vols.openLen, 0)} unit="ft" />
                <Out label="Əvvəlki casing içindəki hissə" value={f(vols.casedLen, 0)} unit="ft" />
                <Out label="V (açıq quyu, excess ilə)" value={f(vols.vOpen, 1)} unit="bbl" />
                <Out label="V (cased annulus)" value={f(vols.vCased, 1)} unit="bbl" />
                <Out label="V (shoe track)" value={f(vols.vTrack, 1)} unit="bbl" />
              </div>
              <div>
                <Out label="Ümumi slurry həcmi" value={f(vols.total, 1)} unit="bbl" tone="good" />
                <Out label="Ümumi slurry həcmi" value={f(vols.total * BBL_TO_FT3, 0)} unit="ft³" />
                <Out label="Kisə sayı (yuxarıdakı slurry ilə)" value={f(sacksFor(vols.total, slurry.yieldFt3), 0)} unit="sk" />
                <Out label="Displacement həcmi" value={f(displacementBbl(geom), 1)} unit="bbl" />
                <Out label="Tövsiyə: +5% ehtiyatla" value={f(sacksFor(vols.total, slurry.yieldFt3) * 1.05, 0)} unit="sk" />
              </div>
            </div>
          )}
          <Note>Displacement plug float collar-a çatana qədər: casing tutumu × (shoe − shoe track). Kisə sayı yuxarıdakı sement slurry kartındakı su miqdarına bağlıdır.</Note>
        </Card>
      </div>

      <Card title="U-tube və shoe-da EMW" formula="Δp = P_ann − P_int;  EMW = P_ann/(0.052·D)">
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="Məhlul" unit="ppg" value={rhoMud} onChange={setRhoMud} />
          <Num label="Sement" unit="ppg" value={rhoCem} onChange={setRhoCem} />
          <Num label="TOC (annulusda)" unit="ft" value={tocU} onChange={setTocU} />
          <Num label="Shoe" unit="ft" value={shoeU} onChange={setShoeU} />
          <Num label="Çat qradiyenti" unit="ppg" value={fracU} onChange={setFracU} />
        </div>
        {ok(rhoMud, rhoCem, tocU, shoeU, fracU) && shoeU > 0 && (
          <>
            <Out label="Annulus təzyiqi (shoe)" value={f(pAnn, 0)} unit="psi" />
            <Out label="Casing daxili təzyiq (shoe)" value={f(pCas, 0)} unit="psi" />
            <Out label="Δp (plug bump anında)" value={f(pAnn - pCas, 0)} unit="psi" />
            <Out label="EMW (shoe)" value={f(emwU, 2)} unit="ppg" tone={emwU <= fracU ? "good" : "bad"} />
            <Note>{emwU <= fracU ? "EMW çat qradiyentindən aşağıdır: formasiya yarılmır." : "EMW çat qradiyentini aşır: itkili sirkulyasiya və sementin lazım olan yüksəkliyə çatmaması riski var."} Sürtünmə itkisi nəzərə alınmır.</Note>
          </>
        )}
      </Card>

      <Card title="Standoff və axın nisbəti" formula="SO = (1 − e/gap)·100;  v_dar/v_geniş ≈ ((1−ε)/(1+ε))²">
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="Sürüşmə (e)" unit="in" value={off} onChange={setOff} />
        </div>
        {ok(off, od, dh) && dh > od && (
          <>
            <Out label="Boşluq (gap)" value={f(gapU, 3)} unit="in" />
            <Out label="Standoff" value={f(so, 1)} unit="%" tone={so >= 67 ? "good" : so >= 40 ? "warn" : "bad"} />
            <Out label="Dar/geniş tərəf axın sürəti" value={f(narrowToWideVelocity(so), 3)} unit="" />
            <Note>Standoff 67%-dən yuxarı olmalıdır. Sürüşmə (e) mərkəzləşdirici sayı, aralıq və meylə görə dəyişir (Vizual → Mərkəzləmə).</Note>
          </>
        )}
      </Card>
    </div>
  );
}
