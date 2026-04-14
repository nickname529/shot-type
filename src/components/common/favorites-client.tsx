"use client";

import { useEffect, useMemo, useState } from "react";
import { CameraCard } from "@/components/camera/camera-card";
import { FilmCard } from "@/components/film/film-card";
import { LensCard } from "@/components/lens/lens-card";
import { ButtonLink } from "@/components/common/button";
import { storageKeys } from "@/lib/constants";
import { cameras, filmStocks, lenses } from "@/lib/data";
import { readFavorites, readJson } from "@/lib/storage";
import type { FavoriteState } from "@/types";

interface SavedResult {
  savedAt: string;
  topCameraIds: string[];
  topFilmIds?: string[];
}

export function FavoritesClient() {
  const [favorites, setFavorites] = useState<FavoriteState>({ cameras: [], lenses: [], films: [] });
  const [savedResult, setSavedResult] = useState<SavedResult | null>(null);

  useEffect(() => {
    setFavorites(readFavorites());
    setSavedResult(readJson<SavedResult | null>(storageKeys.savedResults, null));
  }, []);

  const favoriteCameras = useMemo(() => cameras.filter((camera) => favorites.cameras.includes(camera.id)), [favorites]);
  const favoriteLenses = useMemo(() => lenses.filter((lens) => favorites.lenses.includes(lens.id)), [favorites]);
  const favoriteFilms = useMemo(() => filmStocks.filter((film) => favorites.films?.includes(film.id)), [favorites]);
  const savedCameras = useMemo(() => cameras.filter((camera) => savedResult?.topCameraIds.includes(camera.id)), [savedResult]);
  const savedFilms = useMemo(() => filmStocks.filter((film) => savedResult?.topFilmIds?.includes(film.id)), [savedResult]);

  return (
    <div className="grid gap-10">
      {savedResult ? (
        <section>
          <p className="text-sm font-semibold text-accent">Saved Result</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">저장한 추천 후보</h2>
          <p className="mt-2 text-sm text-muted">저장 시간: {new Date(savedResult.savedAt).toLocaleString("ko-KR")}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {savedCameras.map((camera) => (
              <CameraCard key={camera.id} camera={camera} compact />
            ))}
          </div>
          {savedFilms.length ? (
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {savedFilms.map((film) => (
                <FilmCard key={film.id} film={film} compact />
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      <section>
        <p className="text-sm font-semibold text-accent">Favorite Cameras</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">찜한 카메라</h2>
        {favoriteCameras.length ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {favoriteCameras.map((camera) => (
              <CameraCard key={camera.id} camera={camera} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-line bg-white p-5">
            <p className="text-sm leading-6 text-muted">아직 찜한 카메라가 없습니다.</p>
            <ButtonLink href="/cameras" className="mt-4" variant="secondary">
              바디 탐색하기
            </ButtonLink>
          </div>
        )}
      </section>

      <section>
        <p className="text-sm font-semibold text-accent">Favorite Lenses</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">찜한 렌즈</h2>
        {favoriteLenses.length ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {favoriteLenses.map((lens) => (
              <LensCard key={lens.id} lens={lens} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-line bg-white p-5">
            <p className="text-sm leading-6 text-muted">아직 찜한 렌즈가 없습니다.</p>
            <ButtonLink href="/lenses" className="mt-4" variant="secondary">
              렌즈 탐색하기
            </ButtonLink>
          </div>
        )}
      </section>

      <section>
        <p className="text-sm font-semibold text-accent">Favorite Films</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">찜한 필름</h2>
        {favoriteFilms.length ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {favoriteFilms.map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-line bg-white p-5">
            <p className="text-sm leading-6 text-muted">아직 찜한 필름이 없습니다.</p>
            <ButtonLink href="/films" className="mt-4" variant="secondary">
              필름 탐색하기
            </ButtonLink>
          </div>
        )}
      </section>
    </div>
  );
}
