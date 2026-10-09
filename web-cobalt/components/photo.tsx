"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";

// Unsplash resizes on its own CDN, so stand-in photos skip Next's optimiser.
// Real product photos in /public go through the default Next.js loader.
const unsplashLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 75}`;

export function Photo(props: ImageProps) {
  const remote = typeof props.src === "string" && props.src.startsWith("https://images.unsplash.com/");
  return <Image {...props} loader={remote ? unsplashLoader : props.loader} alt={props.alt} />;
}
