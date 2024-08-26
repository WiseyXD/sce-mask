'use client';

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
};

export default function DiscoverCommunities({
    communities,
}: TDiscoverCommunitiesProps) {
    return (
        <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 pl-2">
                Discover Communities
            </h2>
            <ScrollArea className="h-[84vh]">
                <div className="space-y-4">
                    {communities.map((community) => (
                        <CommunityCard
                            key={community.id}
                            community={community}
                        />
                    ))}
                </div>
            </ScrollArea>
        </section>
    );
}
