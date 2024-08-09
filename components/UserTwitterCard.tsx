'use client';
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
};

// is followed the change state
export const UserTwitterCard = ({
    username,
    userId,
}: TUserTwitterCardProps) => {
    const [isFollowed, setIsFollowed] = React.useState(false);
    return (
        <Link href={`/user-profile/${userId}`}>
            <Card
                shadow="none"
                className="max-w-[300px] border-none bg-transparent"
            >
                <CardHeader className="justify-between">
                    <div className="flex gap-3">
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={imageLink}
                        />
                        <div className="flex flex-col items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                                {username}
                            </h4>
                            <h5 className="text-small tracking-tight text-default-500">
                                @
                            </h5>
                        </div>
                    </div>
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
                </CardHeader>
                <CardBody className="px-3 py-0">
                    <p className="text-small pl-px text-default-500">
                        Full-stack developer, @getnextui lover she/her
                        <span aria-label="confetti" role="img">
                            🎉
                        </span>
                    </p>
                </CardBody>
                <CardFooter className="gap-3">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-600 text-small">
                            4
                        </p>
                        <p className=" text-default-500 text-small">
                            Following
                        </p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-600 text-small">
                            97.1K
                        </p>
                        <p className="text-default-500 text-small">Followers</p>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};
