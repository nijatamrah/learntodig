import type { QuizQuestion } from "../Quiz";
import type { MissionItem } from "./MissionRunner";
import type { FormulaGroup } from "./FormulaSheet";

export const CASING_OBJECTIVES = [
  "Casing kəmərlərinin (conductor, surface, intermediate, production, liner) rolunu və seçim məntiqini izah etmək",
  "Casing-in burst, collapse və tension yüklərini hesablamaq, dizayn faktorları ilə yoxlamaq",
  "Eksenel dartılmanın collapse müqavimətini necə azaltdığını (biaxial düzəliş) şərh etmək",
  "Sement slurry-nin sıxlığını, yield-ini, lazım olan kisə sayını və həcmini hesablamaq",
  "Sement işinin mərhələlərini (spacer, lead, tail, plug, displacement), U-tube effektini və shoe-da təzyiqi başa düşmək",
  "Casing mərkəzləməsini (standoff) və sement keyfiyyətinə təsirini qiymətləndirmək",
];

export const CASING_MISSION_INTRO =
  "Sən 12-1/4 in quyuda 9-5/8 in intermediate casing (47 lb/ft, N-80) endirirsən. Shoe 9,000 ft TVD-dədir, əvvəlki 13-3/8 in casing 4,000 ft-də oturub. Əvvəl casing-in tutumunu və yük müqavimətini hesabla, sonra dizayn yükləri və faktorlar, axırda sement həcmi, kisə sayı, displacement və shoe-da təzyiq. Real yük profilini və sement işinin animasiyasını Vizual tab-ında sına.";

export const CASING_MISSION: MissionItem[] = [
  {
    id: "c1",
    prompt: "1. 9-5/8 in, 47 lb/ft casing-in divar qalınlığı 0.472 in-dir. Daxili tutumu (capacity) neçə bbl/ft-dir? (ID = OD − 2·t, C = ID²/1029.4)",
    unit: "bbl/ft",
    answer: 0.0732,
    tol: 0.0003,
    solution: "ID = 9.625 − 2·0.472 = 8.681 in. C = 8.681² / 1029.4 = 75.36 / 1029.4 = 0.0732 bbl/ft.",
  },
  {
    id: "c2",
    prompt: "2. 12-1/4 in açıq quyuda 9-5/8 in casing ilə annulusun tutumu neçə bbl/ft-dir? (C = (Dh² − OD²)/1029.4)",
    unit: "bbl/ft",
    answer: 0.0558,
    tol: 0.0003,
    solution: "C = (12.25² − 9.625²) / 1029.4 = (150.06 − 92.64) / 1029.4 = 0.0558 bbl/ft.",
  },
  {
    id: "c3",
    prompt: "3. N-80 (Yp = 80,000 psi), OD = 9.625 in, t = 0.472 in. API internal yield (burst) müqaviməti neçə psi-dir? (P = 0.875·2·Yp·t / OD)",
    unit: "psi",
    answer: 6865,
    tol: 5,
    solution: "P = 0.875 · 2 · 80,000 · 0.472 / 9.625 = 66,080 / 9.625 ≈ 6,865 psi. 0.875 əmsalı istehsal qalınlıq tolerantlığının (−12.5%) nəzərə alınmasıdır.",
  },
  {
    id: "c4",
    prompt:
      "4. Burst yükü (qaz kick-i): növbəti TD = 12,500 ft, orada məsamə təzyiqi 12.0 ppg; shoe-da çat qradiyenti 14.5 ppg; qaz qradiyenti 0.1 psi/ft. Səth təzyiqi min(Pp_TD − g·TD, Pfrac_shoe − g·shoe) kimi məhdudlaşır. Səth təzyiqi neçə psi-dir?",
    unit: "psi",
    answer: 5886,
    tol: 5,
    solution:
      "Pp_TD = 0.052·12.0·12,500 = 7,800 psi → 7,800 − 0.1·12,500 = 6,550 psi. Shoe limiti: 0.052·14.5·9,000 = 6,786 → 6,786 − 0.1·9,000 = 5,886 psi. Kiçik olan götürülür: 5,886 psi (shoe çatı məhdudlaşdırır, çünki bundan yuxarı təzyiqdə formasiya yarılar).",
  },
  {
    id: "c5",
    prompt:
      "5. Collapse yükü: itkili sirkulyasiyada casing tam boşalır (daxildə məhlul yoxdur), arxada 10.5 ppg məhlul var. Shoe-da collapse dizayn faktoru (SF = 4,750 psi / yük) neçədir? (shoe-da eksenel yük sıfır sayılır)",
    unit: "",
    answer: 0.97,
    tol: 0.01,
    solution:
      "Yük = 0.052·10.5·9,000 = 4,914 psi. SF = 4,750 / 4,914 = 0.97 < 1.0. N-80 47 lb/ft tam boşalma üçün yetmir. Seçimlər: P-110 47 lb/ft (collapse 5,310 psi), daha ağır divar və ya casing-i tam boşalmayacaq şəkildə (məhlul səviyyəsi nəzarəti ilə) endirmək.",
  },
  {
    id: "c6",
    prompt: "6. Casing 10.5 ppg məhlulda asılıb (polad 65.4 ppg). Floatation (buoyancy) əmsalı 0.8394. 9,000 ft x 47 lb/ft string-in məhluldakı çəkisi (buoyed weight) neçə lbf-dir?",
    unit: "lbf",
    answer: 355087,
    tol: 200,
    solution: "Havada çəki = 47 · 9,000 = 423,000 lbf. BF = 1 − 10.5/65.4 = 0.8394. Buoyed = 423,000 · 0.8394 ≈ 355,087 lbf.",
  },
  {
    id: "c7",
    prompt: "7. Casing-in boru gövdəsi yield gücü: A = 13.57 in², Yp = 80,000 psi. Yuxarıdakı buoyed çəki ilə səthdə tension dizayn faktoru neçədir?",
    unit: "",
    answer: 3.06,
    tol: 0.02,
    solution: "Body yield = 13.57 · 80,000 = 1,085,789 lbf. SF = 1,085,789 / 355,087 = 3.06. Real dizaynda bağlantı (connection) gücü, shock yükü və əyilmə də yoxlanır, adətən minimum SF ≈ 1.6.",
  },
  {
    id: "c8",
    prompt:
      "8. Sement həcmi: açıq quyu (4,000 → 9,000 ft) üçün 30% excess; əvvəlki casing içində 3,500 → 4,000 ft sement (ID = 12.415 in); shoe track 80 ft. Ümumi həcm neçə bbl-dir?",
    unit: "bbl",
    answer: 398.3,
    tol: 0.5,
    solution:
      "Açıq quyu: 5,000 · 0.0558 · 1.3 = 362.6 bbl. Cased hissə: 500 · (12.415² − 9.625²)/1029.4 = 500 · 0.0597 = 29.9 bbl. Shoe track: 80 · 0.0732 = 5.9 bbl. Cəmi = 398.3 bbl.",
  },
  {
    id: "c9",
    prompt: "9. Class G sement, 5.0 gal/sk mix suyu. Quru sement: 94 lb/sk, absolute volume 0.0382 gal/lb. Slurry sıxlığı neçə ppg-dir?",
    unit: "ppg",
    answer: 15.8,
    tol: 0.05,
    solution: "Həcm = 94·0.0382 + 5.0 = 3.591 + 5.0 = 8.591 gal/sk. Kütlə = 94 + 8.34·5.0 = 135.7 lb. ρ = 135.7 / 8.591 = 15.80 ppg.",
  },
  {
    id: "c10",
    prompt: "10. Eyni slurry-nin yield-i 1.1485 ft³/sk-dir. 398.3 bbl slurry üçün neçə kisə (sack) sement lazımdır? (1 bbl = 5.615 ft³)",
    unit: "sk",
    answer: 1947,
    tol: 3,
    solution: "Həcm = 398.3 · 5.615 = 2,236.5 ft³. Kisə sayı = 2,236.5 / 1.1485 ≈ 1,947 sk. Real işdə 5-10% ehtiyat əlavə edilir.",
  },
  {
    id: "c11",
    prompt: "11. Displacement: plug float collar-a (shoe-dan 80 ft yuxarı) çatana qədər nə qədər məhlul pump edilməlidir? (casing tutumu 0.0732 bbl/ft, shoe 9,000 ft)",
    unit: "bbl",
    answer: 653,
    tol: 1,
    solution: "Displacement = 0.0732 · (9,000 − 80) = 0.0732 · 8,920 ≈ 653 bbl. Bu həcmdən az pump edilsə plug oturmur, çox pump edilsə shoe track-dəki keyfiyyətli sement sıxışdırılar. Plug bump olunca təzyiq kəskin artır.",
  },
  {
    id: "c12",
    prompt:
      "12. İş sonunda annulusda 4,000 ft-dən 9,000 ft-ə qədər 15.8 ppg sement, yuxarıda 10.5 ppg məhlul var. Casing daxilində 10.5 ppg məhlul var. Float equipment-in saxlaması üçün plug bump anında təzyiq fərqi (annulus − casing daxili) neçə psi-dir?",
    unit: "psi",
    answer: 1378,
    tol: 2,
    solution:
      "Annulus: 0.052·(10.5·4,000 + 15.8·5,000) = 0.052·121,000 = 6,292 psi. Casing daxili: 0.052·10.5·9,000 = 4,914 psi. Δp = 1,378 psi: bu fərq U-tube yaradır. Pump dayananda float collar axının geri qayıtmasını saxlamalıdır. Shoe-da annulus təzyiqi 6,292 psi, EMW = 6,292/(0.052·9,000) = 13.4 ppg, çat qradiyenti 14.5 ppg-dən aşağıdır, formasiya yarılmır.",
  },
  {
    id: "c13",
    prompt: "13. Quyu 12.25 in, casing OD 9.625 in, casing mərkəzi quyu mərkəzindən 0.8 in sürüşüb. Standoff neçə faizdir? (standoff = (1 − offset/gap)·100, gap = (Dh − OD)/2)",
    unit: "%",
    answer: 39.0,
    tol: 0.2,
    solution:
      "gap = (12.25 − 9.625)/2 = 1.3125 in. Standoff = (1 − 0.8/1.3125)·100 = 39.0%. Tövsiyə olunan minimum təxminən 67%-dir; 39% mərkəzləşdiricilərin sayını artırmaq lazım olduğunu göstərir, çünki dar tərəfdə məhlul qalır və sement kanallaşma yaradır.",
  },
];

export const CASING_QUIZ: QuizQuestion[] = [
  {
    q: "Surface casing-in əsas vəzifələrindən biri hansıdır?",
    options: [
      "Şirin su laylarını izolyasiya etmək və BOP üçün möhkəm dayaq yaratmaq",
      "Yalnız məhsul axınını nəql etmək",
      "Məhlulun reoloji xassələrini tənzimləmək",
      "Bit-in ROP-unu artırmaq",
    ],
    correct: 0,
    explanation: "Surface casing yuxarıdakı şirin su laylarını qoruyur, zəif formasiyanı örtür və BOP-nu daşıyır. Shoe-nun çatma təzyiqi sonrakı kick-ləri idarə etmək üçün kifayət qədər yüksək olmalıdır.",
  },
  {
    q: "Burst dizaynında ən pis yük ssenarisi nədir?",
    options: [
      "Qaz kick-i casing-in içində səthə qədər yüksəlir, səthdə maksimum təzyiq yaranır",
      "Casing tam boşalır",
      "Casing quyuya endirilir",
      "Sement bərkiyir",
    ],
    correct: 0,
    explanation: "Burst ən çox səthdə yaranır: daxili təzyiq yüksək, xarici təzyiq isə azdır. Səth təzyiqi qaz kick-inin formasiya təzyiqi və shoe çat limiti ilə məhdudlaşır.",
  },
  {
    q: "Collapse dizaynında klassik ən pis ssenari hansıdır?",
    options: [
      "İtkili sirkulyasiya nəticəsində casing-in tam və ya qismən boşalması (xaricdə məhlul, daxildə boşluq)",
      "Daxili təzyiqin xarici təzyiqdən çox olması",
      "Yüksək ROP",
      "Bit balling",
    ],
    correct: 0,
    explanation: "Casing boşaldıqda xarici hidrostatik təzyiq daxildən dəstəklənmir, ən böyük fərq dibdə olur. Collapse yükü dərinliklə artır, ona görə dibdə ən yüksək müqavimətli seçim lazımdır.",
  },
  {
    q: "Eksenel dartılma (tension) casing-in collapse müqavimətinə necə təsir edir?",
    options: [
      "Azaldır (biaxial effekt)",
      "Artırır",
      "Təsir etmir",
      "Yalnız burst-ə təsir edir",
    ],
    correct: 0,
    explanation: "Dartılma altında polad axma həddinə daha yaxın olur, buna görə collapse müqaviməti azalır (API 5C3 ellips düsturu). Ən çox yuxarıda, eksenel yük böyük olduqda əhəmiyyətlidir.",
  },
  {
    q: "Məhlul çəkisini artırdıqda casing-in məhluldakı çəkisi (buoyed weight) necə dəyişir?",
    options: ["Azalır, çünki buoyancy əmsalı 1 − MW/65.4 kiçilir", "Artır", "Dəyişmir", "Sıfıra bərabər olur"],
    correct: 0,
    explanation: "Buoyancy faktoru BF = 1 − MW/65.4 ağır məhlulda kiçilir, casing daha yüngül olur. Eyni zamanda collapse yükü artdığı üçün hər iki hesabı birgə yoxlamaq lazımdır.",
  },
  {
    q: "Sement hesabında 'excess' (məsələn 30%) nə üçündür?",
    options: [
      "Quyu diametrinin nominaldan böyük olması (washout, yuyulma) üçün əlavə həcm",
      "Sementin qiymətini artırmaq üçün",
      "Casing-in uzanması üçün",
      "Spacer həcmini azaltmaq üçün",
    ],
    correct: 0,
    explanation: "Açıq quyu nominal diametrdən geniş ola bilər (washout). Caliper log varsa excess ona uyğun seçilir, yoxdursa offset təcrübəsinə əsasən 20-50% götürülür.",
  },
  {
    q: "Spacer və ya preflush niyə pump edilir?",
    options: [
      "Məhlulu sementdən ayırmaq, uyğunsuzluğun qarşısını almaq və quyu divarını təmizləmək üçün",
      "Casing-i soyutmaq üçün",
      "Sement sıxlığını artırmaq üçün",
      "Float collar-ı bağlamaq üçün",
    ],
    correct: 0,
    explanation: "Qazma məhlulu və sement çox vaxt bir-biri ilə uyğun deyil (qatılaşma, geldən əmələ gələn kontaminasiya). Spacer onları ayırır və divardakı filtr kekini təmizləməyə kömək edir.",
  },
  {
    q: "Top plug float collar-a oturanda (bump) nə müşahidə olunur?",
    options: [
      "Nasos təzyiqi kəskin artır, pump edilən həcm hesablanmış displacement-ə uyğun gəlir",
      "Təzyiq sıfıra düşür",
      "Annulusdan məhlul axmağa başlayır",
      "Casing yuxarı qalxır",
    ],
    correct: 0,
    explanation: "Plug oturduqda axın dayanır və təzyiq sıçrayır. Bu displacement həcminin düzgün hesablandığını təsdiqləyir. Təzyiqi dizayn limitindən çox artırmaq olmaz.",
  },
  {
    q: "U-tube effekti nədir?",
    options: [
      "Annulusdakı ağır sement və casing içindəki yüngül məhlul arasındakı təzyiq fərqinin axını casing-ə doğru geri qaytarmaq cəhdi",
      "Casing-in əyilməsi",
      "Bit-in vibrasiyası",
      "Məhlulun reoloji dəyişməsi",
    ],
    correct: 0,
    explanation: "Annulus daha ağır olduğundan pump dayananda axın yenidən casing-ə qayıtmağa meylli olur. Float equipment bunu saxlayır. Bump-dan sonra təzyiq buraxılanda geri axın yoxlanılır.",
  },
  {
    q: "Casing mərkəzləməsində (standoff) ümumi sənaye tövsiyəsi nədir?",
    options: [
      "Minimum təxminən 67%, mərkəzləşdiricilərin sayı və yerləşməsi ilə təmin edilir",
      "0%, mərkəzləşdirici lazım deyil",
      "100%, hər metrdə mərkəzləşdirici",
      "Yalnız yuxarıda lazımdır",
    ],
    correct: 0,
    explanation: "Standoff aşağı olarsa dar tərəfdə axın demək olar ki, dayanır, məhlul qalır və sement kanallaşma ilə izolyasiyanı pozur. Əyri quyularda mərkəzləşdirici təmin etmək daha vacibdir.",
  },
  {
    q: "CBL/ultrasonik log (sement bond log) nəyi qiymətləndirir?",
    options: [
      "Sementin casing-ə və formasiyaya bağlanma keyfiyyətini, zona izolyasiyasını",
      "Məhlulun reologiyasını",
      "Bit-in köhnəlməsini",
      "Casing-in rəngini",
    ],
    correct: 0,
    explanation: "Sement bağlanma logu sementin casing və formasiya ilə bağlanmasını göstərir. Zonal izolyasiya tələb olunan yerdə uğurlu iş məhz bu log ilə təsdiqlənir.",
  },
  {
    q: "J-55, N-80, P-110 notasiyasında rəqəm nəyi göstərir?",
    options: [
      "Minimum axma həddini (ksi), məsələn P-110 üçün 110,000 psi",
      "Divar qalınlığını",
      "Uzunluğu",
      "Sement markasını",
    ],
    correct: 0,
    explanation: "API 5CT sinfində rəqəm minimum yield strength-i ksi ilə göstərir. Hərf isə sinfin kimyəvi/istilik emalı tipini (J, N, P). Yüksək sinif hər zaman daha bahalı olur.",
  },
];

export const CASING_FORMULAS: FormulaGroup[] = [
  {
    title: "Həndəsə və tutum",
    rows: [
      { name: "Casing ID", formula: "ID = OD − 2·t  [in]" },
      { name: "Daxili tutum", formula: "C = ID²/1029.4  [bbl/ft]" },
      { name: "Annulus tutumu", formula: "C_ann = (D_h² − OD²)/1029.4  [bbl/ft]" },
      { name: "Polad yerdəyişməsi", formula: "V_s = (OD² − ID²)/1029.4  [bbl/ft]" },
      { name: "Polad sahəsi", formula: "A = (π/4)·(OD² − ID²)  [in²]" },
    ],
  },
  {
    title: "Dizayn yükləri və müqavimətlər",
    rows: [
      { name: "Burst müqaviməti (API)", formula: "P_b = 0.875·2·Yp·t / OD  [psi]" },
      { name: "Qaz kick-i, səth təzyiqi", formula: "P_s = min(Pp_TD − g·TD,  Pfrac_shoe − g·D_shoe)" },
      { name: "Burst yükü", formula: "P_burst(d) = P_s + g·d − ρ_ext·d", note: "xarici təzyiq casing-in arxasındakı formasiya mayesi" },
      { name: "Collapse yükü", formula: "P_c(d) = P_ext(d) − P_int(d)", note: "tam boşalmada P_int = 0" },
      { name: "Buoyancy əmsalı", formula: "BF = 1 − MW/65.4" },
      { name: "Tension (buoyed weight)", formula: "T(d) = w·BF·(D_shoe − d)  [lbf]" },
      { name: "Boru gövdəsi yield", formula: "F_y = A·Yp" },
      { name: "Collapse (axial düzəliş)", formula: "P_ca = P_c·[√(1 − 0.75·(σ_a/Yp)²) − 0.5·σ_a/Yp]" },
      { name: "Dizayn faktoru", formula: "SF = müqavimət / yük", note: "tipik minimum: burst 1.1, collapse 1.0, tension 1.6" },
    ],
  },
  {
    title: "Sement slurry və həcm",
    rows: [
      { name: "Slurry həcmi (1 sk)", formula: "V = 94·0.0382 + w  [gal/sk]", note: "w: mix suyu, gal/sk" },
      { name: "Slurry sıxlığı", formula: "ρ = (94 + 8.34·w) / V  [ppg]" },
      { name: "Yield", formula: "Y = V / 7.48  [ft³/sk]" },
      { name: "Kisə sayı", formula: "N = V_bbl·5.615 / Y" },
      { name: "Açıq quyu həcmi", formula: "V_open = L·C_ann·(1 + excess)" },
      { name: "Cased annulus", formula: "V_cased = L·(ID_prev² − OD²)/1029.4" },
      { name: "Shoe track", formula: "V_track = L_track·C" },
    ],
  },
  {
    title: "İş və mərkəzləmə",
    rows: [
      { name: "Displacement həcmi", formula: "V_disp = C·(D_shoe − L_track)  [bbl]" },
      { name: "U-tube təzyiq fərqi", formula: "Δp = P_ann − P_int", note: "annulus və casing sütunlarının hidrostatik fərqi" },
      { name: "Shoe-da EMW", formula: "EMW = P_ann / (0.052·D_shoe)", note: "çat qradiyentindən aşağı olmalıdır" },
      { name: "Standoff", formula: "SO = (1 − e/gap)·100,  gap = (D_h − OD)/2" },
      { name: "Dar/geniş tərəf sürəti", formula: "v_nar/v_wide ≈ ((1−ε)/(1+ε))²", note: "ε = 1 − SO/100" },
    ],
  },
];
