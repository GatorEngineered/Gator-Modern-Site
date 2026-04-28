// app/crypto/layout.tsx
export const metadata = {
    title: "Crypto-Ready Websites & Web3 Integrations | Gator Engineered",
    description:
        "Add crypto payments, memberships, and on-chain receipts without confusing your customers. Clean UX, optional checkout, and future-ready design.",
    alternates: { canonical: "https://gatorengineered.com/crypto" },
    robots: { index: true, follow: true },
    openGraph: {
        title: "Crypto-Ready Websites & Web3 Integrations",
        description:
            "Simple, optional crypto checkout, membership/NFT gating, and verifiable on-chain receipts—wrapped in a clean, modern site.",
        type: "website",
        url: "https://gatorengineered.com/crypto",
    },
    twitter: {
        card: "summary_large_image",
        title: "Crypto-Ready Websites & Web3 Integrations",
        description: "Payments, memberships, and receipts your customers actually understand.",
    },
    keywords: [
        "crypto payments website",
        "crypto payments Spring Hill FL",
        "crypto payments New Port Richey FL",
        "crypto payments Lutz FL",
        "web3 membership",
        "NFT gating",
        "on-chain receipt",
        "crypto checkout Hernando County",
        "crypto checkout Pasco County",
        "web3 for small business Florida",
        "crypto website Brooksville FL",
        "crypto website Port Richey FL",
        "crypto website Weeki Wachee FL",
    ],
};

export default function CryptoLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
