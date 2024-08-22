import getUserDetails from '@/actions/user';
import FollowerFollowingBody from '@/components/FollowerFollowingBody';
import FollowerFollowingHeader from '@/components/FollowerFollowingHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default async function page({ params }: { params: { userId: string } }) {
    const { userId } = params;
    const user = await getUserDetails(userId);

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

    return (
        <div className="flex-col w-full min-h-screen">
            <ScrollArea className="h-screen">
                <FollowerFollowingHeader
                    username={user.username!}
                    userId={userId}
                />
                <Separator />
                <FollowerFollowingBody
                    followers={user.followers}
                    followings={user.following}
                />
            </ScrollArea>
        </div>
    );
}
