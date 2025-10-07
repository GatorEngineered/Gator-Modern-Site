// app/ai/layout.tsx
export const metadata = {
    title: "AI Services for Small Businesses | Chatbots, Automation, Lead Capture",
    description:
        "We build practical AI for small businesses: on-brand chatbots, lead capture, appointment scheduling, and automated follow-ups. Fast setup, clear pricing, crypto-ready checkout.",
    alternates: { canonical: "/ai" },
    openGraph: {
        title: "AI Services for Small Businesses | Chatbots, Automation, Lead Capture",
        description:
            "On-brand AI assistants that answer questions, book calls, and automate follow-ups. Convert more leads with practical AI.",
        type: "website",
        url: "/ai",
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Services for Small Businesses",
        description:
            "Chatbots, automation, lead capture, and appointment scheduling for local brands.",
    },
    keywords: [
        "AI chatbot for small business",
        "website automation",
        "lead capture",
        "AI assistant",
        "appointment scheduling",
        "CRM integration",
        "AI for local businesses",
        "customer support automation",
        "chatbot website",
        "business automation",
    ],
};

export default function AiLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
