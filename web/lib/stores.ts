// Tiny client-side stores read through useSyncExternalStore, so the server
// render (US, empty bag) and the first client render always match.

import { CART_CATALOG } from "./catalog";
import { MARKET_STORAGE_KEY, type Market } from "./markets";

/* ---------------- market ---------------- */

const MARKET_EVENT = "zasco:market";

export const marketStore = {
  subscribe(cb: () => void) {
    const onStorage = (e: StorageEvent) => {
      if (e.key === MARKET_STORAGE_KEY) marketStore.set(e.newValue === "pk" ? "pk" : "us", false);
    };
    window.addEventListener(MARKET_EVENT, cb);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(MARKET_EVENT, cb);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot: (): Market => (document.documentElement.dataset.market === "pk" ? "pk" : "us"),
  getServerSnapshot: (): Market => "us",
  set(m: Market, persist = true) {
    document.documentElement.dataset.market = m;
    if (persist) {
      try {
        localStorage.setItem(MARKET_STORAGE_KEY, m);
      } catch {}
    }
    window.dispatchEvent(new Event(MARKET_EVENT));
  },
};

/** Inline <head> script: applies the saved market before first paint. */
export const MARKET_BOOT_SCRIPT = `try{if(localStorage.getItem(${JSON.stringify(
  MARKET_STORAGE_KEY,
)})==="pk")document.documentElement.dataset.market="pk"}catch(e){}`;

/* ---------------- bag ---------------- */

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
