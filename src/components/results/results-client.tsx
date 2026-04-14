"use client";

import { useEffect, useMemo, useState } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { SponsoredSection } from "@/components/ads/sponsored-section";
import { AffiliateLinks } from "@/components/affiliate/affiliate-links";
import { SubscriptionUpsell } from "@/components/affiliate/subscription-upsell";
import { Button, ButtonLink } from "@/components/common/button";
import { RadarChart } from "@/components/common/radar-chart";
import { ScoreBar } from "@/components/common/score-bar";
import { SelectField } from "@/components/common/select-field";
import { Tag } from "@/components/common/tag";
import { CameraCard } from "@/components/camera/camera-card";
import { FilmCard } from "@/components/film/film-card";
import { LensCard } from "@/components/lens/lens-card";
import { DisclosureNote } from "@/components/legal/disclosure-note";
import {
  brands,
  budgetLabels,
  defaultQuizAnswers,
  lensPreferenceLabels,
  operationLabels,
  photoStyleLabels,
  purposeLabels,
  storageKeys,
  usedLabels,
  videoLabels,
  weightLabels
} from "@/lib/constants";
import { styleKeys, styleLabels } from "@/lib/data";
import {
  getDigitalCameraRecommendations,
  getFilmCameraRecommendations,
  getFilmStockRecommendations,
  getTierRecommendations,
  summarizeTasteProfile
} from "@/lib/recommendation/scoring";
import { readFilmTasteScore, readQuiz, readTasteScore, saveQuiz, writeJson } from "@/lib/storage";
import type { Brand, QuizAnswers, ScoreVector } from "@/types";

type Tab = "digital" | "filmCamera" | "film";

const tierLabels = {
  value: "가성비",
  balanced: "균형형",
  premium: "프리미엄"
};

export function ResultsClient() {
  const [quiz, setQuiz] = useState<QuizAnswers>(defaultQuizAnswers);
  const [tasteScore, setTasteScore] = useState<ScoreVector>({});
  const [filmTasteScore, setFilmTasteScore] = useState<ScoreVector>({});
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<Tab>("digital");

  useEffect(() => {
    setQuiz(readQuiz(defaultQuizAnswers));
    setTasteScore(readTasteScore());
    setFilmTasteScore(readFilmTasteScore());
  }, []);

  const digitalRecommendations = useMemo(() => getDigitalCameraRecommendations(quiz, tasteScore), [quiz, tasteScore]);
  const effectiveFilmTaste = useMemo(() => (Object.keys(filmTasteScore).length ? filmTasteScore : tasteScore), [filmTasteScore, tasteScore]);
  const filmCameraRecommendations = useMemo(() => getFilmCameraRecommendations(quiz, effectiveFilmTaste), [effectiveFilmTaste, quiz]);
  const filmRecommendations = useMemo(() => getFilmStockRecommendations(quiz, effectiveFilmTaste), [effectiveFilmTaste, quiz]);
  const summary = useMemo(() => summarizeTasteProfile(quiz, tasteScore), [quiz, tasteScore]);
  const tierRecommendations = useMemo(() => getTierRecommendations(tab === "filmCamera" ? filmCameraRecommendations : digitalRecommendations), [digitalRecommendations, filmCameraRecommendations, tab]);
  const topTaste = useMemo(
    () =>
      styleKeys
        .map((key) => [key, tasteScore[key] ?? 0] as const)
        .filter(([, value]) => value > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6),
    [tasteScore]
  );

  function update<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) {
    setQuiz((current) => {
      const next = { ...current, [key]: value };
      saveQuiz(next);
      return next;
    });
  }

  async function share() {
    await navigator.clipboard?.writeText(window.location.href);
    setMessage("결과 링크를 복사했습니다.");
  }

  function saveResult() {
    writeJson(storageKeys.savedResults, {
      savedAt: new Date().toISOString(),
      quiz,
      tasteScore,
      filmTasteScore,
      topCameraIds: [...digitalRecommendations.slice(0, 3), ...filmCameraRecommendations.slice(0, 3)].map((item) => item.camera.id),
      topFilmIds: filmRecommendations.slice(0, 3).map((item) => item.film.id)
    });
    setMessage("추천 결과를 저장했습니다.");
  }

  return (
    <div className="grid gap-10">
      <DisclosureNote />
      <section className="grid gap-4 lg:grid-cols-[0.9fr_0.8fr_1.1fr]">
        <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-accent">나는 이런 취향입니다</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {summary.map((item) => <Tag key={item}>{item}</Tag>)}
          </div>
          <div className="mt-5 grid gap-2">
            {topTaste.length ? topTaste.map(([key, value]) => <ScoreBar key={key} label={styleLabels[key]} value={Math.min(100, value * 8)} />) : <p className="text-sm leading-6 text-muted">사진 취향 테스트를 건너뛰어 설문 기반으로 추천합니다.</p>}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button onClick={share} variant="secondary">결과 공유</Button>
            <Button onClick={saveResult}>추천 결과 저장</Button>
            <ButtonLink href="/film-taste-test" variant="secondary">필름 사진 고르기</ButtonLink>
          </div>
          {message ? <p className="mt-3 text-sm text-accent">{message}</p> : null}
        </div>

        <RadarChart score={tasteScore} />

        <div className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft sm:grid-cols-2">
          <SelectField label="목적" value={quiz.purpose} onChange={(event) => update("purpose", event.target.value as QuizAnswers["purpose"])}>
            {Object.entries(purposeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </SelectField>
          <SelectField label="예산" value={quiz.budget} onChange={(event) => update("budget", event.target.value as QuizAnswers["budget"])}>
            {Object.entries(budgetLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </SelectField>
          <SelectField label="무게" value={quiz.weightPreference} onChange={(event) => update("weightPreference", event.target.value as QuizAnswers["weightPreference"])}>
            {Object.entries(weightLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </SelectField>
          <SelectField label="렌즈 교환" value={quiz.lensPreference} onChange={(event) => update("lensPreference", event.target.value as QuizAnswers["lensPreference"])}>
            {Object.entries(lensPreferenceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </SelectField>
          <SelectField label="사진 스타일" value={quiz.photoStyle} onChange={(event) => update("photoStyle", event.target.value as QuizAnswers["photoStyle"])}>
            {Object.entries(photoStyleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </SelectField>
          <SelectField label="조작 방식" value={quiz.operationStyle} onChange={(event) => update("operationStyle", event.target.value as QuizAnswers["operationStyle"])}>
            {Object.entries(operationLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </SelectField>
          <SelectField label="브랜드" value={quiz.brandPreference} onChange={(event) => update("brandPreference", event.target.value as Brand | "none")}>
            <option value="none">상관없음</option>
            {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
          </SelectField>
          <SelectField label="중고" value={quiz.usedPreference} onChange={(event) => update("usedPreference", event.target.value as QuizAnswers["usedPreference"])}>
            {Object.entries(usedLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </SelectField>
          <SelectField label="영상 비중" value={quiz.videoImportance} onChange={(event) => update("videoImportance", event.target.value as QuizAnswers["videoImportance"])}>
            {Object.entries(videoLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </SelectField>
        </div>
      </section>

      <SubscriptionUpsell />

      <section className="flex flex-wrap gap-2">
        {[
          ["digital", "디지털 추천"],
          ["filmCamera", "필름카메라 추천"],
          ["film", "필름 추천"]
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setTab(value as Tab)}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${tab === value ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`}
          >
            {label}
          </button>
        ))}
      </section>

      {tab === "digital" ? (
        <RecommendationSection title="디지털 카메라 Top 3" recommendations={digitalRecommendations.slice(0, 3)} />
      ) : null}

      {tab === "filmCamera" ? (
        <RecommendationSection title="필름카메라 Top 3" recommendations={filmCameraRecommendations.slice(0, 3)} showFilms />
      ) : null}

      {tab === "film" ? (
        <section>
          <p className="text-sm font-semibold text-accent">Film Stock Score</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">필름 추천 Top 6</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filmRecommendations.slice(0, 6).map((recommendation) => (
              <div key={recommendation.film.id} className="grid gap-4">
                <FilmCard film={recommendation.film} recommendation={recommendation} />
                <ReferenceStrip references={recommendation.photoReferences} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {tab !== "film" ? (
        <section>
          <p className="text-sm font-semibold text-accent">Budget Alternatives</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">가격대별 대안 추천</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {Object.entries(tierRecommendations).map(([tier, recommendation]) => (
              <article key={tier} className="rounded-lg border border-line bg-white p-5 shadow-soft">
                <Tag>{tierLabels[tier as keyof typeof tierLabels]}</Tag>
                <h3 className="mt-4 text-xl font-semibold text-ink">{recommendation.camera.brand} {recommendation.camera.model}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{recommendation.reason}</p>
                <p className="mt-4 text-sm font-semibold text-ink">구매 연결</p>
                <div className="mt-2">
                  <AffiliateLinks
                    productId={recommendation.camera.id}
                    productName={`${recommendation.camera.brand} ${recommendation.camera.model}`}
                    category="camera"
                    fallbackLinks={recommendation.camera.shopLinks}
                    compact
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <SponsoredSection placement="results-bottom" />
      <AdSlot placement="results-bottom" />
    </div>
  );
}

function RecommendationSection({ title, recommendations, showFilms = false }: { title: string; recommendations: ReturnType<typeof getDigitalCameraRecommendations>; showFilms?: boolean }) {
  return (
    <section>
      <p className="text-sm font-semibold text-accent">Camera Score</p>
      <h2 className="mt-2 text-2xl font-semibold text-ink">{title}</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {recommendations.map((recommendation) => (
          <div key={recommendation.camera.id} className="grid gap-4">
            <CameraCard camera={recommendation.camera} recommendation={recommendation} />
            <div className="rounded-lg border border-line bg-white p-4">
              <p className="text-sm font-semibold text-ink">{showFilms ? "잘 맞는 필름" : "추천 렌즈"}</p>
              <div className="mt-3 grid gap-3">
                {showFilms
                  ? recommendation.recommendedFilms?.map((film) => <FilmCard key={film.id} film={film} compact />)
                  : recommendation.recommendedLenses.map((lens) => <LensCard key={lens.id} lens={lens} compact />)}
                {!showFilms && !recommendation.recommendedLenses.length ? <p className="text-sm leading-6 text-muted">고정렌즈 카메라라 별도 렌즈 없이 완성된 조합입니다.</p> : null}
              </div>
            </div>
            <div className="rounded-lg border border-line bg-white p-4">
              <p className="text-sm font-semibold text-ink">설명 가능한 점수</p>
              <div className="mt-3 grid gap-2">
                <ScoreBar label="surveyProfile" value={recommendation.userPreferenceScore} />
                <ScoreBar label="imageTasteProfile" value={recommendation.imageTasteScore} />
                <ScoreBar label="conditionFilter" value={recommendation.conditionScore} />
              </div>
            </div>
            <ReferenceStrip references={recommendation.photoReferences ?? []} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ReferenceStrip({ references }: { references: NonNullable<ReturnType<typeof getDigitalCameraRecommendations>[number]["photoReferences"]> }) {
  if (!references.length) return null;
  return (
    <div className="grid gap-3 rounded-lg border border-line bg-white p-4">
      <p className="text-sm font-semibold text-ink">이런 사진 방향</p>
      <div className="grid gap-3">
        {references.slice(0, 2).map((reference) => (
          <article key={reference.id} className="overflow-hidden rounded-lg border border-line">
            <img src={reference.imageUrl} alt={reference.title} className="aspect-[4/3] w-full object-cover" />
            <div className="p-3">
              <p className="text-sm font-semibold text-ink">{reference.title}</p>
              <p className="mt-1 text-xs text-muted">{reference.styleTags.join(", ")}{reference.filmHint ? ` · ${reference.filmHint}` : ""}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
