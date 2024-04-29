import NewNavbar from '@/components/NewNavbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { NextUIProvider } from '@nextui-org/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'SCEMask',
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
                <NextUIProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="basis-1/5">
                            <NewNavbar />
                        </div>
                        <div className="basis-4/5">{children}</div>
                        <Toaster />
                    </ThemeProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}
