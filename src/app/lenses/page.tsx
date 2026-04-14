import { Suspense } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { LensExplorer } from "@/components/lens/lens-explorer";

export default function LensesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Lens Explorer</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">렌즈 조합을 찾아보세요.</h1>
      <p className="mt-4 max-w-3xl leading-7 text-muted">
        마운트, 초점거리, 조리개, 용도, 바디 호환성을 기준으로 렌즈를 좁힐 수 있습니다.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted">렌즈 목록을 준비하고 있습니다.</p>}>
          <LensExplorer />
        </Suspense>
      </div>
      <div className="mt-10">
        <AdSlot placement="explorer-bottom" />
      </div>
    </section>
  );
}
