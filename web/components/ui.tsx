import { formatPrice } from "@/lib/markets";

/** Renders both market prices; CSS shows the one for the active store. */
export function Price({
  price,
  cents = true,
  className = "price",
  style,
}: {
  price: { us: number; pk: number };
  cents?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={style}>
      <span data-only="us">{formatPrice(price.us, "us", cents)}</span>
      <span data-only="pk">{formatPrice(price.pk, "pk")}</span>
    </span>
  );
}

/** Five stars filled to the exact rating (a 4.6 shows as 4.6, not 5). */
export function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" role="img" aria-label={`Rated ${rating} out of 5`}>
      <span aria-hidden="true">★★★★★</span>
      <span className="fill" aria-hidden="true" style={{ width: `${(rating / 5) * 100}%` }}>
        ★★★★★
      </span>
    </span>
  );
}
