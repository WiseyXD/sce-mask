'use client';
import { projectTitle } from '@/lib/constants';
import { ModeToggle } from './mode-toggle';
import { Separator } from './ui/separator';

export interface INavbarProps {
    props: null;
}

export default function Navbar({ props }: INavbarProps) {
    const isAuthorized = true;

    return (
        <>
            <div className="px-2 py-3">
                <div className="flex justify-between">
                    <h1>{projectTitle}</h1>
                    {isAuthorized && (
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
