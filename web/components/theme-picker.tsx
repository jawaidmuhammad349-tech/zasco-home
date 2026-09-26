"use client";

// Temporary: lets the owner compare colour schemes on the live site.
// Remove this component (and the html[data-theme] rules in globals.css) once one is chosen.

import { useSyncExternalStore } from "react";

const THEMES = [
  { id: "", name: "1 · Ink + Tangerine", a: "#0E2A33", b: "#FF6B2C" },
  { id: "coral", name: "2 · Navy + Coral", a: "#0F1B3D", b: "#FF5A36" },
  { id: "marigold", name: "3 · Aubergine + Marigold", a: "#3B1F4A", b: "#F5A623" },
  { id: "cobalt", name: "4 · Black + Cobalt", a: "#111418", b: "#2F5BFF" },
  { id: "pink", name: "5 · Charcoal + Hot Pink", a: "#1A1A1A", b: "#FF3E7F" },
];

const store = {
  subscribe: (cb: () => void) => {
    window.addEventListener("zasco:theme", cb);
    return () => window.removeEventListener("zasco:theme", cb);
  },
  get: () => document.documentElement.dataset.theme ?? "",
  server: () => "",
  set(id: string) {
    const d = document.documentElement;
    if (id) d.dataset.theme = id;
    else delete d.dataset.theme;
    try {
      localStorage.setItem("zasco-theme", id);
    } catch {}
    window.dispatchEvent(new Event("zasco:theme"));
  },
};

export function ThemePicker() {
  const cur = useSyncExternalStore(store.subscribe, store.get, store.server);
  const name = THEMES.find((t) => t.id === cur)?.name ?? THEMES[0].name;
  return (
    <div className="theme-pick" role="group" aria-label="Preview colour scheme">
      <span>{name}</span>
      {THEMES.map((t) => (
        <button
          key={t.name}
          type="button"
          aria-label={t.name}
          aria-pressed={t.id === cur}
          onClick={() => store.set(t.id)}
        >
          <i style={{ background: `linear-gradient(135deg, ${t.a} 50%, ${t.b} 50%)` }} />
        </button>
      ))}
    </div>
  );
}
