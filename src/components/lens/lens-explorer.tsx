"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LensCard } from "@/components/lens/lens-card";
import { SelectField } from "@/components/common/select-field";
import { cameras, lenses } from "@/lib/data";
import { readTasteScore } from "@/lib/storage";
import type { Brand, LensTag } from "@/types";

type SortKey = "priceAsc" | "priceDesc" | "weightAsc" | "match";

interface LensFilters {
  brand: Brand | "all";
  mount: string;
  focal: "all" | "wide" | "standard" | "tele";
  type: "all" | "prime" | "zoom";
  aperture: "all" | "bright" | "fastZoom";
  price: "all" | "under50" | "50to100" | "over100";
  weight: "all" | "under150" | "under350" | "over350";
  use: LensTag | "all";
  body: string;
  sort: SortKey;
}

const defaultFilters: LensFilters = {
  brand: "all",
  mount: "all",
  focal: "all",
  type: "all",
  aperture: "all",
  price: "all",
  weight: "all",
  use: "all",
  body: "all",
  sort: "match"
};

function fromParams(params: URLSearchParams): LensFilters {
  return {
    ...defaultFilters,
    brand: (params.get("brand") as LensFilters["brand"]) ?? defaultFilters.brand,
    mount: params.get("mount") ?? defaultFilters.mount,
    focal: (params.get("focal") as LensFilters["focal"]) ?? defaultFilters.focal,
    type: (params.get("type") as LensFilters["type"]) ?? defaultFilters.type,
    aperture: (params.get("aperture") as LensFilters["aperture"]) ?? defaultFilters.aperture,
    price: (params.get("price") as LensFilters["price"]) ?? defaultFilters.price,
    weight: (params.get("weight") as LensFilters["weight"]) ?? defaultFilters.weight,
    use: (params.get("use") as LensFilters["use"]) ?? defaultFilters.use,
    body: params.get("body") ?? defaultFilters.body,
    sort: (params.get("sort") as LensFilters["sort"]) ?? defaultFilters.sort
  };
}

function firstFocal(focalLength: string) {
  return Number(focalLength.match(/\d+/)?.[0] ?? 0);
}

function apertureNumber(aperture: string) {
  return Number(aperture.match(/\d+(\.\d+)?/)?.[0] ?? 9);
}

function tasteLensTags(): LensTag[] {
  const score = readTasteScore();
  const top = Object.entries(score)
    .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
    .slice(0, 5)
    .map(([tag]) => tag);
  const mapped: LensTag[] = [];

  top.forEach((tag) => {
    if (tag === "portrait") mapped.push("portrait", "creamy_bokeh");
    if (tag === "travel") mapped.push("travel", "all_rounder");
    if (tag === "street" || tag === "documentary") mapped.push("street", "lightweight");
    if (tag === "cinematic" || tag === "filmic") mapped.push("cinematic");
    if (tag === "sharp" || tag === "clean") mapped.push("sharp");
    if (tag === "lowlight" || tag === "moody") mapped.push("lowlight");
    if (tag === "nature" || tag === "landscape") mapped.push("landscape");
  });

  return mapped.length ? mapped : ["travel", "all_rounder", "lightweight"];
}

export function LensExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<LensFilters>(() => fromParams(new URLSearchParams(searchParams.toString())));
  const [ready, setReady] = useState(false);
  const [desiredTags, setDesiredTags] = useState<LensTag[]>(["travel", "all_rounder", "lightweight"]);
  const selectedBody = useMemo(() => cameras.find((camera) => camera.id === filters.body), [filters.body]);

  useEffect(() => {
    setDesiredTags(tasteLensTags());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== defaultFilters[key as keyof LensFilters]) {
        params.set(key, value);
      }
    });
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [filters, pathname, ready, router]);

  function update<K extends keyof LensFilters>(key: K, value: LensFilters[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  const filtered = useMemo(() => {
    return lenses
      .filter((lens) => {
        const focal = firstFocal(lens.focalLength);
        const aperture = apertureNumber(lens.maxAperture);
        if (filters.brand !== "all" && lens.brand !== filters.brand) return false;
        if (filters.mount !== "all" && !lens.compatibleMounts.includes(filters.mount)) return false;
        if (selectedBody && !lens.compatibleMounts.includes(selectedBody.mount)) return false;
        if (filters.focal === "wide" && focal > 23) return false;
        if (filters.focal === "standard" && (focal < 24 || focal > 55)) return false;
        if (filters.focal === "tele" && focal < 56) return false;
        if (filters.type !== "all" && lens.lensType !== filters.type) return false;
        if (filters.aperture === "bright" && aperture > 1.8) return false;
        if (filters.aperture === "fastZoom" && (lens.lensType !== "zoom" || aperture > 2.8)) return false;
        if (filters.price === "under50" && lens.price > 500000) return false;
        if (filters.price === "50to100" && (lens.price < 500000 || lens.price > 1000000)) return false;
        if (filters.price === "over100" && lens.price < 1000000) return false;
        if (filters.weight === "under150" && lens.weight > 150) return false;
        if (filters.weight === "under350" && lens.weight > 350) return false;
        if (filters.weight === "over350" && lens.weight < 350) return false;
        if (filters.use !== "all" && !lens.tags.includes(filters.use)) return false;
        return true;
      })
      .map((lens) => ({
        lens,
        score:
          lens.tags.reduce((sum, tag) => sum + (desiredTags.includes(tag) ? 16 : 0), 45) +
          (lens.weight < 250 ? 5 : 0) +
          (lens.price < 700000 ? 4 : 0)
      }))
      .sort((a, b) => {
        if (filters.sort === "priceAsc") return a.lens.price - b.lens.price;
        if (filters.sort === "priceDesc") return b.lens.price - a.lens.price;
        if (filters.sort === "weightAsc") return a.lens.weight - b.lens.weight;
        return b.score - a.score;
      });
  }, [desiredTags, filters, selectedBody]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
        <SelectField label="브랜드" value={filters.brand} onChange={(event) => update("brand", event.target.value as LensFilters["brand"])}>
          <option value="all">전체</option>
          {Array.from(new Set(lenses.map((lens) => lens.brand))).map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </SelectField>
        <SelectField label="마운트" value={filters.mount} onChange={(event) => update("mount", event.target.value)}>
          <option value="all">전체</option>
          {Array.from(new Set(lenses.flatMap((lens) => lens.compatibleMounts))).map((mount) => (
            <option key={mount} value={mount}>
              {mount}
            </option>
          ))}
        </SelectField>
        <SelectField label="초점거리" value={filters.focal} onChange={(event) => update("focal", event.target.value as LensFilters["focal"])}>
          <option value="all">전체</option>
          <option value="wide">광각</option>
          <option value="standard">표준</option>
          <option value="tele">망원</option>
        </SelectField>
        <SelectField label="렌즈 타입" value={filters.type} onChange={(event) => update("type", event.target.value as LensFilters["type"])}>
          <option value="all">전체</option>
          <option value="prime">단렌즈</option>
          <option value="zoom">줌렌즈</option>
        </SelectField>
        <SelectField label="조리개" value={filters.aperture} onChange={(event) => update("aperture", event.target.value as LensFilters["aperture"])}>
          <option value="all">전체</option>
          <option value="bright">F1.8 이하 밝은 단렌즈</option>
          <option value="fastZoom">F2.8 줌</option>
        </SelectField>
        <SelectField label="가격대" value={filters.price} onChange={(event) => update("price", event.target.value as LensFilters["price"])}>
          <option value="all">전체</option>
          <option value="under50">50만원 이하</option>
          <option value="50to100">50~100만원</option>
          <option value="over100">100만원 이상</option>
        </SelectField>
        <SelectField label="무게" value={filters.weight} onChange={(event) => update("weight", event.target.value as LensFilters["weight"])}>
          <option value="all">전체</option>
          <option value="under150">150g 이하</option>
          <option value="under350">350g 이하</option>
          <option value="over350">350g 이상</option>
        </SelectField>
        <SelectField label="용도" value={filters.use} onChange={(event) => update("use", event.target.value as LensFilters["use"])}>
          <option value="all">전체</option>
          {(["portrait", "street", "travel", "landscape", "vlog", "cinematic", "lowlight"] as LensTag[]).map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </SelectField>
        <SelectField label="바디 호환성" value={filters.body} onChange={(event) => update("body", event.target.value)}>
          <option value="all">전체</option>
          {cameras
            .filter((camera) => camera.interchangeableLens)
            .map((camera) => (
              <option key={camera.id} value={camera.id}>
                {camera.brand} {camera.model}
              </option>
            ))}
        </SelectField>
        <SelectField label="정렬" value={filters.sort} onChange={(event) => update("sort", event.target.value as SortKey)}>
          <option value="match">취향 적합도 순</option>
          <option value="priceAsc">가격 낮은순</option>
          <option value="priceDesc">가격 높은순</option>
          <option value="weightAsc">무게 낮은순</option>
        </SelectField>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{filtered.length}개 렌즈가 조건에 맞습니다.</p>
        <button onClick={() => setFilters(defaultFilters)} className="rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium hover:border-ink">
          필터 초기화
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(({ lens }) => (
          <LensCard key={lens.id} lens={lens} />
        ))}
      </div>
    </div>
  );
}
