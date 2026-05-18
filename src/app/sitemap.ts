import type { MetadataRoute } from "next";
import { SERVICE_AREAS } from "./service-areas/data";
import { BLOG_POSTS } from "./blog/data";
import { SERVICES } from "./services/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gatorengineered.com";

  const servicePageRoutes: MetadataRoute.Sitemap = SERVICES.map(svc => ({
    url: `${base}/services/${svc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const serviceAreaRoutes: MetadataRoute.Sitemap = SERVICE_AREAS.map(area => ({
    url: `${base}/service-areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: base,                         lastModified: new Date(), changeFrequency: "weekly",  priority: 1   },
    { url: `${base}/about`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`,               lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/faq`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,            lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/service-areas`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...servicePageRoutes,
    ...serviceAreaRoutes,
    ...blogRoutes,
  ];
}
