"use client";

import type { LearnerMode } from "@/lib/modules/types";
import { Block, Disclaimer, Field, Formula, Warn, Why } from "./TheoryParts";

export default function HydraulicsTheory({ mode }: { mode: LearnerMode }) {
  const student = mode === "student";
  return (
    <div className="space-y-4 max-w-3xl">
      <Disclaimer />

      <Block n={1} title="Hidravlikanın məqsədləri">
        <p>Qazma hidravlikası nasos enerjisini quyuda faydalı işə çevirir. Əsas məqsədlər bir-biri ilə kompromisdədir:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Hole cleaning:</b> şlamı quyudan çıxarmaq (halqada sürət, rheology).</li>
          <li><b>Bit cleaning və ROP:</b> bit-in altındakı şlamı təmizləmək (bit hidravlik gücü, jet impact).</li>
          <li><b>ECD nəzarəti:</b> dib təzyiqini mud window daxilində saxlamaq (3-cü bölmə).</li>
          <li><b>Avadanlıq limitləri:</b> nasos təzyiqi və gücü, drill string və səth xətlərinin dözümü.</li>
        </ul>
      </Block>

      <Block n={2} title="Təzyiq itkisi balansı">
        <Formula>{`P_pump = ΔP_səth + ΔP_boru (içəri) + ΔP_bit + ΔP_halqa
P_parasitik = ΔP_səth + ΔP_boru + ΔP_halqa`}</Formula>
        <p>
          Nasos təzyiqinin bitdən başqa hissələrdə itən payı <b>parasitik itki</b> adlanır. Bit-də itən təzyiq isə faydalı hidravlik enerjidir.
          Parasitik itki axının qüvvəsi kimi (≈ q^m) artır, ona görə axını artırmaq həm hole cleaning-i yaxşılaşdırır, həm də bit-ə düşən payı azaldır.
        </p>
        {student && <Why>Nasosun maksimum təzyiqi sabitdir. Axın artdıqca parasitik itki artır və bit-ə qalan təzyiq azalır: bu, bit hidravlikasının optimallaşdırılmasının əsasıdır.</Why>}
      </Block>

      <Block n={3} title="Axın rejimləri">
        <p>
          <b>Laminar</b> axında təbəqələr paralel hərəkət edir, itki sürətlə təxminən xətti artır. <b>Turbulent</b> axında itki daha sürətli (≈ v^1.75) artır.
          Rejim kritik sürətlə müəyyən olunur: v &lt; v_c laminar, v &gt; v_c turbulent.
        </p>
        <p>
          Adətən drill string-in içində sürət yüksək olduğu üçün axın turbulentdir, halqada isə (böyük en kəsik) laminar olması tərcih olunur: ECD aşağı qalır və zəif formasiyanın eroziyası azalır.
        </p>
      </Block>

      <Block n={4} title="Bingham plastic modeli (Bourgoyne)">
        <Formula>{`Boru:   v = q / (2.448·d²)                       [ft/s]
        laminar:    ΔP/L = μp·v/(1500·d²) + τy/(225·d)
        turbulent:  ΔP/L = ρ^0.75·v^1.75·μp^0.25 / (1800·d^1.25)
        kritik:     vc = [1.08μp + 1.08·√(μp² + 12.34·d²·τy·ρ)] / (ρ·d)

Halqa:  v = q / (2.448·(d2² − d1²))
        laminar:    ΔP/L = μp·v/(1000·(d2−d1)²) + τy/(200·(d2−d1))
        turbulent:  ΔP/L = ρ^0.75·v^1.75·μp^0.25 / (1396·(d2−d1)^1.25)
        kritik:     vc = [1.08μp + 1.08·√(μp² + 9.26·(d2−d1)²·τy·ρ)] / (ρ·(d2−d1))

(μp cP, τy lb/100ft², ρ ppg, d in, q gpm, ΔP/L psi/ft)`}</Formula>
        <p>PV və YP 2-ci bölmədə hesablanmışdı (PV = θ600 − θ300, YP = θ300 − PV).</p>
      </Block>

      <Block n={5} title="Power law (API RP 13D)">
        <p>
          Power law modeli məhlulun kəsilmə ilə nazikləşməsini (n &lt; 1) əks etdirir. Boru üçün n və K 600/300 rpm-dən, halqa üçün 100/3 rpm-dən hesablanır, çünki halqada kəsilmə sürəti aşağıdır.
          Friksiya əmsalı Reynolds ədədinə görə laminar (f = 16/Re), keçid və turbulent (f = a/Re^b) bölgələr üçün seçilir.
        </p>
        <Formula>{`n_boru = 3.32·log(θ600/θ300)       n_halqa = 0.657·log(θ100/θ3)
K_boru = 510·θ300 / 511^n          K_halqa = 510·θ100 / 170.2^n   (ekv. cP)
laminar:     f = 16/Re,   keçid: Re_c = 3470 − 1370·n ... 4270 − 1370·n
turbulent:   f = a/Re^b,  a = (log n + 3.93)/50,  b = (1.75 − log n)/7`}</Formula>
        {student && <Why>Bingham modeli aşağı kəsilmə sürətlərində (halqada) təzyiq itkisini adətən yüksək, power law isə aşağı verə bilər. Real məhlul üçün əsl dəyər onların arasında olur, ona görə dizayn zamanı modeli ölçülmüş standpipe təzyiqi ilə kalibrləyirlər.</Why>}
        <Warn>Bir modeli "düzgün" qəbul edib nəticəni mütləq saymaq. Model nəticələri yalnız ölçülmüş təzyiqlərlə (circulating pressure, PWD) uyğunlaşdırıldıqdan sonra etibarlıdır.</Warn>
      </Block>

      <Block n={6} title="Bit hidravlikası">
        <Formula>{`A_t = Σ (π/4)·(n_i/32)²                 [in²]  (n_i: 1/32 in)
ΔP_bit = 8.311·10⁻⁵ · ρ · q² / (Cd² · A_t²)     [psi],  Cd ≈ 0.95
v_n = 0.3208 · q / A_t                  [ft/s]
HHP_bit = ΔP_bit · q / 1714
HSI = HHP_bit / ((π/4)·D_bit²)
F_j = 0.01823 · Cd · q · √(ρ · ΔP_bit)  [lbf]`}</Formula>
        <p>
          Nozzle-lər kiçildikcə ΔP_bit kvadratik artır, nozzle sürəti və jet impact yüksəlir. HSI və jet impact bit-in altının təmizlənməsini qiymətləndirir. Yüksək dəyər həmişə yaxşı deyil:
          həddindən artıq nozzle sürəti formasiyanı eroziyaya uğrada, nasos təzyiqini isə limitə çatdıra bilər.
        </p>
      </Block>

      <Block n={7} title="Optimallaşdırma">
        <p>Parasitik itki P_p = c·q^m kimi yazılır (m adətən 1-dən böyük, turbulent boru axınında 1.75-ə yaxın). İki ölçülmüş nöqtədən c və m tapılır:</p>
        <Formula>{`m = ln(P1/P2) / ln(q1/q2),   c = P1 / q1^m

Max bit HHP:     ΔP_bit = m/(m+1) · P_max     (m = 1.8 üçün ≈ 64%)
Max jet impact:  ΔP_bit = m/(m+2) · P_max     (m = 1.8 üçün ≈ 47%)`}</Formula>
        <p>
          HHP kriteriyası daha az axın və daha çox bit təzyiqi, impact kriteriyası isə daha çox axın və daha az bit təzyiqi verir. Hansı kriteriyanın seçilməsi bit tipinə, formasiyaya və hole cleaning tələblərinə görə qərar verilir.
        </p>
        <Warn>Optimumu olduğu kimi tətbiq etmək. Real quyuda hole cleaning üçün minimum axın və ECD üçün maksimum axın optimumu məhdudlaşdırır.</Warn>
      </Block>

      <Block n={8} title="ECD və mud window">
        <Formula>{`ECD = MW + ΔP_halqa / (0.052 · TVD)`}</Formula>
        <p>
          Sirkulyasiya zamanı dib təzyiqi statik hidrostatik təzyiqdən halqa sürtünməsi qədər artıq olur. ECD çat həddi ilə (3-cü bölmə) müqayisə olunur. Şlamın halqada olması da ECD-ni artırır.
          ECD-ni azaltmaq üçün axını və özlülüyü azaltmaq, halqa boşluğunu artırmaq (ölçülərin seçimi), şlamı tez çıxarmaq və ROP-u nəzarətdə saxlamaq olar.
        </p>
        <Field>PWD (pressure while drilling) alətləri halqa təzyiqini birbaşa ölçür və ECD-ni real vaxtda göstərir. Hesablanmış ECD ilə müqayisə hidravlik modelin kalibrlənməsinə kömək edir.</Field>
      </Block>

      <Block n={9} title="Hole cleaning">
        <p>
          Şlamın çıxarılması halqada sürət, məhlulun rheology-si, quyu bucağı, boru fırlanması və ROP-dan asılıdır. <b>Şaquli quyuda</b> şlamın çökmə (slip) sürəti ilə halqa sürəti müqayisə olunur.
          <b> Maili quyuda (təxminən 30-60°)</b> şlam quyunun aşağı tərəfində yataq (bed) əmələ gətirə və aşağı sürüşə bilər, bu daha çətin haldır.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Axın sürətini və rheology-ni (xüsusilə aşağı kəsilmə sürətindəki göstəriciləri) idarə et.</li>
          <li>Boru fırlanması yatağı pozur: yüksək rpm çox vaxt effektiv olur.</li>
          <li>Süpürmə (viscous/weighted sweep) və bottoms-up sirkulyasiya tətbiq et.</li>
          <li>ROP-u hole cleaning imkanları ilə uyğunlaşdır: həddindən artıq yüksək ROP halqanı şlamla yükləyir.</li>
        </ul>
        <p>CCI sadə təlimat göstəricisidir, ciddi hole cleaning modelini əvəz etmir.</p>
        <Field>Hole cleaning problemlərinin əlaməti: standpipe təzyiqinin və torque/drag-ın tədricən artması, şlamın shaker-də azalması, bağlantılarda yüksək çəkmə (overpull). Bu, 6-cı və 11-ci bölmələrdə də görünəcək.</Field>
      </Block>

      <Block n={10} title="Surge və swab">
        <p>
          Boru quyuya endirilərkən məhlulu yerindən sıxışdırır və dib təzyiqi müvəqqəti artır (<b>surge</b>). Boru çəkiləndə isə dib təzyiqi azalır (<b>swab</b>).
          Surge çat həddini keçərsə itki, swab məsamə təzyiqindən aşağı düşərsə kick riski yaranır.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Təsir edən amillər: boru sürəti, boru-quyu boşluğu, məhlulun özlülüyü və gel strength, float/bit nozzle-lərinin bağlı olub-olmaması, quyu uzunluğu.</li>
          <li>Azaltmaq üçün: sürəti idarə etmək, kritik hissələrdə yavaş getmək, gel-i çox yüksək saxlamamaq, boru çəkərkən sirkulyasiya/fırlatma (top drive ilə), trip tank ilə nəzarət.</li>
        </ul>
        <Warn>Surge/swab hesabını yalnız stabil halqa itkisi kimi nəzərə almaq. Real hadisə tranzientdir: boru sürətlənəndə və yavaşlayanda təzyiq dalğaları yaranır, ona görə xüsusi proqramlarla modelləşdirilir.</Warn>
      </Block>

      <Block n={11} title="Real iş axını">
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Hər bölmə üçün hidravlik proqram hazırla (axın, nozzle, MW, rheology hədəfləri). Mud window 3-cü bölmədən, məhlul xassələri 2-ci bölmədən gəlir.</li>
          <li>Qazmadan əvvəl nasos testi (circulating pressure) ilə parasitik itkini ölç, modeli kalibrlə.</li>
          <li>Qazma zamanı standpipe təzyiqini trendlə izlə: tədricən artım nozzle tıxanması, bit balling və ya halqada yığılmanı; azalma washout və ya nasos problemini göstərə bilər.</li>
          <li>PWD varsa ECD-ni modellə müqayisə et. Fərq artırsa hole cleaning və ya modelin dəqiqliyi yoxlanılır.</li>
          <li>Nozzle dəyişdirmə qərarını bit tipi, ROP və təzyiq limitləri ilə birlikdə ver.</li>
        </ol>
      </Block>
    </div>
  );
}
