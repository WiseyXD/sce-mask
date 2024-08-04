import getUserDetails from '@/actions/getUserDetails';
import { validateRequest } from '@/actions/validateRequests';

export default async function Page({ params }: { params: { postId: string } }) {
    const { postId } = params;
    const { user } = await validateRequest();
    const userDetails = await getUserDetails(user?.id);
    return (
        <div className="min-h-screen w-full">
            <p>{postId}</p>
        </div>
    );
}
