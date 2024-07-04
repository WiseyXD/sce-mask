import { Separator } from '@/components/ui/separator';
import { imageLink } from '@/lib/utils';
import { TPost } from '@/types';
import { User as NextUser } from '@nextui-org/react';
import { BookmarkPlus, Heart, MessagesSquare } from 'lucide-react';

const postsIcons = [
    {
        text: 'Comment',
        icon: <MessagesSquare />,
    },
    {
        text: 'Like',
        icon: <Heart />,
    },
    {
        text: 'Bookmark',
        icon: <BookmarkPlus />,
    },
];

type TPostCardProps = {
    username: string | null | undefined;
    post: TPost;
};

export default function PostCard({ username, post }: Partial<TPostCardProps>) {
    return (
        <div className="flex flex-col">
            <div className="flex py-3 px-2">
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
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <p className="font-semibold text-lg">{username}</p>
                        <p className="text-muted">
                            {JSON.stringify(post?.time)}
                        </p>
                    </div>
                    <div className="flex flex-col">
                        {post?.text}
                        {/* If Image the render it here */}
                    </div>
                    <div className="flex justify-start gap-x-3 pt-2 ">
                        {postsIcons.map((item) => {
                            return <div key={item.text}>{item.icon}</div>;
                        })}
                    </div>
                </div>
            </div>
            <Separator />
        </div>
    );
}
