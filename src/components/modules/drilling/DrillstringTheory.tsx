"use client";

import type { LearnerMode } from "@/lib/modules/types";
import { Block, Disclaimer, Field, Formula, Warn, Why } from "./TheoryParts";

export default function DrillstringTheory({ mode }: { mode: LearnerMode }) {
  const student = mode === "student";
  return (
    <div className="space-y-4 max-w-3xl">
      <Disclaimer />

      <Block n={1} title="Drill string-in funksiyaları">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Fırlanma momentini səthdən bit-ə ötürmək (top drive/rotary).</li>
          <li>Bit-ə çəki (WOB) vermək.</li>
          <li>Məhlulu string-in içi ilə bit-ə çatdırmaq (4-cü bölmə).</li>
          <li>BHA vasitəsilə trayektoriyanı idarə etmək və MWD/LWD ilə məlumat toplamaq.</li>
          <li>Quyuya endirilib çıxarılma (trip) üçün mexaniki bütövlük təmin etmək.</li>
        </ul>
      </Block>

      <Block n={2} title="Komponentlər (yuxarıdan aşağı)">
        <p>
          <b>Drill pipe</b> (DP) uzunluğun çox hissəsini təşkil edir. <b>HWDP</b> keçid zonasıdır. <b>Drill collar-lar</b> (DC) ağır, sərt boru olaraq WOB-u yaradır.
          Aralıqda <b>stabilizatorlar</b>, directional qazmada <b>MWD</b> və qeyri-maqnit collar, bit-in yanında <b>near-bit stabilizator</b> yerləşir. Yapışma halı üçün <b>jar</b> BHA-ya daxil edilir.
        </p>
        <p>Yuxarıdakı <b>Vizual</b> tab-ında hər komponentə klik edərək funksiyasını və əsas rəqəmlərini görə bilərsən.</p>
        <Formula>{`w [lb/ft] = 2.6725 · (OD² − ID²)        (polad 490 lb/ft³)
6.5 in × 2.813 in DC  →  ≈ 91.8 lb/ft
8 in  × 2.8125 in DC  →  ≈ 150 lb/ft`}</Formula>
      </Block>

      <Block n={3} title="Drill pipe dərəcələri və tool joint-lər">
        <p>
          API drill pipe dərəcələri: <b>E-75, X-95, G-105, S-135</b>. Rəqəm minimum axma həddini (ksi) göstərir. Daha yüksək dərəcə daha çox dartma tutumu verir, lakin həssaslıq (məsələn, H₂S mühitində çatlama) və xərc nəzərə alınmalıdır.
        </p>
        <p>
          Boruların uclarında daha qalın <b>tool joint</b>-lər (rezbalı birləşmələr) var. Dizayn çəkisi üçün tool joint daxil olan <b>adjusted</b> çəki götürülür; nominal çəki bundan fərqlənir.
          Boruların vəziyyəti inspeksiya sinfi ilə qiymətləndirilir: yeni, premium (təxminən 80% qalan divar) və daha köhnəlmiş siniflər. Sinif aşağı düşdükcə tutum azalır.
        </p>
      </Block>

      <Block n={4} title="Buoyancy və hook load">
        <Formula>{`BF = 1 − MW / 65.5                    (polad ≈ 65.5 ppg)
HL_off  = BF · (W_DC + W_HWDP + W_DP)   (yerdən ayrılmış)
HL_drill = HL_off − WOB                  (qazma zamanı)`}</Formula>
        <p>Weight indicator qazma zamanı hook load-un azalmasını göstərir: azalma WOB-a bərabərdir.</p>
        {student && <Why>Məhlul string-ə yuxarı doğru qaldırıcı qüvvə göstərir, ona görə daha ağır məhlulda eyni polad daha yüngül "çəkir". Bu, MW artdıqca hook load-un azalmasının səbəbidir.</Why>}
        <Warn>Weight indicator göstəricisini string-in havadakı çəkisi ilə müqayisə etmək. Göstərici buoyed çəki və sürtünməni əks etdirir.</Warn>
      </Block>

      <Block n={5} title="WOB və neutral point">
        <Formula>{`F(z) = −WOB + BF · W(z)          (z bit-dən məsafə; − sıxılma, + dartma)
Neutral point:  F = 0
DC daxilində:   NP = WOB / (BF · w_DC)
Lazım olan DC:  L_DC = WOB · DF / (BF · w_DC)      DF tipik 1.15`}</Formula>
        <p>
          WOB string-in aşağı hissəsini sıxılmaya salır. Neutral point (dartma ilə sıxılma arasındakı keçid nöqtəsi) DC daxilində olmalıdır ki, DP və HWDP həmişə dartmada işləsin.
          Dizayn əmsalı (təlimdə tipik 1.15) neutral point-in DC-nin aşağı hissəsində qalması üçün ehtiyat verir.
        </p>
        {student && <Why>DC sərt və qalın divarlıdır, sıxılmada əyilməyə davamlıdır. DP nazik və uzundur: sıxılmada buckling (əyilmə) və yorğunluq riski yaranır.</Why>}
        <Warn>Neutral point-in DP-də olması. Bu halda DP sıxılmadadır: əlavə DC/HWDP əlavə et və ya WOB-u azalt.</Warn>
        <Field>Buoyancy factor üsulu klassik təlim yanaşmasıdır. Stabilite (buckling) təhlilində real sistemlərdə təzyiq-sahə (pressure-area) prinsipi ilə effektiv qüvvə də nəzərə alınır.</Field>
      </Block>

      <Block n={6} title="Dartma dizaynı və margin of overpull">
        <Formula>{`T_y = σ_y · A,     A = (π/4)·(OD² − ID²)
T_a = 0.9 · T_y                           (API RP 7G dizayn əmsalı)
MOP = T_a − HL_off
L_DP,max = (T_a − MOP − BF·(W_DC + W_HWDP)) / (BF · w_DP)`}</Formula>
        <p>
          5 in 19.5 lb/ft E-75 üçün (ID 4.276 in) T_y ≈ 395,600 lbf-dir. <b>Margin of overpull</b> normal çəkidən artıq, yapışmış string-i çəkmək üçün mövcud ehtiyatdır.
          Dərinlik artdıqca string çəkisi artır və MOP azalır. Bu, daha yüksək dərəcə və ya daha yüngül string seçməyi şərtləndirir.
        </p>
        <Warn>Yeni boru tutumunu istifadə olunmuş boruya tətbiq etmək. Köhnəlmiş boruda divar nazikdir və T_y azalır.</Warn>
      </Block>

      <Block n={7} title="Stabilizatorlar və BHA tipləri">
        <p>
          Maili quyuda BHA-nın trayektoriyaya təsiri stabilizatorların yeri ilə müəyyən edilir (Vizual tab-ında BHA tipləri):
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Fulcrum:</b> near-bit stabilizator + sərbəst collar + yuxarıda stabilizator. Bucağı artırır (build).</li>
          <li><b>Pendulum:</b> near-bit stabilizator yoxdur. Sarkaç effekti bucağı azaldır (drop).</li>
          <li><b>Packed hole:</b> bir neçə stabilizator bit-ə yaxın. Bucağı saxlayır (hold).</li>
        </ul>
        <p>Directional qazmada hər tipin yerinə idarə olunan sistemlər (motor, rotary steerable) də istifadə olunur; bunlar 9-cu bölmədə.</p>
      </Block>

      <Block n={8} title="Vibrasiya və yorğunluq">
        <p>
          String işləyərkən zərərli vibrasiyalar yaranır: <b>stick-slip</b> (burulma), <b>whirl</b> (yanal) və <b>bit bounce</b> (eksenel). Onlar BHA komponentlərinin və MWD-nin ömrünü qısaldır, ROP-u azaldır.
          Fırlanan və əyilmiş boruda hər dövrdə dəyişən (siklik) gərginlik yorğunluq çatlarına gətirib çıxarır, xüsusilə dogleg-də.
        </p>
        <Field>Vibrasiya ölçüləri (MWD/səth sensorları) izlənir. WOB və rpm dəyişdirilərək rejim tənzimlənir.</Field>
      </Block>

      <Block n={9} title="Real iş axını: BHA dizaynı">
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Bit və formasiya üçün lazım olan WOB-u və trayektoriya tələblərini (build/hold/drop) müəyyən et.</li>
          <li>BHA tipini seç, stabilizator yerlərini təyin et.</li>
          <li>DC uzunluğunu hesabla, neutral point-in DC daxilində qaldığını yoxla.</li>
          <li>Dartma yoxlaması: T_a, off-bottom hook load, MOP; lazım gələrsə yüksək dərəcə seç.</li>
          <li>Hidravlika (4-cü bölmə) və T&D (6-cı bölmə) yoxlaması; MWD/motor təzyiq itkiləri.</li>
          <li>Jar yerini və BHA-nın quyu həndəsəsinə (drift, dogleg) uyğunluğunu yoxla.</li>
        </ol>
        <Field>Real quyuda bu hesablamalar WellPlan, Drilling Office kimi proqramlarla aparılır. Burada öyrəndiyin məntiq həmin proqramların daxilində işləyən prinsiplərdir.</Field>
      </Block>
    </div>
  );
}
