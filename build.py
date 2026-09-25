import pathlib
from logo import monogram

F = "node_modules/@fontsource"
ROOT = pathlib.Path(__file__).parent.resolve()

C = dict(ink="#1F3A44", cotton="#F7F2EA", sand="#E6DAC6", clay="#A94F33",
         sage="#8A9B84", brass="#A8844F", char="#2A2A28", white="#FFFFFF")

def M(stroke=C["ink"], bg="none", frame=True, size=60):
    return monogram(stroke, bg, frame, size)

def wordmark(color=C["ink"], scale=1.0, sub=True):
    s = scale
    return f'''<div class="wm" style="color:{color}">
      <div class="wm-main" style="font-size:{64*s}px;letter-spacing:{0.18*64*s}px">ZASCO</div>
      {f'<div class="wm-sub" style="font-size:{13*s}px;letter-spacing:{0.62*13*s}px"><span class="rule" style="background:{color}"></span>HOME<span class="rule" style="background:{color}"></span></div>' if sub else ''}
    </div>'''

def lockup(color=C["ink"], scale=1.0):
    return f'''<div class="lockup">{M(color, frame=True, size=int(92*scale))}{wordmark(color, scale*0.92)}</div>'''

def fontface(fam, file, w, style="normal"):
    return f"@font-face{{font-family:'{fam}';src:url('{ROOT}/{F}/{file}') format('woff2');font-weight:{w};font-style:{style};}}"

FONTS = "".join([
    fontface("Fraunces", "fraunces/files/fraunces-latin-300-normal.woff2", 300),
    fontface("Fraunces", "fraunces/files/fraunces-latin-400-normal.woff2", 400),
    fontface("Fraunces", "fraunces/files/fraunces-latin-500-normal.woff2", 500),
    fontface("Fraunces", "fraunces/files/fraunces-latin-600-normal.woff2", 600),
    fontface("Fraunces", "fraunces/files/fraunces-latin-400-italic.woff2", 400, "italic"),
    fontface("Fraunces", "fraunces/files/fraunces-latin-300-italic.woff2", 300, "italic"),
    fontface("DM Sans", "dm-sans/files/dm-sans-latin-400-normal.woff2", 400),
    fontface("DM Sans", "dm-sans/files/dm-sans-latin-500-normal.woff2", 500),
    fontface("DM Sans", "dm-sans/files/dm-sans-latin-600-normal.woff2", 600),
    fontface("DM Sans", "dm-sans/files/dm-sans-latin-700-normal.woff2", 700),
    fontface("Nastaliq", "noto-nastaliq-urdu/files/noto-nastaliq-urdu-arabic-400-normal.woff2", 400),
])

CSS = FONTS + f"""
@page {{ size: 1280px 720px; margin: 0; }}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
html,body {{ background:{C['cotton']}; }}
body {{ font-family:'DM Sans',sans-serif; color:{C['char']}; -webkit-print-color-adjust:exact; print-color-adjust:exact; }}
.page {{ width:1280px; height:720px; position:relative; overflow:hidden; background:{C['cotton']}; padding:64px 72px; page-break-after:always; }}
.page.dark {{ background:{C['ink']}; color:{C['cotton']}; }}
.page.sand {{ background:{C['sand']}; }}
.eyebrow {{ font-size:12px; letter-spacing:.22em; text-transform:uppercase; font-weight:600; color:{C['clay']}; }}
.dark .eyebrow {{ color:{C['sand']}; }}
h1 {{ font-family:Fraunces,serif; font-weight:400; font-size:54px; line-height:1.05; letter-spacing:-.01em; color:{C['ink']}; }}
h2 {{ font-family:Fraunces,serif; font-weight:400; font-size:40px; line-height:1.1; color:{C['ink']}; margin:10px 0 0; }}
.dark h1,.dark h2 {{ color:{C['cotton']}; }}
h3 {{ font-family:Fraunces,serif; font-weight:500; font-size:21px; color:{C['ink']}; margin-bottom:6px; }}
.dark h3 {{ color:{C['cotton']}; }}
p, li {{ font-size:14.5px; line-height:1.55; }}
.lede {{ font-size:17px; line-height:1.55; max-width:620px; margin-top:14px; color:#4a4a46; }}
.dark .lede {{ color:#d9d3c8; }}
.foot {{ position:absolute; left:72px; right:72px; bottom:28px; display:flex; justify-content:space-between; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:#8b877f; }}
.dark .foot {{ color:#9fb0b5; }}
.grid {{ display:grid; gap:22px; }}
.g2 {{ grid-template-columns:1fr 1fr; }} .g3 {{ grid-template-columns:repeat(3,1fr); }} .g4 {{ grid-template-columns:repeat(4,1fr); }}
.card {{ background:{C['white']}; border:1px solid #e6dfd3; border-radius:6px; padding:20px 22px; }}
.dark .card {{ background:#264652; border-color:#33555f; }}
.stat {{ font-family:Fraunces,serif; font-size:46px; font-weight:400; color:{C['clay']}; line-height:1; }}
.dark .stat {{ color:#E7A78F; }}
.stat small {{ font-size:22px; }}
.src {{ font-size:10.5px; color:#8b877f; margin-top:8px; letter-spacing:.02em; }}
.dark .src {{ color:#9fb0b5; }}
.wm {{ display:inline-flex; flex-direction:column; align-items:center; font-family:Fraunces,serif; }}
.wm-main {{ font-weight:500; line-height:1; padding-left:.18em; }}
.wm-sub {{ font-family:'DM Sans'; font-weight:500; display:flex; align-items:center; gap:10px; margin-top:.9em; padding-left:.6em; }}
.wm-sub .rule {{ display:inline-block; width:28px; height:1px; opacity:.7; }}
.lockup {{ display:inline-flex; align-items:center; gap:26px; }}
.tag {{ display:inline-block; font-size:11px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; padding:5px 10px; border-radius:40px; background:{C['sand']}; color:{C['ink']}; }}
ul.clean {{ list-style:none; }} ul.clean li {{ padding-left:18px; position:relative; margin:5px 0; }}
ul.clean li:before {{ content:''; position:absolute; left:0; top:9px; width:8px; height:1.5px; background:{C['clay']}; }}
.btn {{ display:inline-flex; align-items:center; justify-content:center; gap:8px; font-weight:600; font-size:15px; padding:14px 26px; border-radius:4px; letter-spacing:.02em; }}
.btn.primary {{ background:{C['clay']}; color:#fff; }}
.btn.secondary {{ border:1.5px solid {C['ink']}; color:{C['ink']}; background:transparent; }}
.btn.wa {{ background:#1F7A4D; color:#fff; }}
.num {{ font-family:Fraunces,serif; font-size:30px; color:{C['clay']}; line-height:1; }}
table {{ border-collapse:collapse; width:100%; }}
td, th {{ text-align:left; padding:9px 12px; font-size:13.5px; border-bottom:1px solid #ddd4c5; vertical-align:top; }}
th {{ font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:{C['clay']}; font-weight:600; }}
.stars {{ color:{C['brass']}; letter-spacing:2px; }}
.urdu {{ font-family:Nastaliq; direction:rtl; }}
"""

def foot(n, section, dark=False):
    return f'<div class="foot"><span>Zasco Home · Brand Guidelines v1.0</span><span>{section} &nbsp;·&nbsp; {n:02d}</span></div>'

pages = []

# 1 COVER
pages.append(f'''<section class="page dark" style="display:flex;flex-direction:column;justify-content:space-between;padding:72px 80px">
  <div class="eyebrow">Brand Guidelines · Version 1.0 · September 2026</div>
  <div style="display:flex;align-items:center;gap:64px">
    {M(C['cotton'], size=210)}
    <div>
      {wordmark(C['cotton'], 1.5)}
    </div>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:flex-end">
    <div style="font-family:Fraunces;font-style:italic;font-weight:300;font-size:34px;color:{C['sand']}">Well chosen. Well made.</div>
    <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#9fb0b5;text-align:right">Home textiles · Pakistan &amp; United States<br>Research-led brand kit for D2C conversion</div>
  </div>
</section>''')

# 2 CONTENTS
toc = [("01", "What converts", "Research: US & Pakistan D2C buyers", "03"),
       ("02", "Brand strategy", "Positioning, audience, promise, pillars", "06"),
       ("03", "Logo", "Lockups, monogram, clear space, misuse", "08"),
       ("04", "Colour", "Palette, ratios, accessible pairings", "10"),
       ("05", "Typography", "Typefaces, scale, Urdu companion", "11"),
       ("06", "Voice", "Tone, taglines, copy do's and don'ts", "12"),
       ("07", "Imagery", "Photography direction", "13"),
       ("08", "Conversion toolkit", "Web components, product page, markets", "14"),
       ("09", "Applications", "Packaging, tags, social", "17")]
rows = "".join(f'<div style="display:grid;grid-template-columns:60px 260px 1fr 40px;align-items:baseline;padding:13px 0;border-bottom:1px solid #ddd4c5"><span class="num" style="font-size:22px">{a}</span><span style="font-family:Fraunces;font-size:22px;color:{C["ink"]}">{b}</span><span style="color:#6b675f">{c}</span><span style="text-align:right;color:#8b877f">{d}</span></div>' for a,b,c,d in toc)
pages.append(f'''<section class="page"><div style="display:grid;grid-template-columns:360px 1fr;gap:70px">
  <div><div class="eyebrow">Contents</div><h2>How this kit works</h2>
  <p class="lede" style="font-size:15.5px">This guide starts with evidence, not taste. Every colour, word and component choice later in the kit traces back to what research says makes home-textile shoppers in the US and Pakistan actually buy online.</p>
  <p class="lede" style="font-size:15.5px">Use it to brief designers, photographers, developers and copywriters so Zasco Home looks, sounds and sells the same everywhere.</p></div>
  <div>{rows}</div></div>{foot(2,"Contents")}</section>''')

# 3 RESEARCH – US
pages.append(f'''<section class="page"><div class="eyebrow">01 · What converts — United States</div>
<h2>US shoppers buy when the risk disappears</h2>
<p class="lede">Premium bedding and bath online is a high-consideration purchase: shoppers can't touch the fabric, so they lean on reviews, transparent costs and a safety net.</p>
<div class="grid g4" style="margin-top:28px">
 <div class="card"><div class="stat">70<small>%</small></div><p style="margin-top:10px">of online carts are abandoned on average. #1 reason: <b>extra costs</b> like shipping and tax (40%).</p><div class="src">Baymard Institute, 50-study average</div></div>
 <div class="card"><div class="stat">270<small>%</small></div><p style="margin-top:10px">higher purchase likelihood for a product with 5 reviews vs none; the lift is ~380% on <b>higher-priced</b> items.</p><div class="src">Spiegel Research Center, Northwestern</div></div>
 <div class="card"><div class="stat">4.0–4.7</div><p style="margin-top:10px">star range where purchase likelihood peaks. A perfect 5.0 reads as <b>too good to be true</b>.</p><div class="src">Spiegel Research Center</div></div>
 <div class="card"><div class="stat">52<small>%</small></div><p style="margin-top:10px">of eco-aware textile shoppers look for <b>independent certification labels</b>; 49% read fibre content.</p><div class="src">OEKO-TEX consumer study</div></div>
</div>
<div class="grid g3" style="margin-top:22px">
 <div><h3>Other checkout killers</h3><p>Slow delivery (20%), not trusting the site with card details (19%), forced account creation (18%) and a weak returns policy (13%).</p></div>
 <div><h3>What good looks like</h3><p>Home-décor sites typically convert at 1.7–1.9%; above 3% is exceptional. Lifestyle photos, swatches, clear delivery dates and visible shipping costs move the number.</p></div>
 <div><h3>Competitor lesson</h3><p>Parachute (design-led, rarely discounted) and Brooklinen (value-premium, frequent promos) both carry OEKO-TEX Standard 100. Certification is table stakes at this tier.</p></div>
</div>{foot(3,"Research")}</section>''')

# 4 RESEARCH – PK
pages.append(f'''<section class="page"><div class="eyebrow">01 · What converts — Pakistan</div>
<h2>Pakistani shoppers buy when they trust the parcel</h2>
<p class="lede">Online buying in Pakistan runs on cash-on-delivery and WhatsApp. The real conversion problem isn't the click — it's the order that gets refused at the door.</p>
<div class="grid g4" style="margin-top:28px">
 <div class="card"><div class="stat">94.5<small>%</small></div><p style="margin-top:10px">of ~170,000 tracked orders (Jun 2025–May 2026) were <b>cash on delivery</b>. Only 1.6% were prepaid digitally.</p><div class="src">OrderNation, State of Online Shopping PK 2026</div></div>
 <div class="card"><div class="stat">19.4<small>%</small></div><p style="margin-top:10px">of shipped parcels <b>returned to origin</b> undelivered — about 1 in 5, month after month.</p><div class="src">OrderNation 2026</div></div>
 <div class="card"><div class="stat">13×</div><p style="margin-top:10px">COD orders cancel at <b>37.3%</b> vs just 2.8% for prepaid orders. A small prepaid nudge protects margin.</p><div class="src">OrderNation 2026</div></div>
 <div class="card"><div class="stat">27<small>%</small></div><p style="margin-top:10px">of orders had <b>no traceable source</b> — the signature of WhatsApp and word-of-mouth selling.</p><div class="src">OrderNation 2026</div></div>
</div>
<div class="grid g3" style="margin-top:22px">
 <div><h3>Search beats scroll</h3><p>Orders from search delivered far more reliably (14.2% returned) than social-discovery orders (22.7%). Shoppers who came looking are already convinced.</p></div>
 <div><h3>The local field</h3><p>Hutch sells luxury bedding at Rs 8,499–14,999; Crescent starts near Rs 1,500. Sapphire leans on Pakistani heritage; Alkaram on transparent thread counts.</p></div>
 <div><h3>The gap for Zasco</h3><p>Export-grade quality, clearly specified, at a fair local price — with a delivery experience that feels as safe as buying in a shop.</p></div>
</div>{foot(4,"Research")}</section>''')

# 5 IMPLICATIONS
principles = [
 ("Show the whole price early", "Shipping threshold and delivery date on the product page, not at checkout. Kills the #1 abandonment reason."),
 ("Proof over promises", "Reviews on every product, photo reviews first. Chase the first 5 reviews per SKU fast; don't hide a 4.6."),
 ("Specs are a feature", "GSM, thread count, weave, fibre and origin in a 'Fabric Facts' card. Precision reads as premium."),
 ("Certify, then say it", "Stock OEKO-TEX Standard 100 certified products and show the label near the buy button. Only claim what the mill's certificate covers."),
 ("Reverse the risk", "US: easy, free returns. PK: cash on delivery + a simple 7-day exchange, stated plainly."),
 ("Confirm, then ship (PK)", "WhatsApp order confirmation before dispatch and a small prepaid perk cut refused parcels."),
 ("One colour means 'buy'", "Calm, neutral pages so the product and a single clay-coloured action button carry the eye."),
 ("Hold the price", "Premium brands that live on discounts train buyers to wait. Use sets and bundles instead of % off."),
]
cells = "".join(f'<div style="border-top:1.5px solid {C["ink"]};padding-top:12px"><div class="num">{i+1:02d}</div><h3 style="margin-top:10px;font-size:21px">{t}</h3><p style="font-size:14.5px">{d}</p></div>' for i,(t,d) in enumerate(principles))
pages.append(f'''<section class="page sand"><div class="eyebrow">01 · From research to brand</div>
<h2>Eight conversion principles the brand is built on</h2>
<div class="grid g4" style="margin-top:44px;row-gap:44px;column-gap:28px">{cells}</div>{foot(5,"Research")}</section>''')

# 6 STRATEGY
pages.append(f'''<section class="page"><div class="grid" style="grid-template-columns:1.05fr 1fr;gap:60px">
<div><div class="eyebrow">02 · Brand strategy</div><h2>Positioning</h2>
<p style="font-family:Fraunces;font-size:24px;line-height:1.4;color:{C['ink']};margin-top:22px;font-weight:300">For home-proud families in the US and Pakistan who want hotel-quality cotton without the hotel markup, <b style="font-weight:500">Zasco Home</b> is the home-textile store that does the choosing for you — we vet export-grade mills, test the fabric and publish the real specs — so you get better cotton, honest details and a fair price.</p>
<div style="margin-top:30px;padding:22px 24px;background:{C['ink']};color:{C['cotton']};border-radius:6px">
<div class="eyebrow" style="color:{C['sand']}">Brand promise</div>
<div style="font-family:Fraunces;font-size:28px;margin-top:8px">The best of the mills, chosen for your home.</div></div>
<p style="margin-top:22px;color:#5b5750">Why it's believable: Zasco's value is the edit. Only list products from mills that meet a written spec standard (GSM, fibre, colour-fastness, shrinkage), check samples before listing, and say so — that standard is what the brand stands on.</p>
</div>
<div><h3 style="margin-top:34px">Who we're for</h3>
<div class="grid g2" style="gap:16px;margin-top:10px">
 <div class="card"><span class="tag">United States</span><h3 style="margin-top:12px;font-size:18px">The Considered Nester</h3><p style="font-size:13.5px">28–45, setting up or upgrading a home. Reads reviews, compares Parachute and Brooklinen with Amazon, wants the quality without the price.</p></div>
 <div class="card"><span class="tag">Pakistan</span><h3 style="margin-top:12px;font-size:18px">The Home-Proud Host</h3><p style="font-size:13.5px">25–45, Karachi · Lahore · Islamabad. Buys for the home, for guests, for weddings and Eid gifting. Wants export quality at a local price, delivered safely.</p></div>
</div>
<h3 style="margin-top:26px">Four pillars</h3>
<div class="grid g2" style="gap:10px 22px;margin-top:6px">
 <div><b style="color:{C['clay']}">Selection</b><p style="font-size:13.5px">We choose, check and stand behind every piece. Fewer, better options.</p></div>
 <div><b style="color:{C['clay']}">Substance</b><p style="font-size:13.5px">Real specs, real certification, no vague "luxury".</p></div>
 <div><b style="color:{C['clay']}">Softness</b><p style="font-size:13.5px">The feeling is the product. Describe it precisely.</p></div>
 <div><b style="color:{C['clay']}">Safe to buy</b><p style="font-size:13.5px">Easy returns, COD, WhatsApp help, delivery you can trust.</p></div>
</div></div></div>{foot(6,"Strategy")}</section>''')

# 7 PERSONALITY
traits = [("Warm", "not sentimental"), ("Grounded", "not rustic"), ("Precise", "not technical"), ("Unfussy", "not plain")]
tcells = "".join(f'<div style="border-left:1.5px solid {C["sand"]};padding-left:18px"><div style="font-family:Fraunces;font-size:34px">{a}</div><div style="color:#9fb0b5;margin-top:4px">{b}</div></div>' for a,b in traits)
pages.append(f'''<section class="page dark"><div class="eyebrow">02 · Brand personality</div>
<h2>If Zasco Home were a person</h2>
<p class="lede">A friend who works in textiles: knows exactly why one towel beats another, tells you straight, and never makes you feel you've overpaid.</p>
<div class="grid g4" style="margin-top:34px">{tcells}</div>
<div class="grid g3" style="margin-top:40px;gap:22px">
 <div class="card"><div class="eyebrow">On product pages</div><p style="margin-top:8px;color:#e6e0d6">Precise first. Lead with the number, follow with the feeling.</p></div>
 <div class="card"><div class="eyebrow">On social</div><p style="margin-top:8px;color:#e6e0d6">Warm first. Real homes, small moments, one clear fact per post.</p></div>
 <div class="card"><div class="eyebrow">On WhatsApp &amp; support</div><p style="margin-top:8px;color:#e6e0d6">Reassuring first. Confirm, give a date, name a person. Urdu or English — match the customer.</p></div>
</div>
<div class="grid g2" style="margin-top:34px;gap:40px">
<div><h3>Why this name works</h3><p style="color:#d9d3c8">"Zasco" is short, crisp and pronounceable in English and Urdu. The Z is rare in home-textile branding, so the monogram is ownable on a tag, a box or an app icon.</p></div>
<div><h3>Before launch</h3><p style="color:#d9d3c8">Run a USPTO and IPO-Pakistan clearance search in Class 24 (textiles) and Class 35, and secure the .com / .pk domains and social handles. A similarly named company, "ZAS Textiles", exists — check for conflicts.</p></div>
</div>{foot(7,"Strategy")}</section>''')

# 8 LOGO
pages.append(f'''<section class="page"><div class="eyebrow">03 · Logo</div>
<h2>The folded thread</h2>
<div class="grid" style="grid-template-columns:1.25fr 1fr;gap:50px;margin-top:26px">
 <div class="card" style="display:flex;align-items:center;justify-content:center;height:340px;background:{C['white']}">{lockup(C['ink'],1.05)}</div>
 <div>
  <div style="display:flex;gap:22px;align-items:center">
   <div class="card" style="padding:14px">{M(C['ink'],size=120)}</div>
   <div class="card" style="padding:14px;display:flex;align-items:center;justify-content:center;width:150px;height:150px">{wordmark(C['ink'],0.42)}</div>
  </div>
  <h3 style="margin-top:22px">Concept</h3>
  <p>Three parallel threads fold into a Z — a single yarn becoming a woven product. Many makers, one careful edit — the threads are gathered into a single mark, the way Zasco gathers the best pieces into one store.</p>
  <h3 style="margin-top:14px">Three versions</h3>
  <ul class="clean"><li><b>Primary lockup</b> — monogram + wordmark, for web header, packaging, documents.</li><li><b>Wordmark</b> — where space is wide and short.</li><li><b>Monogram</b> — favicon, social avatar, labels, embroidery.</li></ul>
 </div></div>{foot(8,"Logo")}</section>''')

# 9 LOGO USAGE
bgs = [(C['cotton'], C['ink'], "Ink on Cotton — default"), (C['ink'], C['cotton'], "Cotton on Ink"), (C['clay'], C['white'], "White on Clay — promo only"), (C['sand'], C['ink'], "Ink on Sand")]
bcells = "".join(f'<div><div style="background:{bg};height:130px;border-radius:6px;display:flex;align-items:center;justify-content:center;border:1px solid #e1d9cb">{lockup(fg,0.52)}</div><p style="font-size:12.5px;margin-top:6px;color:#5b5750">{lbl}</p></div>' for bg,fg,lbl in bgs)
donts = [("transform:scaleX(1.5)", "Don't stretch"), ("filter:drop-shadow(3px 3px 2px rgba(0,0,0,.5))", "No effects or shadows"), ("transform:rotate(-12deg)", "Don't rotate"), ("", "No off-palette colours")]
dcells = ""
for i,(style,lbl) in enumerate(donts):
    col = "#3C7DD9" if i == 3 else C['ink']
    dcells += f'<div><div style="background:#fff;height:110px;border-radius:6px;display:flex;align-items:center;justify-content:center;border:1px solid #e1d9cb;position:relative;overflow:hidden"><div style="{style}">{M(col,size=64)}</div><svg style="position:absolute;inset:0" width="100%" height="100%"><line x1="8%" y1="92%" x2="92%" y2="8%" stroke="{C["clay"]}" stroke-width="2"/></svg></div><p style="font-size:12.5px;margin-top:6px;color:{C["clay"]};font-weight:600">✕ {lbl}</p></div>'
pages.append(f'''<section class="page"><div class="eyebrow">03 · Logo usage</div><h2>Clear space, colour and misuse</h2>
<div class="grid g4" style="margin-top:24px">{bcells}</div>
<div class="grid" style="grid-template-columns:1fr 2.2fr;gap:36px;margin-top:26px">
 <div><h3>Clear space &amp; size</h3><p>Keep clear space equal to the height of the monogram's top bar group (≈ ¼ of the monogram) on all sides. Minimum sizes: lockup 120px / 32mm wide; monogram 24px / 8mm.</p><p style="margin-top:8px">Never place the logo on busy photography — use a solid panel or the cotton-on-ink version.</p></div>
 <div class="grid g4" style="gap:16px">{dcells}</div>
</div>{foot(9,"Logo")}</section>''')

# 10 COLOUR
pal = [("Indus Ink", C['ink'], "31 58 68", "54 15 0 73", "Primary. Logo, headings, text, footers.", "#fff"),
       ("Raw Cotton", C['cotton'], "247 242 234", "0 2 5 3", "Page background. Warmer than white; flatters fabric.", C['ink']),
       ("Loom Sand", C['sand'], "230 218 198", "0 5 14 10", "Sections, cards, packaging base.", C['ink']),
       ("Kiln Clay", C['clay'], "169 79 51", "0 53 70 34", "The 'buy' colour. CTAs, sale flags, key links only.", "#fff"),
       ("Sage Field", C['sage'], "138 155 132", "11 0 15 39", "Supporting accent. Illustrations, eco / care notes.", "#fff"),
       ("Brass Thread", C['brass'], "168 132 79", "0 21 53 34", "Festive accent (Eid, gifting, weddings). Decorative only.", "#fff")]
pcells = "".join(f'<div style="display:flex;flex-direction:column"><div style="background:{h};height:190px;border-radius:6px 6px 0 0;border:1px solid #e1d9cb;padding:14px;color:{t};font-family:Fraunces;font-size:20px;display:flex;align-items:flex-end">{n}</div><div class="card" style="border-radius:0 0 6px 6px;border-top:0;padding:12px 14px;flex:1"><div style="font-size:12px;line-height:1.7"><b>HEX</b> {h}<br><b>RGB</b> {r}<br><b>CMYK</b> {cm}</div><p style="font-size:12px;margin-top:6px;color:#5b5750;line-height:1.45">{u}</p></div></div>' for n,h,r,cm,u,t in pal)
ratio = f'<div style="display:flex;height:22px;border-radius:4px;overflow:hidden;margin-top:10px"><div style="flex:55;background:{C["cotton"]};border:1px solid #ddd"></div><div style="flex:20;background:{C["sand"]}"></div><div style="flex:15;background:{C["ink"]}"></div><div style="flex:6;background:{C["clay"]}"></div><div style="flex:4;background:{C["sage"]}"></div></div>'
pages.append(f'''<section class="page"><div class="eyebrow">04 · Colour</div><h2>Calm pages, one colour that means "buy"</h2>
<div class="grid" style="grid-template-columns:repeat(6,1fr);gap:14px;margin-top:22px">{pcells}</div>
<div class="grid" style="grid-template-columns:1.2fr 1fr;gap:40px;margin-top:20px">
 <div><h3 style="font-size:17px">Usage ratio</h3>{ratio}<p style="font-size:12.5px;color:#5b5750;margin-top:6px">Cotton 55 · Sand 20 · Ink 15 · Clay 6 · Sage/Brass 4. Clay stays scarce so the buy button is always the loudest thing on screen.</p></div>
 <div><h3 style="font-size:17px">Accessible pairings (WCAG)</h3><p style="font-size:12.5px;line-height:1.7">Ink on Cotton <b>10.8:1</b> AAA · Ink on Sand <b>8.7:1</b> AAA<br>White on Clay <b>5.5:1</b> AA — OK for buttons &amp; body text<br>Brass &amp; Sage: decoration and large text only (&lt; 4.5:1). CMYK values are starting points — proof with your printer.</p></div>
</div>{foot(10,"Colour")}</section>''')

# 11 TYPE
pages.append(f'''<section class="page"><div class="eyebrow">05 · Typography</div><h2>A soft serif, a clear sans</h2>
<div class="grid" style="grid-template-columns:1fr 1fr 0.8fr;gap:30px;margin-top:26px">
 <div class="card"><span class="tag">Display</span><div style="font-family:Fraunces;font-size:92px;color:{C['ink']};line-height:1;margin-top:14px">Aa</div><h3 style="margin-top:12px">Fraunces</h3><p style="font-size:13px">Light 300 · Regular 400 · Medium 500 · Italic. Headlines, product names, pull quotes. Its soft, slightly "wonky" serif feels crafted and warm — like good cotton.</p></div>
 <div class="card"><span class="tag">Text &amp; UI</span><div style="font-family:'DM Sans';font-size:92px;color:{C['ink']};line-height:1;margin-top:14px;font-weight:500">Aa</div><h3 style="margin-top:12px">DM Sans</h3><p style="font-size:13px">Regular 400 · Medium 500 · SemiBold 600. Body copy, prices, buttons, specs. Very legible on mobile, where most orders happen.</p></div>
 <div class="card"><span class="tag">Urdu</span><div class="urdu" style="font-size:40px;color:{C['ink']};line-height:2.1;margin-top:4px;text-align:right;padding-right:6px">گھر کا سکون</div><h3 style="margin-top:0">Noto Nastaliq Urdu</h3><p style="font-size:13px">For Pakistan campaigns, packaging inserts and social. Use as an accent alongside English, never squeezed small.</p></div>
</div>
<div style="margin-top:24px;display:grid;grid-template-columns:repeat(5,auto);gap:34px;align-items:baseline">
 <div><div style="font-family:Fraunces;font-size:44px;color:{C['ink']}">H1 48</div><div class="src">Fraunces 400 · 1.1</div></div>
 <div><div style="font-family:Fraunces;font-size:32px;color:{C['ink']}">H2 32</div><div class="src">Fraunces 400 · 1.15</div></div>
 <div><div style="font-family:Fraunces;font-size:22px;color:{C['ink']};font-weight:500">H3 22</div><div class="src">Fraunces 500 · 1.25</div></div>
 <div><div style="font-size:16px">Body 16 — mobile minimum</div><div class="src">DM Sans 400 · 1.6</div></div>
 <div><div style="font-size:12px;letter-spacing:.2em;font-weight:600;color:{C['clay']}">EYEBROW 12</div><div class="src">DM Sans 600 · +20% tracking</div></div>
</div>
<p style="font-size:12.5px;color:#5b5750;margin-top:16px">All three families are free Google Fonts (SIL Open Font License) — usable on Shopify, packaging and print at no cost.</p>{foot(11,"Typography")}</section>''')

# 12 VOICE
pages.append(f'''<section class="page"><div class="eyebrow">06 · Voice &amp; messaging</div><h2>Say the specific thing</h2>
<div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:26px;margin-top:22px">
 <div><h3>Taglines</h3>
  <div style="font-family:Fraunces;font-size:24px;color:{C['ink']};font-style:italic">Well chosen. Well made.</div><div class="src" style="margin-bottom:10px">Primary</div>
  <div style="font-family:Fraunces;font-size:19px;color:{C['ink']}">The best of the mills, chosen for your home.</div>
  <div style="font-family:Fraunces;font-size:19px;color:{C['ink']};margin-top:6px">Hotel-soft. Fairly priced.</div>
  <div style="font-family:Fraunces;font-size:19px;color:{C['ink']};margin-top:6px">Cotton, done properly.</div>
  <div style="margin-top:10px"><span class="urdu" style="font-size:24px;color:{C['ink']}">گھر کا سکون</span> <span class="src">"the comfort of home" — PK accent line</span></div>
 </div>
 <div><h3 style="color:#2e7d4f">✓ Write like this</h3>
  <div class="card" style="font-size:14px;line-height:1.6">"600 GSM, ring-spun cotton. Thick enough to feel like a hotel, light enough to dry by morning."</div>
  <div class="card" style="font-size:14px;line-height:1.6;margin-top:10px">"Arrives Tue–Thu. Free returns for 30 days if it's not the one."</div>
  <div class="card" style="font-size:14px;line-height:1.6;margin-top:10px">"Pay on delivery. Our team will confirm your order on WhatsApp first."</div>
 </div>
 <div><h3 style="color:{C['clay']}">✕ Not like this</h3>
  <div class="card" style="font-size:14px;line-height:1.6;color:#6b675f">"Experience unparalleled luxury like never before!"</div>
  <div class="card" style="font-size:14px;line-height:1.6;color:#6b675f;margin-top:10px">"Premium quality world-class towels at the best price!!!"</div>
  <div class="card" style="font-size:14px;line-height:1.6;color:#6b675f;margin-top:10px">"MEGA SALE 70% OFF — LIMITED TIME ONLY"</div>
 </div>
</div>
<div class="grid g4" style="margin-top:22px;gap:18px">
 <div><b style="color:{C['clay']}">Numbers over adjectives</b><p style="font-size:13px">GSM, thread count, size in cm and inches.</p></div>
 <div><b style="color:{C['clay']}">Short sentences</b><p style="font-size:13px">Written for a phone screen, read in 3 seconds.</p></div>
 <div><b style="color:{C['clay']}">Name the feeling</b><p style="font-size:13px">"Cool on hot nights", "gets softer each wash".</p></div>
 <div><b style="color:{C['clay']}">Plain buttons</b><p style="font-size:13px">"Add to bag", "Order on WhatsApp", "Pay on delivery".</p></div>
</div>{foot(12,"Voice")}</section>''')

# 13 IMAGERY
def ph(label, h, bg, extra=""):
    return f'<div style="height:{h}px;border-radius:6px;background:{bg};position:relative;overflow:hidden">{extra}<div style="position:absolute;left:12px;bottom:10px;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:{C["ink"]};background:rgba(247,242,234,.9);padding:4px 8px;border-radius:3px">{label}</div></div>'
weave = "repeating-linear-gradient(0deg, rgba(31,58,68,.08) 0 2px, transparent 2px 6px), repeating-linear-gradient(90deg, rgba(31,58,68,.08) 0 2px, transparent 2px 6px), " + C['sand']
pages.append(f'''<section class="page"><div class="eyebrow">07 · Imagery</div><h2>Real homes, morning light, close-up texture</h2>
<div class="grid" style="grid-template-columns:1.4fr 1fr 1fr;gap:14px;margin-top:22px">
 {ph("1 · Lifestyle hero — styled, lived-in bed", 250, "linear-gradient(160deg,#efe6d6 0%,#e0d2bb 55%,#c9b699 100%)")}
 {ph("2 · Macro texture", 250, weave)}
 {ph("3 · Hands &amp; use", 250, "linear-gradient(200deg,#dfe3da 0%,#b9c4b3 100%)")}
</div>
<div class="grid g2" style="margin-top:22px;gap:40px">
 <div><h3>Shoot list for every product</h3><ul class="clean">
  <li>Lifestyle first image on web; clean white-background main image for marketplaces.</li>
  <li>Macro texture shot showing loops, weave or pile.</li>
  <li>Spec infographic: GSM, size, fibre, care — in brand fonts.</li>
  <li>Scale/in-use shot (towel on a person, sheet on a real bed).</li>
  <li>Colour-true swatch row of all shades.</li></ul></div>
 <div><h3>Direction</h3><ul class="clean">
  <li>Natural window light, warm-neutral grade; no heavy filters.</li>
  <li>Show both markets: a Karachi apartment and a US suburban bedroom.</li>
  <li>Minimal props in palette tones — linen, clay pottery, greenery.</li>
  <li>Encourage customer photos; feature them in reviews and on social.</li>
  <li>Avoid: stock-model smiles, cluttered sets, over-saturated colour.</li></ul></div>
</div>{foot(13,"Imagery")}</section>''')

# 14 WEB COMPONENTS
stars = "★★★★★"
pages.append(f'''<section class="page"><div class="eyebrow">08 · Conversion toolkit</div><h2>Website components</h2>
<div class="grid" style="grid-template-columns:1fr 1fr;gap:34px;margin-top:22px">
<div>
 <h3 style="font-size:17px">Buttons</h3>
 <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px"><span class="btn primary">Add to bag — $49</span><span class="btn secondary">View details</span><span class="btn wa">Order on WhatsApp</span></div>
 <p style="font-size:12.5px;color:#5b5750;margin-top:8px">Clay = one primary action per screen. Radius 4px, min height 48px for thumbs. WhatsApp button uses WhatsApp-style green (PK only).</p>
 <h3 style="font-size:17px;margin-top:22px">Trust bar — under every buy button</h3>
 <div style="display:flex;background:{C['white']};border:1px solid #e1d9cb;border-radius:6px;margin-top:8px">
  {''.join(f'<div style="flex:1;padding:12px 14px;border-right:1px solid #eee6d9;font-size:12.5px"><b style="color:{C["ink"]}">{a}</b><br><span style="color:#6b675f">{b}</span></div>' for a,b in [("Free shipping","US over $75"),("30-night returns","Free, no questions"),("OEKO-TEX® certified","Once obtained")])}
 </div>
 <div style="display:flex;background:{C['white']};border:1px solid #e1d9cb;border-radius:6px;margin-top:8px">
  {''.join(f'<div style="flex:1;padding:12px 14px;border-right:1px solid #eee6d9;font-size:12.5px"><b style="color:{C["ink"]}">{a}</b><br><span style="color:#6b675f">{b}</span></div>' for a,b in [("Cash on delivery","All over Pakistan"),("Free delivery","Over Rs 5,000"),("7-day exchange","Easy, via WhatsApp")])}
 </div>
 <p style="font-size:12.5px;color:#5b5750;margin-top:8px">Thresholds are examples — set yours from margin and AOV, then state them everywhere.</p>
</div>
<div>
 <h3 style="font-size:17px">Price, rating &amp; delivery block</h3>
 <div class="card" style="margin-top:8px">
  <div style="font-family:Fraunces;font-size:24px;color:{C['ink']}">The Everyday Towel Set</div>
  <div style="margin-top:4px;font-size:13px"><span class="stars">{stars}</span> <b>4.7</b> <span style="color:#6b675f">(212 reviews)</span></div>
  <div style="display:flex;gap:26px;margin-top:10px;align-items:baseline"><span style="font-size:24px;font-weight:600;color:{C['ink']}">$49</span><span style="font-size:24px;font-weight:600;color:{C['ink']}">Rs 7,450</span><span style="font-size:12px;color:#6b675f">show only the local currency on each site</span></div>
  <div style="font-size:13px;margin-top:6px;color:#2e6b4a">● In stock — arrives Tue 29 Sep – Thu 1 Oct</div>
 </div>
 <h3 style="font-size:17px;margin-top:18px">Fabric Facts card</h3>
 <div class="card" style="margin-top:8px;padding:0;overflow:hidden">
  <div style="background:{C['ink']};color:{C['cotton']};padding:9px 16px;font-size:12px;letter-spacing:.16em;font-weight:600">FABRIC FACTS</div>
  <table>{''.join(f'<tr><td style="color:#6b675f;width:40%">{a}</td><td><b>{b}</b></td></tr>' for a,b in [("Weight","600 GSM"),("Fibre","100% ring-spun cotton"),("Made in","Karachi, Pakistan"),("Care","Machine wash 40°C, tumble low")])}</table>
 </div>
</div></div>{foot(14,"Conversion toolkit")}</section>''')

# 15 PRODUCT PAGE ANATOMY
def box(txt, h, bg=C['white'], n=None):
    badge = f'<span style="position:absolute;top:8px;left:8px;width:22px;height:22px;border-radius:50%;background:{C["clay"]};color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center">{n}</span>' if n else ''
    return f'<div style="position:relative;height:{h}px;background:{bg};border:1px solid #ddd4c5;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11.5px;color:#6b675f;text-align:center;padding:4px 30px">{badge}{txt}</div>'
anat = [("Gallery", "Lifestyle first, then macro, spec infographic, scale, colours."),
        ("Name + stars", "Rating with count links to reviews."),
        ("Price + delivery date", "Local currency; exact date range, shipping cost stated."),
        ("Colour &amp; size", "Real fabric swatches; US and PK size names with cm/in."),
        ("One clay CTA", "PK adds 'Order on WhatsApp' as secondary."),
        ("Trust bar", "Returns / COD / certification — market-specific."),
        ("Fabric Facts", "GSM, fibre, origin, care — open by default."),
        ("Photo reviews", "Customer photos first; show the 4-star ones too.")]
alist = "".join(f'<div style="display:flex;gap:10px;margin:7px 0"><span class="num" style="font-size:18px;min-width:22px">{i+1}</span><div style="font-size:13px"><b>{a}</b> — {b}</div></div>' for i,(a,b) in enumerate(anat))
pages.append(f'''<section class="page"><div class="eyebrow">08 · Conversion toolkit</div><h2>Product page anatomy</h2>
<div class="grid" style="grid-template-columns:1.3fr 1fr;gap:44px;margin-top:20px">
 <div style="background:{C['sand']};border-radius:8px;padding:16px">
  <div style="display:flex;justify-content:space-between;align-items:center;background:{C['white']};padding:8px 14px;border-radius:4px;margin-bottom:10px"><div style="transform:scale(.9);transform-origin:left">{M(C['ink'],size=26)}</div><span style="font-size:10px;letter-spacing:.14em;color:#6b675f">BEDDING · BATH · GIFTING · BAG (1)</span></div>
  <div style="display:grid;grid-template-columns:1.1fr 1fr;gap:10px">
   <div>{box("Main image", 230, n=1)}<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:6px">{''.join(box("",46) for _ in range(4))}</div></div>
   <div style="display:flex;flex-direction:column;gap:6px">{box("Name · ★ 4.7 (212)",34,n=2)}{box("Price · Arrives Tue–Thu",34,n=3)}{box("Colour / Size",40,n=4)}<div style="position:relative;height:40px;background:{C['clay']};border-radius:4px;color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center"><span style="position:absolute;top:9px;left:8px;width:22px;height:22px;border-radius:50%;background:#fff;color:{C['clay']};font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center">5</span>Add to bag</div>{box("Trust bar",30,n=6)}{box("Fabric Facts",56,n=7)}</div>
  </div>
  <div style="margin-top:10px">{box("Photo reviews", 40, n=8)}</div>
 </div>
 <div>{alist}<p style="font-size:12.5px;color:#5b5750;margin-top:12px">Designed mobile-first: on phones the order is gallery → 2 → 3 → 5 (sticky) → 6 → 4 → 7 → 8.</p></div>
</div>{foot(15,"Conversion toolkit")}</section>''')

# 16 MARKET ADAPTATION
rows = [("Hero message", "Hotel-soft cotton, chosen for you.", 'Export-quality cotton, delivered to your door. <span class="urdu" style="font-size:16px">گھر کا سکون</span>'),
        ("Payment", "Cards, Apple Pay, Shop Pay, BNPL on sets", "COD front and centre; small perk for prepaid (card / JazzCash / Easypaisa)"),
        ("Key trust signals", "Reviews, free returns, OEKO-TEX, clear delivery date", "COD, WhatsApp confirmation, 7-day exchange, reviews with local names"),
        ("Order-protection", "Fraud check at checkout", "Confirm every COD order on WhatsApp before dispatch"),
        ("Sizes", "Twin · Full · Queen · King (inches)", "Single · Double · King (inches + cm)"),
        ("Key moments", "Mother's Day, back-to-college, Black Friday/Cyber Monday, holidays", "Ramadan &amp; Eid ul-Fitr, Eid ul-Adha, wedding season (winter), 11.11"),
        ("Offer style", "Sets &amp; bundles, free shipping thresholds", "Gift-boxed sets, jahez/wedding bundles, free delivery thresholds"),
        ("Accent colour", "Kiln Clay", "Kiln Clay, plus Brass Thread for Eid &amp; wedding campaigns")]
trs = "".join(f'<tr><td style="font-weight:600;color:{C["ink"]};width:18%">{a}</td><td style="width:38%">{b}</td><td>{c}</td></tr>' for a,b,c in rows)
pages.append(f'''<section class="page"><div class="eyebrow">08 · Conversion toolkit</div><h2>One brand, two markets</h2>
<p class="lede" style="margin-top:8px">Identity stays identical — logo, palette, type, voice. What changes is the proof and the payment.</p>
<table style="margin-top:20px"><tr><th></th><th>United States</th><th>Pakistan</th></tr>{trs}</table>{foot(16,"Conversion toolkit")}</section>''')

# 17 APPLICATIONS
urdu_line = '<span class="urdu" style="font-size:18px">گھر کا سکون</span>'
pages.append(f'''<section class="page sand"><div class="eyebrow">09 · Applications</div><h2>How it comes together</h2>
<div class="grid" style="grid-template-columns:0.7fr 1.3fr 1fr;gap:28px;margin-top:26px;align-items:start">
 <div><div style="width:190px;height:320px;background:{C['ink']};border-radius:6px;margin:0 auto;padding:22px 18px;color:{C['cotton']};display:flex;flex-direction:column;align-items:center;position:relative">
  <div style="width:14px;height:14px;border-radius:50%;background:{C['sand']};margin-bottom:18px"></div>{M(C['cotton'],size=78)}
  <div style="margin-top:14px">{wordmark(C['cotton'],0.36)}</div>
  <div style="margin-top:auto;width:100%;border-top:1px solid #3b5a64;padding-top:10px;font-size:10.5px;line-height:1.6;color:#d9d3c8">BATH TOWEL · 70×140 cm<br>600 GSM · 100% COTTON<br>Selected by Zasco Home</div></div>
  <p style="text-align:center;font-size:12px;margin-top:8px;color:#5b5750">Swing tag</p></div>
 <div><div style="height:320px;background:{C['cotton']};border-radius:6px;position:relative;overflow:hidden;border:1px solid #d9ccb5">
   <div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(31,58,68,.05) 0 1px,transparent 1px 5px)"></div>
   <div style="position:absolute;left:0;right:0;top:120px;height:84px;background:{C['clay']};display:flex;align-items:center;justify-content:space-between;padding:0 28px;color:#fff">
    <div style="display:flex;align-items:center;gap:14px">{M('#FFFFFF',size=52)}{wordmark('#FFFFFF',0.42)}</div>
    <div style="font-family:Fraunces;font-style:italic;font-size:19px">Well chosen. Well made.</div></div>
   <div style="position:absolute;left:28px;bottom:22px;font-size:11px;letter-spacing:.14em;color:{C['ink']}">THE EVERYDAY TOWEL SET · 6 PIECES</div>
   <div style="position:absolute;right:28px;bottom:16px;color:{C['ink']}">{urdu_line}</div></div>
  <p style="text-align:center;font-size:12px;margin-top:8px;color:#5b5750">Gift box with belly band</p></div>
 <div><div style="width:320px;height:320px;background:{C['ink']};border-radius:6px;padding:26px;color:{C['cotton']};display:flex;flex-direction:column;justify-content:space-between">
   <div class="eyebrow" style="color:{C['sand']}">Fabric facts</div>
   <div style="font-family:Fraunces;font-size:74px;line-height:.9">600<span style="font-size:26px"> GSM</span></div>
   <div style="font-family:Fraunces;font-size:20px;line-height:1.3">Hotel-thick. Dries by morning.</div>
   <div style="display:flex;justify-content:space-between;align-items:center">{M(C['cotton'],size=34)}<span style="font-size:11px;letter-spacing:.12em">SHOP · LINK IN BIO</span></div></div>
  <p style="text-align:center;font-size:12px;margin-top:8px;color:#5b5750">Instagram post (1:1)</p></div>
</div>{foot(17,"Applications")}</section>''')

# 18 SOURCES + NEXT STEPS
pages.append(f'''<section class="page dark"><div class="grid g2" style="gap:60px">
<div><div class="eyebrow">Next steps</div><h2>Launch checklist</h2>
<ul class="clean" style="margin-top:20px;color:#e6e0d6">
<li>Trademark clearance &amp; filing for "Zasco Home" — USPTO and IPO Pakistan, Class 24 &amp; 35.</li>
<li>Secure domains (.com / .pk) and matching Instagram, TikTok, Facebook handles.</li>
<li>Collect OEKO-TEX Standard 100 certificates from each mill; only claim it on products that hold one.</li><li>Write the Zasco quality standard (GSM, fibre, shrinkage, colour-fastness) and a supplier vetting checklist.</li>
<li>Decide policies: free-shipping thresholds, return window (US), exchange window (PK), prepaid perk.</li>
<li>Set up WhatsApp Business with an order-confirmation template.</li>
<li>Photograph hero SKUs to the shot list; build Fabric Facts for each.</li>
<li>Seed first 5+ reviews per SKU (post-purchase emails / WhatsApp follow-ups).</li>
<li>Have a designer refine the monogram into final vector files and a favicon set.</li>
</ul></div>
<div><div class="eyebrow">Sources</div><h2 style="font-size:30px">Research references</h2>
<div style="font-size:12.5px;line-height:1.75;margin-top:16px;color:#d9d3c8">
Baymard Institute — Cart Abandonment Rate Statistics (baymard.com/lists/cart-abandonment-rate)<br>
Spiegel Research Center, Northwestern University — How Online Reviews Influence Sales<br>
OEKO-TEX — The Key to Confidence consumer study (oeko-tex.com)<br>
OrderNation — State of Online Shopping in Pakistan 2026: COD &amp; Returns<br>
Convertcart — Home Décor eCommerce Conversion Rate Optimization<br>
Or &amp; Zon — Parachute vs Brooklinen (2026)<br>
Hutch.pk — Top 10 Bed Sheet Brands in Pakistan (2026)</div>
<div style="margin-top:40px;display:flex;align-items:center;gap:20px">{M(C['cotton'],size=64)}<div style="font-family:Fraunces;font-style:italic;font-size:22px;color:{C['sand']}">Well chosen. Well made.</div></div>
</div></div>{foot(18,"Next steps")}</section>''')

html = f"<!doctype html><html><head><meta charset='utf-8'><title>Zasco Home Brand Guidelines</title><style>{CSS}</style></head><body>{''.join(pages)}</body></html>"
(ROOT / "guide.html").write_text(html)

from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1280, "height": 720})
    pg.goto(f"file://{ROOT}/guide.html"); pg.wait_for_timeout(800)
    pg.evaluate("document.fonts.ready")
    pg.pdf(path=str(ROOT / "out/Zasco-Home-Brand-Guidelines.pdf"), width="1280px", height="720px", print_background=True)
    b.close()
print("pages:", len(pages))
