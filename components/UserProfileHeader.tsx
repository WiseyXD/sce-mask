'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { TFollower, TFollowing } from '@/types';
import { MessageCircleIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import EditProfile from './EditProfile';
import FollowButton from './FollowButton';
import { Separator } from './ui/separator';

export const UserHeader = ({
    username,
    image,
    description,
    selfProfile,
    userId,
    followers,
    following,
}: {
    username: string;
    image: string | null;
    description: string;
    selfProfile: boolean;
    userId: string;
    followers: TFollower[];
    following: TFollowing[];
}) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
            <div className="relative w-full h-40 bg-[#00b894]">
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full items-center ">
                    <div className="w-full flex items-center justify-between px-3 ">
                        <Avatar className="w-32 h-32 border-4 border-white relative z-10">
                            <AvatarImage
                                src={image ? image : undefined}
                                alt="@shadcn"
                            />
                            <AvatarFallback>
                                {username.substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        {selfProfile ? (
                            <div className="w-full flex justify-end items-center gap-2 pt-12">
                                <Button variant="ghost" size="icon">
                                    <EditProfile
                                        oldUsername={username}
                                        oldImage={image!}
                                        oldDescription={description}
                                        userId={userId}
                                    />
                                    <span className="sr-only">Edit</span>
                                </Button>
                            </div>
                        ) : (
                            <div className="w-full flex justify-end items-center gap-2 pt-12">
                                <Button variant="ghost" size="icon">
                                    <MessageCircleIcon className="" />
                                    <span className="sr-only">Message</span>
                                </Button>

                                <FollowButton
                                    userId={userId}
                                    pathname={pathname}
                                    followers={followers.length}
                                    following={following.length}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-20 flex-col space-y-2 px-4">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold">{username}</h2>
                    <div className="flex gap-x-2">
                        <div
                            className="flex gap-1 cursor-pointer"
                            onClick={() =>
                                router.push(`/user-profile/${userId}/following`)
                            }
                        >
                            <p className="font-semibold text-default-600 text-small">
                                {followers.length}
                            </p>
                            <p className=" text-default-500 text-small">
                                Follower
                            </p>
                        </div>
                        <div
                            className="flex gap-1 cursor-pointer"
                            onClick={() =>
                                router.push(`/user-profile/${userId}/following`)
                            }
                        >
                            <p className="font-semibold text-default-600 text-small">
                                {following.length}
                            </p>
                            <p className=" text-default-500 text-small">
                                Following
                            </p>
                        </div>
                    </div>
                </div>
                <p className="dark:text-muted-foreground">{description}</p>
            </div>
            <Separator className="my-4" />
        </>
    );
};
