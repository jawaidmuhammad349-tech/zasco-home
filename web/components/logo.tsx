import { MARK, WORDMARK } from "./logo-paths";

// <use> places the symbol at 0,0, so the outer <svg> needs a zero-origin viewBox.
const box = (vb: string) => "0 0 " + vb.split(" ").slice(2).join(" ");

// The logo is drawn once as SVG symbols and reused everywhere with <use>.
// Its three colours come from --logo-ink / --logo-mid / --logo-light, so it
// follows the active colour scheme.

export function LogoSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="zl-mark" viewBox={MARK.viewBox}>
          <path style={{ fill: "var(--logo-ink)" }} fillRule="evenodd" d={MARK.ink} />
          <path style={{ fill: "var(--logo-mid)" }} fillRule="evenodd" d={MARK.mid} />
          <path style={{ fill: "var(--logo-light)" }} fillRule="evenodd" d={MARK.light} />
        </symbol>
        <symbol id="zl-word" viewBox={WORDMARK.viewBox}>
          <path style={{ fill: "var(--logo-ink)" }} fillRule="evenodd" d={WORDMARK.ink} />
        </symbol>
      </defs>
    </svg>
  );
}

/** Ribbon Z mark + ZASCO HOME wordmark, side by side. */
export function Logo() {
  return (
    <>
      <LogoZ className="lm" />
      <svg className="lw" viewBox={box(WORDMARK.viewBox)} aria-hidden="true" focusable="false">
        <use href="#zl-word" />
      </svg>
    </>
  );
}

/** Just the ribbon Z mark. */
export function LogoZ({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={box(MARK.viewBox)} aria-hidden="true" focusable="false">
      <use href="#zl-mark" />
    </svg>
  );
}
