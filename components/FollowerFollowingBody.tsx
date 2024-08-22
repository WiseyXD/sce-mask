'use client';
import { TFollower, TFollowing } from '@/types';
import { Tab, Tabs } from '@nextui-org/react';
import UserList from './UserList';

export default function FollowerFollowingBody({
    followers,
    followings,
}: {
    followers: TFollower[];
    followings: TFollowing[];
}) {
    let tabs = [
        {
            id: 'followers',
            label: 'Followers',
            content: <UserList users={followers} areFollowers={true} />,
        },
        {
            id: 'following',
            label: 'Following',
            content: <UserList users={followings} areFollowers={false} />,
        },
    ];

    return (
        <div>
            {' '}
            <Tabs
                aria-label="Dynamic tabs"
                items={tabs}
                variant={'underlined'}
                className="w-full flex justify-evenly items-center "
            >
                {(item: any) => (
                    <Tab key={item.id} title={item.label} className="w-full ">
                        {item.content}
                    </Tab>
                )}
            </Tabs>
        </div>
    );
}
