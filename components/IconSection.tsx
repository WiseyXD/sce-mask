'use client';
import {
    bookmarkComment,
    dislikeComment,
    isCommentBookmarked,
    isCommentLikedByTheUser,
    likeComment,
    unbookmarkComment,
} from '@/actions/comment';
import {
    bookmarkPost,
    dislikePost,
    isPostBookmarked,
    isPostLikedByUser,
    likePost,
    unbookmarkPost,
} from '@/actions/posts';
import { BookmarkPlus, Heart, MessagesSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CommentModal from './CommentModal';
import { useToast } from './ui/use-toast';

type TIconSectionProps = {
    isPostComment: boolean;
    commentCount: number;
    likeCount: number;
    bookmarks: number;
    originalText: string;
    postCreatorUsername: string;
    postId: string;
    signedInUserId: string;
    userImage: string;
    postCreatorImage: string;
};

export default function IconSection(params: TIconSectionProps) {
    const reloadPath = usePathname();
    const [isLiked, setIsLiked] = useState(false);
    const [likeId, setLikeId] = useState<string | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkId, setBookmarkId] = useState<string | null>(null);
    const [likeCount, setLikeCount] = useState(params.likeCount);
    const [bookmarkCount, setBookmarkCount] = useState(params.bookmarks);
    const { toast } = useToast();

    useEffect(() => {
        params.isPostComment ? checkIsLiked() : checkIsCommentLiked();
    }, [params.likeCount, params.signedInUserId]);

    useEffect(() => {
        params.isPostComment ? checkIsBookmarked() : checkIsCommentBookmarked();
    }, [params.signedInUserId, params.bookmarks]);

    // Check whether the post/comment is bookmarked or liked
    const checkIsCommentBookmarked = async () => {
        const resp = await isCommentBookmarked(
            params.postId,
            params.signedInUserId
        );
        if (resp.success && typeof resp.msg === 'boolean') {
            setIsBookmarked(resp.msg);
            setBookmarkId(resp.bookmarkId || null);
        }
    };

    const checkIsBookmarked = async () => {
        const resp = await isPostBookmarked(
            params.postId,
            params.signedInUserId
        );
        if (resp.success && typeof resp.msg === 'boolean') {
            setIsBookmarked(resp.msg);
            setBookmarkId(resp.bookmarkId || null);
        }
    };

    const checkIsLiked = async () => {
        const resp = await isPostLikedByUser(
            params.signedInUserId,
            params.postId
        );
        if (resp.success && typeof resp.msg === 'boolean') {
            setIsLiked(resp.msg);
            setLikeId(resp.likeId || null);
        }
    };

    const checkIsCommentLiked = async () => {
        const resp = await isCommentLikedByTheUser(
            params.signedInUserId,
            params.postId
        );
        if (resp.success && typeof resp.msg === 'boolean') {
            setIsLiked(resp.msg);
            setLikeId(resp.likeId || null);
        }
    };

    const handlePostLikeClick = async () => {
        const prevLiked = isLiked;
        const prevLikeId = likeId;
        setIsLiked(!prevLiked); // Optimistically update UI
        setLikeCount(prevLiked ? likeCount - 1 : likeCount + 1); // Optimistically update like count
        if (likeId) {
            setLikeId(null);
            const resp = await dislikePost(
                params.postId,
                prevLikeId!,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error occurred while disliking the post.',
                    variant: 'destructive',
                });
                setIsLiked(prevLiked); // Revert on error
                setLikeCount(likeCount); // Revert like count
                setLikeId(prevLikeId);
            }
        } else {
            const resp = await likePost(
                params.postId,
                params.signedInUserId,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error occurred while liking the post.',
                    variant: 'destructive',
                });
                setIsLiked(prevLiked); // Revert on error
                setLikeCount(likeCount); // Revert like count
            } else {
                setLikeId(resp.likeId || null);
            }
        }
    };

    const handlePostBookmarkClick = async () => {
        const prevBookmarked = isBookmarked;
        const prevBookmarkId = bookmarkId;
        setIsBookmarked(!prevBookmarked); // Optimistically update UI
        setBookmarkCount(
            prevBookmarked ? bookmarkCount - 1 : bookmarkCount + 1
        ); // Optimistically update bookmark count
        if (bookmarkId) {
            setBookmarkId(null);
            const resp = await unbookmarkPost(
                prevBookmarkId!,
                params.postId,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error occurred while unbookmarking the post.',
                    variant: 'destructive',
                });
                setIsBookmarked(prevBookmarked); // Revert on error
                setBookmarkCount(bookmarkCount); // Revert bookmark count
                setBookmarkId(prevBookmarkId);
            }
        } else {
            const resp = await bookmarkPost(
                params.postId,
                params.signedInUserId,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error occurred while bookmarking the post.',
                    variant: 'destructive',
                });
                setIsBookmarked(prevBookmarked); // Revert on error
                setBookmarkCount(bookmarkCount); // Revert bookmark count
            } else {
                setBookmarkId(resp.msg || null);
            }
        }
    };

    const handleCommentLikeClick = async () => {
        const prevLiked = isLiked;
        const prevLikeId = likeId;
        setIsLiked(!prevLiked); // Optimistically update UI
        setLikeCount(prevLiked ? likeCount - 1 : likeCount + 1); // Optimistically update like count
        if (likeId) {
            setLikeId(null);
            const resp = await dislikeComment(
                params.postId,
                prevLikeId!,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error disliking the comment.',
                    variant: 'destructive',
                });
                setIsLiked(prevLiked); // Revert on error
                setLikeCount(likeCount); // Revert like count
                setLikeId(prevLikeId);
            }
        } else {
            const resp = await likeComment(
                params.postId,
                params.signedInUserId,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error liking the comment.',
                    variant: 'destructive',
                });
                setIsLiked(prevLiked); // Revert on error
                setLikeCount(likeCount); // Revert like count
            } else {
                setLikeId(resp.likeId || null);
            }
        }
    };

    const handleCommentBookmarkClick = async () => {
        const prevBookmarked = isBookmarked;
        const prevBookmarkId = bookmarkId;
        setIsBookmarked(!prevBookmarked); // Optimistically update UI
        setBookmarkCount(
            prevBookmarked ? bookmarkCount - 1 : bookmarkCount + 1
        ); // Optimistically update bookmark count
        if (bookmarkId) {
            setBookmarkId(null);
            const resp = await unbookmarkComment(
                prevBookmarkId!,
                params.postId,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error unbookmarking the comment.',
                    variant: 'destructive',
                });
                setIsBookmarked(prevBookmarked); // Revert on error
                setBookmarkCount(bookmarkCount); // Revert bookmark count
                setBookmarkId(prevBookmarkId);
            }
        } else {
            const resp = await bookmarkComment(
                params.postId,
                params.signedInUserId,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error bookmarking the comment.',
                    variant: 'destructive',
                });
                setIsBookmarked(prevBookmarked); // Revert on error
                setBookmarkCount(bookmarkCount); // Revert bookmark count
            } else {
                setBookmarkId(resp.msg || null);
            }
        }
    };
    const postsIcons = [
        {
            text: 'Comment',
            icon: (
                <MessagesSquare className="hover:border border-blue-400 rounded-md duration-150 ease-in-out" />
            ),
            isModal: true,
            onClickFunction: () => {},
            count: params.commentCount,
        },
        {
            text: 'Like',
            icon: isLiked ? (
                <Heart className="hover:border border-red-600 rounded-md duration-150 ease-in-out" />
            ) : (
                <Heart className="" />
            ),
            isModal: false,
            onClickFunction: params.isPostComment
                ? handlePostLikeClick
                : handleCommentLikeClick,
            count: likeCount,
            additionalClassName: isLiked ? 'bg-red-500' : '',
        },
        {
            text: 'Bookmark',
            icon: isBookmarked ? (
                <BookmarkPlus className="hover:border border-blue-400 rounded-md duration-150 ease-in-out" />
            ) : (
                <BookmarkPlus className="" />
            ),
            isModal: false,
            onClickFunction: params.isPostComment
                ? handlePostBookmarkClick
                : handleCommentBookmarkClick,
            count: bookmarkCount,
            additionalClassName: isBookmarked ? 'bg-blue-400' : '',
        },
    ];

    return (
        <div className="flex justify-evenly gap-x-3 pt-2 ">
            {' '}
            {postsIcons.map((item) => (
                <div key={item.text}>
                    {item.isModal ? (
                        <CommentModal
                            key={item.text}
                            text={params.originalText || 'No text'}
                            icon={item.icon}
                            commentCount={params.commentCount}
                            postCreatorUsername={params.postCreatorUsername}
                            postId={params.postId || 'no post id received'}
                            signedInUserId={params.signedInUserId}
                            userImage={params.userImage!}
                            postCreatorImage={params.postCreatorImage!}
                            isPostComment={params.isPostComment}
                        />
                    ) : (
                        <div
                            key={item.text}
                            className="cursor-pointer"
                            onClick={item.onClickFunction}
                        >
                            <div className="flex gap-x-2 justify-center">
                                <div className={item.additionalClassName}>
                                    {item.icon}
                                </div>
                                {item.count}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
