'use server';
import * as z from 'zod';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { loginSchema } from '@/schemas';
import { AuthError } from 'next-auth';

export async function login(values: z.infer<typeof loginSchema>) {
    const result = loginSchema.safeParse(values);

    if (!result.success) return { error: 'Invalid Fields!!' };

    const { email, password } = result.data;

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
        return { success: 'Email sent!!' };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid Credentials!' };
                default:
                    return { error: 'Something went wrong' };
            }
        }
        throw error;
    }
}
