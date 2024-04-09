'use server';

import { ActionResult } from '@/lib/auth';
import db from '@/lib/db';
import { Argon2id } from 'oslo/password';
import { verifyAccount } from './verifyAccount';

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<ActionResult> {
    if (typeof email !== 'string') {
        return {
            error: 'Invalid username',
        };
    }

    if (
        typeof password !== 'string' ||
        password.length < 6 ||
        password.length > 255
    ) {
        return {
            error: 'Invalid password',
        };
    }

    const existingUser = await db.user.findUnique({
        where: {
            email,
        },
    });
    if (!existingUser) {
        // NOTE:
        // Returning immediately allows malicious actors to figure out valid usernames from response times,
        // allowing them to only focus on guessing passwords in brute-force attacks.
        // As a preventive measure, you may want to hash passwords even for invalid usernames.
        // However, valid usernames can be already be revealed with the signup page among other methods.
        // It will also be much more resource intensive.
        // Since protecting against this is non-trivial,
        // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
        // If usernames are public, you may outright tell the user that the username is invalid.
        return {
            error: 'Incorrect username or password',
        };
    }

    const validPassword = await new Argon2id().verify(
        existingUser.password,
        password
    );
    if (!validPassword) {
        return {
            error: 'Incorrect username or password',
        };
    }

    await verifyAccount({ email: existingUser.email, userId: existingUser.id });

    return { success: 'Check Mail' };
}
