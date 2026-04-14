import { getAdsByPlacement } from "@/lib/monetization";
import type { AdPlacement } from "@/types";

export function AdSlot({ placement }: { placement: AdPlacement }) {
  const ads = getAdsByPlacement(placement);
  if (!ads.length) return null;

  return (
    <aside className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-accent">광고</p>
        <span className="rounded-lg border border-line px-2 py-1 text-xs text-muted">추천 알고리즘과 분리</span>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {ads.map((ad) => (
          <a key={ad.id} href={ad.url} target="_blank" rel="noreferrer sponsored" className="rounded-lg border border-line bg-paper p-4 transition hover:border-ink hover:bg-white">
            <p className="text-xs font-semibold uppercase text-muted">{ad.advertiserName}</p>
            <h3 className="mt-2 font-semibold text-ink">{ad.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{ad.description}</p>
          </a>
        ))}
      </div>
    </aside>
  );
}
