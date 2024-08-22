import { getAllBookmarksPostByUserId } from '@/actions/posts';
import { validateRequest } from '@/actions/validateRequests';
import BookamarkHeader from '@/components/BookamarkHeader';
import BookmarkBody from '@/components/BookmarkBody';
import Link from 'next/link';

export default async function page() {
    const { user } = await validateRequest();
    const resp = await getAllBookmarksPostByUserId(user?.id!);
    if (!resp.success) {
        return <>{resp.msg}</>;
    }
    if (typeof resp.msg == 'string') {
        return <>{resp.msg}</>;
    }
    const bookmarks = resp.msg;
    if (bookmarks.length == 0) {
        return (
            <div className="flex-col w-full min-h-screen">
                No Bookmarks done yet , go to{' '}
                <Link href={'/home'} className="underline text-blue-600">
                    home
                </Link>{' '}
                and bookmark some relevant posts.
            </div>
        );
    }

    return (
        <div className="flex-col w-full min-h-screen">
            <BookamarkHeader userId={user?.id!} showDeleteButton={true} />
            {/* @ts-ignore */}
            <BookmarkBody bookmarks={bookmarks} />
        </div>
    );
}
