"use client"

import { useState } from "react"

export default function ComposePage() {
  const [to, setTo] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [status, setStatus] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
	e.preventDefault()
	setStatus("sending")
	try {
	  const res = await fetch("/api/messages", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ to, subject, body }),
	  })
	  const data = await res.json()
	  if (res.ok) {
		setStatus("sent")
		setTo("")
		setSubject("")
		setBody("")
	  } else {
		setStatus(data?.message ?? "error")
	  }
	} catch (err) {
	  setStatus("error")
	}
  }

  return (
	<main className="p-8">
	  <h1 className="text-2xl font-semibold">Compose</h1>
	  <form onSubmit={handleSubmit} className="mt-4 space-y-3 max-w-lg">
		<div>
		  <label className="block text-sm">To</label>
		  <input value={to} onChange={(e) => setTo(e.target.value)} className="w-full border px-2 py-1" />
		</div>
		<div>
		  <label className="block text-sm">Subject</label>
		  <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border px-2 py-1" />
		</div>
		<div>
		  <label className="block text-sm">Message</label>
		  <textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full border px-2 py-1 h-40" />
		</div>
		<div>
		  <button className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
		</div>
		{status && <div className="text-sm mt-2">Status: {status}</div>}
	  </form>
	</main>
  )
}
