import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
import { MARKET_BOOT_SCRIPT } from "@/lib/stores";
import "./globals.css";

// Self-hosted brand fonts (SIL Open Font License), so text renders the same
// on every device and no request goes to Google at runtime.
const display = localFont({
  src: "./fonts/bricolage-grotesque-latin-opsz-normal.woff2",
  weight: "200 800",
  variable: "--font-display",
  fallback: ["Arial Black", "system-ui", "sans-serif"],
});
const body = localFont({
  src: "./fonts/dm-sans-latin-opsz-normal.woff2",
  weight: "100 1000",
  variable: "--font-body",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});
const script = localFont({
  src: "./fonts/caveat-latin-600-normal.woff2",
  weight: "600",
  variable: "--font-script",
  fallback: ["cursive"],
});
const urdu = localFont({
  src: "./fonts/noto-nastaliq-urdu-arabic-400-normal.woff2",
  weight: "400",
  variable: "--font-urdu",
  preload: false,
});

export const metadata: Metadata = {
  title: "Zasco Home | Well chosen. Well made.",
  description:
    "Hotel-quality cotton bedding, towels and bath, chosen from export-grade mills and sold at a fair price in the US and Pakistan.",
};

export const viewport: Viewport = {
  themeColor: "#0E2A33",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-market="us"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${script.variable} ${urdu.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MARKET_BOOT_SCRIPT }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
