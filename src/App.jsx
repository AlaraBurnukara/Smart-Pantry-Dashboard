import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import DashboardPage from "./pages/DashboardPage";
import PantryPage from "./pages/PantryPage";
import ManageItemsPage from "./pages/ManageItemsPage";
import RecipesPage from "./pages/RecipesPage";
import WasteTrackerPage from "./pages/WasteTrackerPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "sonner";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-surface text-ink-base">
        <Navigation />
        <main className="mx-auto max-w-6xl px-4 py-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/pantry" element={<PantryPage />} />
            <Route path="/manage-items" element={<ManageItemsPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/waste-tracker" element={<WasteTrackerPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Toaster richColors position="top-right" />
      </div>
    </Router>
  );
}
