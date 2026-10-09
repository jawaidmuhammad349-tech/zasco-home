// Sample catalogue. Photos are Unsplash stand-ins: replace `image` with a path
// under /public/products/ (e.g. "/products/karachi-percale.jpg") when real
// product photography is ready.

export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const COLOURS = {
  cotton: { name: "Raw Cotton", hex: "#F7F2EA" },
  sand: { name: "Loom Sand", hex: "#E6DAC6" },
  sage: { name: "Sage Field", hex: "#8A9B84" },
  ink: { name: "Indus Ink", hex: "#1F3A44" },
  clay: { name: "Kiln Clay", hex: "#A94F33" },
  brass: { name: "Brass Thread", hex: "#A8844F" },
  charcoal: { name: "Charcoal", hex: "#2A2A28" },
  stone: { name: "Stone Grey", hex: "#9AA3A1" },
} as const;

export type Colour = (typeof COLOURS)[keyof typeof COLOURS];
export type BadgeKind = "best" | "new" | "set" | "eid";

export type Product = {
  id: string;
  vendor: string;
  name: string;
  price: { us: number; pk: number };
  image: string;
  badge?: { kind: BadgeKind; label: string };
  rating: number;
  reviews: number;
  colours: Colour[];
  sizes?: string[];
  /** Index into `sizes` of a size that is sold out. */
  soldOut?: number;
};

const C = COLOURS;

export const PRODUCTS: Product[] = [
  { id: "karachi-percale-sheet-set", vendor: "Zasco Hotel", name: "Karachi Percale Sheet Set", price: { us: 129, pk: 8990 }, image: unsplash("1631049307264-da0ec9d70304"), badge: { kind: "best", label: "Bestseller" }, rating: 4.7, reviews: 212, colours: [C.cotton, C.sand, C.sage], sizes: ["Twin", "Full", "Queen", "King"] },
  { id: "hotel-bath-towel-pair", vendor: "Zasco Bath", name: "Hotel Bath Towel, pair", price: { us: 59, pk: 3990 }, image: unsplash("1639298109207-5a9ccc254481"), badge: { kind: "new", label: "600 GSM" }, rating: 4.8, reviews: 164, colours: [C.cotton, C.clay, C.ink] },
  { id: "indus-sateen-duvet-cover", vendor: "Zasco Hotel", name: "Indus Sateen Duvet Cover", price: { us: 149, pk: 10490 }, image: unsplash("1505693416388-ac5ce068fe85"), rating: 4.7, reviews: 97, colours: [C.sand, C.cotton], sizes: ["Full", "Queen", "King", "Cal King"], soldOut: 3 },
  { id: "rust-stripe-cushion-covers", vendor: "Zasco Living", name: "Rust Stripe Cushion Covers", price: { us: 39, pk: 2490 }, image: unsplash("1616627561950-9f746e330187"), badge: { kind: "new", label: "New" }, rating: 4.6, reviews: 41, colours: [C.clay, C.sand] },
  { id: "guest-room-bedding-set", vendor: "Zasco Hotel", name: "Guest Room Bedding Set", price: { us: 219, pk: 15990 }, image: unsplash("1540518614846-7eded433c457"), badge: { kind: "set", label: "Set price" }, rating: 4.9, reviews: 63, colours: [C.cotton, C.sage], sizes: ["Queen", "King"] },
  { id: "pure-white-pillow-pair", vendor: "Zasco Hotel", name: "Pure White Pillow Pair", price: { us: 49, pk: 3290 }, image: unsplash("1584100936595-c0654b55a2e2"), rating: 4.7, reviews: 128, colours: [C.cotton], sizes: ["Standard", "King"] },
  { id: "charcoal-percale-fitted-sheet", vendor: "Zasco Hotel", name: "Charcoal Percale Fitted Sheet", price: { us: 45, pk: 2990 }, image: unsplash("1566665797739-1674de7a421a"), badge: { kind: "best", label: "Bestseller" }, rating: 4.6, reviews: 88, colours: [C.charcoal, C.ink, C.cotton], sizes: ["Twin", "Full", "Queen", "King"], soldOut: 0 },
  { id: "sand-linen-blend-quilt", vendor: "Zasco Living", name: "Sand Linen-Blend Quilt", price: { us: 169, pk: 11990 }, image: unsplash("1583845112203-29329902332e"), rating: 4.8, reviews: 52, colours: [C.sand, C.brass], sizes: ["Queen", "King"] },
  { id: "grey-sateen-sheet-set", vendor: "Zasco Hotel", name: "Grey Sateen Sheet Set", price: { us: 119, pk: 7990 }, image: unsplash("1616594039964-ae9021a400a0"), badge: { kind: "new", label: "New" }, rating: 4.7, reviews: 76, colours: [C.stone, C.cotton, C.ink] },
  { id: "wedding-linen-box", vendor: "Zasco Gift", name: "The Wedding Linen Box", price: { us: 289, pk: 21990 }, image: unsplash("1586105251261-72a756497a11"), badge: { kind: "eid", label: "Gift box" }, rating: 4.9, reviews: 34, colours: [C.cotton, C.brass] },
  { id: "all-white-duvet-insert", vendor: "Zasco Hotel", name: "All-White Duvet Insert", price: { us: 99, pk: 6990 }, image: unsplash("1595526114035-0d45ed16cfbf"), rating: 4.6, reviews: 110, colours: [C.cotton], sizes: ["Full", "Queen", "King"] },
  { id: "waffle-robe-hand-towel", vendor: "Zasco Bath", name: "Waffle Robe & Hand Towel", price: { us: 89, pk: 6490 }, image: unsplash("1620626011761-996317b8d101"), badge: { kind: "set", label: "Set price" }, rating: 4.6, reviews: 58, colours: [C.cotton, C.sage], sizes: ["S/M", "L/XL"] },
];

/** Featured product block (full product detail). */
export const FEATURED = {
  id: "hotel-bath-towel-set",
  name: "Hotel Bath Towel Set",
  price: { us: 59, pk: 3990 },
  rating: 4.8,
  reviews: 164,
  summary: "Set of 2 bath towels",
  gallery: [
    { src: unsplash("1639298109207-5a9ccc254481"), alt: "Hotel Bath Towel, folded" },
    { src: unsplash("1507652313519-d4e9174996dd"), alt: "Bath towels in a bright bathroom" },
    { src: unsplash("1620626011761-996317b8d101"), alt: "Waffle towel texture" },
    { src: unsplash("1552321554-5fefe8c9ef14"), alt: "Towels in a bathroom with plants" },
  ],
  colours: [C.cotton, C.sand, C.sage, C.ink, C.clay],
  sizes: [
    { name: "Hand", dims: "40 × 70 cm" },
    { name: "Bath", dims: "70 × 140 cm" },
    { name: "Bath sheet", dims: "90 × 160 cm" },
    { name: "Beach", dims: "100 × 180 cm", soldOut: true },
  ],
  defaultSize: 1,
  facts: [
    ["Weight", "600 GSM"],
    ["Fibre", "100% cotton"],
    ["Weave", "Zero-twist terry"],
    ["Size", "70 × 140 cm"],
    ["Mill", "Faisalabad, PK"],
    ["Care", "40°C · tumble low"],
  ],
};

export type CartProduct = {
  id: string;
  name: string;
  image: string;
  price: { us: number; pk: number };
};

/** Everything that can go in the bag, keyed by id. */
export const CART_CATALOG: Record<string, CartProduct> = Object.fromEntries(
  [...PRODUCTS, { ...FEATURED, image: FEATURED.gallery[0].src }].map((p) => [
    p.id,
    { id: p.id, name: p.name, image: p.image, price: p.price },
  ]),
);

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id)!;
