'use client';
import { logout } from '@/actions/logout';
import { imageLink } from '@/lib/utils';
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from '@nextui-org/react';
import Link from 'next/link';

import React from 'react';

type TUserTwitterCardProps = {
    username: string;
    userId: string;
    logoutButton: boolean;
    image: string;
    userDescription: string;
    showDescription: boolean;
    showCount: boolean;
    followerCount: number;
    followingCount: number;
};

// is followed the change state
export const UserTwitterCard = ({
    username,
    userId,
    logoutButton,
    image,
    userDescription,
    showDescription,
    showCount = true,
    followerCount = 0,
    followingCount = 0,
}: TUserTwitterCardProps) => {
    const [isFollowed, setIsFollowed] = React.useState(false);
    return (
        <Card
            shadow="none"
            className="max-w-[300px] border-none bg-transparent"
        >
            <CardHeader className="justify-between">
                <Link href={`/user-profile/${userId}`}>
                    <div className="flex gap-3">
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={image ? image : imageLink}
                        />
                        <div className="flex flex-col items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                                {username}
                            </h4>
                        </div>
                    </div>
                </Link>
                {logoutButton ? (
                    <Button
                        className={
                            'bg-gray-600 text-foreground border-default-200'
                        }
                        radius="full"
                        size="sm"
                        variant={'bordered'}
                        onClick={async () => await logout()}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        className={
                            isFollowed
                                ? 'bg-transparent text-foreground border-default-200'
                                : 'bg-blue-600'
                        }
                        radius="full"
                        size="sm"
                        variant={isFollowed ? 'bordered' : 'solid'}
                        onPress={() => setIsFollowed(!isFollowed)}
                    >
                        {isFollowed ? 'Unfollow' : 'Follow'}
                    </Button>
                )}
            </CardHeader>
            <CardBody className="px-3 py-0">
                <p className="text-small pl-px text-default-500">
                    {showDescription &&
                        (userDescription?.length < 30
                            ? userDescription
                            : userDescription?.substring(0, 30) + '...')}

                    {/* <span aria-label="confetti" role="img">
                        🎉
                    </span> */}
                </p>
            </CardBody>
            {showCount && (
                <CardFooter className="gap-3">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-600 text-small">
                            {followingCount}
                        </p>
                        <p className=" text-default-500 text-small">
                            Following
                        </p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-600 text-small">
                            {followerCount}
                        </p>
                        <p className="text-default-500 text-small">Followers</p>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
};
