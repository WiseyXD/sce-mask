'use server';
import db from '@/lib/db';
import { TPost } from '@/types';

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
