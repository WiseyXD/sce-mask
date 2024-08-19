import { AcmeLogo } from '@/components/AcmeLogo';
import PostBar from '@/components/PostBar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { TUserDetails } from '@/types';
import { Button as NextButton } from '@nextui-org/react';
import {
    Book,
    BookMarked,
    FeatherIcon,
    Home,
    Mail,
    Search,
    Settings,
    User,
    UserRound,
} from 'lucide-react';
import Link from 'next/link';
import PopoverUserCard from './PopoverUserCard';

type SidebarProps = {
    userDetails: TUserDetails;
};

type TSidebarProps = {
    userDetails: TUserDetails;
};

export default function Sidebar({ userDetails }: TSidebarProps) {
    const sidebarMenu = [
        {
            icon: <Home />,
            text: 'Home',
            path: '/home',
        },
        {
            icon: <Search />,
            text: 'Explore',
            path: '#',
        },
        {
            icon: <Mail />,
            text: 'Messages',
            path: '#',
        },
        {
            icon: <UserRound />,
            text: 'Communities',
            path: '#',
        },
        {
            icon: <User />,
            text: 'Profile',
            path: `/user-profile/${userDetails?.id}`,
        },
        {
            icon: <BookMarked />,
            text: 'Bookmarks',
            path: '/bookmarks',
        },
        {
            icon: <Book />,
            text: 'More',
            path: '#',
        },
        {
            icon: <Settings />,
            text: 'Settings',
            path: '/settings',
        },
    ];
    return (
        <div className="flex flex-col justify-center items-start gap-y-10 ">
            <div className="flex justify-center ">
                <AcmeLogo />
            </div>
            <div className="flex flex-col gap-y-3 items-start">
                {sidebarMenu.map((item) => {
                    return (
                        <Link href={item.path} key={item.text}>
                            <div className="flex gap-x-4 text-2xl justify-center items-center  hover:bg-gray-700 hover:rounded-full hover:cursor-pointer  px-2 py-3 ease-in-out duration-300">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            {item.icon}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{item.text}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <div className="lg:block hidden">
                                    <h2>{item.text}</h2>
                                </div>
                            </div>
                        </Link>
                    );
                })}

                <Dialog>
                    <DialogTrigger asChild>
                        <div className="lg:hidden block px-2 py-3  hover:bg-gray-700 hover:rounded-full ease-in-out duration-300 cursor-pointer">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {' '}
                                        <FeatherIcon className="text-blue-600" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Post</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg lg:max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>Create new post.</DialogTitle>
                            <DialogDescription>
                                Be anoynomous.
                            </DialogDescription>
                        </DialogHeader>
                        <PostBar userDetails={userDetails} />
                    </DialogContent>
                </Dialog>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <NextButton className="hidden lg:block bg-blue-600 dark:text-white w-full rounded-full ">
                        Post
                    </NextButton>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Create new post.</DialogTitle>
                        <DialogDescription>Be anoynomous.</DialogDescription>
                    </DialogHeader>
                    <PostBar userDetails={userDetails} />
                </DialogContent>
            </Dialog>

            <div className="hidden lg:block">
                <PopoverUserCard
                    username={userDetails?.username!}
                    image={userDetails?.image!}
                    userId={userDetails?.id!}
                    hasLogoutButton={true}
                    userDescription={userDetails?.description!}
                />
            </div>
        </div>
    );
}
