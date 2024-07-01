'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TPost, TUserDetails } from '@/types';
import PostBar from './PostBar';
import Posts from './Posts';

// Fetch post of user accrording to selected tab

const feedPageOptins = [
    {
        text: 'For You',
    },
    {
        text: 'Following',
    },
    {
        text: 'Coding',
    },
    {
        text: 'Build in public',
    },
];

type TFeedProps = {
    userDetails: TUserDetails;
    posts: TPost[];
};

export default function Feed({ userDetails, posts }: TFeedProps) {
    console.log(posts);
    return (
        <div className="w-full">
            <div className="flex justify-evenly py-4 bg-opacity-50">
                {feedPageOptins.map((i) => (
                    <p key={i.text} className="font-semibold">
                        {i.text}
                    </p>
                ))}
            </div>
            <Separator />
            <ScrollArea className="flex flex-col h-[95vh]">
                <PostBar userDetails={userDetails} />
                <Separator />
                <Posts />
            </ScrollArea>
        </div>
    );
}
