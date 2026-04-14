"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/button";
import { TasteImageVisual } from "@/components/common/taste-image-visual";
import { filmTasteImages } from "@/lib/data";
import { scoreTasteSelections } from "@/lib/recommendation/scoring";
import { saveFilmTasteScore } from "@/lib/storage";
import type { TasteImage } from "@/types";

const roundSize = 4;
const totalRounds = 5;

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function FilmTasteTestClient() {
  const router = useRouter();
  const [pool, setPool] = useState(() => filmTasteImages.slice(0, totalRounds * roundSize));
  const [ready, setReady] = useState(false);
  const [round, setRound] = useState(0);
  const [rankMap, setRankMap] = useState<Record<string, number>>({});
  const [selections, setSelections] = useState<Array<{ image: TasteImage; rank: number }>>([]);

  const images = useMemo(() => pool.slice(round * roundSize, round * roundSize + roundSize), [pool, round]);
  const selectedCount = images.filter((image) => rankMap[image.id]).length;
  const isComplete = selectedCount === images.length;

  useEffect(() => {
    setPool(shuffle(filmTasteImages).slice(0, totalRounds * roundSize));
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
      saveFilmTasteScore(scoreTasteSelections(merged.map((item) => ({ image: item.image, rank: item.rank }))));
      router.push("/films");
      return;
    }

    setSelections(merged);
    setRankMap({});
    setRound((current) => current + 1);
  }

  if (!ready) {
    return (
      <div className="grid gap-4 rounded-lg border border-line bg-white p-6 text-sm text-muted shadow-soft">
        필름 룩 테스트를 준비하고 있습니다.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted">
            {round + 1} / {totalRounds} 라운드 · 끌리는 결과물 순서대로 골라주세요.
          </p>
          <div className="mt-2 h-2 w-64 max-w-full overflow-hidden rounded-lg bg-mist">
            <div className="h-full rounded-lg bg-accent" style={{ width: `${((round + selectedCount / roundSize) / totalRounds) * 100}%` }} />
          </div>
        </div>
        <Button onClick={nextRound} disabled={!isComplete}>
          {round + 1 >= totalRounds ? "필름 추천 보기" : "다음 필름 룩"}
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
        화면에는 힌트를 숨겼습니다. 내부적으로만 사진의 색감, 입자감, 대비, 숨겨진 카메라/필름 촬영 프로필을 점수화해서 필름 추천에 반영합니다.
      </p>
    </div>
  );
}
