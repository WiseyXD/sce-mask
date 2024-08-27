'use client';

import { followCommunity, unfollowCommunity } from '@/actions/community';
import { Button } from '@/components/ui/button';
import { TUserDetails } from '@/types';
import { Users } from 'lucide-react';
import { useState } from 'react';
import { useToast } from './ui/use-toast';

type TCommunityCardProps = {
    community: {
        id: string;
        name: string;
        description: string;
    };
    userDetails: TUserDetails;
};

export default function CommunityCard({
    community,
    userDetails,
}: TCommunityCardProps) {
    const [communityFollowed, setCommunityFollowed] = useState<boolean>(false);
    const { toast } = useToast();
    const handleJoin = async () => {
        try {
            const resp = await followCommunity(community.id);
            if (!resp.success) {
                throw new Error(resp.msg);
            }
            toast({
                title: resp.msg,
            });
            setCommunityFollowed(true);
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error occured while joining a community.',
                variant: 'destructive',
            });
        }
    };

    const handleLeave = async () => {
        try {
            const resp = await unfollowCommunity(community.id);
            if (!resp.success) {
                throw new Error(resp.msg);
            }
            toast({
                title: resp.msg,
            });
            setCommunityFollowed(false);
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error occured while leaving a community.',
                variant: 'destructive',
            });
        }
    };

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
                onClick={!communityFollowed ? handleJoin : handleLeave}
            >
                {!communityFollowed ? 'Join' : 'Leave'}
            </Button>
        </div>
    );
}
