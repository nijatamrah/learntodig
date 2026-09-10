"use client";
import Link from "next/link";

const PATH_COLOR = "#8B6F47";

const methodsComparison = [
  { method: "Outcrop Analizi", təsvir: "Süxur qatlarının səthə çıxdığı yerlərdə birbaşa müşahidə və ölçmə", üstünlük: "Ucuz, birbaşa fiziki nümunə", məhdudiyyət: "Yalnız səthə çıxan hissələr görünür" },
  { method: "Geoloji Xəritələşdirmə", təsvir: "Səth üzərində süxur növlərinin və strukturların sistemli sənədləşdirilməsi", üstünlük: "Geniş ərazini əhatə edir", məhdudiyyət: "Dərinlikdəki strukturu birbaşa göstərmir" },
  { method: "Struktur Ölçmələr (Dip/Strike)", təsvir: "Süxur qatlarının əyilmə istiqaməti və bucağının kompas və klinometrlə ölçülməsi", üstünlük: "Dərinlikdəki geometriyanı proqnozlaşdırmağa kömək edir", məhdudiyyət: "Ekstrapolyasiya xətası riski var" },
  { method: "Aerofotoşəkil / Peyk Analizi", təsvir: "Havadan və ya kosmosdan çəkilmiş görüntülərlə geniş struktur trendlərin izlənməsi", üstünlük: "Çox geniş ərazini tez əhatə edir", məhdudiyyət: "Vegetasiya və torpaq örtüyü strukturu gizlədə bilər" },
];

export default function SurfaceGeologyLesson() {
  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#080C18" }}>
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: PATH_COLOR, opacity: 0.14, filter: "blur(120px)" }}
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
          href="/learn/geology"
          className="inline-flex items-center gap-1.5 text-[12px] font-['Space_Grotesk'] mb-6"
          style={{ color: "#3D5570" }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Geologiya
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
              style={{ background: PATH_COLOR + "1E", color: PATH_COLOR }}
            >
              1.3.1
            </span>
            <span className="text-[11px] font-['Space_Grotesk']" style={{ color: "#3D5570" }}>
              Kəşfiyyat Metodları
            </span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-[1.9rem] font-bold leading-tight" style={{ color: "#F0F4FF" }}>
            Surface Geology <span style={{ color: "#F0F4FF" }}>(Səth Geologiyası)</span>
          </h1>
        </div>

        <article className="space-y-8 font-['Space_Grotesk']" style={{ color: "#C4CEE0" }}>

          {/* Creative intro: historical context hook */}
          <section>
            <h2 className="text-[15px] font-semibold mb-2" style={{ color: "#F0F4FF" }}>
              Niyə bu mövzu vacibdir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Seysmik texnologiya mövcud olmazdan çox əvvəl, XIX əsrin sonu və XX əsrin əvvəlində
              neft kəşfiyyatçılarının əlində yalnız bir alət var idi: öz gözləri və çəkici. Onlar
              dağ yamaclarında, çay yataqlarında və qaya çıxıntılarında süxur qatlarının necə
              əyildiyini müşahidə edir və bu məlumatdan dərinlikdəki strukturu təxmin etməyə
              çalışırdılar. Bu üsul bu gün də öz əhəmiyyətini itirməyib — 1.2.3-də öyrəndiyimiz
              petroleum system-in elementlərini qiymətləndirməzdən əvvəl, geoloqlar hələ də ilk
              addım kimi <strong>səth geologiyasına</strong> müraciət edirlər, çünki bu, ən ucuz və
              ən sürətli ilkin məlumat mənbəyidir.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              1. Səth geologiyası nədir?
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Səth geologiyası — yer səthində görünən süxur qatlarının, strukturların və
              landşaft xüsusiyyətlərinin sistemli şəkildə öyrənilməsi və sənədləşdirilməsi
              prosesidir. Bu metodun əsas fərziyyəsi ondan ibarətdir ki, səthdə müşahidə olunan
              struktur trendlər (məsələn, antiklinal qatlanmalar və ya fay xətləri) çox vaxt
              dərinlikdə davam edir. Buna görə səthi diqqətlə oxumaqla geoloqlar dərinlikdəki
              potensial tələ strukturları haqqında ilkin fərziyyələr qura bilirlər — hələ heç bir
              baha başa gələn seysmik və ya qazıma işi aparılmadan.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              2. Outcrop analizi
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Outcrop — süxur qatının torpaq və bitki örtüyü olmadan birbaşa səthə çıxdığı yerdir
              (məsələn, dağ yamacı, kanyon divarı və ya çay yatağı). Geoloqlar bu yerlərdə süxurun
              növünü, qalınlığını, rəngini, dənə ölçüsünü və çöküntü strukturlarını birbaşa əllə
              toxunaraq və müşahidə edərək təhlil edirlər. Outcrop analizi xüsusilə dəyərlidir,
              çünki o, laboratoriya şəraitindən kənarda, süxurun təbii kontekstində real fiziki
              məlumat verir — bu, sonradan quyu nümunələri ilə müqayisə üçün əsas rol oynayır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              3. Geoloji xəritələşdirmə
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Geoloji xəritələşdirmə — bir ərazidəki bütün müşahidə olunan süxur növlərinin,
              sərhədlərin və struktur elementlərin (qatlanmalar, faylar) topoqrafik xəritə üzərində
              sistemli şəkildə qeyd edilməsi prosesidir. Bu proses adətən çoxsaylı outcrop
              müşahidələrinin bir araya gətirilməsi ilə aparılır və nəticədə regional struktur
              şəkil ortaya çıxır. Məsələn, əgər bir neçə outcrop-da eyni süxur qatının tədricən
              yuxarı əyildiyi görünürsə, bu, altında bir antiklinal strukturun ola biləcəyinə
              işarə edə bilər.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              4. Struktur ölçmələr: Dip və Strike
            </h2>
            <p className="text-[14px] leading-[1.75]">
              Səth geologiyasının ən texniki hissəsi <strong>dip və strike</strong> ölçmələridir.
              Strike — süxur qatının üfüqi müstəvi ilə kəsişdiyi xəttin istiqaməti (kompas
              istiqaməti), dip isə həmin qatın üfüqi müstəviyə nisbətən nə qədər bucaq altında
              əyildiyidir. Bu iki ölçü birlikdə geoloqa süxur qatının fəzada necə yerləşdiyini —
              yəni onun dərinlikdə hansı istiqamətə doğru davam edəcəyini — riyazi şəkildə
              proqnozlaşdırmağa imkan verir. Kompas-klinometr adlanan sadə alətlə aparılan bu
              ölçmələr indi də struktur geologiyanın əsasını təşkil edir.
            </p>
          </section>

          {/* Creative element: warning callout */}
          <section
            className="rounded-2xl px-5 py-4"
            style={{ background: "#D8823B14", border: "1px solid #D8823B40" }}
          >
            <h2 className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: "#D8823B" }}>
              Diqqət et
            </h2>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "#D6E0F0" }}>
              Səth geologiyasının ciddi bir məhdudiyyəti var: o, yalnız səthə yaxın strukturları
              birbaşa göstərir və dərinlikdə (adətən 1,000 m-dən dərin) baş verən dəyişiklikləri —
              məsələn, gizli faylanmanı və ya stratiqrafik pinch-out-u — aşkar edə bilmir. Ona görə
              səth geologiyası heç vaxt tək başına kəşfiyyat qərarı üçün kifayət hesab olunmur —
              o, yalnız 1.3.2-də öyrənəcəyimiz seysmik kəşfiyyatın hara yönəldiləcəyini müəyyən
              edən ilkin, ucuz "yol göstərici" rolunu oynayır.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              5. Səth kəşfiyyat metodlarının müqayisəsi
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Metod</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Təsvir</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Üstünlük</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "#F0F4FF" }}>Məhdudiyyət</th>
                  </tr>
                </thead>
                <tbody>
                  {methodsComparison.map((m) => (
                    <tr key={m.method} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="px-3 py-2 font-mono" style={{ color: PATH_COLOR }}>{m.method}</td>
                      <td className="px-3 py-2" style={{ color: "#C4CEE0" }}>{m.təsvir}</td>
                      <td className="px-3 py-2" style={{ color: "#9FAEC4" }}>{m.üstünlük}</td>
                      <td className="px-3 py-2" style={{ color: "#9FAEC4" }}>{m.məhdudiyyət}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              6. Hesablama — Dip bucağından dərinlik proqnozu
            </h2>
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[13px] mb-2" style={{ color: "#6B82A0" }}>
                Verilənlər: outcrop-da ölçülmüş dip bucağı = 15°, outcrop nöqtəsindən üfüqi
                məsafə = 2,000 m (qatın izlənəcəyi istiqamətdə)
              </p>
              <p className="text-[14px] font-mono mb-3" style={{ color: "#F0F4FF" }}>
                Dərinlik dəyişimi = Üfüqi məsafə × tan(dip bucağı)
              </p>
              <div className="space-y-1.5 text-[13.5px] font-mono" style={{ color: "#D6E0F0" }}>
                <p>Dərinlik dəyişimi = 2,000 m × tan(15°)</p>
                <p>Dərinlik dəyişimi = 2,000 × 0.268 ≈ <span style={{ color: PATH_COLOR }}>536 m</span></p>
              </div>
              <p className="text-[13.5px] leading-[1.7] mt-3" style={{ color: "#C4CEE0" }}>
                Nəticə: əgər outcrop-da müşahidə edilən süxur qatı 15° bucaq altında əyilirsə,
                bu qat outcrop nöqtəsindən 2 km məsafədə təxminən 536 m daha dərində yerləşəcək.
                Bu sadə triqonometrik hesablama geoloqlara səth məlumatından istifadə edərək
                yaxınlıqdakı bir kəşfiyyat quyusunun hansı dərinlikdə hədəf qatına çatacağını
                təxmin etməyə kömək edir — baxmayaraq ki, real geoloji şərait nadir hallarda bu
                qədər sadə xətti ola bilir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold mb-3" style={{ color: "#F0F4FF" }}>
              7. Real field nümunələri
            </h2>
            <div className="space-y-3">
              {[
                { name: "Zaqros Dağları, İran/İraq", text: "Dünyanın ən klassik outcrop-əsaslı struktur geologiya nümunələrindən biri — səthdə görünən nəhəng antiklinal qatlanmalar birbaşa altındakı böyük neft yataqlarının (məsələn, Kirkuk) mövcudluğuna işarə edib." },
                { name: "Big Horn Basin, Wyoming, ABŞ", text: "XX əsrin əvvəllərində geoloqlar səthdəki qatlanma strukturlarını xəritələşdirərək bölgənin ilk uğurlu neft kəşfiyyatı quyularının yerini müəyyən ediblər." },
                { name: "Qobustan, Azərbaycan", text: "Bölgədəki palçıq vulkanları və səthə çıxan struktur elementlər Cənubi Xəzər hövzəsinin dərinlikdəki tektonik fəallığı və potensial trap zonaları haqqında dəyərli səth göstəriciləri təqdim edir." },
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
              <li>• Səth geologiyası outcrop analizi, xəritələşdirmə və struktur ölçmələr vasitəsilə dərinlikdəki strukturları proqnozlaşdırmağa çalışır</li>
              <li>• Dip və strike ölçmələri süxur qatının fəzada necə yerləşdiyini riyazi şəkildə təxmin etməyə imkan verir</li>
              <li>• Bu metodun əsas məhdudiyyəti dərinlikdəki gizli strukturları (fay, pinch-out) aşkar edə bilməməsidir</li>
              <li>• Səth geologiyası müstəqil qərar aləti deyil — o, seysmik kəşfiyyatın hədəflərini müəyyən edən ilkin addımdır</li>
            </ul>
          </section>
        </article>

        <div className="mt-10 flex justify-between items-center">
          <Link
            href="/learn/geology/petroleum-system"
            className="text-[13px] font-['Space_Grotesk']"
            style={{ color: "#3D5570" }}
          >
            ← Petroleum System
          </Link>
          <Link
            href="/learn/geology/seismic-survey"
            className="flex items-center gap-1.5 text-[13px] font-['Space_Grotesk'] px-4 py-2 rounded-xl"
            style={{ background: PATH_COLOR + "1E", color: PATH_COLOR, border: `1px solid ${PATH_COLOR}44` }}
          >
            Növbəti: Seysmik Kəşfiyyat
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}