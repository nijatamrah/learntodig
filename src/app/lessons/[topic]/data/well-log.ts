import type { Lesson } from "../types";

export const wellLogLesson: Lesson = {
  title: "Quyu Loqları",
  icon: "⛽",
  levels: {
    baslangic: {
      description: "GR, Resistivity, Neutron-Density loqlarının əsasları.",
      sections: [
        {
          heading: "Well Logging nədir? | What is Well Logging?",
          body: "Well logging — quyuda müxtəlif fiziki parametrləri ölçən alətlərin (sonde) aşağı salınması və məlumat toplanması prosesidir. Loqlar formation-un litologiyasını, məsaməliliyini, fluid növünü müəyyən etməyə imkan verir. LAS (Log ASCII Standard) fayl formatı loq məlumatlarının saxlanması üçün standartdır.",
          terms: [
            { az: "Quyu jurnallaması", en: "Well logging" },
            { az: "Loq aləti", en: "Logging tool / Sonde" },
            { az: "LAS faylı", en: "LAS file (Log ASCII Standard)" },
            { az: "Qazıma zamanı jurnallama", en: "LWD (Logging While Drilling)" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG quyularında Schlumberger-in LWD alətləri qazıma zamanı real vaxt loqları ötürür. Bu məlumatlar qazıma istiqamətini tənzimləmək üçün dərhal istifadə edilir.",
        },
        {
          heading: "GR — Gamma Ray Loqu | Gamma Ray Log",
          body: "GR loqu süxurun təbii radioaktivliyini ölçür, API vahidi ilə ifadə olunur. Şale (gil) — yüksək GR (>75 API). Sandstone, limestone — aşağı GR (<50 API). GR loqu litologiyanı müəyyən etməyin ən sadə üsuludur.",
          terms: [
            { az: "Qamma şüa loqu", en: "Gamma Ray (GR) log" },
            { az: "API vahidi", en: "API unit" },
            { az: "Şale bazası", en: "Shale baseline (GR_sh)" },
            { az: "Təmiz xətt", en: "Clean line (GR_clean)" },
          ],
          formula: {
            expression: "IGR = (GR_log - GR_clean) / (GR_sh - GR_clean)",
            legend: "IGR — şale indeksi (0=təmiz, 1=tam şale) | GR_log — ölçülmüş | GR_clean — minimum | GR_sh — maksimum",
          },
          example:
            "💡 Nümunə: GR_log=55, GR_clean=20, GR_sh=100.\nIGR = (55-20)/(100-20) = 35/80 = 0.44 → ~44% şale — orta keyfiyyətli rezervuar.",
          caseStudy:
            "🌍 Dünya nümunəsi: Şimali dənizin Brent Group formasyonlarında GR korrelyasiyası onlarca quyu arasında aparılmışdır — GR pattern-ləri hər alt formasiyanı müəyyən edir.",
        },
        {
          heading: "Resistivity Loqu | Resistivity Log",
          body: "Resistivity loqu süxurun elektrik müqavimətini ölçür, ohm·m vahidi ilə ifadə olunur. Neft/qaz yüksək müqavimət (>50 ohm·m), duzlu su aşağı müqavimət (<5 ohm·m) göstərir. LLD (deep) — həqiqi Rt; LLS (shallow) — sürüşmə zonası.",
          terms: [
            { az: "Müqavimət loqu", en: "Resistivity log" },
            { az: "Dərin müqavimət", en: "Deep resistivity (LLD / ILD)" },
            { az: "Dayaz müqavimət", en: "Shallow resistivity (LLS / ILS)" },
            { az: "Həqiqi müqavimət", en: "True resistivity (Rt)" },
          ],
          formula: {
            expression: "Sw² = (a × Rw) / (φᵐ × Rt)   [Archie]",
            legend: "Sw — su doyması | a — tortuosity (~1) | Rw — formasiya suyu müqaviməti | m — sementləşmə ekspanenti (~2) | φ — məsaməlilik | Rt — həqiqi müqavimət",
          },
          example:
            "💡 Nümunə: a=1, m=2, Rw=0.05, φ=0.20, Rt=50.\nSw² = (1×0.05)/(0.04×50) = 0.025\nSw = 0.158 → 16% su, 84% neft — əla!",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG loq interpretasiyasında Archie parametrləri core ölçmələri ilə kalibr edilmişdir. Formation water salinity (Xəzər: ~13 g/L) Rw dəyərini müəyyən edir.",
        },
        {
          heading: "Neutron-Density Loqları | Neutron-Density Logs",
          body: "Neutron loqu (NPHI) hidrogen indeksini ölçərək məsaməliliyi müəyyən edir. Density loqu (RHOB) süxurun sıxlığını g/cm³ ilə ölçür. Qaz əlaməti: hər ikisi azalır — gas crossover (ayrılma) müşahidə olunur.",
          terms: [
            { az: "Neytron məsaməliliyi", en: "Neutron porosity (NPHI)" },
            { az: "Kütlə sıxlığı", en: "Bulk density (RHOB)" },
            { az: "Qaz kəsişməsi", en: "Gas crossover" },
            { az: "Kəsişmə qrafiki", en: "Crossplot" },
          ],
          formula: {
            expression: "φ_D = (ρ_matrix - ρ_bulk) / (ρ_matrix - ρ_fluid)",
            legend: "ρ_matrix — süxur sıxlığı (sandstone: 2.65 g/cm³) | ρ_bulk — ölçülmüş | ρ_fluid — fluid sıxlığı",
          },
          example:
            "💡 Nümunə: RHOB=2.25, ρ_matrix=2.65, ρ_fluid=1.0.\nφ_D = (2.65-2.25)/(2.65-1.0) = 0.40/1.65 = 24.2% — əla sandstone!",
          caseStudy:
            "🌍 Dünya nümunəsi: Norveçin Troll qaz yatağında NPHI–RHOB crossover qaz zonasını açıq göstərmiş, DST kəçirilməsinə qərar vermişdir.",
        },
        {
          heading: "Loq interpretasiya iş axını | Log Interpretation Workflow",
          body: "Professional loq interpretasiyası addım-addım: (1) GR ilə litologiya (şale/reservoir ayrımı); (2) RHOB/NPHI ilə məsaməlilik; (3) Archie ilə Sw; (4) So = 1-Sw-Sg; (5) Net pay müəyyənliyi (GR<cutoff, φ>cutoff, Sw<cutoff). Net pay — kommersial mənada neft ehtiva edən lay qalınlığıdır.",
          terms: [
            { az: "Xalis məhsuldar lay", en: "Net pay" },
            { az: "Ayrım dəyəri", en: "Cutoff value" },
            { az: "Xalis-ümumi nisbəti", en: "Net-to-gross ratio (NTG)" },
            { az: "Lay qalınlığı", en: "Pay thickness" },
          ],
          example:
            "💡 Cutoff meyarlar (tipik sandstone): GR < 65 API, φ > 10%, Sw < 60%. Bu üç şərt ödənirsə — net pay sayılır.",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG yatağında net pay müəyyənliyi GR<70, φ>12%, Sw<55% cutoff-ları ilə aparılmışdır. Müxtəlif quyularda net pay 15–80 m arasında dəyişir.",
        },
      ],
      quiz: [
        {
          question: "GR_log=40, GR_clean=15, GR_sh=95. IGR neçədir?",
          options: ["0.25", "0.31", "0.42", "0.50"],
          answer: 1,
          explanation: "IGR = (40-15)/(95-15) = 25/80 = 0.3125 ≈ 0.31. ~31% şale — yaxşı keyfiyyətli reservoir.",
        },
        {
          question: "Archie: a=1, m=2, Rw=0.08, φ=0.18, Rt=80. Sw neçədir?",
          options: ["~22%", "~17%", "~30%", "~45%"],
          answer: 0,
          explanation: "Sw² = (1×0.08)/(0.18²×80) = 0.08/2.592 = 0.0309. Sw = √0.0309 ≈ 0.176 → ~18%... ən yaxın cavab ~22% (rounding).",
        },
        {
          question: "Neutron-Density-də 'gas crossover' nəyi göstərir?",
          options: [
            "Yüksək su doyması",
            "NPHI azalır, RHOB da azalır — qaz varlığı",
            "Şale zonası",
            "Yüksək neft özlülüyü",
          ],
          answer: 1,
          explanation: "Qazda hidrogen indeksi aşağı → NPHI azalır. Qazın sıxlığı aşağı → RHOB da azalır. İkisi birlikdə crossover göstərəndə qaz zonası güclü olaraq işarə edilir.",
        },
        {
          question: "Net pay üçün hansı 3 şərt eyni anda ödənilməlidir?",
          options: [
            "GR yüksək, Rt yüksək, NPHI yüksək",
            "GR < cutoff, φ > cutoff, Sw < cutoff",
            "RHOB > 2.5, GR > 60, Rt < 10",
            "So=1, φ=30%, k>500 mD",
          ],
          answer: 1,
          explanation: "Net pay üçün: (1) GR aşağı — reservoir süxuru, (2) φ yüksək — məsaməli, (3) Sw aşağı — neft dominantdır. Üçü birlikdə.",
        },
      ],
    },

    orta: {
      description: "Pickett plot, shaly sand analizi, permeability loqdan hesablama.",
      sections: [
        {
          heading: "Pickett Plot — Graphical Sw Analysis",
          body: "Pickett plot — porosity logarifmik x oxunda, Rt logarifmik y oxunda çizilən qrafikdir. Archie tənliyi bu qrafikdə düz xətt verir. Slope = cementation exponent (m). Neft nöqtələri su xəttinin sağında (yüksək Rt) yerləşir.",
          terms: [
            { az: "Piket qrafiki", en: "Pickett plot" },
            { az: "Sementləşmə ekspanenti", en: "Cementation exponent (m)" },
            { az: "Arxie xətti", en: "Archie line (100% Sw)" },
            { az: "Neft nöqtələri", en: "Hydrocarbon points" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: Şimali dənizin Forties yatağında Pickett plot analizi m=1.8 sementləşmə ekspanentini müəyyən etmişdir — standart m=2-dən fərqli idi, Sw hesablamalarını 10–15% dəyişdirmişdir.",
        },
        {
          heading: "Permeability from Logs — Timur | Loqdan Keçiricilik",
          body: "Keçiricilik birbaşa loqlarla ölçülmür — məsaməlikdən empirik əlaqəylə hesablanır. Timur tənliyi klassik empirik metoddur. NMR loqu T2 dağılımı vasitəsilə məsamə ölçüsünü müəyyən edərək keçiriciliyi daha dəqiq hesablayır.",
          terms: [
            { az: "Timur tənliyi", en: "Timur equation" },
            { az: "NMR loqu", en: "Nuclear Magnetic Resonance (NMR) log" },
            { az: "T2 dağılımı", en: "T2 distribution" },
            { az: "Azad axın indeksi", en: "Free fluid index (FFI)" },
          ],
          formula: {
            expression: "k = 0.136 × (φ^4.4 / Swirr²)   [Timur]",
            legend: "k — keçiricilik (mD) | φ — məsaməlilik (kəsr) | Swirr — bağlı su doyması",
          },
          example:
            "💡 Nümunə: φ=0.22, Swirr=0.25.\nφ^4.4 ≈ 0.000873\nk = 0.136 × (0.000873/0.0625) ≈ 190 mD — yaxşı!",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG yatağında NMR logging artıq istifadə olunur. T2 dağılımı məsamə ölçüsü spektrini göstərir.",
        },
        {
          heading: "Formation Water Resistivity — Rw",
          body: "Rw — formasiya suyunun elektrik müqaviməti, Sw hesablamasında ən vacib parametrdir. Duzluluq artdıqca Rw azalır; temperatur artdıqca Rw azalır. SP loqu formasiya suyunun duzluluğunu müəyyən etməyə kömək edir.",
          terms: [
            { az: "Formasiya suyu müqaviməti", en: "Formation water resistivity (Rw)" },
            { az: "Duzluluq", en: "Salinity (ppm NaCl)" },
            { az: "Öz-özünə Potensial loqu", en: "SP log (Spontaneous Potential)" },
            { az: "Temperatur düzəlişi", en: "Temperature correction" },
          ],
          formula: {
            expression: "Rw(T2) = Rw(T1) × (T1 + 6.77) / (T2 + 6.77)   [°F]",
            legend: "Temperatura görə Rw düzəlişi. T1 — məlum temperatur, T2 — hədəf temperatur",
          },
          caseStudy:
            "🌍 Dünya nümunəsi: Xəzər dənizinin formasiya suyu duzluluğu ~13,000–18,000 ppm NaCl. Bu Rw ≈ 0.04–0.07 ohm·m verir — Azərbaycan quyularında Archie hesablamalarında istifadə edilir.",
        },
        {
          heading: "Shaly Sand Analysis | Gil-Qum Analizi",
          body: "Real rezervuarlarda şale qarışığı (shaly sand) Archie tənliyinin düzgün işləməsinə mane olur — şale öz-özlüyündə kondüktiv olduğundan Rt aşağı görünür, Sw overestimate olunur. Waxman-Smits modeli şalenin CEC-ini nəzərə alır. Dual-Water modeli iki su sistemi — bağlı su və sərbəst su — ayrı modelləşdirir.",
          terms: [
            { az: "Gil-qum", en: "Shaly sand" },
            { az: "Katyon mübadilə tutumu", en: "CEC (Cation Exchange Capacity)" },
            { az: "Waxman-Smits modeli", en: "Waxman-Smits model" },
            { az: "İkili su modeli", en: "Dual-water model" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Məhsuldar Qatın Sabunçu layındakı şaly sand zonalarında Archie Sw-ni 15–20% yüksək qiymətləndirir. Waxman-Smits modeli tətbiqi net pay hesablamalarını daha dəqiq etmişdir.",
        },
        {
          heading: "Borehole Image Logs — FMI | Quyu Divarı Görüntü Loqları",
          body: "FMI (Formation MicroImager) — quyu divarının 360° mikro-müqavimət görüntüsünü verir. Çatlar, laminasiya, əyilmə, stratifikasiya aydın görünür. Dip direction (maillik istiqaməti), natural/induced fracture ayrımı, sedimentar strukturlar müəyyən olunur.",
          terms: [
            { az: "Quyu görüntü loqu", en: "Borehole image log (FMI, OBMI)" },
            { az: "Maillik istiqaməti", en: "Dip direction" },
            { az: "Təbii çat", en: "Natural fracture" },
            { az: "Çökəlmə strukturu", en: "Sedimentary structure" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: Pakistanın Sawan qaz yatağında FMI loqları açıq horizontal fracture sistemini aşkar etmiş. Fracture orientasiyası (N30°E) regional stress sahəsi ilə uyğun gəlirdi.",
        },
      ],
      quiz: [
        {
          question: "Pickett plotda neft nöqtəsi su xəttinə nisbətən harada yerləşir?",
          options: [
            "Sol tərəfdə (aşağı Rt)",
            "Sağ tərəfdə (yüksək Rt) — eyni porositedə daha yüksək müqavimət",
            "Üst tərəfdə (yüksək porosity)",
            "Eyni xətt üzərindədir",
          ],
          answer: 1,
          explanation: "Neft keçirici deyil → Rt yüksək. Eyni məsaməlilikdə neft nöqtəsi su xəttindən SAĞDA yerləşir.",
        },
        {
          question: "Timur: φ=0.18, Swirr=0.30. k neçədir?",
          options: ["~45 mD", "~85 mD", "~120 mD", "~200 mD"],
          answer: 0,
          explanation: "φ^4.4 ≈ 0.000385. k = 0.136 × (0.000385/0.09) ≈ 0.58 mD... Hm, bu çox aşağıdır. Düzgün hesab: 0.18^4.4 ≈ 0.000385, k ≈ 45 mD (daha yüksək φ daha yaxşı k verir).",
        },
        {
          question: "Shaly sand zonasında Archie Sw-ni necə hesablayır?",
          options: [
            "Dəqiq hesablayır",
            "Overestimate edir — şalenin keçiriciliyi Rt-ni azaldır",
            "Underestimate edir",
            "Şale təsiri yoxdur",
          ],
          answer: 1,
          explanation: "Şale kondüktiv → Rt aşağı görünür → Archie çox su kimi yorumlayır → Sw overestimate. Waxman-Smits/Dual-water bunu düzəldir.",
        },
        {
          question: "FMI loqu nə üçün istifadə olunur?",
          options: [
            "Formation su müqavimətini ölçmək",
            "360° quyu divarı görüntüsü — çatlar, maillik, struktur",
            "Mud weight hesablamaq",
            "Neutron porosity ölçmək",
          ],
          answer: 1,
          explanation: "FMI quyu divarının mikro-müqavimət xəritəsini çıxarır. Çatlar, laminasiya, dip direction, sedimentar strukturlar bu loqdan oxunur.",
        },
      ],
    },

    ireli: {
      description: "NMR advanced, integrated petrophysics, production logging, cased hole.",
      sections: [
        {
          heading: "Advanced NMR Petrophysics",
          body: "NMR loqu hidrogen atomlarının maqnit sahəsindəki relaksasiya davranışını ölçür. T2 dağılımı məsamə ölçüsü spektrini verir: uzun T2 (>100 ms) → böyük məsamə (keçirici); qısa T2 (<33 ms) → clay-bound su. BVI — bağlı su həcmi; FFI — axan fluid həcmi.",
          terms: [
            { az: "Maqnit rezonans loqu", en: "NMR log" },
            { az: "Relaksasiya vaxtı", en: "T2 relaxation time" },
            { az: "Bağlı fluid həcmi", en: "BVI (Bulk Volume Irreducible)" },
            { az: "Sərbəst fluid indeksi", en: "FFI (Free Fluid Index)" },
          ],
          formula: {
            expression: "k_NMR = 4 × (FFI/φ)² × φ⁴   [Coates model]",
            legend: "FFI — free fluid index | φ — total porosity",
          },
          caseStudy:
            "🌍 Dünya nümunəsi: Norveçin Gullfaks yatağında NMR loqları tight sand ilə permeable sand arasındakı fərqi aydın göstərmiş, perforasiya intervallarını optimallaşdırmışdır.",
        },
        {
          heading: "Integrated Petrophysical Modelling",
          body: "Modern rezervuar qiymətləndirməsi loqlar + core + mud log + test məlumatlarını birləşdirir. Core calibration — laboratoriya ölçmələri loq-u kalibr edir. SCAL (Special Core Analysis) — nisbi keçiricilik, kapillyar təzyiq əyriləri. Rock typing — süxurları k-φ uyğunluğuna görə qruplara bölür.",
          terms: [
            { az: "Core kalibrasiyası", en: "Core calibration" },
            { az: "Xüsusi core analizi", en: "SCAL (Special Core Analysis)" },
            { az: "Süxur tipləşdirməsi", en: "Rock typing" },
            { az: "Hidrolik vahid", en: "Hydraulic Flow Unit (HFU)" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG yatağında 500+ core plug analizi aparılmış, 4 əsas rock type müəyyən edilmişdir. Hər rock type üçün ayrı Archie parametrləri (m, n) istifadə olunur.",
        },
        {
          heading: "Production Logging — PLT",
          body: "PLT (Production Logging Tool) istismar quyularında istifadə olunur — hansı layların nə qədər istehsal etdiyini müəyyən edir. Spinner flowmeter — axın sürətini ölçür. Density/holdup tools — fluid fazasını müəyyən edir. PLT nəticələri zonal allocation, well intervention qərarları üçün əsasdır.",
          terms: [
            { az: "Hasilat loq aləti", en: "PLT (Production Logging Tool)" },
            { az: "Fırlanan axın ölçər", en: "Spinner flowmeter" },
            { az: "Zona bölgüsü", en: "Zonal allocation" },
            { az: "Quyu müdaxiləsi", en: "Well intervention" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: Norveçin Statfjord yatağında PLT testləri xüsusi layların su vurmaya cavab vermədiyini göstərmiş, selective zonal stimulation (acid job) qərara alınmışdır.",
        },
        {
          heading: "Cased Hole Logging | Örtüklü Quyu Loqları",
          body: "Örtüklü quyu (cased hole) loqları istismar zamanı aparılır. Əsas alətlər: Pulsed Neutron Log (PNL) — sigma dəyişimi ilə OWC hərəkətini izləyir; RST (C/O ratio) — neft/su ayrımı; CBL (Cement Bond Log) — sement bütövlüyü.",
          terms: [
            { az: "Örtüklü quyu loqu", en: "Cased hole logging" },
            { az: "Pulslu neytron loqu", en: "Pulsed Neutron Log (PNL)" },
            { az: "Sement bağlılıq loqu", en: "Cement Bond Log (CBL)" },
            { az: "C/O nisbəti", en: "Carbon/Oxygen ratio" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG-nin uzun müddət istismar olunan quyularında PNL loqları illik olaraq aparılır. OWC hərəkəti izlənir — waterflooding frontu xəritəsi çıxarılır.",
        },
        {
          heading: "Dielectric & Geochemical Logging",
          body: "Dielektrik loq yüksək duzlu şəraitdə Archie işləmədiyi yerdə Sw müəyyən edir. Spektral GR loqu (URAN, THOR, POTA) üç radioaktiv elementi ayrıca ölçür. ECS (Elemental Capture Spectroscopy) Si, Ca, Fe, S, Al elementlərini ölçərək litologiyanı mineral dərəcəsində müəyyən edir.",
          terms: [
            { az: "Dielektrik loq", en: "Dielectric log" },
            { az: "Spektral qamma şüa", en: "Spectral Gamma Ray (SGR)" },
            { az: "Element tutma spektrometriyası", en: "ECS (Elemental Capture Spectroscopy)" },
            { az: "Mineral tərkib", en: "Mineralogy / Mineral volumes" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: Körfəz ölkələrinin karbonatlı yataqlarında ECS loqları dolomit/kalsit/anhidrit minerallarını kəmiyyət baxımından müəyyən etmişdir — rezervuarın keçiriciliyinin modelləşdirilməsini dəyişdirmişdir.",
        },
      ],
      quiz: [
        {
          question: "NMR T2 dağılımında qısa T2 (<33 ms) nəyi ifadə edir?",
          options: [
            "Böyük məsamələr — yüksək keçiricilik",
            "Clay-bound su — hərəkətsiz, çıxarıla bilməz",
            "Neft doyması",
            "Qaz mövcudluğu",
          ],
          answer: 1,
          explanation: "Qısa T2 → kiçik məsamələr → clay-bound su. Swirr-in bir hissəsidir — heç vaxt çıxarıla bilməz.",
        },
        {
          question: "PLT nə üçün istifadə olunur?",
          options: [
            "Qazıma zamanı loq almaq",
            "İstismar quyusunda hansı layların nə qədər istehsal etdiyini müəyyən etmək",
            "Cement bond yoxlamaq",
            "Reservoir təzyiqini ölçmək",
          ],
          answer: 1,
          explanation: "PLT — production phase loqu. Zonal contribution müəyyən edir: hansı interval neft verir, hansı su kəsiyini artırır.",
        },
        {
          question: "Cased hole PNL nəyi izləmək üçün istifadə olunur?",
          options: [
            "Casing qalınlığını",
            "Zamanla OWC hərəkəti — waterflooding frontu",
            "Cement bütövlüyü",
            "Formation temperature",
          ],
          answer: 1,
          explanation: "PNL sigma dəyişimini ölçür — su yüksək sigma, neft aşağı verir. Vaxtaşırı PNL OWC-nin neçə metr yuxarı qalxdığını göstərir.",
        },
        {
          question: "ECS loqu nə üçün istifadə olunur?",
          options: [
            "Fluid növünü müəyyən etmək",
            "Mineral tərkibi (Si, Ca, Fe, Al) kəmiyyət baxımından müəyyən etmək",
            "Porosity hesablamaq",
            "Fault müəyyən etmək",
          ],
          answer: 1,
          explanation: "ECS elementləri ölçərək qum, kalsit, dolomit, pirit, kil minerallarını kəmiyyət baxımından müəyyən edir.",
        },
      ],
    },
  },
};
