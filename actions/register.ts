'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';

import { getUserByEmail } from '@/data/user';
import prisma from '@/lib/db';
import { signupSchema } from '@/schemas';

export async function register(values: z.infer<typeof signupSchema>) {
    const result = signupSchema.safeParse(values);
    if (!result.success) return { error: 'Invalid Credentials!!' };
    const { email, password } = result.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const alreadyExistingUser = await getUserByEmail(email);

        if (alreadyExistingUser)
            return { error: 'User already exists , please login.' };

        const createdUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        console.log('Registered');

        // TODO : Send verification token mail

        return { success: 'Email sent!!', user: createdUser };
    } catch (error) {
        return { success: 'Error occured while creating a user.' };
    }
}
