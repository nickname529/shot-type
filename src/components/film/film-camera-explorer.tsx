"use client";

import { useEffect, useMemo, useState } from "react";
import { CameraCard } from "@/components/camera/camera-card";
import { SelectField } from "@/components/common/select-field";
import { defaultQuizAnswers } from "@/lib/constants";
import { cameras } from "@/lib/data";
import { scoreCamera } from "@/lib/recommendation/scoring";
import { readQuiz, readTasteScore } from "@/lib/storage";
import type { FilmFormat, QuizAnswers, ScoreVector } from "@/types";

export function FilmCameraExplorer() {
  const [quiz, setQuiz] = useState<QuizAnswers>(defaultQuizAnswers);
  const [tasteScore, setTasteScore] = useState<ScoreVector>({});
  const [format, setFormat] = useState<FilmFormat | "all">("all");
  const [difficulty, setDifficulty] = useState("all");
  const [lens, setLens] = useState("all");
  const [sort, setSort] = useState("match");

  useEffect(() => {
    setQuiz(readQuiz(defaultQuizAnswers));
    setTasteScore(readTasteScore());
  }, []);

  const recommendations = useMemo(() => {
    return cameras
      .filter((camera) => camera.kind === "film")
      .map((camera) => scoreCamera(camera, quiz, tasteScore))
      .filter(({ camera }) => {
        if (format !== "all" && camera.filmFormat !== format) return false;
        if (difficulty !== "all" && camera.operationDifficulty !== difficulty) return false;
        if (lens === "fixed" && camera.interchangeableLens) return false;
        if (lens === "interchangeable" && !camera.interchangeableLens) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === "priceAsc") return (a.camera.priceUsed ?? a.camera.priceNew) - (b.camera.priceUsed ?? b.camera.priceNew);
        if (sort === "weightAsc") return a.camera.weight - b.camera.weight;
        return b.finalMatchScore - a.finalMatchScore;
      });
  }, [difficulty, format, lens, quiz, sort, tasteScore]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
        <SelectField label="필름 포맷" value={format} onChange={(event) => setFormat(event.target.value as FilmFormat | "all")}>
          <option value="all">전체</option>
          <option value="35mm">35mm</option>
          <option value="120">120</option>
          <option value="half-frame">하프프레임</option>
        </SelectField>
        <SelectField label="조작 난이도" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
          <option value="all">전체</option>
          <option value="easy">쉬움</option>
          <option value="moderate">보통</option>
          <option value="hard">어려움</option>
        </SelectField>
        <SelectField label="렌즈 방식" value={lens} onChange={(event) => setLens(event.target.value)}>
          <option value="all">전체</option>
          <option value="interchangeable">렌즈 교환식</option>
          <option value="fixed">고정렌즈</option>
        </SelectField>
        <SelectField label="정렬" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="match">취향 적합도</option>
          <option value="priceAsc">가격 낮은순</option>
          <option value="weightAsc">무게 낮은순</option>
        </SelectField>
      </div>
      <p className="text-sm text-muted">{recommendations.length}개 필름카메라가 조건에 맞습니다.</p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recommendations.map((recommendation) => (
          <CameraCard key={recommendation.camera.id} camera={recommendation.camera} recommendation={recommendation} />
        ))}
      </div>
    </div>
  );
}
