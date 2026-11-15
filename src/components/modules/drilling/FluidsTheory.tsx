"use client";

import type { LearnerMode } from "@/lib/modules/types";
import { Block, Disclaimer, Field, Formula, Warn, Why } from "./TheoryParts";

export default function FluidsTheory({ mode }: { mode: LearnerMode }) {
  const student = mode === "student";
  return (
    <div className="space-y-4 max-w-3xl">
      <Disclaimer />

      <Block n={1} title="Qazma məhlulunun funksiyaları">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Formasiya təzyiqini tarazlamaq:</b> hidrostatik təzyiq ilə kick və qəzaların qarşısını almaq.</li>
          <li><b>Şlamı daşımaq və asılı saxlamaq:</b> sirkulyasiya zamanı yuxarı daşıyır, dayananda gel strength ilə çökməyə qoymur.</li>
          <li><b>Quyu divarını dayanıqlı saxlamaq:</b> təzyiq və kimyəvi inhibisiya ilə.</li>
          <li><b>Bit-i və string-i soyutmaq, yağlamaq.</b></li>
          <li><b>Bit-ə hidravlik enerji ötürmək</b> (nozzle-lərdən çıxan axın).</li>
          <li><b>String-in çəkisini azaltmaq:</b> buoyancy.</li>
          <li><b>Formasiyaya zərəri minimuma endirmək</b> və geoloji məlumat (şlam, qaz) daşımaq.</li>
        </ul>
        <Formula>{`BF = 1 − MW / 65.5          (polad ≈ 65.5 ppg)
W_buoyed = W_hava · BF`}</Formula>
        {student && <Why>Bu funksiyalar bir-biri ilə ziddiyyət təşkil edə bilər: yüksək çəki təzyiqi tarazlayır, amma çat və yapışma riskini artırır; yüksək özlülük şlamı daşıyır, amma nasos təzyiqini və ECD-ni artırır. Məhlul mühəndisliyi bu kompromisdir.</Why>}
      </Block>

      <Block n={2} title="Məhlul növləri">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Su əsaslı (WBM):</b> şirin su, dəniz suyu və ya duzlu su əsasında; bentonit, polimer, KCl və s. Ən ucuz və ekoloji cəhətdən sadə seçimdir. Reaktiv gil formasiyalarda inhibisiya çətin ola bilər.</li>
          <li><b>Neft əsaslı (OBM):</b> kəsintisiz faza neft (dizel/mineral yağ), içində emulsiya halında su (invert emulsion). Gil inhibisiyası, yağlama və temperatur davamlılığı yüksəkdir. Qiyməti və ətraf mühit məhdudiyyətləri yüksəkdir, qaz isə əsas fazada həll olur.</li>
          <li><b>Sintetik əsaslı (SBM):</b> neft əvəzinə sintetik əsas mayeli; OBM-ə yaxın performans, daha az toksiklik.</li>
          <li><b>Pnevmatik (hava, köpük):</b> aşağı təzyiqli və ya tükənmiş formasiyalar üçün.</li>
        </ul>
        <Field>Seçim formasiya tipinə (reaktiv gil, duz, kollektor), temperatura, quyu həndəsəsinə (maili/üfüqi), tənzimləmə və xərcə görə edilir. Eyni quyunun müxtəlif bölmələrində fərqli sistemlər istifadə oluna bilər.</Field>
      </Block>

      <Block n={3} title="Əsas xassələr və sahə ölçmələri">
        <p>Su əsaslı məhlullar üçün test metodları API RP 13B-1, neft əsaslı məhlullar üçün API RP 13B-2 ilə standartlaşdırılıb.</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Sıxlıq (mud weight):</b> mud balance ilə, ppg.</li>
          <li><b>Funnel viskozite:</b> Marsh funnel ilə, s/qt (şirin su, 70°F ≈ 26 s/qt). Yalnız keyfiyyət göstəricisidir.</li>
          <li><b>Rheology:</b> fırlanan viskozimetr (θ600, θ300, θ200, θ100, θ6, θ3) ilə PV, YP və gel strength (10 san/10 dəq).</li>
          <li><b>Filtrat və filter cake:</b> API testi 100 psi, 30 dəq. Yüksək temperatur üçün HPHT testi.</li>
          <li><b>Bərk hissəciklər və neft/su nisbəti:</b> retort ilə. <b>Qum miqdarı</b> ayrıca ölçülür.</li>
          <li><b>pH, alkalinlik (Pf/Pm), xlorid (Cl⁻), sərtlik (Ca²⁺), MBT</b> (aktiv gil miqdarı).</li>
        </ul>
      </Block>

      <Block n={4} title="Rheology">
        <Formula>{`PV = θ600 − θ300                 [cP]
YP = θ300 − PV                   [lb/100ft²]
AV = θ600 / 2                    [cP]

Power law:   n = 3.32·log(θ600/θ300),   K = 510·θ300 / 511^n
Herschel-Bulkley:  τ0 = 2θ3 − θ6,  n = 3.32·log((θ600−τ0)/(θ300−τ0))`}</Formula>
        <p>
          <b>PV</b> bərk hissəciklər və maye sürtünməsi ilə bağlıdır, <b>YP</b> isə şlamı daşımaq və asılı saxlama qabiliyyətinin göstəricisidir. Modellərdən
          <b> Bingham</b> ən sadə, <b>power law</b> kəsilmə ilə nazikləşməni, <b>Herschel-Bulkley</b> isə hər ikisini (axma həddi və n) əks etdirir. Kalkulyatorlar tab-ında üç modeli ölçülmüş nöqtələrlə müqayisə edə bilərsən.
        </p>
        {student && <Why>Hole cleaning aşağı kəsilmə sürətlərinin rheology-sindən (6 və 3 rpm) güclü asılıdır. Bingham bu bölgədə qiyməti çox yüksək, power law çox aşağı verə bilər, ona görə sənayedə Herschel-Bulkley getdikcə daha çox istifadə olunur.</Why>}
        <Warn>YP-ni böyütməklə hole cleaning problemini həll etmək. Artıq özlülük nasos təzyiqini və ECD-ni artırır, itki riskini yüksəldir. 4-cü bölmədə hole cleaning ilə birgə optimallaşdırılır.</Warn>
      </Block>

      <Block n={5} title="Sıxlığın idarəsi: ağırlaşdırma və seyreltmə">
        <p>Məhlul çəkisi 3-cü bölmədəki mud window ilə müəyyən edilir: Pp + margin ilə FG − margin arasında. Çəki ağırlaşdırıcı əlavə etməklə qaldırılır, su və ya əsas mayeni əlavə etməklə endirilir.</p>
        <Formula>{`Ağırlaşdırma:  lb/bbl = 42 · ρ · (W2 − W1) / (ρ − W2)
               barit (ρ = 35 ppg):  kisə/100 bbl = 1470 · (W2 − W1) / (35 − W2)
Həcm artımı:   ΔV [bbl] = m [lb] / (ρ · 42)
Seyreltmə:     V_add = V1 · (W1 − W2) / (W2 − W_add)`}</Formula>
        <p>Ağırlaşdırıcılar: <b>barit</b> (≈ 35 ppg), <b>hematit</b> (≈ 41.7 ppg, daha yüksək çəki üçün), <b>kalsium karbonat</b> (≈ 22.5 ppg, kollektor bölməsində həll olunan körpü materialı). Yüksək çəkili məhlullarda bərk hissəcik payı artır: PV və ECD yüksəlir.</p>
        <Warn>Yeni məhlulun həcminin artdığını unutmaq. Ağırlaşdırma çən həcmini artırır, seyreltmə isə kimyəvi tərkibi seyrəldir.</Warn>
      </Block>

      <Block n={6} title="Solids control">
        <p>
          Qazma zamanı şlam məhlula qarışır. Bərk hissəciklərin API təsnifatı: <b>qum</b> (&gt; 74 µm), <b>lil</b> (2-74 µm), <b>gil</b> (&lt; 2 µm). Təmizlik zənciri:
          <b> shale shaker → degasser → desander → desilter → centrifuge</b>. Hər mərhələ daha kiçik hissəcikləri ayırır.
        </p>
        {student && <Why>Aşağı sıxlıqlı bərk hissəciklər (LGS) rheology və ECD-ni pisləşdirir, ROP-u azaldır və filter cake keyfiyyətini aşağı salır. Solids control sistemi nə qədər yaxşı işləyirsə, seyreltmə ehtiyacı bir o qədər azalır.</Why>}
      </Block>

      <Block n={7} title="Filtrat, filter cake və yapışma riski">
        <p>
          Keçirici formasiyaya qarşı məhlulun fərq təzyiqi ilə mayesi (filtrat) formasiyaya keçir, divarda filter cake qalır. Nazik, möhkəm filter cake formasiyaya zərəri və
          differensial yapışma riskini azaldır. Qalın, keçirici cake isə borunun yapışmasına gətirib çıxara bilər. Fərq təzyiqi (MW − Pp) nə qədər böyükdürsə, risk bir o qədər yüksəkdir.
        </p>
      </Block>

      <Block n={8} title="Bölmələr üzrə məhlul proqramı">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Səth bölməsi (surface):</b> adətən sadə, bentonit əsaslı su məhlulu; əsas məqsəd quyunu təmiz saxlamaq və dayaz zonaları keçməkdir.</li>
          <li><b>Aralıq bölmə (intermediate):</b> reaktiv gillər və anormal təzyiq zonaları; inhibisiyalı polimer-KCl və ya OBM/SBM, artan MW.</li>
          <li><b>Kollektor bölməsi (reservoir):</b> aşağı bərk hissəcikli, formasiya zərərini minimuma endirən drill-in fluid (məsələn, CaCO₃ körpü ilə).</li>
        </ul>
        <Field>Hər bölmənin MW diapazonu 3-cü bölmədəki mud window və casing seat nəticələrindən gəlir. Məhlul proqramı və casing proqramı birgə hazırlanır.</Field>
      </Block>

      <Block n={9} title="Kontaminasiya və problemlər">
        <p>
          Tipik problemlər: sement, gips/anhidrit, duz və ya formasiya suyu, qaz, bərk hissəciklərin yığılması, itki və barit sag. Hər birinin əlamətləri, yoxlama üsulları və tədbirləri
          <b> Diaqnostika</b> tab-ında verilir. Bəzi əlamətlər (həcm artımı, qaz göstəriciləri, itki) birbaşa quyu nəzarəti məsələsidir və əvvəlcə prosedura uyğun hərəkət tələb edir.
        </p>
      </Block>

      <Block n={10} title="Real iş axını">
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Məhlul proqramını mud window, formasiya və quyu həndəsəsinə görə hazırla.</li>
          <li>Qazma zamanı çəki və funnel viskoziteni tez-tez, tam xassə yoxlamasını isə müəyyən intervalla (adətən gündə bir neçə dəfə) aparıb gündəlik məhlul hesabatına (daily mud report) yaz.</li>
          <li>Trendlərə bax: bir dəfəlik ölçmədən çox istiqamət vacibdir (PV, YP, filtrat, MBT, xlorid).</li>
          <li>Dəyişiklik edəndə (ağırlaşdırma, seyreltmə, kimyəvi) həcm və təsiri hesabla, çən tutumunu yoxla.</li>
          <li>Qeyri-adi əlamətdə quyu nəzarəti prosedurunu məhlul müalicəsindən əvvələ qoy və komandaya çatdır.</li>
        </ol>
        <Field>Neft əsaslı məhlullarla işdə tullantı idarəsi və ətraf mühit tələbləri ayrıca prosedurlarla tənzimlənir. H₂S mümkün olduqda məhlul pH-ı və təhlükəsizlik prosedurları xüsusi nəzarətdə saxlanılır.</Field>
      </Block>
    </div>
  );
}
