import { FilmTasteTestClient } from "@/components/film/film-taste-test-client";

export default function FilmTasteTestPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Film Match</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">나에게 맞는 필름을 찾아볼게요.</h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted">
        설명과 키워드는 숨기고 이미지만 보여드립니다. 끌리는 결과물을 고르면 색감, 입자감, 대비, 숨겨진 촬영 프로필을 바탕으로 필름을 추천합니다.
      </p>
      <div className="mt-8">
        <FilmTasteTestClient />
      </div>
    </section>
  );
}
