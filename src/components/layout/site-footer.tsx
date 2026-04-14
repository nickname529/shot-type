import Link from "next/link";
import { legalNotices } from "@/lib/legal";

const legalLinks = [
  { href: "/privacy", label: "개인정보 처리방침" },
  { href: "/terms", label: "이용약관" },
  { href: "/disclaimer", label: "고지 및 책임 제한" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 text-sm text-muted sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-medium text-ink">ShotType</p>
          <nav className="flex flex-wrap gap-3">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-ink">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p>{legalNotices.affiliateShort}</p>
        <p>{legalNotices.recommendationDisclaimer}</p>
      </div>
    </footer>
  );
}
