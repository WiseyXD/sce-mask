import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'SCOE-mask',
    description: 'Developed by WiseyXD',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className + 'min-h-[100vh] flex flex-col'}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="basis-1/5">
                        <Navbar props={null} />
                    </div>
                    <div className="basis-4/5">{children}</div>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}