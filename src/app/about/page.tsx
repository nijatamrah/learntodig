import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition mb-10"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Ana səhifə
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          Haqqında
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-3">LearntoDig</h1>
        <p className="text-gray-400 text-lg mb-12">Neft-qaz sahəsi üçün interaktiv öyrənmə platforması</p>

        <div className="space-y-10">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-white mb-3">💡 Niyə yarandı?</h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              Neft-qaz mühəndisliyini öyrənmək çətindir — mövzular mürəkkəbdir,
              resurslar ya çox texniki, ya da çox səthi olur. Tələbələr nəzəriyyəni
              oxuyur, lakin praktiki hiss qazana bilmir. LearntoDig bu boşluğu
              doldurmaq üçün yaradılıb: simulyatorlar, real ssenari əsaslı dərslər
              və AI dəstəyi ilə öyrənmə prosesi daha effektiv və maraqlı olur.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-white mb-3">🎯 Məqsəd nədir?</h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              Neft-qaz sahəsinin hər bir tələbəsi və mütəxəssisi üçün — səviyyəsindən
              asılı olmayaraq — öyrənməyi əlçatan etmək. Başlanğıcdan irəli səviyyəyə
              qədər strukturlaşdırılmış yol, hər addımda praktiki məşq və anlık AI
              izahat imkanı.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-white mb-4">🚀 Necə istifadə edilir?</h2>
            <ul className="space-y-3">
              {[
                { step: "1", text: "Dərslər bölməsindən səviyyəni seç — Başlanğıc, Orta və ya İrəli" },
                { step: "2", text: "Mövzu seç — Geologiya, Drilling, Rezervuar, Quyu Loqları və ya Hasilat" },
                { step: "3", text: "Dərsi oxu, quizlə yoxla, anlamadığını AI-dan sor" },
                { step: "4", text: "Modullar bölməsindən real parametrlərlə simulyasiya et" },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/20 border border-orange-500/30 text-xs font-semibold text-orange-400">
                    {item.step}
                  </span>
                  <span className="mt-0.5">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-white mb-4">⚙️ Nə imkanlar var?</h2>
            <ul className="space-y-2.5">
              {[
                { icon: "📚", text: "Səviyyə və mövzuya görə strukturlaşdırılmış dərslər" },
                { icon: "🎯", text: "Hər dərsin sonunda bilikləri yoxlayan quiz" },
                { icon: "🤖", text: "Mövzu üzrə AI ilə sual-cavab" },
                { icon: "⚙️", text: "Well Log, Prosper, Petrel, Eclipse, Drilling simulyatorları" },
                { icon: "📂", text: "LAS fayl yükləmə və quyu loq analizi" },
                { icon: "🛢️", text: "Azərbaycan yataqları — Günəşli, Çıraq, Azəri, Neft Daşları, Şahdəniz" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-gray-400">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-white mb-3">🔮 Gələcək perspektivlər</h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              Yeni mövzular və dərslər davamlı əlavə ediləcək. Gələcəkdə istifadəçi
              qeydiyyatı, tərəqqi izləmə, liderlik cədvəli və sertifikat sistemi
              planlaşdırılır. Məqsəd — neft-qaz sahəsi üçün tam öyrənmə ekosistemi
              yaratmaqdır.
            </p>
          </div>

        </div>

        <div className="mt-10 flex gap-3">
          <Link
            href="/lessons"
            className="rounded-xl bg-[#FF6B2B] px-6 py-3 text-sm font-semibold text-white hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(255,107,43,0.35)] transition-all"
          >
            Dərslərə başla →
          </Link>
          <Link
            href="/modules"
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all"
          >
            Modullara bax
          </Link>
        </div>

      </div>
    </main>
  );
}