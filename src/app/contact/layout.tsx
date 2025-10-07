// app/contact/layout.tsx
export const metadata = {
    title: "Contact | Gator Engineered Technologies",
    description: "Start a project, ask a question, or request a quote.",
    // Optional extras:
    openGraph: {
        title: "Contact | Gator Engineered Technologies",
        description: "Start a project, ask a question, or request a quote.",
        type: "website",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
