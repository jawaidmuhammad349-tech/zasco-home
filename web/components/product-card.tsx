import type { Product } from "@/lib/catalog";
import { QuickAdd, WishButton } from "./product-actions";
import { ExpandIcon } from "./icons";
import { Photo } from "./photo";
import { Price, Stars } from "./ui";

export function ProductCard({ p }: { p: Product }) {
  const defaultSize = p.sizes ? (p.soldOut === 1 ? 0 : Math.min(1, p.sizes.length - 1)) : undefined;
  const variant = [p.colours[0].name, defaultSize !== undefined ? p.sizes![defaultSize] : undefined].filter(Boolean).join(" · ");
  return (
    <article className="p">
      <div className="ph">
        {p.badge && <span className={`badge b-${p.badge.kind}`}>{p.badge.label}</span>}
        <div className="acts">
          <WishButton name={p.name} />
          <button type="button" aria-label={`Quick view ${p.name}`}><ExpandIcon /></button>
        </div>
        <Photo
          src={p.image}
          alt={p.name}
          fill
          sizes="(max-width: 599px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
        />
        <QuickAdd id={p.id} name={p.name} variant={variant} />
      </div>
      <div className="vendor">{p.vendor}</div>
      <h3 className="pname"><a href="#">{p.name}</a></h3>
      <Price price={p.price} />
      <div className="rate"><Stars rating={p.rating} /> {p.rating} ({p.reviews})</div>
      <div className="sw" role="list" aria-label={`${p.colours.length} ${p.colours.length === 1 ? "colour" : "colours"}`}>
        {p.colours.map((c, k) => (
          <i key={c.name} role="listitem" title={c.name} aria-label={c.name} className={k === 0 ? "on" : undefined} style={{ background: c.hex }} />
        ))}
      </div>
      {p.sizes && (
        <div className="sizes" role="list" aria-label="Sizes">
          {p.sizes.map((s, k) => (
            <span
              key={s}
              role="listitem"
              className={[k === defaultSize && "on", k === p.soldOut && "x"].filter(Boolean).join(" ") || undefined}
              aria-label={k === p.soldOut ? `${s}, sold out` : undefined}
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}
