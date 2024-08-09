import { validateRequest } from '@/actions/validateRequests';

export default async function page({ params }: { params: { userId: string } }) {
    const { session, user } = await validateRequest();
    const { userId } = params;
    return <div>{userId}</div>;
}
