"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CameraCard } from "@/components/camera/camera-card";
import { SelectField } from "@/components/common/select-field";
import { brands, budgetLabels, defaultQuizAnswers } from "@/lib/constants";
import { cameras } from "@/lib/data";
import { scoreCamera } from "@/lib/recommendation/scoring";
import { readQuiz, readTasteScore } from "@/lib/storage";
import type { Brand, BudgetRange, QuizAnswers, ScoreVector } from "@/types";

type LensFilter = "all" | "interchangeable" | "fixed";
type SortKey = "priceAsc" | "priceDesc" | "weightAsc" | "beginner" | "portable" | "match";

interface CameraFilters {
  brand: Brand | "all";
  budget: BudgetRange | "all";
  sensor: string;
  weight: "all" | "under400" | "under600" | "over600";
  lens: LensFilter;
  trait: "all" | "photo" | "video" | "travel" | "portrait";
  level: "all" | "entry" | "intermediate" | "pro";
  used: "possible" | "no";
  sort: SortKey;
}

const defaultFilters: CameraFilters = {
  brand: "all",
  budget: "all",
  sensor: "all",
  weight: "all",
  lens: "all",
  trait: "all",
  level: "all",
  used: "possible",
  sort: "match"
};

function fromParams(params: URLSearchParams): CameraFilters {
  return {
    ...defaultFilters,
    brand: (params.get("brand") as CameraFilters["brand"]) ?? defaultFilters.brand,
    budget: (params.get("budget") as CameraFilters["budget"]) ?? defaultFilters.budget,
    sensor: params.get("sensor") ?? defaultFilters.sensor,
    weight: (params.get("weight") as CameraFilters["weight"]) ?? defaultFilters.weight,
    lens: (params.get("lens") as CameraFilters["lens"]) ?? defaultFilters.lens,
    trait: (params.get("trait") as CameraFilters["trait"]) ?? defaultFilters.trait,
    level: (params.get("level") as CameraFilters["level"]) ?? defaultFilters.level,
    used: (params.get("used") as CameraFilters["used"]) ?? defaultFilters.used,
    sort: (params.get("sort") as CameraFilters["sort"]) ?? defaultFilters.sort
  };
}

function getPrice(cameraId: string, used: CameraFilters["used"]) {
  const camera = cameras.find((item) => item.id === cameraId);
  if (!camera) {
    return 0;
  }
  return used === "possible" && camera.priceUsed ? camera.priceUsed : camera.priceNew;
}

export function CameraExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<CameraFilters>(() => fromParams(new URLSearchParams(searchParams.toString())));
  const [savedQuiz, setSavedQuiz] = useState<QuizAnswers>(defaultQuizAnswers);
  const [tasteScore, setTasteScore] = useState<ScoreVector>({});
  const [ready, setReady] = useState(false);

  const quiz = useMemo(() => ({ ...savedQuiz, usedPreference: filters.used }), [filters.used, savedQuiz]);

  useEffect(() => {
    setSavedQuiz(readQuiz(defaultQuizAnswers));
    setTasteScore(readTasteScore());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== defaultFilters[key as keyof CameraFilters]) {
        params.set(key, value);
      }
    });
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [filters, pathname, ready, router]);

  function update<K extends keyof CameraFilters>(key: K, value: CameraFilters[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  const scored = useMemo(() => {
    const recommendations = cameras.filter((camera) => (camera.kind ?? "digital") === "digital").map((camera) => scoreCamera(camera, quiz, tasteScore));

    return recommendations
      .filter(({ camera }) => {
        const price = filters.used === "possible" && camera.priceUsed ? camera.priceUsed : camera.priceNew;
        if (filters.brand !== "all" && camera.brand !== filters.brand) return false;
        if (filters.budget !== "all") {
          const max = { under50: 500000, "50to100": 1000000, "100to200": 2000000, "200to300": 3000000, over300: Infinity }[filters.budget];
          const min = filters.budget === "over300" ? 3000000 : 0;
          if (price > max || price < min) return false;
        }
        if (filters.sensor !== "all" && camera.sensorSize !== filters.sensor) return false;
        if (filters.weight === "under400" && camera.weight > 400) return false;
        if (filters.weight === "under600" && camera.weight > 600) return false;
        if (filters.weight === "over600" && camera.weight < 600) return false;
        if (filters.lens === "interchangeable" && !camera.interchangeableLens) return false;
        if (filters.lens === "fixed" && camera.interchangeableLens) return false;
        if (filters.level !== "all" && camera.beginnerLevel !== filters.level) return false;
        if (filters.trait === "video" && !camera.tags.includes("video_strong")) return false;
        if (filters.trait === "travel" && !camera.tags.includes("travel_friendly")) return false;
        if (filters.trait === "portrait" && !camera.tags.includes("portrait_friendly")) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sort === "priceAsc") return getPrice(a.camera.id, filters.used) - getPrice(b.camera.id, filters.used);
        if (filters.sort === "priceDesc") return getPrice(b.camera.id, filters.used) - getPrice(a.camera.id, filters.used);
        if (filters.sort === "weightAsc") return a.camera.weight - b.camera.weight;
        if (filters.sort === "beginner") {
          return Number(b.camera.tags.includes("beginner_friendly")) - Number(a.camera.tags.includes("beginner_friendly"));
        }
        if (filters.sort === "portable") {
          return a.camera.weight - b.camera.weight || Number(b.camera.tags.includes("portable")) - Number(a.camera.tags.includes("portable"));
        }
        return b.finalMatchScore - a.finalMatchScore;
      });
  }, [filters, quiz, tasteScore]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
        <SelectField label="브랜드" value={filters.brand} onChange={(event) => update("brand", event.target.value as CameraFilters["brand"])}>
          <option value="all">전체</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </SelectField>
        <SelectField label="가격대" value={filters.budget} onChange={(event) => update("budget", event.target.value as CameraFilters["budget"])}>
          <option value="all">전체</option>
          {Object.entries(budgetLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>
        <SelectField label="센서 크기" value={filters.sensor} onChange={(event) => update("sensor", event.target.value)}>
          <option value="all">전체</option>
          {Array.from(new Set(cameras.map((camera) => camera.sensorSize))).map((sensor) => (
            <option key={sensor} value={sensor}>
              {sensor}
            </option>
          ))}
        </SelectField>
        <SelectField label="무게" value={filters.weight} onChange={(event) => update("weight", event.target.value as CameraFilters["weight"])}>
          <option value="all">전체</option>
          <option value="under400">400g 이하</option>
          <option value="under600">600g 이하</option>
          <option value="over600">600g 이상</option>
        </SelectField>
        <SelectField label="렌즈 교환" value={filters.lens} onChange={(event) => update("lens", event.target.value as CameraFilters["lens"])}>
          <option value="all">전체</option>
          <option value="interchangeable">렌즈 교환식</option>
          <option value="fixed">고정렌즈</option>
        </SelectField>
        <SelectField label="사진/영상 성향" value={filters.trait} onChange={(event) => update("trait", event.target.value as CameraFilters["trait"])}>
          <option value="all">전체</option>
          <option value="photo">사진 중심</option>
          <option value="video">영상 중심</option>
          <option value="travel">여행 중심</option>
          <option value="portrait">인물 중심</option>
        </SelectField>
        <SelectField label="난이도" value={filters.level} onChange={(event) => update("level", event.target.value as CameraFilters["level"])}>
          <option value="all">전체</option>
          <option value="entry">입문</option>
          <option value="intermediate">중급</option>
          <option value="pro">전문가</option>
        </SelectField>
        <SelectField label="가격 기준" value={filters.used} onChange={(event) => update("used", event.target.value as CameraFilters["used"])}>
          <option value="possible">중고 포함</option>
          <option value="no">신품 기준</option>
        </SelectField>
        <SelectField label="정렬" value={filters.sort} onChange={(event) => update("sort", event.target.value as SortKey)}>
          <option value="match">취향 적합도 순</option>
          <option value="priceAsc">가격 낮은순</option>
          <option value="priceDesc">가격 높은순</option>
          <option value="weightAsc">무게 낮은순</option>
          <option value="beginner">입문자 추천순</option>
          <option value="portable">휴대성 순</option>
        </SelectField>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{scored.length}개 바디가 조건에 맞습니다.</p>
        <button onClick={() => setFilters(defaultFilters)} className="rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium hover:border-ink">
          필터 초기화
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {scored.map((recommendation) => (
          <CameraCard key={recommendation.camera.id} camera={recommendation.camera} recommendation={recommendation} />
        ))}
      </div>
    </div>
  );
}
