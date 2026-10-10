// US store settings. Thresholds, delivery windows and cut-off times are
// placeholders until the owner sets them from real margins and carrier SLAs.

export const STORE = {
  freeShippingOver: 75,
  shippingNote: "Shipping and tax calculated at checkout",
  timeZone: "America/New_York",
  cutoffHour: 14, // orders placed before 2 PM ET ship same day
  deliveryBusinessDays: [2, 4] as const,
  workingDays: [1, 2, 3, 4, 5], // Mon–Fri
};

export function formatPrice(amount: number, cents = true): string {
  return (
    "$" +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: cents ? 2 : 0,
      maximumFractionDigits: cents ? 2 : 0,
    })
  );
}
