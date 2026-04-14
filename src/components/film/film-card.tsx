"use client";

import { useEffect, useState } from "react";
import { AffiliateLinks } from "@/components/affiliate/affiliate-links";
import { ScoreBar } from "@/components/common/score-bar";
import { Tag } from "@/components/common/tag";
import { formatWon } from "@/lib/utils";
import { readFavorites, toggleFavorite } from "@/lib/storage";
import type { FavoriteState, FilmRecommendation, FilmStock } from "@/types";

export function FilmCard({ film, recommendation, compact = false }: { film: FilmStock; recommendation?: FilmRecommendation; compact?: boolean }) {
  const [favorites, setFavorites] = useState<FavoriteState>({ cameras: [], lenses: [], films: [] });

  useEffect(() => {
    setFavorites(readFavorites());
  }, []);

  const isFavorite = favorites.films.includes(film.id);

  return (
    <article className="rounded-lg border border-line bg-white p-4 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-accent">{film.brand}</p>
          <h3 className="mt-1 text-lg font-semibold text-ink">{film.model}</h3>
          <p className="mt-1 text-sm text-muted">
            ISO {film.iso} · {film.filmFormat.join(", ")} · {formatWon(film.price)}
          </p>
        </div>
        {recommendation ? (
          <div className="rounded-lg bg-ink px-3 py-2 text-right text-white">
            <p className="text-xs opacity-70">필름 점수</p>
            <p className="text-xl font-semibold">{recommendation.finalScore}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {film.traits.slice(0, compact ? 3 : 5).map((trait) => (
          <Tag key={trait}>{trait}</Tag>
        ))}
      </div>

      {!compact ? (
        <div className="mt-4 grid gap-3 text-sm leading-6 text-muted">
          <p>{recommendation?.reason ?? `${film.bestFor.join(", ")} 촬영에 잘 맞는 필름입니다.`}</p>
          <p>주의: {film.caution}</p>
          {recommendation ? (
            <div className="grid gap-2">
              <ScoreBar label="surveyProfile" value={recommendation.surveyScore} />
              <ScoreBar label="imageTasteProfile" value={recommendation.imageTasteScore} />
              <ScoreBar label="conditionFilter" value={recommendation.conditionScore} />
            </div>
          ) : null}
          <AffiliateLinks
            productId={film.id}
            productName={`${film.brand} ${film.model}`}
            category="film"
            fallbackLinks={film.shopLinks}
          />
        </div>
      ) : null}

      <button
        onClick={() => setFavorites(toggleFavorite("films", film.id))}
        className="mt-4 rounded-lg border border-line px-3 py-2 text-sm font-medium hover:border-ink"
      >
        {isFavorite ? "찜 해제" : "찜하기"}
      </button>
    </article>
  );
}
