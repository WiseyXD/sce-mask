// how to get dept and year of addmission here through server actions

import getUserDetails from '@/actions/getUserDetails';
import { validateRequest } from '@/actions/validateRequests';
import { redirect } from 'next/navigation';
import UsernameForm from './UsernameForm';

export default async function ProfileCreationPage() {
    const { user } = await validateRequest();
    const details = await getUserDetails(user?.id);
    if (details?.username) {
        redirect('/settings');
    }
    return (
        <UsernameForm
            id={user?.id!}
            email={details?.email}
            department={details?.department}
            yearOfAddmission={details?.yearOfAddmission}
        />
    );
}
