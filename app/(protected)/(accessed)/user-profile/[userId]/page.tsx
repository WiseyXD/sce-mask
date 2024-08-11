import { getAllPostsByUserId } from '@/actions/posts';
import getUserDetails from '@/actions/user/getUserDetails';
import { validateRequest } from '@/actions/validateRequests';
import { UserBody, UserHeader } from '@/components/UserProfile';

import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

export default async function page({ params }: { params: { userId: string } }) {
    const sessionData = await validateRequest();
    const signedInUser = sessionData.user;
    const { userId } = params;
    let isSelfProfile = false;
    const user = await getUserDetails(userId);
    const posts = await getAllPostsByUserId(userId);

    if (!user) {
        return (
            <div className="min-h-screen w-full">
                There is no user present in the DB with id - {userId} , so
                please return{' '}
                <Link className="text-blue-400 underline" href={'/home'}>
                    home
                </Link>
            </div>
        );
    }

    if (userId === signedInUser?.id) {
        isSelfProfile = true;
    }

    if (!posts.success) {
        return <>Error while fetching posts from db</>;
    }

    const sanitizedPosts = !posts.posts
        ? []
        : posts.posts.map((post: any) => ({
              ...post,
              comments: post.comments?.map((comment: any) => ({
                  ...comment,
                  text: comment.text ?? undefined, // Convert null to undefined
              })),
          }));

    return (
        <div className="min-h-screen w-full">
            <ScrollArea className="h-screen">
                <div className="flex flex-col w-full max-w-3xl mx-auto">
                    <UserHeader
                        username={user.username!}
                        image={user.image ? user.image : null}
                        description="A Fullsatck developer who can do anything related to javascript."
                        selfProfile={isSelfProfile}
                    />
                    <UserBody posts={sanitizedPosts} userDetails={user} />
                </div>
            </ScrollArea>
        </div>
    );
}
