import { notFound } from "next/navigation";
import PressuresSection from "@/components/modules/drilling/PressuresSection";
import HydraulicsSection from "@/components/modules/drilling/HydraulicsSection";
import FluidsSection from "@/components/modules/drilling/FluidsSection";
import RigSection from "@/components/modules/drilling/RigSection";

// Hazır bölmələr bu xəritəyə əlavə olunur. Qalan id-lər 404 verir.
const SECTIONS: Record<string, () => React.ReactElement> = {
  "rig-systems": () => <RigSection />,
  "drilling-fluids": () => <FluidsSection />,
  hydraulics: () => <HydraulicsSection />,
  pressures: () => <PressuresSection />,
};

export const metadata = { title: "Qazma · Təzyiqlər | LearntoDig" };

export default async function DrillingSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const render = SECTIONS[section];
  if (!render) notFound();
  return render();
}
