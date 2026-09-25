"use client";

import { useRef } from "react";
import { useDialog } from "@/lib/use-dialog";
import { HELP_LINKS, MAIN_NAV, StoreSwitch } from "./header";
import { CloseIcon } from "./icons";
import { useUI } from "./providers";

export function MenuDrawer() {
  const { panel, close } = useUI();
  const open = panel === "menu";
  const sheet = useRef<HTMLElement>(null);
  useDialog(open, close, sheet);

  return (
    <div className={"drawer" + (open ? " open" : "")} id="menu-drawer" inert={!open}>
      <div className="scrim" onClick={close} />
      <aside className="sheet" role="dialog" aria-modal="true" aria-label="Menu" ref={sheet}>
        <div className="top">
          <a className="logo" href="#" aria-label="Zasco Home, home page" onClick={close}>
            <span><b>ZASCO</b><small>HOME</small></span>
          </a>
          <button type="button" className="ib" aria-label="Close menu" onClick={close} data-autofocus>
            <CloseIcon />
          </button>
        </div>
        <nav className="dmenu" aria-label="Main">
          {MAIN_NAV.map((n) => (
            <a key={n.label} href="#" onClick={close} data-only={"only" in n ? n.only : undefined}>
              <span>
                {n.label}
                {"chip" in n && <span className="chip">{n.chip}</span>}
              </span>
            </a>
          ))}
        </nav>
        <div className="dlinks">
          {HELP_LINKS.map((l) => (
            <a key={l} href="#" onClick={close}>{l}</a>
          ))}
        </div>
        <div className="dbox">
          <div className="row">
            <span>Store</span>
            <StoreSwitch style={{ fontSize: 14, fontWeight: 600 }} />
          </div>
          <div className="row">
            <span>Language</span>
            <span style={{ fontWeight: 600 }} data-only="us">English</span>
            <span style={{ fontWeight: 600 }} data-only="pk">English · <span className="urdu" lang="ur">اردو</span></span>
          </div>
          <div className="row" data-only="us"><span>Chat with us</span><small>Mon–Sat 9 AM–7 PM ET</small></div>
          <div className="row" data-only="pk"><span>WhatsApp us</span><small>Daily 10 AM–10 PM PKT</small></div>
        </div>
        <div className="dsoc">
          <a href="#">Instagram</a><a href="#">TikTok</a><a href="#">Facebook</a>
        </div>
      </aside>
    </div>
  );
}
