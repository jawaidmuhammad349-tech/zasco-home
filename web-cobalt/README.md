# Zasco Home website: Black + Cobalt edition (Next.js)

A copy of `web/` locked to the Black + Cobalt colour scheme (no colour picker).
Live at https://zasco-home-cobalt.vercel.app. Changes here do not affect `web/`,
which is kept as the saved all-themes version.

## Run it

```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Where things live

| What | File |
|---|---|
| Products, prices (USD), colors, sizes, featured product | `lib/catalog.ts` |
| Store settings: free-shipping threshold, delivery days, cut-off time | `lib/store.ts` |
| Delivery date + countdown logic | `lib/delivery.ts` |
| Bag (cart) | `lib/stores.ts`, `components/cart-drawer.tsx` |
| Homepage layout (section order) | `app/page.tsx` |
| Sections | `components/*.tsx` |
| All styling (colours are the variables at the top and the "Black + Cobalt scheme" block) | `app/globals.css` |
| Brand fonts (self-hosted) | `app/fonts/` |

## Swapping in real product photos

1. Put photos in `public/products/` (e.g. `public/products/classic-percale.jpg`).
2. In `lib/catalog.ts`, change a product's `image` to `"/products/classic-percale.jpg"`.
3. Hero, banner, category and journal photos use `unsplash("…")` in their component
   files; replace those the same way.
4. Once no Unsplash photos remain, delete `remotePatterns` from `next.config.ts`.

## Market

US only: prices in USD, US sizes, inches and °F, US English.

## Payments

Not connected yet. The bag's Checkout button is the hook: it currently shows a
note. Checkout will plug in there (e.g. Stripe for cards, Apple Pay and Google Pay).
