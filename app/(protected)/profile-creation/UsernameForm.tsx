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
import { useToast } from '@/components/ui/use-toast';
import UserImage from '@/public/default-user-img.png';

import { logout } from '@/actions/logout';
import setUsername from '@/actions/usernameCreation';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { ToastAction } from '@/components/ui/toast';
import { profileCreationSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TUsernameFormProps = {
    email: string | undefined;
    yearOfAddmission: string | undefined | null;
    department: string | undefined | null;
    id: string;
};

export default function UsernameForm({
    email,
    yearOfAddmission,
    department,
    id,
}: TUsernameFormProps) {
    const [isPending, startTransisiton] = useTransition();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const { toast } = useToast();

    const form = useForm<z.infer<typeof profileCreationSchema>>({
        resolver: zodResolver(profileCreationSchema),
        defaultValues: {
            username: '',
        },
    });

    async function onSubmit(values: z.infer<typeof profileCreationSchema>) {
        try {
            setError('');
            setSuccess('');
            startTransisiton(async () => {
                const resp = await setUsername(values.username, id);
                if (!resp.success) {
                    setError(resp.msg);
                    return;
                }
                setSuccess(resp.msg);
                toast({
                    title: 'Username set successfully.',
                    description: resp.msg,
                });
                return redirect('/home');
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
                action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                ),
            });
            console.log(error);
            return;
        }
    }

    return (
        <div className="min-h-[100vh] flex justify-center items-center">
            <div className="w-5/6 lg:w-4/6 ">
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
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                {error}
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
                                            value={'20' + yearOfAddmission!}
                                            placeholder="shadcn"
                                            disabled
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            </div>
                        </div>
                        <div className="py-3">
                            <FormError message={error} />
                            <FormSuccess message={success} />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            Save
                        </Button>
                    </form>
                </Form>

                <form action={logout}>
                    <Button disabled={isPending}>Logout</Button>
                </form>
            </div>
        </div>
    );
}
