# Zasco Home — Brand Kit Project (handoff from Claude Cowork chat, 25 Sep 2026)

This file holds the full context of the earlier conversation where the Zasco Home brand kit was researched and built. Read it before doing any work in this folder.

## The business
- **Zasco Home** is a home-textiles brand (bedding, towels, bath) selling in **Pakistan and the USA**.
- **Zasco Home is a RETAILER, not a manufacturer.** Never write copy saying Zasco makes, weaves or manufactures anything. It chooses, checks and sells products from export-grade mills.
- Positioning tier: **premium-accessible** (above mass market, below luxury).
- Main sales channel: **own D2C website** (US site + Pakistan site).
- Deliverable format the owner asked for: a **PDF brand guide**.
- Owner also runs Pearl Linens (Karachi home-textile exporter, sells on Amazon US via FBA); Zasco Home is a separate brand.

## Conversation history (what happened)
1. Owner asked to research what drives conversions for a home-textile brand in PK + USA, then make a brand kit.
2. Clarified: brand = Zasco Home; premium-accessible; channel = own website; format = PDF brand guide.
3. Research done (below) → strategy → logo → full 18-page PDF built with HTML + Playwright.
4. Owner corrected: "Zasco Home is a retailer not a manufacturer." Guide was revised: tagline changed from "Woven at the source." to "Well chosen. Well made.", positioning rewritten around curation/selection, "Source" pillar → "Selection", swing tag "Made in Pakistan" → "Selected by Zasco Home", OEKO-TEX step changed to collecting mill certificates, and a "write the Zasco quality standard + supplier vetting checklist" step added.

## Research findings (with sources)
**USA**
- Avg cart abandonment 70.22%; top reasons: extra costs 40%, slow delivery 20%, card-trust 19%, forced account 18%, long checkout 17%, returns policy 13% — Baymard Institute (baymard.com/lists/cart-abandonment-rate).
- 5 reviews → 270% higher purchase likelihood vs none; lift ~380% on higher-priced items (190% lower-priced); purchase likelihood peaks at 4.0–4.7 stars — Spiegel Research Center, Northwestern.
- 52% of eco-aware textile shoppers look for independent certification labels; 49% read fibre content — OEKO-TEX "Key to Confidence" study (2017).
- Home-décor ecommerce converts ~1.7–1.9%; >3% exceptional; lifestyle photos, swatches, clear delivery dates, visible shipping costs help — Convertcart.
- Parachute = design-led premium, rarely discounted; Brooklinen = value-premium, frequent promos; both OEKO-TEX Standard 100 — Or & Zon (2026).

**Pakistan**
- 94.5% of ~170,000 orders (Jun 2025–May 2026) were COD; 1.6% prepaid digitally — OrderNation "State of Online Shopping in Pakistan 2026".
- 19.4% of parcels returned to origin (steady 19–22%/month).
- COD cancel rate 37.3% vs prepaid 2.8% (13×).
- Social-discovery orders RTO 22.7% vs search 14.2%.
- ~27% of orders have no traceable source → WhatsApp / word of mouth.
- Karachi delivery success ~80%, Islamabad ~83%.
- Competitors: Hutch luxury Rs 8,499–14,999; Crescent from ~Rs 1,500; Sapphire = heritage; Alkaram = transparent thread counts; also Nishat, ChenOne, Ideas (Gul Ahmed), Bareeze, Khaadi — Hutch.pk blog (2026).

## Eight conversion principles (brand is built on these)
1. Show the whole price early (shipping threshold + delivery date on product page).
2. Proof over promises (reviews on every product, photo reviews first, get 5+ per SKU fast, don't hide a 4.6).
3. Specs are a feature ("Fabric Facts" card: GSM, thread count, weave, fibre, origin, care).
4. Certify, then say it (stock OEKO-TEX Standard 100 products; only claim what the mill certificate covers).
5. Reverse the risk (US: free easy returns; PK: COD + 7-day exchange).
6. Confirm, then ship (PK: WhatsApp order confirmation before dispatch; small prepaid perk).
7. One colour means "buy" (calm neutral pages, single clay CTA).
8. Hold the price (bundles/sets instead of % off).

## Brand strategy (current, post-correction)
- **Positioning:** For home-proud families in the US and Pakistan who want hotel-quality cotton without the hotel markup, Zasco Home is the home-textile store that does the choosing for you — we vet export-grade mills, test the fabric and publish the real specs — so you get better cotton, honest details and a fair price.
- **Brand promise:** "The best of the mills, chosen for your home."
- **Primary tagline:** "Well chosen. Well made."  Alternates: "Hotel-soft. Fairly priced." · "Cotton, done properly." · Urdu accent line: گھر کا سکون ("the comfort of home").
- **Why believable:** a written Zasco quality standard (GSM, fibre, colour-fastness, shrinkage); samples checked before listing.
- **Pillars:** Selection · Substance · Softness · Safe to buy.
- **Audiences:** US "The Considered Nester" (28–45, first/upgraded home, compares Parachute/Brooklinen/Amazon). PK "The Home-Proud Host" (25–45, Karachi/Lahore/Islamabad, buys for home, guests, weddings, Eid gifting).
- **Personality:** Warm (not sentimental), Grounded (not rustic), Precise (not technical), Unfussy (not plain). "A friend who works in textiles."
- **Tone by channel:** product pages = precise first; social = warm first; WhatsApp/support = reassuring first, match customer's language (Urdu/English).
- **Voice rules:** numbers over adjectives; short sentences; name the feeling; plain buttons ("Add to bag", "Order on WhatsApp", "Pay on delivery"). Avoid "unparalleled luxury", "!!!", "MEGA SALE 70% OFF".

## Visual identity
- **Logo:** "The folded thread" — three parallel threads folded into a Z inside a thin square frame (monogram), + wordmark "ZASCO" (Fraunces 500, wide tracking) over "— HOME —" (DM Sans 500, tracked). Concept: many makers, one careful edit. Versions: primary lockup, wordmark, monogram. Monogram SVG generated by `logo.py`.
- Clear space ≈ ¼ of monogram height; min size lockup 120px/32mm, monogram 24px/8mm. Don'ts: stretch, effects/shadows, rotate, off-palette colours, busy photo backgrounds.
- **Colours:**
  | Name | HEX | RGB | CMYK (approx) | Use |
  |---|---|---|---|---|
  | Indus Ink | #1F3A44 | 31 58 68 | 54 15 0 73 | Primary: logo, headings, text |
  | Raw Cotton | #F7F2EA | 247 242 234 | 0 2 5 3 | Page background |
  | Loom Sand | #E6DAC6 | 230 218 198 | 0 5 14 10 | Sections, cards, packaging |
  | Kiln Clay | #A94F33 | 169 79 51 | 0 53 70 34 | CTA / "buy" colour only |
  | Sage Field | #8A9B84 | 138 155 132 | 11 0 15 39 | Supporting accent |
  | Brass Thread | #A8844F | 168 132 79 | 0 21 53 34 | Festive (Eid, weddings), decorative only |
  | Charcoal | #2A2A28 | — | — | Body text |
  Ratio: Cotton 55 · Sand 20 · Ink 15 · Clay 6 · Sage/Brass 4. Contrast: Ink/Cotton 10.8:1, Ink/Sand 8.7:1, White/Clay 5.5:1 (AA). Brass & Sage fail 4.5:1 → decoration/large text only.
- **Type:** Fraunces (display: 300/400/500/italic), DM Sans (text/UI: 400/500/600), Noto Nastaliq Urdu (PK accents). All free Google Fonts (OFL). Scale: H1 48, H2 32, H3 22 (Fraunces); body 16 min; eyebrow 12 DM Sans 600 +20% tracking.
- **Imagery:** natural window light, warm-neutral grade; lifestyle hero first on web, white-bg main image for marketplaces; macro texture; spec infographic; scale/in-use shot; colour swatch row; show a Karachi apartment and a US suburban bedroom; avoid stock-model smiles, clutter, over-saturation.

## Conversion toolkit (website)
- Buttons: primary Clay (white text), secondary Ink outline, WhatsApp green button (PK only). Radius 4px, min height 48px.
- Trust bar under buy button — US: Free shipping over $75 · 30-night returns · OEKO-TEX (once held). PK: Cash on delivery · Free delivery over Rs 5,000 · 7-day exchange via WhatsApp. (Thresholds are placeholders — owner to set from margins.)
- Price/rating/delivery block: name, ★ 4.7 (212 reviews), local currency only per site, exact delivery date range.
- Fabric Facts card (Ink header): Weight, Fibre, Made in (per product), Care.
- Product page order: gallery → name+stars → price+delivery → colour/size → clay CTA → trust bar → Fabric Facts → photo reviews. Mobile: sticky CTA.
- US vs PK: US payments cards/Apple Pay/Shop Pay/BNPL; PK COD first + prepaid perk (card/JazzCash/Easypaisa). US sizes Twin/Full/Queen/King; PK Single/Double/King (in + cm). Moments US: Mother's Day, back-to-college, BFCM, holidays; PK: Ramadan/Eid ul-Fitr, Eid ul-Adha, winter wedding season, 11.11. PK offers: gift-boxed sets, jahez/wedding bundles.
- Applications mocked: swing tag (Ink, "Selected by Zasco Home"), gift box with Clay belly band, Instagram 1:1 "600 GSM" post.

## Open items / next steps
- Trademark clearance & filing "Zasco Home" — USPTO + IPO Pakistan, Class 24 & 35. A company "ZAS Textiles" (zastextiles.com) exists — check conflicts.
- Secure .com/.pk domains and social handles.
- Collect OEKO-TEX Standard 100 certificates from each mill.
- Write Zasco quality standard + supplier vetting checklist.
- Decide policies: free-shipping thresholds, US return window, PK exchange window, prepaid perk.
- WhatsApp Business with order-confirmation template.
- Photograph hero SKUs; build Fabric Facts per SKU; seed 5+ reviews per SKU.
- Designer to refine monogram into final vectors + favicon set.

## Files in this folder
- `Zasco-Home-Brand-Guidelines.pdf` — current 18-page guide (1280×720 landscape pages).
- `logo.py` — generates monogram SVGs into `out/`.
- `build.py` — generates `guide.html` and renders `out/Zasco-Home-Brand-Guidelines.pdf` (all page content lives here).
- `out/monogram-*.svg` — monogram in ink, cotton-on-ink, clay.
- `package.json` — font packages.

## How to rebuild the PDF
```
npm install                 # installs @fontsource fonts used by build.py
pip install playwright && python -m playwright install chromium   # if not already installed
mkdir -p out && python logo.py && python build.py
```
Edit page text/colours in `build.py`, then re-run `python build.py`.
