'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { Edit3, MessageCircleIcon } from 'lucide-react';
import { Separator } from './ui/separator';

export const UserHeader = ({
    username,
    image,
    description,
    selfProfile,
}: {
    username: string;
    image: string | null;
    description: string;
    selfProfile: boolean;
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
                            <AvatarFallback>
                                {username.substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        {selfProfile ? (
                            <div className="w-full flex justify-end items-center gap-2 pt-12">
                                <Button variant="ghost" size="icon">
                                    <Edit3 className="" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                            </div>
                        ) : (
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
                        )}
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
