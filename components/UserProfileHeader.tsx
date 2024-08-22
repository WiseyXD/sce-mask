'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Button as NextButton } from '@nextui-org/button';

import { followUser, isUserFollowed, unfollowUser } from '@/actions/user';
import { TFollower, TFollowing } from '@/types';
import { MessageCircleIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EditProfile from './EditProfile';
import { Separator } from './ui/separator';
import { useToast } from './ui/use-toast';

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
    const [isFollowed, setIsfollowed] = useState(false);

    const { toast } = useToast();

    useEffect(() => {
        const checkUserFollowed = async () => {
            const resp = await isUserFollowed(userId);
            if (!resp.success) {
                toast({
                    title: `Error occured while checking if user is followed or not.`,
                    variant: 'destructive',
                });
                return;
            }
            if (resp.msg === 'Not-Followed') {
                setIsfollowed(false);
                return;
            }
            setIsfollowed(true);
            return;
        };
        checkUserFollowed();
    }, [followers.length]);

    async function handleFollow() {
        console.log('Click follow');
        await followUser(userId, pathname);
    }

    async function handleUnfollow() {
        await unfollowUser(userId, pathname);
    }
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
                                <NextButton
                                    className={
                                        isFollowed
                                            ? 'bg-transparent text-foreground border-default-200'
                                            : 'bg-blue-600'
                                    }
                                    radius="full"
                                    size="sm"
                                    variant={isFollowed ? 'bordered' : 'solid'}
                                    onClick={
                                        isFollowed
                                            ? handleUnfollow
                                            : handleFollow
                                    }
                                >
                                    {isFollowed ? 'Unfollow' : 'Follow'}
                                </NextButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-20 flex-col space-y-2 px-4">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold">{username}</h2>
                    <div className="flex gap-x-2">
                        <h2
                            className="flex gap-1 cursor-pointer"
                            onClick={() =>
                                router.push(`/user-profile/${userId}/following`)
                            }
                        >
                            <span className="underline">
                                {followers.length}
                            </span>{' '}
                            <span className="">Followers</span>
                        </h2>
                        <h2
                            className="flex gap-1 cursor-pointer"
                            onClick={() =>
                                router.push(`/user-profile/${userId}/following`)
                            }
                        >
                            <span className="underline">
                                {following.length}
                            </span>{' '}
                            <span className="">Following</span>
                        </h2>
                    </div>
                </div>
                <p className="dark:text-muted-foreground">{description}</p>
            </div>
            <Separator className="my-4" />
        </>
    );
};
