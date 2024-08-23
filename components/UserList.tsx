'use client';

import { Separator } from './ui/separator';
import { UserTwitterCard } from './UserTwitterCard';

export default function UserList({
    users,
    areFollowers,
    followerCount,
    followingCount,
}: {
    users: any[];
    areFollowers: boolean;
    followerCount: number;
    followingCount: number;
}) {
    if (users.length == 0) {
        return <div>No {areFollowers ? 'followers' : 'followings'} yet.</div>;
    }
    console.log(followerCount, followingCount);
    return (
        <div className="w-full flex-col gap-2">
            {areFollowers &&
                users.map((user) => (
                    <div key={user.follower.id}>
                        <UserTwitterCard
                            image={user.follower.image}
                            logoutButton={false}
                            userDescription={'null'}
                            userId={user.follower.id}
                            username={user.follower.username}
                            showDescription={false}
                            showCount={false}
                            followerCount={followerCount}
                            followingCount={followingCount}
                            shortLength={false}
                        />
                        <Separator />
                    </div>
                ))}
            {!areFollowers &&
                users.map((user) => (
                    <div key={user.following.id} className="w-full">
                        <UserTwitterCard
                            image={user.following.image}
                            logoutButton={false}
                            userDescription={'null'}
                            userId={user.following.id}
                            username={user.following.username}
                            showDescription={false}
                            showCount={false}
                            followerCount={followerCount}
                            followingCount={followingCount}
                            shortLength={false}
                        />
                        <Separator />
                    </div>
                ))}
        </div>
    );
}
