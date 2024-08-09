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
                        replies: {
                            include: {
                                user: {
                                    select: {
                                        username: true,
                                        image: true,
                                    },
                                },
                                replies: {
                                    include: {
                                        user: {
                                            select: {
                                                username: true,
                                                image: true,
                                            },
                                        },
                                        replies: {
                                            include: {
                                                user: {
                                                    select: {
                                                        username: true,
                                                        image: true,
                                                    },
                                                },
                                                replies: {
                                                    // Recursively include deeper replies
                                                    include: {
                                                        user: {
                                                            select: {
                                                                username: true,
                                                                image: true,
                                                            },
                                                        },
                                                        replies: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (post) {
            return {
                success: true,
                msg: post,
            };
        }
        return {
            msg: 'No post with provided id.',
            success: false,
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
                        replies: true,
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

export const likePost = async (
    postId: string,
    userId: string,
    reloadPath: string
) => {
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
        const newLike = await db.like.create({
            data: {
                postId: postId,
                userId: userId,
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

export const dislikePost = async (
    postId: string,
    likeId: string,
    reloadPath: string
) => {
    try {
        const likedPost = await db.post.update({
            where: {
                id: postId,
            },
            data: {
                likeCount: {
                    decrement: 1,
                },
            },
        });
        const deleteLike = await db.like.delete({
            where: {
                id: likeId,
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

export const isPostLikedByUser = async (userId: string, postId: string) => {
    try {
        const like = await db.like.findFirst({
            where: {
                userId: userId,
                postId: postId,
            },
        });
        if (like) {
            return {
                msg: true,
                likeId: like.id,
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

export const bookmarkPost = async (
    postId: string,
    userId: string,
    reloadPath: string
) => {
    try {
        await db.post.update({
            where: {
                id: postId,
            },
            data: {
                bookmarks: {
                    increment: 1,
                },
            },
        });

        const bookmark = await db.bookmark.create({
            data: {
                postId,
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

export const unbookmarkPost = async (
    bookmarkId: string,
    postId: string,
    reloadPath: string
) => {
    try {
        await db.post.update({
            where: {
                id: postId,
            },
            data: {
                bookmarks: {
                    decrement: 1,
                },
            },
        });

        const bookmark = await db.bookmark.delete({
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

export const isPostBookmarked = async (postId: string, userId: string) => {
    try {
        const bookmarkedPost = await db.bookmark.findFirst({
            where: {
                postId,
                userId,
            },
        });
        if (bookmarkedPost) {
            return {
                msg: true,
                bookmarkId: bookmarkedPost.id,
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
