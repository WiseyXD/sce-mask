'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { TPost, TUserDetails } from '@/types';
import { Tab, Tabs } from '@nextui-org/react';
import Posts from './Posts';
import { Separator } from './ui/separator';

export const UserBody = ({
    posts,
    userDetails,
}: {
    posts: TPost[];
    userDetails: TUserDetails;
}) => {
    let tabs = [
        {
            id: 'posts',
            label: 'Posts',
            content: <Posts posts={posts} userDetails={userDetails} />,
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

export const UserHeader = ({
    username,
    image,
    description,
}: {
    username: string;
    image: string | null;
    description: string;
}) => {
    return (
        <>
            <div className="relative w-full h-40 bg-[#00b894]">
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full items-center ">
                    <div className="w-full flex items-center justify-between px-3 ">
                        <Avatar className="w-32 h-32 border-4 border-white relative z-10">
                            <AvatarImage
                                src={image ? image : undefined}
                                alt="@shadcn"
                            />
                            <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <div className="w-full flex justify-end items-center gap-2 pt-12">
                            <Button variant="ghost" size="icon">
                                <MessageCircleIcon className="" />
                                <span className="sr-only">Message</span>
                            </Button>
                            <Button
                                variant="default"
                                size="icon"
                                className="px-10 bg-blue-600 text-white rounded-full"
                            >
                                Follow
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-20 flex-col space-y-2 px-4">
                <h2 className="text-2xl font-bold">{username}</h2>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <Separator className="my-4" />
        </>
    );
};

function FileWarningIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    );
}

function HeartIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
}

function MessageCircleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    );
}

function MoveHorizontalIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="18 8 22 12 18 16" />
            <polyline points="6 8 2 12 6 16" />
            <line x1="2" x2="22" y1="12" y2="12" />
        </svg>
    );
}

function SendIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </svg>
    );
}

function StarIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}
