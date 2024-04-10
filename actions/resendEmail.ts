'use server';

import db from '@/lib/db';
import { verifyAccount } from './verifyAccount';

export async function resendEmailVerificationLink(email: string) {
    try {
        const existingUser = await db.user.findFirst({
            where: {
                email,
            },
        });

        if (!existingUser) {
            return {
                error: 'User not found',
            };
        }

        if (existingUser.isEmailVerified) {
            return {
                error: 'User is already verified',
            };
        }

        await verifyAccount({ userId: existingUser.id, email });
        return {
            success: 'Email Sent',
        };
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
}
