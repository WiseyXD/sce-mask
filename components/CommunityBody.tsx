'use client';

import DiscoverCommunities from '@/components/DiscoverCommunities';
import PostsFromCommunities from '@/components/PostFromYourCommunities';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TPost, TUserDetails } from '@/types';
import { Tab, Tabs } from '@nextui-org/react';

type TCommunityBodyProps = {
    allDiscoverableCommunities: {
        id: string;
        name: string;
        description: string;
        creatorId: string;
        createdAt: Date;
    }[];

    userDetails: TUserDetails;
    yourCommunitiesPost: TPost[];
};

export default function CommunityBody({
    allDiscoverableCommunities,
    userDetails,
    yourCommunitiesPost,
}: TCommunityBodyProps) {
    let tabs = [
        {
            id: 'postFromYourCommunities',
            label: 'Communities Post',
            content: (
                <PostsFromCommunities
                    posts={yourCommunitiesPost}
                    userDetails={userDetails!}
                />
            ),
        },
        {
            id: 'discover',
            label: 'Discover Communities',
            content: (
                <DiscoverCommunities
                    communities={allDiscoverableCommunities}
                    userDetails={userDetails!}
                />
            ),
        },
    ];
    return (
        <ScrollArea className="max-h-full">
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
        </ScrollArea>
    );
}
