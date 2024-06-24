'use server';

import db from '../lib/db';

export default async function setUsername(username: string, id: string) {
    const usernameExists = await db.user.findFirst({
        where: {
            username,
        },
    });
    if (usernameExists) {
        console.log('Already exists');
        return {
            success: false,
            msg: 'Username already exists in DB.',
        };
    }
    const setUsername = await db.user.update({
        where: {
            id,
        },
        data: {
            username,
        },
    });
    return {
        success: true,
        msg: `Username ${setUsername.username} alloted.`,
    };
}
