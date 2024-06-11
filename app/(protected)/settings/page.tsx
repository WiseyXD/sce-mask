import { logout } from '@/actions/logout';
import { validateRequest } from '@/actions/validateRequests';
import { Button } from '@/components/ui/button';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function page() {
    const { session } = await validateRequest();
    const user = await db.user.findFirst({
        where: {
            id: session?.userId,
        },
    });
    if (!user?.username) redirect('/profile-creation');
    return (
        <div className="min-h-[93vh]">
            {JSON.stringify(session)}
            <form action={logout}>
                /<Button>Logout</Button>
            </form>
        </div>
    );
}
