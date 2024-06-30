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
            msg: 'error accoured',
            success: false,
        };
    }
};
