export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            Auth Layout
            {children}
        </main>
    );
}
