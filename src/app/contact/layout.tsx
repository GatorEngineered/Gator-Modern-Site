// app/contact/layout.tsx
export const metadata = {
    title: "Contact | Gator Engineered Technologies — Spring Hill, FL",
    description:
        "Get a free quote for web design, AI chatbots, or crypto-ready websites. Serving Spring Hill, New Port Richey, Port Richey, Lutz, Weeki Wachee, Brooksville, and all of Hernando & Pasco County, FL.",
    keywords: [
        "contact web designer Spring Hill FL",
        "free quote website Hernando County",
        "web design quote Pasco County",
        "Brooksville web developer contact",
        "web design quote New Port Richey FL",
        "web design quote Port Richey FL",
        "website quote Lutz FL",
        "web design quote Weeki Wachee FL",
    ],
    openGraph: {
        title: "Contact | Gator Engineered Technologies — Spring Hill, FL",
        description:
            "Get a free quote for web design, AI chatbots, or crypto-ready websites. Serving Spring Hill, New Port Richey, Port Richey, Lutz, Weeki Wachee, and all of Hernando & Pasco County, FL.",
        type: "website",
        url: "https://gatorengineered.com/contact",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact | Gator Engineered Technologies — Spring Hill, FL",
        description:
            "Start a project, ask a question, or request a quote. Serving Hernando & Pasco County, FL.",
    },
    alternates: {
        canonical: "https://gatorengineered.com/contact",
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
