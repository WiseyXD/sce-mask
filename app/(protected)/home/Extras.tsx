import HotTopicsCard from '@/app/(protected)/home/HotTopicsCard';
import TopFollows from '@/app/(protected)/home/TopFollows';

import { TUserDetails } from '@/types';
import Search from './Search';
export default function Extras({ userDetails }: TUserDetails) {
    return (
        <div className="flex flex-col py-2 gap-y-3">
            <Search />
            <TopFollows />
            <HotTopicsCard />
        </div>
    );
}
