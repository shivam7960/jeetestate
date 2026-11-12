import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-width py-28 text-center">
      <h1 className="font-display text-5xl text-ink">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-slate">The page may have moved or the project may no longer be listed.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/projects" className="btn btn-ink">Browse projects</Link>
        <Link href="/" className="btn btn-outline-dark">Go home</Link>
      </div>
    </section>
  );
}
