"use client";

import { useState } from "react";
import {
  BUILD_RADIUS_CONST,
  applyToolface,
  bendingStressPsi,
  buildHold,
  closure,
  maxDlsForStress,
  minCurvatureStep,
  separationFactor,
  tangentialStep,
  trueAzimuth,
  verticalSection,
} from "@/lib/drilling/directional";
import { Card, Note, Num, Out, fmt as f, ok } from "./CalcParts";

export default function DirectionalCalculators() {
  // 1. Survey
  const [md1, setMd1] = useState(5000);
  const [i1, setI1] = useState(20);
  const [a1, setA1] = useState(45);
  const [md2, setMd2] = useState(5100);
  const [i2, setI2] = useState(23);
  const [a2, setA2] = useState(52);
  // 2. Build and hold
  const [kop, setKop] = useState(2000);
  const [bur, setBur] = useState(3);
  const [tvd, setTvd] = useState(9000);
  const [hd, setHd] = useState(3000);
  // 3. VS
  const [n, setN] = useState(1200);
  const [e, setE] = useState(800);
  const [azT, setAzT] = useState(30);
  // 4. Toolface
  const [ti, setTi] = useState(30);
  const [ta, setTa] = useState(45);
  const [tdls, setTdls] = useState(3);
  const [tl, setTl] = useState(100);
  const [tf, setTf] = useState(60);
  const [slide, setSlide] = useState(100);
  // 5. Bending
  const [od, setOd] = useState(5);
  const [dls, setDls] = useState(6);
  const [endur, setEndur] = useState(20000);
  // 6. Anti-collision
  const [cc, setCc] = useState(60);
  const [r1, setR1] = useState(18);
  const [r2, setR2] = useState(12);
  // 7. True azimuth
  const [mag, setMag] = useState(120);
  const [decl, setDecl] = useState(5);

  const s1 = { md: md1, inc: i1, azi: a1 };
  const s2 = { md: md2, inc: i2, azi: a2 };
  const step = ok(md1, i1, a1, md2, i2, a2) && md2 > md1 ? minCurvatureStep(s1, s2) : null;
  const tan = step ? tangentialStep(s1, s2) : null;

  const bh = buildHold({ kop, burDegPer100: bur, targetTvd: tvd, targetHd: hd });

  const clos = closure(n, e);
  const vs = verticalSection(n, e, azT);

  const effDls = (tdls * slide) / 100;
  const beta = (effDls * tl) / 100;
  const tfRes = applyToolface(ti, ta, beta, tf);

  const sigma = bendingStressPsi(od, dls);
  const dlsMax = maxDlsForStress(od, endur);

  const sf = separationFactor(cc, r1, r2);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Minimum curvature: iki survey stansiyası" formula="β = acos(...);  RF = (2/β)tan(β/2);  DLS = β·100/ΔMD">
        <div className="grid grid-cols-3 gap-x-2">
          <Num label="MD 1" unit="ft" value={md1} onChange={setMd1} />
          <Num label="Inc 1" unit="°" value={i1} onChange={setI1} />
          <Num label="Azi 1" unit="°" value={a1} onChange={setA1} />
          <Num label="MD 2" unit="ft" value={md2} onChange={setMd2} />
          <Num label="Inc 2" unit="°" value={i2} onChange={setI2} />
          <Num label="Azi 2" unit="°" value={a2} onChange={setA2} />
        </div>
        {step && tan && (
          <>
            <Out label="Dogleg bucağı β" value={f(step.beta, 3)} unit="°" />
            <Out label="Ratio factor" value={f(step.rf, 4)} unit="" />
            <Out label="DLS" value={f(step.dls, 2)} unit="°/100ft" tone={step.dls > 6 ? "warn" : "good"} />
            <Out label="ΔTVD" value={f(step.dTvd, 2)} unit="ft" />
            <Out label="ΔNorth" value={f(step.dNorth, 2)} unit="ft" />
            <Out label="ΔEast" value={f(step.dEast, 2)} unit="ft" />
            <Out label="Tangential metodun ΔEast səhvi" value={f(tan.dEast - step.dEast, 2)} unit="ft" tone="warn" />
            <Note>Tangential metod yalnız aşağı stansiyanın bucağını götürür, buna görə qövsü düz xəttlə əvəz edir və bir neçə ft səhv yığır. DLS 6°/100 ft-dən çox olarsa xəbərdarlıq rəngi görünür.</Note>
          </>
        )}
      </Card>

      <Card title="Build-and-hold planı" formula="R = 5729.58/BUR;  θ = acos(−R/L) − atan2(V, D−R)">
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="KOP" unit="ft" value={kop} onChange={setKop} />
          <Num label="Build rate" unit="°/100ft" value={bur} onChange={setBur} />
          <Num label="Hədəf TVD" unit="ft" value={tvd} onChange={setTvd} />
          <Num label="Hədəfə horizontal məsafə" unit="ft" value={hd} onChange={setHd} />
        </div>
        {ok(kop, bur, tvd, hd) && (
          <>
            <Out label="Build radius" value={f(bh.radius, 1)} unit="ft" />
            {bh.valid ? (
              <>
                <Out label="Tangent inklinasiyası" value={f(bh.tangentIncDeg, 2)} unit="°" tone="good" />
                <Out label="Build uzunluğu" value={f(bh.buildLen, 1)} unit="ft" />
                <Out label="Tangent uzunluğu" value={f(bh.tangentLen, 1)} unit="ft" />
                <Out label="Hədəfdə MD" value={f(bh.totalMd, 1)} unit="ft" />
                <Out label="Build sonunda TVD / HD" value={`${f(bh.buildEndTvd, 0)} / ${f(bh.buildEndHd, 0)}`} unit="ft" />
                <Out label="MD − TVD fərqi" value={f(bh.totalMd - tvd, 0)} unit="ft" />
              </>
            ) : (
              <Note>{bh.note}</Note>
            )}
          </>
        )}
      </Card>

      <Card title="Vertical section və closure" formula="VS = N·cos Az_t + E·sin Az_t;  C = √(N² + E²)">
        <div className="grid grid-cols-3 gap-x-2">
          <Num label="Şimal (N)" unit="ft" value={n} onChange={setN} />
          <Num label="Şərq (E)" unit="ft" value={e} onChange={setE} />
          <Num label="Hədəf azimutu" unit="°" value={azT} onChange={setAzT} />
        </div>
        {ok(n, e, azT) && (
          <>
            <Out label="Vertical section" value={f(vs, 1)} unit="ft" tone="good" />
            <Out label="Closure məsafəsi" value={f(clos.dist, 1)} unit="ft" />
            <Out label="Closure azimutu" value={f(clos.azi, 1)} unit="°" />
            <Out label="Hədəf xəttindən yan sapma" value={f(Math.abs(n * Math.sin((azT * Math.PI) / 180) - e * Math.cos((azT * Math.PI) / 180)), 1)} unit="ft" />
            <Note>Closure quyunun düz xətt məsafəsi, VS isə hədəf istiqamətinə proyeksiyadır. Yan sapma hədəf xəttindən perpendikulyar kənarlaşmadır.</Note>
          </>
        )}
      </Card>

      <Card title="Toolface və sliding" formula="cos I₂ = cos I₁ cos β − sin I₁ sin β cos TF">
        <div className="grid grid-cols-3 gap-x-2">
          <Num label="Inc" unit="°" value={ti} onChange={setTi} />
          <Num label="Azi" unit="°" value={ta} onChange={setTa} />
          <Num label="Toolface" unit="°" value={tf} onChange={setTf} />
          <Num label="Motor DLS" unit="°/100ft" value={tdls} onChange={setTdls} />
          <Num label="İnterval" unit="ft" value={tl} onChange={setTl} />
          <Num label="Sliding payı" unit="%" value={slide} onChange={setSlide} />
        </div>
        {ok(ti, ta, tdls, tl, tf, slide) && (
          <>
            <Out label="Effektiv DLS (sliding payı ilə)" value={f(effDls, 2)} unit="°/100ft" />
            <Out label="Dogleg bu intervalda" value={f(beta, 2)} unit="°" />
            <Out label="Yeni inklinasiya" value={f(tfRes.inc, 2)} unit="°" tone="good" />
            <Out label="Yeni azimut" value={f(tfRes.azi, 2)} unit="°" tone="good" />
            <Out label="Δ inklinasiya / Δ azimut" value={`${f(tfRes.dInc, 2)} / ${f(tfRes.dAzi, 2)}`} unit="°" />
            <Note>Toolface 0° = high side (build), 180° = low side (drop), 90° = sağ turn. Sliding payı 50% olsa, orta DLS motorun maksimum DLS-inin yarısı olur, qalan hissədə rotasiya düz gedir.</Note>
          </>
        )}
      </Card>

      <Card title="Bükülmə gərginliyi və icazə verilən DLS" formula="σ_b = 218.2·OD·DLS">
        <div className="grid grid-cols-3 gap-x-2">
          <Num label="Boru OD" unit="in" value={od} onChange={setOd} />
          <Num label="DLS" unit="°/100ft" value={dls} onChange={setDls} />
          <Num label="Endurance limit" unit="psi" value={endur} onChange={setEndur} />
        </div>
        {ok(od, dls, endur) && od > 0 && (
          <>
            <Out label="Bükülmə gərginliyi" value={f(sigma, 0)} unit="psi" tone={sigma > endur ? "bad" : "good"} />
            <Out label="Endurance limitə görə maks. DLS" value={f(dlsMax, 2)} unit="°/100ft" />
            <Note>Endurance limit borunun sinfinə, korroziyaya və dartılma yükünə görə azalır. Burada verilən dəyər nümunədir: real limiti istehsalçı və şirkət standartı verir.</Note>
          </>
        )}
      </Card>

      <Card title="Anti-collision ayırma faktoru" formula="SF = CC / (r₁ + r₂)">
        <div className="grid grid-cols-3 gap-x-2">
          <Num label="Mərkəz-mərkəz" unit="ft" value={cc} onChange={setCc} />
          <Num label="r₁ (bizim)" unit="ft" value={r1} onChange={setR1} />
          <Num label="r₂ (qonşu)" unit="ft" value={r2} onChange={setR2} />
        </div>
        {ok(cc, r1, r2) && r1 + r2 > 0 && (
          <>
            <Out label="Ayırma faktoru" value={f(sf, 2)} unit="" tone={sf >= 1.5 ? "good" : sf >= 1 ? "warn" : "bad"} />
            <Note>{sf >= 1.5 ? "Adətən rutin qazmaya icazə verilən aralıqdır (operator standartını yoxla)." : sf >= 1 ? "Elipslər kəsişmir, lakin əlavə nəzarət və tez-tez survey lazımdır." : "Qeyri-müəyyənlik elipsləri kəsişir: qazma dayandırılır, plan dəyişdirilir."}</Note>
          </>
        )}
      </Card>

      <Card title="Maqnit azimutunun düzəlişi" formula="Az_true = Az_mag + declination">
        <div className="grid grid-cols-2 gap-x-2">
          <Num label="Maqnit azimut" unit="°" value={mag} onChange={setMag} />
          <Num label="Meyllik (şərq +)" unit="°" value={decl} onChange={setDecl} />
        </div>
        {ok(mag, decl) && (
          <>
            <Out label="Həqiqi azimut" value={f(trueAzimuth(mag, decl), 1)} unit="°" tone="good" />
            <Note>Burada yalnız meyllik nəzərə alınır. Grid convergence ayrıca əlavə olunur. Real quyuda tarixə və koordinata görə meylliyi BGGM, IGRF və ya HDGM modelləri verir.</Note>
          </>
        )}
      </Card>

      <Card title="Build radius və BUR" formula="R = 5729.58 / BUR">
        <BuildRadiusPair />
      </Card>
    </div>
  );
}

function BuildRadiusPair() {
  const [bur, setBur] = useState(3);
  const [r, setR] = useState(1909.9);
  return (
    <>
      <div className="grid grid-cols-2 gap-x-2">
        <Num label="BUR" unit="°/100ft" value={bur} onChange={setBur} />
        <Num label="Radius" unit="ft" value={r} onChange={setR} />
      </div>
      {ok(bur, r) && bur > 0 && r > 0 && (
        <>
          <Out label="BUR-dan radius" value={f(BUILD_RADIUS_CONST / bur, 1)} unit="ft" />
          <Out label="Radiusdan BUR" value={f(BUILD_RADIUS_CONST / r, 2)} unit="°/100ft" />
          <Out label="90° build üçün uzunluq" value={f((90 / bur) * 100, 0)} unit="ft" />
          <Note>BUR yüksəldikcə radius azalır: 3°/100 ft-də 1,910 ft, 10°/100 ft-də 573 ft. Qısa radiuslu quyuda çox əyilmə üçün xüsusi alətlər lazımdır.</Note>
        </>
      )}
    </>
  );
}
