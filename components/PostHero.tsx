'use client';
import { TPost } from '@/types';
import moment from 'moment';

import IconSection from '@/components/IconSection';
import { Separator } from '@/components/ui/separator';
import { Avatar, Button, Card, CardHeader } from '@nextui-org/react';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type TPostHeroProps = {
    msg: TPost;
    postCreator: {
        username: string;
        image: string;
    } | null;
    signedInUserId: string;
    userImage: string;
};

export default function PostHero({
    msg,
    postCreator,
    signedInUserId,
    userImage,
}: TPostHeroProps) {
    const [isFollowed, setIsFollowed] = useState(false);
    if (signedInUserId == null) {
        return <>User not present</>;
    }
    const postCreatorData = msg.user;
    const parsedDate = moment(msg.time);
    const formattedDate = parsedDate.format('h:mm A · MMM D, YYYY');
    return (
        <div className="flex flex-col py-4 px-3 gap-y-4">
            <div className="flex justify-start items-center gap-x-8">
                <Link href={'/home'}>
                    <ArrowLeft />
                </Link>
                <p className="text-2xl font-semibold">Post</p>
            </div>
            <div className="">
                <Card
                    shadow="none"
                    className="w-full border-none bg-transparent"
                >
                    <CardHeader className="justify-between">
                        <div className="flex gap-3">
                            <Avatar
                                isBordered
                                radius="full"
                                size="md"
                                src={postCreator?.image}
                            />
                            <div className="flex flex-col items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">
                                    {postCreatorData?.username}
                                </h4>
                            </div>
                        </div>

                        {msg.userId != signedInUserId && (
                            <Button
                                className={
                                    isFollowed
                                        ? 'bg-transparent text-foreground border-default-200'
                                        : 'bg-blue-600'
                                }
                                radius="full"
                                size="sm"
                                variant={isFollowed ? 'bordered' : 'solid'}
                                onPress={() => setIsFollowed(!isFollowed)}
                            >
                                {isFollowed ? 'Unfollow' : 'Follow'}
                            </Button>
                        )}
                        {/* @ts-ignore */}
                        {msg?.community?.name && (
                            <p className="dark:text-muted text-small">
                                {/* @ts-ignore */}
                                {msg?.community?.name}
                            </p>
                        )}
                    </CardHeader>
                </Card>
            </div>
            <div className="flex-col">
                <div>
                    <h4 className="text-lg leading-none dark:text-white">
                        {msg.text}
                    </h4>
                </div>
                {msg.mediaLink && (
                    <div className=" flex justify-center mt-3 mb-2">
                        <Image
                            src={msg?.mediaLink}
                            alt="Media"
                            className="rounded-lg"
                            sizes="100vw"
                            style={{
                                width: '70%',
                                height: '30%',
                            }}
                            width={500}
                            height={300}
                        />
                    </div>
                )}
            </div>
            <div>
                <p className="dark:text-muted text-small">{formattedDate}</p>
            </div>
            <Separator />

            <IconSection
                bookmarks={msg.bookmarks ? msg.bookmarks : 0}
                commentCount={msg.comments?.length ? msg.comments.length : 0}
                isPostComment={true}
                likeCount={msg.likeCount ? msg.likeCount : 0}
                originalText={msg.text}
                postCreatorUsername={
                    postCreatorData?.username
                        ? postCreatorData.username
                        : 'No username found'
                }
                postId={msg.id ? msg.id : 'No id'}
                signedInUserId={
                    signedInUserId
                        ? signedInUserId
                        : 'signedin user id not avaialbe'
                }
                userImage={userImage}
                postCreatorImage={postCreatorData?.image!}
            />
        </div>
    );
}
