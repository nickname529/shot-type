"use client";

import { useEffect, useState } from "react";
import { AffiliateLinks } from "@/components/affiliate/affiliate-links";
import { Tag } from "@/components/common/tag";
import { storageKeys } from "@/lib/constants";
import { formatWon } from "@/lib/utils";
import { readFavorites, readJson, toggleFavorite, writeJson } from "@/lib/storage";
import type { CameraBody, CameraRecommendation, FavoriteState } from "@/types";

function getCompareIds() {
  return readJson<string[]>(storageKeys.compareCameras, []);
}

export function CameraCard({
  camera,
  recommendation,
  compact = false
}: {
  camera: CameraBody;
  recommendation?: CameraRecommendation;
  compact?: boolean;
}) {
  const [favorites, setFavorites] = useState<FavoriteState>({ cameras: [], lenses: [], films: [] });
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(readFavorites());
    setCompareIds(getCompareIds());
  }, []);

  const isFavorite = favorites.cameras.includes(camera.id);
  const inCompare = compareIds.includes(camera.id);

  function handleFavorite() {
    setFavorites(toggleFavorite("cameras", camera.id));
  }

  function handleCompare() {
    const current = getCompareIds();
    const next = current.includes(camera.id)
      ? current.filter((id) => id !== camera.id)
      : [...current, camera.id].slice(-4);
    writeJson(storageKeys.compareCameras, next);
    setCompareIds(next);
  }

  return (
    <article className="rounded-lg border border-line bg-white p-4 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-accent">{camera.brand}</p>
          <h3 className="mt-1 text-xl font-semibold text-ink">{camera.model}</h3>
          <p className="mt-1 text-sm text-muted">
            {(camera.kind ?? "digital") === "film" ? "필름" : "디지털"} · {camera.type} · {camera.sensorSize} · {camera.weight}g
          </p>
        </div>
        {recommendation ? (
          <div className="rounded-lg bg-ink px-3 py-2 text-right text-white">
            <p className="text-xs opacity-70">적합도</p>
            <p className="text-xl font-semibold">{recommendation.finalMatchScore}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 grid gap-2 text-sm text-muted">
        <p>신품 {formatWon(camera.priceNew)} · 중고 {camera.priceUsed ? formatWon(camera.priceUsed) : "정보 없음"}</p>
        <p>{camera.interchangeableLens ? `${camera.mount} 렌즈 교환식` : "고정렌즈 카메라"}</p>
        {camera.filmFormat ? <p>{camera.filmFormat} · 조작 {camera.operationDifficulty} · 유지 {camera.maintenanceDifficulty}</p> : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {camera.tags.slice(0, compact ? 4 : 7).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      {!compact && (
        <div className="mt-4 grid gap-3">
          <div>
            <p className="text-sm font-semibold text-ink">잘 맞는 사용자</p>
            <p className="mt-1 text-sm text-muted">{camera.recommendedFor.join(", ")}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">주의할 점</p>
            <p className="mt-1 text-sm text-muted">{camera.weaknesses[0]}</p>
          </div>
        </div>
      )}

      {recommendation ? (
        <details className="mt-4 rounded-lg border border-line bg-paper p-3">
          <summary className="cursor-pointer text-sm font-semibold text-ink">이유 보기</summary>
          <p className="mt-2 text-sm leading-6 text-muted">{recommendation.reason}</p>
        </details>
      ) : null}

      {!compact ? (
        <div className="mt-4">
          <AffiliateLinks
            productId={camera.id}
            productName={`${camera.brand} ${camera.model}`}
            category="camera"
            fallbackLinks={camera.shopLinks}
          />
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={handleFavorite} className="rounded-lg border border-line px-3 py-2 text-sm font-medium hover:border-ink">
          {isFavorite ? "찜 해제" : "찜하기"}
        </button>
        <button onClick={handleCompare} className="rounded-lg border border-line px-3 py-2 text-sm font-medium hover:border-ink">
          {inCompare ? "비교 해제" : "비교 담기"}
        </button>
      </div>
    </article>
  );
}
