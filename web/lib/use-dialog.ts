"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

/**
 * Modal panel behaviour: focus moves into the panel, Tab stays inside it,
 * Escape closes it, the page behind stops scrolling, and focus returns to
 * whatever opened it.
 */
export function useDialog(open: boolean, onClose: () => void, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!open || !root) return;
    const opener = document.activeElement as HTMLElement | null;
    const items = () => Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.getClientRects().length);
    (root.querySelector<HTMLElement>("[data-autofocus]") ?? items()[0])?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const list = items();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("lock");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("lock");
      opener?.focus?.({ preventScroll: true });
    };
  }, [open, onClose, ref]);
}
