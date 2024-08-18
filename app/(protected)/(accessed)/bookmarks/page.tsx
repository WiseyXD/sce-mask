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
            <>
                No Bookmarks done yet , go to<Link href={'/home'}>home</Link>{' '}
                and bookmark some relevant posts.
            </>
        );
    }
    console.log(bookmarks);
    return (
        <div className="flex-col w-full min-h-screen">
            <BookamarkHeader userId={user?.id!} showDeleteButton={true} />
            <BookmarkBody bookmarks={bookmarks} />
        </div>
    );
}
