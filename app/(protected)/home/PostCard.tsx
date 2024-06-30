import { Separator } from '@/components/ui/separator';
import { imageLink } from '@/lib/utils';
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

type TPostCard = {
    username: string;
};

export default function PostCard({ username }: TPostCard) {
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
                        <p className="text-muted">Time</p>
                    </div>
                    <div className="flex flex-col">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. A, odit iste. Sequi placeat facilis tempore nisi
                        exercitationem, repellendus voluptates laboriosam
                        aliquam, eius est officiis a odio sed harum omnis
                        commodi.
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
