'use client';

import { Users } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

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
        <div className="px-2">
            <h2 className="text-2xl font-semibold mb-4">
                Discover Communities
            </h2>
            <div className="space-y-4">
                <ScrollArea className="h-1/2">
                    {communities.map((community: any) => (
                        <div key={community.id} className="flex-col gap-2">
                            <div className="flex items-center space-x-4 bg-card rounded-lg p-4 shadow-sm">
                                <Users className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold">
                                        {community.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {community.description}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Join
                                </Button>
                            </div>
                            <Separator />
                        </div>
                    ))}
                </ScrollArea>
            </div>
        </div>
    );
}
