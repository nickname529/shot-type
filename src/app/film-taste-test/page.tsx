import { FilmTasteTestClient } from "@/components/film/film-taste-test-client";

export default function FilmTasteTestPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Film Look Test</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">원하는 필름 결과물을 골라주세요.</h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted">
        따뜻한 컬러, 거친 흑백, 네온 야간, 파스텔 여행처럼 결과물 취향을 고르면 필름스톡 추천이 달라집니다.
      </p>
      <div className="mt-8">
        <FilmTasteTestClient />
      </div>
    </section>
  );
}
