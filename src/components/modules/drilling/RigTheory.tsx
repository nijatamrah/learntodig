"use client";

import type { LearnerMode } from "@/lib/modules/types";
import { Block, Disclaimer, Field, Formula, Warn, Why } from "./TheoryParts";

export default function RigTheory({ mode }: { mode: LearnerMode }) {
  const student = mode === "student";
  return (
    <div className="space-y-4 max-w-3xl">
      <Disclaimer />

      <Block n={1} title="Qazma qurğusu nədir və niyə sistemlərlə öyrənilir?">
        <p>
          Qazma qurğusu quyunu qazmaq üçün lazım olan bütün avadanlığın birgə işləyən kompleksidir. Onu tək-tək avadanlıq kimi yox,
          <b> altı sistem</b> kimi öyrənmək məntiqlidir: <b>güc</b>, <b>qaldırma</b>, <b>fırlanma</b>, <b>sirkulyasiya</b>, <b>quyu nəzarəti</b> və <b>monitorinq</b>.
          Növbəti bölmələrdə (məhlul, hidravlika, T&amp;D, well control) hər hesablama bu sistemlərdən birinə qayıdır.
        </p>
        <p>Yuxarıdakı <b>Sxem</b> tab-ında hər sistemə klik edərək komponentlərə baxa və 3D avadanlıq səhifələrinə keçə bilərsən.</p>
      </Block>

      <Block n={2} title="Qurğu növləri">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Quru (land) qurğular:</b> daşınan və ya stasionar, ən sadə logistika.</li>
          <li><b>Stasionar dəniz platformasından qazma:</b> platformada quraşdırılmış qurğu ilə çoxlu quyu qazılır.</li>
          <li><b>Jack-up:</b> dayaz suda dəniz dibinə dayanan ayaqlı üzən platforma.</li>
          <li><b>Semi-submersible və drillship:</b> dərin suda üzən qurğular. Dalğa hərəkətini kompensasiya edən sistemlər və subsea BOP istifadə olunur.</li>
        </ul>
        <p>Xəzər kimi dəniz hövzələrində su dərinliyindən asılı olaraq bu tiplərin bir neçəsi birlikdə istifadə olunur.</p>
      </Block>

      <Block n={3} title="Qaldırma sistemi və block & tackle">
        <p>
          Drilling line crown block ilə traveling block arasında çoxsaylı sap kimi keçirilir. Yük N xətt arasında bölünür, drawworks isə yalnız
          <b> fast line</b> ucunu sarıyır. Dead line sabit ankerlənir.
        </p>
        <Formula>{`E = (K^N − 1) / (N · K^N · (K − 1))        K ≈ 1.04
F_fast   = W / (E · N)
F_dead   = W / N
F_derrick = W + F_fast + F_dead
HP_drawworks = W · v / (33,000 · E)`}</Formula>
        {student && <Why>N artdıqca fast line yükü azalır (drilling line daha az gərilir), amma hər sheave sürtünmə əlavə edir, ona görə E aşağı düşür. Praktikada kompromis seçilir.</Why>}
        <Warn>Derrick yükünü hook load ilə eyniləşdirmək. Derrick fast və dead line yüklərini də daşıyır.</Warn>
        <Field>Drilling line yorğunluğu ton-mile ilə izlənir. Cədvələ uyğun olaraq xətt kəsilib sürüşdürülür (slip and cut), beləliklə yük həmişə eyni nöqtələrə düşmür.</Field>
      </Block>

      <Block n={4} title="Fırlanma sistemi">
        <p>
          <b>Top drive</b> drill string-i birbaşa yuxarıdan fırladır və stand (təxminən 90 ft, 3 boru) ilə qazmağa imkan verir. Köhnə sistemdə
          <b> rotary table + kelly</b> istifadə olunur, qazma tək boru uzunluğu ilə gedir və bağlantılar çox olur.
        </p>
        <p>Drill string yuxarıdan aşağı: swivel/top drive, drill pipe, HWDP, drill collars, bit. Hər komponentin yükü və dizaynı 5-ci bölmənin mövzusudur.</p>
      </Block>

      <Block n={5} title="Sirkulyasiya sistemi">
        <p>
          Triplex nasoslar məhlulu standpipe və rotary hose ilə top drive-a, oradan string-in içi ilə bit-ə vurur. Məhlul halqa ilə şlamla qalxır,
          flowline ilə shale shaker-ə gedir, qaz və qalıq bərk hissəciklərdən təmizlənib çənə qayıdır.
        </p>
        <Formula>{`bbl/strok = 0.000243 · D² · L · Ev          (triplex, D və L in)
Q [gpm]   = bbl/strok · 42 · SPM
HHP       = P [psi] · Q [gpm] / 1714
AV [ft/dəq] = 24.51 · Q / (Dh² − Dp²)
t_bottoms-up = V_halqa [bbl] / (Q / 42)`}</Formula>
        {student && <Why>Halqada sürət kifayət qədər yüksək olmalıdır ki, şlam yuxarı daşınsın. Çox yüksək olarsa, halqa təzyiq itkisi (ECD) artır və formasiya zəif olarsa itki baş verə bilər. Bu balans 4-cü bölmədə (Hidravlika) dərinləşir.</Why>}
        <Warn>Nasos çıxışını səmərəlilik (Ev) nəzərə almadan 100% qəbul etmək. Real nasos həmişə nəzəri çıxışdan azdır.</Warn>
        <Field>Trip zamanı trip tank-dan istifadə olunur: çıxarılan boru həcmi qədər məhlul quyuya qayıtmalıdır. Uyğunsuzluq kick və ya itki əlamətidir.</Field>
      </Block>

      <Block n={6} title="Quyu nəzarəti avadanlığı">
        <p>
          <b>BOP stack</b> quyu başlığında quraşdırılır: yuxarıda annular preventer, aşağıda pipe ram-lar və blind/shear ram. Yan çıxışlardan choke və kill xətləri
          keçir, onlar choke manifold-a qoşulur. Hamısı <b>akkumulyator</b> (Koomey) vasitəsilə hidravlik təzyiqlə idarə olunur ki, elektrik olmasa da bağlana bilsin.
        </p>
        <Formula>{`V_usable = V_balon · (P_pre/P_min − P_pre/P_max)
tipik:  P_pre = 1,000 psi,  P_max = 3,000 psi,  P_min = 1,200 psi  →  ≈ 0.5 · V_balon`}</Formula>
        {student && <Why>Balonda azot qazı var, mayeni sıxdıqca qaz kiçilir (Boyle qanunu). Minimum iş təzyiqindən aşağı düşəndə mayenin qalan hissəsi BOP-u idarə etmək üçün kifayət etmir, buna görə balonun yalnız yarısı istifadə oluna bilir.</Why>}
        <Field>BOP və akkumulyator şirkət və tənzimləyici tələblərə uyğun müntəzəm test olunur. Test nəticələri qeydə alınır.</Field>
      </Block>

      <Block n={7} title="Monitorinq və qazma dövrü">
        <p>
          Driller kabinasında weight indicator, standpipe təzyiqi, SPM, torque, ROP, PVT və flow-out göstəricilərini izləyir. Bu göstəricilər problemlərin ilk əlamətidir:
          PVT artımı kick, azalması itki, standpipe təzyiqinin qəfil dəyişməsi isə nasos, bit və ya string problemini göstərə bilər.
        </p>
        <p><b>Tipik qazma dövrü:</b> qazma (make hole) → bağlantı (connection) → bottoms-up sirkulyasiya → trip out → casing endirmə → sementləmə → sementin bərkiməsi gözləmə → BOP test → növbəti bölməni qazma.</p>
      </Block>

      <Block n={8} title="Qurğuda kim nə edir?">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Driller:</b> drawworks və qazma parametrlərini idarə edir, göstəriciləri izləyir.</li>
          <li><b>Derrickman:</b> yuxarı platformada boru stand-larını tutur, məhlul çənlərinə nəzarət edir.</li>
          <li><b>Floorman (roughneck):</b> rig floor-da boru bağlantıları ilə işləyir.</li>
          <li><b>Toolpusher:</b> qurğunun əməliyyat rəhbəri.</li>
          <li><b>Drilling supervisor (company man):</b> operator şirkətin nümayəndəsi, əməliyyatın məsul rəhbəri.</li>
          <li><b>Mud engineer, mud logger, directional driller:</b> məhlul, geologiya/qaz göstəriciləri və trayektoriya üzrə mütəxəssislər.</li>
        </ul>
        <Field>Təhlükəsizlik prinsipi: hər kəs təhlükəli vəziyyətdə işi dayandırmaq hüququna (stop work authority) malikdir. Hoisting və fırlanan avadanlıq ətrafında sıxılma (pinch point) təhlükəlidir.</Field>
      </Block>
    </div>
  );
}
