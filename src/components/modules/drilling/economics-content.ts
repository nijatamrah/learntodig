import type { QuizQuestion } from "../Quiz";
import type { MissionItem } from "./MissionRunner";
import type { FormulaGroup } from "./FormulaSheet";

export const ECONOMICS_OBJECTIVES = [
  "Quyu xərcini vaxta bağlı, dərinliyə bağlı və sabit xərclərə ayırmaq",
  "Bölmələr üzrə vaxtı (qazma, bağlantı, trip, casing) hesablayıb time-depth planı qurmaq",
  "AFE sətirlərini cəmləyib contingency ilə büdcəni formalaşdırmaq",
  "Xərc/ft, bit run iqtisadiyyatı və learning curve ilə effektivliyi qiymətləndirmək",
  "P10/P50/P90 xərc və vaxt qiymətləndirməsini oxumaq, NPT-nin büdcəyə təsirini görmək",
  "Sadə EMV ilə quyunun iqtisadi məntiqini başa düşmək",
];

export const ECONOMICS_MISSION_INTRO =
  "Operator 7,200 ft qazılacaq quyu üçün AFE hazırlayır. Spread rate 85 min $/gün (rig və xidmətlər). Plan: ROP 40 ft/saat, stand 90 ft, hər bağlantı 0.15 saat, bütün trip-lər 42 saat, casing və sement işləri 96 saat, logging və digər işlər 60 saat. Tangible və xidmət sətirləri: casing və wellhead 420, bit 180, məhlul 310, sement 260, logging 190 min $. Əvvəl vaxtı, sonra büdcəni, axırda risk və iqtisadiyyatı hesabla. Bu bölmə təhsil məqsədlidir: real AFE şirkət standartları və təsdiq prosesi ilə hazırlanır.";

export const ECONOMICS_MISSION: MissionItem[] = [
  {
    id: "e1",
    prompt: "1. 7,200 ft-i ROP 40 ft/saat ilə qazmaq neçə gün çəkir? (yalnız qazma saatı)",
    unit: "gün",
    answer: 7.5,
    tol: 0.02,
    solution: "Qazma saatı = 7,200 / 40 = 180 saat = 7.5 gün.",
  },
  {
    id: "e2",
    prompt: "2. Neçə bağlantı lazımdır və bağlantılara ümumi neçə saat gedir? (stand 90 ft, bağlantı 0.15 saat)",
    unit: "saat",
    answer: 12,
    tol: 0.1,
    solution: "7,200 / 90 = 80 bağlantı. Vaxt = 80 · 0.15 = 12 saat (0.5 gün).",
  },
  {
    id: "e3",
    prompt: "3. Quyunun ümumi planlaşdırılmış müddəti neçə gündür? (qazma + bağlantı + 42 saat trip + 96 saat casing + 60 saat digər)",
    unit: "gün",
    answer: 16.25,
    tol: 0.02,
    solution: "Cəmi saat = 180 + 12 + 42 + 96 + 60 = 390 saat = 16.25 gün.",
  },
  {
    id: "e4",
    prompt: "4. Vaxta bağlı xərc neçə min $-dır? (gün · spread rate)",
    unit: "min $",
    answer: 1381.25,
    tol: 1,
    solution: "16.25 · 85 = 1,381.25 min $. Bu, AFE-nin ən böyük və ən çevik hissəsidir: hər əlavə gün 85 min $ deməkdir.",
  },
  {
    id: "e5",
    prompt: "5. Əsas büdcə (contingency-siz) neçə min $-dır? (vaxt xərci + 5 sətir)",
    unit: "min $",
    answer: 2741.25,
    tol: 2,
    solution: "1,381.25 + 420 + 180 + 310 + 260 + 190 = 2,741.25 min $.",
  },
  {
    id: "e6",
    prompt: "6. 12% contingency ilə AFE neçə min $-dır?",
    unit: "min $",
    answer: 3070.2,
    tol: 3,
    solution: "AFE = 2,741.25 · 1.12 = 3,070.2 min $. Contingency gözlənilən risklər üçün ayrılır, boş ehtiyat deyil.",
  },
  {
    id: "e7",
    prompt: "7. Əsas büdcə üzrə xərc neçə $/ft-dir?",
    unit: "$/ft",
    answer: 380.7,
    tol: 1,
    solution: "2,741,250 / 7,200 = 380.7 $/ft. Müxtəlif quyuların müqayisəsi üçün normallaşdırılmış göstəricidir, lakin quyu mürəkkəbliyi nəzərə alınmalıdır.",
  },
  {
    id: "e8",
    prompt: "8. Bit run: bit 28,000 $, qazma 60 saat, bağlantı 3 saat, trip 12 saat, 2,400 ft qazıldı. Xərc/ft neçə $-dır? (spread 85 min $/gün)",
    unit: "$/ft",
    answer: 122.3,
    tol: 0.5,
    solution: "Saatlıq dərəcə = 85,000/24 = 3,541.7 $/saat. Cəmi vaxt 75 saat → 265,625 $. (28,000 + 265,625)/2,400 = 122.3 $/ft.",
  },
  {
    id: "e9",
    prompt: "9. Eyni tipli quyuların 90% learning curve ilə 4-cü quyusu neçə gündə bitər? (1-ci quyu 16.25 gün)",
    unit: "gün",
    answer: 13.16,
    tol: 0.05,
    solution: "D₄ = 16.25 · 4^(log₂0.9) = 16.25 · 0.81 = 13.16 gün. Hər ikiləşmədə (1→2→4) 10% azalma nəzərdə tutulur. Real quyuda texniki limit (technical limit) azalmanı məhdudlaşdırır.",
  },
  {
    id: "e10",
    prompt: "10. 4 günlük NPT əsas büdcənin neçə %-i qədər əlavə xərc yaradır? (spread 85 min $/gün)",
    unit: "%",
    answer: 12.4,
    tol: 0.2,
    solution: "4 · 85 = 340 min $. 340 / 2,741.25 = 12.4%. Bu, 12% contingency-ni təkcə bir hadisə ilə tükədə bilər.",
  },
  {
    id: "e11",
    prompt: "11. Quyunun müddəti üçün qiymətləndirmə: minimum 12, ehtimal olunan 16, maksimum 26 gün (üçbucaq paylanma). Orta müddət neçə gündür?",
    unit: "gün",
    answer: 18,
    tol: 0.05,
    solution: "Üçbucaq paylanmanın ortası (a + m + b)/3 = (12 + 16 + 26)/3 = 18 gün. Orta ehtimal olunandan böyükdür, çünki paylanma sağa uzanır (risklər vaxtı artırır).",
  },
  {
    id: "e12",
    prompt: "12. Kəşfiyyat quyusu: uğur ehtimalı 35%, uğur halında gəlirin cari dəyəri 9,500 min $ (tamamlama xərci çıxılıb), quyu xərci 3,070.2 min $. EMV neçə min $-dır?",
    unit: "min $",
    answer: 254.8,
    tol: 2,
    solution: "EMV = 0.35 · 9,500 − 3,070.2 = 254.8 min $ (müsbət). Break-even uğur ehtimalı = 3,070.2 / 9,500 = 32.3%. Ehtimal 32%-dən aşağı düşsə, quyu iqtisadi olmaz.",
  },
];

export const ECONOMICS_QUIZ: QuizQuestion[] = [
  {
    q: "Qazma xərclərinin ən böyük və ən çox dəyişən hissəsi adətən hansıdır?",
    options: [
      "Vaxta bağlı xərc (rig və xidmətlərin gündəlik dəyəri)",
      "Casing qiyməti",
      "Wellhead",
      "Sığorta",
    ],
    correct: 0,
    explanation: "Spread rate hər gün üçün ödənilir. Buna görə bir günün itirilməsi birbaşa pul itkisidir, NPT və effektivlik büdcəyə ən çox təsir edir.",
  },
  {
    q: "AFE nədir?",
    options: [
      "Authorization for Expenditure: layihənin xərc büdcəsinin təsdiq sənədi",
      "Qazma avadanlığının inventarı",
      "Quyunun təzyiq testi",
      "Faktiki xərc hesabatı",
    ],
    correct: 0,
    explanation: "AFE operatorun və tərəfdaşların xərci təsdiq etdiyi sənəddir. Faktiki xərc AFE-dən çox aşarsa, əlavə AFE (supplement) tələb oluna bilər.",
  },
  {
    q: "Time-depth əyrisində düz (üfüqi) hissələr nə göstərir?",
    options: [
      "Dərinliyin artmadığı əməliyyatlar: trip, casing, sement, gözləmə və ya NPT",
      "Yüksək ROP",
      "Quyunun TD-yə çatması",
      "Məhlul dəyişməsi",
    ],
    correct: 0,
    explanation: "Dərinlik dəyişmir, vaxt keçir. Hər düz hissə xərc yaradır. Düz hissələrin planlı və planlanmamış olması ayrıca təhlil olunur.",
  },
  {
    q: "Contingency-nin düzgün məqsədi hansıdır?",
    options: [
      "Gözlənilən, lakin dəqiq vaxtı və ölçüsü bilinməyən risklərin dəyərini örtmək",
      "Qazmanı sürətləndirmək",
      "İşçilərə bonus ödəmək",
      "AFE-ni yuvarlaqlaşdırmaq",
    ],
    correct: 0,
    explanation: "Contingency risk analizinə əsaslanmalıdır (məsələn, P50-P70 fərqi). Təsadüfi artırılmış rəqəm kimi qəbul edilməməlidir.",
  },
  {
    q: "Bit run xərc/ft hesabında nə daxildir?",
    options: [
      "Bit dəyəri + rig vaxtı (qazma, bağlantı, trip) bölünsün qazılan dərinliyə",
      "Yalnız bit dəyəri",
      "Yalnız ROP",
      "Yalnız trip vaxtı",
    ],
    correct: 0,
    explanation: "Bahalı bit ROP və ömrü artırarsa, ümumi xərc/ft-i azalda bilər. Qərar bit qiymətinə deyil, bütün run-ın xərc/ft göstəricisinə görə verilir (7-ci bölmə).",
  },
  {
    q: "90% learning curve nə deməkdir?",
    options: [
      "Təkrarlanan əməliyyatların sayı iki dəfə artdıqda vahid vaxt və ya xərc 10% azalır",
      "Hər quyu əvvəlkindən 10% sürətli olur",
      "Quyunun 90%-i uğurlu olur",
      "Xərc 90% artır",
    ],
    correct: 0,
    explanation: "D_n = D_1·n^(log₂LR). 1-ci quyudan 2-ciyə, 2-cidən 4-cüyə, 4-cüdən 8-ciyə 10% azalır. Azalma texniki limitdə dayanır.",
  },
  {
    q: "P90 xərc dəyəri nə deməkdir (xərc üçün)?",
    options: [
      "Faktiki xərcin bu dəyərdən az və ya bərabər olma ehtimalı 90%-dir",
      "Xərcin 90%-i təkrarlanır",
      "Xərc 90 min $-dır",
      "Risk 90% artır",
    ],
    correct: 0,
    explanation: "Xərc üçün P90 mühafizəkar (yüksək) dəyərdir: 90% hallarda faktiki xərc ondan az olacaq. P10 isə optimist (aşağı) qiymətdir. Bəzi şirkətlərdə P10/P90 tərsinə təyin olunur, ona görə qəbul edilmiş qaydaya baxmaq lazımdır.",
  },
  {
    q: "Spread rate 100 min $/gün olduqda, 3 günlük NPT dəyəri nə qədərdir?",
    options: ["300 min $", "30 min $", "3,000 min $", "100 min $"],
    correct: 0,
    explanation: "3 · 100 = 300 min $. Bu, yalnız vaxta bağlı xərcdir. Əlavə materiallar, fishing alətləri və s. ayrıca əlavə olunur.",
  },
  {
    q: "Quyu xərci 3,000 min $, uğur ehtimalı 30%, uğurda gəlirin cari dəyəri 10,000 min $. EMV nə qədərdir?",
    options: ["0 min $", "−3,000 min $", "+7,000 min $", "+3,000 min $"],
    correct: 0,
    explanation: "EMV = 0.3 · 10,000 − 3,000 = 0. Bu, break-even-dir: uğur ehtimalı 30%-dən yuxarı olsa, EMV müsbət olur.",
  },
  {
    q: "Real vaxtda xərc nəzarətində ən faydalı göstərici hansıdır?",
    options: [
      "Plan ilə faktiki time-depth və xərc əyrilərinin müqayisəsi (gün və pul)",
      "Yalnız gündəlik məhlul həcmi",
      "Yalnız ROP",
      "Yalnız işçi sayı",
    ],
    correct: 0,
    explanation: "Plan və faktiki əyriləri üst-üstə qoymaq gecikməni və xərc sapmasını dərhal göstərir. Sapma səbəbi (NPT və ya yavaş ROP) ayrıca təhlil olunur.",
  },
  {
    q: "Flat time və invisible lost time (ILT) arasında fərq nədir?",
    options: [
      "Flat time dərinliyin dəyişmədiyi vaxtdır, ILT plandan yavaş getdiyi lakin NPT kimi qeyd olunmayan itkidir",
      "Fərq yoxdur",
      "ILT yalnız hava ilə bağlıdır",
      "Flat time yalnız qazmaya aiddir",
    ],
    correct: 0,
    explanation: "ILT: məsələn, aşağı ROP, uzun bağlantı, yavaş trip. Böyük potensial bu itkilərdədir, çünki onlar qeyd olunmadan yığılır.",
  },
  {
    q: "Dry hole xərci ilə tamamlanmış quyunun xərci arasında fərq nədir?",
    options: [
      "Tamamlanmış quyu xərcinə completion (tubing, perforasiya, stimulyasiya) də daxildir",
      "Fərq yoxdur",
      "Dry hole daha bahadır",
      "Tamamlanma yalnız hasilatdan sonra olur",
    ],
    correct: 0,
    explanation: "Qərar nöqtələrində (məsələn, quyunu tamamlamaq və ya tərk etmək) dry hole və completion xərcləri ayrıca qiymətləndirilir.",
  },
];

export const ECONOMICS_FORMULAS: FormulaGroup[] = [
  {
    title: "Vaxt və vaxta bağlı xərc",
    rows: [
      { name: "Qazma saatı", formula: "t_d = feet / ROP" },
      { name: "Bağlantı saatı", formula: "t_c = ⌈feet / stand⌉ · t_conn" },
      { name: "Ümumi vaxt", formula: "t = t_d + t_c + t_trip + t_casing + t_other  [saat]" },
      { name: "Vaxta bağlı xərc", formula: "C_t = (t/24)·R_spread" },
    ],
  },
  {
    title: "AFE və norma göstəriciləri",
    rows: [
      { name: "Əsas büdcə", formula: "C_base = C_t + ΣC_i" },
      { name: "AFE", formula: "AFE = C_base·(1 + c%)" },
      { name: "Xərc/ft (quyu)", formula: "CPF = C_base / feet" },
      { name: "Bit run xərc/ft", formula: "CPF_bit = (C_b + R_h·(t_d + t_c + t_trip)) / F", note: "R_h = R_spread/24" },
    ],
  },
  {
    title: "Learning curve və risk",
    rows: [
      { name: "Learning curve", formula: "D_n = D_1·n^(log₂ LR)" },
      { name: "Üçbucaq paylanmanın ortası", formula: "μ = (a + m + b)/3", note: "a: min, m: ehtimal olunan, b: max" },
      { name: "NPT əlavə xərci", formula: "ΔC = t_NPT·R_spread" },
      { name: "Contingency istehlakı", formula: "ΔC / C_base ·100%" },
    ],
  },
  {
    title: "Quyu iqtisadiyyatı",
    rows: [
      { name: "EMV", formula: "EMV = P_g·PV − C_well" },
      { name: "Break-even uğur ehtimalı", formula: "P_g* = C_well / PV" },
    ],
  },
];
