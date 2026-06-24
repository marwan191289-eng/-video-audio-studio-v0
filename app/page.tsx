export default function Page() {
  return (
    <main className="min-h-screen p-8">
      <header className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">Nexus Axis Studio</h1>
        <p className="mt-2 text-muted-foreground">Deliverability tools and inbox for your domains.</p>
        <nav className="mt-4 space-x-4">
          <a className="underline" href="/contact">Contact</a>
          <a className="underline" href="/newsletter">Newsletter</a>
          <a className="underline" href="/dashboard">Dashboard</a>
          <a className="underline" href="/admin">Admin</a>
        </nav>
      </header>
      <section className="max-w-4xl mx-auto mt-12">
        <div className="border rounded p-6">
          <h2 className="text-xl font-semibold">What we do</h2>
          <p className="mt-2">We provide email deliverability insights, DMARC reporting and an integrated inbox to manage messages.</p>
        </div>
      </section>
    </main>
  )
}
