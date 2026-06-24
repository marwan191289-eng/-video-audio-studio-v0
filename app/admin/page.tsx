import Link from "next/link"
import { requireAdmin } from "@/lib/session"

export default async function AdminPage() {
  try {
	await requireAdmin()
  } catch (err) {
	return (
	  <main className="p-8">
		<h1 className="text-2xl font-semibold">Admin</h1>
		<p className="mt-4">Unauthorized.</p>
	  </main>
	)
  }

  return (
	<main className="p-8">
	  <h1 className="text-2xl font-semibold">Admin</h1>
	  <nav className="mt-6 space-x-4">
		<Link href="/admin/contact-requests" className="underline">Contact Requests</Link>
		<Link href="/admin/subscribers" className="underline">Subscribers</Link>
	  </nav>
	</main>
  )
}
