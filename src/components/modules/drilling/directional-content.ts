import type { QuizQuestion } from "../Quiz";
import type { MissionItem } from "./MissionRunner";
import type { FormulaGroup } from "./FormulaSheet";

export const DIRECTIONAL_OBJECTIVES = [
  "Quyu profillərini (J-tipli, S-tipli, horizontal, ERD) və hər birinin nə üçün seçildiyini izah etmək",
  "Survey məlumatından (MD, inklinasiya, azimut) minimum curvature metodu ilə TVD, N, E və vertical section hesablamaq",
  "Dogleg və DLS-i hesablamaq və limitlərə (bükülmə gərginliyi, torque/drag, casing) görə qiymətləndirmək",
  "Build-and-hold planını qurmaq: build radius, tangent bucağı, build və tangent uzunluqları, ümumi MD",
  "Toolface-in (high side, sağ, low side) trayektoriyaya təsirini və steering alətlərini (motor, RSS) başa düşmək",
  "Anti-collision ayırma faktorunu və survey qeyri-müəyyənliyinin mənasını şərh etmək",
];

export const DIRECTIONAL_MISSION_INTRO =
  "Sən qaz-neft platformasından hədəfə doğru J-tipli (build-and-hold) quyu planlaşdırırsan: KOP 2,000 ft, build rate 3°/100 ft, hədəf 9,000 ft TVD dərinlikdə və səthdən 3,000 ft horizontal məsafədədir. Əvvəl planı hesabla, sonra iki survey stansiyası ilə minimum curvature, DLS və bükülmə gərginliyini yoxla, axırda toolface və anti-collision. Planı Vizual tab-ında dəyişdirib sınaya bilərsən.";

export const DIRECTIONAL_MISSION: MissionItem[] = [
  {
    id: "d1",
    prompt: "1. Build rate 3°/100 ft olan build bölməsinin radiusu neçə ft-dir? (R = 5729.58 / BUR)",
    unit: "ft",
    answer: 1909.9,
    tol: 0.3,
    solution: "R = 5729.58 / 3 = 1,909.9 ft. 5729.58 = (180/π)·100 ədədidir: 100 ft qövs uzunluğunda 1° dəyişmə üçün radius.",
  },
  {
    id: "d2",
    prompt:
      "2. Build-and-hold planı: KOP = 2,000 ft, R = 1,909.9 ft, hədəf TVD = 9,000 ft, hədəfə horizontal məsafə D = 3,000 ft. Tangent (hold) inklinasiyası neçə dərəcədir?\n(V = TVD − KOP; L = √((D−R)² + V²); θ = acos(−R/L) − atan2(V, D−R))",
    unit: "°",
    answer: 24.49,
    tol: 0.05,
    solution:
      "V = 7,000 ft, D − R = 1,090.1 ft. L = √(1,090.1² + 7,000²) = 7,084.3 ft. acos(−1,909.9/7,084.3) = 105.64°, atan2(7,000, 1,090.1) = 81.15°. θ = 105.64 − 81.15 = 24.49°.",
  },
  {
    id: "d3",
    prompt: "3. Build bölməsinin uzunluğu (MD) neçə ft-dir? (L_build = R·θ, θ radyanla)",
    unit: "ft",
    answer: 816.4,
    tol: 1,
    solution: "θ = 24.49° = 0.4275 rad. L_build = 1,909.9 · 0.4275 = 816.4 ft. Yoxlama: 24.49° / 3°·100 = 816.4 ft.",
  },
  {
    id: "d4",
    prompt: "4. Tangent (hold) bölməsinin uzunluğu neçə ft-dir? (L_tan = √(L² − R²))",
    unit: "ft",
    answer: 6822,
    tol: 2,
    solution: "L_tan = √(7,084.3² − 1,909.9²) = √(50,188,000 − 3,647,700) = 6,822 ft.",
  },
  {
    id: "d5",
    prompt: "5. Hədəfə çatan ümumi MD neçə ft-dir? (KOP + build + tangent)",
    unit: "ft",
    answer: 9638.5,
    tol: 2,
    solution: "MD = 2,000 + 816.4 + 6,822.1 = 9,638.5 ft. MD TVD-dən 638 ft çoxdur: quyu əyri olduğuna görə drillstring və casing daha uzun yol keçir.",
  },
  {
    id: "d6",
    prompt: "6. İki survey stansiyası: S1 (MD 5,000 ft, inc 20°, azi 45°), S2 (MD 5,100 ft, inc 23°, azi 52°). Dogleg bucağı β neçə dərəcədir?\n(cos β = cos(I₂−I₁) − sin I₁ sin I₂ (1 − cos(A₂−A₁)))",
    unit: "°",
    answer: 3.943,
    tol: 0.01,
    solution: "cos β = cos 3° − sin 20° · sin 23° · (1 − cos 7°) = 0.99863 − 0.34202·0.39073·0.00745 = 0.99763. β = acos(0.99763) = 3.943°.",
  },
  {
    id: "d7",
    prompt: "7. Eyni iki stansiya üçün DLS neçə °/100 ft-dir? (DLS = β·100/ΔMD)",
    unit: "°/100ft",
    answer: 3.94,
    tol: 0.02,
    solution: "DLS = 3.943 · 100 / 100 = 3.94 °/100 ft. Bu 3°/100 ft build rate-dən bir qədər çoxdur, çünki inklinasiya və azimut eyni zamanda dəyişir.",
  },
  {
    id: "d8",
    prompt: "8. Minimum curvature ilə iki stansiya arasında TVD artımı neçə ft-dir? (ΔTVD = ΔMD/2 · (cos I₁ + cos I₂) · RF, RF = 1.0004)",
    unit: "ft",
    answer: 93.05,
    tol: 0.1,
    solution: "ΔTVD = 100/2 · (cos 20° + cos 23°) · 1.0004 = 50 · (0.93969 + 0.92050) · 1.0004 = 93.05 ft. MD 100 ft olsa da TVD 93 ft artır, çünki quyu şaquli deyil.",
  },
  {
    id: "d9",
    prompt: "9. Tangential metod (yalnız aşağı stansiyanın bucağı) eyni interval üçün ΔEast-i minimum curvature-dan neçə ft artıq verir? (MCM: ΔE = 27.50 ft)",
    unit: "ft",
    answer: 3.29,
    tol: 0.05,
    solution: "Tangential: ΔE = 100 · sin 23° · sin 52° = 30.79 ft. Fərq = 30.79 − 27.50 = 3.29 ft. 100 ft-lik intervalda belə 3 ft səhv yüzlərlə stansiya ərzində yığılır. Buna görə sənaye minimum curvature istifadə edir.",
  },
  {
    id: "d10",
    prompt: "10. Quyunun dibi səth nöqtəsindən 1,200 ft şimala və 800 ft şərqə sürüşüb. Hədəf azimutu 30°-dir. Vertical section (VS) neçə ft-dir? (VS = N·cos Az + E·sin Az)",
    unit: "ft",
    answer: 1439.2,
    tol: 1,
    solution: "VS = 1,200·cos 30° + 800·sin 30° = 1,039.2 + 400 = 1,439.2 ft. Closure (düz xətt məsafəsi) isə √(1,200² + 800²) = 1,442.2 ft, azimutu 33.7° olur.",
  },
  {
    id: "d11",
    prompt: "11. 5 in OD drillpipe DLS = 6°/100 ft olan dogleg-də fırlanır. Bükülmə gərginliyi neçə psi-dir? (σ = 218.2 · OD · DLS)",
    unit: "psi",
    answer: 6546,
    tol: 5,
    solution: "σ = 218.2 · 5 · 6 = 6,546 psi. Bu dövri gərginlikdir: boru hər dövrədə dartılma və sıxılma yaşayır, ona görə yorğunluq (fatigue) əsas riskdir. Yüksək DLS-də rotasiya məhdudlaşdırılır.",
  },
  {
    id: "d12",
    prompt: "12. İnklinasiya 30°, azimut 45°. Bent housing motorla 3° dogleg yaradırsan, toolface 60° (sağ-yuxarı). Yeni inklinasiya neçə dərəcədir?\n(cos I₂ = cos I₁ cos β − sin I₁ sin β cos TF)",
    unit: "°",
    answer: 31.6,
    tol: 0.03,
    solution: "cos I₂ = cos 30° cos 3° − sin 30° sin 3° cos 60° = 0.86603·0.99863 − 0.5·0.05234·0.5 = 0.85176. I₂ = 31.60°. Toolface 0° olsaydı inc 33°, 90° olsaydı 30.14° olardı: toolface build və turn-un paylanmasını təyin edir.",
  },
  {
    id: "d13",
    prompt: "13. Eyni şərtdə toolface 90° (düz sağ) olsa azimut neçə dərəcə dəyişir?\n(tan ΔA = sin β sin TF / (sin I₁ cos β + cos I₁ sin β cos TF))",
    unit: "°",
    answer: 5.98,
    tol: 0.03,
    solution: "tan ΔA = sin 3° · 1 / (sin 30° · cos 3° + 0) = 0.05234 / 0.49932 = 0.10482. ΔA = 5.98°. İnklinasiya demək olar ki, dəyişmir (30.14°): saf turn.",
  },
  {
    id: "d14",
    prompt: "14. Qonşu quyuya mərkəz-mərkəz məsafə 60 ft, bizim quyunun qeyri-müəyyənlik radiusu 18 ft, qonşunun 12 ft-dir. Ayırma faktoru (SF) neçədir?",
    unit: "",
    answer: 2.0,
    tol: 0.02,
    solution: "SF = CC / (r₁ + r₂) = 60 / (18 + 12) = 2.0. Çox operator SF < 1.5 olduqda xüsusi icazə və əlavə tədbir tələb edir, SF < 1.0 isə qeyri-müəyyənlik elipslərinin kəsişdiyini göstərir.",
  },
];

export const DIRECTIONAL_QUIZ: QuizQuestion[] = [
  {
    q: "KOP (kick-off point) nədir?",
    options: [
      "Quyunun şaquli hissəsini tərk edib əyilməyə başladığı dərinlik",
      "Casing-in oturduğu dərinlik",
      "Hədəf layın təpəsi",
      "Qazma qurğusunun hündürlüyü",
    ],
    correct: 0,
    explanation: "KOP-dan sonra build bölməsi başlayır. KOP-u dayaz seçmək build rate-i aşağı saxlamağa imkan verir, lakin yumşaq formasiyada əyilmək asan, sərt formasiyada çətin olur.",
  },
  {
    q: "Minimum curvature metodu quyunun iki stansiya arasındakı hissəsini necə modelləşdirir?",
    options: [
      "Hamar dairəvi qövs kimi (ratio factor ilə düzəliş)",
      "Düz xətt kimi, aşağı stansiyanın bucağı ilə",
      "İki düz xətt kimi",
      "Yalnız şaquli xətt kimi",
    ],
    correct: 0,
    explanation: "İki stansiyanı bir qövslə birləşdirir və RF = (2/β)·tan(β/2) əmsalı ilə düzəldir. Bu, ən dəqiq və ən çox istifadə olunan metoddur.",
  },
  {
    q: "DLS (dogleg severity) hansı vahidlə ölçülür və nəyi göstərir?",
    options: [
      "°/100 ft, quyunun 100 ft-də nə qədər əyildiyini (inc və azi birlikdə)",
      "ft/saat, qazma sürətini",
      "psi, təzyiqi",
      "ppg, məhlul sıxlığını",
    ],
    correct: 0,
    explanation: "DLS = β·100/ΔMD. Yüksək DLS torque və drag-i artırır, casing və pipe-ı yorur, açar yuvası (key seat) və casing aşınması riskini yüksəldir.",
  },
  {
    q: "Bent housing motorla toolface 'high side' (0°) olduqda nə baş verir?",
    options: [
      "İnklinasiya artır (build), azimut təxminən dəyişmir",
      "İnklinasiya azalır (drop)",
      "Yalnız azimut dəyişir",
      "Heç nə dəyişmir",
    ],
    correct: 0,
    explanation: "High side quyunun yuxarı tərəfidir: motor bit-i yuxarı yönəldir, inklinasiya artır. Low side (180°) inklinasiyanı azaldır. 90°/270° isə saf turn verir.",
  },
  {
    q: "Survey-də ölçülən 'azimut' hansı istiqamətdən və necə ölçülür?",
    options: [
      "Şimaldan saat əqrəbi istiqamətində, 0-360°",
      "Şərqdən saat əqrəbinin əksinə",
      "Şaquli oxdan",
      "Dənizin səviyyəsindən",
    ],
    correct: 0,
    explanation: "Azimut horizontal müstəvidə şimaldan (0°) saat əqrəbi ilə ölçülür. Maqnit MWD ölçüsünü həqiqi şimala çevirmək üçün meyllik (declination) və grid convergence düzəlişləri lazımdır.",
  },
  {
    q: "RSS (rotary steerable system) motorla 'sliding' rejimindən nə ilə fərqlənir?",
    options: [
      "Boru fırlanarkən istiqamət verə bilir, buna görə sürtünmə və təmizlənmə yaxşıdır",
      "Yalnız şaquli quyuda işləyir",
      "Məhlul tələb etmir",
      "Survey tələb etmir",
    ],
    correct: 0,
    explanation: "Motorla sliding zamanı boru fırlanmır, sürtünmə artır, WOB ötürmək çətinləşir və hole cleaning pisləşir. RSS dəstə fırlanarkən istiqamət verir, ona görə uzun horizontal və ERD quyularında üstünlük verilir.",
  },
  {
    q: "Fulcrum BHA tipik olaraq nə edir?",
    options: [
      "WOB artdıqca inklinasiyanı artırır (build tendensiyası)",
      "İnklinasiyanı azaldır (drop)",
      "İnklinasiyanı sabit saxlayır",
      "Yalnız azimutu dəyişir",
    ],
    correct: 0,
    explanation: "Near-bit stabilizatordan sonra uzun stabilizatorsuz hissə WOB altında əyilir və bit-i yuxarı yönəldir. Pendulum drop, packed (bir neçə stabilizator) isə hold yaradır.",
  },
  {
    q: "Vertical section (VS) nəyi göstərir?",
    options: [
      "Quyunun hədəf azimutu boyunca horizontal məsafəsini",
      "Quyunun şaquli dərinliyini",
      "Casing-in uzunluğunu",
      "Məhlulun həcmini",
    ],
    correct: 0,
    explanation: "VS = N·cos(Az) + E·sin(Az): quyunu hədəf istiqamətində bir müstəviyə proyeksiya edir. Plan görünüşü və vertical section birlikdə quyunun 3D formasını verir.",
  },
  {
    q: "Dogleg-də fırlanan drillpipe üçün əsas risk nədir?",
    options: [
      "Dövri bükülmə gərginliyi səbəbilə yorğunluq (fatigue) çatları",
      "Məhlulun donması",
      "Sementin bərkiməməsi",
      "Bit-in soyuması",
    ],
    correct: 0,
    explanation: "Boru dogleg-də hər dövrədə dartılma və sıxılma dövrü yaşayır: σ ≈ 218·OD·DLS. Dartılma yükü varsa fatigue sürətlənir. Ona görə yüksək DLS yerlərində rotasiya, yük və dövr sayı nəzarətdə saxlanır.",
  },
  {
    q: "Anti-collision ayırma faktoru (SF) 1.0-dan kiçik olarsa bu nə deməkdir?",
    options: [
      "Qeyri-müəyyənlik elipsləri kəsişir, toqquşma riski var",
      "Quyular çox uzaqdır",
      "Survey dəqiqdir",
      "Quyu şaqulidir",
    ],
    correct: 0,
    explanation: "SF = mərkəz-mərkəz məsafə / birləşmiş qeyri-müəyyənlik radiusu. 1-dən aşağıda toqquşma mümkündür, buna görə operator daha sıx limit tətbiq edir və lazım gələrsə qazmanı dayandırır.",
  },
  {
    q: "Directional quyuda eyni TVD üçün MD niyə şaquli quyudan böyükdür?",
    options: [
      "Quyu əyri olduğundan yol uzanır, dərinlik isə TVD ilə, uzunluq MD ilə ölçülür",
      "Məhlul daha sıxdır",
      "Casing daha qalındır",
      "Bit daha kiçikdir",
    ],
    correct: 0,
    explanation: "MD quyu boyunca ölçülən uzunluq, TVD isə şaquli dərinlikdir. Hidrostatik təzyiq TVD-yə görə, drag və hidravlik itki MD-yə görə hesablanır.",
  },
  {
    q: "Maqnit MWD azimutunu həqiqi şimala çevirmək üçün nə lazımdır?",
    options: [
      "Meyllik (declination) və uyğun grid convergence düzəlişi",
      "Məhlul sıxlığı",
      "Bit ölçüsü",
      "Casing çəkisi",
    ],
    correct: 0,
    explanation: "Maqnit şimal həqiqi şimaldan fərqlənir. True = magnetic + declination (şərq müsbət). Maqnit müdaxiləsi olan yerlərdə (casing yaxınlığında) gyro survey istifadə olunur.",
  },
];

export const DIRECTIONAL_FORMULAS: FormulaGroup[] = [
  {
    title: "Survey və minimum curvature",
    rows: [
      { name: "Dogleg bucağı", formula: "cos β = cos(I₂−I₁) − sin I₁ sin I₂ (1 − cos(A₂−A₁))" },
      { name: "Ratio factor", formula: "RF = (2/β)·tan(β/2)", note: "β radyanla; β → 0 olduqda RF → 1" },
      { name: "ΔTVD", formula: "ΔTVD = (ΔMD/2)·(cos I₁ + cos I₂)·RF" },
      { name: "ΔNorth", formula: "ΔN = (ΔMD/2)·(sin I₁ cos A₁ + sin I₂ cos A₂)·RF" },
      { name: "ΔEast", formula: "ΔE = (ΔMD/2)·(sin I₁ sin A₁ + sin I₂ sin A₂)·RF" },
      { name: "DLS", formula: "DLS = β·100/ΔMD  [°/100 ft]" },
    ],
  },
  {
    title: "Proyeksiya və koordinatlar",
    rows: [
      { name: "Vertical section", formula: "VS = N·cos(Az_t) + E·sin(Az_t)" },
      { name: "Closure məsafəsi", formula: "C = √(N² + E²)" },
      { name: "Closure azimutu", formula: "Az_c = atan2(E, N)  (0-360°)" },
      { name: "Həqiqi azimut", formula: "Az_true = Az_mag + declination", note: "şərq meyllik müsbət, grid convergence ayrıca əlavə olunur" },
    ],
  },
  {
    title: "Build-and-hold planı (Tip I)",
    rows: [
      { name: "Build radius", formula: "R = 5729.58 / BUR  [ft]" },
      { name: "Hədəfə məsafə", formula: "V = TVD_t − KOP,  L = √((D − R)² + V²)" },
      { name: "Tangent bucağı", formula: "θ = acos(−R/L) − atan2(V, D − R)", note: "D − R > 0 və L > R olmalıdır" },
      { name: "Build uzunluğu", formula: "L_b = R·θ  [θ radyanla]  =  θ°/BUR·100" },
      { name: "Tangent uzunluğu", formula: "L_t = √(L² − R²)" },
      { name: "Hədəfdə MD", formula: "MD = KOP + L_b + L_t" },
    ],
  },
  {
    title: "Toolface, gərginlik, anti-collision",
    rows: [
      { name: "Yeni inklinasiya", formula: "cos I₂ = cos I₁ cos β − sin I₁ sin β cos TF" },
      { name: "Azimut dəyişməsi", formula: "tan ΔA = sin β sin TF / (sin I₁ cos β + cos I₁ sin β cos TF)" },
      { name: "Bükülmə gərginliyi", formula: "σ_b = E·OD/(2R) ≈ 218.2·OD·DLS  [psi]", note: "OD in, DLS °/100 ft" },
      { name: "İcazə verilən DLS", formula: "DLS_max = σ_endurance / (218.2·OD)" },
      { name: "Ayırma faktoru", formula: "SF = CC / (r₁ + r₂)", note: "CC mərkəz-mərkəz məsafə, r qeyri-müəyyənlik radiusu" },
    ],
  },
];
