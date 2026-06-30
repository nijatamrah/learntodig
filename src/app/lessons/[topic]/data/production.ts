import type { Lesson } from "../types";

export const productionLesson: Lesson = {
  title: "Hasilat Mühəndisliyi",
  icon: "⚡",
  levels: {
    baslangic: {
      description: "IPR, Nodal Analysis, süni qaldırma sistemlərinin əsasları.",
      sections: [
        {
          heading: "Hasilat mühəndisliyi nədir? | Production Engineering",
          body: "Hasilat mühəndisliyi rezervuardan səthdəki qurğulara qədər olan bütün sistemin optimizasiyası ilə məşğul olur. Sistem 3 hissədən ibarətdir: (1) Rezervuar — neftin mənbəyi; (2) Quyu — axın kanalı (completion, tubinglar, perforasiyalar); (3) Səth qurğuları — separator, nasos, boru xəttləri.",
          terms: [
            { az: "Hasilat mühəndisliyi", en: "Production engineering" },
            { az: "Quyu tamamlanması", en: "Well completion" },
            { az: "Perforasiya", en: "Perforation" },
            { az: "Separator", en: "Separator" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: SOCAR-ın Azərbaycan quyularının əksəriyyətində ESP (elektrik sualtı nasosu) sistemi quraşdırılmışdır. Bu sistemlər gündə 100–3000 barel neft qaldırır.",
        },
        {
          heading: "IPR — Inflow Performance Relationship",
          body: "IPR rezervuardan quyuya neftin axın xarakteristikasını göstərən əyridir. X oxu — hasilat (Q), Y oxu — quyu dibi axın təzyiqi (Pwf). Pr = Pwf olduqda axın sıfıra düşür. Pwf sıfıra düşdükdə maksimum hasilat (AOF) alınır.",
          terms: [
            { az: "Giriş performans əlaqəsi", en: "IPR (Inflow Performance Relationship)" },
            { az: "Quyu dibi axın təzyiqi", en: "Flowing bottom hole pressure (Pwf)" },
            { az: "Statik reservoir təzyiqi", en: "Static reservoir pressure (Pr)" },
            { az: "Mütləq açıq axın", en: "AOF (Absolute Open Flow)" },
          ],
          formula: {
            expression: "q/qmax = 1 - 0.2(Pwf/Pr) - 0.8(Pwf/Pr)²   [Vogel]",
            legend: "q — hasilat (bbl/day) | qmax — maksimum hasilat | Pwf — quyu dibi təzyiq (psi) | Pr — rezervuar təzyiqi (psi)",
          },
          example:
            "💡 Nümunə: Pr=2000 psi, qmax=1000 bbl/day, Pwf=1200 psi.\nPwf/Pr=0.60\nq/1000 = 1-0.2(0.6)-0.8(0.36) = 1-0.12-0.288 = 0.592\nq = 592 bbl/day",
          caseStudy:
            "🌍 Dünya nümunəsi: Vogel tənliyi ilk dəfə 1968-ci ildə solution gas drive rezervuarları üçün inkişaf etdirilmişdir. Bu gün qaz lifti, ESP dizaynı kimi bütün süni qaldırma sistemlərinin iqtisadi analizi IPR üzərindədir.",
        },
        {
          heading: "VLP / TPC — Vertical Lift Performance",
          body: "VLP (Vertical Lift Performance), TPC (Tubing Performance Curve) deyilir — müəyyən quyu dibi təzyiqinə uyğun olaraq səthdə görünən hasilat dəyərini göstərir. Nodal Analysis — IPR + VLP əyrilərinin kəsişməsi işçi nöqtəni verir.",
          terms: [
            { az: "Şaquli qaldırma performansı", en: "VLP / TPC (Tubing Performance Curve)" },
            { az: "İşçi nöqtə", en: "Operating point" },
            { az: "Qaz-neft nisbəti", en: "GOR (Gas-Oil Ratio)" },
            { az: "Su kəsiyi", en: "Water cut (WC)" },
          ],
          example:
            "💡 Nodal Analysis: IPR əyrisi (600 psi, 800 bbl/day) nöqtəsində VLP əyrisi ilə kəsişir. Bu sistemin real işçi nöqtəsidir.",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: SOCAR-ın Suraxanı yatağında quyuların VLP analizi PROSPER proqramı ilə aparılmışdır. Tubing diametrinin 2.875-dən 3.5 inch-ə artırılması hasilatı 15% artırmışdır.",
        },
        {
          heading: "ESP — Electric Submersible Pump | Elektrik Sualtı Nasosu",
          body: "ESP — quyu içinə yerləşdirilmiş çoxpilləli sentrifuqal nasosudur. Əsas komponentlər: motor, protector, separator (qazı ayırır), pump. ESP seçimi: başlıq, axın dərəcəsi, dinamik səviyyə əsasında aparılır.",
          terms: [
            { az: "Elektrik sualtı nasosu", en: "ESP (Electric Submersible Pump)" },
            { az: "Dinamik maye səviyyəsi", en: "DFL (Dynamic Fluid Level)" },
            { az: "Nasosun başlığı", en: "Pump head (ft)" },
            { az: "At qüvvəsi", en: "Horsepower (HP)" },
          ],
          formula: {
            expression: "Head (ft) = DFL + (P_surface × 2.31 / SG)",
            legend: "DFL — dynamic fluid level (ft) | P_surface — wellhead pressure (psi) | SG — fluid specific gravity",
          },
          example:
            "💡 Nümunə: P_surface=200 psi, SG=0.85, DFL=3000 ft.\nHead = 3000 + (200×2.31/0.85) = 3000+543 = 3543 ft\n→ Bu başlığı verə bilən ESP modeli seçilir.",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: SOCAR-ın 800+ istismar quyusunun ~70%-ində ESP sistemi var. Ən geniş yayılan model: Schlumberger REDA seriyası (100–400 HP). Ortalama ESP ömrü: 2–4 il.",
        },
        {
          heading: "DCA — Decline Curve Analysis | Azalma Əyrisi",
          body: "DCA hasilatın zamanla azalmasını modelləşdirir. Arps (1945) 3 model: Eksponensial — sabit azalma dərəcəsi; Hiperbolik — azalan azalma dərəcəsi (b faktoru); Harmonik — xüsusi hal (b=1). EUR əyrinin altındakı sahədir.",
          terms: [
            { az: "Azalma əyrisi analizi", en: "DCA (Decline Curve Analysis)" },
            { az: "Azalma dərəcəsi", en: "Decline rate (Di)" },
            { az: "Arps b faktoru", en: "Arps b factor (0 ≤ b ≤ 1)" },
            { az: "Ümumi çıxarıla bilən ehtiyat", en: "EUR (Estimated Ultimate Recovery)" },
          ],
          formula: {
            expression: "q(t) = qi × e^(-Di × t)   [Eksponensial]",
            legend: "qi — ilkin hasilat | Di — azalma dərəcəsi (1/vaxt) | t — vaxt",
          },
          example:
            "💡 Nümunə: qi=1000 bbl/day, Di=0.05/ay. 12 ay sonra q neçədir?\nq = 1000×e^(-0.05×12) = 1000×e^(-0.6) = 1000×0.549 = 549 bbl/day",
          caseStudy:
            "🌍 Dünya nümunəsi: ABŞ-ın Permian Basin shale quyularında hiperbolik decline (b=1.2–1.5) müşahidə olunur — ilk il sürətli azalma (~80%), sonra sabitləşmə.",
        },
      ],
      quiz: [
        {
          question: "Vogel IPR: Pr=2500 psi, qmax=800 bbl/day, Pwf=1000 psi. q neçədir?",
          options: ["~624 bbl/day", "~634 bbl/day", "~530 bbl/day", "~800 bbl/day"],
          answer: 1,
          explanation: "Pwf/Pr=0.40. q/800 = 1-0.2(0.4)-0.8(0.16) = 1-0.08-0.128 = 0.792. q = 0.792×800 ≈ 634 bbl/day.",
        },
        {
          question: "Nodal Analysis-də kəsişmə nöqtəsi nəyi göstərir?",
          options: [
            "Maksimum mümkün hasilat",
            "Sistemin real işçi nöqtəsi — həqiqi hasilat və quyu dibi təzyiqi",
            "Reservoir təzyiqi",
            "ESP-nin dizayn nöqtəsi",
          ],
          answer: 1,
          explanation: "Kəsişmə = operating point. IPR rezervuarın nə verə biləcəyini, VLP quyunun nəyi qaldıra biləcəyini göstərir.",
        },
        {
          question: "Eksponensial decline: qi=500 bbl/day, Di=0.1/ay. 6 ay sonra q neçədir?",
          options: ["~274 bbl/day", "~303 bbl/day", "~200 bbl/day", "~450 bbl/day"],
          answer: 0,
          explanation: "q = 500×e^(-0.1×6) = 500×e^(-0.6) = 500×0.5488 ≈ 274 bbl/day.",
        },
        {
          question: "ESP-nin əsas üstünlüyü nədir?",
          options: [
            "Xərci sıfıra bərabərdir",
            "Yüksək hasilat dərəcəsini geniş dərinlik aralığında təmin edir",
            "Heç bir texniki xidmət tələb etmir",
            "Yalnız şaquli quyular üçün işləyir",
          ],
          answer: 1,
          explanation: "ESP centrifugal nasosun qüdrəti ilə yüksək hasilat dərəcəsi verir (100–5000 bbl/day). Çatışmazlıq: duzlu su korroziyası, qaz lock problemi.",
        },
      ],
    },

    orta: {
      description: "Süni qaldırma optimizasiyası, gas lift, hasilat problemləri.",
      sections: [
        {
          heading: "Gas Lift — Qaz Lifti",
          body: "Gas lift — quyuya sıxılmış qaz vurularaq neft sütununun sıxlığını azaldır, quyu özü-özünə axır. Continuous gas lift — daimi injeksiya; Intermittent gas lift — periodiki vurma. Qaz lift klapanları (GLV) tubing üzərindəki mandrel-lərə yerləşdirilir.",
          terms: [
            { az: "Qaz lifti", en: "Gas lift" },
            { az: "Qaz lift klapanı", en: "Gas Lift Valve (GLV)" },
            { az: "Mandrel", en: "Mandrel (GLV housing)" },
            { az: "İnjeksiya nöqtəsi", en: "Injection point" },
          ],
          formula: {
            expression: "GLR_opt = f(tubing size, depth, fluid properties)",
            legend: "Optimal GLR — PROSPER/PIPESIM kimi proqramlarla hesablanır. GLR artdıqca hasilat artır, sonra azalır (optimum mövcuddur)",
          },
          caseStudy:
            "🌍 Dünya nümunəsi: Meksikanın Cantarell yatağında gündə 1.2 milyard scf nitrogen vurularaq hasilat artırılmışdır. Bu texnologiya yatağın iqtisadi ömrünü 10+ il artırmışdır.",
        },
        {
          heading: "Hasilat problemləri — Scale, Corrosion, Wax",
          body: "Scale (çöküntü) — CaCO₃, BaSO₄ minerallarının boruda çökməsi. Corrosion — CO₂ (sweet), H₂S (sour). Wax (parafin) — soyuq şəraitdə boru içinə çökmə. Asphaltene — yüksək təzyiq azalmasında neftdən çökür. Hər birinin fərqli müalicəsi var.",
          terms: [
            { az: "Mineral çöküntü", en: "Scale" },
            { az: "Korroziya", en: "Corrosion" },
            { az: "Parafin", en: "Wax / Paraffin" },
            { az: "Asfaltən", en: "Asphaltene" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Xəzər dənizinin yüksək CO₂ (5–8%) ehtiva edən quyularında sweet corrosion əsas problemdir. BTC boru xətti üçün xüsusi CRA materialları istifadə edilmişdir.",
        },
        {
          heading: "Well Stimulation — Acidizing & Fracturing",
          body: "Stimulyasiya — quyu ətrafındakı zədəni düzəltmək üçün aparılan müdaxilə. Matrix acidizing — HCl/HF vuraraq məsamə kanallarını genişləndirir. Hydraulic fracturing — yüksək təzyiqlə süxur çatladılır; proppant çatı açıq saxlayır.",
          terms: [
            { az: "Asit məhlulu müalicəsi", en: "Acidizing (matrix acid job)" },
            { az: "Hidravlik çatlatma", en: "Hydraulic fracturing" },
            { az: "Dayaq material", en: "Proppant" },
            { az: "Çatın ötürmə qabiliyyəti", en: "Fracture conductivity" },
          ],
          formula: {
            expression: "FOI = q_after / q_before",
            legend: "FOI — Folds of Increase. Tipik: acidizing 1.5–3×, fracturing 3–10×",
          },
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Abşerondakı köhnəlmiş quyularda matrix acid jobs (15% HCl) aparılmış, ortalama FOI=2.3 əldə edilmişdir.",
        },
        {
          heading: "Water & Gas Coning | Su və Qaz Konusu",
          body: "Coning — hasilat quyusuna istənilməyən fluidin (su və ya qaz) konusvari girməsidir. Su konu — OWC yuxarı çəkilir. Qaz konu — GOC aşağı düşür. Kritik hasilat dərəcəsi (qc) — bu dərəcədən yuxarı coning başlayır.",
          terms: [
            { az: "Konus effekti", en: "Coning (water/gas coning)" },
            { az: "Kritik hasilat", en: "Critical rate (qc)" },
            { az: "Su kəsiyi", en: "Water cut (WC %)" },
            { az: "Qaz-neft nisbəti", en: "Producing GOR" },
          ],
          formula: {
            expression: "qc = 0.0744 × k_h × (ρ_w-ρ_o) × h² / (μ_o × Bo × ln(re/rw))",
            legend: "qc — kritik hasilat | k_h — üfüqi keçiricilik | h — neft layı qalınlığı | μ_o — neft özlülüyü",
          },
          caseStudy:
            "🌍 Dünya nümunəsi: Şimali dənizin Statfjord yatağında water coning problem yaratmış, horizontal quyu texnologiyası tətbiq edilmişdir.",
        },
        {
          heading: "Rate Transient Analysis — RTA",
          body: "RTA hasilat tarixi məlumatlarından rezervuar parametrləri (k, skin, drenaj sahəsi) çıxarır. Blasingame, Agarwal-Gardner metodları tipik alətlərdir. Bu metodlar quyu testi aparmadan rezervuar xarakterizasiyasına imkan verir.",
          terms: [
            { az: "Hasilat keçici analizi", en: "Rate Transient Analysis (RTA)" },
            { az: "Blasingame qrafiki", en: "Blasingame plot" },
            { az: "Kumulyativ hasilat", en: "Cumulative production (Np)" },
            { az: "Drenaj sahəsi", en: "Drainage area" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: ABŞ-ın Bakken shale quyularında quyu testi bahalı olduğundan RTA dominantdır. k=0.001–0.1 mD, drainage area=50–150 acres hesablanmışdır.",
        },
      ],
      quiz: [
        {
          question: "Gas lift-in əsas prinsipi nədir?",
          options: [
            "Elektrik enerjisi ilə nefti qaldırmaq",
            "Sıxılmış qaz vurularaq neft sütununun sıxlığını azaltmaq",
            "Kimyəvi maddə vurularaq özlülüyü azaltmaq",
            "Su injeksiyası ilə rezervuar təzyiqini artırmaq",
          ],
          answer: 1,
          explanation: "Qaz vurularaq fluid qarışığının sıxlığı azalır → hydrostatic pressure azalır → quyu öz-özünə axmağa başlayır.",
        },
        {
          question: "Matrix acidizing-in əsas məqsədi nədir?",
          options: [
            "Süxuru çatlatmaq",
            "Quyu ətrafındakı formation damage-i (skin) azaltmaq",
            "Reservoir pressure artırmaq",
            "Scale çöküntüsünü yaratmaq",
          ],
          answer: 1,
          explanation: "Matrix acidizing formation pressure-dən aşağı təzyiqlə aparılır — çatlamır. HCl/HF məsaməni açır, skin azalır → hasilat artır.",
        },
        {
          question: "Su konu (water coning) nədir?",
          options: [
            "Quyunun sement problemləri",
            "OWC-nin hasilat quyusuna çəkilməsi — su kəsiyinin artması",
            "ESP motorunun xarab olması",
            "Reservoir pressure-nin artması",
          ],
          answer: 1,
          explanation: "Water coning — su zonası hasilatın yaratdığı aşağı təzyiq zonasına çəkilir. Həll: hasilat azaltmaq, horizontal quyu, ICD.",
        },
        {
          question: "RTA nəyi çıxarır?",
          options: [
            "Yalnız gələcək hasilatı",
            "Hasilat tarixçəsindən reservoir parametrlərini (k, skin, drainage area)",
            "Yalnız iqtisadi göstəriciləri",
            "Casing dizaynını",
          ],
          answer: 1,
          explanation: "RTA hasilat məlumatlarından (q, Pwf) reservoir parametrlərini çıxarır. DCA isə gələcək hasilatı proqnozlaşdırır.",
        },
      ],
    },

    ireli: {
      description: "İntelligent completions, multiphase flow, flow assurance, integrated optimisation.",
      sections: [
        {
          heading: "Intelligent Well Completions | İntellektual Quyu Tamamlanması",
          body: "İntellektual quyu — sensörlar və aktiv klapanlar vasitəsilə yüzey idarəetmə ilə real vaxt hasilat idarəetməsi aparılan sistemdir. ICV (Interval Control Valve) — hər zonanın hasilatını müstəqil idarə edir. ICD/AICD — axın nəzarəti, su/qaz girişini məhdudlaşdırır.",
          terms: [
            { az: "İntellektual quyu", en: "Intelligent/Smart well" },
            { az: "Zona nəzarət klapanı", en: "ICV (Interval Control Valve)" },
            { az: "Axın nəzarəti cihazı", en: "ICD/AICD (Inflow Control Device)" },
            { az: "Daimi monitorinq", en: "Permanent Downhole Monitoring (PDM)" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: Shell-in Saih Rawl yatağında (Oman) 20+ intelligent well quraşdırılmışdır. ICV-lar sayəsində water coning 40% azaldılmış, ultimate recovery 8% artırılmışdır.",
        },
        {
          heading: "Multiphase Flow in Pipes | Çoxfazalı Axın",
          body: "Hasilat sistemlərindəki borularda neft, qaz və su eyni anda axır. Axın rejimləri: bubble flow, slug flow, churn flow, annular flow (vertikal); stratified, slug (horizontal). Slug flow operasional problemlər yaradır. Multiphase correlations: Beggs-Brill, Hagedorn-Brown.",
          terms: [
            { az: "Çoxfazalı axın", en: "Multiphase flow" },
            { az: "Parça axını", en: "Slug flow" },
            { az: "Axın rejimi", en: "Flow regime" },
            { az: "Axın korrelyasiyası", en: "Flow correlation (Beggs-Brill etc.)" },
          ],
          formula: {
            expression: "dP/dL = dP/dL|gravity + dP/dL|friction + dP/dL|acceleration",
            legend: "Ümumi təzyiq itkisi = qravitasiya + sürtünmə + sürətlənmə komponentlərinin cəmi",
          },
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG platformalarındakı toplama boruları çoxfazalı axın şəraitindədir. PIPESIM modeli flowline dizaynı üçün istifadə edilmişdir.",
        },
        {
          heading: "Flow Assurance — Hydrates & Slugging",
          body: "Flow assurance — hasilat sistemlərinin tıxanma olmadan işləməsini təmin edən sahədir. Hidrat — qaz molekulları su ilə yüksək təzyiq + aşağı temperaturda kristal struktur yaradır; boru tıxanır. Qarşısı: MEG injection, heat tracing, inhibitor.",
          terms: [
            { az: "Axın təminatı", en: "Flow assurance" },
            { az: "Hidrat", en: "Hydrate (gas hydrate)" },
            { az: "MEG injeksiyası", en: "MEG (Monoethylene Glycol) injection" },
            { az: "İstilik örtüyü", en: "Heat tracing / Insulation" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: Norveçin Ormen Lange yatağında (820 m su dərinliyi, 1°C) hidrat riski maksimaldır. 120 km-lik umbilical vasitəsilə MEG daimi injeksiya olunur.",
        },
        {
          heading: "Production System Optimisation | Hasilat Sistemi Optimizasiyası",
          body: "Tam hasilat sistemi optimizasiyası rezervuar, quyu, flowline, separator, boru xəttlərini birgə modelləşdirir (IAM). Network model — çox quyu, çox platform, ortaq separator sistemlərini birgə analiz edir.",
          terms: [
            { az: "İnteqrasiya edilmiş aktiv modeli", en: "Integrated Asset Model (IAM)" },
            { az: "Şəbəkə modeli", en: "Network model" },
            { az: "Allokasiya", en: "Production allocation" },
            { az: "Darboğaz", en: "Bottleneck" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: BP-nin Atlantis yatağında IAM modeli 40+ quyunu, 3 platformanı birgə modelləşdirir. Sistem müəyyən etmişdir ki, separator gücü darboğazdır — əlavə qazıma deyil, separator kapasitesi sərfəlidir.",
        },
        {
          heading: "CCUS & Produced Water Management",
          body: "Produced water — neftlə birlikdə çıxan su, water cut artdıqca xərc artır. Treatment: flotation, hydrocyclone, membrane filtration. Re-injection — environmentally safe + pressure support. CCUS (Carbon Capture, Utilization & Storage) — CO₂-in tutulması, neft yataqlarına vurulması (EOR + carbon storage).",
          terms: [
            { az: "İstehsal suyu", en: "Produced water" },
            { az: "CO₂ tutma və saxlama", en: "CCUS" },
            { az: "Su yenidən injeksiyası", en: "Water re-injection (WRI)" },
            { az: "Su kəsiyi", en: "Water cut (WC %)" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: SOCAR-ın Abşeron yarımadasındakı quyularında su kəsiyi 60–90%-ə çatmışdır. Azərbaycan hökuməti 2030-a qədər 35% emissiya azalması hədəfini elan etmişdir.",
        },
      ],
      quiz: [
        {
          question: "ICD nə üçün istifadə olunur?",
          options: [
            "ESP motor gücünü artırmaq",
            "Uzun horizontal quyularda uniform axın profili yaratmaq",
            "Reservoir pressure ölçmək",
            "Casing zədəsini bağlamaq",
          ],
          answer: 1,
          explanation: "Uzun horizontal quyularda heel-toe effekti olur. ICD bu fərqi balanslaşdırır; AICD su/qaz girişini avtomatik məhdudlaşdırır.",
        },
        {
          question: "Hidrat əmələgəlməsi üçün hansı şərtlər lazımdır?",
          options: [
            "Yüksək temperatur + aşağı təzyiq",
            "Yüksək təzyiq + aşağı temperatur + qaz + su",
            "Yalnız aşağı temperatur kifayətdir",
            "Yüksək CO₂ konsentrasiyası",
          ],
          answer: 1,
          explanation: "Üç şərt eyni anda: yüksək təzyiq, aşağı temperatur, qaz+su. Dərin dəniz flowlines bütün bu şərtlərə malikdir.",
        },
        {
          question: "IAM nəyi modelləşdirir?",
          options: [
            "Yalnız rezervuarı",
            "Yalnız quyu içini",
            "Rezervuar + quyu + flowline + separator + boru xətti — tam sistemi",
            "Yalnız səth qurğularını",
          ],
          answer: 2,
          explanation: "IAM bütün sistemi birgə modelləşdirir. Darboğaz müəyyənliyi IAM-sız mümkün deyil.",
        },
        {
          question: "CCUS-un neft sənayesindəki əsas rolu nədir?",
          options: [
            "Yeni qazıma texnologiyası",
            "CO₂ tutulması, neft yataqlarına vurulması (EOR + carbon storage)",
            "Produced water treatment metodu",
            "Horizontal drilling texnikası",
          ],
          answer: 1,
          explanation: "CO₂ tutulur → neft yataqlarına vurulur (miscible EOR → hasilat artır) + yerin altında saxlanılır. İkili fayda: hasilat + emissiya azalması.",
        },
      ],
    },
  },
};
