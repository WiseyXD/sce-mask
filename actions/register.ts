'use server';

import { ActionResult } from '@/lib/auth';
import { Argon2id } from 'oslo/password';

import db from '@/lib/db';
import { signupSchema } from '@/lib/schema';
import { verifyAccount } from './verifyAccount';

export async function register(values: {
    email: string;
    password: string;
}): Promise<ActionResult> {
    const validInputs = signupSchema.safeParse(values);
    if (!validInputs.success) {
        return {
            error: 'Invlaid Inputs',
        };
    }
    const { email, password } = validInputs.data;

    const hashedPassword = await new Argon2id().hash(password);

    const userAlredayExists = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (userAlredayExists) {
        if (!userAlredayExists.isEmailVerified) {
            return {
                error: 'Please verify your mail',
            };
        } else {
            return {
                error: 'User already exists in DB',
            };
        }
    }

    const domain_part = email.split('@')[1];
    const usernamePart = email.split('@')[0];

    let numberMatch = usernamePart.match(/\d+/);
    let branch = domain_part.split('.')[0];

    const yearOfAddmission = numberMatch ? numberMatch[0] : null;

    let department;
    if (branch == 'it' && yearOfAddmission == '22') {
        department = 'aiml';
    } else {
        department = branch;
    }

    const newUser = await db.user.create({
        data: {
            email,
            password: hashedPassword,
            department,
            yearOfAddmission,
        },
    });

    await verifyAccount({ email: newUser.email, userId: newUser.id });

    return { success: 'Check Mail' };
}
