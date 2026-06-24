import { db } from "@/lib/db"
import { dmarcReport } from "@/lib/db/schema"
import { getSession } from "@/lib/session"
import { eq } from "drizzle-orm"

export default async function DmarcPage() {
  const session = await getSession()
  if (!session?.user) return null

  const reports = await db.select().from(dmarcReport).where(eq(dmarcReport.userId, session.user.id)).orderBy(dmarcReport.reportDate, "desc")

  return (
	<main className="p-8">
	  <h1 className="text-2xl font-semibold">DMARC Reports</h1>
	  <ul className="mt-4 space-y-3">
		{reports.map((r: any) => (
		  <li key={r.id} className="border p-3 rounded">
			<div className="text-sm text-muted-foreground">{r.domain} • {r.sourceIp} • {r.count}</div>
			<div className="font-medium">{r.disposition.toUpperCase()} • DKIM:{r.dkim} SPF:{r.spf}</div>
			<div className="text-xs mt-1">{new Date(r.reportDate).toLocaleString()}</div>
		  </li>
		))}
	  </ul>
	</main>
  )
}
