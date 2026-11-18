import { notFound } from "next/navigation";
import DirectionalSection from "@/components/modules/drilling/DirectionalSection";
import WellControlSection from "@/components/modules/drilling/WellControlSection";
import ProblemsSection from "@/components/modules/drilling/ProblemsSection";
import CasingSection from "@/components/modules/drilling/CasingSection";
import PressuresSection from "@/components/modules/drilling/PressuresSection";
import BitsSection from "@/components/modules/drilling/BitsSection";
import TorqueDragSection from "@/components/modules/drilling/TorqueDragSection";
import DrillstringSection from "@/components/modules/drilling/DrillstringSection";
import HydraulicsSection from "@/components/modules/drilling/HydraulicsSection";
import FluidsSection from "@/components/modules/drilling/FluidsSection";
import RigSection from "@/components/modules/drilling/RigSection";

// Hazır bölmələr bu xəritəyə əlavə olunur. Qalan id-lər 404 verir.
const SECTIONS: Record<string, () => React.ReactElement> = {
  "rig-systems": () => <RigSection />,
  "drilling-fluids": () => <FluidsSection />,
  "bits-rop": () => <BitsSection />,
  "torque-drag": () => <TorqueDragSection />,
  "drillstring-bha": () => <DrillstringSection />,
  hydraulics: () => <HydraulicsSection />,
  pressures: () => <PressuresSection />,
  "casing-cementing": () => <CasingSection />,
  directional: () => <DirectionalSection />,
  "well-control": () => <WellControlSection />,
  "problems-npt": () => <ProblemsSection />,
};

export const metadata = { title: "Qazma · Təzyiqlər | LearntoDig" };

export default async function DrillingSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const render = SECTIONS[section];
  if (!render) notFound();
  return render();
}
