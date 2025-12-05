// Purpose: Waste tracker placeholder describing future analytics.
import { Recycle, TrendingUp } from "lucide-react";

export default function WasteTrackerPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-pale text-brand-primary shadow-card">
          <Recycle className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold text-ink-base">Waste Tracker</h1>
          <p className="text-ink-muted">Monitor reductions and streaks aligned with Zero Hunger.</p>
        </div>
      </header>

      <div className="rounded-2xl border border-card-border bg-white p-6 shadow-card">
        <div className="flex items-center gap-2 text-brand-primary">
          <TrendingUp className="h-5 w-5" />
          <p className="font-semibold text-ink-base">Dashboard analytics will render here.</p>
        </div>
        <p className="mt-1 text-ink-muted">
          Charts for weekly waste savings, streaks, and goal tracking will be part of the next iteration.
        </p>
      </div>
    </div>
  );
}
