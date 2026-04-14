import { ButtonLink } from "@/components/common/button";
import { Tag } from "@/components/common/tag";

const steps = [
  {
    title: "설문으로 촬영 습관 파악",
    text: "목적, 예산, 휴대성, 렌즈 교환 의향을 먼저 정리합니다."
  },
  {
    title: "사진 선택으로 색감 취향 분석",
    text: "좋아하는 사진을 고르면 따뜻함, 필름풍, 선명함 같은 취향 점수가 쌓입니다."
  },
  {
    title: "바디와 렌즈 조합 추천",
    text: "점수 기반 매칭으로 가격대별 후보와 추천 이유를 보여줍니다."
  }
];

export default function HomePage() {
  return (
    <div>
      <section className="relative min-h-[72svh] overflow-hidden bg-ink text-white">
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=85"
          alt="카메라를 들고 빛을 바라보는 장면"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.54]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/45 to-black/20" />
        <div className="relative mx-auto flex min-h-[72svh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Tag className="border-white/20 bg-white/10 text-white">취향 기반 카메라 상담</Tag>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
              스펙표보다 먼저, 당신이 좋아하는 사진을 봅니다.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
              ShotType은 사진 취향, 예산, 촬영 목적, 휴대성, 렌즈 교환 여부를 함께 분석해 바디와 렌즈 조합을 추천합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/quiz" className="bg-white text-ink hover:bg-accent hover:text-white">
                나에게 맞는 카메라 찾기
              </ButtonLink>
              <ButtonLink href="/cameras" variant="secondary" className="border-white/35 bg-white/10 text-white hover:bg-white hover:text-ink">
                직접 카메라 탐색하기
              </ButtonLink>
              <ButtonLink href="/films" variant="secondary" className="border-white/35 bg-white/10 text-white hover:bg-white hover:text-ink">
                필름까지 추천받기
              </ButtonLink>
              <ButtonLink href="/film-taste-test" variant="secondary" className="border-white/35 bg-white/10 text-white hover:bg-white hover:text-ink">
                필름 사진 고르기
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold text-accent">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">취향을 점수로 바꾸고, 설명은 사람 말로 풀어냅니다.</h2>
          <p className="mt-4 leading-7 text-muted">
            추천 결과는 단순 목록이 아니라 왜 어울리는지, 어떤 렌즈와 시작하면 좋은지, 구매 전에 무엇을 조심해야 하는지까지 함께 정리합니다.
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
          {["디지털 카메라", "필름카메라", "렌즈와 필름", "구매와 현상소"].map((item) => (
            <div key={item} className="rounded-lg border border-line p-4">
              <p className="text-sm font-semibold text-ink">{item}</p>
              <p className="mt-2 text-sm text-muted">사진 취향에서 시작해 찍기, 장비, 필름, 현상 흐름까지 이어집니다.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
