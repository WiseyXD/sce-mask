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

export const profileSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    description: z
        .string()
        .min(2, {
            message: 'Description must be at least 2 characters.',
        })
        .max(70, {
            message: 'Description must not be greater than 70 characters',
        }),
    image: z.string().url({ message: 'Mask image must be selected' }),
});

export const profileUpdateSchema = z.object({
    description: z
        .string()
        .min(2, {
            message: 'Description must be at least 2 characters.',
        })
        .max(70, {
            message: 'Description must not be greater than 70 characters',
        }),
    image: z.string().url({ message: 'Mask image must be selected' }),
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
    text: z.string().min(1, 'Text is required'),
});

export const postSchema = z.object({
    text: z.string().min(1, 'Text is required'),
    userId: z.string().min(1, 'User ID is required'),
    communityId: z.string().optional(),
    mediaLink: z.string().optional(), // mediaLink can be undefined or a valid URL
});

export const postEditSchema = z.object({
    text: z.string().min(1, 'Text is required'),
});

export const commentCreationSchema = z.object({
    comment: z.string().min(2).max(50),
});

export const communitySchema = z.object({
    name: z.string().min(3, 'Name is required.'),
    description: z.string().min(10, 'Descripiton required for the community.'),
});
