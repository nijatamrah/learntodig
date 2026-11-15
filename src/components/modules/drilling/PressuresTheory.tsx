"use client";

import type { LearnerMode } from "@/lib/modules/types";
import { Block, Disclaimer, Formula, Warn, Why } from "./TheoryParts";

export default function PressuresTheory({ mode }: { mode: LearnerMode }) {
  const student = mode === "student";
  return (
    <div className="space-y-4 max-w-3xl">
      <Disclaimer />

      <Block n={1} title="Təzyiqlər qazmanın əsasıdır">
        <p>
          Qazma məhlulu quyunun içində formasiyanın təzyiqini tarazlaşdırmalıdır. Məhlul çox yüngül olarsa, formasiya mayesi quyuya girir (kick), çox ağır olarsa
          zəif formasiya çatlayır və məhlul itir (lost circulation). Bu iki hədd arasındakı zolaq <b>mud window</b> adlanır. Casing dizaynı, məhlul proqramı və well control
          bu zolağa əsaslanır.
        </p>
      </Block>

      <Block n={2} title="Hidrostatik təzyiq">
        <Formula>{`Ph [psi] = 0.052 × MW [ppg] × TVD [ft]
Qradiyent [psi/ft] = 0.052 × MW`}</Formula>
        <p>Şirin suyun qradiyenti ≈ 0.433 psi/ft (8.33 ppg), formasiya suyunun normal qradiyenti tipik olaraq 0.433-0.478 psi/ft (8.3-9.2 ppg) aralığındadır.</p>
        {student && <Why>0.052 ≈ 12/231: 1 ppg məhlulun 1 ft-lik sütunu 1 in² səthə 12 in³ ≈ 0.052 gal məhlulun çəkisi qədər təzyiq göstərir.</Why>}
        <Warn>Dərinlik kimi MD götürmək. Hidrostatik təzyiq yalnız <b>TVD</b> ilə hesablanır; maili quyuda MD, TVD-dən böyükdür.</Warn>
      </Block>

      <Block n={3} title="Dörd əsas təzyiq">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Hidrostatik (Ph):</b> quyudakı məhlul sütununun təzyiqi.</li>
          <li><b>Overburden (S):</b> üstdəki süxur və mayenin ağırlığı. Orta qradiyent ≈ 1 psi/ft, dayaz hissədə aşağı, dərinlikdə yüksək olur.</li>
          <li><b>Məsamə təzyiqi (Pp):</b> süxurun məsamələrindəki mayenin təzyiqi.</li>
          <li><b>Çat təzyiqi (Pf):</b> formasiyanın çatlayıb məhlul qəbul etməyə başladığı təzyiq.</li>
        </ul>
        <Formula>{`Effektiv gərginlik (Terzaghi):  σe = S − Pp`}</Formula>
        <p>Süxurun möhkəmliyi σe-dən asılıdır. Pp artanda σe azalır və süxur zəifləyir.</p>
      </Block>

      <Block n={4} title="Normal və anormal təzyiq">
        <p>
          <b>Normal:</b> Pp səthə qədər davamlı su sütununun hidrostatik təzyiqinə bərabərdir. <b>Anormal yüksək (overpressure):</b> Pp normaldan yüksəkdir.
          Əsas səbəb sürətli çökmə zamanı mayenin qaça bilməməsidir (<i>disequilibrium compaction</i>, Cənubi Xəzər hövzəsi kimi sürətli çökmə rejimlərində
          xüsusilə vacibdir). Digər mexanizmlər: gil diagenezi (smektit → illit), karbohidrogen generasiyası, tektonik sıxılma və lateral ötürülmə.
        </p>
        <p><b>Subnormal:</b> Pp normaldan aşağıdır (tükənmiş kollektorlar, bəzi quru zonalar). Bu halda əsas risk lost circulation və differensial yapışmadır.</p>
      </Block>

      <Block n={5} title="Məsamə təzyiqinin qiymətləndirilməsi">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Qazmadan əvvəl:</b> seysmik sürətlər, offset quyu datası, geoloji model.</li>
          <li><b>Qazma zamanı:</b> d-exponent, ROP dəyişmələri, qaz göstəriciləri (background/connection gas), şlam forması və ölçüsü, flowline temperaturu, çən həcmi.</li>
          <li><b>Qazmadan sonra:</b> sonik, rezistivlik, sıxlıq loqları; birbaşa ölçmə: RFT/MDT.</li>
        </ul>
        <Formula>{`Eaton (sonik):       Pp/D = OBG − (OBG − NPG) × (Δtn/Δto)^3
Eaton (rezistivlik): Pp/D = OBG − (OBG − NPG) × (Ro/Rn)^1.2`}</Formula>
        <p>Burada OBG overburden qradiyenti, NPG normal məsamə qradiyenti, Δtn normal trenddəki, Δto ölçülmüş transit vaxtıdır.</p>
        {student && <Why>Anormal təzyiqli şlam az sıxlaşıb, ona görə səs onda daha yavaş gedir: Δto normal trenddən böyük olur.</Why>}
        <Warn>Yalnız bir metoda güvənmək. Real quyuda bir neçə göstərici üst-üstə qoyulur və birbaşa ölçmə ilə kalibrlənir.</Warn>
      </Block>

      <Block n={6} title="Çat qradiyenti və leak-off test">
        <Formula>{`Hubbert–Willis (min.):  Pf = Pp + (S − Pp)/3
Eaton:                  Pf = Pp + ν/(1 − ν) × (S − Pp)
LOT:                    EMW = MW + P_leakoff / (0.052 × TVD_shoe)`}</Formula>
        <p>
          Nəzəri modellər qiymətləndirmədir. Shoe-nun real dözümlülüyü casing sementləndikdən sonra, shoe-dan 10-20 ft altı qazılıb aparılan
          <b> LOT</b> (leak-off) və ya <b>FIT</b> (formation integrity, məqsəd maksimum dəyərə çatmadan sınaqdır) ilə təsdiqlənir.
        </p>
        {student && <Why>Qazma müddətində MW-nin yuxarı həddi çat təzyiqi ilə, aşağı həddi Pp (və quyu divarı dayanıqlığı) ilə müəyyən edilir.</Why>}
      </Block>

      <Block n={7} title="Mud window və margin-lər">
        <Formula>{`Aşağı hədd:  MW_min = max(Pp, quyu divarının dağılma təzyiqi) + trip margin
Yuxarı hədd: MW_max = FG − frac margin`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Trip margin:</b> boru çəkiləndə swab və nasos dayananda ECD itkisi üçün ehtiyat.</li>
          <li><b>Frac margin:</b> çat qradiyentinin qeyri-müəyyənliyi və ECD artımı üçün ehtiyat.</li>
        </ul>
        <p>Margin dəyərləri şirkət prosedurundan asılıdır (təlim məsələlərində tipik olaraq 0.3-0.5 ppg işlədilir). Window daraldıqca hər ikisinə sığmaq çətinləşir.</p>
      </Block>

      <Block n={8} title="Casing seat seçimi (bottom-up)">
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>TD-də lazım olan MW tap: <i>Pp(TD) + trip margin</i>.</li>
          <li>Çat qradiyentindən margin çıxıb bu MW-yə bərabər olduğu ən dayaz dərinliyi tap: bu, ən dayaz mümkün shoe-dur.</li>
          <li>Həmin shoe yeni "TD" olur və proses surface casing dərinliyinə qədər təkrarlanır.</li>
          <li>Real dizaynda əlavə olaraq kick tolerance, differensial yapışma riski, quyu divarı dayanıqlığı və geoloji sərhədlər nəzərə alınır.</li>
        </ol>
        <p>
          Aşağıdakı <b>Mud window</b> tab-ında bu alqoritmi öz parametrlərinlə işlət: anormal təzyiqi artır və gör shoe-lar necə dərinləşir, string sayı necə artır.
        </p>
        <Warn>Anormal təzyiq zonasından <i>əvvəl</i> normal təzyiqli hissədə də yüksək MW ilə qazmaq: differensial yapışma riski artır.</Warn>
      </Block>

      <Block n={9} title="Real iş axını">
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Offset quyu və seysmik datadan Pp, FG, overburden profillərini qur.</li>
          <li>Qeyri-müəyyənliyi nəzərə al (P10/P50/P90 diapazonları).</li>
          <li>Mud window-u qur, margin-ləri tətbiq et, casing seat-ləri seç.</li>
          <li>Qazma zamanı real göstəricilərlə Pp modelini yenilə; hər casing-dən sonra LOT/FIT ilə FG-ni təsdiqlə.</li>
          <li>Anomaliya olarsa (Pp artımı, kick əlamətləri) qərarı prosedura uyğun ver və komandaya çatdır.</li>
        </ol>
      </Block>
    </div>
  );
}
