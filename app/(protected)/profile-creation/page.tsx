// how to get dept and year of addmission here through server actions

import getUserDetails from '@/actions/getUserDetails';
import { validateRequest } from '@/actions/validateRequests';
import UsernameForm from './UsernameForm';

export default async function ProfileCreationPage() {
    const { user } = await validateRequest();

    const details = await getUserDetails(user?.id);

    return (
        <UsernameForm
            id={user?.id!}
            email={details?.email}
            department={details?.department}
            yearOfAddmission={details?.yearOfAddmission}
        />
    );
}
