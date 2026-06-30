import type { Lesson } from "../types";

export const geologyLesson: Lesson = {
  title: "Geologiya",
  icon: "🪨",
  levels: {
    baslangic: {
      description: "Süxur növlərini, litologiyanı və neft tələsinin əsaslarını öyrən.",
      sections: [
        {
          heading: "Litologiya nədir? | What is Lithology?",
          body: "Litologiya süxurların tərkibini, strukturunu və xüsusiyyətlərini öyrənən elm sahəsidir. Neft-qaz mühəndisliyində litologiya quyu loqlarını şərh etmək və rezervuar xüsusiyyətlərini müəyyən etmək üçün əsasdır. Hər süxur növünün müxtəlif məsaməlilik (porosity) və keçiricilik (permeability) xüsusiyyətləri var.",
          terms: [
            { az: "Litologiya", en: "Lithology" },
            { az: "Süxur", en: "Rock" },
            { az: "Məsaməlilik", en: "Porosity" },
            { az: "Keçiricilik", en: "Permeability" },
          ],
          caseStudy: "🇦🇿 Azərbaycan nümunəsi: Bakı arxipelaqında Məhsuldar Qat (Productive Series) əsasən qumlu süxurlardan (sandstone) ibarətdir. BP və SOCAR mühəndisləri bu layların litologiyasını quyu loqları ilə müəyyən edərək hasilat quyularının yerini seçiblər.",
        },
        {
          heading: "Sandstone (Qumlu süxur) — Əsas rezervuar",
          body: "Sandstone neft-qaz üçün ən vacib rezervuar süxurudur. Dənəciklərin ölçüsü 0.063–2 mm arasında dəyişir. Dənəciklər arasındakı boşluqlar (pore space) neft, qaz və ya su saxlayır. Sementləşmə dərəcəsi nə qədər az olsa, məsaməlilik bir o qədər yüksək olur.",
          terms: [
            { az: "Qumlu süxur", en: "Sandstone" },
            { az: "Dənəcik", en: "Grain" },
            { az: "Sementləşmə", en: "Cementation" },
            { az: "Məsamə fəzası", en: "Pore space" },
          ],
          formula: {
            expression: "φ = (V_pore / V_total) × 100%",
            legend: "φ — məsaməlilik (porosity) | V_pore — boşluq həcmi | V_total — ümumi həcm",
          },
          example:
            "💡 Nümunə: 100 sm³ sandstone nümunəsi götürülür. Boşluqların həcmi 22 sm³-dir.\nφ = (22 / 100) × 100% = 22%\nBu yaxşı reservoir sayılır — sandstone üçün tipik aralıq 15–35%-dir.",
          caseStudy:
            "🌍 Dünya nümunəsi: Ərəbistanın Ghawar yatağı (dünyanın ən böyük neft yatağı) əsasən karbonatlı süxurlarda yerləşir. Lakin Azərbaycanın Azəri-Çıraq-Günəşli (ACG) yatağı sandstone rezervuarlarında inkişaf etdirilmişdir.",
        },
        {
          heading: "Shale (Gil süxur) — İkili rol",
          body: "Shale çox aşağı məsaməlilik (<5%) və keçiriciliyə (<0.001 mD) malikdir. Neft-qaz sahəsində iki kritik rolu var: (1) Cap rock — keçirimsiz örtük kimi nefti tutan mühafizəedici lay; (2) Source rock — üzvi maddə (kerogen) ehtiva edən mənbə lay. Kerojenin istilik altında parçalanması neft və qaz əmələ gətirir.",
          terms: [
            { az: "Gil süxur", en: "Shale" },
            { az: "Mühafizəedici lay", en: "Cap rock / Seal" },
            { az: "Mənbə lay", en: "Source rock" },
            { az: "Kerojen", en: "Kerogen" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Xəzər dənizindəki Maykop Seriyası (Oligosen-Miosen) əsas mənbə laydır. Bu seriya üzvi maddəcə zəngindir və ACG yataqlarındakı neftin əsas qaynağı hesab olunur.",
        },
        {
          heading: "Karbonatlı süxurlar — Limestone və Dolomite",
          body: "Limestone (əhəng daşı) CaCO₃-dən, Dolomite isə CaMg(CO₃)₂-dən ibarətdir. Karbonatlı süxurlarda məsaməlilik iki növ ola bilər: ilkin məsaməlilik (dənəciklər arası) və ikincil məsaməlilik (çatlar, kavernalar). İkincil məsaməlilik neft hasilatında xüsusilə əhəmiyyətlidir.",
          terms: [
            { az: "Əhəng daşı", en: "Limestone" },
            { az: "Dolomit", en: "Dolomite" },
            { az: "İlkin məsaməlilik", en: "Primary porosity" },
            { az: "İkincil məsaməlilik", en: "Secondary porosity (fractures, vugs)" },
          ],
          caseStudy:
            "🌍 Dünya nümunəsi: İranın Asmari Formation karbonatlı rezervuarı Orta Şərqdəki ən məhsuldar laylardan biridir. Buradakı çat sistemi (fracture network) hasilatı əhəmiyyətli dərəcədə artırır.",
        },
        {
          heading: "Neft tələsi (Petroleum Trap) — 3 əsas komponent",
          body: "Neft tələsi neftin toplanmasına şərait yaradan geoloji strukturdur. 3 komponentin hamısı eyni anda mövcud olmalıdır — biri çatışmasa neft yığılmaz. Tələ növləri: structural trap (antiklinal, fault trap) və stratigraphic trap (facies dəyişikliyi).",
          terms: [
            { az: "Neft tələsi", en: "Petroleum trap" },
            { az: "Antiklinal", en: "Anticline" },
            { az: "Qırılma tələsi", en: "Fault trap" },
            { az: "Stratigrafik tələ", en: "Stratigraphic trap" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Neft Daşları (1949) — Xəzər dənizinin dibindəki antiklinal strukturda kəşf edilmiş dünyanın ilk dəniz neft yatağı. Bu antiklinalın qanadlarında həm şimal, həm cənub istiqamətlərə maillik var — klassik structural trap nümunəsi.",
        },
      ],
      quiz: [
        {
          question: "100 sm³ sandstone nümunəsinin 18 sm³-i boşluqlardan ibarətdir. Məsaməlilik neçədir?",
          options: ["8%", "18%", "82%", "1.8%"],
          answer: 1,
          explanation: "φ = (18/100) × 100% = 18%. Bu orta-yaxşı keyfiyyətli sandstone rezervuarıdır.",
        },
        {
          question: "Shale-in neft-qaz sahəsindəki hansı rolu CAP ROCK funksiyasıdır?",
          options: [
            "Üzvi maddə saxlayaraq neft əmələ gətirir",
            "Keçirimsiz örtük kimi neftin yuxarı axmasına mane olur",
            "Nefti yüksək məsaməliliyinə görə saxlayır",
            "Qazıma zamanı drill bit-i soyudur",
          ],
          answer: 1,
          explanation: "Cap rock (seal) — şalenin keçirimsizliyi neftin rezervuardan qaçmasına mane olur. Mənbə lay (source rock) isə neft əmələ gətirən başqa roldur.",
        },
        {
          question: "Neft tələsinin 3 əsas komponenti hansıdır?",
          options: [
            "Quyu, nasos, separator",
            "Rezervuar lay, mühafizəedici lay, tələ strukturu",
            "Sandstone, shale, limestone",
            "Porosity, permeability, saturation",
          ],
          answer: 1,
          explanation: "Üç komponent: (1) Rezervuar lay — nefti saxlayan məsaməli süxur, (2) Cap rock — keçirimsiz örtük, (3) Tələ strukturu — geoloji forma (antiklinal, fault və s.).",
        },
        {
          question: "Azərbaycanın ACG yatağı hansı süxur növündə yerləşir?",
          options: ["Limestone", "Dolomite", "Sandstone", "Granite"],
          answer: 2,
          explanation: "Azəri-Çıraq-Günəşli (ACG) yatağı Məhsuldar Qatın sandstone rezervuarlarında inkişaf etdirilmişdir. Bu Azərbaycanın ən böyük neft yatağıdır.",
        },
      ],
    },

    orta: {
      description: "Stratigrafiya, geoloji zaman, korrelyasiya metodları və rezervuar qiymətləndirmə.",
      sections: [
        {
          heading: "Stratigrafiya — layların ardıcıllığı | Stratigraphy",
          body: "Stratigrafiya süxur laylarının yaşını, ardıcıllığını, coğrafi yayılmasını və bir-biri ilə əlaqəsini öyrənir. Steno Qanunları stratigrafiyanın əsasını təşkil edir: (1) Horizontallıq — laylar üfüqi yerləşir; (2) Yuxarıda gənclik — üst laylar daha cavan; (3) Lateral davamlılıq — eyni lay kənara doğru davam edir.",
          terms: [
            { az: "Stratigrafiya", en: "Stratigraphy" },
            { az: "Lay", en: "Formation / Bed" },
            { az: "Korrelyasiya", en: "Correlation" },
            { az: "Geoloji kəsik", en: "Stratigraphic column" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Məhsuldar Qat (Productive Series — Pliosen yaşlı, ~5-2 milyon il) 11 stratigrafik vahidə bölünür: Balaxanı, Sabunçu, Suraxanı və digər laylar. Bu layların ardıcıllığı Bakı Arxipelaqı boyunca korrelyasiya edilmişdir.",
        },
        {
          heading: "Stratigrafik korrelyasiya metodları",
          body: "Korrelyasiya — eyni yaşlı layların müxtəlif quyularda müəyyən edilməsi metodudur. Əsas üsullar: (1) Litoloji korrelyasiya — süxur xüsusiyyətlərinə görə; (2) Biostratigrafik korrelyasiya — fosillərə görə; (3) Well log korrelyasiya — GR, resistivity loqlarının formalarına görə.",
          terms: [
            { az: "Biostratigrafiya", en: "Biostratigraphy" },
            { az: "Fosil", en: "Fossil / Index fossil" },
            { az: "Loq korrelyasiyası", en: "Well log correlation" },
            { az: "Korrelyasiya xətti", en: "Correlation line / Tie line" },
          ],
          example:
            "💡 Praktiki nümunə: A quyusunda GR loqu 3000 m dərinliyindəki sandstone layını göstərir. B quyusunda eyni GR pattern-i 3150 m-də görünür. Bu 150 m fərq layın maillik istiqamətini göstərir — struktur xəritəsi qurmaq üçün istifadə edilir.",
          caseStudy:
            "🌍 Dünya nümunəsi: Şimali dəniz (North Sea) Brent Group korrelyasiyası onlarca quyunun GR loqları əsasında aparılmış, 5 alt formasyona bölünmüşdür. Bu korrelyasiya Şimali dənizin işlənilməsi üçün əsas olmuşdur.",
        },
        {
          heading: "Geoloji zaman miqyası | Geological Time Scale",
          body: "Geoloji zaman miqyası Yerin 4.6 milyard illik tarixini Eon → Era → Period → Epoch → Age vahidlərinə bölür. Neft-qaz üçün ən vacib dövrlər: Triassic, Jurassic, Cretaceous (Mezozoy) — Orta Şərq yataqları; Eocene, Oligocene, Miocene (Senozoy) — Azərbaycan, Xəzər yataqları.",
          terms: [
            { az: "Geoloji dövr", en: "Geological period" },
            { az: "Triyas", en: "Triassic" },
            { az: "Yura", en: "Jurassic" },
            { az: "Kaynozoy", en: "Cenozoic" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Məhsuldar Qat Pliosen yaşlıdır (~5.3–2.6 milyon il əvvəl). Paratethys dənizinin çəkilməsi ilə əlaqədar delta çöküntüləri neft üçün mükəmməl sandstone rezervuarları formalaşdırmışdır.",
        },
        {
          heading: "Struktur geologiya — qatlanma və qırılmalar",
          body: "Geoloji qüvvələr (tektonik) süxur laylarını deformasiya edir. Kompressiya → antiklinallər və reverse qırılmalar; Ekstensiya → sinkinallər və normal qırılmalar. Antiklinallar neft tələlərinin klassik formasıdır — layların qabarıqlığında neft yuxarı hissədə toplanır.",
          terms: [
            { az: "Antiklinal", en: "Anticline" },
            { az: "Sinklinak", en: "Syncline" },
            { az: "Normal qırılma", en: "Normal fault" },
            { az: "Tərsinə qırılma", en: "Reverse fault" },
          ],
          formula: {
            expression: "Dip angle (α) = arctan(H / L)",
            legend: "α — layın maillik bucağı | H — şaquli yüksəklik fərqi | L — üfüqi məsafə",
          },
          example:
            "💡 Nümunə: Antiklinalın zirvəsi ilə qanadı arasında 200 m hündürlük fərqi var, üfüqi məsafə 2000 m-dir.\nα = arctan(200/2000) = arctan(0.1) ≈ 5.7°\nBu zəif maillikli antiklinaldır — real yataqlarda 5°–30° arasında olur.",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Abşeron yarımadasının əsas antiklinalları (Balaxanı, Sabunçu, Suraxanı) şimal-qərb — cənub-şərq istiqamətli Abşeron tektonik zonasına aiddir. Bu antiklinallar üzərindəki neft ilk dəfə 1871-ci ildə sənaye üsulu ilə çıxarılmışdır.",
        },
        {
          heading: "Geokimya — neftin mənşəyi | Petroleum Geochemistry",
          body: "Neft üzvi maddənin (əsasən dəniz plankton və yosunlarının) geoloji zaman boyunca qömülərək istilik-təzyiq altında parçalanmasından əmələ gəlir. Neft pəncərəsi (oil window): 60–120°C; Qaz pəncərəsi (gas window): 120–200°C.",
          terms: [
            { az: "Kerojen", en: "Kerogen" },
            { az: "Neft pəncərəsi", en: "Oil window" },
            { az: "Qaz pəncərəsi", en: "Gas window" },
            { az: "Miqrasiya", en: "Migration" },
          ],
          formula: {
            expression: "T(°C) = T_surface + G × Depth",
            legend: "T — dərinlikdə temperatur | T_surface — səth temperaturu (~25°C) | G — geothermal gradient (tipik: 25–30°C/km) | Depth — dərinlik (km)",
          },
          example:
            "💡 Nümunə: Geothermal gradient 28°C/km, səth temperaturu 20°C. Neft pəncərəsinin başlanğıcı (60°C) neçənci km-dədir?\n60 = 20 + 28 × D → D = 40/28 ≈ 1.43 km\nYəni bu regionda 1.43 km dərindən neft əmələgəlmə prosesi başlayır.",
          caseStudy:
            "🌍 Dünya nümunəsi: Orta Şərqdəki Tethys okeanının Yura dövrü çöküntüləri mənbə laydır. ~150 milyon il ərzində temperatur-təzyiq artımı bu mənbə layı dünyanın ən zəngin neft rayonuna çevirmişdir.",
        },
      ],
      quiz: [
        {
          question: "Geothermal gradient 30°C/km, səth temp 22°C. 3 km dərinlikdə temperatur neçədir?",
          options: ["52°C", "82°C", "112°C", "92°C"],
          answer: 2,
          explanation: "T = 22 + 30 × 3 = 22 + 90 = 112°C. Bu temperatur neft pəncərəsinin (60–120°C) yuxarı sərhədinə yaxındır.",
        },
        {
          question: "Steno Qanununa görə hansı lay daha cavan yaşlıdır?",
          options: [
            "Alt lay — çünki daha qalındır",
            "Üst lay — çünki sonradan çökəlmişdir",
            "Hər ikisi eyni yaşlıdır",
            "Lateral olaraq kənardakı lay",
          ],
          answer: 1,
          explanation: "Steno-nun 'Yuxarıda gənclik' qanununa görə üst laylar alt laylara nisbətən daha sonra çökəlmişdir, yəni daha gənc yaşlıdır.",
        },
        {
          question: "Neft pəncərəsinin temperaturu hansı aralıqdadır?",
          options: ["20–60°C", "60–120°C", "120–200°C", "200°C+"],
          answer: 1,
          explanation: "Neft pəncərəsi: 60–120°C. Bu aralıqda kerogen maye neftə çevrilir. 120°C-dən yuxarı qaz pəncərəsi başlayır.",
        },
        {
          question: "Loq korrelyasiyasında A quyusunda lay 2800 m, B quyusunda 2950 m-dədir. Bu 150 m fərq nəyi göstərir?",
          options: [
            "Lay B quyusunda daha qalındır",
            "Layın mailliyi — struktur xəritəsi üçün məlumat",
            "B quyusu yanlış qazılmışdır",
            "İki lay fərqli yaşlıdır",
          ],
          answer: 1,
          explanation: "Korrelyasiya zamanı dərinlik fərqi layın maillik istiqamətini (dip direction) müəyyən etməyə kömək edir. Bu məlumat izoərinlik xəritəsi (structure contour map) qurmaq üçün istifadə edilir.",
        },
      ],
    },

    ireli: {
      description: "Seysmik interpretasiya, həcmi hesablamalar, risk qiymətləndirmə və neft sistemi analizi.",
      sections: [
        {
          heading: "Seysmik interpretasiya | Seismic Interpretation",
          body: "Seysmika süxur laylarından qayıdan səs dalğalarını (reflections) analiz edərək yeraltı strukturların xəritəsini çıxarır. Two-way time (TWT) — dalğanın göndərilməsi ilə qayıdışı arasındakı vaxt, millisaniyə (ms) ilə ölçülür. Amplitude anomaliyaları (bright spot) birbaşa neft-qaz göstəricisi ola bilər.",
          terms: [
            { az: "Seysmik dalğa", en: "Seismic wave" },
            { az: "İki yol vaxtı", en: "Two-way time (TWT)" },
            { az: "İnterval sürəti", en: "Interval velocity" },
            { az: "Parlaq nöqtə", en: "Bright spot (DHI)" },
          ],
          formula: {
            expression: "Depth = (TWT × V_interval) / 2",
            legend: "Depth — dərinlik (m) | TWT — iki yol vaxtı (s) | V_interval — interval sürəti (m/s)",
          },
          example:
            "💡 Nümunə: TWT = 1.8 s, interval velocity = 2400 m/s.\nDepth = (1.8 × 2400) / 2 = 2160 m\nYəni refleksiya 2160 m dərinliyindəki laydan gəlir.",
          caseStudy:
            "🌍 Dünya nümunəsi: Norveç Şelf sahəsindəki Johan Sverdrup yatağı (2010-da kəşf edilmiş, ~2.7 mlrd barel) 3D seysmik interpretasiya zamanı amplituda anomaliyaları ilə aşkar edilmişdir.",
        },
        {
          heading: "Həcmi hesablamalar — STOIIP | Volumetric Calculations",
          body: "Yataq kəşf edildikdən sonra neft miqdarını hesablamaq üçün volumetrik metod istifadə edilir. GRV (Gross Rock Volume) — tələ strukturunun ümumi həcmi. STOIIP — yer səthi şəraitinə gətirilmiş neft miqdarı. Monte Carlo simulyasiyası ilə P10/P50/P90 interval qiymətləri verilir.",
          terms: [
            { az: "Ümumi süxur həcmi", en: "Gross Rock Volume (GRV)" },
            { az: "Xalis neft ehtiyatı", en: "STOIIP / OOIP" },
            { az: "Bərpa əmsalı", en: "Recovery Factor (RF)" },
            { az: "Ehtimal intervalları", en: "P10 / P50 / P90" },
          ],
          formula: {
            expression: "STOIIP = (GRV × NTG × φ × So) / Boi",
            legend: "GRV — ümumi süxur həcmi | NTG — net-to-gross nisbəti | φ — məsaməlilik | So — neft doyması | Boi — neftin ilkin həcm faktoru",
          },
          example:
            "💡 Nümunə:\nGRV = 500M m³, NTG = 0.70, φ = 0.22, So = 0.75, Boi = 1.35\nSTOIIP = (500M × 0.70 × 0.22 × 0.75) / 1.35 ≈ 42.8M m³ ≈ 269M barel\nRF = 35% → EUR ≈ 94M barel",
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: ACG yatağının STOIIP-i təxminən 5–6 milyard barel olaraq qiymətləndirilmişdir. Recovery factor ~35–40% ilə ~2 milyard barel çıxarıla bilən ehtiyat mövcuddur.",
        },
        {
          heading: "Risk qiymətləndirmə — GCoS | Geological Chance of Success",
          body: "GCoS — yatağın kommersial ola biləcəyinin ehtimalı. Dörd əsas risk amili: (1) Rezervuar mövcudluğu Pr; (2) Tələ mövcudluğu Pt; (3) Mühafizəedici lay Ps; (4) Neft sistemi (charge) Pc. Bunlar çarpılır → GCoS = Pr × Pt × Ps × Pc.",
          terms: [
            { az: "Geoloji uğur ehtimalı", en: "Geological Chance of Success (GCoS)" },
            { az: "Risk amili", en: "Risk factor" },
            { az: "Kəşfiyyat quyusu", en: "Wildcat well" },
            { az: "Kommersial tapıntı", en: "Commercial discovery" },
          ],
          formula: {
            expression: "GCoS = P_reservoir × P_trap × P_seal × P_charge",
            legend: "Hər P — müvafiq geoloji amil üçün 0–1 arasında ehtimal dəyəri",
          },
          example:
            "💡 Nümunə:\nP_reservoir = 0.80, P_trap = 0.65, P_seal = 0.75, P_charge = 0.70\nGCoS = 0.80 × 0.65 × 0.75 × 0.70 = 0.273 → ~27%\nBeynəlxalq orta: ~20-30%.",
          caseStudy:
            "🌍 Dünya nümunəsi: BP-nin Deepwater Gulf of Mexico kəşfiyyat proqramında ortalama GCoS ~25% idi. 4 quyudan 1-i kommersial kəşf gözlənilirdi.",
        },
        {
          heading: "Qeyri-ənənəvi yataqlar — Shale Oil & Gas",
          body: "Qeyri-ənənəvi yataqlarda neft/qaz birbaşa mənbə lay içindədir. Şale nefti/qazı çıxarmaq üçün horizontal drilling + hydraulic fracturing (fracking) tələb olunur. Fracking zamanı yüksək təzyiqlə su, qum və kimyəvi maddə qarışığı quruya vurularaq çatlar yaradılır.",
          terms: [
            { az: "Şale nefti", en: "Shale oil / Tight oil" },
            { az: "Hidravlik çatlatma", en: "Hydraulic fracturing (fracking)" },
            { az: "Üfüqi qazıma", en: "Horizontal drilling" },
            { az: "Qeyri-ənənəvi ehtiyat", en: "Unconventional resource" },
          ],
          formula: {
            expression: "k_shale < 0.1 mD  →  fracking tələb olunur",
            legend: "k — keçiricilik. Şale üçün tipik: 0.0001–0.01 mD. Fracking bunu effektiv olaraq artırır.",
          },
          caseStudy:
            "🌍 Dünya nümunəsi: ABŞ-ın Permian Basin şale inqilabı 2008–2019 illər arasında ABŞ hasilatını 5 mln b/gün-dən 13 mln b/gün-ə qaldırdı. Azərbaycanda əsasən ənənəvi yataqlar inkişaf etdirilir.",
        },
        {
          heading: "Neft sistemi analizi | Petroleum System Analysis",
          body: "Tam neft sistemi 5 elementin və 2 prosesin eyni vaxtda mövcudluğunu tələb edir. Elementlər: mənbə lay, rezervuar, seal, tələ, örtük süxurları. Proseslər: neft əmələgəlmə və toplanma. Əgər bu elementlər zaman-məkan baxımından uyğun gəlmirsə, yataq formalaşmır.",
          terms: [
            { az: "Neft sistemi", en: "Petroleum system" },
            { az: "Əmələgəlmə", en: "Generation / Expulsion" },
            { az: "Miqrasiya", en: "Migration (primary & secondary)" },
            { az: "Qoruma", en: "Preservation" },
          ],
          caseStudy:
            "🇦🇿 Azərbaycan nümunəsi: Xəzər neft sistemi — mənbə lay (Maykop Seriyası), miqrasiya yolu (qırılmalar boyunca), rezervuar (Məhsuldar Qat sandstone-ları), seal (Abşeron lay-paketi). Bu sistemin bütün elementləri uyğun gəldiyinə görə Xəzər dünyanın ən zəngin neft-qaz hövzələrindən biridir.",
        },
      ],
      quiz: [
        {
          question: "TWT = 2.4 s, interval velocity = 2800 m/s. Dərinlik neçədir?",
          options: ["1680 m", "3360 m", "2800 m", "6720 m"],
          answer: 1,
          explanation: "Depth = (TWT × V) / 2 = (2.4 × 2800) / 2 = 3360 m. TWT-nin 2-yə bölünməsini unutma — dalğa gedib qayıdır.",
        },
        {
          question: "STOIIP: GRV=300M m³, NTG=0.6, φ=0.20, So=0.70, Boi=1.30. STOIIP neçədir?",
          options: ["~19.4M m³", "~15.2M m³", "~25.2M m³", "~30.0M m³"],
          answer: 0,
          explanation: "STOIIP = (300M × 0.6 × 0.20 × 0.70) / 1.30 = 25.2M / 1.30 ≈ 19.4M m³.",
        },
        {
          question: "GCoS: P_r=0.80, P_t=0.70, P_s=0.60, P_c=0.75. GCoS neçədir?",
          options: ["~25%", "~35%", "~60%", "~72%"],
          answer: 0,
          explanation: "GCoS = 0.80 × 0.70 × 0.60 × 0.75 = 0.252 ≈ 25%. Bütün amillər çarpılır — bir amil zəif olduqda ümumi GCoS kəskin azalır.",
        },
        {
          question: "Şale neftini çıxarmaq üçün nə tələb olunur?",
          options: [
            "Yalnız şaquli qazıma",
            "Üfüqi qazıma + hidravlik çatlatma (fracking)",
            "Yalnız kimyəvi EOR",
            "Antiklinal tələsi",
          ],
          answer: 1,
          explanation: "Şalenin keçiriciliyi çox aşağıdır (<0.1 mD). Üfüqi qazıma lay boyunca kontakt artırır; fracking isə süni çat sistemi yaradaraq neftin axmasına imkan verir.",
        },
      ],
    },
  },
};
