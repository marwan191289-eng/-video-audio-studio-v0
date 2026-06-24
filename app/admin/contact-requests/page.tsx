import { requireAdmin } from "@/lib/session"
import { db } from "@/lib/db"
import { contactRequest } from "@/lib/db/schema"

export default async function ContactRequestsPage() {
  await requireAdmin()

  const items = await db.select().from(contactRequest).orderBy(contactRequest.createdAt, "desc")

  return (
	<main className="p-8">
	  <h1 className="text-2xl font-semibold">Contact Requests</h1>
	  <ul className="mt-4 space-y-4">
		{items.map((it: any) => (
		  <li key={it.id} className="border p-4 rounded">
			<div className="text-sm text-muted-foreground">{it.name} • {it.email} • {new Date(it.createdAt).toLocaleString()}</div>
			<div className="font-medium">{it.subject}</div>
			<p className="mt-2 text-sm">{it.message}</p>
		  </li>
		))}
	  </ul>
	</main>
  )
}
