import type { QuizQuestion } from "../Quiz";
import type { MissionItem } from "./MissionRunner";
import type { FormulaGroup } from "./FormulaSheet";

export const BITS_OBJECTIVES = [
  "Roller cone, PDC və impregnated bit-lərin kəsmə mexanizmini və tətbiq sahəsini fərqləndirmək",
  "IADC roller cone kodunu oxumaq və bit-in dull grading kodunu şərh etmək",
  "ROP, bit torque-u və MSE-ni hesablamaq, bit səmərəliliyini qiymətləndirmək",
  "WOB-RPM parametr xəritəsini, founder effektini və torque limitini şərh etmək",
  "Cost per foot ilə bit run iqtisadiyyatını müqayisə etmək və bit-i nə vaxt çıxarmağı əsaslandırmaq",
];

export const BITS_MISSION_INTRO =
  "Sən 8.5 in quyuda bit performansını qiymətləndirirsən. Əvvəl ROP və MSE-ni hesabla, sonra bit torque və Pessier–Fear modeli, axırda iki bit-in cost per foot müqayisəsi və çıxarma qərarı. Real parametr xəritəsi və iqtisadi optimumu Vizual tab-ında sına.";

export const BITS_MISSION: MissionItem[] = [
  {
    id: "b1",
    prompt: "1. 8.5 in bit-in kəsik sahəsi neçə in²-dir?",
    unit: "in²",
    answer: 56.75,
    tol: 0.05,
    solution: "A = (π/4) · D² = 0.7854 · 8.5² = 56.75 in².",
  },
  {
    id: "b2",
    prompt: "2. Bit 60 saatda 3,200 ft qazıb. Orta ROP neçə ft/hr-dir?",
    unit: "ft/hr",
    answer: 53.3,
    tol: 0.1,
    solution: "ROP = 3,200 / 60 = 53.3 ft/hr.",
  },
  {
    id: "b3",
    prompt: "3. WOB = 30,000 lbf, bit 8.5 in, 120 rpm, torque 2,500 ft·lbf, ROP = 60 ft/hr. Mechanical Specific Energy (Teale) neçə psi-dir?",
    unit: "psi",
    answer: 33747,
    tol: 15,
    solution:
      "MSE = WOB/A + 120π·N·T/(A·ROP) = 30,000/56.745 + 120π·120·2,500/(56.745·60) = 528.7 + 33,218 ≈ 33,747 psi.",
  },
  {
    id: "b4",
    prompt: "4. Qazılan süxurun confined compressive strength-i (CCS) 12,000 psi-dir. MSE səmərəliliyi (CCS/MSE) neçə faizdir?",
    unit: "%",
    answer: 35.6,
    tol: 0.3,
    solution: "η = CCS / MSE = 12,000 / 33,747 = 0.356 → 35.6%. Yaxşı qazma rejimində bit səmərəliliyi təxminən 30-40% hesab olunur.",
  },
  {
    id: "b5",
    prompt: "5. Bit-in sürtünmə əmsalı μ = 0.5, WOB = 30,000 lbf, D = 8.5 in. Pessier–Fear modeli ilə bit torque-u neçə ft·lbf-dir? (T = μ·W·D/36)",
    unit: "ft·lbf",
    answer: 3541.7,
    tol: 1,
    solution: "T = 0.5 · 30,000 · 8.5 / 36 = 3,541.7 ft·lbf.",
  },
  {
    id: "b6",
    prompt: "6. Eyni parametrlərlə (μ = 0.5, N = 120 rpm, W = 30,000 lbf, D = 8.5 in), süxur CCS = 10,000 psi və bit səmərəliliyi η = 0.35 olduqda ROP neçə ft/hr olar? (ROP = 13.33·μ·N·W / (D·(MSE − W/A)), MSE = CCS/η)",
    unit: "ft/hr",
    answer: 100.7,
    tol: 0.5,
    solution:
      "MSE = 10,000 / 0.35 = 28,571 psi. W/A = 528.7 psi. ROP = 13.33 · 0.5 · 120 · 30,000 / (8.5 · (28,571 − 528.7)) = 23,994,000 / 238,357 ≈ 100.7 ft/hr.",
  },
  {
    id: "b7",
    prompt: "7. Top drive/motor bit torque-unu 10,000 ft·lbf ilə məhdudlaşdırır (μ = 0.5, D = 8.5 in). Torque limiti ilə icazə verilən maksimum WOB neçə lbf-dir?",
    unit: "lbf",
    answer: 84706,
    tol: 50,
    solution: "W_max = T_max · 36 / (μ · D) = 10,000 · 36 / (0.5 · 8.5) = 84,706 lbf. Bu WOB-dan yuxarıda torque limiti aşılır (6-cı bölmə ilə əlaqə).",
  },
  {
    id: "b8",
    prompt: "8. Bit A: qiyməti 18,000 $, rig 1,500 $/saat, qazma 60 saat, qoşulmalar 3 saat, trip 14 saat, 3,200 ft. Cost per foot neçə $/ft-dir?",
    unit: "$/ft",
    answer: 41.72,
    tol: 0.1,
    solution: "CPF = (C_b + C_r·(t_b + t_c + t_t)) / F = (18,000 + 1,500·77) / 3,200 = 133,500 / 3,200 ≈ 41.72 $/ft.",
  },
  {
    id: "b9",
    prompt: "9. Bit B (PDC): qiyməti 60,000 $, qazma 110 saat, qoşulmalar 5.5 saat, trip 14 saat, 7,000 ft, rig 1,500 $/saat. Cost per foot neçə $/ft-dir?",
    unit: "$/ft",
    answer: 36.32,
    tol: 0.1,
    solution:
      "CPF = (60,000 + 1,500·129.5) / 7,000 = 254,250 / 7,000 ≈ 36.32 $/ft. Bahalı bit daha çox məsafə qazdığı üçün daha ucuz çıxdı.",
  },
  {
    id: "b10",
    prompt: "10. Bit A işləyərkən cari ROP 30 ft/hr-ə düşüb. Ani xərc (rig dərəcəsi / ROP) neçə $/ft-dir? (Çıxarma qərarını bunu orta CPF ilə müqayisə edərək ver)",
    unit: "$/ft",
    answer: 50,
    tol: 0.1,
    solution: "Ani xərc = 1,500 / 30 = 50 $/ft. Bu, Bit A-nın orta CPF-indən (41.72) yüksəkdir: davam etmək orta xərci artırır, bit-i çıxarmaq məntiqlidir.",
  },
];

export const BITS_QUIZ: QuizQuestion[] = [
  {
    q: "PDC bit süxuru hansı mexanizmlə dağıdır?",
    options: ["Kəsmə (shearing)", "Əzmə və qırma (crushing/chipping)", "Hidravlik partlayış", "Yalnız aşındırma"],
    correct: 0,
    explanation: "PDC kəsicilər süxuru bıçaq kimi qırxır (shearing). Roller cone bit isə dişlərin vurması ilə süxuru əzir və qırır (crushing/chipping).",
  },
  {
    q: "IADC roller cone kodu 537 olarsa, birinci rəqəm (5) nəyi göstərir?",
    options: [
      "Insert (TCI) bit seriyası, yumşaq-orta formasiya",
      "Dişli (milled tooth) bit, bərk formasiya",
      "Mühürsüz yastıq",
      "Bit diametri",
    ],
    correct: 0,
    explanation: "Birinci rəqəm seriyadır: 1-3 milled tooth (yumşaq, orta, bərk), 4-8 insert bit-lər. 5 insert bit, yumşaq-orta formasiya deməkdir. İkinci rəqəm alt tip, üçüncü yastıq/gauge qorunmasıdır (7: mühürlü sürtünmə yastığı, gauge qorunması ilə).",
  },
  {
    q: "WOB artırılır, lakin bir həddən sonra ROP artmır və ya azalır. Bu hadisə necə adlanır?",
    options: ["Founder effekti", "Bit whirl", "ECD artımı", "Capstan effekti"],
    correct: 0,
    explanation: "Founder: WOB-un yüksək olduğu nöqtədən sonra səmərəlilik azalır (bit balling, dysfunction, hidravlik məhdudiyyət), əlavə WOB ROP-a çevrilmir.",
  },
  {
    q: "MSE (Mechanical Specific Energy) qəfil və davamlı artır. Bu nəyi göstərə bilər?",
    options: [
      "Səmərəlilik azalıb: bit balling, köhnəlmə, vibrasiya və ya founder",
      "Qazma daha səmərəli olub",
      "Məhlul çəkisi azalıb",
      "Casing seat dəyişib",
    ],
    correct: 0,
    explanation: "MSE bir vahid süxur həcmini qırmaq üçün sərf olunan enerjidir. Süxur sərtliyi dəyişməyibsə, MSE artımı səmərəliliyin azaldığını göstərir.",
  },
  {
    q: "Cost per foot hesabına hansı komponentlər daxildir?",
    options: [
      "Bit qiyməti və rig xərci (qazma + qoşulma + trip vaxtı)",
      "Yalnız bit qiyməti",
      "Yalnız rig xərci",
      "Yalnız casing qiyməti",
    ],
    correct: 0,
    explanation: "CPF = (bit qiyməti + rig dərəcəsi · (qazma + qoşulma + trip vaxtı)) / qazılan məsafə.",
  },
  {
    q: "Bit-i nə vaxt çıxarmaq iqtisadi baxımdan optimaldır?",
    options: [
      "Ani xərc (rig dərəcəsi / cari ROP) orta CPF-ə bərabər olduqda",
      "ROP sıfıra enəndə",
      "Bit qiyməti ödənildikdə",
      "Hər 100 saatdan sonra",
    ],
    correct: 0,
    explanation: "CPF(t)-nin minimumunda dCPF/dt = 0, bu da C_r/ROP = CPF deməkdir. Bundan sonra davam etmək orta xərci artırır.",
  },
  {
    q: "DULL kodunda 'WT' nəyi bildirir?",
    options: ["Köhnəlmiş dişlər/kəsicilər (worn teeth/cutters)", "Su axını problemi", "Yuyulmuş bit", "İtmiş konus"],
    correct: 0,
    explanation: "WT: worn teeth/cutters. Digər kodlar: BT qırılmış, CT çatlamış, LC itmiş konus, BU balling, WO washout.",
  },
  {
    q: "Pessier-Fear yanaşmasında bit torque-u necə qiymətləndirilir?",
    options: ["T = μ·W·D/36", "T = W / D", "T = ROP·N", "T = MSE·A"],
    correct: 0,
    explanation: "Bit torque WOB-a, bit diametrinə və bit-in sürtünmə əmsalına mütənasibdir: T [ft·lbf] = μ·W [lbf]·D [in]/36.",
  },
  {
    q: "Yapışqan gil formasiyasında bit-in 'balling' (şlamla örtülmə) riskini azaltmaq üçün nə edilir?",
    options: [
      "Hidravlikanı artırmaq, uyğun bit dizaynı və inhibisiyalı məhlul",
      "WOB-u kəskin artırmaq",
      "Axını azaltmaq",
      "Yalnız RPM-i artırmaq",
    ],
    correct: 0,
    explanation: "Bit balling-də gil bit-ə yapışır. Yaxşı hidravlika, nozzle/blade dizaynı və gil şişməsini məhdudlaşdıran məhlul riski azaldır.",
  },
  {
    q: "Çox bərk və abraziv formasiyada uzun run üçün hansı seçim məntiqlidir?",
    options: [
      "TCI roller cone və ya impregnated (turbodrill ilə)",
      "Yumşaq formasiya üçün milled tooth",
      "Ən yumşaq PDC",
      "Bit-siz qazma",
    ],
    correct: 0,
    explanation: "Bərk, abraziv formasiyalarda TCI roller cone və ya impregnated bit daha davamlıdır. PDC yüksək abrazivlik və zərbədə tez köhnələ bilər.",
  },
  {
    q: "WOB-u torque limiti üzərində artırmaq niyə mümkün deyil?",
    options: [
      "Bit torque-u WOB ilə artır, T = μ·W·D/36 limiti aşır",
      "WOB torque-a təsir etmir",
      "Bit daha yüngül olur",
      "ECD artır",
    ],
    correct: 0,
    explanation: "Bit torque-u WOB-a mütənasibdir. Top drive, motor və string torsiya limitləri bu torque-un yuxarı həddini təyin edir; bu da icazə verilən WOB-u məhdudlaşdırır.",
  },
];

export const BITS_FORMULAS: FormulaGroup[] = [
  {
    title: "ROP və bit",
    rows: [
      { name: "Bit sahəsi", formula: "A = (π/4)·D²  [in²]" },
      { name: "Orta ROP", formula: "ROP = footage / saat  [ft/hr]" },
      { name: "Bit torque (Pessier-Fear)", formula: "T = μ·W·D/36  [ft·lbf]" },
      { name: "Torque ilə məhdud WOB", formula: "W_max = 36·T_max/(μ·D)" },
    ],
  },
  {
    title: "MSE (Teale, Pessier-Fear)",
    rows: [
      { name: "MSE", formula: "MSE = W/A + 120π·N·T/(A·ROP)  [psi]", note: "W lbf, N rpm, T ft·lbf, ROP ft/hr" },
      { name: "MSE (μ ilə)", formula: "MSE = W/A + 13.33·μ·N·W/(D·ROP)" },
      { name: "Səmərəlilik", formula: "η = CCS / MSE" },
      { name: "ROP modeli", formula: "ROP = 13.33·μ·N·W / (D·(CCS/η − W/A))" },
    ],
  },
  {
    title: "Cost per foot",
    rows: [
      { name: "CPF", formula: "CPF = (C_b + C_r·(t_b + t_c + t_t)) / F" },
      { name: "Ani xərc", formula: "C_inst = C_r / ROP" },
      { name: "Optimum çıxarma", formula: "C_r / ROP(t) = CPF(t)", note: "dCPF/dt = 0" },
      { name: "Eksponensial azalma modeli", formula: "ROP(t) = R₀·e^(−kt);  F(t) = R₀·(1 − e^(−kt))/k" },
    ],
  },
  {
    title: "IADC roller cone",
    rows: [
      { name: "Seriya (1-ci rəqəm)", formula: "1-3: milled tooth; 4-8: insert (TCI)" },
      { name: "Tip (2-ci rəqəm)", formula: "1-4: seriyanın içində yumşaqdan bərkə" },
      { name: "Yastıq/gauge (3-cü rəqəm)", formula: "1-9: rolik, mühürlü rolik, mühürlü sürtünmə, gauge qorunması və s." },
      { name: "Dull grade", formula: "I-O-D-L-B-G-O-R", note: "daxili-xarici-xarakter-yer-yastıq-gauge-digər-səbəb" },
    ],
  },
];
