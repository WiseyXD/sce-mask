import { getPostbyId } from '@/actions/posts';
import { validateRequest } from '@/actions/validateRequests';
import CommentList from '@/components/CommentList';
import PostHero from '@/components/PostHero';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TPost } from '@/types';
import moment from 'moment';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { postId: string } }) {
    const { session, user } = await validateRequest();
    const { postId } = params;
    // @ts-ignore
    const { success, msg }: { success: boolean | string; msg: TPost } =
        await getPostbyId(postId);

    if (!success) {
        return redirect('/home');
    }

    const postCreatorData = msg.user;
    const parsedDate = moment(msg.time);
    const formattedDate = parsedDate.format('h:mm A · MMM D, YYYY');
    return (
        <div className="min-h-screen w-full">
            <ScrollArea className="w-full h-screen rounded-md ">
                <PostHero
                    msg={msg}
                    postCreator={
                        msg?.user?.username
                            ? {
                                  username: msg?.user?.username,
                                  image: msg?.user?.image ?? '',
                              }
                            : null
                    }
                    signedInUserId={user?.id!}
                />
                <Separator />

                <CommentList
                    comments={msg.comments ? msg.comments : null}
                    signedInUserId={
                        user?.id ? user?.id : 'no id of singedin user'
                    }
                />
            </ScrollArea>
        </div>
    );
}
