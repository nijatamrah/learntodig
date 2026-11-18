"use client";

import type { LearnerMode } from "@/lib/modules/types";
import { Block, Disclaimer, Field, Formula, Warn, Why } from "./TheoryParts";

export default function ProblemsTheory({ mode }: { mode: LearnerMode }) {
  const student = mode === "student";
  return (
    <div className="space-y-4 max-w-3xl">
      <Disclaimer />
      <Warn>Bu bölmə təhsil üçündür və sadələşdirilmiş modellərdən istifadə edir. Real problemlərdə (stuck pipe, itki, kick) qərarı operatorun prosedurları, qazma mühəndisi və ya supervayzer verir. Bu hesablamalar onların yerini tutmur.</Warn>

      <Block n={1} title="Problem, NPT və görünməyən itirilmiş vaxt">
        <p>
          Qazma problemi planlanmış əməliyyatı dayandıran və ya yavaşladan hadisədir. Bunun yaratdığı vaxt itkisi <b>NPT</b> (non-productive time) adlanır. Qazma dəyərinin böyük hissəsi gündəlik (spread rate) olduğundan hər itirilmiş gün birbaşa pula çevrilir.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>NPT:</b> stuck pipe, itki, avadanlıq nasazlığı, gözləmə (hava, material), well control hadisəsi.</li>
          <li><b>Invisible lost time (ILT):</b> NPT kimi qeyd olunmayan, lakin plandan yavaş gedən əməliyyatlar (aşağı ROP, uzun trip, ləng bağlantı).</li>
          <li><b>Flat time və step change:</b> əməliyyatın vaxt balansı təhlili problemin yerini göstərir.</li>
        </ul>
        {student && <Why>Problemlərin çoxu bir-birinə bağlıdır: pis hole cleaning stuck pipe yaradır, stuck pipe-ı açmaq üçün güclü hərəkət itki və ya kick verə bilər, itki isə hidrostatiki azaldıb kick-ə aparır. Zəncirin ilk halqasını tutmaq vacibdir.</Why>}
      </Block>

      <Block n={2} title="Stuck pipe: iki əsas qrup">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Differensial yapışma:</b> boru keçirici zonada filter cake-ə sıxılır. Sirkulyasiya davam edir, boru hərəkət etmir.</li>
          <li><b>Mexaniki yapışma:</b> hole pack-off və ya bridge (cuttings, cavings, sloughing shale, sement parçaları), key seat, wellbore geometriya (ledge, undergauge hole), junk. Sirkulyasiya çox vaxt məhdudlaşır.</li>
        </ul>
        <Formula>{`ΔP = 0.052·(MW − Pf_ppg)·TVD
A  = L_c·12·w
F  = ΔP·A·μ`}</Formula>
        <p>Qüvvə təmas uzunluğu, təmas eni, overbalance və sürtünmə əmsalı ilə böyüyür. Boru hərəkətsiz qaldıqca cake borunun ətrafına bürünür və A böyüyür. Bu, yapışmanın vaxtla ağırlaşmasının əsas səbəbidir.</p>
        <Warn>Yapışmış borunu çəkərkən yalnız yuxarı dartmaq (overpull) ilə borunu qırmaq mümkündür. Dartma limiti boru axma həddindən, torque limitindən və operatorun prosedurundan aşağı olmalıdır. Jar və spotting fluid kimi seçimlər supervayzerlə razılaşdırılır.</Warn>
      </Block>

      <Block n={3} title="Free point: yapışma harada?">
        <p>Borunu müəyyən qüvvə ilə dartıb uzanmanı ölçürük. Polad Hooke qanunu ilə uzanır, uzanma yalnız sərbəst hissədə baş verir.</p>
        <Formula>{`L = 735,294·e·W/P      [ft]
e: əlavə uzanma, in
W: boru çəkisi, lb/ft
P: əlavə dartma, lb`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Nəticə təxminidir: quyu mailliyi, sürtünmə və BHA-nın qalın hissələri dəqiqliyi azaldır.</li>
          <li>Praktikada wireline free-point alətilə dəqiqləşdirilir. Hesab yalnız ilkin qiymətləndirmə üçündür.</li>
        </ul>
        <p>Vizual tab-ında "Stuck pipe" görünüşündə free point-in dərinliyinin dartmadan və uzanmadan necə asılı olduğunu görə bilərsən.</p>
      </Block>

      <Block n={4} title="Hole cleaning">
        <p>
          Cuttings quyunu tərk etməlidir. Annulus sürəti cuttings-i yuxarı daşıyır, cuttings isə öz çəkisi ilə geriyə sürüşür (slip). Net hərəkət bu fərqdən asılıdır.
        </p>
        <Formula>{`Va = 24.51·Q/(Dh² − Dp²)
Ft = (Va − Vs)/Va
C  = 100·ROP·Dh²/(1471·Q·Ft)`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Şaquli quyu:</b> annulus sürəti və məhlulun daşıma qabiliyyəti əsas rol oynayır.</li>
          <li><b>Maili quyu (təxminən 40-65°):</b> yatağın yaranma və geriyə sürüşmə (avalanche) riski ən yüksəkdir.</li>
          <li><b>Fırlanma, axın və məhlul reologiyası</b> yatağı pozur. Sweep və qısa trip-lər istifadə olunur.</li>
          <li><b>ROP-u idarə et:</b> çox yüksək ROP cuttings konsentrasiyasını artırır.</li>
        </ul>
        <Warn>Hole cleaning-i yalnız annulus sürətinə baxıb qiymətləndirmək kifayət deyil. Mailliyə və fırlanmaya baxmaq lazımdır. Bu modeldə slip sürəti mailliyə və fırlanmaya görə sadə əmsallarla düzəldilir, real quyu üçün sənaye modelləri istifadə olunur.</Warn>
        {student && <Why>ROP artarsa, eyni vaxtda daha çox cuttings yaranır. Axın artmazsa, konsentrasiya artır və yataq qalınlaşır. Pack-off bu yatağın hərəkəti ilə başlaya bilər.</Why>}
      </Block>

      <Block n={5} title="Lost circulation">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Səbəblər:</b> təbii çatlar, karst/vuggy zonalar, zəif formasiya, yüksək ECD və ya surge, drilling-induced fracture.</li>
          <li><b>Təsnifat (tipik):</b> seepage (&lt;10 bbl/saat), qismən (10-100), ciddi (100-500), tam (&gt;500) və ya return yoxdur.</li>
          <li><b>Nəticə:</b> məhlul itkisi, hole cleaning pisləşməsi, hidrostatik azalma və kick riski.</li>
        </ul>
        <Formula>{`ECD   = MW + APL/(0.052·TVD)
h     = TVD − Pf_ppg·TVD/MW      (səviyyə düşməsi)
ΔP_h  = 0.052·MW·h`}</Formula>
        <p>Strategiya: ECD-ni azalt (nasos sürəti, məhlul xüsusiyyətləri, trip sürəti), itki zonasını və sürətini müəyyən et, uyğun LCM və ya casing/sement həllini seç. Quyunu izlə: səviyyə düşərsə, başqa zona kick verə bilər.</p>
        <Field>Itki zonası çox vaxt zəif zonadır. Mud window (3-cü bölmə) dar olduqda casing seat dəyişimi (8-ci bölmə) və ya MPD kimi texnologiyalar nəzərə alınır.</Field>
      </Block>

      <Block n={6} title="Wellbore instability">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Əlamətlər:</b> shaker-də iri bucaqlı cavings, tripdə tight hole, overpull, fill, nasos təzyiqinin artması.</li>
          <li><b>Səbəblər:</b> aşağı məhlul çəkisi (shear failure), shale-in su ilə reaksiyası, təbii çatlar, tektonik gərginlik, drilling zamanı uzun açıq qalma.</li>
          <li><b>İdarəetmə:</b> uyğun məhlul çəkisi və inhibisiya, ECD-nin stabil saxlanılması, hole cleaning, qısa açıq qalma vaxtı.</li>
        </ul>
        <Warn>Məhlul çəkisini yalnız kollaps qorxusu ilə artırmaq çat həddini keçərək itkiyə səbəb ola bilər. Hər iki sərhəddə mud window-a baxmaq lazımdır.</Warn>
      </Block>

      <Block n={7} title="Digər problemlər">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Bit balling və BHA balling:</b> yumşaq gil, ROP azalır, təzyiq artır (7-ci bölmə).</li>
          <li><b>Vibration:</b> stick-slip, whirl, lateral. BHA və bit zədələnməsinə aparır.</li>
          <li><b>Washout və drillstring uğursuzluğu:</b> nasos təzyiqi tədricən azalır. Sirkulyasiya yoxlanılır, dəstə çıxarılır.</li>
          <li><b>H₂S və qaz problemləri:</b> təhlükəsizlik prosedurları əsasdır.</li>
          <li><b>Casing və sement problemləri:</b> sement top, channeling, casing sıxılması (8-ci bölmə).</li>
        </ul>
      </Block>

      <Block n={8} title="Diaqnostika: əlamət → ehtimal olunan səbəb">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Pit azalır, return azalır:</b> itki. Səviyyə və kick riskini yoxla.</li>
          <li><b>Pit artır, flow-out artır:</b> kick (10-cu bölmə).</li>
          <li><b>Pump təzyiqi tədricən azalır, strokes artır:</b> washout və ya drillstring problemi.</li>
          <li><b>Pump təzyiqi qəfildən artır, axın azalır:</b> pack-off, bridge, nozzle bağlanması.</li>
          <li><b>Torque və drag artır, shaker-də çox cuttings:</b> hole cleaning problemi.</li>
          <li><b>Boru hərəkətsiz qaldıqdan sonra yapışır, sirkulyasiya var:</b> differensial yapışma.</li>
          <li><b>Tripdə tight hole, cavings:</b> instability və ya yataq.</li>
        </ul>
        <Field>Bir əlamət bir neçə səbəbə aid ola bilər. Əlavə məlumat (cuttings forması, ECD, torque, hole fill) diaqnozu dəqiqləşdirir.</Field>
      </Block>

      <Block n={9} title="NPT iqtisadiyyatı: fishing və ya sidetrack">
        <p>Dəstə qalıb və ya yapışıbsa, iki ssenari mümkündür: fishing (balıqçılıq əməliyyatı) və ya sidetrack. Fishing ucuz görünür, lakin uğursuz olarsa vaxt itirilir və sidetrack baha olur.</p>
        <Formula>{`E_fish = F + (1 − p)·S
p*     = F/S      (break-even)`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Fishing yalnız p &gt; F/S olduqda sidetrack-dan sərfəlidir.</li>
          <li>Həmçinin vaxt limiti qoyulur: müəyyən günə qədər fishing, sonra sidetrack.</li>
          <li>Qərar texniki risk, təhlükəsizlik və hasilatla da bağlıdır, yalnız pul deyil.</li>
        </ul>
      </Block>

      <Block n={10} title="Profilaktika və öyrənilmiş dərslər">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Offset quyu məlumatları və drilling hazard map-lar planlamada istifadə olunur.</li>
          <li>Real vaxtda monitorinq: ECD, torque, drag, pit, SPP trendləri.</li>
          <li>Kiçik problem böyük problemə çevrilməzdən əvvəl müdaxilə etmək.</li>
          <li>Hadisədən sonra After Action Review: nə baş verdi, niyə, nəyi dəyişək.</li>
        </ul>
      </Block>

      <Block n={11} title="Digər bölmələrlə əlaqə">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Məhlul (2-ci bölmə):</b> reologiya, filter cake, lubricant və LCM.</li>
          <li><b>Təzyiqlər (3-cü bölmə):</b> mud window, ECD, pore və fracture.</li>
          <li><b>Hidravlika (4-cü bölmə):</b> annulus sürəti, APL, ECD.</li>
          <li><b>Torque-drag (6-cı bölmə):</b> yapışma əlamətləri və təmizlənmə.</li>
          <li><b>Directional (9-cu bölmə):</b> mailliyə görə hole cleaning və yatağın davranışı.</li>
          <li><b>Well control (10-cu bölmə):</b> itki-kick qarşılıqlı əlaqəsi.</li>
        </ul>
      </Block>
    </div>
  );
}
