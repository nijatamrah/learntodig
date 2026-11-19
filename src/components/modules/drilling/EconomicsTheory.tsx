"use client";

import type { LearnerMode } from "@/lib/modules/types";
import { Block, Disclaimer, Field, Formula, Warn, Why } from "./TheoryParts";

export default function EconomicsTheory({ mode }: { mode: LearnerMode }) {
  const student = mode === "student";
  return (
    <div className="space-y-4 max-w-3xl">
      <Disclaimer />
      <Warn>Bu bölmə təhsil üçündür və sadələşdirilmiş modellərdən istifadə edir. Real AFE şirkətin xərc standartları, müqavilə şərtləri, vergi və tərəfdaş razılaşmaları ilə hazırlanır. Buradakı rəqəmlər nümunədir.</Warn>

      <Block n={1} title="Quyu xərcinin strukturu">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Vaxta bağlı xərc:</b> rig günlük dərəcəsi və hər gün işləyən xidmətlər (spread rate): mud engineer, MWD, cementing unit, logistika, nəzarət. Vaxt uzandıqca xərc birbaşa artır.</li>
          <li><b>Dərinliyə bağlı xərc:</b> bitlər, casing, məhlul kimyəviyyatı, sement. Uzun və geniş quyu daha çox material tələb edir.</li>
          <li><b>Sabit xərc:</b> mobilizasiya, sığorta, icazələr, wellhead və s. Quyunun müddətindən çox asılı deyil.</li>
        </ul>
        {student && <Why>Vaxta bağlı xərc böyük hissə təşkil etdiyindən qazma iqtisadiyyatının əsas qaydası belədir: vaxtı azaltmaq xərci azaldır. Lakin təhlükəsizliyi və quyu keyfiyyətini qurban verməklə vaxt qənaəti uzunmüddətli itki yarada bilər.</Why>}
      </Block>

      <Block n={2} title="Spread rate">
        <p>Spread rate rig kirayəsini və gündəlik xidmətləri birləşdirən günlük rəqəmdir. Dəniz qurğularında və dərin quyularda bu rəqəm yüksək olur. Vaxt xərci hesabda sadədir:</p>
        <Formula>{`C_t = (t_saat / 24)·R_spread`}</Formula>
        <p>Spread rate-ə daxil olmayan xərclər (məsələn, bit, casing, fishing alətləri) ayrıca sətirlərdə əlavə olunur.</p>
      </Block>

      <Block n={3} title="Time-depth planı">
        <p>Plan bölmələrə ayrılır. Hər bölmə üçün vaxt:</p>
        <Formula>{`t_qazma = feet / ROP
t_bağlantı = ⌈feet / stand⌉ · t_conn
t_bölmə = t_qazma + t_bağlantı + t_trip + t_casing + t_digər`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Əyri dərinlik üçün maili hissələr, əvvəlki bölmələrdə (6, 9) göstərilən sürtünmə və ROP təsirləri ROP seçimində nəzərə alınır.</li>
          <li>Düz hissələr (trip, casing, sement) planın görünən vaxt itkisidir. Planlaşdırılmış düz vaxtın azaldılması iqtisadi imkanıdır.</li>
        </ul>
        <p>Vizual tab-ında "Time-depth plan" görünüşündə bölmə parametrlərini dəyişib müddətin və xərcin necə dəyişdiyini görə bilərsən.</p>
      </Block>

      <Block n={4} title="AFE və contingency">
        <p>AFE (Authorization for Expenditure) layihənin xərc büdcəsinin təsdiq sənədidir. Sətirlər adətən belə qruplaşır: rig və xidmətlər, casing və wellhead, bitlər, məhlul, sement, logging, mühəndislik və nəzarət, logistika.</p>
        <Formula>{`AFE = ΣC_sətir·(1 + contingency%)`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Contingency</b> risk analizindən çıxmalıdır: gözlənilən riskləri örtür.</li>
          <li><b>Supplement AFE:</b> faktiki xərc təsdiq olunandan çox aşdıqda əlavə təsdiq tələb olunur.</li>
        </ul>
        <Warn>Contingency-ni "ehtiyat pulu" kimi sərf etmək təhlükəlidir. Hər istifadə risk hadisəsi ilə əlaqələndirilməlidir, əks halda büdcə nəzarəti itir.</Warn>
      </Block>

      <Block n={5} title="Xərc/ft və bit iqtisadiyyatı">
        <Formula>{`CPF_quyu = C_base / feet
CPF_bit  = (C_bit + R_h·(t_qazma + t_bağlantı + t_trip)) / feet`}</Formula>
        <p>Xərc/ft quyuları və bölmələri müqayisə etməyə imkan verir, lakin mürəkkəblik fərqini gizlədir. Bit seçimində ən ucuz bit deyil, ən aşağı xərc/ft verən bit seçilir (7-ci bölmə).</p>
        {student && <Why>Bahalı bit ROP-u və ömrünü artırarsa trip sayını azaldır və ümumi xərc/ft-i aşağı salır. Rig vaxtının dəyəri bitin qiymətindən çox böyük olduğundan, bu qərar ROP və dayanıqlıq üzərində qurulur.</Why>}
      </Block>

      <Block n={6} title="Learning curve və technical limit">
        <p>Eyni tipli quyular ardıcıl qazıldıqda komanda təcrübə qazanır. Model:</p>
        <Formula>{`D_n = D_1·n^(log₂ LR)       (LR = 0.9 → hər ikiləşmədə 10% azalma)`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Technical limit:</b> NPT və ILT olmadan mümkün olan ən qısa müddət. Learning curve bu limitə doğru enir və orada düzəlir.</li>
          <li><b>Pad drilling və batch əməliyyatlar</b> təkrarlanan işləri qruplaşdıraraq vaxtı azaldır.</li>
        </ul>
        <Field>Learning curve avtomatik baş vermir: hər quyudan sonra dərs çıxarmaq (after action review), müqavilə və prosedurları yeniləmək lazımdır.</Field>
      </Block>

      <Block n={7} title="Risk: P10, P50, P90">
        <p>Tək rəqəmli büdcə yanıltıcıdır. Hər əməliyyat üçün minimum, ehtimal olunan və maksimum qiymət verilir, nəticə Monte Carlo ilə birləşdirilir.</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>P50:</b> median, 50% hallarda xərc bundan az olacaq.</li>
          <li><b>P10 / P90:</b> optimist və mühafizəkar uc dəyərlər (xərc üçün P90 yüksək dəyərdir).</li>
          <li>Üçbucaq paylanmanın ortası (a + m + b)/3 ehtimal olunandan böyük ola bilər, çünki risklər sağa uzanır.</li>
        </ul>
        <Warn>Bu bölmədəki Monte Carlo sətirləri bir-birindən asılı olmayan fərz edir. Real layihədə əlaqəli risklər (məsələn, itki və stuck pipe) birlikdə baş verir, bu da qeyri-müəyyənliyi artırır.</Warn>
        <p>Vizual tab-ında "Risk və P10-P90" görünüşündə paylanmanı və AFE-nin harada olduğunu görə bilərsən.</p>
      </Block>

      <Block n={8} title="NPT-nin büdcəyə təsiri">
        <Formula>{`ΔC = t_NPT·R_spread
Contingency istehlakı = ΔC / C_base`}</Formula>
        <p>11-ci bölmədə gördüyün hadisələr (stuck pipe, itki, avadanlıq nasazlığı) iqtisadi nəticə kimi bu düsturla ölçülür. Bir neçə günlük hadisə contingency-ni tükədə bilər.</p>
      </Block>

      <Block n={9} title="Quyu iqtisadiyyatı və EMV">
        <p>Kəşfiyyat quyusunun qərarı uğur ehtimalı və uğurun dəyəri ilə verilir.</p>
        <Formula>{`EMV = P_g·PV − C_well
P_g* = C_well / PV      (break-even)`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>PV gələcək pul axınlarının cari dəyəridir (hasilat, qiymət, əməliyyat xərci, vergi, diskont dərəcəsi).</li>
          <li>EMV müsbətdirsə, uzunmüddətli portfeldə quyu dəyər yaradır, lakin tək quyu üçün nəticə dry hole ola bilər.</li>
        </ul>
        <Field>Qərar yalnız EMV ilə deyil, risk iştahı, kapital məhdudiyyəti və strateji məqsədlərlə də verilir.</Field>
      </Block>

      <Block n={10} title="Xərc nəzarəti">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Gündəlik hesabat: faktiki gün və xərc, plan ilə müqayisə.</li>
          <li>Sapma səbəbini kodlamaq: planlı, NPT, ILT, yeni iş.</li>
          <li>Böyük qərarlarda (fishing, sidetrack, casing dəyişimi) xərc və risk müqayisəsi: 11-ci bölmədəki gözlənilən dəyər məntiqi.</li>
          <li>Quyudan sonra: faktiki və AFE-nin tam müqayisəsi, dərslər.</li>
        </ul>
      </Block>

      <Block n={11} title="Digər bölmələrlə əlaqə">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Rig (1-ci bölmə):</b> rig dərəcəsi, trip sürəti, bağlantı vaxtı.</li>
          <li><b>Bitlər (7-ci bölmə):</b> ROP, bit run xərc/ft.</li>
          <li><b>Casing və sement (8-ci bölmə):</b> tangible xərc və casing vaxtı.</li>
          <li><b>Directional (9-cu bölmə):</b> trayektoriya mürəkkəbliyi və xidmət xərcləri.</li>
          <li><b>Well control və problemlər (10, 11):</b> NPT və risk büdcəsi.</li>
        </ul>
      </Block>
    </div>
  );
}
