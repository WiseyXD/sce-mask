import PostCard from '@/app/(protected)/home/components/feed/PostCard';
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
    console.log(userDetails);
    console.log(posts);
    return (
        <div className="">
            {/* posts map */}
            {posts.map((post) => {
                return (
                    <div key={post.id}>
                        <PostCard
                            username={userDetails?.username}
                            post={post}
                        />
                    </div>
                );
            })}
            {/* <PostCard username={'null'} />
            <PostCard username={'null'} />
            <PostCard username={'null'} />
            <PostCard username={'null'} />
            <PostCard username={'null'} />
            <PostCard username={'null'} />
            <PostCard username={'null'} />
            <PostCard username={'null'} /> */}
        </div>
    );
}
