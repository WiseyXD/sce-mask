import { validateRequest } from '@/actions/validateRequests';
import { redirect } from 'next/navigation';

export interface IBaseTemplate {
    children: React.ReactNode;
}

export default async function BaseTemplate({ children }: IBaseTemplate) {
    const { user } = await validateRequest();
    if (!user) redirect('/auth/login');
    return <div>{children}</div>;
}
