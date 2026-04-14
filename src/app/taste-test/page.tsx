import { TasteTestClient } from "@/components/taste-test/taste-test-client";

export default function TasteTestPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Image Taste Test</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">좋아하는 사진의 결을 골라주세요.</h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted">
        사진마다 숨겨진 태그가 있고, 선택 순위가 높을수록 해당 스타일 점수가 더 크게 반영됩니다.
      </p>
      <div className="mt-8">
        <TasteTestClient />
      </div>
    </section>
  );
}
