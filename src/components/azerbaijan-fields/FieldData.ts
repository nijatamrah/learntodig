export interface FieldStat {
    label: string;
    value: string;
    unit?: string;
  }
  
  export interface GeologyInfo {
    formation: string;
    lithology: string;
    trapType: string;
    depth: string;
    reservoirAge: string;
    porosity: string;
    permeability: string;
  }
  
  export interface ProductionHistory {
    year: number;
    event: string;
    detail: string;
  }
  
  export interface TechnicalInfo {
    operator: string;
    partners: string[];
    platforms: string;
    wells: string;
    contract: string;
    contractDate: string;
  }
  
  export interface AzerbaijanField {
    id: string;
    name: string;
    nameAz: string;
    tagline: string;
    color: string;
    accentColor: string;
    location: {
      lat: number;
      lng: number;
      description: string;
      waterDepth: string;
      distanceFromBaku: string;
    };
    keyStats: FieldStat[];
    geology: GeologyInfo;
    history: ProductionHistory[];
    technical: TechnicalInfo;
    funFacts: string[];
    significance: string;
  }
  
  export const AZERBAIJAN_FIELDS: AzerbaijanField[] = [
    {
      id: "guneshli",
      name: "Günəşli",
      nameAz: "Günəşli",
      tagline: "Xəzərin ən böyük neft yatağı",
      color: "#1a3a5c",
      accentColor: "#2563eb",
      location: {
        lat: 40.42,
        lng: 50.52,
        description: "Xəzər dənizinin cənub-qərb hissəsi, Bakıdan şərqdə",
        waterDepth: "180–210 m",
        distanceFromBaku: "~75 km",
      },
      keyStats: [
        { label: "Kəşf ili", value: "1979" },
        { label: "İstehsal başlangıcı", value: "1981" },
        { label: "Ümumi ehtiyat", value: "700+", unit: "mln ton" },
        { label: "Maksimum dərinlik", value: "6.800", unit: "m" },
        { label: "Su dərinliyi", value: "180–210", unit: "m" },
        { label: "Platforma sayı", value: "12+" },
      ],
      geology: {
        formation: "Fasila (Məhsuldar Qat), Balaxanı, Sabunçu, Suraxanı layları",
        lithology: "Qumtaşı, çaqıltaşı, gilli araqatlar — deltaya qədərki çöküntülər",
        trapType: "Antiklinal tələ — şimal-qərb istiqamətli qırışıq",
        depth: "2.000–6.800 m",
        reservoirAge: "Pliyosen (Məhsuldar Qat — ~5–2 mln il əvvəl)",
        porosity: "15–28%",
        permeability: "50–500 mD",
      },
      history: [
        { year: 1979, event: "Kəşf", detail: "Sovet geologları tərəfindən Xəzərdə seysmik kəşfiyyat zamanı aşkarlanıb" },
        { year: 1981, event: "İlk hasilat", detail: "Sovet dövründə dayaz-su hissəsindən (Günəşli Deep) hasilat başladı" },
        { year: 1994, event: "Əsrin Müqaviləsi", detail: "Azəri-Çıraq-Günəşli bloku üzrə ARDNŞ və 8 beynəlxalq şirkət arasında PSA imzalandı" },
        { year: 1997, event: "Dərin-su hissəsi", detail: "BP-nin rəhbərliyi ilə dərin-su Günəşlinin inkişafına başlandı" },
        { year: 2008, event: "Zirvə hasilat", detail: "ACG blokunun ümumi hasilatı gündə ~1 mln barrel-ə çatdı" },
        { year: 2017, event: "ACG genişləndirilməsi", detail: "Yeni neft platası quruldu, ehtiyatların ömrü 2050-yə uzadıldı" },
        { year: 2024, event: "Günümüz", detail: "ACG blokunun əsas yatağı kimi hasilat davam edir, yeni quyu proqramları icra edilir" },
      ],
      technical: {
        operator: "BP (baş operator)",
        partners: ["ARDNŞ (25%)", "BP (30.37%)", "MOL (9.57%)", "SOCAR (6.65%)", "ExxonMobil (6.79%)", "TPAO (5.73%)", "Inpex (9.31%)", "Equinor (7.27%)"],
        platforms: "12 stasionar platforma + 2 yarımbatıq platforma",
        wells: "200+ istehsal və inyeksiya quyusu",
        contract: "Azəri-Çıraq-Günəşli (ACG) Hasilat Pay Bölgüsü Müqaviləsi",
        contractDate: "20 sentyabr 1994",
      },
      funFacts: [
        "Günəşli — Azərbaycanda kəşf edilmiş ən böyük neft yatağıdır. ACG bloku ölkənin ixrac gəlirlərinin 80%-dən çoxunu təmin edir.",
        "Yataqdan hasil edilən neft BTC boru kəməri ilə Türkiyənin Ceyhan limanına nəql edilir — 1.768 km məsafə.",
        "Pliyosen dövrünə aid Məhsuldar Qat layları Xəzər hövzəsinin unikal çöküntü süxurlarıdır — dünyada analoqu az olan bir reservoir sistemidir.",
        "Dərin-su Günəşli hissəsi 1997-ci ildə inkişaf etdirilməyə başlandı. O vaxt bu, postsovet məkanında ən böyük iqtisadi layihə sayılırdı.",
      ],
      significance: "Günəşli Azərbaycanın enerji müstəqilliyinin təməlidir. 1994-cü ildə imzalanan 'Əsrin Müqaviləsi' postsovet Azərbaycanına xarici investisiyanın qapısını açdı və ACG bloku bu gün də ölkənin əsas ixrac gəlir mənbəyi olaraq qalır.",
    },
    {
      id: "chirag",
      name: "Çıraq",
      nameAz: "Çıraq",
      tagline: "ACG blokunun ilk hasilat yatağı",
      color: "#1a3a2a",
      accentColor: "#16a34a",
      location: {
        lat: 40.33,
        lng: 50.87,
        description: "Günəşlidən 80 km şərqdə, Xəzər dənizinin mərkəzinə yaxın",
        waterDepth: "170–180 m",
        distanceFromBaku: "~120 km",
      },
      keyStats: [
        { label: "Kəşf ili", value: "1985" },
        { label: "İlk hasilat", value: "1997" },
        { label: "Ümumi ehtiyat", value: "~200", unit: "mln ton" },
        { label: "Əsas dərinlik", value: "2.500–4.500", unit: "m" },
        { label: "Su dərinliyi", value: "170–180", unit: "m" },
        { label: "Çıraq-1 platforması", value: "1997", unit: "il" },
      ],
      geology: {
        formation: "Məhsuldar Qat — Balaxanı, Sabunçu layları əsas",
        lithology: "Dənəli qumtaşı, alevrolit laylı ardıcıllıq — dərin-su deltası çöküntüsü",
        trapType: "Antiklinal — Günəşli strukturunun şərq davamı",
        depth: "2.500–4.500 m",
        reservoirAge: "Üst Pliyosen (Məhsuldar Qat)",
        porosity: "18–26%",
        permeability: "100–800 mD",
      },
      history: [
        { year: 1985, event: "Kəşf", detail: "Sovet Azərbaycanı dövründə kəşfiyyat qazıması zamanı aşkarlandı" },
        { year: 1994, event: "Müqavilə", detail: "Günəşli ilə birlikdə ACG PSA çərçivəsinə daxil edildi" },
        { year: 1997, event: "Çıraq-1 platforması", detail: "ACG blokundan ilk kommersiya nefti Çıraqdan hasil edildi — 7 noyabr 1997" },
        { year: 2013, event: "Yeni Çıraq", detail: "'Chirag Oil Project' çərçivəsində yeni platforma quraşdırıldı, hasilat genişləndirildi" },
        { year: 2024, event: "Hazırkı vəziyyət", detail: "Çıraq-1 platforması fəaliyyətini davam etdirir; yataqdan əlavə yeni quyular qazılmaqdadır" },
      ],
      technical: {
        operator: "BP (baş operator)",
        partners: ["ACG konsorsiumu ilə eyni — ARDNŞ, ExxonMobil, MOL, Equinor, TPAO, Inpex, SOCAR"],
        platforms: "Çıraq-1 platforması + yeni COP platforması",
        wells: "30+ istehsal quyusu",
        contract: "ACG Hasilat Pay Bölgüsü Müqaviləsi",
        contractDate: "20 sentyabr 1994",
      },
      funFacts: [
        "7 noyabr 1997 — ACG blokundan ilk kommersiya nefti məhz Çıraq platformasından hasil edildi. Bu tarix Azərbaycan üçün tarixi əhəmiyyət daşıyır.",
        "Çıraq-1 platforması Xəzərdə fəaliyyət göstərən ilk şərq-Qərb birgə müəssisə platformasıdır.",
        "Yataqda tətbiq edilən horizontal qazıma texnologiyası neft hasil olunan intervalı əhəmiyyətli dərəcədə artırdı.",
        "Çıraq nefti Günəşli ilə eyni BTC-BKKT boru kəməri sistemindən keçərək Ceyhan limanına çatır.",
      ],
      significance: "Çıraq tarixi baxımdan əvəzsizdir — ACG blokunun ilk hasilat nöqtəsi olmaqla, o, 1997-ci ildə beynəlxalq müqavilənin ilk meyvəsini verdi. Bu, Azərbaycanın müstəqilliyindən sonra xarici investisiyalarla neft sənayesinin yenidən qurulmasının rəmzidir.",
    },
    {
      id: "azeri",
      name: "Azəri",
      nameAz: "Azəri",
      tagline: "ACG blokunun ən böyük dərin-su yatağı",
      color: "#3a1a1a",
      accentColor: "#dc2626",
      location: {
        lat: 40.27,
        lng: 50.67,
        description: "Çıraq ilə Günəşli arasında, ACG blokunun mərkəzi hissəsi",
        waterDepth: "120–170 m",
        distanceFromBaku: "~100 km",
      },
      keyStats: [
        { label: "Kəşf ili", value: "1987" },
        { label: "İlk hasilat", value: "2004" },
        { label: "Ümumi ehtiyat", value: "400+", unit: "mln ton" },
        { label: "Əsas dərinlik", value: "2.800–5.500", unit: "m" },
        { label: "Su dərinliyi", value: "120–170", unit: "m" },
        { label: "Platform sayı", value: "3 (Mərkəzi, Qərb, Şərq)" },
      ],
      geology: {
        formation: "Məhsuldar Qat — xüsusilə Balaxanı, Sabunçu, Suraxanı layları",
        lithology: "Qalın qumtaşı layları, az gil araqatları — yüksək keçiricilik",
        trapType: "Mürəkkəb antiklinal — qırışıq sistemi üzərində bir neçə rezervuar bloku",
        depth: "2.800–5.500 m",
        reservoirAge: "Orta-Üst Pliyosen",
        porosity: "20–30%",
        permeability: "200–1.500 mD",
      },
      history: [
        { year: 1987, event: "Kəşf", detail: "Sovet kəşfiyyat proqramı çərçivəsində aşkarlandı, lakin sovet dövrü inkişafı üçün texniki imkan olmadı" },
        { year: 1994, event: "ACG Müqaviləsi", detail: "Çıraq və Günəşlilə birlikdə 'Əsrin Müqaviləsi'nə daxil edildi" },
        { year: 2004, event: "Azəri Mərkəzi", detail: "Azəri blokunun ilk hissəsi — Mərkəzi Azəri platforması fəaliyyətə başladı" },
        { year: 2005, event: "Azəri Qərb", detail: "Qərb Azəri platforması istismara verildi; hasilat kəskin artdı" },
        { year: 2006, event: "Azəri Şərq", detail: "Şərq Azəri platforması ilə tam inkişaf tamamlandı; ümumi hasilat zirvəyə çatdı" },
        { year: 2023, event: "ACG genişləndirilməsi", detail: "Yeni PSA imzalandı — kontraktın müddəti 2050-yə uzadıldı, Azəri blokundan hasilat davam edir" },
      ],
      technical: {
        operator: "BP (baş operator)",
        partners: ["ACG konsorsiumu — ARDNŞ, ExxonMobil, MOL, Equinor, TPAO, Inpex, SOCAR"],
        platforms: "3 stasionar platforma: Azəri Mərkəzi, Azəri Qərb, Azəri Şərq",
        wells: "70+ aktiv istehsal və inyeksiya quyusu",
        contract: "ACG Hasilat Pay Bölgüsü Müqaviləsi",
        contractDate: "20 sentyabr 1994",
      },
      funFacts: [
        "Azəri bloku ACG-nin ən yüksək keyfiyyətli neftini istehsal edir — Azəri Light brendinin əsas mənbəyi məhz bu yataqdır.",
        "Üç platforma (Mərkəzi, Qərb, Şərq) birgə işləyərək ACG ümumi hasilatının 60%-dən çoxunu verir.",
        "Azəri Şərq platformasının qurulması zamanı Xəzərdə 250 metr dərinlikdə sualtı borukəməri döşəndi — o dövr üçün texniki rekord.",
        "Azəri nefti 'Azeri Light' brendiyle beynəlxalq bazarda satılır; bu brend yüksək keyfiyyəti ilə qiymətləndirilir.",
      ],
      significance: "Azəri bloku ACG sisteminin həcm baxımından ən böyük komponentidir. Üç platformalı inkişaf modeli Xəzər dənizinin dərin-su istismarında inqilab yaratdı və bu texniki yanaşma digər Xəzər yataqlarının inkişafına nümunə oldu.",
    },
    {
      id: "neft-dashlari",
      name: "Neft Daşları",
      nameAz: "Neft Daşları",
      tagline: "Dünyanın ilk açıq dəniz neft şəhəri",
      color: "#2a1a3a",
      accentColor: "#7c3aed",
      location: {
        lat: 40.23,
        lng: 51.02,
        description: "Bakıdan 110 km şərqdə, Xəzər dənizinin ortasında",
        waterDepth: "20–40 m",
        distanceFromBaku: "~110 km",
      },
      keyStats: [
        { label: "Kəşf ili", value: "1949" },
        { label: "İlk hasilat", value: "1949" },
        { label: "Trestlər uzunluğu", value: "200+", unit: "km" },
        { label: "Ərazisi", value: "~300", unit: "km²" },
        { label: "Pik əhali", value: "~5.000", unit: "işçi (1960s)" },
        { label: "Ümumi hasilat", value: "170+", unit: "mln ton" },
      ],
      geology: {
        formation: "Məhsuldar Qat — Balaxanı, Sabunçu layları; Eosen çöküntüləri",
        lithology: "Qumtaşı, konqlomerat, alevrolit; dayaz-dəniz çöküntüsü",
        trapType: "Struktural tələ — dayaz sualtı antiklinal",
        depth: "400–1.200 m (dayaz rezervuarlar)",
        reservoirAge: "Pliyosen + Eosen (çoxlaylı sistem)",
        porosity: "22–32%",
        permeability: "100–600 mD",
      },
      history: [
        { year: 1949, event: "Kəşf və ilk hasilat", detail: "14 noyabr 1949 — dənizdə ilk quyu vuruldu. Sovet geologu Ağa Kərimov bu yatağı tapdı." },
        { year: 1951, event: "Şəhərin salınması", detail: "Suüstü estakada (trestl) sistemi genişləndirildi; işçilər üçün yaşayış binaları tikildi" },
        { year: 1960, event: "Qızıl dövr", detail: "Neft Daşları öz əhalisi, mağazası, kinoteatrı, çörəkxanası olan tam şəhərə çevrildi; 5.000 nəfərə yaxın insan yaşayırdı" },
        { year: 1970, event: "Hasilatın zirvəsi", detail: "İllik 7–8 mln ton neft hasilatı. Sovet İttifaqında ən məhsuldar dəniz yatağı" },
        { year: 1991, event: "Müstəqillik dövrü", detail: "Sovet investisiyalarının dayandırılması; infrastruktur sürətlə köhnəldi" },
        { year: 2000, event: "Bərpa cəhdləri", detail: "ARDNŞ yatağın bir hissəsini bərpa etdi, yeni quyular qazıldı" },
        { year: 2024, event: "Miras statusu", detail: "Sənaye-tarixi abidəsi kimi qorunur; hasilat davam edir, lakin kiçik həcmdə" },
      ],
      technical: {
        operator: "ARDNŞ (tam dövlət nəzarəti)",
        partners: ["Sovet dövründə — Azərneft tresti", "Müstəqillikdən sonra ARDNŞ"],
        platforms: "200+ metal trestl (estakada) üzərində 2.000+ quyu başlığı",
        wells: "2.500+ quyu qazılıb (tarixi); ~300 aktiv",
        contract: "ARDNŞ birbaşa idarəetmə",
        contractDate: "1949-dan davam edir",
      },
      funFacts: [
        "Neft Daşları dünyada ilk açıq dəniz neft şəhəridir. Sovet dövründə orada çörəkxana, mağaza, kinoteatr, 10 mərtəbəli yaşayış binaları var idi.",
        "Dünyanın heç bir yerində bu həcmdə trestl (körpü) sistemi tikilməmişdir — 200 km-dən çox estakada dəniz üzərindədir.",
        "1960-cı illərdə şəhərdə limon ağacları belə becərilirdi — işçilərin ərzaq ehtiyacını ödəmək üçün.",
        "Neft Daşları SSRİ filminin çəkildiyi məkan olub; 'The World Is Not Enough' (Bond) filminin bir səhnəsi buradan ilhamla çəkilib.",
        "Şəhərin estakadaları zamanla köhnəldi: 100 km-dən çoxu artıq su altındadır, lakin qalanı hələ fəaliyyətdədir.",
      ],
      significance: "Neft Daşları yalnız bir neft yatağı deyil — insan iradəsinin simvoludur. 1949-cu ildə Sovet mühəndisləri açıq dənizdə şəhər tiktilər, dünyada ilk belə layihəni həyata keçirdilər. Bu yataq Azərbaycanın dəniz neft texnologiyasına verdiyini sübut etdi.",
    },
    {
      id: "shahdeniz",
      name: "Şahdəniz",
      nameAz: "Şahdəniz",
      tagline: "Xəzərin ən böyük qaz kondensatı yatağı",
      color: "#1a2a3a",
      accentColor: "#0891b2",
      location: {
        lat: 39.87,
        lng: 49.97,
        description: "Bakıdan 70 km cənub-şərqdə, Xəzərin cənub hissəsi",
        waterDepth: "50–800 m",
        distanceFromBaku: "~70 km",
      },
      keyStats: [
        { label: "Kəşf ili", value: "1999" },
        { label: "Mərhələ 1 başlangıcı", value: "2006" },
        { label: "Mərhələ 2 başlangıcı", value: "2018" },
        { label: "Qaz ehtiyatı", value: "1.2", unit: "trilyon m³" },
        { label: "Kondensat ehtiyatı", value: "240+", unit: "mln ton" },
        { label: "Maksimum su dərinliyi", value: "800", unit: "m" },
      ],
      geology: {
        formation: "Məhsuldar Qat alt hissəsi + Eosen çöküntüləri (Diyatomit)",
        lithology: "Dənəli qumtaşı, çaqıltaşı, turbidit çöküntüləri — dərin-dəniz fan sistemi",
        trapType: "Struktural-stratigrafik tələ — duzun hərəkəti ilə formalaşmış mürəkkəb antiklinal",
        depth: "5.500–7.000 m",
        reservoirAge: "Pliyosen + Eosen (ikiqatlı sistem)",
        porosity: "12–22%",
        permeability: "10–200 mD",
      },
      history: [
        { year: 1996, event: "PSA imzalandı", detail: "Şahdəniz üzrə Hasilat Pay Bölgüsü Müqaviləsi — BP və ARDNŞ başda olmaqla konsorsium yaradıldı" },
        { year: 1999, event: "Kəşf quyusu", detail: "SD-1X kəşfiyyat quyusu böyük qaz-kondensat yatağının mövcudluğunu təsdiqlədi" },
        { year: 2006, event: "Mərhələ 1", detail: "Şahdəniz-1 platforması ilə hasilat başladı; Cənubi Qafqaz boru kəməri (SCP) vasitəsilə Türkiyəyə qaz verildi" },
        { year: 2018, event: "Mərhələ 2 (SD2)", detail: "Tam Şahdəniz-2 layihəsi işə düşdü — TANAP və TAP boru kəmərləri vasitəsilə Avropaya qaz çatdırılması başladı" },
        { year: 2020, event: "Avropa qazı", detail: "TAP boru kəməri İtaliyanın Apuliya sahilinə çatdı — Azərbaycan qazı ilk dəfə Avropa evlərinə daxil oldu" },
        { year: 2030, event: "Hədəf", detail: "Şahdəniz-2 tam gücə çatacaq: ildə 16 mlrd m³ qaz Avropaya ixrac ediləcək" },
      ],
      technical: {
        operator: "BP (baş operator)",
        partners: [
          "BP (28.8%)",
          "ARDNŞ (16.7%)",
          "AzSD (SOCAR subsidiary, 10%)",
          "LUKOIL (10%)",
          "NIOC (10%)",
          "TotalEnergies (10%)",
          "TPAO (19%)",
        ],
        platforms: "1 yarım batıq platforma (SD1) + 1 stasionar platforma (SD2) + dənizaltı infrastruktur",
        wells: "26 istehsal quyusu (SD2 tam inkişafında)",
        contract: "Şahdəniz Hasilat Pay Bölgüsü Müqaviləsi",
        contractDate: "4 iyun 1996",
      },
      funFacts: [
        "Şahdəniz Avropanın enerji müstəqilliyinin açarıdır. TANAP–TAP boru kəməri sistemi vasitəsilə Azərbaycan qazı Türkiyə, Yunanıstan, Albaniya və İtaliyanı keçərək Avropaya çatır — 3.500 km.",
        "SD2 çərçivəsində dəniz dibinə 500 km-dən çox sualtı boru xətti çəkilib — Xəzərdə rekord.",
        "Yatağın qaz ehtiyatı 1.2 trilyon kubmetr — Azərbaycanın 300 ildən artıq qaz istifadəsini ödəyə biləcək həcmdə.",
        "Şahdəniz dünyanın ən dərin dəniz qaz yataqlarından biridir: bəzi rezervuarlar 7.000 metr dərinliyə çatır.",
        "2020-ci ildə ilk Azərbaycan qazı İtaliyanın Apuliya bölgəsindəki terminalda qəbul edildi — 'Cənub Qaz Dəhlizi'nin tarixi açılışı.",
      ],
      significance: "Şahdəniz təkcə Azərbaycan üçün deyil, Avropa üçün strateji yataqdır. Cənub Qaz Dəhlizi layihəsi (SGC) vasitəsilə Azərbaycan qazı Rusiya alternativinə çevrilir. Bu yataq ölkənin 21-ci əsrdəki enerji diplomatiyasının əsasını təşkil edir.",
    },
  ];