import { productById, unsplash } from "@/lib/catalog";
import { PlayIcon, RibbonMark, WhatsAppIcon } from "./icons";
import { Photo } from "./photo";
import { Price } from "./ui";
import { NewsletterForm } from "./newsletter";

export function SectionHead({ eyebrow, title, id, children }: { eyebrow: string; title: string; id: string; children: React.ReactNode }) {
  return (
    <div className="head">
      <div className="eb">{eyebrow}</div>
      <h2 id={id}>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

export function PromoBanners() {
  return (
    <section className="sec" aria-label="Collections">
      <div className="promos">
        <a className="promo" href="#">
          <Photo src={unsplash("1540518614846-7eded433c457")} alt="Bed with orange benches" fill sizes="(max-width: 599px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <div className="glass"><h3>Winter 2026</h3><p>New flannel and sateen</p></div>
        </a>
        <a className="promo" href="#">
          <Photo src={unsplash("1595526114035-0d45ed16cfbf")} alt="Bright white bedroom" fill sizes="(max-width: 599px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <div className="glass"><h3>All-White Edit</h3><p>The hotel look, at home</p></div>
        </a>
        <a className="promo sun" href="#">
          <Photo src={unsplash("1586105251261-72a756497a11")} alt="Bed with a yellow cushion" fill sizes="(max-width: 599px) 100vw, (max-width: 1024px) 100vw, 33vw" />
          <div className="glass">
            <h3 data-only="pk">Wedding &amp; Jahez</h3>
            <h3 data-only="us">Build a Set, Save</h3>
            <p data-only="pk">Complete bedding + bath bundles</p>
            <p data-only="us">Sheets + duvet + towels, one price</p>
          </div>
        </a>
      </div>
    </section>
  );
}

const TILES = [
  { cls: "b1", label: "Pillows", img: "1584100936595-c0654b55a2e2", alt: "White pillow on a yellow background", sizes: "(max-width: 1024px) 50vw, 25vw" },
  { cls: "b2", label: "Bedding", img: "1505693416388-ac5ce068fe85", alt: "Bedroom with layered bedding", sizes: "(max-width: 1024px) 50vw, 25vw" },
  { cls: "b3", label: "Duvet Covers", img: "1631049035182-249067d7618e", alt: "Hotel bed with duvet", sizes: "(max-width: 1024px) 100vw, 50vw" },
  { cls: "b4", label: "Towels", img: "1639298109207-5a9ccc254481", alt: "Folded towels", sizes: "(max-width: 1024px) 50vw, 25vw" },
  { cls: "b5", label: "Bath", img: "1552321554-5fefe8c9ef14", alt: "Bathroom with plants", sizes: "(max-width: 1024px) 100vw, 50vw" },
];

export function CategoryBento() {
  return (
    <section className="bento" aria-label="Shop by category">
      {TILES.map((t) => (
        <a key={t.cls} className={`tile ${t.cls}`} href="#">
          <Photo src={unsplash(t.img)} alt={t.alt} fill sizes={t.sizes} />
          <span className="lbl">{t.label}</span>
        </a>
      ))}
    </section>
  );
}

type RibbonItem = string | { big: string } | { script: string } | { urdu: string } | "mark";

function RibbonTrack({ items }: { items: RibbonItem[] }) {
  const render = (it: RibbonItem, i: number) => {
    if (it === "mark") return <RibbonMark key={i} />;
    if (typeof it === "string") return <span key={i}>{it}</span>;
    if ("big" in it) return <span key={i} className="big">{it.big}</span>;
    if ("script" in it) return <span key={i} className="script">{it.script}</span>;
    return <span key={i} className="script urdu" lang="ur">{it.urdu}</span>;
  };
  // Content is doubled so the loop is seamless.
  return <div className="track">{[...items, ...items].map(render)}</div>;
}

export function Ribbons() {
  return (
    <div className="ribbons" aria-hidden="true">
      <div className="rib one">
        <RibbonTrack items={[{ big: "600 GSM Towels" }, "mark", "Free Returns", { script: "well chosen" }, { big: "Sets, Not Sales" }, "mark", "Real Specs", { urdu: "گھر کا سکون" }]} />
      </div>
      <div className="rib two">
        <RibbonTrack items={["Percale", "mark", { big: "Sateen" }, "Waffle", { script: "well made" }, { big: "Terry" }, "mark", "Flannel"]} />
      </div>
    </div>
  );
}

export function RibbonSingle() {
  return (
    <div className="ribbons single" aria-hidden="true">
      <div className="rib one">
        <RibbonTrack items={[{ big: "Mill-Checked Cotton" }, "mark", "Cash on Delivery · PK", { script: "hotel-soft" }, "30-Night Returns · US", "mark", { big: "Fairly Priced" }]} />
      </div>
    </div>
  );
}

const CHECKS = [
  ["GSM", "Weight measured, not guessed"],
  ["TC", "Thread count verified"],
  ["100%", "Fibre content tested"],
  ["4/5", "Colour-fastness minimum"],
  ["<3%", "Shrinkage after wash"],
  ["OEKO", "Certificate on file, when the mill holds one"],
  ["×3", "Washed before listing"],
  ["1:1", "Sample matches bulk"],
];

export function QualityChecks() {
  return (
    <section className="sec" aria-labelledby="h-chk" style={{ paddingTop: 48 }}>
      <SectionHead eyebrow="Our Standard" title="What We Check" id="h-chk">
        Every product is tested against the Zasco quality standard before it&apos;s listed.
      </SectionHead>
      <ul className="checks">
        {CHECKS.map(([k, v]) => (
          <li key={k} className="chk"><b>{k}</b><span>{v}</span></li>
        ))}
      </ul>
    </section>
  );
}

const FEED: [string, string][] = [
  ["1522771739844-6a9f6d5f14af", "karachi-percale-sheet-set"],
  ["1629140727571-9b5c6f6267b4", "indus-sateen-duvet-cover"],
  ["1617325247661-675ab4b64ae2", "sand-linen-blend-quilt"],
  ["1552321554-5fefe8c9ef14", "hotel-bath-towel-pair"],
  ["1618221195710-dd6b41faaea6", "rust-stripe-cushion-covers"],
];

export function ShopTheFeed() {
  return (
    <div className="feedbg">
      <div className="wrap">
        <section className="sec" aria-labelledby="h-feed">
          <SectionHead eyebrow="Shop the Feed" title="Homes in Motion" id="h-feed">
            How our sheets and towels look in real homes, from Karachi to Chicago.
          </SectionHead>
          <div className="feed">
            {FEED.map(([img, id]) => {
              const p = productById(id);
              return (
                <a key={img} className="reel" href="#" aria-label={`Customer video featuring ${p.name}`}>
                  <Photo src={unsplash(img)} alt="" fill sizes="(max-width: 599px) 72vw, (max-width: 1024px) 40vw, 20vw" />
                  <span className="play" aria-hidden="true"><PlayIcon /></span>
                  <div className="tagp">
                    <div className="ph"><Photo src={p.image} alt="" fill sizes="66px" /></div>
                    <div>
                      <small>{p.vendor}</small>
                      <b>{p.name}</b>
                      <Price price={p.price} className="pr price" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="more"><a href="#" className="btn btn-line">Follow us @zascohome</a></div>
        </section>
      </div>
    </div>
  );
}

const POSTS = [
  ["1522771739844-6a9f6d5f14af", "2026-09-18", "Sep 18, 2026", "5 min read", "Percale vs sateen: which one sleeps cooler?"],
  ["1639298109207-5a9ccc254481", "2026-09-10", "Sep 10, 2026", "4 min read", "What GSM means, and the towel weight to buy"],
  ["1616594039964-ae9021a400a0", "2026-08-29", "Aug 29, 2026", "6 min read", "Thread count myths: why 400 beats 1,000"],
  ["1583845112203-29329902332e", "2026-08-14", "Aug 14, 2026", "5 min read", "Building a jahez linen box: a complete checklist"],
];

export function Journal() {
  return (
    <section className="sec" aria-labelledby="h-blog">
      <SectionHead eyebrow="Fabric Guide" title="Know Your Cotton" id="h-blog">
        Plain-number guides to buying bedding and towels.
      </SectionHead>
      <div className="posts">
        {POSTS.map(([img, iso, date, read, title]) => (
          <a key={img} className="post" href="#">
            <div className="ph"><Photo src={unsplash(img)} alt="" fill sizes="(max-width: 599px) 100vw, (max-width: 1024px) 50vw, 25vw" /></div>
            <div className="meta"><time dateTime={iso}>{date}</time><span>{read}</span></div>
            <h3>{title}</h3>
          </a>
        ))}
      </div>
      <div className="more"><a href="#" className="btn btn-line">Read the Fabric Guide</a></div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <h2 className="h4">Zasco Home</h2>
            <p style={{ margin: "0 0 16px", maxWidth: "34ch" }}>
              We choose from export-grade mills, test the fabric and publish the real specs, so you get better cotton at a fair price.
            </p>
            <div className="pay" data-only="us" aria-label="Payment methods">
              {["VISA", "MC", "AMEX", "Apple Pay", "Shop Pay", "Klarna"].map((m) => <span key={m}>{m}</span>)}
            </div>
            <div className="pay" data-only="pk" aria-label="Payment methods">
              {["Cash on delivery", "JazzCash", "Easypaisa", "VISA", "MC"].map((m) => <span key={m}>{m}</span>)}
            </div>
          </div>
          <nav aria-labelledby="f-shop">
            <h2 className="h4" id="f-shop">Shop</h2>
            <ul>{["Bedding", "Towels", "Bath", "Sets & gifts", "New in"].map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
          </nav>
          <nav aria-labelledby="f-help">
            <h2 className="h4" id="f-help">Help</h2>
            <ul>{["Shipping", "Returns & exchanges", "Size guide", "Track order", "Contact"].map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
          </nav>
          <div>
            <h2 className="h4">First look at new colours</h2>
            <p style={{ margin: "0 0 10px" }}>One email when a new set lands.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="bigword" aria-hidden="true">ZASCO<span>.</span></div>
        <div className="legal">
          <span>© 2026 Zasco Home · Well chosen. Well made.</span>
          <span>Mockup for review · not a live store</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <a className="wa" href="#" data-only="pk" aria-label="Order on WhatsApp">
      <WhatsAppIcon />
    </a>
  );
}
