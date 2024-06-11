'use client';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gyfW8NnrgKZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

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
import { toast } from '@/components/ui/use-toast';

import { profileCreationSchema } from '@/lib/schema';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ProfileCreationPage() {
    const session = useSession();
    console.log(session);
    const [file, setFile] = useState<File | null>(null);
    // const userId = session?.userId;

    const form = useForm<z.infer<typeof profileCreationSchema>>({
        resolver: zodResolver(profileCreationSchema),
        defaultValues: {
            username: '',
            imageFile: '',
            name: session.user?.email,
            year: 12,
            department: session.user?.email,
        },
    });

    function onSubmit(data: z.infer<typeof profileCreationSchema>) {
        console.log('Submitted');
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    // File upload error , how to validate image in zod not wokring asked GPT fix errors

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            form.setValue('imageFile', [file]);
        }
    };

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

                                        <FormField
                                            control={form.control}
                                            name="imageFile"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Profile Picture
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="shadcn"
                                                            {...field}
                                                            type="file"
                                                            onChange={
                                                                handleFileChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        This is your public
                                                        display picture.
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
                    <Button type="submit" className="w-full ">
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    );
}

{
    /* <form action={logout}>
        /<Button>Logout</Button>
    </form> */
}
