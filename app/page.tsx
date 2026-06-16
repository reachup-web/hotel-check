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

    // Lead-Daten per Web3Forms (client-seitig) senden
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "c2c067c1-0241-420c-a96b-2ad88eed4e3b",
          subject: `Neuer Hotel-Check Lead: ${data.hotelName}`,
          from_name: "90-Sekunden Hotel-Check",
          Hotel: data.hotelName,
          Stadt: data.city,
          Zimmer: `ca. ${data.rooms}`,
          "OTA-Quote": `${data.otaPercent}%`,
          Zimmerpreis: `${data.avgRate} EUR`,
          Name: data.contactName,
          Position: data.contactPosition || "–",
          email: data.contactEmail,
          Telefon: data.contactPhone,
        }),
      });
    } catch (e) {
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
