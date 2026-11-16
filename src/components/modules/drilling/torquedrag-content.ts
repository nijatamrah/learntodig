import type { QuizQuestion } from "../Quiz";
import type { MissionItem } from "./MissionRunner";
import type { FormulaGroup } from "./FormulaSheet";

export const TD_OBJECTIVES = [
  "Torque və drag-ın mənşəyini (normal qüvvə və sürtünmə) izah etmək",
  "Soft-string modeli ilə bir element üçün normal qüvvəni, drag-ı və torque artımını hesablamaq",
  "Pick-up, slack-off, rotating off-bottom və drilling rejimlərinin hook load fərqini şərh etmək",
  "Capstan effektini və öz çəkisi ilə sürüşmənin kritik bucağını qiymətləndirmək",
  "Torsiya tutumunu və buckling limitini yoxlayıb T&D qrafikindən praktik nəticə çıxarmaq",
];

export const TD_MISSION_INTRO =
  "Sən maili quyuda string elementlərinin T&D hesablamalarını addım-addım öyrənirsən. Əvvəl tək element üçün qüvvələri, sonra capstan və kritik bucağı, axırda torsiya və buckling limitlərini hesabla. Tam quyu modelini isə Vizual tab-ında sına.";

export const TD_MISSION: MissionItem[] = [
  {
    id: "t1",
    prompt: "1. Düz maili hissə: bucaq 60° (şaquli oxdan), buoyed çəki w_b = 18 lb/ft, element uzunluğu ΔL = 30 ft, bucaq dəyişmir (Δα = 0), μ = 0.30. Sürtünmə qüvvəsi μN neçə lbf-dir?",
    unit: "lbf",
    answer: 140.3,
    tol: 0.5,
    solution: "N = w_b · ΔL · sin α = 18 · 30 · sin 60° = 467.7 lbf. Sürtünmə = μN = 0.30 · 467.7 ≈ 140.3 lbf.",
  },
  {
    id: "t2",
    prompt: "2. Eyni element yuxarı çəkilir (pick-up). Elementin dartmaya əlavə etdiyi artım ΔF neçə lbf-dir?",
    unit: "lbf",
    answer: 410.3,
    tol: 1,
    solution: "Oxboyu çəki komponenti: w_b·ΔL·cos α = 18·30·0.5 = 270 lbf. Pick-up: ΔF = 270 + 140.3 = 410.3 lbf (sürtünmə dartmanı artırır).",
  },
  {
    id: "t3",
    prompt: "3. Həmin element aşağı endirilir (slack-off). ΔF neçə lbf-dir?",
    unit: "lbf",
    answer: 129.7,
    tol: 1,
    solution: "Slack-off: ΔF = 270 − 140.3 = 129.7 lbf (sürtünmə dartmanı azaldır). Pick-up və slack-off fərqi 2·μN = 280.6 lbf: bu, bir element üçün 'drag' pəncərəsidir.",
  },
  {
    id: "t4",
    prompt: "4. μ = 0.30 üçün düz maili hissədə boru öz çəkisi ilə sürüşməyən kritik bucaq (şaquli oxdan) neçə dərəcədir? (tan α = 1/μ)",
    unit: "°",
    answer: 73.3,
    tol: 0.2,
    solution: "Sürüşmə şərti: cos α > μ sin α, yəni tan α < 1/μ. α_kritik = atan(1/0.30) = 73.3°. Bundan böyük bucaqda boru öz çəkisi ilə sürüşmür.",
  },
  {
    id: "t5",
    prompt: "5. Çəkisiz boru 30° əyilmədən keçir. Aşağı ucda dartma 50,000 lbf, μ = 0.25. Pick-up zamanı yuxarı ucda dartma neçə lbf olur? (F·e^(μθ))",
    unit: "lbf",
    answer: 56993,
    tol: 60,
    solution: "θ = 30° = 0.5236 rad. μθ = 0.1309. F_çıxış = 50,000 · e^0.1309 = 50,000 · 1.1399 ≈ 56,993 lbf (≈ 14% artım).",
  },
  {
    id: "t6",
    prompt: "6. Eyni əyilmə, slack-off. Aşağı ucda 50,000 lbf olarsa yuxarı ucda dartma neçə lbf olur? (F·e^(−μθ))",
    unit: "lbf",
    answer: 43865,
    tol: 60,
    solution: "F_çıxış = 50,000 · e^(−0.1309) = 50,000 · 0.8773 ≈ 43,865 lbf. Slack-off-da sürtünmə dartmanı azaldır.",
  },
  {
    id: "t7",
    prompt: "7. Normal qüvvə N = 467.7 lbf, μ = 0.30, tool joint OD 6.625 in (kontakt radiusu 3.3125 in). 30 ft-lik elementin torque artımı neçə ft·lbf-dir? (ΔT = μ·N·r)",
    unit: "ft·lbf",
    answer: 38.7,
    tol: 0.5,
    solution: "r = 3.3125 / 12 = 0.2760 ft. ΔT = 0.30 · 467.7 · 0.2760 ≈ 38.7 ft·lbf. Min fut quyu uzunluğu boyunca bu artımlar toplanır.",
  },
  {
    id: "t8",
    prompt: "8. 5 in drill pipe (ID 4.276 in), E-75 (σ_y = 75,000 psi). Torsiya axma həddi Q = 0.096167·J·σ_y/OD neçə ft·lbf-dir? (J = π/32·(OD⁴ − ID⁴))",
    unit: "ft·lbf",
    answer: 41167,
    tol: 150,
    solution: "J = (π/32)(5⁴ − 4.276⁴) = 0.09817 · (625 − 334.3) = 28.54 in⁴. Q = 0.096167 · 28.54 · 75,000 / 5 ≈ 41,167 ft·lbf (yeni boru, dartmasız). Real dizaynda tool joint-in make-up torque-u çox vaxt limit olur.",
  },
  {
    id: "t9",
    prompt: "9. 5 in DP (ID 4.276, adjusted 21.9 lb/ft), 8.5 in quyu, 60° bucaq, MW 12 ppg. Dawson-Paslay sinusoidal buckling yükü neçə lbf-dir? (F = 2·√(E·I·w_b·sin α / r), E = 30·10⁶ psi)",
    unit: "lbf",
    answer: 35541,
    tol: 300,
    solution:
      "I = (π/64)(5⁴ − 4.276⁴) = 14.27 in⁴; EI = 4.28·10⁸ lbf·in². w_b = 21.9 · 0.8168 / 12 = 1.491 lbf/in. r = (8.5 − 5)/2 = 1.75 in. F = 2·√(4.28·10⁸ · 1.491 · 0.866 / 1.75) ≈ 35,541 lbf. Helical buckling təxminən 2√2 dəfə yüksək yükdə başlayır (≈ 100 klbf).",
  },
];

export const TD_QUIZ: QuizQuestion[] = [
  {
    q: "String eyni zamanda fırlanırsa, aksial drag nə olur?",
    options: ["Əhəmiyyətli dərəcədə azalır", "İkiqat artır", "Dəyişmir", "Mənfi olur"],
    correct: 0,
    explanation: "Fırlanma sürtünmə vektorunu çevrə istiqamətinə yönəldir, aksial sürtünmə təxminən sıfıra enir. Buna görə fırlanma zamanı hook load weight-ə daha yaxındır və çəkinin ötürülməsi asanlaşır.",
  },
  {
    q: "Hansı rejimdə səthdəki hook load ən yüksəkdir?",
    options: ["Pick-up (yuxarı çəkmə)", "Slack-off (aşağı endirmə)", "Rotating off-bottom", "Hamısı eynidir"],
    correct: 0,
    explanation: "Pick-up zamanı sürtünmə çəkiyə əlavə olur, slack-off-da isə çəkidən çıxılır. Rotating off-bottom adətən bu ikisinin arasında yerləşir.",
  },
  {
    q: "Soft-string modelində string necə qəbul edilir?",
    options: [
      "Əyilmə sərtliyi olmayan kabel kimi, quyu divarı ilə davamlı kontaktda",
      "Mütləq sərt cisim kimi",
      "Quyu divarına toxunmayan boru kimi",
      "Sürtünməsiz sistem kimi",
    ],
    correct: 0,
    explanation: "Johancsik modeli stringi əyilmə sərtliyi olmayan kabel kimi qəbul edir və quyu divarı ilə davamlı kontakt, Coulomb sürtünməsi fərz edir. Buckling və sərtlik effektləri nəzərə alınmır.",
  },
  {
    q: "Sürtünmə əmsalı (friction factor) praktikada necə təyin olunur?",
    options: [
      "Ölçülmüş hook load və torque-dan modelə qarşı geri hesablama (kalibrləmə)",
      "Cədvəldən bir dəfə seçilir və dəyişmir",
      "Yalnız laboratoriyada ölçülür",
      "Məhlulun rəngindən",
    ],
    correct: 0,
    explanation: "Qonşu quyuların və cari quyunun ölçülmüş pick-up, slack-off və rotating çəkiləri ilə model uyğunlaşdırılır, cased və açıq quyu üçün μ ayrıca kalibrlənir.",
  },
  {
    q: "μ = 0.25 olduqda təxminən hansı bucaqdan yuxarı (şaquli oxdan) düz hissədə string öz çəkisi ilə sürüşmür?",
    options: ["14°", "45°", "76°", "90°"],
    correct: 2,
    explanation: "α_kritik = atan(1/μ) = atan(4) ≈ 76°. Bundan böyük bucaqda oxboyu çəki komponenti sürtünməni keçə bilmir.",
  },
  {
    q: "Dartma altında olan boru build (əyri) hissədən keçir. Nəyə gətirir?",
    options: [
      "Dartma divara əlavə normal qüvvə (≈ F·θ) yaradır, sürtünmə və drag artır",
      "Drag azalır",
      "Torque sıfıra enir",
      "Boru uzanır",
    ],
    correct: 0,
    explanation: "Capstan effekti: gərgin boru əyrinin daxili tərəfinə sıxılır. Normal qüvvə F·θ qədər artır, sürtünmə eksponensial dəyişir. Build zonaları T&D-nin ən problemli hissələridir.",
  },
  {
    q: "Segmentdə torque artımı hansı kəmiyyətlərə mütənasibdir?",
    options: [
      "Sürtünmə əmsalı, normal qüvvə və kontakt radiusu",
      "Yalnız məhlul çəkisinə",
      "Yalnız quyu dərinliyinə",
      "Yalnız bit tipinə",
    ],
    correct: 0,
    explanation: "ΔT = μ · N · r. Torque normal qüvvə (trayektoriya, çəki, dartma) və sürtünmə ilə artır; kontakt radiusu (tool joint) də təsir edir.",
  },
  {
    q: "Slack-off zamanı yuxarı hissədə string sıxılmaya düşür. Ən böyük risk hansıdır?",
    options: ["Buckling və string-in quyuya enə bilməməsi", "ROP artması", "ECD azalması", "Nasos təzyiqinin azalması"],
    correct: 0,
    explanation: "Sıxılmış nazik boru (DP) maili hissədə sinusoidal, sonra helical buckling-ə uğrayır; sürtünmə kəskin artır və string-in ötürmə qabiliyyəti itir (lock-up).",
  },
  {
    q: "T&D-ni azaltmağın düzgün üsulu hansıdır?",
    options: [
      "Daha yaxşı yağlama (OBM/lubricant), hamar trayektoriya, hole cleaning, rotasiya",
      "Məhlulu daha da qatılaşdırmaq",
      "Axını sıfıra endirmək",
      "Daha çox stabilizator əlavə etmək",
    ],
    correct: 0,
    explanation: "T&D sürtünməyə və normal qüvvəyə görə dəyişir. OBM və yağlayıcılar μ-nü azaldır, hamar trayektoriya normal qüvvəni azaldır, hole cleaning cuttings yatağını yox edir, rotasiya aksial drag-ı azaldır.",
  },
  {
    q: "Hook load qrafikində pick-up və slack-off əyriləri arasındakı məsafə nəyi göstərir?",
    options: ["Təxminən 2 × drag (sürtünmə təsiri)", "WOB", "Məhlul çəkisi", "Casing çəkisi"],
    correct: 0,
    explanation: "Pick-up sürtünməni əlavə, slack-off çıxır, rotating isə təxminən sürtünməsiz çəkidir. Aralarındakı fərq sürtünmənin toplam təsiridir.",
  },
  {
    q: "Boruda eyni anda həm dartma, həm də burulma varsa, icazə verilən torque necə dəyişir?",
    options: ["Azalır (von Mises)", "Artır", "Dəyişmir", "Sıfıra bərabər olur"],
    correct: 0,
    explanation: "Dartma və burulma gərginliyi birləşərək axma həddinə daha tez çatır: Q_birləşmiş = Q · √(1 − (F/(σ_y·A))²). Dartma artdıqca icazə verilən torque azalır.",
  },
];

export const TD_FORMULAS: FormulaGroup[] = [
  {
    title: "Soft-string (Johancsik)",
    rows: [
      { name: "Normal qüvvə (planar)", formula: "N = | F·Δα + w_b·ΔL·sin α |", note: "Δα yuxarı getdikcə bucaq dəyişməsi (rad)" },
      { name: "Normal qüvvə (3D)", formula: "N = √[(F·Δφ·sin α)² + (F·Δα + w_b·ΔL·sin α)²]" },
      { name: "Oxboyu çəki komponenti", formula: "ΔW = w_b·ΔL·cos α" },
      { name: "Buoyed çəki", formula: "w_b = w_hava · (1 − MW/65.5)" },
    ],
  },
  {
    title: "Rejimlər",
    rows: [
      { name: "Pick-up", formula: "ΔF = w_b·ΔL·cos α + μ·N" },
      { name: "Slack-off", formula: "ΔF = w_b·ΔL·cos α − μ·N" },
      { name: "Rotating (off-bottom / drilling)", formula: "ΔF = w_b·ΔL·cos α;  ΔT = μ·N·r", note: "drilling: F_bit = −WOB, T_bit verilir" },
      { name: "Torque artımı", formula: "ΔT = μ · N · r   (r: tool joint radiusu)" },
    ],
  },
  {
    title: "Capstan və kritik bucaq",
    rows: [
      { name: "Capstan", formula: "F_çıx = F_giriş · e^(±μθ)", note: "+ pick-up, − slack-off; θ radian" },
      { name: "Normal qüvvə (əyri)", formula: "N ≈ F · θ" },
      { name: "Kritik bucaq", formula: "α_kr = atan(1/μ)", note: "bu bucaqdan böyük: öz çəkisi ilə sürüşmə yoxdur" },
    ],
  },
  {
    title: "Torsiya və buckling",
    rows: [
      { name: "Qütb ətalət momenti", formula: "J = (π/32)·(OD⁴ − ID⁴)  [in⁴]" },
      { name: "Torsiya axma həddi", formula: "Q = 0.096167·J·σ_y / OD  [ft·lbf]" },
      { name: "Dartma altında tutum", formula: "Q_c = Q·√(1 − (F/(σ_y·A))²)" },
      { name: "Sinusoidal buckling", formula: "F_s = 2·√(E·I·w_b·sin α / r)", note: "w_b lb/in, r = (D_quyu − OD)/2, I = (π/64)(OD⁴ − ID⁴)" },
      { name: "Helical buckling", formula: "F_h ≈ 2√2 · F_s" },
    ],
  },
];
