'use server';

import { ActionResult } from '@/lib/auth';
import { Argon2id } from 'oslo/password';

import db from '@/lib/db';
import { verifyAccount } from './verifyAccount';

export async function register({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<ActionResult> {
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    if (typeof email !== 'string') {
        return {
            error: 'Invalid email',
        };
    }

    // if (
    //     typeof username !== 'string' ||
    //     username.length < 3 ||
    //     username.length > 31 ||
    //     !/^[a-z0-9_-]+$/.test(username)
    // ) {
    //     return {
    //         error: 'Invalid username',
    //     };
    // }

    if (
        typeof password !== 'string' ||
        password.length < 6 ||
        password.length > 255
    ) {
        return {
            error: 'Invalid password',
        };
    }

    const hashedPassword = await new Argon2id().hash(password);

    // TODO: check if username is already used
    const userAlredayExists = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (userAlredayExists)
        return {
            error: 'User Alredy Existis in DB',
        };

    const newUser = await db.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
    // generate a random 6 character long string

    await verifyAccount({ email: newUser.email, userId: newUser.id });

    return { success: 'Check Mail' };
}
