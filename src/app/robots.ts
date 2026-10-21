import { MetadataRoute } from "next";
import { PRODUCTION_URL } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/search?q=", "/admin/"],
    },
    sitemap: [`${PRODUCTION_URL}/sitemap.xml`],
  };
}
