import authConfig from '@/auth.config';
import prisma from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import NextAuth from 'next-auth';
import { getUserById } from './data/user';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token to the token right after signin

            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        },
        async session({ token, session }) {
            if (token.sub) {
                session.user.id = token.sub;
            }

            if (token.role) {
                // @ts-ignore
                session.user.role = token.role as UserRole;
            }

            return session;
        },
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig,
});
