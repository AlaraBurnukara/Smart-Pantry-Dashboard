// Purpose: Pantry landing page placeholder styled to match dashboard shell.
import { ShoppingBasket } from "lucide-react";

export default function PantryPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-pale text-brand-primary shadow-card">
          <ShoppingBasket className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold text-ink-base">Pantry</h1>
          <p className="text-ink-muted">Track what is in stock and what is running low.</p>
        </div>
      </header>

      <div className="rounded-2xl border border-card-border bg-white p-6 shadow-card">
        <p className="font-semibold text-ink-base">Coming soon</p>
        <p className="mt-1 text-ink-muted">Interactive pantry shelves and batch updates will appear here.</p>
      </div>
    </div>
  );
}
