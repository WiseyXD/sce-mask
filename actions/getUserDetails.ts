'use server';
import db from '@/lib/db';

export default async function getUserDetails(email: string) {
    const user = await db.user.findFirst({
        where: {
            email,
        },
    });
    return user;
}
