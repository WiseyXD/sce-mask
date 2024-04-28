import { validateRequest } from '@/actions/validateRequests';
import { projectTitle } from '@/lib/constants';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { Separator } from './ui/separator';

export interface INavbarProps {
    props: null;
}

export default async function Navbar({ props }: INavbarProps) {
    const { session } = await validateRequest();

    return (
        <>
            <div className="px-2 py-3">
                <div className="flex justify-between">
                    <Link href="/">
                        <h1>{projectTitle}</h1>
                    </Link>
                    {session && (
                        <div className="flex items-center gap-3 ">
                            <h3>User Status</h3>
                            <h3>User Pic</h3>
                            <h3>username</h3>
                            <h3>Logout</h3>
                            <ModeToggle />
                        </div>
                    )}
                </div>
            </div>
            <Separator />
        </>
    );
}
