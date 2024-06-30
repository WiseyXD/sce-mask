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
    // get all posts

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
