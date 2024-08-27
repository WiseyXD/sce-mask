'use client';

import { TUserDetails } from '@/types';
import CommunityCard from './CommunityCard';
import { ScrollArea } from './ui/scroll-area';

type TDiscoverCommunitiesProps = {
    communities: {
        id: string;
        name: string;
        description: string;
        creatorId: string;
        createdAt: Date;
    }[];
    userDetails: TUserDetails;
};

export default function DiscoverCommunities({
    communities,
    userDetails,
}: TDiscoverCommunitiesProps) {
    return (
        <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 pl-2">
                Discover Communities
            </h2>
            <ScrollArea className="h-[84vh]">
                <div className="space-y-4 ">
                    {communities.length === 0 ? (
                        <div className="pl-2">No new community to join.</div>
                    ) : (
                        communities.map((community) => (
                            <CommunityCard
                                key={community.id}
                                community={community}
                                userDetails={userDetails}
                            />
                        ))
                    )}
                </div>
            </ScrollArea>
        </section>
    );
}
