import { getAllBookmarksPostByUserId } from '@/actions/posts';
import { validateRequest } from '@/actions/validateRequests';
import PostCard from '@/components/PostCard';
import Search from '@/components/Search';
import { ArrowLeft, EllipsisVertical } from 'lucide-react';
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
            <div className="flex justify-between mb-3 mt-2">
                <div className="flex justify-start items-center gap-x-8">
                    <Link href={'/home'}>
                        <ArrowLeft />
                    </Link>
                    <p className="text-xl font-semibold">Bookmarks</p>
                </div>
                <div className="pr-2">
                    <EllipsisVertical />
                </div>
            </div>
            <div className="px-2">
                <Search />
            </div>

            {bookmarks.map((bookmark) => {
                return (
                    <div key={bookmark.id}>
                        <PostCard
                            isEditable={false}
                            post={bookmark.post}
                            userDetails={bookmark.post.user}
                            username={bookmark.post.user.username}
                        />
                    </div>
                );
            })}
        </div>
    );
}
