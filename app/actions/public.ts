"use server"

import { db } from "@/lib/db"
import { contactRequest, subscriber } from "@/lib/db/schema"
import { sendEmail } from "@/lib/email"
import { eq } from "drizzle-orm"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ActionResult = { ok: boolean; message: string }

export async function submitContactRequest(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const company = String(formData.get("company") ?? "").trim()
  const subject = String(formData.get("subject") ?? "").trim()
  const messageText = String(formData.get("message") ?? "").trim()

  if (!name || !email || !subject || !messageText) {
    return { ok: false, message: "Please fill in all required fields." }
  }
  if (!emailRegex.test(email)) {
    return { ok: false, message: "Please enter a valid email address." }
  }

  await db.insert(contactRequest).values({
    name,
    email,
    company: company || null,
    subject,
    message: messageText,
  })

  const notifyTo = process.env.CONTACT_NOTIFY_TO || process.env.ZOHO_SMTP_USER
  if (notifyTo) {
    await sendEmail({
      to: notifyTo,
      subject: `New contact request: ${subject}`,
      replyTo: email,
      text: `From: ${name} <${email}>${company ? ` (${company})` : ""}\n\nSubject: ${subject}\n\n${messageText}`,
    })
  }

  return {
    ok: true,
    message: "Thanks — your message has been received. We'll be in touch soon.",
  }
}

export async function subscribeToNewsletter(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()

  if (!emailRegex.test(email)) {
    return { ok: false, message: "Please enter a valid email address." }
  }

  const existing = await db
    .select()
    .from(subscriber)
    .where(eq(subscriber.email, email))
    .limit(1)

  if (existing.length > 0) {
    if (existing[0].status === "subscribed") {
      return { ok: true, message: "You're already subscribed. Thank you!" }
    }
    await db
      .update(subscriber)
      .set({ status: "subscribed" })
      .where(eq(subscriber.email, email))
  } else {
    await db.insert(subscriber).values({ email })
  }

  await sendEmail({
    to: email,
    subject: "Welcome to the Nexus Axis Studio newsletter",
    text: "Thanks for subscribing. You'll get product updates and deliverability insights from our team.",
  })

  return { ok: true, message: "Subscribed! Check your inbox for a welcome note." }
}
