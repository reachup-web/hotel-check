"use client";

import { useState, useEffect } from "react";
import CheckNav from "@/components/check/CheckNav";
import CheckHero from "@/components/check/CheckHero";
import CheckForm from "@/components/check/CheckForm";
import CheckResult from "@/components/check/CheckResult";
import CheckFooter from "@/components/check/CheckFooter";

export interface CheckData {
  hotelName: string;
  city: string;
  rooms: number;
  otaPercent: number;
  avgRate: number;
  contactName: string;
  contactPosition: string;
  contactEmail: string;
  contactPhone: string;
}

export default function Home() {
  const [checkData, setCheckData] = useState<CheckData | null>(null);

  // Immer oben starten
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckComplete = async (data: CheckData) => {
    setCheckData(data);

    // Lead-Daten per E-Mail senden
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (e) {
      // Seite trotzdem anzeigen, auch wenn Mail fehlschlägt
      console.error("Submit error:", e);
    }

    setTimeout(() => {
      document.getElementById("ergebnis")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-ivory">
      <CheckNav />
      <CheckHero />
      <CheckForm onComplete={handleCheckComplete} />
      {checkData && <CheckResult data={checkData} />}
      <CheckFooter />
    </main>
  );
}
