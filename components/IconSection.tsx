'use client';
import { BookmarkPlus, Heart, MessagesSquare } from 'lucide-react';
import CommentModal from './CommentModal';

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

export default function IconSection(params: Partial<TIconSectionProps>) {
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
            onClickFunction: () => {
                console.log('Like');
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
                        {params.isPostComment &&
                            (item.isModal ? (
                                <CommentModal
                                    key={item.text}
                                    text={
                                        params.originalText
                                            ? params?.originalText
                                            : 'No text'
                                    }
                                    icon={item.icon}
                                    commentCount={params.commentCount}
                                    postCreatorUsername={
                                        params.postCreatorUsername
                                    }
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
                            ))}
                    </div>
                );
            })}
        </div>
    );
}
