import { LabsClient } from "@/components/lab/labs-client";
import { legalNotices } from "@/lib/legal";

export default function LabsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Film Labs</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">이 필름을 어디에 맡기면 좋을까요?</h1>
      <p className="mt-4 max-w-3xl leading-7 text-muted">
        현재는 mock 지역 선택 기반입니다. 필름 종류, 가격대, 스캔 품질 태그를 함께 계산합니다.
      </p>
      <div className="mt-5 rounded-lg border border-line bg-white p-4 text-sm leading-6 text-muted shadow-soft">
        {legalNotices.locationPrivacy}
      </div>
      <div className="mt-8">
        <LabsClient />
      </div>
    </section>
  );
}
