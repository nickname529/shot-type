import type { ShopLink } from "@/types";

const typeLabels: Record<ShopLink["type"], string> = {
  new: "신품",
  used: "중고",
  film: "필름"
};

export function ShopLinks({ links, compact = false }: { links?: ShopLink[]; compact?: boolean }) {
  if (!links?.length) return null;

  return (
    <div className="grid gap-2">
      {!compact ? <p className="text-sm font-semibold text-ink">구매 연결</p> : null}
      <div className="grid gap-2">
        {links.slice(0, compact ? 2 : 4).map((link) => (
          <a
            key={`${link.name}-${link.type}`}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-line bg-paper p-3 text-sm transition hover:border-ink hover:bg-white"
          >
            <span className="flex items-center justify-between gap-3">
              <span className="font-semibold text-ink">{link.name}</span>
              <span className="shrink-0 text-xs text-accent">{typeLabels[link.type]} · {link.region}</span>
            </span>
            {!compact ? (
              <span className="mt-1 block text-xs leading-5 text-muted">
                {link.priceHint} · {link.availabilityHint ?? "검색 결과 확인"} · {link.shippingHint ?? "배송 조건 확인"}
                <br />
                {link.trustSignal ? `${link.trustSignal} · ` : ""}{link.note}
              </span>
            ) : null}
          </a>
        ))}
      </div>
    </div>
  );
}
