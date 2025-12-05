// Purpose: Manage items placeholder with consistent visual shell.
import { ListChecks, PlusCircle } from "lucide-react";

export default function ManageItemsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-pale text-brand-primary shadow-card">
          <ListChecks className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold text-ink-base">Manage Items</h1>
          <p className="text-ink-muted">Add, edit, and organise pantry items across locations.</p>
        </div>
      </header>

      <div className="rounded-2xl border border-card-border bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-ink-base">Bulk actions</p>
          <button className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-4 py-2 font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-primaryDark">
            <PlusCircle className="h-4 w-4" />
            New item
          </button>
        </div>
        <p className="mt-2 text-ink-muted">
          Detailed item tables, filters, and expiration sorting will live here next.
        </p>
      </div>
    </div>
  );
}
