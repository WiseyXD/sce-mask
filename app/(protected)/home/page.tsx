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
            <div className="grid grid-cols-4 justify-stretch justify-items-stretch gap-x-3">
                <div className="lg:col-span-1 lg:block hidden">
                    <Sidebar userDetails={userDetails} />
                </div>
                <div className="lg:col-span-2 col-span-3 flex ">
                    <Separator orientation="vertical" />
                    <Feed userDetails={userDetails} />
                    <Separator orientation="vertical" />
                </div>
                <div className="lg:col-span-1 lg:block hidden ">
                    <Extras userDetails={userDetails} />
                </div>
            </div>
        </div>
    );
}
