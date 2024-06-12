'use client';
import userImage from '@/public/default-user-img.png';
import Image from 'next/image';

import { AcmeLogo } from '@/components/AcmeLogo';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { logout } from '@/actions/logout';
import { profileCreationSchema } from '@/lib/schema';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ProfileCreationPage() {
    const session = useSession();

    const form = useForm<z.infer<typeof profileCreationSchema>>({
        resolver: zodResolver(profileCreationSchema),
        defaultValues: {
            username: '',
            name: session.user?.email,
            year: 12,
            department: session.user?.email,
        },
    });

    function onSubmit(data: z.infer<typeof profileCreationSchema>) {
        console.log('Submitted');
        // toast({
        //     title: 'You submitted the following values:',
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">
        //                 {JSON.stringify(data, null, 2)}
        //             </code>
        //         </pre>
        //     ),
        // });
    }

    return (
        <div>
            <div className="flex justify-center items-center text-2xl ">
                <AcmeLogo />
                <p className="font-bold text-inherit">SCEMask</p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="border rounded-md px-6 py-4"
                >
                    <div className="grid gap-8 md:grid-cols-2  p-3">
                        <div className="md:border-r md:border-b-0 border-b pr-4 flex  justify-center items-center">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <div className="h-24 w-24 overflow-hidden">
                                            <Image
                                                src={userImage}
                                                alt="Profile Picture"
                                                className="object-cover rounded-full"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="shadcn"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="shadcn"
                                                {...field}
                                                disabled
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Dont worry your identity is secure.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="shadcn"
                                                {...field}
                                                disabled
                                            />
                                        </FormControl>
                                        <FormDescription></FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="shadcn"
                                                {...field}
                                                disabled
                                            />
                                        </FormControl>
                                        <FormDescription></FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        Save
                    </Button>
                </form>
            </Form>

            <form action={logout}>
                <Button>Logout</Button>
            </form>
        </div>
    );
}
