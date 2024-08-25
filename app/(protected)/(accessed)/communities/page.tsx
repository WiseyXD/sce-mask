const communities = [
    {
        id: 1,
        name: 'Tech Enthusiasts',
        description: 'A community for tech lovers.',
    },
    {
        id: 2,
        name: 'Design Gurus',
        description: 'Join the best designers here.',
    },
    {
        id: 3,
        name: 'Startup Founders',
        description: 'For aspiring and established entrepreneurs.',
    },
    // Add more communities as needed
];

const posts = [
    {
        id: '1',
        title: 'New React 18 features',
        content: "Let's discuss the new features in React 18...",
        communityName: 'React Developers',
    },
    {
        id: '2',
        title: 'Designing for accessibility',
        content: 'Tips for making your designs more accessible...',
        communityName: 'UI/UX Designers',
    },
];
import { getAllCommunitiesNotFollowedOrCreatedByUser } from '@/actions/community';
import { validateRequest } from '@/actions/validateRequests';
import CommunityHeader from '@/components/CommunityHeader';
import DiscoverCommunities from '@/components/DiscoverCommunities';
import PostsFromCommunities from '@/components/PostFromYourCommunities';
import { Separator } from '@/components/ui/separator';

export default async function page() {
    const { user } = await validateRequest();
    const allDiscoverableCommunities =
        await getAllCommunitiesNotFollowedOrCreatedByUser();
    if (typeof allDiscoverableCommunities.msg == 'string') {
        return <>Nothing to show on this page</>;
    }

    return (
        <div className="w-full min-h-screen">
            <CommunityHeader userId={user?.id!} />
            <Separator />
            <main className="container mx-auto px-4 space-y-12">
                <DiscoverCommunities
                    communities={allDiscoverableCommunities.msg}
                />
                <Separator />

                <PostsFromCommunities posts={posts} />
            </main>
        </div>
        // {/* <CommunityHeader userId={user?.id!} />
        // <Separator />
        // <CommunityPosts />
        // <Separator />
        // <DiscoverCommunities communities={allDiscoverableCommunities.msg} /> */}
    );
}
