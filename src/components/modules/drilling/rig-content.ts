import type { QuizQuestion } from "../Quiz";
import type { MissionItem } from "./MissionRunner";
import type { FormulaGroup } from "./FormulaSheet";

export type SysId = "power" | "hoisting" | "rotating" | "circulating" | "wellcontrol" | "monitoring";

export interface RigSystem {
  name: string;
  nameEn: string;
  color: string;
  role: string;
  components: string[];
  keys: string[];
  href?: string;
  hrefLabel?: string;
}

export const SYSTEMS: Record<SysId, RigSystem> = {
  power: {
    name: "Güc sistemi",
    nameEn: "Power system",
    color: "#34D399",
    role: "Qurğunun bütün sistemlərini enerji ilə təmin edir.",
    components: ["Dizel mühərriklər və generatorlar", "SCR/VFD idarəetmə və transformatorlar (dizel-elektrik)", "Bəzi köhnə qurğularda mexaniki ötürmə"],
    keys: [
      "Güc ehtiyacı əməliyyata görə dəyişir: trip zamanı drawworks, qazma zamanı nasoslar və fırlanma əsas istehlakçılardır.",
      "Müasir qurğularda dizel-elektrik sxemi üstünlük təşkil edir: enerji sistemlər arasında çevik bölüşdürülür.",
    ],
  },
  hoisting: {
    name: "Qaldırma sistemi",
    nameEn: "Hoisting system",
    color: "#FBBF24",
    role: "Drill string-i və casing-i quyuya endirir, çıxarır və çəkisini daşıyır.",
    components: ["Derrick / mast", "Crown block və traveling block", "Drawworks", "Drilling line (fast line, dead line)", "Hook, elevators, slips"],
    keys: [
      "E = (K^N − 1) / (N · K^N · (K − 1)), K ≈ 1.04",
      "Fast line yükü: F = W / (E · N)",
      "Derrick yükü = W + fast line + dead line",
      "Drilling line üçün tipik dizayn əmsalı və yorğunluq (ton-mile) izlənir.",
    ],
    href: "/equipment/derrick",
    hrefLabel: "Derrick-i 3D-də aç",
  },
  rotating: {
    name: "Fırlanma sistemi",
    nameEn: "Rotating system",
    color: "#FF6B2B",
    role: "Bit-i fırladır və fırlanma momentini drill string vasitəsilə ötürür.",
    components: ["Top drive (və ya rotary table + kelly)", "Swivel", "Drill string: drill pipe, HWDP, drill collars", "Bit və xüsusi sub-lar"],
    keys: [
      "Top drive 3 boru uzunluğunda stand (≈ 90 ft) ilə qazmağa imkan verir: bağlantı sayı azalır.",
      "Qazma zamanı tipik fırlanma sürəti bit tipinə və formasiyaya görə təxminən 60-200 rpm aralığında olur.",
      "Drill string-in tərkibi və yükləri 5-ci bölmədə ətraflı keçilir.",
    ],
  },
  circulating: {
    name: "Sirkulyasiya sistemi",
    nameEn: "Circulating system",
    color: "#00D4FF",
    role: "Məhlulu dövr etdirir: quyunu şlamdan təmizləyir, təzyiqi tarazlayır, bit-ə hidravlik enerji verir.",
    components: [
      "Məhlul çənləri (active/reserve) və trip tank",
      "Triplex nasoslar",
      "Standpipe, rotary hose, swivel",
      "Drill string və bit nozzle-ləri, halqa (annulus)",
      "Flowline, shale shaker, degasser, desander/desilter, centrifuge",
    ],
    keys: [
      "Nasos çıxışı: Q [gpm] = 0.000243 · D² · L · Ev · 42 · SPM",
      "Hidravlik güc: HHP = P · Q / 1714",
      "Halqada sürət: AV = 24.51 · Q / (Dh² − Dp²)",
      "Yol: çən → nasos → standpipe → hose → top drive → string → bit → halqa → flowline → shaker → çən",
    ],
    href: "/equipment/mud-system",
    hrefLabel: "Mud sistemini 3D-də aç",
  },
  wellcontrol: {
    name: "Quyu nəzarəti sistemi",
    nameEn: "Well control system",
    color: "#F87171",
    role: "Quyunun idarəolunmaz axınının qarşısını alır: kick-i aşkar edir, quyunu bağlayır, təzyiq altında məhlulu dövr etməyə imkan verir.",
    components: ["BOP stack: annular, pipe rams, blind/shear rams", "Choke və kill xətləri, choke manifold", "Akkumulyator (Koomey) bloku", "Diverter (dayaz qaz üçün)", "Qaz separatoru"],
    keys: [
      "BOP təzyiq sinifləri adətən 5,000 / 10,000 / 15,000 psi olur.",
      "Akkumulyatorun istifadə oluna bilən həcmi Boyle qanunu ilə hesablanır (kalkulyatorda).",
      "Boş quyuda bağlamaq üçün blind (və ya blind/shear) ram nəzərdə tutulub.",
      "Kick-in erkən aşkarı: çən həcminin artımı (pit gain) və flow-out artımı (10-cu bölmədə ətraflı).",
    ],
    href: "/equipment/bop",
    hrefLabel: "BOP-u 3D-də aç",
  },
  monitoring: {
    name: "Monitorinq və idarəetmə",
    nameEn: "Monitoring & instrumentation",
    color: "#A78BFA",
    role: "Əməliyyatı real vaxtda izləyir və kick, itki, yapışma kimi problemlərin ilk əlamətlərini göstərir.",
    components: ["Weight indicator (hook load, WOB)", "Standpipe təzyiqi və SPM", "Rotary torque və rpm", "PVT (çən həcmi) və flow-out sensoru", "Qaz detektoru, trip tank göstəricisi"],
    keys: [
      "PVT artımı kick, azalması isə məhlul itkisi əlaməti ola bilər.",
      "Standpipe təzyiqinin qəfil dəyişməsi nasos, bit nozzle və ya drill string problemini göstərə bilər.",
      "Hook load-un qeyri-adi dəyişməsi yapışma və ya swab əlaməti ola bilər.",
    ],
  },
};

export const RIG_OBJECTIVES = [
  "Qurğunun 6 əsas sistemini, komponentlərini və funksiyalarını izah etmək",
  "Block & tackle hesablaması ilə fast line və derrick yükünü, drilling line dizayn əmsalını tapmaq",
  "Nasos çıxışını, hidravlik gücü, halqada sürəti və bottoms-up vaxtını hesablamaq",
  "Trip tank ilə quyunun düzgün dolduğunu yoxlamaq",
  "Akkumulyatorun istifadə olunan həcmini qiymətləndirmək",
];

export const RIG_MISSION_INTRO =
  "Sən yeni qurğuda işə başlayan qazma mühəndisisən. Əvvəl hoisting, sonra sirkulyasiya və trip hesablamalarını həll et. Hər cavab avtomatik yoxlanır, həll isə addım-addım göstərilir.";

export const RIG_MISSION: MissionItem[] = [
  {
    id: "r1",
    prompt: "1. Hook load W = 300,000 lbf, traveling block sistemində N = 10 xətt, sheave əmsalı K = 1.04. Fast line yükü neçə lbf-dir?",
    unit: "lbf",
    answer: 36987,
    tol: 120,
    solution: "E = (1.04¹⁰ − 1) / (10 · 1.04¹⁰ · 0.04) = 0.811. F_fast = 300,000 / (0.811 · 10) ≈ 36,987 lbf.",
  },
  {
    id: "r2",
    prompt: "2. Eyni şərtlərdə derrick-ə düşən ümumi yük nə qədərdir? (dead line yükü W/N qəbul edilir)",
    unit: "lbf",
    answer: 366987,
    tol: 400,
    solution: "Dead line = 300,000 / 10 = 30,000 lbf. Derrick yükü = 300,000 + 36,987 + 30,000 = 366,987 lbf. Derrick yalnız hook load-u deyil, bütün xətt yüklərini daşıyır.",
  },
  {
    id: "r3",
    prompt:
      "3. Başqa mərhələ: W = 400,000 lbf, N = 10, K = 1.04. Drilling line-ın qırılma gücü 190,000 lbf-dir (tutaq). Dizayn əmsalı (design factor) neçədir?",
    unit: "",
    answer: 3.85,
    tol: 0.03,
    solution:
      "F_fast = 400,000 / (0.811 · 10) = 49,316 lbf. Dizayn əmsalı = 190,000 / 49,316 = 3.85. Qazma əməliyyatı üçün tipik minimum tələb 3 ətrafındadır, casing endirmə və ya sıxılmış borunu çəkmə kimi əməliyyatlarda daha aşağı hədd (təxminən 2) qəbul edilir. Dəqiq hədd üçün API RP 9B və şirkət prosedurunu yoxla.",
  },
  {
    id: "r4",
    prompt: "4. Triplex nasos: liner 6.5 in, stroke 12 in, həcmi səmərəlilik 95%. 100 spm-də axın sürəti neçə gpm-dir?",
    unit: "gpm",
    answer: 491.6,
    tol: 3,
    solution: "bbl/strok = 0.000243 · 6.5² · 12 · 0.95 = 0.1170. Q = 0.1170 · 42 · 100 ≈ 491.6 gpm.",
  },
  {
    id: "r5",
    prompt: "5. Həmin axında standpipe təzyiqi 3,000 psi-dir. Nasosun hidravlik gücü (HHP) neçə hp-dir?",
    unit: "hp",
    answer: 860,
    tol: 5,
    solution: "HHP = 3,000 · 491.6 / 1714 ≈ 860 hp.",
  },
  {
    id: "r6",
    prompt: "6. 8.5 in quyu, 5 in drill pipe, axın 450 gpm. Halqada orta sürət neçə ft/dəq-dir?",
    unit: "ft/dəq",
    answer: 233.4,
    tol: 1,
    solution: "AV = 24.51 · 450 / (8.5² − 5²) = 11,029.5 / 47.25 ≈ 233.4 ft/dəq.",
  },
  {
    id: "r7",
    prompt: "7. Eyni quyuda dərinlik 10,000 ft, halqa tutumu 0.0459 bbl/ft, axın 450 gpm. Bottoms-up vaxtı neçə dəqiqədir?",
    unit: "dəq",
    answer: 42.8,
    tol: 0.5,
    solution: "Halqa həcmi = 0.0459 · 10,000 = 459 bbl. Axın = 450 / 42 = 10.71 bbl/dəq. Vaxt = 459 / 10.71 ≈ 42.8 dəq.",
  },
  {
    id: "r8",
    prompt:
      "8. 5 in drill pipe (ID 4.276 in) quru (dry) çəkilir. 12 stand (hər biri 90 ft) çıxarılır. Trip tank-dan quyuya neçə bbl məhlul getməlidir?",
    unit: "bbl",
    answer: 7.05,
    tol: 0.05,
    solution:
      "Yerdəyişmə = (5² − 4.276²) / 1029.4 = 0.006524 bbl/ft. Uzunluq = 12 · 90 = 1,080 ft. Həcm = 0.006524 · 1,080 ≈ 7.05 bbl. Quyuya bundan az məhlul getsə, formasiya mayesinin daxil olması (swab/kick) ehtimalı var.",
  },
];

export const RIG_QUIZ: QuizQuestion[] = [
  {
    q: "Traveling block sistemində xətlərin sayı (N) artırılır. Nə baş verir?",
    options: [
      "Fast line yükü azalır, sürtünmə hesabına səmərəlilik bir qədər düşür",
      "Fast line yükü artır, səmərəlilik artır",
      "Hook load azalır",
      "Dead line yükü sıfır olur",
    ],
    correct: 0,
    explanation: "N artdıqca eyni hook load daha çox xətt arasında bölünür və fast line yükü azalır. Lakin hər sheave əlavə sürtünmə yaradır, ona görə E bir qədər azalır.",
  },
  {
    q: "Derrick-ə düşən yük hook load-dan niyə böyükdür?",
    options: [
      "Derrick-in öz çəkisinə görə",
      "Fast line və dead line yükləri də derrick-ə ötürülür",
      "Məhlulun çəkisinə görə",
      "Heç vaxt böyük deyil",
    ],
    correct: 1,
    explanation: "Derrick yükü = hook load + fast line yükü + dead line yükü. Buna görə derrick-in yük tutumu hook load-dan yüksək olmalıdır.",
  },
  {
    q: "Top drive-ın kelly + rotary table sisteminə üstünlüyü nədir?",
    options: [
      "Daha ucuzdur",
      "Stand ilə qazmaq (bağlantı sayı azalır) və boru çəkərkən sirkulyasiya/fırlatma imkanı",
      "Bit-in ölçüsünü artırır",
      "Məhlul lazım olmur",
    ],
    correct: 1,
    explanation: "Top drive 3 borulu stand ilə qazmağa imkan verir, bu da bağlantı vaxtını azaldır. Həm də trip zamanı sirkulyasiya və fırlatma (reaming) mümkün olur.",
  },
  {
    q: "Məhlulun düzgün hərəkət yolu hansıdır?",
    options: [
      "Çən → nasos → standpipe → rotary hose → top drive → string → bit → halqa → flowline → shaker → çən",
      "Çən → shaker → nasos → halqa → string → bit",
      "Nasos → halqa → bit → string → standpipe",
      "Çən → bit → nasos → flowline",
    ],
    correct: 0,
    explanation: "Məhlul nasosla string-in içinə vurulur, bit-dən çıxır, halqadan şlamla birlikdə qalxır, flowline-dan shaker-ə gedir və təmizlənib çənə qayıdır.",
  },
  {
    q: "Triplex nasos: liner 6.5 in, stroke 12 in, həcmi səmərəlilik 95%. Strok başına çıxış təxminən nə qədərdir?",
    options: ["0.0117 bbl", "0.117 bbl", "1.17 bbl", "11.7 bbl"],
    correct: 1,
    explanation: "0.000243 · 6.5² · 12 · 0.95 ≈ 0.117 bbl/strok (yəni ≈ 4.9 gal).",
  },
  {
    q: "Standpipe təzyiqi 3,000 psi, axın 500 gpm. Hidravlik güc təxminən nə qədərdir?",
    options: ["450 hp", "875 hp", "1,500 hp", "8,750 hp"],
    correct: 1,
    explanation: "HHP = 3,000 · 500 / 1714 ≈ 875 hp.",
  },
  {
    q: "Boru çəkilərkən quyu hesablanan yerdəyişmədən AZ məhlul qəbul edir. Bu nəyi göstərə bilər?",
    options: [
      "Quyu itki verir",
      "Formasiya mayesinin quyuya daxil olması (swab/kick) ehtimalı",
      "Heç nə, normaldır",
      "Trip tank-ın yanlış rəngi",
    ],
    correct: 1,
    explanation: "Çıxan boru həcmi qədər məhlul quyuya qayıtmalıdır. Daha az qayıdırsa, quyuya formasiya mayesi daxil olur. Belə halda prosedura uyğun flow check aparılır.",
  },
  {
    q: "10-gal akkumulyator balonu: pre-charge 1,000 psi, maksimum 3,000 psi, minimum iş təzyiqi 1,200 psi. Təxmini istifadə olunan həcm?",
    options: ["2 gal", "5 gal", "8 gal", "10 gal"],
    correct: 1,
    explanation: "V · (1000/1200 − 1000/3000) = 10 · (0.833 − 0.333) = 5 gal. Balon həcminin yalnız yarısı istifadə olunur.",
  },
  {
    q: "Quyuda boru yoxdur (boş quyu). Quyunu bağlamaq üçün hansı BOP elementi nəzərdə tutulub?",
    options: ["Pipe ram", "Blind ram (və ya blind/shear ram)", "Diverter", "Choke xətti"],
    correct: 1,
    explanation: "Pipe ram yalnız müəyyən boru ölçüsünə uyğundur. Boş quyunu blind ram bağlayır, blind/shear ram isə borunu kəsib quyunu bağlaya bilər.",
  },
  {
    q: "Qazma zamanı çən həcmi (PVT) qəfil artır, flow-out də artıb. Ən ehtimal nədir?",
    options: ["Məhlul itkisi", "Kick (formasiya mayesinin daxil olması)", "Bit-in köhnəlməsi", "Normal əməliyyat"],
    correct: 1,
    explanation: "Quyuya daxil olan formasiya mayesi məhlulu yerindən sıxışdırır, çənlərdə həcm artır. Bu, kick-in əsas əlamətlərindən biridir və dərhal prosedura uyğun hərəkət tələb edir.",
  },
];

export const RIG_FORMULAS: FormulaGroup[] = [
  {
    title: "Hoisting",
    rows: [
      { name: "Sistemin səmərəliliyi", formula: "E = (K^N − 1) / (N · K^N · (K − 1))", note: "K ≈ 1.04 (roller bearing); N = xətt sayı" },
      { name: "Fast line yükü", formula: "F_fast = W / (E · N)" },
      { name: "Dead line yükü (statik)", formula: "F_dead = W / N" },
      { name: "Derrick yükü", formula: "F_derrick = W + F_fast + F_dead" },
      { name: "Hook gücü / drawworks gücü", formula: "HP_hook = W·v / 33,000;  HP_dw = HP_hook / E", note: "v ft/dəq, W lbf" },
      { name: "Dizayn əmsalı", formula: "DF = qırılma gücü / F_fast" },
    ],
  },
  {
    title: "Nasos və hidravlik güc",
    rows: [
      { name: "Triplex çıxışı", formula: "bbl/strok = 0.000243 · D² · L · Ev", note: "D, L: in; Ev: həcmi səmərəlilik" },
      { name: "Axın sürəti", formula: "Q [gpm] = bbl/strok · 42 · SPM" },
      { name: "Hidravlik güc", formula: "HHP = P [psi] · Q [gpm] / 1714" },
    ],
  },
  {
    title: "Həcmlər və sürətlər",
    rows: [
      { name: "Boru tutumu", formula: "Cap = ID² / 1029.4  [bbl/ft]" },
      { name: "Boru yerdəyişməsi (açıq uc)", formula: "Disp = (OD² − ID²) / 1029.4  [bbl/ft]" },
      { name: "Halqa tutumu", formula: "Cap_ann = (Dh² − Dp²) / 1029.4  [bbl/ft]" },
      { name: "Halqada sürət", formula: "AV = 24.51 · Q / (Dh² − Dp²)  [ft/dəq]" },
      { name: "Bottoms-up vaxtı", formula: "t = V_ann [bbl] / (Q [gpm] / 42)  [dəq]" },
    ],
  },
  {
    title: "Trip və akkumulyator",
    rows: [
      { name: "Trip tank (quru boru)", formula: "V = Disp · L_çəkilən" },
      { name: "Trip tank (yaş boru)", formula: "V = (Disp + Cap) · L_çəkilən" },
      { name: "Akkumulyator (istifadə olunan)", formula: "V_usable = V_bal · (P_pre/P_min − P_pre/P_max)", note: "Boyle qanunu; təzyiqlər psi" },
    ],
  },
];
