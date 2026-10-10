// Line icons (24px grid, stroke = currentColor). Decorative by default.

type P = { size?: number; className?: string; strokeWidth?: number };

const base = (size = 20, strokeWidth = 1.9) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

export const SearchIcon = ({ size, className, strokeWidth }: P) => (
  <svg {...base(size, strokeWidth)} className={className}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const UserIcon = ({ size, className, strokeWidth }: P) => (
  <svg {...base(size, strokeWidth)} className={className}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>
);
export const HeartIcon = ({ size, className, strokeWidth }: P) => (
  <svg {...base(size, strokeWidth)} className={className}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
);
export const BagIcon = ({ size, className, strokeWidth }: P) => (
  <svg {...base(size, strokeWidth)} className={className}><path d="M5 8h14l-1 13H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
);
export const MenuIcon = ({ size = 22, className }: P) => (
  <svg {...base(size, 2)} className={className}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const CloseIcon = ({ size = 22, className }: P) => (
  <svg {...base(size, 2)} className={className}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const PlusIcon = ({ size = 18, className, strokeWidth = 2.4 }: P) => (
  <svg {...base(size, strokeWidth)} className={className}><path d="M12 5v14M5 12h14" /></svg>
);
export const MinusIcon = ({ size = 18, className, strokeWidth = 2.4 }: P) => (
  <svg {...base(size, strokeWidth)} className={className}><path d="M5 12h14" /></svg>
);
export const ChevronLeft = ({ size = 16, className }: P) => (
  <svg {...base(size, 2.4)} className={className}><path d="m15 18-6-6 6-6" /></svg>
);
export const ChevronRight = ({ size = 16, className }: P) => (
  <svg {...base(size, 2.4)} className={className}><path d="m9 18 6-6-6-6" /></svg>
);
export const ExpandIcon = ({ size = 16, className }: P) => (
  <svg {...base(size, 2)} className={className}><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></svg>
);
export const TruckIcon = ({ size = 18, className, strokeWidth = 1.8 }: P) => (
  <svg {...base(size, strokeWidth)} className={className}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>
);
export const ReturnIcon = ({ size = 18, className }: P) => (
  <svg {...base(size, 1.8)} className={className}><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" /></svg>
);
export const HeadsetIcon = ({ size = 14, className }: P) => (
  <svg {...base(size, 2)} className={className}><path d="M4 12a8 8 0 1 1 16 0v5a2 2 0 0 1-2 2h-2v-6h4M4 12v5a2 2 0 0 0 2 2h2v-6H4" /></svg>
);
export const TrashIcon = ({ size = 16, className }: P) => (
  <svg {...base(size, 1.8)} className={className}><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>
);
export const InstagramIcon = ({ size = 15, className }: P) => (
  <svg {...base(size, 2)} className={className}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
);
export const TikTokIcon = ({ size = 15, className }: P) => (
  <svg {...base(size, 2)} className={className}><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.5 3 2.5 5 5.5 5" /></svg>
);
export const FacebookIcon = ({ size = 15, className }: P) => (
  <svg {...base(size, 2)} className={className}><path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z" /></svg>
);
export const PlayIcon = ({ size = 12 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M6 4l14 8-14 8z" /></svg>
);
