import type { QuizQuestion } from "../Quiz";
import type { MissionItem } from "./MissionRunner";
import type { FormulaGroup } from "./FormulaSheet";

export const HYD_OBJECTIVES = [
  "Sirkulyasiya sistemində təzyiq itkilərinin balansını (səth, boru, bit, halqa) qurmaq",
  "Laminar və turbulent rejimi fərqləndirmək, Bingham və power law ilə təzyiq itkisini hesablamaq",
  "Bit nozzle-lərini seçmək: ΔP_bit, nozzle sürəti, HSI, jet impact",
  "Max HHP və max impact kriteriyaları ilə axın sürətini və TFA-nı optimallaşdırmaq",
  "ECD-ni hesablayıb mud window ilə müqayisə etmək, surge/swab riskini qiymətləndirmək",
];

export const HYD_MISSION_INTRO =
  "Sən 10,000 ft quyunun hidravlika proqramını hazırlayırsan: 8.5 in açıq quyu, 5 in drill pipe, MW 12 ppg, axın 450 gpm. Əvvəl bit hidravlikasını, sonra halqa itkisini və ECD-ni hesabla, axırda optimallaşdırma və mud window yoxlaması et.";

export const HYD_MISSION: MissionItem[] = [
  {
    id: "h1",
    prompt: "1. Bit-də 3 nozzle var, hər biri 13/32 in (Cd = 0.95). Axın 450 gpm, MW 12 ppg. Bit-də təzyiq düşməsi neçə psi-dir?",
    unit: "psi",
    answer: 1480,
    tol: 5,
    solution:
      "TFA = 3 · (π/4) · (13/32)² = 0.3889 in². ΔP_bit = 8.311·10⁻⁵ · ρ · q² / (Cd² · A²) = 8.311·10⁻⁵ · 12 · 450² / (0.95² · 0.3889²) ≈ 1,480 psi.",
  },
  {
    id: "h2",
    prompt: "2. Eyni nozzle-lərdə nozzle sürəti neçə ft/s-dir?",
    unit: "ft/s",
    answer: 371.2,
    tol: 1,
    solution: "v_n = 0.3208 · q / A_t = 0.3208 · 450 / 0.3889 ≈ 371.2 ft/s.",
  },
  {
    id: "h3",
    prompt: "3. Bit-də hidravlik güc (bit HHP) neçə hp-dir?",
    unit: "hp",
    answer: 388.5,
    tol: 2,
    solution: "HHP_bit = ΔP_bit · q / 1714 = 1,480 · 450 / 1714 ≈ 388.5 hp.",
  },
  {
    id: "h4",
    prompt: "4. 8.5 in bit üçün HSI (bit HHP / bit sahəsi) neçə hp/in²-dir?",
    unit: "hp/in²",
    answer: 6.85,
    tol: 0.05,
    solution: "Bit sahəsi = (π/4) · 8.5² = 56.75 in². HSI = 388.5 / 56.75 ≈ 6.85 hp/in².",
  },
  {
    id: "h5",
    prompt: "5. Jet impact qüvvəsi neçə lbf-dir? (F = 0.01823 · Cd · q · √(ρ · ΔP_bit))",
    unit: "lbf",
    answer: 1038.5,
    tol: 5,
    solution: "F = 0.01823 · 0.95 · 450 · √(12 · 1,480) = 0.01823 · 0.95 · 450 · 133.3 ≈ 1,038 lbf.",
  },
  {
    id: "h6",
    prompt:
      "6. Halqa: 8.5 in quyu, 5 in drill pipe, 450 gpm, MW 12 ppg, PV = 22 cP, YP = 14 lb/100ft². Bingham modeli ilə 10,000 ft halqa boyunca təzyiq itkisi neçə psi-dir?",
    unit: "psi",
    answer: 269.9,
    tol: 3,
    solution:
      "v = 450 / (2.448 · (8.5² − 5²)) = 3.89 ft/s. Kritik sürət v_c = [1.08·22 + 1.08·√(22² + 9.26·3.5²·14·12)] / (12·3.5) = 4.16 ft/s. v < v_c: laminar. ΔP/L = 22·3.89 / (1000·3.5²) + 14 / (200·3.5) = 0.00699 + 0.0200 = 0.02699 psi/ft. 10,000 ft üçün ≈ 270 psi.",
  },
  {
    id: "h7",
    prompt: "7. Bu halqa itkisi ilə ECD (TVD = 10,000 ft, MW = 12 ppg) neçə ppg-dir?",
    unit: "ppg",
    answer: 12.52,
    tol: 0.02,
    solution: "ECD = MW + ΔP_halqa / (0.052 · TVD) = 12 + 269.9 / 520 = 12 + 0.519 ≈ 12.52 ppg.",
  },
  {
    id: "h8",
    prompt:
      "8. Nasosun maksimum təzyiqi 3,500 psi, parasitik itkinin eksponenti m = 1.8. Maksimum bit hidravlik gücü (max HHP) üçün bit-də optimum təzyiq düşməsi neçə psi-dir?",
    unit: "psi",
    answer: 2250,
    tol: 5,
    solution: "ΔP_bit,opt = m / (m + 1) · P_max = 1.8 / 2.8 · 3,500 = 2,250 psi (pump təzyiqinin təxminən 64%-i). Parasitik itki 1,250 psi qalır.",
  },
  {
    id: "h9",
    prompt: "9. Eyni şərtlərdə maksimum jet impact kriteriyası üçün optimum bit ΔP neçə psi-dir?",
    unit: "psi",
    answer: 1657.9,
    tol: 5,
    solution: "ΔP_bit,opt = m / (m + 2) · P_max = 1.8 / 3.8 · 3,500 ≈ 1,658 psi (təxminən 47%). Impact kriteriyası daha yüksək axın, daha az bit təzyiqi verir.",
  },
  {
    id: "h10",
    prompt:
      "10. Çat qradiyenti 14.0 ppg, çat margini 0.5 ppg, MW 12 ppg, TVD 10,000 ft. ECD-nin çat həddini keçməməsi üçün halqa təzyiq itkisi maksimum neçə psi ola bilər?",
    unit: "psi",
    answer: 780,
    tol: 5,
    solution: "ECD_max = FG − margin = 13.5 ppg. ΔP_halqa,max = (13.5 − 12.0) · 0.052 · 10,000 = 780 psi. Halqa itkisi bu həddi keçərsə, lost circulation riski yaranır (3-cü bölmədəki mud window).",
  },
];

export const HYD_QUIZ: QuizQuestion[] = [
  {
    q: "Axın sabit qalmaqla bit nozzle-lərinin ölçüsü kiçildilir. Nə baş verir?",
    options: [
      "TFA azalır, bit-də təzyiq düşməsi və pump təzyiqi artır",
      "Bit-də təzyiq düşməsi azalır",
      "Halqa təzyiq itkisi sıfıra enir",
      "ECD azalır",
    ],
    correct: 0,
    explanation: "ΔP_bit ∝ 1/A_t². Nozzle kiçildikcə TFA azalır, bit-də təzyiq düşməsi kvadratik artır və nasos eyni axını vermək üçün daha yüksək təzyiq tələb edir.",
  },
  {
    q: "ρ = 10 ppg, q = 500 gpm, TFA = 0.40 in², Cd = 0.95. Bit-də təzyiq düşməsi təxminən nə qədərdir?",
    options: ["720 psi", "1,439 psi", "2,880 psi", "5,760 psi"],
    correct: 1,
    explanation: "ΔP = 8.311·10⁻⁵ · 10 · 500² / (0.95² · 0.40²) = 207.8 / 0.1444 ≈ 1,439 psi.",
  },
  {
    q: "MW = 11 ppg, halqa təzyiq itkisi 260 psi, TVD = 8,000 ft. ECD?",
    options: ["11.26 ppg", "11.63 ppg", "12.00 ppg", "13.25 ppg"],
    correct: 1,
    explanation: "ECD = 11 + 260 / (0.052 · 8,000) = 11 + 0.625 = 11.63 ppg.",
  },
  {
    q: "m = 1.8 olduqda max HHP kriteriyası üçün optimum bit təzyiq düşməsi pump təzyiqinin təxminən neçə faizidir?",
    options: ["47%", "64%", "80%", "100%"],
    correct: 1,
    explanation: "m/(m+1) = 1.8/2.8 ≈ 64%. Max impact kriteriyası üçün isə m/(m+2) = 1.8/3.8 ≈ 47%.",
  },
  {
    q: "Axın sürəti artırılır. Halqa təzyiq itkisi və ECD necə dəyişir?",
    options: [
      "Halqa itkisi azalır, ECD azalır",
      "Halqa itkisi artır, ECD artır",
      "Dəyişmir",
      "Yalnız bit ΔP dəyişir",
    ],
    correct: 1,
    explanation: "Halqada sürət artdıqca sürtünmə itkisi artır, bu da ECD-ni yüksəldir. Hole cleaning yaxşılaşa bilər, amma çat həddinə yaxınlaşma riski artır.",
  },
  {
    q: "Boru quyuda sürətlə yuxarı çəkilir (swab). Əsas risk nədir?",
    options: [
      "Dib təzyiqinin artması və formasiyanın çatlaması",
      "Dib təzyiqinin azalması və formasiya mayesinin quyuya daxil olması (kick)",
      "Nasos təzyiqinin sıfıra düşməsi",
      "Bit nozzle-lərinin genişlənməsi",
    ],
    correct: 1,
    explanation: "Boru çəkiləndə altından məhlul axışı yaranır və dib təzyiqi müvəqqəti azalır (swab). MW − swab təzyiqi Pp-dən aşağı düşərsə, kick ola bilər. Boru endirilərkən isə surge təzyiqi yaranır və çat riski artır.",
  },
  {
    q: "Maili quyuda (təxminən 30-60°) hole cleaning niyə çətindir?",
    options: [
      "Cuttings yatağı (bed) əmələ gəlir və aşağı sürüşə bilər; yalnız özlülüklə həll olunmur",
      "Məhlul daha yüngül olur",
      "Boru fırlanması zərərlidir",
      "Halqada sürət əhəmiyyətsizdir",
    ],
    correct: 0,
    explanation: "Maili quyuda şlam quyunun aşağı tərəfində yatağa çevrilir. Axın sürəti, boru fırlanması, rheology və süpürmə (sweep) birlikdə tətbiq olunur.",
  },
  {
    q: "HSI nədir?",
    options: [
      "Bit-in sahəsinə düşən hidravlik güc: bit HHP / bit sahəsi",
      "Halqada sürət indeksi",
      "Nozzle sayı",
      "Pump səmərəliliyi",
    ],
    correct: 0,
    explanation: "HSI (hydraulic horsepower per square inch) bit-in kəsik sahəsinə görə hidravlik gücü ifadə edir: HSI = HHP_bit / ((π/4)·D_bit²).",
  },
  {
    q: "Üç nozzle, hər biri 12/32 in. TFA təxminən nə qədərdir?",
    options: ["0.110 in²", "0.331 in²", "0.553 in²", "1.00 in²"],
    correct: 1,
    explanation: "TFA = 3 · (π/4) · (12/32)² = 3 · 0.1104 = 0.331 in².",
  },
  {
    q: "Sabit axında standpipe təzyiqi tədricən artır. Ən ehtimal səbəb hansıdır?",
    options: [
      "Drill string-də washout",
      "Nozzle tıxanması və ya halqada pack-off (şlam yığılması)",
      "Nasos liner-inin aşınması",
      "Məhlul çəkisinin azalması",
    ],
    correct: 1,
    explanation: "Axına müqavimət artdıqda təzyiq qalxır: tıxanmış nozzle və ya halqada yığılma. Washout və nasos aşınması adətən təzyiqin azalmasına gətirir.",
  },
  {
    q: "Şaquli quyunun halqasında nəyə görə adətən laminar axın tərcih olunur?",
    options: [
      "Daha yüksək ECD verdiyi üçün",
      "Aşağı ECD və quyu divarının daha az eroziyası üçün",
      "Bit daha yaxşı təmizləndiyi üçün",
      "Nasos daha ucuz işlədiyi üçün",
    ],
    correct: 1,
    explanation: "Laminar halqa axını turbulentə nisbətən daha az təzyiq itkisi verir, ECD-ni aşağı saxlayır və zəif formasiyanın eroziyasını azaldır. Maili/üfüqi quyularda hole cleaning üçün bu tarazlıq dəyişə bilər.",
  },
];

export const HYD_FORMULAS: FormulaGroup[] = [
  {
    title: "Təzyiq balansı",
    rows: [
      { name: "Nasos təzyiqi", formula: "P_pump = ΔP_səth + ΔP_boru + ΔP_bit + ΔP_halqa" },
      { name: "Parasitik itki", formula: "P_p = ΔP_səth + ΔP_boru + ΔP_halqa = c · q^m" },
      { name: "Bit təzyiq fraksiyası", formula: "f_bit = ΔP_bit / P_pump" },
    ],
  },
  {
    title: "Bingham plastic (Bourgoyne)",
    rows: [
      { name: "Boru: sürət", formula: "v = q / (2.448·d²)  [ft/s]" },
      { name: "Boru: laminar", formula: "ΔP/L = μp·v/(1500·d²) + τy/(225·d)" },
      { name: "Boru: turbulent", formula: "ΔP/L = ρ^0.75·v^1.75·μp^0.25 / (1800·d^1.25)" },
      { name: "Boru: kritik sürət", formula: "vc = [1.08μp + 1.08√(μp² + 12.34·d²·τy·ρ)] / (ρ·d)" },
      { name: "Halqa: laminar", formula: "ΔP/L = μp·v/(1000·(d2−d1)²) + τy/(200·(d2−d1))" },
      { name: "Halqa: turbulent", formula: "ΔP/L = ρ^0.75·v^1.75·μp^0.25 / (1396·(d2−d1)^1.25)" },
      { name: "Halqa: kritik sürət", formula: "vc = [1.08μp + 1.08√(μp² + 9.26·(d2−d1)²·τy·ρ)] / (ρ·(d2−d1))" },
    ],
  },
  {
    title: "Bit hidravlikası",
    rows: [
      { name: "TFA", formula: "A_t = Σ (π/4)·(n_i/32)²  [in²]" },
      { name: "Bit təzyiq düşməsi", formula: "ΔP_bit = 8.311·10⁻⁵·ρ·q² / (Cd²·A_t²)", note: "Cd ≈ 0.95" },
      { name: "Nozzle sürəti", formula: "v_n = 0.3208·q / A_t  [ft/s]" },
      { name: "Bit HHP", formula: "HHP_bit = ΔP_bit·q / 1714" },
      { name: "HSI", formula: "HSI = HHP_bit / ((π/4)·D_bit²)" },
      { name: "Jet impact", formula: "F_j = 0.01823·Cd·q·√(ρ·ΔP_bit)  [lbf]" },
    ],
  },
  {
    title: "Optimallaşdırma, ECD və surge",
    rows: [
      { name: "m və c", formula: "m = ln(P1/P2)/ln(q1/q2);  c = P1/q1^m" },
      { name: "Max HHP", formula: "ΔP_bit = m/(m+1)·P_max;  q = (P_max/((m+1)c))^(1/m)" },
      { name: "Max impact", formula: "ΔP_bit = m/(m+2)·P_max;  q = (2P_max/((m+2)c))^(1/m)" },
      { name: "ECD", formula: "ECD = MW + ΔP_halqa / (0.052·TVD)" },
      { name: "Surge/swab (qapalı uc)", formula: "v_a = v_p·[d_p²/(d_h² − d_p²) + K],  K ≈ 0.45", note: "yalnız skrininq qiymətləndirməsi" },
      { name: "Carrying Capacity Index", formula: "CCI = K·MW·AV / 400,000", note: "təlimat göstəricisi" },
    ],
  },
];
