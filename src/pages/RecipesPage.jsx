// Purpose: Recipes placeholder showing intent for zero-waste cooking ideas.
import { BookOpen } from "lucide-react";

export default function RecipesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-pale text-brand-primary shadow-card">
          <BookOpen className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold text-ink-base">Recipes</h1>
          <p className="text-ink-muted">Zero-waste recipes tailored to your pantry are on the roadmap.</p>
        </div>
      </header>

      <div className="rounded-2xl border border-card-border bg-white p-6 shadow-card">
        <p className="font-semibold text-ink-base">What&apos;s next</p>
        <p className="mt-1 text-ink-muted">
          Expect seasonal recipes, substitutions, and dynamic filters once pantry data is wired up.
        </p>
      </div>
    </div>
  );
}
