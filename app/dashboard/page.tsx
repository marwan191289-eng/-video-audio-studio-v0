import Link from "next/link"
import { getSession } from "@/lib/session"

export default async function DashboardPage() {
  const session = await getSession().catch(() => null)

  if (!session?.user) {
	return (
	  <main className="p-8">
		<h1 className="text-2xl font-semibold">Dashboard</h1>
		<p className="mt-4">You must <a className="underline" href="/sign-in">sign in</a> to view your dashboard.</p>
	  </main>
	)
  }

  return (
	<main className="p-8">
	  <h1 className="text-2xl font-semibold">Dashboard</h1>
	  <p className="mt-2 text-sm">Welcome, {session.user.name ?? session.user.email}</p>
	  <nav className="mt-6 space-x-4">
		<Link href="/dashboard/inbox" className="underline">Inbox</Link>
		<Link href="/dashboard/compose" className="underline">Compose</Link>
		<Link href="/dashboard/dmarc" className="underline">DMARC</Link>
	  </nav>
	</main>
  )
}
