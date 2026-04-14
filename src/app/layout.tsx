import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ShotType - 취향 기반 카메라 추천",
    template: "%s | ShotType"
  },
  description: "사진 취향, 예산, 사용 목적을 분석해 카메라 바디, 렌즈, 필름, 현상소까지 추천하는 취향 기반 플랫폼입니다.",
  openGraph: {
    title: "ShotType - 취향 기반 카메라 추천",
    description: "사진 취향 기반으로 카메라, 렌즈, 필름, 현상소를 추천합니다.",
    url: siteUrl,
    siteName: "ShotType",
    locale: "ko_KR",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
