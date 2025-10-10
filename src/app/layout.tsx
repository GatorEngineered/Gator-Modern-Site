// src/app/layout.tsx
import "./globals.css";
import Script from "next/script";
import type { ReactNode, ReactElement } from "react";
import PillNavMount from "./components/PillNavMount";
import SmoothScroll from "./components/SmoothScroll";
import JsonLd from "./components/JsonLd";

export const metadata = {
  title: "Gator Engineered Technologies",
  description:
    "We build fast, modern websites with AI chatbots and crypto payments—powered by React/Next.js and ready for Web3. Serving businesses across Florida with blockchain-ready builds and growth-focused AEO.",
};


// You can keep this inside or move it above the component; either is fine.
export default function RootLayout({ children }: { children: ReactNode }): ReactElement {

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Gator Engineered Technologies",
    url: "https://gatorengineered.com",
   description:
    "We build fast, modern websites with AI chatbots and crypto payments—powered by React/Next.js and ready for Web3. Serving businesses across Florida with blockchain-ready builds and growth-focused AEO.",
  areaServed: [
    { "@type": "State", name: "Florida" },
   // Primary counties (Tampa Bay + nearby)
    { "@type": "AdministrativeArea", name: "Pasco County, FL" },
    { "@type": "AdministrativeArea", name: "Pinellas County, FL" },
    { "@type": "AdministrativeArea", name: "Hillsborough County, FL" },
    { "@type": "AdministrativeArea", name: "Hernando County, FL" },
    { "@type": "AdministrativeArea", name: "Polk County, FL" },
    { "@type": "AdministrativeArea", name: "Palm Beach County, FL" },
    { "@type": "AdministrativeArea", name: "Manatee County, FL" },
    { "@type": "AdministrativeArea", name: "Sarasota County, FL" },
    { "@type": "AdministrativeArea", name: "Polk County, FL" },

    // Other popular counties (optional—trim if you want fewer)
    { "@type": "AdministrativeArea", name: "Sarasota County, FL" },
    { "@type": "AdministrativeArea", name: "Manatee County, FL" },
    { "@type": "AdministrativeArea", name: "Lee County, FL" },
    { "@type": "AdministrativeArea", name: "Orange County, FL" },
    { "@type": "AdministrativeArea", name: "Miami-Dade County, FL" },
    { "@type": "AdministrativeArea", name: "Broward County, FL" },
    { "@type": "AdministrativeArea", name: "Hillsborough County, FL" },
    { "@type": "AdministrativeArea", name: "Pasco County, FL" },
    { "@type": "AdministrativeArea", name: "Hernando County, FL" },

    // Key cities (pick your top 4–8)
    { "@type": "City", name: "Tampa, FL" },
    { "@type": "City", name: "St. Petersburg, FL" },
    { "@type": "City", name: "Clearwater, FL" },
    { "@type": "City", name: "Trinity, FL" },
    { "@type": "City", name: "Tarpon Springs, FL" },
    { "@type": "City", name: "Orlando, FL" },
    { "@type": "City", name: "Tallahassee, FL" },
    { "@type": "City", name: "Miami, FL" },
    { "@type": "City", name: "Jacksonville, FL" }
  ],
    sameAs: [
      "https://www.facebook.com/people/Gator-Engineered-Technologies/61575072135764/",
      "https://x.com/GatorEngineered",
      "https://www.linkedin.com/company/gator-engineered-technologies/people/?viewAsMember=true",
    ],
  } as const;

  


  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          {/* pill nav mounts once for all routes */}
          <PillNavMount />
          {/* page content */}
          {children}
        </SmoothScroll>

        {/* site-wide JSON-LD */}
        <JsonLd data={localBusiness} />

        <Script
          src="https://creattie.com/js/embed.js?id=3f6954fde297cd31b441"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
