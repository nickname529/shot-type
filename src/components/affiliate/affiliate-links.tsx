import { DisclosureNote } from "@/components/legal/disclosure-note";
import { buildAffiliateLinks } from "@/lib/monetization";
import type { ShopLink } from "@/types";

type ProductCategory = "camera" | "lens" | "film";

const linkStyle =
  "focus-ring inline-flex items-center justify-center rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-ink hover:bg-paper";

export function AffiliateLinks({
  productId,
  productName,
  category,
  fallbackLinks,
  compact = false
}: {
  productId: string;
  productName: string;
  category: ProductCategory;
  fallbackLinks?: ShopLink[];
  compact?: boolean;
}) {
  const links = buildAffiliateLinks(productId, productName, category, fallbackLinks);
  if (!links.length) return null;

  return (
    <div className="grid gap-3">
      {!compact ? <DisclosureNote compact /> : null}
      <div className="flex flex-wrap gap-2">
        {links.slice(0, compact ? 2 : 4).map((link) => (
          <a key={`${link.vendorName}-${link.linkType}`} href={link.url} target="_blank" rel="noreferrer sponsored" className={linkStyle}>
            <span>{link.label ?? "구매하기"}</span>
            {!compact ? <span className="ml-2 text-xs font-medium text-muted">{link.vendorName}</span> : null}
          </a>
        ))}
      </div>
      {!compact ? (
        <p className="text-xs leading-5 text-muted">
          제휴 ID가 승인되어 환경변수에 설정된 판매처만 트래킹 링크로 전환됩니다. 제휴 수수료율은 추천 점수에 사용하지 않으며, 가격과 재고는 판매처에서 최종 확인해 주세요.
        </p>
      ) : null}
    </div>
  );
}
