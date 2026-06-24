import "server-only"
import nodemailer from "nodemailer"

let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporter) return transporter

  const host = process.env.ZOHO_SMTP_HOST
  const port = Number(process.env.ZOHO_SMTP_PORT ?? 587)
  const user = process.env.ZOHO_SMTP_USER
  const pass = process.env.ZOHO_SMTP_PASS

  if (!host || !user || !pass) return null

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  return transporter
}

type SendArgs = {
  to: string
  subject: string
  text: string
  html?: string
  replyTo?: string
}

/**
 * Sends an email via Zoho SMTP. Returns { sent: false } gracefully when
 * SMTP isn't configured so the rest of the flow (DB writes) still succeed.
 */
export async function sendEmail({ to, subject, text, html, replyTo }: SendArgs) {
  const t = getTransporter()
  const from = process.env.ZOHO_SMTP_USER

  if (!t || !from) {
    console.log("[v0] SMTP not configured; skipping send to", to)
    return { sent: false as const, reason: "smtp_not_configured" }
  }

  try {
    const info = await t.sendMail({
      from: `"Nexus Axis Studio" <${from}>`,
      to,
      subject,
      text,
      html: html ?? `<pre style="font-family:inherit">${text}</pre>`,
      replyTo,
    })
    return { sent: true as const, messageId: info.messageId }
  } catch (err) {
    console.log("[v0] SMTP send failed:", (err as Error).message)
    return { sent: false as const, reason: "send_failed" }
  }
}
