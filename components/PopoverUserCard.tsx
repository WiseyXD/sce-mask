import {
    User as NextUser,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@nextui-org/react';
import { UserTwitterCard } from './UserTwitterCard';

type TPopoverUserCard = {
    username: string;
    userId: string;
    hasLogoutButton: boolean;
    image: string;
    userDescription: string;
};

export default function PopoverUserCard({
    username,
    userId,
    hasLogoutButton,
    image,
    userDescription,
}: TPopoverUserCard) {
    return (
        <Popover showArrow placement="bottom" className="w-full">
            <PopoverTrigger>
                <NextUser
                    as="button"
                    name={username}
                    description={
                        userDescription.length > 15
                            ? userDescription.substring(0, 15) + '..'
                            : userDescription
                    }
                    className="transition-transform"
                    avatarProps={{
                        src: image,

                        // src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                    }}
                />
            </PopoverTrigger>
            <PopoverContent className="p-1">
                <UserTwitterCard
                    image={image}
                    username={username}
                    userId={userId}
                    logoutButton={hasLogoutButton}
                    userDescription={userDescription}
                />
            </PopoverContent>
        </Popover>
    );
}
