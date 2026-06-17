"use client";

import { useEffect, useState } from "react";
import GlossaryModal from "@/components/GlossaryModal";

export default function GlossaryWrapper() {
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  useEffect(() => {
    const handler = () => setGlossaryOpen(true);
    window.addEventListener("open-glossary", handler);
    return () => window.removeEventListener("open-glossary", handler);
  }, []);

  return (
    <GlossaryModal isOpen={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
  );
}