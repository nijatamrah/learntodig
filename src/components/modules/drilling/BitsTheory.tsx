"use client";

import type { LearnerMode } from "@/lib/modules/types";
import { Block, Disclaimer, Field, Formula, Warn, Why } from "./TheoryParts";

export default function BitsTheory({ mode }: { mode: LearnerMode }) {
  const student = mode === "student";
  return (
    <div className="space-y-4 max-w-3xl">
      <Disclaimer />

      <Block n={1} title="Bit-in rolu">
        <p>
          Bit quyunun dibində süxuru dağıdan alətdir. Onun performansı (ROP, ömür, quyu keyfiyyəti) qazma xərcinə birbaşa təsir edir. Bit-ə enerji iki yolla ötürülür: <b>mexaniki</b> (WOB və fırlanma) və
          <b> hidravlik</b> (nozzle-lərdən çıxan axın, 4-cü bölmə).
        </p>
      </Block>

      <Block n={2} title="Bit tipləri və kəsmə mexanizmi">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Roller cone:</b> fırlanan konuslar. Milled tooth (dişli) yumşaq, TCI (tungsten karbid insert) orta-bərk formasiyalar üçündür. Süxur əzmə və qırma ilə dağılır.</li>
          <li><b>PDC (fixed cutter):</b> blade-lərdə polikristal almaz kəsicilər. Süxur kəsmə (shearing) ilə dağılır; hərəkət edən hissə yoxdur.</li>
          <li><b>Impregnated / almaz:</b> matrisaya qatılmış almaz hissəcikləri. Süxur aşınma ilə dağılır; çox bərk, abraziv formasiyalar üçün.</li>
        </ul>
        <p>Yuxarıdakı <b>Vizual</b> tab-ında hər bit-in üzünü və kəsmə mexanizminin animasiyasını görə bilərsən.</p>
        {student && <Why>Kəsmə (shearing) əzmədən (crushing) daha az enerji tələb edir, ona görə PDC yumşaq-orta formasiyalarda daha yüksək ROP verir. Lakin PDC zərbəyə həssasdır, roller cone isə dəyişkən formasiyalarda daha davamlıdır.</Why>}
      </Block>

      <Block n={3} title="IADC təsnifatı">
        <Formula>{`Roller cone: 3 rəqəm   (məsələn 537)
  1-ci rəqəm:  seriya     1-3 milled tooth (yumşaq, orta, bərk);  4-8 insert (TCI)
  2-ci rəqəm:  tip        1-4: seriyanın içində yumşaqdan bərkə
  3-cü rəqəm:  yastıq/gauge  1 mühürsüz rolik ... 6-7 mühürlü sürtünmə, gauge qorunması ilə ...

Fixed cutter: 4 simvol (gövdə/kəsici tipi, profil, hidravlik dizayn, kəsici ölçüsü və sıxlığı)`}</Formula>
        <Field>Kod bit-in nəzərdə tutulduğu formasiya və konstruksiyanı göstərir. Eyni kodlu bit-lər fərqli istehsalçılarda performansca fərqlənə bilər, ona görə offset bit qeydləri vacibdir.</Field>
      </Block>

      <Block n={4} title="Bit seçimi">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Formasiya:</b> sərtlik (CCS/UCS), abrazivlik, dəyişkənlik (arakəsmə layları), yapışqanlıq (balling).</li>
          <li><b>Məqsəd:</b> yüksək ROP, uzun run, trayektoriya nəzarəti (steerability).</li>
          <li><b>BHA və hidravlika:</b> motor/RSS, rpm imkanı, nozzle/hidravlik dizayn, nasos limiti.</li>
          <li><b>Xərc:</b> cost per foot (aşağıda).</li>
          <li><b>Offset məlumatı:</b> əvvəlki quyuların bit qeydləri, dull grading, ROP trendləri.</li>
        </ul>
      </Block>

      <Block n={5} title="ROP-a təsir edən amillər">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Formasiya:</b> süxurun sərtliyi (CCS), məsaməlilik, abrazivlik.</li>
          <li><b>Mexaniki parametrlər:</b> WOB və RPM. ROP əvvəl artır, sonra <b>founder</b> həddindən yuxarıda artmır və ya düşür.</li>
          <li><b>Hidravlika:</b> bit təmizliyi (HSI, jet impact), balling riski.</li>
          <li><b>Məhlul:</b> çəki (overbalance ROP-u azaldır), bərk hissəcik, filtrat.</li>
          <li><b>Bit vəziyyəti:</b> köhnəldikcə ROP azalır.</li>
          <li><b>Overbalance:</b> yüksək (MW − Pp) formasiyanın bit-in altında "güclənməsinə" və ROP azalmasına səbəb ola bilər (chip hold-down).</li>
        </ul>
      </Block>

      <Block n={6} title="Mechanical Specific Energy (MSE)">
        <Formula>{`MSE = WOB/A + 120π·N·T / (A·ROP)          [psi]
(WOB lbf, A in², N rpm, T ft·lbf, ROP ft/hr)

Pessier–Fear:   T = μ·W·D/36
                MSE = W/A + 13.33·μ·N·W / (D·ROP)
Səmərəlilik:    η = CCS / MSE`}</Formula>
        <p>
          MSE bir vahid həcm süxuru qırmaq üçün sərf olunan enerjidir. Süxurun CCS-nə yaxın olmalıdır: yaxşı rejimdə səmərəlilik təxminən 30-40% olur. MSE-nin qəfil artımı səmərəliliyin azaldığını göstərir:
          bit balling, köhnəlmə, stick-slip/whirl və ya founder.
        </p>
        {student && <Why>MSE-ni real vaxtda izləmək ROP-un özündən güclüdür: süxur sərtləşəndə ROP də azalır, lakin bu normaldır. MSE isə enerjinin nə qədər səmərəli işlədiyini göstərir və dysfunction-u erkən aşkarlayır.</Why>}
        <Warn>MSE-ni mütləq qiymət kimi oxumaq. Süxurun CCS-i dəyişdikdə normal MSE də dəyişir, ona görə trendə və CCS ilə müqayisəyə baxılır.</Warn>
      </Block>

      <Block n={7} title="Optimal parametrlər: WOB və RPM">
        <p>
          ROP WOB və RPM ilə artır, lakin hər ikisinin həddi var: <b>founder</b> (səmərəlilik azalır), <b>torque limiti</b> (T = μ·W·D/36), <b>vibrasiya</b> (whirl, stick-slip) və <b>hidravlik</b> məhdudiyyət.
          Vizual tab-ındakı WOB × RPM xəritəsi bu məhdudiyyətlər daxilində ən yaxşı nöqtəni göstərir.
        </p>
        <Field>Sahədə optimal WOB drill-off test ilə tapılır: tormoz bağlanır, WOB tədricən azalır və ROP ölçülür. ROP-un artmağı dayandığı nöqtə founder həddinə işarə edir. Vibrasiya və torque trendləri paralel izlənir.</Field>
      </Block>

      <Block n={8} title="Cost per foot və bit run iqtisadiyyatı">
        <Formula>{`CPF = ( C_b + C_r·(t_b + t_c + t_t) ) / F

Optimum çıxarma:   C_r / ROP(t) = CPF(t)        (dCPF/dt = 0)`}</Formula>
        <p>
          Bahalı bit daha çox məsafə qazırsa və trip sayını azaldırsa, ümumi xərc aşağı ola bilər. Bit köhnəldikcə ROP azalır. Ani xərc (rig dərəcəsi / ROP) orta CPF-ə çatanda bit-i çıxarmaq iqtisadi baxımdan optimaldır.
          Vizual tab-ında iki bit-i müqayisə edib optimum çıxarma vaxtını görə bilərsən.
        </p>
        <Warn>Yalnız ROP-a baxıb bit seçmək. Ömür, trip sayı, quyu keyfiyyəti, steerability və risk də xərcə daxildir.</Warn>
      </Block>

      <Block n={9} title="Bit dysfunction və köhnəlmə">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Bit balling:</b> yapışqan gil bit-ə yapışır, kəsmə effekti itir. Hidravlika və məhlul inhibisiyası ilə azaldılır.</li>
          <li><b>Whirl və stick-slip:</b> yanal və burulma rəqsləri, xüsusilə PDC-də. Kəsicini zədələyir.</li>
          <li><b>Zərbə zədəsi:</b> sərt arakəsmələrdə PDC kəsicisinin çatlaması.</li>
          <li><b>Abraziv köhnəlmə:</b> gauge və kəsici kənarlarının aşınması.</li>
        </ul>
        <p>Bit çıxarıldıqdan sonra <b>IADC dull grading</b> ilə vəziyyəti qeyd olunur (Vizual tab-ında Köhnəlmə). Kod: I-O-D-L-B-G-O-R.</p>
      </Block>

      <Block n={10} title="Real iş axını">
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Offset quyu bit qeydlərini və formasiya sərtliyi profilini analiz et.</li>
          <li>Bölmə üçün bit tipini və IADC kodunu seç, hidravlikanı (4-cü bölmə) və BHA-nı (5-ci bölmə) uyğunlaşdır.</li>
          <li>Qazma parametr pəncərəsini (WOB, RPM, torque limiti) təyin et, drill-off test ilə kalibrlə.</li>
          <li>Qazma zamanı ROP, MSE, torque və vibrasiya trendlərini izlə.</li>
          <li>Bit-i iqtisadi və texniki meyarlara görə çıxar; dull grading qeyd et.</li>
          <li>Nəticələri növbəti quyu üçün öyrənilmiş dərs kimi sənədləşdir.</li>
        </ol>
      </Block>
    </div>
  );
}
