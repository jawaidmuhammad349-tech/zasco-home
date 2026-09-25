"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { cartStore, marketStore } from "@/lib/stores";

type Panel = "menu" | "cart" | null;
type UI = { panel: Panel; open: (p: Exclude<Panel, null>) => void; close: () => void };

const UIContext = createContext<UI | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [panel, setPanel] = useState<Panel>(null);
  const open = useCallback((p: Exclude<Panel, null>) => setPanel(p), []);
  const close = useCallback(() => setPanel(null), []);
  const value = useMemo(() => ({ panel, open, close }), [panel, open, close]);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ui = useContext(UIContext);
  if (!ui) throw new Error("useUI must be used inside <Providers>");
  return ui;
}

export function useMarket() {
  return useSyncExternalStore(marketStore.subscribe, marketStore.getSnapshot, marketStore.getServerSnapshot);
}

export function useCart() {
  const lines = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  return { lines, count: lines.reduce((n, l) => n + l.qty, 0) };
}

/** Add to bag and open the bag panel. */
export function useAddToBag() {
  const { open } = useUI();
  return useCallback(
    (id: string, variant = "", qty = 1) => {
      cartStore.add(id, variant, qty);
      open("cart");
    },
    [open],
  );
}
