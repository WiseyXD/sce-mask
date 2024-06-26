import { AcmeLogo } from '@/components/AcmeLogo';
import { UserTwitterCard } from '@/components/UserTwitterCard';
import { imageLink } from '@/lib/utils';
import { TUserDetails } from '@/types';
import {
    Button as NextButton,
    User as NextUser,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@nextui-org/react';
import {
    Book,
    BookMarked,
    Home,
    Mail,
    Search,
    User,
    UserRound,
} from 'lucide-react';

const sidebarMenu = [
    {
        icon: <Home />,
        text: 'Home',
    },
    {
        icon: <Search />,
        text: 'Explore',
    },
    {
        icon: <Mail />,
        text: 'Messages',
    },
    {
        icon: <UserRound />,
        text: 'Communities',
    },
    {
        icon: <User />,
        text: 'Profile',
    },
    {
        icon: <BookMarked />,
        text: 'Bookmarks',
    },
    {
        icon: <Book />,
        text: 'More',
    },
];

type SidebarProps = {
    userDetails: TUserDetails;
};

export default function Sidebar({ userDetails }: TUserDetails) {
    return (
        <div className="flex flex-col justify-center items-start gap-y-10 ">
            <div className="flex justify-center ">
                <AcmeLogo />
            </div>
            {sidebarMenu.map((item) => {
                return (
                    <div
                        className="flex gap-x-4 text-2xl justify-center items-center  hover:bg-gray-700 hover:rounded-full hover:px-2 hover : py-3 ease-in-out duration-300"
                        key={item.text}
                    >
                        {item.icon}
                        <h2>{item.text}</h2>
                    </div>
                );
            })}
            <NextButton className="bg-blue-600 text-white w-full rounded-full">
                Post
            </NextButton>
            <Popover showArrow placement="bottom" className="w-full">
                <PopoverTrigger>
                    <NextUser
                        as="button"
                        name={userDetails?.username}
                        description="Product Designer"
                        className="transition-transform"
                        avatarProps={{
                            src: imageLink,

                            // src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                        }}
                    />
                </PopoverTrigger>
                <PopoverContent className="p-1">
                    <UserTwitterCard />
                </PopoverContent>
            </Popover>
        </div>
    );
}