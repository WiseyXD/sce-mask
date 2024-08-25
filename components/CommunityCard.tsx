'use client';

import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

type TCommunityCardProps = {
    community: {
        id: string;
        name: string;
        description: string;
    };
};

export default function CommunityCard({ community }: TCommunityCardProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 bg-card rounded-lg p-4 shadow-sm">
            <Users className="h-6 w-6 text-muted-foreground" />
            <div className="flex-grow">
                <h3 className="font-semibold text-base md:text-lg">
                    {community.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {community.description}
                </p>
            </div>
            <Button
                variant="outline"
                size="sm"
                className="self-start md:self-center"
            >
                Join
            </Button>
        </div>
    );
}
