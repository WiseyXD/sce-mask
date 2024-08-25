'use client';
import { TPost, TUserDetails } from '@/types';
import Posts from './Posts';

type TPostsFromCommunitiesProps = {
    posts: TPost[];
    userDetails: TUserDetails;
};

export default function PostsFromCommunities({
    posts,
    userDetails,
}: TPostsFromCommunitiesProps) {
    return (
        <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 pl-2">
                Posts from Your Communities
            </h2>
            <div className="space-y-4 md:space-y-6">
                {/* {posts.map((post) => {
                    return (
                        <PostCard
                            key={post.id}
                            post={post}
                            username={post.user?.username}
                            userDetails={post?.user!}
                            isEditable={false}
                        />
                    );
                })} */}
                <Posts
                    isPostEditable={false}
                    posts={posts}
                    userDetails={userDetails}
                />
            </div>
        </section>
    );
}
