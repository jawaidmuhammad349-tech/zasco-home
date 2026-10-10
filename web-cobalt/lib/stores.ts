// Tiny client-side bag store read through useSyncExternalStore, so the server
// render (empty bag) and the first client render always match.

import { CART_CATALOG } from "./catalog";


export type CartLine = { key: string; id: string; variant: string; qty: number };

const CART_KEY = "zasco-bag";
const MAX_QTY = 10;
const EMPTY: CartLine[] = [];
let lines: CartLine[] | null = null;
const listeners = new Set<() => void>();

function read(): CartLine[] {
  if (lines) return lines;
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || "[]") as CartLine[];
    lines = Array.isArray(raw) ? raw.filter((l) => CART_CATALOG[l.id] && l.qty > 0) : [];
  } catch {
    lines = [];
  }
  return lines;
}

function write(next: CartLine[]) {
  lines = next;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

export const cartStore = {
  subscribe(cb: () => void) {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY) {
        lines = null;
        cb();
      }
    };
    listeners.add(cb);
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(cb);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot: read,
  getServerSnapshot: () => EMPTY,
  add(id: string, variant = "", qty = 1) {
    const key = variant ? `${id}|${variant}` : id;
    const cur = read();
    const hit = cur.find((l) => l.key === key);
    write(
      hit
        ? cur.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
        : [...cur, { key, id, variant, qty: Math.min(MAX_QTY, qty) }],
    );
  },
  setQty(key: string, qty: number) {
    if (qty < 1) return cartStore.remove(key);
    write(read().map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)));
  },
  remove(key: string) {
    write(read().filter((l) => l.key !== key));
  },
  MAX_QTY,
};
