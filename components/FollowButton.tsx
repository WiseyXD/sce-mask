'use client';

import { Button as NextButton } from '@nextui-org/button';
import { useEffect, useState } from 'react';

import { followUser, isUserFollowed, unfollowUser } from '@/actions/user';
import { useToast } from './ui/use-toast';

const FollowButton = ({
    pathname,
    userId,
    followers,
}: {
    pathname: string;
    userId: string;
    followers: any;
}) => {
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
        await followUser(userId, pathname);
    }

    async function handleUnfollow() {
        await unfollowUser(userId, pathname);
    }
    return (
        <NextButton
            className={
                isFollowed
                    ? 'bg-transparent text-foreground border-default-200'
                    : 'bg-blue-600'
            }
            radius="full"
            size="sm"
            variant={isFollowed ? 'bordered' : 'solid'}
            onClick={isFollowed ? handleUnfollow : handleFollow}
        >
            {isFollowed ? 'Unfollow' : 'Follow'}
        </NextButton>
    );
};

export default FollowButton;
