"use client";

// Small pieces shared by the login and register pages

export function FormField({ label, type = "text", value, onChange, required = true, autoComplete }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0E290E]"
      />
    </label>
  );
}

// After logging in we send people back to where they came from,
// e.g. /login?next=/checkout. We only allow paths on our own site,
// so a link can't send them off to another website.
export function getNextPage() {
  const next = new URLSearchParams(window.location.search).get("next");
  if (next && next.startsWith("/") && !next.startsWith("//")) {
    return next;
  }
  return "/";
}
