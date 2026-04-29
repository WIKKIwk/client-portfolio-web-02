import type { MetadataRoute } from "next";
import { siteDescription, siteName } from "@/lib/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Qadoqdizayn",
    description: siteDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    categories: ["business", "design", "portfolio"],
    lang: "uz",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
