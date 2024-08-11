'use server';
import db from '@/lib/db';

export async function getUserByEmail(email: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    } catch (error) {
        return null;
    }
}

export default async function getUserDetails(id: string | undefined) {
    const user = await db.user.findUnique({
        where: {
            id,
        },
    });
    return user;
}
