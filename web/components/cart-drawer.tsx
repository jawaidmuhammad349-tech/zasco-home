"use client";

import { useRef, useState } from "react";
import { CART_CATALOG } from "@/lib/catalog";
import { MARKETS, formatPrice } from "@/lib/markets";
import { cartStore } from "@/lib/stores";
import { useDialog } from "@/lib/use-dialog";
import { BagIcon, CashIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon, TruckIcon } from "./icons";
import { Photo } from "./photo";
import { useCart, useMarket, useUI } from "./providers";

export function CartDrawer() {
  const { panel, close } = useUI();
  const open = panel === "cart";
  const market = useMarket();
  const { lines, count } = useCart();
  const sheet = useRef<HTMLElement>(null);
  const [checkoutNote, setCheckoutNote] = useState(false);
  useDialog(open, close, sheet);

  const cfg = MARKETS[market];
  const subtotal = lines.reduce((sum, l) => sum + CART_CATALOG[l.id].price[market] * l.qty, 0);
  const left = Math.max(0, cfg.freeShippingOver - subtotal);
  const progress = Math.min(100, (subtotal / cfg.freeShippingOver) * 100);
  const money = (n: number) => formatPrice(n, market);

  return (
    <div className={"drawer cart" + (open ? " open" : "")} id="cart-drawer" inert={!open}>
      <div className="scrim" onClick={close} />
      <aside className="sheet" role="dialog" aria-modal="true" aria-labelledby="cart-title" ref={sheet}>
        <div className="top">
          <h2 id="cart-title" className="cart-title">
            Your bag {count > 0 && <span>({count})</span>}
          </h2>
          <button type="button" className="ib" aria-label="Close bag" onClick={close} data-autofocus>
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-ic"><BagIcon size={28} /></span>
            <p><b>Your bag is empty.</b></p>
            <p>Start with our bestsellers: the sheets and towels customers reorder most.</p>
            <a href="#h-best" className="btn btn-buy" onClick={close}>Shop bestsellers</a>
          </div>
        ) : (
          <>
            <div className="ship-meter" role="status">
              <p>
                {left > 0 ? (
                  <>You&apos;re <b>{money(left)}</b> away from free {market === "us" ? "shipping" : "delivery"}.</>
                ) : (
                  <><b>Free {market === "us" ? "shipping" : "delivery"}</b> unlocked.</>
                )}
              </p>
              <div className="bar" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
            </div>

            <ul className="lines">
              {lines.map((l) => {
                const p = CART_CATALOG[l.id];
                return (
                  <li key={l.key} className="line">
                    <div className="ph"><Photo src={p.image} alt="" fill sizes="80px" /></div>
                    <div className="line-info">
                      <div className="line-top">
                        <b>{p.name}</b>
                        <button type="button" className="rm" aria-label={`Remove ${p.name}`} onClick={() => cartStore.remove(l.key)}>
                          <TrashIcon />
                        </button>
                      </div>
                      {l.variant && <small>{l.variant}</small>}
                      <div className="line-bottom">
                        <div className="qty sm" role="group" aria-label={`Quantity of ${p.name}`}>
                          <button type="button" aria-label="Decrease quantity" onClick={() => cartStore.setQty(l.key, l.qty - 1)}>
                            <MinusIcon size={14} strokeWidth={2} />
                          </button>
                          <span>{l.qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            disabled={l.qty >= cartStore.MAX_QTY}
                            onClick={() => cartStore.setQty(l.key, l.qty + 1)}
                          >
                            <PlusIcon size={14} strokeWidth={2} />
                          </button>
                        </div>
                        <span className="line-price">{money(p.price[market] * l.qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="cart-foot">
              <div className="cart-perk">
                {market === "pk" ? (
                  <><CashIcon /> Cash on delivery available. We confirm every order on WhatsApp before dispatch.</>
                ) : (
                  <><TruckIcon /> 30-night returns on every order.</>
                )}
              </div>
              <div className="subtotal">
                <span>Subtotal</span>
                <b>{money(subtotal)}</b>
              </div>
              <p className="cart-note">{cfg.shippingNote}</p>
              <button type="button" className="btn btn-buy checkout" onClick={() => setCheckoutNote(true)}>
                Checkout · {money(subtotal)}
              </button>
              <p className="cart-note" role="status">
                {checkoutNote ? "Checkout opens here once payments are connected." : ""}
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
