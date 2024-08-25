'use client';

import { Users } from 'lucide-react';
import { Button } from './ui/button';

type CommunityCardProps = {
    id: string;
    name: string;
    description: string;
};

export default function CommunityCard({
    name,
    description,
}: CommunityCardProps) {
    return (
        <div className="flex items-start space-x-4 bg-card rounded-lg p-4 shadow-sm flex-col sm:flex-row w-full">
            <Users className="h-6 w-6 text-muted-foreground flex-shrink-0" />
            <div className="flex-grow">
                <h3 className="font-semibold text-lg sm:text-base">{name}</h3>
                <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
                    {description}
                </p>
            </div>
            <Button variant="outline" size="sm" className="mt-4 sm:mt-0">
                Join
            </Button>
        </div>
    );
}
