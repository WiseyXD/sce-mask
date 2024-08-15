'use client';

import { TPost, TUserDetails } from '@/types';
import { Tab, Tabs } from '@nextui-org/react';
import Posts from './Posts';

export const UserBody = ({
    posts,
    userDetails,
    selfProfile,
}: {
    posts: TPost[];
    userDetails: TUserDetails;
    selfProfile: boolean;
}) => {
    let tabs = [
        {
            id: 'posts',
            label: 'Posts',
            content: (
                <Posts
                    posts={posts}
                    userDetails={userDetails}
                    isPostEditable={selfProfile}
                />
            ),
        },
        {
            id: 'replies',
            label: 'Replies',
            content:
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
    ];
    return (
        <>
            <div className="">
                <div className="w-full flex flex-wrap ">
                    <Tabs
                        aria-label="Dynamic tabs"
                        items={tabs}
                        variant={'underlined'}
                        className="w-full flex justify-evenly items-center "
                    >
                        {(item: any) => (
                            <Tab
                                key={item.id}
                                title={item.label}
                                className="w-full "
                            >
                                {item.content}
                            </Tab>
                        )}
                    </Tabs>
                </div>
            </div>
        </>
    );
};
