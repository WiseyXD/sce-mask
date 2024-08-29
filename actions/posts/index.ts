'use server';
import db from '@/lib/db';
import { postSchema } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { validateRequest } from '../validateRequests';

// CRUD POSTS

export const createPost = async ({
    text,
    userId,
    mediaLink,
    communityId,
}: {
    text: string;
    userId: string;
    mediaLink: string | undefined;
    communityId: string | undefined;
}) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
        const validInputs = postSchema.safeParse({
            text,
            userId,
            mediaLink,
            communityId,
        });
        if (!validInputs.success) {
            console.log('Invalid post creation inputs' + validInputs.error);
            return {
                msg: 'Invalid post creation inputs',
                success: false,
            };
        }

        const post = await db.post.create({
            data: {
                userId,
                text,
                mediaLink: mediaLink ?? '',
                // ...(communityId && { communityId }),
                communityId,
            },
        });
        // console.log(post);
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
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
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
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
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
                time: 'desc',
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

export const getAllPostsByUserId = async (userId: string) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
        const posts = await db.post.findMany({
            where: {
                userId: userId,
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
                        replies: true,
                    },
                },
            },
            orderBy: {
                time: 'desc',
            },
        });
        if (posts.length == 0) {
            return {
                success: true,
                posts: null,
            };
        }
        return {
            success: true,
            posts: posts,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
};

export const editPost = async (
    text: string,
    postId: string,
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
        const updatedPost = await db.post.update({
            where: {
                id: postId,
            },
            data: {
                text: text,
            },
        });
        if (!updatedPost) {
            return {
                success: true,
                msg: `No post with id ${postId}`,
            };
        }
        revalidatePath(reloadPath);

        return {
            success: true,
            msg: `Post updated`,
        };
    } catch (error) {
        console.log(error);
        return {
            success: true,
            msg: `Error while updating post !`,
        };
    }
};

export const deletePost = async (postId: string, reloadPath: string) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
        const deletedPost = await db.post.delete({
            where: {
                id: postId,
            },
        });
        if (!deletedPost) {
            return {
                success: true,
                msg: `No post with id ${postId} found in DB!`,
            };
        }
        revalidatePath(reloadPath);
        return {
            success: true,
            msg: 'Post deleted successfully.',
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            msg: 'Error occured while deleting the post!',
        };
    }
};

// BOOKMARKS POST

export const getAllBookmarksPostByUserId = async (userId: string) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
        const posts = await db.bookmark.findMany({
            where: {
                userId,
            },
            include: {
                post: {
                    include: {
                        user: true,
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
                },
            },
        });
        return {
            success: true,
            msg: posts,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            msg: `Error occured while fetching bookmarks.`,
        };
    }
};

export const deleteAllBookmarksByUserId = async (
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
        const bookmarkedPosts = await db.bookmark.findMany({
            where: {
                userId,
            },
            select: {
                postId: true,
            },
        });

        // Extract post IDs
        const postIds = bookmarkedPosts.map((bookmark) => bookmark.postId);

        // Step 2: Delete all bookmarks by userId
        const deletedBookmarks = await db.bookmark.deleteMany({
            where: {
                userId,
            },
        });

        // Step 3: Decrement the bookmark count for each post
        await db.post.updateMany({
            where: {
                id: {
                    in: postIds,
                },
            },
            data: {
                bookmarks: {
                    decrement: 1,
                },
            },
        });
        revalidatePath(reloadPath);
        return {
            success: true,
            msg: `Deleted all the bookmarks.`,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            msg: `Error occured while deleting the bookmarks.`,
        };
    }
};

export const unbookmarkPost = async (
    bookmarkId: string,
    postId: string,
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
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
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

export const bookmarkPost = async (
    postId: string,
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

// LIKE AND DISLIKE POST

export const likePost = async (
    postId: string,
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
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
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
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: 'Forbidden request.',
            };
        }
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
