import getUserDetails from '@/actions/getUserDetails';
import { validateRequest } from '@/actions/validateRequests';
import Extras from '@/app/(protected)/home/components/extras/Extras';
import Feed from '@/app/(protected)/home/components/feed/Feed';
import Sidebar from '@/app/(protected)/home/components/sidebar/Sidebar';
import { Separator } from '@/components/ui/separator';
import db from '@/lib/db';

// Add Skeleton adm will work

export default async function page() {
    const { user } = await validateRequest();
    const userDetails = await getUserDetails(user?.id);

    const posts = await db.post.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    image: true,
                },
            },
        },
    });

    return (
        <div className="min-h-[93vh]">
            <div className="flex lg:grid lg:grid-cols-[0.85fr_3fr_1.15fr] gap-x-3">
                <div className="">
                    <Sidebar userDetails={userDetails} />
                </div>
                <div className="flex">
                    <Separator orientation="vertical" />
                    {userDetails && (
                        <Feed userDetails={userDetails} posts={posts} />
                    )}
                    <Separator orientation="vertical" />
                </div>
                <div className="hidden lg:block">
                    <Extras userDetails={userDetails} />
                </div>
            </div>
        </div>
    );
}
