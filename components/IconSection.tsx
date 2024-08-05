'use client';
import { likePost } from '@/actions/posts';
import { BookmarkPlus, Heart, MessagesSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
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
    const { toast } = useToast();
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
            onClickFunction: async () => {
                const resp = await likePost(params.postId, reloadPath);
                if (!resp.success) {
                    toast({
                        title: 'Error occured while liking the post.',
                        variant: 'destructive',
                    });
                    return;
                }
                return;
            },
            count: params.likeCount,
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
                                    {item.icon}
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
