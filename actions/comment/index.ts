'use server';
import db from '@/lib/db';
import { TComment } from '@/types';

export const createComment = async (commentData: TComment) => {
    try {
        const comment = await db.comment.create({
            data: {
                postId: commentData.postId,
                text: commentData.text,
                userId: commentData.userId,
                ...(commentData.mediaLink && {
                    mediaLink: commentData.mediaLink,
                }),
            },
        });
        return {
            success: true,
            msg: comment,
        };
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            msg: 'Error occured',
        };
    }
};
