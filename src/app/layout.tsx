// src/app/layout.tsx
import "./globals.css";
import Script from "next/script";
import PillNavMount from "./components/PillNavMount"; 
import SmoothScroll from "./components/SmoothScroll";

export const metadata = {
  title: "Gator Engineered Technologies",
  description: "AI + Web2/Web3 studio",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
         <SmoothScroll>
        {/* 👇 pill nav mounts once for all routes */}
        <PillNavMount />

        {/* your actual page content */}
        {children}</SmoothScroll>

        <Script
          src="https://creattie.com/js/embed.js?id=3f6954fde297cd31b441"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
