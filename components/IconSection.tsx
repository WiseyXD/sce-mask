'use client';
import {
    dislikeComment,
    isCommentLikedByTheUser,
    likeComment,
} from '@/actions/comment';
import { dislikePost, isPostLikedByUser, likePost } from '@/actions/posts';
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
};

export default function IconSection(params: TIconSectionProps) {
    const reloadPath = usePathname();
    const [isLiked, setIsLiked] = useState(false);
    const [likeId, setLikeId] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        params.isPostComment ? checkIsLiked() : checkIsCommentLiked();
    }, [params.likeCount, params.signedInUserId]);

    const checkIsLiked = async () => {
        const resp = await isPostLikedByUser(
            params.signedInUserId,
            params.postId
        );
        if (resp.success) {
            if (typeof resp.msg == 'boolean') {
                setIsLiked(resp.msg);
                if (resp.likeId) {
                    setLikeId(resp.likeId);
                }
            }
            return;
        }
        return;
    };
    const checkIsCommentLiked = async () => {
        const resp = await isCommentLikedByTheUser(
            params.signedInUserId,
            params.postId
        );
        if (resp.success) {
            if (typeof resp.msg == 'boolean') {
                setIsLiked(resp.msg);
                if (resp.likeId) {
                    setLikeId(resp.likeId);
                }
            }
            return;
        }
        return;
    };

    const handlePostLikeClick = async () => {
        if (likeId) {
            const resp = await dislikePost(params.postId, likeId, reloadPath);
            if (!resp.success) {
                toast({
                    title: 'Error occured while disliking the post.',
                    variant: 'destructive',
                });
                return;
            }
            setLikeId(null);
            return;
        } else {
            const resp = await likePost(
                params.postId,
                params.signedInUserId,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error occured while liking the post.',
                    variant: 'destructive',
                });
                return;
            }
            return;
        }
    };

    const handleCommentLikeClick = async () => {
        if (likeId) {
            const resp = await dislikeComment(
                params.postId,
                likeId,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error occured while disliking the post.',
                    variant: 'destructive',
                });
                return;
            }
            setLikeId(null);
            return;
        } else {
            const resp = await likeComment(
                params.postId,
                params.signedInUserId,
                reloadPath
            );
            if (!resp.success) {
                toast({
                    title: 'Error occured while liking the post.',
                    variant: 'destructive',
                });
                return;
            }
            return;
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
            icon: (
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
            icon: (
                <BookmarkPlus className="hover:border border-blue-400 rounded-md duration-150 ease-in-out" />
            ),
            isModal: false,
            onClickFunction: () => {
                console.log('Bookmark');
            },
            count: params.bookmarks,
        },
    ];

    return (
        <div className="flex justify-evenly gap-x-3 pt-2 ">
            {postsIcons.map((item) => {
                return (
                    <div key={item.text}>
                        {item.isModal && params.isPostComment ? (
                            <CommentModal
                                key={item.text}
                                text={
                                    params.originalText
                                        ? params?.originalText
                                        : 'No text'
                                }
                                icon={item.icon}
                                commentCount={params.commentCount}
                                postCreatorUsername={params.postCreatorUsername}
                                postId={
                                    params.postId
                                        ? params.postId
                                        : 'no post id recieved'
                                }
                                signedInUserId={params.signedInUserId}
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
                );
            })}
        </div>
    );
}
