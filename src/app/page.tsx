import { ButtonLink } from "@/components/common/button";
import { Tag } from "@/components/common/tag";

const steps = [
  {
    title: "촬영 성향 먼저 정리",
    text: "여행, 일상, 인물, 영상, 예산, 무게 같은 조건을 짧게 고르면 기본 추천 방향이 잡힙니다."
  },
  {
    title: "좋아하는 사진 톤 분석",
    text: "말로 설명하기 어려운 색감과 분위기는 사진 선택으로 읽습니다. 따뜻함, 선명함, 필름감 같은 취향을 점수화합니다."
  },
  {
    title: "바디와 렌즈까지 한 번에",
    text: "카메라만 던져주지 않고, 왜 맞는지와 어떤 렌즈로 시작하면 좋은지까지 같이 보여줍니다."
  }
];

const highlights = [
  "디지털 카메라",
  "필름카메라",
  "렌즈와 필름",
  "구매와 현상소"
];

export default function HomePage() {
  return (
    <div>
      <section className="relative min-h-[72svh] overflow-hidden bg-ink text-white">
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=85"
          alt="카메라와 렌즈가 놓인 어두운 책상"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/56 to-black/22" />
        <div className="relative mx-auto flex min-h-[72svh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Tag className="border-white/20 bg-white/10 text-white">취향 기반 카메라 매칭</Tag>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
              스펙 말고, 내가 찍고 싶은 사진으로 고르세요.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
              ShotType은 사진 취향, 예산, 촬영 목적, 휴대성, 렌즈 교환 여부를 함께 분석해 바디, 렌즈, 필름까지 자연스럽게 이어지는 조합을 추천합니다.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink
                href="/quiz"
                variant="hero"
                className="min-h-14 px-7 py-4 text-base font-semibold"
              >
                나에게 맞는 카메라 찾기
              </ButtonLink>
              <ButtonLink href="/cameras" variant="secondary" className="min-h-12 border-white/35 bg-white/10 px-5 py-3 text-white hover:bg-white hover:text-ink">
                카메라 탐색
              </ButtonLink>
              <ButtonLink href="/film-taste-test" variant="secondary" className="min-h-12 border-white/35 bg-white/10 px-5 py-3 text-white hover:bg-white hover:text-ink">
                나에게 맞는 필름 찾기
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-white/65">
              3분이면 충분합니다. 추천 이유와 주의할 점까지 같이 정리해드릴게요.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold text-accent">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">취향을 점수로 바꾸고, 설명은 사람 말로 풀어줍니다.</h2>
          <p className="mt-4 leading-7 text-muted">
            결과는 단순 인기순이 아닙니다. 사용자의 조건과 사진 취향을 분리해 계산하고, 추천과 광고를 구분해서 보여줍니다.
          </p>
        </div>
        <div className="grid gap-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-lg border border-line bg-white p-5 shadow-soft">
              <p className="text-sm font-semibold text-accent">0{index + 1}</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {highlights.map((item) => (
            <div key={item} className="rounded-lg border border-line p-4">
              <p className="text-sm font-semibold text-ink">{item}</p>
              <p className="mt-2 text-sm leading-6 text-muted">취향에서 시작해 장비, 필름, 구매, 현상 흐름까지 이어서 볼 수 있습니다.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
