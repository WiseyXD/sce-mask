import { validateRequest } from '@/actions/validateRequests';
import { redirect } from 'next/navigation';

export interface IBaseTemplate {
    children: React.ReactNode;
}

export default async function BaseTemplate({ children }: IBaseTemplate) {
    const { session, user } = await validateRequest();
    if (!session) return redirect('/login');

    return <>{children}</>;

    //     </div>
    // </div>
}
