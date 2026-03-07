// app/blog/layout.tsx
export const metadata = {
    title: "Blog | Gator Engineered Technologies",
    description:
        "Tips, tutorials, and insights on web design, AI, crypto payments, and digital marketing for small businesses in Florida.",
    keywords: [
        "web design blog",
        "AI chatbot tips",
        "small business website blog",
        "Florida web development",
        "Spring Hill FL tech blog",
    ],
    openGraph: {
        title: "Blog | Gator Engineered Technologies",
        description:
            "Tips, tutorials, and insights on web design, AI, crypto payments, and digital marketing for small businesses in Florida.",
        type: "website",
        url: "/blog",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog | Gator Engineered Technologies",
        description:
            "Web design, AI, and digital marketing insights for small businesses.",
    },
    alternates: { canonical: "/blog" },
    robots: { index: true, follow: true },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
