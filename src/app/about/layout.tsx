// app/about/layout.tsx
export const metadata = {
  title: "About | Gator Engineered Technologies — Spring Hill, FL",
  description:
    "Meet Gator Engineered Technologies — a web design and AI agency based in Spring Hill, FL serving Hernando County, Pasco County, Brooksville, Dade City, Port Richey, and New Port Richey.",
  keywords: [
    "web agency Spring Hill FL",
    "about Gator Engineered",
    "web design Hernando County",
    "tech company Pasco County",
    "Brooksville web developer",
    "Dade City web design",
  ],
  openGraph: {
    title: "About | Gator Engineered Technologies — Spring Hill, FL",
    description:
      "Meet Gator Engineered Technologies — a web design and AI agency based in Spring Hill, FL serving Hernando County, Pasco County, and surrounding areas.",
    type: "website",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Gator Engineered Technologies — Spring Hill, FL",
    description:
      "Meet Gator Engineered Technologies — a web design and AI agency based in Spring Hill, FL serving Hernando County, Pasco County, and surrounding areas.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Keep it simple—let the page handle UI/state if needed
  return <>{children}</>;
}
