import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import { BLOG_POSTS, getPostBySlug, getRelatedPosts } from "../data";
import s from "../../styles/pages/blog-post.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.tags,
    alternates: {
      canonical: `https://gatorengineered.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://gatorengineered.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Gator Engineered Technologies",
      url: "https://gatorengineered.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Gator Engineered Technologies",
      url: "https://gatorengineered.com",
    },
    url: `https://gatorengineered.com/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gatorengineered.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://gatorengineered.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://gatorengineered.com/blog/${post.slug}` },
    ],
  };

  return (
    <div className={s.wrap}>
      <div className={s.backWrap}>
        <Link href="/blog" className={s.back}>← All Articles</Link>
      </div>

      {/* Header */}
      <header className={s.header}>
        <div className={s.metaRow}>
          <span className={s.category}>{post.category}</span>
          <span className={s.city}>📍 {post.city}</span>
          <span className={s.readTime}>{post.readTime} min read</span>
          <time className={s.date} dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h1 className={s.title}>{post.title}</h1>
        <p className={s.excerpt}>{post.excerpt}</p>
      </header>

      {/* Body */}
      <article
        className={s.body}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      <div className={s.tags}>
        <span className={s.tagsLabel}>Tags:</span>
        {post.tags.map((tag) => (
          <span key={tag} className={s.tag}>{tag}</span>
        ))}
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className={s.related}>
          <h2 className={s.relatedTitle}>Related Articles</h2>
          <div className={s.relatedGrid}>
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className={s.relatedCard}>
                <p className={s.relatedCategory}>{r.category}</p>
                <p className={s.relatedPostTitle}>{r.title}</p>
                <p className={s.relatedMeta}>{formatDate(r.date)} · {r.readTime} min</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className={s.cta}>
        <h2 className={s.ctaTitle}>Ready to grow your Florida business?</h2>
        <p className={s.ctaBody}>
          We build fast websites, AI chatbots, and marketing systems for small businesses across Tampa Bay and Hernando County. Let&apos;s talk.
        </p>
        <Link href="/contact" className={s.ctaBtn}>Get a Free Quote</Link>
      </section>

      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumb} />
    </div>
  );
}
