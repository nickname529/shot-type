"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/button";
import { SelectField } from "@/components/common/select-field";
import {
  brands,
  budgetLabels,
  defaultQuizAnswers,
  lensPreferenceLabels,
  operationLabels,
  photoStyleLabels,
  purposeLabels,
  usedLabels,
  videoLabels,
  weightLabels
} from "@/lib/constants";
import { readQuiz, saveQuiz } from "@/lib/storage";
import type { Brand, QuizAnswers } from "@/types";

export function QuizForm() {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswers>(defaultQuizAnswers);

  useEffect(() => {
    setAnswers(readQuiz(defaultQuizAnswers));
  }, []);

  function update<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function submit(next: "taste" | "results") {
    saveQuiz(answers);
    router.push(next === "taste" ? "/taste-test" : "/results");
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft sm:grid-cols-2">
        <SelectField label="주 사용 목적" value={answers.purpose} onChange={(event) => update("purpose", event.target.value as QuizAnswers["purpose"])}>
          {Object.entries(purposeLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>

        <SelectField label="예산" value={answers.budget} onChange={(event) => update("budget", event.target.value as QuizAnswers["budget"])}>
          {Object.entries(budgetLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>

        <SelectField label="무게 선호" value={answers.weightPreference} onChange={(event) => update("weightPreference", event.target.value as QuizAnswers["weightPreference"])}>
          {Object.entries(weightLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>

        <SelectField label="렌즈 교환" value={answers.lensPreference} onChange={(event) => update("lensPreference", event.target.value as QuizAnswers["lensPreference"])}>
          {Object.entries(lensPreferenceLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>

        <SelectField label="사진 스타일" value={answers.photoStyle} onChange={(event) => update("photoStyle", event.target.value as QuizAnswers["photoStyle"])}>
          {Object.entries(photoStyleLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>

        <SelectField label="조작 방식" value={answers.operationStyle} onChange={(event) => update("operationStyle", event.target.value as QuizAnswers["operationStyle"])}>
          {Object.entries(operationLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>

        <SelectField label="브랜드 선호" value={answers.brandPreference} onChange={(event) => update("brandPreference", event.target.value as Brand | "none")}>
          <option value="none">상관없음</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </SelectField>

        <SelectField label="중고 포함 여부" value={answers.usedPreference} onChange={(event) => update("usedPreference", event.target.value as QuizAnswers["usedPreference"])}>
          {Object.entries(usedLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>

        <SelectField label="영상 비중" value={answers.videoImportance} onChange={(event) => update("videoImportance", event.target.value as QuizAnswers["videoImportance"])}>
          {Object.entries(videoLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => submit("taste")}>사진 취향 테스트로 이어가기</Button>
        <Button variant="secondary" onClick={() => submit("results")}>
          설문만으로 결과 보기
        </Button>
      </div>
    </div>
  );
}
