import getUserDetails from '@/actions/getUserDetails';
import { validateRequest } from '@/actions/validateRequests';
import Extras from '@/app/(protected)/home/components/extras/Extras';
import Sidebar from '@/app/(protected)/home/components/sidebar/Sidebar';
import { Separator } from '@/components/ui/separator';

export default async function Page({ params }: { params: { postId: string } }) {
    const { postId } = params;
    const { user } = await validateRequest();
    const userDetails = await getUserDetails(user?.id);
    return (
        <div className="min-h-[93vh]">
            <div className="flex lg:grid lg:grid-cols-[0.85fr_3fr_1.15fr] gap-x-3">
                <div className="">
                    <Sidebar userDetails={userDetails} />
                </div>
                <div className="flex">
                    <Separator orientation="vertical" />
                    <p>{postId}</p>
                    <Separator orientation="vertical" />
                </div>
                <div className="hidden lg:block">
                    <Extras userDetails={userDetails} />
                </div>
            </div>
        </div>
    );
}
