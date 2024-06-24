'use server';
import db from '@/lib/db';

export default async function getUserDetails(id: string | undefined) {
    const user = await db.user.findUnique({
        where: {
            id,
        },
    });
    return user;
}
