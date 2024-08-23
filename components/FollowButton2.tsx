import { Button as NextButton } from '@nextui-org/button';
import { useState } from 'react';
import { followUser, isUserFollowed, unfollowUser } from '../actions/user';
import { useToast } from './ui/use-toast';

async function FollowButton2({
    pathname,
    userId,
    isInitiallyFollowed,
}: {
    pathname: string;
    userId: string;
    isInitiallyFollowed: boolean;
}) {
    const [isFollowed, setIsfollowed] = useState(isInitiallyFollowed);
    const { toast } = useToast();

    async function handleFollow(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const resp = await followUser(userId, pathname);
        if (resp.success) {
            setIsfollowed(true);
        } else {
            toast({
                title: `Error occurred while following the user.`,
                variant: 'destructive',
            });
        }
    }

    async function handleUnfollow(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const resp = await unfollowUser(userId, pathname);
        if (resp.success) {
            setIsfollowed(false);
        } else {
            toast({
                title: `Error occurred while unfollowing the user.`,
                variant: 'destructive',
            });
        }
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
            type="button"
        >
            {isFollowed ? 'Unfollow' : 'Follow'}
        </NextButton>
    );
}

// Server-side function to fetch the data
export async function getServerSideProps({ params }: { params: any }) {
    const userId = params.userId;
    const response = await isUserFollowed(userId);

    if (!response.success) {
        return {
            props: {
                isInitiallyFollowed: false, // handle the error case
            },
        };
    }

    return {
        props: {
            isInitiallyFollowed: response.msg !== 'Not-Followed',
        },
    };
}

export default FollowButton2;
