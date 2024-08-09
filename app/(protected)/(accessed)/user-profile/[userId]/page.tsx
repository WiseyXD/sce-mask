import { validateRequest } from '@/actions/validateRequests';
import UserProfile from '@/components/UserProfile';

export default async function page({ params }: { params: { userId: string } }) {
    const { session, user } = await validateRequest();
    const { userId } = params;
    return (
        <div className="min-h-screen w-full">
            <UserProfile />
        </div>
    );
}
