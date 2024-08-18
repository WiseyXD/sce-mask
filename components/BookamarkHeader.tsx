'use client';
import { deleteAllBookmarksByUserId } from '@/actions/posts';
import { ArrowLeft, EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { useToast } from './ui/use-toast';
export default function BookamarkHeader({
    userId,
    showDeleteButton,
}: {
    userId: string;
    showDeleteButton: boolean;
}) {
    const pathname = usePathname();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const handleDeleteBookmarks = async () => {
        try {
            startTransition(async () => {
                const resp = await deleteAllBookmarksByUserId(userId, pathname);
                if (!resp.success) {
                    toast({
                        title: `${resp.msg}`,
                        variant: 'destructive',
                    });
                    return;
                }
                toast({
                    title: `${resp.msg}`,
                });
                return;
            });
        } catch (error) {
            console.log(error);
            toast({
                title: `Error while updating post`,
                variant: 'destructive',
            });
            return;
        }
    };

    return (
        <div className="flex justify-between mb-3 mt-2">
            <div className="flex justify-start items-center gap-x-8">
                <Link href={'/home'}>
                    <ArrowLeft />
                </Link>
                <p className="text-xl font-semibold">Bookmarks</p>
            </div>
            <div className="pr-2 cursor-pointer">
                <EllipsisVertical onClick={handleDeleteBookmarks} />
            </div>
        </div>
    );
}
