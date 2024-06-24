import { validateRequest } from '@/actions/validateRequests';
import { redirect } from 'next/navigation';

export interface IBaseTemplate {
    children: React.ReactNode;
}

export default async function BaseTemplate({ children }: IBaseTemplate) {
    const { session, user } = await validateRequest();
    if (!session) return redirect('/login');

    return (
        <div className="min-h-[100vh] flex justify-center items-center">
            <div className="w-1/2">{children}</div>
        </div>
    );
}
