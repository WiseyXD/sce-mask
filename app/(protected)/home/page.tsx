import getUserDetails from '@/actions/getUserDetails';
import { validateRequest } from '@/actions/validateRequests';
import { Separator } from '@/components/ui/separator';
import Extras from './Extras';
import Feed from './Feed';
import Sidebar from './Sidebar';

// Add Skeleton and pass the userDetaisl to all other props
export default async function page() {
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
                    <Feed userDetails={userDetails} />
                    <Separator orientation="vertical" />
                </div>
                <div className="hidden lg:block">
                    <Extras userDetails={userDetails} />
                </div>
            </div>
        </div>
    );
}
