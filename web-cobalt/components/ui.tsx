import { formatPrice } from "@/lib/store";

export function Price({
  price,
  cents = true,
  className = "price",
  style,
}: {
  price: number;
  cents?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={style}>
      {formatPrice(price, cents)}
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
