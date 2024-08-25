'use client';

import CommunityPost from './CommunityPost';

type TPostsFromCommunitiesProps = {
    posts: {
        id: string;
        title: string;
        content: string;
        communityName: string;
    }[];
};

export default function PostsFromCommunities({
    posts,
}: TPostsFromCommunitiesProps) {
    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">
                Posts from Your Communities
            </h2>
            <div className="space-y-6">
                {posts.map((post) => (
                    <CommunityPost key={post.id} {...post} />
                ))}
            </div>
        </section>
    );
}
