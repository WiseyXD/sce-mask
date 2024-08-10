import { Separator } from '@/components/ui/separator';
import { imageLink } from '@/lib/utils';
import { TPost, TUserDetails } from '@/types';
import { User as NextUser } from '@nextui-org/react';
import { BookmarkPlus, Heart, MessagesSquare } from 'lucide-react';

import IconSection from '@/components/IconSection';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

type TPostCardProps = {
    username: string | null | undefined;
    post: TPost;
    userDetails: TUserDetails;
};

const postsIcons = [
    {
        text: 'Comment',
        icon: (
            <MessagesSquare className="hover:border border-blue-400 rounded-md duration-150 ease-in-out" />
        ),
        isModal: true,
        onClickFunction: () => {},
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
    },
];

export default function PostCard({
    username,
    post,
    userDetails,
}: Partial<TPostCardProps>) {
    console.log(post);
    return (
        <div className="flex flex-col">
            <div className="flex py-3 px-2">
                <div>
                    {userDetails?.id ? (
                        <Link href={`/user-profile/${userDetails.id}`}>
                            <NextUser
                                as="button"
                                name={null}
                                description=""
                                className="transition-transform"
                                avatarProps={{
                                    src: imageLink,
                                }}
                            />
                        </Link>
                    ) : (
                        <NextUser
                            as="button"
                            name={null}
                            description=""
                            className="transition-transform"
                            avatarProps={{
                                src: imageLink,
                            }}
                        />
                    )}
                </div>
                <div className="flex flex-col w-full">
                    <Link href={`/${post?.id}`}>
                        <div className="flex items-center gap-x-2">
                            <p className="font-semibold text-lg">{username}</p>
                            <p className="text-muted">
                                {/* {JSON.stringify(post?.time)} */}
                                {/* {moment(post?.time).format('MM/DD/YYYY')} */}
                                {moment(post?.time).fromNow()}
                            </p>
                        </div>
                        <div className="flex flex-col gap-y-3">
                            {post?.text}
                            {post?.mediaLink && (
                                <Image
                                    src={post?.mediaLink}
                                    alt="Media"
                                    className="rounded-lg"
                                    height={300}
                                    width={300}
                                />
                            )}
                        </div>
                    </Link>
                    <IconSection
                        bookmarks={post?.bookmarks ? post.bookmarks : 0}
                        commentCount={
                            post?.comments?.length ? post.comments.length : 0
                        }
                        isPostComment={true}
                        likeCount={post?.likeCount ? post.likeCount : 0}
                        originalText={post?.text ? post.text : 'No text'}
                        postCreatorUsername={
                            username ? username : 'No username found'
                        }
                        postId={post?.id ? post.id : 'No id'}
                        signedInUserId={
                            userDetails
                                ? userDetails.id
                                : 'signedin user id not avaialbe'
                        }
                    />
                </div>
            </div>
            <Separator />
        </div>
    );
}
