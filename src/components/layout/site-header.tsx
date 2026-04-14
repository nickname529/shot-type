import Link from "next/link";

const navItems = [
  { href: "/quiz", label: "취향 설문" },
  { href: "/taste-test", label: "사진 테스트" },
  { href: "/results", label: "추천 결과" },
  { href: "/cameras", label: "바디 탐색" },
  { href: "/lenses", label: "렌즈 탐색" },
  { href: "/film-cameras", label: "필름카메라" },
  { href: "/films", label: "필름" },
  { href: "/film-taste-test", label: "필름 테스트" },
  { href: "/shops", label: "구매" },
  { href: "/labs", label: "현상소" },
  { href: "/compare", label: "비교" },
  { href: "/favorites", label: "찜" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-[0]">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-sm text-white">S</span>
          <span>ShotType</span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm text-muted lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 transition hover:bg-white hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/quiz" className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-accent">
          시작하기
        </Link>
      </div>
      <div className="flex gap-1 overflow-x-auto border-t border-line px-4 py-2 text-sm text-muted lg:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 rounded-lg bg-white px-3 py-2">
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
