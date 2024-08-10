import getUserDetails from '@/actions/getUserDetails';
import { getAllPosts } from '@/actions/posts';
import { validateRequest } from '@/actions/validateRequests';
import Feed from '@/components/Feed';

// Add Skeleton

export default async function page() {
    const { user } = await validateRequest();
    const userDetails = await getUserDetails(user?.id);

    // const posts = await db.post.findMany({
    //     include: {
    //         user: {
    //             select: {
    //                 username: true,
    //                 image: true,
    //             },
    //         },
    //         comments: true,
    //     },
    // });

    const { msg, success } = await getAllPosts();
    if (!success) {
        return <>Error occured while fetching posts from db.</>;
    }
    const posts = msg;
    return (
        <div className="flex w-full">
            {userDetails && (
                <Feed
                    userDetails={userDetails}
                    // @ts-ignore
                    posts={typeof posts != 'string' ? posts : null}
                />
            )}
        </div>
    );
}
