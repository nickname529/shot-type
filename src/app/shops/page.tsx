import { AdSlot } from "@/components/ads/ad-slot";
import { ShopsClient } from "@/components/shop/shops-client";

export default function ShopsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Shops</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">추천 결과를 구매 가능한 검색으로 연결합니다.</h1>
      <p className="mt-4 max-w-3xl leading-7 text-muted">
        신품, 중고, 필름 전문샵 링크를 분리해 가격 비교와 매물 확인 흐름을 빠르게 만듭니다.
      </p>
      <div className="mt-8">
        <ShopsClient />
      </div>
      <div className="mt-10">
        <AdSlot placement="shops-bottom" />
      </div>
    </section>
  );
}
