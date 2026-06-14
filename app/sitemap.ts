import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "daily" as const },
    { path: "/table", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/statistics", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/fixtures", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/teams", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/news", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/activities", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/rules", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ]

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path === "/" ? "" : route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
