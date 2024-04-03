'use server';
import * as z from 'zod';

import { loginSchema } from '@/schemas';

export async function login(values: z.infer<typeof loginSchema>) {
    const result = loginSchema.safeParse(values);
    if (!result.success) return { error: 'Invalid Fields!!' };
    console.log('Logged in');
    return { success: 'Email sent!!' };
}
