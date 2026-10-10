import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { LogoSprite } from "@/components/logo";
import { Providers } from "@/components/providers";
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

export const metadata: Metadata = {
  title: "Zasco Home | Well chosen. Well made.",
  description:
    "Hotel-quality cotton bedding, towels and bath, chosen from export-grade mills and sold at a fair price in the US.",
};

export const viewport: Viewport = {
  themeColor: "#2F5BFF",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-US"
      className={`${display.variable} ${body.variable} ${script.variable}`}
    >
      <body>
        <LogoSprite />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
