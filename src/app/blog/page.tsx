"use client";

import { useState } from "react";
import Link from "next/link";
import { BLOG_POSTS, CATEGORIES } from "./data";
import type { BlogPost } from "./data";
import JsonLd from "../components/JsonLd";
import s from "../styles/pages/blog-listing.module.css";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className={s.card}>
      <div className={s.cardMeta}>
        <span className={s.categoryBadge}>{post.category}</span>
        <span className={s.cityTag}>📍 {post.city}</span>
        <span className={s.cardDate}>{formatDate(post.date)}</span>
      </div>
      <h2 className={s.cardTitle}>{post.title}</h2>
      <p className={s.cardExcerpt}>{post.excerpt}</p>
      <div className={s.cardFooter}>
        <span className={s.readTime}>{post.readTime} min read</span>
        <span className={s.readMore}>Read article →</span>
      </div>
    </Link>
  );
}

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Gator Engineered Technologies Blog",
  url: "https://gatorengineered.com/blog",
  description: "Web design, AI automation, marketing, and business tools — written for small businesses across Tampa Bay, Hernando County, and Florida.",
  publisher: {
    "@type": "Organization",
    name: "Gator Engineered Technologies",
    url: "https://gatorengineered.com",
  },
  blogPost: BLOG_POSTS.slice(0, 10).map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    url: `https://gatorengineered.com/blog/${p.slug}`,
    datePublished: p.date,
    description: p.metaDescription,
    keywords: p.tags.join(", "),
  })),
};

export default function BlogPage() {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === active);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={s.wrap}>
      <div className={s.backHomeWrap}>
        <Link href="/" className={s.backHome}>← Home</Link>
      </div>

      {/* Hero */}
      <section className={s.hero}>
        <span className={s.badge}>Insights &amp; Guides</span>
        <h1 className={s.heroTitle}>
          The Gator Engineered <span className={s.accent}>Blog</span>
        </h1>
        <p className={s.heroSub}>
          Web design, AI automation, marketing, and business tools — written for small businesses across Tampa Bay, Hernando County, and Florida.
        </p>
      </section>

      {/* Category filter */}
      <nav className={s.filterBar} aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`${s.filterBtn} ${active === cat ? s.active : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Post grid */}
      {sorted.length > 0 ? (
        <div className={s.grid}>
          {sorted.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className={s.empty}>No posts in this category yet.</p>
      )}

      <JsonLd data={blogSchema} />
    </div>
  );
}
