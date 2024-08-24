import { getAllCommunitiesNotFollowedOrCreatedByUser } from '@/actions/community';
import { validateRequest } from '@/actions/validateRequests';
import CommunityHeader from '@/components/CommunityHeader';
import CommunityPosts from '@/components/CommunityPosts';
import DiscoverCommunities from '@/components/DiscoverCommunities';
import { Separator } from '@/components/ui/separator';

export default async function page() {
    const { user } = await validateRequest();
    const allDiscoverableCommunities =
        await getAllCommunitiesNotFollowedOrCreatedByUser();
    if (typeof allDiscoverableCommunities.msg == 'string') {
        return <>Nothing to show on this page</>;
    }
    console.log(allDiscoverableCommunities.msg);

    return (
        <div className="min-h-screen w-full">
            <CommunityHeader userId={user?.id!} />
            <Separator />
            <CommunityPosts />
            <Separator />
            <DiscoverCommunities communities={allDiscoverableCommunities.msg} />
        </div>
    );
}
