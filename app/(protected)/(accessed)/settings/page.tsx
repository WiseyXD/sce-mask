import { logout } from '@/actions/logout';
import getUserDetails from '@/actions/user';
import { validateRequest } from '@/actions/validateRequests';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export default async function page() {
    const { session, user } = await validateRequest();
    const details = await getUserDetails(user?.id);
    if (!details?.username) {
        redirect('/profile-creation');
    }
    return (
        <div className="min-h-[93vh]">
            {JSON.stringify(session)}
            <form action={logout}>
                /<Button>Logout</Button>
            </form>
        </div>
    );
}
