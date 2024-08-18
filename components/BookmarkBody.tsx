'use client';

import PostCard from '@/components/PostCard';
import Search from '@/components/Search';
import { TBookmark } from '@/types';
import { useState } from 'react';

type TBookmarkBodyProps = {
    bookmarks: TBookmark[];
};

export default function BookmarkBody({ bookmarks }: TBookmarkBodyProps) {
    const [filteredBookmarks, setFilteredBookmarks] = useState(bookmarks);

    // useEffect(() => {
    //     if (filteredBookmarks.length == 0) {
    //         setFilteredBookmarks(bookmarks);
    //     }
    // }, [filteredBookmarks, setFilteredBookmarks]);

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
