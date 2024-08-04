import getUserDetails from '@/actions/getUserDetails';
import { validateRequest } from '@/actions/validateRequests';
import Feed from '@/components/feed/Feed';
import db from '@/lib/db';

// Add Skeleton

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
        <div className="flex w-full">
            {userDetails && <Feed userDetails={userDetails} posts={posts} />}
        </div>
    );
}
