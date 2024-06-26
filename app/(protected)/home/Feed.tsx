import { Separator } from '@/components/ui/separator';
import { TUserDetails } from '@/types';
import PostBar from './PostBar';
import Posts from './Posts';

const feedPageOptins = [
    {
        text: 'For You',
    },
    {
        text: 'Following',
    },
    {
        text: 'Coding',
    },
    {
        text: 'Build in public',
    },
];

export default function Feed({ userDetails }: TUserDetails) {
    return (
        <div className=" w-full">
            <div className="flex justify-evenly py-3">
                {feedPageOptins.map((i) => (
                    <p key={i.text}>{i.text}</p>
                ))}
            </div>
            <Separator />
            <PostBar userDetails={userDetails} />
            <Separator />
            <Posts />
        </div>
    );
}
