"use client";

import { useEffect, useMemo, useState } from "react";
import { ButtonLink } from "@/components/common/button";
import { FilmCard } from "@/components/film/film-card";
import { SelectField } from "@/components/common/select-field";
import { defaultQuizAnswers } from "@/lib/constants";
import { filmStocks } from "@/lib/data";
import { getFilmStockRecommendations } from "@/lib/recommendation/scoring";
import { readFilmTasteScore, readQuiz, readTasteScore } from "@/lib/storage";
import type { FilmFormat, FilmType, QuizAnswers, ScoreVector } from "@/types";

export function FilmExplorer() {
  const [quiz, setQuiz] = useState<QuizAnswers>(defaultQuizAnswers);
  const [tasteScore, setTasteScore] = useState<ScoreVector>({});
  const [hasFilmTaste, setHasFilmTaste] = useState(false);
  const [brand, setBrand] = useState("all");
  const [type, setType] = useState<FilmType | "all">("all");
  const [iso, setIso] = useState("all");
  const [format, setFormat] = useState("all");
  const [sort, setSort] = useState("match");

  useEffect(() => {
    setQuiz(readQuiz(defaultQuizAnswers));
    const filmTaste = readFilmTasteScore();
    const hasFilmScore = Object.keys(filmTaste).length > 0;
    setHasFilmTaste(hasFilmScore);
    setTasteScore(hasFilmScore ? filmTaste : readTasteScore());
  }, []);

  const recommendations = useMemo(() => {
    return getFilmStockRecommendations(quiz, tasteScore)
      .filter(({ film }) => {
        if (brand !== "all" && film.brand !== brand) return false;
        if (type !== "all" && film.type !== type) return false;
        if (format !== "all" && !film.filmFormat.includes(format as FilmFormat)) return false;
        if (iso === "low" && film.iso > 200) return false;
        if (iso === "mid" && (film.iso < 400 || film.iso > 800)) return false;
        if (iso === "high" && film.iso < 800) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === "priceAsc") return a.film.price - b.film.price;
        if (sort === "isoAsc") return a.film.iso - b.film.iso;
        return b.finalScore - a.finalScore;
      });
  }, [brand, format, iso, quiz, sort, tasteScore, type]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-5">
        <SelectField label="브랜드" value={brand} onChange={(event) => setBrand(event.target.value)}>
          <option value="all">전체</option>
          {Array.from(new Set(filmStocks.map((film) => film.brand))).map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </SelectField>
        <SelectField label="필름 타입" value={type} onChange={(event) => setType(event.target.value as FilmType | "all")}>
          <option value="all">전체</option>
          <option value="color_negative">컬러 네거티브</option>
          <option value="black_white">흑백</option>
          <option value="cinema">시네마 필름</option>
          <option value="instant">즉석</option>
        </SelectField>
        <SelectField label="ISO" value={iso} onChange={(event) => setIso(event.target.value)}>
          <option value="all">전체</option>
          <option value="low">200 이하</option>
          <option value="mid">400~800</option>
          <option value="high">800 이상</option>
        </SelectField>
        <SelectField label="포맷" value={format} onChange={(event) => setFormat(event.target.value)}>
          <option value="all">전체</option>
          <option value="35mm">35mm</option>
          <option value="120">120</option>
          <option value="instant">즉석</option>
        </SelectField>
        <SelectField label="정렬" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="match">취향 적합도</option>
          <option value="priceAsc">가격 낮은순</option>
          <option value="isoAsc">ISO 낮은순</option>
        </SelectField>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white p-4">
        <p className="text-sm leading-6 text-muted">
          {hasFilmTaste ? "필름 룩 테스트 결과를 우선 반영하고 있습니다." : "아직 필름 룩 테스트 전이라 일반 사진 취향 점수를 사용합니다."}
        </p>
        <ButtonLink href="/film-taste-test" variant="secondary">
          필름 사진 고르기
        </ButtonLink>
      </div>

      <p className="text-sm text-muted">{recommendations.length}개 필름이 조건에 맞습니다.</p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recommendations.map((recommendation) => (
          <FilmCard key={recommendation.film.id} film={recommendation.film} recommendation={recommendation} />
        ))}
      </div>
    </div>
  );
}
