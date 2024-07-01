import HotTopicsCard from '@/app/(protected)/home/HotTopicsCard';
import TopFollows from '@/app/(protected)/home/TopFollows';

import { TUserDetails } from '@/types';
import Search from './Search';

type TExtrasProps = {
    userDetails: TUserDetails;
};

export default function Extras({ userDetails }: TExtrasProps) {
    return (
        <div className="flex flex-col py-2 gap-y-3">
            <Search />
            <TopFollows />
            <HotTopicsCard />
        </div>
    );
}
