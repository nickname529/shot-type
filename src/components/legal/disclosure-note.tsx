import Link from "next/link";
import { legalNotices } from "@/lib/legal";

export function DisclosureNote({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-lg border border-line bg-paper p-3 text-xs leading-5 text-muted">
      <p className="font-semibold text-ink">투명성 고지</p>
      <p className="mt-1">{compact ? legalNotices.affiliateShort : legalNotices.affiliateLong}</p>
      {!compact ? (
        <p className="mt-1">
          {legalNotices.recommendationDisclaimer} 자세한 기준은 <Link href="/disclaimer" className="font-semibold text-ink underline">고지 페이지</Link>에서 확인할 수 있습니다.
        </p>
      ) : null}
    </div>
  );
}
