import { Suspense } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { CameraExplorer } from "@/components/camera/camera-explorer";

export default function CamerasPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Camera Explorer</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">카메라 바디를 직접 탐색하세요.</h1>
      <p className="mt-4 max-w-3xl leading-7 text-muted">
        필터는 URL에 저장됩니다. 설문과 사진 테스트를 먼저 해두면 취향 적합도 순 정렬이 더 똑똑해집니다.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted">카메라 목록을 준비하고 있습니다.</p>}>
          <CameraExplorer />
        </Suspense>
      </div>
      <div className="mt-10">
        <AdSlot placement="explorer-bottom" />
      </div>
    </section>
  );
}
