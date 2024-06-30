import { AcmeLogo } from '@/components/AcmeLogo';
import PopoverUserCard from '@/components/PopoverUserCard';
import { TUserDetails } from '@/types';
import { Button as NextButton } from '@nextui-org/react';
import {
    Book,
    BookMarked,
    FeatherIcon,
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

// test commit

export default function Sidebar({ userDetails }: TUserDetails) {
    return (
        <div className="flex flex-col justify-center items-start gap-y-10 ">
            <div className="flex justify-center ">
                <AcmeLogo />
            </div>
            <div className="flex flex-col gap-y-3 items-start">
                {sidebarMenu.map((item) => {
                    return (
                        <div
                            className="flex gap-x-4 text-2xl justify-center items-center  hover:bg-gray-700 hover:rounded-full hover:cursor-pointer  px-2 py-3 ease-in-out duration-300"
                            key={item.text}
                        >
                            {item.icon}
                            <div className="lg:block hidden">
                                <h2>{item.text}</h2>
                            </div>
                        </div>
                    );
                })}
                <div className="lg:hidden block px-2 py-3  hover:bg-gray-700 hover:rounded-full ease-in-out duration-300">
                    <FeatherIcon className="text-blue-600" />
                </div>
            </div>
            <NextButton className="hidden lg:block bg-blue-600 text-white w-full rounded-full ">
                Post
            </NextButton>
            <div className="lg:block hidden">
                <PopoverUserCard username={userDetails?.username!} />
            </div>
        </div>
    );
}
