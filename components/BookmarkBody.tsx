'use client';

import PostCard from '@/components/PostCard';
import Search from '@/components/Search';
import { TBookmark } from '@/types';
import { useEffect, useState } from 'react';

type TBookmarkBodyProps = {
    bookmarks: TBookmark[];
};

export default function BookmarkBody({ bookmarks }: TBookmarkBodyProps) {
    const [filteredBookmarks, setFilteredBookmarks] = useState(bookmarks);

    useEffect(() => {
        setFilteredBookmarks(bookmarks);
    }, [bookmarks]);

    // has to work on revalidate the post card page in bookmarks

    return (
        <>
            <div className="px-2">
                <Search
                    setFunction={setFilteredBookmarks}
                    oldItem={bookmarks}
                />
            </div>

            {filteredBookmarks.map((bookmark) => {
                return (
                    <div key={bookmark.id}>
                        <PostCard
                            isEditable={false}
                            post={bookmark.post}
                            // @ts-ignore
                            userDetails={bookmark.post.user}
                            username={bookmark?.post?.user?.username!}
                        />
                    </div>
                );
            })}
        </>
    );
}
