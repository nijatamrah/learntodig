"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GameState {
  budget: number;
  time: number;
  risk: number;
  rep: number;
  oil: number;
}

interface Choice {
  t: string;
  s: string;
  e: Partial<GameState> & { next?: number | null };
  next?: number | null;
}

interface Scene {
  ch: number;
  title: string;
  story: string;
  detail?: string;
  ev?: { t: string; m: string } | null;
  choices: Choice[];
  final?: boolean;
}

interface LeaderboardEntry {
  full_name: string;
  average_score: number;
  budget: number;
  production: number;
  completed_at: string;
}

const MODULE_NAME = "black_gold_simulation";

// ─── Constants ────────────────────────────────────────────────────────────────

const AC: Record<number, string> = {
  0: "#1D9E75", 1: "#378ADD", 2: "#7F77DD",
  3: "#BA7517", 4: "#D85A30", 5: "#639922", 6: "#888780",
};

const CHS = ["Exploration", "Appraisal", "Planning", "Drilling", "Completion", "Production", "Abandonment"];

const INITIAL_STATE: GameState = { budget: 100, time: 100, risk: 20, rep: 50, oil: 0 };

// ─── Scenes ───────────────────────────────────────────────────────────────────

const SCENES: Scene[] = [
  /* 0 */ {
    ch: 0, title: "Caspian Basin — Gün 1",
    story: "Sən yeni təyin olunmuş Exploration Geologist-sən. Şirkətin sənə $100M büdcə verib. Caspian hövzəsinin şimal-şərq kvadrantında — Blok 7. Masanda üç seçim var.",
    detail: "Regional geoloji xəritə göstərir: hövzədə Oligosen yaşlı turbidite çöküntüləri inkişaf edib. Analog sahələrdə uğurlu kəşflər var.",
    ev: null,
    choices: [
      { t: "3D Seysmik kəşfiyyat sifariş et", s: "6 ay, $8M — dəqiq struktur xəritəsi", e: { budget: -8, time: -15, risk: -12, oil: 8 }, next: 1 },
      { t: "Mövcud 2D seysmik yenidən işlə", s: "$1.5M, 2 ay — qeyri-dəqiq amma sürətli", e: { budget: -1.5, time: -5, risk: 6, oil: 3 }, next: 2 },
      { t: "Qonşu operatordan data al", s: "$3M — regional kontekst, analog quyu məlumatları", e: { budget: -3, time: -8, risk: -5, oil: 5 }, next: 3 },
    ],
  },
  /* 1 */ {
    ch: 0, title: "3D Seysmik — Nəticə",
    story: "3D seysmik nəticələr gəldi. Horst strukturunda 4km dərinlikdə güclü amplituda anomaliyası var — AVO analizi karbohidrat işarəsi göstərir. Amma bir problem aşkar oldu.",
    detail: "Struktur 2 bloka bölünür: Sol blok (38km²) — böyük, amma NW-SE istiqamətli normal fault-a yaxın. Sağ blok (18km²) — kiçik, structural closure daha aydın.",
    ev: { t: "ev-w", m: "Fault zone aşkar edildi — struktur iki bloka bölünür. Hansını seçirsən?" },
    choices: [
      { t: "Sol böyük blok — yüksək potensial", s: "Maks ehtiyat ~80Mbbl, amma fault riski var", e: { budget: -1, risk: 12, oil: 20 }, next: 4 },
      { t: "Sağ kiçik blok — təhlükəsiz", s: "~35Mbbl, struktural closure aydın", e: { budget: -1, risk: -8, oil: 12 }, next: 4 },
      { t: "Hər iki bloku pilot quyu ilə test et", s: "$6M əlavə, 3 ay — tam məlumat", e: { budget: -6, time: -10, risk: -5, oil: 18 }, next: 4 },
    ],
  },
  /* 2 */ {
    ch: 0, title: "2D Seysmik Analizi",
    story: "Köhnə 2D məlumatlar əldə işləndi. Bir struktur ehtimal edilir amma konturlar dumanlıdır — 2D-nin məhdudiyyəti. Qonşu şirkət bu zonada 3D çəkib.",
    detail: "Spec shooting: öz 3D seysmikini çəkmək $8M. Qonşudan data almaq $3M — eyni keyfiyyət. Ya da elə quyuya keç.",
    ev: { t: "ev-i", m: "Qonşu operator 3D dataset satmağa razıdır — $3M" },
    choices: [
      { t: "$3M ilə qonşunun 3D datasını al", s: "Optimal — ucuz, yüksək keyfiyyət", e: { budget: -3, risk: -10, oil: 15 }, next: 4 },
      { t: "Öz 3D seysmikini çək — $8M", s: "Tam nəzarət, daha uzun vaxt", e: { budget: -8, time: -12, risk: -14, oil: 18 }, next: 4 },
      { t: "2D ilə birbaşa quyuya keç", s: "Sürətli amma dry hole riski yüksəkdir", e: { budget: 0, risk: 18, oil: 4 }, next: 4 },
    ],
  },
  /* 3 */ {
    ch: 0, title: "Analog Data Analizi",
    story: "Qonşu bloklardan 4 analog quyu məlumatı analiz edildi. Formation xüsusiyyətləri: Porosity 18-22%, K ~50md, net/gross 0.65. Regional structure map üzərindən bir play fairway görünür.",
    detail: "Maraqlı kəşf: Analog A-4 quyusu əsas horizontdan 200m aşağıda ikinci bir pay zone-a rast gəlib. Bu zonada dual-target mümkündür.",
    ev: { t: "ev-s", m: "Deeper horizon şansı — +15% oil potensial, +$5M xərc" },
    choices: [
      { t: "Dual-target quyu planı", s: "Hər iki horizontu test et — $5M əlavə", e: { budget: -5, time: -6, oil: 22 }, next: 4 },
      { t: "Əsas horizona fokuslan", s: "Sadə plan, büdcə qorunur", e: { budget: 0, oil: 13 }, next: 4 },
      { t: "Əvvəlcə daha çox regional data topla", s: "2 ay gecikmə, risk azalır", e: { budget: -2, time: -8, risk: -8, oil: 16 }, next: 4 },
    ],
  },
  /* 4 */ {
    ch: 1, title: "Kəşfiyyat Quyusu — Planlaşdırma",
    story: "Exploration drilling proqramı təsdiqləndi. Well A-1 — vertical pilot quyu. Dərinlik: 4,200m TD. Offshore location, 150m su dərinliyi. Rig seçimi lazımdır.",
    detail: "Caspian-da mövcud rig-lər: 2 semi-sub, 3 jack-up. Market qızdığından dayrate yüksəkdir. Jack-up 150m su dərinliyinin limitindədir.",
    ev: null,
    choices: [
      { t: "Semi-submersible rig — $280K/gün", s: "HPHT capable, daha etibarlı offshore", e: { budget: -6, risk: -8 }, next: 5 },
      { t: "Jack-up rig — $160K/gün", s: "Ucuz, amma su dərinliyi limitinə yaxın", e: { budget: -4, risk: 6 }, next: 5 },
      { t: "Drillship — $320K/gün, ən müasir", s: "Ən bahalı, amma tam flexibility", e: { budget: -8, risk: -12, rep: 8 }, next: 5 },
    ],
  },
  /* 5 */ {
    ch: 1, title: "Well A-1 — Qazma Başlayır",
    story: "Gün 1, qazma başladı. 800m-də conductor casing yerləşdirildi. 1,600m-ə qədər irəliləmə yaxşıdır. Mud logger bildirir: cutting-lərdə shale dominantdır, lakin 1,800m-də rəng dəyişir.",
    detail: "LWD (Logging While Drilling) məlumatları real vaxt axışı verir. Gamma Ray azalır — potensial reservoir zonasına yaxınlaşırıq.",
    ev: { t: "ev-i", m: "1,800m: GR düşür, resistivity artır — reservoir yaxınlaşır" },
    choices: [
      { t: "Mud weight artır, ehtiyatlı davam et", s: "Risk azalır, ROP bir az düşür", e: { budget: -0.5, time: -3, risk: -8 }, next: 6 },
      { t: "ROP maksimuma çıxar, sürətlən", s: "Büdcə qənaəti, lakin formation damage riski", e: { budget: 1, time: 4, risk: 10 }, next: 6 },
      { t: "Sidewall core götür — formation analizi", s: "$200K, 2 gün dayanma — qiymətli məlumat", e: { budget: -0.2, time: -4, risk: -6, oil: 5 }, next: 6 },
    ],
  },
  /* 6 */ {
    ch: 1, title: "Gözlənilməz Təzyiq",
    story: "3,100m-də ani mud pit gain: 8 bbl. Kiçik influx var. Drill crew BOP-u bağlayıb gözləyir. Bu kick-ə çevrilə bilər. Qərar verməlisən.",
    detail: "Influx həcmi az — ehtimal ki, tight gas əlavəsi. Formations strength test göstərir frac gradient hələ kifayətdir. Shut-in casing pressure: 320 psi.",
    ev: { t: "ev-d", m: "Pit gain: 8 bbl! BOP bağlandı — kill prosedurunu seç" },
    choices: [
      { t: "Driller's Method — klassik kill", s: "Standart, etibarlı, 18 saat", e: { budget: -0.8, time: -6, risk: -15, rep: 5 }, next: 7 },
      { t: "Wait & Weight Method", s: "Daha sürətli, kill mud hazırla", e: { budget: -0.6, time: -4, risk: -12 }, next: 7 },
      { t: "U-tube balance — yüngül yanaşma", s: "Əgər influx azdırsa işləyir, risk var", e: { budget: -0.2, time: -2, risk: -5 }, next: 7 },
    ],
  },
  /* 7 */ {
    ch: 1, title: "DST — Reservoir Test",
    story: "TD: 4,180m. Wireline logging tamamlandı. Net pay 38m aşkar edildi. GR log aydın shale-sand ayrımı göstərir. Resistivity yüksək — karbohidrat dolu. İndi production test lazımdır.",
    detail: "DST (Drill Stem Test) real flow rate və reservoir pressure-u ölçər. $2M, 48 saat. Alternativ: yalnız log ilə P50 hesabla.",
    ev: null,
    choices: [
      { t: "Tam DST — 48 saat flow test", s: "$2M — real data, bankalar üçün etibarlı", e: { budget: -2, time: -8, risk: -10, oil: 15, rep: 12 }, next: 8 },
      { t: "Mini DST — 12 saat", s: "$800K — məhdud data, tez qurtarır", e: { budget: -0.8, time: -4, risk: -5, oil: 8 }, next: 8 },
      { t: "Yalnız log analizi — DST-siz keç", s: "Sıfır test xərci, ehtimallar üzərindən get", e: { budget: 0, risk: 12, oil: 5 }, next: 8 },
    ],
  },
  /* 8 */ {
    ch: 1, title: "Kommersial Kəşf!",
    story: "DST nəticəsi gəldi: 3,200 bbl/gün flow rate, 3,800 psi BHP. Bu kommersial kəşfdir! P50 ehtiyat: 48 Mbbl. CEO sənə email göndərdi. Növbəti addım: Field Development Plan.",
    detail: "FDP seçimləri: Aqressiv (12 quyu, 2 il, $180M capex) vs Fazyalı (əvvəl 4 quyu, sonra qiymətləndir, $65M ilk faza).",
    ev: { t: "ev-s", m: "Kommersial kəşf: 3,200 bbl/gün — P50: 48 Mbbl" },
    choices: [
      { t: "Aqressiv FDP — 12 quyu, tam inkişaf", s: "Yüksək NPV, yüksək capex riski", e: { budget: -5, time: -10, rep: 15, oil: 25 }, next: 9 },
      { t: "Fazyalı plan — 4 quyu, sonra qiymətləndir", s: "Konservativ, düzgün data ilə irəli get", e: { budget: -2, time: -5, rep: 8, oil: 12 }, next: 9 },
      { t: "Sahəni satışa çıxar — farm-out", s: "Riski paylaş, üstünlüyü paylaş", e: { budget: 15, rep: 5, oil: -10 }, next: 9 },
    ],
  },
  /* 9 */ {
    ch: 2, title: "Quyu Dizaynı — Casing Program",
    story: "FDP təsdiqləndi. 4 development quyusu planlanır. Hər quyu üçün casing program seçilməlidir. HPHT zona: 180°C, 8,500 psi. Bu kritik qərardır.",
    detail: "HPHT şəraitdə material seçimi həyati önəm daşıyır: 13Cr alloy steel vs CRA (Corrosion Resistant Alloy). CRA 2x bahadır, 3x davamlıdır.",
    ev: null,
    choices: [
      { t: "5-string casing, CRA material", s: "$4M/quyu — maksimum təhlükəsizlik", e: { budget: -4, risk: -18, rep: 10 }, next: 10 },
      { t: "4-string standart design, 13Cr", s: "$2.5M/quyu — sektoral norm", e: { budget: -2.5, risk: -8 }, next: 10 },
      { t: "3-string lean design — büdcə qənaəti", s: "$1.5M/quyu — HPHT-da risklidir", e: { budget: 1, risk: 20 }, next: 10 },
    ],
  },
  /* 10 */ {
    ch: 2, title: "Mud Program Seçimi",
    story: "Qazma maye proqramı seçilməlidir. Hövzədə H2S qazı riski var — sour service şərtlər. Mud type seçimi həm əməliyyat, həm ətraf mühit baxımından önəmlidir.",
    detail: "OBM (Oil-Based Mud): H2S üçün ən yaxşı, amma offshore-da tullantı problemi var. WBM (Water-Based): ətraf mühitə dost, lakin H2S-ə davamlılıq zəifdir. SBM (Synthetic): optimal, bahalı.",
    ev: { t: "ev-w", m: "H2S riski: sahədə sour service şərtlər mövcuddur" },
    choices: [
      { t: "SBM — Synthetic Based Mud", s: "Optimal performans, $1.2M əlavə", e: { budget: -1.2, risk: -12, rep: 5 }, next: 11 },
      { t: "OBM — Oil Based Mud", s: "Güclü H2S davamlılıq, tullantı məsələsi", e: { budget: -0.8, risk: -8 }, next: 11 },
      { t: "WBM + H2S inhibitor", s: "Ucuz, amma limitation var", e: { budget: -0.3, risk: 8 }, next: 11 },
    ],
  },
  /* 11 */ {
    ch: 2, title: "Wellhead və Christmas Tree",
    story: "Subsea wellhead seçimi lazımdır. Offshore, 150m su dərinliyi. Subsea christmas tree uzunmüddətli etibarlılıq tələb edir — 25 il ömür.",
    detail: "Cameron vs TechnipFMC tender gəldi. Cameron: $3.2M, 24 həftə delivery. TechnipFMC: $2.8M, 32 həftə delivery. Vaxt vs xərc trade-off.",
    ev: { t: "ev-i", m: "Tender nəticəsi: iki vendor müxtəlif qiymət/vaxt təklif edir" },
    choices: [
      { t: "Cameron — $3.2M, 24 həftə", s: "Daha sürətli delivery, premium qiymət", e: { budget: -3.2, time: -8 }, next: 12 },
      { t: "TechnipFMC — $2.8M, 32 həftə", s: "Ucuz, amma 8 həftə gecikmə", e: { budget: -2.8, time: -14 }, next: 12 },
      { t: "Rebid et — daha yaxşı şərt ax", s: "1 ay gecikmə, potensial $500K qənaəti", e: { budget: -0.1, time: -6, risk: 3 }, next: 12 },
    ],
  },
  /* 12 */ {
    ch: 3, title: "Development Drilling — Quyu #1",
    story: "Development quyu #1 başlayır. BHA: PDC bit 12.25\", MWD/LWD paketi, rotary steerable system. Planlaşdırılan quyu: S-shaped profile, KOP 500m.",
    detail: "Directional drilling: KOP 500m-də. Build rate: 3°/30m. Target: subsea tree-dən 800m offset, reservoir zonasında horizontal section 500m.",
    ev: null,
    choices: [
      { t: "Rotary Steerable System (RSS)", s: "$800K/quyu — dəqiq, sürətli, az NPT", e: { budget: -0.8, time: 6, risk: -10 }, next: 13 },
      { t: "Conventional motor + MWD", s: "$400K/quyu — etibarlı, amma daha yavaş", e: { budget: -0.4, time: -2, risk: -4 }, next: 13 },
      { t: "Rotary drilling — sadə profil", s: "Ən ucuz, amma deviation imkanı məhdud", e: { budget: -0.2, risk: 5 }, next: 13 },
    ],
  },
  /* 13 */ {
    ch: 3, title: "Stuck Pipe — Kriz!",
    story: "2,800m-də drill string stuck oldu. Differential sticking: yüksək mud overbalance formation-a drill collar-ı yapışdırıb. Weight indicator: 40,000 lbs overpull. Vaxt = pul.",
    detail: "Differential sticking mexanizmi: overbalance mud filtrate formation-a sızır, mud cake qalınlaşır, drill collar yapışır. Spotting fluid ən effektiv müalicədir.",
    ev: { t: "ev-d", m: "STUCK PIPE! Hər saat $280K — tez qərar ver!" },
    choices: [
      { t: "Diesel spotting fluid vur", s: "6-12 saat, $250K material — ən effektiv", e: { budget: -0.25, time: -5, risk: -15 }, next: 14 },
      { t: "Jar ilə mexaniki azad et", s: "Sürətli cəhd, string qırılma riski var", e: { budget: 0, time: -2, risk: 5 }, next: 14 },
      { t: "Back-off və fish — son çarə", s: "$1.5M, 5 gün, amma string xilas olur", e: { budget: -1.5, time: -12 }, next: 14 },
    ],
  },
  /* 14 */ {
    ch: 3, title: "Quyu #1 — TD Çatdı",
    story: "Problemi həll etdin! Qazma davam etdi. TD: 4,512m. MWD məlumatları: horizontal section boyunca GR log stabil — xalis sand. Əla nəticə.",
    detail: "LWD resistivity: 45-120 ohm.m arası — yüksək karbohidrat saturasiyası. Net pay horizontal seksiyada: 380m. Bu gözləntilərdən 15% yüksəkdir.",
    ev: { t: "ev-s", m: "TD: 4,512m. Horizontal net pay: 380m — gözləntilərdən yaxşı!" },
    choices: [
      { t: "Tam wireline logging suite", s: "24 saat, $600K — tam formation profili", e: { budget: -0.6, time: -5, oil: 10, risk: -8 }, next: 15 },
      { t: "LWD ilə kifayətlən", s: "Artıq məlumat var, sürətlə completion-a keç", e: { budget: 0, time: 3, oil: 5 }, next: 15 },
      { t: "Core götür — reservoir analizi", s: "$400K, 3 gün — lab üçün fiziki nümunə", e: { budget: -0.4, time: -6, oil: 8, rep: 8 }, next: 15 },
    ],
  },
  /* 15 */ {
    ch: 4, title: "Completion Dizaynı",
    story: "Quyu #1 completion-a hazırdır. Reservoir heterogeneity göstərir ki, 3 fərqli zona var. Completion tipi seçilməlidir.",
    detail: "Zona A (yuxarı 80m): K=120md. Zona B (orta 180m): K=55md — əsas zona. Zona C (aşağı 120m): K=15md, water contact yaxın (40m yuxarı).",
    ev: null,
    choices: [
      { t: "ICD completion — smart nəzarət", s: "Hər zona ayrı idarə edilir, $1.8M", e: { budget: -1.8, risk: -12, oil: 18 }, next: 16 },
      { t: "Openhole gravel pack", s: "Zona B+A target, $1.2M", e: { budget: -1.2, risk: -8, oil: 13 }, next: 16 },
      { t: "Cased hole perf — seçici perforasiya", s: "$800K — Zona A+B, C-dən uzaq dur", e: { budget: -0.8, risk: -5, oil: 10 }, next: 16 },
    ],
  },
  /* 16 */ {
    ch: 4, title: "Hidravlik Stimulyasiya",
    story: "Zona B-nin permeabilitəsi 55md — orta. İstehsal rəqəmlərini artırmaq üçün stimulyasiya düşünülməlidir. Carbonate laylarda acid effektlidir.",
    detail: "Matrix acidizing: 28% HCl, wormhole yaradır, 2-5x perm artımı. Fracking: daha aqressiv, daha böyük stimulyasiya radiusu, amma HPHT-da riskdir.",
    ev: { t: "ev-w", m: "Offshore fracking üçün regulator icazəsi tələb olunur — 3 ay gözləmə" },
    choices: [
      { t: "Matrix acid stimulation", s: "$1.5M, 3 gün, regulator problemi yoxdur", e: { budget: -1.5, risk: -5, oil: 15 }, next: 17 },
      { t: "Fracking üçün icazə al — 3 ay gözlə", s: "Maksimum stimulyasiya, lakin gecikmə", e: { budget: -0.5, time: -12, oil: 22 }, next: 17 },
      { t: "Stimulyasiyasız natural flow", s: "Sıfır stimulyasiya xərci", e: { budget: 0, oil: 5 }, next: 17 },
    ],
  },
  /* 17 */ {
    ch: 5, title: "First Oil!",
    story: "Quyu #1 hasilata verildi! İlk 30 gün: ortalama 2,400 bbl/gün. IPR analizi: maks potensial 3,100 bbl/gün. Reservoir pressure: 3,650 psi — natural flow mümkün.",
    detail: "Nodal analysis göstərir: tubing pressure düşürsə ESP ilə hasilatı 3,100 bbl/gün-ə çatdırmaq olar. Natural flow 2,400 bbl/gün-ü saxlayacaq — bir müddət.",
    ev: { t: "ev-s", m: "First Oil! Şirkətin səhm qiyməti 18% artdı. Quyular #2,3,4 davam edir." },
    choices: [
      { t: "ESP qur — hasilatı maximize et", s: "$650K, 3,100 bbl/gün potential", e: { budget: -0.65, oil: 20, risk: -5 }, next: 18 },
      { t: "Natural flow ilə davam et", s: "Sıfır əlavə xərc, 2,400 bbl/gün", e: { budget: 0, oil: 12, risk: 5 }, next: 18 },
      { t: "Gas lift tətbiq et", s: "$400K infra, 2,800 bbl/gün", e: { budget: -0.4, oil: 15, risk: -3 }, next: 18 },
    ],
  },
  /* 18 */ {
    ch: 5, title: "Hasilat Optimizasiyası",
    story: "6 ay sonra. 4 quyu hasilatdadır. Sahənin toplam hasilatı: 8,200 bbl/gün. Lakin Quyu #3 water cut 22%-ə çatıb. Müdaxilə lazımdır.",
    detail: "Water breakthrough: Zona C-dən su gəlməyə başlayıb. Conformance treatment lazımdır — ya quyu shut-in, ya da gel/polymer sıxışdırma.",
    ev: { t: "ev-w", m: "Quyu #3: water cut 22% — conformance problemi" },
    choices: [
      { t: "Gel treatment — Zona C izole et", s: "$800K, su gəlişini durdurur", e: { budget: -0.8, oil: 8, risk: -8 }, next: 19 },
      { t: "Quyu #3-ü bağla, digərlərinə fokuslan", s: "Hasilat düşür amma su problemi aradan qalxır", e: { budget: 0, oil: -6, risk: -5 }, next: 19 },
      { t: "Water injection planla — pressure support", s: "$3M infra, uzunmüddətli recovery artır", e: { budget: -3, oil: 15, time: -6 }, next: 19 },
    ],
  },
  /* 19 */ {
    ch: 5, title: "Decline Curve — 3 İl Sonra",
    story: "3 il keçdi. DCA (Decline Curve Analysis): əsas decline rate 18%/il. Sahənin cari hasilatı: 5,100 bbl/gün. Infill drilling məsələsi gündəmə gəldi.",
    detail: "Seismik yenidən işləndi: 2 əlavə infill quyu yeri aşkar edildi. Hər quyu: $22M, 14 ay geri dönüş. Alternativ: EOR proqramı başlat.",
    ev: { t: "ev-i", m: "2 infill quyu yeri aşkar edildi — drilling qərarı lazımdır" },
    choices: [
      { t: "2 infill quyu qaz", s: "$44M capex, recovery factor 28%→40%", e: { budget: -8, time: -10, oil: 30, rep: 10 }, next: 20 },
      { t: "Water flooding EOR", s: "$12M, pressure support, +8% recovery", e: { budget: -3, time: -5, oil: 18 }, next: 20 },
      { t: "Sahəni economic limit-ə kimi idarə et", s: "Minimum xərc, declining production", e: { budget: 2, oil: -8 }, next: 20 },
    ],
  },
  /* 20 */ {
    ch: 6, title: "Economic Limit Yaxınlaşır",
    story: "8 il sonra. Hasilat: 1,800 bbl/gün. Opex: $28/bbl. Neft qiyməti: $72/bbl. Margin azalır. Regulator abandonment planı tələb edir.",
    detail: "P&A xərci: $18M tam abandonment. Alternativ: sahənin bir hissəsini kiçik bir independentə satmaq.",
    ev: { t: "ev-w", m: "Regulator deadline: 18 ay ərzində P&A planı təqdim et" },
    choices: [
      { t: "Sahəni sat — partial divestiture", s: "$8M gəlir, abandonment öhdəliyi alıcıya keçir", e: { budget: 8, rep: -5, oil: -5 }, next: 21 },
      { t: "P&A hazırlıq başlat", s: "Planlı, hüquqi, tam compliant", e: { budget: -1, rep: 10 }, next: 21 },
      { t: "Hasilatı daha 2 il uzat — EOR cəhdi", s: "Risk: regulator cəzası", e: { budget: -2, risk: 15, oil: 8 }, next: 21 },
    ],
  },
  /* 21 */ {
    ch: 6, title: "P&A — Plug & Abandon",
    story: "P&A operasiyası başladı. 4 quyu abandoned edilməlidir. Subsea wellhead-lər kəsilməlidir. Ətraf mühit monitorinqi 5 il davam edəcək.",
    detail: "API standartı: minimum 2 plug. Azerbaijan regulator: 3 plug + wellhead removal. Sən hansını seçirsən?",
    ev: { t: "ev-i", m: "P&A standartları: lokal regulator 3 plug + wellhead removal tələb edir" },
    choices: [
      { t: "Tam P&A — 3 plug + wellhead removal", s: "$18M, tam compliant, reputasiya qorunur", e: { budget: -5, risk: -25, rep: 20 }, next: 22 },
      { t: "2 plug — minimum standart", s: "$12M, regulator qəbul edə bilər... ya bilməz", e: { budget: -3, risk: 10, rep: -10 }, next: 22 },
      { t: "Ən yüksək standart — 4 plug + monitoring", s: "$24M, best practice, industry example", e: { budget: -7, risk: -30, rep: 30 }, next: 22 },
    ],
  },
  /* 22 */ {
    ch: 6, title: "Layihə Tamamlandı",
    story: "10 il ərzində Blok 7-ni exploration-dan abandonment-ə kimi idarə etdin. Bu neft-qaz sənayesinin tam həyat dövrüdür. Hər qərarın nəticəsi aşağıda görünür.",
    detail: "Sən Exploration Geologist kimi başladın, layihənin sonunda tam Reservoir Management Engineer kimi çıxdın. Real dünyada bu bir karyeranın özüdür.",
    ev: null,
    choices: [],
    final: true,
  },
];

// ─── Score ─────────────────────────────────────────────────────────────────────

function calcScore(s: GameState) {
  return Math.round(Math.max(0, s.budget * 0.35 + s.oil * 1.1 + s.rep * 0.5 + Math.max(0, 100 - s.risk) * 0.4));
}
function getOutcome(score: number) {
  if (score >= 155) return "🏆 Legendary — Caspian Kəşfçisi";
  if (score >= 120) return "⭐ Senior Expert Engineer";
  if (score >= 90) return "✅ Competent Engineer";
  if (score >= 60) return "📈 Junior Engineer";
  return "📚 Trainee — Yenidən cəhd et";
}

// Normallaşdırılmış (0-100, "yüksək = yaxşı") dəyərlər — DB-yə bunlar yazılır
function normalizedStats(s: GameState) {
  return {
    budget_n: Math.max(0, Math.min(100, s.budget)),
    time_n: Math.max(0, Math.min(100, s.time)),
    risk_n: Math.max(0, Math.min(100, 100 - s.risk)), // risk əksinədir: aşağı risk = yaxşı
    rep_n: Math.max(0, Math.min(100, s.rep)),
    production_n: Math.max(0, Math.min(100, s.oil * 1.5)),
  };
}

// ─── Canvas Drawing ────────────────────────────────────────────────────────────

function drawScene(canvas: HTMLCanvasElement, ch: number) {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);

  if (ch === 0) {
    // EXPLORATION — dəniz, seysmik, gəmi
    ctx.fillStyle = "#060d18"; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.2 + 0.3 * (i % 3) / 3})`;
      ctx.fillRect((i * 137.5) % W, (i * 97.3) % 120, 1, 1);
    }
    ctx.fillStyle = "#0a1f3a"; ctx.fillRect(0, 120, W, 180);
    for (let w = 0; w < 5; w++) {
      ctx.strokeStyle = `rgba(29,158,117,${0.08 + w * 0.05})`; ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 3) {
        const y = 130 + w * 22 + Math.sin(x * 0.025 + w) * 7;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    [{ y: 215, c: "#071220" }, { y: 235, c: "#0a1a08" }, { y: 253, c: "#12100a" }, { y: 270, c: "#0a0f18" }]
      .forEach(l => { ctx.fillStyle = l.c; ctx.fillRect(0, l.y, W, 30); });
    for (let p = 0; p < 3; p++) {
      const px = 150 + p * 160;
      ctx.strokeStyle = `rgba(55,138,221,${0.15 + p * 0.08})`; ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath(); ctx.arc(px, 100, 20 + i * 18, Math.PI * 0.3, Math.PI * 0.7); ctx.stroke();
      }
    }
    ctx.fillStyle = "#112240"; ctx.fillRect(W / 2 - 60, 112, 120, 20);
    ctx.fillStyle = "#0d1a30"; ctx.fillRect(W / 2 - 35, 96, 28, 18);
    ctx.strokeStyle = "#2a4a6a"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(W / 2 - 22, 112); ctx.lineTo(W / 2 - 10, 82); ctx.lineTo(W / 2 + 2, 112); ctx.stroke();
    ctx.fillStyle = "rgba(29,158,117,0.85)"; ctx.font = "500 12px sans-serif";
    ctx.fillText("Seysmik kəşfiyyat — Blok 7", 14, 22);
    ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.font = "10px sans-serif";
    ctx.fillText("Su dərinliyi: 150m  |  Hədəf: 4,000m", 14, 38);
    ctx.fillStyle = "rgba(6,13,24,0.8)"; ctx.fillRect(W - 170, 8, 158, 58);
    ctx.strokeStyle = "rgba(29,158,117,0.3)"; ctx.lineWidth = 0.5; ctx.strokeRect(W - 170, 8, 158, 58);
    ctx.fillStyle = "rgba(29,158,117,0.8)"; ctx.font = "10px sans-serif"; ctx.fillText("AVO anomaliya", W - 162, 26);
    ctx.fillStyle = "#EF9F27"; ctx.font = "500 14px sans-serif"; ctx.fillText("Karbohidrat işarəsi", W - 162, 46);
    ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.font = "9px sans-serif"; ctx.fillText("Confidence: 72%", W - 162, 60);

  } else if (ch === 1) {
    // APPRAISAL — wireline log
    ctx.fillStyle = "#050810"; ctx.fillRect(0, 0, W, H);
    const flayers = [
      { y: 0, h: 60, c: "#0a1208", label: "Shale" },
      { y: 60, h: 50, c: "#14100a", label: "Sandstone" },
      { y: 110, h: 40, c: "#081018", label: "Carbonate" },
      { y: 150, h: 80, c: "#0e1808", label: "Target reservoir" },
      { y: 230, h: 40, c: "#0a0a12", label: "Tight shale" },
      { y: 270, h: 30, c: "#100808", label: "Basement" },
    ];
    flayers.forEach(l => {
      ctx.fillStyle = l.c; ctx.fillRect(0, l.y, 240, l.h);
      ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 0.5;
      ctx.strokeRect(0, l.y, 240, l.h);
      ctx.fillStyle = l.y === 150 ? "rgba(29,158,117,0.7)" : "rgba(255,255,255,0.25)";
      ctx.font = l.y === 150 ? "500 10px sans-serif" : "10px sans-serif";
      ctx.fillText(l.label, 6, l.y + l.h / 2 + 4);
    });
    ctx.fillStyle = "#2a2a2a"; ctx.fillRect(240, 0, 18, 300);
    ctx.fillStyle = "#378ADD"; ctx.fillRect(247, 0, 4, 300);
    ctx.strokeStyle = "rgba(29,158,117,0.9)"; ctx.lineWidth = 1.5; ctx.beginPath();
    for (let y = 0; y < 300; y += 2) {
      const base = flayers.find(l => y >= l.y && y < l.y + l.h);
      const bv = base?.y === 150 ? 20 : base?.y === 60 ? 65 : base?.y === 110 ? 40 : 80;
      const x = 280 + (bv + Math.sin(y * 0.3) * 8 + Math.sin(y * 0.07) * 15) * 0.5;
      y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = "rgba(186,117,23,0.9)"; ctx.lineWidth = 1.5; ctx.beginPath();
    for (let y = 0; y < 300; y += 2) {
      const base = flayers.find(l => y >= l.y && y < l.y + l.h);
      const bv = base?.y === 150 ? 180 : base?.y === 60 ? 25 : base?.y === 110 ? 60 : 15;
      const x = 380 + (bv + Math.sin(y * 0.2) * 10) * 0.35;
      y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = "rgba(29,158,117,0.06)"; ctx.fillRect(258, 150, W - 258, 80);
    ctx.strokeStyle = "rgba(29,158,117,0.4)"; ctx.lineWidth = 0.5; ctx.setLineDash([4, 3]);
    ctx.strokeRect(258, 150, W - 258, 80); ctx.setLineDash([]);
    ctx.fillStyle = "rgba(5,8,16,0.9)"; ctx.fillRect(258, 0, W - 258, 38);
    [[280, "#1D9E75", "GR"], [330, "#BA7517", "RT"], [385, "rgba(127,119,221,0.7)", "NPHI"]].forEach(([x, c, label]) => {
      ctx.fillStyle = c as string; ctx.fillRect(x as number, 12, 18, 3);
      ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "9px sans-serif";
      ctx.fillText(label as string, (x as number) + 22, 17);
    });
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "10px sans-serif";
    ctx.fillText("Well A-1  |  4,180m TD  |  Net pay: 38m", 14, 290);

  } else if (ch === 2) {
    // PLANNING — casing schematic
    ctx.fillStyle = "#080810"; ctx.fillRect(0, 0, W, H);
    const depths = [0, 500, 1000, 1500, 2000, 2800, 3500, 4200];
    ctx.textAlign = "right";
    depths.forEach((d, i) => {
      const y = 10 + i * (280 / depths.length);
      ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 0.5; ctx.setLineDash([3, 4]);
      ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(W - 20, y); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = "rgba(255,255,255,0.22)"; ctx.font = "9px sans-serif";
      ctx.fillText(d + "m", 44, y + 4);
    });
    ctx.textAlign = "left";
    ["#101a10", "#1a1008", "#080c18", "#101a08"].forEach((c, i) => {
      ctx.fillStyle = c; ctx.fillRect(50, 10 + i * 72, W - 70, 72);
    });
    const casings = [
      { top: 0, bot: 80, w: 88, col: "#4a4a5a", label: '30" Conductor' },
      { top: 0, bot: 140, w: 68, col: "#3a4a5a", label: '20" Surface' },
      { top: 0, bot: 210, w: 50, col: "#2a3a4a", label: '13 3/8" Intermed.' },
      { top: 0, bot: 270, w: 36, col: "#1a3a2a", label: '9 5/8" Production' },
      { top: 210, bot: 290, w: 24, col: "#1D9E75", label: '7" Liner' },
    ];
    casings.forEach(c => {
      const cx = W / 2;
      const y1 = 10 + c.top * (280 / 4200);
      const y2 = 10 + c.bot * (280 / 4200);
      ctx.fillStyle = c.col;
      ctx.fillRect(cx - c.w / 2, y1, 5, y2 - y1);
      ctx.fillRect(cx + c.w / 2 - 5, y1, 5, y2 - y1);
      ctx.fillStyle = c.col + "80"; ctx.fillRect(cx - c.w / 2, y2 - 4, c.w, 4);
      ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 0.5; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(cx + c.w / 2 + 5, y2); ctx.lineTo(cx + c.w / 2 + 50, y2); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = "rgba(255,255,255,0.45)"; ctx.font = "10px sans-serif";
      ctx.fillText(c.label, cx + c.w / 2 + 54, y2 + 4);
    });
    ctx.fillStyle = "#BA7517"; ctx.beginPath(); ctx.arc(W / 2, 292, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(186,117,23,0.9)"; ctx.font = "500 12px sans-serif";
    ctx.fillText("Casing design — HPHT 5-string", 14, 22);
    ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.font = "10px sans-serif";
    ctx.fillText("TD: 4,512m  |  185°C / 9,200 psi", 14, 38);

  } else if (ch === 3) {
    // DRILLING — rig, parametrlər
    ctx.fillStyle = "#060d06"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#0a140a"; ctx.fillRect(0, 0, W, 140);
    ctx.fillStyle = "#0d1a0d"; ctx.fillRect(0, 140, W, 160);
    [{ y: 140, c: "#0e1a0e" }, { y: 185, c: "#141a0a" }, { y: 225, c: "#0a1014" }, { y: 265, c: "#101a08" }]
      .forEach(l => { ctx.fillStyle = l.c; ctx.fillRect(0, l.y, W, 42); });
    ctx.strokeStyle = "#2a3a2a"; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(W / 2 - 55, 140); ctx.lineTo(W / 2, 12); ctx.lineTo(W / 2 + 55, 140); ctx.stroke();
    for (let i = 1; i < 5; i++) {
      const y = 140 - i * 26; const hw = 55 * (i / 5);
      ctx.beginPath(); ctx.moveTo(W / 2 - hw, y); ctx.lineTo(W / 2 + hw, y); ctx.stroke();
    }
    ctx.fillStyle = "#1a2a1a"; ctx.fillRect(W / 2 - 65, 136, 130, 10);
    ctx.fillStyle = "#2a3a2a"; ctx.fillRect(W / 2 - 10, 130, 20, 10);
    ctx.fillStyle = "#5a5a5a"; ctx.fillRect(W / 2 - 3, 146, 6, 154);
    ctx.fillStyle = "#4a3a1a"; ctx.fillRect(W / 2 - 5, 272, 10, 18);
    ctx.fillStyle = "#BA7517";
    ctx.beginPath(); ctx.moveTo(W / 2 - 7, 290); ctx.lineTo(W / 2 + 7, 290); ctx.lineTo(W / 2, 300); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "rgba(29,158,117,0.35)"; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(W / 2 - 60, 140); ctx.lineTo(W / 2 - 95, 185); ctx.lineTo(W / 2 - 95, 300); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#1a2a1a"; ctx.fillRect(W / 2 - 130, 175, 38, 32);
    ctx.fillStyle = "rgba(29,158,117,0.5)"; ctx.font = "8px sans-serif"; ctx.fillText("Mud pump", W / 2 - 128, 218);
    ctx.fillStyle = "rgba(6,13,6,0.88)"; ctx.fillRect(8, 8, 145, 80);
    ctx.strokeStyle = "rgba(186,117,23,0.3)"; ctx.lineWidth = 0.5; ctx.strokeRect(8, 8, 145, 80);
    ctx.fillStyle = "rgba(186,117,23,0.8)"; ctx.font = "500 10px sans-serif"; ctx.fillText("DRILLING PARAMS", 14, 24);
    [["ROP", "24 m/hr", "#1D9E75"], ["WOB", "18 klbf", "#EF9F27"], ["RPM", "120", "#378ADD"], ["Depth", "2,048m", "#fff"]]
      .forEach(([l, v, c], i) => {
        ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "9px sans-serif"; ctx.fillText(l, 14, 38 + i * 13);
        ctx.fillStyle = c; ctx.font = "500 10px sans-serif"; ctx.fillText(v, 80, 38 + i * 13);
      });
    ctx.fillStyle = "rgba(6,13,6,0.88)"; ctx.fillRect(W - 155, 8, 143, 65);
    ctx.strokeStyle = "rgba(226,75,74,0.3)"; ctx.lineWidth = 0.5; ctx.strokeRect(W - 155, 8, 143, 65);
    ctx.fillStyle = "rgba(226,75,74,0.8)"; ctx.font = "500 10px sans-serif"; ctx.fillText("PORE PRESSURE", W - 149, 24);
    ctx.fillStyle = "#E24B4A"; ctx.font = "500 20px sans-serif"; ctx.fillText("4,820 psi", W - 149, 50);
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "9px sans-serif"; ctx.fillText("↑ Rising", W - 149, 66);

  } else if (ch === 4) {
    // COMPLETION — perforasiya
    ctx.fillStyle = "#060608"; ctx.fillRect(0, 0, W, H);
    [{ y: 0, h: 100, c: "#0a0a0e" }, { y: 100, h: 70, c: "#0e100a" }, { y: 170, h: 80, c: "#0e120a" }, { y: 250, h: 50, c: "#080c10" }]
      .forEach(z => { ctx.fillStyle = z.c; ctx.fillRect(0, z.y, W, z.h); });
    ctx.fillStyle = "rgba(29,158,117,0.4)"; ctx.font = "500 10px sans-serif"; ctx.fillText("Zona B — əsas target", 10, 185);
    ctx.fillStyle = "rgba(255,255,255,0.2)"; ctx.font = "9px sans-serif"; ctx.fillText("Water contact risk", 10, 262);
    ctx.fillStyle = "#383838"; ctx.fillRect(W / 2 - 22, 0, 10, 300); ctx.fillRect(W / 2 + 12, 0, 10, 300);
    ctx.fillStyle = "#4a4a4a"; ctx.fillRect(W / 2 - 12, 0, 24, 100);
    ctx.fillStyle = "#2a2a22"; ctx.fillRect(W / 2 - 35, 0, 13, 300); ctx.fillRect(W / 2 + 22, 0, 13, 300);
    for (let i = 0; i < 7; i++) {
      const py = 175 + i * 13;
      ctx.strokeStyle = "#EF9F27"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(W / 2 - 12, py); ctx.lineTo(W / 2 - 55, py - 8 + (i % 2) * 16); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(W / 2 + 12, py); ctx.lineTo(W / 2 + 55, py - 8 + (i % 2) * 16); ctx.stroke();
      ctx.fillStyle = "rgba(239,159,39,0.35)";
      ctx.beginPath(); ctx.arc(W / 2 - 55, py - 8 + (i % 2) * 16, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(W / 2 + 55, py - 8 + (i % 2) * 16, 4, 0, Math.PI * 2); ctx.fill();
    }
    for (let r = 15; r < 120; r += 18) {
      ctx.strokeStyle = `rgba(186,117,23,${Math.max(0.02, 0.12 - r * 0.0008)})`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(W / 2, 205, r, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.fillStyle = "#1D9E75"; ctx.fillRect(W / 2 - 5, 0, 10, 300);
    ctx.fillStyle = "#3a3a3a"; ctx.fillRect(W / 2 - 22, 0, 44, 20);
    ctx.fillStyle = "rgba(6,6,8,0.85)"; ctx.fillRect(W - 172, 8, 160, 70);
    ctx.fillStyle = "rgba(29,158,117,0.8)"; ctx.font = "500 10px sans-serif"; ctx.fillText("COMPLETION STATUS", W - 164, 24);
    [["Perf interval", "Zona A+B — 180m"], ["Stimulation", "Matrix acid done"], ["ICD installed", "3 zones active"], ["Wellhead", "Pressure OK"]]
      .forEach(([l, v], i) => {
        ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "9px sans-serif"; ctx.fillText(l, W - 164, 36 + i * 13);
        ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.fillText(v, W - 164 + 72, 36 + i * 13);
      });

  } else if (ch === 5) {
    // PRODUCTION — platform, decline chart
    ctx.fillStyle = "#040c18"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#07111f"; ctx.fillRect(0, 170, W, 130);
    for (let w = 0; w < 5; w++) {
      ctx.strokeStyle = `rgba(55,138,221,${0.06 + w * 0.04})`; ctx.lineWidth = 1; ctx.beginPath();
      for (let x = 0; x <= W; x += 3) {
        const y = 175 + w * 18 + Math.sin(x * 0.02 + w * 0.8) * 6;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.strokeStyle = "#1a2a3a"; ctx.lineWidth = 4;
    [[W / 2 - 65, 170], [W / 2 - 35, 170], [W / 2 + 35, 170], [W / 2 + 65, 170]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (x < W / 2 ? -8 : 8), 300); ctx.stroke();
    });
    ctx.fillStyle = "#0e1e2e"; ctx.fillRect(W / 2 - 100, 120, 200, 55);
    ctx.fillStyle = "#122232"; ctx.fillRect(W / 2 - 80, 95, 70, 30); ctx.fillRect(W / 2 + 10, 98, 55, 26);
    ctx.strokeStyle = "#EF9F27"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(W / 2 + 95, 120); ctx.lineTo(W / 2 + 95, 70); ctx.stroke();
    ctx.fillStyle = "#EF9F27"; ctx.beginPath(); ctx.arc(W / 2 + 95, 65, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(4,12,24,0.88)"; ctx.fillRect(8, 8, 190, 118);
    ctx.strokeStyle = "rgba(29,158,117,0.2)"; ctx.lineWidth = 0.5; ctx.strokeRect(8, 8, 190, 118);
    ctx.fillStyle = "rgba(29,158,117,0.7)"; ctx.font = "500 10px sans-serif"; ctx.fillText("Production (bbl/day)", 14, 24);
    const dpts: [number, number][] = [];
    for (let x = 0; x < 170; x += 4) {
      const frac = x / 170;
      dpts.push([20 + x, 108 - 82 * Math.exp(-frac * 1.8)]);
    }
    ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2; ctx.beginPath();
    dpts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)); ctx.stroke();
    ctx.fillStyle = "rgba(29,158,117,0.06)"; ctx.beginPath();
    dpts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
    ctx.lineTo(dpts[dpts.length - 1][0], 110); ctx.lineTo(dpts[0][0], 110); ctx.closePath(); ctx.fill();
    const mp = dpts[Math.floor(dpts.length * 0.4)];
    ctx.fillStyle = "#EF9F27"; ctx.beginPath(); ctx.arc(mp[0], mp[1], 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "9px sans-serif"; ctx.fillText("8,200 bbl/day (4 wells)", 14, 114);
    ctx.fillStyle = "rgba(4,12,24,0.88)"; ctx.fillRect(W - 130, 10, 118, 56);
    ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "500 9px sans-serif"; ctx.fillText("WELLS STATUS", W - 122, 24);
    [["#1", "2,400 b/d", "#1D9E75"], ["#2", "2,100 b/d", "#1D9E75"], ["#3", "1,900 b/d", "#EF9F27"], ["#4", "1,800 b/d", "#1D9E75"]]
      .forEach(([w, v, c], i) => {
        ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.font = "9px sans-serif"; ctx.fillText("Well " + w, W - 122, 34 + i * 11);
        ctx.fillStyle = c; ctx.fillText(v, W - 82, 34 + i * 11);
      });

  } else {
    // ABANDONMENT
    ctx.fillStyle = "#080808"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#0c0c0c"; ctx.fillRect(0, 100, W, 200);
    [{ y: 100, c: "#0e0e0c" }, { y: 155, c: "#0c0e08" }, { y: 205, c: "#080c0e" }, { y: 250, c: "#0e0c08" }]
      .forEach(l => { ctx.fillStyle = l.c; ctx.fillRect(0, l.y, W, 55); });
    ctx.fillStyle = "#2a2a2a"; ctx.fillRect(W / 2 - 18, 0, 10, 300); ctx.fillRect(W / 2 + 8, 0, 10, 300);
    ctx.fillStyle = "#1a1a1a"; ctx.fillRect(W / 2 - 8, 0, 16, 300);
    [{ y: 50, label: "Surface cement plug" }, { y: 145, label: "Intermediate plug" }, { y: 225, label: "Formation plug" }]
      .forEach(p => {
        ctx.fillStyle = "#555"; ctx.fillRect(W / 2 - 18, p.y, 36, 14);
        ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 0.5; ctx.strokeRect(W / 2 - 18, p.y, 36, 14);
        ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(W / 2 + 20, p.y + 7); ctx.lineTo(W / 2 + 80, p.y + 7); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "9px sans-serif"; ctx.fillText(p.label, W / 2 + 84, p.y + 11);
      });
    ctx.strokeStyle = "rgba(226,75,74,0.6)"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(W / 2 - 22, 5); ctx.lineTo(W / 2 + 22, 45); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W / 2 + 22, 5); ctx.lineTo(W / 2 - 22, 45); ctx.stroke();
    ctx.fillStyle = "rgba(226,75,74,0.5)"; ctx.font = "500 9px sans-serif"; ctx.fillText("Wellhead removed", W / 2 - 42, 56);
    ctx.fillStyle = "rgba(8,8,8,0.88)"; ctx.fillRect(8, 8, 175, 88);
    ctx.strokeStyle = "rgba(99,153,34,0.3)"; ctx.lineWidth = 0.5; ctx.strokeRect(8, 8, 175, 88);
    ctx.fillStyle = "rgba(99,153,34,0.8)"; ctx.font = "500 10px sans-serif"; ctx.fillText("ENV. MONITORING — Aktiv", 14, 24);
    [["CH4", "0.002 ppm", "#1D9E75"], ["CO2", "412 ppm", "#1D9E75"], ["BHP", "1,820 psi", "#EF9F27"], ["Seismic", "0.0 mm/s", "#1D9E75"]]
      .forEach(([l, v, c], i) => {
        ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "9px sans-serif"; ctx.fillText(l, 14, 36 + i * 14);
        ctx.fillStyle = c; ctx.fillText(v, 56, 36 + i * 14);
      });
    ctx.fillStyle = "rgba(8,8,8,0.88)"; ctx.fillRect(W - 195, 8, 183, 88);
    ctx.fillStyle = "rgba(136,135,128,0.7)"; ctx.font = "500 10px sans-serif"; ctx.fillText("PROJECT LIFECYCLE", W - 187, 24);
    [["2024", "Exploration", "#1D9E75"], ["2025", "Appraisal", "#378ADD"], ["2026", "Drilling", "#BA7517"], ["2028", "Production", "#639922"], ["2034", "Abandonment", "#888780"]]
      .forEach(([y, ph, c], i) => {
        ctx.fillStyle = c; ctx.fillRect(W - 187, 32 + i * 12, 6, 6);
        ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "9px sans-serif"; ctx.fillText(y, W - 178, 40 + i * 12);
        ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.fillText(ph, W - 148, 40 + i * 12);
      });
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BlackGoldGame() {
  const [screen, setScreen] = useState<"intro" | "game" | "result" | "board">("intro");
  const [sIdx, setSIdx] = useState(0);
  const [gs, setGs] = useState<GameState>({ ...INITIAL_STATE });
  const [showCons, setShowCons] = useState(false);
  const [lastCons, setLastCons] = useState("");
  const [pending, setPending] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [lb, setLb] = useState<LeaderboardEntry[]>([]);
  const [loadingLb, setLoadingLb] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [choicePath, setChoicePath] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [supabase] = useState(() => createClient());

  async function fetchLeaderboard() {
    setLoadingLb(true);
    const { data, error } = await supabase
      .from("game_scores")
      .select("full_name, average_score, budget, production, completed_at")
      .eq("module_name", MODULE_NAME)
      .order("average_score", { ascending: false })
      .limit(10);
    if (!error && data) setLb(data as LeaderboardEntry[]);
    setLoadingLb(false);
  }

  useEffect(() => {
    fetchLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (screen === "game" && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 660; canvas.height = 300;
      drawScene(canvas, SCENES[sIdx].ch);
    }
  }, [screen, sIdx]);

  function applyFx(e: Partial<GameState> & { next?: number | null }) {
    setGs(prev => {
      const s = { ...prev };
      if (e.budget !== undefined) s.budget = Math.max(0, Math.min(150, s.budget + e.budget));
      if (e.time !== undefined) s.time = Math.max(0, Math.min(100, s.time + e.time));
      if (e.risk !== undefined) s.risk = Math.max(0, Math.min(100, s.risk + e.risk));
      if (e.rep !== undefined) s.rep = Math.max(0, Math.min(100, s.rep + e.rep));
      if (e.oil !== undefined) s.oil = Math.max(0, s.oil + e.oil);
      return s;
    });
  }

  function choose(i: number) {
    const sc = SCENES[sIdx];
    const ch = sc.choices[i];
    applyFx(ch.e);
    setLastCons(ch.s);
    setShowCons(true);
    setChoicePath(prev => [...prev, i]);
    const nx = ch.e.next ?? ch.next ?? null;
    setPending(nx);
    if (sc.final || nx === null || nx >= SCENES.length) setDone(true);
  }

  function continueGame() {
    setShowCons(false);
    if (done) { setScreen("result"); return; }
    if (pending !== null) setSIdx(pending);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submitScore() {
    if (submitting || submitted) return;
    setSubmitting(true);
    setSubmitError(null);

    const { budget_n, time_n, risk_n, rep_n, production_n } = normalizedStats(gs);

    // Giriş edibsə profildən adı çək, olmasa manual input istifadə et
    let finalName = "Anonymous";
    let userId: string | null = null;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        userId = user.id;
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();
        if (profile?.full_name) finalName = profile.full_name;
      }
    } catch {
      // auth yoxdursa manual ad ilə davam edirik
    }

    const { error } = await supabase.from("game_scores").upsert({
      user_id: userId,
      module_name: MODULE_NAME,
      score: calcScore(gs),
      budget: budget_n,
      time_score: time_n,
      risk: risk_n,
      reputation: rep_n,
      production: production_n,
      full_name: finalName,
      scenario_path: choicePath.join("-"),
    }, { onConflict: "user_id" });

    setSubmitting(false);

    if (error) {
      console.error("Score göndərilmədi:", error);
      setSubmitError("Nəticə göndərilmədi. Yenidən cəhd et.");
      return;
    }

    setSubmitted(true);
    await fetchLeaderboard();
    setScreen("board");
  }

  function restart() {
    setScreen("intro"); setSIdx(0); setGs({ ...INITIAL_STATE });
    setShowCons(false); setLastCons(""); setPending(null); setDone(false);
    setNameInput(""); setSubmitted(false); setSubmitError(null); setChoicePath([]);
  }

  const sc = SCENES[sIdx];
  const score = calcScore(gs);
  const ac = AC[sc?.ch ?? 0];

  const evClass: Record<string, string> = {
    "ev-w": "bg-amber-500/10 text-amber-400 border border-amber-500/30",
    "ev-s": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    "ev-i": "bg-blue-500/10 text-blue-400 border border-blue-500/30",
    "ev-d": "bg-red-500/10 text-red-400 border border-red-500/30",
  };

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (screen === "intro") return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-center">
      <div className="text-5xl mb-4">🛢️</div>
      <h1 className="text-3xl font-medium mb-2">FETP</h1>
      <p className="text-xl text-gray-900 font-bold mb-2"> From Exploration To Production</p>
      <p className="text-s text-gray-600 mb-2">Exploration-dan Abandonment-ə qədər tam neft sahəsi həyat dövrü simulyatoru</p>
      <p className="text-s text-gray-600 mb-2">23 scene · 40+ qərar · 7 chapter</p>

      <div className="grid grid-cols-2 gap-3 mb-8 text-left">
        {[["🗺️", "7 Chapter", "Exploration → Abandonment"], ["⚡", "40+ Qərar", "Hər seçim nəticə verir"], ["🏆", "Leaderboard", "Digərlərlə müqayisə"], ["📚", "Real Texnologiya", "DST, MPD, ICD, EOR, P&A"]].map(([ic, t, s]) => (
          <div key={t} className="rounded-xl border border-white/8 bg-white/4 p-4">
            <div className="text-2xl mb-2">{ic}</div>
            <div className="font-medium text-sm mb-1">{t}</div>
            <div className="text-xs text-gray-500">{s}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <button onClick={() => setScreen("game")} className="w-full py-3 rounded-xl font-medium text-white" style={{ background: "#1D9E75" }}>
          Oyuna başla →
        </button>
        <button onClick={() => setScreen("board")} className="w-full py-3 rounded-xl border border-white/15 text-gray-400 text-sm">
          🏆 Leaderboard
        </button>
      </div>
    </div>
  );

  // ── Leaderboard ────────────────────────────────────────────────────────────
  if (screen === "board") return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => setScreen(done ? "result" : "intro")} className="px-3 py-1.5 rounded-lg border border-white/15 text-gray-400 text-xs">← Geri</button>
        <h2 className="text-lg font-medium">🏆 Leaderboard</h2>
      </div>
      {loadingLb ? (
        <p className="text-center text-gray-500 text-sm py-10">Yüklənir...</p>
      ) : lb.length === 0 ? (
        <p className="text-center text-gray-500 text-sm py-10">Hələ heç kim oynamamışdır. İlk sən ol!</p>
      ) : (
        <div className="flex flex-col gap-2">
          {lb.map((e, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ borderColor: i === 0 ? "#EF9F27" : "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: i === 0 ? "#EF9F2722" : "rgba(255,255,255,0.06)", color: i === 0 ? "#EF9F27" : "#888" }}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{e.full_name}</div>
                <div className="text-xs text-gray-500">
                  {e.completed_at ? new Date(e.completed_at).toLocaleDateString("az-AZ") : ""}
                </div>
              </div>
              <div className="text-lg font-medium" style={{ color: "#1D9E75" }}>{Math.round(e.average_score)}</div>
            </div>
          ))}
        </div>
      )}
      <button onClick={restart} className="w-full mt-5 py-3 rounded-xl font-medium text-white text-sm" style={{ background: "#1D9E75" }}>
        Yeni oyun →
      </button>
    </div>
  );

  // ── Result ─────────────────────────────────────────────────────────────────
  if (screen === "result") return (
    <div className="max-w-2xl mx-auto py-8 px-4 text-center">
      <div className="text-4xl mb-3">{score >= 120 ? "🏆" : score >= 90 ? "⭐" : "📚"}</div>
      <div className="text-4xl font-medium mb-2" style={{ color: "#1D9E75" }}>{score}</div>
      <div className="text-base font-medium mb-6">{getOutcome(score)}</div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[["Büdcə", "#1D9E75", Math.round(gs.budget) + "M$"], ["Neft", "#BA7517", gs.oil + " Mbbl"], ["Risk", gs.risk > 50 ? "#E24B4A" : "#639922", Math.round(gs.risk) + "%"], ["Reputasiya", "#7F77DD", Math.round(gs.rep) + "%"]].map(([l, c, v]) => (
          <div key={l as string} className="rounded-xl border border-white/8 bg-white/4 p-4 text-left">
            <div className="text-xs text-gray-500 mb-1">{l}</div>
            <div className="text-xl font-medium" style={{ color: c as string }}>{v}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-white/8 bg-white/4 p-4 mb-4 text-left text-center">
        <button onClick={submitScore} disabled={submitting || submitted}
          className="px-6 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-50" style={{ background: "#1D9E75" }}>
          {submitting ? "Göndərilir..." : submitted ? "Göndərildi ✓" : "Nəticəni göndər"}
        </button>
        {submitError && <p className="text-xs text-red-400 mt-2">{submitError}</p>}
      </div>
      <button onClick={restart} className="w-full py-3 rounded-xl border border-white/15 text-gray-400 text-sm">Yenidən oyna →</button>
    </div>
  );

  // ── Game ───────────────────────────────────────────────────────────────────
  return (
    <div ref={topRef} className="max-w-2xl mx-auto">
      {/* Chapter bar */}
      <div className="flex gap-1.5 px-3 py-2 overflow-x-auto scrollbar-none" style={{ background: "var(--color-background-secondary)", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        {CHS.map((c, i) => {
          const state = sc.ch === i ? "active" : sc.ch > i ? "done" : "future";
          return (
            <div key={c} className="px-3 py-1 rounded-full text-xs whitespace-nowrap border"
              style={{
                opacity: state === "future" ? 0.3 : state === "done" ? 0.65 : 1,
                borderColor: state === "active" ? AC[i] : "rgba(255,255,255,0.12)",
                background: state === "active" ? AC[i] + "22" : "transparent",
                color: state === "active" ? AC[i] : state === "done" ? "#aaa" : "#666",
              }}>
              {c}
            </div>
          );
        })}
      </div>

      {/* Canvas */}
      <div className="relative overflow-hidden" style={{ height: 300, background: "#060d18" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-1.5 px-3 py-2" style={{ background: "var(--color-background-secondary)", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        {[
          { l: "Büdcə", v: Math.round(gs.budget) + "M$", p: Math.min(100, gs.budget), c: "#1D9E75" },
          { l: "Vaxt", v: Math.round(gs.time) + "%", p: gs.time, c: "#378ADD" },
          { l: "Risk", v: Math.round(gs.risk) + "%", p: gs.risk, c: gs.risk > 60 ? "#E24B4A" : gs.risk > 35 ? "#BA7517" : "#639922" },
          { l: "Rep.", v: Math.round(gs.rep) + "%", p: gs.rep, c: "#7F77DD" },
          { l: "Hasilat", v: gs.oil + "M", p: Math.min(100, gs.oil * 1.5), c: "#BA7517" },
        ].map(stat => (
          <div key={stat.l} className="rounded-lg border border-white/8 bg-black/20 px-2 py-1.5">
            <div className="text-xs text-gray-500 mb-1">{stat.l}</div>
            <div className="text-sm font-medium">{stat.v}</div>
            <div className="h-0.5 rounded mt-1.5" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div className="h-full rounded transition-all duration-500" style={{ width: `${Math.max(0, stat.p)}%`, background: stat.c }} />
            </div>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="p-4" style={{ background: "var(--color-background-primary)", borderTop: "none" }}>
        {showCons ? (
          <>
            <div className="rounded-xl p-4 mb-4 text-sm leading-relaxed" style={{ background: "rgba(29,158,117,0.1)", border: "0.5px solid rgba(29,158,117,0.3)", color: "#4ade80" }}>
              {lastCons}
            </div>
            <button onClick={continueGame} className="w-full py-3 rounded-xl text-white text-sm font-medium" style={{ background: ac }}>
              Davam et →
            </button>
          </>
        ) : sc.final ? (
          <>
            <h3 className="font-medium text-base mb-2">{sc.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">{sc.story}</p>
            {sc.detail && <p className="text-xs text-gray-500 leading-relaxed mb-4 pl-3 border-l-2 border-white/15">{sc.detail}</p>}
            <button onClick={() => setScreen("result")} className="w-full py-3 rounded-xl text-white text-sm font-medium" style={{ background: ac }}>
              Nəticəni gör →
            </button>
          </>
        ) : (
          <>
            <h3 className="font-medium text-base mb-2">{sc.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">{sc.story}</p>
            {sc.detail && <p className="text-xs text-gray-500 leading-relaxed mb-3 pl-3 border-l-2 border-white/15">{sc.detail}</p>}
            {sc.ev && (
              <div className={`rounded-lg px-3 py-2.5 text-xs leading-relaxed mb-3 ${evClass[sc.ev.t] ?? ""}`}>
                {sc.ev.m}
              </div>
            )}
            <div className="flex flex-col gap-2">
              {sc.choices.map((ch, i) => (
                <button key={i} onClick={() => choose(i)}
                  className="text-left px-4 py-3 rounded-xl border border-white/10 text-sm transition-all hover:border-white/25 w-full"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="font-medium mb-1">{ch.t}</div>
                  <div className="text-xs text-gray-500">{ch.s}</div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}