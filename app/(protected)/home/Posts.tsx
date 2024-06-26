import { BookmarkPlus, Heart, MessagesSquare } from 'lucide-react';
import PostCard from './PostCard';
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
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </div>
    );
}
