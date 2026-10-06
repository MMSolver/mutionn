import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { name, email, phone, date, time, service, message } = body;

    if (!name || !email || !date || !time || !service) {
      return NextResponse.json(
        { error: "Gerekli alanlar eksik" },
        { status: 400 },
      );
    }

    const notificationEmail = process.env.CONTACT_EMAIL ?? "mutimehmettt@gmail.com";

    await resend.emails.send({
      from: "Mution Randevu <onboarding@resend.dev>",
      to: notificationEmail,
      subject: `Yeni Toplantı Talebi — ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #FAFAFA; padding: 32px; border-radius: 12px;">
          <div style="border-bottom: 2px solid #06B6D4; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 24px; color: #06B6D4;">Yeni Toplantı Talebi</h1>
            <p style="margin: 4px 0 0; color: #A3A3A3; font-size: 14px;">mution.com.tr üzerinden gönderildi</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: #A3A3A3; width: 140px; vertical-align: top;">Ad Soyad</td>
              <td style="padding: 12px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #A3A3A3; vertical-align: top;">E-posta</td>
              <td style="padding: 12px 0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #A3A3A3; vertical-align: top;">Telefon</td>
              <td style="padding: 12px 0;">${phone || "Belirtilmedi"}</td>
            </tr>
            <tr style="background: #141414; border-radius: 8px;">
              <td style="padding: 12px; color: #A3A3A3; vertical-align: top;">Tarih</td>
              <td style="padding: 12px; font-weight: 600; color: #06B6D4;">${date}</td>
            </tr>
            <tr style="background: #141414;">
              <td style="padding: 12px; color: #A3A3A3; vertical-align: top;">Saat</td>
              <td style="padding: 12px; font-weight: 600; color: #06B6D4;">${time}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #A3A3A3; vertical-align: top;">Hizmet</td>
              <td style="padding: 12px 0; font-weight: 600;">${service}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 12px 0; color: #A3A3A3; vertical-align: top;">Mesaj</td>
              <td style="padding: 12px 0;">${message}</td>
            </tr>` : ""}
          </table>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #2A2A2A; color: #737373; font-size: 12px;">
            Bu e-posta Mution web sitesindeki randevu formu aracılığıyla otomatik gönderilmiştir.
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking email error:", error);
    return NextResponse.json(
      { error: "E-posta gönderilemedi" },
      { status: 500 },
    );
  }
}
