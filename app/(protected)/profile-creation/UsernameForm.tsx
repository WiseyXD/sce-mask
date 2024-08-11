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

import setUsernameAndDescription from '@/actions/user/usernameCreation';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { ToastAction } from '@/components/ui/toast';
import { avatarArray } from '@/data/avatars';
import { profileCreationSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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
            description: '',
            image: '',
        },
    });

    async function onSubmit(values: z.infer<typeof profileCreationSchema>) {
        try {
            setError('');
            setSuccess('');
            startTransisiton(async () => {
                const resp = await setUsernameAndDescription(
                    values.username,
                    id,
                    values.description,
                    values.image
                );
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
                                        <div className="flex flex-wrap items-center gap-4">
                                            {/* {avatarArray.map((avatar) => (
                                                <div
                                                    className="h-24 w-24 overflow-hidden"
                                                    key={avatar.id}
                                                >
                                                    <Image
                                                        src={avatar.link}
                                                        alt="Profile Picture"
                                                        className="object-cover rounded-full"
                                                        width={100}
                                                        height={100}
                                                    />
                                                </div>
                                            ))} */}
                                            <FormField
                                                control={form.control}
                                                name="image"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Mask Image
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            defaultValue={
                                                                field.value
                                                            }
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a mask image to display" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {avatarArray.map(
                                                                    (
                                                                        avatar
                                                                    ) => (
                                                                        <SelectItem
                                                                            value={
                                                                                avatar.link
                                                                            }
                                                                            key={
                                                                                avatar.id
                                                                            }
                                                                            className="text-center"
                                                                        >
                                                                            <Image
                                                                                src={
                                                                                    avatar.link
                                                                                }
                                                                                alt="Profile Picture"
                                                                                className="text-center object-cover rounded-full"
                                                                                width={
                                                                                    100
                                                                                }
                                                                                height={
                                                                                    100
                                                                                }
                                                                            />
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormDescription>
                                                            Mask image to mask
                                                            your identity.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
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
                                                    placeholder="WiseyXD"
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
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Mask description about you."
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
            </div>
        </div>
    );
}
