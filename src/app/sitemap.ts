import type { MetadataRoute } from "next";
import { SERVICE_AREAS } from "./service-areas/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gatorengineered.com";

  const serviceAreaRoutes: MetadataRoute.Sitemap = SERVICE_AREAS.map((area) => ({
    url: `${base}/service-areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/web`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ai`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/crypto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/marketing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/service-areas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...serviceAreaRoutes,
  ];
}
