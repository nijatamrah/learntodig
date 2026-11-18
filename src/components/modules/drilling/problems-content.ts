import type { QuizQuestion } from "../Quiz";
import type { MissionItem } from "./MissionRunner";
import type { FormulaGroup } from "./FormulaSheet";

export const PROBLEMS_OBJECTIVES = [
  "Əsas qazma problemlərini (stuck pipe, lost circulation, hole cleaning, wellbore instability) təsnif etmək",
  "Differensial yapışma qüvvəsini və free point dərinliyini hesablamaq",
  "Annulus sürəti, transport nisbəti və cuttings konsentrasiyası ilə hole cleaning-i qiymətləndirmək",
  "ECD-ni çat təzyiqi ilə müqayisə edib itki riskini görmək, məhlul səviyyəsinin düşməsini hesablamaq",
  "NPT-ni ölçmək (faiz və dəyər), fishing və sidetrack qərarını gözlənilən dəyərlə müqayisə etmək",
  "Problemin əlamətindən səbəbi diaqnoz etmək və aradan qaldırma ardıcıllığını qurmaq",
];

export const PROBLEMS_MISSION_INTRO =
  "8,000 ft TVD dərinlikdə 8.5\" quyunu 9.8 ppg məhlulla qazırsan. Sandstone zonasının formasiya təzyiqi 8.6 ppg ekvivalentdir. 5\" drillpipe (19.5 lb/ft), nasos 400 gpm, ROP 80 ft/saat. Əvvəl differensial yapışma riskini hesabla, sonra free point, hole cleaning, ECD və itki, axırda NPT iqtisadiyyatı. Bu bölmə təhsil məqsədlidir: real problem qərarları operatorun prosedurları və mühəndis təcrübəsi ilə verilir.";

export const PROBLEMS_MISSION: MissionItem[] = [
  {
    id: "p1",
    prompt: "1. Sandstone zonasında overbalance neçə psi-dir? (ΔP = 0.052·(MW − Pf)·TVD)",
    unit: "psi",
    answer: 499.2,
    tol: 1,
    solution: "ΔP = 0.052 · (9.8 − 8.6) · 8,000 = 499.2 psi. Bu fərq borunu filter cake-ə sıxan təzyiqdir.",
  },
  {
    id: "p2",
    prompt: "2. Boru 60 ft uzunluqda və 1.5 in enində filter cake ilə təmas edir. Əlaqə sahəsi neçə in²-dir?",
    unit: "in²",
    answer: 1080,
    tol: 2,
    solution: "A = 60 ft · 12 in/ft · 1.5 in = 1,080 in².",
  },
  {
    id: "p3",
    prompt: "3. Sürtünmə əmsalı μ = 0.2 olsa, differensial yapışma qüvvəsi neçə lb-dir? (F = ΔP·A·μ)",
    unit: "lb",
    answer: 107827,
    tol: 200,
    solution: "F = 499.2 · 1,080 · 0.2 = 107,827 lb. Boru hərəkətsiz qaldıqca təmas sahəsi böyüyür və qüvvə artır, buna görə yapışma vaxtla ağırlaşır.",
  },
  {
    id: "p4",
    prompt: "4. Free point: 20,000 lb əlavə dartmada drillpipe 8 in uzanır. Pipe 19.5 lb/ft-dir. Free point dərinliyi neçə ft-dir? (L = 735,294·e·W/P)",
    unit: "ft",
    answer: 5735,
    tol: 15,
    solution: "L = 735,294 · 8 · 19.5 / 20,000 = 5,735 ft. Borunun bu dərinliyə qədər hissəsi sərbəstdir, aşağısı yapışıb. Bu, back-off və ya jar yerini seçməyə kömək edir.",
  },
  {
    id: "p5",
    prompt: "5. 400 gpm-də annulus sürəti neçə ft/dəq-dir? (Va = 24.51·Q/(Dh² − Dp²))",
    unit: "ft/dəq",
    answer: 207.5,
    tol: 0.5,
    solution: "Va = 24.51 · 400 / (8.5² − 5²) = 9,804 / 47.25 = 207.5 ft/dəq.",
  },
  {
    id: "p6",
    prompt: "6. Cuttings slip sürəti 60 ft/dəq olsa, transport nisbəti nə qədərdir? (Ft = (Va − Vs)/Va)",
    unit: "",
    answer: 0.711,
    tol: 0.005,
    solution: "Ft = (207.5 − 60) / 207.5 = 0.711. Cuttings quyu boyu yuxarı annulus sürətinin 71%-i ilə hərəkət edir.",
  },
  {
    id: "p7",
    prompt: "7. ROP 80 ft/saat olduqda annulusda cuttings konsentrasiyası neçə %-dir? (C = 100·ROP·Dh²/(1471·Q·Ft))",
    unit: "%",
    answer: 1.38,
    tol: 0.05,
    solution: "C = 100 · 80 · 72.25 / (1471 · 400 · 0.711) = 1.38%. Adətən 4-5% altında saxlamaq tövsiyə olunur: konsentrasiya kritik həddi keçərsə, quyu təmizlənməsi pisləşir.",
  },
  {
    id: "p8",
    prompt: "8. Annulus təzyiq itkisi 150 psi-dir. ECD neçə ppg-dir? (ECD = MW + APL/(0.052·TVD))",
    unit: "ppg",
    answer: 10.16,
    tol: 0.02,
    solution: "ECD = 9.8 + 150 / (0.052 · 8,000) = 9.8 + 0.36 = 10.16 ppg. Sirkulyasiya zamanı dibdəki effektiv çəki statik çəkidən yüksəkdir.",
  },
  {
    id: "p9",
    prompt: "9. Zəif zonanın çat qradiyenti 10.5 ppg-dir. ECD ilə çat arasında marja neçə ppg-dir?",
    unit: "ppg",
    answer: 0.34,
    tol: 0.02,
    solution: "Marja = 10.5 − 10.16 = 0.34 ppg. Kiçik marja deməkdir: nasos sürətini artırsan, məhlulu qalınlaşdırsan və ya tripdən sonra surge yaransa, itki başlaya bilər.",
  },
  {
    id: "p10",
    prompt: "10. Tam itki baş verərsə, məhlul səviyyəsi formasiya təzyiqi (8.6 ppg ekv.) ilə tarazlaşana qədər quyuda nə qədər düşər? (ft)",
    unit: "ft",
    answer: 979.6,
    tol: 3,
    solution: "Tarazlıqda 0.052·9.8·(8,000 − h) = 0.052·8.6·8,000. Buradan h = 8,000 − 8.6·8,000/9.8 = 980 ft. Səviyyə düşdükcə hidrostatik azalır; başqa zona kick versə, itki və kick eyni anda baş verə bilər (underground blowout riski).",
  },
  {
    id: "p11",
    prompt: "11. Quyu 30 gün plan, 38 gün faktiki başa çatdı. 6 gün NPT var idi. NPT faizi (faktiki vaxta görə) neçədir?",
    unit: "%",
    answer: 15.8,
    tol: 0.2,
    solution: "NPT% = 6 / 38 = 15.8%. Plandan kənar 8 günün 6-sı NPT-dir, qalan 2 gün isə plandan yavaş işləmə (invisible lost time) ola bilər.",
  },
  {
    id: "p12",
    prompt: "12. Fishing 4 gün, spread rate 85 min $/gün. Uğur ehtimalı 60%, uğursuz olsa sidetrack (900 min $) edilir. Fishing-in gözlənilən dəyəri neçə min $-dir?",
    unit: "min $",
    answer: 700,
    tol: 5,
    solution: "Fishing dəyəri = 4 · 85 = 340. Gözlənilən = 340 + 0.4 · 900 = 700 min $. Sidetrack-ı dərhal etmək 900 min $ olduğu üçün fishing burada daha sərfəlidir. Break-even uğur ehtimalı 340/900 = 38%.",
  },
];

export const PROBLEMS_QUIZ: QuizQuestion[] = [
  {
    q: "Differensial yapışmanın tipik əlaməti hansıdır?",
    options: [
      "Boru hərəkətsiz qaldıqdan sonra yapışır, sirkulyasiya saxlanılır, fırlanma və hərəkət mümkün olmur",
      "Sirkulyasiya birdən itir və boru sərbəst hərəkət edir",
      "Boru yalnız fırlanma zamanı yapışır",
      "Torque azalır və ROP artır",
    ],
    correct: 0,
    explanation: "Differensial yapışmada boru keçirici zonada filter cake-ə sıxılır. Sirkulyasiya adətən davam edir, lakin boru nə yuxarı, nə aşağı, nə də fırlanma ilə hərəkət etmir. Mexaniki yapışmada (sloughing, bridge) isə sirkulyasiya çox vaxt məhdudlaşır.",
  },
  {
    q: "Differensial yapışma riskini azaltmaq üçün ən birbaşa yol hansıdır?",
    options: [
      "Overbalance-ı və filter cake qalınlığını azaltmaq, boruları hərəkətdə saxlamaq",
      "Məhlul çəkisini artırmaq",
      "Nasos sürətini sıfıra salmaq",
      "BHA-nı uzatmaq",
    ],
    correct: 0,
    explanation: "F = ΔP·A·μ. ΔP-ni (mud weight uyğunlaşdırma), A-nı (nazik, keyfiyyətli cake, spiral drill collar, boruları hərəkətdə saxlamaq) və μ-nü (lubricant) azaltmaq qüvvəni azaldır.",
  },
  {
    q: "Free point formulasında L = 735,294·e·W/P. Uzanma e artarsa (P və W sabit), free point necə dəyişir?",
    options: ["Dərinləşir (L artır)", "Dəyişmir", "Azalır", "Sıfır olur"],
    correct: 0,
    explanation: "Daha çox uzanma daha uzun sərbəst boru deməkdir. L e ilə düz mütənasibdir.",
  },
  {
    q: "Hole cleaning-də transport nisbəti Ft = (Va − Vs)/Va. Annulus sürəti artarsa Ft necə dəyişir?",
    options: ["Artır", "Azalır", "Dəyişmir", "Mənfi olur"],
    correct: 0,
    explanation: "Slip sürəti Vs sabit qalırsa, Va artdıqca cuttings-in net sürəti (Va − Vs) və Ft artır.",
  },
  {
    q: "Hansı quyu bucağında hole cleaning ən çətin hesab olunur?",
    options: ["Təxminən 40–65°", "0–10° (şaquli)", "Yalnız 90°", "Bucaq təsir etmir"],
    correct: 0,
    explanation: "Orta bucaqlarda cuttings yatağı yaranır və yuxarı axın dayandıqda geriyə sürüşür (avalanche). Bu yatağı yalnız axın və fırlanma ilə yaxşı idarə etmək olar.",
  },
  {
    q: "ECD nədir?",
    options: [
      "Sirkulyasiya zamanı annulus sürtünmə itkisini də daxil edən dibdəki effektiv məhlul çəkisi",
      "Məhlulun statik çəkisi",
      "Çat təzyiqi",
      "Formasiya təzyiqinin ekvivalent çəkisi",
    ],
    correct: 0,
    explanation: "ECD = MW + APL/(0.052·TVD). ECD çat qradiyentinə yaxınlaşarsa itki riski artır.",
  },
  {
    q: "Qismən itki zamanı ilk addım adətən nədir?",
    options: [
      "Nasos sürətini və ECD-ni azaltmaq, itki zonasını və sürətini müəyyən etmək, LCM planı qurmaq",
      "Məhlul çəkisini artırmaq",
      "Quyunu dərhal sement etmək",
      "Qazmanı sürətləndirmək",
    ],
    correct: 0,
    explanation: "Əvvəl ECD və təzyiq pikini azaldırıq, sonra məhlul səviyyəsini, itki sürətini və zonanı qiymətləndiririk. LCM pill, məhlul xüsusiyyəti və ya casing planı bundan sonra seçilir. Eyni zamanda well control riskini (kick) unutmaq olmaz.",
  },
  {
    q: "Məhlul səviyyəsi quyuda düşəndə nə baş verir?",
    options: [
      "Dibdə hidrostatik təzyiq azalır və başqa zona kick verə bilər",
      "Dibdə təzyiq artır",
      "ECD artır",
      "Heç nə dəyişmir",
    ],
    correct: 0,
    explanation: "Hidrostatik azalma kick riskinə səbəb olur. Buna görə itki zamanı quyunu doldurmaq və səviyyəni izləmək vacibdir.",
  },
  {
    q: "NPT (non-productive time) nə deməkdir?",
    options: [
      "Planlaşdırılmış məqsədə töhfə verməyən vaxt: gözləmə, avadanlıq nasazlığı, problemin aradan qaldırılması",
      "Yalnız hava şəraiti səbəbli gözləmə",
      "Yalnız trip vaxtı",
      "Qazma zamanı keçən bütün vaxt",
    ],
    correct: 0,
    explanation: "NPT planlaşdırılmamış hadisələr (stuck pipe, losses, avadanlıq, gözləmə) səbəbli itirilən vaxtdır. Bu, quyu dəyərinə birbaşa təsir edir.",
  },
  {
    q: "Fishing-in sidetrack-dan ucuz olması üçün uğur ehtimalı p hansı şərti ödəməlidir? (F: fishing dəyəri, S: sidetrack dəyəri; fishing uğursuz olsa sidetrack da edilir)",
    options: ["p > F/S", "p > S/F", "p < F/S", "p = 0.5"],
    correct: 0,
    explanation: "Gözlənilən dəyər: F + (1 − p)·S < S ⇒ p > F/S. Məsələn F = 340, S = 900 üçün p > 38%.",
  },
  {
    q: "Wellbore instability (sloughing shale) zamanı hansı əlamət tipikdir?",
    options: [
      "Shaker-də çox miqdarda iri, bucaqlı cavings, tripdə tight hole və overpull",
      "Pit-in birdən artması",
      "Sirkulyasiya təzyiqinin sıfıra düşməsi",
      "Məhlulun temperaturunun azalması",
    ],
    correct: 0,
    explanation: "Cavings və tripdə tight hole instability əlamətləridir. Məhlul çəkisi və inhibisiya, hole cleaning və dövri qazma təcrübəsi bunu idarə edir.",
  },
  {
    q: "Pack-off və bridge halında sirkulyasiya təzyiqi necə davranır?",
    options: [
      "Qəflətən artır, axın azalır və boru yuxarı-aşağı hərəkətdə çətinləşir",
      "Qəflətən sıfıra düşür",
      "Dəyişmir",
      "Yalnız torque dəyişir",
    ],
    correct: 0,
    explanation: "Annulus tutulduqda nasos təzyiqi artır, return azalır. Bu halda nasos təzyiqini hədsiz artırmaq (fracture riski) olmaz, sirkulyasiyanı ehtiyatla bərpa etmək və boruları hərəkətə salmaq lazımdır.",
  },
];

export const PROBLEMS_FORMULAS: FormulaGroup[] = [
  {
    title: "Stuck pipe",
    rows: [
      { name: "Overbalance", formula: "ΔP = 0.052·(MW − P_f,ppg)·TVD  [psi]" },
      { name: "Əlaqə sahəsi", formula: "A = L_c·12·w  [in²]", note: "L_c: təmas uzunluğu (ft), w: təmas eni (in)" },
      { name: "Differensial yapışma qüvvəsi", formula: "F = ΔP·A·μ  [lb]" },
      { name: "Free point", formula: "L = 735,294·e·W/P  [ft]", note: "e: uzanma (in), W: boru çəkisi (lb/ft), P: əlavə dartma (lb)" },
    ],
  },
  {
    title: "Hole cleaning",
    rows: [
      { name: "Annulus sürəti", formula: "V_a = 24.51·Q/(D_h² − D_p²)  [ft/dəq]" },
      { name: "Transport nisbəti", formula: "F_t = (V_a − V_s)/V_a" },
      { name: "Cuttings konsentrasiyası", formula: "C = 100·ROP·D_h²/(1471·Q·F_t)  [%]", note: "Praktik hədd adətən 4–5% altında" },
    ],
  },
  {
    title: "Lost circulation",
    rows: [
      { name: "ECD", formula: "ECD = MW + APL/(0.052·TVD)  [ppg]" },
      { name: "Səviyyə düşməsi", formula: "h = TVD − P_f,ppg·TVD/MW  [ft]" },
      { name: "Hidrostatik azalma", formula: "ΔP_h = 0.052·MW·h  [psi]" },
    ],
  },
  {
    title: "NPT və qərar",
    rows: [
      { name: "NPT faizi", formula: "NPT% = 100·t_NPT / t_total" },
      { name: "NPT dəyəri", formula: "C_NPT = t_NPT·spread rate" },
      { name: "Fishing gözlənilən dəyəri", formula: "E = F + (1 − p)·S" },
      { name: "Break-even uğur ehtimalı", formula: "p* = F/S" },
    ],
  },
];
