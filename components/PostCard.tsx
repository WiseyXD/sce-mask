import { Separator } from '@/components/ui/separator';
import { TPost, TUserDetails } from '@/types';
import { User as NextUser } from '@nextui-org/react';

import IconSection from '@/components/IconSection';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import EditPost from './EditPost';

type TPostCardProps = {
    username: string | null | undefined;
    post: TPost;
    userDetails: TUserDetails;
    isEditable: boolean;
};

export default function PostCard({
    username,
    post,
    userDetails,
    isEditable,
}: Partial<TPostCardProps>) {
    return (
        <div className="flex flex-col">
            <div className="flex py-3 px-2">
                <div>
                    {post?.userId ? (
                        <Link href={`/user-profile/${post?.userId}`}>
                            <NextUser
                                as="button"
                                name={null}
                                description=""
                                className="transition-transform"
                                avatarProps={{
                                    src: post?.user?.image!,
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
                                src: userDetails?.image!,
                            }}
                        />
                    )}
                </div>
                <div className="flex flex-col w-full">
                    <div className="w-full flex justify-between items-center">
                        <Link href={`/${post?.id}`} className=" w-full ">
                            <div className="w-full flex justify-between items-center gap-x-2">
                                <div className="flex gap-x-2">
                                    <p className="font-semibold text-lg">
                                        {post?.user?.username}
                                    </p>
                                    <p className="dark:text-muted">
                                        {/* {moment(post?.time).format('MM/DD/YYYY')} */}
                                        {moment(post?.time).fromNow()}
                                    </p>
                                </div>
                                <p className="dark:text-muted">
                                    {/* @ts-ignore */}
                                    {post?.community?.name}
                                </p>
                            </div>
                        </Link>
                        {isEditable && (
                            <div
                                className=""
                                onClick={(e) => e.stopPropagation()}
                            >
                                <EditPost
                                    oldText={post?.text!}
                                    postId={post?.id!}
                                />
                            </div>
                        )}
                    </div>
                    <Link href={`/${post?.id}`}>
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
                        userImage={userDetails?.image!}
                        postCreatorImage={post?.user?.image!}
                    />
                </div>
            </div>
            <Separator />
        </div>
    );
}
