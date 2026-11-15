import type { QuizQuestion } from "../Quiz";

import type { MissionItem } from "./MissionRunner";
import type { FormulaGroup } from "./FormulaSheet";

export const MISSION_INTRO =
  "Sən 9,500 ft TVD hədəfli quyunun qazma mühəndisisən. Aşağıdakı üç tapşırığı kalkulyatorla və ya əllə həll et. Hər cavab avtomatik yoxlanır və həllin addımları göstərilir.";

export const MISSION: MissionItem[] = [
  {
    id: "m1a",
    prompt: "1a. 9,500 ft TVD-də MW = 12.4 ppg. Quyu dibində hidrostatik təzyiq nə qədərdir?",
    unit: "psi",
    answer: 6125.6,
    tol: 5,
    solution: "Ph = 0.052 × 12.4 × 9,500 = 6,125.6 psi.",
  },
  {
    id: "m1b",
    prompt: "1b. Məsamə təzyiqi qradiyenti 0.62 psi/ft-dir. Overbalance neçə psi-dir?",
    unit: "psi",
    answer: 235.6,
    tol: 5,
    solution: "Pp = 0.62 × 9,500 = 5,890 psi. Overbalance = 6,125.6 − 5,890 = 235.6 psi (müsbət: quyu təzyiqi formasiyadan yüksəkdir).",
  },
  {
    id: "m1c",
    prompt: "1c. Həmin məsamə təzyiqi neçə ppg-yə ekvivalentdir?",
    unit: "ppg",
    answer: 11.92,
    tol: 0.05,
    solution: "EMW = 0.62 / 0.052 = 11.92 ppg. MW = 12.4 ppg olduğundan ehtiyat cəmi ≈ 0.48 ppg-dir.",
  },
  {
    id: "m2a",
    prompt:
      "2a. 8 5/8″ casing shoe 6,000 ft TVD-dədir. LOT zamanı məhlul 10.0 ppg, səthdə leak-off təzyiqi 1,450 psi olub. Shoe-da çat EMW nə qədərdir?",
    unit: "ppg",
    answer: 14.65,
    tol: 0.05,
    solution: "EMW = 10.0 + 1,450 / (0.052 × 6,000) = 10.0 + 4.65 = 14.65 ppg.",
  },
  {
    id: "m2b",
    prompt: "2b. Şirkət 0.5 ppg təhlükəsizlik margini tələb edir. Bu shoe-nun altında maksimum icazəli MW neçədir?",
    unit: "ppg",
    answer: 14.15,
    tol: 0.05,
    solution: "Maks. MW = 14.65 − 0.5 = 14.15 ppg.",
  },
  {
    id: "m3a",
    prompt:
      "3. Sonik loq: 10,000 ft-də Δto = 110 µs/ft, normal trend Δtn = 90 µs/ft. OBG = 1.0 psi/ft, NPG = 0.465 psi/ft. Eaton (üstü 3) ilə Pp neçə ppg ekvivalentdir?",
    unit: "ppg",
    answer: 13.6,
    tol: 0.1,
    solution:
      "(90/110)³ = 0.548. Pp/D = 1.0 − (1.0 − 0.465) × 0.548 = 0.707 psi/ft. EMW = 0.707 / 0.052 ≈ 13.6 ppg. Normal təzyiq (8.94 ppg) ilə müqayisədə güclü anormal təzyiq.",
  },
];

export const QUIZ: QuizQuestion[] = [
  {
    q: "MW = 11.2 ppg, TVD = 8,000 ft. Hidrostatik təzyiq nə qədərdir?",
    options: ["4,480 psi", "4,659 psi", "5,120 psi", "9,318 psi"],
    correct: 1,
    explanation: "Ph = 0.052 × 11.2 × 8,000 = 4,659 psi. Digər variantlar 0.05 sabiti və ya vahid səhvindən alınır.",
  },
  {
    q: "Maili quyu: MD = 10,000 ft, TVD = 8,200 ft, MW = 10 ppg. Dib təzyiqi (statik)?",
    options: ["4,160 psi", "4,264 psi", "5,000 psi", "5,200 psi"],
    correct: 1,
    explanation: "Hidrostatik təzyiq həmişə TVD ilə hesablanır: 0.052 × 10 × 8,200 = 4,264 psi. MD ilə hesablamaq (5,200 psi) tipik səhvdir.",
  },
  {
    q: "0.052 sabiti hansı vahidlər üçün düzgündür?",
    options: ["kg/m³, m, bar", "ppg, ft, psi", "SG, m, kPa", "lb/ft³, ft, psi"],
    correct: 1,
    explanation: "0.052 (≈12/231) yalnız MW ppg, dərinlik ft, təzyiq psi olduqda işləyir. SI vahidlərində başqa sabit lazımdır.",
  },
  {
    q: "Cənubi Xəzər kimi sürətli çökmə hövzələrində anormal yüksək məsamə təzyiqinin əsas səbəbi hansıdır?",
    options: [
      "Süxurların həddindən artıq sıx olması",
      "Sürətli çökmə nəticəsində məsamə mayesinin çıxa bilməməsi (disequilibrium compaction)",
      "Yalnız qazma məhlulunun çəkisi",
      "Yer səthindəki temperaturun dəyişməsi",
    ],
    correct: 1,
    explanation:
      "Çöküntü sürətlə yığılanda məsamə mayesi qaça bilmir, süxurun yükünün bir hissəsini mayenin özü daşıyır. Digər mexanizmlər: gil diagenezi, karbohidrogen generasiyası, tektonik sıxılma.",
  },
  {
    q: "Overburden sabit qalaraq Pp artır. Effektiv gərginlik (σe = S − Pp) və mud window necə dəyişir?",
    options: [
      "σe artır, window genişlənir",
      "σe azalır, window adətən daralır",
      "σe dəyişmir",
      "σe azalır, window genişlənir",
    ],
    correct: 1,
    explanation: "Terzaghi prinsipi: σe = S − Pp. Pp artdıqca σe azalır, çat qradiyenti Pp-yə nisbətən yaxınlaşır və window daralır.",
  },
  {
    q: "Pp = 11.9 ppg, MW = 11.5 ppg. Nə baş verir?",
    options: [
      "Overbalance, quyu təhlükəsizdir",
      "Underbalance, kick riski",
      "Çat riski",
      "Dəyişiklik yoxdur",
    ],
    correct: 1,
    explanation: "MW < Pp olduqda quyu dibi təzyiqi formasiyadan aşağıdır (underbalance); formasiya mayesi quyuya axa bilər.",
  },
  {
    q: "LOT: MW = 9.5 ppg, shoe 4,000 ft TVD, səthdə leak-off 1,040 psi. Çat EMW?",
    options: ["12.0 ppg", "14.5 ppg", "9.5 ppg", "19.5 ppg"],
    correct: 1,
    explanation: "EMW = 9.5 + 1,040 / (0.052 × 4,000) = 9.5 + 5.0 = 14.5 ppg.",
  },
  {
    q: "Sonik loqda ölçülmüş Δt normal trenddən yuxarıdır. Bu nəyi göstərir?",
    options: [
      "Süxur normaldan daha sıxdır",
      "Süxur az sıxlaşıb: anormal yüksək məsamə təzyiqi ehtimalı",
      "Kavernanın yoxluğunu",
      "Neftin olmamasını",
    ],
    correct: 1,
    explanation: "Δt-nin artması səs sürətinin azalması və süxurun normaldan az sıxlaşması deməkdir (undercompaction), anormal təzyiqin klassik əlamətidir.",
  },
  {
    q: "Trip margin nə üçündür?",
    options: [
      "Casing-i ucuzlaşdırmaq üçün",
      "Boru çəkiləndə swab təzyiqi və nasos dayananda itən ECD üçün ehtiyat",
      "Çat qradiyentini artırmaq üçün",
      "Məhlulun reologiyasını dəyişmək üçün",
    ],
    correct: 1,
    explanation: "Boru yuxarı çəkiləndə swab təzyiqi, nasos dayananda isə sirkulyasiya təzyiqi itkisi dib təzyiqini azaldır. Margin bu azalmanı kompensasiya edir.",
  },
  {
    q: "Pp + trip margin ≥ FG − frac margin olur (window bağlanıb). Ən məntiqli mühəndislik cavabı?",
    options: [
      "MW-ni çata qədər artırmaq",
      "Əlavə casing/liner ilə bölməni qısaltmaq, MPD kimi üsulları müzakirə etmək",
      "Margin-ləri sıfıra endirmək və davam etmək",
      "Testləri atlamaq",
    ],
    correct: 1,
    explanation: "Window bağlandıqda MW-ni artırmaq lost circulation, azaltmaq kick deməkdir. Həll: bölməni qısaltmaq (əlavə string), MPD və ya dizayn dəyişikliyi. Margin-ləri əsassız silmək təhlükəlidir.",
  },
];

export const PRESSURES_FORMULAS: FormulaGroup[] = [
  {
    title: "Hidrostatik təzyiq",
    rows: [
      { name: "Hidrostatik təzyiq", formula: "Ph = 0.052 · MW · TVD", note: "MW ppg, TVD ft, Ph psi" },
      { name: "Məhlul qradiyenti", formula: "G = 0.052 · MW  [psi/ft]" },
      { name: "Ekvivalent məhlul çəkisi", formula: "EMW = P / (0.052 · TVD)  [ppg]" },
      { name: "Overbalance", formula: "OB = Ph − Pp", note: "mənfi olarsa underbalance (kick riski)" },
    ],
  },
  {
    title: "Gərginlik və Pp",
    rows: [
      { name: "Effektiv gərginlik (Terzaghi)", formula: "σe = S − Pp" },
      { name: "Eaton (sonik)", formula: "Pp/D = OBG − (OBG − NPG)·(Δtn/Δto)^3" },
      { name: "Eaton (rezistivlik)", formula: "Pp/D = OBG − (OBG − NPG)·(Ro/Rn)^1.2" },
      { name: "Overburden (sıxlıqdan)", formula: "1 g/cc ≈ 0.4335 psi/ft ≈ 8.345 ppg" },
    ],
  },
  {
    title: "Çat təzyiqi",
    rows: [
      { name: "Hubbert–Willis (min.)", formula: "Pf = Pp + (S − Pp)/3" },
      { name: "Eaton", formula: "Pf = Pp + ν/(1−ν)·(S − Pp)" },
      { name: "Leak-off test", formula: "EMW = MW + P_leakoff / (0.052·TVD_shoe)" },
      { name: "Maks. icazəli MW", formula: "MW_max = EMW_LOT − margin" },
    ],
  },
  {
    title: "Mud window",
    rows: [
      { name: "Aşağı hədd", formula: "MW_min = max(Pp, collapse) + trip margin" },
      { name: "Yuxarı hədd", formula: "MW_max = FG − frac margin" },
      { name: "Casing seat (bottom-up)", formula: "FG(shoe) − margin ≥ Pp(TD) + trip margin" },
    ],
  },
];

export const PRESSURES_OBJECTIVES = [
  "Hidrostatik təzyiqi və overbalance-ı TVD ilə düzgün hesablamaq",
  "Normal və anormal təzyiqi fərqləndirmək, səbəblərini izah etmək",
  "Sonik loqdan Eaton üsulu ilə Pp qiymətləndirmək",
  "LOT nəticəsindən shoe-da maksimum icazəli məhlul çəkisini tapmaq",
  "Mud window qurmaq və bottom-up üsulu ilə casing seat seçmək",
];
