import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-16">
      <div className="max-w-2xl w-full">

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          LearntoDig haqqında
        </h1>
        <p className="mt-3 text-slate-500 leading-relaxed">
          Neft-qaz sahəsi üçün interaktiv öyrənmə platformu
        </p>

        <div className="mt-10 space-y-8">

          <div>
            <h2 className="text-lg font-semibold text-slate-800">Niyə yarandı?</h2>
            <p className="mt-2 text-slate-600 leading-relaxed">
              Neft-qaz mühəndisliyini öyrənmək çətindir — mövzular mürəkkəbdir,
              resurslar ya çox texniki, ya da çox səthi olur. Tələbələr nəzəriyyəni
              oxuyur, lakin praktiki hiss qazana bilmir. LearntoDig bu boşluğu
              doldurmaq üçün yaradılıb: simulyatorlar, real ssenari əsaslı dərslər
              və AI dəstəyi ilə öyrənmə prosesi daha effektiv və maraqlı olur.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">Məqsəd nədir?</h2>
            <p className="mt-2 text-slate-600 leading-relaxed">
              Neft-qaz sahəsinin hər bir tələbəsi və mütəxəssisi üçün — səviyyəsindən
              asılı olmayaraq — öyrənməyi əlçatan etmək. Başlanğıcdan irəli səviyyəyə
              qədər strukturlaşdırılmış yol, hər addımda praktiki məşq və anlık AI
              izahat imkanı.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">Necə istifadə edilir?</h2>
            <ul className="mt-3 space-y-3">
              {[
                { step: "1", text: "Dərslər bölməsindən səviyyəni seç — Başlanğıc, Orta və ya İrəli" },
                { step: "2", text: "Mövzu seç — Geologiya, Drilling, Rezervuar, Quyu Loqları və ya Hasilat" },
                { step: "3", text: "Dərsi oxu, quizlə yoxla, anlamadığını AI-dan sor" },
                { step: "4", text: "Modullar bölməsindən real parametrlərlə simulyasiya et" },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-semibold text-teal-700">
                    {item.step}
                  </span>
                  <span className="mt-0.5">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">Nə imkanlar var?</h2>
            <ul className="mt-3 space-y-2">
              {[
                { icon: "📚", text: "Səviyyə və mövzuya görə strukturlaşdırılmış dərslər" },
                { icon: "🎯", text: "Hər dərsin sonunda bilikləri yoxlayan quiz" },
                { icon: "🤖", text: "Mövzu üzrə AI ilə sual-cavab" },
                { icon: "⚙️", text: "Well Log, Prosper, Petrel, Eclipse, Drilling simulyatorları" },
                { icon: "📂", text: "LAS fayl yükləmə və quyu loq analizi" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">Gələcək perspektivlər</h2>
            <p className="mt-2 text-slate-600 leading-relaxed">
              Yeni mövzular və dərslər davamlı əlavə ediləcək. Gələcəkdə istifadəçi
              qeydiyyatı, tərəqqi izləmə, liderlik cədvəli və sertifikat sistemi
              planlaşdırılır. Məqsəd — neft-qaz sahəsi üçün tam öyrənmə ekosistemi
              yaratmaqdır.
            </p>
          </div>

        </div>

        <div className="mt-12 flex gap-4">
          <Link
            href="/lessons"
            className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-medium text-white hover:bg-teal-700 transition"
          >
            Dərslərə başla
          </Link>
          <Link
            href="/modules"
            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 hover:border-slate-300 transition"
          >
            Modullara bax
          </Link>
        </div>

      </div>
    </main>
  );
}