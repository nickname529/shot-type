"use client";

import { useEffect, useState } from "react";
import { AffiliateLinks } from "@/components/affiliate/affiliate-links";
import { Tag } from "@/components/common/tag";
import { formatWon } from "@/lib/utils";
import { readFavorites, toggleFavorite } from "@/lib/storage";
import type { FavoriteState, Lens } from "@/types";

export function LensCard({ lens, compact = false }: { lens: Lens; compact?: boolean }) {
  const [favorites, setFavorites] = useState<FavoriteState>({ cameras: [], lenses: [], films: [] });

  useEffect(() => {
    setFavorites(readFavorites());
  }, []);

  const isFavorite = favorites.lenses.includes(lens.id);

  return (
    <article className="rounded-lg border border-line bg-white p-4 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-accent">{lens.brand}</p>
          <h3 className="mt-1 text-lg font-semibold text-ink">{lens.model}</h3>
          <p className="mt-1 text-sm text-muted">
            {lens.focalLength} · {lens.maxAperture} · {lens.weight}g
          </p>
        </div>
        <p className="rounded-lg bg-paper px-3 py-2 text-sm font-semibold text-ink">{formatWon(lens.price)}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {lens.tags.slice(0, compact ? 4 : 7).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      {!compact && (
        <div className="mt-4 grid gap-3 text-sm">
          <p className="text-muted">{lens.reason}</p>
          <p className="text-muted">용도: {lens.recommendedUse.join(", ")}</p>
          <p className="text-muted">어울리는 바디: {lens.exampleBodies.join(", ")}</p>
          <AffiliateLinks
            productId={lens.id}
            productName={`${lens.brand} ${lens.model}`}
            category="lens"
            fallbackLinks={lens.shopLinks}
          />
        </div>
      )}

      <button
        onClick={() => setFavorites(toggleFavorite("lenses", lens.id))}
        className="mt-4 rounded-lg border border-line px-3 py-2 text-sm font-medium hover:border-ink"
      >
        {isFavorite ? "찜 해제" : "찜하기"}
      </button>
    </article>
  );
}
