'use server';
import db from '@/lib/db';
import { TComment } from '@/types';
import { revalidatePath } from 'next/cache';

export const createComment = async (
    commentData: TComment,
    reloadPath: string
) => {
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
        revalidatePath(reloadPath);
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
