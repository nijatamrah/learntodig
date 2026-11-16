"use client";

import type { LearnerMode } from "@/lib/modules/types";
import { Block, Disclaimer, Field, Formula, Warn, Why } from "./TheoryParts";

export default function TorqueDragTheory({ mode }: { mode: LearnerMode }) {
  const student = mode === "student";
  return (
    <div className="space-y-4 max-w-3xl">
      <Disclaimer />

      <Block n={1} title="T&D nədir və niyə vacibdir">
        <p>
          <b>Drag</b> string quyuda hərəkət edərkən (yuxarı/aşağı) yaranan aksial sürtünmə, <b>torque</b> isə fırlanmaya qarşı yaranan burulma müqavimətidir. Maili, üfüqi və uzaq çatan (extended-reach) quyularda
          T&amp;D qazma imkanını müəyyən edən əsas limitdir.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Hook load kranın və derrick-in tutumunu keçməməlidir.</li>
          <li>Torque top drive limitini, tool joint make-up torque-unu və boru torsiya tutumunu keçməməlidir.</li>
          <li>Slack-off zamanı string quyuya enə bilməlidir (sıxılma, buckling, lock-up riski).</li>
          <li>Qazmadan əvvəl hesablanır, qazma zamanı ölçülmüş dəyərlərlə müqayisə olunur.</li>
        </ul>
      </Block>

      <Block n={2} title="Mənşəyi: normal qüvvə və sürtünmə">
        <p>
          Boru quyu divarına normal qüvvə N ilə sıxılırsa, hərəkətə qarşı Coulomb sürtünməsi μN yaranır. N iki mənbədən gəlir: <b>çəkinin</b> divara perpendikulyar komponenti
          (w·sin α) və <b>dartmanın əyri hissədə yaratdığı</b> komponent (F·Δα).
        </p>
        <Formula>{`N = | F·Δα + w_b·ΔL·sin α |        (planar quyu; Δα yuxarı getdikcə bucaq dəyişməsi, rad)
3D:  N = √[ (F·Δφ·sin α)² + (F·Δα + w_b·ΔL·sin α)² ]`}</Formula>
        {student && <Why>Şaquli hissədə sin α = 0, N sıfırdır: sürtünmə yoxdur. Bucaq artdıqca çəki divara sıxır. Build zonasında isə dartma əyrinin daxilinə sıxır və çəkiyə qarşı çıxır: nəticə dartmadan və əyilmənin sürətindən asılıdır.</Why>}
      </Block>

      <Block n={3} title="Soft-string modeli (Johancsik)">
        <p>Quyu kiçik elementlərə bölünür. Hər element üçün (bit-dən yuxarı doğru) normal qüvvə, aksial qüvvə və torque hesablanır:</p>
        <Formula>{`Pick-up (yuxarı çəkmə):   ΔF = w_b·ΔL·cos α + μ·N
Slack-off (aşağı endirmə): ΔF = w_b·ΔL·cos α − μ·N
Rotating (off-bottom):     ΔF = w_b·ΔL·cos α          (aksial sürtünmə ≈ 0)
Torque:                    ΔT = μ·N·r               (r: tool joint radiusu)
Drilling:  başlanğıc F = −WOB, T = bit torque-u`}</Formula>
        <p>Model yaxınlaşmaları: string əyilmə sərtliyi olmayan kabel kimi qəbul edilir, quyu divarı ilə davamlı kontakt var, buckling hesablanmır.</p>
        <Warn>Modeli mütləq həqiqət saymaq. Nəticələr sürtünmə əmsalı, trayektoriya dəqiqliyi və kontakt fərziyyələrindən asılıdır, ona görə ölçmələrlə kalibrlənir.</Warn>
      </Block>

      <Block n={4} title="Rejimlər və hook load pəncərəsi">
        <p>
          Eyni quyuda bir neçə hook load qiyməti var: <b>pick-up</b> ən yüksək, <b>slack-off</b> ən aşağı, <b>rotating off-bottom</b> isə təxminən aralarındadır (sürtünməsiz çəkiyə yaxın). Vizual tab-ındakı üç əyri bu "pəncərəni" göstərir.
          Pick-up ilə slack-off arasındakı fərq sürtünmənin ümumi təsirini əks etdirir.
        </p>
        <Field>Hər qoşulma (connection) zamanı qazma qrupu yerdən ayrılmış halda pick-up, slack-off və rotating çəkilərini və torque-u qeyd edir. Bunlar model trendi ilə müqayisə olunur: tədricən artım hole cleaning və ya sürtünmə problemini göstərir.</Field>
      </Block>

      <Block n={5} title="Capstan effekti">
        <Formula>{`Çəkisiz boru, əyilmə θ:     F_çıx = F_giriş · e^(± μ·θ)       (+ pick-up, − slack-off)
Əyrilikdə normal qüvvə:       N ≈ F · θ`}</Formula>
        <p>
          Dartma yüksək olduqda (dərində, pick-up zamanı) və əyilmə böyük olduqda sürtünmə eksponensial artır. Buna görə build zonaları və dogleg-lər T&amp;D-də həlledici yerlərdir
          və ən çox pick-up hook load-da sıçrayış verir.
        </p>
      </Block>

      <Block n={6} title="Kritik bucaq: öz çəkisi ilə sürüşmə">
        <Formula>{`Slack-off, düz hissə:   ΔF/ΔL = w_b·(cos α − μ·sin α)
Mənfi olduqda string sürüşmür:   tan α > 1/μ   →   α_kr = atan(1/μ)
μ = 0.30 → 73°;   μ = 0.25 → 76°;   μ = 0.15 → 81°`}</Formula>
        <p>
          Kritik bucaqdan böyük (üfüqi yaxın) hissələrdə string öz çəkisi ilə enə bilməz: itələmə qüvvəsi tətbiq edilməlidir. Bu isə sıxılma və buckling riskini yaradır.
          Üfüqi quyularda rotasiya, OBM və lubricant, hole cleaning, yüngül string və xüsusi alətlər (agitator, roller) bu limiti uzaqlaşdırmaq üçün istifadə olunur.
        </p>
      </Block>

      <Block n={7} title="Sürtünmə əmsalı (friction factor)">
        <p>
          μ eksperimental qiymətdir: formasiya, casing/açıq quyu, məhlul tipi (OBM adətən WBM-dən aşağı), cuttings yatağı və dogleg səviyyəsindən asılıdır. Praktikada ölçülmüş hook load və torque ilə modelə geri uyğunlaşdırılır.
          Cased və açıq quyu üçün ayrı-ayrı kalibrlənir. Təlim modellərində tipik olaraq casing üçün 0.2-0.3, açıq quyu üçün 0.25-0.4 aralığı götürülür.
        </p>
        <Warn>μ-ni bütün quyu üçün bir dəfəlik sabit götürmək. Quyu dərinləşdikcə, məhlul dəyişdikdə və hole cleaning pisləşdikdə effektiv μ artır.</Warn>
      </Block>

      <Block n={8} title="Torsiya limitləri">
        <Formula>{`J = (π/32)·(OD⁴ − ID⁴)
Q = 0.096167 · J · σ_y / OD                    [ft·lbf]
Dartma altında:  Q_c = Q · √( 1 − (F/(σ_y·A))² )   (von Mises)`}</Formula>
        <p>
          Boru gövdəsinin torsiya tutumu ilə yanaşı, tool joint-in make-up torque-u və top drive-ın maksimum torque-u nəzərə alınır. Real limit ən zəif həlqədir və dartma artdıqca azalır.
        </p>
      </Block>

      <Block n={9} title="Buckling">
        <p>
          Sıxılma altında nazik boru əyilir. Maili düz hissədə <b>sinusoidal</b> buckling (Dawson-Paslay) kritik yükdən başlayır, daha yüksək yükdə <b>helical</b> buckling yaranır və normal qüvvə (deməli sürtünmə) kəskin artır, nəticədə yük ötürülməsi dayana bilər (lock-up).
        </p>
        <Formula>{`F_s = 2·√( E·I·w_b·sin α / r ),   r = (D_quyu − OD)/2
F_h ≈ 2√2 · F_s`}</Formula>
        <p>Hesablayıcıda 5 in DP üçün nümunəyə bax: bu limit slack-off və qazma zamanı sıxılan hissələrdə qiymətləndirilir.</p>
      </Block>

      <Block n={10} title="T&D-ni azaltmaq">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Sürtünməni azalt:</b> OBM və ya yağlayıcı, tool joint-lərin vəziyyəti, non-rotating protektorlar.</li>
          <li><b>Normal qüvvəni azalt:</b> hamar trayektoriya (aşağı dogleg), yüngül string, düzgün BHA.</li>
          <li><b>Hole cleaning:</b> cuttings yatağı μ-nü və T&amp;D-ni kəskin artırır (4-cü bölmə).</li>
          <li><b>Rotasiya:</b> aksial drag-ı sıfıra yaxın salır.</li>
          <li><b>Planlama:</b> trayektoriyanı T&amp;D baxımından optimallaşdırmaq (məsələn, hamar build, dayaz KOP).</li>
        </ul>
      </Block>

      <Block n={11} title="Real iş axını">
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Plan trayektoriya və string üçün T&amp;D modeli (WellPlan kimi proqramla) qur, qonşu quyulardan μ qiymətləri götür.</li>
          <li>Hook load, torque və slack-off tutumunu bütün əməliyyatlar üçün yoxla (qazma, trip, casing endirmə).</li>
          <li>Qazma zamanı hər qoşulmada pick-up/slack-off/rotating çəkilərini və torque-u qeyd et, modellə müqayisə et.</li>
          <li>Trend pisləşərsə hole cleaning, məhlul xassələri və təzyiq (SPP) göstəricilərini yoxla; zərurət olarsa şlam süpürməsi və ya bottoms-up.</li>
          <li>Model μ-sini yenilə (kalibrləmə) və qalan interval üçün proqnozu yenidən hesabla.</li>
        </ol>
      </Block>
    </div>
  );
}
