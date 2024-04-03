'use server';
import * as z from 'zod';

import { loginSchema, signupSchema } from '@/schemas';

export async function login(values: z.infer<typeof loginSchema>) {
    console.log(values);
    const result = loginSchema.safeParse(values);
    if (!result.success) return { error: 'Invalid Fields!!' };
    return { success: 'Email sent!!' };
}

export async function register(values: z.infer<typeof signupSchema>) {
    console.log(values);
    const result = signupSchema.safeParse(values);
    if (!result.success) return { error: 'Invalid Credentials!!' };
    return { success: 'Email sent!!' };
}
