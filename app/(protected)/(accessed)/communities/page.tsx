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
import { getAllPosts } from '@/actions/posts';
import getUserDetails from '@/actions/user';
import { validateRequest } from '@/actions/validateRequests';
import CommunityBody from '@/components/CommunityBody';
import CommunityHeader from '@/components/CommunityHeader';
import { Separator } from '@/components/ui/separator';

export default async function page() {
    const { user } = await validateRequest();
    const allDiscoverableCommunities =
        await getAllCommunitiesNotFollowedOrCreatedByUser();

    const yourCommunitiesPost = await getAllPosts();

    const userDetails = await getUserDetails(user?.id);

    if (
        typeof allDiscoverableCommunities.msg == 'string' ||
        typeof yourCommunitiesPost.msg == 'string'
    ) {
        return <>Nothing to show on this page</>;
    }

    return (
        <div className="w-full min-h-screen">
            <CommunityHeader userId={user?.id!} />
            <Separator />
            <main className="">
                <CommunityBody
                    allDiscoverableCommunities={allDiscoverableCommunities.msg}
                    userDetails={userDetails!}
                    // @ts-ignore
                    yourCommunitiesPost={yourCommunitiesPost.msg}
                />
            </main>
        </div>
    );
}
