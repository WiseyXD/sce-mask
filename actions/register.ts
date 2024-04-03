'use server';
import * as z from 'zod';

import { signupSchema } from '@/schemas';

export async function register(values: z.infer<typeof signupSchema>) {
    const result = signupSchema.safeParse(values);
    if (!result.success) return { error: 'Invalid Credentials!!' };
    console.log('Registered');
    return { success: 'Email sent!!' };
}
