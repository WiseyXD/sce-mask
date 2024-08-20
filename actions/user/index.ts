'use server';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { validateRequest } from '../validateRequests';

export async function createProfile(
    username: string,
    id: string,
    description: string,
    image: string
) {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
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
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
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
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
        const requiredUser = await db.user.findUnique({
            where: {
                email,
            },
        });
        return requiredUser;
    } catch (error) {
        return null;
    }
}

export default async function getUserDetails(id: string | undefined) {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return null;
        }
        const requiredUser = await db.user.findUnique({
            where: {
                id,
            },
        });
        return requiredUser;
    } catch (error) {
        return null;
    }
}

// follow and unfollow user

export const followUser = async (followingId: string, reloadPath: string) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
        const followExists = await db.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: user.id,
                    followingId,
                },
            },
        });
        if (followExists) {
            return {
                success: true,
                msg: 'User already followed.',
            };
        }
        const newFollow = await db.follow.create({
            data: {
                followerId: user.id,
                followingId,
            },
        });
        revalidatePath(reloadPath);
        return {
            success: true,
            msg: 'User followed.',
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            msg: 'Error occured while following the user.',
        };
    }
};

export const unfollowUser = async (followingId: string, reloadPath: string) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
        const deleteFollow = await db.follow.deleteMany({
            where: {
                followerId: user.id,
                followingId,
            },
        });
        revalidatePath(reloadPath);
        return {
            success: true,
            msg: 'Unfollowed the user.',
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            msg: 'Error occured while unfollowing user.',
        };
    }
};
