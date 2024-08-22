'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FollowerFollowingHeader({
    username,
    userId,
}: {
    username: string;
    userId: string;
}) {
    return (
        <div className="flex justify-start mb-3 mt-2">
            <div className="flex justify-start items-center gap-x-8">
                <Link href={`/user-profile/${userId}/`}>
                    <ArrowLeft />
                </Link>
                <p className="text-xl font-semibold">{username}</p>
            </div>
        </div>
    );
}
