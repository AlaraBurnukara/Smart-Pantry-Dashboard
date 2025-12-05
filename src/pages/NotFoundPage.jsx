// Catch-all 404 page
import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
      <span className="mt-6 grid h-14 w-14 place-items-center rounded-full bg-brand-pale text-brand-primary shadow-card">
        <Compass className="h-6 w-6" />
      </span>
      <h1 className="text-2xl font-semibold text-ink-base">Page not found</h1>
      <p className="text-ink-muted">
        The route you tried doesn&apos;t exist. Pick a page from navigation to continue.
      </p>
      <Link
        to="/"
        className="rounded-xl bg-brand-primary px-4 py-2 font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-primaryDark"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
