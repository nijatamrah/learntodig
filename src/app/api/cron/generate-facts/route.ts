import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

const FACTS = [
  "Azərbaycan 1846-cı ildə dünyada ilk sənaye neft quyusunu qazmışdır.",
  "Brent crude neftinin adı Şotlandiya yaxınlığındakı Brent yatağından gəlir.",
  "Bir barrel neft təxminən 159 litrə bərabərdir.",
  "Dünya üzrə gündəlik neft istehlakı 100 milyon barreli keçir.",
  "Ən dərin neft quyusu 12 km-dən çox dərinliyə çatır.",
  "Azərbaycanın Günəşli yatağı Xəzər dənizinin ən böyük neft yataqlarından biridir.",
  "Rezervuar mühəndisliyi neftin yerin altından çıxarılma faizini artırmağı öyrədir.",
  "Təbii qaz neftdən daha az CO2 buraxır — bu səbəbdən keçid yanacağı sayılır.",
  "GR (Gamma Ray) loqu qumun gildən ayırd edilməsinə kömək edir.",
  "Resistivity loqu quyudakı mayelərin növünü — neft, su, qaz — müəyyən edir.",
  "Porosity — süxurun boşluq faizi — neftin nə qədər saxlanıla biləcəyini göstərir.",
  "Permeability süxurun nefti nə sürətlə keçirdiyini ölçür.",
  "OOIP (Original Oil In Place) yataqda əvvəlcə olan ümumi neft miqdarıdır.",
  "Orta dünya neft çıxarma faizi 35-40% arasındadır — qalan neft yerdə qalır.",
  "Hydraulic fracturing (fracking) süxuru çatladıb neft axımını artırır.",
  "Offshore platformalar dənizin 3000 metr dərinliyinə qədər işləyə bilər.",
  "Drill bit — qazma ucu — almaz materialdan hazırlanır.",
  "WOB (Weight on Bit) qazma sürətinə birbaşa təsir edən əsas parametrdir.",
  "ROP (Rate of Penetration) saatda neçə metr qazıldığını göstərir.",
  "Mud logging qazma zamanı çıxan süxur nümunələrini real vaxtda analiz edir.",
  "Casing — çelik boru — quyunu çökmədən qoruyur.",
  "Blowout preventer (BOP) quyunun nəzarətsiz püskürmə qəzasını önləyir.",
  "Azərbaycan ACG (Azəri-Çıraq-Günəşli) layihəsi 1994-cü ildə imzalanmışdır.",
  "Nodal Analysis quyunun hasilat potensialını hesablamaq üçün istifadə edilir.",
  "ESP (Electric Submersible Pump) dərin quyulardan nefti səthinə çıxarır.",
  "DCA (Decline Curve Analysis) quyunun gələcək hasilatını proqnozlaşdırır.",
  "Seismik kəşfiyyat yeraltı strukturları səs dalğaları ilə aşkar edir.",
  "Petrel proqramı rezervuar modelləşdirməsinin dünya standartıdır.",
  "Eclipse proqramı rezervuar simulyasiyasında ən geniş yayılmış alətdir.",
  "LAS (Log ASCII Standard) formatı quyu log məlumatlarını saxlamaq üçün istifadə edilir.",
];

export async function GET(request: Request) {
  // Cron job authorization
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Köhnə faktları sil
  await supabase.from("daily_facts").delete().neq("id", 0);

  // Yeni faktları əlavə et (shuffle)
  const shuffled = [...FACTS].sort(() => Math.random() - 0.5);
  const { error } = await supabase
    .from("daily_facts")
    .insert(shuffled.map((fact) => ({ fact_text: fact })));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, count: shuffled.length });
}