import type { Metadata } from "next";
import WellLogModule from "@/components/well-log/WellLogModule";

export const metadata: Metadata = {
  title: "Loq analizi | LearntoDig",
  description: "LAS quyu loq analizi və AI ilə interaktiv öyrənmə",
};

export default function WellLogPage() {
  return <WellLogModule />;
}
