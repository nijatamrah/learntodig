import type { QuizQuestion } from "../Quiz";
import type { MissionItem } from "./MissionRunner";
import type { FormulaGroup } from "./FormulaSheet";

export const FLUIDS_OBJECTIVES = [
  "Qazma məhlulunun funksiyalarını və əsas növlərini (WBM, OBM, SBM) müqayisə etmək",
  "Viskozimetr oxunuşlarından PV, YP, AV hesablamaq və 3 rheology modelini şərh etmək",
  "Ağırlaşdırma (barit) və seyreltmə hesablamalarını aparmaq",
  "Məhlul çəkisinin mud window ilə əlaqəsini izah etmək",
  "Tipik məhlul problemlərini (kontaminasiya, itki, barit sag) əlamətlərinə görə diaqnoz etmək",
];

export const FLUIDS_MISSION_INTRO =
  "Sən məhlul mühəndisinin köməkçisisən. Rig-sayt ölçmələrindən rheology-ni hesabla, sonra məhlul çəkisini dəyiş və qarışıqları hesabla. Hər həll addım-addım göstərilir.";

export const FLUIDS_MISSION: MissionItem[] = [
  {
    id: "f1",
    prompt: "1. Viskozimetr: θ600 = 58, θ300 = 36. Plastik özlülük (PV) neçə cP-dir?",
    unit: "cP",
    answer: 22,
    tol: 0.1,
    solution: "PV = θ600 − θ300 = 58 − 36 = 22 cP.",
  },
  {
    id: "f2",
    prompt: "2. Eyni oxunuşlarda axma həddi (YP) neçə lb/100ft²-dir?",
    unit: "lb/100ft²",
    answer: 14,
    tol: 0.1,
    solution: "YP = θ300 − PV = 36 − 22 = 14 lb/100ft².",
  },
  {
    id: "f3",
    prompt: "3. Görünən özlülük (AV) neçə cP-dir?",
    unit: "cP",
    answer: 29,
    tol: 0.1,
    solution: "AV = θ600 / 2 = 58 / 2 = 29 cP.",
  },
  {
    id: "f4",
    prompt: "4. Başqa məhlul: θ600 = 60, θ300 = 38. Power law indeksi n neçədir?",
    unit: "",
    answer: 0.66,
    tol: 0.01,
    solution: "n = 3.32 · log₁₀(θ600 / θ300) = 3.32 · log₁₀(1.579) = 3.32 · 0.1984 ≈ 0.659. n < 1 məhlulun kəsilmə ilə nazikləşdiyini (shear thinning) göstərir.",
  },
  {
    id: "f5",
    prompt: "5. 500 bbl məhlulun çəkisi 10.0 ppg-dən 12.0 ppg-yə qaldırılmalıdır. Barit (35 ppg) istifadə olunur. Neçə 100 lb-lıq kisə lazımdır?",
    unit: "kisə",
    answer: 639,
    tol: 5,
    solution:
      "100 bbl üçün kisə = 1470 · (W2 − W1) / (35 − W2) = 1470 · 2 / 23 = 127.8. 500 bbl üçün: 127.8 · 5 ≈ 639 kisə (≈ 63,900 lb).",
  },
  {
    id: "f6",
    prompt: "6. Eyni əməliyyatda məhlulun həcmi təxminən neçə bbl artır?",
    unit: "bbl",
    answer: 43.5,
    tol: 0.5,
    solution: "Barit həcmi = 63,913 lb / 35 ppg = 1,826 gal = 43.5 bbl. Ağırlaşdırma həcmi artırır, çən tutumunu əvvəlcədən yoxla.",
  },
  {
    id: "f7",
    prompt: "7. 500 bbl, 14.0 ppg məhlulu 13.0 ppg-yə endirmək üçün şirin su (8.33 ppg) əlavə edilir. Neçə bbl su lazımdır?",
    unit: "bbl",
    answer: 107.1,
    tol: 1,
    solution: "V_add = V1 · (W1 − W2) / (W2 − W_su) = 500 · 1.0 / (13.0 − 8.33) = 107.1 bbl. Yoxlama: (500·14 + 107.1·8.33) / 607.1 = 13.0 ppg.",
  },
  {
    id: "f8",
    prompt: "8. 300 bbl 9.0 ppg məhlul 200 bbl 12.0 ppg məhlulla qarışdırılır. Son çəki neçə ppg-dir?",
    unit: "ppg",
    answer: 10.2,
    tol: 0.05,
    solution: "W = (300·9.0 + 200·12.0) / 500 = (2,700 + 2,400) / 500 = 10.2 ppg.",
  },
  {
    id: "f9",
    prompt: "9. Drill string-in havadakı çəkisi 250,000 lbf-dir. 12 ppg məhlulda indikatorun göstərəcəyi (buoyed) çəki neçə lbf-dir?",
    unit: "lbf",
    answer: 204200,
    tol: 400,
    solution: "BF = 1 − 12 / 65.5 = 0.8168. Buoyed çəki = 250,000 · 0.8168 ≈ 204,200 lbf. Məhlul çəkisi artdıqca indikator çəkisi azalır.",
  },
];

export const FLUIDS_QUIZ: QuizQuestion[] = [
  {
    q: "Marsh funnel ilə şirin suyun (70°F) göstəricisi nədir?",
    options: ["26 s/qt", "45 s/qt", "60 s/qt", "100 s/qt"],
    correct: 0,
    explanation: "Marsh funnel-də 1 qt şirin suyun axma vaxtı təxminən 26 saniyədir. Funnel viskozitesi yalnız keyfiyyət göstəricisidir, rheology parametri deyil.",
  },
  {
    q: "θ600 = 70, θ300 = 45. YP nə qədərdir?",
    options: ["20 lb/100ft²", "25 lb/100ft²", "45 lb/100ft²", "70 lb/100ft²"],
    correct: 0,
    explanation: "PV = 70 − 45 = 25 cP. YP = θ300 − PV = 45 − 25 = 20 lb/100ft².",
  },
  {
    q: "Qazın neft əsaslı məhlulda (OBM) həll olması kick-in aşkarlanmasına necə təsir edir?",
    options: [
      "Kick daha tez görünür",
      "Təsiri yoxdur",
      "Qaz məhlulda həll olduğundan çən artımı gec görünə bilər, qaz yuxarıda qəfil genişlənir",
      "Quyu təzyiqi dərhal sıfıra düşür",
    ],
    correct: 2,
    explanation: "Qaz OBM-in əsas fazasında həll olur və təzyiq qabarma nöqtəsinə (bubble point) enənə qədər sərbəst qaz kimi görünmür. Bu, kick-in gec aşkarlanmasına və yuxarıda sürətli genişlənməyə səbəb ola bilər.",
  },
  {
    q: "100 bbl məhlulun çəkisi 10 ppg-dən 12 ppg-yə qaldırılır (barit 35 ppg). Neçə kisə (100 lb) lazımdır?",
    options: ["64", "128", "256", "12.8"],
    correct: 1,
    explanation: "Kisə = 1470 · (12 − 10) / (35 − 12) ≈ 128. Ağırlaşdırma həcmi də təxminən 8.7 bbl artırır.",
  },
  {
    q: "Sement kontaminasiyası olan su əsaslı məhlulda (pH və viskozite qalxıb) tipik müalicə hansıdır?",
    options: ["Soda ash", "Natrium bikarbonat (sodium bicarbonate)", "Əlavə barit", "Əlavə sement"],
    correct: 1,
    explanation: "Sementdən gələn kalsium və yüksək pH natrium bikarbonatla düzəldilir. Soda ash isə daha çox gips/anhidrit kalsiumunu çökdürmək üçün istifadə olunur.",
  },
  {
    q: "Gel strength-in (10 san/10 dəq) əsas məqsədi nədir?",
    options: [
      "Nasos təzyiqini artırmaq",
      "pH-ı tənzimləmək",
      "Filtratı azaltmaq",
      "Sirkulyasiya dayananda şlamı və ağırlaşdırıcını asılı saxlamaq",
    ],
    correct: 3,
    explanation: "Gel strength məhlulun hərəkətsiz qalanda strukturunu saxlamasıdır: bağlantı və trip zamanı şlam və barit çökməsin. Həddindən artıq gel isə nasosu işə salanda təzyiq sıçrayışı yaradır.",
  },
  {
    q: "API aşağı təzyiqli filtrat testinin standart şərti hansıdır?",
    options: ["100 psi, 30 dəq", "500 psi, 10 dəq", "1,000 psi, 60 dəq", "Atmosfer təzyiqi, 5 dəq"],
    correct: 0,
    explanation: "Standart API filtrat testi 100 psi fərq təzyiqi ilə 30 dəqiqə aparılır. Yüksək temperatur və təzyiq üçün ayrıca HPHT testi var.",
  },
  {
    q: "Məhlul çəkisi 12 ppg olduqda buoyancy factor nə qədərdir?",
    options: ["0.817", "0.543", "1.22", "0.183"],
    correct: 0,
    explanation: "BF = 1 − MW / 65.5 = 1 − 12 / 65.5 ≈ 0.817. Yəni string-in məhluldakı çəkisi havadakı çəkinin təxminən 82%-dir.",
  },
  {
    q: "Methylene Blue Test (MBT) yüksək çıxıb. Bu nəyi göstərir?",
    options: [
      "Məhlulda çox barit var",
      "Reaktiv (aktiv) gil tərkibi yüksəlib",
      "pH aşağıdır",
      "Neft fazası çoxdur",
    ],
    correct: 1,
    explanation: "MBT məhlulun kation mübadiləsi qabiliyyətini, yəni aktiv gilin miqdarını ölçür. Yüksək MBT viskozite və gel artımının səbəbi ola bilər və solids control-un yaxşılaşdırılmasını tələb edir.",
  },
  {
    q: "Məhlul çəkisini həddindən artıq yüksək saxlamağın əsas riski nədir?",
    options: [
      "Kick riski artır",
      "Bit daha tez fırlanır",
      "Çat qradiyentinə yaxınlaşma: lost circulation və differensial yapışma riski artır",
      "Heç bir risk yoxdur",
    ],
    correct: 2,
    explanation: "Yuxarı hədd çat qradiyentidir (3-cü bölmə). Həddindən artıq MW lost circulation, differensial yapışma və ROP azalmasına səbəb ola bilər.",
  },
  {
    q: "Barit sag hansı şəraitdə daha ehtimaldır?",
    options: [
      "Şaquli quyuda yüksək axın sürətində",
      "Maili quyuda, statik və ya aşağı sirkulyasiya şəraitində, zəif low-shear rheology ilə",
      "Yalnız su əsaslı məhlulda şirin su ilə",
      "Yalnız səthdə",
    ],
    correct: 1,
    explanation: "Maili quyuda baritin çökməsi quyunun aşağı tərəfində qalın təbəqə yaradır. Nəticədə məhlul çəkisi qeyri-bərabər olur və dib təzyiqi sabit qalmır. Low-shear rheology və gel idarəsi bunu azaldır.",
  },
];

export const FLUIDS_FORMULAS: FormulaGroup[] = [
  {
    title: "Rheology (API RP 13D)",
    rows: [
      { name: "Plastik özlülük", formula: "PV = θ600 − θ300  [cP]" },
      { name: "Axma həddi", formula: "YP = θ300 − PV  [lb/100ft²]" },
      { name: "Görünən özlülük", formula: "AV = θ600 / 2  [cP]" },
      { name: "Bingham modeli (dial)", formula: "θ(N) = YP + PV · N/300" },
      { name: "Power law", formula: "n = 3.32·log(θ600/θ300);  K = 510·θ300 / 511^n" },
      { name: "Herschel-Bulkley", formula: "τ0 = 2θ3 − θ6;  n = 3.32·log((θ600−τ0)/(θ300−τ0))" },
    ],
  },
  {
    title: "Ağırlaşdırma",
    rows: [
      { name: "Kisə / 100 bbl (barit 35 ppg)", formula: "S = 1470 · (W2 − W1) / (35 − W2)", note: "ümumi: lb/bbl = 42·ρ·(W2−W1)/(ρ − W2)" },
      { name: "Həcm artımı", formula: "ΔV = m_lb / (ρ_ppg · 42)  [bbl]" },
      { name: "Material sıxlıqları (tipik)", formula: "barit ≈ 35, hematit ≈ 41.7, CaCO₃ ≈ 22.5 ppg", note: "dəqiq qiymət üçün təchizatçı datasını yoxla" },
    ],
  },
  {
    title: "Seyreltmə və qarışıq",
    rows: [
      { name: "Seyreltmə", formula: "V_add = V1 · (W1 − W2) / (W2 − W_add)" },
      { name: "İki məhlulun qarışığı", formula: "W = (V1·W1 + V2·W2) / (V1 + V2)" },
      { name: "Şirin su", formula: "8.33 ppg ≈ 0.433 psi/ft" },
    ],
  },
  {
    title: "Digər",
    rows: [
      { name: "Buoyancy factor", formula: "BF = 1 − MW / 65.5" },
      { name: "Buoyed çəki", formula: "W_buoyed = W_hava · BF" },
      { name: "Hidrostatik təzyiq", formula: "Ph = 0.052 · MW · TVD" },
    ],
  },
];

// ---------- Diaqnostika ----------

export interface Diagnosis {
  id: string;
  symptom: string;
  signs: string[];
  cause: string;
  tests: string[];
  actions: string[];
  wellControl?: boolean;
}

export const DIAGNOSES: Diagnosis[] = [
  {
    id: "cement",
    symptom: "Viskozite, gel və pH qəfil artıb (su əsaslı məhlul, sement qazandıqdan sonra)",
    signs: ["Funnel viskozite və YP qalxır", "pH və Pf/Pm yüksəlir", "Kalsium (sərtlik) artır"],
    cause: "Sement kontaminasiyası: sementdən gələn kalsium və hidroksid.",
    tests: ["pH, Pf/Pm", "Ca²⁺ (total hardness) titrasiyası"],
    actions: ["Natrium bikarbonat (və ya SAPP) ilə kalsiumu bağlamaq və pH-ı endirmək", "Sement qazıldıqdan sonra xassələri izləyib bərpa etmək", "Şirkət məhlul proqramına uyğun müalicə"],
  },
  {
    id: "gypsum",
    symptom: "Kalsium artır, filtrat və viskozite artır (anhidrit/gips qatını qazanda)",
    signs: ["Ca²⁺ və sulfat artır", "API filtrat artır", "Viskozite və gel dəyişir"],
    cause: "Gips/anhidrit kontaminasiyası.",
    tests: ["Ca²⁺ (hardness)", "API filtrat", "pH"],
    actions: ["Soda ash (Na₂CO₃) ilə kalsiumu çökdürmək", "Zərurət olarsa, məhlul sistemini gips-davamlı sistemə çevirmək", "Qatın dərinliyini geoloji proqramla yoxlamaq"],
  },
  {
    id: "salt",
    symptom: "Xlorid artır (Cl⁻) və çən həcmi artır / çəki azalır",
    signs: ["Cl⁻ titrasiyası yüksəlir", "Çən həcmi artır (axın varsa)", "Məhlul çəkisi azala bilər"],
    cause: "Duzlu formasiya suyunun quyuya daxil olması (kick) və ya duz qatının qazılması (həcm sabit, yalnız xlorid artır).",
    tests: ["Cl⁻ titrasiyası", "PVT və flow-out trendi", "Flow check"],
    actions: ["Həcm artımı varsa dərhal well control prosedurası: flow check, lazım olarsa quyunu bağlamaq", "Yalnız duz qatıdırsa: məhlul sistemini duza uyğunlaşdırmaq və seyreltmə/müalicə"],
    wellControl: true,
  },
  {
    id: "gas",
    symptom: "Səthdə məhlul çəkisi azalır (qaz-kəsilmiş), çən həcmi artır, qaz göstəriciləri qalxır",
    signs: ["Gas-cut mud", "PVT və flow-out artımı", "Qaz detektoru göstəriciləri"],
    cause: "Formasiya qazının məhlula daxil olması.",
    tests: ["Mud balance (səthdə) və qaz göstəriciləri", "PVT, flow-out, flow check"],
    actions: ["Prosedura uyğun flow check və quyunu bağlama qərarı", "Degasser istifadəsi", "Səthdəki çəki azalmasına görə dib təzyiqini qiymətləndirməmək: qaz dərinlikdə sıxılıb, səthdə genişlənir"],
    wellControl: true,
  },
  {
    id: "solids",
    symptom: "Çəki, viskozite, gel və MBT tədricən artır, filter cake qalınlaşır",
    signs: ["Retort bərk hissəcik % artır", "MBT yüksəlir", "Pump təzyiqi və ECD artır"],
    cause: "Qazma bərk hissəciklərinin (aktiv gil) yığılması: solids control çatışmazlığı.",
    tests: ["Retort (bərk hissəcik %)", "MBT", "Qum miqdarı"],
    actions: ["Shaker ekranlarını yoxlamaq/dəyişmək, desander/desilter və centrifuge-dən istifadə etmək", "Seyreltmə", "Gil inhibisiyası üçün məhlul sistemini nəzərdən keçirmək"],
  },
  {
    id: "loss",
    symptom: "Çən həcmi azalır, flow-out < flow-in",
    signs: ["PVT azalır", "Flow-out axını nasos axınından azdır", "Quyu səviyyəsi enə bilər"],
    cause: "Məhlul itkisi (lost circulation): zəif, çatlı və ya karstlı formasiya, yaxud həddindən artıq ECD.",
    tests: ["PVT və flow-out trendi", "Quyu səviyyəsinə nəzarət (trip tank)"],
    actions: ["Prosedura uyğun nasos sürətini azaltmaq", "LCM (itki əleyhinə material) qarışığı", "MW/ECD-ni mud window daxilində azaltmaq", "İtki dərəcəsinə (seepage/partial/total) görə strategiya seçmək"],
    wellControl: true,
  },
  {
    id: "sag",
    symptom: "OBM, maili quyu: trip və ya dayanmadan sonra bottoms-up-da çəki dalğalanır (əvvəl yüngül, sonra ağır)",
    signs: ["Qeyri-bərabər məhlul çəkisi", "Dib təzyiqi qeyri-sabitliyi", "Qaz göstəricilərinin artması mümkündür"],
    cause: "Barit sag: ağırlaşdırıcının quyunun aşağı tərəfində çökməsi.",
    tests: ["Hər bottoms-up-da MW izləmək", "Low-shear rheology (6/3 rpm, gel)"],
    actions: ["Low-shear rheology və gel strength-i idarə etmək", "Dayanma zamanı mümkünsə sirkulyasiya/fırlanma", "Bottoms-up zamanı çəki və təzyiqləri diqqətlə izləmək"],
    wellControl: true,
  },
];
