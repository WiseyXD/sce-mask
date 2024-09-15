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
import Spinner from './Loader';
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
    const [isLiking, setIsLiking] = useState(false); // Loading state for like
    const [isBookmarking, setIsBookmarking] = useState(false); // Loading state for bookmark
    const { toast } = useToast();

    // Checking bookmark and like status with useEffect
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

    // Handle Like/Dislike actions
    const handlePostLikeClick = async () => {
        setIsLiking(true); // Start loading
        if (likeId) {
            const resp = await dislikePost(params.postId, likeId, reloadPath);
            if (!resp.success) {
                toast({
                    title: 'Error occurred while disliking the post.',
                    variant: 'destructive',
                });
            }
            setLikeId(null);
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
            }
        }
        setIsLiking(false); // Stop loading
    };

    const handlePostBookmarkClick = async () => {
        setIsBookmarking(true); // Start loading
        if (bookmarkId) {
            const resp = await unbookmarkPost(
                bookmarkId,
                params.postId,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error occurred while unbookmarking the post.',
                    variant: 'destructive',
                });
            }
            setBookmarkId(null);
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
            }
        }
        setIsBookmarking(false); // Stop loading
    };

    // Handle like action for comments
    const handleCommentLikeClick = async () => {
        if (likeId) {
            const resp = await dislikeComment(
                params.postId,
                likeId,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error disliking the comment.',
                    variant: 'destructive',
                });
            } else {
                setLikeId(null);
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
            }
        }
    };
    // Handle bookmark action for comments
    const handleCommentBookmarkClick = async () => {
        if (bookmarkId) {
            const resp = await unbookmarkComment(
                bookmarkId,
                params.postId,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error unbookmarking the comment.',
                    variant: 'destructive',
                });
            } else {
                setBookmarkId(null);
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
            icon: isLiking ? (
                <Spinner />
            ) : (
                <Heart className="hover:border border-red-600 rounded-md duration-150 ease-in-out" />
            ),
            isModal: false,
            onClickFunction: params.isPostComment
                ? handlePostLikeClick
                : handleCommentLikeClick,
            count: params.likeCount,
            additionalClassName: isLiked ? 'bg-red-500' : '',
        },
        {
            text: 'Bookmark',
            icon: isBookmarking ? (
                <Spinner />
            ) : (
                <BookmarkPlus className="hover:border border-blue-400 rounded-md duration-150 ease-in-out" />
            ),
            isModal: false,
            onClickFunction: params.isPostComment
                ? handlePostBookmarkClick
                : handleCommentBookmarkClick,
            count: params.bookmarks,
            additionalClassName: isBookmarked ? 'bg-blue-400' : '',
        },
    ];

    return (
        <div className="flex justify-evenly gap-x-3 pt-2 ">
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
