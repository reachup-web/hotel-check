import type { Metadata } from "next";
import { crimsonText, montserrat, spaceGrotesk } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "90-Sekunden-Check · Wo steht dein Hotel digital? | ReachUp",
  description:
    "Finde in 90 Sekunden heraus, wie dein Hotel im Vergleich abschneidet und wo dein größtes Direktbuchungs-Potenzial liegt. Kostenlos & ohne Anmeldung.",
  keywords:
    "Hotel-Check, Direktbuchung, OTA-Quote, Hotel-Optimierung, ReachUp",
  openGraph: {
    title: "90-Sekunden-Check · Wo steht dein Hotel digital?",
    description:
      "Finde in 90 Sekunden heraus, wie dein Hotel im Vergleich abschneidet und wo dein größtes Direktbuchungs-Potenzial liegt.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${crimsonText.variable} ${montserrat.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
