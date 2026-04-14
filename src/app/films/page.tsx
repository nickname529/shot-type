import { AdSlot } from "@/components/ads/ad-slot";
import { FilmExplorer } from "@/components/film/film-explorer";
import { ButtonLink } from "@/components/common/button";

export default function FilmsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Film Stocks</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">취향에 맞는 필름을 고르세요.</h1>
      <p className="mt-4 max-w-3xl leading-7 text-muted">
        필름 추천은 색감, 입자, 대비, 야간 성향을 사진 취향 벡터와 비교해 계산합니다.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href="/film-taste-test">필름 사진 고르기로 추천받기</ButtonLink>
        <ButtonLink href="/labs" variant="secondary">현상소 추천 보기</ButtonLink>
      </div>
      <div className="mt-8">
        <FilmExplorer />
      </div>
      <div className="mt-10">
        <AdSlot placement="explorer-bottom" />
      </div>
    </section>
  );
}
