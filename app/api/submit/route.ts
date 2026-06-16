import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const accessKey = process.env.WEB3FORMS_KEY || "c2c067c1-0241-420c-a96b-2ad88eed4e3b";

    const payload = {
      access_key: accessKey,
      subject: `Neuer Hotel-Check Lead: ${data.hotelName || "Unbekannt"}`,
      from_name: "90-Sekunden Hotel-Check",
      Hotel: data.hotelName || "",
      Stadt: data.city || "",
      Zimmer: `ca. ${data.rooms || "?"}`,
      "OTA-Quote": `${data.otaPercent || "?"}%`,
      "Zimmerpreis": `${data.avgRate || "?"} EUR`,
      Name: data.contactName || "",
      Position: data.contactPosition || "–",
      "E-Mail": data.contactEmail || "",
      Telefon: data.contactPhone || "",
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

    return NextResponse.json({ ok: false, error: result.message || "Fehler" }, { status: 500 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
