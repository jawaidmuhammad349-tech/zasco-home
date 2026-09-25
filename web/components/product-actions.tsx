"use client";

import { useState } from "react";
import { HeartIcon } from "./icons";
import { useAddToBag } from "./providers";

export function QuickAdd({ id, name, variant }: { id: string; name: string; variant: string }) {
  const add = useAddToBag();
  return (
    <div className="quick">
      <button type="button" className="btn btn-buy" aria-label={`Add ${name} to bag`} onClick={() => add(id, variant)}>
        Add to bag
      </button>
    </div>
  );
}

export function WishButton({ name }: { name: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Save ${name} to wishlist`}
      aria-pressed={saved}
      className={saved ? "saved" : undefined}
      onClick={() => setSaved((s) => !s)}
    >
      <HeartIcon size={16} strokeWidth={2} />
    </button>
  );
}
