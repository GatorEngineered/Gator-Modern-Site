// app/crypto/layout.tsx
export const metadata = {
    title: "Crypto-Ready Websites & Web3 Integrations | Gator Engineered",
    description:
        "Add crypto payments, memberships, and on-chain receipts without confusing your customers. Clean UX, optional checkout, and future-ready design.",
    alternates: { canonical: "/crypto" },
    openGraph: {
        title: "Crypto-Ready Websites & Web3 Integrations",
        description:
            "Simple, optional crypto checkout, membership/NFT gating, and verifiable on-chain receipts—wrapped in a clean, modern site.",
        type: "website",
        url: "/crypto",
    },
    twitter: {
        card: "summary_large_image",
        title: "Crypto-Ready Websites & Web3 Integrations",
        description: "Payments, memberships, and receipts your customers actually understand.",
    },
    keywords: [
        "crypto payments website",
        "web3 membership",
        "NFT gating",
        "on-chain receipt",
        "crypto checkout",
        "web3 for small business",
    ],
};

export default function CryptoLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
