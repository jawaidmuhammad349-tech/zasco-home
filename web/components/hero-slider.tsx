"use client";

import { useRef, useState } from "react";
import { productById, unsplash } from "@/lib/catalog";
import { ChevronLeft, ChevronRight, PlusIcon } from "./icons";
import { Photo } from "./photo";
import { useAddToBag } from "./providers";
import { Price } from "./ui";

type Slide = {
  theme: "s-ink" | "s-clay" | "s-sand";
  nav: { fg: string; bg: string };
  kicker: { us: string; pk: string };
  title: [string, string, string]; // line 1, accent word, rest of line 2
  body: string;
  cta: { label: string; className: string };
  link: string;
  chips: { us: string[]; pk: string[] };
  image: { src: string; alt: string };
  stamp?: { value: string; key: string; label: string };
  card: { productId: string; eyebrow: string; name: string };
};

const SLIDES: Slide[] = [
  {
    theme: "s-ink",
    nav: { fg: "#FFFFFF", bg: "#1F3A44" },
    kicker: { us: "New · The Hotel Collection", pk: "New · The Hotel Collection" },
    title: ["Hotel-soft.", "Fairly", "priced."],
    body: "400 thread-count percale from export-grade mills, checked by us before it reaches your bed.",
    cta: { label: "Shop the collection", className: "btn btn-buy" },
    link: "See the Fabric Facts →",
    chips: { us: ["400 TC percale", "100% cotton", "Twin – Cal King"], pk: ["400 TC percale", "100% cotton", "Single – King"] },
    image: { src: unsplash("1631049307264-da0ec9d70304"), alt: "A made hotel-style bed with white percale sheets" },
    stamp: { value: "400", key: "Thread count", label: "Cotton percale" },
    card: { productId: "karachi-percale-sheet-set", eyebrow: "Bestseller", name: "Karachi Percale Sheet Set" },
  },
  {
    theme: "s-clay",
    nav: { fg: "#FFFFFF", bg: "#A94F33" },
    kicker: { us: "Gift-boxed sets", pk: "Eid & wedding gifting" },
    title: ["Well chosen.", "Well", "made."],
    body: "Complete bedding and bath sets, gift-boxed with a brass ribbon and ready to give.",
    cta: { label: "Shop gift sets", className: "btn btn-white" },
    link: "Build your own box →",
    chips: { us: ["Gift-boxed", "Set price, no coupons", "Gift note included"], pk: ["Gift-boxed", "Set price, no coupons", "Jahez bundles"] },
    image: { src: unsplash("1616627561950-9f746e330187"), alt: "Striped cotton cushions in rust and cream" },
    card: { productId: "wedding-linen-box", eyebrow: "Gift box", name: "The Wedding Linen Box" },
  },
  {
    theme: "s-sand",
    nav: { fg: "#1F3A44", bg: "#E6DAC6" },
    kicker: { us: "Bath · 600 GSM", pk: "Bath · 600 GSM" },
    title: ["Heavy towels.", "Fast", "dry."],
    body: "Long-staple cotton terry, weighed and listed in grams so you can compare with anyone.",
    cta: { label: "Shop towels", className: "btn btn-buy" },
    link: "What GSM means →",
    chips: { us: ["600 GSM", "Zero-twist terry", "5 colours"], pk: ["600 GSM", "Zero-twist terry", "5 colours"] },
    image: { src: unsplash("1507652313519-d4e9174996dd"), alt: "A bright bathroom with a freestanding tub" },
    stamp: { value: "600", key: "GSM weight", label: "Zero-twist terry" },
    card: { productId: "hotel-bath-towel-pair", eyebrow: "New", name: "Hotel Bath Towel, pair" },
  },
];

function Kicker({ k }: { k: Slide["kicker"] }) {
  if (k.us === k.pk) return <span className="kicker"><i />{k.us}</span>;
  return (
    <>
      <span className="kicker" data-only="us"><i />{k.us}</span>
      <span className="kicker" data-only="pk"><i />{k.pk}</span>
    </>
  );
}

export function HeroSlider() {
  const [cur, setCur] = useState(0);
  const [cycle, setCycle] = useState(0); // restarts the progress bar animation
  const touchX = useRef<number | null>(null);
  const add = useAddToBag();
  const n = SLIDES.length;
  const go = (i: number) => {
    setCur(((i % n) + n) % n);
    setCycle((c) => c + 1);
  };
  const s = SLIDES[cur];

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="hero-track">
        {SLIDES.map((sl, k) => {
          const product = productById(sl.card.productId);
          const on = k === cur;
          return (
            <div
              key={k}
              className={`slide ${sl.theme}${on ? " on" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${k + 1} of ${n}`}
              aria-hidden={!on}
              inert={!on}
            >
              <div className="panel">
                <Kicker k={sl.kicker} />
                {k === 0 ? (
                  <h1>{sl.title[0]}<br /><em>{sl.title[1]}</em> {sl.title[2]}</h1>
                ) : (
                  <h2 className="h1">{sl.title[0]}<br /><em>{sl.title[1]}</em> {sl.title[2]}</h2>
                )}
                <p>{sl.body}</p>
                <div className="ctas">
                  <a href="#" className={sl.cta.className}>{sl.cta.label}</a>
                  <a href="#" className="tlink">{sl.link}</a>
                </div>
                <div className="chips">
                  {sl.chips.us.map((c, i) =>
                    c === sl.chips.pk[i] ? (
                      <span key={c}>{c}</span>
                    ) : (
                      <span key={c} data-only="us">{c}</span>
                    ),
                  )}
                  {sl.chips.pk.map((c, i) => (c === sl.chips.us[i] ? null : <span key={c} data-only="pk">{c}</span>))}
                </div>
              </div>
              <div className="pic">
                <Photo
                  src={sl.image.src}
                  alt={sl.image.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 60vw"
                  preload={k === 0}
                  quality={80}
                />
                {sl.stamp && (
                  <div className="stamp">
                    <b>{sl.stamp.value}</b>
                    <span className="rule" />
                    <span className="t"><span className="k">{sl.stamp.key}</span><span className="v">{sl.stamp.label}</span></span>
                  </div>
                )}
                <div className="pcard">
                  <div className="th"><Photo src={product.image} alt="" fill sizes="56px" /></div>
                  <div className="tx">
                    <small>{sl.card.eyebrow}</small>
                    <b>{sl.card.name}</b>
                    <div className="pp">
                      <Price price={product.price} cents={false} />
                      <span className="r">★ {product.rating} ({product.reviews})</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="add"
                    aria-label={`Add ${sl.card.name} to bag`}
                    onClick={() => add(product.id, [product.colours[0].name, product.sizes?.[1]].filter(Boolean).join(" · "))}
                  >
                    <PlusIcon />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hero-nav" style={{ "--navfg": s.nav.fg, "--navbg": s.nav.bg } as React.CSSProperties}>
        <span className="count" aria-hidden="true"><b>0{cur + 1}</b> / 0{n}</span>
        <div className="bars">
          {SLIDES.map((_, k) => (
            <button
              type="button"
              key={k}
              className={k === cur ? "on" : k < cur ? "done" : undefined}
              aria-label={`Go to slide ${k + 1}`}
              aria-current={k === cur}
              onClick={() => go(k)}
            >
              <i key={k === cur ? `on-${cycle}` : k} onAnimationEnd={k === cur ? () => go(cur + 1) : undefined} />
            </button>
          ))}
        </div>
        <div className="arrows">
          <button type="button" className="arrow" aria-label="Previous slide" onClick={() => go(cur - 1)}><ChevronLeft /></button>
          <button type="button" className="arrow" aria-label="Next slide" onClick={() => go(cur + 1)}><ChevronRight /></button>
        </div>
      </div>
    </section>
  );
}
