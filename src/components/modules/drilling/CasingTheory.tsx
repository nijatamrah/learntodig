"use client";

import type { LearnerMode } from "@/lib/modules/types";
import { Block, Disclaimer, Field, Formula, Warn, Why } from "./TheoryParts";

export default function CasingTheory({ mode }: { mode: LearnerMode }) {
  const student = mode === "student";
  return (
    <div className="space-y-4 max-w-3xl">
      <Disclaimer />

      <Block n={1} title="Casing və sementləmənin rolu">
        <p>
          Casing quyunun polad "skeleti"dir: açıq quyunun divarını möhkəmləndirir, formasiyaları bir-birindən izolyasiya edir və sonrakı bölmələrdə daha yüksək məhlul çəkisi ilə qazmağa imkan verir.
          Sement casing ilə formasiya arasındakı boşluğu doldurur, casing-i yerində saxlayır və <b>zonal izolyasiya</b> yaradır: layların arası və səthə axın bağlanır.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Quyu stabilliyi:</b> çökən, şişən və ya zəif formasiyaların bağlanması.</li>
          <li><b>Təzyiq nəzarəti:</b> BOP casing-ə bağlanır, shoe çat təzyiqi kick-i idarə etməyə imkan verir (3-cü bölmə).</li>
          <li><b>İzolyasiya:</b> şirin su, qaz, duzlu su laylarının qorunması və cross-flow-un qarşısı.</li>
          <li><b>İstehsal yolu:</b> production casing quyu ömrü boyu axının nəql olunduğu kəmərdir.</li>
        </ul>
      </Block>

      <Block n={2} title="Casing kəmərləri (casing program)">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Conductor:</b> ən dayaz və ən geniş kəmər (məs. 20-30 in), yuyulmanın qarşısını alır, quyunun ağzını bərkidir.</li>
          <li><b>Surface:</b> şirin su laylarını örtür, BOP-u daşıyır (məs. 13-3/8 in).</li>
          <li><b>Intermediate:</b> çətin formasiyaları (anormal təzyiq, duz, zəif layı) izolyasiya edir (məs. 9-5/8 in). Sayı 3-cü bölmədəki mud window analizindən çıxır.</li>
          <li><b>Production:</b> məhsuldar zonaya qədər (məs. 7 in), tamamlama avadanlığı bu kəmərə endirilir.</li>
          <li><b>Liner:</b> səthə qədər çatmayan, əvvəlki casing-in içindən asılan kəmər, material və xərc qənaəti verir.</li>
        </ul>
        <p>Vizual tab-ında "Casing proqramı" görünüşündə hər kəmərin yerini, dərinliyini və diametrini görə bilərsən.</p>
        {student && <Why>Kəmərlər teleskop kimi daralır: hər növbəti casing əvvəlkinin içindən keçməlidir. Ona görə quyu diametri dərinləşdikcə kiçilir və ilkin diametr seçimi production kəmərindən geriyə hesablanır.</Why>}
      </Block>

      <Block n={3} title="Casing xassələri və API 5CT">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>OD və divar qalınlığı (t):</b> ID = OD − 2t. Nominal çəki lb/ft ilə verilir.</li>
          <li><b>Sinif (grade):</b> J-55, N-80, P-110 kimi. Rəqəm minimum axma həddini ksi ilə göstərir.</li>
          <li><b>Müqavimətlər:</b> burst (daxili təzyiq), collapse (xarici təzyiq), body yield (dartılma). Hamısı API 5C3 düsturları ilə hesablanır.</li>
          <li><b>Bağlantı (connection):</b> STC, LTC, BTC və ya premium. Bağlantının dartılma gücü çox vaxt boru gövdəsindən az olur.</li>
        </ul>
        <Formula>{`ID = OD − 2·t
Burst (API):   P_b = 0.875·2·Yp·t / OD
Body yield:    F_y = (π/4)·(OD² − ID²)·Yp`}</Formula>
        <p>0.875 əmsalı istehsalatda icazə verilən divar qalınlığı tolerantlığını (minimum 87.5%) nəzərə alır.</p>
      </Block>

      <Block n={4} title="Dizayn yükləri: burst, collapse, tension">
        <p>Hər kəmər istismar və qazma boyu üç əsas yükə qarşı yoxlanır. Yük hər dərinlikdə fərqlidir, ona görə dizayn <b>dərinlik profili</b> üzərində aparılır.</p>
        <Formula>{`BURST (qaz kick-i):
  P_s  = min( Pp_TD − g·TD ,  Pfrac_shoe − g·D_shoe )     (səth təzyiqi)
  yük(d) = P_s + g·d − ρ_ext·d          (daxili qaz − xarici formasiya suyu)

COLLAPSE (tam / qismən boşalma):
  yük(d) = 0.052·MW·d − 0.052·MW·max(0, d − h_səviyyə)

TENSION (buoyed weight):
  T(d) = w·(1 − MW/65.4)·(D_shoe − d)`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Burst</b> ən pis səthə yaxın olur: daxili təzyiq yüksək, xarici dəstək azdır.</li>
          <li><b>Collapse</b> dibə yaxın ən yüksəkdir: xarici hidrostatik daxildən dəstəklənmir.</li>
          <li><b>Tension</b> səthdə ən böyükdür: bütün string-in çəkisini yuxarı hissə daşıyır.</li>
        </ul>
        {student && <Why>Hər yük fərqli yerdə kritik olur, buna görə tək kəmər içində divar qalınlığı və sinif dəyişə bilər (kombinə string): dibdə collapse üçün ağır divar, yuxarıda tension üçün güclü bağlantı.</Why>}
        <Warn>Burst yükünü yalnız casing-in öz müqaviməti ilə müqayisə etmək. Shoe-dakı çat qradiyenti səth təzyiqini məhdudlaşdırır: kick-i bağlamaq üçün formasiyanı yarmaq olmaz.</Warn>
      </Block>

      <Block n={5} title="Dizayn faktorları və biaxial düzəliş">
        <Formula>{`SF = müqavimət / yük      (tipik minimum)
  burst     ≥ 1.1
  collapse  ≥ 1.0
  tension   ≥ 1.6

Biaxial: dartılma collapse müqavimətini azaldır
  P_ca = P_c · [ √(1 − 0.75·(σ_a/Yp)²) − 0.5·σ_a/Yp ]     σ_a = T/A`}</Formula>
        <p>
          Dizayn faktoru qeyri-müəyyənlik üçün ehtiyatdır: yükün yanlış qiymətləndirilməsi, istehsal tolerantlığı, korroziya, əyilmə. Faktorlar şirkət standartına görə dəyişir.
          Eksenel gərginlik yuxarıda yüksək olduğu üçün orada collapse müqaviməti ən çox azalır, lakin yuxarıda collapse yükü özü kiçikdir; kritik nöqtə çox vaxt orta dərinlikdə olur.
        </p>
        <Field>Dizayn proqramlarında (məs. Landmark WellCat/StressCheck, Halliburton) yük halları (load cases) cədvəli: drilling, cementing, pressure test, production, injection və s. Hamısı üçün SF xəritəsi çıxarılır. Burada sadələşdirilmiş şaquli quyu modeli istifadə olunur.</Field>
      </Block>

      <Block n={6} title="Sement slurry və absolute volume metodu">
        <p>
          Sement slurry sement tozu, su və əlavələrdən (retarder, fluid loss, weighting agent) ibarətdir. Class G sement kisəsi 94 lb-dir. Quru sementin absolute volume-u 0.0382 gal/lb, suyun 1.0 gal/gal.
        </p>
        <Formula>{`V_slurry = 94·0.0382 + w          [gal/sk]       (w: mix suyu, gal/sk)
ρ_slurry = (94 + 8.34·w) / V_slurry   [ppg]
Yield    = V_slurry / 7.48            [ft³/sk]

Kisə sayı:  N = V_bbl · 5.615 / Yield`}</Formula>
        <p>Çox su sıxlığı azaldır və yield-i artırır, lakin sement daşının möhkəmliyini azaldır və suyun ayrılmasına (free water) səbəb ola bilər. Aşağı sıxlıqlı sement zəif formasiyalarda lead slurry kimi, daha sıx sement (tail) isə shoe zonasında istifadə olunur.</p>
        <Warn>Su miqdarını artırıb "daha çox həcm" almaq. Hər slurry-nin təhlükəsiz su aralığı var; aşağıda sement bərkiməz, yuxarıda möhkəmlik düşər.</Warn>
      </Block>

      <Block n={7} title="Sement həcminin hesablanması">
        <Formula>{`V_open   = L_open · (D_h² − OD²)/1029.4 · (1 + excess)
V_cased  = L_cased · (ID_prev² − OD²)/1029.4
V_track  = L_track · ID²/1029.4
V_total  = V_open + V_cased + V_track`}</Formula>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Excess:</b> caliper logu varsa ona görə, yoxdursa 20-50% offset təcrübəsinə görə.</li>
          <li><b>Shoe track:</b> float collar ilə shoe arasında qalan sement, kontaminasiya olunmuş ilk/son slurry-ni çıxarır.</li>
          <li><b>TOC (top of cement):</b> əvvəlki shoe-dan yuxarı çıxmalıdır (adətən 100-500 ft overlap), surface casing üçün səthə qədər.</li>
        </ul>
      </Block>

      <Block n={8} title="Sement işinin mərhələləri">
        <ol className="list-decimal pl-5 space-y-1.5">
          <li><b>Sirkulyasiya və kondisiya:</b> quyu təmizlənir, məhlulun reologiyası uyğunlaşdırılır.</li>
          <li><b>Spacer/preflush:</b> məhlulu sementdən ayırır, divarı yuyur.</li>
          <li><b>Lead slurry:</b> yüngül, ucuz, uzun annulus hissəsini doldurur.</li>
          <li><b>Tail slurry:</b> daha sıx və güclü, shoe zonasında və məhsuldar zonada.</li>
          <li><b>Bottom plug / top plug:</b> sementi casing daxilində məhlul və displacement mayesindən ayırır.</li>
          <li><b>Displacement:</b> plug float collar-a çatana qədər pump edilir.</li>
          <li><b>Plug bump və təzyiq testi:</b> təzyiq sıçrayışı oturmanı göstərir, sonra təzyiq buraxılır və geri axın yoxlanılır.</li>
        </ol>
        <p>Vizual tab-ında "Sement işi" görünüşündə pump edilmiş həcmi artıraraq mayelərin casing və annulus daxilində necə irəlilədiyini izləyə bilərsən.</p>
        {student && <Why>Displacement həcmini casing tutumundan hesablayırıq, çünki plug-dan sonra casing daxilindəki bütün sement annulusa sıxılmalıdır. Az pump etsək sement casing-də qalar, çox pump etsək shoe track-dəki sement də itər.</Why>}
      </Block>

      <Block n={9} title="U-tube, təzyiqlər və shoe-da ECD">
        <Formula>{`P_ann(shoe) = Σ 0.052·ρ_i·h_i          (annulus mayelərinin hidrostatiği)
P_int(shoe) = Σ 0.052·ρ_j·h_j          (casing daxili)
Δp          = P_ann − P_int            (U-tube)
EMW(shoe)   = P_ann / (0.052·D_shoe)   < çat qradiyenti`}</Formula>
        <p>
          Sement annulusa çıxdıqca annulus ağırlaşır, nasos təzyiqi artır və shoe-da effektiv məhlul çəkisi (EMW) yüksəlir. Əgər EMW formasiyanın çat qradiyentini aşarsa, itkili sirkulyasiya baş verir
          və sement lazım olan yüksəkliyə çatmır. Pump sürəti və slurry sıxlığı bu limitə görə seçilir. Sürtünmə itkisi bu modeldə nəzərə alınmır, real işdə annulus sürtünməsi EMW-ni artırır.
        </p>
        <Warn>Casing-i yalnız plug bump təzyiqinə görə qiymətləndirmək. Pump dayananda U-tube nəticəsində annulusdan geri axın ola bilər, float equipment bunu saxlamalıdır.</Warn>
      </Block>

      <Block n={10} title="Mərkəzləmə (standoff) və sement keyfiyyəti">
        <Formula>{`gap = (D_h − OD)/2
Standoff = (1 − e/gap)·100 %          e: casing mərkəzinin sürüşməsi
v_dar / v_geniş ≈ ((1 − ε)/(1 + ε))²,   ε = 1 − Standoff/100`}</Formula>
        <p>
          Casing quyunun mərkəzində olmayanda dar tərəfdə axın sürəti kəskin azalır, orada köhnə məhlul qalır və sement kanallaşma yaradır. Bu <b>zonal izolyasiyanı</b> pozur.
          Mərkəzləşdiricilər (centralizer) minimum standoff təmin edir (adətən ≥ 67%).
        </p>
        <Field>Sement keyfiyyəti CBL/VDL və ya ultrasonik loglarla yoxlanılır. Zəif bond-da squeeze (təzyiqlə sement vurma) planlaşdırılır. Qaz miqrasiyası, kanallaşma və mikroannulus tipik risklərdir.</Field>
      </Block>

      <Block n={11} title="Real iş axını">
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Casing seat-ləri və ölçüləri təyin et (3-cü bölmə, mud window).</li>
          <li>Yük hallarını müəyyən et: kick (burst), tam/qismən boşalma (collapse), string çəkisi (tension).</li>
          <li>Sinif və çəkini seç, SF-ləri dərinlik profili boyu yoxla; lazım olsa kombinə string.</li>
          <li>Sement proqramını hazırla: slurry-lər, həcmlər, excess, TOC, displacement, mərkəzləşdiricilər.</li>
          <li>Pump sürətini və EMW-ni çat qradiyentinə qarşı yoxla.</li>
          <li>İşi icra et: plug bump, təzyiq testi, geri axın yoxlaması.</li>
          <li>Bond log çək, shoe-da leak-off/FIT et və nəticələri sənədləşdir.</li>
        </ol>
      </Block>
    </div>
  );
}
