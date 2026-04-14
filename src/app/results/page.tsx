import { ResultsClient } from "@/components/results/results-client";

export default function ResultsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Recommendation Results</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">당신에게 가장 자연스러운 카메라 조합입니다.</h1>
      <p className="mt-4 max-w-3xl leading-7 text-muted">
        결과를 다시 만들 필요 없이 아래 조건을 수정하면 추천 점수가 즉시 바뀝니다.
      </p>
      <div className="mt-8">
        <ResultsClient />
      </div>
    </section>
  );
}
