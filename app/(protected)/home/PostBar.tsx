import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { imageLink } from '@/lib/utils';
import { TUserDetails } from '@/types';
import { Button as NextButton, User as NextUser } from '@nextui-org/react';
import { CalendarRangeIcon, Image, Smile } from 'lucide-react';

const icons = [
    {
        text: 'Image',
        icon: <Image />,
    },
    {
        text: 'Poll',
        icon: <Image />,
    },
    {
        text: 'Emoji',
        icon: <Smile />,
    },
    {
        text: 'Schedule',
        icon: <CalendarRangeIcon />,
    },
];

export default function PostBar({ userDetails }: TUserDetails) {
    return (
        <div className="flex py-3 px-2 ">
            <div>
                <NextUser
                    as="button"
                    name={null}
                    description=""
                    className="transition-transform"
                    avatarProps={{
                        src: imageLink,
                    }}
                />
            </div>
            <div className=" w-full">
                <Input
                    placeholder="What's happening today?!"
                    className="border-0 w-full mb-4"
                />
                <Separator />
                <div className="flex justify-between pt-3">
                    <div className="flex items-center gap-x-2 text-blue-600">
                        {icons.map((item) => {
                            return (
                                <div className="" key={item.text}>
                                    {item.icon}
                                </div>
                            );
                        })}
                    </div>
                    <NextButton className="bg-blue-600 text-white  rounded-full">
                        Post
                    </NextButton>
                </div>
            </div>
        </div>
    );
}
