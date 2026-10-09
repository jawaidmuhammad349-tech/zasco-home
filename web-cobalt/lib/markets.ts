// Market (store) settings. Thresholds, delivery windows and cut-off times are
// placeholders until the owner sets them from real margins and courier SLAs.

export type Market = "us" | "pk";

export const MARKETS = {
  us: {
    label: "United States · USD $",
    freeShippingOver: 75,
    freeShippingLabel: "Free shipping over $75",
    shippingNote: "Shipping and tax calculated at checkout",
    timeZone: "America/New_York",
    cutoffHour: 14, // orders placed before 2 PM ET ship same day
    deliveryBusinessDays: [2, 4] as const,
    workingDays: [1, 2, 3, 4, 5], // Mon–Fri
  },
  pk: {
    label: "Pakistan · PKR Rs",
    freeShippingOver: 5000,
    freeShippingLabel: "Free delivery over Rs 5,000",
    shippingNote: "Delivery charges calculated at checkout",
    timeZone: "Asia/Karachi",
    cutoffHour: 15, // orders placed before 3 PM PKT ship same day
    deliveryBusinessDays: [1, 3] as const,
    workingDays: [1, 2, 3, 4, 5, 6], // Mon–Sat
  },
} satisfies Record<Market, unknown>;

export const MARKET_STORAGE_KEY = "zasco-store";

export function formatPrice(amount: number, market: Market, cents = true): string {
  if (market === "pk") return "Rs " + Math.round(amount).toLocaleString("en-US");
  return (
    "$" +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: cents ? 2 : 0,
      maximumFractionDigits: cents ? 2 : 0,
    })
  );
}
