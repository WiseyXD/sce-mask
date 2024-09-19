import { getAllCommunitiesNotFollowedOrCreatedByUser } from '@/actions/community';
import { getAllPostsfromFollowedCommunities } from '@/actions/posts';
import getUserDetails from '@/actions/user';
import { validateRequest } from '@/actions/validateRequests';
import CommunityBody from '@/components/CommunityBody';
import CommunityHeader from '@/components/CommunityHeader';
import { Separator } from '@/components/ui/separator';

// comment added

export default async function page() {
    const { user } = await validateRequest();
    const allDiscoverableCommunities =
        await getAllCommunitiesNotFollowedOrCreatedByUser();

    const yourCommunitiesPost = await getAllPostsfromFollowedCommunities();

    const userDetails = await getUserDetails(user?.id);

    if (
        typeof allDiscoverableCommunities.msg == 'string' ||
        typeof yourCommunitiesPost.msg == 'string'
    ) {
        return <>Nothing to show on this page</>;
    }

    console.log(userDetails);

    return (
        <div className="w-full min-h-screen">
            <CommunityHeader userId={user?.id!} />
            <Separator />
            <main className="">
                <CommunityBody
                    allDiscoverableCommunities={allDiscoverableCommunities.msg}
                    // @ts-ignore
                    userDetails={userDetails!}
                    // @ts-ignore
                    yourCommunitiesPost={yourCommunitiesPost.msg}
                />
            </main>
        </div>
    );
}
