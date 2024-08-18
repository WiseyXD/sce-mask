import { ArrowLeft, EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
export default function BookamarkHeader() {
    return (
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
    );
}
