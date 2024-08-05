'use server';
import db from '@/lib/db';
import { TPost } from '@/types';
import { revalidatePath } from 'next/cache';

export const createPost = async (postData: TPost) => {
    try {
        const post = await db.post.create({
            data: {
                userId: postData.userId,
                text: postData.text,
                ...(postData.mediaLink && { mediaLink: postData.mediaLink }),
            },
        });
        console.log(post);
        revalidatePath('/home');
        return {
            success: true,
            msg: post,
        };
    } catch (error) {
        console.log(error);
        return {
            msg: 'error occured while getting post',
            success: false,
        };
    }
};

export const getPostbyId = async (id: string) => {
    try {
        const post = await db.post.findUnique({
            where: {
                id,
            },
            include: {
                user: {
                    select: {
                        username: true,
                        image: true,
                    },
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                image: true,
                            },
                        },
                    },
                },
            },
        });
        return {
            success: true,
            msg: post,
        };
    } catch (error) {
        console.log(error);
        return {
            msg: 'error occured while getting post by id',
            success: false,
        };
    }
};

export const getAllPosts = async () => {
    try {
        const post = await db.post.findMany({
            include: {
                user: {
                    select: {
                        username: true,
                        image: true,
                    },
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                image: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                time: 'desc', // Sort by date in descending order
            },
        });
        return {
            success: true,
            msg: post,
        };
    } catch (error) {
        console.log(error);
        return {
            msg: 'error occured while getting post by id',
            success: false,
        };
    }
};

const likePost = async (postId: string, reloadPath: string) => {
    try {
        const likedPost = await db.post.update({
            where: {
                id: postId,
            },
            data: {
                likeCount: {
                    increment: 1,
                },
            },
        });
        revalidatePath(reloadPath);
        return {
            success: true,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
};
