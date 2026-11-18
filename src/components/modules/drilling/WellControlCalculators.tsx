"use client";

import { useState } from "react";
import {
  bariteSacksPer100Bbl,
  circulationMinutes,
  fcpPsi,
  formationEmw,
  formationPressurePsi,
  gasVolumeAtDepth,
  hydroPsi,
  icpPsi,
  influxGradient,
  influxLengthFt,
  influxType,
  kickToleranceIntensity,
  killMudPpg,
  maasp,
  migrationPressureRise,
  shoeEmwShutIn,
  strokesFor,
  wwPressureAt,
} from "@/lib/drilling/wellcontrol";
import { Card, Note, Num, Out, fmt as f, ok } from "./CalcParts";

export default function WellControlCalculators() {
  const [tvd, setTvd] = useState(10000);
  const [mw, setMw] = useState(10);
  const [sidpp, setSidpp] = useState(520);
  const [sicp, setSicp] = useState(700);
  const [scr, setScr] = useState(800);
  const [gain, setGain] = useState(20);
  const [ann, setAnn] = useState(0.0459);
  const [dsVol, setDsVol] = useState(150);
  const [outPerStk, setOutPerStk] = useState(0.1);
  const [spm, setSpm] = useState(30);
  const [stk, setStk] = useState(750);
  const [shoe, setShoe] = useState(6000);
  const [fg, setFg] = useState(14);
  const [gGas, setGGas] = useState(0.1);
  const [v1, setV1] = useState(20);
  const [p1, setP1] = useState(5720);
  const [depthG, setDepthG] = useState(2000);
  const [rate, setRate] = useState(600);
  const [hours, setHours] = useState(0.5);
  const [w1, setW1] = useState(10);
  const [w2, setW2] = useState(11);
  const [sysVol, setSysVol] = useState(1000);

  const kmw = killMudPpg(mw, sidpp, tvd);
  const icp = icpPsi(sidpp, scr);
  const fcp = fcpPsi(scr, kmw, mw);
  const lk = influxLengthFt(gain, ann);
  const grad = influxGradient(mw, sicp, sidpp, lk);
  const stb = strokesFor(dsVol, outPerStk);
  const maaspV = maasp(fg, mw, shoe);
  const kt = kickToleranceIntensity({ td: tvd, shoe, mw, fgPpg: fg, kickLenFt: lk, gasGrad: gGas });
  const migDepth = rate * hours;
  const sx100 = bariteSacksPer100Bbl(w1, w2);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Kill parametrləri" formula="Pf = 0.052·MW·TVD + SIDPP;  KMW = MW + SIDPP/(0.052·TVD)">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2">
          <Num label="TVD" unit="ft" value={tvd} onChange={setTvd} />
          <Num label="MW" unit="ppg" value={mw} onChange={setMw} />
          <Num label="SIDPP" unit="psi" value={sidpp} onChange={setSidpp} />
          <Num label="SCR təzyiqi" unit="psi" value={scr} onChange={setScr} />
        </div>
        {ok(tvd, mw, sidpp, scr) && tvd > 0 && (
          <>
            <Out label="Hidrostatik təzyiq" value={f(hydroPsi(mw, tvd), 0)} unit="psi" />
            <Out label="Formasiya təzyiqi" value={f(formationPressurePsi(mw, tvd, sidpp), 0)} unit="psi" />
            <Out label="Formasiya təzyiqi (ekv. çəki)" value={f(formationEmw(mw, tvd, sidpp), 2)} unit="ppg" />
            <Out label="Kill mud weight" value={f(kmw, 2)} unit="ppg" tone="good" />
            <Out label="ICP" value={f(icp, 0)} unit="psi" />
            <Out label="FCP" value={f(fcp, 0)} unit="psi" />
            <Note>Praktikada kill məhlulu çəkisinə kiçik trip marjası əlavə edilə bilər. Bu operator standartına görədir və burada nəzərə alınmır.</Note>
          </>
        )}
      </Card>

      <Card title="Influx uzunluğu və tipi" formula="L_k = gain/C_ann;  g = 0.052·MW − (SICP − SIDPP)/L_k">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2">
          <Num label="Pit gain" unit="bbl" value={gain} onChange={setGain} />
          <Num label="Annulus tutumu" unit="bbl/ft" value={ann} onChange={setAnn} />
          <Num label="SICP" unit="psi" value={sicp} onChange={setSicp} />
          <Num label="SIDPP" unit="psi" value={sidpp} onChange={setSidpp} />
        </div>
        {ok(gain, ann, sicp, sidpp, mw) && ann > 0 && gain > 0 && (
          <>
            <Out label="Influx hündürlüyü" value={f(lk, 1)} unit="ft" />
            <Out label="Influx qradiyenti" value={f(grad, 3)} unit="psi/ft" />
            <Out label="Təxmini tip" value={influxType(grad)} unit="" tone={grad < 0.25 ? "warn" : "good"} />
            <Note>Annulus tutumu bütün influx üçün eyni götürülür. Real quyuda drill collar və drillpipe tutumları fərqlidir, ona görə qiymət yalnız qiymətləndirmədir.</Note>
          </>
        )}
      </Card>

      <Card title="Kill cədvəli (Wait & Weight)" formula="S_b = V_ds/Q_p;  P(s) = ICP − (ICP − FCP)·s/S_b">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2">
          <Num label="Drillstring həcmi" unit="bbl" value={dsVol} onChange={setDsVol} />
          <Num label="Nasos çıxışı" unit="bbl/stk" value={outPerStk} onChange={setOutPerStk} />
          <Num label="SPM" unit="stk/min" value={spm} onChange={setSpm} />
          <Num label="Stroke (sorğu)" unit="stk" value={stk} onChange={setStk} />
        </div>
        {ok(dsVol, outPerStk, spm, stk) && outPerStk > 0 && (
          <>
            <Out label="Strokes to bit" value={f(stb, 0)} unit="stk" />
            <Out label="Bit-ə qədər vaxt" value={f(circulationMinutes(stb, spm), 1)} unit="dəq" />
            <Out label="DP təzyiqi bu stroke-da" value={f(wwPressureAt(stk, icp, fcp, stb), 0)} unit="psi" tone="good" />
            <Note>Cədvəl yuxarıdakı kill parametrlərindən (ICP və FCP) istifadə edir. Hesablama xətti azalma qəbul edir, bu da drillstring tutumunun vahid olduğu halda düzgündür; kəmərin müxtəlif tutumlu hissələri varsa cədvəl bu hissələrə görə bölünür.</Note>
          </>
        )}
      </Card>

      <Card title="MAASP və shoe-da EMW" formula="MAASP = (FG − MW)·0.052·TVD_shoe">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2">
          <Num label="Shoe TVD" unit="ft" value={shoe} onChange={setShoe} />
          <Num label="Çat qradiyenti" unit="ppg" value={fg} onChange={setFg} />
          <Num label="MW" unit="ppg" value={mw} onChange={setMw} />
          <Num label="SICP" unit="psi" value={sicp} onChange={setSicp} />
        </div>
        {ok(shoe, fg, mw, sicp) && shoe > 0 && (
          <>
            <Out label="MAASP" value={f(maaspV, 0)} unit="psi" tone="good" />
            <Out label="Shoe-da EMW (SICP ilə)" value={f(shoeEmwShutIn(mw, shoe, sicp), 2)} unit="ppg" tone={shoeEmwShutIn(mw, shoe, sicp) < fg ? "good" : "bad"} />
            <Out label="SICP / MAASP" value={f((sicp / maaspV) * 100, 0)} unit="%" tone={sicp < maaspV ? "good" : "bad"} />
            <Note>{sicp < maaspV ? "SICP MAASP-dan aşağıdır." : "SICP MAASP-ı keçib: shoe-da formasiya çatması riski var. Bu halda mühəndis və operator qərarı lazımdır."}</Note>
          </>
        )}
      </Card>

      <Card title="Kick tolerance (intensivlik)" formula="KT = [0.052·FG·D_s + g·L_k + 0.052·MW·(TD − D_s − L_k)]/(0.052·TD) − MW">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2">
          <Num label="TD" unit="ft" value={tvd} onChange={setTvd} />
          <Num label="Shoe" unit="ft" value={shoe} onChange={setShoe} />
          <Num label="Qaz qradiyenti" unit="psi/ft" value={gGas} onChange={setGGas} />
          <Num label="Influx uzunluğu" unit="ft" value={Number.isFinite(lk) ? Math.round(lk * 10) / 10 : 0} onChange={() => {}} />
        </div>
        {ok(tvd, shoe, mw, fg, gGas, lk) && tvd > shoe && (
          <>
            <Out label="Kick tolerance (intensivlik)" value={f(kt, 2)} unit="ppg" tone={kt > 0 ? "good" : "bad"} />
            <Out label="Cari kick intensivliyi" value={f(formationEmw(mw, tvd, sidpp) - mw, 2)} unit="ppg" />
            <Note>Influx uzunluğu "Influx uzunluğu və tipi" kartından götürülür. Kick intensivliyi tolerantlıqdan azdırsa quyu təhlükəsiz bağlana bilər.</Note>
          </>
        )}
      </Card>

      <Card title="Qazın genişlənməsi (Boyle)" formula="V(d) = V₁·P₁/(0.052·MW·d + 14.7)">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2">
          <Num label="İlkin həcm" unit="bbl" value={v1} onChange={setV1} />
          <Num label="İlkin təzyiq" unit="psi" value={p1} onChange={setP1} />
          <Num label="MW" unit="ppg" value={mw} onChange={setMw} />
          <Num label="Dərinlik" unit="ft" value={depthG} onChange={setDepthG} />
        </div>
        {ok(v1, p1, mw, depthG) && depthG >= 0 && (
          <>
            <Out label="Bu dərinlikdə təzyiq" value={f(hydroPsi(mw, depthG) + 14.7, 1)} unit="psi" />
            <Out label="Qazın həcmi" value={f(gasVolumeAtDepth(v1, p1, mw, depthG), 1)} unit="bbl" tone="warn" />
            <Out label="Genişlənmə əmsalı" value={f(gasVolumeAtDepth(v1, p1, mw, depthG) / v1, 1)} unit="x" />
            <Note>İdeal qaz, sabit temperatur və açıq quyu qəbul edilir. Real qazın sıxılma əmsalı (Z) və temperatur fərqi nəticəni dəyişir; real əməliyyatda qaz choke ilə nəzarətdə sirkulyasiya olunur.</Note>
          </>
        )}
      </Card>

      <Card title="Bağlı quyuda qaz miqrasiyası" formula="ΔP = 0.052·MW·(sürət·vaxt)">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2">
          <Num label="Miqrasiya sürəti" unit="ft/saat" value={rate} onChange={setRate} />
          <Num label="Vaxt" unit="saat" value={hours} onChange={setHours} />
          <Num label="MW" unit="ppg" value={mw} onChange={setMw} />
          <Num label="Başlanğıc SICP" unit="psi" value={sicp} onChange={setSicp} />
        </div>
        {ok(rate, hours, mw, sicp) && (
          <>
            <Out label="Miqrasiya məsafəsi" value={f(migDepth, 0)} unit="ft" />
            <Out label="Təzyiq artımı" value={f(migrationPressureRise(mw, migDepth), 0)} unit="psi" />
            <Out label="Yeni SICP" value={f(sicp + migrationPressureRise(mw, migDepth), 0)} unit="psi" tone={sicp + migrationPressureRise(mw, migDepth) < maaspV ? "good" : "bad"} />
            <Note>Quyu bağlı qalıb qaz miqrasiya etdikcə SICP və SIDPP artır. MAASP həddinə çatmamış təzyiq nəzarət altında azaldılır (volumetrik metod).</Note>
          </>
        )}
      </Card>

      <Card title="Barit ilə çəki artırma" formula="N = 1490·(W₂ − W₁)/(35.8 − W₂)  [kisə / 100 bbl]">
        <div className="grid grid-cols-3 gap-x-2">
          <Num label="Başlanğıc çəki" unit="ppg" value={w1} onChange={setW1} />
          <Num label="Hədəf çəki" unit="ppg" value={w2} onChange={setW2} />
          <Num label="Sistem həcmi" unit="bbl" value={sysVol} onChange={setSysVol} />
        </div>
        {ok(w1, w2, sysVol) && w2 > w1 && w2 < 35.8 && (
          <>
            <Out label="Barit / 100 bbl" value={f(sx100, 1)} unit="sk" />
            <Out label="Ümumi barit" value={f((sx100 * sysVol) / 100, 0)} unit="sk" tone="good" />
            <Out label="Ümumi barit çəkisi" value={f(((sx100 * sysVol) / 100) * 100, 0)} unit="lb" />
            <Note>Hədəf çəki artdıqca barit miqdarı sürətlə böyüyür və 18-20 ppg-dən yuxarıda reologiya problemləri yaranır. Həcm artımı da nəzərə alınmalıdır.</Note>
          </>
        )}
      </Card>
    </div>
  );
}
