import Link from "next/link";

const steps = [
  "Dərslər bölməsindən səviyyəni seç — Başlanğıc, Orta və ya İrəli",
  "Mövzu seç — Geologiya, Drilling, Rezervuar, Quyu Loqları və ya Hasilat",
  "Dərsi oxu, quizlə yoxla, anlamadığını AI-dan sor",
  "Modullar bölməsindən real parametrlərlə simulyasiya et",
  "Azərbaycan yataqları, Industry Map və Tools bölmələrini kəşf et",
];

const features = [
  { icon: "📚", text: "Səviyyə və mövzuya görə strukturlaşdırılmış dərslər" },
  { icon: "🎯", text: "Hər dərsin sonunda bilikləri yoxlayan quiz" },
  { icon: "🤖", text: "Mövzu üzrə AI ilə sual-cavab" },
  { icon: "⚙️", text: "6 simulyator — Well Log, Prosper, Petrel, Eclipse, Drilling, Geologiya" },
  { icon: "📂", text: "LAS fayl yükləmə və quyu loq analizi" },
  { icon: "🗺️", text: "Azərbaycan yataqları — Günəşli, Çıraq, Azəri, Şahdəniz" },
  { icon: "🏭", text: "Industry Map — karyera yolları, vəzifələr, maaşlar" },
  { icon: "🔥", text: "Günlük qazma — streak sistemi ilə davamlılıq" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: "#080C18" }}>
      <div className="max-w-2xl mx-auto px-6 py-12">

        <div className="mb-10">
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase font-mono mb-2" style={{ color: "#FF6B2B" }}>
            {`// platforma`}
          </p>
          <h1 className="font-['Space_Grotesk'] text-[2.2rem] font-bold leading-tight mb-2" style={{ color: "#F0F4FF" }}>
            LearntoDig
          </h1>
          <p className="text-[14px] font-['Space_Grotesk']" style={{ color: "#6B82A0" }}>
            Neft-qaz sahəsi üçün interaktiv öyrənmə platforması
          </p>
        </div>

        <div className="space-y-3">

          <div
            className="rounded-2xl p-6"
            style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h2 className="text-[14px] font-semibold font-['Space_Grotesk'] mb-3" style={{ color: "#F0F4FF" }}>
              💡 Niyə yarandı?
            </h2>
            <p className="text-[13px] font-['Space_Grotesk'] leading-relaxed" style={{ color: "#6B82A0" }}>
              Neft-qaz mühəndisliyini öyrənmək çətindir — mövzular mürəkkəbdir, resurslar ya çox texniki,
              ya da çox səthi olur. Tələbələr nəzəriyyəni oxuyur, lakin praktiki hiss qazana bilmir.
              LearntoDig bu boşluğu doldurmaq üçün yaradılıb: simulyatorlar, real ssenari əsaslı dərslər
              və AI dəstəyi ilə öyrənmə prosesi daha effektiv və maraqlı olur.
            </p>
          </div>

          <div
            className="rounded-2xl p-6"
            style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h2 className="text-[14px] font-semibold font-['Space_Grotesk'] mb-4" style={{ color: "#F0F4FF" }}>
              🚀 Necə istifadə edilir?
            </h2>
            <ul className="space-y-3">
              {steps.map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold font-mono mt-0.5"
                    style={{
                      background: "rgba(255,107,43,0.15)",
                      border: "1px solid rgba(255,107,43,0.3)",
                      color: "#FF6B2B",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[13px] font-['Space_Grotesk'] leading-relaxed" style={{ color: "#6B82A0" }}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-2xl p-6"
            style={{ background: "#0D1525", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h2 className="text-[14px] font-semibold font-['Space_Grotesk'] mb-4" style={{ color: "#F0F4FF" }}>
              ⚙️ Nə imkanlar var?
            </h2>
            <ul className="space-y-2.5">
              {features.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[14px] flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[13px] font-['Space_Grotesk']" style={{ color: "#6B82A0" }}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-2xl p-6"
            style={{ background: "#0D1525", border: "1px solid rgba(255,107,43,0.12)" }}
          >
            <h2 className="text-[14px] font-semibold font-['Space_Grotesk'] mb-3" style={{ color: "#F0F4FF" }}>
              🔮 Gələcək perspektivlər
            </h2>
            <p className="text-[13px] font-['Space_Grotesk'] leading-relaxed" style={{ color: "#6B82A0" }}>
              Yeni mövzular və dərslər davamlı əlavə ediləcək. Gələcəkdə tərəqqi izləmə,
              liderlik cədvəli və sertifikat sistemi planlaşdırılır.
              Məqsəd — neft-qaz sahəsi üçün tam öyrənmə ekosistemi yaratmaqdır.
            </p>
          </div>

        </div>

        <div className="mt-8 flex gap-3">
          <Link
            href="/lessons"
            className="rounded-xl px-6 py-3 text-[13px] font-bold font-['Space_Grotesk'] text-white transition-all hover:-translate-y-0.5"
            style={{ background: "#FF6B2B" }}
          >
            Dərslərə başla →
          </Link>
          <Link
            href="/modules"
            className="rounded-xl px-6 py-3 text-[13px] font-medium font-['Space_Grotesk'] transition-all hover:-translate-y-0.5"
            style={{
              background: "#0D1525",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "#6B82A0",
            }}
          >
            Modullara bax
          </Link>
        </div>

      </div>
    </main>
  );
}