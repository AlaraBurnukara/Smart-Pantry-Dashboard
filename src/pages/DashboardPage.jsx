import { useEffect, useMemo, useState } from "react";
import { Activity, Bell, Shield, User2, Mail, Phone, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white border border-emerald-100 shadow-sm p-6">
      <div className="flex items-center justify-center h-10">{icon}</div>
      <p className="mt-3 text-3xl font-bold text-emerald-900 text-center">{value}</p>
      <p className="text-xs text-emerald-900/70 text-center mt-1">{label}</p>
    </div>
  );
}

export function DashboardPage() {
  /* ---------- committed state ---------- */
  const [name, setName] = useState("Sarah");
  const [email, setEmail] = useState("sarah.johnson@email.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [notif, setNotif] = useState({ expiry: true, lowStock: true, recipes: false });

  /* ---------- draft state (UI edits don’t apply until Save) ---------- */
  const [profileDraft, setProfileDraft] = useState({ name, email, phone });
  const [notifDraft, setNotifDraft] = useState(notif);

  /* ---------- password form ---------- */
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });

  /* ---------- recent activity ---------- */
  const [activity, setActivity] = useState([
    { text: "Updated email", time: "2 days ago" },
    { text: "Enabled expiry reminders", time: "5 days ago" },
    { text: "Saved 5 items from waste", time: "1 week ago" },
    { text: "Weekly audit completed", time: "1 week ago" },
  ]);
  const log = (text) => setActivity((prev) => [{ text, time: "just now" }, ...prev]);

  /* ---------- animated stats ---------- */
  const [food, setFood] = useState(0);
  const [families, setFamilies] = useState(0);
  const [waste, setWaste] = useState(0);
  useEffect(() => {
    const animate = (to, set, ms = 1100) => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / ms, 1);
        set(Math.floor(to * p));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    animate(472, setFood);
    animate(129, setFamilies);
    animate(38, setWaste);
  }, []);

  /* ---------- icons ---------- */
  const statIcons = useMemo(
    () => ({
      carrot: <span className="text-2xl">🥕</span>,
      people: <span className="text-2xl">👥</span>,
      recycle: <span className="text-2xl">♻️</span>,
    }),
    []
  );

  /* ---------- actions ---------- */
  const saveProfile = () => {
    const changes = [];
    if (profileDraft.name !== name) changes.push("Changed name");
    if (profileDraft.email !== email) changes.push("Changed email");
    if (profileDraft.phone !== phone) changes.push("Changed phone");

    setName(profileDraft.name);
    setEmail(profileDraft.email);
    setPhone(profileDraft.phone);

    if (changes.length === 0) {
      toast.info("No profile changes");
    } else {
      toast.success("Profile saved");
      changes.forEach((c) => log(c));
    }
  };

  const cancelProfile = () => {
    setProfileDraft({ name, email, phone });
    toast.message("Profile changes discarded");
  };

  const saveNotifications = () => {
    const diffs = [];
    Object.entries(notifDraft).forEach(([k, v]) => {
      if (v !== notif[k]) diffs.push(`Notification "${k}": ${notif[k] ? "ON" : "OFF"} → ${v ? "ON" : "OFF"}`);
    });
    setNotif(notifDraft);
    if (diffs.length === 0) {
      toast.info("No notification changes");
    } else {
      toast.success("Notification preferences updated");
      diffs.forEach((d) => log(d));
    }
  };

  const cancelNotifications = () => setNotifDraft(notif);

  const savePassword = () => {
    if (!pwd.next || pwd.next.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (pwd.next !== pwd.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Password changed");
    log("Changed password");
    setPwd({ current: "", next: "", confirm: "" });
  };
  const cancelPassword = () => setPwd({ current: "", next: "", confirm: "" });

  const deleteAccount = () => {
    toast.warning("Account deletion requested (demo action)");
    log("Requested account deletion");
  };

  return (
    <main>
      {/* HERO (centered) */}
      <section
        className="relative"
        style={{
          background:
            "radial-gradient(1200px 420px at 50% -60%, rgba(16,185,129,.35), transparent), linear-gradient(180deg, #ecfdf5 0%, #f6fffb 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-emerald-900">Welcome back, {name}!</h1>
          <p className="mt-2 text-emerald-900/80">Here’s your SmartPantry overview.</p>
        </div>
      </section>

      {/* PERSONAL IMPACT */}
      <section className="mx-auto max-w-7xl px-4 -mt-8 md:-mt-10">
        <div className="flex items-center gap-2 mb-4 text-emerald-900">
          <Activity className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Your Personal Impact</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={statIcons.carrot} label="Food Saved" value={`${food} kg`} />
          <StatCard icon={statIcons.people} label="Families Helped" value={`${families}`} />
          <StatCard icon={statIcons.recycle} label="Waste Reduced" value={`${waste}%`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SETTINGS */}
          <div className="rounded-2xl bg-white border border-emerald-100 shadow-sm">
            <div className="p-6 border-b border-emerald-100">
              <h3 className="text-emerald-900 font-semibold">Settings</h3>
            </div>

            {/* Edit Profile (drafted) */}
            <details open className="group">
              <summary className="list-none cursor-pointer select-none">
                <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-100">
                  <div className="flex items-center gap-2 text-emerald-900">
                    <User2 className="h-5 w-5" />
                    <span className="font-medium">Edit Profile</span>
                  </div>
                  <span className="text-gray-500 group-open:rotate-180 transition">⌄</span>
                </div>
              </summary>
              <div className="px-6 pb-6 pt-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="text-sm">
                    <span className="block mb-1 text-emerald-900/80">Name</span>
                    <input
                      className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm"
                      value={profileDraft.name}
                      onChange={(e) => setProfileDraft((s) => ({ ...s, name: e.target.value }))}
                    />
                  </label>
                  <label className="text-sm">
                    <span className="block mb-1 text-emerald-900/80">Phone</span>
                    <div className="flex items-center rounded-xl border border-emerald-100 px-3 py-2">
                      <Phone className="h-4 w-4 text-emerald-700 mr-2" />
                      <input
                        className="w-full outline-none text-sm"
                        value={profileDraft.phone}
                        onChange={(e) => setProfileDraft((s) => ({ ...s, phone: e.target.value }))}
                      />
                    </div>
                  </label>
                </div>
                <label className="text-sm block">
                  <span className="block mb-1 text-emerald-900/80">Email</span>
                  <div className="flex items-center rounded-xl border border-emerald-100 px-3 py-2">
                    <Mail className="h-4 w-4 text-emerald-700 mr-2" />
                    <input
                      className="w-full outline-none text-sm"
                      value={profileDraft.email}
                      onChange={(e) => setProfileDraft((s) => ({ ...s, email: e.target.value }))}
                    />
                  </div>
                </label>
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={saveProfile}
                    className="rounded-xl px-4 py-2 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={cancelProfile}
                    className="rounded-xl px-4 py-2 text-sm font-medium bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </details>

            {/* Notification Preferences — segmented controls + Save/Cancel */}
            <details className="group">
              <summary className="list-none cursor-pointer select-none">
                <div className="flex items-center justify-between px-6 py-4 border-t border-b border-emerald-100">
                  <div className="flex items-center gap-2 text-emerald-900">
                    <Bell className="h-5 w-5" />
                    <span className="font-medium">Notification Preferences</span>
                  </div>
                  <span className="text-gray-500 group-open:rotate-180 transition">⌄</span>
                </div>
              </summary>
              <div className="px-6 pb-6 pt-2 space-y-4">
                {[
                  { key: "expiry", label: "Expiry reminders" },
                  { key: "lowStock", label: "Low stock alerts" },
                  { key: "recipes", label: "Recipe suggestions" },
                ].map(({ key, label }) => {
                  const on = !!notifDraft[key];
                  return (
                    <div key={key} className="flex items-center justify-between rounded-xl border border-emerald-100 px-3 py-2">
                      <span className="text-sm text-emerald-900/90">{label}</span>
                      <div className="seg" role="group" aria-label={`${label} on/off`}>
                        <button
                          type="button"
                          className={`seg-btn ${!on ? "seg-active" : ""}`}
                          onClick={() => setNotifDraft((s) => ({ ...s, [key]: false }))}
                        >
                          Off
                        </button>
                        <button
                          type="button"
                          className={`seg-btn ${on ? "seg-active" : ""}`}
                          onClick={() => setNotifDraft((s) => ({ ...s, [key]: true }))}
                        >
                          On
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={saveNotifications}
                    className="rounded-xl px-4 py-2 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={cancelNotifications}
                    className="rounded-xl px-4 py-2 text-sm font-medium bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </details>

            {/* Privacy & Security — Save + Cancel + Delete Account */}
            <details className="group">
              <summary className="list-none cursor-pointer select-none">
                <div className="flex items-center justify-between px-6 py-4 border-t border-emerald-100">
                  <div className="flex items-center gap-2 text-emerald-900">
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">Privacy & Security</span>
                  </div>
                  <span className="text-gray-500 group-open:rotate-180 transition">⌄</span>
                </div>
              </summary>
              <div className="px-6 pb-6 pt-2 space-y-3">
                <label className="text-sm block">
                  <span className="block mb-1 text-emerald-900/80">Current Password</span>
                  <input
                    type="password"
                    className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm"
                    value={pwd.current}
                    onChange={(e) => setPwd((s) => ({ ...s, current: e.target.value }))}
                  />
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="text-sm block">
                    <span className="block mb-1 text-emerald-900/80">New Password</span>
                    <input
                      type="password"
                      className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm"
                      value={pwd.next}
                      onChange={(e) => setPwd((s) => ({ ...s, next: e.target.value }))}
                    />
                  </label>
                  <label className="text-sm block">
                    <span className="block mb-1 text-emerald-900/80">Confirm Password</span>
                    <input
                      type="password"
                      className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm"
                      value={pwd.confirm}
                      onChange={(e) => setPwd((s) => ({ ...s, confirm: e.target.value }))}
                    />
                  </label>
                </div>
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={savePassword}
                    className="rounded-xl px-4 py-2 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelPassword}
                    className="rounded-xl px-4 py-2 text-sm font-medium bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteAccount}
                    className="rounded-xl px-4 py-2 text-sm font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </details>
          </div>

          {/* RECENT ACTIVITY (specific messages) */}
          <div className="rounded-2xl bg-white border border-emerald-100 shadow-sm">
            <div className="p-6 border-b border-emerald-100">
              <h3 className="text-emerald-900 font-semibold">Recent Activity</h3>
            </div>
            <ul className="p-4 md:p-6 space-y-3">
              {activity.map((it, i) => (
                <li key={i} className="rounded-xl border border-emerald-100 px-4 py-3 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-emerald-900">{it.text}</p>
                    <p className="text-xs text-emerald-900/60">{it.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* COMMUNITY IMPACT — centered heading like reference */}
      <section className="mt-10 md:mt-14" style={{ background: "linear-gradient(180deg,#ecfdf5 0%, #f6fffb 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="section-head">
            <span className="section-head-icon" />
            <h2 className="text-xl font-semibold">Community Impact</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard icon={<span className="text-2xl">👥</span>} label="Total Families Helped" value="129" />
            <StatCard icon={<span className="text-2xl">📦</span>} label="Total Food Distributed" value="8956 kg" />
            <StatCard icon={<span className="text-2xl">📉</span>} label="Avg Waste Reduction" value="34%" />
          </div>
        </div>
      </section>

      {/* COMMUNITY VOICES — centered heading like reference */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="section-head">
          <span className="section-head-icon" />
          <h2 className="text-xl font-semibold">Community Voices</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { initials: "SM", quote: "SmartPantry helped me reduce waste at home and I’m saving so much money now!", author: "Sarah M." },
            { initials: "JC", quote: "The recipe suggestions are amazing and my family loves trying new meals!", author: "James C." },
            { initials: "ER", quote: "I didn’t realize how much food I was wasting until SmartPantry tracked it for me.", author: "Emily R." },
            { initials: "DT", quote: "The expiry reminders are so helpful! I’ve stopped throwing away good food.", author: "Daniel T." },
            { initials: "AL", quote: "Love how clean and easy the design is — managing my pantry has never felt this simple.", author: "Ava L." },
            { initials: "LS", quote: "It feels great knowing I’m reducing waste and helping the planet.", author: "Liam S." },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl bg-white border border-emerald-100 shadow-sm p-5 flex gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-600 text-white text-sm flex items-center justify-center">
                {c.initials}
              </div>
              <div>
                <p className="text-sm text-emerald-900/90">“{c.quote}”</p>
                <p className="text-xs text-emerald-900/60 mt-2">— {c.author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
