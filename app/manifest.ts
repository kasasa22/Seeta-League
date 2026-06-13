import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/seo"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#16a34a",
    icons: [
      {
        src: siteConfig.logo,
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  }
}
