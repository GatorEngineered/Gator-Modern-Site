// app/faq/layout.tsx
export const metadata = {
    title: "FAQ | Gator Engineered Technologies — Spring Hill, FL",
    description:
        "Frequently asked questions about web design, AI chatbots, crypto payments, and our services in Spring Hill, Brooksville, Dade City, Port Richey, New Port Richey, and across Hernando & Pasco County, FL.",
    keywords: [
        "web design FAQ",
        "AI chatbot questions",
        "crypto website FAQ",
        "Spring Hill FL web design FAQ",
        "Hernando County web developer FAQ",
    ],
    openGraph: {
        title: "FAQ | Gator Engineered Technologies — Spring Hill, FL",
        description:
            "Frequently asked questions about our web design, AI, and crypto services.",
        type: "website",
        url: "/faq",
    },
    twitter: {
        card: "summary_large_image",
        title: "FAQ | Gator Engineered Technologies",
        description:
            "Answers to common questions about web design, AI chatbots, and crypto payments.",
    },
    alternates: { canonical: "/faq" },
    robots: { index: true, follow: true },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
