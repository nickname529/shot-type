import { ButtonLink } from "@/components/common/button";
import { PrivacyConsentCheckbox } from "@/components/legal/privacy-consent-checkbox";
import { subscriptionPlans } from "@/lib/monetization";

export function SubscriptionUpsell() {
  const pro = subscriptionPlans.find((plan) => plan.highlighted) ?? subscriptionPlans[1];
  if (!pro) return null;

  return (
    <aside className="rounded-lg border border-ink bg-ink p-5 text-white shadow-soft">
      <p className="text-sm font-semibold text-white/70">Premium Analysis</p>
      <h2 className="mt-2 text-2xl font-semibold">더 정확한 추천 보기</h2>
      <p className="mt-3 text-sm leading-6 text-white/75">
        무료 추천은 그대로 유지하고, Pro에서는 취향 벡터의 세부 점수와 렌즈 조합, 프로 사진가 스타일 매칭, 추천 히스토리를 더 깊게 보여줍니다.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {pro.features.slice(0, 4).map((feature) => (
          <span key={feature} className="rounded-lg border border-white/15 px-3 py-1 text-xs text-white/80">
            {feature}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <PrivacyConsentCheckbox />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <p className="text-lg font-semibold">{pro.price.toLocaleString("ko-KR")}원 / 월</p>
        <ButtonLink href="/results#premium" variant="secondary" className="bg-white">
          Pro 기능 미리보기
        </ButtonLink>
      </div>
    </aside>
  );
}
