"use client";

import { useEffect, useMemo, useState } from "react";
import { AffiliateLinks } from "@/components/affiliate/affiliate-links";
import { CameraCard } from "@/components/camera/camera-card";
import { FilmCard } from "@/components/film/film-card";
import { LensCard } from "@/components/lens/lens-card";
import { SelectField } from "@/components/common/select-field";
import { defaultQuizAnswers } from "@/lib/constants";
import { cameras, filmStocks, lenses } from "@/lib/data";
import { getDigitalCameraRecommendations, getFilmCameraRecommendations, getFilmStockRecommendations } from "@/lib/recommendation/scoring";
import { readQuiz, readTasteScore } from "@/lib/storage";
import type { QuizAnswers, ScoreVector } from "@/types";

export function ShopsClient() {
  const [quiz, setQuiz] = useState<QuizAnswers>(defaultQuizAnswers);
  const [tasteScore, setTasteScore] = useState<ScoreVector>({});
  const [category, setCategory] = useState("recommended");

  useEffect(() => {
    setQuiz(readQuiz(defaultQuizAnswers));
    setTasteScore(readTasteScore());
  }, []);

  const data = useMemo(() => {
    const digital = getDigitalCameraRecommendations(quiz, tasteScore).slice(0, 3);
    const filmCameras = getFilmCameraRecommendations(quiz, tasteScore).slice(0, 3);
    const films = getFilmStockRecommendations(quiz, tasteScore).slice(0, 4);
    return { digital, filmCameras, films };
  }, [quiz, tasteScore]);

  const lensHighlights = useMemo(() => lenses.slice(0, 6), []);

  return (
    <div className="grid gap-8">
      <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
        <SelectField label="구매 카테고리" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="recommended">추천 결과 기반</option>
          <option value="camera">카메라 바디</option>
          <option value="lens">렌즈</option>
          <option value="film">필름</option>
        </SelectField>
      </div>

      {(category === "recommended" || category === "camera") && (
        <section>
          <p className="text-sm font-semibold text-accent">Camera Shops</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">카메라 구매 연결</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {(category === "camera" ? cameras.filter((camera) => (camera.kind ?? "digital") === "digital").slice(0, 6).map((camera) => ({ camera })) : data.digital).map((item) => (
              <article key={item.camera.id} className="grid gap-3 rounded-lg border border-line bg-white p-4 shadow-soft">
                <CameraCard camera={item.camera} compact />
                <AffiliateLinks
                  productId={item.camera.id}
                  productName={`${item.camera.brand} ${item.camera.model}`}
                  category="camera"
                  fallbackLinks={item.camera.shopLinks}
                />
              </article>
            ))}
          </div>
        </section>
      )}

      {(category === "recommended" || category === "camera") && (
        <section>
          <p className="text-sm font-semibold text-accent">Used Film Cameras</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">필름카메라 중고 구매 연결</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {(category === "camera" ? cameras.filter((camera) => camera.kind === "film").slice(0, 6).map((camera) => ({ camera })) : data.filmCameras).map((item) => (
              <article key={item.camera.id} className="grid gap-3 rounded-lg border border-line bg-white p-4 shadow-soft">
                <CameraCard camera={item.camera} compact />
                <AffiliateLinks
                  productId={item.camera.id}
                  productName={`${item.camera.brand} ${item.camera.model}`}
                  category="camera"
                  fallbackLinks={item.camera.shopLinks}
                />
              </article>
            ))}
          </div>
        </section>
      )}

      {(category === "recommended" || category === "lens") && (
        <section>
          <p className="text-sm font-semibold text-accent">Lens Shops</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">렌즈 구매 연결</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {lensHighlights.map((lens) => (
              <article key={lens.id} className="grid gap-3 rounded-lg border border-line bg-white p-4 shadow-soft">
                <LensCard lens={lens} compact />
                <AffiliateLinks
                  productId={lens.id}
                  productName={`${lens.brand} ${lens.model}`}
                  category="lens"
                  fallbackLinks={lens.shopLinks}
                />
              </article>
            ))}
          </div>
        </section>
      )}

      {(category === "recommended" || category === "film") && (
        <section>
          <p className="text-sm font-semibold text-accent">Film Shops</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">필름 구매 연결</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-4">
            {(category === "film" ? filmStocks.slice(0, 12).map((film) => ({ film })) : data.films).map((item) => (
              <article key={item.film.id} className="grid gap-3 rounded-lg border border-line bg-white p-4 shadow-soft">
                <FilmCard film={item.film} compact />
                <AffiliateLinks
                  productId={item.film.id}
                  productName={`${item.film.brand} ${item.film.model}`}
                  category="film"
                  fallbackLinks={item.film.shopLinks}
                />
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
