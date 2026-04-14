import { FavoritesClient } from "@/components/common/favorites-client";

export default function FavoritesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Favorites</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">찜한 후보와 저장한 결과입니다.</h1>
      <p className="mt-4 max-w-3xl leading-7 text-muted">
        마음에 드는 바디와 렌즈를 모아두고, 나중에 비교 페이지에서 다시 정리해보세요.
      </p>
      <div className="mt-8">
        <FavoritesClient />
      </div>
    </section>
  );
}
