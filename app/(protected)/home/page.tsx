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
        <div className="min-h-[100vh]">
            <div className="grid grid-cols-4 justify-stretch justify-items-stretch gap-x-2 min-h-screen">
                <div className="">
                    <Sidebar userDetails={userDetails} />
                </div>
                <div className="col-span-2 flex ">
                    <Separator orientation="vertical" />
                    <Feed userDetails={userDetails} />
                    <Separator orientation="vertical" />
                </div>
                <div className="">
                    <Extras userDetails={userDetails} />
                </div>
            </div>
        </div>
    );
}
