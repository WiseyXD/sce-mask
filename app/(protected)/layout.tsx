import { validateRequest } from '@/actions/validateRequests';
import { redirect } from 'next/navigation';

import getUserDetails from '@/actions/getUserDetails';
import Extras from '@/components/extras/Extras';
import Sidebar from '@/components/sidebar/Sidebar';
import { Separator } from '@/components/ui/separator';

export interface IBaseTemplate {
    children: React.ReactNode;
}

export default async function BaseTemplate({ children }: IBaseTemplate) {
    const { session, user } = await validateRequest();
    if (!session) return redirect('/login');

    const userDetails = await getUserDetails(user?.id);

    return (
        <div className="min-h-[100vh] flex justify-center items-center">
            <div className="w-4/6">
                <div className="flex lg:grid lg:grid-cols-[0.85fr_3fr_1.15fr] gap-x-3">
                    <div className="">
                        <Sidebar userDetails={userDetails} />
                    </div>
                    <div className="flex">
                        <Separator orientation="vertical" />
                        {children}
                        <Separator orientation="vertical" />
                    </div>
                    <div className="hidden lg:block">
                        <Extras userDetails={userDetails} />
                    </div>
                </div>
            </div>
        </div>
    );
}
