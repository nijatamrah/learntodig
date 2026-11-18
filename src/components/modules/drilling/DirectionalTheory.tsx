"use client";

import type { LearnerMode } from "@/lib/modules/types";
import { Block, Disclaimer, Field, Formula, Warn, Why } from "./TheoryParts";

export default function DirectionalTheory({ mode }: { mode: LearnerMode }) {
  const student = mode === "student";
  return (
    <div className="space-y-4 max-w-3xl">
      <Disclaimer />

      <Block n={1} title="Directional drilling nə üçündür?">
        <p>
          Directional drilling quyunu planlaşdırılmış trayektoriya ilə şaquli istiqamətdən kənara yönəltməkdir. Məqsəd yalnız hədəfə çatmaq deyil: hədəfə ən qısa, təhlükəsiz və iqtisadi yolu tapmaqdır.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Çoxsaylı quyu bir platformadan:</b> dəniz platformalarında və məhdud sahədə (slot) onlarla quyu.</li>
          <li><b>Əlçatmaz hədəflər:</b> yaşayış məntəqəsi, dəniz və ya mühafizə zonası altındakı kollektor.</li>
          <li><b>Layla kontakt:</b> horizontal quyu məhsuldar layla kontaktı artırır və hasilatı yüksəldir.</li>
          <li><b>Qüsurlu zonadan yan keçmək:</b> duz gövdəsi, qırılma, problemli layların yan keçilməsi.</li>
          <li><b>Relief well:</b> nəzarətdən çıxmış quyunun yanından qazıb onu bağlamaq.</li>
        </ul>
      </Block>

      <Block n={2} title="Quyu profilləri">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>J-tipli (build-and-hold):</b> KOP-dan sonra build, sonra sabit bucaqla tangent. Ən sadə və ən çox istifadə olunan profil.</li>
          <li><b>S-tipli (build-hold-drop):</b> hədəf yaxınlaşanda inklinasiya yenidən azaldılır və quyu hədəfə yaxın şaquliləşir.</li>
          <li><b>Horizontal / yüksək bucaqlı:</b> build bölməsi 80-90°-yə çatır və layın içində horizontal davam edir.</li>
          <li><b>ERD (extended reach):</b> horizontal məsafənin TVD-yə nisbəti çox böyükdür (məs. 2:1 və yuxarı), torque, drag və hidravlika sərhədə yaxın işləyir.</li>
          <li><b>Multilateral:</b> bir əsas quyudan bir neçə yan qol.</li>
        </ul>
        <p>Vizual tab-ında "Plan" görünüşündə J-tipli planı KOP, build rate və hədəfi dəyişərək qura bilərsən.</p>
      </Block>

      <Block n={3} title="Əsas terminlər">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>MD (measured depth):</b> quyu boyunca ölçülən uzunluq. Drillstring və casing uzunluğu MD-dir.</li>
          <li><b>TVD (true vertical depth):</b> şaquli dərinlik. Hidrostatik və formasiya təzyiqləri TVD ilə hesablanır.</li>
          <li><b>İnklinasiya (I):</b> quyu oxu ilə şaquli arasındakı bucaq (0° = şaquli, 90° = horizontal).</li>
          <li><b>Azimut (A):</b> horizontal müstəvidə istiqamət, şimaldan saat əqrəbi ilə, 0-360°.</li>
          <li><b>N / E koordinatları:</b> səth nöqtəsindən şimala və şərqə sürüşmə.</li>
          <li><b>Vertical section (VS):</b> hədəf azimutu boyunca horizontal sürüşmə.</li>
          <li><b>Toolface:</b> alətin əyilmə istiqaməti (high side 0°, sağ 90°, low side 180°, sol 270°).</li>
        </ul>
        {student && <Why>Hidrostatik təzyiq yalnız şaquli hündürlükdən asılıdır, ona görə p = 0.052·MW·TVD. Amma boru çəkisi, sürtünmə və hidravlik itki quyu boyunca yığılır, ona görə onlar MD ilə hesablanır. Əvvəlki bölmələrdəki düsturlarda hansı dərinlik istifadə olunduğunu həmişə yoxla.</Why>}
      </Block>

      <Block n={4} title="Survey: istiqamətin ölçülməsi">
        <p>
          Quyunun harada olduğunu bilmək üçün hər 30-100 ft-də (və ya stand-lərdə) MD, inklinasiya və azimut ölçülür.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>MWD:</b> qazma zamanı akselerometr (inklinasiya) və maqnitometr (azimut) ölçür. Məlumat məhlul impulsları ilə səthə ötürülür.</li>
          <li><b>Gyro:</b> maqnit müdaxiləsi olan yerdə (casing yaxınlığı, yüksək enliklər) azimutu dəqiq verir.</li>
          <li><b>Düzəlişlər:</b> maqnit meyllik (declination), grid convergence, BHA maqnit müdaxiləsi.</li>
        </ul>
        <Formula>{`Az_true = Az_mag + declination    (şərq meyllik müsbət)`}</Formula>
        <Warn>Hər survey qeyri-müəyyənlik daşıyır. Quyunun "dəqiq" yeri yoxdur, yalnız ehtimal elipsi var. Bu, anti-collision üçün kritikdir (10-cu blok).</Warn>
      </Block>

      <Block n={5} title="Minimum curvature metodu">
        <p>
          Stansiyalar arasındakı koordinatları hesablamaq üçün ən dəqiq və ən geniş yayılmış üsul. İki stansiyanı hamar dairəvi qövslə birləşdirir.
        </p>
        <Formula>{`cos β = cos(I₂−I₁) − sin I₁ sin I₂ (1 − cos(A₂−A₁))     (dogleg bucağı)
RF  = (2/β)·tan(β/2)                                    (ratio factor, β radyanla)

ΔTVD = (ΔMD/2)·(cos I₁ + cos I₂)·RF
ΔN   = (ΔMD/2)·(sin I₁ cos A₁ + sin I₂ cos A₂)·RF
ΔE   = (ΔMD/2)·(sin I₁ sin A₁ + sin I₂ sin A₂)·RF`}</Formula>
        <p>Koordinatlar stansiyadan stansiyaya toplanır. Əvvəlki sadə metodlar (tangential) 100 ft-də bir neçə ft səhv verir və bu səhv yığılır. Vizual tab-ında "Survey" görünüşündə bu fərqi görə bilərsən.</p>
        {student && <Why>Əgər β kiçikdirsə (quyu demək olar düzdür), RF ≈ 1 olur və formula sadə orta bucaqlı hesaba çevrilir. Böyük dogleg-də RF 1-dən artıq olur və qövsün əyriliyini düzəldir.</Why>}
      </Block>

      <Block n={6} title="Dogleg severity (DLS) və limitlər">
        <Formula>{`DLS = β·100/ΔMD            [°/100 ft]
σ_b ≈ 218.2·OD·DLS         [psi]   (rotasiya zamanı dövri bükülmə gərginliyi)`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Pipe yorğunluğu:</b> fırlanan boru dogleg-də dövri gərginlik yaşayır. Yüksək dartılma ilə birləşəndə fatigue riski artır.</li>
          <li><b>Torque & drag:</b> əyilmə yükü kontakt qüvvəsini artırır, sürtünmə böyüyür (6-cı bölmə).</li>
          <li><b>Casing və BHA:</b> casing endirmək və sərt BHA-nı keçirmək üçün DLS limiti var.</li>
          <li><b>Key seat və aşınma:</b> dogleg-də drillpipe divarı və casing-i aşındırır.</li>
        </ul>
        <Warn>Planda DLS-in aşağı olması kifayət deyil. Real quyuda "dogleg-lər" survey stansiyaları arasında və steering düzəlişlərində yaranır. Tortuosity (kiçik, tez-tez dəyişmələr) ayrıca risk yaradır.</Warn>
      </Block>

      <Block n={7} title="Build-and-hold planının həndəsəsi">
        <p>Plan üç hissədən ibarətdir: şaquli, build qövsü (radius R), düz tangent.</p>
        <Formula>{`R  = 5729.58 / BUR                      [ft]
V  = TVD_t − KOP,  L = √((D − R)² + V²)
θ  = acos(−R/L) − atan2(V, D − R)       (tangent inklinasiyası)
L_build   = R·θ
L_tangent = √(L² − R²)
MD_t = KOP + L_build + L_tangent`}</Formula>
        <p>BUR artdıqca radius azalır, tangent bucağı kiçilir, lakin DLS yüksəlir. KOP aşağı salınsa tangent bucağı artır. Plan hədəfə çatsa belə, əyilmə sürəti alətin və casing-in limitindən çox olmamalıdır.</p>
        {student && <Why>Hədəf build dairəsinin içində qalırsa (L ≤ R) heç bir tangent hədəfə çatmır: ya BUR-u artırmalı, ya da KOP-u yuxarı qaldırmalısan. Vizual planner bunu xəbərdarlıq kimi göstərir.</Why>}
      </Block>

      <Block n={8} title="Steering: motor, RSS və toolface">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Bent housing motor:</b> əyilmiş korpus bit-i bir istiqamətə yönəldir. <i>Sliding</i> (boru fırlanmır) zamanı toolface-ə uyğun istiqamət verir. <i>Rotating</i> zamanı isə quyu düz davam edir.</li>
          <li><b>RSS:</b> boru fırlanarkən bit-i itələyən (push-the-bit) və ya əyən (point-the-bit) sistem. Sürtünməni və hole cleaning-i yaxşılaşdırır, daha hamar quyu verir.</li>
          <li><b>Toolface:</b> 0° = high side (build), 180° = low side (drop), 90° / 270° = sağ / sol turn.</li>
        </ul>
        <Formula>{`cos I₂ = cos I₁ cos β − sin I₁ sin β cos TF
tan ΔA = sin β sin TF / (sin I₁ cos β + cos I₁ sin β cos TF)`}</Formula>
        <p>Motor sliding yalnız hissə-hissə aparılır: orta DLS = motorun maksimum DLS-i × sliding payı. Vizual tab-ında "Toolface" görünüşündə toolface və sliding payını dəyişib nəticəni görə bilərsən.</p>
        <Warn>Çox sliding quyunu "yelləyir" və sürtünməni artırır. Sliding yalnız lazım olan yerdə aparılır, qalan hissədə rotasiya.</Warn>
      </Block>

      <Block n={9} title="Rotary BHA tendensiyaları">
        <p>Fırlanan BHA stabilizatorların yerləşməsinə və WOB-ə görə inklinasiyaya meylli olur:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Fulcrum (build):</b> near-bit stabilizatordan sonra uzun stabilizatorsuz hissə WOB altında əyilir, bit yuxarı yönəlir. WOB artdıqca build artır.</li>
          <li><b>Pendulum (drop):</b> stabilizator bit-dən yuxarıda yerləşir, çəkisi bit-i aşağı çəkir, inklinasiya azalır.</li>
          <li><b>Packed (hold):</b> bir neçə stabilizator BHA-nı sərtləşdirir, inklinasiya və istiqamət sabit qalır.</li>
        </ul>
        <Field>Praktikada tendensiya formasiyaya (anizotropiya, dip bucağı), bit tipinə və dövr sürətinə də bağlıdır. Operator BHA seçimini offset quyuların nəticələrinə görə dəqiqləşdirir.</Field>
      </Block>

      <Block n={10} title="Anti-collision">
        <p>
          Qonşu quyularla toqquşmanın qarşısını almaq ən vacib təhlükəsizlik tələbidir. Hər quyunun mövqeyi qeyri-müəyyənlik elipsi ilə təsvir olunur.
        </p>
        <Formula>{`SF = CC / (r₁ + r₂)
CC: mərkəz-mərkəz məsafə
r : istiqamət üzrə qeyri-müəyyənlik radiusu`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>SF &gt; 1.5 adətən rutin qazmaya icazə verir (operator standartına görə).</li>
          <li>1.0 &lt; SF &lt; 1.5: əlavə nəzarət, tez-tez survey, bəzən offset quyunun bağlanması.</li>
          <li>SF &lt; 1.0: qeyri-müəyyənlik elipsləri kəsişir, qazma dayandırılır və plan dəyişdirilir.</li>
        </ul>
      </Block>

      <Block n={11} title="Digər bölmələrlə əlaqə">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Torque & drag (6-cı bölmə):</b> inklinasiya və DLS sürtünməni təyin edir, horizontal quyuda sliding çətinləşir.</li>
          <li><b>Hidravlika (4-cü bölmə):</b> MD uzun olduğu üçün təzyiq itkisi artır. Yüksək bucaqlı hissədə hole cleaning kritikdir.</li>
          <li><b>Təzyiqlər (3-cü bölmə):</b> hidrostatik təzyiq TVD-yə görə, ECD isə MD üzrə itkilərə görə hesablanır.</li>
          <li><b>Casing (8-ci bölmə):</b> DLS casing endirməni məhdudlaşdırır, mərkəzləmə və sement keyfiyyəti əyilmə bucağından asılıdır.</li>
        </ul>
      </Block>

      <Block n={12} title="Real iş axını">
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Hədəf koordinatlarını, TVD-ni və tolerantlığı təyin et.</li>
          <li>Profil seç (J, S, horizontal), KOP və BUR-u offset quyulara görə qoy.</li>
          <li>Planı hesabla (build-and-hold), DLS və MD-ni yoxla.</li>
          <li>Anti-collision analizi apar (qonşu quyular, survey qeyri-müəyyənliyi).</li>
          <li>BHA seç (motor / RSS), torque-drag və hidravlikanı yoxla.</li>
          <li>Qazarkən survey-ləri minimum curvature ilə yenilə, plandan sapmanı izlə.</li>
          <li>Lazım gələrsə steering düzəlişi et (toolface, sliding payı).</li>
          <li>Casing endirməzdən əvvəl real DLS-i və drag proqnozunu yoxla.</li>
        </ol>
      </Block>
    </div>
  );
}
