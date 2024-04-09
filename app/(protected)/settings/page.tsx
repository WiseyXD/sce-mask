import { logout } from '@/actions/logout';
import { validateRequest } from '@/actions/validateRequests';
import { Button } from '@/components/ui/button';

export default async function page() {
    const { user } = await validateRequest();
    return (
        <div>
            {JSON.stringify(user)}
            <form action={logout}>
                <Button>Logout</Button>
            </form>
        </div>
    );
}
