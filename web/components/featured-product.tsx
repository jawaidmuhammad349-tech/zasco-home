"use client";

import { useState, useSyncExternalStore } from "react";
import { FEATURED as F } from "@/lib/catalog";
import { estimateDelivery, formatCountdown } from "@/lib/delivery";
import { BagIcon, CashIcon, ExchangeIcon, HeartIcon, MinusIcon, PlusIcon, ReturnIcon, TruckIcon } from "./icons";
import { Photo } from "./photo";
import { useAddToBag, useMarket } from "./providers";
import { Price, Stars } from "./ui";

// Current minute, read on the client only (0 during server render).
const minuteClock = {
  subscribe: (cb: () => void) => {
    const t = setInterval(cb, 15_000);
    return () => clearInterval(t);
  },
  get: () => Math.floor(Date.now() / 60_000),
  server: () => 0,
};

function DeliveryEstimate() {
  const market = useMarket();
  const minute = useSyncExternalStore(minuteClock.subscribe, minuteClock.get, minuteClock.server);
  const est = minute ? estimateDelivery(market, new Date(minute * 60_000)) : null;
  return (
    <div className="deliv">
      <TruckIcon size={34} className="deliv-ic" />
      <div>
        <div style={{ fontWeight: 600 }}>
          {est?.minutesLeft != null ? (
            <>Order in the next <span>{formatCountdown(est.minutesLeft)}</span> for delivery</>
          ) : (
            "Order now for delivery"
          )}
        </div>
        <div className="when" style={est ? undefined : { visibility: "hidden" }}>
          <b>{est?.from ?? "Mon 00"}</b>
          <span className="to" aria-label="to">–</span>
          <b>{est?.to ?? "Mon 00"}</b>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProduct() {
  const add = useAddToBag();
  const [img, setImg] = useState(0);
  const [colour, setColour] = useState(0);
  const [size, setSize] = useState(F.defaultSize);
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState(false);
  const sz = F.sizes[size];
  const facts = F.facts.map(([k, v]) => (k === "Size" ? [k, sz.dims] : [k, v]));

  return (
    <section className="feat" aria-labelledby="h-feat" style={{ paddingTop: 24 }}>
      <div className="gal">
        <div className="seal" aria-hidden="true">
          <svg viewBox="0 0 124 124">
            <defs>
              <path id="seal-circle" d="M62,62 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <text fill="#0E2A33" fontWeight="700" fontSize="11.5" letterSpacing="3.2" style={{ fontFamily: "var(--body)" }}>
              <textPath href="#seal-circle">FEATURED · FEATURED · FEATURED ·</textPath>
            </text>
          </svg>
          <b>600</b>
        </div>
        <div className="ph main-ph">
          <Photo
            key={img}
            src={F.gallery[img].src}
            alt={F.gallery[img].alt}
            fill
            sizes="(max-width: 860px) 100vw, 55vw"
          />
        </div>
        <div className="thumbs">
          {F.gallery.map((g, k) => (
            <button
              type="button"
              key={g.src}
              className={"ph" + (k === img ? " on" : "")}
              aria-label={`Show photo ${k + 1}: ${g.alt}`}
              aria-pressed={k === img}
              onClick={() => setImg(k)}
            >
              <Photo src={g.src} alt="" fill sizes="(max-width: 860px) 25vw, 140px" />
            </button>
          ))}
        </div>
      </div>

      <div className="buybox">
        <DeliveryEstimate />
        <h2 id="h-feat">{F.name}</h2>
        <div className="rate">
          <Stars rating={F.rating} /> {F.rating} · <a href="#">{F.reviews} reviews</a>
        </div>
        <Price price={F.price} className="price feat-price" style={{ marginTop: 14 }} />
        <div className="stock">
          {F.summary} · <span data-only="us">Free shipping over $75</span>
          <span data-only="pk">Cash on delivery available</span>
        </div>

        <fieldset className="opt">
          <legend className="opt-l">Colour: {F.colours[colour].name}</legend>
          <div className="sw">
            {F.colours.map((c, k) => (
              <button
                type="button"
                key={c.name}
                className={k === colour ? "on" : undefined}
                style={{ background: c.hex }}
                aria-label={c.name}
                aria-pressed={k === colour}
                onClick={() => setColour(k)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="opt">
          <legend className="opt-l">
            <span>Size: {sz.name} ({sz.dims})</span>
            <a href="#" className="size-guide">Size guide</a>
          </legend>
          <div className="sizes">
            {F.sizes.map((s, k) => (
              <button
                type="button"
                key={s.name}
                className={k === size ? "on" : s.soldOut ? "x" : undefined}
                disabled={s.soldOut}
                aria-pressed={k === size}
                aria-label={s.soldOut ? `${s.name}, sold out` : s.name}
                onClick={() => setSize(k)}
              >
                {s.name}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="buyrow">
          <div className="qty" role="group" aria-label="Quantity">
            <button type="button" aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}>
              <MinusIcon size={16} strokeWidth={2} />
            </button>
            <span aria-live="polite">{qty}</span>
            <button type="button" aria-label="Increase quantity" disabled={qty >= 10} onClick={() => setQty((q) => Math.min(10, q + 1))}>
              <PlusIcon size={16} strokeWidth={2} />
            </button>
          </div>
          <button
            type="button"
            className="btn btn-buy"
            onClick={() => add(F.id, `${F.colours[colour].name} · ${sz.name}`, qty)}
          >
            <BagIcon size={18} strokeWidth={2} />
            Add to bag
          </button>
          <button
            type="button"
            className={"heart" + (saved ? " saved" : "")}
            aria-label="Save to wishlist"
            aria-pressed={saved}
            onClick={() => setSaved((s) => !s)}
          >
            <HeartIcon size={20} strokeWidth={2} />
          </button>
        </div>

        <ul className="trustline">
          <li data-only="us"><TruckIcon />Free shipping over $75</li>
          <li data-only="us"><ReturnIcon />30-night returns</li>
          <li data-only="pk"><CashIcon />Cash on delivery</li>
          <li data-only="pk"><ExchangeIcon />7-day exchange on WhatsApp</li>
        </ul>

        <div className="facts">
          <header>
            <span>Fabric Facts</span>
            <span style={{ fontWeight: 500, opacity: 0.8 }}>{F.name.replace(" Set", "")}</span>
          </header>
          <dl>
            {facts.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
