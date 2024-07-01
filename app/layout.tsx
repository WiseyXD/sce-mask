import { validateRequest } from '@/actions/validateRequests';
import NewNavbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from '@/providers/SessionProvider';
import { ThemeProvider } from '@/providers/theme-provider';
import { NextUIProvider } from '@nextui-org/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';

import { ourFileRouter } from '../app/api/uploadthing/core';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'SCEMask',
    description: 'Developed by WiseyXD',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const sessionData = await validateRequest();

    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider value={sessionData}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <NextUIProvider>
                            {!sessionData.session && <NewNavbar />}
                            <NextSSRPlugin
                                /**
                                 * The `extractRouterConfig` will extract **only** the route configs
                                 * from the router to prevent additional information from being
                                 * leaked to the client. The data passed to the client is the same
                                 * as if you were to fetch `/api/uploadthing` directly.
                                 */

                                routerConfig={extractRouterConfig(
                                    ourFileRouter
                                )}
                            />
                            {children}

                            <Toaster />
                        </NextUIProvider>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
