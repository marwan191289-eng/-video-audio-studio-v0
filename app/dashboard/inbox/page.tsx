import { db } from "@/lib/db"
import { message } from "@/lib/db/schema"
import { getSession } from "@/lib/session"
import { eq } from "drizzle-orm"

export default async function InboxPage() {
  const session = await getSession()
  if (!session?.user) return null

  const msgs = await db.select().from(message).where(eq(message.userId, session.user.id)).orderBy(message.createdAt, "desc")

  return (
	<main className="p-8">
	  <h1 className="text-2xl font-semibold">Inbox</h1>
	  <ul className="mt-4 space-y-4">
		{msgs.map((m: any) => (
		  <li key={m.id} className="border p-4 rounded">
			<div className="text-sm text-muted-foreground">{m.fromAddr} → {m.toAddr} • {new Date(m.createdAt).toLocaleString()}</div>
			<div className="font-medium">{m.subject}</div>
			<p className="mt-2 text-sm">{m.snippet}</p>
		  </li>
		))}
	  </ul>
	</main>
  )
}
