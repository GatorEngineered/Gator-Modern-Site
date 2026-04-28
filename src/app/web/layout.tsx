// app/web/layout.tsx
export const metadata = {
    title: "Web Design & Development | Gator Engineered — Spring Hill, FL",
    description:
        "Custom websites built with React & Next.js for businesses in Spring Hill, Brooksville, Dade City, Port Richey, New Port Richey, and across Hernando & Pasco County, FL.",
    keywords: [
        "web design Spring Hill FL",
        "web design New Port Richey FL",
        "web design Port Richey FL",
        "web design Lutz FL",
        "web design Weeki Wachee FL",
        "web development Hernando County",
        "custom website Pasco County",
        "React Next.js developer Florida",
        "website design Brooksville FL",
        "website design Dade City FL",
        "web developer Port Richey FL",
        "web developer New Port Richey FL",
    ],
    openGraph: {
        title: "Web Design & Development | Gator Engineered — Spring Hill, FL",
        description:
            "Custom websites built with React & Next.js for businesses in Spring Hill, New Port Richey, Port Richey, Lutz, Weeki Wachee, and across Hernando & Pasco County, FL.",
        type: "website",
        url: "https://gatorengineered.com/web",
    },
    twitter: {
        card: "summary_large_image",
        title: "Web Design & Development | Gator Engineered — Spring Hill, FL",
        description:
            "Custom websites built with React & Next.js for businesses in Hernando & Pasco County, FL.",
    },
    alternates: { canonical: "https://gatorengineered.com/web" },
    robots: { index: true, follow: true },
};

export default function WebLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
