'use server';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createProfile(
    username: string,
    id: string,
    description: string,
    image: string
) {
    try {
        const usernameExists = await db.user.findFirst({
            where: {
                username,
            },
        });

        if (usernameExists) {
            return {
                success: false,
                msg: 'Username already exists in DB.',
            };
        }
        const setUsername = await db.user.update({
            where: {
                id,
            },
            data: {
                username,
                description,
                image,
            },
        });
        if (!setUsername) {
            return {
                success: false,
                msg: `No user with id ${id} exists in DB.`,
            };
        }

        return {
            success: true,
            msg: `Username ${setUsername.username} alloted also image and description added.`,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            msg: `Error occured while creating user.`,
        };
    }
}

export async function updateProfile(
    id: string,
    description: string,
    image: string,
    reloadPath: string
) {
    try {
        const setUsername = await db.user.update({
            where: {
                id,
            },
            data: {
                description,
                image,
            },
        });
        if (!setUsername) {
            return {
                success: true,
                msg: `No user with id ${id} found in DB.`,
            };
        }
        revalidatePath(reloadPath);
        return {
            success: true,
            msg: `Profile Updated.`,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            msg: 'Error occured while updating profiile.',
        };
    }
}

export async function getUserByEmail(email: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    } catch (error) {
        return null;
    }
}

export default async function getUserDetails(id: string | undefined) {
    const user = await db.user.findUnique({
        where: {
            id,
        },
    });
    return user;
}
