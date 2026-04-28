// app/about/layout.tsx
export const metadata = {
  title: "About | Gator Engineered Technologies — Spring Hill, FL",
  description:
    "Meet Gator Engineered Technologies — a web design and AI agency based in Spring Hill, FL serving Hernando County, Pasco County, New Port Richey, Port Richey, Lutz, Weeki Wachee, and surrounding areas.",
  keywords: [
    "web agency Spring Hill FL",
    "about Gator Engineered",
    "web design Hernando County",
    "tech company Pasco County",
    "Brooksville web developer",
    "Dade City web design",
    "web design Lutz FL",
    "web design Weeki Wachee FL",
    "web design New Port Richey FL",
    "web design Port Richey FL",
  ],
  openGraph: {
    title: "About | Gator Engineered Technologies — Spring Hill, FL",
    description:
      "Meet Gator Engineered Technologies — a web design and AI agency based in Spring Hill, FL serving Hernando County, Pasco County, New Port Richey, Port Richey, Lutz, Weeki Wachee, and surrounding areas.",
    type: "website",
    url: "https://gatorengineered.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Gator Engineered Technologies — Spring Hill, FL",
    description:
      "Meet Gator Engineered Technologies — a web design and AI agency based in Spring Hill, FL serving Hernando County, Pasco County, and surrounding areas.",
  },
  alternates: {
    canonical: "https://gatorengineered.com/about",
  },
  robots: { index: true, follow: true },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Keep it simple—let the page handle UI/state if needed
  return <>{children}</>;
}
