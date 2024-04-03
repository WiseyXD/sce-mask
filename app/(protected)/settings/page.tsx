import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

export default async function page() {
    const sessionData = await auth();
    console.log(sessionData);
    return (
        <div>
            {JSON.stringify(sessionData)}
            <form
                action={async () => {
                    'use server';
                    await signOut();
                }}
            >
                <Button type="submit">Logout</Button>
            </form>
        </div>
    );
}
