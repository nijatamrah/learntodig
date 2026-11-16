import type { QuizQuestion } from "../Quiz";
import type { MissionItem } from "./MissionRunner";
import type { FormulaGroup } from "./FormulaSheet";

export const DS_OBJECTIVES = [
  "Drill string komponentlərini (DP, HWDP, DC, stabilizator, MWD, bit) və funksiyalarını izah etmək",
  "Buoyancy factor ilə string çəkisini və hook load-u hesablamaq",
  "WOB üçün DC uzunluğunu seçmək və neutral point-in DC daxilində qaldığını yoxlamaq",
  "Drill pipe-ın dartma dizaynını (T_y, 0.9·T_y, margin of overpull, maksimum dərinlik) qiymətləndirmək",
  "Fulcrum, pendulum və packed BHA-nın trayektoriyaya təsirini izah etmək",
];

export const DS_MISSION_INTRO =
  "Sən 12,000 ft quyu üçün drill string dizayn edirsən: 600 ft DC (6.5 × 2.813 in), 450 ft HWDP (49.3 lb/ft), qalanı 5 in DP (ID 4.276 in, adjusted 21.9 lb/ft, E-75). MW 12 ppg, WOB 40,000 lbf. Əvvəl DC-ni yoxla, sonra dartma dizaynını hesabla.";

export const DS_MISSION: MissionItem[] = [
  {
    id: "s1",
    prompt: "1. 6.5 in OD / 2.813 in ID drill collar-ın havadakı çəkisi neçə lb/ft-dir? (polad 490 lb/ft³)",
    unit: "lb/ft",
    answer: 91.8,
    tol: 0.3,
    solution: "w = 2.6725 · (OD² − ID²) = 2.6725 · (42.25 − 7.913) = 2.6725 · 34.337 ≈ 91.8 lb/ft.",
  },
  {
    id: "s2",
    prompt: "2. Həmin collar 12 ppg məhlulda neçə lb/ft çəkir? (buoyancy factor ilə)",
    unit: "lb/ft",
    answer: 75,
    tol: 0.3,
    solution: "BF = 1 − 12 / 65.5 = 0.8168. Buoyed çəki = 91.8 · 0.8168 ≈ 75.0 lb/ft.",
  },
  {
    id: "s3",
    prompt: "3. WOB = 40,000 lbf və dizayn əmsalı 1.15 üçün lazım olan minimum DC uzunluğu neçə ft-dir?",
    unit: "ft",
    answer: 614,
    tol: 3,
    solution: "L = WOB · DF / (BF · w) = 40,000 · 1.15 / 75.0 = 46,000 / 75.0 ≈ 614 ft (təxminən 21 collar, hər biri ≈ 30 ft).",
  },
  {
    id: "s4",
    prompt: "4. DC uzunluğu 600 ft olduqda neutral point bit-dən neçə ft yuxarıdadır?",
    unit: "ft",
    answer: 533.7,
    tol: 3,
    solution:
      "NP = WOB / (BF · w) = 40,000 / 75.0 ≈ 534 ft. Bu, 600 ft DC daxilindədir (DC-in ≈ 89%-i), yəni DP və HWDP dartmadadır. Lakin DC çəkisi / WOB = 600·75.0/40,000 = 1.12 < 1.15: ehtiyat azdır.",
  },
  {
    id: "s5",
    prompt: "5. 5 in drill pipe (ID 4.276 in) üçün E-75 dərəcəsinin nəzəri dartma axma qüvvəsi T_y neçə lbf-dir?",
    unit: "lbf",
    answer: 395600,
    tol: 300,
    solution: "A = (π/4)(5² − 4.276²) = 5.275 in². T_y = 75,000 · 5.275 ≈ 395,600 lbf (yeni boru üçün).",
  },
  {
    id: "s6",
    prompt: "6. API RP 7G dizayn əmsalı ilə (0.9·T_y) icazə verilən maksimum dartma neçə lbf-dir?",
    unit: "lbf",
    answer: 356040,
    tol: 300,
    solution: "0.9 · 395,600 ≈ 356,040 lbf.",
  },
  {
    id: "s7",
    prompt:
      "7. Dərinlik 12,000 ft: DC 600 ft, HWDP 450 ft, DP 10,950 ft. Yerdən ayrılmış (off-bottom) halda hook load neçə lbf-dir? (buoyancy factor 12 ppg üçün)",
    unit: "lbf",
    answer: 258965,
    tol: 300,
    solution:
      "Havada: DC 600·91.8 = 55,062; HWDP 450·49.3 = 22,185; DP 10,950·21.9 = 239,805; cəmi ≈ 317,052 lb. Hook load = 317,052 · 0.8168 ≈ 258,965 lbf (blok çəkisi nəzərə alınmayıb).",
  },
  {
    id: "s8",
    prompt: "8. Margin of overpull (0.9·T_y − off-bottom hook load) neçə lbf-dir?",
    unit: "lbf",
    answer: 97071,
    tol: 400,
    solution: "MOP = 356,040 − 258,965 ≈ 97,075 lbf. Şirkətlər adətən minimum MOP tələb edir (məsələn, 50-100 klbf), dəyər prosedurdan asılıdır.",
  },
  {
    id: "s9",
    prompt: "9. WOB = 40,000 lbf ilə qazma zamanı hook load neçə lbf-dir?",
    unit: "lbf",
    answer: 218965,
    tol: 300,
    solution: "Hook load (qazma) = off-bottom − WOB = 258,965 − 40,000 = 218,965 lbf. Weight indicator-un azalması WOB-u göstərir.",
  },
];

export const DS_QUIZ: QuizQuestion[] = [
  {
    q: "Neutral point düzgün dizaynda harada olmalıdır?",
    options: ["Drill collar-ların daxilində", "Drill pipe daxilində", "Səthdə", "Bit-in altında"],
    correct: 0,
    explanation: "DC sərt və qalın divarlıdır, sıxılmaya davamlıdır. Neutral point DC-də olarsa, DP və HWDP dartmada qalır, buckling və yorğunluq riski azalır.",
  },
  {
    q: "Məhlul çəkisi artırılır. Weight indicator-da göstərilən string çəkisi necə dəyişir?",
    options: ["Azalır (buoyancy artır)", "Artır", "Dəyişmir", "Sıfıra enir"],
    correct: 0,
    explanation: "BF = 1 − MW/65.5. MW artdıqca BF azalır, buoyed çəki azalır, hook load düşür.",
  },
  {
    q: "8 in OD / 2.8125 in ID drill collar-ın çəkisi təxminən nə qədərdir?",
    options: ["70 lb/ft", "150 lb/ft", "230 lb/ft", "310 lb/ft"],
    correct: 1,
    explanation: "w = 2.6725 · (8² − 2.8125²) = 2.6725 · 56.09 ≈ 150 lb/ft.",
  },
  {
    q: "Pendulum assembly-nin məqsədi nədir?",
    options: ["Bucağı azaltmaq (drop)", "Bucağı artırmaq (build)", "Bucağı saxlamaq (hold)", "Bit-i soyutmaq"],
    correct: 0,
    explanation: "Pendulum-da ilk stabilizator bit-dən yuxarıdadır. Stabilizatordan aşağıdakı collar-ın çəkisi bit-i quyunun aşağı tərəfinə çəkir və bucaq azalır.",
  },
  {
    q: "Fulcrum assembly-nin tipik təsiri nədir?",
    options: ["Bucağı artırır (build)", "Bucağı azaldır", "Bucağı saxlayır", "Heç bir təsiri yoxdur"],
    correct: 0,
    explanation: "Near-bit stabilizator fulcrum rolunu oynayır, WOB ilə collar-lar aşağı əyilir və bit yuxarı tərəfə itələnir. Bucaq artır.",
  },
  {
    q: "Packed hole assembly niyə bucağı saxlayır?",
    options: [
      "Bit-ə yaxın bir neçə stabilizator və sərt collar-lar BHA-nın əyilməsinə mane olur",
      "Çünki ağır məhlul işlədilir",
      "Çünki bit daha böyükdür",
      "Çünki WOB sıfırdır",
    ],
    correct: 0,
    explanation: "Sıx yerləşmiş stabilizatorlar BHA-nı sərt edir və bit quyu oxu istiqamətində qalır.",
  },
  {
    q: "S-135 dərəcəsindəki '135' nəyi bildirir?",
    options: ["Minimum axma həddi, 135 ksi (135,000 psi)", "Uzunluğu, ft", "Çəkisi, lb/ft", "Qazma dərinliyi, ft"],
    correct: 0,
    explanation: "API drill pipe dərəcələri: E-75, X-95, G-105, S-135. Rəqəm minimum axma həddini (ksi) göstərir.",
  },
  {
    q: "HWDP nə üçün DC ilə DP arasında yerləşdirilir?",
    options: [
      "Sərtliyin ani dəyişməsini azaldır və maili quyuda yorğunluq/sürtünməni azaldır",
      "Məhlulu soyutmaq üçün",
      "Bit-i fırlatmaq üçün",
      "Çəkini azaltmaq üçün",
    ],
    correct: 0,
    explanation: "DC-dən DP-yə ani keçid gərginlik konsentrasiyası yaradır. HWDP keçid zonası təmin edir və maili quyuda sürtünməni azaldır.",
  },
  {
    q: "Margin of overpull (MOP) nədir?",
    options: [
      "İcazə verilən maksimum dartma ilə gözlənilən hook load arasındakı fərq",
      "Bit-in WOB-u",
      "Nasosun təzyiq ehtiyatı",
      "Casing-in dartma həddi",
    ],
    correct: 0,
    explanation: "MOP string-i normal çəkisindən artıq çəkmək üçün mövcud olan dartma ehtiyatıdır (məsələn, yapışma zamanı). Çox aşağı MOP riskli hesab olunur.",
  },
  {
    q: "Neutral point drill pipe-dadırsa (DP sıxılmada) əsas risk nədir?",
    options: ["Buckling və yorğunluq", "ROP artır", "ECD azalır", "Nasos təzyiqi sıfır olur"],
    correct: 0,
    explanation: "Uzun, nazik DP sıxılmada əyilməyə (buckling) meyillidir, bu da yorğunluq, tool joint zədəsi və sürtünmə artımına səbəb ola bilər.",
  },
  {
    q: "Qeyri-maqnit collar (NMDC) nə üçün istifadə olunur?",
    options: [
      "MWD/survey maqnit sensorlarını polad collar-ın maqnit təsirindən qorumaq üçün",
      "Bit-i soyutmaq üçün",
      "Çəkini artırmaq üçün",
      "Qazı ayırmaq üçün",
    ],
    correct: 0,
    explanation: "Polad collar-lar sensorlara maqnit təsir göstərir. Qeyri-maqnit collar maqnitometrlərin düzgün azimut ölçməsinə imkan verir.",
  },
];

export const DS_FORMULAS: FormulaGroup[] = [
  {
    title: "Çəki və buoyancy",
    rows: [
      { name: "Polad boru çəkisi", formula: "w = 2.6725 · (OD² − ID²)  [lb/ft]", note: "polad 490 lb/ft³" },
      { name: "En kəsik sahəsi", formula: "A = (π/4)·(OD² − ID²)  [in²]" },
      { name: "Buoyancy factor", formula: "BF = 1 − MW / 65.5" },
      { name: "Buoyed çəki", formula: "W_buoyed = W_hava · BF" },
    ],
  },
  {
    title: "DC dizaynı",
    rows: [
      { name: "Lazım olan DC uzunluğu", formula: "L_DC = WOB · DF / (BF · w_DC)", note: "DF tipik 1.15" },
      { name: "Neutral point (bit-dən)", formula: "NP = WOB / (BF · w_DC)", note: "DC daxilində olmalıdır" },
      { name: "DC faktoru", formula: "DC çəkisi (məhlulda) / WOB ≥ 1.15" },
    ],
  },
  {
    title: "Hook load",
    rows: [
      { name: "Off-bottom", formula: "HL_off = BF · (W_DC + W_HWDP + W_DP)" },
      { name: "Qazma zamanı", formula: "HL_drill = HL_off − WOB" },
      { name: "Eksenel qüvvə (bit-dən z)", formula: "F(z) = −WOB + BF · W(z)", note: "− sıxılma, + dartma" },
    ],
  },
  {
    title: "Dartma dizaynı (API RP 7G)",
    rows: [
      { name: "Axma qüvvəsi", formula: "T_y = σ_y · A" },
      { name: "İcazə verilən dartma", formula: "T_a = 0.9 · T_y" },
      { name: "Margin of overpull", formula: "MOP = T_a − HL_off" },
      { name: "Maks. DP uzunluğu", formula: "L_DP = (T_a − MOP − BF·(W_DC+W_HWDP)) / (BF · w_DP)" },
      { name: "DP dərəcələri (σ_y)", formula: "E-75, X-95, G-105, S-135  [ksi]" },
    ],
  },
];
