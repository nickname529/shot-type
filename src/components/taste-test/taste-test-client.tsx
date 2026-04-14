"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/button";
import { TasteImageVisual } from "@/components/common/taste-image-visual";
import { tasteImages } from "@/lib/data";
import { saveTasteScore } from "@/lib/storage";
import { scoreTasteSelections } from "@/lib/recommendation/scoring";
import type { TasteImage } from "@/types";

const roundSize = 4;
const totalRounds = 6;

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function TasteTestClient() {
  const router = useRouter();
  const [pool, setPool] = useState(() => tasteImages.slice(0, totalRounds * roundSize));
  const [ready, setReady] = useState(false);
  const [round, setRound] = useState(0);
  const [rankMap, setRankMap] = useState<Record<string, number>>({});
  const [selections, setSelections] = useState<Array<{ image: TasteImage; rank: number }>>([]);

  const images = useMemo(() => pool.slice(round * roundSize, round * roundSize + roundSize), [pool, round]);
  const selectedCount = images.filter((item) => rankMap[item.id]).length;
  const isComplete = selectedCount === images.length;

  useEffect(() => {
    setPool(shuffle(tasteImages).slice(0, totalRounds * roundSize));
    setReady(true);
  }, []);

  function choose(image: TasteImage) {
    setRankMap((current) => {
      if (current[image.id]) {
        return Object.fromEntries(Object.entries(current).filter(([id]) => id !== image.id));
      }
      return { ...current, [image.id]: Object.keys(current).length + 1 };
    });
  }

  function nextRound() {
    const roundSelections = images.map((image) => ({ image, rank: rankMap[image.id] ?? roundSize }));
    const merged = [...selections, ...roundSelections];

    if (round + 1 >= totalRounds) {
      const score = scoreTasteSelections(merged.map((item) => ({ image: item.image, rank: item.rank })));
      saveTasteScore(score);
      router.push("/results");
      return;
    }

    setSelections(merged);
    setRankMap({});
    setRound((current) => current + 1);
  }

  if (!ready) {
    return (
      <div className="grid gap-4 rounded-lg border border-line bg-white p-6 text-sm text-muted shadow-soft">
        사진 취향 테스트를 준비하고 있습니다.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted">
            {round + 1} / {totalRounds} 라운드 · 끌리는 사진 순서대로 골라주세요.
          </p>
          <div className="mt-2 h-2 w-64 max-w-full overflow-hidden rounded-lg bg-mist">
            <div className="h-full rounded-lg bg-accent" style={{ width: `${((round + selectedCount / roundSize) / totalRounds) * 100}%` }} />
          </div>
        </div>
        <Button onClick={nextRound} disabled={!isComplete}>
          {round + 1 >= totalRounds ? "결과 보기" : "다음 라운드"}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image, index) => {
          const rank = rankMap[image.id];
          return (
            <button
              key={image.id}
              type="button"
              aria-label={`사진 선택 ${index + 1}`}
              onClick={() => choose(image)}
              className="focus-ring group overflow-hidden rounded-lg border border-line bg-white text-left shadow-soft transition hover:-translate-y-0.5 hover:border-ink"
            >
              <div className="relative">
                <TasteImageVisual image={image} />
                {rank ? <div className="absolute left-3 top-3 rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-white">{rank}위</div> : null}
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-sm leading-6 text-muted">
        선택에 영향을 줄 수 있는 제목, 키워드, 설명은 숨겼습니다. 내부 추천 엔진은 사진의 스타일 벡터와 숨겨진 촬영 프로필만 사용합니다.
      </p>
    </div>
  );
}
