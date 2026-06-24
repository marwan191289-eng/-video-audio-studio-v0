import { submitContactRequest } from "@/app/actions/public"

export default function ContactPage() {
  return (
	<main className="p-8 max-w-2xl mx-auto">
	  <h1 className="text-2xl font-semibold">Contact</h1>
	  <form action={submitContactRequest} className="mt-4 space-y-3">
		<div>
		  <label className="block text-sm">Name</label>
		  <input name="name" className="w-full border px-2 py-1" required />
		</div>
		<div>
		  <label className="block text-sm">Email</label>
		  <input name="email" type="email" className="w-full border px-2 py-1" required />
		</div>
		<div>
		  <label className="block text-sm">Company</label>
		  <input name="company" className="w-full border px-2 py-1" />
		</div>
		<div>
		  <label className="block text-sm">Subject</label>
		  <input name="subject" className="w-full border px-2 py-1" required />
		</div>
		<div>
		  <label className="block text-sm">Message</label>
		  <textarea name="message" className="w-full border px-2 py-1 h-40" required />
		</div>
		<div>
		  <button className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
		</div>
	  </form>
	</main>
  )
}
