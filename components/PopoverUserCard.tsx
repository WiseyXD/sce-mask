import { imageLink } from '@/lib/utils';
import {
    User as NextUser,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@nextui-org/react';
import { UserTwitterCard } from './UserTwitterCard';

type TPopoverUserCard = {
    username: string;
};

export default function PopoverUserCard({ username }: TPopoverUserCard) {
    return (
        <Popover showArrow placement="bottom" className="w-full">
            <PopoverTrigger>
                <NextUser
                    as="button"
                    name={'Username'}
                    description="Full-Stack Developer"
                    className="transition-transform "
                    avatarProps={{
                        src: imageLink,

                        // src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                    }}
                />
            </PopoverTrigger>
            <PopoverContent className="p-1">
                <UserTwitterCard username={username} />
            </PopoverContent>
        </Popover>
    );
}
