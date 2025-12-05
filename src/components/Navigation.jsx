import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const { pathname } = useLocation();
  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/pantry", label: "Pantry" },
    { path: "/manage-items", label: "Manage Items" },
    { path: "/recipes", label: "Recipes" },
    { path: "/waste-tracker", label: "Waste Tracker" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-emerald-100">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-emerald-900 font-semibold">
          {/* Leaf logo */}
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden className="text-emerald-600">
            <path
              fill="currentColor"
              d="M20.4 3.6c-6.1-.7-10.2 1.8-12.5 4.1c-2.3 2.3-4.8 6.4-4.1 12.5a1 1 0 0 0 1.1.9c6.1-.7 10.2-3.2 12.5-5.5c2.3-2.3 4.8-6.4 5.5-12.5a1 1 0 0 0-1-1.1Z"
            />
            <path fill="currentColor" d="M7 17c1.5-3.5 4.3-6.3 8-8" opacity=".4" />
          </svg>
          <span>SmartPantry</span>
        </Link>

        <nav className="flex items-center gap-2">
          {links.map((l) => {
            const active = pathname === l.path;
            return (
              <Link
                key={l.path}
                to={l.path}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-emerald-700 bg-emerald-50 rounded-full px-3 py-1 font-semibold"
                    : "text-sm text-gray-600 hover:text-emerald-700 px-3 py-1 rounded-full"
                }
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
