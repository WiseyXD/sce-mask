import getUserDetails from '@/actions/getUserDetails';
import { validateRequest } from '@/actions/validateRequests';
import Extras from './Extras';
import Feed from './Feed';
import Sidebar from './Sidebar';

// Add Skeleton and pass the userDetaisl to all other props
export default async function page() {
    const { user } = await validateRequest();
    const userDetails = await getUserDetails(user?.id);
    return (
        <div className="min-h-[93vh]">
            <div className="grid grid-cols-4 justify-stretch justify-items-stretch gap-x-2 ">
                <div className="">
                    <Sidebar />
                </div>
                <div className=" col-span-2 0">
                    <Feed />
                </div>
                <div className="">
                    <Extras />
                </div>
            </div>
        </div>
    );
}
