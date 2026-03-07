// app/contact/layout.tsx
export const metadata = {
    title: "Contact | Gator Engineered Technologies — Spring Hill, FL",
    description:
        "Get a free quote for web design, AI chatbots, or crypto-ready websites. Serving Spring Hill, Brooksville, Dade City, Port Richey, New Port Richey, and all of Hernando & Pasco County, FL.",
    keywords: [
        "contact web designer Spring Hill FL",
        "free quote website Hernando County",
        "web design quote Pasco County",
        "Brooksville web developer contact",
    ],
    openGraph: {
        title: "Contact | Gator Engineered Technologies — Spring Hill, FL",
        description:
            "Get a free quote for web design, AI chatbots, or crypto-ready websites. Serving Spring Hill, Brooksville, Dade City, Port Richey, New Port Richey, and all of Hernando & Pasco County, FL.",
        type: "website",
        url: "/contact",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact | Gator Engineered Technologies — Spring Hill, FL",
        description:
            "Start a project, ask a question, or request a quote. Serving Hernando & Pasco County, FL.",
    },
    alternates: {
        canonical: "/contact",
    },
    robots: { index: true, follow: true },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
