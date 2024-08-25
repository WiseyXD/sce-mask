'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CreateCommunityForm from './CreateCommunityForm';

export default function CommunityHeader({ userId }: { userId: string }) {
    return (
        <div className="flex justify-between mb-3 mt-2">
            <div className="flex justify-start items-center gap-x-8">
                <Link href={'/home'}>
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <p className="text-xl font-semibold">Communities</p>
            </div>
            <div className="pr-2 cursor-pointer">
                <CreateCommunityForm userId={userId} />
            </div>
        </div>
    );
}
