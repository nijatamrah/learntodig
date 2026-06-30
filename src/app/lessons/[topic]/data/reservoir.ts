import type { Lesson } from "../types";

export const reservoirLesson: Lesson = {
  title: "Rezervuar Mühəndisliyi",
  icon: "🛢️",
  levels: {
    baslangic: {
      description: "Məsaməlilik, keçiricilik, doyma və OOIP əsasları.",
      sections: [
        {
          heading: "Rezervuar nədir? | What is a Reservoir?",
          body: "Rezervuar — neft və ya qazı saxlayan məsaməli və keçirici süxur layıdır. Yaxşı rezervuar üçün 3 şərt lazımdır: məsaməlilik (porosity) — nefti saxlamaq üçün boşluqlar; keçiricilik (permeability) — neftin axması üçün kanallar; doyma (saturation) — məsamələrin neft ilə dolu olma faizi.",
          terms: [
            { az: "Rezervuar", en: "Reservoir" },
            { az: "Məsaməlilik", en: "Porosity (φ)" },
            { az: "Keçiricilik", en: "Permeability (k)" },
            { az: "Doyma", en: "Saturation (S)" },
          ],
          formula: {
            expression: "φ = (V_pore / V_bulk) × 100%",
            legend: "φ — məsaməlilik | V_pore — məsamə həcmi | V_bulk — ümumi süxur həcmi",
          },
          example:
            "💡 Nümunə: 500 sm³ süxurun 90 sm³-i məsamədir.\nφ = (90/500) × 100% = 18% — yaxşı sandstone rezervuarı.",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG yatağının Balaxanı layında ortalama məsaməlilik ~20–25%, keçiricilik ~200–500 mD-dir — bunlar əla rezervuar xüsusiyyətləridir.",
        },
        {
          heading: "Keçiricilik — Darcy Qanunu | Permeability & Darcy's Law",
          body: "Keçiricilik süxurun maye ötürmə qabiliyyətidir, millidarcy (mD) vahidi ilə ölçülür. Yaxşı rezervuar: k > 100 mD; Orta: 10–100 mD; Aşağı: 1–10 mD; Tight: < 1 mD; Shale: < 0.001 mD.",
          terms: [
            { az: "Keçiricilik", en: "Permeability (k)" },
            { az: "Milidarcy", en: "millidarcy (mD)" },
            { az: "Özlülük", en: "Viscosity (μ)" },
            { az: "Darcy qanunu", en: "Darcy's Law" },
          ],
          formula: {
            expression: "Q = (k × A × ΔP) / (μ × L)",
            legend: "Q — axın sürəti (cm³/s) | k — keçiricilik (darcy) | A — kəsiş sahəsi (cm²) | ΔP — təzyiq fərqi (atm) | μ — özlülük (cp) | L — uzunluq (cm)",
          },
          example:
            "💡 Nümunə: k = 0.5 D, A = 10 cm², ΔP = 5 atm, μ = 2 cp, L = 20 cm.\nQ = (0.5 × 10 × 5) / (2 × 20) = 25/40 = 0.625 cm³/s",
          caseStudy:
            "🌍 Dünya nümunəsi: Ərəbistanın Ghawar yatağında keçiricilik 1000–5000 mD arasındadır — dünyanın ən keçirici rezervuarlarından. ~70 il hasilat sonrasında hələ də aktiv istismar davam edir.",
        },
        {
          heading: "Fluid Saturation | Doyma",
          body: "Rezervuardakı məsamələr neft (So), qaz (Sg) və su (Sw) ilə doludur. Bunların cəmi 1-ə (100%) bərabərdir. Irreducible water saturation (Swirr) — heç vaxt çıxarıla bilməyən minimal su. Residual oil saturation (Sor) — su sürüşməsindən sonra qalan neft.",
          terms: [
            { az: "Su doyması", en: "Water saturation (Sw)" },
            { az: "Neft doyması", en: "Oil saturation (So)" },
            { az: "Qaz doyması", en: "Gas saturation (Sg)" },
            { az: "Bağlı su doyması", en: "Irreducible water saturation (Swirr)" },
          ],
          formula: {
            expression: "Sw + So + Sg = 1.0\nSo = 1 - Sw - Sg",
            legend: "Tipik neft rezervuarı: Sw = 0.25, So = 0.75, Sg = 0",
          },
          example:
            "💡 Nümunə: Sw = 0.28, Sg = 0.05. So neçədir?\nSo = 1.0 - 0.28 - 0.05 = 0.67 → 67% neft doyması — əla!",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Məhsuldar Qatın yuxarı laylarında Sw ~0.20–0.30, So ~0.70–0.80-dir. Yüksək Su doymalı (Sw>0.5) zonalar bypass edilir.",
        },
        {
          heading: "OOIP Hesablaması | Original Oil In Place",
          body: "OOIP yataqda olan ümumi neft miqdarını ifadə edir — lakin hamısı çıxarıla bilməz. Recovery Factor (RF) adətən 20–50%-dir. EUR = OOIP × RF. RF artırmaq üçün EOR (Enhanced Oil Recovery) metodları: waterflooding, gas injection, chemical EOR.",
          terms: [
            { az: "Başlanğıc neft ehtiyatı", en: "OOIP / STOIIP" },
            { az: "Bərpa əmsalı", en: "Recovery Factor (RF)" },
            { az: "Çıxarıla bilən ehtiyat", en: "EUR (Estimated Ultimate Recovery)" },
            { az: "Neftin həcm faktoru", en: "Oil Formation Volume Factor (Bo)" },
          ],
          formula: {
            expression: "OOIP = (A × h × φ × So) / Bo × 7758",
            legend: "A — sahə (acres) | h — lay qalınlığı (ft) | φ — məsaməlilik | So — neft doyması | Bo — həcm faktoru | 7758 — acre-ft → barel",
          },
          example:
            "💡 Nümunə: A=500 ac, h=30 ft, φ=0.20, So=0.70, Bo=1.25.\nOOIP = (500×30×0.20×0.70)/1.25 × 7758\n= 1680 × 7758 ≈ 13M barel\nRF=30% → EUR ≈ 3.9M barel",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG yatağının OOIP ~5-6 mlrd barel, RF ~35–40% ilə EUR ~2 mlrd barel. 1994-dən bu günə ~1.2 mlrd barel çıxarılmışdır.",
        },
        {
          heading: "Rezervuar enerjisi | Drive Mechanisms",
          body: "Drive mechanism — nefti quyuya itələyən enerji mənbəyi. Əsas mexanizmlər: (1) Solution gas drive (~10–20% RF); (2) Gas cap drive (~20–30% RF); (3) Water drive (~30–50% RF); (4) Gravity drainage. Kombinasiya drive ən yüksək RF verir.",
          terms: [
            { az: "Sürüşmə mexanizmi", en: "Drive mechanism" },
            { az: "Həll olmuş qaz sürüşməsi", en: "Solution gas drive" },
            { az: "Qaz papağı sürüşməsi", en: "Gas cap drive" },
            { az: "Su sürüşməsi", en: "Water drive / Waterflooding" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG yatağında ilkin mərhələdə solution gas drive aktivdir. BP-nin waterflooding proqramı (su injeksiyası) 1997-dən tətbiq edilir — RF-i əhəmiyyətli dərəcədə artırır.",
        },
      ],
      quiz: [
        {
          question: "500 sm³ nümunənin 80 sm³-i məsamədir. Məsaməlilik neçədir?",
          options: ["8%", "16%", "80%", "420%"],
          answer: 1,
          explanation: "φ = (80/500) × 100% = 16%.",
        },
        {
          question: "k=200 mD=0.2 D, A=5 cm², ΔP=4 atm, μ=1 cp, L=10 cm. Q neçədir?",
          options: ["0.2 cm³/s", "0.4 cm³/s", "4.0 cm³/s", "2.0 cm³/s"],
          answer: 1,
          explanation: "Q = (0.2×5×4)/(1×10) = 4/10 = 0.4 cm³/s.",
        },
        {
          question: "Sw = 0.30, Sg = 0.10. So neçədir?",
          options: ["0.40", "0.60", "0.70", "0.80"],
          answer: 1,
          explanation: "So = 1.0 - 0.30 - 0.10 = 0.60.",
        },
        {
          question: "Hansı drive mexanizmi ən yüksək Recovery Factor verir?",
          options: ["Solution gas drive (~15%)", "Gas cap drive (~25%)", "Water drive (~35–50%)", "Hamısı eynidir"],
          answer: 2,
          explanation: "Water drive (həm təbii, həm süni waterflooding) ən yüksək RF verir. Suyun nefti müntəzəm sıxışdırması daha effektiv axın rejimi yaradır.",
        },
      ],
    },

    orta: {
      description: "Material balance, pressure analysis, EOR metodları.",
      sections: [
        {
          heading: "Material Balance Tənliyi | MBE",
          body: "MBE rezervuarın enerji tarazlığını ifadə edir: çıxarılan = genişlənmə + daxil olan. MBE vasitəsilə OOIP, drive mechanism növü və enerji tükənmə tempi müəyyən edilir. Havlena-Odeh üsulu MBE-ni xətti formada göstərərək OOIP-i qrafik üsulla müəyyən etməyə imkan verir.",
          terms: [
            { az: "Kütlə balansı tənliyi", en: "Material Balance Equation (MBE)" },
            { az: "Kumulyativ hasilat", en: "Cumulative production (Np)" },
            { az: "Ortalama reservoir təzyiqi", en: "Average reservoir pressure (P̄)" },
            { az: "Aquifer girişi", en: "Aquifer influx (We)" },
          ],
          formula: {
            expression: "Np × Bo = N × (Bo - Boi) + We",
            legend: "Np — kumulyativ hasilat | N — OOIP | Bo/Boi — hazırkı/ilkin həcm faktoru | We — aquifer influx",
          },
          caseStudy:
            "🌍 Dünya nümunəsi: Prudhoe Bay (Alaska) MBE analizi gas cap-in əvvəlki düşünüldüyündən böyük olduğunu göstərmiş — bu kəşf hasilat strategiyasını dəyişdirmişdir.",
        },
        {
          heading: "Pressure Transient Analysis — PTA",
          body: "PTA quyu testlərindən (DST, buildup, drawdown) alınan təzyiq-vaxt məlumatlarını analiz edərək k, skin, rezervuar sərhədlərini müəyyən edir. Skin factor (S) — quyu ətrafındakı zədənin ölçüsü: S>0 zədələnmə, S<0 stimulyasiya.",
          terms: [
            { az: "Quyu testi", en: "Well test / DST" },
            { az: "Dəri faktoru", en: "Skin factor (S)" },
            { az: "Horner qrafiki", en: "Horner plot" },
            { az: "Bərpa testi", en: "Pressure buildup test" },
          ],
          formula: {
            expression: "k = 162.6 × q × μ × Bo / (m × h)",
            legend: "k — keçiricilik (mD) | q — hasilat (STB/day) | m — Horner slope (psi/cycle) | h — lay qalınlığı (ft)",
          },
          example:
            "💡 Nümunə: q=500 STB/d, μ=1.2 cp, Bo=1.3, m=50 psi/cycle, h=20 ft.\nk = 162.6×500×1.2×1.3/(50×20) ≈ 253 mD — yaxşı keçiricilikdir.",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: BP ACG quyularında hər 3-5 ildə pressure buildup testləri aparır. Bu testlər rezervuar təzyiqinin düşmə sürətini izləyir.",
        },
        {
          heading: "Capillary Pressure & Relative Permeability",
          body: "Kapillyar təzyiq (Pc) dar məsamələrdə neft-su interfeys gərginliyindən yaranır. Nisbi keçiricilik (kr) — çoxfazalı axında hər fazanın keçiriciliyi mütləq keçiricliyə nisbəti. kr_o + kr_w < 1. Bu məlumatlar simulator modellərinə daxil edilir.",
          terms: [
            { az: "Kapillyar təzyiq", en: "Capillary pressure (Pc)" },
            { az: "Nisbi keçiricilik", en: "Relative permeability (kr)" },
            { az: "Wettability", en: "Wettability" },
            { az: "İnterfeys gərginliyi", en: "Interfacial tension (IFT)" },
          ],
          formula: {
            expression: "Pc = 2 × γ × cos(θ) / r",
            legend: "Pc — kapillyar təzyiq | γ — interfeys gərginliyi | θ — kontakt bucağı | r — məsamə radiusu",
          },
          caseStudy:
            "🌍 Dünya nümunəsi: Karbonatlı rezervuarlarda wettability dəyişikliyi (oil-wet → water-wet) surfactant injection vasitəsilə aparılaraq kapillyar tutulmuş neftin çıxarılması mümkün olmuşdur.",
        },
        {
          heading: "EOR Metodları | Enhanced Oil Recovery",
          body: "EOR — adi metodlarla çıxarıla bilməyən nefti qoparmaq üçün əlavə enerji/kimyəvi maddə tətbiqidir. Termal EOR: steam injection, SAGD. Chemical EOR: polymer flooding, surfactant, alkaline. Gas EOR: CO₂ injection, nitrogen. Hər metodun texniki-iqtisadi qiymətləndirilməsi tələb olunur.",
          terms: [
            { az: "Artırılmış hasilat metodu", en: "EOR (Enhanced Oil Recovery)" },
            { az: "Buxar injeksiyası", en: "Steam injection / SAGD" },
            { az: "Polimer doldurması", en: "Polymer flooding" },
            { az: "CO₂ injeksiyası", en: "CO₂ injection / Miscible flooding" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: SOCAR-ın Balaxanı yatağında pilot polymer flooding testi aparılmışdır. Polymer-ün neft geri qaytarma əmsalını 5–10% artırdığı göstərilmişdir.",
        },
        {
          heading: "Reservoir Simulation — Eclipse & CMG",
          body: "Rezervuar simulyatoru — rezervuarın riyazi modelidir. Süxur xüsusiyyətləri, fluid xüsusiyyətləri (PVT), quyu məlumatları daxil edilir; gələcək hasilat proqnozlaşdırılır. Əsas proqramlar: Eclipse (SLB), CMG IMEX, tNavigator. History matching — tarixi hasilat məlumatlarına modeli uyğunlaşdırmaq.",
          terms: [
            { az: "Rezervuar simulyatoru", en: "Reservoir simulator" },
            { az: "Tarixin uyğunlaşdırılması", en: "History matching" },
            { az: "PVT məlumatı", en: "PVT data (Pressure-Volume-Temperature)" },
            { az: "Şəbəkə modeli", en: "Grid model" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: ACG yatağının full-field Eclipse modeli 2 milyon+ şəbəkə hüceyrəsindən ibarətdir. BP bu modeli hər il yeniləyir — gələcək 10–20 illik hasilat proqnozu həmin model əsasında verilir.",
        },
      ],
      quiz: [
        {
          question: "Material balance tənliyinin əsas məqsədi nədir?",
          options: [
            "ROP hesablamaq",
            "OOIP və drive mechanism-i müstəqil müəyyən etmək",
            "Casing dizaynı aparmaq",
            "Seysmik məlumat işləmək",
          ],
          answer: 1,
          explanation: "MBE hasilat tarixçəsi və təzyiq məlumatları əsasında OOIP-i müstəqil hesablayır — volumetrik metodla müstəqil yoxlama aparır.",
        },
        {
          question: "Skin factor S = +15 nəyi göstərir?",
          options: [
            "Quyu ətrafında hidravlik çat var",
            "Quyu ətrafında zədələnmə (damage) — keçiricilik azalmışdır",
            "Quyu optimaldir",
            "Rezervuar təzyiqi yüksəkdir",
          ],
          answer: 1,
          explanation: "S > 0 → formation damage. S < 0 → stimulyasiya (fracture, acidizing). S = 0 → ideal quyu.",
        },
        {
          question: "Polymer flooding EOR metodunun əsas mexanizmi nədir?",
          options: [
            "Neftin özlülüyünü artırmaq",
            "Su/neft mobilliyini tənzimləyərək sweep efficiency artırmaq",
            "Reservoir təzyiqini azaltmaq",
            "CO₂ ilə nefti qarışdırmaq",
          ],
          answer: 1,
          explanation: "Polymer suyun özlülüyünü artırır → mobility ratio azalır → su daha uniform irəliləyir → sweep efficiency artır → daha çox neft.",
        },
        {
          question: "Pc formulunda (Pc = 2γcosθ/r) r azaldıqda Pc necə dəyişir?",
          options: ["Azalır", "Artır", "Sabit qalır", "Sıfıra bərabər olur"],
          answer: 1,
          explanation: "r azaldıqca Pc artır (mütərs münasibət). Kiçik məsaməli süxurlarda kapillyar tutulmuş neft çıxarmaq çox çətindir.",
        },
      ],
    },

    ireli: {
      description: "Stochastic modelling, aquifer analizi, qeyri-müəyyənlik və inkişaf planlaması.",
      sections: [
        {
          heading: "Stochastic Reservoir Modelling",
          body: "Deterministic model — bir ən yaxşı model. Stochastic model — eyni məlumatdan yüzlərlə bərabər ehtimallı model yaradır. Geostatistik metodlar (kriging, sequential Gaussian simulation) məsaməlilik və keçiricilik paylanmasını modelləşdirir. P10/P50/P90 ehtiyat qiymətləri stochastic modelləşdirmənin çıxışıdır.",
          terms: [
            { az: "Deterministik model", en: "Deterministic model" },
            { az: "Stokastik model", en: "Stochastic model" },
            { az: "Kriginq", en: "Kriging (geostatistical interpolation)" },
            { az: "Variogram", en: "Variogram (spatial correlation)" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: Equinor-un Johan Sverdrup yatağında 1000+ stochastic realizasiya yaradılmış, P10–P50–P90 OOIP fərqi 40% olmuşdur.",
        },
        {
          heading: "Aquifer Modelling — Fetkovich & Carter-Tracy",
          body: "Aquifer (su qanadı) rezervuara enerji verən ən güclü təbii sürücüdür. Fetkovich pseudo-steady state modeli kumulyativ su girişini analitik hesablayır. Carter-Tracy modeli unsteady-state şəraitlər üçün daha dəqiqdir.",
          terms: [
            { az: "Su qanadı", en: "Aquifer" },
            { az: "Su girişi", en: "Water influx (We)" },
            { az: "Aquifer məhsuldarlığı", en: "Aquifer productivity index (J)" },
            { az: "Qeyri-stasionar axın", en: "Unsteady-state flow" },
          ],
          formula: {
            expression: "We = f × Uaq × Σ[ΔP × Q(tD)]",
            legend: "We — kumulyativ su girişi | f — encroachment angle | Uaq — aquifer constant | Q(tD) — dimensionless influx",
          },
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Xəzər dənizindəki bəzi strukturlarda güclü aktif aquifer natural water drive-ı təmin edir. Həddindən artıq su girişi production su kəsiyini artıraraq əməliyyat xərclərini yüksəldir.",
        },
        {
          heading: "Monte Carlo — Uncertainty Analysis",
          body: "Rezervuar parametrləri (φ, k, h, RF) heç vaxt dəqiq bilinmir. Monte Carlo simulyasiyası bu parametrləri minlərlə kombinasiyada sınayaraq OOIP və EUR paylanmasını verir. P90 (proven/1P), P50 (probable/2P), P10 (possible/3P) — SPE PRMS standartı.",
          terms: [
            { az: "Monte Karlo simulyasiyası", en: "Monte Carlo simulation" },
            { az: "Ehtimal paylanması", en: "Probability distribution" },
            { az: "Ehtiyat kateqoriyaları", en: "P10/P50/P90 reserves" },
            { az: "Neft ehtiyatları standartı", en: "SPE PRMS" },
          ],
          formula: {
            expression: "EUR_P50 = OOIP_P50 × RF_P50",
            legend: "P90 — proven (1P) | P50 — probable (2P) | P10 — possible (3P)",
          },
          example:
            "💡 Nümunə:\nOOIP P90=80, P50=120, P10=200 MMbbl\nRF P90=25%, P50=32%, P10=42%\nEUR P50 = 120 × 0.32 = 38.4 MMbbl\nEUR P10 = 200 × 0.42 = 84 MMbbl",
          caseStudy:
            "🌍 Dünya nümunəsi: SPE-PRMS standartına görə bütün ictimai şirkətlər (BP, Shell, SOCAR) ehtiyatlarını P90/P50/P10 kateqoriyalarında raporlaşdırmalıdır.",
        },
        {
          heading: "Field Development Planning — FDP",
          body: "FDP — yatağın necə istismar ediləcəyini müəyyən edən strateji sənəddir. Əsas qərarlar: quyu sayı, yeri, növü; platform yerləşməsi; hasilat ssenariləri; CAPEX/OPEX; iqtisadi qiymətləndirmə (NPV, IRR). Integrated asset modelling — rezervuar + quyu + səth qurğularının birgə modelləşdirilməsi.",
          terms: [
            { az: "Sahənin inkişaf planı", en: "Field Development Plan (FDP)" },
            { az: "Xalis indiki dəyər", en: "NPV (Net Present Value)" },
            { az: "Daxili gəlirlilik norması", en: "IRR (Internal Rate of Return)" },
            { az: "İnteqrasiya edilmiş model", en: "Integrated Asset Model (IAM)" },
          ],
          formula: {
            expression: "NPV = Σ [CF_t / (1 + r)^t] - CAPEX",
            legend: "CF_t — t ilindəki pul axını | r — diskont dərəcəsi | t — il | CAPEX — kapital xərci",
          },
          example:
            "💡 Nümunə: r=10%, CAPEX=$50M.\nYıl 1: $20M → PV=$18.2M | Yıl 2: $35M → PV=$28.9M | Yıl 3: $30M → PV=$22.5M\nNPV = $69.6M - $50M = $19.6M > 0 → layihə qəbul edilə bilər.",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG Phase 3 (DSG) inkişaf planı 2016-da təsdiqlənmiş, ~$6 mlrd CAPEX ilə 100,000 b/gün əlavə hasilat nəzərdə tutulmuşdur.",
        },
        {
          heading: "Compositional Simulation | Kompozisiya Simulyasiyası",
          body: "Black oil simulyatoru sadəcə 3 komponent (neft, su, qaz) modelləşdirir. Kompozisiya simulyatoru hər karbohidrat komponentini (C1–C6+) ayrıca izləyir. EOR prosesləri (CO₂ injection, gas condensate, miscible flooding) üçün vacibdir. CMG GEM, Eclipse Compositional bu kateqoriyaya aiddir.",
          terms: [
            { az: "Qara yağ modeli", en: "Black oil model" },
            { az: "Kompozisiya modeli", en: "Compositional model" },
            { az: "Faza diaqramı", en: "Phase diagram (P-T diagram)" },
            { az: "Şeh nöqtəsi", en: "Dew point" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: Türkmənistanın Galkynysh qaz kondensat yatağı (~26 tcf) yüksək H₂S (15%) ehtiva edir. Kompozisiya simulyatoru H₂S-ın faza davranışını modelləşdirmək üçün tətbiq edilmişdir.",
        },
      ],
      quiz: [
        {
          question: "Monte Carlo-da P90 nəyi ifadə edir?",
          options: [
            "Mümkün ən yüksək dəyər",
            "90% ehtimalla aşılacaq minimum dəyər (proven reserves)",
            "Orta dəyər",
            "Mümkün ən aşağı dəyər",
          ],
          answer: 1,
          explanation: "P90 — 90% ehtimalla bu dəyərdən ÇOX neft çıxarılacaq. Ən konservativ (proven/1P) qiymətdir.",
        },
        {
          question: "NPV = $50M, CAPEX = $30M. Layihə haqqında nə deyə bilərik?",
          options: [
            "Layihə qəbul edilməlidir — NPV > 0",
            "NPV hesablaması yanlışdır",
            "Layihə zərərlidir",
            "Daha çox məlumat lazımdır",
          ],
          answer: 0,
          explanation: "NPV > 0 → layihə qəbul meyarıdır. Diskontlaşdırılmış pul axınları CAPEX-i üstəlayır.",
        },
        {
          question: "Kompozisiya simulyatoru nə üçün istifadə olunur?",
          options: [
            "Daha sürətli hesablamaq üçün",
            "CO₂ injection, gas condensate kimi proseslər — hər komponentin faza davranışı önəmlidir",
            "Daha ucuz lisenziyası var",
            "History matching üçün daha uyğundur",
          ],
          answer: 1,
          explanation: "Black oil modeli sadədir. Kompozisiya modeli C1-dən C6+-ə hər komponenti izləyir — EOR və kondensat yataqlarında mütləq lazımdır.",
        },
        {
          question: "Variogram nə üçün istifadə olunur?",
          options: [
            "Quyu loqlarını oxumaq",
            "Məkan korrelyasiyasını modelləşdirmək — kriging üçün əsas",
            "Reservoir pressure izləmək",
            "OOIP hesablamaq",
          ],
          answer: 1,
          explanation: "Variogram iki nöqtə arasındakı məsafəyə görə parametrlərin korrelyasiyasını göstərir. Kriging interpolyasiyası bu məlumatdan istifadə edərək quyular arasındakı parametrləri təxmin edir.",
        },
      ],
    },
  },
};
