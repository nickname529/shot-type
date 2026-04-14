import { CompareClient } from "@/components/common/compare-client";

export default function ComparePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Compare</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">바디와 렌즈를 나란히 비교하세요.</h1>
      <p className="mt-4 max-w-3xl leading-7 text-muted">
        탐색 페이지에서 비교 담기를 누른 바디가 자동으로 들어옵니다. 렌즈는 용도와 무게, 가격을 함께 보세요.
      </p>
      <div className="mt-8">
        <CompareClient />
      </div>
    </section>
  );
}
