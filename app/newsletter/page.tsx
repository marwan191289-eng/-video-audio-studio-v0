import { subscribeToNewsletter } from "@/app/actions/public"

export default function NewsletterPage() {
  return (
	<main className="p-8 max-w-2xl mx-auto">
	  <h1 className="text-2xl font-semibold">Newsletter</h1>
	  <p className="mt-2">Subscribe to receive updates.</p>
	  <form action={subscribeToNewsletter} className="mt-4">
		<div className="flex gap-2">
		  <input name="email" type="email" placeholder="you@example.com" className="flex-1 border px-2 py-1" required />
		  <button className="bg-blue-600 text-white px-4 py-2 rounded">Subscribe</button>
		</div>
	  </form>
	</main>
  )
}
