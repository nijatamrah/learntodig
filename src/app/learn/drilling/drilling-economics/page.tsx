"use client";
import Link from "next/link";

const PATH_COLOR = "#FF6B2B";

const costDrivers = [
  { name: "Rig Day Rate", share: "35-45%", detail: "Rig, heyət və əsas avadanlığın gündəlik icarə haqqı — quyunun neçə gündə tamamlanacağından asılı olaraq ən böyük xərc bloku" },
  { name: "NPT (Non-Productive Time)", share: "10-25%", detail: "Stuck pipe (2.5.1), kick nəzarəti (2.5.2), avadanlıq nasazlığı kimi planlaşdırılmamış gecikmələr — büdcəni ən çox aşan kateqoriya" },
  { name: "Casing & Cementing", share: "10-15%", detail: "Boru materialı (2.2.1) və sement xidməti (2.2.2) — quyunun dərinliyi və casing proqramı ilə birbaşa mütənasib" },
  { name: "Mud & Kimyəvi Maddələr", share: "8-12%", detail: "Drilling fluid sistemi (2.3.1) və LCM, kill mud kimi əlavə materiallar — problemli intervallarda kəskin artır" },
  { name: "Bit & Downhole Alətlər", share: "5-8%", detail: "Bit seçimi (2.1.4) və BHA komponentləri — ROP-un aşağı olması bu xərci dolayı yolla artırır (daha çox rig vaxtı deməkdir)" },
  { name: "Logistika & Servis", share: "8-12%", detail: "Heliokopter/gəmi nəqliyyatı, third-party servis şirkətləri, offshore layihələrdə xüsusilə yüksək paya malikdir" },
];

const afeSteps = [
  { title: "Geoloji və Mühəndislik Planı", text: "Casing proqramı (2.2.1), mud dizaynı (2.3.1) və gözlənilən dərinlik profili əsasında ilkin texniki plan hazırlanır" },
  { title: "Xərc Qeydiyyatı (Line-Item Estimasiya)", text: "Hər kateqoriya (rig, casing, mud, servis) üzrə ayrı-ayrı xətlərlə təxmini xərc daxil edilir, adətən 10-15% ehtiyat (contingency) əlavə olunur" },
  { title: "Təsdiq Prosesi", text: "AFE sənədi maliyyə və texniki rəhbərlik tərəfindən nəzərdən keçirilir, layihənin iqtisadi əsaslandırılması təsdiqlənir" },
  { title: "İcra və İzləmə", text: "Qazma davam etdikcə faktiki xərc gündəlik olaraq büdcə ilə müqayisə edilir (AFE vs Actual), kənarlaşmalar dərhal işarələnir" },
  { title: "Yekun Hesabat (Well Cost Report)", text: "Quyu bitdikdən sonra faktiki xərclər təhlil edilir, gələcək quyular üçün öyrənilmiş dərslər (lessons learned) sənədləşdirilir" },
];

export default function DrillingEconomicsLesson() {
  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#080C18" }}>
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: PATH_COLOR, opacity: 0.16, filter: "blur(120px)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.08,
          backgroundImage: `
            linear-gradient(#F0F4FF 1px, transparent 1px),
            linear-gradient(90deg, #F0F4FF 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 100% 60% at 50% 0%, black 40%, transparent 90%)",
        }}
      />

      <div className="max-w-2xl mx-auto px-6 py-12 relative z-10">

        <Link
          href="/learn/drilling"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6"
          style={{ color: "#3D5570" }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Qazma
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
              style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
            >
              2.5.3
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Problemlər, Təhlükəsizlik və İqtisadiyyat
            </span>
            <span
              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase tracking-wide"
              style={{ background: "rgba(255,255,255,0.05)", color: "#6B82A0" }}
            >
              Son Dərs
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Qazma İqtisadiyyatı (Cost per Foot, AFE)
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Bir gecə $500,000 — rig heç yerə getmədən
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Offshore rig icarəsi gündə yüz minlərlə dollara başa gələ bilər — heç bir metr
              qazılmasa belə. Elə buna görə də sənayedə deyilən məşhur bir söz var: "time is
              the only enemy you can actually manage". İndiyə qədər gördüyümüz hər texniki
              qərar — bit seçimi (2.1.4), casing dizaynı (2.2.1), mud proqramı (2.3.1),
              directional planlaşdırma (2.4.1), stuck pipe və kick idarəetməsi (2.5.1, 2.5.2)
              — əslində bir-birinə bağlı iqtisadi qərarlar zənciridir. Bu son dərsdə bütün bu
              texniki bilikləri bir araya gətirərək, quyunun necə "dollar dilində" oxunduğunu
              öyrənəcəyik: Cost per Foot, AFE və NPT anlayışları ilə.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              1. Niyə "vaxt = pul" formulundan daha dəqiq ölçü lazımdır?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Sadə "vaxt = pul" məntiqi doğrudur, amma mühəndisə qərar qəbul etmək üçün kifayət
              etmir — çünki iki fərqli quyu eyni müddətdə tamamlana bilər, amma biri 5,000 ft,
              digəri 12,000 ft qazıla bilər. Buna görə sənaye vahid ölçü olaraq Cost per Foot
              (CPF) — hər ayaq (foot) qazılan dərinliyə düşən orta xərc — göstəricisini istifadə
              edir. Bu göstərici həm fərqli quyuları müqayisə etməyə, həm də eyni sahədə
              zamanla əldə edilən effektivlik artımını (learning curve) ölçməyə imkan verir.
              CPF nə qədər aşağıdırsa, əməliyyat bir o qədər səmərəlidir — amma bu, təhlükəsizlik
              hesabına əldə edilməməlidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Xərc Strukturu — pul harada xərclənir?
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Tipik bir dəniz quyusunun ümumi büdcəsi bir neçə əsas kateqoriyaya bölünür. Aşağıdakı
              paylar orta sənaye praktikasına əsasən yaklaşık göstəricilərdir və layihədən
              layihəyə fərqlənə bilər:
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Kateqoriya</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Büdcə Payı</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>İzah</th>
                  </tr>
                </thead>
                <tbody>
                  {costDrivers.map((c) => (
                    <tr key={c.name} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 align-top font-medium" style={{ color: "#E8DCC8" }}>{c.name}</td>
                      <td className="px-3 py-2 align-top font-mono" style={{ color: PATH_COLOR }}>{c.share}</td>
                      <td className="px-3 py-2 align-top" style={{ color: "#9FAEC4" }}>{c.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[14px] leading-[1.75] mt-3">
              Diqqət yetirin ki, NPT — yəni planlaşdırılmamış problemlər — büdcənin ən dəyişkən
              hissəsidir. Yaxşı planlaşdırılmış, problemsiz quyuda bu pay 5%-ə qədər enə bilər,
              amma ciddi stuck pipe və ya kick hadisəsi olan quyuda 30%-i belə keçə bilər.
            </p>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#E8B33D14", border: "1px solid #E8B33D40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#E8B33D" }}>
              Təhlükəsizlik xəbərdarlığı
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Büdcə təzyiqi altında ən təhlükəli qərarlardan biri prosedur addımlarını
              "sürətləndirmək" cəhdidir — məsələn BOP test müddətini qısaltmaq və ya casing
              sementləmə gözləmə vaxtını (WOC — wait on cement) azaltmaq. Bu tip qısayollar
              qısamüddətli xərc qənaəti kimi görünsə də, uğursuzluq halında yaranan NPT və
              təmir xərci ilkin qənaəti dəfələrlə üstələyir — Macondo hadisəsi (2.5.2-də qeyd
              edildi) məhz bu cür təzyiq altında verilən qərarların nə qədər bahalı ola
              biləcəyinin ən ağır nümunəsidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              3. AFE — quyunun "biznes planı"
            </h2>
            <p className="text-[14px] leading-[1.75]">
              AFE (Authorization for Expenditure) — quyu qazılmadan əvvəl hazırlanan, bütün
              gözlənilən xərcləri təfərrüatlı şəkildə əks etdirən rəsmi sənəddir. O, sadəcə
              mühasibat sənədi deyil — mühəndislik planının maliyyə dilinə tərcüməsidir. AFE-də
              hər bir xətt (rig, casing, mud, servis, contingency) ayrıca göstərilir ki, layihə
              rəhbərliyi investisiyanın həcmini və riskini əvvəlcədən dəyərləndirə bilsin. Faktiki
              xərc AFE-dən əhəmiyyətli dərəcədə (adətən 10-20%-dən çox) yayınarsa, bu, "AFE
              overrun" adlanır və əlavə təsdiq tələb edir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. AFE Prosesi — addım-addım
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              Bir quyunun büdcə həyat dövrü beş əsas mərhələdən keçir:
            </p>
            <ol className="space-y-2 text-[13.5px] leading-[1.7]" style={{ color: "#C4CEE0" }}>
              {afeSteps.map((s, i) => (
                <li key={s.title}>
                  <span style={{ color: PATH_COLOR, fontWeight: 600 }}>{i + 1}.</span>{" "}
                  <span style={{ color: "#E8DCC8", fontWeight: 600 }}>{s.title}</span> — {s.text}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              5. Learning Curve — niyə eyni sahədə hər quyu ucuzlaşır?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Eyni sahədə ardıcıl qazılan quyularda operatorlar tez-tez "learning curve"
              effektini müşahidə edir — hər növbəti quyu adətən əvvəlkindən daha az vaxt aparır.
              Bunun səbəbi sadədir: heyət formasiya xüsusiyyətlərini (məs. hansı intervalda
              lost circulation riski var, hansı zonada torque artır — 2.4.2) artıq tanıyır,
              bit seçimi (2.1.4) optimallaşdırılır, və təkrarlanan əməliyyatlarda komanda işi
              sürətlənir. Pad drilling (bir platformadan çoxlu quyu qazılması) tətbiqində bu
              effekt xüsusilə güclüdür, çünki rig-in yerdəyişməsinə sərf olunan vaxt da minimuma
              enir.
            </p>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#E8B33D14", border: "1px solid #E8B33D40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#E8B33D" }}>
              Təhlükəsizlik xəbərdarlığı
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Learning curve-dən sürət qazanmaq məqsədilə eyni sahədə ardıcıl quyularda
              təhlükəsizlik yoxlamalarının (məs. flow-check tezliyi, BOP funksiya testləri)
              "artıq lazım deyil" düşüncəsi ilə azaldılması təhlükəli presedentdir. Hər quyunun
              öz unikal geoloji riski (məs. gözlənilməz yüksək təzyiqli cib) ola bilər — sürət
              artımı yalnız təkrarlanan, sınanmış proseslərə aid olmalı, heç vaxt monitorinq və
              yoxlama addımlarının ixtisar edilməsinə səbəb olmamalıdır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — Cost per Foot
            </h2>
            <p className="text-[14px] leading-[1.75] mb-3">
              2.5.1 və 2.5.2-dəki nümunə quyumuzu davam etdirək: TVD = 9,000 ft, rig day rate
              = $180,000/gün, quyu 22 gündə tamamlanıb (bundan 3 günü 2.5.2-dəki kick
              hadisəsinin idarə olunmasına sərf olunub), əlavə sabit xərclər (casing, sement,
              servis) = $1,450,000:
            </p>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: TVD = 9,000 ft, Rig Day Rate = $180,000/gün, Ümumi Müddət = 22 gün, Əlavə Sabit Xərclər = $1,450,000
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Rig Xərci = 180,000 × 22 = $3,960,000</p>
                <p>Ümumi Xərc = Rig Xərci + Sabit Xərclər = 3,960,000 + 1,450,000 = $5,410,000</p>
                <p>Cost per Foot = Ümumi Xərc / TVD = 5,410,000 / 9,000 = <span style={{ color: PATH_COLOR }}>≈ $601 / ft</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: bu quyu təxminən 601 dollar/ft-a başa gəlib. Diqqətəlayiq məqam budur ki,
                2.5.2-dəki 3 günlük kick idarəetməsi təkbaşına təxminən $540,000 (3 × 180,000)
                əlavə xərc yaradıb — bu, ümumi büdcənin təxminən 10%-i deməkdir. Əgər kick vaxtında
                aşkarlanıb daha sürətli idarə edilsəydi (məsələn 1 gündə), CPF təxminən $541/ft-a
                enərdi. Bu misal göstərir ki, düzgün well control təkcə təhlükəsizlik məsələsi
                deyil — birbaşa ölçülə bilən iqtisadi nəticəsi olan mühəndislik qərarıdır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Permian Basin, ABŞ", text: "Pad drilling və learning curve effektinin geniş tətbiqi nəticəsində bölgədə orta Cost per Foot göstəricisi son onillikdə əhəmiyyətli dərəcədə azalıb, bu da rig sayının azalmasına baxmayaraq istehsalın artmasına imkan verib." },
                { name: "ACG, Xəzər dənizi, Azərbaycan (BP)", text: "Offshore platformalarda logistika (helikopter, təchizat gəmiləri) və yüksək təzyiqli quyu kompleksliyi səbəbindən CPF adətən quru quyulardan xeyli yüksəkdir, buna görə AFE prosesində contingency payı adətən daha ehtiyatlı seçilir." },
                { name: "Şimal Dənizi, Norveç sektoru", text: "Sərt tənzimləyici tələblər və dərin su şəraiti səbəbindən NPT-nin minimuma endirilməsi üçün rəqəmsal monitorinq və real-time əməliyyat mərkəzləri (RTOC) geniş istifadə olunur, bu da xərc proqnozlaşdırmasının dəqiqliyini artırır." },
              ].map((f) => (
                <div key={f.name} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-[13.5px] font-semibold mb-1" style={{ color: "#E8DCC8" }}>{f.name}</p>
                  <p className="text-[13.5px] leading-[1.7]" style={{ color: "#9FAEC4" }}>{f.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: PATH_COLOR + "10", border: `1px solid ${PATH_COLOR}33` }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: PATH_COLOR }}>
              Əsas nöqtələr
            </h2>
            <ul className="space-y-1.5 text-[13.5px] leading-[1.6]" style={{ color: "#D6E0F0" }}>
              <li>• Cost per Foot fərqli quyuları müqayisə etmək və effektivliyi ölçmək üçün standart iqtisadi göstəricidir</li>
              <li>• Rig day rate büdcənin ən böyük hissəsini təşkil edir, NPT isə ən dəyişkən hissəsidir</li>
              <li>• AFE quyunun texniki planını rəsmi maliyyə sənədinə çevirən mərhələli prosesdir</li>
              <li>• Learning curve eyni sahədə ardıcıl quyuların ucuzlaşmasını izah edir, amma təhlükəsizlik yoxlamalarının ixtisarına səbəb olmamalıdır</li>
              <li>• Well control keyfiyyəti (2.5.2) birbaşa Cost per Foot göstəricisinə təsir edən ölçülə bilən iqtisadi amildir</li>
            </ul>
          </section>

          <section
            className="rounded-2xl px-6 py-6 text-center"
            style={{ background: `linear-gradient(135deg, ${PATH_COLOR}14, rgba(255,255,255,0.02))`, border: `1px solid ${PATH_COLOR}33` }}
          >
            <p className="text-[11px] font-mono uppercase tracking-wide mb-2" style={{ color: PATH_COLOR }}>
              Təbriklər
            </p>
            <p className="text-[14px] leading-[1.75]" style={{ color: "#D6E0F0" }}>
              Bununla Qazma (Drilling Engineering) path-ının bütün dərslərini tamamladınız —
              rotary sistemdən tutmuş, quyu konstruksiyası, hidravlika, directional drilling,
              problemlər və nəhayət iqtisadiyyata qədər. Bu bilik zənciri sizə real bir quyunu
              həm texniki, həm də maliyyə nöqteyi-nəzərindən oxumaq bacarığı verir.
            </p>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/drilling/well-control"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Quyu Nəzarəti
          </Link>
          <Link
            href="/learn/drilling"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Path Tamamlandı — Qazmaya Geri Dön
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}