"use client";

import { useRef, useState } from "react";
import { marketStore } from "@/lib/stores";
import { useCart, useMarket, useUI } from "./providers";
import {
  BagIcon, FacebookIcon, HeadsetIcon, HeartIcon, InstagramIcon, LogoMark, MenuIcon, SearchIcon, TikTokIcon, UserIcon,
} from "./icons";

export const HELP_LINKS = ["About", "Shipping & Returns", "Payment", "Our Quality Standard", "Track Order", "Contact"];

export function StoreSwitch({ className = "store", style }: { className?: string; style?: React.CSSProperties }) {
  const market = useMarket();
  const other = market === "us" ? "Pakistan" : "the United States";
  return (
    <button
      type="button"
      className={className}
      style={style}
      aria-label={`Store: ${market === "us" ? "United States" : "Pakistan"}. Switch to ${other}`}
      onClick={() => marketStore.set(market === "us" ? "pk" : "us")}
    >
      <span data-only="us">United States · USD $</span>
      <span data-only="pk">Pakistan · PKR Rs</span>
    </button>
  );
}

export function UtilityBar() {
  return (
    <div className="util">
      <div className="wrap">
        <div className="l">
          <StoreSwitch />
          <span className="sep" />
          <span className="lang" data-only="us">English</span>
          <span className="lang" data-only="pk">
            English · <span className="urdu" lang="ur">اردو</span>
          </span>
        </div>
        <nav aria-label="Help links">
          {HELP_LINKS.map((l) => (
            <a key={l} href="#">{l}</a>
          ))}
        </nav>
        <div className="r">
          <a className="helpline" href="#" data-only="us">
            <HeadsetIcon />
            Chat with us <small>Mon–Sat 9 AM–7 PM ET</small>
          </a>
          <a className="helpline" href="#" data-only="pk">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#1FAF55" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>
            WhatsApp us <small>Daily 10 AM–10 PM PKT</small>
          </a>
          <span className="sep" />
          <div className="soc" aria-label="Social">
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" aria-label="TikTok"><TikTokIcon /></a>
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const MAIN_NAV = [
  { label: "Home", current: true },
  { label: "Bedding" },
  { label: "Towels" },
  { label: "Bath" },
  { label: "Sets" },
  { label: "Wedding & Jahez", only: "pk" },
  { label: "Gifts", only: "us" },
  { label: "Fabric Guide" },
  { label: "New In", chip: "Eid ’27" },
] as const;

export function Header() {
  const { panel, open } = useUI();
  const { count } = useCart();
  const [searching, setSearching] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  return (
    <header className="main">
      <div className="wrap">
        <div className="hdr-left">
          <button
            type="button"
            className="ib burger"
            aria-label="Open menu"
            aria-expanded={panel === "menu"}
            aria-controls="menu-drawer"
            onClick={() => open("menu")}
          >
            <MenuIcon />
          </button>
          <a className="logo" href="#" aria-label="Zasco Home, home page">
            <LogoMark />
            <span><b>ZASCO</b><small>HOME</small></span>
          </a>
        </div>
        <nav className="menu" aria-label="Main">
          {MAIN_NAV.map((n) => (
            <a
              key={n.label}
              href="#"
              className={"current" in n ? "on" : undefined}
              aria-current={"current" in n ? "page" : undefined}
              data-only={"only" in n ? n.only : undefined}
            >
              {n.label}
              {"chip" in n && <span className="chip">{n.chip}</span>}
            </a>
          ))}
        </nav>
        <div className="hdr-r">
          <form
            className={"search" + (searching ? " open" : "")}
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="q" className="vh">Search</label>
            <input
              id="q"
              ref={input}
              type="search"
              placeholder="Search sheets, towels…"
              tabIndex={searching ? 0 : -1}
              onKeyDown={(e) => e.key === "Escape" && setSearching(false)}
            />
            <button
              type="button"
              className="ib"
              aria-label={searching ? "Close search" : "Search"}
              aria-expanded={searching}
              onClick={() => {
                setSearching((s) => !s);
                if (!searching) requestAnimationFrame(() => input.current?.focus());
              }}
            >
              <SearchIcon />
            </button>
          </form>
          <div className="icons">
            <button type="button" className="ib" aria-label="Account"><UserIcon /></button>
            <button type="button" className="ib wish" aria-label="Wishlist"><HeartIcon /></button>
            <button
              type="button"
              className="ib"
              aria-label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}
              aria-expanded={panel === "cart"}
              aria-controls="cart-drawer"
              onClick={() => open("cart")}
            >
              <BagIcon />
              {count > 0 && <span className="n" aria-hidden="true">{count > 9 ? "9+" : count}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
