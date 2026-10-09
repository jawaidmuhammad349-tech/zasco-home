import Image from "next/image";
import mark from "@/public/brand/zasco-mark.png";
import wordmark from "@/public/brand/zasco-wordmark.png";

/** Zasco Home logo laid out side by side: ribbon Z mark + ZASCO HOME wordmark. */
export function Logo({ preload = false }: { preload?: boolean }) {
  return (
    <>
      <Image src={mark} alt="" className="lm" width={42} height={40} preload={preload} />
      <Image src={wordmark} alt="" className="lw" width={104} height={32} preload={preload} />
    </>
  );
}

/** Just the ribbon Z mark (used inside the scrolling ribbons). */
export function LogoZ({ className }: { className?: string }) {
  return <Image src={mark} alt="" className={className} width={38} height={36} />;
}
