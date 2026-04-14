import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const routes = [
  "",
  "/quiz",
  "/taste-test",
  "/film-taste-test",
  "/results",
  "/cameras",
  "/lenses",
  "/film-cameras",
  "/films",
  "/shops",
  "/labs",
  "/compare",
  "/favorites",
  "/privacy",
  "/terms",
  "/disclaimer"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
