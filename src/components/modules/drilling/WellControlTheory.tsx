"use client";

import type { LearnerMode } from "@/lib/modules/types";
import { Block, Disclaimer, Field, Formula, Warn, Why } from "./TheoryParts";

export default function WellControlTheory({ mode }: { mode: LearnerMode }) {
  const student = mode === "student";
  return (
    <div className="space-y-4 max-w-3xl">
      <Disclaimer />
      <Warn>Bu bölmə təhsil üçündür və sadələşdirilmiş modellərdən istifadə edir. Real well control əməliyyatı yalnız IWCF/IADC WellCAP təlimli heyətlə, operatorun və qurğunun prosedurları ilə aparılır. Hesablamalar rig kill sheet-i və mühəndis qərarını əvəz etmir.</Warn>

      <Block n={1} title="Well control nədir və barier fəlsəfəsi">
        <p>
          Well control formasiya mayelərinin (qaz, neft, su) quyuya nəzarətsiz daxil olmasının qarşısını almaq, daxil olarsa təhlükəsiz idarə etmək üçün sistemdir. Əsas prinsip iki (və ya daha çox) müstəqil bariyerin olmasıdır.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Birinci bariyer:</b> məhlulun hidrostatik təzyiqi (overbalance).</li>
          <li><b>İkinci bariyer:</b> BOP, casing, sement, wellhead: birinci bariyer itirildikdə quyunu bağlayır.</li>
          <li><b>Kick:</b> formasiya mayesinin quyuya nəzarətli giriş həcmi. Nəzarət itirilərsə <b>blowout</b> baş verir.</li>
        </ul>
        {student && <Why>Əgər formasiya təzyiqi quyudakı hidrostatik təzyiqdən böyük olarsa (underbalance), maye quyuya axır. Buna görə mud window (3-cü bölmə) və məhlul çəkisi well control-un əsasıdır.</Why>}
      </Block>

      <Block n={2} title="Kick-in səbəbləri">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Kifayət qədər olmayan məhlul çəkisi:</b> gözlənilməz yüksək təzyiqli zona, səhv proqnoz.</li>
          <li><b>Swabbing:</b> boruları çox sürətli çəkəndə dibdə təzyiq azalır, formasiya maye verir.</li>
          <li><b>Trip zamanı səhv doldurma (fill-up):</b> quyu düzgün doldurulmur, hidrostatik azalır.</li>
          <li><b>İtkili sirkulyasiya:</b> məhlul səviyyəsi enir, hidrostatik azalır, başqa zona kick verir (12-ci bölmə: problemlər).</li>
          <li><b>Qaz qatışmış (gas cut) məhlul:</b> hidrostatik azalır, lakin tək başına kick demək deyil.</li>
          <li><b>Sement və ya casing işində səhvlər:</b> U-tube, geri axın (8-ci bölmə).</li>
        </ul>
      </Block>

      <Block n={3} title="Kick-in əlamətləri">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Müsbət əlamətlər:</b> pit həcminin artması, flow-out-un flow-in-dən çox olması, nasos dayananda quyunun axması (flow check müsbət), tripdə quyunun lazım olan həcmdən az doldurulması.</li>
          <li><b>Xəbərdarlıq əlamətləri:</b> drilling break (ROP-un qəflətən artması), nasos təzyiqinin azalması və strokes-ın artması, məhlulun qazlanması, torque və drag dəyişməsi.</li>
        </ul>
        <p>Qarşısı alınmayan gecikmə influx həcmini artırır, bu da SICP və shoe təzyiqini artırır. Vizual tab-ında "Kick və shut-in" görünüşündə reaksiya vaxtının təsirini görə bilərsən.</p>
      </Block>

      <Block n={4} title="Quyunu bağlamaq və təzyiqləri oxumaq">
        <p>
          Kick aşkarlandıqda qazma dayandırılır, quyu rig prosedurunda göstərilən qaydada bağlanır (hard və ya soft shut-in), sonra stabilləşmiş <b>SIDPP</b> (shut-in drillpipe pressure) və <b>SICP</b> (shut-in casing pressure) oxunur və pit gain qeyd olunur.
        </p>
        <Formula>{`Pf   = 0.052·MW·TVD + SIDPP
KMW  = MW + SIDPP/(0.052·TVD)`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>SIDPP</b> formasiya təzyiqini göstərir, çünki drillpipe içində təmiz məhlul var.</li>
          <li><b>SICP</b> daha böyük olur, çünki annulusda yüngül influx var: SICP − SIDPP influx-un təsirini göstərir.</li>
        </ul>
        <Warn>Float valve olan dəstədə SIDPP birbaşa oxunmaya bilər. Tutulmuş təzyiq (trapped pressure) səhv yüksək SIDPP verər və lazım olandan ağır kill məhlulu hesablanar. Düzgün oxuma prosedurunu operator təyin edir.</Warn>
      </Block>

      <Block n={5} title="Influx tipinin qiymətləndirilməsi">
        <Formula>{`L_k = V_gain / C_ann
g   = 0.052·MW − (SICP − SIDPP)/L_k      [psi/ft]`}</Formula>
        <p>Qaz adətən 0.25 psi/ft-dən azdır, neft 0.25-0.4, su 0.4-dən çox. Bu qiymətləndirmə sadələşdirilmişdir: annulus tutumu dərinliklə dəyişir, influx qarışıq ola bilər və qaz yuxarı miqrasiya edir.</p>
        {student && <Why>Qaz yüngül olduğu üçün annulusdakı hidrostatik sütunu azaldır, SICP SIDPP-dən xeyli böyük olur. Su və ya duzlu su isə bu fərqi çox azaldır.</Why>}
      </Block>

      <Block n={6} title="Kill metodları">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Driller's method:</b> iki sirkulyasiya. Birincidə influx orijinal məhlulla çıxarılır (drillpipe təzyiqi ICP-də sabit), ikincidə kill məhlulu ilə quyu öldürülür. Dərhal başlaya bilər, lakin daha çox vaxt və choke əməliyyatı tələb edir.</li>
          <li><b>Wait & Weight (Engineer's method):</b> kill məhlulu hazırlanır, sonra bir sirkulyasiya ilə quyu öldürülür. Drillpipe təzyiqi ICP-dən FCP-yə xətti azalır. Adətən shoe-da təzyiq aşağı olur, lakin məhlul hazırlığı gözlənilir.</li>
          <li><b>Volumetrik və bullheading:</b> sirkulyasiya mümkün olmadıqda (məsələn, dəstə quyuda deyil) istifadə olunur.</li>
        </ul>
        <Formula>{`ICP = SIDPP + P_SCR
FCP = P_SCR·KMW/MW
P(s) = ICP − (ICP − FCP)·s/S_bit     (Wait & Weight, s ≤ S_bit)`}</Formula>
        <p>Vizual tab-ında "Kill cədvəli" görünüşündə iki metodun drillpipe təzyiqi və kill məhlulunun yerini müqayisə edə bilərsən.</p>
        <Field>Kill sheet-də SCR (slow circulating rate) təzyiqi hər dəstə və məhlul üçün əvvəlcədən ölçülməlidir. Kill zamanı drillpipe təzyiqi choke ilə cədvələ uyğun saxlanılır, nasos sürəti SCR-də sabitdir.</Field>
      </Block>

      <Block n={7} title="MAASP, shoe və kick tolerance">
        <Formula>{`MAASP = (FG − MW)·0.052·TVD_shoe
EMW_shoe = MW + SICP/(0.052·TVD_shoe)
KT = [0.052·FG·D_s + g·L_k + 0.052·MW·(TD − D_s − L_k)]/(0.052·TD) − MW`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>MAASP:</b> annulus manometrində icazə verilən maksimum təzyiq: shoe-da çat qradiyentindən aşağı.</li>
          <li><b>Kick tolerance:</b> shoe çatmadan bağlana bilən maksimum kick intensivliyi/həcmi. Casing seat seçimində vacibdir (8-ci bölmə).</li>
        </ul>
        <Warn>MAASP məhlul çəkisi dəyişdikcə yenidən hesablanmalıdır. Kill zamanı ağır məhlul annulusa çıxdıqca MAASP artır.</Warn>
      </Block>

      <Block n={8} title="Qazın davranışı">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Genişlənmə (Boyle):</b> P₁V₁ = P₂V₂. Səthə yaxın təzyiq kiçik olduğundan qaz sürətlə genişlənir.</li>
          <li><b>Miqrasiya (bağlı quyuda):</b> qaz yuxarı qalxarkən öz təzyiqini saxlayır, quyunun bütün nöqtələrində təzyiq artır. Artım ΔP = 0.052·MW·Δh olur.</li>
          <li><b>Həll olma:</b> qaz neft əsaslı məhlulda həll ola bilər və yalnız bubble point-də qəflətən azad olur, bu da erkən aşkarlamanı çətinləşdirir.</li>
        </ul>
        {student && <Why>Qazın açıq quyuda sərbəst genişlənməsinə icazə verilməsi hidrostatik təzyiqin sürətlə düşməsinə səbəb olar və ikinci kick yarada bilər. Buna görə qaz choke ilə nəzarətdə sirkulyasiya edilir.</Why>}
        <p>Vizual tab-ında "Qaz davranışı" görünüşündə həcmin dərinliklə dəyişməsini və bağlı quyuda təzyiq artımını görürsən.</p>
      </Block>

      <Block n={9} title="Avadanlıq">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>BOP stack:</b> annular preventer, pipe ram, blind/shear ram.</li>
          <li><b>Choke və kill xətləri:</b> sirkulyasiya zamanı təzyiqə nəzarət.</li>
          <li><b>Accumulator (koomey):</b> BOP-u bağlamaq üçün hidravlik enerji.</li>
          <li><b>Mud-gas separator, degasser:</b> qazı məhluldan ayırır.</li>
          <li><b>Pit volume totalizer, flow-out sensoru:</b> erkən aşkarlama.</li>
          <li><b>İç BOP / float valve / kelly cock:</b> dəstə daxilindən axını saxlamaq üçün.</li>
        </ul>
        <p>BOP təzyiq testi və funksional test müntəzəm aparılır (operatorun və tənzimləyicinin tələblərinə görə).</p>
      </Block>

      <Block n={10} title="Digər bölmələrlə əlaqə">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Təzyiqlər (3-cü bölmə):</b> pore pressure, fracture gradient və mud window MAASP və kick tolerance-in əsasıdır.</li>
          <li><b>Məhlul (2-ci bölmə):</b> məhlul çəkisini artırmaq, barit və sistem həcmi.</li>
          <li><b>Hidravlika (4-cü bölmə):</b> SCR təzyiqi, annulus sürtünməsi, kill zamanı təzyiq itkisi.</li>
          <li><b>Casing (8-ci bölmə):</b> shoe dərinliyi, sement keyfiyyəti və burst dizaynı kick yükünə görə.</li>
          <li><b>Directional (9-cu bölmə):</b> MD və TVD fərqi: hidrostatik TVD ilə, stroke və həcm MD ilə hesablanır.</li>
        </ul>
      </Block>

      <Block n={11} title="İş axını">
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Qazmadan əvvəl kill sheet hazırla (SCR, həcmlər, MAASP).</li>
          <li>Kick-in əlamətlərini izlə (pit, flow, drilling break).</li>
          <li>Əlamət görünəndə qazmanı dayandır, flow check et, quyunu bağla.</li>
          <li>SIDPP, SICP və pit gain-i qeyd et.</li>
          <li>KMW, ICP, FCP, strokes to bit hesabla, kill metodunu seç.</li>
          <li>Kill-i başla, drillpipe təzyiqini cədvələ uyğun saxla, MAASP-ı izlə.</li>
          <li>Kill-dən sonra quyunun statik olduğunu yoxla (flow check), sonra qazmanı davam etdir.</li>
          <li>Hadisəni sənədləşdir, nəticələrdən dərs çıxar.</li>
        </ol>
      </Block>
    </div>
  );
}
