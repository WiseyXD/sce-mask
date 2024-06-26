import * as z from 'zod';

export const signupSchema = z.object({
    email: z
        .string()
        .regex(
            new RegExp(
                '^[a-zA-Z0-9._%+-]+(21|[2-9][2-9])(dse)?@(aiml|ds|mech|civil|it|comp|auto).sce.edu.in$'
            ),
            'College email only allowed and only after 2020 batch.'
        ),
    password: z.string().min(7),
});

export const loginSchema = z.object({
    email: z
        .string()
        .regex(
            new RegExp(
                '^[a-zA-Z0-9._%+-]+(21|[2-9][2-9])(dse)?@(aiml|ds|mech|civil|it|comp|auto).sce.edu.in$'
            ),
            'College email only allowed and only after 2020 batch.'
        ),
    password: z.string().min(1, 'Password is required for Login'),
});

export const resetPasswordSchema = z
    .object({
        email: z
            .string()
            .regex(
                new RegExp(
                    '^[a-zA-Z0-9._%+-]+(21|[2-9][2-9])(dse)?@(aiml|ds|mech|civil|it|comp|auto).sce.edu.in$'
                ),
                'College email only allowed and only after 2020 batch.'
            ),
        password: z.string().min(7),
        reEnterPassword: z.string(),
    })
    .refine((data) => data.password === data.reEnterPassword, {
        message: "Passwords don't match",
        path: ['reEnterPassword'],
    });

export const profileCreationSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
});

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
];

export const postCreationSchema = z.object({
    text: z.string().min(1, { message: 'Text is required' }),

    // media: z
    //     .any()
    //     .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    //     .refine(
    //         (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //         'Only .jpg, .jpeg, .png and .webp formats are supported.'
    //     ),
});
