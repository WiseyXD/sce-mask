import { AcmeLogo } from '@/components/AcmeLogo';
import PopoverUserCard from '@/components/PopoverUserCard';
import { TUserDetails } from '@/types';
import { Button as NextButton } from '@nextui-org/react';
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
            <PopoverUserCard username={userDetails?.username!} />
        </div>
    );
}
