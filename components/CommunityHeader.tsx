// 'use client';
// import { ArrowLeft } from 'lucide-react';
// import Link from 'next/link';

// import { communitySchema } from '@/lib/schema';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import CreateCommunityForm from './CreateCommunityForm';

// export default function CommunityHeader({ userId }: { userId: string }) {
//     const form = useForm<z.infer<typeof communitySchema>>({
//         resolver: zodResolver(communitySchema),
//         defaultValues: {
//             name: '',
//             description: '',
//         },
//     });
//     const [isDialogOpen, setIsDialogOpen] = useState(false);

//     function onSubmit(values: z.infer<typeof communitySchema>) {
//         console.log(values);
//     }
//     return (
//         <div className="flex justify-between mb-3 mt-2">
//             <div className="flex justify-start items-center gap-x-8">
//                 <Link href={'/home'}>
//                     <ArrowLeft />
//                 </Link>
//                 <p className="text-xl font-semibold">Communities</p>
//             </div>
//             <div className="pr-2 cursor-pointer">
//                 <CreateCommunityForm userId={userId} />
//             </div>
//         </div>
//     );
// }

'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CreateCommunityForm from './CreateCommunityForm';

export default function CommunityHeader({ userId }: { userId: string }) {
    return (
        <div className="container mx-auto flex justify-between items-center px-4 flex-col sm:flex-row">
            <div className="flex justify-start items-center gap-x-4 mb-4 sm:mb-0">
                <Link href={'/home'}>
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <p className="text-xl font-semibold">Communities</p>
            </div>
            <div className="pr-2 cursor-pointer">
                <CreateCommunityForm userId={userId} />
            </div>
        </div>
    );
}
