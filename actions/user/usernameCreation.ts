'use server';

import db from '../../lib/db';

export default async function setUsernameAndDescription(
    username: string,
    id: string,
    description: string
) {
    const usernameExists = await db.user.findFirst({
        where: {
            username,
        },
    });

    if (usernameExists) {
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
            description,
        },
    });
    return {
        success: true,
        msg: `Username ${setUsername.username} alloted and description added.`,
    };
}
