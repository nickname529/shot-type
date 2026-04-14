import { QuizForm } from "@/components/quiz/quiz-form";

export default function QuizPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Preference Quiz</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">먼저 촬영 조건을 알려주세요.</h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted">
        예산과 목적을 먼저 잡아두면 사진 취향 테스트 결과가 더 현실적인 추천으로 이어집니다.
      </p>
      <div className="mt-8">
        <QuizForm />
      </div>
    </section>
  );
}
