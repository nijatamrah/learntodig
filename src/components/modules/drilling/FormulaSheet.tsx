import { ACCENT } from "./TheoryParts";

export interface FormulaGroup {
  title: string;
  rows: { name: string; formula: string; note?: string }[];
}

export default function FormulaSheet({ groups }: { groups: FormulaGroup[] }) {
  return (
    <div className="space-y-4 max-w-4xl">
      <p className="text-[13px] text-[#6B82A0] font-['Space_Grotesk']">
        Bölmənin əsas düsturları bir yerdə (field units). Vahidlərə diqqət et: dərinlik üçün TVD.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {groups.map((g) => (
          <div key={g.title} className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0D1525] p-4">
            <h3 className="text-[13px] font-semibold text-[#F0F4FF] mb-3 font-['Space_Grotesk']">{g.title}</h3>
            <ul className="space-y-3">
              {g.rows.map((r) => (
                <li key={r.name}>
                  <p className="text-[11px] text-[#8DA2BF] font-['Space_Grotesk']">{r.name}</p>
                  <p className="text-[12px] font-mono" style={{ color: ACCENT }}>{r.formula}</p>
                  {r.note && <p className="text-[11px] text-[#6B82A0] font-['Space_Grotesk']">{r.note}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
