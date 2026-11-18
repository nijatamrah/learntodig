import type { QuizQuestion } from "../Quiz";
import type { MissionItem } from "./MissionRunner";
import type { FormulaGroup } from "./FormulaSheet";

export const WELLCONTROL_OBJECTIVES = [
  "Kick-in səbəblərini, erkən əlamətlərini və quyunu bağlama prinsipini izah etmək",
  "SIDPP və SICP-dən formasiya təzyiqini, kill mud weight-i, ICP və FCP-ni hesablamaq",
  "Influx uzunluğunu və qradiyentindən influx tipini (qaz, neft, su) qiymətləndirmək",
  "Driller's method və Wait & Weight kill cədvəllərini qurmaq və fərqini başa düşmək",
  "MAASP, shoe təzyiqi və kick tolerance-i hesablamaq və şərh etmək",
  "Qazın genişlənməsini (Boyle) və bağlı quyuda miqrasiyasını başa düşmək",
];

export const WELLCONTROL_MISSION_INTRO =
  "10,000 ft TVD dərinlikdə 10.0 ppg məhlulla qazırsan. Pit-də 20 bbl artım görüb quyunu bağladın: SIDPP = 520 psi, SICP = 700 psi. Annulus tutumu dibdə 0.0459 bbl/ft, yavaş nasos (SCR) təzyiqi 800 psi, drillstring həcmi 150 bbl, nasos çıxışı 0.1 bbl/stroke. Casing shoe 6,000 ft TVD-dədir, çat qradiyenti 14.0 ppg. Əvvəl kill parametrlərini hesabla, sonra shoe və MAASP-ı yoxla, axırda qaz davranışı. Bu bölmə təhsil məqsədlidir: real quyuda IWCF/IADC təlimi və rig prosedurları əsasdır.";

export const WELLCONTROL_MISSION: MissionItem[] = [
  {
    id: "w1",
    prompt: "1. Formasiya təzyiqi neçə psi-dir? (Pf = 0.052·MW·TVD + SIDPP)",
    unit: "psi",
    answer: 5720,
    tol: 2,
    solution: "Hidrostatik = 0.052 · 10.0 · 10,000 = 5,200 psi. Pf = 5,200 + 520 = 5,720 psi (ekvivalent çəki 11.0 ppg).",
  },
  {
    id: "w2",
    prompt: "2. Kill mud weight neçə ppg-dir? (KMW = MW + SIDPP/(0.052·TVD))",
    unit: "ppg",
    answer: 11.0,
    tol: 0.02,
    solution: "KMW = 10.0 + 520 / (0.052 · 10,000) = 10.0 + 1.0 = 11.0 ppg. SIDPP istifadə olunur, çünki drillpipe içində təmiz məhlul sütunu var və influx onu təsirləndirmir.",
  },
  {
    id: "w3",
    prompt: "3. İlkin sirkulyasiya təzyiqi (ICP) neçə psi-dir? (ICP = SIDPP + SCR təzyiqi)",
    unit: "psi",
    answer: 1320,
    tol: 2,
    solution: "ICP = 520 + 800 = 1,320 psi. Kill-in əvvəlində drillpipe manometri bu təzyiqi göstərməlidir: həm formasiyanı tarazlayır, həm sirkulyasiya itkisini örtür.",
  },
  {
    id: "w4",
    prompt: "4. Son sirkulyasiya təzyiqi (FCP) neçə psi-dir? (FCP = SCR · KMW / MW)",
    unit: "psi",
    answer: 880,
    tol: 2,
    solution: "FCP = 800 · 11.0 / 10.0 = 880 psi. Kill mud bit-ə çatanda drillpipe təzyiqi FCP-yə düşür və kill mud annulusa çıxana qədər sabit saxlanılır.",
  },
  {
    id: "w5",
    prompt: "5. Influx-un annulusdakı uzunluğu neçə ft-dir? (Lk = pit gain / annulus tutumu)",
    unit: "ft",
    answer: 435.7,
    tol: 0.5,
    solution: "Lk = 20 / 0.0459 = 435.7 ft. Bu sadələşdirmədir: real quyuda annulus tutumu dərinliklə dəyişir (drill collar / drillpipe).",
  },
  {
    id: "w6",
    prompt: "6. Influx-un qradiyenti neçə psi/ft-dir? (g = 0.052·MW − (SICP − SIDPP)/Lk)",
    unit: "psi/ft",
    answer: 0.107,
    tol: 0.002,
    solution: "g = 0.052 · 10.0 − (700 − 520) / 435.7 = 0.520 − 0.413 = 0.107 psi/ft. 0.25-dən aşağıdır, buna görə influx qazdır (neft ≈ 0.25-0.4, su > 0.4).",
  },
  {
    id: "w7",
    prompt: "7. Kill mud bit-ə çatana qədər neçə stroke lazımdır? (drillstring həcmi / nasos çıxışı)",
    unit: "stk",
    answer: 1500,
    tol: 1,
    solution: "Strokes to bit = 150 / 0.1 = 1,500 stroke. 30 spm-də bu 50 dəqiqədir.",
  },
  {
    id: "w8",
    prompt: "8. Wait & Weight: 750-ci stroke-da drillpipe təzyiqi neçə psi olmalıdır? (ICP-dən FCP-yə xətti azalır)",
    unit: "psi",
    answer: 1100,
    tol: 2,
    solution: "P = ICP − (ICP − FCP) · 750/1,500 = 1,320 − 440 · 0.5 = 1,100 psi. Cədvəl boyu drillpipe təzyiqi bu qiymətlərə uyğun saxlanılır (choke ilə).",
  },
  {
    id: "w9",
    prompt: "9. Shoe 6,000 ft TVD, çat qradiyenti 14.0 ppg, MW 10.0 ppg. MAASP neçə psi-dir? (MAASP = (FG − MW)·0.052·TVD_shoe)",
    unit: "psi",
    answer: 1248,
    tol: 2,
    solution: "MAASP = (14.0 − 10.0) · 0.052 · 6,000 = 1,248 psi. Annulus (casing) təzyiqi bu həddi keçməməlidir, əks halda shoe-da formasiya yarıla bilər.",
  },
  {
    id: "w10",
    prompt: "10. SICP = 700 psi olduqda shoe-da ekvivalent çəki neçə ppg-dir? (EMW = MW + SICP/(0.052·TVD_shoe))",
    unit: "ppg",
    answer: 12.24,
    tol: 0.02,
    solution: "EMW = 10.0 + 700 / (0.052 · 6,000) = 10.0 + 2.24 = 12.24 ppg. Çat qradiyenti 14.0 ppg-dən aşağıdır: ehtiyat 1.76 ppg.",
  },
  {
    id: "w11",
    prompt: "11. Quyu bağlı qalır, qaz 600 ft/saat sürətlə 30 dəqiqə miqrasiya edir (MW 10.0 ppg). SICP neçə psi olur? (artım = 0.052·MW·miqrasiya)",
    unit: "psi",
    answer: 856,
    tol: 2,
    solution: "Miqrasiya = 600 · 0.5 = 300 ft. Artım = 0.052 · 10.0 · 300 = 156 psi. SICP = 700 + 156 = 856 psi. Qaz təzyiqi saxlamır (genişlənmir) və quyu bağlı olduğundan bütün quyuda təzyiq eyni miqdarda artır. MAASP (1,248 psi) həddinə yaxınlaşır.",
  },
  {
    id: "w12",
    prompt: "12. Dibdə 20 bbl qaz (təzyiq 5,720 psi) 2,000 ft-ə qalxır və açıq quyuda sərbəst genişlənir (MW 10.0 ppg, atmosfer 14.7 psi). Həcmi neçə bbl olur? (Boyle)",
    unit: "bbl",
    answer: 108.5,
    tol: 0.5,
    solution: "P₂ = 0.052·10.0·2,000 + 14.7 = 1,054.7 psi. V₂ = 20 · 5,720 / 1,054.7 = 108.5 bbl. Səthə yaxın genişlənmə daha sürətli olur: qaz səthə çatanda qəflətən böyük həcm yaranır. Ona görə qaz sərbəst buraxılmır, choke ilə nəzarətdə sirkulyasiya edilir.",
  },
  {
    id: "w13",
    prompt:
      "13. Kick tolerance: TD = 10,000 ft, shoe = 6,000 ft, MW 10.0 ppg, FG 14.0 ppg, influx uzunluğu 435.7 ft, qaz qradiyenti 0.1 psi/ft. Maksimum kick intensivliyi neçə ppg-dir?\n(Pf_max = Pfrac + g·Lk + 0.052·MW·(TD − shoe − Lk), intensivlik = Pf_max/(0.052·TD) − MW)",
    unit: "ppg",
    answer: 2.05,
    tol: 0.03,
    solution:
      "Pfrac = 0.052·14.0·6,000 = 4,368 psi. Pf_max = 4,368 + 0.1·435.7 + 0.052·10.0·(4,000 − 435.7) = 4,368 + 43.6 + 1,853.5 = 6,265 psi. İntensivlik = 6,265/520 − 10.0 = 2.05 ppg. Bizim kick 1.0 ppg-lik overbalance-dır, yəni tolerantlığın içindədir.",
  },
  {
    id: "w14",
    prompt: "14. 1,000 bbl məhlul sistemini 10.0 ppg-dən 11.0 ppg-yə qaldırmaq üçün neçə kisə (100 lb) barit lazımdır? (kisə/100 bbl = 1490·(W₂ − W₁)/(35.8 − W₂))",
    unit: "sk",
    answer: 601,
    tol: 2,
    solution: "100 bbl üçün: 1,490 · 1.0 / (35.8 − 11.0) = 60.1 kisə. 1,000 bbl üçün 601 kisə. Real işdə barit ehtiyatı yoxlanılır və həcm artımı nəzərə alınır.",
  },
];

export const WELLCONTROL_QUIZ: QuizQuestion[] = [
  {
    q: "Aşağıdakılardan hansı kick-in ən etibarlı müsbət əlamətidir?",
    options: [
      "Pit həcminin artması və nasos dayananda quyunun axması (flow check müsbət)",
      "ROP-un azalması",
      "Məhlul temperaturunun azalması",
      "Torque-un artması",
    ],
    correct: 0,
    explanation: "Pit gain və flow-out artımı influx-un quyuya girdiyini göstərir. Nasos dayananda quyunun axması (flow check) kick-i təsdiqləyir. ROP dəyişməsi (drilling break) isə yalnız xəbərdarlıq əlamətidir.",
  },
  {
    q: "Kill mud weight hesablanarkən niyə SICP yox, SIDPP istifadə olunur?",
    options: [
      "Drillpipe içində təmiz məhlul sütunu var, influx onu təsirləndirmir, buna görə SIDPP formasiya təzyiqini düzgün göstərir",
      "SICP həmişə böyükdür",
      "SIDPP daha asan oxunur",
      "Casing manometri qırılır",
    ],
    correct: 0,
    explanation: "Annulusda qaz və ya yağ var, ona görə SICP hidrostatik sütunun fərqini də ehtiva edir. Drillpipe-da isə tək məhlul var (float valve yoxdursa), ona görə SIDPP dəqiq göstəricidir.",
  },
  {
    q: "Driller's method ilə Wait & Weight arasındakı əsas fərq nədir?",
    options: [
      "Driller's method influx-u əvvəlcə orijinal məhlulla çıxarır, sonra ikinci sirkulyasiyada KMW ilə quyunu öldürür; Wait & Weight isə KMW hazır olana qədər gözləyir və bir sirkulyasiyada kill edir",
      "Driller's method kill məhlulu tələb etmir",
      "Wait & Weight daha az təzyiq istifadə edir",
      "Fərq yoxdur",
    ],
    correct: 0,
    explanation: "Driller's method dərhal başlaya bilir (iki sirkulyasiya), Wait & Weight isə məhlul hazır olanda bir sirkulyasiya ilə kill edir və adətən shoe-da təzyiqi aşağı saxlayır.",
  },
  {
    q: "MAASP nədir?",
    options: [
      "Shoe-da formasiya çatmadan annulusda (casing manometrində) icazə verilən maksimum səth təzyiqi",
      "Casing-in burst müqaviməti",
      "Drillpipe təzyiqinin minimumu",
      "Pump təzyiqinin limiti",
    ],
    correct: 0,
    explanation: "MAASP = (FG − MW)·0.052·TVD_shoe. Annulus təzyiqi bu həddən aşağı saxlanmalıdır, əks halda zəif formasiya (shoe) yarıla bilər və yeraltı partlama (underground blowout) riski yaranır.",
  },
  {
    q: "Qaz influx-u səthə yaxınlaşdıqca nə baş verir?",
    options: [
      "Hidrostatik təzyiq azaldığından qazın həcmi sürətlə artır (Boyle)",
      "Həcmi dəyişmir",
      "Həcmi azalır",
      "Su olur",
    ],
    correct: 0,
    explanation: "P·V = sabit. Səthə yaxın təzyiq çox kiçikdir, ona görə genişlənmə qəflətən sürətlənir. Buna görə bağlı və ya idarəsiz buraxılmış quyuda qaz təhlükəsi çox böyükdür.",
  },
  {
    q: "Bağlı quyuda qaz miqrasiyası nəyə səbəb olur?",
    options: [
      "Səth və dib təzyiqinin artmasına (qaz təzyiqi yuxarı daşıyır)",
      "Təzyiqin azalmasına",
      "Təzyiqin dəyişməməsinə",
      "Drillpipe-ın qırılmasına",
    ],
    correct: 0,
    explanation: "Qaz yuxarı qalxarkən öz təzyiqini saxlayır, onun altındakı hidrostatik sütun uzanır və bütün quyuda təzyiq artır. Buna görə SICP və SIDPP-i izləmək və lazım olduqda volumetrik metod tətbiq etmək lazımdır.",
  },
  {
    q: "Influx qradiyenti 0.12 psi/ft olarsa influx hansı tipdədir?",
    options: ["Qaz", "Neft", "Duzlu su", "Şirin su"],
    correct: 0,
    explanation: "Adətən qaz < 0.25 psi/ft, neft 0.25-0.4, su > 0.4 psi/ft. Bu təxminidir: real influx qarışıq ola bilər və qiymətləndirmə sadələşdirilmiş model üzərindədir.",
  },
  {
    q: "Kick aşkar edilərkən ilk addım nədir?",
    options: [
      "Qazmanı dayandırmaq, quyunu bağlamaq (rig prosedurunda göstərilən qaydada) və təzyiqləri oxumaq",
      "Nasos sürətini artırmaq",
      "Qazmaya davam etmək",
      "Məhlul çəkisini azaltmaq",
    ],
    correct: 0,
    explanation: "Qısa sürətli reaksiya influx həcmini minimuma endirir. Dəqiq ardıcıllıq (hard shut-in, soft shut-in) operator prosedurundan və avadanlıqdan asılıdır. Təhsil üçün prinsip: gecikmədən təhlükəsiz bağla.",
  },
  {
    q: "ICP (initial circulating pressure) necə hesablanır?",
    options: [
      "SIDPP + yavaş nasos təzyiqi (SCR)",
      "SICP − SIDPP",
      "MAASP/2",
      "KMW · 0.052",
    ],
    correct: 0,
    explanation: "ICP-də SIDPP formasiyanı tarazlayır, SCR təzyiqi isə sirkulyasiyanın sürtünməsini örtür. Kill başlayanda drillpipe manometri məhz ICP-ni göstərməlidir.",
  },
  {
    q: "Kick tolerance nəyi göstərir?",
    options: [
      "Shoe çatmadan bağlana bilən maksimum kick həcmi və ya intensivliyi",
      "Məhlulun maksimum sıxlığı",
      "Bit-in dözümlülüyü",
      "BOP-un çəkisi",
    ],
    correct: 0,
    explanation: "Kick tolerance casing seat-in düzgün seçilib-seçilmədiyini yoxlayır: böyük overbalance və ya böyük influx shoe-da çat təzyiqini keçərsə, quyu təhlükəsiz bağlana bilməz. Pressure/mud window ilə (3-cü bölmə) birlikdə baxılır.",
  },
  {
    q: "Float valve (non-return valve) olan drillstring-də SIDPP oxunuşu üçün hansı problem yaranır?",
    options: [
      "Drillpipe manometrində təzyiq göstərilməyə bilər və ya tutulmuş (trapped) təzyiq olar, SIDPP düzgün oxunmaya bilər",
      "Təzyiq iki dəfə artır",
      "Heç bir problem yoxdur",
      "Sirkulyasiya sürətlənir",
    ],
    correct: 0,
    explanation: "Float valve axının dp-yə qayıtmasını saxladığı üçün SIDPP-ni oxumaq üçün xüsusi prosedur lazımdır (nasosu çox yavaş sürətlə işə salıb sızma təzyiqini tapmaq). Düzgün oxunmayan SIDPP səhv KMW-yə gətirir.",
  },
  {
    q: "BOP yığını (stack) və choke manifold nə üçündür?",
    options: [
      "Quyunu bağlamaq və kick-i choke ilə nəzarətdə sirkulyasiya edərək təhlükəsiz çıxarmaq üçün",
      "Qazma məhlulunu qarışdırmaq üçün",
      "Casing-i sementləmək üçün",
      "Survey ölçmək üçün",
    ],
    correct: 0,
    explanation: "BOP quyunu bağlayır (annular, pipe ram, blind/shear ram), choke manifold isə sirkulyasiya zamanı casing təzyiqini nəzarət edir. Accumulator (koomey) BOP-u bağlamaq üçün hidravlik enerji verir.",
  },
];

export const WELLCONTROL_FORMULAS: FormulaGroup[] = [
  {
    title: "Təzyiqlər və kill parametrləri",
    rows: [
      { name: "Hidrostatik təzyiq", formula: "P_h = 0.052·MW·TVD  [psi]" },
      { name: "Formasiya təzyiqi", formula: "P_f = 0.052·MW·TVD + SIDPP" },
      { name: "Kill mud weight", formula: "KMW = MW + SIDPP/(0.052·TVD)  [ppg]" },
      { name: "İlkin sirkulyasiya təzyiqi", formula: "ICP = SIDPP + P_SCR" },
      { name: "Son sirkulyasiya təzyiqi", formula: "FCP = P_SCR·KMW/MW" },
    ],
  },
  {
    title: "Kill cədvəli və stroke hesabı",
    rows: [
      { name: "Strokes to bit", formula: "S_b = V_ds / Q_p", note: "V_ds: drillstring həcmi, Q_p: bbl/stroke" },
      { name: "Strokes to surface (annulus)", formula: "S_a = V_ann / Q_p" },
      { name: "Wait & Weight (DP təzyiqi)", formula: "P(s) = ICP − (ICP − FCP)·s/S_b   (s ≤ S_b)", note: "s > S_b olduqda P = FCP" },
      { name: "Driller's method", formula: "1-ci sirk.: P_dp = ICP (sabit);  2-ci sirk.: KMW ilə Wait & Weight kimi" },
      { name: "Sirkulyasiya vaxtı", formula: "t = S/SPM  [dəq]" },
    ],
  },
  {
    title: "Influx, MAASP və kick tolerance",
    rows: [
      { name: "Influx uzunluğu", formula: "L_k = V_gain / C_ann" },
      { name: "Influx qradiyenti", formula: "g = 0.052·MW − (SICP − SIDPP)/L_k  [psi/ft]", note: "qaz < 0.25, neft 0.25-0.4, su > 0.4" },
      { name: "SICP", formula: "SICP = SIDPP + (0.052·MW − g)·L_k" },
      { name: "MAASP", formula: "MAASP = (FG − MW)·0.052·TVD_shoe" },
      { name: "EMW (shoe, bağlı)", formula: "EMW = MW + SICP/(0.052·TVD_shoe)" },
      { name: "Kick tolerance", formula: "Pf_max = 0.052·FG·D_s + g·L_k + 0.052·MW·(TD − D_s − L_k);  KT = Pf_max/(0.052·TD) − MW" },
    ],
  },
  {
    title: "Qaz davranışı və məhlul",
    rows: [
      { name: "Boyle qanunu", formula: "P₁V₁ = P₂V₂", note: "ideal qaz, Z = 1, sabit temperatur" },
      { name: "Açıq quyuda qaz həcmi", formula: "V(d) = V₁·P₁ / (0.052·MW·d + 14.7)" },
      { name: "Bağlı quyuda miqrasiya", formula: "ΔP = 0.052·MW·Δh_migrasiya" },
      { name: "Barit (100 bbl üçün, 100 lb kisə)", formula: "N = 1490·(W₂ − W₁)/(35.8 − W₂)" },
    ],
  },
];
