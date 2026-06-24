import { db } from "@/lib/db"
import { dmarcReport } from "@/lib/db/schema"
import { getSession } from "@/lib/session"

export async function GET() {
  const session = await getSession()
  if (!session?.user) return new Response(null, { status: 401 })

  const reports = await db
	.select()
	.from(dmarcReport)
	.where(dmarcReport.userId.eq(session.user.id))
	.orderBy(dmarcReport.reportDate, "desc")

  return new Response(JSON.stringify(reports), { status: 200, headers: { "content-type": "application/json" } })
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session?.user) return new Response(null, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const domain = String(body.domain ?? "").trim()
  const sourceIp = String(body.sourceIp ?? "").trim()
  const count = Number(body.count ?? 1)
  const disposition = String(body.disposition ?? "none")
  const dkim = String(body.dkim ?? "pass")
  const spf = String(body.spf ?? "pass")

  if (!domain || !sourceIp) {
	return new Response(JSON.stringify({ ok: false, message: "Missing fields" }), { status: 400, headers: { "content-type": "application/json" } })
  }

  await db.insert(dmarcReport).values({
	userId: session.user.id,
	domain,
	sourceIp,
	count: isNaN(count) ? 1 : count,
	disposition,
	dkim,
	spf,
  })

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } })
}
