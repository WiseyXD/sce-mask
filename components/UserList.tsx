'use client';

import { UserTwitterCard } from './UserTwitterCard';

export default function UserList({
    users,
    areFollowers,
}: {
    users: any[];
    areFollowers: boolean;
}) {
    console.log(users);
    if (users.length == 0) {
        return <div>No {areFollowers ? 'followers' : 'followings'} yet.</div>;
    }
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
                            followerCount={0}
                            followingCount={0}
                        />
                    </div>
                ))}
            {!areFollowers &&
                users.map((user) => (
                    <div key={user.following.id}>
                        <UserTwitterCard
                            image={user.following.image}
                            logoutButton={false}
                            userDescription={'null'}
                            userId={user.following.id}
                            username={user.following.username}
                            showDescription={false}
                            showCount={false}
                            followerCount={0}
                            followingCount={0}
                        />
                    </div>
                ))}
        </div>
    );
}
