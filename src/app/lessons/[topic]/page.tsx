"use client";
import { useState, use } from "react";
import Link from "next/link";
import ModuleBridge from "@/components/ModuleBridge";

const lessonData: Record<string, {
  title: string;
  icon: string;
  sections: { heading: string; body: string }[];
  quiz: { question: string; options: string[]; answer: number }[];
}> = {
  geology: {
    title: "Geologiya — Litologiya və Stratigrafiya",
    icon: "🪨",
    sections: [
      {
        heading: "Litologiya nədir?",
        body: "Litologiya süxurların tərkibini, strukturunu və xüsusiyyətlərini öyrənən elm sahəsidir. Neft-qaz mühəndisliyində litologiya quyu loqlarını şərh etmək və rezervuar xüsusiyyətlərini müəyyən etmək üçün əsasdır. Əsas süxur növləri: qumlu süxurlar (sandstone), karbonatlı süxurlar (limestone, dolomite) və gil süxurlar (shale).",
      },
      {
        heading: "Sandstone (Qumlu süxur)",
        body: "Sandstone neft-qaz üçün ən vacib rezervuar süxurudur. Yüksək məsaməlilik (15-35%) və keçiricilik xüsusiyyətlərinə malikdir. Dənəciklərin ölçüsü və sementləşmə dərəcəsi rezervuar keyfiyyətini müəyyən edir. Azərbaycanda Balaxanı və Sabunçu layları sandstone rezervuarlarına nümunədir.",
      },
      {
        heading: "Shale (Gil süxur)",
        body: "Shale çox aşağı məsaməlilik və keçiriciliyə malikdir. Neft-qaz sahəsində iki rolu var: mühafizəedici lay (cap rock) kimi nefti tutan seal funksiyası və mənbə lay (source rock) kimi üzvi maddə ehtiva edən lay. Kerogen adlanan üzvi maddə istilik təsiri altında neft və qaza çevrilir.",
      },
      {
        heading: "Stratigrafiya — layların ardıcıllığı",
        body: "Stratigrafiya süxur laylarının yaşını, ardıcıllığını və coğrafi yayılmasını öyrənir. Neft-qaz axtarışında stratigrafik korrelyasiya — eyni yaşlı layların müxtəlif quyularda müəyyən edilməsi — əsas metoddur. Azərbaycan üzrə Məhsuldar Qat (Productive Series) ən mühüm stratigrafik vahiddir.",
      },
      {
        heading: "Neft tələsi (Petroleum Trap)",
        body: "Neft tələsi neftin toplanmasına şərait yaradan geoloji strukturdur. 3 əsas komponenti var: rezervuar lay (nefti saxlayan məsaməli süxur), mühafizəedici lay (seal — keçirimsiz örtük) və tələ strukturu (anticline, fault trap və ya stratigrafik tələ). Azərbaycanda Neft Daşları antiklinal tələsin klassik nümunəsidir.",
      },
    ],
    quiz: [
      {
        question: "Hansı süxur növü neft-qaz üçün ən yaxşı rezervuar hesab olunur?",
        options: ["Shale", "Sandstone", "Granite", "Marble"],
        answer: 1,
      },
      {
        question: "Shale-in neft-qaz sahəsindəki əsas rolu nədir?",
        options: [
          "Yalnız rezervuar lay kimi",
          "Mühafizəedici lay (cap rock) və mənbə lay kimi",
          "Yalnız mənbə lay kimi",
          "Heç bir rolu yoxdur",
        ],
        answer: 1,
      },
      {
        question: "Stratigrafik korrelyasiya nə deməkdir?",
        options: [
          "Quyunun dərinliyini ölçmək",
          "Eyni yaşlı layları müxtəlif quyularda müəyyən etmək",
          "Neft hasilatını artırmaq",
          "Süxur nümunəsi götürmək",
        ],
        answer: 1,
      },
      {
        question: "Neft tələsinin 3 əsas komponenti hansılardır?",
        options: [
          "Quyu, nasos, boru",
          "Rezervuar lay, mühafizəedici lay, tələ strukturu",
          "Sandstone, shale, limestone",
          "Məsaməlilik, keçiricilik, doyma",
        ],
        answer: 1,
      },
    ],
  },
  drilling: {
    title: "Drilling — Qazıma Parametrləri və ROP",
    icon: "🔩",
    sections: [
      {
        heading: "Drilling (Qazıma) nədir?",
        body: "Qazıma — yeraltı neft və qaz yataqlarına çatmaq üçün gruntda quyu açma prosesidir. Müasir rotary qazıma sistemləri drill bit (qazıma ucu), drill string (qazıma sütunu) və drilling rig (qazıma qurğusu)-dan ibarətdir. Azərbaycanda offshore qazıma — Xəzər dənizində platformalardan aparılan qazıma — əsas üsuldur.",
      },
      {
        heading: "ROP — Rate of Penetration",
        body: "ROP (Rate of Penetration) — qazıma sürəti, yəni drill bit-in bir saat ərzində neçə metr qazıması deməkdir (m/saat). ROP nə qədər yüksək olsa, qazıma bir o qədər sürətli və ucuz olur. ROP-a təsir edən amillər: WOB (Weight on Bit), RPM (fırlanma sürəti), bit növü, süxur sərtliyi və drilling fluid keyfiyyəti.",
      },
      {
        heading: "WOB — Weight on Bit",
        body: "WOB (Weight on Bit) — drill bit üzərinə tətbiq edilən yük, tona ilə ölçülür. WOB artdıqca ROP artır, lakin həddindən artıq WOB drill string-in əyilməsinə və bit-in sınmasına səbəb ola bilər. Optimal WOB süxur növündən, bit ölçüsündən və dərinlikdən asılıdır. Tipik WOB dəyərləri: 5-25 ton arasında.",
      },
      {
        heading: "Drilling Fluid (Qazıma məhlulu)",
        body: "Drilling fluid (mud) qazıma prosesinin əsas elementidir. Əsas funksiyaları: süxur kəsintilərini (cuttings) səthə qaldırmaq, quyu divarını stabilləşdirmək, drill bit-i soyutmaq və formation təzyiqini balanslaşdırmaq. Mud density (sıxlıq) çox vacibdir — çox yüngül olsa blowout, çox ağır olsa formation zədələnməsi baş verər.",
      },
      {
        heading: "Qazıma problemləri",
        body: "Ən çox rast gəlinən problemlər: Stuck pipe — drill string-in quyuda ilişməsi; Lost circulation — drilling fluid-in formation-a hopur; Blowout — nəzarətsiz formation axını; Bit wear — bitin köhnəlməsi. Bu problemlərin vaxtında aşkar edilməsi üçün qazıma parametrlərinin real vaxt rejimində monitorinqi aparılır.",
      },
    ],
    quiz: [
      {
        question: "ROP nəyi ölçür?",
        options: [
          "Drill bit-in çəkisini",
          "Qazıma sürətini (m/saat)",
          "Drilling fluid-in sıxlığını",
          "Quyu dərinliyini",
        ],
        answer: 1,
      },
      {
        question: "WOB həddindən artıq olduqda nə baş verə bilər?",
        options: [
          "ROP azalır, heç bir problem olmur",
          "Drilling fluid hopur",
          "Drill string əyilə və bit sına bilər",
          "Blowout baş verər",
        ],
        answer: 2,
      },
      {
        question: "Drilling fluid-in əsas funksiyalarından biri hansıdır?",
        options: [
          "Elektrik enerjisi istehsal etmək",
          "Süxur kəsintilərini səthə qaldırmaq",
          "WOB-u artırmaq",
          "RPM-i azaltmaq",
        ],
        answer: 1,
      },
      {
        question: "Stuck pipe problemi nədir?",
        options: [
          "Drilling fluid-in çox ağır olması",
          "Bit-in köhnəlməsi",
          "Drill string-in quyuda ilişməsi",
          "Formation-dan qaz gəlməsi",
        ],
        answer: 2,
      },
    ],
  },
  reservoir: {
    title: "Rezervuar Mühəndisliyi — Məsaməlilik və Keçiricilik",
    icon: "🛢️",
    sections: [
      {
        heading: "Rezervuar nədir?",
        body: "Rezervuar — neft və ya qazı saxlayan məsaməli və keçirici süxur layıdır. Yaxşı rezervuar üçün 3 əsas şərt lazımdır: məsaməlilik (porosity) — nefti saxlamaq üçün boşluqlar, keçiricilik (permeability) — neftin axması üçün əlaqəli kanallar, və doyma (saturation) — məsamələrin nə qədərinin neftlə dolu olması. Azərbaycanda Çıraq və Günəşli yataqları əsas dəniz rezervuarlarıdır.",
      },
      {
        heading: "Porosity — Məsaməlilik",
        body: "Məsaməlilik süxurun ümumi həcminin neçə faizinin boşluqlardan ibarət olduğunu göstərir. Düstur: φ = (Boşluq həcmi / Ümumi həcm) × 100%. Tipik dəyərlər: sandstone üçün 15-35%, karbonatlı süxurlar üçün 5-25%. Effektiv məsaməlilik — bir-birinə bağlı boşluqların faizi — daha vacibdir, çünki yalnız bu boşluqlardan neft axır.",
      },
      {
        heading: "Permeability — Keçiricilik",
        body: "Keçiricilik süxurun maye və ya qazı ötürmə qabiliyyətidir, milidarcy (mD) vahidi ilə ölçülür. Darcy qanunu: Q = (k × A × ΔP) / (μ × L). Burada k — keçiricilik, A — kəsiş sahəsi, ΔP — təzyiq fərqi, μ — özlülük, L — uzunluqdur. Yaxşı rezervuar üçün k > 100 mD hesab olunur. Shale-in keçiriciliyi 0.001 mD-dən azdır.",
      },
      {
        heading: "Fluid Saturation — Doyma",
        body: "Doyma məsamələrin müəyyən mayerlə nə qədər dolu olduğunu göstərir. Sw (su doyması) + So (neft doyması) + Sg (qaz doyması) = 1 (100%). Irreducible water saturation (Swirr) — süxurda həmişə qalan minimal su miqdarıdır, bu su heç vaxt çıxarıla bilməz. Neft doyması nə qədər yüksək olsa, yataq bir o qədər perspektivlidir.",
      },
      {
        heading: "OOIP — Yataqda olan neftin miqdarı",
        body: "OOIP (Original Oil In Place) yataqda olan ümumi neft miqdarını göstərir. Düstur: OOIP = V × φ × (1 - Sw) / Boi. Burada V — rezervuar həcmi, φ — məsaməlilik, Sw — su doyması, Boi — neftin həcm faktoru. Lakin OOIP-in hamısı çıxarıla bilməz — Recovery Factor (bərpa əmsalı) adətən 20-50% arasındadır.",
      },
    ],
    quiz: [
      {
        question: "Məsaməlilik (porosity) nəyi ölçür?",
        options: [
          "Süxurun keçiricilik qabiliyyətini",
          "Süxur həcminin neçə faizinin boşluqlardan ibarət olduğunu",
          "Rezervuardakı neft miqdarını",
          "Su doymasını",
        ],
        answer: 1,
      },
      {
        question: "Keçiriciliyin ölçü vahidi nədir?",
        options: [
          "Faiz (%)",
          "Metr (m)",
          "Milidarcy (mD)",
          "Bar (bar)",
        ],
        answer: 2,
      },
      {
        question: "Sw + So + Sg = ?",
        options: [
          "0",
          "1 (100%)",
          "50%",
          "Dəyişkəndir",
        ],
        answer: 1,
      },
      {
        question: "Recovery Factor adətən hansı aralıqdadır?",
        options: [
          "1-5%",
          "50-80%",
          "20-50%",
          "80-100%",
        ],
        answer: 2,
      },
    ],
  },
  "well-log": {
    title: "Quyu Loqları — GR, Resistivity, Neutron-Density",
    icon: "⛽",
    sections: [
      {
        heading: "Well Logging nədir?",
        body: "Well logging — quyuda müxtəlif fiziki parametrləri ölçən alətlərin aşağı salınması və məlumat toplanması prosesidir. Loqlar formation-un litologiyasını, məsaməliliyini, keçiriciliyini və fluid növünü müəyyən etməyə kömək edir. Müasir LWD (Logging While Drilling) texnologiyası qazıma zamanı real vaxt rejimində loq məlumatı toplayır. LAS fayl formatı — loq məlumatlarının saxlandığı standart formatdır.",
      },
      {
        heading: "GR — Gamma Ray loqu",
        body: "GR loqu süxurun təbii radioaktivliyini ölçür, API vahidi ilə ifadə olunur. Şale (gil süxur) yüksək GR dəyəri göstərir (>75 API), sandstone və karbonatlı süxurlar aşağı GR dəyəri göstərir (<50 API). GR loqu litologiyanı müəyyən etməyin ən sadə üsuludur — yüksək GR = gil, aşağı GR = rezervuar süxuru. Azərbaycan quyularında GR loqu hər zaman ölçülür.",
      },
      {
        heading: "Resistivity — Müqavimət loqu",
        body: "Resistivity loqu süxurun elektrik müqavimətini ölçür, ohm·m vahidi ilə ifadə olunur. Neft və qaz yüksək müqavimət göstərir (>50 ohm·m), duzlu su isə aşağı müqavimət göstərir (<5 ohm·m). Bu fərqdən istifadə edərək neft-su kontaktını (OWC — Oil Water Contact) müəyyən etmək mümkündür. LLD (dərin) və LLS (dayaz) resistivity loqları birlikdə invasion effektini qiymətləndirmək üçün istifadə olunur.",
      },
      {
        heading: "Neutron-Density loqları",
        body: "Neutron loqu (NPHI) süxurdakı hidrogen indeksini ölçərək məsaməliliyi müəyyən edir. Density loqu (RHOB) süxurun sıxlığını g/cc ilə ölçür — tipik sandstone sıxlığı 2.65 g/cc-dir. Bu iki loq birlikdə crossplot üsulu ilə dəqiq məsaməlilik hesablanmasına imkan verir. Neutron-density ayrılması (separation) qaz varlığını göstərən əlamətdir — qaz olan yerdə neutron aşağı, density isə yüksək göstərir.",
      },
      {
        heading: "Loq interpretasiyası — praktiki nümunə",
        body: "Tipik neft rezervuarı loq şəklini belə oxuyurlar: GR < 50 API (təmiz sandstone), Resistivity > 50 ohm·m (neft), NPHI ≈ 0.20, RHOB ≈ 2.35 g/cc (məsaməlilik ~20%). Bu kombinasiya neftlə dolu sandstone rezervuarını göstərir. Əgər GR aşağı amma Resistivity da aşağıdırsa — su dolu rezervuardır. LAS faylını WellLogAI moduluna yükləyərək bu parametrləri özün vizuallaşdıra bilərsən.",
      },
    ],
    quiz: [
      {
        question: "GR loqu nəyi ölçür?",
        options: [
          "Süxurun elektrik müqavimətini",
          "Süxurun təbii radioaktivliyini",
          "Məsaməliliyi",
          "Neft doymasını",
        ],
        answer: 1,
      },
      {
        question: "Yüksək Resistivity dəyəri nəyin əlamətidir?",
        options: [
          "Duzlu su",
          "Gil süxur",
          "Neft və ya qaz",
          "Yüksək məsaməlilik",
        ],
        answer: 2,
      },
      {
        question: "Neutron-Density loqlarında ayrılma (separation) nəyi göstərir?",
        options: [
          "Neft varlığını",
          "Su varlığını",
          "Qaz varlığını",
          "Gil varlığını",
        ],
        answer: 2,
      },
      {
        question: "OWC nə deməkdir?",
        options: [
          "Original Well Count",
          "Oil Water Contact",
          "Offshore Well Completion",
          "Oil Well Capacity",
        ],
        answer: 1,
      },
    ],
  },
  production: {
    title: "Hasilat Mühəndisliyi — IPR və Nodal Analysis",
    icon: "⚡",
    sections: [
      {
        heading: "Hasilat mühəndisliyi nədir?",
        body: "Hasilat mühəndisliyi rezervuardan səthdəki qurğulara qədər olan bütün sistemin optimizasiyası ilə məşğul olur. Əsas məqsəd — quyudan maksimum neft/qaz hasilatını ən aşağı xərclə təmin etməkdir. Sistem 3 əsas hissədən ibarətdir: rezervuar (neftin mənbəyi), quyu (axın kanalı) və səth qurğuları (separator, nasoslar, borular).",
      },
      {
        heading: "IPR — Inflow Performance Relationship",
        body: "IPR — rezervuardan quyuya neftin axın xarakteristikasını göstərən əyridir. Vogel tənliyi ən çox istifadə olunan IPR modelidir: q/qmax = 1 - 0.2(Pwf/Pr) - 0.8(Pwf/Pr)². Burada q — hasilat, qmax — maksimum hasilat, Pwf — quyu dibi təzyiqi, Pr — rezervuar təzyiqidir. IPR əyrisi üzərindəki hər nöqtə müəyyən quyu dibi təzyiqinə uyğun hasilat dəyərini göstərir.",
      },
      {
        heading: "Nodal Analysis",
        body: "Nodal Analysis bütün hasilat sistemini bir nöqtədə (node) birləşdirərək analiz edir. Ən çox istifadə olunan node — quyu dibi nöqtəsidir. Bu nöqtədə IPR əyrisi (rezervuardan gələn) ilə VLP əyrisi (quyudan çıxan — Vertical Lift Performance) kəsişir. Kəsişmə nöqtəsi — sistemin işçi nöqtəsidir, yəni real hasilat və quyu dibi təzyiqidir.",
      },
      {
        heading: "Artificial Lift — Süni Qaldırma",
        body: "Rezervuar təzyiqi azaldıqca natural flow dayanır, süni qaldırma lazım olur. Əsas üsullar: ESP (Electric Submersible Pump) — elektrik sualtı nasosu, ən çox Azərbaycanda istifadə olunur; Gas Lift — quyuya qaz vurularaq neftin sıxlığı azaldılır; Rod Pump (beam pump) — klassik 'at başı' nasosu. SOCAR-ın Azərbaycan quyularının böyük əksəriyyətində ESP sistemi quraşdırılmışdır.",
      },
      {
        heading: "Decline Curve Analysis",
        body: "Decline Curve Analysis (DCA) — hasilatın zamanla azalmasını modelləşdirir və gələcək hasilatı proqnozlaşdırır. Arps tənliyi 3 azalma növünü müəyyən edir: eksponensial (sabit azalma tempi), hiperbolik (tədricən azalan temp) və harmonik (xüsusi hal). DCA vasitəsilə EUR (Estimated Ultimate Recovery) — yataqdan ümumi çıxarıla bilən neft miqdarı hesablanır.",
      },
    ],
    quiz: [
      {
        question: "IPR əyrisi nəyi göstərir?",
        options: [
          "Quyunun dərinliyini",
          "Rezervuardan quyuya axın xarakteristikasını",
          "Drilling fluid sıxlığını",
          "Süxur məsaməliliyini",
        ],
        answer: 1,
      },
      {
        question: "Nodal Analysis-də kəsişmə nöqtəsi nəyi göstərir?",
        options: [
          "Maksimum rezervuar təzyiqini",
          "Sistemin real işçi nöqtəsini — hasilat və təzyiq",
          "Quyunun optimal dərinliyini",
          "Drilling parametrlərini",
        ],
        answer: 1,
      },
      {
        question: "ESP nədir?",
        options: [
          "Quyu loqu növü",
          "Rezervuar modelləşdirmə proqramı",
          "Electric Submersible Pump — elektrik sualtı nasosu",
          "Drilling parametri",
        ],
        answer: 2,
      },
      {
        question: "DCA-da EUR nə deməkdir?",
        options: [
          "European Union Reservoir",
          "Estimated Ultimate Recovery — ümumi çıxarıla bilən neft",
          "Electric Uplift Rate",
          "Enhanced Underground Reserve",
        ],
        answer: 1,
      },
    ],
  },
};

export default function LessonPage({ params, searchParams }: {
    params: Promise<{ topic: string }>;
    searchParams: Promise<{ level?: string }>;
  }) {
    const { topic } = use(params);
    const { level = "baslangic" } = use(searchParams);
    
    const lesson = lessonData[topic];

  const [quizStarted, setQuizStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const levelLabel: Record<string, string> = {
    baslangic: "Başlanğıc",
    orta: "Orta",
    ireli: "İrəli",
  };

  const levelColor: Record<string, string> = {
    baslangic: "bg-green-100 text-green-700",
    orta: "bg-amber-100 text-amber-700",
    ireli: "bg-red-100 text-red-700",
  };

  if (!lesson) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Dərs tapılmadı.</p>
      </main>
    );
  }

  const q = lesson.quiz[current];

  function handleAnswer(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 < lesson.quiz.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function resetQuiz() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setQuizStarted(false);
  }

  async function askAI() {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiAnswer("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: lesson.title,
          question: aiQuestion,
        }),
      });
      const data = await res.json();
      setAiAnswer(data.answer ?? "Cavab alınmadı.");
    } catch {
      setAiAnswer("Xəta baş verdi. Yenidən cəhd edin.");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-16">
      <div className="max-w-2xl w-full">

        {/* Geri düyməsi */}
        <Link
          href="/lessons"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition mb-8"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Dərslər
        </Link>

        {/* Başlıq */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            {lesson.icon} {lesson.title}
          </h1>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${levelColor[level]}`}>
            {levelLabel[level]}
          </span>
        </div>

        {/* Dərs məzmunu */}
        <div className="mt-10 space-y-8">
          {lesson.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold text-slate-800">{section.heading}</h2>
              <p className="mt-2 text-slate-600 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>

        {/* Ayırıcı */}
        <div className="my-12 border-t border-slate-100" />

        {/* Quiz bölməsi */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900">📝 Quiz</h2>
          <p className="mt-1 text-sm text-slate-500">Öyrəndiklərini yoxla</p>

          {!quizStarted ? (
            <button
              onClick={() => setQuizStarted(true)}
              className="mt-6 rounded-xl bg-teal-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              Quizi başlat
            </button>
          ) : finished ? (
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-2xl font-semibold text-slate-900">
                {score}/{lesson.quiz.length}
              </p>
              <p className="mt-2 text-slate-500">
                {score === lesson.quiz.length
                  ? "Mükəmməl! Bütün sualları düzgün cavablandırdın."
                  : score >= lesson.quiz.length / 2
                  ? "Yaxşı nəticə! Bir az daha çalış."
                  : "Dərsi yenidən oxu, sonra cəhd et."}
              </p>
              <button
                onClick={resetQuiz}
                className="mt-4 rounded-xl border border-slate-200 px-5 py-2 text-sm text-slate-600 hover:border-slate-300 transition"
              >
                Yenidən cəhd et
              </button>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-slate-400">
                  Sual {current + 1} / {lesson.quiz.length}
                </p>
                <div className="flex gap-1">
                  {lesson.quiz.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-6 rounded-full ${
                        i < current ? "bg-teal-400" : i === current ? "bg-teal-600" : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-slate-800 font-medium">{q.question}</p>

              <div className="mt-4 space-y-2">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition ${
                      selected === null
                        ? "border-slate-200 hover:border-teal-400 hover:bg-teal-50"
                        : i === q.answer
                        ? "border-green-400 bg-green-50 text-green-800"
                        : selected === i
                        ? "border-red-400 bg-red-50 text-red-800"
                        : "border-slate-200 text-slate-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {selected !== null && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="rounded-xl bg-teal-600 px-5 py-2 text-sm font-medium text-white hover:bg-teal-700 transition"
                  >
                    {current + 1 < lesson.quiz.length ? "Növbəti sual" : "Nəticəni gör"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Ayırıcı */}
        <div className="my-12 border-t border-slate-100" />

        {/* AI Chat */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900">🤖 AI ilə sual-cavab</h2>
          <p className="mt-1 text-sm text-slate-500">
            Bu mövzu ilə bağlı hər şeyi sor
          </p>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askAI()}
              placeholder="Məs: Sandstone ilə shale arasındakı fərq nədir?"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-400 transition"
            />
            <button
              onClick={askAI}
              disabled={aiLoading}
              className="rounded-xl bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700 transition disabled:opacity-50"
            >
              {aiLoading ? "..." : "Sor"}
            </button>
          </div>

          {aiAnswer && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 leading-relaxed">
              {aiAnswer}
            </div>
          )}
        </div>

        {/* ModuleBridge — praktika modulu keçidi */}
        <ModuleBridge topic={topic} />

      </div>
    </main>
  );
}