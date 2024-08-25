import PostCard from '@/components/PostCard';
import { TPost, TUserDetails } from '@/types';

type TPostProps = {
    posts: TPost[];
    userDetails: TUserDetails;
    isPostEditable: boolean;
};

export default function Posts({
    posts,
    userDetails,
    isPostEditable,
}: TPostProps) {
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
                            isEditable={isPostEditable}
                        />
                    </div>
                );
            })}
        </div>
    );
}
