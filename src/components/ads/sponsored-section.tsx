import { getSponsoredByPlacement } from "@/lib/monetization";
import type { AdPlacement } from "@/types";

export function SponsoredSection({ placement }: { placement: AdPlacement }) {
  const items = getSponsoredByPlacement(placement);
  if (!items.length) return null;

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-accent">스폰서 콘텐츠</p>
        <span className="rounded-lg border border-line px-2 py-1 text-xs text-muted">추천 순위와 무관</span>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <a key={item.id} href={item.url} target="_blank" rel="noreferrer sponsored" className="rounded-lg border border-line bg-paper p-4 transition hover:border-ink hover:bg-white">
            <span className="rounded-lg bg-ink px-2 py-1 text-xs font-semibold text-white">{item.label}</span>
            <p className="mt-3 text-xs font-semibold uppercase text-muted">{item.sponsorName}</p>
            <h3 className="mt-2 font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
