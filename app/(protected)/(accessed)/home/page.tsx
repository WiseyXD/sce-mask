import { getAllPosts } from '@/actions/posts';
import getUserDetails from '@/actions/user';
import { validateRequest } from '@/actions/validateRequests';
import Feed from '@/components/Feed';

export default async function page() {
    const { user } = await validateRequest();
    const userDetails = await getUserDetails(user?.id);
    const { msg, success } = await getAllPosts();
    if (!success) {
        return <>Error occured while fetching posts from db.</>;
    }

    if (!userDetails) {
        return <>No user details found</>;
    }
    const posts = msg;
    return (
        <div className="flex w-full">
            {userDetails && (
                <Feed
                    userDetails={userDetails!}
                    // @ts-ignore
                    posts={typeof posts != 'string' ? posts : null}
                />
            )}
        </div>
    );
}
