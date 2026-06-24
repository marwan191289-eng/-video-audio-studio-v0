import { requireAdmin } from "@/lib/session"
import { db } from "@/lib/db"
import { subscriber } from "@/lib/db/schema"

export default async function SubscribersPage() {
  await requireAdmin()

  const items = await db.select().from(subscriber).orderBy(subscriber.createdAt, "desc")

  return (
	<main className="p-8">
	  <h1 className="text-2xl font-semibold">Subscribers</h1>
	  <ul className="mt-4 space-y-3">
		{items.map((s: any) => (
		  <li key={s.id} className="border p-3 rounded">
			<div className="font-medium">{s.email}</div>
			<div className="text-sm text-muted-foreground">{s.status} • {new Date(s.createdAt).toLocaleString()}</div>
		  </li>
		))}
	  </ul>
	</main>
  )
}
