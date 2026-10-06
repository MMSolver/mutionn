import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Gerekli alanlar eksik" },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Mution <info@mution.com.tr>",
      to: "mution.tr@gmail.com",
      subject: `Yeni İletişim Formu — ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #FAFAFA; padding: 32px; border-radius: 12px;">
          <div style="border-bottom: 2px solid #06B6D4; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 24px; color: #06B6D4;">Yeni İletişim Formu</h1>
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
            ${service ? `
            <tr>
              <td style="padding: 12px 0; color: #A3A3A3; vertical-align: top;">Hizmet</td>
              <td style="padding: 12px 0; font-weight: 600;">${service}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 12px 0; color: #A3A3A3; vertical-align: top;">Mesaj</td>
              <td style="padding: 12px 0;">${message}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #2A2A2A; color: #737373; font-size: 12px;">
            Bu e-posta Mution web sitesindeki iletişim formu aracılığıyla otomatik gönderilmiştir.
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json(
      { error: "E-posta gönderilemedi" },
      { status: 500 },
    );
  }
}
