// app/about/layout.tsx
export const metadata = {
  title: "About | Gator Engineered Technologies",
  description:
    "Who we are, what we build, and why we’re on a mission to craft future-ready web experiences.",
  openGraph: {
    title: "About | Gator Engineered Technologies",
    description:
      "Who we are, what we build, and why we’re on a mission to craft future-ready web experiences.",
    type: "website",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Gator Engineered Technologies",
    description:
      "Who we are, what we build, and why we’re on a mission to craft future-ready web experiences.",
  },
  alternates: {
    canonical: "/about",
  },
  // optional: keywords: ["web3", "react", "gsap", "three.js", "agency", "about"],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Keep it simple—let the page handle UI/state if needed
  return <>{children}</>;
}
