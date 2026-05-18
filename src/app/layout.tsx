// src/app/layout.tsx
import "./globals.css";
import Script from "next/script";
import { Share_Tech_Mono, Exo_2, Rajdhani } from "next/font/google";
import type { ReactNode, ReactElement } from "react";
import JsonLd from "./components/JsonLd";
import GoogleAnalytics from "./components/GoogleAnalytics";
import SmoothScroll from "./components/SmoothScroll";
import PillNavMount from "./components/PillNavMount";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-head",
  display: "swap",
});

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const metadata = {
  metadataBase: new URL("https://gatorengineered.com"),
  title: "Gator Engineered Technologies | Fractional CTO & AI Automation — St. Petersburg, FL",
  description:
    "Fractional technical leadership, AI automation, and web development for small and mid-size businesses. Based in St. Petersburg, FL. Serving clients remotely across the US.",
  alternates: {
    canonical: "https://gatorengineered.com",
  },
  robots: { index: true, follow: true },
  keywords: [
    "fractional CTO St. Petersburg FL",
    "technical product management Florida",
    "AI automation Tampa Bay",
    "blockchain integration Florida",
    "web development St. Petersburg FL",
    "technical SEO Florida",
    "fractional technical leadership",
    "AI automation small business",
    "Next.js developer Florida",
    "Supabase developer Florida",
    "web design Spring Hill FL",
    "web design New Port Richey FL",
    "web design Tampa FL",
    "web design Clearwater FL",
    "web design Sarasota FL",
    "SEO Hernando County",
    "SEO Pasco County",
    "SEO Pinellas County",
  ],
  openGraph: {
    title: "Gator Engineered Technologies | Fractional CTO & AI Automation",
    description:
      "Fractional technical leadership and AI automation for businesses that can't afford to get it wrong. Based in St. Petersburg, FL.",
    url: "https://gatorengineered.com",
    siteName: "Gator Engineered Technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Gator Engineered Technologies | Fractional CTO & AI Automation",
    description:
      "Fractional technical leadership and AI automation for businesses in St. Petersburg, FL and beyond.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }): ReactElement {

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Gator Engineered Technologies",
    url: "https://gatorengineered.com",
    email: "reva@gatorengineered.com",
    description:
      "Fractional CTO services, AI automation, technical product management, blockchain integration, QA, technical SEO, and web development for small and mid-size businesses.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "St. Petersburg",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "State", name: "Florida" },
      { "@type": "Country", name: "United States" },
      { "@type": "City", name: "St. Petersburg, FL" },
      { "@type": "City", name: "Tampa, FL" },
      { "@type": "City", name: "Clearwater, FL" },
      { "@type": "City", name: "Sarasota, FL" },
      { "@type": "City", name: "Spring Hill, FL" },
      { "@type": "City", name: "New Port Richey, FL" },
      { "@type": "City", name: "Port Richey, FL" },
      { "@type": "City", name: "Brooksville, FL" },
      { "@type": "City", name: "Lutz, FL" },
      { "@type": "City", name: "Tarpon Springs, FL" },
      { "@type": "City", name: "Orlando, FL" },
      { "@type": "City", name: "Fort Myers, FL" },
      { "@type": "AdministrativeArea", name: "Pinellas County, FL" },
      { "@type": "AdministrativeArea", name: "Hillsborough County, FL" },
      { "@type": "AdministrativeArea", name: "Hernando County, FL" },
      { "@type": "AdministrativeArea", name: "Pasco County, FL" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Technical Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fractional CTO" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical Product Management" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Blockchain Integration" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "QA & Product Testing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical SEO & Schema" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marketing & Outreach" } },
      ],
    },
    sameAs: [
      "https://www.facebook.com/people/Gator-Engineered-Technologies/61575072135764/",
      "https://x.com/GatorEngineered",
      "https://www.linkedin.com/company/gator-engineered-technologies/people/?viewAsMember=true",
    ],
  } as const;

  return (
    <html
      lang="en"
      className={`${shareTechMono.variable} ${exo2.variable} ${rajdhani.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://creattie.com" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M4FKSSRD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <SmoothScroll>
          <PillNavMount />
          <div id="main-content" tabIndex={-1} style={{ outline: "none" }}>
            {children}
          </div>
        </SmoothScroll>

        {/* site-wide JSON-LD */}
        <JsonLd data={localBusiness} />

        {/* Accessibility widget — fixed bottom-left on every page */}
        <AccessibilityWidget />

        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}

        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M4FKSSRD');`,
          }}
        />
      </body>
    </html>
  );
}
