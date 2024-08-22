'use client';
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
            {users.map((user: any) => {
                return (
                    <div key={user.id}>
                        {areFollowers
                            ? user.follower.username
                            : user.following.username}
                    </div>
                );
            })}
        </div>
    );
}
