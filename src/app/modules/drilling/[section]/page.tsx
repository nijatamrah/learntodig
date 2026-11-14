import { notFound } from "next/navigation";
import PressuresSection from "@/components/modules/drilling/PressuresSection";

// Hazır bölmələr bu xəritəyə əlavə olunur. Qalan id-lər 404 verir.
const SECTIONS: Record<string, () => React.ReactElement> = {
  pressures: () => <PressuresSection />,
};

export const metadata = { title: "Qazma · Təzyiqlər | LearntoDig" };

export default async function DrillingSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const render = SECTIONS[section];
  if (!render) notFound();
  return render();
}
