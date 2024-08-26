'use client';

import { MessageSquare, Users } from 'lucide-react';

type CommunityPostProps = {
    title: string;
    content: string;
    communityName: string;
};

export default function CommunityPost({
    title,
    content,
    communityName,
}: CommunityPostProps) {
    return (
        <div className="bg-card rounded-lg p-4 shadow-sm w-full">
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-muted-foreground mb-3">{content}</p>
            <div className="flex items-center text-sm text-muted-foreground flex-col sm:flex-row">
                <div className="flex items-center mb-2 sm:mb-0">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="mr-4">{communityName}</span>
                </div>
                <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>12 comments</span>
                </div>
            </div>
        </div>
    );
}
