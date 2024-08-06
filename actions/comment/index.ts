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

export const likeComment = async (
    commentId: string,
    userId: string,
    reloadPath: string
) => {
    try {
        const commentToBeLiked = await db.comment.update({
            where: {
                id: commentId,
            },
            data: {
                likeCount: {
                    increment: 1,
                },
            },
        });

        const newlikeComment = await db.commentLike.create({
            data: {
                userId,
                commentId,
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

export const dislikeComment = async (
    commentId: string,
    commentLikeId: string,
    reloadPath: string
) => {
    try {
        const commentToBeDisliked = await db.comment.update({
            where: {
                id: commentId,
            },
            data: {
                likeCount: {
                    decrement: 1,
                },
            },
        });
        const likeComment = await db.commentLike.delete({
            where: {
                id: commentLikeId,
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

export const isCommentLikedByTheUser = async (
    userId: string,
    commentId: string
) => {
    try {
        const isLiked = await db.commentLike.findFirst({
            where: {
                userId: userId,
                commentId: commentId,
            },
        });
        if (isLiked) {
            return {
                msg: true,
                likeId: isLiked.id,
                success: true,
            };
        } else {
            return {
                msg: false,
                success: true,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
};
