import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

/* ── Zod schema (mirrors frontend) ── */
const contactSchema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  empresa: z.string().optional(),
  asunto: z.string().min(1),
  mensaje: z.string().min(10),
});

/* ── Synthwave email template ── */
function buildEmailHtml(data: z.infer<typeof contactSchema>): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#0B0D2A;font-family:'Courier New',monospace;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <!-- Header -->
    <div style="text-align:center;padding-bottom:24px;border-bottom:1px solid rgba(0,245,255,0.25);">
      <h1 style="margin:0;font-size:20px;color:#00F5FF;letter-spacing:0.1em;">
        // NUEVO CONTACTO
      </h1>
      <p style="margin:8px 0 0;font-size:12px;color:#8A8FCC;">
        Uribasoft Landing Form
      </p>
    </div>

    <!-- Data table -->
    <table style="width:100%;margin-top:24px;border-collapse:collapse;">
      <tr>
        <td style="padding:12px 0;font-size:11px;color:#8A8FCC;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;width:120px;">
          Nombre
        </td>
        <td style="padding:12px 0;font-size:14px;color:#E8EAFF;">
          ${escapeHtml(data.nombre)}
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;font-size:11px;color:#8A8FCC;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">
          Email
        </td>
        <td style="padding:12px 0;font-size:14px;color:#00F5FF;">
          <a href="mailto:${escapeHtml(data.email)}" style="color:#00F5FF;text-decoration:none;">
            ${escapeHtml(data.email)}
          </a>
        </td>
      </tr>
      ${
        data.empresa
          ? `<tr>
        <td style="padding:12px 0;font-size:11px;color:#8A8FCC;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">
          Empresa
        </td>
        <td style="padding:12px 0;font-size:14px;color:#E8EAFF;">
          ${escapeHtml(data.empresa)}
        </td>
      </tr>`
          : ""
      }
      <tr>
        <td style="padding:12px 0;font-size:11px;color:#8A8FCC;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">
          Asunto
        </td>
        <td style="padding:12px 0;font-size:14px;color:#FF2D78;">
          ${escapeHtml(data.asunto)}
        </td>
      </tr>
    </table>

    <!-- Message -->
    <div style="margin-top:24px;padding:20px;background:rgba(0,0,0,0.3);border:1px solid rgba(0,245,255,0.15);border-radius:4px;">
      <p style="margin:0 0 8px;font-size:11px;color:#8A8FCC;text-transform:uppercase;letter-spacing:0.1em;">
        Mensaje
      </p>
      <p style="margin:0;font-size:14px;color:#E8EAFF;line-height:1.6;white-space:pre-wrap;">
${escapeHtml(data.mensaje)}
      </p>
    </div>

    <!-- Footer -->
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid rgba(0,245,255,0.15);text-align:center;">
      <p style="margin:0;font-size:11px;color:#4A4F8A;">
        Enviado desde uribasoft.com &middot; Responder directamente a este email contactará al remitente.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ── POST handler ── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    /* Dev mode fallback: no API key or placeholder */
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === "your_key_here" || !apiKey.startsWith("re_")) {
      console.log("[contact] RESEND_API_KEY not configured — logging to console (dev mode)");
      console.log("[contact] From:", data.nombre, `<${data.email}>`);
      console.log("[contact] Asunto:", data.asunto);
      console.log("[contact] Empresa:", data.empresa || "(none)");
      console.log("[contact] Mensaje:", data.mensaje);
      return NextResponse.json({ success: true, dev: true });
    }

    const resendClient = new Resend(apiKey);
    const { error } = await resendClient.emails.send({
      from: "Uribasoft Contact <noreply@uribasoft.com>",
      to: ["gcancellieri@uribasoft.com", "fjournade@uribasoft.com"],
      replyTo: data.email,
      subject: `[Uribasoft] Nuevo contacto: ${data.asunto}`,
      html: buildEmailHtml(data),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    console.error("[contact] Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}