'use client';
import { useState, useTransition } from 'react';

import { avatarArray } from '@/data/avatars';
import { profileUpdateSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateProfile } from '@/actions/user';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { Edit3 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Textarea } from './ui/textarea';
import { ToastAction } from './ui/toast';

type TEditProfileProps = {
    oldUsername: string;
    oldDescription: string;
    oldImage: string;
    userId: string;
};

export default function EditProfile({
    oldUsername,
    oldDescription,
    oldImage,
    userId,
}: TEditProfileProps) {
    const pathname = usePathname();
    const [isPending, startTransisiton] = useTransition();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const { toast } = useToast();

    const form = useForm<z.infer<typeof profileUpdateSchema>>({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            description: oldDescription,
            image: oldImage,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof profileUpdateSchema>) {
        try {
            setError('');
            setSuccess('');
            startTransisiton(async () => {
                const resp = await updateProfile(
                    userId,
                    values.description,
                    values.image,
                    pathname
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
        <Sheet>
            <SheetTrigger>
                <Edit3 className="" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Mask description about you."
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormDescription>{error}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mask Image</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a mask image to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {avatarArray.map((avatar) => (
                                                <SelectItem
                                                    value={avatar.link}
                                                    key={avatar.id}
                                                    className="text-center"
                                                >
                                                    <Image
                                                        src={avatar.link}
                                                        alt="Profile Picture"
                                                        className="text-center object-cover rounded-full"
                                                        width={100}
                                                        height={100}
                                                    />
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Mask image to mask your identity.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
