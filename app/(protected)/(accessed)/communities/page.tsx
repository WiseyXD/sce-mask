import { validateRequest } from '@/actions/validateRequests';
import CommunityBody from '@/components/CommunityBody';
import CommunityHeader from '@/components/CommunityHeader';

export default async function page() {
    const { user } = await validateRequest();
    return (
        <div className="min-h-screen w-full">
            <CommunityHeader userId={user?.id!} />
            <CommunityBody />
        </div>
    );
}
