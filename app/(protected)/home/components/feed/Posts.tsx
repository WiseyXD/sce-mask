import PostCard from '@/app/(protected)/home/components/feed/PostCard';
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

export default function Posts() {
    return (
        <div className="">
            {/* posts map */}
            <PostCard username={'null'} />
            <PostCard username={'null'} />
            <PostCard username={'null'} />
            <PostCard username={'null'} />
            <PostCard username={'null'} />
            <PostCard username={'null'} />
            <PostCard username={'null'} />
            <PostCard username={'null'} />
            <PostCard username={'null'} />
        </div>
    );
}
