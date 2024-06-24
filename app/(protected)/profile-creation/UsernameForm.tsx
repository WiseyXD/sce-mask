'use client';

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
import UserImage from '@/public/default-user-img.png';

import { logout } from '@/actions/logout';
import { profileCreationSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TUsernameFormProps = {
    email: string | undefined;
    yearOfAddmission: string | undefined | null;
    department: string | undefined | null;
};

export default function UsernameForm({
    email,
    yearOfAddmission,
    department,
}: TUsernameFormProps) {
    const form = useForm<z.infer<typeof profileCreationSchema>>({
        resolver: zodResolver(profileCreationSchema),
        defaultValues: {
            username: '',
        },
    });

    function onSubmit(values: z.infer<typeof profileCreationSchema>) {
        console.log('Form Submitted', values);
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
                    <div className="grid gap-8 md:grid-cols-2 p-3">
                        <div className="md:border-r md:border-b-0 border-b pr-4 flex justify-center items-center">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <div className="h-24 w-24 overflow-hidden">
                                            <Image
                                                src={UserImage}
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
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        value={email}
                                        placeholder="shadcn"
                                        disabled
                                        type="email"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is should be your college mail-id.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            <FormItem>
                                <FormLabel>Department</FormLabel>
                                <FormControl>
                                    <Input
                                        value={department?.toUpperCase()}
                                        placeholder="shadcn"
                                        disabled
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is should be your department.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            <FormItem>
                                <FormLabel>Year of Addmission</FormLabel>
                                <FormControl>
                                    <Input
                                        value={yearOfAddmission!}
                                        placeholder="shadcn"
                                        disabled
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
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
