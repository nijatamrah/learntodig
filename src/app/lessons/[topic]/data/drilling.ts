import type { Lesson } from "../types";

export const drillingLesson: Lesson = {
  title: "Drilling — Qazma",
  icon: "🔩",
  levels: {
    baslangic: {
      description: "Qazma prosesinin əsasları, avadanlıqlar və əsas parametrlər.",
      sections: [
        {
          heading: "Qazma nədir? | What is Drilling?",
          body: "Qazma — yeraltı neft və qaz yataqlarına çatmaq üçün gruntda quyu açma prosesidir. Müasir rotary qazıma sistemlərinin 3 əsas hissəsi var: drill bit (qazıma ucu) — süxuru kəsir; drill string (qazıma sütunu) — dönüş momentini ötürür; drilling rig (qazıma qurğusu) — bütün sistemi saxlayır.",
          terms: [
            { az: "Qazma", en: "Drilling" },
            { az: "Qazma ucu", en: "Drill bit" },
            { az: "Qazma sütunu", en: "Drill string" },
            { az: "Qazma qurğusu", en: "Drilling rig" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Xəzər dənizindəki Dərin Su Günəşli (DSG) layihəsində BP qazma dərinliyi 6,000–7,000 m-ə çatır. Chirag-1 və Central Azeri platformaları bu əməliyyatları aparır.",
        },
        {
          heading: "ROP — Qazma sürəti | Rate of Penetration",
          body: "ROP drill bit-in bir saat ərzində neçə metr qazıdığını göstərir. ROP nə qədər yüksək olsa, qazıma bir o qədər sürətli və ucuz olur. ROP-a 5 əsas amil təsir edir: WOB, RPM, bit növü, süxur sərtliyi, drilling fluid keyfiyyəti.",
          terms: [
            { az: "Qazma sürəti", en: "Rate of Penetration (ROP)" },
            { az: "Bit üzərindəki yük", en: "Weight on Bit (WOB)" },
            { az: "Dövr sayı", en: "Rotary Speed (RPM)" },
          ],
          formula: {
            expression: "ROP (m/hr) = Depth drilled (m) / Time (hr)",
            legend: "ROP — qazma sürəti | Depth drilled — qazılan məsafə | Time — sərf edilən vaxt",
          },
          example:
            "💡 Nümunə: 8 saata 120 m qazılmışdır.\nROP = 120 / 8 = 15 m/saat\nYaxşı sandstone-da ROP 20-50 m/saat; çətin süxurlarda 2-5 m/saat-a düşə bilər.",
          caseStudy:
            "🌍 Dünya nümunəsi: Norveçin Johan Castberg layihəsində PDC bit texnologiyasının tətbiqi ilə ROP 40% artırılmış, qazma müddəti əhəmiyyətli dərəcədə azaldılmışdır.",
        },
        {
          heading: "Drilling Fluid (Qazma məhlulu) | Mud",
          body: "Drilling fluid (mud) qazma prosesinin əsas elementidir. 4 əsas funksiyası: (1) Süxur kəsintilərini səthə qaldırmaq; (2) Quyu divarını stabilləşdirmək; (3) Drill bit-i soyutmaq; (4) Formation təzyiqini balanslaşdırmaq. Mud növləri: WBM (water-based), OBM (oil-based), SBM (synthetic-based).",
          terms: [
            { az: "Qazma məhlulu", en: "Drilling fluid / Mud" },
            { az: "Süxur kəsintisi", en: "Cuttings" },
            { az: "Sıxlıq", en: "Mud weight / Density (ppg)" },
            { az: "Özlülük", en: "Viscosity" },
          ],
          formula: {
            expression: "Hydrostatic Pressure (psi) = 0.052 × MW × Depth",
            legend: "MW — mud weight (ppg) | Depth — dərinlik (ft) | 0.052 — çevirmə əmsalı",
          },
          example:
            "💡 Nümunə: Mud weight = 10 ppg, dərinlik = 8000 ft.\nP = 0.052 × 10 × 8000 = 4160 psi\nBu formation təzyiqindən yüksək olduğuna görə quyu təhlükəsizdir.",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG yatağında qazma zamanı OBM (yağ əsaslı məhlul) istifadə edilir — Xəzər şəraitindəki yüksək temperatur və yüklü formasyonlarla mübarizə üçün ən uyğun seçimdir.",
        },
        {
          heading: "Qazma növləri | Types of Drilling",
          body: "Şaquli qazma (vertical) — ən sadə, düz aşağı. Maillik qazıma (directional) — müəyyən bucaqda yönəldilmişdir. Üfüqi qazıma (horizontal) — rezervuar lay boyunca, shale yataqları üçün vacib. Çoxşaxəli qazıma (multilateral) — bir quyudan bir neçə istiqamətdə qazıma.",
          terms: [
            { az: "Şaquli qazma", en: "Vertical drilling" },
            { az: "Yönəldilmiş qazma", en: "Directional drilling" },
            { az: "Üfüqi qazma", en: "Horizontal drilling" },
            { az: "Dəniz qazması", en: "Offshore drilling" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Neft Daşları platformasından (1949-dan) bir neçə istiqamətdə maillik quyular qazılmışdır — bir platformadan 30–40 quyu açmaq mümkün olmuşdur.",
        },
        {
          heading: "Qazma problemləri | Drilling Problems",
          body: "Ən çox rast gəlinən problemlər: Stuck pipe — drill string-in quyuda ilişməsi; Lost circulation — drilling fluid-in formation-a hopması; Blowout — nəzarətsiz formation axını (BOP ilə qarşısı alınır); Bit wear — bitin aşınması.",
          terms: [
            { az: "Borunun ilişməsi", en: "Stuck pipe" },
            { az: "Məhlul itkisi", en: "Lost circulation" },
            { az: "Nəzarətsiz fontanlama", en: "Blowout" },
            { az: "Fontanlamaqarşı avadanlıq", en: "Blowout Preventer (BOP)" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: Deepwater Horizon (2010) — BOP sistemi işləmədiyinə görə blowout baş verdi, 87 gün boyunca ~780 milyon litr neft Meksika körfəzinə axdı. Bu fəlakət dünyada offshore qazma qaydalarını kökündən dəyişdirdi.",
        },
      ],
      quiz: [
        {
          question: "6 saata 90 m qazılmışdır. ROP neçədir?",
          options: ["10 m/saat", "15 m/saat", "20 m/saat", "90 m/saat"],
          answer: 1,
          explanation: "ROP = 90 / 6 = 15 m/saat. Bu yumşaq–orta sərtlikdə süxur üçün normal dəyərdir.",
        },
        {
          question: "Drilling fluid-in əsas funksiyalarından biri deyil:",
          options: [
            "Süxur kəsintilərini səthə qaldırmaq",
            "Formation təzyiqini balanslaşdırmaq",
            "Neft hasilatını artırmaq",
            "Drill bit-i soyutmaq",
          ],
          answer: 2,
          explanation: "Neft hasilatı qazma tamamlandıqdan SONRA mərhələsidir. Drilling fluid-in vəzifəsi qazma prosesini dəstəkləməkdir.",
        },
        {
          question: "Mud weight = 12 ppg, dərinlik = 5000 ft. Hydrostatik təzyiq neçədir?",
          options: ["2600 psi", "3120 psi", "4160 psi", "6000 psi"],
          answer: 1,
          explanation: "P = 0.052 × 12 × 5000 = 3120 psi.",
        },
        {
          question: "Blowout-un qarşısını almaq üçün hansı avadanlıq istifadə olunur?",
          options: ["Drill bit", "BOP (Blowout Preventer)", "Mud pump", "Casing shoe"],
          answer: 1,
          explanation: "BOP — quyu ağzına quraşdırılmış kritik təhlükəsizlik avadanlığıdır. Nəzarətsiz axın zamanı quyunu bağlayır.",
        },
      ],
    },

    orta: {
      description: "Quyu dizaynı, casing proqramı, sement işləri və yönəldilmiş qazma.",
      sections: [
        {
          heading: "Quyu dizaynı — Casing proqramı | Well Design & Casing",
          body: "Casing — quyunun divarlarını möhkəmləndirən polad boru sistemidir. Tipik quyu dizaynı: Conductor casing (30–50 m), Surface casing (300–800 m), Intermediate casing (1000–3000 m), Production casing (tam dərinlik). Hər mərhələ quyunun diametrini azaldır — teleskopik sistem.",
          terms: [
            { az: "Örtük boru", en: "Casing" },
            { az: "Sement işləri", en: "Cementing" },
            { az: "Quyu başlığı", en: "Wellhead" },
            { az: "Paker", en: "Packer" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG yatağında 7000 m-lik dərin quyular 5 mərhələli casing proqramı ilə qazılır. Xəzərin HPHT şəraiti xüsusi chrome casing materiallarının istifadəsini tələb edir.",
        },
        {
          heading: "Pore Pressure & Fracture Gradient | PP & FG",
          body: "Qazma pəncərəsi mud weight-in iki məhdud arasında saxlanmasını tələb edir: aşağı limit — pore pressure (PP); yuxarı limit — fracture gradient (FG). Mud weight PP-dən aşağı olsa → kick/blowout; FG-dən yüksək olsa → lost circulation.",
          terms: [
            { az: "Məsamə təzyiqi", en: "Pore pressure (PP)" },
            { az: "Çatlama qradiyenti", en: "Fracture gradient (FG)" },
            { az: "Qazma pəncərəsi", en: "Drilling window" },
            { az: "Ekvivalent palçıq çəkisi", en: "EMW (Equivalent Mud Weight)" },
          ],
          formula: {
            expression: "EMW (ppg) = Pressure (psi) / (0.052 × Depth (ft))",
            legend: "EMW — equivalent mud weight | PP < EMW < FG şərti hər zaman ödənilməlidir",
          },
          example:
            "💡 Nümunə: 10,000 ft dərinlikdə PP = 5200 psi, FG = 7800 psi.\nPP_EMW = 5200/(0.052×10000) = 10.0 ppg\nFG_EMW = 7800/(0.052×10000) = 15.0 ppg\nOptimal mud weight: ~11.5 ppg.",
          caseStudy:
            "🌍 Dünya nümunəsi: Meksika körfəzinin dərin sularında çox dar qazma pəncərəsi (1-2 ppg fərq) mövcuddur. Bu şəraitdə MPD (Managed Pressure Drilling) texnologiyası tətbiq olunur.",
        },
        {
          heading: "Yönəldilmiş qazma | Directional Drilling",
          body: "MWD (Measurement While Drilling) — qazma zamanı real vaxtda quyu inklinasiyasını ölçür. LWD (Logging While Drilling) — eyni zamanda formation loqlarını toplayır. RSS (Rotary Steerable System) drill bit-i istiqamətləndirmək üçün istifadə olunur.",
          terms: [
            { az: "Maillik", en: "Inclination / Angle" },
            { az: "Azimut", en: "Azimuth" },
            { az: "Qazma zamanı ölçmə", en: "MWD (Measurement While Drilling)" },
            { az: "Fırlanan idarəetmə sistemi", en: "RSS (Rotary Steerable System)" },
          ],
          formula: {
            expression: "Horizontal reach (m) = MD × sin(inclination)",
            legend: "MD — measured depth | inclination — quyu maillik bucağı",
          },
          example:
            "💡 Nümunə: Quyu mailliyi 45°, MD = 2000 m.\nHR = 2000 × sin(45°) = 2000 × 0.707 = 1414 m\nQuyu dibi şaquli xəttdən 1414 m kənara çıxmışdır.",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG-nin Azeri platformasından yönəldilmiş quyular 5 km-dən çox horizontal reach ilə qazılmışdır. Bir platformadan geniş rezervuar sahəsini əhatə etməyə imkan verir.",
        },
        {
          heading: "Sement işləri | Cementing Operations",
          body: "Sement casing ilə quyu divarı arasındakı annular fəzanı doldurur. Sementin 4 vəzifəsi: (1) Zonal isolation; (2) Casing-i qorumaq; (3) Formation suyunun girməsinin qarşısını almaq; (4) Structural support. Primary cementing — casing qoyulduqdan sonra; Squeeze cementing — zəif sement zonaları üçün.",
          terms: [
            { az: "Sement", en: "Cement / Cement slurry" },
            { az: "Halqa fəzası", en: "Annulus" },
            { az: "Zona izolyasiyası", en: "Zonal isolation" },
            { az: "Sıxma sementi", en: "Squeeze cementing" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: Deepwater Horizon (2010) fəlakətinin əsas texniki səbəblərindən biri uğursuz sement işi idi. Production casing-in sement bütövlüyü pozulmuşdu — qazın yuxarı axmasına imkan vermişdi.",
        },
        {
          heading: "Qazma xərcləri — AFE | Authorization for Expenditure",
          body: "AFE — hər qazma əməliyyatı üçün əvvəlcədən hesablanan büdcə sənədidir. Əsas xərc kateqoriyaları: rig day rate (offshore $300K–700K/gün), casing & cement, drill bits, mud & chemicals. Non-productive time (NPT) — stuck pipe, weather kimi gecikmələr xərcləri artırır.",
          terms: [
            { az: "Gündəlik icarə haqqı", en: "Day rate" },
            { az: "Qeyri-məhsuldar vaxt", en: "Non-productive time (NPT)" },
            { az: "Büdcə sənədi", en: "AFE (Authorization for Expenditure)" },
            { az: "Balıqçılıq əməliyyatı", en: "Fishing operation" },
          ],
          formula: {
            expression: "Well cost = Σ(day rate × days) + Σ(material costs) + contingency (10–20%)",
            legend: "Contingency — gözlənilməz xərclər üçün ehtiyat",
          },
          example:
            "💡 Nümunə: Offshore quyu, 60 gün, day rate = $400K/gün.\nRig cost = 60 × $400K = $24M\nMaterials ≈ $8M\nContingency 15% = $4.8M\nÜmumi AFE ≈ $36.8M",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Xəzər dənizindəki dərin su qazma əməliyyatları üçün gündəlik xərclər $500K–$800K səviyyəsindədir.",
        },
      ],
      quiz: [
        {
          question: "10,000 ft dərinlikdə PP = 4680 psi, FG = 7800 psi. EMW pəncərəsi nədir?",
          options: ["9.0–15.0 ppg", "8.0–12.0 ppg", "10.0–18.0 ppg", "9.0–17.0 ppg"],
          answer: 0,
          explanation: "PP_EMW = 4680/(0.052×10000) = 9.0 ppg. FG_EMW = 7800/(0.052×10000) = 15.0 ppg. Pəncərə: 9.0–15.0 ppg.",
        },
        {
          question: "Quyu mailliyi 60°, MD = 3000 m. Horizontal reach neçədir?",
          options: ["1500 m", "2598 m", "3000 m", "1732 m"],
          answer: 1,
          explanation: "HR = 3000 × sin(60°) = 3000 × 0.866 = 2598 m.",
        },
        {
          question: "Casing-in sement işinin əsas məqsədi nədir?",
          options: [
            "Drill bit-i soyutmaq",
            "ROP-u artırmaq",
            "Zonal isolation — layları bir-birindən ayırmaq",
            "Mud weight-i artırmaq",
          ],
          answer: 2,
          explanation: "Sement birinci növbədə zonal isolation üçündür — müxtəlif formasyonları ayırır. Bu olmadan quyu kontaminasiyası baş verər.",
        },
        {
          question: "NPT (Non-Productive Time) nəyi ifadə edir?",
          options: [
            "Qazmanın optimal sürəti",
            "Stuck pipe, weather, nasazlıq kimi gecikmələrin vaxtı",
            "Formation log-larının oxunma müddəti",
            "Casing-in qoyulma vaxtı",
          ],
          answer: 1,
          explanation: "NPT qazma büdcəsinin ən böyük düşmənidir. Orta offshore NPT 15–25% təşkil edir.",
        },
      ],
    },

    ireli: {
      description: "HPHT qazma, Managed Pressure Drilling, Well control və qazma optimizasiyası.",
      sections: [
        {
          heading: "HPHT Qazma | High Pressure High Temperature Drilling",
          body: "HPHT şərtləri: P > 10,000 psi VƏ T > 150°C. Bu şəraitdə standart avadanlıqlar uğursuz ola bilər: elastomerlər parçalanır, kimyəvi maddələr pozulur. HPHT üçün xüsusi elastomerlər, metal-seal sistemlər və yüksək temperaturlu sement reseptləri tələb olunur.",
          terms: [
            { az: "Yüksək təzyiq-temperatur", en: "HPHT (High Pressure High Temperature)" },
            { az: "Metal sızdırmazlıq", en: "Metal-to-metal seal" },
            { az: "Elastomer", en: "Elastomer (O-ring, seal material)" },
            { az: "Quyu dibi temperaturu", en: "BHT (Bottom Hole Temperature)" },
          ],
          formula: {
            expression: "BHT = Surface temp + (Geothermal gradient × Depth)",
            legend: "BHT — quyu dibi temperaturu | Geothermal gradient — tipik 25–35°C/km",
          },
          example:
            "💡 Nümunə: Səth temp = 25°C, gradient = 32°C/km, dərinlik = 5 km.\nBHT = 25 + (32 × 5) = 185°C → HPHT şərtidir (>150°C).",
          caseStudy:
            "🌍 Dünya nümunəsi: Norveçin Åsgard sahəsindəki quyular 200°C+ BHT ilə HPHT şəraitindədir. Xüsusi SBM və high-temp cement blends tələb olunmuşdur.",
        },
        {
          heading: "Managed Pressure Drilling (MPD)",
          body: "MPD — annular təzyiqi dəqiq idarə edərək dar qazma pəncərəsini effektiv genişlədən texnologiyadır. RCD (Rotating Control Device) — quyu ağzını bağlayaraq dövrü sisteme çevirir. MPD üstünlükləri: NPT azalır, lost circulation azalır, kick-ların erkən aşkarlanması.",
          terms: [
            { az: "İdarəolunan təzyiq qazması", en: "Managed Pressure Drilling (MPD)" },
            { az: "Fırlanan nəzarət cihazı", en: "Rotating Control Device (RCD)" },
            { az: "Geri təzyiq", en: "Backpressure" },
            { az: "Qapalı dövr sistemi", en: "Closed-loop system" },
          ],
          formula: {
            expression: "BHP = ρ_mud × g × TVD + P_backpressure",
            legend: "BHP — bottom hole pressure | TVD — true vertical depth | P_back — səth backpressure",
          },
          caseStudy:
            "🌍 Dünya nümunəsi: Meksika körfəzinin ultra-dərin su quyularında MPD tətbiqi ilə 30+ NPT günü qənaət edilmiş, $15M+ büdcəyə qənaət edilmişdir.",
        },
        {
          heading: "Well Control — Kick & Blowout Prevention",
          body: "Kick — formation fluidinin quyuya daxil olması. Kick əlamətləri: hasilat artımı, mud pit səviyyəsinin yüksəlməsi, azalan mud weight. İlk cavab: quyunu BOP ilə bağlamaq. Kill metodları: Wait and weight, Driller's method.",
          terms: [
            { az: "Lay fluidinin girişi", en: "Kick" },
            { az: "Öldürmə ağırlığı", en: "Kill Weight Mud (KWM)" },
            { az: "Şüt metodu", en: "Driller's method" },
            { az: "Gözlə-ağırlaşdır metodu", en: "Wait & Weight method" },
          ],
          formula: {
            expression: "KWM (ppg) = OMW + (SIDPP / 0.052 / TVD)",
            legend: "KWM — kill weight mud | OMW — original mud weight | SIDPP — shut-in drill pipe pressure | TVD — true vertical depth (ft)",
          },
          example:
            "💡 Nümunə: OMW = 10 ppg, SIDPP = 520 psi, TVD = 10,000 ft.\nKWM = 10 + (520 / 0.052 / 10,000) = 10 + 1.0 = 11.0 ppg",
          caseStudy:
            "🌍 Dünya nümunəsi: Deepwater Horizon (2010) — BOP uğursuzluğu ilə birlikdə çoxsaylı barrier eyni vaxtda çökmüşdü. Bu hadisə offshore well control protokollarını tamamilə yenidən formalaşdırdı.",
        },
        {
          heading: "Qazma optimizasiyası — MSE | Mechanical Specific Energy",
          body: "MSE — bir kubik vahid süxurun qazılması üçün tələb olunan enerji. MSE nə qədər aşağı olsa, qazma bir o qədər effektivdir. MSE >> UCS (süxurun möhkəmliyi) olduqda enerji itkiləri var: bit wear, vibration, whirl.",
          terms: [
            { az: "Mexaniki xüsusi enerji", en: "Mechanical Specific Energy (MSE)" },
            { az: "Vahid sıxılma möhkəmliyi", en: "UCS (Unconfined Compressive Strength)" },
            { az: "Bit titrəməsi", en: "Bit vibration / Stick-slip" },
            { az: "Bit aşınması", en: "Bit wear / Bit dulling" },
          ],
          formula: {
            expression: "MSE = (WOB/A_bit) + (480 × RPM × T) / (ROP × A_bit)",
            legend: "MSE — psi | WOB — lbs | A_bit — bit sahəsi (inch²) | T — torque (ft-lbs) | ROP — ft/hr",
          },
          caseStudy:
            "🌍 Dünya nümunəsi: Shell-in Haynesville Shale layihəsində real vaxt MSE monitorinqi ROP-u 40% artırmış, qazma müddətini 20% azaltmışdır.",
        },
        {
          heading: "Torque & Drag Modelling | T&D",
          body: "Drill string uzun polad sütunudur — qravitasiya, sürtünmə, maillik kompleks mexaniki vəziyyət yaradır. Torque — döndərmə momenti; Drag — çəkmə/itələmə zamanı artıq sürtünmə qüvvəsi. T&D modelləri quyunun qazıla biləcəyini əvvəlcədən proqnozlaşdırır.",
          terms: [
            { az: "Çevrilmə momenti", en: "Torque (T)" },
            { az: "Sürtünmə qüvvəsi", en: "Drag" },
            { az: "Sürtünmə əmsalı", en: "Friction factor (μ)" },
            { az: "Effektiv çəki", en: "Hook load" },
          ],
          formula: {
            expression: "Pick-up = Buoyed weight + Drag\nSlack-off = Buoyed weight − Drag",
            legend: "Drag fərqi artdıqca stuck pipe riski yüksəlir. Tipik friction factor μ: 0.15–0.35",
          },
          example:
            "💡 Nümunə: Buoyed weight = 200,000 lbs, drag = 30,000 lbs.\nPick-up = 230,000 lbs | Slack-off = 170,000 lbs\nFərq 60,000 lbs → normal. >100,000 lbs → stuck pipe riski yüksəkdir.",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG-nin uzun horizontal quyularında T&D modelləşdirməsi qazılmadan əvvəl aparılır. Low-friction OBM formulyasiyaları Drag-i azaltmaq üçün tətbiq edilir.",
        },
      ],
      quiz: [
        {
          question: "Geothermal gradient 30°C/km, surface temp 20°C. 6 km-də BHT neçədir?",
          options: ["150°C", "180°C", "200°C", "220°C"],
          answer: 2,
          explanation: "BHT = 20 + (30 × 6) = 200°C. Açıq HPHT şərtidir (>150°C).",
        },
        {
          question: "OMW = 11 ppg, SIDPP = 572 psi, TVD = 11,000 ft. KWM neçədir?",
          options: ["12.0 ppg", "11.5 ppg", "12.5 ppg", "13.0 ppg"],
          answer: 0,
          explanation: "KWM = 11 + (572/0.052/11,000) = 11 + 1.0 = 12.0 ppg.",
        },
        {
          question: "MSE nəyi ölçür?",
          options: [
            "Quyunun dərinliyini",
            "Bir kubik vahid süxurun qazılması üçün tələb olunan enerji",
            "Drill bit-in çəkisini",
            "Formation təzyiqini",
          ],
          answer: 1,
          explanation: "Aşağı MSE = effektiv qazma. MSE artırsa — bit wear, vibrasiya və ya yanlış WOB/RPM kombinasiyası deməkdir.",
        },
        {
          question: "MPD-nin əsas üstünlüyü nədir?",
          options: [
            "ROP-u iki dəfə artırır",
            "Dar qazma pəncərəsini idarə edir, NPT azalır",
            "Casing xərclərini aradan qaldırır",
            "HPHT şəraitini aradan qaldırır",
          ],
          answer: 1,
          explanation: "MPD dar drilling window şəraitlərini idarə edir. Backpressure tənzimlənməsi ilə həm lost circulation, həm kick riski eyni anda azaldılır.",
        },
      ],
    },
  },
};
