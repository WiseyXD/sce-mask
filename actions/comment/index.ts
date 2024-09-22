'use server';
import db from '@/lib/db';
import { TComment } from '@/types';
import { revalidatePath } from 'next/cache';
import { validateRequest } from '../validateRequests';

export const createComment = async (
    commentData: TComment,
    reloadPath: string
) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
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

export const createReply = async (
    parentCommentId: string,
    userId: string,
    text: string,
    reloadPath: string
) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
        const reply = await db.comment.create({
            data: {
                parentCommentId,
                text,
                userId,
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

export const likeComment = async (
    commentId: string,
    userId: string,
    reloadPath: string
) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
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
            likeId: newlikeComment.id,
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
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
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
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
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

export const bookmarkComment = async (
    commentId: string,
    userId: string,
    reloadPath: string
) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
        await db.comment.update({
            where: {
                id: commentId,
            },
            data: {
                bookmarks: {
                    increment: 1,
                },
            },
        });

        const bookmark = await db.commentBookmark.create({
            data: {
                commentId,
                userId,
            },
        });
        revalidatePath(reloadPath);
        return {
            success: true,
            msg: bookmark.id,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
};

export const unbookmarkComment = async (
    bookmarkId: string,
    commentId: string,
    reloadPath: string
) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
        await db.comment.update({
            where: {
                id: commentId,
            },
            data: {
                bookmarks: {
                    decrement: 1,
                },
            },
        });

        const bookmark = await db.commentBookmark.delete({
            where: {
                id: bookmarkId,
            },
        });
        revalidatePath(reloadPath);
        return {
            success: true,
            msg: bookmark.id,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
};

export const isCommentBookmarked = async (
    commentId: string,
    userId: string
) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
        const bookmarkedComment = await db.commentBookmark.findFirst({
            where: {
                commentId,
                userId,
            },
        });
        if (bookmarkedComment) {
            return {
                msg: true,
                bookmarkId: bookmarkedComment.id,
                success: true,
            };
        }
        return {
            success: true,
            msg: false,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
};
