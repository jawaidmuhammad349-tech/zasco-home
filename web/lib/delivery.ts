import { MARKETS, type Market } from "./markets";

export type DeliveryEstimate = {
  /** Minutes left before today's dispatch cut-off, or null if the next cut-off is more than a day away. */
  minutesLeft: number | null;
  from: string; // e.g. "Tue 29"
  to: string;
};

/** A Date whose local getters read as wall-clock time in `timeZone`. */
function wallClock(now: Date, timeZone: string) {
  return new Date(now.toLocaleString("en-US", { timeZone }));
}

const label = (d: Date) =>
  d.toLocaleDateString("en-US", { weekday: "short" }) + " " + d.getDate();

export function estimateDelivery(market: Market, now = new Date()): DeliveryEstimate {
  const cfg = MARKETS[market];
  const working = (d: Date) => cfg.workingDays.includes(d.getDay());
  const local = wallClock(now, cfg.timeZone);

  // The day the order leaves the warehouse.
  const ship = new Date(local);
  ship.setHours(cfg.cutoffHour, 0, 0, 0);
  if (!working(ship) || local >= ship) {
    do ship.setDate(ship.getDate() + 1);
    while (!working(ship));
  }
  const minutes = Math.floor((ship.getTime() - local.getTime()) / 60000);

  const addWorkingDays = (start: Date, n: number) => {
    const d = new Date(start);
    while (n > 0) {
      d.setDate(d.getDate() + 1);
      if (working(d)) n--;
    }
    return d;
  };
  const [min, max] = cfg.deliveryBusinessDays;
  return {
    minutesLeft: minutes < 24 * 60 ? minutes : null,
    from: label(addWorkingDays(ship, min)),
    to: label(addWorkingDays(ship, max)),
  };
}

export function formatCountdown(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}
