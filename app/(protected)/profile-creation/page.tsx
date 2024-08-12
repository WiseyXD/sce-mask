// how to get dept and year of addmission here through server actions

import getUserDetails from '@/actions/user/getUserDetails';
import { validateRequest } from '@/actions/validateRequests';
import { redirect } from 'next/navigation';
import UserCreationForm from '../../../components/UserCreationForm';

export default async function ProfileCreationPage() {
    const { user } = await validateRequest();
    const details = await getUserDetails(user?.id);
    if (details?.username) {
        return redirect('/home');
    }
    return (
        <UserCreationForm
            id={user?.id!}
            email={details?.email}
            department={details?.department}
            yearOfAddmission={details?.yearOfAddmission}
        />
    );
}
