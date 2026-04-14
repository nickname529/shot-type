import { AdSlot } from "@/components/ads/ad-slot";
import { FilmCameraExplorer } from "@/components/film/film-camera-explorer";

export default function FilmCamerasPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">Film Cameras</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">필름카메라를 취향으로 탐색하세요.</h1>
      <p className="mt-4 max-w-3xl leading-7 text-muted">
        조작 난이도와 유지 난이도, 필름 포맷까지 함께 보며 현실적인 후보를 좁힙니다.
      </p>
      <div className="mt-8">
        <FilmCameraExplorer />
      </div>
      <div className="mt-10">
        <AdSlot placement="explorer-bottom" />
      </div>
    </section>
  );
}
