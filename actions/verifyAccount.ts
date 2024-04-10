'use server';

import db from '@/lib/db';
import jwt from 'jsonwebtoken';

export async function verifyAccount({
    userId,
    email,
}: {
    email: string;
    userId: string;
}) {
    const code = Math.random().toString(36).substring(2, 8);
    const token = jwt.sign({ email, userId, code }, process.env.JWT_SECRET!, {
        expiresIn: '5m',
    });

    const existingToken = await db.emailVerification.findFirst({
        where: {
            userId,
        },
    });

    if (existingToken) {
        const sentAt = new Date(existingToken.createdAt);
        const hasOneMinutePassed =
            new Date().getTime() - sentAt.getTime() > 60000;

        if (!hasOneMinutePassed) {
            return {
                error: 'Email already sent , wait for countdown',
            };
        }

        await db.emailVerification.update({
            where: {
                id: existingToken.id,
            },
            data: {
                code,
                createdAt: new Date(),
            },
        });
    } else {
        await db.emailVerification.create({
            data: {
                code: code,
                user: { connect: { id: userId } },
            },
        });
    }

    const url = `${process.env.NEXT_BASE_URL}/api/verify-email?token=${token}`;

    console.log(url);

    return;
    // send mail
}
