import PostCard from '@/components/PostCard';
import { TPost, TUserDetails } from '@/types';
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

type TPostProps = {
    posts: TPost[];
    userDetails: TUserDetails;
};

export default function Posts({ posts, userDetails }: TPostProps) {
    if (posts.length === 0) return 'No Posts in DB';
    return (
        <div className="">
            {/* posts map */}
            {posts.map((post) => {
                return (
                    <div key={post.id}>
                        <PostCard
                            username={post?.user?.username}
                            post={post}
                            userDetails={userDetails}
                        />
                    </div>
                );
            })}
        </div>
    );
}
