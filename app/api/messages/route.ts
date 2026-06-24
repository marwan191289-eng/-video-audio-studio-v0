import { db } from "@/lib/db"
import { message as messageTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/session"
import { sendEmail } from "@/lib/email"

export async function GET() {
  const session = await getSession()
  if (!session?.user) return new Response(null, { status: 401 })

  const msgs = await db
	.select()
	.from(messageTable)
	.where(eq(messageTable.userId, session.user.id))
	.orderBy(messageTable.createdAt, "desc")

  return new Response(JSON.stringify(msgs), {
	status: 200,
	headers: { "content-type": "application/json" },
  })
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session?.user) return new Response(null, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const toAddr = String(body.to ?? body.toAddr ?? "").trim()
  const subject = String(body.subject ?? "").trim()
  const text = String(body.body ?? body.text ?? "").trim()

  if (!toAddr || !subject || !text) {
	return new Response(JSON.stringify({ ok: false, message: "Missing fields" }), { status: 400, headers: { "content-type": "application/json" } })
  }

  const snippet = text.slice(0, 512)

  // Persist message as outbound
  await db.insert(messageTable).values({
	userId: session.user.id,
	direction: "outbound",
	fromAddr: session.user.email ?? process.env.ZOHO_SMTP_USER ?? "",
	toAddr,
	subject,
	body: text,
	snippet,
  })

  // Attempt to send via SMTP (graceful)
  await sendEmail({ to: toAddr, subject, text })

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } })
}
