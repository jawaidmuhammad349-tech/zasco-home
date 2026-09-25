# Zasco Home website (Next.js)

The storefront homepage, built with Next.js 16 (App Router, TypeScript).

## Run it

```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Where things live

| What | File |
|---|---|
| Products, prices (US + PK), colours, sizes, featured product | `lib/catalog.ts` |
| Store settings: free-shipping thresholds, delivery days, cut-off times | `lib/markets.ts` |
| Delivery date + countdown logic | `lib/delivery.ts` |
| Bag (cart) and US/PK store switch | `lib/stores.ts`, `components/cart-drawer.tsx` |
| Homepage layout (section order) | `app/page.tsx` |
| Sections | `components/*.tsx` |
| All styling | `app/globals.css` |
| Brand fonts (self-hosted) | `app/fonts/` |

## Swapping in real product photos

1. Put photos in `public/products/` (e.g. `public/products/karachi-percale.jpg`).
2. In `lib/catalog.ts`, change a product's `image` to `"/products/karachi-percale.jpg"`.
3. Hero, banner, category and journal photos use `unsplash("…")` in their component
   files; replace those the same way.
4. Once no Unsplash photos remain, delete `remotePatterns` from `next.config.ts`.

## US / Pakistan

Anything marked `data-only="us"` or `data-only="pk"` shows only in that store.
The chosen store is saved in the browser and applied before the page paints.

## Payments

Not connected yet. The bag's Checkout button is the hook: it currently shows a
note. Checkout will plug in there (e.g. Stripe for US cards/Apple Pay; Safepay,
PayFast, JazzCash/Easypaisa and cash on delivery for Pakistan).
