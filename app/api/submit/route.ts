import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const accessKey = process.env.WEB3FORMS_KEY;

  if (!accessKey) {
    console.error("WEB3FORMS_KEY nicht gesetzt");
    return NextResponse.json({ ok: false, error: "Server nicht konfiguriert" }, { status: 500 });
  }

  const payload = {
    access_key: accessKey,
    subject: `Neuer Hotel-Check Lead: ${data.hotelName}`,
    from_name: "90-Sekunden Hotel-Check",
    // Daten formatiert
    Hotel: data.hotelName,
    Stadt: data.city,
    Zimmer: `ca. ${data.rooms}`,
    "OTA-Quote": `${data.otaPercent}%`,
    "Ø Zimmerpreis": `${data.avgRate} €`,
    Name: data.contactName,
    Position: data.contactPosition || "–",
    "E-Mail": data.contactEmail,
    Telefon: data.contactPhone,
  };

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    return NextResponse.json({ ok: true });
  }

  console.error("Web3Forms error:", result);
  return NextResponse.json({ ok: false, error: "E-Mail konnte nicht gesendet werden" }, { status: 500 });
}
