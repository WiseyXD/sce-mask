import { logout } from '@/actions/logout';
import { validateRequest } from '@/actions/validateRequests';
import { Button } from '@/components/ui/button';
export default async function page() {
    const { session } = await validateRequest();
    const userId = session?.userId;

    return (
        <div>
            Profile Creation
            {JSON.stringify(session)}
            <br />
            <br />
            {JSON.stringify(userId)}
            <form action={logout}>
                /<Button>Logout</Button>
            </form>
        </div>
    );
}
