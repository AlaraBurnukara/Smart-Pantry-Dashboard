import { useEffect, useRef } from "react";
import { ShieldAlert, X } from "lucide-react";

export default function DeleteAccountModal({ open, onClose, onConfirm }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };

    dialogRef.current.addEventListener("keydown", handleKeyDown);
    first?.focus();
    return () => dialogRef.current?.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      role="dialog" aria-modal="true" aria-labelledby="delete-title"
    >
      <div ref={dialogRef} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-card outline-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <h2 id="delete-title" className="text-lg font-semibold text-ink-base">Delete account</h2>
          </div>
          <button aria-label="Close" onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
            <X className="h-5 w-5 text-ink-base" />
          </button>
        </div>

        <p className="mt-3 text-sm text-ink-muted">
          This action is permanent. Your profile and data will be removed.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 font-semibold text-ink-base hover:bg-gray-50 sm:w-auto"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-full rounded-xl bg-red-500 px-4 py-2 font-semibold text-white shadow-card transition hover:bg-red-600 sm:w-auto"
            onClick={onConfirm}
          >
            Yes, delete permanently
          </button>
        </div>
      </div>
    </div>
  );
}
