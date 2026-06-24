import { db } from "@/lib/db"
import { subscriber } from "@/lib/db/schema"
import { requireAdmin } from "@/lib/session"

export async function GET() {
  await requireAdmin()

  const items = await db.select().from(subscriber).orderBy(subscriber.createdAt, "desc")

  return new Response(JSON.stringify(items), { status: 200, headers: { "content-type": "application/json" } })
}
